// StudentSection.js
import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
  StudentsContainer, Content, StudentsContent, StudentsHeader, StudentList, StudentItem, AddStudentInput,
  AddStudentButton
} from '../../styles/StudentsStyles';

const StudentSection = () => {
  const [students, setStudents] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [searchedStudent, setSearchedStudent] = useState(null);
  const [editingStudent, setEditingStudent] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);  

  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);

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
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar}/>
      <Content isOpen={isSidebarOpen}>
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
            {searchedStudent.name} - {searchedStudent.age} - {searchedStudent.grade} - {searchedStudent.registerNumber}
            <br />
            <Link to={`/students/detail?name=${encodeURIComponent(searchedStudent.name)}`}>
              <AddStudentButton>View Details</AddStudentButton>
            </Link>
          </div>
        )}

        <StudentsContent>
          <StudentsHeader>Students</StudentsHeader>
          <StudentList>
            {students.map((student) => (
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
                     <input
                      type="text"
                      value={editingStudent.registerNumber}
                      onChange={(e) => setEditingStudent({ ...editingStudent, registerNumber: e.target.value })}
                    />
                    <AddStudentButton onClick={() => handleUpdate(student._id)}>Save</AddStudentButton>
                    <AddStudentButton onClick={() => setEditingStudent(null)}>Cancel</AddStudentButton>
                  </>
                ) : (
                  <>
                    {student.name} - {student.age} - {student.grade} - {student.registerNumber}
                    <span
                      style={{ marginLeft: '1rem', cursor: 'pointer' }}
                      onClick={() =>
                        setEditingStudent({
                          id: student._id,
                          name: student.name,
                          age: student.age,
                          grade: student.grade,
                          email: student.email,
                          registerNumber: student.registerNumber,
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

export default StudentSection;
