// Students.js
import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';
import {
  StudentsContainer,
  Content,
  StudentsContent,
  StudentsHeader,
  StudentList,
  StudentItem,
  AddStudentForm,
  AddStudentInput,
  AddStudentButton,
} from '../../styles/StudentsStyles';

const Students = () => {
  const [newStudent, setNewStudent] = useState({ name: '', age: '', grade: '', email: '' });
  const [students, setStudents] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [searchedStudent, setSearchedStudent] = useState(null);
  const [editingStudent, setEditingStudent] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/students/getall`);
      setStudents(response.data.students);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleAddStudent = async (e) => {
    e.preventDefault();
    if (newStudent.name.trim() !== '' && newStudent.age.trim() !== '' && newStudent.grade.trim() !== '' && newStudent.email.trim() !== '') {
      try {
        const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/students`, newStudent);
        setStudents([...students, response.data.student]);
        setNewStudent({ name: '', age: '', grade: '', email: '' });
      } catch (error) {
        console.error('Error adding student:', error);
      }
    }
  };

  const handleSearch = async () => {
    if (!searchName.trim()) return;

    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/students/search`, {
        params: { name: searchName },
      });
      setSearchedStudent(response.data.student);
    } catch (error) {
      console.error('Error searching student:', error);
      setSearchedStudent(null);
    }
  };

  const handleUpdate = async (id) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/v1/students/update/${id}`, editingStudent);
      setEditingStudent(null);
      fetchStudents();
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/v1/students/delete/${id}`);
      fetchStudents();
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  return (
    <StudentsContainer>
      <Sidebar />
      <Content>
        <div style={{ marginBottom: '1rem' }}>
          <AddStudentInput
            type="text"
            placeholder="Search by name"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
          <AddStudentButton onClick={handleSearch}>Search</AddStudentButton>
        </div>
        {searchedStudent && (
          <div style={{ marginBottom: '1rem' }}>
            <strong>Search Result:</strong> <br />
            {searchedStudent.name} - {searchedStudent.age} - {searchedStudent.grade}
          </div>
        )}

        <StudentsContent>
          <StudentsHeader>Students</StudentsHeader>
          <AddStudentForm onSubmit={handleAddStudent}>
            <AddStudentInput
              type="text"
              placeholder="Enter student name"
              value={newStudent.name}
              onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
            />
            <AddStudentInput
              type="text"
              placeholder="Enter age"
              value={newStudent.age}
              onChange={(e) => setNewStudent({ ...newStudent, age: e.target.value })}
            />
            <AddStudentInput
              type="text"
              placeholder="Enter grade"
              value={newStudent.grade}
              onChange={(e) => setNewStudent({ ...newStudent, grade: e.target.value })}
            />
            <AddStudentInput
              type="text"
              placeholder="Enter email"
              value={newStudent.email}
              onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
            />
            <AddStudentButton type="submit">Add Student</AddStudentButton>
          </AddStudentForm>
          <StudentList>
            {students.filter(Boolean).map((student) => (
              <StudentItem key={student._id}>
                {editingStudent?.id === student._id ? (
                  <>
                    <input
                      type="text"
                      value={editingStudent.name}
                      onChange={(e) => setEditingStudent({ ...editingStudent, name: e.target.value })}
                    />
                    <input
                      type="number"
                      value={editingStudent.age}
                      onChange={(e) => setEditingStudent({ ...editingStudent, age: e.target.value })}
                    />
                    <input
                      type="text"
                      value={editingStudent.grade}
                      onChange={(e) => setEditingStudent({ ...editingStudent, grade: e.target.value })}
                    />
                    <AddStudentButton onClick={() => handleUpdate(student._id)}>Save</AddStudentButton>
                    <AddStudentButton onClick={() => setEditingStudent(null)}>Cancel</AddStudentButton>
                  </>
                ) : (
                  <>
                    {student.name} - {student.age} - {student.grade}
                    <span
                      style={{ marginLeft: '1rem', cursor: 'pointer' }}
                      onClick={() =>
                        setEditingStudent({
                          id: student._id,
                          name: student.name,
                          age: student.age,
                          grade: student.grade,
                          email: student.email,
                        })
                      }
                    >
                      ✏️
                    </span>
                    <span
                      style={{ marginLeft: '0.5rem', cursor: 'pointer', color: 'red' }}
                      onClick={() => handleDelete(student._id)}
                    >
                      🗑️
                    </span>
                  </>
                )}
              </StudentItem>
            ))}

          </StudentList>
        </StudentsContent>
      </Content>
    </StudentsContainer>
  );
};

export default Students;
