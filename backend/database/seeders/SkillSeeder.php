<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SkillSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('skills')->insert([
            [
                'id' => 1,
                'candidate_id' => 1,
                'name' => 'Ngôn ngữ lập trình',
                'proficiency' => 0,
                'description' => 'C, Java, PHP, ReactJS, TypeScript'
            ],
            [
                'id' => 2,
                'candidate_id' => 1,
                'name' => 'Cơ sở dữ liệu',
                'proficiency' => 3,
                'description' => 'MySQL, PostGreSQL'
            ],
            [
                'id' => 3,
                'candidate_id' => 2,
                'name' => 'Ngôn ngữ lập trình',
                'proficiency' => 0,
                'description' => 'C, Java, PHP, Laravel, SpringBoot'
            ],
            [
                'id' => 4,
                'candidate_id' => 2,
                'name' => 'Cơ sở dữ liệu',
                'proficiency' => 3,
                'description' => 'MySQL, PostGreSQL, NoSQL'
            ],

        ]);
    }
}
