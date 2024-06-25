<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('job_applying', function (Blueprint $table) {
            DB::statement("ALTER TABLE job_applying ADD FULLTEXT ja_skill_ft (skill_text)");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('job_applying', function (Blueprint $table) {
            DB::statement("ALTER TABLE job_applying DROP INDEX ja_skill_ft");
        });
    }
};
