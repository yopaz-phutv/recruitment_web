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
        Schema::create('experiences', function (Blueprint $table) {
            $table->unsignedBigInteger('candidate_id')->primary();
            $table->unsignedBigInteger('jtype_id');
            $table->string('name', 100);
            $table->string('company', 100);
            $table->date('start_date');
            $table->date('end_date');
            $table->text('description');
            //$table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('experiences');
    }
};
