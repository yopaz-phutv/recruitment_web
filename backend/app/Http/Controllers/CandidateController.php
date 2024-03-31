<?php

namespace App\Http\Controllers;

use App\Models\Candidate;
use App\Models\Job;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class CandidateController extends Controller
{
    public function getCurrent()
    {
        $id = Auth::user()->id;
        $candidate = Candidate::find($id);

        return $candidate;
    }
    public function getCurrentAvatar()
    {
        $candidate = Candidate::find(Auth::user()->id);

        return Storage::get($candidate->avatar);
    }

    public function update(Request $req)
    {
        $id = Auth::user()->id;
        $candidate = Candidate::find($id);

        $candidate->lastname = $req->lastname;
        $candidate->firstname = $req->firstname;
        $candidate->gender = $req->gender;
        $candidate->dob = $req->dob;
        $candidate->phone = $req->phone;
        $candidate->email = $req->email;
        $candidate->address = $req->address;
        $candidate->link = $req->link;
        $candidate->objective = $req->objective;

        $file = $req->file('image');
        if ($file) {
            //delete old avatar image:
            foreach (['png', 'jpg', 'jpeg', ''] as $ext) {
                $path = 'candidate_avatars/avatar_' . $id . '_0.' . $ext;
                if (Storage::fileExists($path))
                    Storage::delete($path);
            }
            $filename = 'avatar_' . $id . '_0';
            $path = uploadFile2GgDrive($file, 'candidate_avatars', $filename, ['isText' => true]);
            $candidate->avatar = $path;
        }
        if ($req->delete_img) {
            $candidate->avatar = NULL;
        }
        $candidate->save();

        return response()->json('updated successfully');
    }

    public function getAppliedJobs($id)
    {
        $jobs = Job::join('job_applying', 'id', '=', 'job_id')
            ->join('employers', 'employer_id', '=', 'employers.id')
            ->where('candidate_id', $id)
            ->select(
                'jobs.id',
                'jname',
                'employers.name',
                'cv_link',
                'status',
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
            return response()->json(['value' => true]);
        } else {
            return response()->json(['value' => false]);
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
