import React, { useState } from 'react';
import { AdminRegisterContainer, FormContainer, InputField, SubmitButton } from '../styles/AdminRegisterStyles';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';

const AdminRegister = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault(); 
  
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/register/admin`, { email, password }); 
      if (response.status === 200) {
        navigate('/admin-signIn');
      } else {
        // Handle registration errors
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };
   

  return (
    <AdminRegisterContainer>
      <h2>Admin Register</h2>
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
        <SubmitButton onClick={(e) => handleRegister(e)}>Register</SubmitButton>

      </FormContainer>
    </AdminRegisterContainer>
  );
};

export default AdminRegister;
