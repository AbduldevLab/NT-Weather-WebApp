// Importing necessary libraries and components
import { useState } from "react";
import styled from "styled-components";
import Toggle from "./components/Toggle";
import CityComponent from "./components/CityComponent";
import CurrentLocation from "./components/CurrentLocation";
import Error404 from "./components/Error404";
import WeatherInfo from "./components/WeatherInfo";
import axios from "axios";

// Getting the API key from environment variables
const secret_key = import.meta.env.VITE_APP_API_KEY;

// Main App component
function App() {
  // State variables for the app
  const [city, setCity] = useState(""); // City entered by the user
  const [weather, setWeather] = useState(""); // Weather data fetched from API
  const [forecast, setForecast] = useState(""); // Forecast data fetched from API
  const [found, setFound] = useState(false); // State to check if city is found or not
  const [apierror, setApierror] = useState(false); // State to handle API errors
  const [loading, setLoading] = useState(false); // State for loading indicator
  const [darkMode, setDarkMode] = useState(false); // State for dark mode toggle

  // Function to handle dark mode toggle
  const handleToggleChange = () => {
    setDarkMode(!darkMode); // Toggle the darkMode state directly
  };

  // Function to fetch weather data from API
  const fetchWeather = async (CurrCity) => {
    if (!CurrCity) {
      alert("Please enter a value.");
      return;
    }

    setLoading(true); // Start loading
    try {
      // Fetch weather data
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${CurrCity}&appid=${secret_key}`
      );
      // Fetch forecast data
      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${CurrCity}&appid=${secret_key}`
      );
      setWeather(weatherResponse.data); // Set weather data
      setForecast(forecastResponse.data.list); // Set forecast data
      setFound(true); // Set found state to true
      setApierror(false); // Reset API error state
    } catch {
      setApierror(true); // Set API error state to true
      setFound(false); // Set found state to false
    }
    setLoading(false); // Stop loading
  };

  // Render the App component
  return (
    <Container darkMode={darkMode}>
      <Header>
        <AppLabel darkMode={darkMode}>Weather Forecast</AppLabel>
        <Toggle handleChange={handleToggleChange} isChecked={darkMode} darkMode={darkMode} />
      </Header>
      {weather && found ? (
        <WeatherInfo
          weather={weather}
          forecast={forecast}
          setFound={setFound}
          BackClick={() => {
            setCity("");
          }}
          darkMode={darkMode}
        />
      ) : apierror && city.length > 0 ? (
        <Error404
          setApierror={setApierror}
          BackClick={() => {
            setCity("");
          }}
          darkMode={darkMode}
        />
      ) : (
        <>
          <CityComponent
            setCity={(e) => {
              setCity(e);
            }}
            city={city}
            fetchWeather={fetchWeather}
            weather={weather}
            loading={loading}
            darkMode={darkMode}
          />
          <Alternative darkMode={darkMode}>or</Alternative>
          <CurrentLocation
            setCity={setCity}
            setFound={setFound}
            fetchWeather={fetchWeather}
            darkMode={darkMode}
          />
        </>
      )}
      <Footer darkMode={darkMode}> <span class="text-white">&copy; 2024 All rights reserved - </span>
        <a>Abdul@devLab.</a></Footer>
    </Container>
  );
}

export default App;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 100px;
  margin: auto;
  align-items: center;
  box-shadow: 0 3px 6px 0 #555;
  padding: 20px 20px;
  border-radius: 5px;
  max-width: 800px;
  width: 90%;
  background-color: ${(props) => (props.darkMode ? "#333" : "white")};
  color: ${(props) => (props.darkMode ? "white" : "rgb(0, 0, 0)")};

  > div {
    padding-bottom: 5px;
  }

  @media (min-width: 768px) {
    width: 90%;
  }

  @media (min-width: 1024px) {
    width: 100%;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const AppLabel = styled.span`
  font-size: 24px;
  font-weight: bold;
  color: ${(props) => (props.darkMode ? "white" : "black")};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;


const Alternative = styled.div`
  color: ${(props) => (props.darkMode ? "white" : "black")};
  margin-bottom: 10px;
`;
const Footer = styled.footer`
  margin-top: 20px;
  font-size: 14px;
  color: ${(props) => (props.darkMode ? "white" : "black")};
`;



