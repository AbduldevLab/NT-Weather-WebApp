import React, { useState } from "react";
import styled from "styled-components";
import WeatherInfoComponent from "./WeatherInfoComponent";
import { ImLocation2 } from "react-icons/im";
import { FiChevronLeft } from "react-icons/fi";

// Import weather icons
import {
  WiDaySunny,
  WiCloudy,
  WiRain,
  WiThunderstorm,
  WiSnow,
  WiFog,
  WiNightClear,
  WiNightCloudy,
  WiNightRain,
  WiNightThunderstorm,
  WiNightSnow,
  WiNightFog
} from "react-icons/wi";

const WeatherInfo = ({ weather, setFound, BackClick, darkMode }) => {
  const [isCelsius, setIsCelsius] = useState(true);

  const toggleMeasurement = () => {
    setIsCelsius(!isCelsius);
  };

  const convertTemperature = (temp) => {
    const temperature = isCelsius ? Math.floor(temp - 273) : Math.floor((temp - 273) * (9 / 5) + 32);
    return `${temperature}°${isCelsius ? "C" : "F"}`;
  };

  const getWeatherIcon = (icon) => {
    const weatherIcons = {
      "01d": <WiDaySunny />,
      "02d": <WiCloudy />,
      "03d": <WiCloudy />,
      "04d": <WiCloudy />,
      "09d": <WiRain />,
      "10d": <WiRain />,
      "11d": <WiThunderstorm />,
      "13d": <WiSnow />,
      "50d": <WiFog />,
      "01n": <WiNightClear />,
      "02n": <WiNightCloudy />,
      "03n": <WiNightCloudy />,
      "04n": <WiNightCloudy />,
      "09n": <WiNightRain />,
      "10n": <WiNightRain />,
      "11n": <WiNightThunderstorm />,
      "13n": <WiNightSnow />,
      "50n": <WiNightFog />,
    };

    return weatherIcons[icon] || null;
  };

  return (
    <Container>
      <Back onClick={() => {
        setFound(false);
        BackClick();
      }}>
        <ArrowIcon />
      </Back>
      {weather && (
        <>
          <WeatherCondition>
            <WeatherIcon>
              {getWeatherIcon(weather.weather[0].icon)}
            </WeatherIcon>
            <Temperature>{convertTemperature(weather.main.temp)}</Temperature>
            <Condition>{weather.weather[0].description}</Condition>
            <Location>
              <ImLocation2 /> {`${weather.name}, ${weather.sys.country}`}
            </Location>
          </WeatherCondition>
          <WeatherInfoContainer>
            <WeatherInfoComponent name="Feels Like" value={convertTemperature(weather.main.feels_like)} />
            <WeatherInfoComponent name="Humidity" value={`${weather.main.humidity}%`} />
            <WeatherInfoComponent name="Wind Speed" value={`${weather.wind.speed}`} />
            <WeatherInfoComponent name="Pressure" value={`${weather.main.pressure}`} />
            <WeatherInfoComponent name="Sunrise" value={`${new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}`} />
            <WeatherInfoComponent name="Sunset" value={`${new Date(weather.sys.sunset * 1000).toLocaleTimeString()}`} />
            <WeatherInfoComponent name="Timezone" value={`${weather.timezone}`} />
            <WeatherInfoComponent name="Last Update" value={`${new Date(weather.dt * 1000).toLocaleString()}`} />
          </WeatherInfoContainer>
        </>
      )}
      <MeasurementButton darkMode={darkMode} onClick={toggleMeasurement}>
        {isCelsius ? "Switch to Fahrenheit" : "Switch to Celsius"}
      </MeasurementButton>
    </Container>
  );
};

export default WeatherInfo;

// Styled components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Back = styled.span`
  font-size: 25px;
  cursor: pointer;
`;

const ArrowIcon = styled(FiChevronLeft)`
  color: inherit;
`;

const WeatherCondition = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const WeatherIcon = styled.div`
  font-size: 100px;
`;

const Temperature = styled.div`
  font-size: 50px;
  font-weight: bold;
`;

const Condition = styled.span`
  font-size: 18px;
`;

const Location = styled.span`
  font-size: 18px;
`;

const WeatherInfoContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  margin-top: 30px;
  padding: 20px;
  max-width: 300px;
  border-radius: 10px;
  background-color: #f0f0f0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const MeasurementButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  border: none;
  background-color: ${(props) => (props.darkMode ? "#333" : "#007bff")};
  color: inherit;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.darkMode ? "#666" : "#0056b3")};
  }
`;
