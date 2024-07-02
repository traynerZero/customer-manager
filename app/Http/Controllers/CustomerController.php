<?php

namespace App\Http\Controllers;

use App\Http\Requests\CustomerRequest;
use App\Http\Resources\CustomerResource;
use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CustomerController extends Controller
{
    //
    public function index(){

        return Customer::all();
    }

    public function store(CustomerRequest $request)
    {
        try {
            $customer = new Customer($request->validated());
            $customer->save();

            return response()->json([
                'message' => 'Customer added successfully',
                'status' => 'success',
                'data' => new CustomerResource($customer),
            ], 201); // 201 Created status code for successful creation
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to add customer',
                'status' => 'error',
                'error' => $e->getMessage(), // Optionally include the error message for debugging
            ], 500); // 500 Internal Server Error for unexpected errors
        }
    }

    public function update(CustomerRequest $request, Customer $customer){
        $customer->update($request->validated());
        return new CustomerResource($customer);
    }

    public function show(Request $request){

    }

    public function remove(Customer $customer){
        $customer->delete();
        return response()->noContent();
    }
}



