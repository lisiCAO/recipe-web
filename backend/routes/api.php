<?php

use App\Http\Controllers\Api\IngredientController;
use App\Http\Controllers\Api\RecipeController;
use App\Http\Controllers\Api\ReviewController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\FileUploadController;
use App\Http\Controllers\Auth\LoginController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });
// User 相关的 API
Route:: apiResource('users', UserController::class);
// 用户摘要统计
Route::get('/user/summary', [UserController::class, 'summary']);

// Recipe 相关的 API
Route::apiResource('recipes', RecipeController::class);
// 食谱摘要统计
Route::get('/recipe/summary', [RecipeController::class, 'summary']);

// Ingredient 相关的 API
Route::apiResource('ingredients', IngredientController::class);
// 配料摘要统计
Route::get('/ingredient/summary', [IngredientController::class, 'summary']);

// Review 相关的 API
Route::apiResource('reviews', ReviewController::class);
// 评论摘要统计
Route::get('/review/summary', [ReviewController::class, 'summary']);

// 上传图片
Route::post('/upload', FileUploadController::class . '@upload');

// 登录
Route::post('/login', [LoginController::class, 'login']);

// 获取当前登录用户
Route::middleware('auth:sanctum')->get('/me', [UserController::class, 'getCurrentUser']);
