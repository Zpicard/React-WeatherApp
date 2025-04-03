import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { FaTimes } from 'react-icons/fa';

const WeatherCard = ({ weatherData, onRemove }) => {
  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getWeatherIcon = (weatherCode) => {
    const iconMap = {
      '01d': '☀️',
      '01n': '🌙',
      '02d': '⛅',
      '02n': '☁️',
      '03d': '☁️',
      '03n': '☁️',
      '04d': '☁️',
      '04n': '☁️',
      '09d': '🌧️',
      '09n': '🌧️',
      '10d': '🌦️',
      '10n': '🌧️',
      '11d': '⛈️',
      '11n': '⛈️',
      '13d': '🌨️',
      '13n': '🌨️',
      '50d': '🌫️',
      '50n': '🌫️'
    };
    return iconMap[weatherData.weather[0].icon] || '❓';
  };

  const formatTemperature = (temp) => {
    return `${Math.round(temp)}°C`;
  };

  const formatWindSpeed = (speed) => {
    return `${Math.round(speed)} m/s`;
  };

  return (
    <Card className="weather-card">
      <Card.Body>
        <div className="weather-card-header">
          <h2 className="city-name">{weatherData.name}</h2>
          <Button 
            variant="link" 
            className="remove-button"
            onClick={onRemove}
            aria-label="Remove city"
          >
            <FaTimes />
          </Button>
        </div>
        
        <div className="weather-icon">
          <span className="weather-emoji">{getWeatherIcon(weatherData.weather[0].icon)}</span>
        </div>

        <div className="weather-info">
          <div className="temperature">
            <span className="temp-value">{formatTemperature(weatherData.main.temp)}</span>
            <span className="feels-like">Feels like {formatTemperature(weatherData.main.feels_like)}</span>
          </div>

          <div className="weather-details">
            <div className="detail-item">
              <span className="detail-label">Humidity</span>
              <span className="detail-value">{weatherData.main.humidity}%</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Wind</span>
              <span className="detail-value">{formatWindSpeed(weatherData.wind.speed)}</span>
            </div>
          </div>

          <div className="weather-description">
            {weatherData.weather[0].description}
          </div>
        </div>
      </Card.Body>
      <Card.Footer className="text-muted weather-card-footer">
        Last updated: {formatDate(weatherData.dt)}
      </Card.Footer>
    </Card>
  );
};

export default WeatherCard;

