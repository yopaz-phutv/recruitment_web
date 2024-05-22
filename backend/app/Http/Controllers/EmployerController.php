<?php

namespace App\Http\Controllers;

use App\Events\NotifyCandidateEvent;
use App\Events\SendRecommend2Candidate;
use App\Models\Candidate;
use App\Models\CandidateBookmark;
use App\Models\CandidateMessage;
use App\Models\Employer;
use App\Models\Job;
use Carbon\Carbon;
use Exception;
use Illuminate\Database\Query\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

// use Illuminate\Support\Facades\Redis;

class EmployerController extends Controller
{
    public function index(Request $request)
    {
        $keyw = $request->query('keyword');
        $query = Employer::query()
            ->join('users', 'user_id', '=', 'users.id')
            ->where('users.is_active', 1);
        if ($keyw) {
            $query->whereRaw('LOWER(name) LIKE ?', ['%' . strtolower($keyw) . '%']);
        }
        $res = $query->paginate(6);

        return response()->json($res);
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
    public function update(Request $req)
    {
        $employer_id = Auth::user()->id;
        $update_data = $req->except(['location_ids', 'logo_file', 'delete_logo', 'image_file', 'delete_image']);

        if ($req->hasFile('logo_file')) {
            $logo_file = $req->file('logo_file');
            //delete old logo:
            foreach (['png', 'jpg', 'jpeg'] as $ext) {
                $path = 'employer_logos/logo_' . $employer_id . '.' . $ext;
                if (Storage::fileExists($path))
                    Storage::delete($path);
            }
            $filename = 'logo_' . $employer_id . '.' . $logo_file->getClientOriginalExtension();
            $path = uploadFile2GgDrive($logo_file, 'employer_logos', $filename, ['isImage' => true]);
            $update_data['logo'] = $path;
        }
        if ($req->hasFile('image_file')) {
            $image_file = $req->file('image_file');
            //delete old image:
            foreach (['png', 'jpg', 'jpeg'] as $ext) {
                $path = 'employer_images/image_' . $employer_id . '.' . $ext;
                if (Storage::fileExists($path))
                    Storage::delete($path);
            }
            $filename = 'image_' . $employer_id . '.' . $image_file->getClientOriginalExtension();
            $path = uploadFile2GgDrive($image_file, 'employer_images', $filename, ['isImage' => true]);
            $update_data['image'] = $path;
        }
        if ($req->has('delete_logo')) $update_data['logo'] = null;
        if ($req->has('delete_image')) $update_data['image'] = null;

        //update employers table:
        Employer::find($employer_id)->update($update_data);

        //update employer_location table:
        $location_ids = explode(',', $req->location_ids);
        $employer_location_data = [];
        for ($i = 0; $i < count($location_ids); $i++) {
            $employer_location_data[$i] = [
                'employer_id' => $employer_id,
                'location_id' => $location_ids[$i]
            ];
        }
        DB::table('employer_location')
            ->where('employer_id', $employer_id)
            ->delete();
        DB::table('employer_location')->insert($employer_location_data);

        return response()->json('updated successfully');
    }
    public function getDetail()
    {
        $id = Auth::user()->id;
        $employer = Employer::with(['user', 'locations'])->find($id);

        return response()->json($employer);
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
        $job_ids = Job::where('employer_id', '=', Auth::user()->id)->pluck('id');

        $keyword = $req->query('keyword'); //search by name, email, applied job of candidate

        if ($req->status == 'WAITING' || $req->status == 'BROWSING_RESUME') {
            $status = ['WAITING', 'BROWSING_RESUME'];
        } else $status[] = $req->status;

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
        $currentTime = Carbon::parse(Carbon::now())->format('H:i d/m/Y');
        $company = Employer::where('user_id', '=', Auth::user()->id)->value('name');
        $msgName = "";

        if ($req->actType == "VIEWED") $nextStatus = "BROWSING_RESUME";
        else if ($req->actType == "ACCEPT") {
            if ($req->step == "step1") {
                $nextStatus = "BROWSING_INTERVIEW";
                $msgName = "Hồ sơ được chấp nhận, vị trí ";
            } else if ($req->step == "step2") {
                $nextStatus = "PASSED";
                $msgName = "Chúc mừng bạn đã được nhận, vị trí ";
            }
        } else if ($req->actType == "REJECT") {
            if ($req->step == "step1") {
                $nextStatus = "RESUME_FAILED";
                $msgName = "Hồ sơ bị loại, vị trí ";
            } else if ($req->step == "step2") {
                $nextStatus = "INTERVIEW_FAILED";
                $msgName = "Phỏng vấn bị loại, vị trí ";
            }
        }
        $msgName = $msgName . $req->jname . ', ' . $company . ', lúc ' . $currentTime;
        //update:
        DB::table('job_applying')
            ->where([
                ['job_id', '=', $req->job_id],
                ['candidate_id', '=', $req->candidate_id]
            ])
            ->update([
                'status' => $nextStatus,
                'updated_at' => Carbon::now(),
            ]);
        if ($req->actType != "VIEWED") {
            CandidateMessage::create(
                [
                    'candidate_id' => $req->candidate_id,
                    'job_id' => $req->job_id,
                    'name' => $msgName,
                    'title' => $req->title,
                    'content' => $req->content,
                ]
            );
            event(new NotifyCandidateEvent($msgName, $req->candidate_id));
        }

        return response()->json("Updated successfully");
    }
    public function getJobList(Request $req)
    {
        $employer_id = Auth::user()->id;
        $keyword = $req->query('keyword');

        $jobs = Job::with(['industries', 'locations'])
            ->join('jtypes', 'jtype_id', '=', 'jtypes.id')
            ->join('jlevels', 'jlevel_id', '=', 'jlevels.id')
            ->where('employer_id', '=', $employer_id)
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
    public function findCandidates(Request $req)
    {
        $query = Candidate::query()
            ->whereNotNull('public_resume_id')
            ->join('resumes', 'public_resume_id', '=', 'resumes.id')
            ->join('locations', 'location_id', '=', 'locations.id');
        if ($req->has('location_ids')) {
            $query->whereIn('location_id', $req->location_ids);
        }
        if ($req->has('desired_industry_ids')) {
            $query->whereIn('desired_industry_id', $req->industry_ids);
        }
        if ($req->filled('jtype_id')) {
            $query->where('desired_jtype_id', $req->jtype_id);
        }
        if ($req->filled('jlevel_id')) {
            $query->where('desired_jlevel_id', $req->jlevel_id);
        }
        if ($req->filled('resumes.gender')) {
            $query->where('gender', $req->gender);
        }
        if ($req->filled('min_age')) {
            $query->whereRaw(
                'DATE_FORMAT(NOW(), "%Y") - DATE_FORMAT(resumes.dob, "%Y") BETWEEN ? AND ?',
                [$req->min_age, $req->max_age]
            );
        }
        if ($req->filled('job_yoe')) {
            if ($req->job_yoe > 5)
                $query->where('job_yoe', ">=", $req->job_yoe);
            else $query->where('job_yoe', $req->job_yoe);
        }
        if ($req->filled('skill_text')) {
            $query->whereRaw("MATCH(skill_text) AGAINST ('$req->skill_text' IN NATURAL LANGUAGE MODE)");
        }
        $resumes = $query->select(
            'resumes.*',
            DB::raw('locations.name AS location'),
            'desired_job'
        )->paginate(9)->toArray();

        $employer_id = Auth::user()->id;
        for ($i = 0; $i < count($resumes['data']); $i++) {
            $resume = $resumes['data'][$i];
            $res = DB::table('candidate_bookmarks')->where([
                ['employer_id', '=', $employer_id],
                ['candidate_id', '=', $resume['candidate_id']]
            ])->get()->toArray();
            $resumes['data'][$i]['is_saved'] = count($res) > 0;
        }

        return response()->json($resumes);
    }
    public function handleSavingCandidate(Request $req)
    {
        $user = Auth::user();

        $delete_record_id = CandidateBookmark::where([
            ['employer_id', $user->id],
            ['candidate_id', $req->candidate_id]
        ])->first()->id ?? null;

        if ($delete_record_id) {
            DB::table('candidate_bookmark_detail')
                ->where('candidate_bookmark_id', $delete_record_id)
                ->delete();
            CandidateBookmark::destroy($delete_record_id);
        }

        if (!$req->has('delete')) {
            $insert_data = [];

            $candidate_bookmark_id = CandidateBookmark::create([
                'employer_id' => $user->id,
                'candidate_id' => $req->candidate_id,
            ])->id;

            if ($req->has('job_none')) {
                $insert_data[] = [
                    'candidate_bookmark_id' => $candidate_bookmark_id,
                    'job_id' => 0
                ];
            } else {
                foreach ($req->job_ids as $job_id) {
                    $insert_data[] = [
                        'candidate_bookmark_id' => $candidate_bookmark_id,
                        'job_id' => $job_id
                    ];
                }
            }

            DB::table('candidate_bookmark_detail')->insert($insert_data);

            return response()->json('created successfully', 201);
        }
        return response()->json('deleted successfully');
    }
    public function getSavedCandidates(Request $req)
    {
        $employer_id = Auth::user()->id;
        $job_id = $req->job_id;

        $resumes = CandidateBookmark::join('candidates', 'candidate_id', '=', 'candidates.id')
            ->join('resumes', 'public_resume_id', '=', 'resumes.id')
            ->where('employer_id', $employer_id)
            ->when($job_id !== null, function ($query) use ($job_id) {
                return $query->join('candidate_bookmark_detail', 'candidate_bookmarks.id', '=', 'candidate_bookmark_id')
                    ->where('job_id', $job_id);
            })
            ->select(
                'resumes.id',
                'candidate_bookmarks.candidate_id',
                DB::raw('candidate_bookmarks.id AS candidate_bookmark_id'),
                'fullname',
                'resumes.phone',
                'resumes.email',
                DB::raw('candidate_bookmarks.created_at AS saved_time'),
                'is_send_noti',
                'resumes.resume_link'
            )
            ->latest('saved_time')
            ->get();

        for ($i = 0; $i < count($resumes); $i++) {
            $resume = $resumes[$i];
            $jobs = DB::table('candidate_bookmark_detail')
                ->join('jobs', 'job_id', '=', 'jobs.id')
                ->where('candidate_bookmark_id', $resume->candidate_bookmark_id)
                ->select('jobs.id', 'jname')
                ->get();
            $resumes[$i]['jobs'] = $jobs;
        }

        return response()->json($resumes);
    }
    public function sendRecommendToCandidate(Request $req)
    {
        $jobs = $req->jobs;
        $bookmark_id = $req->candidate_bookmark_id;
        $candidate_id = $req->candidate_id;
        $resume_id = $req->id;

        $employer = Employer::find(Auth::user()->id);

        $noti_name = "<div>Bạn nhận được gợi ý việc làm từ nhà tuyển dụng <strong>{$employer->name}</strong></div>";
        $content = "<div><strong>{$employer->name}</strong> đã xem hồ sơ công khai của bạn và nhận thấy bạn phù hợp với vị trí mà họ đang tuyển dụng:";
        $frontend_app_base_url = config('FRONTEND_APP_BASE_URL');
        foreach ($jobs as $job) {
            $content .= "<div><a href='{$frontend_app_base_url}/jobs/{$job['id']}'>{$job['jname']}</a></div>";
        }
        $content .= "</div>";

        event(new SendRecommend2Candidate($bookmark_id, $resume_id));

        CandidateMessage::create([
            'candidate_id' => $candidate_id,
            'name' => $noti_name,
            'content' => $content
        ]);
        event(new NotifyCandidateEvent($noti_name, $candidate_id));

        return response()->json('sent successfully');
    }
}
