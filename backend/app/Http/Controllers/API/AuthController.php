<?php

namespace App\Http\Controllers\API;

use App\Events\UserRegister;
use App\Models\User;
use App\Models\Candidate;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Employer;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
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

        $user_data = [
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
            'is_active' => 1,
        ];
        if ($request->role == 2) {
            $user_data['is_accepted'] = 0;
            $user_data['is_active'] = 0;
        }
        $user = User::create($user_data);

        // update detail information:
        if ($request['role'] == 1) { // candidate
            Candidate::create([
                'id' => $user['id'],
                'user_id' => $user['id'],
                'firstname' => $request['firstname'],
                'lastname' => $request['lastname'],
                'email' => $request['email']
            ]);
        } else if ($request['role'] == 2) { // employer
            $location_ids = $request['location_ids'];

            $employer_data = [
                'id' => $user->id,
                'user_id' => $user->id,
                'name' => $request['name'],
                'address' => $request['address'],
                'contact_name' => $request['contact_name'],
                'phone' => $request['phone'],
            ];
            if (isset($request['tax_code'])) {
                $employer_data['tax_code'] = $request['tax_code'];
            }
            if (isset($request['min_employees'])) {
                $employer_data['min_employees'] = $request['min_employees'];
            }
            if (isset($request['max_employees'])) {
                $employer_data['max_employees'] = $request['max_employees'];
            }

            Employer::create($employer_data);

            $employer_location_data = [];
            for ($i = 0; $i < count($location_ids); $i++) {
                $employer_location_data[$i] = [
                    'employer_id' => $user->id,
                    'location_id' => $location_ids[$i]
                ];
            }
            DB::table('employer_location')->insert($employer_location_data);
        }

        return response()->json('created successfully', 201);
    }

    public function me()
    {
        $user = Auth::user();

        if ($user->role == 1) {
            $name = User::join('candidates', 'users.id', '=', 'user_id')
                ->where('users.id', $user->id)
                ->select('firstname', 'lastname')
                ->first();
            $user['name'] = $name;
        } else if ($user->role == 2) {
            $user = User::with('employer')->find($user->id);
        }

        if (!$user) {
            return response()->json([
                'message' => 'Unauthorized',
            ], 401);
        } else return response()->json($user);
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
