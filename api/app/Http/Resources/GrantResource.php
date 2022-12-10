<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class GrantResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $totalFund = $this->totalFund();
        $remainingFunds = $this->remainingFunds();

        return [
            'id' => $this->id,
            'extension' => $this->extension,
            'date_effective' => $this->date_effective,
            'totalFund' => $totalFund,
            'remainingFunds' => $remainingFunds,
            'totalFundUsed' => round((($totalFund - ($remainingFunds)) / $totalFund), 2),
            'codes' => ClauseResource::collection($this->whenLoaded('codes'))
        ];
    }
}
