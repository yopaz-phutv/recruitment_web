<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Candidate extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function messages()
    {
        return $this->hasMany(CandidateMessage::class);
    }
    public function user()
    {
        return $this->hasOne(User::class);
    }
    public function educations()
    {
        return $this->hasMany(Education::class);
    }
    public function experiences()
    {
        return $this->hasMany(Experience::class);
    }
    public function projects()
    {
        return $this->hasMany(Project::class);
    }
    public function skills()
    {
        return $this->hasMany(Skill::class);
    }
    public function certificates()
    {
        return $this->hasMany(Certificate::class);
    }
    public function prizes()
    {
        return $this->hasMany(Prize::class);
    }
    public function activities()
    {
        return $this->hasMany(Activity::class);
    }
    public function others()
    {
        return $this->hasMany(Other::class);
    }
    public function resumes()
    {
        return $this->hasMany(Resume::class);
    }
    public function location()
    {
        return $this->hasOne(Location::class, 'id', 'location_id');
    }
    public function industry()
    {
        return $this->hasOne(Industry::class, 'id', 'desired_industry_id');
    }
    public function jtype()
    {
        return $this->hasOne(Jtype::class, 'id', 'desired_jtype_id');
    }
    public function jlevel()
    {
        return $this->hasOne(Jlevel::class, 'id', 'desired_jlevel_id');
    }
}
