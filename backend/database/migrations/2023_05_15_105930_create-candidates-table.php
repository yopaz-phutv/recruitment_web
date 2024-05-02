<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('candidates', function (Blueprint $table) {
            $table->unsignedBigInteger('id')->primary();
            $table->unsignedBigInteger('user_id');
            $table->string('firstname', 40);
            $table->string('lastname', 20);
            $table->unsignedTinyInteger('gender')->nullable();
            $table->date('dob')->nullable();
            $table->char('phone', 10)->nullable();
            $table->string('email');
            $table->string('address')->nullable();
            $table->unsignedBigInteger('location_id')->nullable();
            $table->text('link')->nullable();
            $table->text('avatar')->nullable();
            $table->text('objective')->nullable();
            $table->string('desired_job', 100)->nullable();
            $table->unsignedBigInteger('desired_industry_id')->nullable();
            $table->unsignedBigInteger('desired_jtype_id')->nullable();
            $table->unsignedBigInteger('desired_jlevel_id')->nullable();
            $table->unsignedInteger('desired_min_salary')->nullable();
            $table->unsignedInteger('desired_max_salary')->nullable();
            $table->unsignedTinyInteger('job_yoe')->nullable();
            $table->text('skill_text')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('candidates');
    }
};
