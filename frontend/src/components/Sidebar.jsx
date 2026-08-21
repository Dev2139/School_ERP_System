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
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Sidebar() {
  const { user } = useAuth();
  const role = user?.role || 'admin';
  const profileId = user?.profileId?._id || user?.profileId;

  const menuItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard, roles: ['admin', 'teacher', 'student'] },
    
    // Dedicated Student Profile link for Student role
    { label: 'My Student Profile', path: profileId ? `/students/${profileId}` : '/students', icon: GraduationCap, roles: ['student'] },
    
    // Global Student Directory for Staff & Principal
    { label: 'Student Directory', path: '/students', icon: GraduationCap, roles: ['admin', 'teacher'] },
    
    { label: 'Teachers & Staff', path: '/teachers', icon: UserCheck, roles: ['admin', 'student'] },
    { label: 'Academic Setup', path: '/academics', icon: BookOpen, roles: ['admin'] },
    
    { label: role === 'student' ? 'My Attendance' : 'Attendance', path: '/attendance', icon: CalendarDays, roles: ['admin', 'teacher', 'student'] },
    { label: role === 'student' ? 'My Class Timetable' : 'Timetable', path: '/timetable', icon: Clock, roles: ['admin', 'teacher', 'student'] },
    { label: role === 'student' ? 'My Results & Grades' : 'Exams & Results', path: '/exams', icon: Award, roles: ['admin', 'teacher', 'student'] },
    { label: role === 'student' ? 'My Homework Tasks' : 'Homework', path: '/homework', icon: FileSpreadsheet, roles: ['admin', 'teacher', 'student'] },
    { label: role === 'student' ? 'My Study Materials' : 'Study Material', path: '/study-materials', icon: BookOpen, roles: ['teacher', 'student'] },
    { label: role === 'student' ? 'My Fee Balance' : 'Fee Management', path: '/fees', icon: DollarSign, roles: ['admin', 'student'] },
    
    { label: 'Admissions Pipeline', path: '/admissions', icon: UserPlus, roles: ['admin'] },
    { label: 'Notices Board', path: '/notices', icon: Bell, roles: ['admin', 'teacher', 'student'] },
    { label: 'School Calendar', path: '/calendar', icon: Calendar, roles: ['admin', 'teacher', 'student'] },
    { label: 'Leave Requests', path: '/leave', icon: Clock, roles: ['admin', 'teacher', 'student'] },
    { label: 'Reports Suite', path: '/reports', icon: BarChart3, roles: ['admin'] },
    { label: 'Audit Logs', path: '/audit-logs', icon: ShieldCheck, roles: ['admin'] },
    { label: 'Settings & Security', path: '/settings', icon: Settings, roles: ['admin', 'teacher', 'student'] },
  ];

  const filteredMenu = menuItems.filter((item) => item.roles.includes(role));

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 min-h-screen flex flex-col shadow-2xl border-r border-slate-800 shrink-0">
      {/* Brand Header */}
      <div className="p-5 flex items-center gap-3 border-b border-slate-800/80 bg-slate-950/40">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-sky-400 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-500/20">
          G
        </div>
        <div>
          <h1 className="font-bold text-white tracking-wide text-base leading-tight">Greenwood ERP</h1>
          <p className="text-xs text-indigo-400 font-medium">School SaaS Portal</p>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">Main Menu</div>
        {filteredMenu.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path + item.label}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                }`
              }
            >
              <div className="flex items-center gap-3">
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 opacity-40" />
            </NavLink>
          );
        })}
      </div>

      {/* User Role Card Footer */}
      <div className="p-4 border-t border-slate-800 bg-slate-950/60">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-indigo-400 text-sm">
            {user?.username?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-white truncate">{user?.username || 'User'}</p>
            <span className="inline-block px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase rounded-md bg-indigo-950 text-indigo-300 border border-indigo-800">
              {role.replace('_', ' ')}
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
