<?php

namespace App\Models;

use App\Http\Resources\GrantResource;
use Exception;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

class Grant extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function codes()
    {
        return $this->belongsToMany(Clause::class, 'grant_codes')->withTimestamps();
    }

    public function client()
    {
        return $this->belongsTo(Client::class);
    }

    public function displayGrant()
    {
        return new GrantResource(Grant::with(['codes.types'])->findOrFail($this->id));
    }

    public function updateGrant($request)
    {
        DB::beginTransaction();
        try {
            $this->update($request->only(['extension', 'date_effective']));
            $this->codes()->sync($request->codes);
            DB::commit();
            return $this->client->displayGrants();
        } catch (Exception $e) {
            DB::rollBack();
            return response()->json([
                'error' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function deleteGrant()
    {
        DB::beginTransaction();
        try {
            $this->deleteOrFail();
            DB::commit();
            return $this->client->displayGrants();
        } catch (Exception $e) {
            DB::rollBack();
            return response()->json([
                'error' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
