<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\Pivot;

class ClientPreTrialRestriction extends Pivot
{
    use HasFactory;

    protected $table = 'client_pre_trial_restriction';
}
