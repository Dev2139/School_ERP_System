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
import ReportsManager from './pages/ReportsManager';
import AuditLogViewer from './pages/AuditLogViewer';
import SettingsPage from './pages/SettingsPage';

function RoleRoute({ roles, children }) {
  const { user } = useAuth();
  if (!roles.includes(user?.role)) {
    const rolePrefix = user?.role === 'admin' ? '/admin' : user?.role === 'teacher' ? '/teacher' : '/student';
    return <Navigate to={`${rolePrefix}/dashboard`} replace />;
  }
  return children;
}

// Redirect helper for root alias paths to role-prefixed paths
function RoleRedirect({ subPath }) {
  const { user } = useAuth();
  const rolePrefix = user?.role === 'admin' ? '/admin' : user?.role === 'teacher' ? '/teacher' : '/student';
  const targetPath = subPath === 'sections' && user?.role === 'student'
    ? `/student/${user?.profileId?._id || user?.profileId || 'profile'}/section`
    : `${rolePrefix}/${subPath}`;
  return <Navigate to={targetPath} replace />;
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

  const rolePrefix = user?.role === 'admin' ? '/admin' : user?.role === 'teacher' ? '/teacher' : '/student';

  return (
    <Routes>
      <Route path="/change-password" element={<ChangePassword />} />
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<Navigate to={`${rolePrefix}/dashboard`} replace />} />

        {/* ---------------- ADMIN ROUTES ---------------- */}
        <Route
          path="admin/dashboard"
          element={
            <RoleRoute roles={['admin']}>
              <Dashboard />
            </RoleRoute>
          }
        />
        <Route
          path="admin/sections"
          element={
            <RoleRoute roles={['admin']}>
              <AcademicList />
            </RoleRoute>
          }
        />
        <Route
          path="admin/students"
          element={
            <RoleRoute roles={['admin']}>
              <StudentList />
            </RoleRoute>
          }
        />
        <Route
          path="admin/students/:id"
          element={
            <RoleRoute roles={['admin']}>
              <StudentProfile />
            </RoleRoute>
          }
        />
        <Route
          path="admin/teachers"
          element={
            <RoleRoute roles={['admin']}>
              <TeacherList />
            </RoleRoute>
          }
        />
        <Route
          path="admin/attendance"
          element={
            <RoleRoute roles={['admin']}>
              <AttendanceManager />
            </RoleRoute>
          }
        />
        <Route
          path="admin/timetable"
          element={
            <RoleRoute roles={['admin']}>
              <TimetableManager />
            </RoleRoute>
          }
        />
        <Route
          path="admin/exams"
          element={
            <RoleRoute roles={['admin']}>
              <ExamManager />
            </RoleRoute>
          }
        />
        <Route
          path="admin/homework"
          element={
            <RoleRoute roles={['admin']}>
              <HomeworkManager />
            </RoleRoute>
          }
        />
        <Route
          path="admin/fees"
          element={
            <RoleRoute roles={['admin']}>
              <FeeManager />
            </RoleRoute>
          }
        />
        <Route
          path="admin/admissions"
          element={
            <RoleRoute roles={['admin']}>
              <AdmissionManager />
            </RoleRoute>
          }
        />
        <Route
          path="admin/notices"
          element={
            <RoleRoute roles={['admin']}>
              <NoticeManager />
            </RoleRoute>
          }
        />
        <Route
          path="admin/calendar"
          element={
            <RoleRoute roles={['admin']}>
              <CalendarView />
            </RoleRoute>
          }
        />
        <Route
          path="admin/leave"
          element={
            <RoleRoute roles={['admin']}>
              <LeaveManager />
            </RoleRoute>
          }
        />
        <Route
          path="admin/reports"
          element={
            <RoleRoute roles={['admin']}>
              <ReportsManager />
            </RoleRoute>
          }
        />
        <Route
          path="admin/audit-logs"
          element={
            <RoleRoute roles={['admin']}>
              <AuditLogViewer />
            </RoleRoute>
          }
        />
        <Route
          path="admin/settings"
          element={
            <RoleRoute roles={['admin']}>
              <SettingsPage />
            </RoleRoute>
          }
        />

        {/* ---------------- TEACHER ROUTES ---------------- */}
        <Route
          path="teacher/dashboard"
          element={
            <RoleRoute roles={['teacher']}>
              <Dashboard />
            </RoleRoute>
          }
        />
        <Route
          path="teacher/sections"
          element={
            <RoleRoute roles={['teacher']}>
              <AcademicList />
            </RoleRoute>
          }
        />
        <Route
          path="teacher/students"
          element={
            <RoleRoute roles={['teacher']}>
              <StudentList />
            </RoleRoute>
          }
        />
        <Route
          path="teacher/study-materials"
          element={
            <RoleRoute roles={['teacher']}>
              <StudyMaterialManager />
            </RoleRoute>
          }
        />
        <Route
          path="teacher/attendance"
          element={
            <RoleRoute roles={['teacher']}>
              <AttendanceManager />
            </RoleRoute>
          }
        />
        <Route
          path="teacher/timetable"
          element={
            <RoleRoute roles={['teacher']}>
              <TimetableManager />
            </RoleRoute>
          }
        />
        <Route
          path="teacher/exams"
          element={
            <RoleRoute roles={['teacher']}>
              <ExamManager />
            </RoleRoute>
          }
        />
        <Route
          path="teacher/homework"
          element={
            <RoleRoute roles={['teacher']}>
              <HomeworkManager />
            </RoleRoute>
          }
        />
        <Route
          path="teacher/notices"
          element={
            <RoleRoute roles={['teacher']}>
              <NoticeManager />
            </RoleRoute>
          }
        />
        <Route
          path="teacher/calendar"
          element={
            <RoleRoute roles={['teacher']}>
              <CalendarView />
            </RoleRoute>
          }
        />
        <Route
          path="teacher/leave"
          element={
            <RoleRoute roles={['teacher']}>
              <LeaveManager />
            </RoleRoute>
          }
        />
        <Route
          path="teacher/settings"
          element={
            <RoleRoute roles={['teacher']}>
              <SettingsPage />
            </RoleRoute>
          }
        />

        {/* ---------------- STUDENT ROUTES ---------------- */}
        <Route
          path="student/dashboard"
          element={
            <RoleRoute roles={['student']}>
              <Dashboard />
            </RoleRoute>
          }
        />
        <Route
          path="student/:id/section"
          element={
            <RoleRoute roles={['student']}>
              <StudentProfile />
            </RoleRoute>
          }
        />
        <Route
          path="student/study-materials"
          element={
            <RoleRoute roles={['student']}>
              <StudyMaterialManager />
            </RoleRoute>
          }
        />
        <Route
          path="student/attendance"
          element={
            <RoleRoute roles={['student']}>
              <AttendanceManager />
            </RoleRoute>
          }
        />
        <Route
          path="student/timetable"
          element={
            <RoleRoute roles={['student']}>
              <TimetableManager />
            </RoleRoute>
          }
        />
        <Route
          path="student/exams"
          element={
            <RoleRoute roles={['student']}>
              <ExamManager />
            </RoleRoute>
          }
        />
        <Route
          path="student/homework"
          element={
            <RoleRoute roles={['student']}>
              <HomeworkManager />
            </RoleRoute>
          }
        />
        <Route
          path="student/fees"
          element={
            <RoleRoute roles={['student']}>
              <FeeManager />
            </RoleRoute>
          }
        />
        <Route
          path="student/notices"
          element={
            <RoleRoute roles={['student']}>
              <NoticeManager />
            </RoleRoute>
          }
        />
        <Route
          path="student/calendar"
          element={
            <RoleRoute roles={['student']}>
              <CalendarView />
            </RoleRoute>
          }
        />
        <Route
          path="student/leave"
          element={
            <RoleRoute roles={['student']}>
              <LeaveManager />
            </RoleRoute>
          }
        />
        <Route
          path="student/settings"
          element={
            <RoleRoute roles={['student']}>
              <SettingsPage />
            </RoleRoute>
          }
        />

        {/* LEGACY / ROOT ALIAS REDIRECTS */}
        <Route path="dashboard" element={<RoleRedirect subPath="dashboard" />} />
        <Route path="academics font-mono" element={<RoleRedirect subPath="sections" />} />
        <Route path="academics" element={<RoleRedirect subPath="sections" />} />
        <Route path="sections" element={<RoleRedirect subPath="sections" />} />
        <Route path="students" element={<RoleRedirect subPath="students" />} />
        <Route path="students/:id" element={<StudentProfile />} />
        <Route path="teachers" element={<RoleRedirect subPath="teachers" />} />
        <Route path="attendance" element={<RoleRedirect subPath="attendance" />} />
        <Route path="timetable" element={<RoleRedirect subPath="timetable" />} />
        <Route path="exams" element={<RoleRedirect subPath="exams" />} />
        <Route path="homework" element={<RoleRedirect subPath="homework" />} />
        <Route path="study-materials" element={<RoleRedirect subPath="study-materials" />} />
        <Route path="fees" element={<RoleRedirect subPath="fees" />} />
        <Route path="admissions" element={<RoleRedirect subPath="admissions" />} />
        <Route path="notices" element={<RoleRedirect subPath="notices" />} />
        <Route path="calendar" element={<RoleRedirect subPath="calendar" />} />
        <Route path="leave" element={<RoleRedirect subPath="leave" />} />
        <Route path="reports" element={<RoleRedirect subPath="reports" />} />
        <Route path="audit-logs" element={<RoleRedirect subPath="audit-logs" />} />
        <Route path="settings" element={<RoleRedirect subPath="settings" />} />
      </Route>
      <Route path="*" element={<Navigate to={`${rolePrefix}/dashboard`} replace />} />
    </Routes>
  );
}
