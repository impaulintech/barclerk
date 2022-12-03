<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class TimeEntryResource extends JsonResource
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
            'date' => $this->date,
            'description' => $this->description,
            'hours' => $this->hours,
            'amount' => $this->amount,
            'extension' => new GrantResource($this->whenLoaded('grant')),
            'type' => new ClauseTypeResource($this->whenLoaded('type'))
        ];
    }
}
