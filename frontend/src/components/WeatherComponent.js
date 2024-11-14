// src/components/WeatherComponent.js
import React, { useState } from 'react';
import api from '../axiosConfig';

function WeatherComponent() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const getWeather = () => {
    api.get(`/weather/${city}`)
      .then((response) => {
        setWeatherData(response.data); 
      })
      .catch((error) => {
        setWeatherData(null);
      });
  };

  return (
    <div className='h-screen flex justify-center items-center bg-orange-50'>
      <div className='bg-slate-200 sm:w-1/4 rounded-3xl p-1 shadow-sm border-2 border-slate-400'>
        <h1 className='text-center p-3 font-sans text-4xl'>Weather</h1>
        <div className='justify-center items-center'>
        <input 
          className='sm:w-3/4 p-2 m-2 rounded-3xl border-gray-100 border-2'
          type="text"
          value={city}
          onChange={handleInputChange}
          placeholder="Enter city name"
        />
        <button className='bg-blue-200 border border-slate-400 rounded-2xl p-2' onClick={getWeather}>Search</button>
        </div>
        {weatherData && (
        <div className='grid grid-cols-2 gap-2 items-center text-center font-sans text-lg'>
          
          <div className='bg-blue-50 w-46 h-32 rounded-2xl border-2 border-blue-200 text-center flex items-center justify-center text-4xl'>
            <p>{weatherData.main?.temp}°C</p>
          </div>

          <div className='bg-blue-50 w-46 h-32 rounded-2xl border-2 border-blue-200 text-center flex items-center justify-center text-xl'>
            <p>Conditions <br/> {weatherData.weather?.[0]?.description}</p>
          </div>

          <div className='bg-blue-50 w-46 h-32 rounded-2xl border-2 border-blue-200 text-center flex items-center justify-center text-xl'>
            <p>Humidity <br/> {weatherData.main?.humidity}%</p>
          </div>

          <div className='bg-blue-50 w-46 h-32 rounded-2xl border-2 border-blue-200 text-center flex items-center justify-center text-xl'>
            <p>Wind Speed <br/> {weatherData.wind?.speed} m/s</p>
          </div>

        </div>
        )}

        {/* toDo: load metadata dynamic */}

      </div>
    </div>
      
  );
}

export default WeatherComponent;