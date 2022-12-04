<?php

namespace App\Http\Controllers;

use App\Http\Requests\TimeEntryRequest;
use App\Models\Client;
use App\Models\TimeEntry;

class TimeEntryController extends Controller
{
    public function index(Client $client)
    {
        return $client->getTimeEntries();
    }

    public function store(TimeEntryRequest $request, Client $client)
    {
        return $client->addTimeEntry($request);
    }

    public function update(TimeEntryRequest $request, Client $client, TimeEntry $time_entry)
    {
        return $client->updateTimeEntry($request, $time_entry);
    }
}
