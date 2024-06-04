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
        Schema::create('jobs', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('employer_id');
            $table->unsignedBigInteger('jtype_id');
            $table->unsignedBigInteger('jlevel_id');
            $table->string('jname', 150);
            $table->text('address')->nullable();
            $table->unsignedInteger('amount')->nullable();
            $table->unsignedInteger('min_salary')->nullable();
            $table->unsignedInteger('max_salary')->nullable();
            $table->unsignedTinyInteger('yoe')->nullable();
            $table->unsignedTinyInteger('gender')->nullable();
            $table->text('description')->nullable();
            $table->text('requirements')->nullable();
            $table->text('benefits')->nullable();
            $table->date('expire_at')->nullable();
            $table->unsignedTinyInteger('interview_round_num')->default(1); 
            $table->double('latitude', null, null, true)->nullable();
            $table->double('longitude', null, null, true)->nullable();
            $table->boolean('is_active')->default(1);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('jobs');
    }
};
