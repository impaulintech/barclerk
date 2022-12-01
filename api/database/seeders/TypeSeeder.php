<?php

namespace Database\Seeders;

use App\Models\Type;
use App\Utils\CodeTypeUtils;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $json = file_get_contents(base_path('database/json/types.json'));
        $types = collect(json_decode($json))->map(function ($type, $key) {
            return [
                'id' => $key + 1,
                'clause_id' => CodeTypeUtils::toCodeID($type),
                'type' => $type->type,
                'rate' => $type->rate,
                'time' => $type->time,
                'total_allowance' => $type->total_allowance
            ];
        })->toArray();

        Type::upsert($types, ['id'], ['clause_id', 'rate', 'time', 'total_allowance']);
    }
}
