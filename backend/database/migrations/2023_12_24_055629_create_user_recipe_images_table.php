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
        Schema::create('user_recipe_images', function (Blueprint $table) {
            $table->id('image_id');
            $table->unsignedBigInteger('recipe_id');
            $table->string('image_path', 255);
            $table->foreign('recipe_id')->references('recipe_id')->on('recipes')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_recipe_images');
    }
};
