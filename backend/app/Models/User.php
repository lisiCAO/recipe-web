<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Hash;

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
class User extends Model
{
    use HasFactory;

    // 指定关联到模型的数据库表
    protected $table = 'users';

    // 指定主键
    protected $primaryKey = 'user_id';

    //如果不实用自动增长的整数作为主键 ID，需要设置以下属性
    // public $incrementing =false;

    // 如果不希望 Eloquent 自动管理created_at 和 updated_at 时间戳，设置为 false
    public $timestamps = true;

    // 可以批量赋值的属性
    protected $fillable = ['first_name', 'last_name', 'email', 'password', 'profile_image_path', 'category'];

    // 隐藏属性
    protected $hidden =['password'];

    // 日期字段的存储格式
    protected function serializeDate(\DateTimeInterface $date): string
    {
        return $date->format('Y-m-d H:i:s');
    }


    //密码修改器： 在保存到数据库前自动加密
    public function setPasswordAttribute($value): void
    {
        if($value){
            $this->attributes['password'] = Hash::make($value);
        }
    }

    public function recipe(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Recipe::class, 'user_id');
    }

    public function reviews(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Review::class, 'user_id');
    }
}
