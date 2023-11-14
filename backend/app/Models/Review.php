<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Review
 *
 * @property int $review_id
 * @property int $recipe_id
 * @property string $comment
 * @property string $rating
 * @property string $created_date
 * @property int $user_id
 * @property-read \App\Models\Recipe $recipe
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder|Review newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Review newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Review query()
 * @method static \Illuminate\Database\Eloquent\Builder|Review whereComment($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Review whereCreatedDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Review whereRating($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Review whereRecipeId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Review whereReviewId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Review whereUserId($value)
 * @mixin \Eloquent
 */
class Review extends Model
{
    use HasFactory;


    protected $table = 'reviews';
    protected $primaryKey = 'review_id';
    public $timestamps = true;

    protected $fillable = [
        'recipe_id',
        'comment',
        'rating',
        'user_id'
    ];

    protected function serializeDate(\DateTimeInterface $date)
    {
        return $date->format('Y-m-d H:i:s');
    }

    public function recipe(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Recipe::class, 'recipe_id');
    }

    public function user(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }


}
