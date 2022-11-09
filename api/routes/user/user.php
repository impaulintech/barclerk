<?php

use App\Http\Controllers\Auth\UpdatePasswordController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

Route::group(['middleware' => 'auth:sanctum', 'prefix' => '/v1'], function () {
  Route::group(['prefix' => 'user'], function () {
    Route::get('/', [UserController::class, 'index']);
    Route::get('/{user}', [UserController::class, 'show']);
    Route::post('/change-password', [UpdatePasswordController::class, 'store']);
  });
});
