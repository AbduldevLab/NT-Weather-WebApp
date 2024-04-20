import React from "react";
import styled from "styled-components";
import { FaExclamationCircle } from "react-icons/fa";

const Error404 = (props) => {
  const { setApierror, BackClick } = props;
  return (
    <Container>
      <MessageContainer>
        <IconContainer>
          <NoResultIcon />
        </IconContainer>
        <ErrorMessage>Location not found!</ErrorMessage>
        <BackToDashboardButton onClick={BackClick}>
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
  padding: 10px 20px; /* Adjust padding */
  font-size: 16px; /* Adjust font size */
  border: none;
  border-radius: 6px;
  outline: none;
  color: white;
  background-color: #007bff; /* Blue button color */
  cursor: pointer;
  transition: background-color 0.3s ease; /* Smooth transition */

  &:hover {
    background-color: #0056b3; /* Darker blue on hover */
  }
`;

const NoResultIcon = styled(FaExclamationCircle)`
  color: red;
  font-size: 40px;
`;
