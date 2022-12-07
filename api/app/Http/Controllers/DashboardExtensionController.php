<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\Grant;

class DashboardExtensionController extends Controller
{
    public function __invoke(Client $client, Grant $grant)
    {
        return $client->dashboardExtension($grant);
    }
}
