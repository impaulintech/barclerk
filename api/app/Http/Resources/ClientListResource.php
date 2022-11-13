<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ClientListResource extends JsonResource
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
            'clientName' => $this->client_name,
            'contribution' => $this->contribution,
            'preTrialRestriction' => new PreTrialRestrictionResource($this->whenLoaded('preTrialRestriction')),
            'status' => new MatterStatusResource($this->whenLoaded('matterStatus')),
            'extension' => '22W005912/2',
            'totalPrepUsed' => '$27',
            'totalFundUsed' => '50%',
            'remainingFund' => '13%',
            'nextCourtDate' => '26 October 2022',
        ];
    }
}
