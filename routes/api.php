<?php

use App\Http\Controllers\Api\ApiAuthController;
use App\Http\Controllers\Api\ApiProductController;
use Illuminate\Support\Facades\Route;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::prefix('auth')->group(function () {
    Route::post('/login',[ApiAuthController::class, 'login']);
});

Route::prefix('product')->group(function () {
    Route::get('/getProducts',[ApiProductController::class, 'getProducts']);
    Route::get('/getProductById/{product_code}',[ApiProductController::class, 'getProductById']);
    Route::get('getReport',[ApiProductController::class, 'getReport']);
    Route::post('/checkout',[ApiProductController::class, 'checkout']);

});
