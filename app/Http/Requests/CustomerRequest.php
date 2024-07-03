<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CustomerRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    
    public function rules()
    {
        $rules = [
            'firstname' => ['required', 'string'],
            'lastname' => ['required', 'string'],
            'email' => ['required', 'email'],
            'contactno' => ['required', 'string'],
        ];

        if ($this->isMethod('put') || $this->isMethod('patch')) {
            $rules = [
                'firstname' => ['sometimes', 'string'],
                'lastname' => ['sometimes', 'string'],
                'email' => ['sometimes', 'email'],
                'contactno' => ['sometimes', 'string'],
            ];
        }

        return $rules;
    }
    
}
