<?php

namespace App\Listeners;

use App\Events\UserRegsiter;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

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
    public function handle(UserRegsiter $event): void
    {
        //
    }
}
