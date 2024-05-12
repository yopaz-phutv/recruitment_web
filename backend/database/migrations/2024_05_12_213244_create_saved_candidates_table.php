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
            $table->primary(['employer_id', 'candidate_id']);
            $table->dateTime('created_at');
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
