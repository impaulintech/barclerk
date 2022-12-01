<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class GrantRequest extends FormRequest
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
            'extension' => ['required', 'max:255'],
            'date_effective' => ['required', 'date'],
            'codes' => ['required']
        ];
    }

    public function attributes()
    {
        return [
            'extension' => 'Extension',
            'date_effective' => 'Date Effective',
            'codes' => 'Codes'
        ];
    }
}
