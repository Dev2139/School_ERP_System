import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import {
  Clock,
  Plus,
  CheckCircle2,
  XCircle,
  UserCheck,
  ShieldCheck,
  Users,
  User,
  Calendar,
  AlertCircle,
  ArrowRight,
  FileText,
} from 'lucide-react';
import Modal from '../components/Modal';

export default function LeaveManager() {
  const { user } = useAuth();
  const { addToast } = useNotification();

  const isPrincipal = ['super_admin', 'admin'].includes(user?.role);
  const isTeacher = user?.role === 'teacher';
  const isStudent = user?.role === 'student';

  // Active Tab for Teachers & Principal
  const [activeTab, setActiveTab] = useState(isTeacher ? 'student_approvals' : 'pending');

  // Leave Data State
  const [leavesData, setLeavesData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reason, setReason] = useState('');
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
  const [leaveType, setLeaveType] = useState('casual');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchLeaves();
  }, [user]);

  const fetchLeaves = async () => {
    setLoading(true);
    try {
      const res = await api.get('/leave');
      if (res.data.success) {
        setLeavesData(res.data.data);
      }
    } catch (e) {
      console.error(e);
      addToast('Failed to load leave applications', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleApplyLeave = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await api.post('/leave', {
        leaveType,
        startDate,
        endDate,
        reason,
      });
      if (res.data.success) {
        addToast(
          isStudent
            ? 'Leave request submitted to your Class Teacher for initial review!'
            : 'Leave request submitted to Principal!',
          'success'
        );
        setIsModalOpen(false);
        setReason('');
        fetchLeaves();
      }
    } catch (err) {
      addToast('Failed to submit leave request', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleStatusUpdate = async (id, status, comments = '') => {
    try {
      const res = await api.put(`/leave/${id}/status`, {
        status,
        reviewComments: comments || (isTeacher ? 'Reviewed by Class Teacher' : 'Reviewed by Principal'),
      });
      if (res.data.success) {
        addToast(
          isTeacher
            ? status === 'approved'
              ? 'Approved and forwarded to Principal for final sign-off!'
              : 'Student leave request rejected.'
            : `Leave request ${status}!`,
          'success'
        );
        fetchLeaves();
      }
    } catch (err) {
      addToast(err.response?.data?.message || 'Status update failed', 'error');
    }
  };

  // Helper status badge renderer
  const renderStatusBadge = (status) => {
    switch (status) {
      case 'pending_class_teacher':
        return (
          <span className="px-2.5 py-1 bg-amber-50 text-amber-800 border border-amber-200 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1 w-fit">
            <Clock className="w-3 h-3 text-amber-600" /> Pending Class Teacher
          </span>
        );
      case 'pending_principal':
        return (
          <span className="px-2.5 py-1 bg-sky-50 text-sky-800 border border-sky-200 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1 w-fit">
            <UserCheck className="w-3 h-3 text-sky-600" /> Approved by Teacher (Pending Principal)
          </span>
        );
      case 'approved':
        return (
          <span className="px-2.5 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1 w-fit">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Fully Approved
          </span>
        );
      case 'rejected':
        return (
          <span className="px-2.5 py-1 bg-rose-50 text-rose-800 border border-rose-200 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1 w-fit">
            <XCircle className="w-3 h-3 text-rose-600" /> Rejected
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-full text-[10px] font-bold uppercase">
            {status}
          </span>
        );
    }
  };

  // Derive datasets for Teacher view
  const teacherOwnLeaves = leavesData?.ownLeaves || [];
  const teacherStudentApprovals = leavesData?.studentLeavesForApproval || [];

  // Derive datasets for Principal view
  const allLeavesList = Array.isArray(leavesData) ? leavesData : [];
  const principalStudentApprovals = allLeavesList.filter(
    (l) => l.userRole === 'student' && l.status === 'pending_principal'
  );
  const principalTeacherApprovals = allLeavesList.filter(
    (l) => l.userRole !== 'student' && l.status === 'pending_principal'
  );
  const principalArchive = allLeavesList.filter(
    (l) => l.status === 'approved' || l.status === 'rejected'
  );

  return (
    <div className="space-y-6">
      {/* Top Banner Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl border border-indigo-100 shadow-xs">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-black text-slate-900 uppercase tracking-tight">
              {isPrincipal
                ? 'Multi-Tier Leave Management Portal'
                : isTeacher
                ? 'Class Teacher Leave Portal'
                : 'My Leave Applications'}
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              {isStudent
                ? 'Submit requests to your Class Teacher. Upon teacher approval, it advances to Principal for final sign-off.'
                : isTeacher
                ? 'Review and process leave requests for students in your section, or apply for personal leave.'
                : 'Review student leaves approved by Class Teachers and staff leave applications.'}
            </p>
          </div>
        </div>

        {/* Apply for Leave Button (Students and Teachers) */}
        {!isPrincipal && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl text-xs shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Apply for Leave</span>
          </button>
        )}
      </div>

      {/* TEACHER DASHBOARD TABS */}
      {isTeacher && (
        <div className="flex items-center gap-2 p-1.5 bg-slate-100 rounded-2xl border border-slate-200 w-fit">
          <button
            onClick={() => setActiveTab('student_approvals')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
              activeTab === 'student_approvals'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>Student Requests for My Class</span>
            {teacherStudentApprovals.filter((l) => l.status === 'pending_class_teacher').length > 0 && (
              <span className="px-2 py-0.5 bg-amber-500 text-white text-[10px] font-black rounded-full">
                {teacherStudentApprovals.filter((l) => l.status === 'pending_class_teacher').length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('own_leaves')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
              activeTab === 'own_leaves'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>My Personal Leaves ({teacherOwnLeaves.length})</span>
          </button>
        </div>
      )}

      {/* PRINCIPAL DASHBOARD TABS */}
      {isPrincipal && (
        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-100 rounded-2xl border border-slate-200">
          <button
            onClick={() => setActiveTab('pending_student')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
              activeTab === 'pending_student'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>Student Leaves (Class Teacher Approved)</span>
            {principalStudentApprovals.length > 0 && (
              <span className="px-2 py-0.5 bg-sky-600 text-white text-[10px] font-black rounded-full">
                {principalStudentApprovals.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('pending_teacher')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
              activeTab === 'pending_teacher'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Teacher Leave Requests</span>
            {principalTeacherApprovals.length > 0 && (
              <span className="px-2 py-0.5 bg-indigo-600 text-white text-[10px] font-black rounded-full">
                {principalTeacherApprovals.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('archive')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
              activeTab === 'archive'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Approved / Rejected History ({principalArchive.length})</span>
          </button>
        </div>
      )}

      {/* RENDER TABLE BASED ON ACTIVE VIEW */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-slate-400 font-bold text-xs">
            Loading leave applications...
          </div>
        ) : isStudent ? (
          /* STUDENT LEAVE TABLE */
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-100 text-[10px] font-black uppercase tracking-wider text-slate-400">
                <tr>
                  <th className="py-3 px-4">Leave Type</th>
                  <th className="py-3 px-4">Dates</th>
                  <th className="py-3 px-4">Reason</th>
                  <th className="py-3 px-4">Workflow Status</th>
                  <th className="py-3 px-4">Class Teacher Review</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                {leavesData.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-slate-400">
                      No leave applications submitted yet.
                    </td>
                  </tr>
                ) : (
                  leavesData.map((l) => (
                    <tr key={l._id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-3.5 px-4 uppercase font-extrabold text-indigo-600">{l.leaveType}</td>
                      <td className="py-3.5 px-4 font-mono font-bold">
                        {new Date(l.startDate).toLocaleDateString()} → {new Date(l.endDate).toLocaleDateString()}
                      </td>
                      <td className="py-3.5 px-4 text-slate-800 max-w-xs">{l.reason}</td>
                      <td className="py-3.5 px-4">{renderStatusBadge(l.status)}</td>
                      <td className="py-3.5 px-4 text-slate-500">
                        {l.classTeacherApproval?.status === 'approved' ? (
                          <span className="text-emerald-600 font-bold flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Approved by Teacher
                          </span>
                        ) : l.classTeacherApproval?.status === 'rejected' ? (
                          <span className="text-rose-600 font-bold flex items-center gap-1">
                            <XCircle className="w-3.5 h-3.5" /> Rejected by Teacher
                          </span>
                        ) : (
                          <span className="text-slate-400">Awaiting Class Teacher Review</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        ) : isTeacher ? (
          /* TEACHER VIEW: STUDENT APPROVALS VS PERSONAL LEAVES */
          activeTab === 'student_approvals' ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-100 text-[10px] font-black uppercase tracking-wider text-slate-400">
                  <tr>
                    <th className="py-3 px-4">Student Name</th>
                    <th className="py-3 px-4">Class & Section</th>
                    <th className="py-3 px-4">Dates</th>
                    <th className="py-3 px-4">Reason</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Class Teacher Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                  {teacherStudentApprovals.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-slate-400">
                        No student leave requests pending for your section.
                      </td>
                    </tr>
                  ) : (
                    teacherStudentApprovals.map((l) => (
                      <tr key={l._id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-3.5 px-4 font-black text-slate-900">
                          {l.studentId ? `${l.studentId.firstName} ${l.studentId.lastName}` : l.applicantName}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded-md text-[10px] font-bold">
                            {l.classId?.name || 'Class'} - {l.sectionId?.name || 'Sec'}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 font-mono font-bold">
                          {new Date(l.startDate).toLocaleDateString()} → {new Date(l.endDate).toLocaleDateString()}
                        </td>
                        <td className="py-3.5 px-4 text-slate-800 max-w-xs">{l.reason}</td>
                        <td className="py-3.5 px-4">{renderStatusBadge(l.status)}</td>
                        <td className="py-3.5 px-4 text-right">
                          {l.status === 'pending_class_teacher' ? (
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => handleStatusUpdate(l._id, 'approved', 'Approved by Class Teacher')}
                                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all cursor-pointer"
                              >
                                Approve & Forward to Principal
                              </button>
                              <button
                                onClick={() => handleStatusUpdate(l._id, 'rejected', 'Rejected by Class Teacher')}
                                className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all cursor-pointer"
                              >
                                Reject
                              </button>
                            </div>
                          ) : (
                            <span className="text-xs text-slate-400 font-bold">
                              {l.status === 'pending_principal'
                                ? 'Forwarded to Principal'
                                : 'Processed'}
                            </span>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            /* TEACHER PERSONAL LEAVES TABLE */
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-100 text-[10px] font-black uppercase tracking-wider text-slate-400">
                  <tr>
                    <th className="py-3 px-4">Leave Type</th>
                    <th className="py-3 px-4">Dates</th>
                    <th className="py-3 px-4">Reason</th>
                    <th className="py-3 px-4">Principal Approval Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                  {teacherOwnLeaves.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="py-12 text-center text-slate-400">
                        You have not submitted any personal leave requests.
                      </td>
                    </tr>
                  ) : (
                    teacherOwnLeaves.map((l) => (
                      <tr key={l._id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-3.5 px-4 uppercase font-extrabold text-indigo-600">{l.leaveType}</td>
                        <td className="py-3.5 px-4 font-mono font-bold">
                          {new Date(l.startDate).toLocaleDateString()} → {new Date(l.endDate).toLocaleDateString()}
                        </td>
                        <td className="py-3.5 px-4 text-slate-800 max-w-xs">{l.reason}</td>
                        <td className="py-3.5 px-4">{renderStatusBadge(l.status)}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )
        ) : (
          /* PRINCIPAL VIEW */
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-100 text-[10px] font-black uppercase tracking-wider text-slate-400">
                <tr>
                  <th className="py-3 px-4">Applicant</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4">Class / Section</th>
                  <th className="py-3 px-4">Dates</th>
                  <th className="py-3 px-4">Reason</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Principal Final Sign-Off</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                {(activeTab === 'pending_student'
                  ? principalStudentApprovals
                  : activeTab === 'pending_teacher'
                  ? principalTeacherApprovals
                  : principalArchive
                ).length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-slate-400">
                      No leave applications found in this view.
                    </td>
                  </tr>
                ) : (
                  (activeTab === 'pending_student'
                    ? principalStudentApprovals
                    : activeTab === 'pending_teacher'
                    ? principalTeacherApprovals
                    : principalArchive
                  ).map((l) => (
                    <tr key={l._id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-3.5 px-4 font-black text-slate-900">{l.applicantName}</td>
                      <td className="py-3.5 px-4 uppercase font-extrabold text-indigo-600">{l.userRole}</td>
                      <td className="py-3.5 px-4 text-slate-500">
                        {l.classId ? `${l.classId.name} - ${l.sectionId?.name || ''}` : 'N/A'}
                      </td>
                      <td className="py-3.5 px-4 font-mono font-bold">
                        {new Date(l.startDate).toLocaleDateString()} → {new Date(l.endDate).toLocaleDateString()}
                      </td>
                      <td className="py-3.5 px-4 text-slate-800 max-w-xs">{l.reason}</td>
                      <td className="py-3.5 px-4">{renderStatusBadge(l.status)}</td>
                      <td className="py-3.5 px-4 text-right">
                        {l.status === 'pending_principal' ? (
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleStatusUpdate(l._id, 'approved', 'Approved by Principal')}
                              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all cursor-pointer"
                            >
                              Final Approve
                            </button>
                            <button
                              onClick={() => handleStatusUpdate(l._id, 'rejected', 'Rejected by Principal')}
                              className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all cursor-pointer"
                            >
                              Reject
                            </button>
                          </div>
                        ) : (
                          <span className="text-xs text-slate-400 font-bold">Processed</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* APPLY FOR LEAVE MODAL */}
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Apply for Leave">
          <form onSubmit={handleApplyLeave} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Leave Type</label>
              <select
                value={leaveType}
                onChange={(e) => setLeaveType(e.target.value)}
                className="w-full px-3 py-2 border rounded-xl text-sm font-semibold bg-white focus:ring-2 focus:ring-indigo-500"
              >
                <option value="casual">Casual Leave</option>
                <option value="sick">Sick Leave</option>
                <option value="paid">Paid Leave</option>
                <option value="other">Other Reason</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Start Date</label>
                <input
                  type="date"
                  required
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl text-sm font-semibold focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">End Date</label>
                <input
                  type="date"
                  required
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl text-sm font-semibold focus:ring-2 focus:ring-indigo-500"
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
                placeholder="Explain the reason for your leave request..."
                className="w-full px-3 py-2 border rounded-xl text-sm font-semibold focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md shadow-indigo-600/20 transition-all disabled:opacity-50"
              >
                {submitting ? 'Submitting...' : 'Submit Leave Request'}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
