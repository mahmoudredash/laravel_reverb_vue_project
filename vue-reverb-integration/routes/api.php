<?php

use App\Http\Controllers\PostController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;






Route::group(['middleware'=> "auth:sanctum"], function (){
    Route::get('/user', function (Request $request) {
        return $request->user();
    });


    Route::apiResource("/posts", PostController::class);
    Route::put("/posts/{postId}/like", [PostController::class, 'like'])->name('posts.update.like');
});
