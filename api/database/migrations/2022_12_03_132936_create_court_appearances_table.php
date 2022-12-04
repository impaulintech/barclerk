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
        Schema::create('court_appearances', function (Blueprint $table) {
            $table->id();
            $table->foreignId('client_id')->constrained()
                ->cascadeOnDelete()
                ->cascadeOnUpdate();
            $table->date('date');
            $table->time('time');
            $table->string('court');
            $table->string('judicial_officer');
            $table->date('next_court_date');
            $table->text('orders');
            $table->text('other_notes');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('court_appearances');
    }
};
