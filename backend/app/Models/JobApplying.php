<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JobApplying extends Model
{
    use HasFactory;

    protected $table = "job_applying";
    protected $guarded = [];
    public $timestamps = false;
}
