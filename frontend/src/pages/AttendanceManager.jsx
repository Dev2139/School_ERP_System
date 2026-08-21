import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { Calendar, CheckCircle2, XCircle, Clock, CheckCheck, Save, User } from 'lucide-react';

export default function AttendanceManager() {
  const { user } = useAuth();
  const isStudentOrParent = ['student', 'parent'].includes(user?.role);

  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  
  const [records, setRecords] = useState([]);
  const [studentInfo, setStudentInfo] = useState(null);
  const [isStudentView, setIsStudentView] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const { addToast } = useNotification();

  useEffect(() => {
    if (!isStudentOrParent) {
      fetchClasses();
    } else {
      fetchAttendance();
    }
  }, [user]);

  const fetchClasses = async () => {
    try {
      const res = await api.get('/academics/classes');
      if (res.data.success && res.data.data.length > 0) {
        setClasses(res.data.data);
        const cls = res.data.data[0];
        setSelectedClass(cls._id);
        setSelectedSection(cls.sections?.[0]?._id || '');
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!isStudentOrParent && selectedClass && selectedSection && selectedDate) {
      fetchAttendance();
    }
  }, [selectedClass, selectedSection, selectedDate]);

  const fetchAttendance = async () => {
    setLoading(true);
    try {
      let url = `/attendance`;
      if (!isStudentOrParent) {
        url += `?classId=${selectedClass}&sectionId=${selectedSection}&date=${selectedDate}`;
      }
      const res = await api.get(url);
      if (res.data.success) {
        setIsStudentView(res.data.isStudentView || false);
        if (res.data.isStudentView) {
          setStudentInfo(res.data.data.student);
          setRecords(res.data.data.records || []);
        } else {
          setRecords(res.data.data.records || []);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = (studentId, status) => {
    setRecords((prev) =>
      prev.map((r) => {
        const id = r.studentId?._id ? r.studentId._id.toString() : r.studentId?.toString();
        if (id === studentId.toString()) {
          return { ...r, status };
        }
        return r;
      })
    );
  };

  const bulkMarkPresent = () => {
    setRecords((prev) => prev.map((r) => ({ ...r, status: 'present' })));
    addToast('Marked all students as Present', 'info');
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const formattedRecords = records.map((r) => ({
        studentId: r.studentId._id || r.studentId,
        status: r.status,
        remark: r.remark || '',
      }));

      const clsObj = classes.find((c) => c._id === selectedClass);

      const res = await api.post('/attendance', {
        academicYearId: clsObj?.academicYearId || '60d0fe4f5311236168a109ca',
        classId: selectedClass,
        sectionId: selectedSection,
        date: selectedDate,
        records: formattedRecords,
      });

      if (res.data.success) {
        addToast('Attendance saved successfully!', 'success');
      }
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to save attendance', 'error');
    } finally {
      setSaving(false);
    }
  };

  // -------------------------------------------------------------
  // STUDENT / PARENT VIEW: Personal Attendance Log Only
  // -------------------------------------------------------------
  if (isStudentView || isStudentOrParent) {
    const totalDays = records.length;
    const presentCount = records.filter((r) => r.status === 'present').length;
    const absentCount = records.filter((r) => r.status === 'absent').length;
    const lateCount = records.filter((r) => r.status === 'late').length;
    const leaveCount = records.filter((r) => r.status === 'leave').length;
    const attendancePct = totalDays > 0 ? ((presentCount / totalDays) * 100).toFixed(1) : 100;

    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">My Attendance Record</h1>
          <p className="text-sm text-slate-500">Personal attendance logs and presence statistics</p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 bg-emerald-50 text-emerald-800 rounded-2xl border border-emerald-100 text-center">
            <div className="text-2xl font-extrabold">{presentCount}</div>
            <div className="text-xs font-semibold text-emerald-600">Days Present</div>
          </div>
          <div className="p-4 bg-rose-50 text-rose-800 rounded-2xl border border-rose-100 text-center">
            <div className="text-2xl font-extrabold">{absentCount}</div>
            <div className="text-xs font-semibold text-rose-600">Days Absent</div>
          </div>
          <div className="p-4 bg-amber-50 text-amber-800 rounded-2xl border border-amber-100 text-center">
            <div className="text-2xl font-extrabold">{lateCount}</div>
            <div className="text-xs font-semibold text-amber-600">Late</div>
          </div>
          <div className="p-4 bg-indigo-50 text-indigo-800 rounded-2xl border border-indigo-100 text-center">
            <div className="text-2xl font-extrabold">{attendancePct}%</div>
            <div className="text-xs font-semibold text-indigo-600">Presence Rate</div>
          </div>
        </div>

        {/* Personal Log Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex items-center justify-between">
            <h3 className="font-bold text-slate-800 text-sm">Attendance History Log</h3>
            {studentInfo && (
              <span className="text-xs font-semibold text-indigo-600">
                {studentInfo.name} (Adm: {studentInfo.admissionNumber})
              </span>
            )}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-100/70 text-slate-700 uppercase font-semibold text-[11px] border-b border-slate-200">
                <tr>
                  <th className="px-5 py-3.5">Date</th>
                  <th className="px-5 py-3.5">Status</th>
                  <th className="px-5 py-3.5">Remark</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td colSpan={3} className="px-5 py-8 text-center text-slate-400">Loading attendance history...</td>
                  </tr>
                ) : records.length > 0 ? (
                  records.map((r, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-5 py-3.5 font-semibold text-slate-900">
                        {new Date(r.date).toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}
                      </td>
                      <td className="px-5 py-3.5">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                            r.status === 'present'
                              ? 'bg-emerald-100 text-emerald-800'
                              : r.status === 'absent'
                              ? 'bg-rose-100 text-rose-800'
                              : r.status === 'late'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-sky-100 text-sky-800'
                          }`}
                        >
                          {r.status}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-xs text-slate-500">{r.remark || 'N/A'}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="px-5 py-8 text-center text-slate-400">No attendance records logged yet.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // ADMIN / TEACHER VIEW: Class Roster Attendance Marking Grid
  // -------------------------------------------------------------
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Attendance Manager</h1>
          <p className="text-sm text-slate-500">Record daily class presence for students</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={bulkMarkPresent}
            className="flex items-center gap-2 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs transition-all border border-slate-200"
          >
            <CheckCheck className="w-4 h-4 text-emerald-600" />
            <span>Mark All Present</span>
          </button>
          <button
            onClick={handleSave}
            disabled={saving || records.length === 0}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-xs shadow-md shadow-indigo-600/20 transition-all disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving...' : 'Save Attendance'}</span>
          </button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center gap-4">
        <div>
          <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Class</label>
          <select
            value={selectedClass}
            onChange={(e) => {
              setSelectedClass(e.target.value);
              const cls = classes.find((c) => c._id === e.target.value);
              setSelectedSection(cls?.sections?.[0]?._id || '');
            }}
            className="px-3 py-1.5 border rounded-xl text-sm font-semibold bg-white"
          >
            {classes.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Section</label>
          <select
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
            className="px-3 py-1.5 border rounded-xl text-sm font-semibold bg-white"
          >
            {classes
              .find((c) => c._id === selectedClass)
              ?.sections?.map((s) => (
                <option key={s._id} value={s._id}>
                  {s.name}
                </option>
              ))}
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Date</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-3 py-1.5 border rounded-xl text-sm font-semibold bg-white"
          />
        </div>
      </div>

      {/* Attendance Grid Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-100/70 text-slate-700 uppercase font-semibold text-[11px] border-b border-slate-200">
              <tr>
                <th className="px-5 py-3.5">Roll #</th>
                <th className="px-5 py-3.5">Student Name</th>
                <th className="px-5 py-3.5">Admission #</th>
                <th className="px-5 py-3.5 text-center">Attendance Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-5 py-8 text-center text-slate-400">Loading student roster...</td>
                </tr>
              ) : records.length > 0 ? (
                records.map((row) => {
                  const s = row.studentId;
                  if (!s) return null;
                  const sId = s._id ? s._id.toString() : s.toString();
                  return (
                    <tr key={sId} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-5 py-3.5 font-bold text-slate-700">{s.rollNumber || '#'}</td>
                      <td className="px-5 py-3.5 font-semibold text-slate-900">
                        {s.firstName} {s.lastName}
                      </td>
                      <td className="px-5 py-3.5 text-xs text-slate-400 font-mono">{s.admissionNumber || 'N/A'}</td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center justify-center gap-1.5">
                          {[
                            { id: 'present', label: 'Present', color: 'bg-emerald-600 text-white shadow-xs' },
                            { id: 'absent', label: 'Absent', color: 'bg-rose-600 text-white shadow-xs' },
                            { id: 'late', label: 'Late', color: 'bg-amber-500 text-white shadow-xs' },
                            { id: 'leave', label: 'Leave', color: 'bg-sky-600 text-white shadow-xs' },
                          ].map((st) => (
                            <button
                              key={st.id}
                              type="button"
                              onClick={() => handleStatusChange(sId, st.id)}
                              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all border ${
                                row.status === st.id ? st.color : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                              }`}
                            >
                              {st.label}
                            </button>
                          ))}
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={4} className="px-5 py-8 text-center text-slate-400">No students found in selected class & section.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
