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

    public function store(CustomerRequest $request){
        $customer = new Customer($request->validated());
        return new CustomerResource($customer);
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



