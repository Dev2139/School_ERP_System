import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { ShieldCheck, Clock, User } from 'lucide-react';

export default function AuditLogViewer() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const res = await api.get('/settings/audit-logs');
      if (res.data.success) setLogs(res.data.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">System Audit Logs</h1>
        <p className="text-sm text-slate-500">Security audit trail of user operations, grade edits, and fee recordings</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-100 uppercase text-[11px] font-bold text-slate-700">
              <tr>
                <th className="p-3">Timestamp</th>
                <th className="p-3">User</th>
                <th className="p-3">Role</th>
                <th className="p-3">Action</th>
                <th className="p-3">Entity</th>
                <th className="p-3">IP Address</th>
              </tr>
            </thead>
            <tbody className="divide-y text-xs font-semibold">
              {logs.map((l) => (
                <tr key={l._id} className="hover:bg-slate-50">
                  <td className="p-3 font-mono text-slate-400">{new Date(l.createdAt).toLocaleString()}</td>
                  <td className="p-3 font-bold text-slate-900">{l.userName}</td>
                  <td className="p-3 uppercase text-indigo-600 font-bold">{l.userRole}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded bg-slate-100 font-mono text-slate-800 border">
                      {l.action}
                    </span>
                  </td>
                  <td className="p-3 text-slate-700">{l.entity}</td>
                  <td className="p-3 font-mono text-slate-400">{l.ipAddress}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
