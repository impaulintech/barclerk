<?php

namespace App\Http\Requests\Client;

use Illuminate\Foundation\Http\FormRequest;

class StoreClientRequest extends FormRequest
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
      "name" => ['required', 'max:255'],
      "email" => ['nullable', 'max:255'],
      "phone_number" => ['nullable', 'max:255'],
      "postal_address" => ['nullable', 'max:65535'],
      "is_contribution_required" => ['nullable'],
      "charges" => ['required', 'max:65535'],
      "court" => ['nullable', 'max:255'],
      "is_on_bail" => ['nullable'],
      "location" => ['nullable', 'max:65535']
    ];
  }

  public function attributes()
  {
    return [
      "name" => "Name",
      "email" => "Email",
      "phone_number" => "Phone Number",
      "postal_address" => "Postal Address",
      "is_contribution_required" => "Contribution",
      "charges" => "Charges",
      "court" => "Court",
      "is_on_bail" => "Bail",
      "location" => "Location"
    ];
  }
}
