<?php

namespace App\Enums;

enum MatterStatusEnum: int
{
    case ACTIVE = 1;
    case UNACTIVE = 2;
    case ARCHIVED = 3;

    public function toString()
    {
        return match ($this) {
            self::ACTIVE => 'Active',
            self::UNACTIVE => 'Un-active',
            self::ARCHIVED => 'Archived'
        };
    }
}
