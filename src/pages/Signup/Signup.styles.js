import styled from "styled-components";
import waterBg from "../../assets/water5.jpg";

export const SignupContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 130%;
    background: url(${waterBg}) no-repeat center center/cover;
    filter: blur(1px); /* Adjust the blur intensity */
    z-index: -1;
  }
`;

export const SignupWrapper = styled.div`
  // background: #fff;
    background: rgba(255, 255, 255, 0.2); /* Semi-transparent white */
  backdrop-filter: blur(100px); /* Adds a blur effect for better readability */
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 350px;
  height: 450px;
`;

export const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
`;

export const SignupForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const Input = styled.input`
  padding: 12px;
  border: 1px solid ${({ error }) => (error ? "red" : "#ccc")};
  border-radius: 5px;
  font-size: 16px;
  width: 100%;
  box-sizing: border-box;
  outline: none;
  
  &:focus {
    border-color: ${({ error }) => (error ? "red" : "#0072ff")};
  }
`;

export const SignupButton = styled.button`
  background: ${({ disabled }) => (disabled ? "#ccc" : "#0072ff")};
  color: white;
  padding: 12px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  width: 100%;
  transition: 0.3s;
  box-sizing: border-box;
  margin-top: 10px;
  margin-bottom: 10px;

  &:hover {
    background: ${({ disabled }) => (disabled ? "#ccc" : "#0052d4")};
  }
`;

export const FooterText = styled.p`
  margin-top: 10px;
  font-size: 16px;
  color: #333;

  a {
    color: #0072ff;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const ErrorText = styled.p`
  color: red;
  font-size: 12px;
  margin: -5px 0 10px;
  text-align: left;
`;

export const Options = styled.div`
  display: flex;
  justify-content: start;
  font-size: 14px;
`;

export const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 5px;
`;

