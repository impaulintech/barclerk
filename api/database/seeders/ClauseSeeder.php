<?php

namespace Database\Seeders;

use App\Models\Clause;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ClauseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $json = file_get_contents(base_path('database/json/clauses.json'));
        $clauses = collect(json_decode($json))->map(function ($clause) {
            return ['id' => $clause->id, 'name' => $clause->name, 'code' => $clause->code];
        })->toArray();

        Clause::upsert($clauses, ['id'], ['code', 'name']);
    }
}
