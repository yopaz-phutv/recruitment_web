<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CertificateSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('certificates')->insert([
            [
                'id' => 1,
                'candidate_id' => 101,
                'name' => 'TOEIC 700',
                'receive_date' => new Carbon('2021-09-25'),
                'expire_date' => null,
            ],
            [
                'id' => 2,
                'candidate_id' => 101,
                'name' => 'Tiếng Nhật N3',
                'receive_date' => new Carbon('2022-09-25'),
                'expire_date' => null,
            ],
            [
                'id' => 3,
                'candidate_id' => 102,
                'name' => 'TOEIC 700',
                'receive_date' => new Carbon('2021-09-25'),
                'expire_date' => null,
            ],
            [
                'id' => 4,
                'candidate_id' => 102,
                'name' => 'Tiếng Nhật N3',
                'receive_date' => new Carbon('2022-09-25'),
                'expire_date' => null,
            ],
            [
                'id' => 5,
                'candidate_id' => 103,
                'name' => 'TOEIC 700',
                'receive_date' => new Carbon('2021-09-25'),
                'expire_date' => null,
            ],
            [
                'id' => 6,
                'candidate_id' => 103,
                'name' => 'Tiếng Nhật N3',
                'receive_date' => new Carbon('2022-09-25'),
                'expire_date' => null,
            ],
            [
                'id' => 7,
                'candidate_id' => 104,
                'name' => 'TOEIC 700',
                'receive_date' => new Carbon('2021-09-25'),
                'expire_date' => null,
            ],
            [
                'id' => 8,
                'candidate_id' => 105,
                'name' => 'TOEIC 700',
                'receive_date' => new Carbon('2021-09-25'),
                'expire_date' => null,
            ],
            [
                'id' => 9,
                'candidate_id' => 106,
                'name' => 'TOEIC 700',
                'receive_date' => new Carbon('2021-09-25'),
                'expire_date' => null,
            ],
            [
                'id' => 10,
                'candidate_id' => 107,
                'name' => 'TOEIC 700',
                'receive_date' => new Carbon('2021-09-25'),
                'expire_date' => null,
            ],
            [
                'id' => 11,
                'candidate_id' => 108,
                'name' => 'TOEIC 700',
                'receive_date' => new Carbon('2021-09-25'),
                'expire_date' => null,
            ],
            [
                'id' => 12,
                'candidate_id' => 109,
                'name' => 'TOEIC 700',
                'receive_date' => new Carbon('2021-09-25'),
                'expire_date' => null,
            ],
            [
                'id' => 13,
                'candidate_id' => 110,
                'name' => 'TOEIC 700',
                'receive_date' => new Carbon('2021-09-25'),
                'expire_date' => null,
            ],
            [
                'id' => 14,
                'candidate_id' => 111,
                'name' => 'TOEIC 700',
                'receive_date' => new Carbon('2021-09-25'),
                'expire_date' => null,
            ],
            [
                'id' => 15,
                'candidate_id' => 112,
                'name' => 'TOEIC 700',
                'receive_date' => new Carbon('2021-09-25'),
                'expire_date' => null,
            ],
            [
                'id' => 16,
                'candidate_id' => 113,
                'name' => 'TOEIC 700',
                'receive_date' => new Carbon('2021-09-25'),
                'expire_date' => null,
            ],
            [
                'id' => 17,
                'candidate_id' => 114,
                'name' => 'TOEIC 700',
                'receive_date' => new Carbon('2021-09-25'),
                'expire_date' => null,
            ],
            [
                'id' => 18,
                'candidate_id' => 115,
                'name' => 'TOEIC 700',
                'receive_date' => new Carbon('2021-09-25'),
                'expire_date' => null,
            ],
            [
                'id' => 19,
                'candidate_id' => 116,
                'name' => 'TOEIC 700',
                'receive_date' => new Carbon('2021-09-25'),
                'expire_date' => null,
            ],
            [
                'id' => 20,
                'candidate_id' => 117,
                'name' => 'TOEIC 700',
                'receive_date' => new Carbon('2021-09-25'),
                'expire_date' => null,
            ],
            [
                'id' => 21,
                'candidate_id' => 118,
                'name' => 'TOEIC 700',
                'receive_date' => new Carbon('2021-09-25'),
                'expire_date' => null,
            ],
            [
                'id' => 22,
                'candidate_id' => 119,
                'name' => 'TOEIC 700',
                'receive_date' => new Carbon('2021-09-25'),
                'expire_date' => null,
            ],
            [
                'id' => 23,
                'candidate_id' => 120,
                'name' => 'TOEIC 700',
                'receive_date' => new Carbon('2021-09-25'),
                'expire_date' => null,
            ],
            [
                'id' => 24,
                'candidate_id' => 121,
                'name' => 'TOEIC 700',
                'receive_date' => new Carbon('2021-09-25'),
                'expire_date' => null,
            ],
            [
                'id' => 25,
                'candidate_id' => 122,
                'name' => 'TOEIC 700',
                'receive_date' => new Carbon('2021-09-25'),
                'expire_date' => null,
            ],
            [
                'id' => 26,
                'candidate_id' => 123,
                'name' => 'TOEIC 700',
                'receive_date' => new Carbon('2021-09-25'),
                'expire_date' => null,
            ],
            [
                'id' => 27,
                'candidate_id' => 124,
                'name' => 'TOEIC 700',
                'receive_date' => new Carbon('2021-09-25'),
                'expire_date' => null,
            ],
            [
                'id' => 28,
                'candidate_id' => 125,
                'name' => 'TOEIC 700',
                'receive_date' => new Carbon('2021-09-25'),
                'expire_date' => null,
            ],
            [
                'id' => 29,
                'candidate_id' => 126,
                'name' => 'TOEIC 700',
                'receive_date' => new Carbon('2021-09-25'),
                'expire_date' => null,
            ],
            [
                'id' => 30,
                'candidate_id' => 127,
                'name' => 'TOEIC 700',
                'receive_date' => new Carbon('2021-09-25'),
                'expire_date' => null,
            ],
            [
                'id' => 31,
                'candidate_id' => 128,
                'name' => 'TOEIC 700',
                'receive_date' => new Carbon('2021-09-25'),
                'expire_date' => null,
            ],
            [
                'id' => 32,
                'candidate_id' => 129,
                'name' => 'TOEIC 700',
                'receive_date' => new Carbon('2021-09-25'),
                'expire_date' => null,
            ],
            [
                'id' => 33,
                'candidate_id' => 130,
                'name' => 'TOEIC 700',
                'receive_date' => new Carbon('2021-09-25'),
                'expire_date' => null,
            ],
            [
                'id' => 34,
                'candidate_id' => 131,
                'name' => 'TOEIC 700',
                'receive_date' => new Carbon('2021-09-25'),
                'expire_date' => null,
            ],
            [
                'id' => 35,
                'candidate_id' => 132,
                'name' => 'TOEIC 700',
                'receive_date' => new Carbon('2021-09-25'),
                'expire_date' => null,
            ],
            [
                'id' => 36,
                'candidate_id' => 133,
                'name' => 'TOEIC 700',
                'receive_date' => new Carbon('2021-09-25'),
                'expire_date' => null,
            ],
            [
                'id' => 37,
                'candidate_id' => 134,
                'name' => 'TOEIC 700',
                'receive_date' => new Carbon('2021-09-25'),
                'expire_date' => null,
            ],
        ]);
    }
}
