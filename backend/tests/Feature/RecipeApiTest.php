<?php

namespace Tests\Feature;

use App\Models\Recipe;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class RecipeApiTest extends TestCase
{

    use RefreshDatabase;
    public function testCreateRecipe()
    {
        $user = User::factory()->create();

        $response = $this->postJson('/api/recipes', [
            'recipe_name' => 'New Recipe',
            'user_id' => 1, // 确保这个用户 ID 存在或使用工厂创建用户
            // 其他必要的字段...
        ]);

        $response->assertStatus(201)
            ->assertJson([
                'message' => 'Recipe created successfully',
                // 其他断言...
            ]);
    }

    public function testGetRecipes()
    {
        $response = $this->getJson('/api/recipes');

        $response->assertStatus(200)
            ->assertJson([
                // 对返回的 JSON 结构进行断言
            ]);
    }


}
