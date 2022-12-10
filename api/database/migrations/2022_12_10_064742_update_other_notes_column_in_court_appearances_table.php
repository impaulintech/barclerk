<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('court_appearances', function (Blueprint $table) {
            $table->string('court')->nullable()->change();
            $table->string('judicial_officer')->nullable()->change();
            $table->string('orders')->nullable()->change();
            $table->string('other_notes')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('court_appearances', function (Blueprint $table) {
            $table->string('court')->change();
            $table->string('other_notes')->change();
            $table->string('judicial_officer')->change();
            $table->string('orders')->change();
        });
    }
};
