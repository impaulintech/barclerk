<?php

namespace App\Models;

use App\Enums\PageEnum;
use App\Http\Resources\ClientListResource;
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

    public function scopeSearchByName($query, $name)
    {
        $searchType = config('database.default') === 'pgsql' ? 'ilike' : 'like';
        return $query->where('client_name', $searchType, '%' . $name . '%');
    }

    public function scopeFilterStatus($query, $status)
    {
        return $query->where('matter_status_id', $status);
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
        return auth()->user()->clients()->with(['preTrialRestriction', 'matterStatus']);
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
        return GrantResource::collection($this->grants->latest()->paginate(PageEnum::GRANTS_PER_PAGE->value));
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
}
