import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const API_KEY = "e473088a1a9bc0f59b91f43a3a33c818";

const CurrentLocation = ({ setCity, setFound, fetchWeather, darkMode }) => {
  const [location, setLocation] = useState({
    loaded: false,
    coordinates: { lat: "", lng: "" },
  });

  const onSuccess = (location) => {
    setLocation({
      loaded: true,
      coordinates: {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      },
    });
  };

  const fetchWeatherViaLocation = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${location.coordinates.lat}&lon=${location.coordinates.lng}&appid=${API_KEY}`
      );
      fetchWeather(response.data.name);
      setCity(response.data.name);
      setFound(true);
    } catch {
      setFound(false);
    }
  };

  const onError = (error) => {
    setLocation({
      loaded: true,
      error,
    });
  };

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      onError({ code: 0, message: "Geolocation not supported" });
    }
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, []);

  return (
    <>
      <StyledButton
        darkMode={darkMode}
        onClick={(e) => fetchWeatherViaLocation()}
      >
        Locate me!
      </StyledButton>
    </>
  );
};

export default CurrentLocation;

const StyledButton = styled.button`
  padding: 12px 20px; /* Increased padding */
  font-size: 16px; /* Decreased font size */
  border-radius: 6px; /* Rounded corners */
  outline: none;
  color: ${(props) => (props.darkMode ? "white" : "black")}; /* Adjust text color based on dark mode */
  background-color: ${(props) => (props.darkMode ? "#333" : "#007bff")}; /* Blue button color in light mode, dark gray in dark mode */
  cursor: pointer;
  width: 150px;
  border: none;
  transition: background-color 0.3s ease; /* Smooth transition */

  &:hover {
    background-color: ${(props) =>
      props.darkMode ? "#666" : "#0056b3"}; /* Darker blue on hover */
  }
`;
