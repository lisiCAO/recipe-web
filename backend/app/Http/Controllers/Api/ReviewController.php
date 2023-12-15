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

class ReviewController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): \Illuminate\Http\Resources\Json\AnonymousResourceCollection
    {
        return ReviewListResource::collection(Review::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): \Illuminate\Http\JsonResponse
    {
        // 验证请求数据
        $validatedData = $request->validate([
            'comment' => 'required|string',
            'rating' => 'required|numeric|between:1,5',
            // 可以在这里添加其他需要验证的字段
        ]);

        // 获取请求数据
        $recipeName = $request->input('recipe_name');
        $recipe = Recipe::where('recipe_name', $recipeName)->first();
        if(!$recipe) {
            return response()->json([
                'message' => 'Recipe not found'
            ], 404);
        }
        $recipeId = $recipe->recipe_id;

        $userName = $request->input('user_name');
        $nameParts = explode(' ', $userName, 2); // limit to 2 parts, incase of middle name
        $firstName = $nameParts[0];
        $lastName = $nameParts[1] ?? '';

        $user = User::where('first_name', $firstName)->where('last_name', $lastName)->first();
        if(!$user) {
            return response()->json([
                'message' => 'User not found'
            ], 404);
        }
        $userId = $user->user_id;

        $review = Review::create([
            'recipe_id' => $recipeId,
            'user_id' => $userId,
            'comment' => $validatedData['comment'],
            'rating' => $validatedData['rating'],
            // 其他需要设置的字段
        ]);

        $review->save();

        return response()->json([
            'message' => 'Review created successfully',
            'review' => $review
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): ReviewResource
    {
        $review = Review::findOrFail($id);
        return new ReviewResource($review);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id): \Illuminate\Http\JsonResponse
    {
        try {
            $review = Review::findOrFail($id);
        } catch (\Exception $e) {
            return $this->sendError('Review not found', 404);
        }

        try{
            $validatedData = $request->validate([
                'comment' => 'nullable|string',
                'rating' => 'nullable|numeric|between:1,5',
            ]);

            $review->update($validatedData);

            return $this->sendResponse($review, 'Review updated successfully', 200);
        } catch (\Exception $e) {
            Log::error("Review update failed: " . $e->getMessage());
            return  $this->sendError('Review update failed', 500);
        }

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id): \Illuminate\Http\JsonResponse
    {
        $review = Review::findOrFail($id);
        $review->delete();
        return response()->json(['message' => 'Review deleted successfully'], 200);
    }

}
