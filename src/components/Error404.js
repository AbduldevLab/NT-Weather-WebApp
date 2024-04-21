import React from "react";
import styled from "styled-components";
import { FaExclamationCircle } from "react-icons/fa";

const Error404 = (props) => {
  const { setApierror, BackClick, darkMode } = props;

  // Function to handle going back to the dashboard and setting apiError to false
  const handleBackToDashboard = () => {
    setApierror(false);
    BackClick();
  };

  return (
    <Container>
      <MessageContainer>
        <IconContainer>
          <NoResultIcon />
        </IconContainer>
        <ErrorMessage>Location not found!</ErrorMessage>
        {/* Ensure darkMode prop is passed correctly */}
        <BackToDashboardButton darkMode={darkMode} onClick={handleBackToDashboard}>
          Back to Dashboard
        </BackToDashboardButton>
      </MessageContainer>
    </Container>
  );
};

export default Error404;

const Container = styled.div``;

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
`;

const IconContainer = styled.div`
  margin-bottom: 20px;
`;

const ErrorMessage = styled.div`
  margin-bottom: 20px; /* Add margin between error message and button */
  color: red;
`;

const BackToDashboardButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  outline: none;
  background-color: ${(props) => (props.darkMode ? "#333" : "#007bff")}; /* Conditional background color */
  color: inherit;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #666; /* Hardcoded dark mode hover background color */
  }
`;


const NoResultIcon = styled(FaExclamationCircle)`
  color: red;
  font-size: 40px;
`;
