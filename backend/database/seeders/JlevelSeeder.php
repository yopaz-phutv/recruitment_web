<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class JlevelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('jlevels')->insert([
            ['id' => 1, 'name' => 'Thực tập sinh'],
            ['id' => 2, 'name' => 'Nhân viên'],
            ['id' => 3, 'name' => 'Trưởng nhóm'],
            ['id' => 4, 'name' => 'Trưởng/Phó phòng'],
            ['id' => 5, 'name' => 'Quản lý/Giám sát'],
            ['id' => 6, 'name' => 'Trưởng chi nhánh'],
            ['id' => 7, 'name' => 'Giám đốc'],
            ['id' => 8, 'name' => 'Phó giám đốc'],
        ]);
    }
}
