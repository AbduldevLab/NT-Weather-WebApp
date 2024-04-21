import React from "react";
import styled from "styled-components";
import { WiThermometer, WiHumidity, WiStrongWind, WiBarometer, WiSunrise, WiSunset, WiTime3 } from "react-icons/wi"; // Import additional icons

const WeatherInfoComponent = (props) => {
  const { name, value } = props;

  return (
    <InfoContainer>
      {getIcon(name)}
      <InfoLabel>
        {value}
        <div>{name}</div>
      </InfoLabel>
    </InfoContainer>
  );
};

export default WeatherInfoComponent;

const getIcon = (name) => {
  switch (name) {
    case "Temperature":
      return <WiThermometer />;
    case "Humidity":
      return <WiHumidity />;
    case "Wind":
      return <WiStrongWind />;
    case "Pressure":
      return <WiBarometer />;
    case "Sunrise": // Add case for Sunrise
      return <WiSunrise />;
    case "Sunset": // Add case for Sunset
      return <WiSunset />;
    case "Timezone": // Add case for Timezone
      return <WiTime3 />;
    default:
      return null;
  }
};

const InfoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto auto; /* Adjusted margin for centering */
  width: 100px; /* Fixed width */
  height: 50px; /* Fixed height */
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  color: ${(props) => (props.darkMode ? "white" : "black")}; 
`;

const InfoLabel = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 12px;
  margin-left: 10px;
  color: ${(props) => (props.darkMode ? "white" : "black")}; 
  & div {
    font-size: 12px;
    text-transform: capitalize;
  }
`;
