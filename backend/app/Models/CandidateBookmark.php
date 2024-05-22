<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CandidateBookmark extends Model
{
    use HasFactory;
    protected $table = "candidate_bookmarks";
    protected $guarded = [];

    public function jobs()
    {
        return $this->belongsToMany(Job::class, 'candidate_bookmark_detail', 'candidate_bookmark_id', 'job_id');
    }
}
