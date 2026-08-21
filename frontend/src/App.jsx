import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import DashboardLayout from './layouts/DashboardLayout';
import Login from './pages/Login';
import ChangePassword from './pages/ChangePassword';
import Dashboard from './pages/Dashboard';
import StudentList from './pages/StudentList';
import StudentProfile from './pages/StudentProfile';
import TeacherList from './pages/TeacherList';
import AcademicList from './pages/AcademicList';
import AttendanceManager from './pages/AttendanceManager';
import TimetableManager from './pages/TimetableManager';
import ExamManager from './pages/ExamManager';
import HomeworkManager from './pages/HomeworkManager';
import StudyMaterialManager from './pages/StudyMaterialManager';
import FeeManager from './pages/FeeManager';
import AdmissionManager from './pages/AdmissionManager';
import NoticeManager from './pages/NoticeManager';
import CalendarView from './pages/CalendarView';
import LeaveManager from './pages/LeaveManager';
import LibraryManager from './pages/LibraryManager';
import TransportManager from './pages/TransportManager';
import ReportsManager from './pages/ReportsManager';
import AuditLogViewer from './pages/AuditLogViewer';
import SettingsPage from './pages/SettingsPage';

function RoleRoute({ roles, children }) {
  const { user } = useAuth();
  if (!roles.includes(user?.role)) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
}

export default function App() {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-indigo-400 font-extrabold text-lg">
        Loading Greenwood ERP...
      </div>
    );
  }

  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/change-password" element={<ChangePassword />} />
      <Route
        path="/"
        element={<DashboardLayout />}
      >
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="students" element={<StudentList />} />
        <Route path="students/:id" element={<StudentProfile />} />
        <Route path="teachers" element={<TeacherList />} />
        
        <Route
          path="academics"
          element={
            <RoleRoute roles={['admin']}>
              <AcademicList />
            </RoleRoute>
          }
        />
        <Route path="attendance" element={<AttendanceManager />} />
        <Route path="timetable" element={<TimetableManager />} />
        <Route path="exams" element={<ExamManager />} />
        <Route path="homework" element={<HomeworkManager />} />
        <Route path="study-materials" element={<StudyMaterialManager />} />
        <Route path="fees" element={<FeeManager />} />
        
        <Route
          path="admissions"
          element={
            <RoleRoute roles={['admin']}>
              <AdmissionManager />
            </RoleRoute>
          }
        />
        <Route path="notices" element={<NoticeManager />} />
        <Route path="calendar" element={<CalendarView />} />
        <Route path="leave" element={<LeaveManager />} />
        
        <Route
          path="reports"
          element={
            <RoleRoute roles={['admin']}>
              <ReportsManager />
            </RoleRoute>
          }
        />
        <Route
          path="audit-logs"
          element={
            <RoleRoute roles={['admin']}>
              <AuditLogViewer />
            </RoleRoute>
          }
        />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
