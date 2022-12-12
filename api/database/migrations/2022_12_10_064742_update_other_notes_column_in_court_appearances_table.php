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
            $table->time('time')->nullable()->change();
            $table->string('court')->nullable()->change();
            $table->string('judicial_officer')->nullable()->change();
            $table->text('orders')->nullable()->change();
            $table->text('other_notes')->nullable()->change();
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
            $table->time('time');
            $table->string('court')->change();
            $table->text('other_notes')->change();
            $table->string('judicial_officer')->change();
            $table->text('orders')->change();
        });
    }
};
