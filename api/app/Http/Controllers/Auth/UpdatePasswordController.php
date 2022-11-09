<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdatePasswordRequest;

class UpdatePasswordController extends Controller
{
  public function store(UpdatePasswordRequest $request)
  {
    auth()->user()->update(['password' => bcrypt($request->newPassword)]);
    return response()->noContent();
  }
}
