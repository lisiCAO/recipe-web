<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
/**
 * Represents an ingredient in the recipe.
 *
 * @property int $ingredient_id The unique identifier of the ingredient.
 * @property string $name The name of the ingredient.
 * @property string $img_path The path to the image of the ingredient.
 * @property string $description The description of the ingredient.
 * @property \Illuminate\Support\Carbon $created_at The timestamp when the ingredient was created.
 * @property \Illuminate\Support\Carbon $updated_at The timestamp when the ingredient was last updated.
 *
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Ingredient newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Ingredient newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Ingredient query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Ingredient whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Ingredient whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Ingredient whereImgPath($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Ingredient whereIngredientId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Ingredient whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Ingredient whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Ingredient withPivot($columns)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Ingredient withTimestamps()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Ingredient belongsToMany($related, $table = null, $foreignKey = null, $relatedKey = null, $relation = null)
 */
/**
 * Class Ingredient
 *
 * Represents an ingredient in the application.
 */
class Ingredient extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'ingredients';

    /**
     * The primary key associated with the table.
     *
     * @var string
     */
    protected $primaryKey = 'ingredient_id';

    /**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
    public $timestamps = true; // If set to false, the created_at and updated_at columns will not be managed by Eloquent.

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'img_path',
        'description'
    ];

    /**
     * Prepare a date for array / JSON serialization.
     *
     * @param  \DateTimeInterface  $date
     * @return string
     */
    protected function serializeDate(\DateTimeInterface $date)
    {
        return $date->format('Y-m-d H:i:s');
    }

    /**
     * Get the recipes that use this ingredient.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function recipes(): \Illuminate\Database\Eloquent\Relations\BelongsToMany
    {
        return $this->belongsToMany(Recipe::class, 'recipe_ingredients', 'ingredient_id', 'recipe_id')
            ->withPivot('quantity', 'measurement_unit');
    }
}
