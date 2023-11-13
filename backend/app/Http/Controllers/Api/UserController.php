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
        // Get all recipes
        return UserListResource::collection(User::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): \Illuminate\Http\JsonResponse
    {
        $validatedData = $request->validate([
            'first_name' => 'required|string|max:50',
            'last_name' => 'required|string|max:50',
            'email' => 'required|string|email|max:100|unique:users',
            'password' => 'required|string|min:6',
            'profile_image_path' => 'nullable|image|max:2048',
            'category' => 'nullable|string|max:50',
        ]);

        if ($request->hasFile('profile_image_path')) {
            $path = $request->file('profile_image_path')->store('public/users');
            $validatedData['profile_image_path'] = Storage::url($path);
        }

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
            'email' => 'nullable|string|email|max:100|unique:users,email,' . $id,
            'password' => 'nullable|string|min:6',
            'profile_image_path' => 'nullable|image|max:2048',
            'category' => 'nullable|string|max:50',
        ]);

        if ($request->hasFile('profile_image')) {
            // 删除旧的图片
            if ($user->profile_image_path) {
                Storage::delete($user->profile_image_path);
            }
            $data['profile_image_path'] = $request->file('profile_image')->store('public/profile_images');
        }

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
