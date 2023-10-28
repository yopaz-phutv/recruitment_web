<?php

namespace App\Http\Controllers;

use App\Models\Candidate;
use App\Models\CandidateMessage;
use App\Models\Employer;
use App\Models\Job;
use Carbon\Carbon;
use Illuminate\Database\Query\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redis;

class EmployerController extends Controller
{
    public function index()
    {
        return Employer::all();
    }

    public function show($id)
    {
        $employer = Employer::find($id);
        if ($employer) {
            return $employer;
        } else {
            return response()->json([
                'message' => 'resource not found'
            ], 404);
        }
    }

    public function destroy($id)
    {
        if (Employer::find($id))
            Employer::destroy($id);
        else return response()->json(['message' => 'resource not found']);
    }

    public function getHotList()
    {
        $res = Employer::where('is_hot', 1)->take(5)->get();
        for ($i = 0; $i < count($res); $i++) {
            $job_num = Job::where('employer_id', $res[$i]['id'])->count();
            $res[$i]['job_num'] = $job_num;
        }

        return response()->json($res);
    }

    public function search(Request $request)
    {
        $keyw = $request->query('keyword');
        $companies = Employer::whereRaw('LOWER(name) LIKE ?', ['%' . strtolower($keyw) . '%'])->get();
        //dd($companies);
        return $companies;
    }

    public function getComJobs($id)
    {

        $jobs = Employer::join('jobs', 'employers.id', '=', 'employer_id')
            ->where([
                ['employers.id', '=', $id],
                ['jobs.is_active', '=', 1]
            ])
            ->select('jobs.*', DB::raw(
                'DATE_FORMAT(jobs.created_at, "%d/%m/%Y") as postDate,
                 DATE_FORMAT(jobs.expire_at, "%d/%m/%Y") as deadline'
            ))
            ->get();
        for ($i = 0; $i < count($jobs); $i++) {
            $res = DB::table('job_location')
                ->join('locations', 'location_id', '=', 'locations.id')
                ->where('job_id', $jobs[$i]->id)
                ->pluck('locations.name');
            //convert $res from array to string to send back frontend
            $location = array2String($res);
            $jobs[$i]['location'] = $location;
        }
        return $jobs;
    }

    public function getCandidateList(Request $req)
    {
        $job_ids = Job::where('employer_id', '=', $req->id)->pluck('id');

        $keyword = $req->query('keyword'); //search by name, email, applied job of candidate

        if ($req->status == 0 || $req->status == 1) $status = [0, 1]; //for unapproved candidates
        else if ($req->status == 2) $status = [2]; //for approved candidates

        $candidates = DB::table('job_applying')
            ->join('jobs', 'job_id', '=', 'jobs.id')
            ->join('candidates', 'candidate_id', '=', 'candidates.id')
            ->whereIn('status', $status)
            ->whereIn('job_id', $job_ids)
            ->when($keyword != null, function ($query) use ($keyword) {
                return $query->where(function ($query2) use ($keyword) {
                    $query2->whereRaw('LOWER(jname) LIKE ?', ['%' . strtolower($keyword) . '%'])
                        ->orWhereraw('LOWER(candidates.email) LIKE ?', ['%' . strtolower($keyword) . '%'])
                        ->orWhereraw("LOWER(CONCAT(lastname, ' ', firstname)) LIKE ?", ['%' . strtolower($keyword) . '%']);
                });
            })
            ->selectRaw('job_applying.*, candidates.*, jobs.id, jobs.jname,
                        DATE_FORMAT(job_applying.created_at, "%d/%m/%Y %H:%i") as appliedTime')
            ->orderByDesc('job_applying.created_at')
            ->get();

        return response()->json($candidates);
    }

    public function processApplying(Request $req)
    {
        $currentTime = Carbon::now();
        DB::table('job_applying')
            ->where([
                ['job_id', '=', $req->job_id],
                ['candidate_id', '=', $req->candidate_id]
            ])
            ->update([
                'status' => $req->request_type,
                'updated_at' => $currentTime
            ]);
        if ($req->request_type != 1) {
            $com_name = Employer::where('user_id', '=', Auth::user()->id)->value('name');
            $currentTime = Carbon::parse($currentTime)->format('H:i d/m/Y');

            if ($req->request_type == 2) {
                $content = 'Bạn đã được nhận vào vị trí ';
            } else {
                $content = 'Bạn đã bị từ chối khỏi vị trí ';
            }
            $content = $content . $req->jname . ', ' . $com_name . ', lúc ' . $currentTime;

            $redis = Redis::connection();
            $redis->publish('application_result', $content);

            DB::table('candidate_messages')->insert([
                [
                    'candidate_id' => $req->candidate_id,
                    'job_id' => $req->job_id,
                    'content' => $content,
                ]
            ]);
        }

        return response()->json("Updated successfully");
    }
    public function getJobList(Request $req)
    {
        $keyword = $req->query('keyword');
        $jobs = Job::with(['industries', 'locations'])
            ->join('jtypes', 'jtype_id', '=', 'jtypes.id')
            ->join('jlevels', 'jlevel_id', '=', 'jlevels.id')
            ->where('employer_id', '=', $req->id)
            ->when($keyword != null, function ($query) use ($keyword) {
                return $query->where(function ($query2) use ($keyword) {
                    $query2->whereRaw('LOWER(jname) LIKE ?', ['%' . strtolower($keyword) . '%'])
                        ->orWhereraw('LOWER(jtypes.name) LIKE ?', ['%' . strtolower($keyword) . '%'])
                        ->orWhereraw('LOWER(jlevels.name) LIKE ?', ['%' . strtolower($keyword) . '%']);
                });
            })
            ->selectRaw('jobs.*, jtypes.name as jtype_name, jlevels.name as jlevel_name,
                        DATE_FORMAT(jobs.created_at ,"%d/%m/%Y %H:%i") as postTime,
                        DATE_FORMAT(expire_at ,"%d/%m/%Y") as deadline')
            ->orderByDesc('jobs.created_at')
            ->get();

        return response()->json($jobs);
    }
    public function changeJobStatus(Request $req)
    {
        Job::where('id', $req->job_id)
            ->update(['is_active' => $req->status]);

        return response()->json('Updated successfully');
    }
}
