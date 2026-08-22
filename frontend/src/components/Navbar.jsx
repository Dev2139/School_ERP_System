import React, { useState } from 'react';
import { Search, Bell, LogOut, User, Shield, ChevronDown, GraduationCap, Menu } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';

export default function Navbar({ onOpenSearch, onToggleMobileSidebar }) {
  const { user, logout, switchDemoRole } = useAuth();
  const { addToast } = useNotification();
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [selectedChildIndex, setSelectedChildIndex] = useState(0);

  const demoRoles = [
    { label: 'Staff (Principal)', role: 'admin', email: 'principal@school.com', pass: '06102006', color: 'bg-indigo-500/10 text-indigo-600 border-indigo-200' },
    { label: 'Staff (Teacher)', role: 'teacher', email: 'manu@gmail.com', pass: '06102006', color: 'bg-sky-500/10 text-sky-600 border-sky-200' },
    { label: 'Student', role: 'student', email: 'student@school.com', pass: '06102006', color: 'bg-purple-500/10 text-purple-600 border-purple-200' },
  ];

  const handleRoleSwitch = async (r) => {
    setShowRoleMenu(false);
    const res = await switchDemoRole(r.email, r.pass);
    if (res?.success) {
      addToast(`Switched view to demo account: ${r.label}`, 'success');
    } else {
      addToast(res?.message || 'Role switch failed', 'error');
    }
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 shadow-xs">
      {/* Left: Mobile Hamburger Toggle + Search */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobileSidebar}
          className="lg:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all cursor-pointer"
          aria-label="Open Mobile Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <button
          onClick={onOpenSearch}
          className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 bg-slate-100 hover:bg-slate-200/80 text-slate-500 rounded-xl text-xs sm:text-sm font-medium transition-all w-36 sm:w-64 md:w-80 border border-slate-200"
        >
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <span className="flex-1 text-left truncate">Search everything...</span>
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-semibold text-slate-400 bg-white border border-slate-300 rounded shadow-xs">
            Ctrl K
          </kbd>
        </button>
      </div>

      {/* Right: Quick Role Switcher Toolbar & Profile */}
      <div className="flex items-center gap-3">
        {/* Demo Role Switcher Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowRoleMenu(!showRoleMenu)}
            className="flex items-center gap-2 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-xl text-xs font-semibold transition-all shadow-xs"
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Switch Role ({user?.role?.replace('_', ' ')})</span>
            <ChevronDown className="w-3 h-3" />
          </button>

          {showRoleMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 p-2 z-50">
              <div className="px-2 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Demo Role Switcher</div>
              <div className="space-y-1 mt-1">
                {demoRoles.map((r) => (
                  <button
                    key={r.role}
                    onClick={() => handleRoleSwitch(r)}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium border flex items-center justify-between transition-all ${
                      user?.role === r.role ? 'bg-indigo-600 text-white font-bold border-indigo-600' : `${r.color} hover:opacity-90`
                    }`}
                  >
                    <span>{r.label}</span>
                    {user?.role === r.role && <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded">Active</span>}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Notifications Icon */}
        <button className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-all relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-600 rounded-full ring-2 ring-white"></span>
        </button>

        <div className="h-6 w-px bg-slate-200 mx-1"></div>

        {/* Logout */}
        <button
          onClick={logout}
          className="flex items-center gap-2 px-3 py-1.5 text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-xl text-xs font-semibold transition-all"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
}
