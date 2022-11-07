<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Auth\SignUpController;
use App\Http\Controllers\Auth\ForgotPasswordController;


Route::group(['prefix' => '/v1'], function () {
  Route::post('/sign-in', [AuthController::class, 'store']);
  Route::post('/sign-up', [SignUpController::class, 'store']);

  Route::post('/forgot-password', [ForgotPasswordController::class, 'forgot'])->name('password.forgot');
  Route::get('/redirect', [ForgotPasswordController::class, 'redirect'])->name('password.reset');
  Route::post('/reset-password', [ForgotPasswordController::class, 'reset']);
});

Route::group(['middleware' => 'auth:sanctum', 'prefix' => '/v1'], function() {
  Route::get('/auth', [AuthController::class, 'index']);
  Route::post('/sign-out', [AuthController::class, 'destroy']);
});
