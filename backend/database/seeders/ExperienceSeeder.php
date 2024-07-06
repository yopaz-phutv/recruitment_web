<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ExperienceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('experiences')->insert([
            [
                'id' => 1,
                'candidate_id' => 101,
                'name' => 'Thực tập sinh PHP',
                'company' => 'Trung tâm CNTT MobiFone',
                'start_date' => new Carbon('2023-03-07'),
                'end_date' => new Carbon('2023-06-19'),
                'description' => 'Nghiên cứu và triển khai framework Laravel'
            ],
            [
                'id' => 2,
                'candidate_id' => 101,
                'name' => 'Thực tập sinh Web',
                'company' => 'Công ty TNHH Theinfitech',
                'start_date' => new Carbon('2023-10-07'),
                'end_date' => new Carbon('2024-01-07'),
                'description' => 'Sử dụng ReactJS và Flask API để lập trình web'
            ],
            [
                'id' => 3,
                'candidate_id' => 102,
                'name' => 'Thực tập sinh PHP',
                'company' => 'Trung tâm CNTT MobiFone',
                'start_date' => new Carbon('2023-03-07'),
                'end_date' => new Carbon('2023-06-19'),
                'description' => 'Nghiên cứu và triển khai framework Laravel'
            ],
            [
                'id' => 4,
                'candidate_id' => 102,
                'name' => 'Thực tập sinh Web',
                'company' => 'Công ty TNHH Theinfitech',
                'start_date' => new Carbon('2023-10-07'),
                'end_date' => new Carbon('2024-01-07'),
                'description' => 'Sử dụng ReactJS và Flask API để lập trình web'
            ],
            [
                'id' => 5,
                'candidate_id' => 103,
                'name' => 'Thực tập sinh PHP',
                'company' => 'Trung tâm CNTT MobiFone',
                'start_date' => new Carbon('2023-03-07'),
                'end_date' => new Carbon('2023-06-19'),
                'description' => 'Nghiên cứu và triển khai framework Laravel'
            ],
            [
                'id' => 6,
                'candidate_id' => 103,
                'name' => 'Thực tập sinh Web',
                'company' => 'Công ty TNHH Theinfitech',
                'start_date' => new Carbon('2023-10-07'),
                'end_date' => new Carbon('2024-01-07'),
                'description' => 'Sử dụng ReactJS và Flask API để lập trình web'
            ],
            [
                'id' => 7,
                'candidate_id' => 104,
                'name' => 'Thực tập sinh Web',
                'company' => 'Công ty TNHH Theinfitech',
                'start_date' => new Carbon('2023-10-07'),
                'end_date' => new Carbon('2024-01-07'),
                'description' => 'Sử dụng ReactJS và Flask API để lập trình web'
            ],
            [
                'id' => 8,
                'candidate_id' => 105,
                'name' => 'Thực tập sinh Web',
                'company' => 'Công ty TNHH Theinfitech',
                'start_date' => new Carbon('2023-10-07'),
                'end_date' => new Carbon('2024-01-07'),
                'description' => 'Sử dụng ReactJS và Flask API để lập trình web'
            ],
            [
                'id' => 9,
                'candidate_id' => 106,
                'name' => 'Thực tập sinh Web',
                'company' => 'Công ty TNHH Theinfitech',
                'start_date' => new Carbon('2023-10-07'),
                'end_date' => new Carbon('2024-01-07'),
                'description' => 'Sử dụng ReactJS và Flask API để lập trình web'
            ],
            [
                'id' => 10,
                'candidate_id' => 107,
                'name' => 'Thực tập sinh Web',
                'company' => 'Công ty TNHH Theinfitech',
                'start_date' => new Carbon('2023-10-07'),
                'end_date' => new Carbon('2024-01-07'),
                'description' => 'Sử dụng ReactJS và Flask API để lập trình web'
            ],
            [
                'id' => 11,
                'candidate_id' => 108,
                'name' => 'Thực tập sinh Web',
                'company' => 'Công ty TNHH Theinfitech',
                'start_date' => new Carbon('2023-10-07'),
                'end_date' => new Carbon('2024-01-07'),
                'description' => 'Sử dụng ReactJS và Flask API để lập trình web'
            ],
            [
                'id' => 12,
                'candidate_id' => 109,
                'name' => 'Thực tập sinh Web',
                'company' => 'Công ty TNHH Theinfitech',
                'start_date' => new Carbon('2023-10-07'),
                'end_date' => new Carbon('2024-01-07'),
                'description' => 'Sử dụng ReactJS và Flask API để lập trình web'
            ],
            [
                'id' => 13,
                'candidate_id' => 110,
                'name' => 'Thực tập sinh Web',
                'company' => 'Công ty TNHH Theinfitech',
                'start_date' => new Carbon('2023-10-07'),
                'end_date' => new Carbon('2024-01-07'),
                'description' => 'Sử dụng ReactJS và Flask API để lập trình web'
            ],
            [
                'id' => 14,
                'candidate_id' => 111,
                'name' => 'Thực tập sinh Web',
                'company' => 'Công ty TNHH Theinfitech',
                'start_date' => new Carbon('2023-10-07'),
                'end_date' => new Carbon('2024-01-07'),
                'description' => 'Sử dụng ReactJS và Flask API để lập trình web'
            ],
            [
                'id' => 15,
                'candidate_id' => 112,
                'name' => 'Thực tập sinh Web',
                'company' => 'Công ty TNHH Theinfitech',
                'start_date' => new Carbon('2023-10-07'),
                'end_date' => new Carbon('2024-01-07'),
                'description' => 'Sử dụng ReactJS và Flask API để lập trình web'
            ],
            [
                'id' => 16,
                'candidate_id' => 113,
                'name' => 'Thực tập sinh Web',
                'company' => 'Công ty TNHH Theinfitech',
                'start_date' => new Carbon('2023-10-07'),
                'end_date' => new Carbon('2024-01-07'),
                'description' => 'Sử dụng ReactJS và Flask API để lập trình web'
            ],
            [
                'id' => 17,
                'candidate_id' => 114,
                'name' => 'Thực tập sinh Web',
                'company' => 'Công ty TNHH Theinfitech',
                'start_date' => new Carbon('2023-10-07'),
                'end_date' => new Carbon('2024-01-07'),
                'description' => 'Sử dụng ReactJS và Flask API để lập trình web'
            ],
            [
                'id' => 18,
                'candidate_id' => 115,
                'name' => 'Thực tập sinh Web',
                'company' => 'Công ty TNHH Theinfitech',
                'start_date' => new Carbon('2023-10-07'),
                'end_date' => new Carbon('2024-01-07'),
                'description' => 'Sử dụng ReactJS và Flask API để lập trình web'
            ],
            [
                'id' => 19,
                'candidate_id' => 116,
                'name' => 'Thực tập sinh Web',
                'company' => 'Công ty TNHH Theinfitech',
                'start_date' => new Carbon('2023-10-07'),
                'end_date' => new Carbon('2024-01-07'),
                'description' => 'Sử dụng ReactJS và Flask API để lập trình web'
            ],
            [
                'id' => 20,
                'candidate_id' => 117,
                'name' => 'Thực tập sinh Web',
                'company' => 'Công ty TNHH Theinfitech',
                'start_date' => new Carbon('2023-10-07'),
                'end_date' => new Carbon('2024-01-07'),
                'description' => 'Sử dụng ReactJS và Flask API để lập trình web'
            ],
            [
                'id' => 21,
                'candidate_id' => 118,
                'name' => 'Thực tập sinh Web',
                'company' => 'Công ty TNHH Theinfitech',
                'start_date' => new Carbon('2023-10-07'),
                'end_date' => new Carbon('2024-01-07'),
                'description' => 'Sử dụng ReactJS và Flask API để lập trình web'
            ],
            [
                'id' => 22,
                'candidate_id' => 119,
                'name' => 'Thực tập sinh Web',
                'company' => 'Công ty TNHH Theinfitech',
                'start_date' => new Carbon('2023-10-07'),
                'end_date' => new Carbon('2024-01-07'),
                'description' => 'Sử dụng ReactJS và Flask API để lập trình web'
            ],
            [
                'id' => 23,
                'candidate_id' => 120,
                'name' => 'Thực tập sinh HR',
                'company' => 'Công ty TNHH DEF',
                'start_date' => new Carbon('2023-10-07'),
                'end_date' => new Carbon('2024-01-07'),
                'description' => 'Hỗ trợ, tham gia các công việc liên quan tới quản lý, tuyển dụng nhân sự'
            ],
            [
                'id' => 24,
                'candidate_id' => 121,
                'name' => 'Thực tập sinh HR',
                'company' => 'Công ty TNHH DEF',
                'start_date' => new Carbon('2023-10-07'),
                'end_date' => new Carbon('2024-01-07'),
                'description' => 'Hỗ trợ, tham gia các công việc liên quan tới quản lý, tuyển dụng nhân sự'
            ],
            [
                'id' => 25,
                'candidate_id' => 122,
                'name' => 'Thực tập sinh HR',
                'company' => 'Công ty TNHH DEF',
                'start_date' => new Carbon('2023-10-07'),
                'end_date' => new Carbon('2024-01-07'),
                'description' => 'Hỗ trợ, tham gia các công việc liên quan tới quản lý, tuyển dụng nhân sự'
            ],
            [
                'id' => 26,
                'candidate_id' => 123,
                'name' => 'Thực tập sinh HR',
                'company' => 'Công ty TNHH DEF',
                'start_date' => new Carbon('2023-10-07'),
                'end_date' => new Carbon('2024-01-07'),
                'description' => 'Hỗ trợ, tham gia các công việc liên quan tới quản lý, tuyển dụng nhân sự'
            ],
            [
                'id' => 27,
                'candidate_id' => 124,
                'name' => 'Thực tập sinh HR',
                'company' => 'Công ty TNHH DEF',
                'start_date' => new Carbon('2023-10-07'),
                'end_date' => new Carbon('2024-01-07'),
                'description' => 'Hỗ trợ, tham gia các công việc liên quan tới quản lý, tuyển dụng nhân sự'
            ],
            [
                'id' => 28,
                'candidate_id' => 125,
                'name' => 'Thực tập sinh HR',
                'company' => 'Công ty TNHH DEF',
                'start_date' => new Carbon('2023-10-07'),
                'end_date' => new Carbon('2024-01-07'),
                'description' => 'Hỗ trợ, tham gia các công việc liên quan tới quản lý, tuyển dụng nhân sự'
            ],
            [
                'id' => 29,
                'candidate_id' => 126,
                'name' => 'Thực tập sinh HR',
                'company' => 'Công ty TNHH DEF',
                'start_date' => new Carbon('2023-10-07'),
                'end_date' => new Carbon('2024-01-07'),
                'description' => 'Hỗ trợ, tham gia các công việc liên quan tới quản lý, tuyển dụng nhân sự'
            ],
            [
                'id' => 30,
                'candidate_id' => 127,
                'name' => 'Thực tập sinh HR',
                'company' => 'Công ty TNHH DEF',
                'start_date' => new Carbon('2023-10-07'),
                'end_date' => new Carbon('2024-01-07'),
                'description' => 'Hỗ trợ, tham gia các công việc liên quan tới quản lý, tuyển dụng nhân sự'
            ],
            [
                'id' => 31,
                'candidate_id' => 128,
                'name' => 'Thực tập sinh HR',
                'company' => 'Công ty TNHH DEF',
                'start_date' => new Carbon('2023-10-07'),
                'end_date' => new Carbon('2024-01-07'),
                'description' => 'Hỗ trợ, tham gia các công việc liên quan tới quản lý, tuyển dụng nhân sự'
            ],
            [
                'id' => 32,
                'candidate_id' => 129,
                'name' => 'Thực tập sinh Web',
                'company' => 'Công ty TNHH Theinfitech',
                'start_date' => new Carbon('2023-10-07'),
                'end_date' => new Carbon('2024-01-07'),
                'description' => 'Sử dụng ReactJS và Flask API để lập trình web'
            ],
            [
                'id' => 33,
                'candidate_id' => 130,
                'name' => 'Thực tập sinh Web',
                'company' => 'Công ty TNHH Theinfitech',
                'start_date' => new Carbon('2023-10-07'),
                'end_date' => new Carbon('2024-01-07'),
                'description' => 'Sử dụng ReactJS và Flask API để lập trình web'
            ],
            [
                'id' => 34,
                'candidate_id' => 131,
                'name' => 'Thực tập sinh Web',
                'company' => 'Công ty TNHH Theinfitech',
                'start_date' => new Carbon('2023-10-07'),
                'end_date' => new Carbon('2024-01-07'),
                'description' => 'Sử dụng ReactJS và Flask API để lập trình web'
            ],
            [
                'id' => 35,
                'candidate_id' => 132,
                'name' => 'Thực tập sinh Web',
                'company' => 'Công ty TNHH Theinfitech',
                'start_date' => new Carbon('2023-10-07'),
                'end_date' => new Carbon('2024-01-07'),
                'description' => 'Sử dụng ReactJS và Flask API để lập trình web'
            ],
            [
                'id' => 36,
                'candidate_id' => 133,
                'name' => 'Thực tập sinh Web',
                'company' => 'Công ty TNHH Theinfitech',
                'start_date' => new Carbon('2023-10-07'),
                'end_date' => new Carbon('2024-01-07'),
                'description' => 'Sử dụng ReactJS và Flask API để lập trình web'
            ],
            [
                'id' => 37,
                'candidate_id' => 134,
                'name' => 'Thực tập sinh Web',
                'company' => 'Công ty TNHH Theinfitech',
                'start_date' => new Carbon('2023-10-07'),
                'end_date' => new Carbon('2024-01-07'),
                'description' => 'Sử dụng ReactJS và Flask API để lập trình web'
            ],
        ]);
    }
}
