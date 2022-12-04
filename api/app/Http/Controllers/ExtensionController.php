<?php

namespace App\Http\Controllers;

use App\Http\Resources\ExtensionResource;
use App\Models\Client;

class ExtensionController extends Controller
{
    public function __invoke(Client $client)
    {
        return ExtensionResource::collection($client->grants()->with('types')->get());
    }
}
