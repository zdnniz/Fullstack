import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const TeacherDetail = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get('email');

  const [teacher, setTeacher] = useState(null);

  useEffect(() => {
    if (email) {
      fetchTeacher(email);
    }
  }, [email]);

  const fetchTeacher = async (email) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/teachers/search`, {
        params: { email }
      });
      setTeacher(response.data.teacher);
    } catch (err) {
      console.error('Error fetching teacher detail:', err);
    }
  };

  if (!teacher) {
    return <div>Loading teacher details...</div>;
  }

  return (
    <div>
      <h2>Teacher Detail</h2>
      <p><strong>Name:</strong> {teacher.name}</p>
      <p><strong>Email:</strong> {teacher.email}</p>
      <p><strong>Subject:</strong> {teacher.subject}</p>
      {teacher.phone && <p><strong>Phone:</strong> {teacher.phone}</p>}
      {teacher.address && <p><strong>Address:</strong> {teacher.address}</p>}
    </div>
  );
};

export default TeacherDetail;
