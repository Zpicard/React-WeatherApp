import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Alert, Spinner } from 'react-bootstrap';
import WeatherCard from './WeatherCard';
import 'bootstrap/dist/css/bootstrap.min.css';

const WeatherApp = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [weatherDataList, setWeatherDataList] = useState([]);
  const [error, setError] = useState(null);
  const [cityInput, setCityInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const city = cityInput.trim();
    if (city) {
      setSearchTerm(city);
      setIsLoading(true);
    }
  };

  const handleInputChange = (event) => {
    setCityInput(event.target.value);
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
          throw new Error(`City "${searchTerm}" not found. Please check the spelling and try again.`);
        }
        
        const data = await response.json();
        
        const cityExists = weatherDataList.some(item => item.id === data.id);
        
        if (cityExists) {
          setError(`Weather for ${data.name} is already displayed.`);
        } else {
          setWeatherDataList(prevList => [...prevList, data]);
          setCityInput('');
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
    <>
      <header className="app-header">
        <h1 className="app-title">Weather Dashboard</h1>
        <p className="app-subtitle">Track weather conditions across multiple cities</p>
      </header>

      <Container className="py-5">
        <Card className="shadow-sm mb-4">
          <Card.Body>
            <Row className="justify-content-center">
              <Col md={8}>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <div className="input-group">
                      <Form.Control
                        type="text"
                        placeholder="Enter city name"
                        value={cityInput}
                        onChange={handleInputChange}
                        className="form-control-lg"
                      />
                      <Button 
                        variant="primary" 
                        type="submit" 
                        className="px-4"
                        disabled={isLoading}
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
                  </Form.Group>
                </Form>
                {error && (
                  <Alert variant="danger" className="mt-3">
                    {error}
                  </Alert>
                )}
              </Col>
            </Row>
          </Card.Body>
        </Card>

        <div className="weather-grid">
          <Row xs={1} md={2} lg={3} xl={4} className="g-4">
            {weatherDataList.map((weatherData) => (
              <Col key={weatherData.id}>
                <WeatherCard 
                  weatherData={weatherData} 
                  onRemove={() => removeCity(weatherData.id)} 
                />
              </Col>
            ))}
          </Row>
        </div>
  
        {weatherDataList.length === 0 && !isLoading && !error && (
          <Card className="text-center mt-5 shadow-sm">
            <Card.Body>
              <h3 className="text-muted">Welcome to Weather Dashboard</h3>
              <p className="text-muted">Search for a city to see the weather forecast.</p>
            </Card.Body>
          </Card>
        )}
      </Container>
    </>
  );
};

export default WeatherApp;

  
      