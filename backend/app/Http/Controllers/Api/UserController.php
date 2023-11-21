<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

use App\Http\Resources\UserDetailResource;
use App\Http\Resources\UserListResource;
use App\Models\User;
use Hash;
use Illuminate\Http\Request;
use Storage;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): \Illuminate\Http\Resources\Json\AnonymousResourceCollection
    {
        // Get all users
        return UserListResource::collection(User::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): \Illuminate\Http\JsonResponse
    {
        \Log::info('Request Data:', $request->all());

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

        return response()->json([
            'message' => 'User created successfully',
            'user' => new UserDetailResource($user)
        ], 201);
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

        $user->update($validatedData);

        return response()->json([
            'message' => 'User updated successfully',
            'user' => new UserDetailResource($user)
        ], 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id): \Illuminate\Http\JsonResponse
    {
        $user = User::findOrFail($id);
        $user->delete();

        return response()->json(['message' => 'User deleted successfully'],200);
    }
}
