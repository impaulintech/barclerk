<?php

namespace App\Rules;

use App\Models\Grant;
use Illuminate\Contracts\Validation\Rule;

class HasRemainingFunds implements Rule
{
    /**
     * Create a new rule instance.
     *
     * @return void
     */

    protected $grant;

    public function __construct($grant)
    {
        $this->grant = $grant;
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        return $value <= Grant::find($this->grant)->remainingFunds();
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'The amount is greater than the remaining funds.';
    }
}
