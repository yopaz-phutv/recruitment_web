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
        $driver = DB::getDriverName();

        if ($driver === 'mysql') {
            // ✅ MySQL: Dùng FULLTEXT index
            DB::statement("ALTER TABLE job_applying ADD FULLTEXT ja_skill_ft (skill_text)");
        } elseif ($driver === 'pgsql') {
            // ✅ PostgreSQL: Dùng GIN index để hỗ trợ full-text search
            DB::statement("CREATE INDEX job_applying_skill_text_gin ON job_applying USING gin(to_tsvector('english', skill_text))");
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        $driver = DB::getDriverName();

        if ($driver === 'mysql') {
            DB::statement("ALTER TABLE job_applying DROP INDEX ja_skill_ft");
        } elseif ($driver === 'pgsql') {
            DB::statement("DROP INDEX IF EXISTS job_applying_skill_text_gin");
        }
    }
};
