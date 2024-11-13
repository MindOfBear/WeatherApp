<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class WeatherController extends Controller
{
    public function getWeather(Request $request)
    {
        // Obținem cheia API din fișierul .env
        $apiKey = env('OPENWEATHER_API_KEY');
        
        // Preluăm orașul din cerere, implicit este București
        $city = $request->input('city', 'Bucharest'); 

        // Facem cererea către OpenWeather API
        $response = Http::get("http://api.openweathermap.org/data/2.5/weather", [
            'q' => $city,
            'appid' => $apiKey,
            'units' => 'metric', // temperatura în grade Celsius
        ]);

        // Returnăm răspunsul JSON de la OpenWeather API
        return response()->json($response->json());
    }
}