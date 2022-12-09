<?php

namespace App\Models;

use App\Enums\PageEnum;
use App\Http\Resources\ClientListResource;
use App\Http\Resources\CourtAppearanceResource;
use App\Http\Resources\GrantResource;
use App\Http\Resources\TimeEntryResource;
use Exception;
use App\Utils\ChargeUtils;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Database\Eloquent\Factories\HasFactory;

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

    public function preTrialRestriction()
    {
        return $this->hasOneThrough(PreTrialRestriction::class, ClientPreTrialRestriction::class, 'client_id', 'id', 'id', 'pre_trial_restriction_id');
    }

    public function clientPreTrialRestriction()
    {
        return $this->hasOne(ClientPreTrialRestriction::class);
    }

    public function matterStatus()
    {
        return $this->belongsTo(MatterStatus::class);
    }

    public function grants()
    {
        return $this->hasMany(Grant::class);
    }

    public function timeEntries()
    {
        return $this->hasMany(TimeEntry::class);
    }

    public function courtAppearances()
    {
        return $this->hasMany(CourtAppearance::class);
    }

    public function latestGrant()
    {
        return $this->hasOne(Grant::class)->latest('id');
    }

    public function latestCourtAppearance()
    {
        return $this->hasOne(CourtAppearance::class)->latest('id');
    }

    public function scopeSearchByName($query, $name)
    {
        $searchType = config('database.default') === 'pgsql' ? 'ilike' : 'like';
        return $query->where('client_name', $searchType, '%' . $name . '%');
    }

    public function scopeFilterStatus($query, $status)
    {
        return $query->where('matter_status_id', $status);
    }

    public function totalFund($grant)
    {
        return $grant->totalFund();
    }

    public function totalAmountOfTimeEntries($grant)
    {
        return $grant->totalAmountOfTimeEntries();
    }

    public function remainingFunds($grant)
    {
        return $this->totalFund($grant) - $this->totalAmountOfTimeEntries($grant);
    }

    static public function addClient($request)
    {
        DB::beginTransaction();
        try {
            $client = auth()->user()->clients()->create($request->allowed());
            $client->charges()->createMany(ChargeUtils::splitCharges($request->charges));
            $client->clientPreTrialRestriction()->create([
                'pre_trial_restriction_id' => $request->pre_trial_restriction,
                'value' => $request->value,
            ]);
            DB::commit();
            return ClientListResource::collection(Client::displayClients()->latest()->paginate(PageEnum::MATTERS_PER_PAGE->value));
        } catch (Exception $e) {
            DB::rollBack();
            return response()->json([
                'error' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    static public function search($searchQuery)
    {
        $clients = (new self)->displayClients();
        if (request('search_query')) {
            $clients->searchByName($searchQuery);
        }
        if (request('status')) {
            $clients->filterStatus(request('status'));
        }

        return $clients;
    }

    static public function displayClients()
    {
        return auth()->user()->clients()->with(['latestGrant', 'latestCourtAppearance', 'preTrialRestriction', 'matterStatus']);
    }

    public function addGrant($request)
    {
        DB::beginTransaction();
        try {
            $grant = $this->grants()->create($request->only(['extension', 'date_effective']));
            $grant->codes()->sync($request->codes);
            DB::commit();
            return $this->displayGrants();
        } catch (Exception $e) {
            DB::rollBack();
            return response()->json([
                'error' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function displayGrants()
    {
        return GrantResource::collection($this->grants()->latest()->paginate(PageEnum::GRANTS_PER_PAGE->value));
    }

    public function addTimeEntry($request)
    {
        $this->timeEntries()->create($request->validated());
        return $this->getTimeEntries();
    }

    public function updateTimeEntry($request, $time_entry)
    {
        $time_entry->update($request->validated());
        return $this->getTimeEntries();
    }

    public function getTimeEntries()
    {
        return TimeEntryResource::collection($this->timeEntries()->with(['grant', 'type'])->latest()->paginate(PageEnum::TIME_ENTRIES_PER_PAGE->value));
    }

    public function addCourtAppearance($request)
    {
        $this->courtAppearances()->create($request->validated());
        return $this->displayCourtAppearances();
    }

    public function displayCourtAppearances()
    {
        return CourtAppearanceResource::collection($this->courtAppearances()->latest()->paginate(PageEnum::COURT_APPEARANCE_PER_PAGE->value));
    }

    public function editCourtAppearance($request, $court_appearance)
    {
        $court_appearance->update($request->validated());
        return $this->displayCourtAppearances();
    }

    public function dashboardExtension($grant)
    {
        $totalFund = $this->totalFund($grant);
        $remainingFund = $totalFund - $this->totalAmountOfTimeEntries($grant);
        $totalFundUsed = (($totalFund - ($remainingFund)) / $totalFund);

        return [
            'preparation' => $grant->timeEntries()->preparation()->firstOr('amount', fn () => 0),
            'other_types' => $grant->timeEntries()->otherTypes()->sum('amount'),
            'attendance' => $grant->timeEntries()->attendance()->sum('amount'),
            'total_fund' => $totalFund,
            'total_fund_used' => round($totalFundUsed, 2),
            'remaining_fund' => $remainingFund,
        ];
    }
}
