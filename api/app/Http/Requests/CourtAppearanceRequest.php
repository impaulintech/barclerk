<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CourtAppearanceRequest extends FormRequest
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
            'date' => ['required', 'date'],
            'time' => '',
            'court' => ['max:255'],
            'judicial_officer' => ['max:255'],
            'next_court_date' => ['required', 'date'],
            'orders' => ['max:65535'],
            'other_notes' => ['max:65535']
        ];
    }

    public function attributes()
    {
        return [
            'date' => 'Date',
            'time' => 'Time',
            'court' => 'Court',
            'judicial_officer' => 'Judicial Officer',
            'next_court_date' => 'Next Court Date',
            'orders' => 'Orders',
            'other_notes' => 'Other Notes'
        ];
    }
}
