import React from "react";
import animationGif from "../../../assets/Animation.gif"; // Adjust the path if needed
import { SuccessContainer, SuccessGif, SuccessHeading, SuccessMessage } from "./RegistrationSuccessfully.styles";

const RegistrationSuccessfully = () => {
  return (
    <SuccessContainer>
      <SuccessGif src={animationGif} alt="Success Animation" />
      <SuccessHeading>Request sent to admin</SuccessHeading>
      <SuccessMessage>We will notify you</SuccessMessage>
    </SuccessContainer>
  );
};

export default RegistrationSuccessfully;
