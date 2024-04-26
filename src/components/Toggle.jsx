import React from "react";
import styled from "styled-components";

const Toggle = ({ handleChange, isChecked, darkMode}) => {
  return (
    <ToggleContainer className="toggle-container">
      <ToggleInput
        type="checkbox"
        id="check"
        className="toggle"
        onChange={handleChange}
        checked={isChecked}
      />
      <ToggleLabel htmlFor="check">
      <ToggleSwitch checked={isChecked} darkMode={darkMode} />
        Theme Mode
      </ToggleLabel>
    </ToggleContainer>
  );
};

export default Toggle;

const ToggleContainer = styled.div`
  position: absolute;
  top: 2em;
  right: 2em;
  
`;

const ToggleInput = styled.input`
  visibility: hidden;
`;

const ToggleLabel = styled.label`
  display: flex;
  align-items: center;
  font-size: 1.4em;
  cursor: pointer;
  color: var(--primary-text-color);
  
`;

const ToggleSwitch = styled.span`
  height: 1em;
  width: 2em;
  border-radius: 1em;
  background-color: ${(props) => (props.darkMode ? "#f0eb9d" : "#283452")};
  margin-right: 0.5em;
  margin-top: 0.2em; /* Add margin-top to move it down */
  transition: background-color 250ms ease-in-out;
  position: relative;

  &::after {
    content: "";
    height: 0.9em;
    width: 0.9em;
    border-radius: 1em;
    background-color: ${(props) => (props.darkMode ? "#ffd000" : "#00a6ff")};
    position: absolute;
    left: 0.2em;
    transition: background-color 250ms ease-in-out, transform 250ms ease-in-out;
    transform: ${(props) => (props.checked ? "translateX(100%)" : "translateX(0)")};
  }
`;

//00a6ff
//00a6ff
//f0eb9d
//ffd000
