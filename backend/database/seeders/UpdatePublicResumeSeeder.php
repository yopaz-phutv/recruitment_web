<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UpdatePublicResumeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for ($i = 1; $i <= 34; $i++) {
            DB::table('candidates')
                ->where('id', $i + 100)
                ->update(['public_resume_id' => $i]);
        }
    }
}
