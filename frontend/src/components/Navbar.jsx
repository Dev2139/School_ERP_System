import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, LogOut, User, Shield, ChevronDown, GraduationCap, Menu, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import api from '../services/api';

export default function Navbar({ onOpenSearch, onToggleMobileSidebar }) {
  const { user, logout, switchDemoRole } = useAuth();
  const { addToast } = useNotification();
  const navigate = useNavigate();

  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    if (user) {
      fetchUserNotifications();
    }
  }, [user]);

  const fetchUserNotifications = async () => {
    try {
      const res = await api.get('/notifications');
      if (res.data.success) {
        setNotifications(res.data.data || []);
        setUnreadCount(res.data.unreadCount || 0);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await api.put('/notifications/read-all');
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
      setUnreadCount(0);
      addToast('All notifications marked as read', 'success');
    } catch (err) {
      console.error(err);
    }
  };

  const handleNotificationClick = async (item) => {
    setShowNotifications(false);
    if (!item.isRead) {
      try {
        await api.put(`/notifications/${item._id}/read`);
        setNotifications((prev) =>
          prev.map((n) => (n._id === item._id ? { ...n, isRead: true } : n))
        );
        setUnreadCount((prev) => Math.max(0, prev - 1));
      } catch (err) {
        console.error(err);
      }
    }

    if (item.link) {
      const profileId = user?.profileId?._id || user?.profileId || 'profile';
      const rolePrefix =
        user?.role === 'admin'
          ? '/admin'
          : user?.role === 'teacher'
          ? `/teacher/${profileId}`
          : user?.role === 'accountant'
          ? '/accountant'
          : `/student/${profileId}`;

      const targetPath = item.link.startsWith('/')
        ? item.link
        : `${rolePrefix}/${item.link}`;

      navigate(targetPath);
    }
  };

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

        {/* Notifications Icon & Interactive Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              if (!showNotifications) fetchUserNotifications();
            }}
            className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-all relative cursor-pointer"
            aria-label="Toggle Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 px-1.5 py-0.25 text-[10px] font-black text-white bg-rose-600 rounded-full shadow-xs ring-2 ring-white">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 z-50 animate-in fade-in duration-150">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-slate-900 text-sm">Notifications</h3>
                  {unreadCount > 0 && (
                    <span className="px-2 py-0.5 text-[10px] font-extrabold bg-indigo-50 text-indigo-700 rounded-full border border-indigo-200">
                      {unreadCount} Unread
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={handleMarkAllRead}
                    className="text-[11px] font-bold text-indigo-600 hover:text-indigo-800 hover:underline transition-all cursor-pointer"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              {/* Notification Items List */}
              <div className="mt-3 space-y-2 max-h-80 overflow-y-auto pr-1">
                {notifications.length === 0 ? (
                  <div className="py-8 text-center text-xs text-slate-400 font-semibold">
                    No new notifications
                  </div>
                ) : (
                  notifications.map((n) => (
                    <div
                      key={n._id}
                      onClick={() => handleNotificationClick(n)}
                      className={`p-3 rounded-xl border text-xs transition-all cursor-pointer flex items-start gap-3 ${
                        !n.isRead
                          ? 'bg-indigo-50/60 border-indigo-200 hover:bg-indigo-100/60'
                          : 'bg-slate-50 border-slate-200 hover:bg-slate-100/60'
                      }`}
                    >
                      <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg shrink-0 mt-0.5">
                        <AlertCircle className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1 mb-0.5">
                          <span className="font-extrabold text-slate-900 truncate">{n.title}</span>
                          {!n.isRead && (
                            <span className="w-2 h-2 rounded-full bg-indigo-600 shrink-0"></span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-600 leading-snug line-clamp-2">{n.message}</p>
                        <span className="text-[9px] font-bold text-slate-400 mt-1 block">
                          {new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {new Date(n.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

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

