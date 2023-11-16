<?php
    namespace App\Http\Controllers\Auth;

    use App\Http\Controllers\Controller;
    use Illuminate\Http\Request;
    use Illuminate\Support\Facades\Auth;

    class LoginController extends Controller
    {
        public function login(Request $request)
        {
            $credentials = $request->only('email', 'password');

            if (Auth::attempt($credentials)) {
                $token = $request->user()->createToken('authToken')->plainTextToken;
    
                return response()->json([
                    'access_token' => $token,
                    'token_type' => 'Bearer',
                    'user' => Auth::user()
                ]);
            }
    
            return response()->json(['message' => 'The provided credentials do not match our records.'], 401);
        }
    }
