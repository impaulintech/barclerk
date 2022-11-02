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
 
  public function show($user_id)
  {
    try {
      $user = User::findOrFail($user_id);
      return response()->json(['data' => $user], 200);
    } catch (\Throwable) {
      return response()->json([
        'message' => "The requested resource could not be found.", 
      ], 404);
    }
  }

  public function update(UpdateUserRequest $request)
  {
    try {
      auth()->user()->update($request->validated());
      return response()->json([
        "message" => "Updated successfully!"
      ], 201);
    } catch (\Throwable) {
      return response()->json([
        'message' => "There was an error on the server and the request could not be completed.",
      ], 500);
    }
  }
}
