import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { XCircle } from 'react-bootstrap-icons';

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
    // You can replace this with actual weather icons from a library
    return `https://openweathermap.org/img/wn/${weatherCode}@2x.png`;
  };

  const formatTemperature = (temp) => {
    return `${Math.round(temp)}°C`;
  };

  const formatWindSpeed = (speed) => {
    return `${Math.round(speed)} m/s`;
  };

  return (
    <Card className="h-100 shadow-sm hover-shadow">
      <Card.Body className="p-4">
        <div className="d-flex justify-content-between align-items-start mb-3">
          <div>
            <h3 className="mb-1">{weatherData.name}</h3>
            <p className="text-muted mb-0">{weatherData.sys.country}</p>
          </div>
          <Button
            variant="link"
            className="p-0 text-muted hover-danger"
            onClick={onRemove}
          >
            <XCircle size={20} />
          </Button>
        </div>

        <div className="text-center mb-4">
          <img
            src={getWeatherIcon(weatherData.weather[0].icon)}
            alt={weatherData.weather[0].description}
            className="mb-3"
            style={{ width: '80px', height: '80px' }}
          />
          <h2 className="mb-1">{formatTemperature(weatherData.main.temp)}</h2>
          <p className="text-capitalize text-muted mb-0">
            {weatherData.weather[0].description}
          </p>
        </div>

        <div className="row g-3">
          <div className="col-6">
            <div className="p-2 bg-light rounded">
              <p className="mb-1 text-muted small">Feels like</p>
              <p className="mb-0">{formatTemperature(weatherData.main.feels_like)}</p>
            </div>
          </div>
          <div className="col-6">
            <div className="p-2 bg-light rounded">
              <p className="mb-1 text-muted small">Humidity</p>
              <p className="mb-0">{weatherData.main.humidity}%</p>
            </div>
          </div>
          <div className="col-6">
            <div className="p-2 bg-light rounded">
              <p className="mb-1 text-muted small">Wind</p>
              <p className="mb-0">{formatWindSpeed(weatherData.wind.speed)}</p>
            </div>
          </div>
          <div className="col-6">
            <div className="p-2 bg-light rounded">
              <p className="mb-1 text-muted small">Pressure</p>
              <p className="mb-0">{weatherData.main.pressure} hPa</p>
            </div>
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
