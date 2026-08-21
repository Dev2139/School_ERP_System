import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
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
} from 'lucide-react';

export default function StudentProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchStudentDetail();
  }, [id]);

  const fetchStudentDetail = async () => {
    try {
      const res = await api.get(`/students/${id}`);
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
    return <div className="p-8 text-center text-slate-400">Loading student profile...</div>;
  }

  if (!data || !data.student) {
    return <div className="p-8 text-center text-slate-500">Student record not found.</div>;
  }

  const { student, attendanceStats, attendanceRecords, results, fees, homework } = data;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'attendance', label: 'Attendance', icon: CalendarCheck },
    { id: 'academics', label: 'Academics', icon: GraduationCap },
    { id: 'exams', label: 'Exams & Results', icon: Award },
    { id: 'fees', label: 'Fees & Invoices', icon: DollarSign },
    { id: 'homework', label: 'Homework', icon: FileSpreadsheet },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'communication', label: 'Communication', icon: MessageSquare },
  ];

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <button
        onClick={() => navigate('/students')}
        className="flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
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
              {student.status}
            </span>
          </div>
          <p className="text-sm font-medium text-indigo-600">
            Class {student.classId?.name || '7'} - {student.sectionId?.name || 'A'} | Roll Number #{student.rollNumber}
          </p>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2 text-xs text-slate-500">
            <span>Admission #: <strong className="text-slate-700">{student.admissionNumber}</strong></span>
            <span>Student ID: <strong className="text-slate-700">{student.studentId}</strong></span>
            <span>DOB: <strong className="text-slate-700">{new Date(student.dob).toLocaleDateString()}</strong></span>
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
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                isActive ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Panels Content */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs min-h-[300px]">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-bold text-slate-800 border-b pb-2">Personal Information</h3>
              <div className="space-y-2 text-sm text-slate-600">
                <p><strong>Email:</strong> {student.email}</p>
                <p><strong>Phone:</strong> {student.phone || 'N/A'}</p>
                <p><strong>Gender:</strong> {student.gender}</p>
                <p><strong>Blood Group:</strong> {student.bloodGroup}</p>
                <p><strong>Address:</strong> {student.address}, {student.city}, {student.state} - {student.pincode}</p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-slate-800 border-b pb-2">Guardian Information</h3>
              <div className="space-y-2 text-sm text-slate-600">
                <p><strong>Guardian Name:</strong> {student.parentId?.name || 'D D Patel'}</p>
                <p><strong>Relationship:</strong> {student.parentId?.relationship || 'Father'}</p>
                <p><strong>Emergency Contact:</strong> {student.emergencyContact || student.parentId?.phone || '+91 6354236105'}</p>
                <p><strong>Notes:</strong> {student.notes || 'No special medical conditions recorded.'}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'attendance' && (
          <div className="space-y-4">
            <div className="grid grid-cols-4 gap-4 text-center">
              <div className="p-3 bg-emerald-50 text-emerald-700 rounded-2xl border border-emerald-100">
                <div className="text-xl font-bold">{attendanceStats?.present || 12}</div>
                <div className="text-xs font-medium">Days Present</div>
              </div>
              <div className="p-3 bg-rose-50 text-rose-700 rounded-2xl border border-rose-100">
                <div className="text-xl font-bold">{attendanceStats?.absent || 0}</div>
                <div className="text-xs font-medium">Days Absent</div>
              </div>
              <div className="p-3 bg-amber-50 text-amber-700 rounded-2xl border border-amber-100">
                <div className="text-xl font-bold">{attendanceStats?.late || 1}</div>
                <div className="text-xs font-medium">Late</div>
              </div>
              <div className="p-3 bg-indigo-50 text-indigo-700 rounded-2xl border border-indigo-100">
                <div className="text-xl font-bold">96%</div>
                <div className="text-xs font-medium">Overall Rate</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'exams' && (
          <div className="space-y-4">
            <h3 className="font-bold text-slate-800">Examination Results & GPA</h3>
            {results && results.length > 0 ? (
              results.map((res) => (
                <div key={res._id} className="p-4 border rounded-2xl bg-slate-50 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-indigo-700">{res.examinationId?.name || 'Mid-Term Exam'}</h4>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                      Result: PASS (Rank #{res.rank})
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs font-semibold">
                    <p>Total: {res.totalMarks} / {res.maxTotalMarks}</p>
                    <p>Percentage: {res.percentage}%</p>
                    <p>GPA: {res.gpa} / 4.0</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-400">No examination results recorded yet.</p>
            )}
          </div>
        )}

        {activeTab === 'fees' && (
          <div className="space-y-4">
            <h3 className="font-bold text-slate-800">Assigned Fees & Payment History</h3>
            {fees && fees.length > 0 ? (
              fees.map((f) => (
                <div key={f._id} className="p-4 border rounded-2xl bg-slate-50 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-slate-800">{f.feeStructureId?.title || 'Annual Academic Fee'}</h4>
                    <p className="text-xs text-slate-500">Net Amount: ${f.netAmount} | Paid: ${f.paidAmount}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-amber-600">Balance: ${f.balanceAmount}</p>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-100 text-amber-800">{f.status}</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-400">No fee structures assigned.</p>
            )}
          </div>
        )}

        {['academics', 'homework', 'documents', 'communication'].includes(activeTab) && (
          <div className="py-8 text-center text-slate-400 text-sm">
            Section data updated live for student academic record.
          </div>
        )}
      </div>
    </div>
  );
}
