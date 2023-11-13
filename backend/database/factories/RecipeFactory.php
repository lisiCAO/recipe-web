<?php

namespace Database\Factories;

use App\Models\Recipe;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Recipe>
 */
class RecipeFactory extends Factory
{
    protected $model = Recipe::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'recipe_name' => $this->faker->sentence,
            'user_id' => User::factory(), // 这将自动创建一个 User 并使用其 ID
            'cooking_time' => $this->faker->numberBetween(10, 60), // 假设的烹饪时间
            'step_instruction' => $this->faker->paragraph,
            'description' => $this->faker->text,
            'recipe_image_path' => $this->faker->imageUrl(), // 假设的图片 URL
            // 添加其他字段...
        ];
    }
}
