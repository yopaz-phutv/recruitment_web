<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class JobApplyingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('job_applying')->insert([
            [
                'id' => 1,
                'job_id' => 10,
                'candidate_id' => 201,
                'resume_link' => 'https://drive.google.com/file/d/15sktoevlJ6TaEGcfUSRZlyz8fPaXsbX5/view?usp=drive_link',
                'skill_text' => null,
                'status' => 'BROWSING_INTERVIEW',
                'interview_round' => 1,
                'created_at' => Carbon::now()->subDays(3),
                'updated_at' => Carbon::now()->subDays(3),
            ],
            [
                'id' => 2,
                'job_id' => 10,
                'candidate_id' => 202,
                'resume_link' => 'https://drive.google.com/file/d/15sktoevlJ6TaEGcfUSRZlyz8fPaXsbX5/view?usp=drive_link',
                'skill_text' => null,
                'status' => 'BROWSING_INTERVIEW',
                'interview_round' => 1,
                'created_at' => Carbon::now()->subDays(2),
                'updated_at' => Carbon::now()->subDays(2),
            ],
            [
                'id' => 3,
                'job_id' => 10,
                'candidate_id' => 203,
                'resume_link' => 'https://drive.google.com/file/d/15sktoevlJ6TaEGcfUSRZlyz8fPaXsbX5/view?usp=drive_link',
                'skill_text' => null,
                'status' => 'BROWSING_INTERVIEW',
                'interview_round' => 1,
                'created_at' => Carbon::now()->subDays(3),
                'updated_at' => Carbon::now()->subDays(3),
            ],
            [
                'id' => 4,
                'job_id' => 10,
                'candidate_id' => 204,
                'resume_link' => 'https://drive.google.com/file/d/15sktoevlJ6TaEGcfUSRZlyz8fPaXsbX5/view?usp=drive_link',
                'skill_text' => null,
                'status' => 'BROWSING_INTERVIEW',
                'interview_round' => 2,
                'created_at' => Carbon::now()->subDays(1),
                'updated_at' => Carbon::now()->subDays(1),
            ],
            [
                'id' => 5,
                'job_id' => 10,
                'candidate_id' => 205,
                'resume_link' => 'https://drive.google.com/file/d/15sktoevlJ6TaEGcfUSRZlyz8fPaXsbX5/view?usp=drive_link',
                'skill_text' => null,
                'status' => 'BROWSING_INTERVIEW',
                'interview_round' => 2,
                'created_at' => Carbon::now()->subDays(2),
                'updated_at' => Carbon::now()->subDays(2),
            ],
            [
                'id' => 6,
                'job_id' => 10,
                'candidate_id' => 206,
                'resume_link' => 'https://drive.google.com/file/d/15sktoevlJ6TaEGcfUSRZlyz8fPaXsbX5/view?usp=drive_link',
                'skill_text' => null,
                'status' => 'BROWSING_INTERVIEW',
                'interview_round' => 2,
                'created_at' => Carbon::now()->subDays(3),
                'updated_at' => Carbon::now()->subDays(3),
            ],
            [
                'id' => 7,
                'job_id' => 10,
                'candidate_id' => 207,
                'resume_link' => 'https://drive.google.com/file/d/15sktoevlJ6TaEGcfUSRZlyz8fPaXsbX5/view?usp=drive_link',
                'skill_text' => null,
                'status' => 'PASSED',
                'interview_round' => 2,
                'created_at' => Carbon::now()->subDays(3),
                'updated_at' => Carbon::now()->subDays(3),
            ],
            [
                'id' => 8,
                'job_id' => 10,
                'candidate_id' => 208,
                'resume_link' => 'https://drive.google.com/file/d/15sktoevlJ6TaEGcfUSRZlyz8fPaXsbX5/view?usp=drive_link',
                'skill_text' => null,
                'status' => 'PASSED',
                'interview_round' => 2,
                'created_at' => Carbon::now()->subDays(2),
                'updated_at' => Carbon::now()->subDays(2),
            ],
            [
                'id' => 9,
                'job_id' => 11,
                'candidate_id' => 209,
                'resume_link' => 'https://drive.google.com/file/d/15sktoevlJ6TaEGcfUSRZlyz8fPaXsbX5/view?usp=drive_link',
                'skill_text' => null,
                'status' => 'WAITING',
                'interview_round' => null,
                'created_at' => Carbon::now()->subDays(4),
                'updated_at' => Carbon::now()->subDays(4),
            ],
            [
                'id' => 10,
                'job_id' => 11,
                'candidate_id' => 210,
                'resume_link' => 'https://drive.google.com/file/d/15sktoevlJ6TaEGcfUSRZlyz8fPaXsbX5/view?usp=drive_link',
                'skill_text' => null,
                'status' => 'WAITING',
                'interview_round' => null,
                'created_at' => Carbon::now()->subDays(3),
                'updated_at' => Carbon::now()->subDays(3),
            ],
            // 
            [
                'id' => 11,
                'job_id' => 11,
                'candidate_id' => 211,
                'resume_link' => 'https://drive.google.com/file/d/15sktoevlJ6TaEGcfUSRZlyz8fPaXsbX5/view?usp=drive_link',
                'skill_text' => null,
                'status' => 'WAITING',
                'interview_round' => null,
                'created_at' => Carbon::now()->subDays(4),
                'updated_at' => Carbon::now()->subDays(4),
            ],
            [
                'id' => 12,
                'job_id' => 11,
                'candidate_id' => 212,
                'resume_link' => 'https://drive.google.com/file/d/15sktoevlJ6TaEGcfUSRZlyz8fPaXsbX5/view?usp=drive_link',
                'skill_text' => null,
                'status' => 'BROWSING_INTERVIEW',
                'interview_round' => 1,
                'created_at' => Carbon::now()->subDays(2),
                'updated_at' => Carbon::now()->subDays(2),
            ],
            [
                'id' => 13,
                'job_id' => 11,
                'candidate_id' => 213,
                'resume_link' => 'https://drive.google.com/file/d/15sktoevlJ6TaEGcfUSRZlyz8fPaXsbX5/view?usp=drive_link',
                'skill_text' => null,
                'status' => 'BROWSING_INTERVIEW',
                'interview_round' => 1,
                'created_at' => Carbon::now()->subDays(1),
                'updated_at' => Carbon::now()->subDays(1),
            ],
            [
                'id' => 14,
                'job_id' => 11,
                'candidate_id' => 214,
                'resume_link' => 'https://drive.google.com/file/d/15sktoevlJ6TaEGcfUSRZlyz8fPaXsbX5/view?usp=drive_link',
                'skill_text' => null,
                'status' => 'BROWSING_INTERVIEW',
                'interview_round' => 2,
                'created_at' => Carbon::now()->subDays(3),
                'updated_at' => Carbon::now()->subDays(3),
            ],
            [
                'id' => 15,
                'job_id' => 11,
                'candidate_id' => 215,
                'resume_link' => 'https://drive.google.com/file/d/15sktoevlJ6TaEGcfUSRZlyz8fPaXsbX5/view?usp=drive_link',
                'skill_text' => null,
                'status' => 'BROWSING_INTERVIEW',
                'interview_round' => 2,
                'created_at' => Carbon::now()->subDays(3),
                'updated_at' => Carbon::now()->subDays(3),
            ],
            [
                'id' => 16,
                'job_id' => 11,
                'candidate_id' => 216,
                'resume_link' => 'https://drive.google.com/file/d/15sktoevlJ6TaEGcfUSRZlyz8fPaXsbX5/view?usp=drive_link',
                'skill_text' => null,
                'status' => 'PASSED',
                'interview_round' => 2,
                'created_at' => Carbon::now()->subDays(4),
                'updated_at' => Carbon::now()->subDays(4),
            ],
            [
                'id' => 17,
                'job_id' => 11,
                'candidate_id' => 217,
                'resume_link' => 'https://drive.google.com/file/d/15sktoevlJ6TaEGcfUSRZlyz8fPaXsbX5/view?usp=drive_link',
                'skill_text' => null,
                'status' => 'PASSED',
                'interview_round' => 2,
                'created_at' => Carbon::now()->subDays(2),
                'updated_at' => Carbon::now()->subDays(2),
            ],
            //
            [
                'id' => 18,
                'job_id' => 12,
                'candidate_id' => 218,
                'resume_link' => 'https://drive.google.com/file/d/15sktoevlJ6TaEGcfUSRZlyz8fPaXsbX5/view?usp=drive_link',
                'skill_text' => null,
                'status' => 'WAITING',
                'interview_round' => null,
                'created_at' => Carbon::now()->subDays(1),
                'updated_at' => Carbon::now()->subDays(1),
            ],
            [
                'id' => 19,
                'job_id' => 12,
                'candidate_id' => 219,
                'resume_link' => 'https://drive.google.com/file/d/15sktoevlJ6TaEGcfUSRZlyz8fPaXsbX5/view?usp=drive_link',
                'skill_text' => null,
                'status' => 'WAITING',
                'interview_round' => null,
                'created_at' => Carbon::now()->subDays(3),
                'updated_at' => Carbon::now()->subDays(3),
            ],
            [
                'id' => 20,
                'job_id' => 12,
                'candidate_id' => 220,
                'resume_link' => 'https://drive.google.com/file/d/15sktoevlJ6TaEGcfUSRZlyz8fPaXsbX5/view?usp=drive_link',
                'skill_text' => null,
                'status' => 'WAITING',
                'interview_round' => null,
                'created_at' => Carbon::now()->subDays(3),
                'updated_at' => Carbon::now()->subDays(3),
            ],
            [
                'id' => 21,
                'job_id' => 12,
                'candidate_id' => 221,
                'resume_link' => 'https://drive.google.com/file/d/15sktoevlJ6TaEGcfUSRZlyz8fPaXsbX5/view?usp=drive_link',
                'skill_text' => null,
                'status' => 'BROWSING_INTERVIEW',
                'interview_round' => 1,
                'created_at' => Carbon::now()->subDays(2),
                'updated_at' => Carbon::now()->subDays(2),
            ],
            [
                'id' => 22,
                'job_id' => 12,
                'candidate_id' => 222,
                'resume_link' => 'https://drive.google.com/file/d/15sktoevlJ6TaEGcfUSRZlyz8fPaXsbX5/view?usp=drive_link',
                'skill_text' => null,
                'status' => 'BROWSING_INTERVIEW',
                'interview_round' => 1,
                'created_at' => Carbon::now()->subDays(2),
                'updated_at' => Carbon::now()->subDays(2),
            ],
            [
                'id' => 23,
                'job_id' => 12,
                'candidate_id' => 223,
                'resume_link' => 'https://drive.google.com/file/d/15sktoevlJ6TaEGcfUSRZlyz8fPaXsbX5/view?usp=drive_link',
                'skill_text' => null,
                'status' => 'BROWSING_INTERVIEW',
                'interview_round' => 2,
                'created_at' => Carbon::now()->subDays(4),
                'updated_at' => Carbon::now()->subDays(4),
            ],
            [
                'id' => 24,
                'job_id' => 12,
                'candidate_id' => 224,
                'resume_link' => 'https://drive.google.com/file/d/15sktoevlJ6TaEGcfUSRZlyz8fPaXsbX5/view?usp=drive_link',
                'skill_text' => null,
                'status' => 'BROWSING_INTERVIEW',
                'interview_round' => 2,
                'created_at' => Carbon::now()->subDays(3),
                'updated_at' => Carbon::now()->subDays(3),
            ],
            [
                'id' => 25,
                'job_id' => 12,
                'candidate_id' => 225,
                'resume_link' => 'https://drive.google.com/file/d/15sktoevlJ6TaEGcfUSRZlyz8fPaXsbX5/view?usp=drive_link',
                'skill_text' => null,
                'status' => 'PASSED',
                'interview_round' => 2,
                'created_at' => Carbon::now()->subDays(1),
                'updated_at' => Carbon::now()->subDays(1),
            ],
            [
                'id' => 26,
                'job_id' => 10,
                'candidate_id' => 226,
                'resume_link' => 'https://drive.google.com/file/d/15sktoevlJ6TaEGcfUSRZlyz8fPaXsbX5/view?usp=drive_link',
                'skill_text' => null,
                'status' => 'PASSED',
                'interview_round' => 2,
                'created_at' => Carbon::now()->subDays(3),
                'updated_at' => Carbon::now()->subDays(3),
            ],
        ]);
    }
}