import React, { useState } from "react";
import { 
  Container, FormWrapper, Title, Input, Button, CheckboxWrapper, CheckboxLabel, 
  ForgotPassword, StyledCheckbox, SignupText, SignupLink 
} from "./Login.styles";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Logging in:", { email, password });
  };

  return (
    <Container>
      <FormWrapper>
        <Title> Login</Title>
        <form onSubmit={handleLogin}>
          <Input 
            type="email" 
            placeholder="Enter Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input 
            type="password" 
            placeholder="Enter Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <CheckboxWrapper>
            <label>
              <StyledCheckbox type="checkbox" />
              <CheckboxLabel>Remember Me</CheckboxLabel>
            </label>
            <ForgotPassword href="#">Forgot Password?</ForgotPassword>
          </CheckboxWrapper>
          <Button type="submit">Sign In</Button>
        </form>
        <SignupText>
          Don't have an account? <SignupLink href="#">Sign Up</SignupLink>
        </SignupText>
      </FormWrapper>
    </Container>
  );
};

export default Login;
