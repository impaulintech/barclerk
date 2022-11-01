<?php

namespace App\Http\Controllers\Auth;
 
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\SignUpRequest;
use App\Models\User;
use App\Http\Resources\UserResource;

class SignUpController extends Controller
{
  public function store(SignUpRequest $request)
  {
    $user = User::create([
      'first_name' => $request->first_name,
      'last_name' => $request->last_name,
      'email' => $request->email,
      'password' => bcrypt($request->password),
    ]);
    $token = $user->createToken('access-token')->plainTextToken;   

    return response()->json([
      'user' => new UserResource(User::findOrFail($user->id)),
      'token' => $token
    ]);
  }
}
