<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\IngredientDetailResource;
use App\Http\Resources\IngredientListResource;
use App\Models\Ingredient;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Storage;

class IngredientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $ingredients = Ingredient::all();
            return IngredientListResource::collection($ingredients);
        } catch (\Illuminate\Database\QueryException $e) {
            Log::error('Database query error in fetching ingredients: ' . $e->getMessage());
            return $this->sendError('Database query error', [], 500);
        } catch (\Exception $e) {
            Log::error('Error fetching ingredients: ' . $e->getMessage());
            return $this->sendError('Error fetching ingredients', [], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): \Illuminate\Http\JsonResponse
    {
        try{
            $validatedData = $request->validate([
                'name' => 'required|string|max:50',
                'img_path' => 'nullable|string|max:255',
                'description' => 'nullable|string',
            ]);
            $ingredient = Ingredient::create($validatedData);

            return $this->sendResponse(new IngredientDetailResource($ingredient), 'Ingredient created successfully');
        } catch (\Exception $e) {
            Log::error('Error creating ingredient: ' . $e->getMessage());
            return $this->sendError('Error creating ingredient', [], 500);
        }

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): IngredientDetailResource
    {
        try{
            $ingredient = Ingredient::findOrFail($id);
            return new IngredientDetailResource($ingredient);
        } catch (\Exception $e) {
            Log::error('Error fetching ingredient: ' . $e->getMessage());
            return $this->sendError('Error fetching ingreident', [], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id):  \Illuminate\Http\JsonResponse
    {
        try{
            $ingredient = Ingredient::findOrFail($id);
            $validatedData = $request->validate([
                'name' => 'nullable|string|max:50',
                'img_path' => 'nullable|string|max:255',
                'description' => 'nullable|string',
            ]);
            if (!empty($validatedData['img_path']) && !empty($ingredient->img_path)) {
                Storage::delete($ingredient->img_path);
            }
            $ingredient->update($validatedData);
            return $this->sendResponse(new IngredientDetailResource($ingredient), 'Ingredient updated successfully');
        } catch (\Exception) {
            Log::error('Error updating ingredient: ' . $e->getMessage());
            return $this->sendError('Error updating ingredient', [], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id): \Illuminate\Http\JsonResponse
    {
        try {
            $ingredient = Ingredient::findOrFail($id);
            $ingredient->delete();

            return $this->sendResponse(null, 'Ingredient deleted successfully');
        } catch (\Exception $e) {
            Log::error('Error deleting ingredient: ' . $e->getMessage());
            return $this->sendError('Error deleting ingredient', [], 500);
        }
    }
}
