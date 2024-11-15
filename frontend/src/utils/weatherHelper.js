// src/utils/weatherHelpers.js

export const getWeatherEmoji = (condition) => {
    switch (condition) {
      case 'clear sky':
        return '🌞';
      case 'few clouds':
        return '🌤️';
      case 'overcast clouds':
        return '🌥️';
      case 'broken clouds':
        return '☁️';
      case 'light rain':
        return '🌧️';
      case 'rain':
        return '🌧️';
      case 'thunderstorm':
        return '⛈️';
      case 'snow':
        return '❄️';
      case 'mist':
        return '🌫️';
      case 'fog':
        return '🌫️';
      case 'haze':
        return '🌫️';
      case 'drizzle':
        return '🌦️';
      default:
        return 'Unknown';
    }
  };