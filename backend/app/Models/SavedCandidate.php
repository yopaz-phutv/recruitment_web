<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SavedCandidate extends Model
{
    use HasFactory;
    protected $table = "saved_candidates";
    protected $guarded = [];

    public function jobs()
    {
        return $this->belongsToMany(Job::class, 'saved_candidates_detail', 'saved_candidates_id', 'job_id');
    }
}
