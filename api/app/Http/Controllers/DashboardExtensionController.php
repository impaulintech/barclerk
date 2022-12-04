<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\Grant;

class DashboardExtensionController extends Controller
{
    public function __invoke(Client $client, Grant $grant)
    {
        $totalFund = $client->totalFund($grant);
        $remainingFund = $totalFund - $client->totalAmountOfTimeEntries();
        $totalFundUsed = (($totalFund - ($remainingFund)) / $totalFund);

        return [
            'total_fund' => $totalFund,
            'total_fund_used' => round($totalFundUsed, 2),
            'remaining_fund' => $remainingFund,
        ];
    }
}
