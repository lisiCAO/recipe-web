<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserListResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->user_id,
            'user_name' => $this->first_name . ' ' . $this->last_name,
            'email' => $this->email,
            'category' => $this->category,
            'createdAt' => $this->created_at,
        ];
    }
}
