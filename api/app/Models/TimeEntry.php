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

    public function scopePreparation($query)
    {
        return $query->whereHas('type', function ($query) {
            $query->where('type', 'like', '%preparation%');
        });
    }

    public function scopeOtherTypes($query)
    {
        return $query->whereHas('type', function ($query) {
            $query->where('type', 'not like', '%preparation%')
                ->where('type', 'not like', '%attendance%');
        });
    }

    public function scopeAttendance($query)
    {
        return $query->whereHas('type', function ($query) {
            $query->where('type', 'like', '%attendance%');
        });
    }
}
