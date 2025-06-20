import React, { useState } from 'react';
import { AdminSignInContainer, FormContainer, InputField, SubmitButton } from '../styles/AdminSignInStyles';
import axios from 'axios';

const AdminSignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    console.log('admin Sign In:', { email, password });
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/users/signin`, { email, password }, {withCredentials:true}); 
      if (response.status === 200) {
        // Sign-in successful, redirect to admin dashboard
        window.location.href = '/admin/dashboard';
      } else {
        // Handle sign-in errors
        console.error('Sign-in failed');
      }
    } catch (error) {
      console.error('Error during sign-in:', error);
    }
  };

  return (
    <AdminSignInContainer>
      <h2>Admin Sign In</h2>
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
    </AdminSignInContainer>
  );
};

export default AdminSignIn;
