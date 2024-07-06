<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SkillSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('skills')->insert([
            [
                'id' => 1,
                'candidate_id' => 101,
                'name' => 'Lập trình',
                'proficiency' => 4,
                'description' => 'Java, PHP, HTML, CSS, JavaScript, jQuery, Bootstrap'
            ],
            [
                'id' => 2,
                'candidate_id' => 101,
                'name' => 'Cơ sở dữ liệu',
                'proficiency' => 4,
                'description' => 'MySQL, PostGreSQL'
            ],
            [
                'id' => 3,
                'candidate_id' => 102,
                'name' => 'Lập trình',
                'proficiency' => 4,
                'description' => 'Java, PHP, HTML, CSS, JavaScript, jQuery, Bootstrap'
            ],
            [
                'id' => 4,
                'candidate_id' => 102,
                'name' => 'Cơ sở dữ liệu',
                'proficiency' => 4,
                'description' => 'MySQL, PostGreSQL'
            ],
            [
                'id' => 5,
                'candidate_id' => 103,
                'name' => 'Lập trình',
                'proficiency' => 4,
                'description' => 'Java, PHP, HTML, CSS, JavaScript, jQuery, Bootstrap'
            ],
            [
                'id' => 6,
                'candidate_id' => 103,
                'name' => 'Cơ sở dữ liệu',
                'proficiency' => 4,
                'description' => 'MySQL, PostGreSQL'
            ],
            [
                'id' => 7,
                'candidate_id' => 104,
                'name' => 'Lập trình',
                'proficiency' => 4,
                'description' => 'Java, PHP, Laravel, HTML, CSS, JavaScript, jQuery, ReactJS, Bootstrap'
            ],
            [
                'id' => 8,
                'candidate_id' => 104,
                'name' => 'Cơ sở dữ liệu',
                'proficiency' => 4,
                'description' => 'MySQL, PostGreSQL'
            ],
            [
                'id' => 9,
                'candidate_id' => 105,
                'name' => 'Lập trình',
                'proficiency' => 4,
                'description' => 'Java, PHP, Laravel, HTML, CSS, JavaScript, jQuery, ReactJS, Bootstrap'
            ],
            [
                'id' => 10,
                'candidate_id' => 105,
                'name' => 'Cơ sở dữ liệu',
                'proficiency' => 4,
                'description' => 'MySQL, PostGreSQL'
            ],
            [
                'id' => 11,
                'candidate_id' => 106,
                'name' => 'Lập trình',
                'proficiency' => 4,
                'description' => 'Java, PHP, Laravel, HTML, CSS, JavaScript, jQuery, ReactJS, Bootstrap'
            ],
            [
                'id' => 12,
                'candidate_id' => 106,
                'name' => 'Cơ sở dữ liệu',
                'proficiency' => 4,
                'description' => 'MySQL, PostGreSQL'
            ],
            [
                'id' => 13,
                'candidate_id' => 107,
                'name' => 'Lập trình',
                'proficiency' => 4,
                'description' => 'Java, PHP, HTML, CSS, JavaScript, jQuery, ReactJS'
            ],
            [
                'id' => 14,
                'candidate_id' => 107,
                'name' => 'Cơ sở dữ liệu',
                'proficiency' => 4,
                'description' => 'PostGreSQL'
            ],
            [
                'id' => 15,
                'candidate_id' => 108,
                'name' => 'Lập trình',
                'proficiency' => 4,
                'description' => 'Java, PHP, HTML, CSS, JavaScript, jQuery, ReactJS'
            ],
            [
                'id' => 16,
                'candidate_id' => 108,
                'name' => 'Cơ sở dữ liệu',
                'proficiency' => 4,
                'description' => 'PostGreSQL'
            ],
            [
                'id' => 17,
                'candidate_id' => 109,
                'name' => 'Lập trình',
                'proficiency' => 4,
                'description' => 'Java, PHP, HTML, CSS, JavaScript, jQuery, ReactJS, Bootstrap'
            ],
            [
                'id' => 18,
                'candidate_id' => 109,
                'name' => 'Cơ sở dữ liệu',
                'proficiency' => 4,
                'description' => 'MySQL, PostGreSQL'
            ],
            [
                'id' => 19,
                'candidate_id' => 110,
                'name' => 'Lập trình',
                'proficiency' => 4,
                'description' => 'Java, PHP, HTML, CSS, JavaScript, jQuery, ReactJS, Bootstrap'
            ],
            [
                'id' => 20,
                'candidate_id' => 110,
                'name' => 'Cơ sở dữ liệu',
                'proficiency' => 4,
                'description' => 'MySQL, PostGreSQL'
            ],
            [
                'id' => 21,
                'candidate_id' => 111,
                'name' => 'Lập trình',
                'proficiency' => 4,
                'description' => 'Java, PHP, HTML, CSS, JavaScript, jQuery, ReactJS, Bootstrap'
            ],
            [
                'id' => 22,
                'candidate_id' => 111,
                'name' => 'Cơ sở dữ liệu',
                'proficiency' => 4,
                'description' => 'MySQL, PostGreSQL'
            ],

            [
                'id' => 23,
                'candidate_id' => 112,
                'name' => 'Lập trình',
                'proficiency' => 4,
                'description' => 'PHP, Laravel, HTML, SCSS, JavaScript, jQuery, ReactJS, Tailwind'
            ],
            [
                'id' => 24,
                'candidate_id' => 112,
                'name' => 'Cơ sở dữ liệu',
                'proficiency' => 4,
                'description' => 'MySQL, PostGreSQL'
            ],
            [
                'id' => 25,
                'candidate_id' => 113,
                'name' => 'Lập trình',
                'proficiency' => 4,
                'description' => 'PHP, Laravel, HTML, SCSS, JavaScript, jQuery, ReactJS, Tailwind'
            ],
            [
                'id' => 26,
                'candidate_id' => 113,
                'name' => 'Cơ sở dữ liệu',
                'proficiency' => 4,
                'description' => 'MySQL, PostGreSQL'
            ],
            [
                'id' => 27,
                'candidate_id' => 114,
                'name' => 'Lập trình',
                'proficiency' => 4,
                'description' => 'PHP, Laravel, HTML, SCSS, JavaScript, jQuery, ReactJS, VueJS, Bootstrap, Tailwind'
            ],
            [
                'id' => 28,
                'candidate_id' => 114,
                'name' => 'Cơ sở dữ liệu',
                'proficiency' => 4,
                'description' => 'MySQL, PostGreSQL'
            ],
            [
                'id' => 29,
                'candidate_id' => 115,
                'name' => 'Lập trình',
                'proficiency' => 4,
                'description' => 'PHP, Laravel, HTML, SCSS, JavaScript, jQuery, ReactJS, VueJS, Bootstrap, Tailwind'
            ],
            [
                'id' => 30,
                'candidate_id' => 115,
                'name' => 'Cơ sở dữ liệu',
                'proficiency' => 4,
                'description' => 'MySQL, PostGreSQL'
            ],
            [
                'id' => 31,
                'candidate_id' => 116,
                'name' => 'Lập trình',
                'proficiency' => 4,
                'description' => 'PHP, Laravel, HTML, SCSS, JavaScript, VueJS, Bootstrap'
            ],
            [
                'id' => 32,
                'candidate_id' => 116,
                'name' => 'Cơ sở dữ liệu',
                'proficiency' => 4,
                'description' => 'PostGreSQL'
            ],
            [
                'id' => 33,
                'candidate_id' => 117,
                'name' => 'Lập trình',
                'proficiency' => 4,
                'description' => 'PHP, Laravel, HTML, SCSS, JavaScript, VueJS, Bootstrap'
            ],
            [
                'id' => 34,
                'candidate_id' => 117,
                'name' => 'Cơ sở dữ liệu',
                'proficiency' => 4,
                'description' => 'MySQL, PostGreSQL'
            ],
            [
                'id' => 35,
                'candidate_id' => 118,
                'name' => 'Lập trình',
                'proficiency' => 4,
                'description' => 'PHP, Laravel, HTML, SCSS, JavaScript, jQuery, ReactJS, VueJS, Bootstrap, Tailwind'
            ],
            [
                'id' => 36,
                'candidate_id' => 118,
                'name' => 'Cơ sở dữ liệu',
                'proficiency' => 4,
                'description' => 'MySQL, PostGreSQL'
            ],
            [
                'id' => 37,
                'candidate_id' => 119,
                'name' => 'Lập trình',
                'proficiency' => 4,
                'description' => 'PHP, Laravel, HTML, SCSS, JavaScript, jQuery, ReactJS, VueJS, Bootstrap, Tailwind'
            ],
            [
                'id' => 38,
                'candidate_id' => 119,
                'name' => 'Cơ sở dữ liệu',
                'proficiency' => 4,
                'description' => 'MySQL, PostGreSQL'
            ],

            [
                'id' => 39,
                'candidate_id' => 120,
                'name' => 'Kỹ năng chuyên môn',
                'proficiency' => 4,
                'description' => '- Giao tiếp, xử lý tình huống, quản lý thời gian'
            ],
            [
                'id' => 40,
                'candidate_id' => 120,
                'name' => 'Kỹ năng khác',
                'proficiency' => 4,
                'description' => 'Tiếng Anh, tiếng Nhật'
            ],
            [
                'id' => 41,
                'candidate_id' => 121,
                'name' => 'Kỹ năng chuyên môn',
                'proficiency' => 4,
                'description' => '- Giao tiếp, xử lý tình huống, quản lý thời gian'
            ],
            [
                'id' => 42,
                'candidate_id' => 121,
                'name' => 'Kỹ năng khác',
                'proficiency' => 4,
                'description' => 'Tiếng Anh, tiếng Nhật'
            ],
            [
                'id' => 43,
                'candidate_id' => 122,
                'name' => 'Kỹ năng chuyên môn',
                'proficiency' => 4,
                'description' => '- Giao tiếp, xử lý tình huống, quản lý thời gian'
            ],
            [
                'id' => 44,
                'candidate_id' => 122,
                'name' => 'Kỹ năng khác',
                'proficiency' => 4,
                'description' => 'Tiếng Anh, tiếng Nhật'
            ],
            [
                'id' => 45,
                'candidate_id' => 123,
                'name' => 'Kỹ năng chuyên môn',
                'proficiency' => 4,
                'description' => '- Giao tiếp, xử lý tình huống, quản lý thời gian'
            ],
            [
                'id' => 46,
                'candidate_id' => 123,
                'name' => 'Kỹ năng khác',
                'proficiency' => 4,
                'description' => 'Tiếng Anh, tiếng Nhật'
            ],
            [
                'id' => 47,
                'candidate_id' => 124,
                'name' => 'Kỹ năng chuyên môn',
                'proficiency' => 4,
                'description' => '- Giao tiếp, xử lý tình huống, quản lý thời gian'
            ],
            [
                'id' => 48,
                'candidate_id' => 124,
                'name' => 'Kỹ năng khác',
                'proficiency' => 4,
                'description' => 'Tiếng Anh, tiếng Nhật'
            ],
            [
                'id' => 49,
                'candidate_id' => 125,
                'name' => 'Kỹ năng chuyên môn',
                'proficiency' => 4,
                'description' => '- Giao tiếp, xử lý tình huống, quản lý thời gian'
            ],
            [
                'id' => 50,
                'candidate_id' => 125,
                'name' => 'Kỹ năng khác',
                'proficiency' => 4,
                'description' => 'Tiếng Anh, tiếng Nhật'
            ],
            [
                'id' => 51,
                'candidate_id' => 126,
                'name' => 'Kỹ năng chuyên môn',
                'proficiency' => 4,
                'description' => '- Giao tiếp, xử lý tình huống, quản lý thời gian'
            ],
            [
                'id' => 52,
                'candidate_id' => 126,
                'name' => 'Kỹ năng khác',
                'proficiency' => 4,
                'description' => 'Tiếng Anh, tiếng Nhật'
            ],
            [
                'id' => 53,
                'candidate_id' => 127,
                'name' => 'Kỹ năng chuyên môn',
                'proficiency' => 4,
                'description' => '- Giao tiếp, xử lý tình huống, quản lý thời gian'
            ],
            [
                'id' => 54,
                'candidate_id' => 127,
                'name' => 'Kỹ năng khác',
                'proficiency' => 4,
                'description' => 'Tiếng Anh, tiếng Nhật'
            ],
            [
                'id' => 55,
                'candidate_id' => 128,
                'name' => 'Kỹ năng chuyên môn',
                'proficiency' => 4,
                'description' => '- Giao tiếp, xử lý tình huống, quản lý thời gian'
            ],
            [
                'id' => 56,
                'candidate_id' => 128,
                'name' => 'Kỹ năng khác',
                'proficiency' => 4,
                'description' => 'Tiếng Anh, tiếng Nhật'
            ],

            [
                'id' => 57,
                'candidate_id' => 129,
                'name' => 'Lập trình',
                'proficiency' => 4,
                'description' => 'Java, PHP, Laravel, HTML, CSS, JavaScript, jQuery, ReactJS, Bootstrap'
            ],
            [
                'id' => 58,
                'candidate_id' => 129,
                'name' => 'Cơ sở dữ liệu',
                'proficiency' => 4,
                'description' => 'MySQL, PostGreSQL'
            ],       
            [
                'id' => 59,
                'candidate_id' => 130,
                'name' => 'Lập trình',
                'proficiency' => 4,
                'description' => 'Java, PHP, Laravel, HTML, CSS, JavaScript, jQuery, ReactJS, Bootstrap'
            ],
            [
                'id' => 62,
                'candidate_id' => 130,
                'name' => 'Cơ sở dữ liệu',
                'proficiency' => 4,
                'description' => 'MySQL, PostGreSQL'
            ],
            [
                'id' => 63,
                'candidate_id' => 131,
                'name' => 'Lập trình',
                'proficiency' => 4,
                'description' => 'PHP, Laravel, HTML, SCSS, JavaScript, jQuery, ReactJS, Tailwind'
            ],
            [
                'id' => 64,
                'candidate_id' => 131,
                'name' => 'Cơ sở dữ liệu',
                'proficiency' => 4,
                'description' => 'MySQL, PostGreSQL'
            ],
            [
                'id' => 65,
                'candidate_id' => 132,
                'name' => 'Lập trình',
                'proficiency' => 4,
                'description' => 'PHP, Laravel, HTML, SCSS, JavaScript, jQuery, ReactJS, Tailwind'
            ],
            [
                'id' => 66,
                'candidate_id' => 132,
                'name' => 'Cơ sở dữ liệu',
                'proficiency' => 4,
                'description' => 'MySQL, PostGreSQL'
            ],         
            [
                'id' => 67,
                'candidate_id' => 133,
                'name' => 'Kỹ năng chuyên môn',
                'proficiency' => 4,
                'description' => '- Giao tiếp, xử lý tình huống, quản lý thời gian'
            ],
            [
                'id' => 68,
                'candidate_id' => 133,
                'name' => 'Kỹ năng khác',
                'proficiency' => 4,
                'description' => 'Tiếng Anh, tiếng Nhật'
            ],
            [
                'id' => 69,
                'candidate_id' => 134,
                'name' => 'Lập trình',
                'proficiency' => 4,
                'description' => 'Java, PHP, Laravel, HTML, CSS, JavaScript, jQuery, ReactJS, Bootstrap'
            ],
            [
                'id' => 70,
                'candidate_id' => 134,
                'name' => 'Cơ sở dữ liệu',
                'proficiency' => 4,
                'description' => 'MySQL, PostGreSQL'
            ],       
        ]);
    }
}
