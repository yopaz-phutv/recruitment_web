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
        Schema::create('activities', function (Blueprint $table) {
            $table->unsignedBigInteger('candidate_id')->primary();
            $table->string('organization', 100);
            $table->string('role', 100);
            $table->boolean('is_present');
            $table->date('start_date');
            $table->date('end_date');
            $table->text('description');
            $table->text('image');
            $table->text('link');
            //$table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('activities');
    }
};
