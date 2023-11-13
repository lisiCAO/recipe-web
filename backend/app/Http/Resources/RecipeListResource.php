<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RecipeListResource extends JsonResource
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
            'createdAt' => $this->created_at,
            'updatedAt' =>$this->updated_at,
            'createdBy' =>$this->user->last_name
        ];
    }
}
