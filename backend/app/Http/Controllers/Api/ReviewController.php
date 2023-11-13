<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\RecipeListResource;
use App\Http\Resources\ReviewListResource;
use App\Http\Resources\ReviewResource;
use App\Models\Recipe;
use App\Models\Review;
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
        $validatedData = $request->validate([
            'recipe_id' => 'required|exists:recipes,recipe_id',
            'user_id' => 'required|exists:users,user_id',
            'comment' => 'required|string',
            'rating' => 'required|numeric|between:1,5',
        ]);

        $review = Review::create($validatedData);

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
        $review = Review::findOrFail($id);

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
