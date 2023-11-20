<?php

use App\Http\Controllers\Api\Admin\BrandController;
use App\Http\Controllers\Api\Admin\CategoryController;
use App\Http\Controllers\Api\Admin\DivisionController;
use App\Http\Controllers\Api\Admin\ProductController;
use App\Http\Controllers\Api\Admin\SubCategoryController;
use App\Http\Controllers\Api\User\AuthController;
use Illuminate\Support\Facades\Route;

Route::controller(AuthController::class)->group(function(){
    Route::post('/login','login');
    Route::post('/register','register');
});

Route::middleware('auth:user-api')->group( function () {

    Route::controller(AuthController::class)->group(function(){
        Route::post('/logout','logout');
        Route::get('/me','user');
    });

    

});
