<?php

namespace App\Http\Resources;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
/**
 * Class UserListResource
 *
 * This class represents a resource for transforming a user into an array.
 */
class UserListResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param Request $request The request object.
     * @return array<string, mixed> The transformed user array.
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->user_id,
            'name' => $this->first_name . ' ' . $this->last_name,
            'email' => $this->email,
            'category' => $this->category,
            'createdAt' => Carbon::parse($this->created_at)->format('Y-m-d H:i:s'),
        ];
    }
}
