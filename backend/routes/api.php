<?php

use App\Http\Controllers\Api\IngredientController;
use App\Http\Controllers\Api\RecipeController;
use App\Http\Controllers\Api\ReviewController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\FileUploadController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;
use Tymon\JWTAuth\Facades\JWTAuth;

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

// Login
Route::post('/login', [AuthController::class, 'login']);

Route::middleware(['parse.jwt', 'jwt.auth','adminorcurrentuser'])->group(function () {
    // User
    Route::get('/user/recipes', [RecipeController::class, 'showByUser']);
    Route::get('/user/reviews', [ReviewController::class, 'showByUser']);
    Route::get('/user', [UserController::class, 'getCurrentUser']);

    Route::delete('/users/{userId}/favorites/{recipeId}', [UserController::class, 'removeFavorite']);
    Route::get('/users/{userId}/favorites/{recipeId}', [UserController::class, 'getFavorite']);
    Route::get('/users/{userId}/favorites', [UserController::class, 'listFavorites']);

    // Tables
    Route::apiResource('users', UserController::class);
    Route::apiResource('recipes', RecipeController::class);
    Route::apiResource('ingredients', IngredientController::class);
    Route::apiResource('reviews', ReviewController::class);
    
    // Functions
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/upload', [FileUploadController::class, 'upload']);
    Route::get('/dashboard', [DashboardController::class, 'index']);
});