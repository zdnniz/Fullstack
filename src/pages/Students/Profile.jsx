// ProfileSection.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import {
  ProfileContainer,
  SidebarContainer,
  Content,
  ProfileHeader,
  ProfileInfo,
  ProfileDetail,
  Label,
  Value,
} from '../../styles/SettingsProfileStyles';

const ProfileSection = () => {
  const [student, setStudent] = useState(null);

  useEffect(() => {
    fetchStudentProfile();
  }, []);

  const fetchStudentProfile = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/students/settings`,
        { withCredentials: true }
      );
      setStudent(response.data.student);
    } catch (err) {
      console.error("Failed to fetch student profile:", err.response?.data?.message || err.message);
    }
  };
  if (!student) return <p>Loading profile...</p>;

  return (
    <ProfileContainer>
      <SidebarContainer>
        <Sidebar />
      </SidebarContainer>
      <Content>
        <ProfileHeader>Profile</ProfileHeader>
        <ProfileInfo>
          <ProfileDetail>
            <Label>Name:</Label>
            <Value>{student.name}</Value>
          </ProfileDetail>
          <ProfileDetail>
            <Label>Age:</Label>
            <Value>{student.age}</Value>
          </ProfileDetail>
          <ProfileDetail>
            <Label>Grade:</Label>
            <Value>{student.grade}</Value>
          </ProfileDetail>
          <ProfileDetail>
            <Label>Email:</Label>
            <Value>{student.email}</Value>
          </ProfileDetail>
        </ProfileInfo>
      </Content>
    </ProfileContainer>
  );
};

export default ProfileSection;
