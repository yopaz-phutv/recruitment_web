<?php

namespace App\Http\Controllers;

use App\Events\NotifyCandidateEvent;
use App\Events\SendRecommend2Candidate;
use App\Models\CandidateBookmark;
use App\Models\CandidateMessage;
use App\Models\Employer;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class CandidateBookmarkController extends Controller
{
    public function index(Request $req)
    {
        $employer_id = Auth::user()->id;
        $job_id = $req->job_id;
        $is_send_noti = $req->is_send_noti;

        $bookmarks = CandidateBookmark::join('candidates', 'candidate_id', '=', 'candidates.id')
            ->join('resumes', 'public_resume_id', '=', 'resumes.id')
            ->where([
                ['employer_id', '=', $employer_id],
                ['is_deleted', '=', 0],
                ['is_send_noti', '=', $is_send_noti]
            ])
            ->when($job_id !== null, function ($query) use ($job_id) {
                return $query->join('candidate_bookmark_detail', 'candidate_bookmarks.id', '=', 'candidate_bookmark_id')
                    ->where('job_id', $job_id);
            })
            ->select(
                'candidate_bookmarks.id',
                DB::raw('resumes.id AS resume_id'),
                'candidate_bookmarks.candidate_id',
                'fullname',
                'resumes.phone',
                'resumes.email',
                DB::raw('candidate_bookmarks.created_at AS saved_time'),
                'is_send_noti',
                'resumes.resume_link'
            )
            ->latest('saved_time')
            ->get();

        for ($i = 0; $i < count($bookmarks); $i++) {
            $bookmark = $bookmarks[$i];
            $jobs = DB::table('candidate_bookmark_detail')
                ->join('jobs', 'job_id', '=', 'jobs.id')
                ->where('candidate_bookmark_id', $bookmark->id)
                ->select('jobs.id', 'jname')
                ->get();
            $bookmarks[$i]['jobs'] = $jobs;
        }
        return response()->json($bookmarks);
    }

    public function create(Request $req)
    {
        $user = Auth::user();
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

        return response()->json($candidate_bookmark_id, 201);
    }

    public function update(Request $req)
    {
        $bookmark_id = $req->id;

        CandidateBookmark::where('id', $bookmark_id)
            ->update(['updated_at' => Carbon::now()]);

        DB::table('candidate_bookmark_detail')
            ->where('candidate_bookmark_id', $bookmark_id)
            ->delete();

        if ($req->has('job_none')) {
            $insert_data[] = [
                'candidate_bookmark_id' => $bookmark_id,
                'job_id' => 0
            ];
        } else {
            foreach ($req->job_ids as $job_id) {
                $insert_data[] = [
                    'candidate_bookmark_id' => $bookmark_id,
                    'job_id' => $job_id
                ];
            }
        }
        DB::table('candidate_bookmark_detail')->insert($insert_data);

        return response()->json('updated successfully');
    }

    public function destroy(Request $req)
    {
        $employer_id = Auth::user()->id;

        if ($req->delete_by == 'id') {
            if ($req->is_send_noti == 1) {
                CandidateBookmark::where('id', $req->id)
                    ->update(['is_deleted' => 1]);
            } else {
                DB::table('candidate_bookmark_detail')
                    ->where('candidate_bookmark_id', $req->id)
                    ->delete();
                CandidateBookmark::destroy($req->id);
            }
        } else if ($req->delete_by == 'candidate_id') {
            CandidateBookmark::where([
                ['employer_id', '=', $employer_id],
                ['candidate_id', '=', $req->candidate_id]
            ])
                ->update(['is_deleted' => 1]);
        }

        return response()->json('deleted succesfully');
    }


    public function sendRecommend(Request $req)
    {
        $jobs = $req->jobs;
        $bookmark_id = $req->id;
        $candidate_id = $req->candidate_id;
        $resume_id = $req->resume_id;

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
