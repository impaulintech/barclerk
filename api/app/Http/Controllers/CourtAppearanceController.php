<?php

namespace App\Http\Controllers;

use App\Http\Requests\CourtAppearanceRequest;
use App\Models\Client;
use App\Models\CourtAppearance;

class CourtAppearanceController extends Controller
{
    public function index(Client $client)
    {
        return $client->displayCourtAppearances();
    }   
    
    public function store(CourtAppearanceRequest $request, Client $client)
    {
        return $client->addCourtAppearance($request);
    }

    public function update(CourtAppearanceRequest $request, Client $client, CourtAppearance $court_appearance)
    {
        return $client->editCourtAppearance($request, $court_appearance);
    }
}
