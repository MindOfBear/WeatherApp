// src/components/WeatherComponent.js
import React, { useState, useEffect } from 'react';
import api from '../axiosConfig';
import { getWeatherEmoji } from '../utils/weatherHelper.js';

function WeatherComponent() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [metricSystem, setMetricSystem] = useState('metric');

  const handleLocation = () => {
    resetInput();
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

  const resetInput = () => {
    setCity('');
  }

  const toggleMetricSystem = () => {
    setMetricSystem(metricSystem === 'metric' ? 'imperial' : 'metric');
  }

  const getWeather = () => {
    api.get(`/weather/${city}`)
      .then((response) => {
        setWeatherData(response.data); 
      })
      .catch((error) => {
        setWeatherData(null);
      });
  };

  const getTemperature = () => {
    const temp = weatherData?.main?.temp;
    if (temp !== undefined) {
      return metricSystem === 'metric' 
        ? temp 
        : (temp * 9/5) + 32;
    }
    return null;
  };
  useEffect(() => {
    handleLocation();
    // eslint-disable-next-line
  }, []);

  const displayTemp = getTemperature();
  const unit = metricSystem === 'metric' ? 'C' : 'F';


  return (
    <div className='h-screen flex justify-center items-center bg-orange-50'>
      <div className='bg-slate-200 rounded-3xl p-1 shadow-sm border-2 border-slate-400'>
        
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
              className="bg-blue-200 border border-slate-400 rounded-2xl p-2 hover:bg-blue-300"
              onClick={getWeather}
            >
              Search
            </button>
            <button 
              className="bg-blue-200 border border-slate-400 rounded-2xl p-2 w-10 hover:bg-blue-300"
              onClick={handleLocation}
            >
              🌍
            </button>
          </div>
        </div>
        <div className='relative'>
          {weatherData ? (
            weatherData && (
              <div className='grid grid-cols-2 gap-2 items-center text-center font-sans text-lg'>
                
                <div className="group bg-blue-50 w-46 h-32 rounded-2xl border-2 border-blue-200 text-center flex items-center justify-center text-4xl relative"
                onClick={toggleMetricSystem}
              >
                <p>{displayTemp !== null ? displayTemp.toFixed(1) : '--'}°{unit}</p>
                <p className="absolute inset-0  justify-center text-sm text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Click to change
                </p>
              </div>
      
                <div className='bg-blue-50 w-46 h-32 rounded-2xl border-2 border-blue-200 text-center items-center justify-center text-xl flex'>
                  <p className=''>{weatherData.weather[0].description.charAt(0).toUpperCase() + weatherData.weather[0].description.slice(1)}
                    <p className='text-4xl'>{getWeatherEmoji(weatherData.weather[0].description)}</p>    
                  </p>         
                </div>
      
                <div className='bg-blue-50 w-46 h-32 rounded-2xl border-2 border-blue-200 text-center flex items-center justify-center text-xl'>
                  <p>Humidity <br/> {weatherData.main?.humidity}%</p>
                </div>
      
                <div className='bg-blue-50 w-46 h-32 rounded-2xl border-2 border-blue-200 text-center flex items-center justify-center text-xl'>
                  <p>Wind Speed <br/> {weatherData.wind?.speed} m/s</p>
                </div>
                <p className='mt-5'></p>
              </div>
              )
          ) : (
            <p className='text-center pb-10 text-slate-600'>Enter a city or allow acces to location!</p>
          )}
          <p className='absolute bottom-0 w-[100%] text-center pr-2 opacity-80 text-slate-800 text-sm'>Weather provider is OpenWeather©</p>
        </div>

        {/* toDo: load metadata dynamic */}

      </div>
    </div>
      
  );
}

export default WeatherComponent;