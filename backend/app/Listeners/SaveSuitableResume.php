<?php

namespace App\Listeners;

use App\Events\SendRecommend2Candidate;
use App\Models\CandidateBookmark;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Storage;

class SaveSuitableResume implements ShouldQueue
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
    public function handle(SendRecommend2Candidate $event): void
    {
        $new_path = "suitable_resumes/suitable_resume_{$event->bookmark_id}.png";
        Storage::copy("resumes/resume_{$event->resume_id}.png", $new_path);
        $url = getViewLinkFromGgStorageUrl(Storage::url($new_path));

        CandidateBookmark::where('id', $event->bookmark_id)->update([
            'is_send_noti' => 1,
            'resume_link' => $url
        ]);
    }
}
