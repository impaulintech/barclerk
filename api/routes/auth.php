<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Auth\SignUpController;
use Illuminate\Support\Facades\Route;


Route::group(['prefix' => '/v1'], function () {
  Route::post('/sign-in', [AuthController::class, 'store']);
  Route::post('/sign-up', [SignUpController::class, 'store']);
});

Route::group(['middleware' => 'auth:sanctum', 'prefix' => '/v1'], function() {
  Route::get('/auth', [AuthController::class, 'index']);
  Route::post('/sign-out', [AuthController::class, 'destroy']);
});
