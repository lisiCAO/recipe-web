<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('reviews', function (Blueprint $table) {
            $table->id('review_id');
            $table->unsignedBigInteger('recipe_id');
            $table->text('comment');
            $table->decimal('rating', 10, 2);
            $table->timestamp('created_date')->useCurrent();
            $table->unsignedBigInteger('user_id');

            // 添加外键约束
            $table->foreign('recipe_id')->references('recipe_id')->on('recipes')->onDelete('cascade');
            $table->foreign('user_id')->references('user_id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('reviews', function (Blueprint $table) {
            $table->dropForeign('reviews_recipe_id_foreign');
            $table->dropForeign('reviews_user_id_foreign');
        });

        Schema::dropIfExists('reviews');
    }
};
