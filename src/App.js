import axios from "axios";
import { useState } from "react";
import styled from "styled-components";
import { IoMoon, IoSunny } from "react-icons/io5"; // Import icons
import CityComponent from "./components/CityComponent";
import CurrentLocation from "./components/CurrentLocation";
import Error404 from "./components/Error404";
import WeatherInfo from "./components/WeatherInfo";

const API_KEY = "e473088a1a9bc0f59b91f43a3a33c818";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState("");
  const [forecast, setForecast] = useState("");
  const [found, setFound] = useState(false);
  const [apierror, setApierror] = useState(false);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false); // State for dark mode

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  const fetchWeather = async (CurrCity) => {
    if (!CurrCity) {
      // If the search box is empty, show an error message
      alert("Please enter a value");
      return;
    }
  
    setLoading(true);
    try {
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${CurrCity}&appid=${API_KEY}`
      );
      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${CurrCity}&appid=${API_KEY}`
      );
      setWeather(weatherResponse.data);
      //console.log(weatherResponse.data);
      setForecast(forecastResponse.data.list);
      //console.log(forecastResponse.data);
      setFound(true);
      setApierror(false);
    } catch {
      setApierror(true);
      setFound(false);
    }
    setLoading(false);
  };
  

  return (
    <Container darkMode={darkMode}>
      <Header>
        <AppLabel darkMode={darkMode}>
          Northern Trust Forecast
          <ToggleDarkModeButton onClick={toggleDarkMode}>
            {darkMode ? <SunIcon /> : <MoonIcon />}
          </ToggleDarkModeButton>
        </AppLabel>
      </Header>
      {weather && found ? (
        <WeatherInfo
          weather={weather}
          forecast={forecast}
          setFound={setFound}
          BackClick={() => {
            setCity("");
          }}
          darkMode={darkMode} // Pass darkMode to WeatherInfo component
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
    width: 70%;
  }
`;


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
`;

const ToggleDarkModeButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: inherit;
  font-size: 20px; /* Increase font size */
  outline: none;
  margin-left: 5px; /* Add margin to separate from the label */
`;

const MoonIcon = styled(IoMoon)`
  color: black;
`;

const SunIcon = styled(IoSunny)`
  color: orange;
`;

const Alternative = styled.div`
  color: ${(props) => (props.darkMode ? "white" : "black")}; // Adjust text color based on dark mode
  margin-bottom: 10px;
`;

