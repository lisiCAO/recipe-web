<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RecipeDetailResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->recipe_id,
            'name' => $this->recipe_name,
            'cookingTime' => $this->cooking_time,
            'instructions' => $this->step_instruction,
            'imagePath' => $this->recipe_image_path,
            'createdAt' => $this->created_at,
            'createdBy' => $this->user->last_name,
        ];
    }
}
