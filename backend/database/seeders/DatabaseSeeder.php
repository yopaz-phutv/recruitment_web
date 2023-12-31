<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
        $this->call([UserSeeder::class]);
        $this->call([CandidateSeeder::class]);
        $this->call([LocationSeeder::class]);
        $this->call([EmployerSeeder::class]);
        $this->call([EmployerLocationSeeder::class]);
        $this->call([JtypeSeeder::class]);
        $this->call([JlevelSeeder::class]);
        $this->call([IndustrySeeder::class]);
        $this->call([JobSeeder::class]);
        $this->call([JobIndustrySeeder::class]);
        $this->call([JobLocationSeeder::class]);
        $this->call([EducationSeeder::class]);
        $this->call([ExperienceSeeder::class]);
        $this->call([SkillSeeder::class]);
        $this->call([ProjectSeeder::class]);
        $this->call([CertificateSeeder::class]);
        $this->call([PrizeSeeder::class]);
        $this->call([ActivitySeeder::class]);
    }
}
