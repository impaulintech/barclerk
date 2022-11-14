<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Http\Resources\ClientListResource;
use App\Http\Requests\Client\StoreClientRequest;

class ClientController extends Controller
{
  public function index()
  {
    return ClientListResource::collection(Client::search(request('search_query'))->paginate(13));
  }

  public function store(StoreClientRequest $request)
  {
    return Client::addClient($request);
  }
}
