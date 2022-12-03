<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TimeEntry extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function grant()
    {
        return $this->belongsTo(Grant::class);
    }

    public function type()
    {
        return $this->belongsTo(Type::class);
    }

    public function client()
    {
        return $this->belongsTo(Client::class);
    }
}
