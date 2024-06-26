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
        Schema::create('candidate_bookmark_detail', function (Blueprint $table) {
            $table->unsignedBigInteger('candidate_bookmark_id');
            $table->unsignedBigInteger('job_id');
            $table->primary(['candidate_bookmark_id', 'job_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('candidate_bookmark_detail');
    }
};
