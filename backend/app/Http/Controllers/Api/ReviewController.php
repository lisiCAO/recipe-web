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
        $user = User::where('user_name', $userName)->first();
        if(!$user) {
            return response()->json([
                'message' => 'User not found'
            ], 404);
        }
        $userId = $user->user_id;

        $validatedData = $request->validate([
            'comment' => 'required|string',
            'rating' => 'required|numeric|between:1,5',
        ]);

        $review = Review::create($validatedData);
        $review->recipe_id = $recipeId;
        $review->user_id = $userId;
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
            return response()->json([
                'message' => 'Review not found'
            ], 404);
        }

        $validatedData = $request->validate([
            'comment' => 'nullable|string',
            'rating' => 'nullable|numeric|between:1,5',
        ]);

        $review->update($validatedData);

        return response()->json([
            'message' => 'Review updated successfully',
            'review' => $review
        ], 200);
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
