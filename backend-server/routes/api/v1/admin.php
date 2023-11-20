<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\Admin\AdminAuthController;
use App\Http\Controllers\Api\Admin\BrandController;
use App\Http\Controllers\Api\Admin\CategoryController;
use App\Http\Controllers\Api\Admin\DivisionController;
use App\Http\Controllers\Api\Admin\ProductController;
use App\Http\Controllers\Api\Admin\SliderController;
use App\Http\Controllers\Api\Admin\SubCategoryController;

Route::controller(AdminAuthController::class)->group(function(){
    Route::post('/login','login');
    Route::post('/register','register');

});
Route::middleware('auth:admin-api')->group( function () {

    Route::controller(AdminAuthController::class)->group(function(){
        Route::post('/logout','logout');
        Route::get('/me','user');
    });
    Route::resources([
        'brands' => BrandController::class,
        'sliders' => SliderController::class,
        'categories' => CategoryController::class,
        'subcategories' => SubCategoryController::class,
        'products' => ProductController::class,
        'divisions' => DivisionController::class,
    ]);

});
