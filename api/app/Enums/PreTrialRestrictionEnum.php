<?php

namespace App\Enums;

enum PreTrialRestrictionEnum: int
{
    case NONE = 1;
    case ON_BAIL = 2;
    case IN_CUSTODY = 3;

    public function toString()
    {
        return match ($this) {
            self::ON_BAIL => 'On Bail',
            self::IN_CUSTODY => 'In Custody',
            self::NONE => 'None'
        };
    }
}
