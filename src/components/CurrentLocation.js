import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { FaMapMarkerAlt } from "react-icons/fa"; // Import map marker icon

const secret_key = process.env.REACT_APP_API_KEY;// secret key constant that holds the api key

const CurrentLocation = ({ setCity, setFound, fetchWeather, darkMode }) => {// Add setCity, setFound, fetchWeather, and darkMode as parameters
  const [location, setLocation] = useState({// Set location state
    loaded: false,// Set loaded to false in order to load the location data from the browser geolocation API when the component mounts.
    coordinates: { lat: "", lng: "" },// Set coordinates to an empty string.
  });

  const onSuccess = (location) => {// Add location as a parameter to the onSuccess function to handle the location data from the geolocation API.
    setLocation({// Set the location state with the loaded location data.
      loaded: true,// Set loaded to true after the location data is loaded.
      coordinates: {// Set the coordinates with the latitude and longitude data from the location object.
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      },
    });
  };

  const fetchWeatherViaLocation = async () => {// Add fetchWeatherViaLocation function to fetch weather data based on the user's current location.
    try {// Try to fetch weather data based on the user's current location.
      const response = await axios.get(// Fetch weather data from the API based on the user's current location using axios and the OpenWeatherMap API.
        `https://api.openweathermap.org/data/2.5/weather?lat=${location.coordinates.lat}&lon=${location.coordinates.lng}&appid=${secret_key}`
      );
      fetchWeather(response.data.name);// Fetch weather data based on the city name received from the API response.
      setCity(response.data.name);// Set the city state with the city name received from the API response.
      setFound(true);// Set the found state to true to indicate that the city was found.
    } catch {
      setFound(false);// Set the found state to false to indicate that the city was not found.
    }
  };

  const onError = (error) => {// Add error as a parameter to the onError function to handle errors from the geolocation API.
    setLocation({
      loaded: true,// Set loaded to true even if an error occurs to avoid infinite loading.
      error,// Set the error state with the error message received from the geolocation API.
    });
  };

  useEffect(() => {// Use the useEffect hook to load the user's location when the component mounts.
    if (!("geolocation" in navigator)) {// Check if geolocation is supported by the browser.
      onError({ code: 0, message: "Geolocation not supported" });// Handle the case where geolocation is not supported by setting an error message.
    }
    navigator.geolocation.getCurrentPosition(onSuccess, onError);// Get the user's current location using the geolocation API.
  }, []);// Add an empty dependency array to ensure that the effect runs only once when the component mounts.

  // Return the button component with the map marker icon and text.
  return (
    <>
      <StyledButton
        darkMode={darkMode}
        onClick={(e) => fetchWeatherViaLocation()}
      >
        <Icon darkMode={darkMode} /> 
        Locate me! 
      </StyledButton>
    </>
  );
};

export default CurrentLocation;// Export the CurrentLocation component.

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
const Icon = styled(FaMapMarkerAlt)`
  margin-right: 5px; /* Adjust margin between icon and text */
`;
