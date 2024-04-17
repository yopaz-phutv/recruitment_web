<?php

namespace App\Http\Controllers\API;

use App\Events\UserRegister;
use App\Models\User;
use App\Models\Candidate;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Employer;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
//use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    public function __construct()
    {
        $this->middleware('jwt', ['except' => ['login', 'register']]);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        $credentials = $request->only('email', 'password');
        $token = Auth::attempt($credentials);

        $user = Auth::user();

        if (!$token || $user->role !== $request->role) { //check token và role của user
            return response()->json([
                'message' => 'Unauthorized',
            ], 401);
        }

        if ($request->role == 1) {
            $name = User::join('candidates', 'users.id', '=', 'user_id')
                ->where('users.id', $user->id)
                ->select('firstname', 'lastname')
                ->first();
            $user['name'] = $name;
        }

        return response()->json([
            'user' => $user,
            'authorization' => [
                'token' => $token,
                'type' => 'bearer',
            ]
        ]);
    }

    public function register(Request $request)
    {
        $request->validate([
            'email' => 'unique:users',
        ]);

        $user = User::create([
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
            'is_active' => 1
        ]);
        $user_infor = $request->except(['password']);
        $user_infor['id'] = $user->id;
        // update detail information:
        UserRegister::dispatch($user_infor);

        return response()->json('created successfully', 201);
    }

    public function me()
    {
        $user = Auth::user();
        if ($user->role == 2) {
            $user = User::with('employer')->find($user->id);
        }
        if ($user->role == 1) {
            $name = User::join('candidates', 'users.id', '=', 'user_id')
                ->where('users.id', $user->id)
                ->select('firstname', 'lastname')
                ->first();
            $user['name'] = $name;
        }
        if (!$user) {
            return response()->json([
                'message' => 'Unauthorized',
            ], 401);
        }

        return response()->json($user);
    }

    public function logout()
    {
        Auth::logout();
        return response()->json([
            'message' => 'Successfully logged out',
        ]);
    }

    public function refresh()
    {
        return response()->json([
            'user' => Auth::user(),
            'authorization' => [
                'token' => Auth::refresh(),
                'type' => 'bearer',
            ]
        ]);
    }
}
