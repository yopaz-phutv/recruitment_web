<?php

namespace App\Http\Controllers;

use App\Models\JobQuestion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class JobQuestionController extends Controller
{
    // public function index() {
    //     $list = JobQuestion::all();

    //     return response()->json($list);
    // }
    public function getByJobId($id)
    {
        $list = JobQuestion::where('job_id', $id)
            ->join('candidates', 'candidate_id', '=', 'candidates.id')
            ->select('job_questions.*', DB::raw("CONCAT_WS(' ', lastname, firstname) AS author"))
            ->orderByDesc('job_questions.created_at')
            ->get();

        return response()->json($list);
    }

    public function create(Request $req)
    {
        $cand_id = Auth::user()->id;
        $ques = $req->all();

        $ques['candidate_id'] = $cand_id;

        JobQuestion::create($ques);

        return response()->json("created successfully!");
    }

    public function update(Request $req)
    {
        JobQuestion::where('id', $req->id)
            ->update(['answer' => $req->answer]);

        return response()->json("created successfully!");
    }
}
