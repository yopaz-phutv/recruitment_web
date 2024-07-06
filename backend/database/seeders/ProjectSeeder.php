<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('projects')->insert([
            [
                'id' => 1,
                'candidate_id' => 101,
                'name' => 'Website tuyển dụng',
                'prj_type' => 'Cá nhân',
                'role' => null,
                'technologies' => 'ReactJS, Laravel, Bootstrap, Redux',
                'start_date' => new Carbon('2024-01-10'),
                'end_date' => new Carbon('2024-05-30'),
                'description' => 'Trang web giúp tìm kiếm việc làm và đăng bài tuyển dụng',
                'link' => 'https://github.com/yopaz-phutv/recruitment_web'
            ],
            [
                'id' => 2,
                'candidate_id' => 101,
                'name' => 'Shoes Shop',
                'prj_type' => 'nhóm',
                'role' => 'Backend',
                'technologies' => 'ReactJS, Laravel, Bootstrap',
                'start_date' => new Carbon('2022-03-20'),
                'end_date' => new Carbon('2022-06-20'),
                'description' => 'Trang web mua bán giày dép',
                'link' => 'https://github.com/ldhoang201/shoes_store'
            ],
            [
                'id' => 3,
                'candidate_id' => 102,
                'name' => 'Website tuyển dụng',
                'prj_type' => 'Cá nhân',
                'role' => null,
                'technologies' => 'ReactJS, Laravel, Bootstrap, Redux',
                'start_date' => new Carbon('2024-01-10'),
                'end_date' => new Carbon('2024-05-30'),
                'description' => 'Trang web giúp tìm kiếm việc làm và đăng bài tuyển dụng',
                'link' => 'https://github.com/yopaz-phutv/recruitment_web'
            ],
            [
                'id' => 4,
                'candidate_id' => 102,
                'name' => 'Shoes Shop',
                'prj_type' => 'nhóm',
                'role' => 'Backend',
                'technologies' => 'ReactJS, Laravel, Bootstrap',
                'start_date' => new Carbon('2022-03-20'),
                'end_date' => new Carbon('2022-06-20'),
                'description' => 'Trang web mua bán giày dép',
                'link' => 'https://github.com/ldhoang201/shoes_store'
            ],
            [
                'id' => 5,
                'candidate_id' => 103,
                'name' => 'Website tuyển dụng',
                'prj_type' => 'Cá nhân',
                'role' => null,
                'technologies' => 'ReactJS, Laravel, Bootstrap, Redux',
                'start_date' => new Carbon('2024-01-10'),
                'end_date' => new Carbon('2024-05-30'),
                'description' => 'Trang web giúp tìm kiếm việc làm và đăng bài tuyển dụng',
                'link' => 'https://github.com/yopaz-phutv/recruitment_web'
            ],
            [
                'id' => 6,
                'candidate_id' => 103,
                'name' => 'Shoes Shop',
                'prj_type' => 'nhóm',
                'role' => 'Backend',
                'technologies' => 'ReactJS, Laravel, Bootstrap',
                'start_date' => new Carbon('2022-03-20'),
                'end_date' => new Carbon('2022-06-20'),
                'description' => 'Trang web mua bán giày dép',
                'link' => 'https://github.com/ldhoang201/shoes_store'
            ],
            [
                'id' => 7,
                'candidate_id' => 104,
                'name' => 'Shoes Shop',
                'prj_type' => 'nhóm',
                'role' => 'Backend',
                'technologies' => 'ReactJS, Laravel, Bootstrap',
                'start_date' => new Carbon('2022-03-20'),
                'end_date' => new Carbon('2022-06-20'),
                'description' => 'Trang web mua bán giày dép',
                'link' => 'https://github.com/ldhoang201/shoes_store'
            ],
            [
                'id' => 8,
                'candidate_id' => 105,
                'name' => 'Shoes Shop',
                'prj_type' => 'nhóm',
                'role' => 'Backend',
                'technologies' => 'ReactJS, Laravel, Bootstrap',
                'start_date' => new Carbon('2022-03-20'),
                'end_date' => new Carbon('2022-06-20'),
                'description' => 'Trang web mua bán giày dép',
                'link' => 'https://github.com/ldhoang201/shoes_store'
            ],
            [
                'id' => 9,
                'candidate_id' => 106,
                'name' => 'Shoes Shop',
                'prj_type' => 'nhóm',
                'role' => 'Backend',
                'technologies' => 'ReactJS, Laravel, Bootstrap',
                'start_date' => new Carbon('2022-03-20'),
                'end_date' => new Carbon('2022-06-20'),
                'description' => 'Trang web mua bán giày dép',
                'link' => 'https://github.com/ldhoang201/shoes_store'
            ],
            [
                'id' => 10,
                'candidate_id' => 107,
                'name' => 'Shoes Shop',
                'prj_type' => 'nhóm',
                'role' => 'Backend',
                'technologies' => 'ReactJS, Laravel, Bootstrap',
                'start_date' => new Carbon('2022-03-20'),
                'end_date' => new Carbon('2022-06-20'),
                'description' => 'Trang web mua bán giày dép',
                'link' => 'https://github.com/ldhoang201/shoes_store'
            ],
            [
                'id' => 11,
                'candidate_id' => 108,
                'name' => 'Shoes Shop',
                'prj_type' => 'nhóm',
                'role' => 'Backend',
                'technologies' => 'ReactJS, Laravel, Bootstrap',
                'start_date' => new Carbon('2022-03-20'),
                'end_date' => new Carbon('2022-06-20'),
                'description' => 'Trang web mua bán giày dép',
                'link' => 'https://github.com/ldhoang201/shoes_store'
            ],
            [
                'id' => 12,
                'candidate_id' => 109,
                'name' => 'Shoes Shop',
                'prj_type' => 'nhóm',
                'role' => 'Backend',
                'technologies' => 'ReactJS, Laravel, Bootstrap',
                'start_date' => new Carbon('2022-03-20'),
                'end_date' => new Carbon('2022-06-20'),
                'description' => 'Trang web mua bán giày dép',
                'link' => 'https://github.com/ldhoang201/shoes_store'
            ],
            [
                'id' => 13,
                'candidate_id' => 110,
                'name' => 'Shoes Shop',
                'prj_type' => 'nhóm',
                'role' => 'Backend',
                'technologies' => 'ReactJS, Laravel, Bootstrap',
                'start_date' => new Carbon('2022-03-20'),
                'end_date' => new Carbon('2022-06-20'),
                'description' => 'Trang web mua bán giày dép',
                'link' => 'https://github.com/ldhoang201/shoes_store'
            ],
            [
                'id' => 14,
                'candidate_id' => 111,
                'name' => 'Shoes Shop',
                'prj_type' => 'nhóm',
                'role' => 'Backend',
                'technologies' => 'ReactJS, Laravel, Bootstrap',
                'start_date' => new Carbon('2022-03-20'),
                'end_date' => new Carbon('2022-06-20'),
                'description' => 'Trang web mua bán giày dép',
                'link' => 'https://github.com/ldhoang201/shoes_store'
            ],
            [
                'id' => 15,
                'candidate_id' => 112,
                'name' => 'Shoes Shop',
                'prj_type' => 'nhóm',
                'role' => 'Backend',
                'technologies' => 'ReactJS, Laravel, Bootstrap',
                'start_date' => new Carbon('2022-03-20'),
                'end_date' => new Carbon('2022-06-20'),
                'description' => 'Trang web mua bán giày dép',
                'link' => 'https://github.com/ldhoang201/shoes_store'
            ],
            [
                'id' => 16,
                'candidate_id' => 113,
                'name' => 'Shoes Shop',
                'prj_type' => 'nhóm',
                'role' => 'Backend',
                'technologies' => 'ReactJS, Laravel, Bootstrap',
                'start_date' => new Carbon('2022-03-20'),
                'end_date' => new Carbon('2022-06-20'),
                'description' => 'Trang web mua bán giày dép',
                'link' => 'https://github.com/ldhoang201/shoes_store'
            ],
            [
                'id' => 17,
                'candidate_id' => 114,
                'name' => 'Shoes Shop',
                'prj_type' => 'nhóm',
                'role' => 'Backend',
                'technologies' => 'ReactJS, Laravel, Bootstrap',
                'start_date' => new Carbon('2022-03-20'),
                'end_date' => new Carbon('2022-06-20'),
                'description' => 'Trang web mua bán giày dép',
                'link' => 'https://github.com/ldhoang201/shoes_store'
            ],
            [
                'id' => 18,
                'candidate_id' => 115,
                'name' => 'Shoes Shop',
                'prj_type' => 'nhóm',
                'role' => 'Backend',
                'technologies' => 'ReactJS, Laravel, Bootstrap',
                'start_date' => new Carbon('2022-03-20'),
                'end_date' => new Carbon('2022-06-20'),
                'description' => 'Trang web mua bán giày dép',
                'link' => 'https://github.com/ldhoang201/shoes_store'
            ],
            [
                'id' => 19,
                'candidate_id' => 116,
                'name' => 'Shoes Shop',
                'prj_type' => 'nhóm',
                'role' => 'Backend',
                'technologies' => 'ReactJS, Laravel, Bootstrap',
                'start_date' => new Carbon('2022-03-20'),
                'end_date' => new Carbon('2022-06-20'),
                'description' => 'Trang web mua bán giày dép',
                'link' => 'https://github.com/ldhoang201/shoes_store'
            ],
            [
                'id' => 20,
                'candidate_id' => 117,
                'name' => 'Shoes Shop',
                'prj_type' => 'nhóm',
                'role' => 'Backend',
                'technologies' => 'ReactJS, Laravel, Bootstrap',
                'start_date' => new Carbon('2022-03-20'),
                'end_date' => new Carbon('2022-06-20'),
                'description' => 'Trang web mua bán giày dép',
                'link' => 'https://github.com/ldhoang201/shoes_store'
            ],
            [
                'id' => 21,
                'candidate_id' => 118,
                'name' => 'Shoes Shop',
                'prj_type' => 'nhóm',
                'role' => 'Backend',
                'technologies' => 'ReactJS, Laravel, Bootstrap',
                'start_date' => new Carbon('2022-03-20'),
                'end_date' => new Carbon('2022-06-20'),
                'description' => 'Trang web mua bán giày dép',
                'link' => 'https://github.com/ldhoang201/shoes_store'
            ],
            [
                'id' => 22,
                'candidate_id' => 119,
                'name' => 'Shoes Shop',
                'prj_type' => 'nhóm',
                'role' => 'Backend',
                'technologies' => 'ReactJS, Laravel, Bootstrap',
                'start_date' => new Carbon('2022-03-20'),
                'end_date' => new Carbon('2022-06-20'),
                'description' => 'Trang web mua bán giày dép',
                'link' => 'https://github.com/ldhoang201/shoes_store'
            ],
            [
                'id' => 23,
                'candidate_id' => 128,
                'name' => 'Shoes Shop',
                'prj_type' => 'nhóm',
                'role' => 'Backend',
                'technologies' => 'ReactJS, Laravel, Bootstrap',
                'start_date' => new Carbon('2022-03-20'),
                'end_date' => new Carbon('2022-06-20'),
                'description' => 'Trang web mua bán giày dép',
                'link' => 'https://github.com/ldhoang201/shoes_store'
            ],
            [
                'id' => 24,
                'candidate_id' => 129,
                'name' => 'Shoes Shop',
                'prj_type' => 'nhóm',
                'role' => 'Backend',
                'technologies' => 'ReactJS, Laravel, Bootstrap',
                'start_date' => new Carbon('2022-03-20'),
                'end_date' => new Carbon('2022-06-20'),
                'description' => 'Trang web mua bán giày dép',
                'link' => 'https://github.com/ldhoang201/shoes_store'
            ],
            [
                'id' => 25,
                'candidate_id' => 130,
                'name' => 'Shoes Shop',
                'prj_type' => 'nhóm',
                'role' => 'Backend',
                'technologies' => 'ReactJS, Laravel, Bootstrap',
                'start_date' => new Carbon('2022-03-20'),
                'end_date' => new Carbon('2022-06-20'),
                'description' => 'Trang web mua bán giày dép',
                'link' => 'https://github.com/ldhoang201/shoes_store'
            ],
            [
                'id' => 26,
                'candidate_id' => 131,
                'name' => 'Shoes Shop',
                'prj_type' => 'nhóm',
                'role' => 'Backend',
                'technologies' => 'ReactJS, Laravel, Bootstrap',
                'start_date' => new Carbon('2022-03-20'),
                'end_date' => new Carbon('2022-06-20'),
                'description' => 'Trang web mua bán giày dép',
                'link' => 'https://github.com/ldhoang201/shoes_store'
            ],
            [
                'id' => 27,
                'candidate_id' => 134,
                'name' => 'Shoes Shop',
                'prj_type' => 'nhóm',
                'role' => 'Backend',
                'technologies' => 'ReactJS, Laravel, Bootstrap',
                'start_date' => new Carbon('2022-03-20'),
                'end_date' => new Carbon('2022-06-20'),
                'description' => 'Trang web mua bán giày dép',
                'link' => 'https://github.com/ldhoang201/shoes_store'
            ],
        ]);
    }
}
