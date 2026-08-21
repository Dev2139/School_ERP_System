import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { Settings, Save, Shield, Lock, CheckCircle2 } from 'lucide-react';

export default function SettingsPage() {
  const { user } = useAuth();
  const { addToast } = useNotification();
  const isAdmin = ['super_admin', 'admin'].includes(user?.role);

  // School Settings State
  const [school, setSchool] = useState({
    name: 'Greenwood International School',
    code: 'GIS-2026',
    principalName: 'Dr. Eleanor Vance',
    email: 'info@greenwoodschool.edu',
    phone: '+1 (800) 555-0199',
    address: '123 Academic Boulevard',
    city: 'Metropolis',
    state: 'New York',
  });

  // Password Change State
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [changingPass, setChangingPass] = useState(false);

  useEffect(() => {
    if (isAdmin) {
      fetchSchool();
    }
  }, [user]);

  const fetchSchool = async () => {
    try {
      const res = await api.get('/settings/school');
      if (res.data.success && res.data.data) {
        setSchool(res.data.data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleSaveSchool = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put('/settings/school', school);
      if (res.data.success) {
        addToast('School settings updated successfully!', 'success');
      }
    } catch (err) {
      addToast('Failed to save settings', 'error');
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      addToast('New passwords do not match', 'error');
      return;
    }
    if (newPassword.length < 6) {
      addToast('Password must be at least 6 characters long', 'error');
      return;
    }

    setChangingPass(true);
    try {
      const res = await api.post('/auth/change-password', { oldPassword, newPassword });
      if (res.data.success) {
        addToast('Password changed successfully!', 'success');
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
      }
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to change password', 'error');
    } finally {
      setChangingPass(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Settings & Account Security</h1>
        <p className="text-sm text-slate-500">Manage account security and school administrative configurations</p>
      </div>

      {/* Account Security & Password Change (Available for ALL roles) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6">
        <div className="flex items-center gap-3 mb-4 pb-4 border-b border-slate-100">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-base">Account Password Security</h3>
            <p className="text-xs text-slate-400">Change your account login password anytime</p>
          </div>
        </div>

        <form onSubmit={handleChangePassword} className="space-y-4 max-w-lg">
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Current Password</label>
            <input
              type="password"
              required
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="Enter current password"
              className="w-full px-3 py-2 border rounded-xl text-sm font-semibold focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">New Password</label>
              <input
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Min 6 characters"
                className="w-full px-3 py-2 border rounded-xl text-sm font-semibold focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Confirm New Password</label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                className="w-full px-3 py-2 border rounded-xl text-sm font-semibold focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={changingPass}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-xs shadow-md shadow-indigo-600/20 transition-all disabled:opacity-50"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{changingPass ? 'Updating...' : 'Update Password'}</span>
            </button>
          </div>
        </form>
      </div>

      {/* School Configuration (Admin / Super Admin Only) */}
      {isAdmin && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6">
          <div className="flex items-center gap-3 mb-4 pb-4 border-b border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-base">School System Configuration</h3>
              <p className="text-xs text-slate-400">Manage school entity details, principal name, and contact details</p>
            </div>
          </div>

          <form onSubmit={handleSaveSchool} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">School Name</label>
                <input
                  type="text"
                  value={school.name}
                  onChange={(e) => setSchool({ ...school, name: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl text-sm font-semibold"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">School Code</label>
                <input
                  type="text"
                  value={school.code}
                  onChange={(e) => setSchool({ ...school, code: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl text-sm font-semibold font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Principal Name</label>
                <input
                  type="text"
                  value={school.principalName}
                  onChange={(e) => setSchool({ ...school, principalName: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl text-sm font-semibold"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Official Email</label>
                <input
                  type="email"
                  value={school.email}
                  onChange={(e) => setSchool({ ...school, email: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl text-sm font-semibold"
                />
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t">
              <button
                type="submit"
                className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-xs shadow-md shadow-indigo-600/20 transition-all"
              >
                <Save className="w-4 h-4" />
                <span>Save School Configuration</span>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
