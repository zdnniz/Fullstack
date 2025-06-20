// SettingsProfile.js
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import {
  ProfileContainer,
  SidebarContainer,
  Content,
  ProfileHeader,
  ProfileDetails,
  ProfileLabel,
  ProfileInfo,
} from '../../styles/SettingsProfileStyles'; 

const SettingsProfile = () => {
  const [teacherInfo, setTeacherInfo] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetchTeacherProfile();
  }, []);

  const fetchTeacherProfile = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/users/admin/settings`, { withCredentials: true });
      setTeacherInfo(response.data.teacher);
      setFormData(response.data.teacher);
    } catch (error) {
      console.error('Error fetching teacher profile:', error);
    }
  };

  const handleInputChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  if (!teacherInfo) return <div>Loading...</div>;

  return (
    <ProfileContainer>
      <SidebarContainer>
        <Sidebar />
      </SidebarContainer>
      <Content>
        <ProfileHeader>Profile Details</ProfileHeader>
        <ProfileDetails>
          {["name", "email", "phone", "address", "subject"].map((field) => (
            <React.Fragment key={field}>
              <ProfileLabel>{field.charAt(0).toUpperCase() + field.slice(1)}:</ProfileLabel>
              {isEditing ? (
                <ProfileInput
                  type="text"
                  value={formData[field]}
                  onChange={handleInputChange(field)}
                />
              ) : (
                <ProfileInfo>{teacherInfo[field]}</ProfileInfo>
              )}
            </React.Fragment>
          ))}
        </ProfileDetails>

      </Content>
    </ProfileContainer>
  );
};

export default SettingsProfile;
