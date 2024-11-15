// src/components/WeatherComponent.js
import React, { useState } from 'react';
import api from '../axiosConfig';

function WeatherComponent() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const handleLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      api.get(`/weather/coordinates/${latitude}/${longitude}`)
        .then((response) => {
          setWeatherData(response.data);
        })
        .catch((error) => {
          setWeatherData(null);
        });
  
      console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
    }, (error) => {
      console.error('Error getting location:', error);
    });
  };

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
      <div className='bg-slate-200  rounded-3xl p-1 shadow-sm border-2 border-slate-400'>
        
        {weatherData ? (
          <h1 className='text-center p-3 font-sans text-3xl'>Weather in {weatherData.name}</h1>
        ):(
          <h1 className='text-center p-3 font-sans text-4xl'>Weather</h1>
        )}
        
        <div className="grid grid-cols-2 items-center gap-4 p-4">
          <input 
            className="p-2 sm:w-[140%] w-[120%] rounded-3xl border border-gray-300 justify-self-start"
            type="text"
            value={city}
            onChange={handleInputChange}
            placeholder="Enter city name"
          />
          <div className="flex justify-end gap-2">
            <button 
              className="bg-blue-200 border border-slate-400 rounded-2xl p-2"
              onClick={getWeather}
            >
              Search
            </button>
            <button 
              className="bg-blue-200 border border-slate-400 rounded-2xl p-2 w-10"
              onClick={handleLocation}
            >
              🌍
            </button>
          </div>
        </div>
        {weatherData ? (
          weatherData && (
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
            )
        ) : (
          <div className='text-center text-slate-500 p-2 text-lg'>Please select a location!</div>
        )}
        {/* toDo: load metadata dynamic */}

      </div>
    </div>
      
  );
}

export default WeatherComponent;