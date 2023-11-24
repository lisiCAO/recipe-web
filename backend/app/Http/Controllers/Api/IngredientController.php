<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\IngredientDetailResource;
use App\Http\Resources\IngredientListResource;
use App\Models\Ingredient;
use Illuminate\Http\Request;
use Storage;

class IngredientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): \Illuminate\Http\Resources\Json\AnonymousResourceCollection
    {
        $ingredients = Ingredient::all();
        return IngredientListResource::collection($ingredients);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): \Illuminate\Http\JsonResponse
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:50',
            'img_path' => 'nullable|string|max:255', // 假设图片文件
            'description' => 'nullable|string',
        ]);

        $ingredient = Ingredient::create($request->all());

        return response()->json([
            'message' => 'Ingredient created successfully',
            'recipe' => new IngredientDetailResource($ingredient)
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): IngredientDetailResource
    {
        $ingredient = Ingredient::findOrFail($id);
        return new IngredientDetailResource($ingredient);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id):  \Illuminate\Http\JsonResponse
    {
        $ingredient = Ingredient::findOrFail($id);

        $validatedData = $request->validate([
            'name' => 'nullable|string|max:50',
            'img_path' => 'nullable|string|max:255',
            'description' => 'nullable|string',
        ]);

        $ingredient->update($validatedData);

        return response()->json([
            'message' => 'Ingredient updated successfully',
            'recipe' => new IngredientDetailResource($ingredient)
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id): \Illuminate\Http\JsonResponse
    {
        $ingredient = Ingredient::findOrFail($id);
        $ingredient->delete();
        return response()->json(['message' => 'Ingredient deleted successfully']);
    }
}
