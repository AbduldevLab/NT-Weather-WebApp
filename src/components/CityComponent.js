import React from "react";
import styled from "styled-components";
import { BsSearch } from "react-icons/bs";
import { ImSpinner3 } from "react-icons/im";
import MyImage from '../Images/weather-news.png'
import "./style.css";

const CityComponent = (props) => {
  const { setCity, fetchWeather, city, loading, darkMode } = props;

  return (
    <>
      <WeatherLogo src={MyImage} alt="My Image"></WeatherLogo>
      <CityLabel darkMode={darkMode}>
        {loading ? `finding weather of ${city} ` : "Enter city/country name below"}
      </CityLabel>
      <SearchBox
        darkMode={darkMode}
        onSubmit={(e) => {
          e.preventDefault();
          fetchWeather(city);
        }}
      >
        <input
          type="text"
          placeholder="Search"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={{ color: darkMode ? "white" : "black" }} // Adjust input text color based on dark mode
        />
        <button type="submit">
          {!loading ? <BsSearch /> : <ImSpinner3 className="loading-icon" />}
        </button>
      </SearchBox>
    </>
  );
};

export default CityComponent;

const WeatherLogo = styled.img`
  width: 140px;
  height: 140px;
  margin: 20px auto;
`;

const CityLabel = styled.span`
  color: ${(props) => (props.darkMode ? "white" : "black")}; // Adjust text color based on dark mode
  font-size: 18px;
  font-weight: bold;
`;

const SearchBox = styled.form`
  display: flex;
  align-items: center;
  margin: 12px auto;
  border: 2px solid ${(props) => (props.darkMode ? "#ccc" : "#007bff")}; /* Change border color based on dark mode */
  border-radius: 6px; /* Increase border radius for a softer look */
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
  & input {
    flex: 1;
    padding: 12px;
    font-size: 16px;
    border: none;
    outline: none;
    background-color: ${(props) => (props.darkMode ? "#444" : "#f4f4f4")}; /* Light gray background color */
    border-radius: 6px; /* Match border radius */
  }
  
  & button {
    padding: 12px 16px;
    font-size: 16px;
    color: white;
    background-color: ${(props) => (props.darkMode ? "#333" : "#007bff")}; /* Blue button color */
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease;
    border-radius: 0 6px 6px 0; /* Match border radius */
    
    &:hover {
      background-color: ${(props) => (props.darkMode ? "#666" : "#0056b3")}; /* Darker blue on hover */
    }
  }
`;
