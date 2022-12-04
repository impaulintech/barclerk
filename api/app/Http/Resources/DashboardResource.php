<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class DashboardResource extends JsonResource
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
            'matter_name' => $this->matter_name,
            'client_name' => $this->client_name,
            'contribution' => $this->contribution,
            'court' => $this->court,
            'charges' => ChargeResource::collection($this->whenLoaded('charges')),
            'pre_trial_restriction' => new PreTrialRestrictionResource($this->whenLoaded('preTrialRestriction')),
            'extensions' => GrantResource::collection($this->whenLoaded('grants')),
            'pre_trial_restriction_location_or_address' => $this->whenLoaded('clientPreTrialRestriction'),
            'matter_status' => new MatterStatusResource($this->whenLoaded('matterStatus')),
            'court_appearances' => CourtAppearanceResource::collection($this->whenLoaded('courtAppearances'))
        ];
    }
}
