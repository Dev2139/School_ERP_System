import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import Modal from '../components/Modal';
import { Clock, Calendar, Shield, GraduationCap, CheckCircle2, AlertCircle, Plus, Edit3, UserCheck, BookOpen, Save, AlertTriangle } from 'lucide-react';

export default function TimetableManager() {
  const { user } = useAuth();
  const { addToast } = useNotification();

  const isPrincipal = user?.role === 'admin';
  const isTeacher = user?.role === 'teacher';
  const isStudent = user?.role === 'student';

  const [classes, setClasses] = useState([]);
  const [teachersList, setTeachersList] = useState([]);
  const [subjectsList, setSubjectsList] = useState([]);
  const [allowedClasses, setAllowedClasses] = useState([]);
  const [teacherProfileId, setTeacherProfileId] = useState('');
  const [conflictWarning, setConflictWarning] = useState(null);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [currentDate, setCurrentDate] = useState('2026-08-20');
  const [timetable, setTimetable] = useState(null);
  const [attendanceMap, setAttendanceMap] = useState({});
  const [loading, setLoading] = useState(false);
  const [savingSlot, setSavingSlot] = useState(false);

  // Edit Slot Modal State for Principal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [slotForm, setSlotForm] = useState({
    day: 'Monday',
    periodNumber: 1,
    timeLabel: '09:15 AM to 10:15 AM',
    subjectId: '',
    teacherId: '',
    classroom: 'Room 101',
  });

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      const classRes = await api.get('/academics/classes');
      if (classRes.data.success && classRes.data.data.length > 0) {
        setClasses(classRes.data.data);
        const cls = classRes.data.data[0];
        if (isPrincipal) {
          setSelectedClass(cls._id);
          setSelectedSection(cls.sections?.[0]?._id || '');
        }
      }

      if (isPrincipal) {
        const teacherRes = await api.get('/teachers');
        if (teacherRes.data.success) {
          setTeachersList(teacherRes.data.data);
        }

        const subjRes = await api.get('/academics/subjects');
        if (subjRes.data.success) {
          setSubjectsList(subjRes.data.data);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (selectedClass && selectedSection) {
      fetchTimetable();
      fetchWeekAttendance();
    } else if (isTeacher || isStudent) {
      fetchTimetable();
    }
  }, [selectedClass, selectedSection, currentDate]);

  const fetchTimetable = async () => {
    setLoading(true);
    try {
      let url = '/timetable';
      if (selectedClass && selectedSection) {
        url += `?classId=${selectedClass}&sectionId=${selectedSection}`;
      }
      const res = await api.get(url);
      if (res.data.success) {
        setTimetable(res.data.data);
        if (res.data.teacherProfileId) {
          setTeacherProfileId(res.data.teacherProfileId);
        }
        if (res.data.allowedClasses) {
          setAllowedClasses(res.data.allowedClasses);
          if (res.data.allowedClasses.length > 0 && !selectedClass) {
            const first = res.data.allowedClasses[0];
            setSelectedClass(first.classId?._id || first.classId);
            setSelectedSection(first.sectionId?._id || first.sectionId);
          }
        }
        if (res.data.data?.classId && !selectedClass) {
          setSelectedClass(res.data.data.classId._id || res.data.data.classId);
        }
        if (res.data.data?.sectionId && !selectedSection) {
          setSelectedSection(res.data.data.sectionId._id || res.data.data.sectionId);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchWeekAttendance = async () => {
    try {
      const attMap = {};
      if (isStudent) {
        const res = await api.get('/attendance');
        if (res.data.success && res.data.data?.records) {
          res.data.data.records.forEach((r) => {
            if (r.date) {
              const dStr = new Date(r.date).toISOString().split('T')[0];
              attMap[dStr] = r.status;
            }
          });
        }
      } else if (selectedClass && selectedSection) {
        for (const w of weekDays) {
          try {
            const res = await api.get(`/attendance?classId=${selectedClass}&sectionId=${selectedSection}&date=${w.dateStr}`);
            if (res.data.success && res.data.data) {
              attMap[w.dateStr] = 'filled';
            }
          } catch (e) {
            // No attendance logged for date
          }
        }
      }
      setAttendanceMap(attMap);
    } catch (err) {
      console.error(err);
    }
  };

  // Compute Monday - Friday dates
  const getWeekDates = (baseDateStr) => {
    const base = new Date(baseDateStr);
    const dayOfWeek = base.getDay();
    const distanceToMon = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;

    const mon = new Date(base);
    mon.setDate(base.getDate() + distanceToMon);

    const week = [];
    const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    for (let i = 0; i < 5; i++) {
      const d = new Date(mon);
      d.setDate(mon.getDate() + i);
      const dateFormatted = d.toISOString().split('T')[0];
      const displayDate = `${d.getDate().toString().padStart(2, '0')}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getFullYear()}`;
      week.push({ dayName: dayNames[i], dateStr: dateFormatted, displayDate });
    }
    return week;
  };

  const weekDays = getWeekDates(currentDate);

  const timeSlots = [
    { period: 1, label: '09:15 AM to 10:15 AM', startTime: '09:15 AM', endTime: '10:15 AM' },
    { period: 2, label: '10:15 AM to 11:15 AM', startTime: '10:15 AM', endTime: '11:15 AM' },
    { period: 3, label: '11:15 AM to 12:15 PM', startTime: '11:15 AM', endTime: '12:15 PM' },
    { period: 4, label: '12:15 PM to 01:00 PM', isBreak: true },
    { period: 5, label: '01:00 PM to 02:00 PM', startTime: '01:00 PM', endTime: '02:00 PM' },
    { period: 6, label: '02:00 PM to 03:00 PM', startTime: '02:00 PM', endTime: '03:00 PM' },
  ];

  // Attendance Color Helper
  const getSlotColor = (dayName, dateStr, periodObj) => {
    if (periodObj.isBreak) return 'bg-slate-100 text-slate-400 border-slate-200';

    const selectedDateObj = new Date(currentDate);
    selectedDateObj.setHours(0,0,0,0);
    const slotDateObj = new Date(dateStr);
    slotDateObj.setHours(0,0,0,0);

    if (slotDateObj > selectedDateObj) {
      return 'bg-slate-50 text-slate-500 border-slate-200';
    }

    const status = attendanceMap[dateStr];
    if (status === 'present' || status === 'late' || status === 'filled') {
      return 'bg-emerald-50 text-emerald-700 border-emerald-300 font-black';
    }
    if (status === 'absent') {
      return 'bg-rose-50 text-rose-600 border-rose-300 font-black';
    }
    if (status === 'leave') {
      return 'bg-amber-50 text-amber-700 border-amber-300 font-black';
    }

    return 'bg-sky-50 text-sky-700 border-sky-300 font-black';
  };

  // Open Edit Slot Modal for Principal
  const handleOpenEditSlot = (dayName, periodObj, existingSlot) => {
    if (!isPrincipal) return;

    const defaultSubjId = existingSlot?.subjectId?._id || existingSlot?.subjectId || (subjectsList[0]?._id || '');
    const selectedSubjObj = subjectsList.find((s) => s._id === defaultSubjId);
    const subjName = selectedSubjObj?.name?.toLowerCase() || '';

    const qualified = teachersList.filter((t) => {
      if (!subjName) return false;
      const subMatch = t.subjects && t.subjects.some((s) => {
        const sId = (s._id || s).toString();
        const sName = s.name ? s.name.toLowerCase() : '';
        return sId === defaultSubjId || (sName && sName.includes(subjName));
      });
      const qualMatch = t.qualification && t.qualification.toLowerCase().includes(subjName);
      return subMatch || qualMatch;
    });

    const activeClassObj = classes.find((c) => c._id === selectedClass);
    const activeSectionObj = activeClassObj?.sections?.find((s) => s._id === selectedSection);
    const sectionRoom = activeSectionObj?.roomNo || existingSlot?.classroom || (activeSectionObj?.name ? `Room for ${activeSectionObj.name}` : 'Room 101');

    const initialTeacherId = existingSlot?.teacherId?._id || existingSlot?.teacherId || (qualified.length > 0 ? qualified[0]._id : '');

    setSlotForm({
      day: dayName,
      periodNumber: periodObj.period,
      timeLabel: periodObj.label,
      startTime: periodObj.startTime || '09:15 AM',
      endTime: periodObj.endTime || '10:15 AM',
      subjectId: defaultSubjId,
      teacherId: initialTeacherId,
      classroom: sectionRoom,
    });
    setConflictWarning(null);
    setIsEditModalOpen(true);

    checkSlotConflict(initialTeacherId, dayName, periodObj.period);
  };

  // Real-time Teacher Conflict Checker
  const checkSlotConflict = async (teacherId, day, periodNumber) => {
    if (!teacherId || !day || !periodNumber) {
      setConflictWarning(null);
      return;
    }
    try {
      const res = await api.get(
        `/timetable/check-conflict?teacherId=${teacherId}&day=${day}&periodNumber=${periodNumber}&classId=${selectedClass}&sectionId=${selectedSection}`
      );
      if (res.data.success && res.data.hasConflict) {
        setConflictWarning({
          message: res.data.message,
          teacherConflict: res.data.teacherConflict,
          conflicts: res.data.conflicts || [],
        });
      } else {
        setConflictWarning(null);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleSubjectChange = (newSubjectId) => {
    const selectedSubjObj = subjectsList.find((s) => s._id === newSubjectId);
    const subjName = selectedSubjObj?.name?.toLowerCase() || '';

    const qualified = teachersList.filter((t) => {
      if (!subjName) return false;
      const subMatch = t.subjects && t.subjects.some((s) => {
        const sId = (s._id || s).toString();
        const sName = s.name ? s.name.toLowerCase() : '';
        return sId === newSubjectId || (sName && sName.includes(subjName));
      });
      const qualMatch = t.qualification && t.qualification.toLowerCase().includes(subjName);
      return subMatch || qualMatch;
    });

    const nextTeacherId = qualified.length > 0 ? qualified[0]._id : '';
    setSlotForm((prev) => ({
      ...prev,
      subjectId: newSubjectId,
      teacherId: nextTeacherId,
    }));

    checkSlotConflict(nextTeacherId, slotForm.day, slotForm.periodNumber);
  };

  const handleTeacherChange = (newTeacherId) => {
    setSlotForm((prev) => ({ ...prev, teacherId: newTeacherId }));
    checkSlotConflict(newTeacherId, slotForm.day, slotForm.periodNumber);
  };

  const handleClassroomChange = (newClassroom) => {
    setSlotForm((prev) => ({ ...prev, classroom: newClassroom }));
    checkSlotConflict(slotForm.teacherId, newClassroom, slotForm.day, slotForm.periodNumber);
  };

  // Save Slot Assignment by Principal
  const handleSaveSlot = async (e) => {
    e.preventDefault();
    if (!selectedClass || !selectedSection) {
      addToast('Please select Class and Section first', 'error');
      return;
    }
    if (!slotForm.subjectId || !slotForm.teacherId) {
      addToast('Please select Subject and Teacher', 'error');
      return;
    }

    setSavingSlot(true);
    try {
      const existingSlots = timetable?.slots ? [...timetable.slots] : [];
      const filteredSlots = existingSlots.filter(
        (s) => !(s.day === slotForm.day && s.periodNumber === slotForm.periodNumber)
      );

      const newSlot = {
        day: slotForm.day,
        periodNumber: slotForm.periodNumber,
        startTime: slotForm.startTime,
        endTime: slotForm.endTime,
        subjectId: slotForm.subjectId,
        teacherId: slotForm.teacherId,
        classroom: slotForm.classroom,
      };

      const rawSlotsPayload = [...filteredSlots, newSlot];

      const updatedSlotsPayload = rawSlotsPayload.map((s) => ({
        day: s.day,
        periodNumber: s.periodNumber,
        startTime: s.startTime || '09:15 AM',
        endTime: s.endTime || '10:15 AM',
        subjectId: s.subjectId?._id || s.subjectId,
        teacherId: s.teacherId?._id || s.teacherId,
        classroom: s.classroom || 'Room 101',
      }));

      const res = await api.post('/timetable', {
        academicYearId: '65a000000000000000000001',
        classId: selectedClass,
        sectionId: selectedSection,
        slots: updatedSlotsPayload,
      });

      if (res.data.success) {
        addToast('Timetable slot updated successfully!', 'success');
        setTimetable(res.data.data);
        setIsEditModalOpen(false);
      }
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to update timetable slot due to scheduling conflicts', 'error');
    } finally {
      setSavingSlot(false);
    }
  };

  const selectedClassObj = classes.find((c) => c._id === selectedClass);
  const selectedSectionObj = selectedClassObj?.sections?.find((s) => s._id === selectedSection);

  return (
    <div className="space-y-6">
      {/* Top Header Toolbar */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl border border-emerald-100">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-black text-slate-900 uppercase tracking-tight">
                  {isTeacher ? 'MY TEACHING SCHEDULE' : 'TIMETABLE'}
                </h1>
                <span className="px-2.5 py-0.5 bg-indigo-50 text-indigo-700 text-[10px] font-bold rounded-md border border-indigo-200">
                  Greenwood School
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                {isPrincipal && 'Principal Mode: Real-time Teacher & Room conflict validation enabled'}
                {isStudent && 'Student View: Locked to your enrolled class timetable & attendance colors'}
                {isTeacher && 'Teacher View: Showing only periods assigned to your teaching schedule'}
              </p>
            </div>
          </div>

          {/* Status Legend Pills & Date Selector */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1.5 bg-rose-600 text-white rounded-xl text-xs font-bold shadow-xs">
              Pending Attendance
            </span>
            <span className="px-3 py-1.5 bg-emerald-600 text-white rounded-xl text-xs font-bold shadow-xs">
              Filled Attendance
            </span>
            <span className="px-3 py-1.5 bg-sky-600 text-white rounded-xl text-xs font-bold shadow-xs">
              No Attendance
            </span>
            <span className="px-3 py-1.5 bg-slate-200 text-slate-600 rounded-xl text-xs font-bold border border-slate-300">
              Future
            </span>

            {/* Date Selector Input */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 ml-2">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <input
                type="date"
                value={currentDate}
                onChange={(e) => setCurrentDate(e.target.value)}
                className="bg-transparent border-none text-xs font-bold text-slate-800 focus:outline-none cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Filter Controls & Class Info */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {isPrincipal ? (
            /* PRINCIPAL ROLE: Full Class & Section Selector */
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
            </div>
          ) : isTeacher && allowedClasses.length > 0 ? (
            /* TEACHER ROLE: Class Dropdown of Assigned Classes ONLY */
            <div>
              <label className="block text-[10px] font-bold text-indigo-500 uppercase mb-1">
                Select Your Teaching Class Schedule
              </label>
              <select
                value={`${selectedClass}_${selectedSection}`}
                onChange={(e) => {
                  const [cId, sId] = e.target.value.split('_');
                  setSelectedClass(cId);
                  setSelectedSection(sId);
                }}
                className="px-4 py-2 border-2 border-indigo-200 focus:border-indigo-500 rounded-2xl text-xs font-black bg-white text-indigo-900 shadow-xs cursor-pointer"
              >
                {allowedClasses.map((ac, idx) => (
                  <option key={idx} value={`${ac.classId?._id || ac.classId}_${ac.sectionId?._id || ac.sectionId}`}>
                    {ac.className}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            /* STUDENT ROLE: Locked Class Info Badge */
            <div className="flex items-center gap-2 px-4 py-2 bg-indigo-50 border border-indigo-200 rounded-2xl">
              <GraduationCap className="w-5 h-5 text-indigo-600 shrink-0" />
              <div>
                <div className="text-[10px] font-bold uppercase text-indigo-500 tracking-wider">Assigned Schedule</div>
                <div className="text-xs font-black text-indigo-900">
                  {timetable?.classId?.name || selectedClassObj?.name || 'Class 7'} - {timetable?.sectionId?.name || selectedSectionObj?.name || 'Section A'}
                </div>
              </div>
            </div>
          )}

          {/* Subheader Banner Info */}
          <div className="text-right text-xs">
            <div className="font-extrabold text-slate-900">
              {isPrincipal && 'Principal Timetable Management'}
              {isStudent && 'Student Class Timetable'}
              {isTeacher && 'Full Class Timetable (Assigned Classes)'}
            </div>
            <div className="text-slate-500 font-medium">
              {selectedClassObj?.name || 'Class 7'} - {selectedSectionObj?.name || 'Section A'}
            </div>
            <div className="text-[10px] text-slate-400 font-semibold">w.e.f {currentDate}</div>
          </div>
        </div>
      </div>

      {/* Main Timetable Grid */}
      <div className="bg-white rounded-3xl border border-slate-300 shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-center border-collapse border border-slate-300">
            <thead className="bg-slate-100 text-slate-800 uppercase text-xs font-black border-b border-slate-300">
              <tr>
                <th className="p-3 border-r border-b border-slate-300 w-36 bg-slate-200/80">Time Slot</th>
                {weekDays.map((w) => (
                  <th key={w.dateStr} className="p-3 border-r border-b border-slate-300 font-extrabold min-w-[170px]">
                    <div>{w.dayName}</div>
                    <div className="text-[11px] font-bold text-slate-500 font-mono mt-0.5">{w.displayDate}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-300 text-xs font-bold text-slate-800">
              {timeSlots.map((slot) => {
                if (slot.isBreak) {
                  return (
                    <tr key="break" className="bg-slate-100/90 text-slate-500 font-black">
                      <td className="p-2.5 border-r border-b border-slate-300 text-[11px]">{slot.label}</td>
                      <td colSpan={5} className="p-2.5 border-b border-slate-300 tracking-widest text-[11px] uppercase text-center bg-amber-50/50 text-amber-700">
                        RECESS / LUNCH BREAK
                      </td>
                    </tr>
                  );
                }

                return (
                  <tr key={slot.period} className="hover:bg-slate-50/50">
                    <td className="p-3 font-extrabold bg-slate-50/90 border-r border-b border-slate-300 text-[11px] text-slate-700">
                      {slot.label}
                    </td>

                    {weekDays.map((w) => {
                      const matchedSlot = timetable?.slots?.find(
                        (s) => s.day === w.dayName && s.periodNumber === slot.period
                      );

                      const subjCode = matchedSlot?.subjectId?.code || matchedSlot?.subjectId?.name;
                      const teacherName = matchedSlot?.teacherId?.name;
                      const roomNo = matchedSlot?.classroom;

                      const isMyTeachingSlot =
                        isTeacher &&
                        ((matchedSlot?.teacherId?._id && matchedSlot.teacherId._id.toString() === teacherProfileId) ||
                          (matchedSlot?.teacherId && matchedSlot.teacherId.toString() === teacherProfileId));

                      const colorClass = getSlotColor(w.dayName, w.dateStr, slot);

                      return (
                        <td
                          key={w.dateStr}
                          onClick={() => isPrincipal && handleOpenEditSlot(w.dayName, slot, matchedSlot)}
                          className={`p-3 border-r border-b border-slate-300 align-middle relative group ${
                            isMyTeachingSlot ? 'bg-indigo-50/80 border-indigo-300' : colorClass
                          } ${isPrincipal ? 'hover:brightness-95 cursor-pointer' : ''}`}
                        >
                          {subjCode ? (
                            <div className="space-y-1 py-1">
                              <div className="font-black text-xs tracking-tight">{subjCode}</div>
                              <div className="text-[11px] font-semibold text-slate-600 flex items-center justify-center gap-1 flex-wrap">
                                <span>{`{${teacherName || 'Faculty'}}`}</span>
                                {isMyTeachingSlot && (
                                  <span className="px-1.5 py-0.5 bg-indigo-600 text-white rounded-md text-[9px] font-black uppercase tracking-tight shadow-2xs">
                                    ⭐ My Class
                                  </span>
                                )}
                              </div>
                              {roomNo && <div className="text-[10px] text-slate-500 font-mono">{`[${roomNo}]`}</div>}
                            </div>
                          ) : (
                            <div className="py-2">
                              {isPrincipal ? (
                                <span className="text-indigo-600 font-bold text-[11px] flex items-center justify-center gap-1">
                                  <Plus className="w-3 h-3" /> Assign Slot
                                </span>
                              ) : (
                                <span className="text-slate-400 font-normal italic text-[11px]">Free / Self Study</span>
                              )}
                            </div>
                          )}

                          {/* Principal Hover Edit Overlay Indicator */}
                          {isPrincipal && matchedSlot && (
                            <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <span className="p-1 bg-indigo-600 text-white rounded-md shadow-xs block" title="Edit Slot Assignment">
                                <Edit3 className="w-3 h-3" />
                              </span>
                            </div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* PRINCIPAL SLOT ASSIGNMENT MODAL WITH REAL-TIME TEACHER & ROOM CONFLICT VALIDATION */}
      {isPrincipal && (
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          title={`Assign Slot: ${slotForm.day} (${slotForm.timeLabel})`}
        >
          <form onSubmit={handleSaveSlot} className="space-y-4">
            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 text-xs font-semibold text-slate-600">
              Class: <span className="font-bold text-slate-900">{selectedClassObj?.name} - {selectedSectionObj?.name}</span>
            </div>

            {/* REAL-TIME DUAL CONFLICT ALERT (TEACHER & ROOM) */}
            {conflictWarning && (
              <div className="p-3.5 bg-rose-50 border-2 border-rose-300 rounded-2xl space-y-2 text-rose-900 shadow-xs">
                <div className="flex items-center gap-2 text-xs font-black uppercase text-rose-700 tracking-wider">
                  <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
                  <span>Real-Time Scheduling Conflict Detected</span>
                </div>

                {conflictWarning.teacherConflict && (
                  <div className="p-2 bg-white/80 rounded-xl border border-rose-200 text-xs font-bold text-rose-900 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-rose-600 shrink-0"></span>
                    <span>{conflictWarning.teacherConflict}</span>
                  </div>
                )}

                {conflictWarning.roomConflict && (
                  <div className="p-2 bg-white/80 rounded-xl border border-amber-300 text-xs font-bold text-amber-900 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-600 shrink-0"></span>
                    <span>{conflictWarning.roomConflict}</span>
                  </div>
                )}
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-indigo-600 uppercase mb-1">Select Subject</label>
              <select
                required
                value={slotForm.subjectId}
                onChange={(e) => handleSubjectChange(e.target.value)}
                className="w-full px-3 py-2 border-2 border-indigo-200 focus:border-indigo-500 rounded-xl text-sm font-semibold bg-white"
              >
                {subjectsList.map((s) => (
                  <option key={s._id} value={s._id}>
                    {s.name} ({s.code || 'SUB'})
                  </option>
                ))}
              </select>
            </div>

            {/* TEACHER ASSIGNMENT SELECTOR */}
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Assigned Faculty Member</label>
              <select
                required
                value={slotForm.teacherId}
                onChange={(e) => handleTeacherChange(e.target.value)}
                className="w-full px-3 py-2 border rounded-xl text-sm font-semibold bg-white focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">-- Select Teacher --</option>
                {teachersList.map((t) => (
                  <option key={t._id} value={t._id}>
                    {t.name} ({t.employeeId || 'Teacher'})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Classroom Location (Academic Setup)</label>
              <div className="w-full px-3.5 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-xs font-extrabold text-slate-800 flex items-center justify-between">
                <span>{slotForm.classroom || selectedSectionObj?.roomNo || 'Room 101'}</span>
                <span className="text-[10px] uppercase font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100">
                  Auto-Assigned Homeroom
                </span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t">
              <button
                type="button"
                onClick={() => setIsEditModalOpen(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={savingSlot || Boolean(conflictWarning)}
                className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs shadow-md shadow-indigo-600/20 transition-all disabled:opacity-40 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>{savingSlot ? 'Saving Slot...' : 'Save Slot Assignment'}</span>
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
