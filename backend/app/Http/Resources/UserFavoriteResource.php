<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class UserFavoriteResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->favorite_id,
            'user' => [
                'id' => $this->user->user_id,
                'name' => $this->user->first_name . ' ' . $this->user->last_name,
                // 其他用户信息...
            ],
            'recipe' => [
                'id' => $this->recipe->recipe_id,
                'name' => $this->recipe->recipe_name,
                'description' => $this->recipe->description,
                // 其他食谱信息...
            ],
            // 可以根据需要添加更多字段或相关模型数据
        ];
    }
}
