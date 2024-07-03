<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\Customer;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Artisan;

class CustomerControllerTest extends TestCase
{
    use RefreshDatabase;

    protected $token = 'f47ac10b58cc4372a5670e02b2c3d479';
    protected $wrongToken = 'abcdasdfeww1123';

    protected function headers($token = null)
    {
        return [
            'Authorization' => 'Bearer ' . ($token ?? $this->token),
        ];
    }

    public function setUp(): void
    {
        parent::setUp();
        Artisan::call('migrate');
    }

    /** @test */
    public function it_can_list_all_customers()
    {
        Customer::factory()->count(3)->create();

        $response = $this->getJson(route('customers.index'), $this->headers());

        $response->assertStatus(200)
                 ->assertJsonCount(3);
    }

    /** @test */
    public function it_can_store_a_new_customer()
    {
        $customerData = Customer::factory()->make()->toArray();

        $response = $this->postJson(route('customers.store'), $customerData, $this->headers());

        $response->assertStatus(201)
                 ->assertJsonStructure([
                     'message',
                     'status',
                     'data' => [
                         'id',
                         'firstname',
                         'lastname',
                         'email',
                         'contactno'
                     ]
                 ]);
    }

    /** @test */
    public function it_can_show_a_customer()
    {
        $customer = Customer::factory()->create();

        $response = $this->getJson(route('customers.show', $customer->id), $this->headers());

        $response->assertStatus(200)
                 ->assertJsonStructure([
                     'data' => [
                         'id',
                         'firstname',
                         'lastname',
                         'email',
                         'contactno'
                     ]
                 ]);
    }

    /** @test */
    public function it_can_update_a_customer()
    {
        $customer = Customer::factory()->create();
        $updateData = ['firstname' => 'Updated First Name'];

        $response = $this->putJson(route('customers.update', $customer->id), $updateData, $this->headers());

        $response->assertStatus(200)
                 ->assertJsonFragment($updateData);

        $this->assertDatabaseHas('customers', $updateData);
    }

    /** @test */
    public function it_can_delete_a_customer()
    {
        $customer = Customer::factory()->create();

        $response = $this->deleteJson(route('customers.destroy', $customer->id), [], $this->headers());

        $response->assertStatus(204);

        $this->assertDatabaseMissing('customers', ['id' => $customer->id]);
    }

    /** @test */
    public function it_fails_with_wrong_token()
    {
        Customer::factory()->count(3)->create();

        // Use the wrong token for the request
        $response = $this->getJson(route('customers.index'), $this->headers($this->wrongToken));

        $response->assertStatus(401);
    }
}
