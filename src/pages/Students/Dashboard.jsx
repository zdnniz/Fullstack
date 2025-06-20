// StudentDashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import { StudentDashboardContainer, Content, Section, SectionTitle, CardContainer, Card, CardTitle, CardContent }
  from '../../styles/DashboardStyles';
import MapWithDirections from '../../components/MapWithDirections'

const StudentDashboard = () => {
  const [assignmentCount, setAssignmentCount] = useState(0);

  useEffect(() => {
    fetchCounts();
  }, []);

  const fetchCounts = async () => {
    try {
      const assignmentRes = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/assignments/count`);
      setAssignmentCount(assignmentRes.data.count);

    } catch (err) {
      console.error("Error fetching counts:", err);
    }
  };

  return (
    <StudentDashboardContainer>
      <Sidebar />
      <Content>
        <Section>
          <SectionTitle>Overview</SectionTitle>
          <CardContainer>
            <Card>
              <CardTitle>Assignments</CardTitle>
              <CardContent>{assignmentCount}</CardContent>
            </Card>
          </CardContainer>
        </Section>

        <Section>
          <SectionTitle>Route Planner</SectionTitle>
          <MapWithDirections />
        </Section>

      </Content>
    </StudentDashboardContainer>
  );
};

export default StudentDashboard;
