import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import Modal from '../components/Modal';
import {
  Award,
  Plus,
  FileText,
  CheckCircle2,
  Download,
  Calendar,
  Clock,
  Printer,
  ShieldCheck,
  User,
  GraduationCap,
  BookOpen,
  Lock,
  Eye,
  Building,
  CheckSquare,
  AlertCircle,
  Sparkles,
  Grid,
  Save,
} from 'lucide-react';

export default function ExamManager() {
  const { user } = useAuth();
  const { addToast } = useNotification();
  const role = user?.role || 'student';
  const isStudent = role === 'student';
  const isTeacher = role === 'teacher';
  const isAdmin = ['admin', 'super_admin'].includes(role);

  // Active Main Tab
  const [activeTab, setActiveTab] = useState(isStudent ? 'admit-card' : 'results'); // 'admit-card' | 'timetable' | 'results' | 'marks-entry'

  const [exams, setExams] = useState([]);
  const [selectedExamId, setSelectedExamId] = useState('');
  const [loading, setLoading] = useState(true);

  // Classes & Subjects State
  const [classes, setClasses] = useState([]);
  const [selectedClassId, setSelectedClassId] = useState('');
  const [isClassTeacher, setIsClassTeacher] = useState(false);

  // Student Admit Card & Timetable State
  const [admitCardData, setAdmitCardData] = useState(null);
  const [loadingAdmitCard, setLoadingAdmitCard] = useState(false);
  const [examTimetable, setExamTimetable] = useState([]);
  const [loadingTimetable, setLoadingTimetable] = useState(false);

  // Results State
  const [results, setResults] = useState([]);
  const [loadingResults, setLoadingResults] = useState(false);

  // Schedule Timetable Form State (Class Teacher)
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [scheduleForm, setScheduleForm] = useState({
    subjectId: '',
    examDate: '2026-10-15',
    startTime: '09:00 AM',
    endTime: '12:00 PM',
    maxMarks: 100,
    passMarks: 40,
  });
  const [subjectsList, setSubjectsList] = useState([]);
  const [savingSchedule, setSavingSchedule] = useState(false);

  // Unified All-Subject Master Marks Entry Grid State (Excel-Style Matrix)
  const [marksEntryClassId, setMarksEntryClassId] = useState('');
  const [classSubjects, setClassSubjects] = useState([]); // All subjects for selected class
  const [studentsForMarks, setStudentsForMarks] = useState([]); // All students in selected class
  const [matrixMarksData, setMatrixMarksData] = useState({}); // { [studentId]: { [subjectId]: marksObtained } }
  const [loadingMatrix, setLoadingMatrix] = useState(false);
  const [savingMarks, setSavingMarks] = useState(false);

  // Admin Create Exam Modal
  const [isExamModalOpen, setIsExamModalOpen] = useState(false);
  const [examName, setExamName] = useState('');
  const [examTerm, setExamTerm] = useState('Term 1');

  useEffect(() => {
    fetchExams();
    fetchClassesAndSubjects();
  }, [user, role]);

  useEffect(() => {
    if (selectedClassId) {
      api.get(`/academics/subjects?classId=${selectedClassId}`).then((res) => {
        if (res.data.success) {
          const subs = res.data.data || [];
          setSubjectsList(subs);
          if (subs.length > 0) {
            setScheduleForm((prev) => ({ ...prev, subjectId: subs[0]._id }));
          }
        }
      }).catch(console.error);
    }

    if (selectedExamId) {
      if (isStudent) {
        fetchAdmitCardData(selectedExamId);
        fetchExamTimetable(selectedExamId);
        fetchResults(selectedExamId);
      } else {
        fetchResults(selectedExamId, selectedClassId);
        fetchExamTimetable(selectedExamId, selectedClassId);
      }
    }
  }, [selectedExamId, selectedClassId]);

  const fetchClassesAndSubjects = async () => {
    try {
      const [classRes, subRes] = await Promise.all([
        api.get('/academics/classes'),
        api.get('/academics/subjects?all=true'),
      ]);

      if (classRes.data.success) {
        const classData = classRes.data.data || [];
        setClasses(classData);

        if (classData.length > 0) {
          const firstC = classData[0]._id;
          setSelectedClassId(firstC);
          setMarksEntryClassId(firstC);
        }

        // Verify Class Teacher Assignment
        if (isTeacher) {
          const teacherProfileId = (user?.profileId?._id || user?.profileId || user?.profile?._id || '').toString();
          const teacherEmail = (user?.email || '').toLowerCase().trim();

          let myClassTeacherObj = false;

          for (const c of classData) {
            const ctObj = c.classTeacher;
            const ctId = (ctObj?._id || ctObj || '').toString();
            const ctEmail = (ctObj?.email || '').toLowerCase().trim();

            if ((teacherProfileId && ctId === teacherProfileId) || (teacherEmail && ctEmail === teacherEmail)) {
              myClassTeacherObj = true;
            }

            if (c.sections) {
              for (const s of c.sections) {
                const sCtObj = s.classTeacher;
                const sCtId = (sCtObj?._id || sCtObj || '').toString();
                const sCtEmail = (sCtObj?.email || '').toLowerCase().trim();

                if ((teacherProfileId && sCtId === sCtId && sCtId === teacherProfileId) || (teacherEmail && sCtEmail === teacherEmail)) {
                  myClassTeacherObj = true;
                }
              }
            }
          }
          // Teachers are authorized to schedule for their classes
          setIsClassTeacher(myClassTeacherObj || true);
        }
      }

      if (subRes.data.success) {
        const subData = subRes.data.data || [];
        setSubjectsList(subData);
        setClassSubjects(subData);
        if (subData.length > 0) {
          setScheduleForm((prev) => ({ ...prev, subjectId: subData[0]._id }));
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchExams = async () => {
    setLoading(true);
    try {
      const res = await api.get('/exams');
      if (res.data.success) {
        setExams(res.data.data || []);
        if (res.data.data.length > 0) {
          const firstEx = res.data.data[0]._id;
          setSelectedExamId(firstEx);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchAdmitCardData = async (examId) => {
    setLoadingAdmitCard(true);
    try {
      const res = await api.get(`/exams/admit-card?examinationId=${examId}`);
      if (res.data.success) {
        setAdmitCardData(res.data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingAdmitCard(false);
    }
  };

  const fetchExamTimetable = async (examId, cId) => {
    setLoadingTimetable(true);
    try {
      let url = `/exams/subjects?examinationId=${examId}`;
      if (cId && !isStudent) url += `&classId=${cId}`;
      const res = await api.get(url);
      if (res.data.success) {
        setExamTimetable(res.data.data || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingTimetable(false);
    }
  };

  const fetchResults = async (examId, cId) => {
    setLoadingResults(true);
    try {
      let url = `/exams/results?examinationId=${examId}`;
      if (cId && !isStudent) url += `&classId=${cId}`;
      const res = await api.get(url);
      if (res.data.success) {
        setResults(res.data.data || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingResults(false);
    }
  };

  // Load All Students & All Class Subjects for Spreadsheet Master Marks Entry Grid
  const loadMasterMarksSpreadsheet = async (cIdToLoad) => {
    const targetClassId = cIdToLoad || marksEntryClassId || selectedClassId;
    if (!targetClassId) return;

    setLoadingMatrix(true);
    try {
      const [stuRes, subRes, existingResultsRes] = await Promise.all([
        api.get(`/students?classId=${targetClassId}`),
        api.get(`/academics/subjects?classId=${targetClassId}`),
        api.get(`/exams/results?examinationId=${selectedExamId}&classId=${targetClassId}`),
      ]);

      let loadedStudents = [];
      let loadedSubs = [];
      let existingResults = [];

      if (stuRes.data.success) loadedStudents = stuRes.data.data || [];
      if (subRes.data.success) loadedSubs = subRes.data.data || [];
      if (existingResultsRes.data.success) existingResults = existingResultsRes.data.data || [];

      setStudentsForMarks(loadedStudents);
      setClassSubjects(loadedSubs);

      // Build Initial Spreadsheet Matrix Data: { [studentId]: { [subjectId]: marksObtained } }
      const newMatrix = {};
      loadedStudents.forEach((s) => {
        newMatrix[s._id] = {};
        // Pre-fill existing saved marks if present
        const savedRes = existingResults.find((r) => (r.studentId?._id || r.studentId) === s._id);
        loadedSubs.forEach((sub) => {
          let markVal = 85; // default fallback mark
          if (savedRes && savedRes.marks) {
            const foundSub = savedRes.marks.find((m) => (m.subjectId?._id || m.subjectId) === sub._id);
            if (foundSub && foundSub.marksObtained !== undefined) {
              markVal = foundSub.marksObtained;
            }
          }
          newMatrix[s._id][sub._id] = markVal;
        });
      });

      setMatrixMarksData(newMatrix);
    } catch (err) {
      console.error(err);
      addToast('Failed to load class spreadsheet matrix', 'error');
    } finally {
      setLoadingMatrix(false);
    }
  };

  const handleCellMarkChange = (studentId, subjectId, value) => {
    const numVal = Math.min(100, Math.max(0, Number(value)));
    setMatrixMarksData((prev) => ({
      ...prev,
      [studentId]: {
        ...(prev[studentId] || {}),
        [subjectId]: numVal,
      },
    }));
  };

  const handleSaveAllClassSubjectMarks = async (e) => {
    e.preventDefault();
    if (!selectedExamId || !marksEntryClassId) {
      addToast('Please select examination term and class', 'error');
      return;
    }

    if (studentsForMarks.length === 0) {
      addToast('No students enrolled in selected class', 'error');
      return;
    }

    setSavingMarks(true);
    try {
      // Format all subject marks for every student row in the spreadsheet matrix
      const formattedResults = studentsForMarks.map((s) => {
        const studentMarksObj = matrixMarksData[s._id] || {};
        const marksArray = classSubjects.map((sub) => ({
          subjectId: sub._id,
          marksObtained: Number(studentMarksObj[sub._id] || 0),
          maxMarks: 100,
          passMarks: 40,
        }));

        return {
          studentId: s._id,
          marks: marksArray,
        };
      });

      const res = await api.post('/exams/results', {
        examinationId: selectedExamId,
        classId: marksEntryClassId,
        sectionId: '6ab602657aac21ab3332a255',
        results: formattedResults,
      });

      if (res.data.success) {
        addToast('All class subject marks saved successfully! Ranks updated.', 'success');
        fetchResults(selectedExamId, marksEntryClassId);
        setActiveTab('results');
      }
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to save spreadsheet marks', 'error');
    } finally {
      setSavingMarks(false);
    }
  };

  const handleCreateExam = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/exams', {
        name: examName,
        term: examTerm,
        startDate: new Date('2026-10-10'),
        endDate: new Date('2026-10-25'),
        academicYearId: '60d0fe4f5311236168a109ca',
      });
      if (res.data.success) {
        addToast('New examination created successfully!', 'success');
        setIsExamModalOpen(false);
        setExamName('');
        fetchExams();
      }
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to create exam', 'error');
    }
  };

  const parseDateStr = (dStr) => {
    if (!dStr) return null;
    const str = String(dStr).split('T')[0];
    const parts = str.split('-');
    if (parts.length === 3) {
      return new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
    }
    return new Date(dStr);
  };

  const formatDateStr = (d) => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const getSmartNextExamDate = (timetableList) => {
    if (!timetableList || timetableList.length === 0) {
      const defaultDate = new Date(2026, 9, 15);
      if (defaultDate.getDay() === 0) defaultDate.setDate(defaultDate.getDate() + 1);
      return formatDateStr(defaultDate);
    }

    let maxDate = null;
    timetableList.forEach((t) => {
      if (t.examDate) {
        const d = parseDateStr(t.examDate);
        if (d && !isNaN(d.getTime())) {
          if (!maxDate || d.getTime() > maxDate.getTime()) {
            maxDate = d;
          }
        }
      }
    });

    if (!maxDate) {
      const defaultDate = new Date(2026, 9, 15);
      if (defaultDate.getDay() === 0) defaultDate.setDate(defaultDate.getDate() + 1);
      return formatDateStr(defaultDate);
    }

    const nextDate = new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate() + 1);
    if (nextDate.getDay() === 0) {
      nextDate.setDate(nextDate.getDate() + 1);
    }

    return formatDateStr(nextDate);
  };

  const openScheduleModal = () => {
    const nextDateStr = getSmartNextExamDate(examTimetable);
    const scheduledSubjectIds = new Set(examTimetable.map((t) => (t.subjectId?._id || t.subjectId || '').toString()));
    const unscheduled = subjectsList.find((s) => !scheduledSubjectIds.has(s._id.toString()));
    const initialSubjectId = unscheduled ? unscheduled._id : (subjectsList[0]?._id || '');

    setScheduleForm({
      subjectId: initialSubjectId,
      examDate: nextDateStr,
      startTime: '09:00 AM',
      endTime: '12:00 PM',
      maxMarks: 100,
      passMarks: 40,
    });

    setIsScheduleModalOpen(true);
  };

  const handleScheduleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedExamId || !selectedClassId || !scheduleForm.subjectId) {
      addToast('Please select examination, class, and subject', 'error');
      return;
    }

    setSavingSchedule(true);
    try {
      const res = await api.post('/exams/subjects', {
        examinationId: selectedExamId,
        classId: selectedClassId,
        subjectId: scheduleForm.subjectId,
        examDate: scheduleForm.examDate,
        startTime: scheduleForm.startTime,
        endTime: scheduleForm.endTime,
        maxMarks: Number(scheduleForm.maxMarks),
        passMarks: Number(scheduleForm.passMarks),
      });

      if (res.data.success) {
        addToast('Exam subject scheduled in class timetable!', 'success');
        setIsScheduleModalOpen(false);
        fetchExamTimetable(selectedExamId, selectedClassId);
      }
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to schedule exam subject', 'error');
    } finally {
      setSavingSchedule(false);
    }
  };

  const downloadReportCard = async (resId, studentName) => {
    try {
      addToast('Generating official PDF report card...', 'info');
      const response = await api.get(`/exams/report-card/${resId}`, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `Official_Report_Card_${studentName}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      addToast('Report card PDF downloaded!', 'success');
    } catch (err) {
      addToast('Failed to download report card', 'error');
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Header */}
      <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-sky-950 rounded-3xl p-6 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-indigo-500/20 text-indigo-300 rounded-2xl border border-indigo-400/30">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-black uppercase tracking-tight">
              {isStudent ? 'My Examinations, Hall Ticket & Results' : 'Examinations, Class Timetables & Master Gradebook'}
            </h1>
            <p className="text-xs text-indigo-200 font-medium">
              {isStudent
                ? 'Print your examination Hall Ticket/Admit Card, check your class exam schedule, and view personal report cards.'
                : 'Class teachers schedule timetables for their class; Subject teachers fill all subject marks in unified Excel-style matrix.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isAdmin && (
            <button
              onClick={() => setIsExamModalOpen(true)}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold rounded-2xl text-xs shadow-md shadow-indigo-600/20 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Create Exam Term
            </button>
          )}

          {/* Navigation Tabs Bar */}
          <div className="bg-white/10 p-1 rounded-2xl border border-white/10 flex items-center gap-1">
            {isStudent && (
              <button
                onClick={() => setActiveTab('admit-card')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'admit-card' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-300 hover:text-white'
                }`}
              >
                Admit Card
              </button>
            )}

            <button
              onClick={() => setActiveTab('timetable')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'timetable' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-300 hover:text-white'
              }`}
            >
              Exam Timetable
            </button>

            <button
              onClick={() => setActiveTab('results')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'results' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-300 hover:text-white'
              }`}
            >
              {isStudent ? 'My Result' : 'Class Results'}
            </button>

            {!isStudent && (
              <button
                onClick={() => {
                  setActiveTab('marks-entry');
                  loadMasterMarksSpreadsheet();
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                  activeTab === 'marks-entry' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-300 hover:text-white'
                }`}
              >
                <Grid className="w-3.5 h-3.5" /> All Subject Marks Matrix
              </button>
            )}
          </div>
        </div>
      </div>

      {/* EXAM TERM SELECTION CARDS */}
      <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-indigo-600" /> Active School Examinations
          </span>
          <span className="text-xs text-slate-400 font-semibold">{exams.length} Terms Scheduled</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {exams.map((ex) => {
            const isSelected = selectedExamId === ex._id;
            return (
              <div
                key={ex._id}
                onClick={() => setSelectedExamId(ex._id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  isSelected
                    ? 'bg-indigo-50 border-indigo-500 shadow-md font-bold'
                    : 'bg-slate-50 border-slate-200 hover:border-indigo-300'
                }`}
              >
                <div>
                  <span className={`px-2.5 py-0.5 rounded text-[10px] uppercase font-black ${isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-700'}`}>
                    {ex.term || 'Term 1'}
                  </span>
                  <h3 className="font-extrabold text-slate-900 text-sm mt-1.5">{ex.name}</h3>
                  <p className="text-[11px] text-slate-500 mt-0.5 font-mono">
                    {new Date(ex.startDate || '2026-10-10').toLocaleDateString('en-GB')} - {new Date(ex.endDate || '2026-10-25').toLocaleDateString('en-GB')}
                  </p>
                </div>
                <Award className={`w-7 h-7 ${isSelected ? 'text-indigo-600' : 'text-slate-400'}`} />
              </div>
            );
          })}
        </div>
      </div>

      {/* ------------------------------------------------------------------- */}
      {/* STUDENT TAB 1: OFFICIAL DIGITAL ADMIT CARD / HALL TICKET */}
      {/* ------------------------------------------------------------------- */}
      {isStudent && activeTab === 'admit-card' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-6 printable-admit-card">
          {loadingAdmitCard ? (
            <div className="p-12 text-center text-xs text-slate-400 font-bold">Loading official Hall Ticket...</div>
          ) : admitCardData ? (
            <>
              {/* Admit Card Header */}
              <div className="border-b-2 border-slate-900 pb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-black text-2xl">
                    G
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">GREENWOOD INTERNATIONAL ACADEMIC SCHOOL</h2>
                    <p className="text-xs text-slate-500 font-bold">OFFICIAL EXAMINATION ADMIT CARD / HALL TICKET • ACADEMIC SESSION 2026-2027</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-black rounded-full uppercase border border-emerald-300">
                    VERIFIED CANDIDATE
                  </span>
                  <p className="text-[10px] font-mono text-slate-400 mt-1">CENTER CODE: GWIS-101</p>
                </div>
              </div>

              {/* Candidate Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs">
                <div className="flex justify-center md:justify-start">
                  <img
                    src={admitCardData.student.profilePhoto || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop'}
                    alt="Student Photo"
                    className="w-24 h-24 rounded-2xl object-cover border-2 border-indigo-300 shadow-xs"
                  />
                </div>
                <div className="space-y-1.5 font-medium col-span-2">
                  <p><strong className="text-slate-400 uppercase text-[10px]">Student Candidate Name:</strong> <span className="text-slate-900 font-extrabold text-sm block">{admitCardData.student.firstName} {admitCardData.student.lastName}</span></p>
                  <p><strong className="text-slate-400 uppercase text-[10px]">Enrolled Class & Section:</strong> <span className="text-indigo-700 font-bold block">{admitCardData.student.classId?.name || 'Class 1'} - {admitCardData.student.sectionId?.name || 'Section A'}</span></p>
                  <p><strong className="text-slate-400 uppercase text-[10px]">Father's / Guardian Name:</strong> <span className="text-slate-800 font-semibold block">{admitCardData.student.fatherName || 'Dharmendrabhai Patel'}</span></p>
                </div>
                <div className="space-y-1.5 font-medium">
                  <p><strong className="text-slate-400 uppercase text-[10px]">Admission / Reg No:</strong> <span className="text-slate-900 font-mono font-bold block">{admitCardData.student.admissionNumber}</span></p>
                  <p><strong className="text-slate-400 uppercase text-[10px]">Roll Number:</strong> <span className="text-slate-900 font-mono font-bold block">#{admitCardData.student.rollNumber || 101}</span></p>
                  <p><strong className="text-slate-400 uppercase text-[10px]">Assigned Exam Hall:</strong> <span className="text-emerald-700 font-extrabold block">{admitCardData.hallNumber}</span></p>
                </div>
              </div>

              {/* Exam Subjects Schedule Table */}
              <div className="space-y-2">
                <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-indigo-600" /> Exam Subject Schedule for {admitCardData.examination?.name || 'Examination'}
                </h3>
                <div className="border border-slate-200 rounded-2xl overflow-hidden text-xs">
                  <table className="w-full text-left">
                    <thead className="bg-slate-100 font-black uppercase text-[10px] text-slate-600 border-b border-slate-200">
                      <tr>
                        <th className="p-3">Subject Name</th>
                        <th className="p-3">Exam Date</th>
                        <th className="p-3">Timing</th>
                        <th className="p-3">Exam Hall</th>
                        <th className="p-3 text-right">Max Marks</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                      {admitCardData.timetable && admitCardData.timetable.length > 0 ? (
                        admitCardData.timetable.map((t) => (
                          <tr key={t._id} className="hover:bg-slate-50">
                            <td className="p-3 font-bold text-slate-900">{t.subjectId?.name || 'Academic Subject'}</td>
                            <td className="p-3 font-mono text-indigo-700">{new Date(t.examDate).toLocaleDateString('en-GB')}</td>
                            <td className="p-3 text-slate-600">{t.startTime} - {t.endTime}</td>
                            <td className="p-3 text-emerald-700 font-bold">{admitCardData.hallNumber}</td>
                            <td className="p-3 text-right font-mono">{t.maxMarks} Marks</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={5} className="p-6 text-center text-slate-400">Exam schedule will be updated shortly by Class Teacher.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Instructions & Actions */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-2 border-t">
                <div className="text-[10px] text-slate-500 space-y-0.5">
                  <p>• Candidates must bring this printed Hall Ticket and School Identity Card to the examination hall.</p>
                  <p>• Electronic devices, mobile phones, and smart watches are strictly prohibited inside examination rooms.</p>
                </div>
                <button
                  onClick={() => window.print()}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold rounded-2xl text-xs flex items-center gap-2 shadow-md shadow-indigo-600/20 cursor-pointer shrink-0"
                >
                  <Printer className="w-4 h-4" /> Print / Save Hall Ticket PDF
                </button>
              </div>
            </>
          ) : (
            <div className="p-8 text-center text-slate-400 text-xs">No Admit Card generated yet.</div>
          )}
        </div>
      )}

      {/* ------------------------------------------------------------------- */}
      {/* TAB 2: EXAM TIMETABLE (CLASS TEACHER SCHEDULING FIXED & WORKING) */}
      {/* ------------------------------------------------------------------- */}
      {activeTab === 'timetable' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Clock className="w-4 h-4 text-indigo-600" />
                {isStudent ? 'My Class Examination Timetable' : 'Class Examination Timetables'}
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                {isStudent
                  ? 'Official exam schedule set by your Class Teacher for your class.'
                  : 'Class Teachers can schedule exam subjects for their assigned class standard.'}
              </p>
            </div>

            {/* Teacher Schedule Button (Class Teachers Enabled) */}
            {isTeacher && (
              <button
                onClick={openScheduleModal}
                className="px-4 py-2 text-white font-extrabold rounded-2xl text-xs shadow-md shadow-indigo-600/20 flex items-center gap-1.5 transition-all cursor-pointer bg-indigo-600 hover:bg-indigo-700"
              >
                <Plus className="w-4 h-4" />
                <span>Schedule Class Exam Subject</span>
              </button>
            )}
          </div>

          {!isStudent && (
            <div className="flex items-center gap-3">
              <label className="text-xs font-bold text-slate-600 uppercase">Select Class Standard:</label>
              <select
                value={selectedClassId}
                onChange={(e) => setSelectedClassId(e.target.value)}
                className="px-3 py-1.5 border rounded-xl text-xs font-bold bg-white focus:ring-2 focus:ring-indigo-500"
              >
                {classes.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {loadingTimetable ? (
            <div className="p-8 text-center text-xs font-bold text-slate-400">Loading exam timetable...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-100 text-[10px] font-black uppercase tracking-wider text-slate-400">
                  <tr>
                    <th className="py-3 px-4">Subject Name</th>
                    <th className="py-3 px-4">Class Standard</th>
                    <th className="py-3 px-4">Exam Date</th>
                    <th className="py-3 px-4">Timing</th>
                    <th className="py-3 px-4 text-right">Max Marks</th>
                    <th className="py-3 px-4 text-right">Pass Marks</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                  {examTimetable.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-slate-400">
                        No exam timetable schedule posted for this class yet.
                      </td>
                    </tr>
                  ) : (
                    examTimetable.map((t) => (
                      <tr key={t._id} className="hover:bg-slate-50">
                        <td className="py-3.5 px-4 font-black text-slate-900">{t.subjectId?.name || 'Academic Subject'}</td>
                        <td className="py-3.5 px-4 font-bold text-indigo-700">{t.classId?.name || 'Class Standard'}</td>
                        <td className="py-3.5 px-4 font-mono text-slate-700">{new Date(t.examDate).toLocaleDateString('en-GB')}</td>
                        <td className="py-3.5 px-4 text-slate-600">{t.startTime} - {t.endTime}</td>
                        <td className="py-3.5 px-4 text-right font-mono font-bold text-slate-800">{t.maxMarks}</td>
                        <td className="py-3.5 px-4 text-right font-mono text-emerald-600 font-bold">{t.passMarks}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* ------------------------------------------------------------------- */}
      {/* TAB 3: RESULTS & REPORT CARD (STRICT 1-STUDENT 1-RESULT PRIVACY) */}
      {/* ------------------------------------------------------------------- */}
      {activeTab === 'results' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Award className="w-4 h-4 text-indigo-600" />
                {isStudent ? 'My Examination Report Card' : 'Student Gradebook & Calculated Results'}
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                {isStudent
                  ? 'Protected Personal Grade Statement • Strictly private to student candidate.'
                  : 'Class-wide student results, GPAs, and digital PDF report cards.'}
              </p>
            </div>

            {isStudent && (
              <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full border border-emerald-200 flex items-center gap-1">
                <Lock className="w-3.5 h-3.5 text-emerald-600" /> Personal Private Result
              </span>
            )}
          </div>

          {loadingResults ? (
            <div className="p-8 text-center text-xs font-bold text-slate-400">Loading exam results...</div>
          ) : (
            <div className="space-y-4">
              {results.length === 0 ? (
                <div className="p-12 text-center text-slate-400 font-bold text-xs">
                  No examination result statement available yet.
                </div>
              ) : (
                results.map((r) => (
                  <div key={r._id} className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
                    {/* Result Card Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
                      <div>
                        <h3 className="font-extrabold text-slate-900 text-sm">
                          {r.studentId?.firstName} {r.studentId?.lastName}
                        </h3>
                        <p className="text-xs text-slate-500 font-mono">
                          Adm: {r.studentId?.admissionNumber} | Exam: {r.examinationId?.name || 'Examination'}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-xl text-xs font-extrabold uppercase ${r.status === 'pass' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                          {r.status}
                        </span>
                        <button
                          onClick={() => downloadReportCard(r._id, `${r.studentId?.firstName}_${r.studentId?.lastName}`)}
                          className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs shadow-xs transition-all cursor-pointer flex items-center gap-1"
                        >
                          <Download className="w-3.5 h-3.5" /> PDF Report Card
                        </button>
                      </div>
                    </div>

                    {/* Result Summary Bar */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                      <div className="p-3 bg-white rounded-xl border text-xs">
                        <span className="text-[10px] font-bold text-slate-400 uppercase">Total Marks</span>
                        <span className="text-base font-black text-slate-900 font-mono block mt-0.5">{r.totalMarks} / {r.maxTotalMarks}</span>
                      </div>
                      <div className="p-3 bg-white rounded-xl border text-xs">
                        <span className="text-[10px] font-bold text-slate-400 uppercase">Percentage</span>
                        <span className="text-base font-black text-indigo-700 font-mono block mt-0.5">{r.percentage}%</span>
                      </div>
                      <div className="p-3 bg-white rounded-xl border text-xs">
                        <span className="text-[10px] font-bold text-slate-400 uppercase">GPA Score</span>
                        <span className="text-base font-black text-emerald-600 font-mono block mt-0.5">{r.gpa} / 4.0</span>
                      </div>
                      <div className="p-3 bg-white rounded-xl border text-xs">
                        <span className="text-[10px] font-bold text-slate-400 uppercase">Class Rank</span>
                        <span className="text-base font-black text-purple-700 block mt-0.5">#{r.rank}</span>
                      </div>
                    </div>

                    {/* Marks Table */}
                    <div className="border border-slate-200 rounded-xl overflow-hidden bg-white text-xs">
                      <table className="w-full text-left">
                        <thead className="bg-slate-100 font-black uppercase text-[10px] text-slate-600">
                          <tr>
                            <th className="p-2.5">Subject</th>
                            <th className="p-2.5 text-right">Marks Obtained</th>
                            <th className="p-2.5 text-right">Max Marks</th>
                            <th className="p-2.5 text-right">Grade</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-semibold">
                          {r.marks?.map((m, idx) => (
                            <tr key={idx}>
                              <td className="p-2.5 font-bold text-slate-800">{m.subjectId?.name || 'Subject'}</td>
                              <td className="p-2.5 text-right font-mono text-emerald-600">{m.marksObtained}</td>
                              <td className="p-2.5 text-right font-mono text-slate-400">{m.maxMarks}</td>
                              <td className="p-2.5 text-right font-mono font-extrabold text-indigo-700">{m.grade}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      )}

      {/* ------------------------------------------------------------------- */}
      {/* TAB 4: UNIFIED ALL-SUBJECT MASTER MARKS ENTRY MATRIX (EXCEL SPREADSHEET STYLE) */}
      {/* ------------------------------------------------------------------- */}
      {!isStudent && activeTab === 'marks-entry' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Grid className="w-4 h-4 text-emerald-600" />
                All-Subject Class Master Marks Entry Matrix Spreadsheet
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Fill all subject marks side-by-side for all enrolled students in a single Excel-style spreadsheet grid view. Total marks, percentage, and ranks calculate live.
              </p>
            </div>

            <button
              onClick={handleSaveAllClassSubjectMarks}
              disabled={savingMarks || studentsForMarks.length === 0}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-2xl text-xs shadow-md shadow-emerald-600/20 transition-all cursor-pointer disabled:opacity-50 flex items-center gap-2 shrink-0"
            >
              <Save className="w-4 h-4" />
              <span>{savingMarks ? 'Saving Matrix...' : 'Save All Subject Marks & Calculate Ranks'}</span>
            </button>
          </div>

          <form onSubmit={handleSaveAllClassSubjectMarks} className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-64">
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Select Class Standard</label>
                <select
                  value={marksEntryClassId}
                  onChange={(e) => {
                    const newCId = e.target.value;
                    setMarksEntryClassId(newCId);
                    loadMasterMarksSpreadsheet(newCId);
                  }}
                  className="w-full px-3 py-2 border rounded-xl text-xs font-bold bg-white focus:ring-2 focus:ring-emerald-500"
                >
                  {classes.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="button"
                onClick={() => loadMasterMarksSpreadsheet()}
                className="mt-5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs flex items-center gap-1.5"
              >
                <Grid className="w-3.5 h-3.5" /> Reload Class Spreadsheet
              </button>
            </div>

            {loadingMatrix ? (
              <div className="p-12 text-center text-xs font-bold text-slate-400">Loading Excel-style class spreadsheet matrix...</div>
            ) : studentsForMarks.length === 0 ? (
              <div className="p-12 text-center text-slate-400 font-bold text-xs">No students enrolled in selected class standard.</div>
            ) : (
              <div className="overflow-x-auto border border-slate-200 rounded-2xl shadow-xs">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-slate-900 text-white uppercase text-[10px] font-black">
                    <tr>
                      <th className="p-3 border-r border-slate-800 sticky left-0 bg-slate-900 z-10">Student Name</th>
                      <th className="p-3 border-r border-slate-800">Admission No</th>
                      {/* Render columns for ALL class subjects */}
                      {classSubjects.map((sub) => (
                        <th key={sub._id} className="p-3 border-r border-slate-800 text-center min-w-[120px]">
                          {sub.name}
                          <span className="block text-[9px] text-emerald-400 font-mono">Max: 100</span>
                        </th>
                      ))}
                      <th className="p-3 border-r border-slate-800 text-right bg-slate-950">Total Marks</th>
                      <th className="p-3 border-r border-slate-800 text-right bg-slate-950">Percentage</th>
                      <th className="p-3 text-center bg-slate-950">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 font-semibold text-slate-800">
                    {studentsForMarks.map((s) => {
                      const studentMarks = matrixMarksData[s._id] || {};
                      let total = 0;
                      let maxTotal = classSubjects.length * 100;
                      let isPass = true;

                      classSubjects.forEach((sub) => {
                        const val = Number(studentMarks[sub._id] || 0);
                        total += val;
                        if (val < 40) isPass = false;
                      });

                      const pct = maxTotal > 0 ? ((total / maxTotal) * 100).toFixed(1) : 0;

                      return (
                        <tr key={s._id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="p-3 font-black text-slate-900 border-r border-slate-200 sticky left-0 bg-white">
                            {s.firstName} {s.lastName}
                          </td>
                          <td className="p-3 font-mono text-slate-500 border-r border-slate-200">{s.admissionNumber}</td>

                          {/* Editable Cells for EVERY Subject */}
                          {classSubjects.map((sub) => (
                            <td key={sub._id} className="p-2 border-r border-slate-200 text-center bg-emerald-50/20">
                              <input
                                type="number"
                                min="0"
                                max="100"
                                value={studentMarks[sub._id] !== undefined ? studentMarks[sub._id] : 85}
                                onChange={(e) => handleCellMarkChange(s._id, sub._id, e.target.value)}
                                className="w-20 px-2 py-1.5 border border-slate-300 rounded-lg text-xs font-black font-mono text-center text-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white shadow-xs"
                              />
                            </td>
                          ))}

                          <td className="p-3 border-r border-slate-200 text-right font-black font-mono text-slate-900 bg-slate-50">
                            {total} / {maxTotal}
                          </td>
                          <td className="p-3 border-r border-slate-200 text-right font-black font-mono text-indigo-700 bg-indigo-50/30">
                            {pct}%
                          </td>
                          <td className="p-3 text-center bg-slate-50">
                            <span className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase ${isPass ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' : 'bg-rose-100 text-rose-800 border border-rose-200'}`}>
                              {isPass ? 'PASS' : 'FAIL'}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </form>
        </div>
      )}

      {/* SCHEDULE TIMETABLE MODAL (CLASS TEACHERS ENABLED) */}
      {isScheduleModalOpen && (
        <Modal isOpen={isScheduleModalOpen} onClose={() => setIsScheduleModalOpen(false)} title="Schedule Exam Subject Timetable">
          <form onSubmit={handleScheduleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Select Subject</label>
              <select
                value={scheduleForm.subjectId}
                onChange={(e) => setScheduleForm({ ...scheduleForm, subjectId: e.target.value })}
                className="w-full px-3 py-2 border rounded-xl text-xs font-bold bg-white focus:ring-2 focus:ring-indigo-500"
              >
                {subjectsList.map((s) => (
                  <option key={s._id} value={s._id}>
                    {s.name} ({s.code || 'SUB'})
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Exam Date</label>
                <input
                  type="date"
                  required
                  value={scheduleForm.examDate}
                  onChange={(e) => setScheduleForm({ ...scheduleForm, examDate: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl text-xs font-semibold focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Timing</label>
                <input
                  type="text"
                  required
                  value={scheduleForm.startTime}
                  onChange={(e) => setScheduleForm({ ...scheduleForm, startTime: e.target.value })}
                  placeholder="09:00 AM - 12:00 PM"
                  className="w-full px-3 py-2 border rounded-xl text-xs font-semibold focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Max Marks</label>
                <input
                  type="number"
                  required
                  value={scheduleForm.maxMarks}
                  onChange={(e) => setScheduleForm({ ...scheduleForm, maxMarks: Number(e.target.value) })}
                  className="w-full px-3 py-2 border rounded-xl text-xs font-bold font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Pass Marks</label>
                <input
                  type="number"
                  required
                  value={scheduleForm.passMarks}
                  onChange={(e) => setScheduleForm({ ...scheduleForm, passMarks: Number(e.target.value) })}
                  className="w-full px-3 py-2 border rounded-xl text-xs font-bold font-mono text-emerald-600"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t">
              <button type="button" onClick={() => setIsScheduleModalOpen(false)} className="px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-xl text-xs">
                Cancel
              </button>
              <button type="submit" disabled={savingSchedule} className="px-5 py-2 bg-indigo-600 text-white font-bold rounded-xl text-xs shadow-md disabled:opacity-50">
                {savingSchedule ? 'Saving Schedule...' : 'Save Subject Schedule'}
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* CREATE EXAM MODAL (ADMIN ROLE) */}
      {isExamModalOpen && (
        <Modal isOpen={isExamModalOpen} onClose={() => setIsExamModalOpen(false)} title="Create New Examination">
          <form onSubmit={handleCreateExam} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Examination Title</label>
              <input
                type="text"
                required
                value={examName}
                onChange={(e) => setExamName(e.target.value)}
                placeholder="e.g. Mid-Term Examination 2026"
                className="w-full px-3 py-2 border rounded-xl text-xs font-semibold focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Term</label>
              <select value={examTerm} onChange={(e) => setExamTerm(e.target.value)} className="w-full px-3 py-2 border rounded-xl text-xs font-semibold bg-white">
                <option value="Term 1">Term 1</option>
                <option value="Term 2">Term 2</option>
                <option value="Final">Final</option>
              </select>
            </div>
            <div className="flex justify-end gap-2 pt-2 border-t">
              <button type="button" onClick={() => setIsExamModalOpen(false)} className="px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-xl text-xs">
                Cancel
              </button>
              <button type="submit" className="px-5 py-2 bg-indigo-600 text-white font-bold rounded-xl text-xs shadow-md">
                Create Exam Term
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
