import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../src/components/Home.jsx';
import ChooseUser from '../src/components/ChooseUser';
import AdminSignIn from '../src/components/AdminSignIn';
import StudentSignIn from '../src/components/StudentSignIn';
import TeacherSignIn from '../src/components/TeacherSignIn';
import AdminDashboard from '../src/pages/Admin/Dashboard';
import StudentDashboard from '../src/pages/Students/Dashboard';
import TeacherDashboard from '../src/pages/Teachers/Dashboard';
import AdminRegister from './components/AdminRegister.jsx';

import Teachers from '../src/pages/Admin/Teachers';
import Students from '../src/pages/Admin/Students';
import Assignments from '../src/pages/Admin/Assignments';
import SettingsProfile from '../src/pages/Admin/SettingsProfile';
import Announcement from '../src/pages/Admin/Announcement';

import StudentAssignments from '../src/pages/Students/Assignments';
import AnnouncementSection from '../src/pages/Students/Announcement';
import ProfileSection from '../src/pages/Students/Profile';
import StudentDetail from'./pages/Teachers/StudentDetail.jsx';

import StudentSection from '../src/pages/Teachers/Students';
import TeacherSection from '../src/pages/Teachers/Teachers';
import TeacherProfileSection from '../src/pages/Teachers/Profile';
import CheckAnnouncementSection from '../src/pages/Teachers/Announcement';
import AssignmentSection from '../src/pages/Teachers/Assignments';
import TeacherDetail from '../src/pages/Teachers/TeacherDetail';

const App = () => { 
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/choose-user" element={<ChooseUser />} />
        <Route path="/admin-register" element={<AdminRegister />} />

        {/* All the sign-in pages/routes */}

        <Route exact path="/admin-signIn" element={<AdminSignIn />} />
        <Route exact path="/student-signIn" element={<StudentSignIn />} />
        <Route exact path="/teacher-signIn" element={<TeacherSignIn />} />

        {/* All the dashboard routes */}

        <Route exact path="/admin/dashboard" element={<AdminDashboard />} />
        <Route exact path="/teacher/dashboard" element={<TeacherDashboard />} />        
        <Route exact path="/student/dashboard" element={<StudentDashboard />} />

        {/* Admin section here */}

        <Route exact path="/admin/teachers" element={<Teachers />} />
        <Route exact path="/admin/students" element={<Students />} />
        <Route exact path="/admin/assignments" element={<Assignments />} />
        <Route exact path="/admin/communication" element={<Announcement />} />
        <Route exact path="/admin/settings" element={<SettingsProfile />} />

        {/* Students sections here  */}

        <Route exact path="/student/assignments" element={<StudentAssignments />} />
        <Route path="/students/detail" element={<StudentDetail />} />
        <Route exact path="/student/communication" element={<AnnouncementSection/>} />
        <Route exact path="/student/settings" element={<ProfileSection />} />

        {/* Teachers sections here */}
        <Route exact path="/teacher/students" element={<StudentSection />} />
        <Route exact path="/teacher/teachers" element={<TeacherSection />} />
        <Route exact path="/teacher/assignments" element={<AssignmentSection />} />
        <Route exact path="/teacher/communication" element={<CheckAnnouncementSection />} />
        <Route exact path="/teacher/settings" element={<TeacherProfileSection/>} />
        <Route path="/teachers/detail" element={<TeacherDetail />} />

      </Routes>
    </Router>
  );
};

export default App;



