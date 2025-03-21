import styled from "styled-components";

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 650px;
  margin: auto;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  font-family: Arial, sans-serif;
  margin-top: 5%;
`;

export const FormTitle = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  font-size: 1.5rem;
  color: #333;
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const InputField = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }
`;

export const SubmitButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 12px;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s ease;
  width: 100%;

  &:hover {
    background-color: #0056b3;
  }
`;

export const ErrorMessage = styled.p`
  color: red;
  font-size: 0.9rem;
  margin-top: -5px;
`;

export const Message = styled.p`
  text-align: center;
  font-size: 1rem;
  padding: 10px;
  border-radius: 5px;
  background-color: ${(props) => (props.success ? "#d4edda" : "#f8d7da")};
  color: ${(props) => (props.success ? "#155724" : "#721c24")};
`;

/* 🔹 DatePicker Styling */
export const DatePickerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  label {
    font-size: 1rem;
    color: #333;
    font-weight: bold;
  }

  .react-datepicker-wrapper {
    width: 100%;
  }

  .react-datepicker__input-container input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 1rem;
    box-sizing: border-box;
  }
`;
