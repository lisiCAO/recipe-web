<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Tymon\JWTAuth\Facades\JWTAuth;

class ParseTokenFromCookie
{

    public function handle(Request $request, Closure $next): Response
    {
        // 从 Cookie 中获取 JWT
        if ($jwt = $request->cookie('jwt')) {
            // 将 JWT 添加到请求头中
            $request->headers->set('Authorization', 'Bearer ' . $jwt);
        }

        try {
            // 验证 JWT
            JWTAuth::parseToken()->authenticate();
        } catch (\Exception $e) {
            // JWT 验证失败，返回 403 错误
            return response()->json(['success'=> 'false', 'message' => 'Access denied'], 403);
        }

        return $next($request);
    }
}
