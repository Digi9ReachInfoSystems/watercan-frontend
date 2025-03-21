import styled from "styled-components";

export const SignupContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(to right, #00c6ff, #0072ff);
`;

export const SignupWrapper = styled.div`
  background: #fff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 350px;
`;

export const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

export const SignupForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const Input = styled.input`
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  width: 100%;
  box-sizing: border-box;
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

export const SignupButton = styled.button`
  background: #0072ff;
  color: white;
  padding: 12px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  width: 100%;
  transition: 0.3s;
  box-sizing: border-box;

  &:hover {
    background: #0052d4;
  }
`;

export const FooterText = styled.p`
  margin-top: 10px;
  font-size: 14px;

  a {
    color: #0072ff;
    text-decoration: none;
  }
`;

export const ErrorText = styled.p`
  color: red;
  font-size: 12px;
  margin: -10px 0 10px;
`;
