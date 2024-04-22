import axios from "axios";
import { useState } from "react";
import styled from "styled-components";
import { IoMoon, IoSunny } from "react-icons/io5"; // Import icons
import CityComponent from "./components/CityComponent";
import CurrentLocation from "./components/CurrentLocation";
import Error404 from "./components/Error404";
import WeatherInfo from "./components/WeatherInfo";
//require('dotenv').config()

const secret_key = process.env.REACT_APP_API_KEY;
// Main App component
function App() {
  const [city, setCity] = useState("");// State for city name
  const [weather, setWeather] = useState("");// State for weather data
  const [forecast, setForecast] = useState("");// State for forecast data
  const [found, setFound] = useState(false);// State for found data
  const [apierror, setApierror] = useState(false);// State for API error handling
  const [loading, setLoading] = useState(false);// State for loading
  const [darkMode, setDarkMode] = useState(false); // State for dark mode

  // Function to toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);// Toggle dark mode state value when the button is clicked.
  };

  // Function to fetch weather data from the API based on the city name entered by the user in the search box.
  const fetchWeather = async (CurrCity) => {
    if (!CurrCity) {// If the search box is empty, show an error message
      alert("Please enter a value");// Show an alert message
      return;
    }
  
    setLoading(true);// Set loading to true when the API call is in progress to show a loading spinner.
    try {
      const weatherResponse = await axios.get(// Fetch weather data from the API based on the city name entered by the user.
        `https://api.openweathermap.org/data/2.5/weather?q=${CurrCity}&appid=${secret_key}`// API URL with the city name and API key
      );
      const forecastResponse = await axios.get(// Fetch forecast data from the API based on the city name entered by the user.(3hrs 5 day forecast)
        `https://api.openweathermap.org/data/2.5/forecast?q=${CurrCity}&appid=${secret_key}`
      );
      setWeather(weatherResponse.data);// Set the weather data to the state variable.
      //console.log(weatherResponse.data);
      // Set the forecast data to the state variable. Note hoe its .list, default openweather api returns 40 items as a list array for 5 days forecast with 3 hours interval.
      setForecast(forecastResponse.data.list);
      //console.log(forecastResponse.data);
      setFound(true);// Set found to true if the data is found.
      setApierror(false);// Set apierror to false if the data is found.
    } catch {// If an error occurs during the API call, set apierror to true and found to false.
      setApierror(true);
      setFound(false);
    }
    setLoading(false);// Set loading to false after the API call is completed.
  };
  

  // Return the JSX for the App component with the necessary props and components.
  return (
    <Container darkMode={darkMode}> 
      <Header>
      {/* Pass darkMode to the Container component */}
        <AppLabel darkMode={darkMode}>
          Northern Trust Forecast
          {/* ToggleDarkModeButton component with onClick event handler */}
          <ToggleDarkModeButton onClick={toggleDarkMode}>
            {/* Apply circular border directly to the icons */}
            {darkMode ? <SunIconCircle /> : <MoonIconCircle />}
          </ToggleDarkModeButton>
        </AppLabel>
      </Header>
      {/* If weather data is found, render the WeatherInfo component with the weather data, forecast data, and other props. */}
      {weather && found ? ( 
        <WeatherInfo
          weather={weather}
          forecast={forecast}
          setFound={setFound}
          BackClick={() => {// Function to clear the city name when the back button is clicked.
            setCity("");
          }}
          darkMode={darkMode} // Pass darkMode to WeatherInfo component
        />
      ) : apierror && city.length > 0 ? (// If an API error occurs and the city name is not empty, render the Error404 component.
        <Error404
          setApierror={setApierror}
          BackClick={() => {
            setCity("");
          }}
          darkMode={darkMode}
        />
      ) : (
        <>
        {/* If the weather data is not found, render the CityComponent and CurrentLocation components with the necessary props. */}
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
    </Container>
  );
}
export default App;// Export the App component for use in other files.

// Styled components for the App component
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
    width: 70%;
  }
`;

// Styled components for the Header, AppLabel, ToggleDarkModeButton, SunIconCircle, MoonIconCircle, and Alternative components
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const AppLabel = styled.span`
  font-size: 24px; /* Increased font size */
  font-weight: bold;
  color: ${(props) => (props.darkMode ? "white" : "black")}; // Adjust text color based on dark mode
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const ToggleDarkModeButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: inherit;
  font-size: 20px; /* Increase font size */
  outline: none;
  margin-left: auto; /* Move the button to the right */
`;

const SunIconCircle = styled(IoSunny)`
  color: orange;
  border: 2px solid orange;
  border-radius: 50%; 
  padding: 5px; 
`;

const MoonIconCircle = styled(IoMoon)`
  color: black;
  border: 2px solid black; 
  border-radius: 50%; 
  padding: 5px; 
`;

const Alternative = styled.div`
  color: ${(props) => (props.darkMode ? "white" : "black")};
  margin-bottom: 10px;
`;
