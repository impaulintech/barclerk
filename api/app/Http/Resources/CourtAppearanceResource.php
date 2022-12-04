<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CourtAppearanceResource extends JsonResource
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
            'time' => $this->time,
            'court' => $this->court,
            'judicial_officer' => $this->judicial_officer,
            'next_court_date' => $this->next_court_date,
            'orders' => $this->orders,
            'other_notes' => $this->other_notes
        ];
    }
}
