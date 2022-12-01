<?php

namespace App\Http\Controllers;

use App\Models\Clause;
use App\Http\Resources\ClauseResource;

class ClauseController extends Controller
{
    public function __invoke()
    {
        return ClauseResource::collection(Clause::with(['types'])->get());
    }
}
