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
    <div>
      <h1>Weather</h1>
      <input
        type="text"
        value={city}
        onChange={handleInputChange}
        placeholder="Enter city name"
      />
      <button onClick={getWeather}>Search</button>

      {weatherData && (
        <div>
          <h2>Weather Data for {city}</h2>
          <p>Temperature: {weatherData.main?.temp}°C</p>
          <p>Weather: {weatherData.weather?.[0]?.description}</p>
          <p>Humidity: {weatherData.main?.humidity}%</p>
          <p>Wind Speed: {weatherData.wind?.speed} m/s</p>
        </div>
      )}
    </div>
  );
}

export default WeatherComponent;