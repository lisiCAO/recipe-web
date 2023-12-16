<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RecipeListResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->recipe_id,
            'name' => $this->recipe_name,
            'createdAt' => Carbon::parse($this->created_at)->format('Y-m-d H:i:s'),
            'updatedAt' => Carbon::parse($this->updated_at)->format('Y-m-d H:i:s'),
            'createdBy' =>$this->user->first_name . ' ' . $this->user->last_name,
        ];
    }
}
