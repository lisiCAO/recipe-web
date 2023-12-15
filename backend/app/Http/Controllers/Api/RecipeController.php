<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\RecipeListResource;
use App\Http\Resources\RecipeDetailResource;
use App\Models\Recipe;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Tymon\JWTAuth\Facades\JWTAuth;

class RecipeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): AnonymousResourceCollection
    {
        // Get all recipes
        try {
            $recipes = Recipe::all();
            return RecipeListResource::collection($recipes);
        } catch (\Exception $e) {
            Log::error('Error fetching recipes: ' . $e->getMessage());
            return $this->sendError('Error fetching recipes', [], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        try {
            // Data validation
            $validatedData = $request->validate([
                'recipe_name' => 'required|string|max:100',
                'cooking_time' => 'nullable|integer',
                'step_instruction' => 'nullable|string',
                'description' => 'nullable|string',
                'recipe_image_path' => 'nullable|string',
            ]);

            // get current ID
            $user = $request->JWTAuth::parseToken()->authenticate();
            $validatedData['user_id'] = $user->user_id;

            // 创建新的 Recipe 实例
            $recipe = new Recipe($validatedData);
            $recipe->save(); // 保存食谱
            return $this->sendResponse(new RecipeDetailResource($recipe), 'Recipe created successfully');
        } catch (\Exception $e) {
            Log::error('Error creating recipe: ' . $e->getMessage());
            return $this->sendError('Error creating recipe', [], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): RecipeDetailResource
    {
        try {
            $recipe = Recipe::findOrFail($id);
            return new RecipeDetailResource($recipe);
        } catch (\Exception $e) {
            Log::error('Error fetching recipe: ' . $e->getMessage());
            return $this->sendError('Error fetching recipe', [], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try {
            $recipe = Recipe::findOrFail($id);

            $validatedData = $request->validate([
                'recipe_name' => 'required|string|max:100',
                'cooking_time' => 'nullable|integer',
                'step_instruction' => 'nullable|string',
                'description' => 'nullable|string',
                'recipe_image_path' => 'nullable|string',
            ]);

            // Check whether upload a new image
            if (!empty($validatedData['recipe_image_path']) && !empty($recipe->recipe_image_path)) {
                // delete old img
                Storage::delete($recipe->recipe_image_path);
            }

            // update model
            $recipe->update($validatedData);

            return $this->sendResponse(new RecipeDetailResource($recipe), 'Recipe updated successfully');
        } catch (\Exception $e) {
            Log::error('Error updating recipe: ' . $e->getMessage());
            return $this->sendError('Error updating recipe', [], 500);
        }

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id): JsonResponse
    {
        try {
            $recipe = Recipe::findOrFail($id);
            $recipe->delete();
            return $this->sendResponse(null, 'Recipe deleted successfully');
        } catch (\Exception $e) {
            Log::error('Error deleting recipe: ' . $e->getMessage());
            return $this->sendError('Error deleting recipe', [], 500);
        }
    }
}
