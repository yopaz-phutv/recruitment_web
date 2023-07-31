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
        Schema::create('projects', function (Blueprint $table) {
            $table->unsignedBigInteger('candidate_id')->primary();
            $table->string('name', 100);
            $table->string('prj_type', 60);
            $table->string('role', 100);
            //$table->string('mission', 100);
            $table->string('technologies');
            $table->date('start_date');
            $table->date('end_date');
            $table->text('description');
            $table->text('link');
            //$table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
