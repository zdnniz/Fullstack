// TeacherDashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import { TeacherDashboardContainer, Content, Section, SectionTitle, CardContainer, Card, CardTitle, CardContent }
  from '../../styles/DashboardStyles';
import MapWithDirections from '../../components/MapWithDirections'

const TeacherDashboard = () => {
  const [teacherCount, setTeacherCount] = useState(0);
  const [studentCount, setStudentCount] = useState(0);

  useEffect(() => {
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

  return (
    <TeacherDashboardContainer>
      <Sidebar />
      <Content>
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

      </Content>
    </TeacherDashboardContainer>
  );
};

export default TeacherDashboard;
