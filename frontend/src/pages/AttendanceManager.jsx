import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import {
  Calendar,
  CheckCircle2,
  XCircle,
  Clock,
  CheckCheck,
  Save,
  User,
  ShieldCheck,
  UserCheck,
  GraduationCap,
  AlertCircle,
  Users,
  Award,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

export default function AttendanceManager() {
  const { user } = useAuth();
  const { addToast } = useNotification();

  const isPrincipal = ['super_admin', 'admin'].includes(user?.role);
  const isTeacher = user?.role === 'teacher';
  const isStudentOrParent = ['student', 'parent'].includes(user?.role);

  const teacherProfileId = (user?.profileId?._id || user?.profileId || user?.profile?._id || '').toString();
  const teacherEmail = (user?.email || '').toLowerCase().trim();

  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  // Class Teacher Metadata for Teachers
  const [assignedClassTeacherInfo, setAssignedClassTeacherInfo] = useState(null);
  const [isNotClassTeacher, setIsNotClassTeacher] = useState(false);

  const [records, setRecords] = useState([]);
  const [studentInfo, setStudentInfo] = useState(null);
  const [isStudentView, setIsStudentView] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

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
        const classData = res.data.data;
        setClasses(classData);

        if (isTeacher) {
          // Robust Class Teacher matching by ID or Email
          let matchedClass = null;
          let matchedSection = null;

          for (const c of classData) {
            if (c.sections) {
              for (const s of c.sections) {
                const ctObj = s.classTeacher;
                const ctId = (ctObj?._id || ctObj || '').toString();
                const ctEmail = (ctObj?.email || '').toLowerCase().trim();

                const isIdMatch = teacherProfileId && ctId === teacherProfileId;
                const isEmailMatch = teacherEmail && ctEmail === teacherEmail;

                if (isIdMatch || isEmailMatch) {
                  matchedClass = c;
                  matchedSection = s;
                  break;
                }
              }
            }
            if (matchedClass) break;
          }

          if (matchedClass && matchedSection) {
            setSelectedClass(matchedClass._id);
            setSelectedSection(matchedSection._id);
            setAssignedClassTeacherInfo({
              className: matchedClass.name,
              sectionName: matchedSection.name,
            });
            setIsNotClassTeacher(false);
          } else {
            setIsNotClassTeacher(true);
          }
        } else if (isPrincipal) {
          const cls = classData[0];
          setSelectedClass(cls._id);
          setSelectedSection(cls.sections?.[0]?._id || '');
        }
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
    addToast('Marked all students as Present!', 'success');
  };

  const bulkMarkAbsent = () => {
    setRecords((prev) => prev.map((r) => ({ ...r, status: 'absent' })));
    addToast('Marked all students as Absent', 'info');
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
        addToast('Class Attendance saved successfully!', 'success');
      }
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to save attendance', 'error');
    } finally {
      setSaving(false);
    }
  };

  // Live Summary Metrics
  const totalStudents = records.length;
  const presentCount = records.filter((r) => r.status === 'present').length;
  const absentCount = records.filter((r) => r.status === 'absent').length;
  const lateCount = records.filter((r) => r.status === 'late').length;
  const leaveCount = records.filter((r) => r.status === 'leave').length;
  const presencePercentage = totalStudents > 0 ? ((presentCount / totalStudents) * 100).toFixed(1) : 100;

  const selectedClassObj = classes.find((c) => c._id === selectedClass);
  const selectedSectionObj = selectedClassObj?.sections?.find((s) => s._id === selectedSection);

  // -------------------------------------------------------------
  // STUDENT / PARENT VIEW: Personal Attendance Log Only
  // -------------------------------------------------------------
  if (isStudentView || isStudentOrParent) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl border border-indigo-100">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-black text-slate-900 uppercase tracking-tight">My Class Attendance Log</h1>
              <p className="text-xs text-slate-500 font-medium">Personal attendance presence rate and historical records</p>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-5 bg-emerald-50 text-emerald-800 rounded-3xl border border-emerald-200 text-center">
            <div className="text-3xl font-black">{presentCount}</div>
            <div className="text-xs font-bold text-emerald-600 uppercase tracking-wider mt-1">Days Present</div>
          </div>
          <div className="p-5 bg-rose-50 text-rose-800 rounded-3xl border border-rose-200 text-center">
            <div className="text-3xl font-black">{absentCount}</div>
            <div className="text-xs font-bold text-rose-600 uppercase tracking-wider mt-1">Days Absent</div>
          </div>
          <div className="p-5 bg-amber-50 text-amber-800 rounded-3xl border border-amber-200 text-center">
            <div className="text-3xl font-black">{lateCount}</div>
            <div className="text-xs font-bold text-amber-600 uppercase tracking-wider mt-1">Late Arrivals</div>
          </div>
          <div className="p-5 bg-indigo-50 text-indigo-800 rounded-3xl border border-indigo-200 text-center">
            <div className="text-3xl font-black">{presencePercentage}%</div>
            <div className="text-xs font-bold text-indigo-600 uppercase tracking-wider mt-1">Presence Rate</div>
          </div>
        </div>

        {/* Personal Log Table */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
            <h3 className="font-extrabold text-slate-800 text-xs uppercase tracking-wider">Attendance Log History</h3>
            {studentInfo && (
              <span className="text-xs font-bold text-indigo-600">
                {studentInfo.name} (Roll #{studentInfo.rollNumber})
              </span>
            )}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-100/70 text-slate-700 uppercase font-black text-[10px] border-b border-slate-200">
                <tr>
                  <th className="px-5 py-3.5">Date</th>
                  <th className="px-5 py-3.5">Status</th>
                  <th className="px-5 py-3.5">Remark</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-semibold">
                {loading ? (
                  <tr>
                    <td colSpan={3} className="px-5 py-8 text-center text-slate-400">Loading attendance history...</td>
                  </tr>
                ) : records.length > 0 ? (
                  records.map((r, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-5 py-3.5 font-extrabold text-slate-900 font-mono">
                        {new Date(r.date).toLocaleDateString('en-GB', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}
                      </td>
                      <td className="px-5 py-3.5">
                        <span
                          className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
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
                      <td className="px-5 py-3.5 text-slate-500">{r.remark || 'N/A'}</td>
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
  // TEACHER NOT ASSIGNED AS CLASS TEACHER NOTICE
  // -------------------------------------------------------------
  if (isTeacher && isNotClassTeacher) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl border border-amber-100">
              <UserCheck className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-black text-slate-900 uppercase tracking-tight">Class Attendance Manager</h1>
              <p className="text-xs text-slate-500 font-medium">Daily Class Attendance is managed strictly by designated Class Teachers.</p>
            </div>
          </div>
        </div>

        <div className="bg-amber-50/60 border-2 border-amber-200 rounded-3xl p-8 text-center space-y-4 max-w-2xl mx-auto shadow-xs">
          <div className="w-16 h-16 bg-amber-100 text-amber-700 rounded-3xl flex items-center justify-center mx-auto shadow-inner">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-lg font-black text-amber-900 uppercase tracking-tight">
              Class Teacher Attendance Scope
            </h2>
            <p className="text-xs font-semibold text-amber-800 max-w-lg mx-auto mt-2 leading-relaxed">
              You are currently not assigned as the designated <span className="font-black text-amber-950">Class Teacher</span> for any active section.
              Daily class attendance is taken by designated Class Teachers during morning homeroom.
            </p>
          </div>
          <div className="pt-2">
            <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-600 text-white font-extrabold rounded-2xl text-xs shadow-md">
              <Sparkles className="w-4 h-4" /> Contact Principal for Class Teacher Assignment
            </span>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // ADMIN / CLASS TEACHER VIEW: 1-CLICK FAST ATTENDANCE MARKING
  // -------------------------------------------------------------
  return (
    <div className="space-y-6">
      {/* Top Banner Toolbar */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl border border-emerald-100">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-black text-slate-900 uppercase tracking-tight">
                  {isTeacher ? 'CLASS TEACHER DAILY ATTENDANCE' : 'SCHOOL ATTENDANCE MANAGER'}
                </h1>
                {assignedClassTeacherInfo && (
                  <span className="px-3 py-1 bg-emerald-600 text-white text-[10px] font-black rounded-full uppercase tracking-wider shadow-xs">
                    ⭐ Class Teacher: {assignedClassTeacherInfo.className} - {assignedClassTeacherInfo.sectionName}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                {isTeacher
                  ? `Locked to your assigned section (${assignedClassTeacherInfo?.className} - ${assignedClassTeacherInfo?.sectionName}). Tap to toggle student status.`
                  : 'Principal Mode: Select any class and section to review or record attendance.'}
              </p>
            </div>
          </div>

          {/* Quick 1-Click Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={bulkMarkPresent}
              className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-2xl text-xs shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
            >
              <CheckCheck className="w-4 h-4" />
              <span>Mark All Present</span>
            </button>
            <button
              onClick={bulkMarkAbsent}
              className="flex items-center gap-2 px-4 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 font-extrabold rounded-2xl text-xs border border-rose-200 transition-all cursor-pointer"
            >
              <XCircle className="w-4 h-4 text-rose-600" />
              <span>Mark All Absent</span>
            </button>
          </div>
        </div>

        {/* Filter Controls & Class Info */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {isPrincipal ? (
            /* PRINCIPAL ROLE: Full Class & Section Selectors */
            <div className="flex flex-wrap items-center gap-3">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Select Class</label>
                <select
                  value={selectedClass}
                  onChange={(e) => {
                    setSelectedClass(e.target.value);
                    const cls = classes.find((c) => c._id === e.target.value);
                    setSelectedSection(cls?.sections?.[0]?._id || '');
                  }}
                  className="px-3.5 py-2 border rounded-xl text-xs font-bold bg-white text-slate-800 focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                >
                  {classes.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Select Section</label>
                <select
                  value={selectedSection}
                  onChange={(e) => setSelectedSection(e.target.value)}
                  className="px-3.5 py-2 border rounded-xl text-xs font-bold bg-white text-slate-800 focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                >
                  {selectedClassObj?.sections?.map((s) => (
                    <option key={s._id} value={s._id}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Attendance Date</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="px-3 py-1.5 border rounded-xl text-xs font-bold bg-white text-slate-800"
                />
              </div>
            </div>
          ) : (
            /* CLASS TEACHER ROLE: Locked Class Info Badge */
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-2xl">
                <UserCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <div className="text-[10px] font-extrabold uppercase text-emerald-600 tracking-wider">Assigned Section</div>
                  <div className="text-xs font-black text-slate-900">
                    {selectedClassObj?.name || assignedClassTeacherInfo?.className} - {selectedSectionObj?.name || assignedClassTeacherInfo?.sectionName}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Attendance Date</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="px-3 py-1.5 border rounded-xl text-xs font-bold bg-white text-slate-800 cursor-pointer"
                />
              </div>
            </div>
          )}

          {/* Save Attendance Submit Action */}
          <button
            onClick={handleSave}
            disabled={saving || records.length === 0}
            className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-2xl text-xs shadow-lg shadow-indigo-600/30 transition-all disabled:opacity-50 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving Today\'s Attendance...' : 'Save Today\'s Attendance'}</span>
          </button>
        </div>
      </div>

      {/* LIVE ATTENDANCE SUMMARY METRICS HEADER */}
      <div className="grid grid-cols-2 sm:grid-cols-6 gap-3">
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs text-center">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Roster</span>
          <span className="text-xl font-black text-slate-900 mt-0.5 block">{totalStudents}</span>
        </div>
        <div className="p-4 bg-emerald-50/70 rounded-2xl border border-emerald-200 text-center">
          <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block">Present</span>
          <span className="text-xl font-black text-emerald-800 mt-0.5 block">{presentCount}</span>
        </div>
        <div className="p-4 bg-rose-50/70 rounded-2xl border border-rose-200 text-center">
          <span className="text-[10px] font-bold text-rose-700 uppercase tracking-wider block">Absent</span>
          <span className="text-xl font-black text-rose-800 mt-0.5 block">{absentCount}</span>
        </div>
        <div className="p-4 bg-amber-50/70 rounded-2xl border border-amber-200 text-center">
          <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider block">Late</span>
          <span className="text-xl font-black text-amber-800 mt-0.5 block">{lateCount}</span>
        </div>
        <div className="p-4 bg-sky-50/70 rounded-2xl border border-sky-200 text-center">
          <span className="text-[10px] font-bold text-sky-700 uppercase tracking-wider block">Leave</span>
          <span className="text-xl font-black text-sky-800 mt-0.5 block">{leaveCount}</span>
        </div>
        <div className="p-4 bg-indigo-50/70 rounded-2xl border border-indigo-200 text-center">
          <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-wider block">Presence %</span>
          <span className="text-xl font-black text-indigo-900 mt-0.5 block">{presencePercentage}%</span>
        </div>
      </div>

      {/* ATTENDANCE ROSTER GRID */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-xs font-black uppercase text-slate-800 tracking-wider flex items-center gap-2">
            <Users className="w-4 h-4 text-indigo-600" />
            <span>Class Student Roster ({selectedClassObj?.name || assignedClassTeacherInfo?.className} - {selectedSectionObj?.name || assignedClassTeacherInfo?.sectionName})</span>
          </h2>
          <span className="text-xs text-slate-400 font-semibold">Tap status pill to toggle presence</span>
        </div>

        {loading ? (
          <div className="p-12 text-center text-slate-400 font-bold text-xs">Loading class student roster...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-100 text-[10px] font-black uppercase tracking-wider text-slate-400">
                <tr>
                  <th className="py-3 px-4">Roll #</th>
                  <th className="py-3 px-4">Student Name</th>
                  <th className="py-3 px-4">Admission #</th>
                  <th className="py-3 px-4 text-center">Tap to Toggle Attendance Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                {records.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-12 text-center text-slate-400">
                      No students enrolled in this section yet.
                    </td>
                  </tr>
                ) : (
                  records.map((row) => {
                    const s = row.studentId;
                    if (!s) return null;
                    const sId = s._id ? s._id.toString() : s.toString();

                    return (
                      <tr key={sId} className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-3.5 px-4 font-black text-indigo-600 font-mono text-sm">
                          #{s.rollNumber || '0'}
                        </td>
                        <td className="py-3.5 px-4 font-black text-slate-900 text-sm">
                          {s.firstName} {s.lastName}
                        </td>
                        <td className="py-3.5 px-4 font-mono text-slate-400 text-xs">
                          {s.admissionNumber || 'N/A'}
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="flex items-center justify-center gap-2">
                            {[
                              { id: 'present', label: 'Present', activeColor: 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20' },
                              { id: 'absent', label: 'Absent', activeColor: 'bg-rose-600 text-white shadow-md shadow-rose-600/20' },
                              { id: 'late', label: 'Late', activeColor: 'bg-amber-500 text-white shadow-md shadow-amber-500/20' },
                              { id: 'leave', label: 'Leave', activeColor: 'bg-sky-600 text-white shadow-md shadow-sky-600/20' },
                            ].map((st) => {
                              const isSelected = row.status === st.id;
                              return (
                                <button
                                  key={st.id}
                                  type="button"
                                  onClick={() => handleStatusChange(sId, st.id)}
                                  className={`px-4 py-2 rounded-2xl text-xs font-black transition-all border cursor-pointer ${
                                    isSelected
                                      ? st.activeColor
                                      : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100 hover:text-slate-800'
                                  }`}
                                >
                                  {st.label}
                                </button>
                              );
                            })}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
