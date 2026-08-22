import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useNotification } from '../context/NotificationContext';
import Modal from '../components/Modal';
import {
  UserPlus,
  CheckCircle2,
  Clock,
  XCircle,
  Plus,
  Building,
  GraduationCap,
  Sparkles,
  Phone,
  Mail,
  User,
  ShieldCheck,
  CheckCheck,
} from 'lucide-react';

export default function AdmissionManager() {
  const [admissions, setAdmissions] = useState([]);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToast } = useNotification();

  // Modal State
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [form, setForm] = useState({
    studentFirstName: '',
    studentLastName: '',
    dob: '2013-05-15',
    gender: 'male',
    targetClassId: '',
    targetSectionId: '',
    parentName: '',
    parentEmail: '',
    parentPhone: '',
    address: '123 Greenwood Enclave',
    previousSchool: 'St. Xavier Public School',
  });

  useEffect(() => {
    fetchAdmissions();
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const res = await api.get('/academics/classes');
      if (res.data.success && res.data.data.length > 0) {
        setClasses(res.data.data);
        const firstCls = res.data.data[0];
        setForm((prev) => ({
          ...prev,
          targetClassId: firstCls._id,
          targetSectionId: firstCls.sections?.[0]?._id || '',
        }));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchAdmissions = async () => {
    setLoading(true);
    try {
      const res = await api.get('/admissions');
      if (res.data.success) setAdmissions(res.data.data || []);
    } catch (e) {
      console.error(e);
      addToast('Failed to load admissions pipeline', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleClassChange = (classId) => {
    const cls = classes.find((c) => c._id === classId);
    setForm((prev) => ({
      ...prev,
      targetClassId: classId,
      targetSectionId: cls?.sections?.[0]?._id || '',
    }));
  };

  const handleSubmitApplication = async (e) => {
    e.preventDefault();
    if (!form.studentFirstName || !form.studentLastName || !form.targetClassId) {
      addToast('Please fill all required fields', 'error');
      return;
    }

    setSubmitting(true);
    try {
      const res = await api.post('/admissions', form);
      if (res.data.success) {
        addToast('New student admission application submitted successfully!', 'success');
        setIsNewModalOpen(false);
        fetchAdmissions();
        setForm({
          studentFirstName: '',
          studentLastName: '',
          dob: '2013-05-15',
          gender: 'male',
          targetClassId: classes[0]?._id || '',
          targetSectionId: classes[0]?.sections?.[0]?._id || '',
          parentName: '',
          parentEmail: '',
          parentPhone: '',
          address: '123 Greenwood Enclave',
          previousSchool: '',
        });
      }
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to submit application', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const res = await api.put(`/admissions/${id}/status`, { status });
      if (res.data.success) {
        addToast(res.data.message || `Application status updated to ${status}`, 'success');
        fetchAdmissions();
      }
    } catch (err) {
      addToast(err.response?.data?.message || 'Status update failed', 'error');
    }
  };

  const selectedClassObj = classes.find((c) => c._id === form.targetClassId);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl border border-indigo-100 shadow-xs">
            <UserPlus className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-black text-slate-900 uppercase tracking-tight">Student Admission Pipeline</h1>
            <p className="text-xs text-slate-500 font-medium">
              Track admission enquiries, review applicant details, and approve students directly into class rosters.
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsNewModalOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold rounded-2xl text-xs shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New Admission Application</span>
        </button>
      </div>

      {/* Admissions Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-xs font-black text-slate-800 uppercase tracking-wider">Admission Applications Ledger</h2>
          <span className="text-xs text-slate-400 font-semibold">{admissions.length} Total Applicants</span>
        </div>

        {loading ? (
          <div className="p-12 text-center text-slate-400 font-bold text-xs">Loading admission pipeline...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-100 text-[10px] font-black uppercase tracking-wider text-slate-400">
                <tr>
                  <th className="py-3 px-4">App #</th>
                  <th className="py-3 px-4">Applicant Name</th>
                  <th className="py-3 px-4">Target Class & Section</th>
                  <th className="py-3 px-4">Parent Info</th>
                  <th className="py-3 px-4">Pipeline Status</th>
                  <th className="py-3 px-4">Applied Date</th>
                  <th className="py-3 px-4 text-right">Quick Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                {admissions.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-slate-400">
                      No admission applications found. Click "New Admission Application" to register an applicant.
                    </td>
                  </tr>
                ) : (
                  admissions.map((adm) => (
                    <tr key={adm._id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-indigo-600">{adm.applicationNo}</td>
                      <td className="py-3.5 px-4 font-black text-slate-900 text-sm">
                        {adm.studentFirstName} {adm.studentLastName}
                        <span className="block text-[10px] text-slate-400 font-medium capitalize">{adm.gender || 'student'}</span>
                      </td>
                      <td className="py-3.5 px-4 font-bold text-slate-800">
                        {adm.targetClassId?.name || 'Class'}
                        {adm.targetSectionId?.name ? ` - ${adm.targetSectionId.name}` : ''}
                      </td>
                      <td className="py-3.5 px-4 text-slate-600">
                        <p className="font-extrabold text-slate-800">{adm.parentName}</p>
                        <p className="text-[10px] text-slate-400 font-mono">{adm.parentEmail} • {adm.parentPhone}</p>
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                            adm.status === 'approved' || adm.status === 'admitted'
                              ? 'bg-emerald-100 text-emerald-800'
                              : adm.status === 'rejected'
                              ? 'bg-rose-100 text-rose-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {adm.status === 'approved' ? 'Approved & Enrolled' : adm.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-400 font-mono">
                        {new Date(adm.createdAt).toLocaleDateString('en-GB')}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        {adm.status === 'approved' || adm.status === 'admitted' ? (
                          <span className="text-[10px] font-extrabold text-emerald-600 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl inline-flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Enrolled in Roster
                          </span>
                        ) : (
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => updateStatus(adm._id, 'approved')}
                              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-600/20 transition-all cursor-pointer flex items-center gap-1"
                              title="Approve Application and Enroll into Student Directory"
                            >
                              <CheckCheck className="w-3.5 h-3.5" /> Approve & Enroll
                            </button>
                            <button
                              onClick={() => updateStatus(adm._id, 'rejected')}
                              className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-xl text-xs font-bold border border-rose-200 transition-all cursor-pointer flex items-center gap-1"
                            >
                              <XCircle className="w-3.5 h-3.5" /> Reject
                            </button>
                          </div>
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

      {/* NEW ADMISSION APPLICATION MODAL */}
      {isNewModalOpen && (
        <Modal isOpen={isNewModalOpen} onClose={() => setIsNewModalOpen(false)} title="New Student Admission Application">
          <form onSubmit={handleSubmitApplication} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Student First Name *</label>
                <input
                  type="text"
                  required
                  value={form.studentFirstName}
                  onChange={(e) => setForm({ ...form, studentFirstName: e.target.value })}
                  placeholder="e.g. Oliver"
                  className="w-full px-3 py-2 border rounded-xl text-sm font-semibold focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Student Last Name *</label>
                <input
                  type="text"
                  required
                  value={form.studentLastName}
                  onChange={(e) => setForm({ ...form, studentLastName: e.target.value })}
                  placeholder="e.g. Twist"
                  className="w-full px-3 py-2 border rounded-xl text-sm font-semibold focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Target Class *</label>
                <select
                  required
                  value={form.targetClassId}
                  onChange={(e) => handleClassChange(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl text-sm font-semibold bg-white focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">-- Select Class --</option>
                  {classes.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Target Section *</label>
                <select
                  required
                  value={form.targetSectionId}
                  onChange={(e) => setForm({ ...form, targetSectionId: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl text-sm font-semibold bg-white focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">-- Select Section --</option>
                  {selectedClassObj?.sections?.map((s) => (
                    <option key={s._id} value={s._id}>
                      {s.name} (Room {s.roomNo || '101'})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Gender</label>
                <select
                  value={form.gender}
                  onChange={(e) => setForm({ ...form, gender: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl text-sm font-semibold bg-white focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Date of Birth</label>
                <input
                  type="date"
                  required
                  value={form.dob}
                  onChange={(e) => setForm({ ...form, dob: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl text-sm font-semibold focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="border-t pt-3 space-y-3">
              <span className="text-xs font-black text-slate-700 uppercase tracking-wider block">Parent / Guardian Information</span>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Parent Name *</label>
                  <input
                    type="text"
                    required
                    value={form.parentName}
                    onChange={(e) => setForm({ ...form, parentName: e.target.value })}
                    placeholder="e.g. Charles Dickens"
                    className="w-full px-3 py-2 border rounded-xl text-xs font-semibold focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Parent Email *</label>
                  <input
                    type="email"
                    required
                    value={form.parentEmail}
                    onChange={(e) => setForm({ ...form, parentEmail: e.target.value })}
                    placeholder="e.g. charles@example.com"
                    className="w-full px-3 py-2 border rounded-xl text-xs font-semibold focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Parent Phone *</label>
                  <input
                    type="text"
                    required
                    value={form.parentPhone}
                    onChange={(e) => setForm({ ...form, parentPhone: e.target.value })}
                    placeholder="e.g. +91 9876543210"
                    className="w-full px-3 py-2 border rounded-xl text-xs font-semibold focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Residential Address</label>
              <textarea
                rows="2"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                className="w-full px-3 py-2 border rounded-xl text-xs font-semibold focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t">
              <button
                type="button"
                onClick={() => setIsNewModalOpen(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs shadow-md shadow-indigo-600/20 transition-all disabled:opacity-50 cursor-pointer"
              >
                {submitting ? 'Submitting Application...' : 'Submit Application'}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
