<?php

namespace App\Models;


use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Database\Eloquent\Factories\HasFactory;
/**
 * App\Models\User
 *
 * @property int $user_id
 * @property string $first_name
 * @property string $last_name
 * @property string $email
 * @property string $password
 * @property string|null $profile_image_path
 * @property string|null $category
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Recipe> $recipe
 * @property-read int|null $recipe_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Review> $reviews
 * @property-read int|null $reviews_count
 * @method static \Database\Factories\UserFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder|User newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|User newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|User query()
 * @method static \Illuminate\Database\Eloquent\Builder|User whereCategory($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereCreatedDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereFirstName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereLastLoginDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereLastName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User wherePassword($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereProfileImagePath($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereUserId($value)
 * @mixin \Eloquent
 */
/**
 * Class User
 * 
 * Represents a user in the application.
 * This class extends the Authenticatable class and implements the JWTSubject interface.
 */
class User extends Authenticatable implements JWTSubject
{
    use Notifiable, HasFactory;

    // database table name
    protected $table = 'users';

    // primary key
    protected $primaryKey = 'user_id';

    // If the primary key is not an integer, set the $incrementing property to false
    // public $incrementing =false;

    // If the primary key is not an integer, set the $keyType property to string
    public $timestamps = true;

    // fillable attributes
    protected $fillable = ['first_name', 'last_name', 'email', 'password', 'profile_image_path', 'category'];

    // hidden attributes
    protected $hidden =['password'];

    /**
     * Get the format for storing dates in the database.
     *
     * @param  \DateTimeInterface  $date
     * @return string
     */
    protected function serializeDate(\DateTimeInterface $date): string
    {
        return $date->format('Y-m-d H:i:s');
    }

    /**
     * Set the password attribute.
     * Automatically encrypts the password before saving it to the database.
     *
     * @param  string  $value
     * @return void
     */
    public function setPasswordAttribute($value): void
    {
        if($value){
            $this->attributes['password'] = Hash::make($value);
        }
    }

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier() {
        return $this->getKey();
    }
    
    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims() {
        return [];
    }
    

    /**
     * Get the recipes associated with the user.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function recipe(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Recipe::class, 'user_id');
    }

    /**
     * Get the reviews associated with the user.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function reviews(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Review::class, 'user_id');
    }
}
