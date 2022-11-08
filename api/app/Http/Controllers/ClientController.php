<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Http\Requests\Client\StoreClientRequest;
use App\Utils\ChargeUtils;
use Exception;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

class ClientController extends Controller
{
  public function store(StoreClientRequest $request)
  {
    DB::beginTransaction();

    try {
      $client = auth()->user()->clients()->create($request->except(['charges']));
      $client->charges()->createMany(ChargeUtils::splitCharges($request->charges));
      DB::commit();

      return $client;
    } catch (Exception $e) {
      DB::rollBack();
      return response()->json([
        'error' => $e->getMessage(),
      ], Response::HTTP_INTERNAL_SERVER_ERROR);
    }
  }
}
