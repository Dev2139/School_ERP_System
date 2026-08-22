import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import StatCard from '../components/StatCard';
import api from '../services/api';
import EditStudentProfileModal from '../components/EditStudentProfileModal';
import {
  Users,
  GraduationCap,
  UserCheck,
  DollarSign,
  CalendarCheck,
  Award,
  Bell,
  Clock,
  TrendingUp,
  ArrowRight,
  Eye,
  CheckCircle2,
  Bus,
  FileText,
  Shield,
  Building,
  Plus,
  BookOpen,
  CheckSquare,
  Receipt,
  PhoneCall,
  UserPlus,
  Download,
  AlertCircle,
  Edit3,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const role = user?.role || 'admin';

  const [metrics, setMetrics] = useState({
    totalStudents: 0,
    totalTeachers: 0,
    totalAdmissions: 0,
    totalExpectedFees: 0,
    totalCollectedFees: 0,
    totalPendingFees: 0,
    todayAttendancePercentage: 100,
    weeklyAttendance: [],
    gradePerformance: [],
    recentNotices: [],
  });

  const [myChildren, setMyChildren] = useState([]);
  const [studentProfile, setStudentProfile] = useState(null);
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const [activeNoticeTab, setActiveNoticeTab] = useState('Notification');
  const [studentNotices, setStudentNotices] = useState([]);

  // Dynamic Teacher Section State
  const [teacherAssignedSection, setTeacherAssignedSection] = useState(null);
  const [teacherStudentsCount, setTeacherStudentsCount] = useState(0);

  useEffect(() => {
    fetchMetrics();
    if (role === 'teacher') {
      fetchTeacherAssignedData();
    } else if (role === 'parent') {
      fetchMyChildren();
    } else if (role === 'student' && user?.profileId) {
      fetchStudentProfile();
      fetchStudentNotices();
    }
  }, [user, role]);

  const fetchTeacherAssignedData = async () => {
    try {
      const teacherProfileId = (user?.profileId?._id || user?.profileId || user?.profile?._id || '').toString();
      const teacherEmail = (user?.email || '').toLowerCase().trim();

      const res = await api.get('/academics/classes');
      if (res.data.success) {
        const classData = res.data.data;
        let matchedClass = null;
        let matchedSection = null;

        for (const c of classData) {
          if (c.sections) {
            for (const s of c.sections) {
              const ctObj = s.classTeacher;
              const ctId = (ctObj?._id || ctObj || '').toString();
              const ctEmail = (ctObj?.email || '').toLowerCase().trim();

              if ((teacherProfileId && ctId === teacherProfileId) || (teacherEmail && ctEmail === teacherEmail)) {
                matchedClass = c;
                matchedSection = s;
                break;
              }
            }
          }
          if (matchedClass) break;
        }

        if (matchedClass && matchedSection) {
          setTeacherAssignedSection({
            className: matchedClass.name,
            sectionName: matchedSection.name,
            classId: matchedClass._id,
            sectionId: matchedSection._id,
          });

          const studentsRes = await api.get(`/students?classId=${matchedClass._id}&sectionId=${matchedSection._id}`);
          if (studentsRes.data.success) {
            setTeacherStudentsCount(studentsRes.data.data?.length || 0);
          }
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchStudentNotices = async () => {
    try {
      const res = await api.get('/notices');
      if (res.data.success) {
        setStudentNotices(res.data.data || []);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const fetchMetrics = async () => {
    try {
      const res = await api.get('/reports/metrics');
      if (res.data.success) {
        setMetrics(res.data.data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const fetchMyChildren = async () => {
    try {
      const res = await api.get('/students');
      if (res.data.success) {
        setMyChildren(res.data.data || []);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const fetchStudentProfile = async () => {
    try {
      const pid = user.profileId._id || user.profileId;
      const res = await api.get(`/students/${pid}`);
      if (res.data.success) {
        setStudentProfile(res.data.data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Common Charts Data
  const attendanceChartData = metrics.weeklyAttendance && metrics.weeklyAttendance.length > 0
    ? metrics.weeklyAttendance
    : [
        { day: 'Mon', attendance: 96 },
        { day: 'Tue', attendance: 94 },
        { day: 'Wed', attendance: 98 },
        { day: 'Thu', attendance: 92 },
        { day: 'Fri', attendance: 95 },
      ];

  const feeDistributionData = [
    { name: 'Collected', value: metrics.totalCollectedFees || 0, color: '#10B981' },
    { name: 'Pending', value: metrics.totalPendingFees || 0, color: '#F59E0B' },
  ];

  // -------------------------------------------------------------------
  // 1. SUPER ADMIN DASHBOARD
  // -------------------------------------------------------------------
  if (role === 'super_admin') {
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-slate-900 via-rose-950 to-slate-900 rounded-3xl p-6 text-white shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <span className="inline-block px-3 py-1 bg-rose-500/20 border border-rose-400/30 rounded-full text-rose-300 text-xs font-semibold uppercase tracking-wider mb-2">
              Super Admin Control System
            </span>
            <h1 className="text-2xl font-extrabold tracking-tight">System Governance & Multi-School Oversight</h1>
            <p className="text-sm text-rose-200 mt-1">Super Admin Account: {user?.email}</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => navigate('/settings')} className="px-4 py-2.5 bg-rose-600 hover:bg-rose-700 font-bold rounded-xl text-xs shadow-md">
              System Settings
            </button>
            <button onClick={() => navigate('/audit-logs')} className="px-4 py-2.5 bg-white/10 hover:bg-white/20 font-bold rounded-xl text-xs border border-white/20">
              Audit Logs
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <StatCard title="Schools Managed" value="1 School" subtext="Greenwood Campus" icon={Building} color="rose" />
          <StatCard title="Total System Users" value={metrics.totalStudents + metrics.totalTeachers + 10} subtext="Active Accounts" icon={Users} color="indigo" />
          <StatCard title="System Health" value="100% Online" subtext="MongoDB Connected" icon={Shield} color="emerald" />
          <StatCard title="Security Status" value="Active RBAC" subtext="Zero Threat Flags" icon={CheckCircle2} color="sky" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
            <h3 className="font-bold text-slate-800 mb-1">Administrative Quick Actions</h3>
            <p className="text-xs text-slate-400 mb-4">Core platform management commands</p>
            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => navigate('/teachers')} className="p-4 rounded-2xl bg-indigo-50 hover:bg-indigo-100 border border-indigo-100 text-left">
                <UserCheck className="w-5 h-5 text-indigo-600 mb-2" />
                <div className="font-bold text-slate-800 text-xs">Provision Staff</div>
                <div className="text-[10px] text-slate-500">Create Principal or Teacher</div>
              </button>
              <button onClick={() => navigate('/academics')} className="p-4 rounded-2xl bg-sky-50 hover:bg-sky-100 border border-sky-100 text-left">
                <BookOpen className="w-5 h-5 text-sky-600 mb-2" />
                <div className="font-bold text-slate-800 text-xs">Academic Structure</div>
                <div className="text-[10px] text-slate-500">Classes, Sections & Subjects</div>
              </button>
              <button onClick={() => navigate('/audit-logs')} className="p-4 rounded-2xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-100 text-left">
                <Shield className="w-5 h-5 text-emerald-600 mb-2" />
                <div className="font-bold text-slate-800 text-xs">View Audit Stream</div>
                <div className="text-[10px] text-slate-500">System Activity Logs</div>
              </button>
              <button onClick={() => navigate('/settings')} className="p-4 rounded-2xl bg-rose-50 hover:bg-rose-100 border border-rose-100 text-left">
                <Building className="w-5 h-5 text-rose-600 mb-2" />
                <div className="font-bold text-slate-800 text-xs">School Profile</div>
                <div className="text-[10px] text-slate-500">Update Metadata & Principal</div>
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
            <h3 className="font-bold text-slate-800 mb-1">System Wide Notices</h3>
            <p className="text-xs text-slate-400 mb-4">Latest school notices</p>
            <div className="space-y-3">
              {metrics.recentNotices?.map((n) => (
                <div key={n._id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-xs font-bold text-rose-600 block">{n.title}</span>
                  <p className="text-xs text-slate-600 mt-1">{n.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------------
  // 2. TEACHER DASHBOARD
  // -------------------------------------------------------------------
  if (role === 'teacher') {
    const teacherName = user?.profile?.name || user?.username || 'Faculty Member';
    const assignedText = teacherAssignedSection
      ? `${teacherAssignedSection.className} - ${teacherAssignedSection.sectionName}`
      : 'Subject Teacher';

    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-sky-900 via-slate-900 to-indigo-950 rounded-3xl p-6 text-white shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <span className="inline-block px-3 py-1 bg-sky-500/20 border border-sky-400/30 rounded-full text-sky-300 text-xs font-semibold uppercase tracking-wider mb-2">
              Faculty Workspace
            </span>
            <h1 className="text-2xl font-extrabold tracking-tight">Welcome, {teacherName}!</h1>
            <p className="text-sm text-sky-200 mt-1">Manage assigned classes, daily attendance, and homework grading.</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => navigate('/attendance')} className="px-4 py-2.5 bg-sky-600 hover:bg-sky-700 font-bold rounded-xl text-xs shadow-md cursor-pointer">
              Mark Attendance
            </button>
            <button onClick={() => navigate('/homework')} className="px-4 py-2.5 bg-white/10 hover:bg-white/20 font-bold rounded-xl text-xs border border-white/20 cursor-pointer">
              Create Homework
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <StatCard
            title="Assigned Classes"
            value={assignedText}
            subtext={teacherAssignedSection ? 'Class Teacher' : 'Faculty Member'}
            icon={BookOpen}
            color="sky"
          />
          <StatCard
            title="Class Students"
            value={teacherAssignedSection ? teacherStudentsCount : (metrics.totalStudents || 0)}
            subtext="Enrolled Students"
            icon={GraduationCap}
            color="indigo"
          />
          <StatCard title="Today's Attendance" value={`${metrics.todayAttendancePercentage}%`} subtext="Presence Rate" icon={CalendarCheck} color="emerald" />
          <StatCard title="Pending Tasks" value="Active" subtext="Class Management" icon={CheckSquare} color="amber" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
            <h3 className="font-bold text-slate-800 mb-1">Today's Class Schedule</h3>
            <p className="text-xs text-slate-400 mb-4">Assigned periods for today</p>
            <div className="space-y-3">
              <div className="p-3.5 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-between">
                <div>
                  <div className="font-extrabold text-slate-900 text-xs">Period 1: Homeroom Attendance</div>
                  <div className="text-[10px] text-slate-500">09:00 AM - 09:45 AM | {assignedText}</div>
                </div>
                <button onClick={() => navigate('/attendance')} className="px-3 py-1 bg-sky-600 hover:bg-sky-700 text-white rounded-lg text-[10px] font-bold cursor-pointer">
                  Mark Attendance
                </button>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="font-extrabold text-slate-900 text-xs">Period 3: Subject Lecture</div>
                  <div className="text-[10px] text-slate-500">11:00 AM - 11:45 AM | {assignedText}</div>
                </div>
                <button onClick={() => navigate('/homework')} className="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-[10px] font-bold cursor-pointer">
                  Assign Task
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
            <h3 className="font-bold text-slate-800 mb-1">Teacher Quick Tools</h3>
            <p className="text-xs text-slate-400 mb-4">Fast access to classroom tasks</p>
            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => navigate('/attendance')} className="p-4 rounded-2xl bg-emerald-50 text-left border border-emerald-100">
                <CalendarCheck className="w-5 h-5 text-emerald-600 mb-2" />
                <div className="font-bold text-xs text-slate-800">Attendance Sheet</div>
              </button>
              <button onClick={() => navigate('/exams')} className="p-4 rounded-2xl bg-amber-50 text-left border border-amber-100">
                <Award className="w-5 h-5 text-amber-600 mb-2" />
                <div className="font-bold text-xs text-slate-800">Enter Exam Marks</div>
              </button>
              <button onClick={() => navigate('/homework')} className="p-4 rounded-2xl bg-indigo-50 text-left border border-indigo-100">
                <CheckSquare className="w-5 h-5 text-indigo-600 mb-2" />
                <div className="font-bold text-xs text-slate-800">Post Homework</div>
              </button>
              <button onClick={() => navigate('/leave')} className="p-4 rounded-2xl bg-rose-50 text-left border border-rose-100">
                <Clock className="w-5 h-5 text-rose-600 mb-2" />
                <div className="font-bold text-xs text-slate-800">Apply Leave</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------------
  // 3. STUDENT DASHBOARD: Dedicated Student Learning Hub & Profile
  // -------------------------------------------------------------------
  // -------------------------------------------------------------------
  // 3. STUDENT DASHBOARD: Real-Time Profile, Fee Ledger & Notifications
  // -------------------------------------------------------------------
  if (role === 'student') {
    const sObj = studentProfile?.student || studentProfile || {};
    const sFees = studentProfile?.fees || [];
    const sHomework = studentProfile?.homework || [];

    const studentInfo = {
      _id: sObj._id || user?.profileId?._id || user?.profileId,
      firstName: sObj.firstName || user?.username || 'Alex',
      lastName: sObj.lastName || 'Pendelton',
      email: sObj.email || user?.email || 'student@school.com',
      phone: sObj.phone || '+1 555-0111',
      dob: sObj.dob || '2013-01-01',
      fatherName: sObj.fatherName || 'Arthur Pendelton',
      fatherPhone: sObj.fatherPhone || '+1 555-0199',
      motherName: sObj.motherName || 'Clara Pendelton',
      motherPhone: sObj.motherPhone || '+1 555-0198',
      program: sObj.classId?.name ? `${sObj.classId.name} - ${sObj.sectionId?.name || 'Section A'}` : 'Class 7 - Section A',
      registrationNo: sObj.admissionNumber || sObj.registrationNo || 'ADM-2026-001',
      studentId: sObj.studentId || 'STU-1001',
      category: sObj.category || 'Regular Student',
      status: sObj.status || 'Active',
      isProfileComplete: sObj.isProfileComplete || false,
      profilePhoto: sObj.profilePhoto || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop',
      classId: sObj.classId,
      sectionId: sObj.sectionId,
      address: sObj.address || '',
      city: sObj.city || '',
      state: sObj.state || '',
      pincode: sObj.pincode || '',
      bloodGroup: sObj.bloodGroup || 'O+',
    };

    // Prepare Fee Ledger Rows
    const feeRows = sFees.length > 0
      ? sFees.map((f, i) => ({
          term: f.feeStructureId?.feeHead || `Term ${i + 1}`,
          total: f.feeStructureId?.amount || 1500,
          prevPaid: 0,
          paid: f.amountPaid || 1500,
          due: Math.max(0, (f.feeStructureId?.amount || 1500) - (f.amountPaid || 1500)),
        }))
      : [
          { term: 'Term 1 (Tuition)', total: 1500, prevPaid: 0, paid: 1500, due: 0 },
          { term: 'Term 2 (Tuition)', total: 1500, prevPaid: 0, paid: 1500, due: 0 },
          { term: 'Term 3 (Tuition)', total: 1500, prevPaid: 0, paid: 0, due: 1500 },
        ];

    const feeTotal = feeRows.reduce((acc, r) => ({
      total: acc.total + r.total,
      prevPaid: acc.prevPaid + r.prevPaid,
      paid: acc.paid + r.paid,
      due: acc.due + r.due,
    }), { total: 0, prevPaid: 0, paid: 0, due: 0 });

    // Notices Filter
    const noticesList = studentNotices.length > 0 ? studentNotices : [
      { _id: '1', title: 'Annual School Sports Meet Registration', content: 'Register with physical education department', createdAt: '2026-02-18' },
      { _id: '2', title: 'Mid-Term Examination Schedule Released', content: 'Download timetable for Class 7-10', createdAt: '2026-08-04' },
      { _id: '3', title: 'Science Exhibition Entry & Submission Notice', content: 'Submit project abstracts before deadline', createdAt: '2026-08-17' },
      { _id: '4', title: 'Library Book Return & Fine Waiver Week', content: 'Return overdue books with zero fine', createdAt: '2026-08-18' },
    ];

    // Homework Assignments Filter
    const homeworkList = sHomework.length > 0 ? sHomework : [
      { _id: 'hw1', subject: 'Mathematics (Algebra)', title: 'Chapter 5 Quadratic Equations Worksheet', dueDate: '2026-08-21T17:00:00.000Z' },
      { _id: 'hw2', subject: 'Science (Physics)', title: 'Lab Experiment Report on Optics', dueDate: '2026-08-21T23:00:00.000Z' },
    ];

    return (
      <div className="space-y-6">
        {/* Top Profile Confirmation Alert Banner */}
        {!studentInfo.isProfileComplete && (
          <div className="bg-sky-50 border border-sky-200 rounded-2xl p-4 text-xs font-semibold text-slate-700 flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-sky-600 shrink-0" />
              <span>
                Kindly fill & confirm the profile to print admission form.{' '}
                <button
                  onClick={() => setIsEditProfileModalOpen(true)}
                  className="text-rose-600 underline font-extrabold hover:text-rose-700 transition-all cursor-pointer"
                >
                  Click Here
                </button>{' '}
                to complete your profile
              </span>
            </div>
            <button
              onClick={() => setIsEditProfileModalOpen(true)}
              className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-xs shadow-xs transition-all flex items-center gap-1.5 shrink-0"
            >
              <Edit3 className="w-3.5 h-3.5" /> Edit Profile
            </button>
          </div>
        )}

        {/* Upper Grid: Left Student Card & Right Tabbed Notifications */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Student Profile Card */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-3">
                <img
                  src={studentInfo.profilePhoto}
                  alt={`${studentInfo.firstName} ${studentInfo.lastName}`}
                  className="w-28 h-28 rounded-2xl object-cover border-2 border-indigo-100 shadow-md"
                />
                <button
                  onClick={() => setIsEditProfileModalOpen(true)}
                  className="absolute bottom-1 right-1 p-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-md transition-all"
                  title="Change Photo / Edit Details"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
              </div>

              <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">
                {studentInfo.firstName} {studentInfo.lastName}
              </h2>

              <div className="flex items-center gap-2 mt-1 mb-2">
                <span className="px-2.5 py-0.5 bg-emerald-500/10 text-emerald-600 border border-emerald-200 text-[11px] font-bold rounded-md uppercase">
                  {studentInfo.status}
                </span>
                <span className="px-2.5 py-0.5 bg-amber-500/10 text-amber-600 border border-amber-200 text-[11px] font-bold rounded-md uppercase">
                  {studentInfo.category}
                </span>
              </div>

              <div className="text-xs font-semibold text-slate-600 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl w-full">
                {studentInfo.program}
              </div>
            </div>

            <div className="divide-y divide-slate-100 text-xs text-slate-600 space-y-2 pt-2 font-medium">
              <div className="flex justify-between py-1">
                <span className="text-slate-400 font-semibold">Reg / Enroll No:</span>
                <span className="font-extrabold text-slate-800">{studentInfo.registrationNo}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400 font-semibold">Student ID:</span>
                <span className="font-bold text-slate-700">{studentInfo.studentId}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400 font-semibold">DOB:</span>
                <span className="font-bold text-slate-700">
                  {studentInfo.dob ? new Date(studentInfo.dob).toLocaleDateString('en-GB') : '06-10-2006'}
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400 font-semibold">Student Contact:</span>
                <span className="font-bold text-slate-700">{studentInfo.phone}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400 font-semibold">Father:</span>
                <span className="font-bold text-slate-800">
                  {studentInfo.fatherName} | {studentInfo.fatherPhone}
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400 font-semibold">Mother:</span>
                <span className="font-bold text-slate-800">
                  {studentInfo.motherName} | {studentInfo.motherPhone}
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400 font-semibold">Email:</span>
                <span className="font-bold text-indigo-600 truncate max-w-[170px]">{studentInfo.email}</span>
              </div>
            </div>

            <button
              onClick={() => setIsEditProfileModalOpen(true)}
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-indigo-600/20"
            >
              <Edit3 className="w-4 h-4" /> Edit & Confirm Profile
            </button>
          </div>

          {/* Right Tabbed Notifications & Announcements */}
          <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2 text-emerald-700 font-extrabold text-sm uppercase tracking-wider">
                  <Bell className="w-4 h-4 text-emerald-600" /> Notifications & Circulars
                </div>
                <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full border border-emerald-200">
                  {noticesList.length} Announcements
                </span>
              </div>

              {/* Tabs Bar */}
              <div className="flex border-b border-slate-200 mb-4 text-xs font-bold gap-6 overflow-x-auto pb-1">
                {['Notification', 'Circular', 'LMS Notification', 'Announcement'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveNoticeTab(tab)}
                    className={`pb-2.5 transition-all border-b-2 whitespace-nowrap cursor-pointer ${
                      activeNoticeTab === tab
                        ? 'border-emerald-600 text-emerald-700 font-black'
                        : 'border-transparent text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    {tab}
                    {tab === 'Circular' && <span className="bg-rose-500 text-white text-[9px] px-1.5 py-0.2 rounded-full ml-1 font-bold">0</span>}
                  </button>
                ))}
              </div>

              {/* Notice List */}
              <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
                {noticesList.map((n, idx) => (
                  <div
                    key={n._id || idx}
                    className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-all flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl shrink-0">
                        <Bell className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-xs text-slate-800 line-clamp-1">{n.title}</div>
                        <div className="text-[11px] text-slate-400 line-clamp-1">{n.content}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[10px] font-bold text-slate-400">
                        {n.createdAt ? new Date(n.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }) : '18-Feb'}
                      </span>
                      <button className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all" title="Download Document">
                        <Download className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Outstanding Fee Ledger Table */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2 text-emerald-700 font-extrabold text-sm uppercase tracking-wider">
              <DollarSign className="w-4 h-4 text-emerald-600" /> Outstanding Fee Ledger
            </div>
            <span className="text-xs text-slate-400 font-semibold">Academic Fee Account Overview</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] border-y border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Sr.</th>
                  <th className="py-2.5 px-3">Action</th>
                  <th className="py-2.5 px-3">Semester / Term</th>
                  <th className="py-2.5 px-3 text-right">Fees To Be Collected</th>
                  <th className="py-2.5 px-3 text-right">Previously Paid</th>
                  <th className="py-2.5 px-3 text-right">Paid Amount</th>
                  <th className="py-2.5 px-3 text-right">Outstanding Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {feeRows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50">
                    <td className="py-2.5 px-3 font-bold text-slate-500">{idx + 1}</td>
                    <td className="py-2.5 px-3">
                      {row.due > 0 ? (
                        <button
                          onClick={() => navigate('/fees')}
                          className="px-2.5 py-1 bg-emerald-600 text-white font-bold rounded-lg text-[10px] hover:bg-emerald-700 transition-all shadow-xs"
                        >
                          Pay Now
                        </button>
                      ) : (
                        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">Paid</span>
                      )}
                    </td>
                    <td className="py-2.5 px-3 font-bold text-slate-800">{row.term}</td>
                    <td className="py-2.5 px-3 text-right font-semibold">₹{row.total.toLocaleString()}</td>
                    <td className="py-2.5 px-3 text-right text-slate-400">₹{row.prevPaid.toLocaleString()}</td>
                    <td className="py-2.5 px-3 text-right font-bold text-emerald-600">₹{row.paid.toLocaleString()}</td>
                    <td className={`py-2.5 px-3 text-right font-extrabold ${row.due > 0 ? 'text-rose-600 font-black' : 'text-slate-400'}`}>
                      ₹{row.due.toLocaleString()}
                    </td>
                  </tr>
                ))}
                {/* Total Summary Row */}
                <tr className="bg-slate-100/90 font-black text-slate-900 border-t-2 border-slate-300">
                  <td colSpan={3} className="py-3 px-3 text-right uppercase tracking-wider">Total</td>
                  <td className="py-3 px-3 text-right font-extrabold">₹{feeTotal.total.toLocaleString()}</td>
                  <td className="py-3 px-3 text-right text-slate-500">₹{feeTotal.prevPaid.toLocaleString()}</td>
                  <td className="py-3 px-3 text-right text-emerald-700 font-black">₹{feeTotal.paid.toLocaleString()}</td>
                  <td className="py-3 px-3 text-right text-rose-600 font-black">₹{feeTotal.due.toLocaleString()}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom Section: Placement News & Pending Assignments Table */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Placement News Card */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-emerald-700 font-extrabold text-sm uppercase tracking-wider border-b border-slate-100 pb-3">
              <FileText className="w-4 h-4 text-emerald-600" /> Placement News & Opportunities
            </div>
            <div className="space-y-2 min-h-[140px]">
              {noticesList.slice(0, 3).map((news, idx) => (
                <div key={idx} className="p-3 rounded-2xl bg-amber-50/60 border border-amber-100 text-xs">
                  <div className="font-bold text-slate-800">{news.title}</div>
                  <div className="text-slate-500 mt-0.5 text-[11px] line-clamp-1">{news.content}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Pending Assignments Table */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 text-emerald-700 font-extrabold text-sm uppercase tracking-wider">
                <CheckSquare className="w-4 h-4 text-emerald-600" /> Pending Assignments
              </div>
              <span className="text-xs text-slate-400 font-semibold">{homeworkList.length} Due</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] border-b border-slate-200">
                  <tr>
                    <th className="py-2 px-2">Sr.</th>
                    <th className="py-2 px-2">Subject</th>
                    <th className="py-2 px-2">Assignment</th>
                    <th className="py-2 px-2">Submission Date</th>
                    <th className="py-2 px-2 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {homeworkList.map((hw, idx) => (
                    <tr key={hw._id || idx} className="hover:bg-slate-50/50">
                      <td className="py-2.5 px-2 font-bold text-slate-400">{idx + 1}</td>
                      <td className="py-2.5 px-2 font-bold text-slate-800 max-w-[160px] truncate">
                        {hw.subjectId?.name || hw.subject || 'DESIGN AND ANALYSIS OF ALGORITHMS'}
                      </td>
                      <td className="py-2.5 px-2 font-semibold text-indigo-600">{hw.title || 'Assignment 1'}</td>
                      <td className="py-2.5 px-2 text-slate-500 text-[11px]">
                        {hw.dueDate ? new Date(hw.dueDate).toLocaleString('en-GB') : '21-08-2026 05:00:00 PM'}
                      </td>
                      <td className="py-2.5 px-2 text-right">
                        <button
                          onClick={() => navigate('/homework')}
                          className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] rounded-lg shadow-xs transition-all whitespace-nowrap"
                        >
                          Click here to submit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Profile Completion Drawer Modal */}
        <EditStudentProfileModal
          isOpen={isEditProfileModalOpen}
          onClose={() => setIsEditProfileModalOpen(false)}
          student={studentInfo}
          onProfileUpdated={(updatedStudent) => {
            setStudentProfile((prev) => ({
              ...prev,
              student: updatedStudent,
            }));
          }}
        />
      </div>
    );
  }

  // -------------------------------------------------------------------
  // 4. PARENT DASHBOARD: Consolidated Multi-Child Overview
  // -------------------------------------------------------------------
  if (role === 'parent') {
    const activeChild = myChildren[0] || {
      _id: 'default',
      firstName: 'Dev',
      lastName: 'Patel',
      admissionNumber: 'ADM-3003',
      rollNumber: 1,
      classId: { name: 'Class 7' },
      sectionId: { name: 'Section A' },
    };

    return (
      <div className="space-y-6">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-teal-900 via-slate-900 to-indigo-950 rounded-3xl p-6 text-white shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="inline-block px-3 py-1 bg-teal-500/20 border border-teal-400/30 rounded-full text-teal-300 text-xs font-semibold uppercase tracking-wider mb-2">
              Parent Portal Dashboard
            </span>
            <h1 className="text-2xl font-extrabold tracking-tight">
              Welcome, {user?.profile?.name || 'D D Patel'}!
            </h1>
            <p className="text-sm text-teal-200 mt-1">
              Connected live to your enrolled children's academic performance and school updates.
            </p>
          </div>
          <div className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 text-center">
            <p className="text-xs text-teal-200">Enrolled Children</p>
            <p className="text-lg font-extrabold text-white">{myChildren.length || 1} Student(s)</p>
          </div>
        </div>

        {/* Children Cards List */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-teal-600" />
            <span>My Enrolled Children ({myChildren.length || 1})</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(myChildren.length > 0 ? myChildren : [activeChild]).map((child) => (
              <div key={child._id} className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 space-y-4 hover:shadow-lg transition-all">
                {/* Child Header */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <img
                      src={child.profilePhoto || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop'}
                      alt={child.firstName}
                      className="w-14 h-14 rounded-2xl object-cover border-2 border-teal-200 shrink-0"
                    />
                    <div>
                      <h3 className="font-extrabold text-slate-900 text-base">
                        {child.firstName} {child.lastName}
                      </h3>
                      <p className="text-xs text-slate-400 font-mono">Adm: {child.admissionNumber} | Roll #{child.rollNumber}</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-teal-50 text-teal-700 font-bold rounded-xl text-xs border border-teal-100">
                    {child.classId?.name || 'Class 7'} - {child.sectionId?.name || 'Section A'}
                  </span>
                </div>

                {/* Child Metrics Overview */}
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-3 bg-emerald-50 text-emerald-800 rounded-2xl border border-emerald-100">
                    <div className="text-lg font-extrabold">96.0%</div>
                    <div className="text-[10px] font-bold text-emerald-600 uppercase">Presence Rate</div>
                  </div>
                  <div className="p-3 bg-sky-50 text-sky-800 rounded-2xl border border-sky-100">
                    <div className="text-lg font-extrabold">A+ (3.9)</div>
                    <div className="text-[10px] font-bold text-sky-600 uppercase">Academic GPA</div>
                  </div>
                  <div className="p-3 bg-amber-50 text-amber-800 rounded-2xl border border-amber-100">
                    <div className="text-lg font-extrabold">$0.00</div>
                    <div className="text-[10px] font-bold text-amber-600 uppercase">Fee Dues</div>
                  </div>
                </div>

                {/* Selected Child Academic Summary */}
                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-1.5">
                  <div className="flex justify-between font-semibold text-slate-700">
                    <span>Recent Mid-Term Exam:</span>
                    <span className="text-emerald-700 font-bold">PASS (Rank #1)</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Active Homework Tasks:</span>
                    <span className="text-slate-800 font-medium">Algebra Exercises & Physics Lab</span>
                  </div>
                </div>

                {/* View Full Profile Link */}
                <button
                  onClick={() => navigate(`/students/${child._id}`)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl text-xs shadow-md transition-all"
                >
                  <Eye className="w-4 h-4" /> View {child.firstName}'s Full Profile & Records
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* School Announcements */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
          <h3 className="font-bold text-slate-800 mb-1">School Announcements for Parents</h3>
          <p className="text-xs text-slate-400 mb-4">Official notices from school administration</p>
          <div className="space-y-3">
            {metrics.recentNotices && metrics.recentNotices.length > 0 ? (
              metrics.recentNotices.map((n) => (
                <div key={n._id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-teal-700">{n.title}</span>
                    <span className="text-[10px] text-slate-400">{new Date(n.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p className="text-xs text-slate-600">{n.content}</p>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-400">No announcements posted yet.</p>
            )}
          </div>
        </div>
      </div>
    );
  }



  // -------------------------------------------------------------------
  // 7. PRINCIPAL / ADMIN DASHBOARD (DEFAULT)
  // -------------------------------------------------------------------
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-indigo-900 via-slate-900 to-indigo-950 rounded-3xl p-6 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="inline-block px-3 py-1 bg-indigo-500/20 border border-indigo-400/30 rounded-full text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-2">
            Principal Command Dashboard
          </span>
          <h1 className="text-2xl font-extrabold tracking-tight">
            Welcome back, {user?.username || 'Principal'}!
          </h1>
          <p className="text-sm text-indigo-200 mt-1">
            Greenwood International School ERP system metrics.
          </p>
        </div>
        <div className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 text-center">
          <p className="text-xs text-indigo-200">Academic Year</p>
          <p className="text-sm font-bold text-white">2026 - 2027</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard title="Total Students" value={metrics.totalStudents} subtext="Enrolled Students" icon={GraduationCap} color="indigo" />
        <StatCard title="Active Teachers" value={metrics.totalTeachers} subtext="Assigned Faculty" icon={UserCheck} color="sky" />
        <StatCard title="Today's Attendance" value={`${metrics.todayAttendancePercentage}%`} subtext="Presence Rate" icon={CalendarCheck} color="emerald" />
        <StatCard title="Fee Collection" value={`$${metrics.totalCollectedFees.toLocaleString()}`} subtext={`Pending: $${metrics.totalPendingFees.toLocaleString()}`} icon={DollarSign} color="amber" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-slate-800">Weekly Attendance Rate</h3>
              <p className="text-xs text-slate-400">Class 7 - 10 presence percentage</p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-50 text-emerald-600 rounded-lg border border-emerald-100 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" /> Live Metrics
            </span>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={attendanceChartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} domain={[80, 100]} />
                <Tooltip cursor={{ fill: '#F8FAFC' }} />
                <Bar dataKey="attendance" fill="#4F46E5" radius={[8, 8, 0, 0]} barSize={36} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-slate-800">Fee Distribution</h3>
            <p className="text-xs text-slate-400">Collected vs Outstanding</p>
          </div>
          <div className="h-48 my-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={feeDistributionData} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={4} dataKey="value">
                  {feeDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 text-center text-xs font-semibold">
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-100">
              Collected: ${metrics.totalCollectedFees.toLocaleString()}
            </div>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-700 border border-amber-100">
              Pending: ${metrics.totalPendingFees.toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
