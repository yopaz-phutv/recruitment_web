<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Employer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AdminController extends Controller
{
    public function getEmployerList()
    {
        $employers =
            Employer::with('locations')
            ->join('users', 'user_id', '=', 'users.id')
            ->where('is_accepted', 1)
            ->select('employers.*', 'email', DB::raw('users.created_at as register_time '), 'is_active')
            ->orderByDesc('register_time')
            ->paginate(10);

        return response()->json($employers);
    }
    public function getEmployerRequest()
    {
        $employers =
            Employer::with('locations')
            ->join('users', 'user_id', '=', 'users.id')
            ->where('is_accepted', 0)
            ->select('employers.*', 'email', DB::raw('users.created_at as register_time'))
            ->orderByDesc('register_time')
            ->paginate(10);

        return response()->json($employers);
    }
}
