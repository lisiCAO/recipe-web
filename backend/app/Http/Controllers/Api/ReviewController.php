<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\RecipeListResource;
use App\Http\Resources\ReviewListResource;
use App\Http\Resources\ReviewResource;
use App\Models\Recipe;
use App\Models\Review;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Tymon\JWTAuth\Facades\JWTAuth;
/**
 * ReviewController
 * 
 * This class is responsible for handling the API requests related to reviews.
 */
class ReviewController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        try {
            if(!checkRole('admin')) {
                return $this->sendError('Unauthorized', [], 403);
            }
            $reviews = Review::all();
            return $this->sendResponse(ReviewListResource::collection($reviews), 'Reviews fetched successfully');
        } catch (\Exception $e) {
            Log::error('Error fetching reviews: ' . $e->getMessage());
            return $this->sendError('Error fetching reviews', [], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request): \Illuminate\Http\JsonResponse
    {
        try {
            // Validate request data
            $validatedData = $request->validate([
                'comment' => 'required|string',
                'rating' => 'required|numeric|between:1,5',
                //other fields to be validated here
            ]);

            // Get request data
            $recipeName = $request->input('recipe_name');
            $recipe = Recipe::where('recipe_name', $recipeName)->first();
            if (!$recipe) {
                return $this->sendError('Recipe not found', [], 404);
            }
            $recipeId = $recipe->recipe_id;

            $userName = $request->input('user_name');
            $nameParts = explode(' ', $userName, 2); // limit to 2 parts, in case of middle name
            $firstName = $nameParts[0];
            $lastName = $nameParts[1] ?? '';

            $user = User::where('first_name', $firstName)->where('last_name', $lastName)->first();
            if (!$user) {
                return $this->sendError('User not found', [], 404);
            }
            $userId = $user->user_id;

            $review = Review::create([
                'recipe_id' => $recipeId,
                'user_id' => $userId,
                'comment' => $validatedData['comment'],
                'rating' => $validatedData['rating'],
            ]);

            $review->save();
            Log::info('Review created successfully.', ['review_id' => $review->id]);
            return $this->sendResponse(new ReviewResource($review), 'Review created successfully.');
        } catch (\Exception $e) {
            Log::error('Error creating review: ' . $e->getMessage());
            return $this->sendError($e->getMessage(), [], 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param string $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(string $id)
    {
        try {
            $review = Review::findOrFail($id);
            return $this->sendResponse(new ReviewResource($review), 'Review fetched successfully.');
        } catch (\Exception $e) {
            Log::error('Failed to fetch review: ' . $e->getMessage());
            return $this->sendError($e->getMessage(), [], 404);
        }
    }


    public function showByUser()
    {
        try {
            $currentUser = JWTAuth::parseToken()->authenticate();
            $reviews = Review::where('user_id', $currentUser->user_id)->get();

            return $this->sendResponse(ReviewListResource::collection($reviews), 'Reviews fetched successfully');

        } catch (\Exception $e) {
            Log::error('Error fetching recipes: ' . $e->getMessage());
            return $this->sendError('Error fetching recipes', [], 500);
        }
    }

    public function showByRecipe(string $recipeId)
    {
        try {
            $reviews = Review::where('recipe_id', $recipeId)->get();
            return $this->sendResponse(ReviewListResource::collection($reviews), 'Reviews fetched successfully');
        } catch (\Exception $e) {
            Log::error('Error fetching reviews: ' . $e->getMessage());
            return $this->sendError('Error fetching reviews', [], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param string $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, string $id): \Illuminate\Http\JsonResponse
    {
        try {
            $review = Review::findOrFail($id);
            $userId = $review->user_id;
            if(!checkRole('admin') && !$this->checkCurrentUser($userId)) {
                return $this->sendError('Unauthorized', [], 403);
            }
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage(), 404);
        }
        try {
            $validatedData = $request->validate([
                'comment' => 'nullable|string',
                'rating' => 'nullable|numeric|between:1,5',
            ]);

            $review->update($validatedData);

            return $this->sendResponse($review, 'Review updated successfully', 200);
        } catch (\Exception $e) {
            Log::error("Review update failed: " . $e->getMessage());
            return  $this->sendError($e->getMessage(), 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param string $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(string $id): \Illuminate\Http\JsonResponse
    {
        try {

            $review = Review::findOrFail($id);
            $userId = $review->user_id;
            if(!checkRole('admin') && !$this->checkCurrentUser($userId)) {
                return $this->sendError('Unauthorized', [], 403);
            }
            $review->delete();
            Log::info('Review deleted successfully.', ['review_id' => $id]);
            return $this->sendResponse(null, 'Review deleted successfully.');
        } catch (\Exception $e) {
            Log::error('Failed to delete review: ' . $e->getMessage());
            return $this->sendError($e->getMessage(), [], 500);
        }
    }

}
