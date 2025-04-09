import styled from "styled-components";

// Full screen height container with scroll support
export const ProfileContainer = styled.div`
  background-color: rgb(241, 217, 218);
  // overflow-y: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

export const FormWrapper = styled.div`
  background: #ffffff;
  border-radius: 25px;
  width: 90%;
  max-width: 600px;
  margin: 20px;
  padding: 20px;
  position: relative;
  box-shadow: 0px 10px 25px rgba(0, 0, 0, 0.1);
  // overflow-y: auto;

  .edit-button {
    display: flex;
    justify-content: flex-end;
  }

  @media (max-width: 768px) {
    padding: 15px;
  }

  @media (max-width: 480px) {
    width: 90%;
    padding: 10px;
    margin: 0px;
  }
`;

export const HeaderBackground = styled.div`
  background: linear-gradient(to right, #923cb5, #000000);
  height: 110px;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;

  @media (max-width: 480px) {
    height: 40px;
  }
`;

export const ProfileImageWrapper = styled.div`
  position: relative;
  top: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;

  @media (max-width: 480px) {
    top: 5px;
  }
`;

export const ProfileImage = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  border: 4px solid #ffffff9d;

  @media (max-width: 480px) {
    width: 50px;
    height: 50px;
  }
`;

export const EditIcon = styled.span`
  display: inline-block;
  width: 25%;
  justify-content: flex-end;    
  padding: 6px 12px;
  background-color: #007bff;
  color: white;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
  text-align: center;

  &:hover {
    background-color: #0056b3;
  }

  @media (max-width: 480px) {
    width: 25%;
    font-size: 12px;
    padding: 5px 12px;
  }
`;

export const Title = styled.h2`
  text-align: center;
  margin-top: 30px;
  margin-bottom: 5px;
  font-size: 20px;
  color: #333;

  @media (max-width: 480px) {
    font-size: 18px;
    margin-top: 10px;
  }
`;

export const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0;

  label {
    font-size: 14px;
    margin-bottom: 5px;
    color: #333;

    @media (max-width: 480px) {
      font-size: 12px;
    }
  }

  input,
  select {
    padding: 10px;
    border: 1.5px solid #ccc;
    border-radius: 8px;
    font-size: 14px;
    outline: none;
    transition: border 0.3s;

    &:focus {
      border-color: #0e5b9d;
    }

    @media (max-width: 480px) {
      font-size: 12px;
    }
  }
`;

export const SaveButton = styled.button`
  background-color: #0e5b7d;
  color: white;
  width: 100%;
  padding: 10px;
  margin-top: 20px;
  margin-bottom: 10px;
  font-weight: bold;
  border: none;
  border-radius: 25px;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  cursor: pointer;

  &:hover {
    background-color: #094478;
  }

  @media (max-width: 480px) {
    font-size: 14px;
    padding: 8px;
    margin-top: 15px;
    margin-bottom: 10px;
  }
`;
