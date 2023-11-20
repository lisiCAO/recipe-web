<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Http\Controllers\Controller;

class FileUploadController extends Controller
{
    public function upload(Request $request)
    {
        if ($request->hasFile('file') && $request->file('file')->isValid()) {
            $file = $request->file('file');

            // 生成新的文件名（例如：timestamp_filename.ext）
            $newFileName = time() . '_' . $file->getClientOriginalName();
    
            // 存储文件并指定新的文件名
            $path = $file->storeAs('public/img', $newFileName);
            $url = Storage::url($path);
    
            return response()->json(['url' => $url], 200);
        }

        return response()->json(['message' => 'No valid file provided'], 400);
    }
}

