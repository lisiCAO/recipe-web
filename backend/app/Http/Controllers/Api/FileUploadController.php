<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use App\Http\Controllers\Controller;

class FileUploadController extends Controller
{
    /**
     * Uploads a file.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function upload(Request $request)
    {
        try {
            if ($request->hasFile('file') && $request->file('file')->isValid()) {
                $file = $request->file('file');

                $newFileName = time() . '_' . $file->getClientOriginalName();
                $path = $file->storeAs('public/img', $newFileName);
                $url = Storage::url($path);

                Log::info('File uploaded successfully: ' . $url);

                return response()->json(['url' => $url], 200);
            }

            Log::warning('No valid file provided in upload');
            return response()->json(['message' => 'No valid file provided'], 400);
        } catch (\Exception $e) {
            Log::error('File upload failed: ' . $e->getMessage());
            return response()->json(['message' => 'File upload failed'], 500);
        }
    }
}

