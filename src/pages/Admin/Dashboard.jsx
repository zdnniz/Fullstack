// AdminDashboard.js
import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Announcement from './Announcement';
import axios from 'axios';
import {
  AdminDashboardContainer,
  Content,
  Section,
  SectionTitle,
  CardContainer,
  Card,
  CardTitle,
  CardContent,
} from '../../styles/DashboardStyles';
import MapWithDirections from '../../components/MapWithDirections'

const AdminDashboard = () => {
  const [teacherCount, setTeacherCount] = useState(0);
  const [studentCount, setStudentCount] = useState(0);
  const [isOpen, setIsOpen] = useState(true);
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    fetchAnnouncements();
    fetchCounts();
  }, []);

  const fetchCounts = async () => {
    try {
      const teacherRes = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/teachers/count`);
      const studentRes = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/students/count`);

      setTeacherCount(teacherRes.data.count);
      setStudentCount(studentRes.data.count);
    } catch (err) {
      console.error("Error fetching counts:", err);
    }
  };

  const fetchAnnouncements = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/announcements/getall`);
      setAnnouncements(response.data.announcements || []);
    } catch (error) {
      console.error('Error fetching announcements:', error);
    }
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <AdminDashboardContainer>
      <Sidebar isOpen={true} toggleSidebar={toggleSidebar} />
      <Content isOpen={true}>
          <Section>
            <SectionTitle>Overview</SectionTitle>
            <CardContainer>
              <Card>
                <CardTitle>Total Students</CardTitle>
                <CardContent>{studentCount}</CardContent>
              </Card>
              <Card>
                <CardTitle>Total Teachers</CardTitle>
                <CardContent>{teacherCount}</CardContent>
              </Card>
            </CardContainer>
          </Section>

        <Section>
          <SectionTitle>Route Planner</SectionTitle>
          <MapWithDirections />
        </Section>
        
          <Announcement announcements={announcements} />
      </Content>
    </AdminDashboardContainer>
  );
};

export default AdminDashboard;
