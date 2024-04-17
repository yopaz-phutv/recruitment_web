<?php

namespace App\Listeners;

use App\Events\UserRegister;
use App\Models\Candidate;
use App\Models\Employer;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\DB;

class SaveDetailUserInfor
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(UserRegister $event): void
    {
        $user = $event->user;

        if ($user['role'] == 1) {
            Candidate::create([
                'id' => $user['id'],
                'user_id' => $user['id'],
                'firstname' => $user['firstname'],
                'lastname' => $user['lastname'],
                'email' => $user['email']
            ]);
        } else if ($user['role'] == 2) {
            $employer_id = $user['id'];
            $location_ids = $user['location_ids'];

            $employer_data = [
                'id' => $employer_id,
                'user_id' => $employer_id,
                'name' => $user['name'],
                'address' => $user['address'],
            ];
            if (isset($user['tax_code'])) {
                $employer_data['tax_code'] = $user['tax_code'];
            }
            if (isset($user['min_employees'])) {
                $employer_data['min_employees'] = $user['min_employees'];
            }
            if (isset($user['max_employees'])) {
                $employer_data['max_employees'] = $user['max_employees'];
            }
            Employer::create($employer_data);

            $employer_location_data = [];
            for ($i = 0; $i < count($location_ids); $i++) {
                $employer_location_data[$i] = [
                    'employer_id' => $employer_id,
                    'location_id' => $location_ids[$i]
                ];
            }
            DB::table('employer_location')->insert($employer_location_data);
        }
    }
}
