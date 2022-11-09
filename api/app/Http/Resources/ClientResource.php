<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ClientResource extends JsonResource
{
  /**
   * Transform the resource into an array.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
   */
  public function toArray($request)
  {
    return [
      'id' => $this->id,
      'name' => $this->name,
      'email' => $this->email,
      'phone_number' => $this->phone_number,
      'postal_address' => $this->postal_number,
      'is_contribution_required' => $this->is_contribution_required,
      'charges' => ChargeResource::collection($this->whenLoaded('charges')),
      'court' => $this->court,
      'is_on_bail' => $this->is_on_bail,
      'location' => $this->location
    ];
  }
}
