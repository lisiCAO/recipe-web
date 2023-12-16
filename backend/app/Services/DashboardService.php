<?php

namespace App\Services;

use App\Http\Resources\ReviewResource;
use App\Models\Ingredient;
use App\Models\Recipe;
use App\Models\Review;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;
/**
 * Class DashboardService
 *
 * This class provides methods to retrieve dashboard data including user statistics, recipe statistics,
 * ingredient statistics, and review statistics.
 */
class DashboardService
{
    /**
     * Retrieve the dashboard data.
     *
     * @return array The dashboard data including user statistics, recipe statistics,
     *               ingredient statistics, and review statistics.
     * @throws \Exception If an error occurs while fetching the dashboard data.
     */
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
            // return an empty array or other default value here
            return []; // 可以返回空数组或其他默认值
        }
    }

    /**
     * Retrieve the user statistics.
     *
     * @return array The user statistics including the total number of users and the number of new users.
     */
    protected function getUserStats(): array
    {
        $usersCount = User::count();
        $newUsersCount = $this->getNewUsersCount(); // get the count of new users within the past week
        // Other user-related statistics

        return [
            'totalUsers' => $usersCount,
            'newUsers' => $newUsersCount,
            // ...
        ];
    }

    /**
     * Retrieve the recipe statistics.
     *
     * @return array The recipe statistics including the total number of recipes and the most popular recipe.
     */
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

    /**
     * Retrieve the ingredient statistics.
     *
     * @return array The ingredient statistics including the total number of ingredients and the most used ingredient.
     */
    protected function getIngredientStats(): array
    {
        $ingredientsCount = Ingredient::count();
        $mostUsedIngredient = $this->getMostUsedIngredient();
        // Other recipe-related statistics

        return [
            'totalIngredients' => $ingredientsCount,
            'mostUsedIngredient' => $mostUsedIngredient
            // ...
        ];
    }

    /**
     * Retrieve the review statistics.
     *
     * @return array The review statistics including the total number of reviews and the recent reviews.
     */
    protected function getReviewStats(): array
    {
        $reviewsCount = Review::count();
        $recentViews =$this->getLatestThreeReviews();
        // Other review-related statistics

        return [
            'totalReviews' => $reviewsCount,
            'recentReviews' => $recentViews
            // ...
        ];
    }

    /**
     * Retrieve the most popular recipe.
     *
     * @return \Illuminate\Database\Eloquent\Model|\Illuminate\Database\Eloquent\Builder|\Illuminate\Database\Query\Builder|Recipe|null The most popular recipe.
     */
    public function getMostPopularRecipe(): \Illuminate\Database\Eloquent\Model|\Illuminate\Database\Eloquent\Builder|\Illuminate\Database\Query\Builder|Recipe|null
    {
        return Recipe::withCount('reviews')
            ->orderBy('reviews_count', 'desc')
            ->first();
    }

    /**
     * Retrieve the most used ingredient.
     *
     * @return \Illuminate\Database\Eloquent\Model|\Illuminate\Database\Eloquent\Builder|Ingredient|\Illuminate\Database\Query\Builder|null The most used ingredient.
     */
    public function getMostUsedIngredient(): \Illuminate\Database\Eloquent\Model|\Illuminate\Database\Eloquent\Builder|Ingredient|\Illuminate\Database\Query\Builder|null
    {
        return Ingredient::withCount('recipes')
            ->orderBy('recipes_count', 'desc')
            ->first();
    }

    /**
     * Retrieve the count of new users within the past week.
     *
     * @return int The count of new users.
     */
    public function getNewUsersCount(): int
    {
        $aWeekAgo = Carbon::now()->subWeek();

        return User::where('created_at', '>=', $aWeekAgo)
            ->count();
    }

    /**
     * Retrieve the latest three reviews.
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection The latest three reviews.
     */
    public function getLatestThreeReviews(): \Illuminate\Http\Resources\Json\AnonymousResourceCollection
    {
        return ReviewResource::collection(Review::latest()->take(3)->get());
    }
}
