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
            'recipeId' => $this->recipe->recipe_id,
            'name' => $this->recipe->recipe_name,
            'imagePath' => $this->recipe->recipe_image_path,
            'cookingTime' => $this->recipe->cooking_time,
            'stepInstruction' => $this->recipe->step_instruction,
            'description' => $this->recipe->description,
            // 可以根据需要添加更多字段或相关模型数据
        ];
    }
}
