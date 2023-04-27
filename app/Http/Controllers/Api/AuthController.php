<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
// import the classes of the requests
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use Laravel\Sanctum\HasApiTokens\createToken;


class AuthController extends Controller
{
    public function signup(SignupRequest $request)
    {
        $data = $request->validated();
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
        ]);

        $token = $user -> createToken('main')->plainTextToken;

        return response(compact('user', 'token'));
    }

    public function login(LoginRequest $request) //
    {
        // validates the request based on the criteria in the LoginRequest class
        $credentials = $request->validated();
        // if the validation fails, it will return a 422 status code
        // if the validation passes, it will return a 200 status code
        // Attempts to authenticate the user using the given credentials using the Auth facade and the attempt method which accepts an array of credentials and a boolean remember me value
        if(!Auth::attempt($credentials)) {
            return response([
                'message' => 'Invalid credentials'
            ], 422);
        }
        $user = Auth::user(); // assigns the authenticated user to the $user variable
        $token = $user->createToken('main')->plainTextToken; // creates a token for the user
        return response(compact('user', 'token')); // returns the user and the token
    }
}
