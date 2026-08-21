import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { Clock, Plus, CheckCircle2, XCircle } from 'lucide-react';
import Modal from '../components/Modal';

export default function LeaveManager() {
  const { user } = useAuth();
  const { addToast } = useNotification();
  const isAdmin = ['super_admin', 'admin'].includes(user?.role);

  const [leaves, setLeaves] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reason, setReason] = useState('');
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    fetchLeaves();
  }, [user]);

  const fetchLeaves = async () => {
    try {
      const res = await api.get('/leave');
      if (res.data.success) setLeaves(res.data.data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleApplyLeave = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/leave', {
        leaveType: 'casual',
        startDate,
        endDate,
        reason,
      });
      if (res.data.success) {
        addToast('Leave request submitted successfully!', 'success');
        setIsModalOpen(false);
        setReason('');
        fetchLeaves();
      }
    } catch (err) {
      addToast('Failed to submit leave request', 'error');
    }
  };

  const handleStatus = async (id, status) => {
    try {
      const res = await api.put(`/leave/${id}/status`, { status, reviewComments: `Processed by ${user?.username}` });
      if (res.data.success) {
        addToast(`Leave request ${status}!`, 'success');
        fetchLeaves();
      }
    } catch (err) {
      addToast('Status update failed', 'error');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            {isAdmin ? 'Staff & Student Leave Applications' : 'My Leave Requests'}
          </h1>
          <p className="text-sm text-slate-500">
            {isAdmin
              ? 'Review and approve or reject leave applications submitted across the school'
              : 'Submit new leave requests and track review status'}
          </p>
        </div>

        {/* Hide Apply for Leave button for Admins */}
        {!isAdmin && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-xs shadow-md shadow-indigo-600/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Apply for Leave</span>
          </button>
        )}
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-100 uppercase text-[11px] font-bold text-slate-700">
              <tr>
                <th className="p-3">Applicant</th>
                <th className="p-3">Role</th>
                <th className="p-3">Dates</th>
                <th className="p-3">Reason</th>
                <th className="p-3">Status</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y text-xs font-semibold">
              {leaves.length > 0 ? (
                leaves.map((l) => (
                  <tr key={l._id} className="hover:bg-slate-50">
                    <td className="p-3 font-bold text-slate-900">{l.applicantName}</td>
                    <td className="p-3 uppercase font-bold text-indigo-600">{l.userRole}</td>
                    <td className="p-3">
                      {new Date(l.startDate).toLocaleDateString()} - {new Date(l.endDate).toLocaleDateString()}
                    </td>
                    <td className="p-3">{l.reason}</td>
                    <td className="p-3">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold ${
                          l.status === 'approved'
                            ? 'bg-emerald-100 text-emerald-800'
                            : l.status === 'rejected'
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {l.status}
                      </span>
                    </td>
                    <td className="p-3">
                      {isAdmin ? (
                        <div className="flex gap-1.5">
                          <button
                            onClick={() => handleStatus(l._id, 'approved')}
                            disabled={l.status === 'approved'}
                            className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold rounded-lg transition-all disabled:opacity-40"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleStatus(l._id, 'rejected')}
                            disabled={l.status === 'rejected'}
                            className="px-2.5 py-1 bg-rose-600 hover:bg-rose-700 text-white text-[10px] font-bold rounded-lg transition-all disabled:opacity-40"
                          >
                            Reject
                          </button>
                        </div>
                      ) : (
                        <span className="text-[10px] text-slate-400 font-normal">
                          {l.status === 'pending' ? 'Under Admin Review' : 'Processed'}
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-400">
                    No leave requests found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Non-Admin Apply Modal */}
      {!isAdmin && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Apply for Leave">
          <form onSubmit={handleApplyLeave} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Start Date</label>
                <input
                  type="date"
                  required
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">End Date</label>
                <input
                  type="date"
                  required
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Reason for Leave</label>
              <textarea
                rows={3}
                required
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Explain the reason for leave request..."
                className="w-full px-3 py-2 border rounded-xl text-sm"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 bg-slate-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md"
              >
                Submit Leave Request
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
