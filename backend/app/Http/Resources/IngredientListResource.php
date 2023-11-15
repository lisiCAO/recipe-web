<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class IngredientListResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->ingredient_id,
            'name' => $this->name,
            'image_path' =>$this->img_path,
            'description' =>$this->description,
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at
        ];
    }
}