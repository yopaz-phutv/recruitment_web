<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Activity;
use App\Models\Certificate;
use App\Models\Education;
use App\Models\Experience;
use App\Models\Other;
use App\Models\Prize;
use App\Models\Project;
use App\Models\Resume;
use App\Models\Skill;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class ResumeController extends Controller
{
    public function getByCurrentCandidate()
    {
        $res = Resume::where('candidate_id', Auth::user()->id)->get();

        return response()->json($res);
    }
    public function getById($id)
    {
        $resume = Resume::where('id', $id)
            ->with(['educations', 'experiences', 'projects', 'skills', 'certificates', 'prizes', 'activities', 'others'])
            ->first();
        $basicInfor = Resume::find($id);
        $resume['basicInfor'] = $basicInfor;

        return response()->json($resume);
    }
    public function getAvatar($id)
    {
        $resume = Resume::find($id);
        if (!empty($resume)) {
            if ($resume->avatar)
                return Storage::get($resume->avatar);
            else return response()->json(null);
        } else return response()->json(null);
    }
    public function create(Request $req)
    {
        $candidate_id = Auth::user()->id;
        $avatar_file = $req->file('avatar');
        $resume_file = $req->file('resume_file');
        $other_data = json_decode($req->otherData);
        $resume_fields = (array)$other_data->basicInfor;
        $resume_fields['candidate_id'] = $candidate_id;
        $avatar = $resume_fields['avatar'];
        unset($resume_fields['avatar']);

        $resume = Resume::create($resume_fields);
        $resume_id = $resume->id;
        //save avatar file content to gg drive
        $filename = 'avatar_' . $candidate_id . '_' . $resume_id;
        if ($avatar_file) {
            $path = uploadFile2GgDrive($avatar_file, 'candidate_avatars', $filename, ['isText' => true]);
            Resume::where('id', $resume_id)->update(['avatar' => $path]);
        } else if ($avatar) {
            $path = 'candidate_avatars/' . $filename;
            Storage::put($path, $avatar);
            Resume::where('id', $resume_id)->update(['avatar' => $path]);
        }
        //save resume file to gg drive
        if ($resume_file) {
            $filename = 'resume_' . $resume_id . '.png';
            $path = 'resumes/' . $filename;
            if (Storage::exists($path)) Storage::delete($path);
            $retPath = uploadFile2GgDrive($resume_file, 'resumes', $filename);
            Resume::where('id', $resume_id)->update(['resume_link' => $retPath]);
        }

        if ($resume) {
            if ($other_data->educations) {
                for ($i = 0; $i < count($other_data->educations); $i++) {
                    $education_fields = (array)$other_data->educations[$i];
                    $education_fields['id'] = Education::max('id') + 1;
                    $education_fields['candidate_id'] = $candidate_id;
                    $education_fields['resume_id'] = $resume_id;
                    Education::create($education_fields);
                }
            }
            if ($other_data->experiences) {
                for ($i = 0; $i < count($other_data->experiences); $i++) {
                    $experience_fields = (array)$other_data->experiences[$i];
                    $experience_fields['id'] = Experience::max('id') + 1;
                    $experience_fields['candidate_id'] = $candidate_id;
                    $experience_fields['resume_id'] = $resume_id;
                    Experience::create($experience_fields);
                }
            }
            if ($other_data->projects) {
                for ($i = 0; $i < count($other_data->projects); $i++) {
                    $project_fields = (array)$other_data->projects[$i];
                    $project_fields['id'] = Project::max('id') + 1;
                    $project_fields['candidate_id'] = $candidate_id;
                    $project_fields['resume_id'] = $resume_id;
                    Project::create($project_fields);
                }
            }
            if ($other_data->skills) {
                for ($i = 0; $i < count($other_data->skills); $i++) {
                    $skill_fields = (array)$other_data->skills[$i];
                    $skill_fields['id'] = Skill::max('id') + 1;
                    $skill_fields['candidate_id'] = $candidate_id;
                    $skill_fields['resume_id'] = $resume_id;
                    Skill::create($skill_fields);
                }
            }
            if ($other_data->certificates) {
                for ($i = 0; $i < count($other_data->certificates); $i++) {
                    $certificate_fields = (array)$other_data->certificates[$i];
                    $certificate_fields['id'] = Certificate::max('id') + 1;
                    $certificate_fields['candidate_id'] = $candidate_id;
                    $certificate_fields['resume_id'] = $resume_id;
                    Certificate::create($certificate_fields);
                }
            }
            if ($other_data->prizes) {
                for ($i = 0; $i < count($other_data->prizes); $i++) {
                    $prize_fields = (array)$other_data->prizes[$i];
                    $prize_fields['id'] = Prize::max('id') + 1;
                    $prize_fields['candidate_id'] = $candidate_id;
                    $prize_fields['resume_id'] = $resume_id;
                    Prize::create($prize_fields);
                }
            }
            if ($other_data->activities) {
                for ($i = 0; $i < count($other_data->activities); $i++) {
                    $activity_fields = (array)$other_data->activities[$i];
                    $activity_fields['id'] = Activity::max('id') + 1;
                    $activity_fields['candidate_id'] = $candidate_id;
                    $activity_fields['resume_id'] = $resume_id;
                    Activity::create($activity_fields);
                }
            }
            if ($other_data->others) {
                for ($i = 0; $i < count($other_data->others); $i++) {
                    $other_fields = (array)$other_data->others[$i];
                    $other_fields['id'] = Other::max('id') + 1;
                    $other_fields['candidate_id'] = $candidate_id;
                    $other_fields['resume_id'] = $resume_id;
                    Other::create($other_fields);
                }
            }
        }

        return response()->json("created successfully", 201);
    }
    public function update(Request $req)
    {
        $candidate_id = Auth::user()->id;
        $avatar_file = $req->file('avatar');
        $resume_file = $req->file('resume_file');
        $other_data = json_decode($req->otherData);
        $resume_fields = (array)$other_data->basicInfor;
        $resume_id = $other_data->resume_id;
        $avatar = $resume_fields['avatar'];
        unset($resume_fields['avatar']);

        //save avatar file content to gg drive
        $filename = 'avatar_' . $candidate_id . '_' . $resume_id;
        if ($avatar_file) {
            $path = uploadFile2GgDrive($avatar_file, 'candidate_avatars', $filename, ['isText' => true]);
            $resume_fields['avatar'] = $path;
        } else if ($avatar) {
            $path = 'candidate_avatars/' . $filename;
            Storage::put($path, $avatar);
            $resume_fields['avatar'] = $path;
        }
        //save resume file to gg drive
        if ($resume_file) {

            $filename = 'resume_' . $resume_id . '.png';
            $path = 'resumes/' . $filename;
            if (Storage::exists($path)) Storage::delete($path);
            $retPath = uploadFile2GgDrive($resume_file, 'resumes', $filename);
            Resume::where('id', $resume_id)->update(['resume_link' => $retPath]);
        }

        Resume::where('id', $resume_id)->update($resume_fields);

        if ($other_data->educations)
            foreach ($other_data->educations as $item) {
                Education::where('id', $item->id)->update((array)$item);
            }
        if ($other_data->experiences)
            foreach ($other_data->experiences as $item) {
                Experience::where('id', $item->id)->update((array)$item);
            }
        if ($other_data->projects)
            foreach ($other_data->projects as $item) {
                Project::where('id', $item->id)->update((array)$item);
            }
        if ($other_data->skills)
            foreach ($other_data->skills as $item) {
                Skill::where('id', $item->id)->update((array)$item);
            }
        if ($other_data->certificates)
            foreach ($other_data->certificates as $item) {
                Certificate::where('id', $item->id)->update((array)$item);
            }
        if ($other_data->prizes)
            foreach ($other_data->prizes as $item) {
                Prize::where('id', $item->id)->update((array)$item);
            }
        if ($other_data->activities)
            foreach ($other_data->activities as $item) {
                Activity::where('id', $item->id)->update((array)$item);
            }
        if ($other_data->others)
            foreach ($other_data->others as $item) {
                Other::where('id', $item->id)->update((array)$item);
            }

        return response()->json("updated successfully");
    }
    public function destroy($id)
    {
        Resume::findOrFail($id)->delete();
        Education::where('resume_id', $id)->delete();
        Experience::where('resume_id', $id)->delete();
        Project::where('resume_id', $id)->delete();
        Skill::where('resume_id', $id)->delete();
        Certificate::where('resume_id', $id)->delete();
        Prize::where('resume_id', $id)->delete();
        Activity::where('resume_id', $id)->delete();
        Other::where('resume_id', $id)->delete();

        return response()->json("deleted successfully");
    }
}
