<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
  use HasFactory;

  protected $guarded = [];

  public function user()
  {
    return $this->belongsTo(User::class);
  }

  public function charges()
  {
    return $this->hasMany(Charge::class);
  }

  public function scopeSearchByName($query, $name)
  {
    $searchType = env('DB_CONNECTION') === 'pgsql' ? 'ilike' : 'like';
    return $query->where('name', $searchType, '%' . $name . '%');
  }
}
