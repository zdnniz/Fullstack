// StudentSignIn.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { StudentSignInContainer, FormContainer, InputField, SubmitButton } from '../styles/StudentSignInStyles';

const StudentSignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/students/login`,
        { email, password },
        { withCredentials: true } 
      );
      console.log("Login successful:", res.data.message);
      navigate('/student/dashboard');
    } catch (err) {
      console.error("Login failed:", err.response?.data?.message || err.message);
    }
  };

  return (
    <StudentSignInContainer>
      <h2>Student Sign In</h2>
      <FormContainer>
        <InputField
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <InputField
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /> 
        <SubmitButton onClick={handleSignIn}>Sign In</SubmitButton>
      </FormContainer>
    </StudentSignInContainer>
  );
};

export default StudentSignIn;
