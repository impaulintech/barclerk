<?php

namespace Database\Seeders;

use App\Enums\PreTrialRestrictionEnum;
use App\Models\PreTrialRestriction;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PreTrialRestrictionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $preTrialRestrictions = [
            [
                'id' => PreTrialRestrictionEnum::ON_BAIL,
                'name' => PreTrialRestrictionEnum::ON_BAIL->toString()
            ],
            [
                'id' => PreTrialRestrictionEnum::IN_CUSTODY,
                'name' => PreTrialRestrictionEnum::IN_CUSTODY->toString()
            ],
            [
                'id' => PreTrialRestrictionEnum::NONE,
                'name' => PreTrialRestrictionEnum::NONE->toString()
            ],
        ];

        PreTrialRestriction::upsert($preTrialRestrictions, ['id'], ['name']);
    }
}
