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
        Schema::create('resumes', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('candidate_id');
            $table->string('fullname', 100)->nullable();
            $table->unsignedTinyInteger('gender')->nullable();
            $table->date('dob')->nullable();
            $table->char('phone', 10)->nullable();
            $table->string('email')->nullable();
            $table->string('address')->nullable();
            $table->text('link')->nullable();
            $table->text('avatar')->nullable();
            $table->text('objective')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('resumes');
    }
};
