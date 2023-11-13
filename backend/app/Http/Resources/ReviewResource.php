<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ReviewResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->review_id,
            'recipe_name' => $this->recipe->recipe_name, // 假设您的 Recipe 模型有 recipe_name 字段
            'user_name' => $this->user->first_name . ' ' . $this->user->last_name,
            'comment' => $this->comment,
            'rating' => $this->rating,
            'created_at' => $this->created_at,
        ];
    }
}
