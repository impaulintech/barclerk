<?php

namespace App\Models;

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
                'pre_trial_restriction_id' => $request->preTrialRestriction,
                'value' => $request->value,
            ]);
            DB::commit();
            return response()->json('Client added successfully!', Response::HTTP_OK);
        } catch (Exception $e) {
            DB::rollBack();
            return response()->json([
                'error' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    static public function search($searchQuery)
    {
        $clients = auth()->user()->clients()->with(['preTrialRestriction', 'matterStatus']);
        if (request('search_query')) {
            $clients->searchByName($searchQuery);
        }
        if (request('status')) {
            $clients->filterStatus(request('status'));
        }

        return $clients;
    }
}
