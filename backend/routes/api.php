<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\WeatherController;

Route::get('/weather/{city}', [WeatherController::class, 'getWeather']);

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
