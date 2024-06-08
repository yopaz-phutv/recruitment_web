<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EducationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('educations')->insert([
            [
                'id' => 1,
                'candidate_id' => 101,
                'school' => 'Trường THPT Ân Thi',
                'major' => null,
                'start_date' => new Carbon('2016-09-09'),
                'end_date' => new Carbon('2019-06-09'),
                'description' => null,
            ],
            [
                'id' => 2,
                'candidate_id' => 101,
                'school' => 'Đại học Bách khoa Hà Nội',
                'major' => 'Công nghệ thông tin',
                'start_date' => new Carbon('2019-09-09'),
                'end_date' => new Carbon('2024-08-09'),
                'description' => 'Học chuyên ngành CNTT Việt Nhật'
            ],
            [
                'id' => 3,
                'candidate_id' => 102,
                'school' => 'Trường THPT Ân Thi',
                'major' => null,
                'start_date' => new Carbon('2016-09-09'),
                'end_date' => new Carbon('2019-06-09'),
                'description' => null,
            ],
            [
                'id' => 4,
                'candidate_id' => 102,
                'school' => 'Đại học Bách khoa Hà Nội',
                'major' => 'Công nghệ thông tin',
                'start_date' => new Carbon('2019-09-09'),
                'end_date' => new Carbon('2024-08-09'),
                'description' => 'Học chuyên ngành CNTT Việt Nhật'
            ],
            [
                'id' => 5,
                'candidate_id' => 103,
                'school' => 'Trường THPT Ân Thi',
                'major' => null,
                'start_date' => new Carbon('2016-09-09'),
                'end_date' => new Carbon('2019-06-09'),
                'description' => null,
            ],
            [
                'id' => 6,
                'candidate_id' => 103,
                'school' => 'Đại học Bách khoa Hà Nội',
                'major' => 'Công nghệ thông tin',
                'start_date' => new Carbon('2019-09-09'),
                'end_date' => new Carbon('2024-08-09'),
                'description' => 'Học chuyên ngành CNTT Việt Nhật'
            ],
            [
                'id' => 7,
                'candidate_id' => 104,
                'school' => 'Đại học Bách khoa Hà Nội',
                'major' => 'Công nghệ thông tin',
                'start_date' => new Carbon('2019-09-09'),
                'end_date' => new Carbon('2024-08-09'),
                'description' => 'Học chuyên ngành CNTT Việt Nhật'
            ],
            [
                'id' => 8,
                'candidate_id' => 105,
                'school' => 'Đại học Bách khoa Hà Nội',
                'major' => 'Công nghệ thông tin',
                'start_date' => new Carbon('2019-09-09'),
                'end_date' => new Carbon('2024-08-09'),
                'description' => 'Học chuyên ngành CNTT Việt Nhật'
            ],
            [
                'id' => 9,
                'candidate_id' => 106,
                'school' => 'Đại học Bách khoa Hà Nội',
                'major' => 'Công nghệ thông tin',
                'start_date' => new Carbon('2019-09-09'),
                'end_date' => new Carbon('2024-08-09'),
                'description' => 'Học chuyên ngành CNTT Việt Nhật'
            ],
            [
                'id' => 10,
                'candidate_id' => 107,
                'school' => 'Đại học Bách khoa Hà Nội',
                'major' => 'Công nghệ thông tin',
                'start_date' => new Carbon('2019-09-09'),
                'end_date' => new Carbon('2024-08-09'),
                'description' => 'Học chuyên ngành CNTT Việt Nhật'
            ],
            [
                'id' => 11,
                'candidate_id' => 108,
                'school' => 'Đại học Bách khoa Hà Nội',
                'major' => 'Công nghệ thông tin',
                'start_date' => new Carbon('2019-09-09'),
                'end_date' => new Carbon('2024-08-09'),
                'description' => 'Học chuyên ngành CNTT Việt Nhật'
            ],
            [
                'id' => 12,
                'candidate_id' => 109,
                'school' => 'Đại học Bách khoa Hà Nội',
                'major' => 'Công nghệ thông tin',
                'start_date' => new Carbon('2019-09-09'),
                'end_date' => new Carbon('2024-08-09'),
                'description' => 'Học chuyên ngành CNTT Việt Nhật'
            ],
            [
                'id' => 13,
                'candidate_id' => 110,
                'school' => 'Đại học Bách khoa Hà Nội',
                'major' => 'Công nghệ thông tin',
                'start_date' => new Carbon('2019-09-09'),
                'end_date' => new Carbon('2024-08-09'),
                'description' => 'Học chuyên ngành CNTT Việt Nhật'
            ],
            [
                'id' => 14,
                'candidate_id' => 111,
                'school' => 'Đại học Bách khoa Hà Nội',
                'major' => 'Công nghệ thông tin',
                'start_date' => new Carbon('2019-09-09'),
                'end_date' => new Carbon('2024-08-09'),
                'description' => 'Học chuyên ngành CNTT Việt Nhật'
            ],
            [
                'id' => 15,
                'candidate_id' => 112,
                'school' => 'Đại học Bách khoa Hà Nội',
                'major' => 'Công nghệ thông tin',
                'start_date' => new Carbon('2019-09-09'),
                'end_date' => new Carbon('2024-08-09'),
                'description' => 'Học chuyên ngành CNTT Việt Nhật'
            ],
            [
                'id' => 16,
                'candidate_id' => 113,
                'school' => 'Đại học Bách khoa Hà Nội',
                'major' => 'Công nghệ thông tin',
                'start_date' => new Carbon('2019-09-09'),
                'end_date' => new Carbon('2024-08-09'),
                'description' => 'Học chuyên ngành CNTT Việt Nhật'
            ],
            [
                'id' => 17,
                'candidate_id' => 114,
                'school' => 'Đại học Bách khoa Hà Nội',
                'major' => 'Công nghệ thông tin',
                'start_date' => new Carbon('2019-09-09'),
                'end_date' => new Carbon('2024-08-09'),
                'description' => 'Học chuyên ngành CNTT Việt Nhật'
            ],
            [
                'id' => 18,
                'candidate_id' => 115,
                'school' => 'Đại học Bách khoa Hà Nội',
                'major' => 'Công nghệ thông tin',
                'start_date' => new Carbon('2019-09-09'),
                'end_date' => new Carbon('2024-08-09'),
                'description' => 'Học chuyên ngành CNTT Việt Nhật'
            ],
            [
                'id' => 19,
                'candidate_id' => 116,
                'school' => 'Đại học Bách khoa Hà Nội',
                'major' => 'Công nghệ thông tin',
                'start_date' => new Carbon('2019-09-09'),
                'end_date' => new Carbon('2024-08-09'),
                'description' => 'Học chuyên ngành CNTT Việt Nhật'
            ],
            [
                'id' => 20,
                'candidate_id' => 117,
                'school' => 'Đại học Bách khoa Hà Nội',
                'major' => 'Công nghệ thông tin',
                'start_date' => new Carbon('2019-09-09'),
                'end_date' => new Carbon('2024-08-09'),
                'description' => 'Học chuyên ngành CNTT Việt Nhật'
            ],
            [
                'id' => 21,
                'candidate_id' => 118,
                'school' => 'Đại học Bách khoa Hà Nội',
                'major' => 'Công nghệ thông tin',
                'start_date' => new Carbon('2019-09-09'),
                'end_date' => new Carbon('2024-08-09'),
                'description' => 'Học chuyên ngành CNTT Việt Nhật'
            ],
            [
                'id' => 22,
                'candidate_id' => 119,
                'school' => 'Đại học Bách khoa Hà Nội',
                'major' => 'Công nghệ thông tin',
                'start_date' => new Carbon('2019-09-09'),
                'end_date' => new Carbon('2024-08-09'),
                'description' => 'Học chuyên ngành CNTT Việt Nhật'
            ],
            [
                'id' => 23,
                'candidate_id' => 120,
                'school' => 'Đại học Bách khoa Hà Nội',
                'major' => 'Công nghệ thông tin',
                'start_date' => new Carbon('2019-09-09'),
                'end_date' => new Carbon('2024-08-09'),
                'description' => 'Học chuyên ngành CNTT Việt Nhật'
            ],
            [
                'id' => 24,
                'candidate_id' => 121,
                'school' => 'Đại học Bách khoa Hà Nội',
                'major' => 'Công nghệ thông tin',
                'start_date' => new Carbon('2019-09-09'),
                'end_date' => new Carbon('2024-08-09'),
                'description' => 'Học chuyên ngành CNTT Việt Nhật'
            ],
            [
                'id' => 25,
                'candidate_id' => 122,
                'school' => 'Đại học Bách khoa Hà Nội',
                'major' => 'Công nghệ thông tin',
                'start_date' => new Carbon('2019-09-09'),
                'end_date' => new Carbon('2024-08-09'),
                'description' => 'Học chuyên ngành CNTT Việt Nhật'
            ],
            [
                'id' => 26,
                'candidate_id' => 123,
                'school' => 'Đại học Bách khoa Hà Nội',
                'major' => 'Công nghệ thông tin',
                'start_date' => new Carbon('2019-09-09'),
                'end_date' => new Carbon('2024-08-09'),
                'description' => 'Học chuyên ngành CNTT Việt Nhật'
            ],
            [
                'id' => 27,
                'candidate_id' => 124,
                'school' => 'Đại học Bách khoa Hà Nội',
                'major' => 'Công nghệ thông tin',
                'start_date' => new Carbon('2019-09-09'),
                'end_date' => new Carbon('2024-08-09'),
                'description' => 'Học chuyên ngành CNTT Việt Nhật'
            ],
            [
                'id' => 28,
                'candidate_id' => 125,
                'school' => 'Đại học Bách khoa Hà Nội',
                'major' => 'Công nghệ thông tin',
                'start_date' => new Carbon('2019-09-09'),
                'end_date' => new Carbon('2024-08-09'),
                'description' => 'Học chuyên ngành CNTT Việt Nhật'
            ],
            [
                'id' => 29,
                'candidate_id' => 126,
                'school' => 'Đại học Bách khoa Hà Nội',
                'major' => 'Công nghệ thông tin',
                'start_date' => new Carbon('2019-09-09'),
                'end_date' => new Carbon('2024-08-09'),
                'description' => 'Học chuyên ngành CNTT Việt Nhật'
            ],
            [
                'id' => 30,
                'candidate_id' => 127,
                'school' => 'Đại học Bách khoa Hà Nội',
                'major' => 'Công nghệ thông tin',
                'start_date' => new Carbon('2019-09-09'),
                'end_date' => new Carbon('2024-08-09'),
                'description' => 'Học chuyên ngành CNTT Việt Nhật'
            ],
            [
                'id' => 31,
                'candidate_id' => 128,
                'school' => 'Đại học Bách khoa Hà Nội',
                'major' => 'Công nghệ thông tin',
                'start_date' => new Carbon('2019-09-09'),
                'end_date' => new Carbon('2024-08-09'),
                'description' => 'Học chuyên ngành CNTT Việt Nhật'
            ],
            [
                'id' => 32,
                'candidate_id' => 129,
                'school' => 'Đại học Bách khoa Hà Nội',
                'major' => 'Công nghệ thông tin',
                'start_date' => new Carbon('2019-09-09'),
                'end_date' => new Carbon('2024-08-09'),
                'description' => 'Học chuyên ngành CNTT Việt Nhật'
            ],
            [
                'id' => 33,
                'candidate_id' => 130,
                'school' => 'Đại học Bách khoa Hà Nội',
                'major' => 'Công nghệ thông tin',
                'start_date' => new Carbon('2019-09-09'),
                'end_date' => new Carbon('2024-08-09'),
                'description' => 'Học chuyên ngành CNTT Việt Nhật'
            ],
            [
                'id' => 34,
                'candidate_id' => 131,
                'school' => 'Đại học Bách khoa Hà Nội',
                'major' => 'Công nghệ thông tin',
                'start_date' => new Carbon('2019-09-09'),
                'end_date' => new Carbon('2024-08-09'),
                'description' => 'Học chuyên ngành CNTT Việt Nhật'
            ],
            [
                'id' => 35,
                'candidate_id' => 132,
                'school' => 'Đại học Bách khoa Hà Nội',
                'major' => 'Công nghệ thông tin',
                'start_date' => new Carbon('2019-09-09'),
                'end_date' => new Carbon('2024-08-09'),
                'description' => 'Học chuyên ngành CNTT Việt Nhật'
            ],
            [
                'id' => 36,
                'candidate_id' => 133,
                'school' => 'Đại học Bách khoa Hà Nội',
                'major' => 'Công nghệ thông tin',
                'start_date' => new Carbon('2019-09-09'),
                'end_date' => new Carbon('2024-08-09'),
                'description' => 'Học chuyên ngành CNTT Việt Nhật'
            ],
        ]);
    }
}
