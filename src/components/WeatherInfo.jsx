import React, { useState } from "react";
import styled from "styled-components";
import WeatherInfoComponent from "./WeatherInfoComponent";// Import the WeatherInfoComponent
import { ImLocation2 } from "react-icons/im";// Import the location icon
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import {// Import diff weather icons
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

const WeatherInfo = ({ weather, forecast, setFound, BackClick, darkMode }) => {// WeatherInfo component with props.
  const [isCelsius, setIsCelsius] = useState(true);// State for temperature measurement (Celsius or Fahrenheit).
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);// State for the selected day index(position).

  const toggleMeasurement = () => {// Function to toggle the temperature measurement.
    setIsCelsius(!isCelsius);// Set the temperature measurement to the opposite of the current value.
  };

  const convertTemperature = (temp) => {// Function to convert the temperature to Celsius or Fahrenheit.
    // Convert the temperature to Celsius or Fahrenheit. Since 0°C is equivalent to 273.15 Kelvin, we subtract 273.15 from the temperature to convert it to Celsius.
    //To convert Celsius to Fahrenheit, we multiply the temperature by 9/5 and add 32. round down the result to the nearest whole number using 'math.floor'.
    const temperature = isCelsius ? Math.floor(temp - 273) : Math.floor((temp - 273) * (9 / 5) + 32);
    return `${temperature}°${isCelsius ? "C" : "F"}`;// Return the temperature with the measurement unit (Celsius or Fahrenheit).
  };

  const getWeatherIcon = (icon) => {// Function to return the weather icon based on the icon code from the API response.some arent included as they are not needed. handles most common weather conditions.
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

    return weatherIcons[icon] || null;// If the API returns an icon code that is not included in the weatherIcons object, the function returns null as a fallback.
  };

  const handleNextDay = () => {// Function to handle the next day button click.
    setSelectedDayIndex((prevIndex) => Math.min(prevIndex + 1, forecast.length - 1));// Set the selected day index to the next day index if it is less than the forecast length. Otherwise, set it to the last index.
  };

  const handlePreviousDay = () => {// Function to handle the previous day button click.
    setSelectedDayIndex((prevIndex) => Math.max(prevIndex - 1, 0));// Set the selected day index to the previous day index if it is greater than 0. Otherwise, set it to 0(return to the start).
  };
  
  const displayDateTime = (dateTime) => {// Function to display the date and time in a readable format.
    const date = new Date(dateTime);// Create a new Date object from the dateTime string.
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];// initialise an Array of days of the week.
    // Get the day of the week from the days array using the getDay() method. instead of displaying the day as a number in the form of year/month/day, 
    //we display it as a string. as the dt_txt property in the forecast array is in the form of year/month/day hour:minute:second.(default)
    const dayOfWeek = days[date.getDay()];
    const formattedDate = `${dayOfWeek} ${date.toLocaleTimeString()}`;// Format the date and time as "Day Hour:Minute AM/PM".
    return formattedDate;
  };

  // Return the WeatherInfo component with the weather information and buttons to navigate between days.
  return (
    <Container>
      {/*Navigation buttons to navigate between days. */}
      <Navigation>
        <BackIcon onClick={handlePreviousDay} />
        <FrontIcon onClick={handleNextDay} />
      </Navigation>
      {forecast.length > 0 && (// Display the weather information if the forecast array is not empty.bigger then zero
        <WeatherContent>
          <WeatherCondition>
            <WeatherIcon>
              {getWeatherIcon(forecast[selectedDayIndex].weather[0].icon)}  {/* // Display the weather icon based on the icon code from the API response. */}
            </WeatherIcon>
            <Temperature>{convertTemperature(forecast[selectedDayIndex].main.temp)}</Temperature>{/* Display the temperature in Celsius or Fahrenheit, main.temp is the property */}
            <Day>{displayDateTime(forecast[selectedDayIndex].dt_txt)}</Day>{/* Display the day and time in a readable format by extracting the dt_text property from the fetched list array. */}
            <Condition>{forecast[selectedDayIndex].weather[0].description}</Condition>{/* Display the weather condition description by extracting the description property from the fetched list array. */}
            <Location>
              <ImLocation2 /> {`${weather.name}, ${weather.sys.country}`}{/* Display the location name and country code by extracting the name and country properties from the weather object. */}
            </Location>
          </WeatherCondition>
          {/* Display the weather information in a grid layout using the WeatherInfoComponent component. */}
          <WeatherInfoContainer>
            <WeatherInfoComponent name="Feels Like" value={convertTemperature(forecast[selectedDayIndex].main.feels_like)} />{/* Display the feels like temperature by converting the temperature to Celsius or Fahrenheit. */}
            <WeatherInfoComponent name="Humidity" value={`${forecast[selectedDayIndex].main.humidity}%`} />{/* Display the humidity by extracting the humidity property from the fetched list array. */}
            <WeatherInfoComponent name="Wind Speed" value={`${forecast[selectedDayIndex].wind.speed}`} />{/* Display the wind speed by extracting the speed property from the fetched list array. */}
            <WeatherInfoComponent name="Pressure" value={`${forecast[selectedDayIndex].main.pressure}`} />{/* Display the pressure by extracting the pressure property from the fetched list array. */}
            <WeatherInfoComponent name="Sunrise" value={`${new Date((weather.sys.sunrise + weather.timezone) * 1000).toLocaleTimeString()}`} />{/* Display the sunrise time by converting the timestamp to a readable time format. */}
            <WeatherInfoComponent name="Sunset" value={`${new Date((weather.sys.sunset + weather.timezone) * 1000).toLocaleTimeString()}`} />{/* Display the sunset time by converting the timestamp to a readable time format. */}
            <WeatherInfoComponent name="Timezone" value={`${weather.timezone}`} />{/* Display the timezone by extracting the timezone property from the weather object. */}
            <WeatherInfoComponent name="Last Update" value={`${new Date(weather.dt * 1000).toLocaleString()}`} />{/* Display the last update time by converting the timestamp to a readable day and time format. */}
            {/* Add more WeatherInfoComponent here if needed */}
          </WeatherInfoContainer>
        </WeatherContent>
      )}
      <ButtonContainer>
        <HomeButton darkMode={darkMode} onClick={() => {// Button to navigate back to the home page.
          setFound(false);// Set the found state to false to display the search form(dash).
          BackClick();// Call the BackClick function to reset the search form.
        }}>
          Home
        </HomeButton>
        <MeasurementButton darkMode={darkMode} onClick={toggleMeasurement}>{/* Button to toggle the temperature measurement between Celsius and Fahrenheit. */}
          {isCelsius ? "Switch to Fahrenheit" : "Switch to Celsius"}{/* Display the button text based on the temperature measurement. */}
        </MeasurementButton>
      </ButtonContainer>
    </Container>
  );
};

export default WeatherInfo;// Export the WeatherInfo component.

// Styled components for the WeatherInfo component.
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
  background-color: ${(props) => (props.darkMode ? "#333" : "#007bff")}; /* Set the background color based on the darkMode prop. */
  color: inherit;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.darkMode ? "#666" : "#0056b3")}; /* Change the background color on hover based on the darkMode prop. */
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
