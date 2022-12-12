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
            'client_name' => $this->client_name,
            'matter_name' => $this->matter_name,
            'phone_number' => $this->phone_number,
            'postal_address' => $this->postal_address,
            'contribution' => $this->contribution,
            'email' => $this->email,
            'court' => $this->court,
            'pre_trial_restriction_location_or_address' => $this->whenLoaded('clientPreTrialRestriction'),
            'pre_trial_restriction' => new PreTrialRestrictionResource($this->whenLoaded('preTrialRestriction')),
            'charges' => ChargeResource::collection($this->whenLoaded('charges')),
        ];
    }
}
