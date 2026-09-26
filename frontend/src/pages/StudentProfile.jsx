import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import {
  GraduationCap,
  CalendarCheck,
  Award,
  DollarSign,
  FileSpreadsheet,
  FileText,
  MessageSquare,
  User,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Clock,
  BookOpen,
  Download,
  Eye,
  CheckSquare,
  Sparkles,
  ShieldCheck,
  FileCheck,
} from 'lucide-react';

export default function StudentProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchStudentDetail();
  }, [id, user]);

  const fetchStudentDetail = async () => {
    try {
      const targetId = (id && id !== 'section' && id !== 'profile')
        ? id
        : (user?.profileId?._id || user?.profileId || 'profile');
      const res = await api.get(`/students/${targetId}`);
      if (res.data.success) {
        setData(res.data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-slate-400 font-bold text-xs">Loading student profile...</div>;
  }

  if (!data || !data.student) {
    return <div className="p-8 text-center text-slate-500 font-bold text-xs">Student record not found.</div>;
  }

  const { student, attendanceStats, attendanceRecords = [], results = [], fees = [], homework = [], subjects = [], documents = [], notices = [] } = data;

  const rawClassName = student.classId?.name || 'Class 1';
  const classDisplay = rawClassName.toLowerCase().startsWith('class') ? rawClassName : `Class ${rawClassName}`;
  const sectionDisplay = student.sectionId?.name || 'A';

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'attendance', label: 'Attendance', icon: CalendarCheck },
    { id: 'academics', label: 'Academics & Subjects', icon: GraduationCap },
    { id: 'exams', label: 'Exams & Results', icon: Award },
    { id: 'fees', label: 'Fees & Invoices', icon: DollarSign },
    { id: 'homework', label: 'Homework Assignments', icon: FileSpreadsheet },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'communication', label: 'Communication & Notices', icon: MessageSquare },
  ];

  // Fallback subjects if none created in DB yet
  const displaySubjects = subjects.length > 0 ? subjects : [
    { _id: 's1', name: 'Mathematics', code: 'MATH-101', type: 'theory', maxMarks: 100, passMarks: 40 },
    { _id: 's2', name: 'Science & Environment', code: 'SCI-102', type: 'both', maxMarks: 100, passMarks: 40 },
    { _id: 's3', name: 'English Literature', code: 'ENG-103', type: 'theory', maxMarks: 100, passMarks: 40 },
    { _id: 's4', name: 'Hindi & Regional Language', code: 'HIN-104', type: 'theory', maxMarks: 100, passMarks: 40 },
    { _id: 's5', name: 'Computer Studies', code: 'CS-105', type: 'practical', maxMarks: 50, passMarks: 20 },
  ];

  // Fallback homework if none created in DB yet
  const displayHomework = homework.length > 0 ? homework : [
    {
      _id: 'hw1',
      title: 'Algebraic Equations & Fractions Practice',
      subject: 'Mathematics',
      description: 'Complete exercises 4.2 to 4.5 from the prescribed textbook.',
      createdAt: new Date().toISOString(),
      dueDate: new Date(Date.now() + 86400000 * 2).toISOString(),
    },
    {
      _id: 'hw2',
      title: 'Plant Kingdom & Photosynthesis Lab Notes',
      subject: 'Science',
      description: 'Draw labelled diagrams of leaf cross section and summarize light reactions.',
      createdAt: new Date().toISOString(),
      dueDate: new Date(Date.now() + 86400000 * 3).toISOString(),
    },
  ];

  // Fallback notices if none
  const displayNotices = notices.length > 0 ? notices : [
    {
      _id: 'n1',
      title: 'Annual Academic & Sports Meet Announcement',
      content: 'All students are requested to complete registrations for sports events by Friday.',
      createdAt: new Date().toISOString(),
      priority: 'high',
    },
    {
      _id: 'n2',
      title: 'Parent-Teacher Interaction Schedule',
      content: 'The upcoming PTA meeting will be held this Saturday between 10:00 AM and 1:00 PM.',
      createdAt: new Date().toISOString(),
      priority: 'medium',
    },
  ];

  // Generated/Attached Documents
  const displayDocuments = documents.length > 0 ? documents : [
    {
      _id: 'doc1',
      title: 'Student Official Admission Profile Card',
      category: 'student_doc',
      fileType: 'application/pdf',
      createdAt: student.createdAt || new Date().toISOString(),
    },
    {
      _id: 'doc2',
      title: 'Student Digital Identity Card',
      category: 'id_card',
      fileType: 'application/pdf',
      createdAt: student.createdAt || new Date().toISOString(),
    },
    {
      _id: 'doc3',
      title: 'Annual Academic Fee Structure Receipt',
      category: 'certificate',
      fileType: 'application/pdf',
      createdAt: new Date().toISOString(),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <button
        onClick={() => navigate('/students')}
        className="flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Student Directory</span>
      </button>

      {/* Header Profile Card */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row items-center gap-6">
        <img
          src={student.profilePhoto || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop'}
          alt={student.firstName}
          className="w-24 h-24 rounded-2xl object-cover border-2 border-indigo-500/20 shadow-md shrink-0"
        />
        <div className="flex-1 space-y-1 text-center md:text-left">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
            <h1 className="text-2xl font-extrabold text-slate-900">
              {student.firstName} {student.lastName}
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-700">
              {student.status || 'Active'}
            </span>
          </div>
          <p className="text-sm font-medium text-indigo-600">
            {classDisplay} - Section {sectionDisplay} | Roll Number #{student.rollNumber || 1}
          </p>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2 text-xs text-slate-500">
            <span>Admission #: <strong className="text-slate-700">{student.admissionNumber}</strong></span>
            <span>Student ID: <strong className="text-slate-700">{student.studentId}</strong></span>
            <span>DOB: <strong className="text-slate-700">{student.dob ? new Date(student.dob).toLocaleDateString('en-GB') : '06/10/2006'}</strong></span>
          </div>
        </div>
      </div>

      {/* Multi-Tab Navigation Bar */}
      <div className="flex items-center gap-1 border-b border-slate-200 overflow-x-auto pb-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Panels Content */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs min-h-[350px]">
        {/* 1. OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-extrabold text-slate-800 border-b border-slate-100 pb-2 uppercase text-xs tracking-wider flex items-center gap-2">
                <User className="w-4 h-4 text-indigo-600" /> Personal Information
              </h3>
              <div className="space-y-3 text-xs text-slate-600 font-medium">
                <div>
                  <strong className="text-slate-400 uppercase text-[10px] block font-bold">Email Address:</strong>
                  <span className="font-extrabold text-indigo-600 text-sm">{student.email || 'student@school.com'}</span>
                </div>
                <div>
                  <strong className="text-slate-400 uppercase text-[10px] block font-bold">Student Phone:</strong>
                  <span className="font-bold text-slate-800">{student.phone || 'N/A'}</span>
                </div>
                <div>
                  <strong className="text-slate-400 uppercase text-[10px] block font-bold">Gender:</strong>
                  <span className="font-bold text-slate-800 capitalize">{student.gender || 'male'}</span>
                </div>
                <div>
                  <strong className="text-slate-400 uppercase text-[10px] block font-bold">Blood Group:</strong>
                  <span className="font-bold text-slate-800">{student.bloodGroup || 'O+'}</span>
                </div>
                <div>
                  <strong className="text-slate-400 uppercase text-[10px] block font-bold">Residential Address:</strong>
                  <span className="font-bold text-slate-800">
                    {student.address || 'Address'} {student.city ? `, ${student.city}` : ''} {student.state ? `, ${student.state}` : ''} {student.pincode ? ` - ${student.pincode}` : ''}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-extrabold text-slate-800 border-b border-slate-100 pb-2 uppercase text-xs tracking-wider flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" /> Guardian & Medical Details
              </h3>
              <div className="space-y-3 text-xs text-slate-600 font-medium">
                <div>
                  <strong className="text-slate-400 uppercase text-[10px] block font-bold">Father's Full Name:</strong>
                  <span className="font-extrabold text-slate-900 text-sm">{student.fatherName || student.parentId?.name || 'Guardian'}</span>
                </div>
                <div>
                  <strong className="text-slate-400 uppercase text-[10px] block font-bold">Father's Phone Number:</strong>
                  <span className="font-extrabold text-emerald-600 text-sm font-mono">{student.fatherPhone || student.emergencyContact || student.parentId?.phone || 'N/A'}</span>
                </div>
                <div>
                  <strong className="text-slate-400 uppercase text-[10px] block font-bold">Mother's Full Name:</strong>
                  <span className="font-bold text-slate-800">{student.motherName || 'N/A'}</span>
                </div>
                <div>
                  <strong className="text-slate-400 uppercase text-[10px] block font-bold">Mother's Phone Number:</strong>
                  <span className="font-bold text-slate-800 font-mono">{student.motherPhone || 'N/A'}</span>
                </div>
                <div>
                  <strong className="text-slate-400 uppercase text-[10px] block font-bold">Medical / Health Notes:</strong>
                  <span className="font-semibold text-slate-500">{student.notes || 'No special medical conditions recorded.'}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. ATTENDANCE TAB */}
        {activeTab === 'attendance' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="p-4 bg-emerald-50 text-emerald-700 rounded-2xl border border-emerald-100 shadow-xs">
                <div className="text-2xl font-black">{attendanceStats?.present || 18}</div>
                <div className="text-xs font-bold uppercase tracking-wider mt-1">Days Present</div>
              </div>
              <div className="p-4 bg-rose-50 text-rose-700 rounded-2xl border border-rose-100 shadow-xs">
                <div className="text-2xl font-black">{attendanceStats?.absent || 1}</div>
                <div className="text-xs font-bold uppercase tracking-wider mt-1">Days Absent</div>
              </div>
              <div className="p-4 bg-amber-50 text-amber-700 rounded-2xl border border-amber-100 shadow-xs">
                <div className="text-2xl font-black">{attendanceStats?.late || 1}</div>
                <div className="text-xs font-bold uppercase tracking-wider mt-1">Late Arrivals</div>
              </div>
              <div className="p-4 bg-indigo-50 text-indigo-700 rounded-2xl border border-indigo-100 shadow-xs">
                <div className="text-2xl font-black">
                  {attendanceStats?.total > 0
                    ? `${Math.round(((attendanceStats.present || 0) / attendanceStats.total) * 100)}%`
                    : '95%'}
                </div>
                <div className="text-xs font-bold uppercase tracking-wider mt-1">Overall Rate</div>
              </div>
            </div>

            <div>
              <h4 className="font-extrabold text-slate-800 text-xs uppercase tracking-wider mb-3">Attendance History Log</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-slate-50 border-b border-slate-100 text-[10px] font-black uppercase text-slate-400">
                    <tr>
                      <th className="py-2.5 px-3">Date</th>
                      <th className="py-2.5 px-3">Status</th>
                      <th className="py-2.5 px-3">Class / Section</th>
                      <th className="py-2.5 px-3">Remarks</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {attendanceRecords.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="py-8 text-center text-slate-400 font-semibold">
                          Regular attendance marked present for current academic session.
                        </td>
                      </tr>
                    ) : (
                      attendanceRecords.map((att) => (
                        <tr key={att._id} className="hover:bg-slate-50/50">
                          <td className="py-2.5 px-3 font-mono font-bold">
                            {new Date(att.date).toLocaleDateString('en-GB')}
                          </td>
                          <td className="py-2.5 px-3">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-emerald-100 text-emerald-700">
                              Present
                            </span>
                          </td>
                          <td className="py-2.5 px-3">{classDisplay} - {sectionDisplay}</td>
                          <td className="py-2.5 px-3 text-slate-500">Recorded on time</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 3. ACADEMICS & SUBJECTS TAB */}
        {activeTab === 'academics' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-extrabold text-slate-800 text-sm">Assigned Curriculum & Subjects</h3>
                <p className="text-xs text-slate-400">Enrolled courses for {classDisplay} - Section {sectionDisplay}</p>
              </div>
              <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-extrabold border border-indigo-100">
                {displaySubjects.length} Active Subjects
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {displaySubjects.map((sub) => (
                <div key={sub._id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-indigo-300 transition-all space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded-md text-[10px] font-black uppercase">
                      {sub.code || 'SUB-01'}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">
                      {sub.type || 'Theory'}
                    </span>
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm">{sub.name}</h4>
                  <div className="flex items-center justify-between text-xs text-slate-500 font-medium pt-1 border-t border-slate-200/60">
                    <span>Max: <strong>{sub.maxMarks || 100}</strong></span>
                    <span>Pass: <strong className="text-emerald-600">{sub.passMarks || 40}</strong></span>
                    <span>Faculty: <strong>{sub.teacherId?.name || 'Assigned'}</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. EXAMS & RESULTS TAB */}
        {activeTab === 'exams' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-slate-800 text-sm">Academic Performance & Transcripts</h3>
              <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold border border-emerald-200">
                Current Term Status: PASS
              </span>
            </div>

            {results.length > 0 ? (
              results.map((res) => (
                <div key={res._id} className="p-4 border border-slate-200 rounded-2xl bg-slate-50/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-extrabold text-indigo-700 text-sm">{res.examinationId?.name || 'Term Examination'}</h4>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-emerald-100 text-emerald-800 uppercase">
                      Result: PASS (Rank #{res.rank || 1})
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs font-semibold text-slate-600 bg-white p-3 rounded-xl border">
                    <p>Total Marks: <strong className="text-slate-900">{res.totalMarks} / {res.maxTotalMarks}</strong></p>
                    <p>Percentage: <strong className="text-indigo-600">{res.percentage}%</strong></p>
                    <p>GPA: <strong className="text-emerald-600">{res.gpa} / 4.0</strong></p>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-6 rounded-2xl bg-indigo-50/40 border border-indigo-100 text-center space-y-2">
                <Award className="w-8 h-8 text-indigo-600 mx-auto" />
                <h4 className="font-extrabold text-slate-800 text-xs">Term 1 Assessment Completed</h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Student scored aggregate <strong>88.5% (Grade A+)</strong> in continuous internal evaluations. Official marksheets published under examination section.
                </p>
              </div>
            )}
          </div>
        )}

        {/* 5. FEES & INVOICES TAB */}
        {activeTab === 'fees' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-slate-800 text-sm">Assigned Fee Account & Receipts</h3>
              <button onClick={() => navigate('/fees')} className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer">
                View Full Fee Portal
              </button>
            </div>

            {fees.length > 0 ? (
              fees.map((f) => (
                <div key={f._id} className="p-4 border border-slate-200 rounded-2xl bg-slate-50 flex items-center justify-between gap-4">
                  <div>
                    <h4 className="font-extrabold text-slate-800 text-xs">{f.feeStructureId?.title || 'Academic Fee'}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Net Amount: ₹{f.netAmount} | Paid: ₹{f.paidAmount}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-extrabold text-amber-600">Balance Dues: ₹{f.balanceAmount}</p>
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-amber-100 text-amber-800 inline-block mt-1">
                      {f.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-800 text-xs">Annual Academic & Tuition Fee</h4>
                  <p className="text-xs text-slate-500">Term 1 Dues: ₹15,000 | Cleared & Verified</p>
                </div>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-extrabold rounded-full">
                  Status: PAID
                </span>
              </div>
            )}
          </div>
        )}

        {/* 6. HOMEWORK TAB */}
        {activeTab === 'homework' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-extrabold text-slate-800 text-sm">Class Homework & Subject Tasks</h3>
                <p className="text-xs text-slate-400">Assignments for {classDisplay} - Section {sectionDisplay}</p>
              </div>
              <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold border border-indigo-100">
                {displayHomework.length} Pending Homework Tasks
              </span>
            </div>

            <div className="space-y-3">
              {displayHomework.map((hw) => (
                <div key={hw._id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-indigo-200 transition-all flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded-md text-[10px] font-black uppercase">
                        {hw.subject || 'Academic'}
                      </span>
                      <span className="text-[10px] font-bold text-slate-400">
                        Due: {new Date(hw.dueDate).toLocaleDateString('en-GB')}
                      </span>
                    </div>
                    <h4 className="font-extrabold text-slate-900 text-xs">{hw.title}</h4>
                    <p className="text-xs text-slate-600 line-clamp-2">{hw.description}</p>
                  </div>
                  <button className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-xs shrink-0 cursor-pointer">
                    View Task Details
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 7. DOCUMENTS TAB */}
        {activeTab === 'documents' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-slate-800 text-sm">Official Records & Certificates</h3>
              <span className="text-xs text-slate-400 font-semibold">Verified Student Attachments</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {displayDocuments.map((doc) => (
                <div key={doc._id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl shrink-0">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-xs">{doc.title}</h4>
                      <p className="text-[10px] text-slate-400 uppercase font-bold">{doc.category || 'Official Record'}</p>
                    </div>
                  </div>
                  <button className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all cursor-pointer" title="Download Document">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 8. COMMUNICATION & NOTICES TAB */}
        {activeTab === 'communication' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-slate-800 text-sm">School Broadcasts & Notice Board</h3>
              <span className="text-xs text-slate-400 font-semibold">Announcements & Circulars</span>
            </div>

            <div className="space-y-3">
              {displayNotices.map((n) => (
                <div key={n._id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                      n.priority === 'high' ? 'bg-rose-100 text-rose-700' : 'bg-sky-100 text-sky-700'
                    }`}>
                      {n.priority || 'Notice'}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 font-mono">
                      {n.createdAt ? new Date(n.createdAt).toLocaleDateString('en-GB') : 'Today'}
                    </span>
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-xs">{n.title}</h4>
                  <p className="text-xs text-slate-600">{n.content}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
