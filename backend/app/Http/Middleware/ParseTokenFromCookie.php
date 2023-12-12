<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ParseTokenFromCookie
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // 从 Cookie 中获取 JWT
        if ($jwt = $request->cookie('jwt')) {
            // 将 JWT 添加到请求头中
            $request->headers->set('Authorization', 'Bearer ' . $jwt);
        }
        return $next($request);
    }
}
