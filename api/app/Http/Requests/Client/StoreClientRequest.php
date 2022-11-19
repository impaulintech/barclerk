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
      "client_name" => ['required', 'max:255'],
      "matter_name" => ['required', 'max:255'],
      "email" => ['nullable', 'max:255', 'email', 'unique:clients'],
      "phone_number" => ['nullable', 'max:255'],
      "postal_address" => ['nullable', 'max:65535'],
      "contribution" => ['nullable'],
      "charges" => ['required', 'max:65535'],
      "court" => ['nullable', 'max:255'],
      "pre_trial_restriction" => ['required'],
      "value" => ['required']
    ];
  }

  public function attributes()
  {
    return [
      "client_name" => "Client Name",
      "matter_name" => "Matter Name",
      "email" => "Email",
      "phone_number" => "Phone Number",
      "postal_address" => "Postal Address",
      "contribution" => "Contribution",
      "charges" => "Charges",
      "court" => "Court",
      "pre_trial_restriction" => "Pre Trial Restriction",
      "value" => "Value"
    ];
  }

  public function allowed()
  {
    return $this->except(['charges', 'pre_trial_restriction', 'value', 'on_bail_postal_address', 'in_custody_location']);
  }
}
