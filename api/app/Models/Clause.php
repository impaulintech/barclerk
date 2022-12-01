<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Clause extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function types()
    {
        return $this->hasMany(Type::class);
    }

    public function grants()
    {
        return $this->belongsToMany(Grant::class, 'grant_codes')->withTimestamps();
    }
}
