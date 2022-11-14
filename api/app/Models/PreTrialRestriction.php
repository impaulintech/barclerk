<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PreTrialRestriction extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function clients()
    {
        return $this->hasManyThrough(Client::class, ClientPreTrialRestriction::class, 'pre_trial_restriction_id', 'id', 'id', 'client_id');
    }
}
