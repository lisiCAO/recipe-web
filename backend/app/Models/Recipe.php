<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;


/**
 * App\Models\Recipe
 *
 * @property int $recipe_id
 * @property string $recipe_name
 * @property int $user_id
 * @property int|null $cooking_time
 * @property string|null $step_instruction
 * @property string|null $description
 * @property string|null $recipe_image_path
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property-read Collection<int, \App\Models\Ingredient> $ingredients
 * @property-read int|null $ingredients_count
 * @property-read Collection<int, \App\Models\Review> $reviews
 * @property-read int|null $reviews_count
 * @property-read User $user
 * @method static \Database\Factories\RecipeFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder|Recipe newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Recipe newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Recipe query()
 * @method static \Illuminate\Database\Eloquent\Builder|Recipe whereCookingTime($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Recipe whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Recipe whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Recipe whereRecipeId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Recipe whereRecipeImagePath($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Recipe whereRecipeName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Recipe whereStepInstruction($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Recipe whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Recipe whereUserId($value)
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
