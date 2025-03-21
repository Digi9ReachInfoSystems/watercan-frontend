import React, { useState } from "react";
import { auth } from "../../config/firebaseConfig"; 
import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from "firebase/auth"; 
import {
  SignupContainer,
  SignupWrapper,
  Title,
  SignupForm,
  Input,
  SignupButton,
  FooterText,
  ErrorText,
} from "./Signup.styles";
import { createUser } from "../../api/userApi";

const Signup = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    let tempErrors = {};

    if (!name.trim()) tempErrors.name = "Name is required";
    if (!email.trim()) tempErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) tempErrors.email = "Enter a valid email";
    if (!phone) tempErrors.phone = "Phone number is required";
    else if (!/^\d{10}$/.test(phone)) tempErrors.phone = "Enter a valid 10-digit phone number";
    if (!password) tempErrors.password = "Password is required";
    else if (password.length < 6) tempErrors.password = "Password must be at least 6 characters";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
  
    setLoading(true);
    try {
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);
      if (signInMethods.length > 0) {
        setErrors((prev) => ({ ...prev, firebase: "Email already registered. Please log in." }));
        setLoading(false);
        return;
      }
  
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("User signed up:", userCredential.user);
  
      const userData = {
        name,
        email,
        role: "vendor", // Change based on selected role
        phoneNumber: phone,
        user_id: userCredential.user.uid, // Ensure `user_id` is always sent
      };
  
      await createUser(userData);
      alert("Signup successful!");
    } catch (error) {
      console.error("Firebase error:", error.message);
      setErrors((prev) => ({ ...prev, firebase: error.message }));
    }
    setLoading(false);
  };
  

  return (
    <SignupContainer>
      <SignupWrapper>
        <Title>Signup</Title>
        <SignupForm onSubmit={handleSubmit}>
          <Input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
          {errors.name && <ErrorText>{errors.name}</ErrorText>}

          <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          {errors.email && <ErrorText>{errors.email}</ErrorText>}

          <Input type="text" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
          {errors.phone && <ErrorText>{errors.phone}</ErrorText>}

          <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          {errors.password && <ErrorText>{errors.password}</ErrorText>}

          {errors.firebase && <ErrorText>{errors.firebase}</ErrorText>}

          <SignupButton type="submit" disabled={loading}>
            {loading ? "Signing Up..." : "Sign Up"}
          </SignupButton>
        </SignupForm>
        <FooterText>
          Already have an account? <a href="#">Login</a>
        </FooterText>
      </SignupWrapper>
    </SignupContainer>
  );
};

export default Signup;
