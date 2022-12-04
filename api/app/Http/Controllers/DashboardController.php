<?php

namespace App\Http\Controllers;

use App\Http\Resources\DashboardResource;
use App\Models\Client;

class DashboardController extends Controller
{
    public function __invoke(Client $client)
    {
        return new DashboardResource(Client::with([
            'preTrialRestriction',
            'matterStatus',
            'courtAppearances' => function ($query) {
                $query->latest();
            },
            'clientPreTrialRestriction',
            'charges',
            'grants'
        ])->findOrFail($client->id));
    }
}
