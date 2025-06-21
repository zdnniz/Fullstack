// Home.js
import React from 'react';
import { Navbar, Logo, NavigationLinks, NavLink, ButtonsContainer, LoginButton, HomeContainer, SchoolInfo, SchoolImage, Title, LoremTextContainer, GuestButton } 
from '../styles/styles'
import bg from "../assets/bg.png";
import bg1 from "../assets/bg1.png";
import { useNavigate } from 'react-router-dom'; 

const Home = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/choose-user');
  };

  const handleAdminRegister = () => {
    navigate('/admin-register');
  }

  return (
    <>
      <Navbar>
        <Logo src={bg1} alt="Logo" />
        <NavigationLinks>
          <NavLink href="#">About Us</NavLink>
          <NavLink href="#">Products</NavLink>
          <NavLink href="#">Contact Us</NavLink>
        </NavigationLinks>
        <ButtonsContainer>
          <LoginButton onClick={handleLoginClick}>Sign In</LoginButton>
          <GuestButton onClick={handleAdminRegister}>Admin Register</GuestButton>
        </ButtonsContainer>
      </Navbar>
      <HomeContainer>
        <SchoolInfo>
          <Title>School Management System</Title>
          <LoremTextContainer>
            <p>Team : SMS</p>
            <p>Member : Yanbo Cheng </p>
            <p>Frontend : <a href='https://github.com/zdnniz/Fullstack/tree/main' target='_blank'>Frontend Repo</a> </p>
            <p>Backend : <a href='https://github.com/zdnniz/Fullstack-backend' target='_blank'>Backend Repo</a></p>
          </LoremTextContainer>
        </SchoolInfo>
        <SchoolImage src={bg} alt="pupils" />
      </HomeContainer>
    </>
  );
};

export default Home;
