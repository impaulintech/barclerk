<?php

use App\Http\Controllers\ClientController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['middleware' => 'auth:sanctum', 'prefix' => '/'], function () {
  Route::get('/', function () {
    return response()->json([
      "message" => "You are at the root of this api",
      "version" => "/v1"
    ]);
  });
  Route::get('/v1', function () {
    return response()->json([
      "message" => "You are at the version 1 of this api",
      "more" => "api documentation"
    ]);
  });

  Route::apiResource('client', ClientController::class)->only(['index', 'store']);
});


require __DIR__ . '/user/auth.php';
require __DIR__ . '/user/user.php';
