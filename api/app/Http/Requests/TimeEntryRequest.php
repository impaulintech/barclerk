<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TimeEntryRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'grant_id' => ['required'],
            'type_id' => ['required'],
            'description' => ['required', 'max:65535'],
            'date' => ['required', 'date'],
            'hours' => ['required', 'numeric'],
            'amount' => ['required', 'numeric'],
        ];
    }

    public function attributes()
    {
        return [
            'grant_id' => 'Grant',
            'type_id' => 'Type',
            'description' => 'Description',
            'date' => 'Date',
            'hours' => 'Hours',
            'amount' => 'Amount', 
        ];
    }
}
