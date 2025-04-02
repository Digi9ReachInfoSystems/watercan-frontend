import React, { useState } from "react";
import { 
  Container, FormWrapper, Title, Input, Button, CheckboxWrapper, 
  ForgotPassword, SignupText, ErrorText, PasswordWrapper, EyeIcon
} from "./Login.styles";
import { auth } from "../../config/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { loginUser } from "../../api/userApi";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { VscEye , VscEyeClosed } from "react-icons/vsc";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const validateEmail = (value) => {
    if (!value) return "Email is required!";
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(value)) return "Invalid email format!";
    return "";
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validatePassword = (value) => {
    if (!value) return "Password is required!";
    
    const minLength = 6;
    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
  
    if (value.length < minLength) return "Password must be at least 6 characters!";
    if (!hasUpperCase) return "Password must contain at least one uppercase letter!";
    if (!hasLowerCase) return "Password must contain at least one lowercase letter!";
    if (!hasNumber) return "Password must contain at least one number!";
    if (!hasSpecialChar) return "Password must contain at least one special character!";
  
    return "";
  };  

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setErrors({ ...errors, email: validateEmail(e.target.value) });
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setErrors({ ...errors, password: validatePassword(e.target.value) });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
  
    if (errors.email || errors.password || !email || !password) {
      toast.error("Please fix validation errors before submitting!");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      const user = userCredential.user;
      console.log("User signed in:", user);

      const userData = await loginUser(user.uid);

      if (userData.data?.role === "admin") {
        navigate("/admin");
      } else if (userData.data?.role === "vendor") {
        navigate("/vendor");
      } else {
        toast.error("Login failed! Role not recognized.");
      }
      toast.success("Login successful!");
    } catch (error) {
      toast.error(error.message);
      console.error("Firebase error:", error.message);
    }

    setEmail("");
    setPassword("");
  };

  return (
    <Container>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      
      <FormWrapper>
        <Title>Login</Title>
        <form onSubmit={handleLogin}>
          <Input 
            type="email" 
            placeholder="Enter Email" 
            value={email} 
            onChange={handleEmailChange}
            error={errors.email}
            required
          />
          {errors.email && <ErrorText>{errors.email}</ErrorText>}

          <PasswordWrapper>
            <Input 
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password" 
              value={password} 
              onChange={handlePasswordChange}
              error={errors.password}
              required
            />
            <EyeIcon onClick={togglePasswordVisibility}>
              {showPassword ? <VscEye /> : <VscEyeClosed />}
            </EyeIcon>
          </PasswordWrapper>
          
          {errors.password && <ErrorText>{errors.password}</ErrorText>}

          <CheckboxWrapper>
            <ForgotPassword ><Link to="/forgot-password" style= {{textDecoration: "none"}}>Forgot Password</Link> </ForgotPassword>
          </CheckboxWrapper>
          
          <Button type="submit">Log In</Button>
        </form>

        <SignupText>
          Don't have an account? <Link to="/signup" className="signuplink">Sign Up</Link>
        </SignupText>
      </FormWrapper>
    </Container>
  );
};

export default Login;
