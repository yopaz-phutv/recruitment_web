<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CandidateSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('candidates')->insert([
            [
                'id' => 1,
                'user_id' => 1,
                'firstname' => 'van phu',
                'lastname' => 'tran',
                'gender' => 0,
                'dob' => '2001-01-08',
                'phone' => '0333333331',
                'email' => 'tranphudhak@gmail.com',
                'address' => 'Gia Lâm, Hà Nội',
                'location_id' => '24',
                'link' => 'https://github.com/tranphu033',
                'objective' => 'muc tieu',
                'desired_job' => 'Fullstack Web Developer',
                'desired_industry_id' => 2,
                'desired_jtype_id' => 1,
                'desired_jlevel_id' => 3,
                'desired_min_salary' => 3,
                'desired_max_salary' => 5,
                'job_yoe' => 1,
                'public_resume_id' => null
            ],
            [
                'id' => 2,
                'user_id' => 2,
                'firstname' => 'thoa',
                'lastname' => 'ngo',
                'gender' => 1,
                'dob' => '2002-02-09',
                'phone' => '0333333332',
                'email' => 'thoa@gmail.com',
                'address' => 'Ân Thi, Hưng Yên',
                'location_id' => '31',
                'link' => 'kkk',
                'objective' => 'muc tieu',
                'desired_job' => 'Fullstack Web Developer',
                'desired_industry_id' => 2,
                'desired_jtype_id' => 1,
                'desired_jlevel_id' => 3,
                'desired_min_salary' => 3,
                'desired_max_salary' => 5,
                'job_yoe' => 1,
                'public_resume_id' => null
            ],
            [
                'id' => 3,
                'user_id' => 3,
                'firstname' => 'ngoc diep',
                'lastname' => 'nguyen',
                'gender' => 1,
                'dob' => '2005-02-17',
                'phone' => '0333333333',
                'email' => 'diep@gmail.com',
                'address' => 'Chương Mỹ, Hà Nội',
                'location_id' => '24',
                'link' => 'kkk',
                'objective' => 'muc tieu',
                'desired_job' => 'Fullstack Web Developer',
                'desired_industry_id' => 2,
                'desired_jtype_id' => 1,
                'desired_jlevel_id' => 3,
                'desired_min_salary' => 3,
                'desired_max_salary' => 5,
                'job_yoe' => 1,
                'public_resume_id' => null
            ],
            [
                'id' => 4,
                'user_id' => 4,
                'firstname' => 'thanh phong',
                'lastname' => 'bui',
                'gender' => 0,
                'dob' => '2001-03-10',
                'phone' => '0333333334',
                'email' => 'phong@gmail.com',
                'address' => 'Đống Đa, Hà Nội',
                'location_id' => '24',
                'link' => 'kkk',
                'objective' => 'muc tieu',
                'desired_job' => 'Fullstack Web Developer',
                'desired_industry_id' => 2,
                'desired_jtype_id' => 1,
                'desired_jlevel_id' => 3,
                'desired_min_salary' => 3,
                'desired_max_salary' => 5,
                'job_yoe' => 1,
                'public_resume_id' => null
            ],
            [
                'id' => 17,
                'user_id' => 17,
                'firstname' => 'hong quang',
                'lastname' => 'tran',
                'gender' => 0,
                'dob' => '2000-03-12',
                'phone' => '0333333335',
                'email' => 'quang@gmail.com',
                'address' => 'Hai Bà Trưng, Hà Nội',
                'location_id' => '24',
                'link' => 'kkk',
                'objective' => 'muc tieu',
                'desired_job' => 'Fullstack Web Developer',
                'desired_industry_id' => 2,
                'desired_jtype_id' => 1,
                'desired_jlevel_id' => 3,
                'desired_min_salary' => 3,
                'desired_max_salary' => 5,
                'job_yoe' => 1,
                'public_resume_id' => null
            ],
        ]);
    }
}
