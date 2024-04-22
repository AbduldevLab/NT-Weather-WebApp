// A simplified fetchWeather function
async function fetchWeather(city) {
  // Simulating API response
  if (city === 'London') {
    return {
      temperature: 20,
      description: 'Cloudy',
    };
  } else {
    throw new Error('City not found');
  }
}

module.exports = { fetchWeather };
