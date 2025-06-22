//StudentDetail.jsx
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const StudentDetail = () => {
  const location = useLocation();
  const [student, setStudent] = useState(null);

  const params = new URLSearchParams(location.search);
  const name = params.get('name');

  useEffect(() => {
    if (name) {
      axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/students/search?name=${name}`)
        .then(res => setStudent(res.data.student))
        .catch(err => console.error('Error fetching student:', err));
    }
  }, [name]);

  if (!student) return <p>Loading student...</p>;

  return (
    <div style={{ padding: '1rem' }}>
      <h1>{student.name}'s Details</h1>
      <p>Email: {student.email}</p>
      <p>Grade: {student.grade}</p>
      <p>Age: {student.age}</p> 
      <p>RegistrationNumber: {student.registrationNumber}</p> 
    </div>
  );
};

export default StudentDetail;
