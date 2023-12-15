<?php

namespace App\Services;

use App\Http\Resources\ReviewResource;
use App\Models\Ingredient;
use App\Models\Recipe;
use App\Models\Review;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

class DashboardService
{
    public function getDashboardData(): array
    {
        try {
            return [
                'userStats' => $this->getUserStats(),
                'recipeStats' => $this->getRecipeStats(),
                'ingredientStats' => $this->getIngredientStats(),
                'reviewStats' => $this->getReviewStats(),
            ];
        } catch (\Exception $e) {
            Log::error('Error fetching dashboard data: ' . $e->getMessage());
            // 根据需要返回默认值或抛出异常
            return []; // 可以返回空数组或其他默认值
        }
    }

    protected function getUserStats(): array
    {
        $usersCount = User::count();
        $newUsersCount = $this->getNewUsersCount(); // 假设这是获取最新用户数量的方法
        // 其他用户相关的统计数据

        return [
            'totalUsers' => $usersCount,
            'newUsers' => $newUsersCount,
            // ...
        ];
    }

    protected function getRecipeStats(): array
    {
        $recipesCount = Recipe::count();
        $mostPopularRecipe = $this->getMostPopularRecipe();

        return [
            'totalRecipes' => $recipesCount,
            'mostPopularRecipe' => $mostPopularRecipe
            // ...
        ];
    }

    protected function getIngredientStats(): array
    {
        $ingredientsCount = Ingredient::count();
        $mostUsedIngredient = $this->getMostUsedIngredient();
        // 其他食谱相关的统计数据

        return [
            'totalIngredients' => $ingredientsCount,
            'mostUsedIngredient' => $mostUsedIngredient
            // ...
        ];
    }

    protected function getReviewStats(): array
    {
        $reviewsCount = Review::count();
        $recentViews =$this->getLatestThreeReviews();
        // 其他食谱相关的统计数据

        return [
            'totalReviews' => $reviewsCount,
            'recentReviews' => $recentViews
            // ...
        ];
    }


    public function getMostPopularRecipe(): \Illuminate\Database\Eloquent\Model|\Illuminate\Database\Eloquent\Builder|\Illuminate\Database\Query\Builder|Recipe|null
    {
        return Recipe::withCount('reviews')
            ->orderBy('reviews_count', 'desc')
            ->first();
    }

    public function getMostUsedIngredient(): \Illuminate\Database\Eloquent\Model|\Illuminate\Database\Eloquent\Builder|Ingredient|\Illuminate\Database\Query\Builder|null
    {
        return Ingredient::withCount('recipes')
            ->orderBy('recipes_count', 'desc')
            ->first();
    }

    public function getNewUsersCount(): int
    {
        $aWeekAgo = Carbon::now()->subWeek();

        return User::where('created_at', '>=', $aWeekAgo)
            ->count();
    }

    public function getLatestThreeReviews(): \Illuminate\Http\Resources\Json\AnonymousResourceCollection
    {
        return ReviewResource::collection(Review::latest()->take(3)->get());
    }
}
