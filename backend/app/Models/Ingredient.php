<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Ingredient
 *
 * @property int $ingredient_id
 * @property string $name
 * @property string|null $img_path
 * @property string|null $description
 * @property string|null $created_at
 * @property string|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Recipe> $recipes
 * @property-read int|null $recipes_count
 * @method static \Illuminate\Database\Eloquent\Builder|Ingredient newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Ingredient newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Ingredient query()
 * @method static \Illuminate\Database\Eloquent\Builder|Ingredient whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Ingredient whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Ingredient whereImgPath($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Ingredient whereIngredientId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Ingredient whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Ingredient whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Ingredient extends Model
{
    use HasFactory;

    protected $table = 'ingredients';
    protected $primaryKey = 'ingredient_id';
    public $timestamps = true; // 如果为 false 则 created_at 和 updated_at 字段不会被更新

    protected $fillable = [
        'name',
        'img_path',
        'description'
    ];

    protected function serializeDate(\DateTimeInterface $date)
    {
        return $date->format('Y-m-d H:i:s');
    }

    public function recipes(): \Illuminate\Database\Eloquent\Relations\BelongsToMany
    {
    return $this->belongsToMany(Recipe::class, 'recipe_ingredients', 'ingredient_id', 'recipe_id')
        ->withPivot('quantity', 'measurement_unit');
    }

}
