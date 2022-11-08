<?php

namespace App\Utils;

class ChargeUtils
{
  public static function splitCharges($charges)
  {
    return collect(explode(', ', $charges))->map(function ($charge) {
      return ["name" => $charge];
    });
  }
}
