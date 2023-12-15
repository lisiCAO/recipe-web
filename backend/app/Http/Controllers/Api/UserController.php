<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

use App\Http\Resources\UserDetailResource;
use App\Http\Resources\UserListResource;
use App\Models\User;
use Hash;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Tymon\JWTAuth\Facades\JWTAuth;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): \Illuminate\Http\Resources\Json\AnonymousResourceCollection
    {
        // Get all users
        try {
            $users = User::all();
            return UserListResource::collection($users);
        } catch (\Exception $e) {
            Log::error('Error fetching users: ' . $e->getMessage());
            return $this->sendError('Error fetching users', [], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): \Illuminate\Http\JsonResponse
    {
        Log::info('User creation request: ', $request->except('password'));

        try{
            $validatedData = $request->validate([
                'first_name' => 'required|string|max:50',
                'last_name' => 'required|string|max:50',
                'email' => 'required|string|email|max:100|unique:users',
                'password' => 'required|string|min:6',
                'profile_image_path' => 'nullable|string',
                'category' => 'nullable|string|max:50',
            ]);

            $validatedData['password'] = Hash::make($validatedData['password']);
            $user = User::create($validatedData);
            Log::info('User created successfully: ', ['id' => $user->user_id]);

            return $this->sendResponse(new UserDetailResource($user), 'User created successfully');
        } catch (QueryException $e) {
            Log::error('User creation failed: ' . $e->getMessage());
            return $this->sendError('User creation failed(Database issue)', [], 500);
        } catch (\Exception $e) {
            Log::error('Unexpected error during user creation: '. $e->getMessage());
            return $this->sendError('Unexpected error', [], 500);
        }

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): UserDetailResource
    {
        $user =User::findOrFail($id);
        return new UserDetailResource($user);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id): \Illuminate\Http\JsonResponse
    {
        try{
            $user = User::findOrFail($id);

            $validatedData = $request->validate([
                'first_name' => 'nullable|string|max:50',
                'last_name' => 'nullable|string|max:50',
                'email' => 'nullable|string|email|max:100|unique:users,email,' .  $id . ',user_id',
                'password' => 'nullable|string|min:6',
                'profile_image_path' => 'nullable|string',
                'category' => 'nullable|string|max:50',
            ]);
            if (!empty($validatedData['password'])) {
                $validatedData['password'] = Hash::make($validatedData['password']);
            }

            if (!empty($validatedData['profile_image_path']) && !empty($user->profile_image_path)) {
                // delete previous img
                Storage::delete($user->profile_image_path);
            }

            $user->update($validatedData);
            return $this->sendResponse(new UserDetailResource($user), 'User updated successfully');
        } catch (\Exception $e) {
            Log::error('User update failed: ' . $e->getMessage());
            return $this->sendError('User update failed', [], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id): \Illuminate\Http\JsonResponse
    {
        $user = User::findOrFail($id);
        $user->delete();

        return $this->sendResponse(null, 'User deleted successfully');
    }

    public function getCurrentUser(Request $request)
    {
        try {
            // 尝试通过JWT获取用户
            if (! $user = JWTAuth::parseToken()->authenticate()) {
                return $this->sendError('User not found', [], 404);
            }
            return $this->sendResponse(new UserDetailResource($user), 'User retrieved successfully');
        } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
            Log::error('Token epired error: ' . $e->getMessage());
            return $this->sendError('token_expired', [], $e->getStatusCode());
        } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
            Log::error('Token invalid error: ' . $e->getMessage());
            return $this->sendError('token_invalid', [], $e->getStatusCode());
        } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {
            Log::error('Error retrieving user: ' . $e->getMessage());
            return $this->sendError('token_absent', [], $e->getStatusCode());
        }

//        // 用户找到
//        return response()->json(compact('user'));
    }
}
