import React, { useState } from "react";
import {
  SignupContainer,
  SignupWrapper,
  Title,
  SignupForm,
  Input,
  Options,
  CheckboxLabel,
  SignupButton,
  FooterText,
  ErrorText,
} from "./Signup.styles";

const Signup = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    let tempErrors = {};
    
    if (!name.trim()) tempErrors.name = "Name is required";

    if (!phone) tempErrors.phone = "Phone number is required";
    else if (!/^\d{10}$/.test(phone))
      tempErrors.phone = "Enter a valid 10-digit phone number";

    if (!password) tempErrors.password = "Password is required";
    else if (password.length < 6)
      tempErrors.password = "Password must be at least 6 characters";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert("Signup successful!");
    }
  };

  return (
    <SignupContainer>
      <SignupWrapper>
        <Title>Signup</Title>
        <SignupForm onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <ErrorText>{errors.name}</ErrorText>}

          <Input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          {errors.phone && <ErrorText>{errors.phone}</ErrorText>}

          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <ErrorText>{errors.password}</ErrorText>}

          <Options>
            <CheckboxLabel>
              <input type="checkbox" /> Remember Me
            </CheckboxLabel>
          </Options>

          <SignupButton type="submit">Sign Up</SignupButton>
        </SignupForm>
        <FooterText>
          Already have an account? <a href="#">Login</a>
        </FooterText>
      </SignupWrapper>
    </SignupContainer>
  );
};

export default Signup;
