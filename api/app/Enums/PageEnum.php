<?php

namespace App\Enums;

enum PageEnum: int
{
    case MATTERS_PER_PAGE = 13;
    case GRANTS_PER_PAGE = 12;
    case TIME_ENTRIES_PER_PAGE = 9;
}
