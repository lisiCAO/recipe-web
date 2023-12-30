<?php

namespace App\Http\Resources;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage; // Add this line to import the Storage class

/**
 * Class UserDetailResource
 *
 * This class represents a resource for transforming user details into an array.
 */
class UserDetailResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param Request $request The request object.
     * @return array<string, mixed> The transformed resource as an array.
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->user_id,
            'name' => $this->first_name . ' ' . $this->last_name,
            'imagePath' => $this->profile_image_path,
            'firstName' => $this->first_name,
            'lastName' => $this->last_name,
            'email' => $this->email,
            'category' => $this->category,
            'createdAt' => Carbon::parse($this->created_at)->format('Y-m-d H:i:s'),
            'updatedAt' => Carbon::parse($this->updated_at)->format('Y-m-d H:i:s')
        ];
    }
}

