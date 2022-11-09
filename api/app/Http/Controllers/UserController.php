<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Routing\Controller;
use App\Http\Resources\UserResource;
use App\Http\Requests\UpdateUserRequest; 


class UserController extends Controller
{
  public function index()
  { 
    return UserResource::collection(User::get());
  }
 
  public function show(User $user)
  {
    return response()->json($user);
  }

  public function update(UpdateUserRequest $request)
  {
    auth()->user()->updateOrFail($request->validated());
    return response()->json(auth()->user());
  }
}
