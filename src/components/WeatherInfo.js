
import React, { useState } from "react";
import styled from "styled-components";
import WeatherInfoComponent from "./WeatherInfoComponent";
import { ImLocation2 } from "react-icons/im";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

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

const WeatherInfo = ({ weather, forecast, setFound, BackClick, darkMode }) => {
  const [isCelsius, setIsCelsius] = useState(true);
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);

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



  const handleNextDay = () => {
    setSelectedDayIndex((prevIndex) => Math.min(prevIndex + 1, forecast.length - 1));
  };

  const handlePreviousDay = () => {
    setSelectedDayIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };
  
  const displayDateTime = (dateTime) => {
    const date = new Date(dateTime);
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayOfWeek = days[date.getDay()];
    const formattedDate = `${dayOfWeek} ${date.toLocaleTimeString()}`;
    return formattedDate;
  };

  return (
    <Container>
      <Navigation>
        <BackIcon onClick={handlePreviousDay} />
        <FrontIcon onClick={handleNextDay} />
      </Navigation>
      {forecast.length > 0 && (
        <WeatherContent>
          <WeatherCondition>
            <WeatherIcon>
              {getWeatherIcon(forecast[selectedDayIndex].weather[0].icon)}
            </WeatherIcon>
            <Temperature>{convertTemperature(forecast[selectedDayIndex].main.temp)}</Temperature>
            {/* <Day>{forecast[selectedDayIndex].dt_txt}</Day> */}
            <Day>{displayDateTime(forecast[selectedDayIndex].dt_txt)}</Day>
            <Condition>{forecast[selectedDayIndex].weather[0].description}</Condition>
            <Location>
              <ImLocation2 /> {`${weather.name}, ${weather.sys.country}`}
            </Location>
          </WeatherCondition>
          <WeatherInfoContainer>
            <WeatherInfoComponent name="Feels Like" value={convertTemperature(forecast[selectedDayIndex].main.feels_like)} />
            <WeatherInfoComponent name="Humidity" value={`${forecast[selectedDayIndex].main.humidity}%`} />
            <WeatherInfoComponent name="Wind Speed" value={`${forecast[selectedDayIndex].wind.speed}`} />
            <WeatherInfoComponent name="Pressure" value={`${forecast[selectedDayIndex].main.pressure}`} />
            <WeatherInfoComponent name="Sunrise" value={`${new Date((weather.sys.sunrise + weather.timezone) * 1000).toLocaleTimeString()}`} />
            <WeatherInfoComponent name="Sunset" value={`${new Date((weather.sys.sunset + weather.timezone) * 1000).toLocaleTimeString()}`} />
            <WeatherInfoComponent name="Timezone" value={`${weather.timezone}`} />
            <WeatherInfoComponent name="Last Update" value={`${new Date(weather.dt * 1000).toLocaleString()}`} />
            {/* Add more WeatherInfoComponent here if needed */}
          </WeatherInfoContainer>
        </WeatherContent>
      )}
      <ButtonContainer>
        <HomeButton darkMode={darkMode} onClick={() => {
          setFound(false);
          BackClick();
        }}>
          Home
        </HomeButton>
        <MeasurementButton darkMode={darkMode} onClick={toggleMeasurement}>
          {isCelsius ? "Switch to Fahrenheit" : "Switch to Celsius"}
        </MeasurementButton>
      </ButtonContainer>
    </Container>
  );
};

export default WeatherInfo;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  overflow: auto;
`;

const Navigation = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const BackIcon = styled(FiChevronLeft)`
  font-size: 25px;
  cursor: pointer;
`;

const FrontIcon = styled(FiChevronRight)`
  font-size: 25px;
  cursor: pointer;
`;

const WeatherContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const WeatherCondition = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 5px;
`;

const WeatherIcon = styled.div`
  font-size: 100px;
`;

const Temperature = styled.div`
  font-size: 50px;
  font-weight: bold;
`;

const Day = styled.div`
  font-size: 20px;
  margin-bottom: 2px;
`;

const Condition = styled.span`
  font-size: 16px;
  margin-bottom: 2px;
`;

const Location = styled.span`
  font-size: 16px;
`;

const WeatherInfoContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 5px;
  padding: 5px;
  max-width: 300px;
  border-radius: 10px;
  background-color: #f0f0f0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 5px;
  overflow: auto;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 10px;
`;

const MeasurementButton = styled.button`
  width: 100px;
  height: 40px;
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

const HomeButton = styled.button`
  width: 100px;
  height: 40px;
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
