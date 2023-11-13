<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\RecipeListResource;
use App\Http\Resources\RecipeDetailResource;
use App\Models\Recipe;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\Storage;

class RecipeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): AnonymousResourceCollection
    {
        // Get all recipes
        return RecipeListResource::collection(Recipe::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        // 数据验证
        $validatedData = $request->validate([
            'recipe_name' => 'required|string|max:100',
            'user_id' => 'required|exists:users,user_id',
            'cooking_time' => 'nullable|integer',
            'step_instruction' => 'nullable|string',
            'description' => 'nullable|string',
            'recipe_image_path' => 'nullable|image|max:2048',
            ]);

        $recipe = new Recipe($validatedData);

        if($request->hasFile('recipe_image_path') && $request->file('recipe_image_path')->isValid()){
            // 存储图片并获取存储路径
            $path = $request->recipe_image_path->store('public/recipes');
            $recipe->recipe_image_path = Storage::url($path);
        }

        $recipe->save(); //保存食谱

        // 返回响应
        return response()->json([
            'message' => 'Recipe created successfully',
            'recipe' => new RecipeDetailResource($recipe)
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): RecipeDetailResource
    {
        // Show details by id
        $recipe = Recipe::findOrFail($id);
        return new RecipeDetailResource($recipe); // 直接返回资源详情
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id): JsonResponse
    {
        // 查找模型实例
        $recipe = Recipe::findOrFail($id);

        // 数据验证
        $validatedData = $request->validate([
            'recipe_name' => 'required|string|max:100',
            'user_id' => 'required|exists:users,user_id',
            'cooking_time' => 'nullable|integer',
            'step_instruction' => 'nullable|string',
            'description' => 'nullable|string',
            'recipe_image_path' => 'nullable|image|max:2048',
        ]);

        // 处理图片上传，如有
        if($request->hasFile('recipe_image_path')&& $request->file('recipe_image_path')->isValid()){
            $path = $request->recipe_image_path->store('public/recipes');
            $validatedData['recipe_image_path'] = Storage::url($path);
        }

        // 更新模型
        $recipe->update($validatedData);

        // 返回响应
        return response()->json([
            'message' => 'Recipe updated successfully',
            'recipe' => new RecipeDetailResource($recipe)
        ], 200); // 使用状态码 200 表示请求成功

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id): JsonResponse
    {
        // 查找模型实例
        $recipe = Recipe::findOrFail($id);

        // 删除模型
        $recipe->delete();

        // 返回响应
        return response()->json([
            'message' => 'Recipe deleted successfully'
        ], 200); // 使用状态码 200 表示请求成功

    }
}
