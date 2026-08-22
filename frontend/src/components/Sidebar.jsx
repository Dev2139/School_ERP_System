import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  UserCheck,
  CalendarDays,
  FileSpreadsheet,
  Award,
  BookOpen,
  DollarSign,
  UserPlus,
  Bell,
  Calendar,
  Clock,
  BookMarked,
  Bus,
  BarChart3,
  ShieldCheck,
  Settings,
  ChevronRight,
  User,
  Layers,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Sidebar({ onClose }) {
  const { user } = useAuth();
  const role = user?.role || 'admin';
  const profileId = user?.profileId?._id || user?.profileId || 'profile';

  // Role-prefixed route generator with ID routing for Student & Teacher
  const getRolePath = (subPath) => {
    const profileIdStr = profileId;

    if (role === 'student') {
      if (subPath === 'sections' || subPath === 'section') {
        return `/student/${profileIdStr}/section`;
      }
      return `/student/${profileIdStr}/${subPath}`;
    }

    if (role === 'teacher') {
      return `/teacher/${profileIdStr}/${subPath}`;
    }

    return `/admin/${subPath}`;
  };

  const menuItems = [
    { label: 'Dashboard', path: getRolePath('dashboard'), icon: LayoutDashboard, roles: ['admin', 'teacher', 'student'] },

    // Student Class & Section Profile
    {
      label: 'My Class & Section',
      path: `/student/${profileId}/section`,
      icon: Layers,
      roles: ['student'],
    },

    // Global Student Directory for Staff & Principal
    { label: 'Student Directory', path: getRolePath('students'), icon: GraduationCap, roles: ['admin', 'teacher'] },

    { label: 'Teachers & Staff', path: getRolePath('teachers'), icon: UserCheck, roles: ['admin'] },

    // Academic Sections Management
    { label: 'Academic Setup', path: '/admin/sections', icon: BookOpen, roles: ['admin'] },
    { label: 'My Sections & Classes', path: getRolePath('sections'), icon: Layers, roles: ['teacher'] },

    // Faculty Salary Management
    { label: 'Faculty Payroll', path: '/admin/salary', icon: DollarSign, roles: ['admin'] },
    { label: 'My Salary & Payslips', path: getRolePath('salary'), icon: DollarSign, roles: ['teacher'] },

    {
      label: role === 'student' ? 'My Attendance' : 'Attendance',
      path: getRolePath('attendance'),
      icon: CalendarDays,
      roles: ['admin', 'teacher', 'student'],
    },
    { label: 'Timetable', path: getRolePath('timetable'), icon: Clock, roles: ['admin', 'teacher', 'student'] },
    {
      label: role === 'student' ? 'Exams & Report Cards' : 'Exams & Results',
      path: getRolePath('exams'),
      icon: Award,
      roles: ['admin', 'teacher', 'student'],
    },
    { label: 'Homework', path: getRolePath('homework'), icon: BookMarked, roles: ['admin', 'teacher', 'student'] },
    {
      label: 'Study Material',
      path: getRolePath('study-materials'),
      icon: BookOpen,
      roles: ['admin', 'teacher', 'student'],
    },

    { label: 'Fees Management', path: getRolePath('fees'), icon: DollarSign, roles: ['admin', 'student'] },
    { label: 'Admissions', path: '/admin/admissions', icon: UserPlus, roles: ['admin'] },
    { label: 'Notices Board', path: getRolePath('notices'), icon: Bell, roles: ['admin', 'teacher', 'student'] },
    { label: 'School Calendar', path: getRolePath('calendar'), icon: Calendar, roles: ['admin', 'teacher', 'student'] },
    { label: 'Leave Requests', path: getRolePath('leave'), icon: CalendarDays, roles: ['admin', 'teacher', 'student'] },
    { label: 'Library', path: '/admin/library', icon: BookOpen, roles: ['admin'] },
    { label: 'Transport', path: '/admin/transport', icon: Bus, roles: ['admin'] },
    { label: 'Reports & Analytics', path: '/admin/reports', icon: BarChart3, roles: ['admin'] },
    { label: 'Audit Logs', path: '/admin/audit-logs', icon: ShieldCheck, roles: ['admin'] },
    { label: 'Settings & Security', path: getRolePath('settings'), icon: Settings, roles: ['admin', 'teacher', 'student'] },
  ];

  const filteredMenu = menuItems.filter((item) => item.roles.includes(role));

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 min-h-screen flex flex-col shadow-2xl border-r border-slate-800 shrink-0 h-full">
      {/* Brand Header */}
      <div className="p-5 flex items-center justify-between border-b border-slate-800/80 bg-slate-950/40">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-sky-400 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-500/20">
            G
          </div>
          <div>
            <h1 className="font-bold text-white tracking-wide text-base leading-tight">Greenwood ERP</h1>
            <p className="text-[10px] text-indigo-400 font-semibold uppercase tracking-wider">
              {role === 'admin' ? 'Principal Portal' : role === 'teacher' ? 'Faculty Portal' : 'Student Portal'}
            </p>
          </div>
        </div>

        {/* Mobile Close Button */}
        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden p-1 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
          >
            <span className="text-lg font-bold">✕</span>
          </button>
        )}
      </div>

      {/* Navigation Links */}
      <div className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {filteredMenu.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={() => onClose && onClose()}
            className={({ isActive }) =>
              `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 font-bold'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
              }`
            }
          >
            <div className="flex items-center gap-3">
              <item.icon className="w-4 h-4 shrink-0" />
              <span>{item.label}</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 opacity-40" />
          </NavLink>
        ))}
      </div>

      {/* User Profile Badge */}
      <div className="p-4 border-t border-slate-800/80 bg-slate-950/30">
        <div className="flex items-center gap-3 p-2 bg-slate-800/40 rounded-xl border border-slate-800">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-300 font-bold text-xs">
            {user?.username?.[0]?.toUpperCase() || 'U'}
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-bold text-white truncate">{user?.username || 'User'}</p>
            <p className="text-[10px] text-slate-400 capitalize">{user?.role?.replace('_', ' ')}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
