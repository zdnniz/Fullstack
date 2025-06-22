// TeacherSignIn.js
import React, { useState } from 'react';
import axios from 'axios';
import { TeacherSignInContainer, FormContainer, InputField, SubmitButton } from '../styles/TeacherSignInStyles';

const TeacherSignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    console.log('Teacher Sign In:', { email, password });
    console.log("Submitting login with:", credentials);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/teachers/login`,
        { email, password },
        { withCredentials: true }
      );
      console.log("message:", res.data.message); 
    } catch (err) {
      console.error("Login failed", err.response?.data?.message || err.message);
    }
  };

  return (
    <TeacherSignInContainer>
      <h2>Teacher Sign In</h2>
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
        <SubmitButton to="/teacher/dashboard" onClick={handleSignIn}>Sign In</SubmitButton>
      </FormContainer>
    </TeacherSignInContainer>
  );
};

export default TeacherSignIn;
