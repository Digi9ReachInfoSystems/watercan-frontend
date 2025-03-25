import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #007bff, #00c6ff);
`;

export const FormWrapper = styled.div`
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  width: 350px;
  text-align: center;
`;

export const Title = styled.h2`
  color: #333;
  margin-bottom: 1.5rem;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid ${({ error }) => (error ? "red" : "#ccc")};
  border-radius: 5px;
  font-size: 16px;
  box-sizing: border-box;

  &:focus {
    border-color: ${({ error }) => (error ? "red" : "#007bff")};
    outline: none;
  }
`;

export const Button = styled.button`
  width: 100%;
  padding: 10px;
  background: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: #0056b3;
  }
`;

export const SignupText = styled.p`
  margin-top: 15px;
  font-size: 14px;
  color: #333;
`;

export const ErrorText = styled.p`
  color: red;
  font-size: 12px;
  margin-top: -5px;
  margin-bottom: 10px;
  text-align: left;
`;
