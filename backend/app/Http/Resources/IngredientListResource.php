<?php

namespace App\Http\Resources;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
/**
 * Class IngredientListResource
 *
 * This class represents a resource for transforming an ingredient list into an array.
 */
class IngredientListResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param Request $request The request object.
     * @return array<string, mixed> The transformed array.
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->ingredient_id,
            'name' => $this->name,
            'createdAt' => Carbon::parse($this->created_at)->format('Y-m-d H:i:s'),
            'updatedAt' => Carbon::parse($this->updated_at)->format('Y-m-d H:i:s'),
        ];
    }
}
