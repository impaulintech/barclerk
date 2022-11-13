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
        Schema::create('client_pre_trial_restriction', function (Blueprint $table) {
            $table->foreignId('client_id')->constrained()
                ->cascadeOnDelete()
                ->cascadeOnUpdate();
            $table->foreignId('pre_trial_restriction_id')->constrained()
                ->cascadeOnDelete()
                ->cascadeOnUpdate();
            $table->string('value');
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
        Schema::dropIfExists('client_pre_trial_restriction');
    }
};
