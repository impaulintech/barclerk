<?php

namespace Database\Seeders;

use App\Enums\MatterStatusEnum;
use App\Models\MatterStatus;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MatterStatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $statuses = [
            ['name' => MatterStatusEnum::ACTIVE->toString()],
            ['name' => MatterStatusEnum::UNACTIVE->toString()],
            ['name' => MatterStatusEnum::ARCHIVED->toString()],
        ];
        MatterStatus::upsert($statuses, ['name'], ['name']);
    }
}
