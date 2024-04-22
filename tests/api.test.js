// api.test.js

// Import the fetchWeatherData and fetchForecastData functions
import { fetchWeatherData, fetchForecastData } from './api';

// Mock the fetch function (assuming you're using fetch for API calls)
global.fetch = jest.fn();

describe('API Tests', () => {
  afterEach(() => {
    fetch.mockClear();
  });

  // Test case for fetchWeatherData function
  it('fetches weather data from API', async () => {
    // Mock API response
    const mockResponse = {
      main: {
        temp: 25,
      },
      weather: [{
        main: 'Clear',
        description: 'clear sky',
      }],
    };

    // Mock the fetch function to return the mock response
    fetch.mockResolvedValueOnce({
      json: async () => mockResponse,
    });

    // Call the fetchWeatherData function
    const data = await fetchWeatherData();

    // Expect fetch to be called with the correct URL
    expect(fetch).toHaveBeenCalledWith( `https://api.openweathermap.org/data/2.5/weather?q=${CurrCity}&appid=${process.env.REACT_APP_API_KEY}`);

    // Expect data to match the mock response
    expect(data).toEqual({
      temperature: 25,
      description: 'clear sky',
    });
  });

  // Test case for fetchForecastData function
  it('fetches forecast data from API', async () => {
    // Mock API response
    const mockResponse = {
      list: [{
        dt_txt: '2024-04-22 12:00:00',
        main: {
          temp: 26,
        },
        weather: [{
          main: 'Sunny',
          description: 'sunny weather',
        }],
      }],
    };

    // Mock the fetch function to return the mock response
    fetch.mockResolvedValueOnce({
      json: async () => mockResponse,
    });

    // Call the fetchForecastData function
    const data = await fetchForecastData();

    // Expect fetch to be called with the correct URL
    expect(fetch).toHaveBeenCalledWith( 'https://api.openweathermap.org/data/2.5/forecast?q=${CurrCity}&appid=${process.env.REACT_APP_API_KEY}');

    // Expect data to match the mock response
    expect(data).toEqual([{
      date: '2024-04-22',
      temperature: 26,
      description: 'sunny weather',
    }]);
  });
});
