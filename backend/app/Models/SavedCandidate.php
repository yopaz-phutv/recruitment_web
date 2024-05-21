<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SavedCandidate extends Model
{
    use HasFactory;
    protected $table = "candidate_bookmarks";
    protected $guarded = [];

    public function jobs()
    {
        return $this->belongsToMany(Job::class, 'candidate_bookmarks_detail', 'candidate_bookmarks_id', 'job_id');
    }
}
