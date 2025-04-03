import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Alert, Spinner } from 'react-bootstrap';
import WeatherCard from './WeatherCard';
import 'bootstrap/dist/css/bootstrap.min.css';

const WeatherApp = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [weatherDataList, setWeatherDataList] = useState([]);
  const [error, setError] = useState(null);
  const [cityInput, setCityInput] = useState('');
  const [stateInput, setStateInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const city = cityInput.trim();
    const state = stateInput.trim();
    if (city && state) {
      setSearchTerm(`${city},${state},US`);
      setIsLoading(true);
    }
  };

  const handleCityInputChange = (event) => {
    setCityInput(event.target.value);
  };

  const handleStateInputChange = (event) => {
    setStateInput(event.target.value.toUpperCase());
  };

  useEffect(() => {
    const API_KEY = '7f166f03e385dccfd338bbb3efe49c76'; 
    const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&units=metric&appid=${API_KEY}`;

    const fetchData = async () => {
      try {
        if (!searchTerm) {
          setIsLoading(false);
          return;
        }

        const response = await fetch(API_URL);
        
        if (!response.ok) {
          throw new Error(`City "${searchTerm.split(',')[0]}" not found in ${searchTerm.split(',')[1]}. Please check the spelling and try again.`);
        }
        
        const data = await response.json();
        
        const cityExists = weatherDataList.some(item => item.id === data.id);
        
        if (cityExists) {
          setError(`Weather for ${data.name} is already displayed.`);
        } else {
          setWeatherDataList(prevList => [...prevList, data]);
          setCityInput('');
          setStateInput('');
          setError(null);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (searchTerm) {
      fetchData();
    }
  }, [searchTerm]);

  const removeCity = (cityId) => {
    setWeatherDataList(weatherDataList.filter(item => item.id !== cityId));
  };

  return (
    <div className="weather-app">
      <header className="app-header">
        <div className="header-content">
          <h1 className="app-title">Weather Dashboard</h1>
          <p className="app-subtitle">Track weather conditions across multiple cities</p>
        </div>
      </header>

      <main className="app-main">
        <Container fluid className="search-container">
          <Card className="search-card">
            <Card.Body>
              <Form onSubmit={handleSubmit} className="search-form">
                <div className="input-group">
                  <Form.Control
                    type="text"
                    placeholder="Enter city name"
                    value={cityInput}
                    onChange={handleCityInputChange}
                    className="city-input"
                  />
                  <Form.Control
                    type="text"
                    placeholder="State (e.g., MA)"
                    value={stateInput}
                    onChange={handleStateInputChange}
                    className="state-input"
                    maxLength={2}
                  />
                  <Button 
                    variant="primary" 
                    type="submit" 
                    className="search-button"
                    disabled={isLoading || !cityInput || !stateInput}
                  >
                    {isLoading ? (
                      <>
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                          className="me-2"
                        />
                        Searching...
                      </>
                    ) : (
                      'Search'
                    )}
                  </Button>
                </div>
                {error && (
                  <Alert variant="danger" className="error-message">
                    {error}
                  </Alert>
                )}
              </Form>
            </Card.Body>
          </Card>
        </Container>

        <Container fluid className="weather-container">
          <div className="weather-grid">
            {weatherDataList.map((weatherData) => (
              <div key={weatherData.id} className="weather-card-wrapper">
                <WeatherCard 
                  weatherData={weatherData} 
                  onRemove={() => removeCity(weatherData.id)} 
                />
              </div>
            ))}
          </div>
        </Container>

        {weatherDataList.length === 0 && !isLoading && !error && (
          <Card className="welcome-card">
            <Card.Body>
              <h3 className="welcome-title">Welcome to Weather Dashboard</h3>
              <p className="welcome-text">Search for a city and state to see the weather forecast.</p>
            </Card.Body>
          </Card>
        )}
      </main>
    </div>
  );
};

export default WeatherApp;

  
      