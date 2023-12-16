<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

/**
 * App\Models\Recipe
 *
 * @property int $recipe_id The ID of the recipe.
 * @property string $recipe_name The name of the recipe.
 * @property int $user_id The ID of the user who created the recipe.
 * @property int|null $cooking_time The cooking time of the recipe in minutes.
 * @property string|null $step_instruction The step-by-step instructions for preparing the recipe.
 * @property string|null $description The description of the recipe.
 * @property string|null $recipe_image_path The file path of the recipe image.
 * @property Carbon|null $created_at The timestamp when the recipe was created.
 * @property Carbon|null $updated_at The timestamp when the recipe was last updated.
 * @property-read Collection<int, \App\Models\Ingredient> $ingredients The collection of ingredients used in the recipe.
 * @property-read int|null $ingredients_count The count of ingredients used in the recipe.
 * @property-read Collection<int, \App\Models\Review> $reviews The collection of reviews for the recipe.
 * @property-read int|null $reviews_count The count of reviews for the recipe.
 * @property-read User $user The user who created the recipe.
 * @method static \Database\Factories\RecipeFactory factory($count = null, $state = []) Creates a new recipe factory instance.
 * @method static \Illuminate\Database\Eloquent\Builder|Recipe newModelQuery() Creates a new query builder for the model.
 * @method static \Illuminate\Database\Eloquent\Builder|Recipe newQuery() Creates a new query builder for the model.
 * @method static \Illuminate\Database\Eloquent\Builder|Recipe query() Creates a new query builder for the model.
 * @method static \Illuminate\Database\Eloquent\Builder|Recipe whereCookingTime($value) Adds a where clause for the cooking time.
 * @method static \Illuminate\Database\Eloquent\Builder|Recipe whereCreatedAt($value) Adds a where clause for the creation timestamp.
 * @method static \Illuminate\Database\Eloquent\Builder|Recipe whereDescription($value) Adds a where clause for the description.
 * @method static \Illuminate\Database\Eloquent\Builder|Recipe whereRecipeId($value) Adds a where clause for the recipe ID.
 * @method static \Illuminate\Database\Eloquent\Builder|Recipe whereRecipeImagePath($value) Adds a where clause for the recipe image path.
 * @method static \Illuminate\Database\Eloquent\Builder|Recipe whereRecipeName($value) Adds a where clause for the recipe name.
 * @method static \Illuminate\Database\Eloquent\Builder|Recipe whereStepInstruction($value) Adds a where clause for the step instruction.
 * @method static \Illuminate\Database\Eloquent\Builder|Recipe whereUpdatedAt($value) Adds a where clause for the update timestamp.
 * @method static \Illuminate\Database\Eloquent\Builder|Recipe whereUserId($value) Adds a where clause for the user ID.
 * @mixin \Eloquent
 */

class Recipe extends Model
{
    use HasFactory;

    protected $table = 'recipes';
    protected $primaryKey = 'recipe_id';
    public $timestamps = true;

    protected $fillable = [
        'recipe_name',
        'user_id',
        'cooking_time',
        'step_instruction',
        'description',
        'recipe_image_path'
    ];

    protected function serializeDate(\DateTimeInterface $date)
    {
        return $date->format('Y-m-d H:i:s');
    }

    public function user(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function ingredients(): \Illuminate\Database\Eloquent\Relations\BelongsToMany
    {
        return $this->belongsToMany(Ingredient::class, 'recipe_ingredients', 'recipe_id', 'ingredient_id')
            ->withPivot('quantity', 'measurement_unit');
    }

    public function reviews(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Review::class, 'recipe_id');
    }

}
