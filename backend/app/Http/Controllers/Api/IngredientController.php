<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\IngredientDetailResource;
use App\Http\Resources\IngredientListResource;
use App\Models\Ingredient;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

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

        $ingredient = Ingredient::create($validatedData);

        return response()->json([
            'message' => 'Ingredient created successfully',
            'ingredient' => new IngredientDetailResource($ingredient)
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

    /**
     * Search the specified resource from storage.
     */
    public function summary() 
    {
        $totalIngredients = Ingredient::count();
        $commonIngredients = DB::table('recipe_ingredients')
            ->select('ingredient_id', DB::raw('count(*) as total'))
            ->groupBy('ingredient_id')
            ->orderBy('total', 'desc')
            ->take(5)
            ->get();
        $lastestIngredients = Ingredient::latest()->take(5)->get();

        return response()->json([
            'totalIngredients' => $totalIngredients,
            // 'commonIngredients' => $commonIngredients,
            // 'lastestIngredients' => $lastestIngredients
        ], 200);
    }
}
