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
        Schema::create('saved_candidates', function (Blueprint $table) {
            $table->unsignedBigInteger('employer_id');
            $table->unsignedBigInteger('candidate_id');
            $table->unsignedBigInteger('job_id')->default(0);
            $table->dateTime('created_at');
            $table->primary(['employer_id', 'candidate_id', 'job_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('saved_candidates');
    }
};
