<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class IndustrySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('industries')->insert([
            ['id' => 1, 'name' => 'IT Phần mềm'],
            ['id' => 2, 'name' => 'IT Phần cứng'],
            ['id' => 3, 'name' => 'Kinh doanh / Bán hàng'],
            ['id' => 4, 'name' => 'Hành chính / Văn phòng'],
            ['id' => 5, 'name' => 'Nhân sự'],
            ['id' => 6, 'name' => 'Tư vấn'],
            ['id' => 7, 'name' => 'Biên / Phiên dịch'],
            ['id' => 8, 'name' => 'Giáo dục / Đào tạo'],
            ['id' => 9, 'name' => 'Ngân hàng / Tài chính'],
            // ['id' => , 'name' => ''],
            // ['id' => , 'name' => ''],
            // ['id' => , 'name' => ''],
            // ['id' => , 'name' => ''],
        ]);
    }
}
