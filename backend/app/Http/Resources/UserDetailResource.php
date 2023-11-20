<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserDetailResource extends JsonResource
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
            'firsName' => $this->first_name,
            'lastName' => $this->last_name,
            'email' => $this->email,
            'imagePath' => $this->profile_image_path,
            'category' => $this->category,
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at
        ];
    }
}

