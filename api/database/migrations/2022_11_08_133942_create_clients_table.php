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
    Schema::create('clients', function (Blueprint $table) {
      $table->id();
      $table->foreignId('user_id')->constrained()
        ->cascadeOnDelete()
        ->cascadeOnUpdate();
      $table->string('name');
      $table->string('email')->nullable();
      $table->string('phone_number')->nullable();
      $table->text('postal_address')->nullable();
      $table->boolean('is_contribution_required')->nullable();
      $table->string('court')->nullable();
      $table->boolean('is_on_bail')->nullable();
      $table->text('location')->nullable();
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
    Schema::dropIfExists('clients');
  }
};
