<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Facades\JWTAuth;


class AuthController extends Controller
{
    //
    public function login(Request $request) {
        $credentials = $request->only(['email', 'password']);

        if (!$token = JWTAuth::attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
    
        $cookie = cookie('jwt', $token, 60); // 创建一个有效期为 60 分钟的 Cookie
    
        return $this->createNewToken($token)->withCookie($cookie);
    }

    public function logout() {
    // 清除 cookie
    $cookie = \Cookie::forget('jwt');

    return response()->json(['message' => 'Successfully logged out'])->withCookie($cookie);
}

    protected function createNewToken($token){
        return response()->json([
            'token_type' => 'bearer',
            'expires_in' => JWTAuth::factory()->getTTL() * 60,
            'user' => Auth::user()
        ]);
    }
}
