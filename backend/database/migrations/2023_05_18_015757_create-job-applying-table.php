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
        Schema::create('job_applying', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('job_id');
            $table->unsignedBigInteger('candidate_id');
            $table->text('resume_link')->nullable();
            $table->enum('status', ['WAITING', 'BROWSING_RESUME', 'RESUME_FAILED', 'BROWSING_INTERVIEW', 'INTERVIEW_FAILED', 'PASSED'])->default('WAITING');
            $table->unsignedTinyInteger('interview_round')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('job_applying');
    }
};
