<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        // Disable foreign key checks
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');

        // Truncate tables
        DB::table('users')->truncate();
        DB::table('ingredients')->truncate();
        DB::table('recipes')->truncate();
        DB::table('recipe_ingredients')->truncate();
        DB::table('reviews')->truncate();
        DB::table('user_recipe_images')->truncate();
        DB::table('user_favorites')->truncate();

        // Insert data

        // Example records for 'users' table
        DB::table('users')->insert([
            [
                'first_name' => 'Alice',
                'last_name' => 'M',
                'email' => 'alice@email.com',
                'password' => Hash::make('password'),
                'profile_image_path' => '/path/to/image1.jpg',
                'category' => 'admin',
                'bio' => 'Food blogger and recipe developer.',
                'location' => 'London, UK',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'first_name' => 'Bob',
                'last_name' => 'T',
                'email' => 'bob@email.com',
                'password' => Hash::make('password'),
                'profile_image_path' => '/path/to/image2.jpg',
                'category' => 'user',
                'bio' => 'Amateur cook with a love for pastries.',
                'location' => 'Paris, France',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()

            ],
            [
                'first_name' => 'Charlie',
                'last_name' => 'C',
                'email' => 'charlie@email.com',
                'password' => bcrypt('password'),
                'profile_image_path' => '/path/to/image3.jpg',
                'category' => 'user',
                'bio' => 'Experienced chef and food enthusiast.',
                'location' => 'New York, USA',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            // Add more user records as needed
        ]);

        // Insert data for 'ingredients' table
        DB::table('ingredients')->insert([
            [
                'name' => 'Tomato',
                'img_path' => '/path/to/tomato.jpg',
                'description' => 'A red juicy fruit used in cooking.',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'name' => 'Potato',
                'img_path' => '/path/to/potato.jpg',
                'description' => 'A starchy tuber, versatile in cooking.',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'name' => 'Onion',
                'img_path' => '/path/to/onion.jpg',
                'description' => 'A bulbous plant used to add flavor.',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            // Add more ingredient records as needed
        ]);

        // Insert data for 'recipes' table
        DB::table('recipes')->insert([
            [
                'recipe_name' => 'Tomato Soup',
                'user_id' => 1,
                'cooking_time' => 30,
                'step_instruction' => 'Step-by-step instructions for Tomato Soup.',
                'description' => 'A delicious tomato soup.',
                'recipe_image_path' => '/path/to/tomato_soup.jpg',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'recipe_name' => 'Potato Salad',
                'user_id' => 2,
                'cooking_time' => 20,
                'step_instruction' => 'Step-by-step instructions for Potato Salad.',
                'description' => 'A creamy potato salad.',
                'recipe_image_path' => '/path/to/potato_salad.jpg',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'recipe_name' => 'Onion Pie',
                'user_id' => 3,
                'cooking_time' => 45,
                'step_instruction' => 'Step-by-step instructions for Onion Pie.',
                'description' => 'A savory onion pie.',
                'recipe_image_path' => '/path/to/onion_pie.jpg',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            // Add more recipe records as needed
        ]);

        // Insert data for 'recipe_ingredients' table
        DB::table('recipe_ingredients')->insert([
            // Assuming each recipe uses all the ingredients
            // Example records for 'recipe_ingredients' table
            [
                'recipe_id' => 1,
                'ingredient_id' => 1,
                'quantity' => '2 cups',
                'measurement_unit' => 'Cup',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'recipe_id' => 1,
                'ingredient_id' => 2,
                'quantity' => '1 cup',
                'measurement_unit' => 'Cup',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'recipe_id' => 1,
                'ingredient_id' => 3,
                'quantity' => '0.5 cup',
                'measurement_unit' => 'Cup',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            // Add more recipe_ingredients records as needed
        ]);

        // Insert data for 'reviews' table
        DB::table('reviews')->insert([
            // Example records for 'reviews' table
            [
                'recipe_id' => 1,
                'comment' => 'Great taste!',
                'rating' => 4.5,
                'user_id' => 1,
                'created_at' => Carbon::now()
            ],
            [
                'recipe_id' => 1,
                'comment' => 'Loved it, but a bit salty.',
                'rating' => 4,
                'user_id' => 2,
                'created_at' => Carbon::now(),
            ],
            [
                'recipe_id' => 1,
                'comment' => 'Perfect for dinner.',
                'rating' => 5,
                'user_id' => 3,
                'created_at' => Carbon::now()
            ],
            // Add more review records as needed
        ]);

        DB::table('user_favorites')->insert([
            ['user_id' => 1, 'recipe_id' => 1, 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['user_id' => 1, 'recipe_id' => 2, 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            // 更多用户收藏记录
        ]);

        // 插入用户食谱图片数据
        DB::table('user_recipe_images')->insert([
            ['recipe_id' => 1, 'image_path' => '/path/to/image1.jpg', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['recipe_id' => 2, 'image_path' => '/path/to/image2.jpg', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            // 更多用户食谱图片记录
        ]);

        // 启用外键检查
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
    }
}
