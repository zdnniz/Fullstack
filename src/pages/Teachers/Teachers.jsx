// TeacherSection.js
import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';
import {
  TeachersContainer, Content, TeachersContent, TeachersHeader, TeacherList, TeacherItem, AddTeacherInput,
  AddTeacherButton
} from '../../styles/TeachersStyles';

const TeacherSection = () => {
  const [editingTeacher, setEditingTeacher] = useState(null);
  const [teachers, setTeachers] = useState([]);
  const [searchEmail, setSearchEmail] = useState('');
  const [searchedTeacher, setSearchedTeacher] = useState(null);


  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/teachers/getall`);
      setTeachers(response.data.teachers);
    } catch (error) {
      console.error('Error fetching teachers:', error);
    }
  };

  const handleSearch = async () => {
    if (!searchEmail.trim()) return;

    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/teachers/search`, {
        params: { email: searchEmail },
      });
      setSearchedTeacher(response.data.teacher);
    } catch (error) {
      console.error('Error searching teacher:', error);
      setSearchedTeacher(null);
    }
  };

  const handleUpdate = async (id) => {
    try {
      const response = await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/v1/teachers/${id}`, editingTeacher);
      console.log("Updated:", response.data);
      setEditingTeacher(null);
      fetchTeachers(); 
    } catch (error) {
      console.error("Error updating teacher:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this teacher?")) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/v1/teachers/${id}`);
      fetchTeachers();
    } catch (error) {
      console.error("Error deleting teacher:", error);
    }
  };

  return (
    <TeachersContainer>
      <Sidebar />
      <Content>
        <div style={{ marginBottom: '1rem' }}>
          <AddTeacherInput
            type="text"
            placeholder="Search by email"
            value={searchEmail}
            onChange={(e) => setSearchEmail(e.target.value)}
          />
          <AddTeacherButton onClick={handleSearch}>Search</AddTeacherButton>
        </div>
        {searchedTeacher && (
          <div style={{ marginBottom: '1rem' }}>
            <strong>Search Result:</strong> <br />
            {searchedTeacher.name} - {searchedTeacher.email} - {searchedTeacher.subject}
          </div>
        )}

        <TeachersContent>
          <TeachersHeader>Teachers</TeachersHeader>
          <TeacherList>
            {teachers.map((teacher) => (
              <TeacherItem key={teacher._id}>
                {editingTeacher?.id === teacher._id ? (
                  <>
                    <input
                      type="text"
                      value={editingTeacher.name}
                      onChange={(e) => setEditingTeacher({ ...editingTeacher, name: e.target.value })}
                    />
                    <input
                      type="text"
                      value={editingTeacher.email}
                      onChange={(e) => setEditingTeacher({ ...editingTeacher, email: e.target.value })}
                    />
                    <input
                      type="text"
                      value={editingTeacher.subject}
                      onChange={(e) => setEditingTeacher({ ...editingTeacher, subject: e.target.value })}
                    />
                    //<AddTeacherButton onClick={() => handleUpdate(teacher._id)}>Save</AddTeacherButton>
                    <AddTeacherButton onClick={() => setEditingTeacher(null)}>Cancel</AddTeacherButton>
                  </>
                ) : (
                  <>
                    {teacher.name} - {teacher.email} - {teacher.subject}
                    <span
                      style={{ marginLeft: '0.5rem', cursor: 'pointer', color: 'red' }}
                      onClick={() => handleDelete(teacher._id)}
                    >
                      🗑️
                    </span>
                  </>
                )}
              </TeacherItem>
            ))}
          </TeacherList>

        </TeachersContent>
      </Content>
    </TeachersContainer>
  );
};

export default TeacherSection;
