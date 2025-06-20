import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';
import {
  AssignmentsContainer,
  SidebarContainer,
  Content,
  AssignmentCard,
  AssignmentTitle,
  AssignmentDescription,
  AssignmentButton,
} from '../../styles/AssignmentsStyles';

const StudentAssignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [studentInfo, setStudentInfo] = useState(null);

  useEffect(() => {
    fetchLoggedInStudent();
  }, []);

  const fetchAssignments = async (studentName) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/assignments/getall`,
        { withCredentials: true } 
      );

      const allAssignments = response.data.assignments || [];
      const filtered = allAssignments.filter(
        (assignment) =>
          Array.isArray(assignment.students) &&
          assignment.students.includes(studentName)
      );

      setAssignments(filtered);
    } catch (error) {
      console.error('Error fetching assignments:', error);
    }
  };

  const fetchLoggedInStudent = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/students/settings`,
        { withCredentials: true } 
      );

      const student = response.data.student;
      setStudentInfo(student);           
      fetchAssignments(student.name);   
    } catch (error) {
      console.error('Error fetching logged-in student:', error);
    }
  };

  return (
    <AssignmentsContainer>
      <SidebarContainer>
        <Sidebar />
      </SidebarContainer>
      <Content isOpen={true}>
        <h1>Your Assignments</h1>
        {assignments.length === 0 ? (
          <p>No assignments assigned to you yet.</p>
        ) : (
          assignments.map((assignment) => (
            <AssignmentCard key={assignment._id}>
              <AssignmentTitle>{assignment.title}</AssignmentTitle>
              <AssignmentDescription>{assignment.description}</AssignmentDescription>
              <AssignmentForm assignmentId={assignment._id} />
            </AssignmentCard>
          ))
        )}
      </Content>
    </AssignmentsContainer>
  );
};

const AssignmentForm = ({ assignmentId }) => {
  const [answer, setAnswer] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: POST 到 /submit-assignment
    console.log('submit assignment', assignmentId, answer);
  };
  return (
    <form onSubmit={handleSubmit}>
      <textarea
        placeholder="Answer it here."
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />
      <AssignmentButton type="submit">Submit</AssignmentButton>
    </form>
  );
};


export default StudentAssignments;
