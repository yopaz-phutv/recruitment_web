<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ActivitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('activities')->insert([
            [
                'id' => 1,
                'candidate_id' => 101,
                'organization' => 'Đội sinh viên tình nguyện',
                'role' => 'Tình nguyện viên',
                'is_present' => 0,
                'start_date' => new Carbon('2023-03-20'),
                'end_date' => new Carbon('2023-06-20'),
                'description' => 'Hỗ trợ giấy tờ cho ban tổ chức',
            ],
            [
                'id' => 2,
                'candidate_id' => 102,
                'organization' => 'Đội sinh viên tình nguyện',
                'role' => 'Tình nguyện viên',
                'is_present' => 0,
                'start_date' => new Carbon('2023-03-20'),
                'end_date' => new Carbon('2023-06-20'),
                'description' => 'Hỗ trợ giấy tờ cho ban tổ chức',
            ],
            [
                'id' => 3,
                'candidate_id' => 103,
                'organization' => 'Đội sinh viên tình nguyện',
                'role' => 'Tình nguyện viên',
                'is_present' => 0,
                'start_date' => new Carbon('2023-03-20'),
                'end_date' => new Carbon('2023-06-20'),
                'description' => 'Hỗ trợ giấy tờ cho ban tổ chức',
            ],
            [
                'id' => 4,
                'candidate_id' => 104,
                'organization' => 'Đội sinh viên tình nguyện',
                'role' => 'Tình nguyện viên',
                'is_present' => 0,
                'start_date' => new Carbon('2023-03-20'),
                'end_date' => new Carbon('2023-06-20'),
                'description' => 'Hỗ trợ giấy tờ cho ban tổ chức',
            ],
            [
                'id' => 5,
                'candidate_id' => 105,
                'organization' => 'Đội sinh viên tình nguyện',
                'role' => 'Tình nguyện viên',
                'is_present' => 0,
                'start_date' => new Carbon('2023-03-20'),
                'end_date' => new Carbon('2023-06-20'),
                'description' => 'Hỗ trợ giấy tờ cho ban tổ chức',
            ],
            [
                'id' => 6,
                'candidate_id' => 106,
                'organization' => 'Đội sinh viên tình nguyện',
                'role' => 'Tình nguyện viên',
                'is_present' => 0,
                'start_date' => new Carbon('2023-03-20'),
                'end_date' => new Carbon('2023-06-20'),
                'description' => 'Hỗ trợ giấy tờ cho ban tổ chức',
            ],
            [
                'id' => 7,
                'candidate_id' => 107,
                'organization' => 'Đội sinh viên tình nguyện',
                'role' => 'Tình nguyện viên',
                'is_present' => 0,
                'start_date' => new Carbon('2023-03-20'),
                'end_date' => new Carbon('2023-06-20'),
                'description' => 'Hỗ trợ giấy tờ cho ban tổ chức',
            ],
            [
                'id' => 8,
                'candidate_id' => 108,
                'organization' => 'Đội sinh viên tình nguyện',
                'role' => 'Tình nguyện viên',
                'is_present' => 0,
                'start_date' => new Carbon('2023-03-20'),
                'end_date' => new Carbon('2023-06-20'),
                'description' => 'Hỗ trợ giấy tờ cho ban tổ chức',
            ],
            [
                'id' => 9,
                'candidate_id' => 109,
                'organization' => 'Đội sinh viên tình nguyện',
                'role' => 'Tình nguyện viên',
                'is_present' => 0,
                'start_date' => new Carbon('2023-03-20'),
                'end_date' => new Carbon('2023-06-20'),
                'description' => 'Hỗ trợ giấy tờ cho ban tổ chức',
            ],
            [
                'id' => 10,
                'candidate_id' => 110,
                'organization' => 'Đội sinh viên tình nguyện',
                'role' => 'Tình nguyện viên',
                'is_present' => 0,
                'start_date' => new Carbon('2023-03-20'),
                'end_date' => new Carbon('2023-06-20'),
                'description' => 'Hỗ trợ giấy tờ cho ban tổ chức',
            ],
            [
                'id' => 11,
                'candidate_id' => 111,
                'organization' => 'Đội sinh viên tình nguyện',
                'role' => 'Tình nguyện viên',
                'is_present' => 0,
                'start_date' => new Carbon('2023-03-20'),
                'end_date' => new Carbon('2023-06-20'),
                'description' => 'Hỗ trợ giấy tờ cho ban tổ chức',
            ],
            [
                'id' => 12,
                'candidate_id' => 112,
                'organization' => 'Đội sinh viên tình nguyện',
                'role' => 'Tình nguyện viên',
                'is_present' => 0,
                'start_date' => new Carbon('2023-03-20'),
                'end_date' => new Carbon('2023-06-20'),
                'description' => 'Hỗ trợ giấy tờ cho ban tổ chức',
            ],
            [
                'id' => 13,
                'candidate_id' => 113,
                'organization' => 'Đội sinh viên tình nguyện',
                'role' => 'Tình nguyện viên',
                'is_present' => 0,
                'start_date' => new Carbon('2023-03-20'),
                'end_date' => new Carbon('2023-06-20'),
                'description' => 'Hỗ trợ giấy tờ cho ban tổ chức',
            ],
            [
                'id' => 14,
                'candidate_id' => 114,
                'organization' => 'Đội sinh viên tình nguyện',
                'role' => 'Tình nguyện viên',
                'is_present' => 0,
                'start_date' => new Carbon('2023-03-20'),
                'end_date' => new Carbon('2023-06-20'),
                'description' => 'Hỗ trợ giấy tờ cho ban tổ chức',
            ],
            [
                'id' => 15,
                'candidate_id' => 115,
                'organization' => 'Đội sinh viên tình nguyện',
                'role' => 'Tình nguyện viên',
                'is_present' => 0,
                'start_date' => new Carbon('2023-03-20'),
                'end_date' => new Carbon('2023-06-20'),
                'description' => 'Hỗ trợ giấy tờ cho ban tổ chức',
            ],
            [
                'id' => 16,
                'candidate_id' => 116,
                'organization' => 'Đội sinh viên tình nguyện',
                'role' => 'Tình nguyện viên',
                'is_present' => 0,
                'start_date' => new Carbon('2023-03-20'),
                'end_date' => new Carbon('2023-06-20'),
                'description' => 'Hỗ trợ giấy tờ cho ban tổ chức',
            ],
            [
                'id' => 17,
                'candidate_id' => 117,
                'organization' => 'Đội sinh viên tình nguyện',
                'role' => 'Tình nguyện viên',
                'is_present' => 0,
                'start_date' => new Carbon('2023-03-20'),
                'end_date' => new Carbon('2023-06-20'),
                'description' => 'Hỗ trợ giấy tờ cho ban tổ chức',
            ],
            [
                'id' => 18,
                'candidate_id' => 118,
                'organization' => 'Đội sinh viên tình nguyện',
                'role' => 'Tình nguyện viên',
                'is_present' => 0,
                'start_date' => new Carbon('2023-03-20'),
                'end_date' => new Carbon('2023-06-20'),
                'description' => 'Hỗ trợ giấy tờ cho ban tổ chức',
            ],
            [
                'id' => 19,
                'candidate_id' => 119,
                'organization' => 'Đội sinh viên tình nguyện',
                'role' => 'Tình nguyện viên',
                'is_present' => 0,
                'start_date' => new Carbon('2023-03-20'),
                'end_date' => new Carbon('2023-06-20'),
                'description' => 'Hỗ trợ giấy tờ cho ban tổ chức',
            ],
            [
                'id' => 20,
                'candidate_id' => 120,
                'organization' => 'Đội sinh viên tình nguyện',
                'role' => 'Tình nguyện viên',
                'is_present' => 0,
                'start_date' => new Carbon('2023-03-20'),
                'end_date' => new Carbon('2023-06-20'),
                'description' => 'Hỗ trợ giấy tờ cho ban tổ chức',
            ],
            [
                'id' => 21,
                'candidate_id' => 121,
                'organization' => 'Đội sinh viên tình nguyện',
                'role' => 'Tình nguyện viên',
                'is_present' => 0,
                'start_date' => new Carbon('2023-03-20'),
                'end_date' => new Carbon('2023-06-20'),
                'description' => 'Hỗ trợ giấy tờ cho ban tổ chức',
            ],
            [
                'id' => 22,
                'candidate_id' => 122,
                'organization' => 'Đội sinh viên tình nguyện',
                'role' => 'Tình nguyện viên',
                'is_present' => 0,
                'start_date' => new Carbon('2023-03-20'),
                'end_date' => new Carbon('2023-06-20'),
                'description' => 'Hỗ trợ giấy tờ cho ban tổ chức',
            ],
            [
                'id' => 23,
                'candidate_id' => 123,
                'organization' => 'Đội sinh viên tình nguyện',
                'role' => 'Tình nguyện viên',
                'is_present' => 0,
                'start_date' => new Carbon('2023-03-20'),
                'end_date' => new Carbon('2023-06-20'),
                'description' => 'Hỗ trợ giấy tờ cho ban tổ chức',
            ],
            [
                'id' => 24,
                'candidate_id' => 124,
                'organization' => 'Đội sinh viên tình nguyện',
                'role' => 'Tình nguyện viên',
                'is_present' => 0,
                'start_date' => new Carbon('2023-03-20'),
                'end_date' => new Carbon('2023-06-20'),
                'description' => 'Hỗ trợ giấy tờ cho ban tổ chức',
            ],
            [
                'id' => 25,
                'candidate_id' => 125,
                'organization' => 'Đội sinh viên tình nguyện',
                'role' => 'Tình nguyện viên',
                'is_present' => 0,
                'start_date' => new Carbon('2023-03-20'),
                'end_date' => new Carbon('2023-06-20'),
                'description' => 'Hỗ trợ giấy tờ cho ban tổ chức',
            ],
            [
                'id' => 26,
                'candidate_id' => 126,
                'organization' => 'Đội sinh viên tình nguyện',
                'role' => 'Tình nguyện viên',
                'is_present' => 0,
                'start_date' => new Carbon('2023-03-20'),
                'end_date' => new Carbon('2023-06-20'),
                'description' => 'Hỗ trợ giấy tờ cho ban tổ chức',
            ],
            [
                'id' => 27,
                'candidate_id' => 127,
                'organization' => 'Đội sinh viên tình nguyện',
                'role' => 'Tình nguyện viên',
                'is_present' => 0,
                'start_date' => new Carbon('2023-03-20'),
                'end_date' => new Carbon('2023-06-20'),
                'description' => 'Hỗ trợ giấy tờ cho ban tổ chức',
            ],
            [
                'id' => 28,
                'candidate_id' => 128,
                'organization' => 'Đội sinh viên tình nguyện',
                'role' => 'Tình nguyện viên',
                'is_present' => 0,
                'start_date' => new Carbon('2023-03-20'),
                'end_date' => new Carbon('2023-06-20'),
                'description' => 'Hỗ trợ giấy tờ cho ban tổ chức',
            ],
            [
                'id' => 29,
                'candidate_id' => 129,
                'organization' => 'Đội sinh viên tình nguyện',
                'role' => 'Tình nguyện viên',
                'is_present' => 0,
                'start_date' => new Carbon('2023-03-20'),
                'end_date' => new Carbon('2023-06-20'),
                'description' => 'Hỗ trợ giấy tờ cho ban tổ chức',
            ],
            [
                'id' => 30,
                'candidate_id' => 130,
                'organization' => 'Đội sinh viên tình nguyện',
                'role' => 'Tình nguyện viên',
                'is_present' => 0,
                'start_date' => new Carbon('2023-03-20'),
                'end_date' => new Carbon('2023-06-20'),
                'description' => 'Hỗ trợ giấy tờ cho ban tổ chức',
            ],
            [
                'id' => 31,
                'candidate_id' => 131,
                'organization' => 'Đội sinh viên tình nguyện',
                'role' => 'Tình nguyện viên',
                'is_present' => 0,
                'start_date' => new Carbon('2023-03-20'),
                'end_date' => new Carbon('2023-06-20'),
                'description' => 'Hỗ trợ giấy tờ cho ban tổ chức',
            ],
            [
                'id' => 32,
                'candidate_id' => 132,
                'organization' => 'Đội sinh viên tình nguyện',
                'role' => 'Tình nguyện viên',
                'is_present' => 0,
                'start_date' => new Carbon('2023-03-20'),
                'end_date' => new Carbon('2023-06-20'),
                'description' => 'Hỗ trợ giấy tờ cho ban tổ chức',
            ],
            [
                'id' => 33,
                'candidate_id' => 133,
                'organization' => 'Đội sinh viên tình nguyện',
                'role' => 'Tình nguyện viên',
                'is_present' => 0,
                'start_date' => new Carbon('2023-03-20'),
                'end_date' => new Carbon('2023-06-20'),
                'description' => 'Hỗ trợ giấy tờ cho ban tổ chức',
            ],   
            [
                'id' => 34,
                'candidate_id' => 134,
                'organization' => 'Đội sinh viên tình nguyện',
                'role' => 'Tình nguyện viên',
                'is_present' => 0,
                'start_date' => new Carbon('2023-03-20'),
                'end_date' => new Carbon('2023-06-20'),
                'description' => 'Hỗ trợ giấy tờ cho ban tổ chức',
            ],          
        ]);
    }
}
