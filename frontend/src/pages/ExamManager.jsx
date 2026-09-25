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
} from 'lucide-react';

export default function ExamManager() {
  const { user } = useAuth();
  const { addToast } = useNotification();
  const role = user?.role || 'student';
  const isStudent = role === 'student';
  const isTeacher = role === 'teacher';
  const isAdmin = ['admin', 'super_admin'].includes(role);

  // Active Main Tab
  const [activeTab, setActiveTab] = useState(isStudent ? 'admit-card' : 'results'); // 'admit-card' | 'timetable' | 'results' | 'marks-entry' | 'schedule-timetable'

  const [exams, setExams] = useState([]);
  const [selectedExamId, setSelectedExamId] = useState('');
  const [loading, setLoading] = useState(true);

  // Classes & Subjects State
  const [classes, setClasses] = useState([]);
  const [selectedClassId, setSelectedClassId] = useState('');
  const [selectedSectionId, setSelectedSectionId] = useState('');
  const [teacherAssignedClasses, setTeacherAssignedClasses] = useState([]);
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
  const [classListForSchedule, setClassListForSchedule] = useState([]);
  const [subjectsList, setSubjectsList] = useState([]);
  const [savingSchedule, setSavingSchedule] = useState(false);

  // Marks Entry Form State (Subject Teacher)
  const [marksEntryClassId, setMarksEntryClassId] = useState('');
  const [marksEntrySectionId, setMarksEntrySectionId] = useState('');
  const [marksEntrySubjectId, setMarksEntrySubjectId] = useState('');
  const [studentsForMarks, setStudentsForMarks] = useState([]);
  const [marksData, setMarksData] = useState({}); // { studentId: marksObtained }
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
        api.get('/academics/subjects'),
      ]);

      if (classRes.data.success) {
        const classData = classRes.data.data || [];
        setClasses(classData);
        setClassListForSchedule(classData);

        if (classData.length > 0) {
          setSelectedClassId(classData[0]._id);
          setMarksEntryClassId(classData[0]._id);
        }

        // Check teacher class teacher assignment
        if (isTeacher && user?.profileId) {
          const tId = (user.profileId._id || user.profileId).toString();
          let myClassTeacherObj = false;

          for (const c of classData) {
            if (c.classTeacher && c.classTeacher.toString() === tId) {
              myClassTeacherObj = true;
            }
            if (c.sections) {
              for (const s of c.sections) {
                if (s.classTeacher && s.classTeacher.toString() === tId) {
                  myClassTeacherObj = true;
                }
              }
            }
          }
          setIsClassTeacher(myClassTeacherObj);
        }
      }

      if (subRes.data.success) {
        setSubjectsList(subRes.data.data || []);
        if (subRes.data.data.length > 0) {
          setScheduleForm((prev) => ({ ...prev, subjectId: subRes.data.data[0]._id }));
          setMarksEntrySubjectId(subRes.data.data[0]._id);
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

  const loadStudentsForMarksEntry = async () => {
    if (!marksEntryClassId) return;
    try {
      const res = await api.get(`/students?classId=${marksEntryClassId}`);
      if (res.data.success) {
        setStudentsForMarks(res.data.data || []);
        const initMarks = {};
        (res.data.data || []).forEach((s) => {
          initMarks[s._id] = 85;
        });
        setMarksData(initMarks);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveResultsSubmit = async (e) => {
    e.preventDefault();
    if (!selectedExamId || !marksEntryClassId || !marksEntrySubjectId) {
      addToast('Please select exam term, class, and subject', 'error');
      return;
    }

    setSavingMarks(true);
    try {
      const formattedResults = studentsForMarks.map((s) => ({
        studentId: s._id,
        marks: [
          {
            subjectId: marksEntrySubjectId,
            marksObtained: Number(marksData[s._id] || 0),
            maxMarks: 100,
            passMarks: 40,
          },
        ],
      }));

      const res = await api.post('/exams/results', {
        examinationId: selectedExamId,
        classId: marksEntryClassId,
        sectionId: marksEntrySectionId || '6ab602657aac21ab3332a255',
        results: formattedResults,
      });

      if (res.data.success) {
        addToast('Subject results recorded & ranks updated!', 'success');
        fetchResults(selectedExamId, marksEntryClassId);
        setActiveTab('results');
      }
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to save results', 'error');
    } finally {
      setSavingMarks(false);
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
              {isStudent ? 'My Examinations, Hall Ticket & Results' : 'Examinations, Class Timetables & Gradebook'}
            </h1>
            <p className="text-xs text-indigo-200 font-medium">
              {isStudent
                ? 'Print your examination Hall Ticket/Admit Card, check your class exam schedule, and view personal report cards.'
                : 'Manage examination terms, class teacher timetable scheduling, and subject teacher marks entry.'}
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

            {isTeacher && (
              <button
                onClick={() => {
                  setActiveTab('marks-entry');
                  loadStudentsForMarksEntry();
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                  activeTab === 'marks-entry' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-300 hover:text-white'
                }`}
              >
                <CheckSquare className="w-3.5 h-3.5" /> Enter Marks
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
      {/* TAB 2: EXAM TIMETABLE (SEEN ONLY BY STUDENTS OF THAT CLASS, CREATED BY CLASS TEACHER) */}
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

            {/* Teacher Schedule Button (Class Teachers Only) */}
            {isTeacher && (
              <button
                onClick={() => setIsScheduleModalOpen(true)}
                className={`px-4 py-2 text-white font-extrabold rounded-2xl text-xs shadow-md flex items-center gap-1.5 transition-all cursor-pointer ${
                  isClassTeacher ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-slate-400 cursor-not-allowed'
                }`}
                disabled={!isClassTeacher}
                title={!isClassTeacher ? 'Only assigned Class Teachers can schedule exam timetables' : 'Schedule Exam Subject'}
              >
                <Plus className="w-4 h-4" />
                <span>{isClassTeacher ? 'Schedule Class Exam Subject' : 'Class Teacher Only'}</span>
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
                  : 'Subject Teachers calculate student marks, auto-compute GPAs, and issue PDF report cards.'}
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
      {/* TEACHER TAB 4: SUBJECT MARKS ENTRY FORM */}
      {/* ------------------------------------------------------------------- */}
      {isTeacher && activeTab === 'marks-entry' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <CheckSquare className="w-4 h-4 text-emerald-600" />
                Subject Teacher Marks Entry Portal
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Subject teachers can enter student marks for their assigned subjects. Grades, percentages, and ranks are calculated automatically.
              </p>
            </div>
          </div>

          <form onSubmit={handleSaveResultsSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Select Class Standard</label>
                <select
                  value={marksEntryClassId}
                  onChange={(e) => {
                    setMarksEntryClassId(e.target.value);
                    loadStudentsForMarksEntry();
                  }}
                  className="w-full px-3 py-2 border rounded-xl text-xs font-bold bg-white"
                >
                  {classes.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Select Subject</label>
                <select
                  value={marksEntrySubjectId}
                  onChange={(e) => setMarksEntrySubjectId(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl text-xs font-bold bg-white"
                >
                  {subjectsList.map((s) => (
                    <option key={s._id} value={s._id}>
                      {s.name} ({s.code || 'SUB'})
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-end">
                <button
                  type="button"
                  onClick={loadStudentsForMarksEntry}
                  className="w-full py-2 bg-slate-900 text-white font-bold rounded-xl text-xs"
                >
                  Load Student List
                </button>
              </div>
            </div>

            {/* Student Marks Roster */}
            <div className="border border-slate-200 rounded-2xl overflow-hidden text-xs">
              <table className="w-full text-left">
                <thead className="bg-slate-100 font-black uppercase text-[10px] text-slate-600 border-b border-slate-200">
                  <tr>
                    <th className="p-3">Student Name</th>
                    <th className="p-3">Admission No</th>
                    <th className="p-3 text-right">Max Marks</th>
                    <th className="p-3 text-right">Marks Obtained</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                  {studentsForMarks.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="p-8 text-center text-slate-400">Click Load Student List to enter marks.</td>
                    </tr>
                  ) : (
                    studentsForMarks.map((s) => (
                      <tr key={s._id} className="hover:bg-slate-50">
                        <td className="p-3 font-bold text-slate-900">{s.firstName} {s.lastName}</td>
                        <td className="p-3 font-mono text-slate-500">{s.admissionNumber}</td>
                        <td className="p-3 text-right font-mono font-bold text-slate-400">100</td>
                        <td className="p-3 text-right">
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={marksData[s._id] || ''}
                            onChange={(e) => setMarksData({ ...marksData, [s._id]: e.target.value })}
                            className="w-24 px-3 py-1.5 border border-emerald-300 rounded-xl text-xs font-black font-mono text-right text-emerald-700 bg-white"
                          />
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <button
              type="submit"
              disabled={savingMarks || studentsForMarks.length === 0}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-xl text-xs shadow-md shadow-emerald-600/20 disabled:opacity-50 cursor-pointer"
            >
              {savingMarks ? 'Saving Results...' : 'Save Subject Marks & Recalculate Class Ranks'}
            </button>
          </form>
        </div>
      )}

      {/* SCHEDULE TIMETABLE MODAL (CLASS TEACHER ONLY) */}
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
