<?php

namespace App\Http\Controllers;

use App\Http\Requests\GrantRequest;
use App\Models\Grant;
use App\Models\Client;

class GrantController extends Controller
{
    public function index(Client $client)
    {
        return $client->displayGrants();
    }

    public function store(GrantRequest $request, Client $client)
    {
        return $client->addGrant($request);
    }

    public function show(Client $client, Grant $grant)
    {
        return $grant->displayGrant();
    }

    public function update(GrantRequest $request, Client $client, Grant $grant)
    {
        return $grant->updateGrant($request);
    }

    public function destroy(Client $client, Grant $grant)
    {
        return $grant->deleteGrant();
    }
}
