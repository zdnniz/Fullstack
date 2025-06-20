// AssignmentSection.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import {
  AssignmentsContainer, Content, AssignmentsContent, AssignmentsHeader, AssignmentList, AssignmentItem, AddAssignmentForm,
  AddAssignmentInput, AddAssignmentTextArea, AddAssignmentButton
} from '../../styles/AssignmentsStyles';

const AssignmentSection = () => {
  const [assignments, setAssignments] = useState([]);
  const [currentTeacher, setCurrentTeacher] = useState(null);
  const [newAssignment, setNewAssignment] = useState({
    title: '',
    description: '',
    grade: '',
    deadline: '',
    studentNames: ''
  });

  useEffect(() => {
    fetchCurrentTeacher();
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/assignments/getall`);
      console.log(response.data.assignments);
      setAssignments(response.data.assignments);
    } catch (error) {
      console.error('Error fetching assignments:', error);
    }
  };

  const handleAddAssignment = async (e) => {
    e.preventDefault();

    if (
      newAssignment.title.trim() !== '' &&
      newAssignment.description.trim() !== '' &&
      newAssignment.grade.trim() !== '' &&
      newAssignment.deadline.trim() !== '' &&
      currentTeacher
    ) {
      try {
        const payload = {
          title: newAssignment.title.trim(),
          description: newAssignment.description.trim(),
          grade: newAssignment.grade.trim(),
          deadline: newAssignment.deadline.trim(),
          teacher: currentTeacher.email,
          students: newAssignment.studentNames
            ? newAssignment.studentNames.split(',').map((s) => s.trim()).filter(Boolean)
            : []
        };
        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/api/v1/assignments/`,
          payload,
          { headers: { "Content-Type": "application/json" }, withCredentials: true }
        );

        setAssignments([...assignments, response.data.assignment]);
        setNewAssignment({ title: '', description: '', grade: '', deadline: '', students: [] });
      } catch (error) {
        console.error('Error adding assignment:', error);
      }
    } else {
      alert('Please fill in all fields and ensure you are logged in as a teacher.');
    }
  };


  const fetchCurrentTeacher = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/teachers/settings`,
        { withCredentials: true }
      );
      setCurrentTeacher(response.data.teacher);
    } catch (error) {
      console.error('Error fetching current teacher:', error);
    }
  };

  return (
    <AssignmentsContainer>
      <Sidebar />
      <Content>
        <AssignmentsContent>
          <AssignmentsHeader>Assignments</AssignmentsHeader>
          <AddAssignmentForm onSubmit={handleAddAssignment}>
            <AddAssignmentInput
              type="text"
              placeholder="Enter assignment title"
              value={newAssignment.title}
              onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })}
            />
            <AddAssignmentTextArea
              placeholder="Enter assignment description"
              value={newAssignment.description}
              onChange={(e) => setNewAssignment({ ...newAssignment, description: e.target.value })}
            />
            <AddAssignmentInput
              type="text"
              placeholder="Enter assignment grade"
              value={newAssignment.grade}
              onChange={(e) => setNewAssignment({ ...newAssignment, grade: e.target.value })}
            />
            <AddAssignmentInput
              type="text"
              placeholder="Enter assignment deadline"
              value={newAssignment.deadline}
              onChange={(e) => setNewAssignment({ ...newAssignment, deadline: e.target.value })}
            />
            <AddAssignmentInput
              type="text"
              placeholder="Enter students' names comma-separated"
              value={newAssignment.studentNames}
              onChange={(e) => setNewAssignment({ ...newAssignment, studentNames: e.target.value })}
            />
            <AddAssignmentButton type="submit">Add Assignment</AddAssignmentButton>
          </AddAssignmentForm>
          <AssignmentList>
            {assignments.map((assignment) => (
              assignment && assignment._id ? (
                <AssignmentItem key={assignment._id}>
                  <strong>{assignment.title}: </strong> {assignment.description}, {assignment.grade}, {new Date(assignment.deadline).toLocaleDateString()}
                  <br />
                  <em>Teacher: {assignment.teacher}</em>
                  <br />
                  <em>Students: {assignment.students && assignment.students.join(', ')}</em>
                </AssignmentItem>

              ) : null
            ))}
          </AssignmentList>
        </AssignmentsContent>
      </Content>
    </AssignmentsContainer>
  );
};

export default AssignmentSection;
