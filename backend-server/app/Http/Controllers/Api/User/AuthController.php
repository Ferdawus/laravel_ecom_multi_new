<?php

namespace App\Http\Controllers\Api\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\LoginRequest;
use App\Http\Requests\User\RegisterRequest;
use App\Http\Resources\User\AuthResource;
use App\Models\User;
use Dotenv\Exception\ValidationException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Twilio\Rest\Client;

class AuthController extends Controller
{
    public function login(LoginRequest $request)
    {
        $user = User::where('phone', $request->phone)->first();

        if (! $user || ! Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'phone' => ['The provided credentials are incorrect.'],
            ]);
        }
        return $this->makeToken($user);
    }
    public function register(RegisterRequest $request)
    {
        // RegisterRequest
        $user            = User::create($request->validated());
        // return $this->makeToken($user);
        $sid             = getenv("TWILIO_ACCOUNT_SID");
        $token           = getenv("TWILIO_AUTH_TOKEN");
        $verificationSid = getenv("TWILIO_VERIFICATION_SID");
        $twilio          = new Client($sid, $token);

        $verification = $twilio->verify->v2->services($verificationSid)
                                           ->verifications
                                           ->create("+88" . $user->phone, "sms");

        // print($verification->status);
        return response()->json($verification->status);

    }
    public function makeToken($user)
    {
        $token = $user->createToken('user-token')->plainTextToken;
        // return AuthResource::make($user);
        return (new AuthResource($user))
                ->additional(['meta' => [
                    'token'     => $token,
                    'token_type'=>'Bearer',
                ]]);
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();
        return send_ms('User Logout',true,200);
    }
    public function user(Request $request)
    {
        return AuthResource::make($request->user());

    }
}
