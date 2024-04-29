<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Employer;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AdminController extends Controller
{
    public function getEmployerList(Request $req)
    {
        $employers =
            Employer::with('locations')
            ->join('users', 'user_id', '=', 'users.id')
            ->where([
                ['is_accepted', '=', $req->is_accepted],
                ['is_denied', '=', $req->is_denied]
            ])
            ->select('employers.*', 'email', DB::raw('users.created_at as register_time '), 'is_active')
            ->orderByDesc('register_time')
            ->paginate(10);

        return response()->json($employers);
    }
    public function handleRequest(Request $req)
    {
        $id = $req->id;
        $type = $req->type;

        if ($type == 0) {
            $update_data = ['is_denied' => 1];
        } else if ($type == 1) {
            $update_data = ['is_active' => 1, 'is_accepted' => 1];
        }
        User::where('id', $id)->update($update_data);

        return response()->json('updated successfully');
    }
    public function changeAccActiveStatus(Request $req)
    {
        $curr_is_active = User::where('id', $req->user_id)->pluck('is_active')[0];
        User::where('id', $req->user_id)->update(['is_active' => 1 - $curr_is_active]);

        return response()->json('updated successfully');
    }
}
