<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\PreTrialRestriction;
use Illuminate\Database\Seeder;

use App\Models\User;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            PreTrialRestrictionSeeder::class,
            MatterStatusSeeder::class,
        ]);
    }
}
