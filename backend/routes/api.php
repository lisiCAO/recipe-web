<?php

use App\Http\Controllers\Api\IngredientController;
use App\Http\Controllers\Api\RecipeController;
use App\Http\Controllers\Api\ReviewController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\FileUploadController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Http\Request;


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
Route:: apiResource('users', UserController::class)->middleware(['parse.jwt', 'jwt.auth']);

// current user
Route::get('/user', [UserController::class, 'getCurrentUser'])->middleware(['parse.jwt', 'jwt.auth']);


// Recipe 相关的 API
Route::apiResource('recipes', RecipeController::class);


// Ingredient 相关的 API
Route::apiResource('ingredients', IngredientController::class);


// Review 相关的 API
Route::apiResource('reviews', ReviewController::class);

// 上传图片
Route::post('/upload', FileUploadController::class . '@upload');

// 登录
Route::post('/login', [AuthController::class, 'login']);

Route::post('/logout', [AuthController::class, 'logout'])->middleware(['parse.jwt', 'jwt.auth']);

Route::get('/dashboard', [DashboardController::class, 'index']);





