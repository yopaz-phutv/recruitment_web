<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Candidate;
use App\Models\Skill;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SkillController extends Controller
{
    public function index()
    {
        $res = Skill::all();

        return response()->json($res);
    }

    public function getByCurrentCandidateProfile()
    {
        $candidate_id = Auth::user()->id;
        $res = Skill::where([
            ["candidate_id", $candidate_id],
            ["resume_id", null]
        ])->get();
        return response()->json($res);
    }
    public function getByCurCandResumeId($resume_id)
    {
        $candidate_id = Auth::user()->id;
        $res = Skill::where([
            ["candidate_id", $candidate_id],
            ["resume_id", $resume_id]
        ])->get();

        return response()->json($res);
    }
    // public function updateSkillText()
    // {
    //     $user_id = Auth::user()->id;
    //     $text = Candidate::join('skills', 'candidates.id', '=', 'candidate_id')
    //         ->where('user_id', $user_id)
    //         ->selectRaw("CONCAT_WS(' ', GROUP_CONCAT(' ', skills.description), GROUP_CONCAT(' ', skills.name)) AS skill_text")
    //         ->first()->skill_text;
    //     Candidate::where('user_id', $user_id)->update(['skill_text' => $text]);
    // }
    public function create(Request $req)
    {
        $candidate_id = Auth::user()->id;
        $proficiency = $req->proficiency;
        if (!$proficiency) $proficiency = 0;
        Skill::create([
            "candidate_id" => $candidate_id,
            "name" => $req->name,
            "proficiency" => $proficiency,
            "description" => $req->description,
        ]);
        // $this->updateSkillText();

        return response()->json("created successfully");
    }
    public function update(Request $req)
    {
        $update_fields = $req->all();
        Skill::where('id', $req->id)->update($update_fields);

        // $this->updateSkillText();

        return response()->json('updated successfully');
    }
    public function destroy($id)
    {
        Skill::findOrFail($id)->delete();

        return response()->json("deleted successfully");
    }
}
