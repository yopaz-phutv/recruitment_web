<?php

namespace App\Http\Controllers;

use App\Models\Candidate;
use App\Models\Job;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class CandidateController extends Controller
{
    public function show($id)
    {
        $candidate = Candidate::find($id);

        return response()->json($candidate);
    }
    public function getAppliedJobs($id)
    {
        $jobs = Job::join('job_applying', 'id', '=', 'job_id')
            ->join('employers', 'employer_id', '=', 'employers.id')
            ->where('candidate_id', $id)
            ->select(
                'jobs.id', 'jname', 'employers.name', 'cv_link', 'status',
                DB::raw('DATE_FORMAT(job_applying.created_at, "%d/%m/%Y") as postDate')
            )
            ->orderByDesc('job_applying.created_at')
            ->get();

        return response()->json($jobs);
    }
    public function getSavedJobs($id)
    {
        // $candidate_id = Auth::user()->id;
        $jobs = Job::with(['employer', 'locations'])
            ->join('saved_jobs', 'id', '=', 'job_id')
            ->where('candidate_id', $id)
            ->select('jobs.*', DB::raw('DATE_FORMAT(expire_at, "%d/%m/%Y") as deadline'))
            ->get();

        return response()->json($jobs);
    }
    public function checkJobSaved($job_id)
    {
        $candidate_id = Auth::user()->id;
        $res = DB::table('saved_jobs')->where([
            ['candidate_id', '=', $candidate_id],
            ['job_id', '=', $job_id]
        ])->exists();

        if ($res) {
            return response()->json(true);
        } else {
            return response()->json(false);
        }
    }
    public function processJobSaving(Request $req)
    {
        $candidate_id = Auth::user()->id;
        if ($req->status == true) {
            DB::table('saved_jobs')->insert([
                ['candidate_id' => $candidate_id, 'job_id' => $req->job_id]
            ]);
        } else if ($req->status == false) {
            DB::table('saved_jobs')->where([
                ['candidate_id', '=', $candidate_id],
                ['job_id', '=', $req->job_id]
            ])->delete();
        }

        return response()->json('Updated successfully');
    }
}
