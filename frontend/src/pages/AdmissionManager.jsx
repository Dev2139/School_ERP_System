import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useNotification } from '../context/NotificationContext';
import { UserPlus, CheckCircle2, Clock, XCircle } from 'lucide-react';

export default function AdmissionManager() {
  const [admissions, setAdmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToast } = useNotification();

  useEffect(() => {
    fetchAdmissions();
  }, []);

  const fetchAdmissions = async () => {
    setLoading(true);
    try {
      const res = await api.get('/admissions');
      if (res.data.success) setAdmissions(res.data.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const res = await api.put(`/admissions/${id}/status`, { status, remarks: `Status updated to ${status}` });
      if (res.data.success) {
        addToast(`Application status updated to ${status}`, 'success');
        fetchAdmissions();
      }
    } catch (err) {
      addToast('Status update failed', 'error');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Student Admission Pipeline</h1>
        <p className="text-sm text-slate-500">Track admission enquiries, application reviews, and approvals</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-100 uppercase text-[11px] font-bold text-slate-700">
              <tr>
                <th className="p-3">App #</th>
                <th className="p-3">Applicant Name</th>
                <th className="p-3">Parent Info</th>
                <th className="p-3">Class</th>
                <th className="p-3">Pipeline Status</th>
                <th className="p-3">Quick Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y text-xs font-semibold">
              {admissions.map((adm) => (
                <tr key={adm._id} className="hover:bg-slate-50">
                  <td className="p-3 font-mono text-indigo-600 font-bold">{adm.applicationNo}</td>
                  <td className="p-3 font-bold text-slate-900">{adm.studentFirstName} {adm.studentLastName}</td>
                  <td className="p-3">{adm.parentName} ({adm.parentEmail})</td>
                  <td className="p-3">{adm.targetClassId?.name || 'Class 7'}</td>
                  <td className="p-3">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold bg-amber-100 text-amber-800">
                      {adm.status}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => updateStatus(adm._id, 'approved')}
                        className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-[11px] font-bold shadow-xs"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => updateStatus(adm._id, 'rejected')}
                        className="px-2.5 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded text-[11px] font-bold shadow-xs"
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
