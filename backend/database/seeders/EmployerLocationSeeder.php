<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EmployerLocationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('employer_location')->insert([
            ['employer_id' => 11, 'location_id' => 1],
            ['employer_id' => 12, 'location_id' => 1],
            ['employer_id' => 13, 'location_id' => 1],
            ['employer_id' => 14, 'location_id' => 1],
            ['employer_id' => 15, 'location_id' => 1],
            ['employer_id' => 16, 'location_id' => 1],
            ['employer_id' => 17, 'location_id' => 1],
            ['employer_id' => 18, 'location_id' => 2],
            ['employer_id' => 19, 'location_id' => 2],
            ['employer_id' => 20, 'location_id' => 2],
            ['employer_id' => 21, 'location_id' => 2],
            ['employer_id' => 22, 'location_id' => 2],
            ['employer_id' => 23, 'location_id' => 4],
            ['employer_id' => 24, 'location_id' => 1],
            ['employer_id' => 25, 'location_id' => 1],
            ['employer_id' => 26, 'location_id' => 2],
            ['employer_id' => 27, 'location_id' => 1],
            ['employer_id' => 28, 'location_id' => 2],
            // ['employer_id' => , 'location_id' => ],
            // ['employer_id' => , 'location_id' => ],
            // ['employer_id' => , 'location_id' => ],
            // ['employer_id' => , 'location_id' => ],
            // ['employer_id' => , 'location_id' => ],
            // ['employer_id' => , 'location_id' => ],
            // ['employer_id' => , 'location_id' => ],
            // ['employer_id' => , 'location_id' => ],
            // ['employer_id' => , 'location_id' => ],
            // ['employer_id' => , 'location_id' => ],
            // ['employer_id' => , 'location_id' => ],
            // ['employer_id' => , 'location_id' => ],
            // ['employer_id' => , 'location_id' => ],
            // ['employer_id' => , 'location_id' => ],
            // ['employer_id' => , 'location_id' => ],
        ]);
    }
}
