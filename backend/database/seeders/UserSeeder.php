<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // admins: 1-10, employers: 11-100, candidates: 101-...
        DB::table('users')->insert([
            // admins:
            ['id' => 1, 'email' => 'ngoc@gmail.com', 'password' => Hash::make('ngoc12345'), 'role' => 0],

            // employers:
            ['id' => 11, 'email' => 'huy@gmail.com', 'password' => Hash::make('huy12345'), 'role' => 2],
            ['id' => 12, 'email' => 'company12@gmail.com', 'password' => Hash::make('company@12345'), 'role' => 2],
            ['id' => 13, 'email' => 'company13@gmail.com', 'password' => Hash::make('company@12345'), 'role' => 2],
            ['id' => 14, 'email' => 'company14@gmail.com', 'password' => Hash::make('company@12345'), 'role' => 2],
            ['id' => 15, 'email' => 'company15@gmail.com', 'password' => Hash::make('company@12345'), 'role' => 2],
            ['id' => 16, 'email' => 'company16@gmail.com', 'password' => Hash::make('company@12345'), 'role' => 2],
            ['id' => 17, 'email' => 'company17@gmail.com', 'password' => Hash::make('company@12345'), 'role' => 2],
            ['id' => 18, 'email' => 'company18@gmail.com', 'password' => Hash::make('company@12345'), 'role' => 2],
            ['id' => 19, 'email' => 'company19@gmail.com', 'password' => Hash::make('company@12345'), 'role' => 2],
            ['id' => 20, 'email' => 'company20@gmail.com', 'password' => Hash::make('company@12345'), 'role' => 2],
            ['id' => 21, 'email' => 'company21@gmail.com', 'password' => Hash::make('company@12345'), 'role' => 2],
            ['id' => 22, 'email' => 'company22@gmail.com', 'password' => Hash::make('company@12345'), 'role' => 2],
            ['id' => 23, 'email' => 'company23@gmail.com', 'password' => Hash::make('company@12345'), 'role' => 2],
            ['id' => 24, 'email' => 'company24@gmail.com', 'password' => Hash::make('company@12345'), 'role' => 2],
            ['id' => 25, 'email' => 'company25@gmail.com', 'password' => Hash::make('company@12345'), 'role' => 2],
            ['id' => 26, 'email' => 'company26@gmail.com', 'password' => Hash::make('company@12345'), 'role' => 2],
            ['id' => 27, 'email' => 'company27@gmail.com', 'password' => Hash::make('company@12345'), 'role' => 2],
            ['id' => 28, 'email' => 'company28@gmail.com', 'password' => Hash::make('company@12345'), 'role' => 2],

            // candidates:
            ['id' => 101, 'email' => 'tranphudhak@gmail.com', 'password' => Hash::make('phu12345'), 'role' => 1],
            ['id' => 102, 'email' => 'thoa@gmail.com', 'password' => Hash::make('thoa12345'), 'role' => 1],
            ['id' => 103, 'email' => 'diep@gmail.com', 'password' => Hash::make('diep12345'), 'role' => 1],
            ['id' => 104, 'email' => 'phong@gmail.com', 'password' => Hash::make('phong12345'), 'role' => 1],
            ['id' => 105, 'email' => 'quang@gmail.com', 'password' => Hash::make('quang12345'), 'role' => 1],
            ['id' => 106, 'email' => 'candidate6@gmail.com', 'password' => Hash::make('cand@12345'), 'role' => 1],
            ['id' => 107, 'email' => 'candidate7@gmail.com', 'password' => Hash::make('cand@12345'), 'role' => 1],
            ['id' => 108, 'email' => 'candidate8@gmail.com', 'password' => Hash::make('cand@12345'), 'role' => 1],
            ['id' => 109, 'email' => 'candidate9@gmail.com', 'password' => Hash::make('cand@12345'), 'role' => 1],
            ['id' => 110, 'email' => 'candidate10@gmail.com', 'password' => Hash::make('cand@12345'), 'role' => 1],
            ['id' => 111, 'email' => 'candidate11@gmail.com', 'password' => Hash::make('cand@12345'), 'role' => 1],
            ['id' => 112, 'email' => 'candidate12@gmail.com', 'password' => Hash::make('cand@12345'), 'role' => 1],
            ['id' => 113, 'email' => 'candidate13@gmail.com', 'password' => Hash::make('cand@12345'), 'role' => 1],
            ['id' => 114, 'email' => 'candidate14@gmail.com', 'password' => Hash::make('cand@12345'), 'role' => 1],
            ['id' => 115, 'email' => 'candidate15@gmail.com', 'password' => Hash::make('cand@12345'), 'role' => 1],
            ['id' => 116, 'email' => 'candidate16@gmail.com', 'password' => Hash::make('cand@12345'), 'role' => 1],
            ['id' => 117, 'email' => 'candidate17@gmail.com', 'password' => Hash::make('cand@12345'), 'role' => 1],
            ['id' => 118, 'email' => 'candidate18@gmail.com', 'password' => Hash::make('cand@12345'), 'role' => 1],
            ['id' => 119, 'email' => 'candidate19@gmail.com', 'password' => Hash::make('cand@12345'), 'role' => 1],
            ['id' => 120, 'email' => 'candidate20@gmail.com', 'password' => Hash::make('cand@12345'), 'role' => 1],
            ['id' => 121, 'email' => 'candidate21@gmail.com', 'password' => Hash::make('cand@12345'), 'role' => 1],
            ['id' => 122, 'email' => 'candidate22@gmail.com', 'password' => Hash::make('cand@12345'), 'role' => 1],
            ['id' => 123, 'email' => 'candidate23@gmail.com', 'password' => Hash::make('cand@12345'), 'role' => 1],
            ['id' => 124, 'email' => 'candidate24@gmail.com', 'password' => Hash::make('cand@12345'), 'role' => 1],
            ['id' => 125, 'email' => 'candidate25@gmail.com', 'password' => Hash::make('cand@12345'), 'role' => 1],
            ['id' => 126, 'email' => 'candidate26@gmail.com', 'password' => Hash::make('cand@12345'), 'role' => 1],
            ['id' => 127, 'email' => 'candidate27@gmail.com', 'password' => Hash::make('cand@12345'), 'role' => 1],
            ['id' => 128, 'email' => 'candidate28@gmail.com', 'password' => Hash::make('cand@12345'), 'role' => 1],
            ['id' => 129, 'email' => 'candidate29@gmail.com', 'password' => Hash::make('cand@12345'), 'role' => 1],
            ['id' => 130, 'email' => 'candidate30@gmail.com', 'password' => Hash::make('cand@12345'), 'role' => 1],
            ['id' => 131, 'email' => 'candidate31@gmail.com', 'password' => Hash::make('cand@12345'), 'role' => 1],
            ['id' => 132, 'email' => 'candidate32@gmail.com', 'password' => Hash::make('cand@12345'), 'role' => 1],
            ['id' => 133, 'email' => 'candidate33@gmail.com', 'password' => Hash::make('cand@12345'), 'role' => 1],
        ]);
    }
}
