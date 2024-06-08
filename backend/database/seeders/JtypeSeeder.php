<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class JtypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('jtypes')->insert([
            ['id' => 1, 'name' => 'Toàn thời gian'],
            ['id' => 2, 'name' => 'Bán thời gian'],
            ['id' => 3, 'name' => 'Thực tập'],
        ]);
    }
}
