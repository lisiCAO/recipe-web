<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ReviewResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param Request $request The HTTP request object.
     * @return array<string, mixed> The transformed resource array.
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->review_id,
            'recipeName' => $this->recipe->recipe_name, // recipe_name is a column in the recipes table
            'userName' => $this->user->first_name . ' ' . $this->user->last_name,
            'comment' => $this->comment,
            'rating' => $this->rating,
            'location' => $this->user->location,
            'createdAt' => Carbon::parse($this->created_at)->format('Y-m-d H:i:s'),
        ];
    }
}
