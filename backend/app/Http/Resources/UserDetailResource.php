<?php

namespace App\Http\Resources;
use Carbon\Carbon;
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
            'firstName' => $this->first_name,
            'lastName' => $this->last_name,
            'name' => $this->first_name . ' ' . $this->last_name,
            'email' => $this->email,
            'imagePath' => $this->profile_image_path,
            'category' => $this->category,
            'createdAt' => Carbon::parse($this->created_at)->format('Y-m-d H:i:s'),
            'updatedAt' => Carbon::parse($this->updated_at)->format('Y-m-d H:i:s')
        ];
    }
}

