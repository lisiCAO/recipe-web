<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Tymon\JWTAuth\Facades\JWTAuth;

class CheckAdminOrCurrentUser
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();
            $userId = $request->route('userId'); // 或使用其他方式获取目标用户 ID

            if ($user->category === 'admin' || $user->user_id == $userId) {
                return $next($request);
            }

            return response()->json(['message' => 'Unauthorized'], 403);

        } catch (\Exception $e) {
            return response()->json(['message' => 'Token error', 'error' => $e->getMessage()], 401);
        }
    }
}
