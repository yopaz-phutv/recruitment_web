<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LocationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('locations')->insert([
            ['id' => 1, 'name' => 'Hà Nội'],
            ['id' => 2, 'name' => 'Hồ Chí Minh'],
            ['id'=> 3, 'name'=>'Đà Nẵng'],
            ['id'=> 4, 'name'=>'Hải Phòng'],
            ['id'=> 5, 'name'=>'Bắc Giang'],
            ['id'=> 6, 'name'=>'Bắc Ninh'],
            ['id'=> 7, 'name'=>'Hưng Yên'],
            ['id'=> 8, 'name'=>'Hải Dương'],
            ['id'=> 9, 'name'=>'Bình Định'],
            ['id'=> 10, 'name'=>'Bình Phước'],
            ['id'=> 11, 'name'=>'Bình Thuận'],
            ['id'=> 12, 'name'=>'Cà Mau'],
            ['id'=> 13, 'name'=>'Cao Bằng'],
            ['id'=> 14, 'name'=>'Cần Thơ'],
            ['id'=> 15, 'name'=>'Bạc Liêu'],
            ['id'=> 16, 'name'=>'Đắk Lắk'],
            ['id'=> 17, 'name'=>'Đắk Nông'],
            ['id'=> 18, 'name'=>'Điện Biên'],
            ['id'=> 19, 'name'=>'Đồng Nai'],
            ['id'=> 20, 'name'=>'Đồng Tháp'],
            ['id'=> 21, 'name'=>'Gia Lai'],
            ['id'=> 22, 'name'=>'Hà Giang'],
            ['id'=> 23, 'name'=>'Hà Nam'],
            ['id'=> 24, 'name'=>'An Giang'],
            ['id'=> 25, 'name'=>'Hà Tĩnh'],
            ['id'=> 26, 'name'=>'Bình Dương'],
            ['id'=> 27, 'name'=>'Bắc Kạn'],
            ['id'=> 28, 'name'=>'Hòa Bình'],
            ['id'=> 29, 'name'=>'Bà Rịa-Vũng Tàu'],
            ['id'=> 30, 'name'=>'Hậu Giang'],
            ['id'=> 31, 'name'=>'Bến Tre'],
            ['id'=> 32, 'name'=>'Khánh Hòa'],
            ['id'=> 33, 'name'=>'Kiên Giang'],
            ['id'=> 34, 'name'=>'Kon Tum'],
            ['id'=> 35, 'name'=>'Lai Châu'],
            ['id'=> 36, 'name'=>'Lào Cai'],
            ['id'=> 37, 'name'=>'Lạng Sơn'],
            ['id'=> 38, 'name'=>'Lâm Đồng'],
            ['id'=> 39, 'name'=>'Long An'],
            ['id'=> 40, 'name'=>'Nam Định'],
            ['id'=> 41, 'name'=>'Nghệ An'],
            ['id'=> 42, 'name'=>'Ninh Bình'],
            ['id'=> 43, 'name'=>'Ninh Thuận'],
            ['id'=> 44, 'name'=>'Phú Thọ'],
            ['id'=> 45, 'name'=>'Phú Yên'],
            ['id'=> 46, 'name'=>'Quảng Bình'],
            ['id'=> 47, 'name'=>'Quảng Nam'],
            ['id'=> 48, 'name'=>'Quảng Ngãi'],
            ['id'=> 49, 'name'=>'Quảng Ninh'],
            ['id'=> 50, 'name'=>'Quảng Trị'],
            ['id'=> 51, 'name'=>'Sóc Trăng'],
            ['id'=> 52, 'name'=>'Sơn La'],
            ['id'=> 53, 'name'=>'Tây Ninh'],
            ['id'=> 54, 'name'=>'Thái Bình'],
            ['id'=> 55, 'name'=>'Thái Nguyên'],
            ['id'=> 56, 'name'=>'Thanh Hóa'],
            ['id'=> 57, 'name'=>'Thừa Thiên-Huế'],
            ['id'=> 58, 'name'=>'Tiền Giang'],
            ['id'=> 59, 'name'=>'Trà Vinh'],
            ['id'=> 60, 'name'=>'Tuyên Quang'],
            ['id'=> 61, 'name'=>'Vĩnh Long'],
            ['id'=> 62, 'name'=>'Vĩnh Phúc'],
            ['id'=> 63, 'name'=>'Yên Bái']
        ]);
    }
}
