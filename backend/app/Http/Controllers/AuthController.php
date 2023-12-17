<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Http\JsonResponse;


/**
 * Class AuthController
 * 
 * This class is responsible for handling authentication related operations.
 */
class AuthController extends Controller
{
    /**
     * Handle user login request.
     * 
     * @param Request $request The HTTP request object.
     * @return JsonResponse The JSON response containing the token and a cookie.
     */
    public function login(Request $request) {
        $credentials = $request->only(['email', 'password']);

        if (!$token = JWTAuth::attempt($credentials)) {
            return $this->sendError('Invalid email or password', [], 401);
        }
    
        $cookie = cookie('jwt', $token, 60); // Create a cookie with a 60-minute expiration time
    
        return $this->createNewToken($token)->withCookie($cookie);
    }

    /**
     * Handle user logout request.
     * 
     * @return JsonResponse The JSON response indicating successful logout.
     */
    public function logout() {
        $user = Auth::user();
        // Clear the cookie
        $cookie = \Cookie::forget('jwt');

        return $this->sendResponse($user->email,'Successfully logged out')->withCookie($cookie);
    }

    /**
     * Create a new token response.
     * 
     * @param string $token The JWT token.
     * @return JsonResponse The JSON response containing the token type, expiration time, and user information.
     */
    protected function createNewToken($token){
        $result = [
            'token_type' => 'bearer',
            'expires_in' => JWTAuth::factory()->getTTL() * 60,
            'user' => Auth::user(),
            'token' => $token
        ];
        return $this->sendResponse($result, 'Login successful');
    }
}
