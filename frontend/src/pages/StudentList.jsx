import React, { useState, useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import StudentIdCardModal from '../components/StudentIdCardModal';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import {
  Eye,
  CreditCard,
  UserPlus,
  Users,
  School,
  Layers,
  Filter,
  CheckCircle,
  UserCheck,
  Sparkles,
} from 'lucide-react';

export default function StudentList() {
  const { user } = useAuth();
  const { addToast } = useNotification();
  const navigate = useNavigate();

  // Active View Tab: 'general' (All Students) | 'classwise' (Class-Wise Directory)
  const [activeTab, setActiveTab] = useState('general');

  // Class-Wise Directory Filters
  const [selectedClassId, setSelectedClassId] = useState('');
  const [selectedSectionId, setSelectedSectionId] = useState('');

  // Data States
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedStudentForCard, setSelectedStudentForCard] = useState(null);

  if (user?.role === 'student' && user?.profileId) {
    const pid = user.profileId._id || user.profileId;
    return <Navigate to={`/students/${pid}`} replace />;
  }

  // Form State
  const [formData, setFormData] = useState({
    admissionNumber: `ADM-${Date.now().toString().slice(-4)}`,
    studentId: `STU-${Math.floor(1000 + Math.random() * 9000)}`,
    firstName: '',
    lastName: '',
    dob: '2013-01-01',
    gender: 'male',
    email: '',
    phone: '',
    address: '123 School Way',
    city: 'Metropolis',
    state: 'New York',
    pincode: '10001',
    rollNumber: 5,
    emergencyContact: '+1 555-0199',
    classId: '',
    sectionId: '',
    academicYearId: '',
  });

  useEffect(() => {
    fetchClasses();
  }, []);

  useEffect(() => {
    fetchStudents();
  }, [page, search, selectedClassId, selectedSectionId, activeTab]);

  const fetchClasses = async () => {
    try {
      const res = await api.get('/academics/classes');
      if (res.data.success) {
        setClasses(res.data.data);
        if (res.data.data.length > 0) {
          const firstClass = res.data.data[0];
          setFormData((prev) => ({
            ...prev,
            classId: firstClass._id,
            sectionId: firstClass.sections?.[0]?._id || '',
            academicYearId: firstClass.academicYearId,
          }));
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchStudents = async () => {
    setLoading(true);
    try {
      let url = `/students?page=${page}&limit=10`;

      // If in classwise view or filter set
      if (activeTab === 'classwise') {
        if (selectedClassId) url += `&classId=${selectedClassId}`;
        if (selectedSectionId) url += `&sectionId=${selectedSectionId}`;
      }

      if (search && search.trim()) {
        url += `&search=${encodeURIComponent(search.trim())}`;
      }

      const res = await api.get(url);
      if (res.data.success) {
        setStudents(res.data.data);
        setTotal(res.data.pagination.total || res.data.data.length);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateStudent = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/students', formData);
      if (res.data.success) {
        addToast(
          `Student & User account created! Login: ${formData.email} (Initial Pass: DOB DDMMYYYY)`,
          'success'
        );
        setIsAddModalOpen(false);
        fetchStudents();
      }
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to add student', 'error');
    }
  };

  const activeClassObj = classes.find((c) => c._id === selectedClassId);
  const activeSectionObj = activeClassObj?.sections?.find((s) => s._id === selectedSectionId);

  const columns = [
    {
      header: 'Student Profile',
      render: (row) => (
        <div className="flex items-center gap-3">
          <img
            src={row.profilePhoto || `https://api.dicebear.com/7.x/avataaars/svg?seed=${row.firstName}`}
            alt={row.firstName}
            className="w-9 h-9 rounded-full object-cover border border-slate-200"
          />
          <div>
            <div
              className="font-bold text-slate-900 hover:text-indigo-600 cursor-pointer transition-colors"
              onClick={() => navigate(`/students/${row._id}`)}
            >
              {row.firstName} {row.lastName}
            </div>
            <div className="text-[11px] text-slate-400 font-mono">Adm: {row.admissionNumber}</div>
          </div>
        </div>
      ),
    },
    {
      header: 'ID / Roll',
      render: (row) => (
        <div>
          <div className="font-bold text-slate-700 font-mono">{row.studentId}</div>
          <div className="text-xs text-slate-400">Roll: {row.rollNumber}</div>
        </div>
      ),
    },
    {
      header: 'Class & Section',
      render: (row) => (
        <span className="px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-xl text-xs font-bold border border-indigo-100">
          {row.classId?.name || 'Class'} - {row.sectionId?.name || 'Sec A'}
        </span>
      ),
    },
    {
      header: 'Parent Contact',
      render: (row) => (
        <div className="text-xs text-slate-600">
          <p className="font-bold text-slate-800">{row.parentId?.name || 'Guardian'}</p>
          <p className="text-slate-400">{row.emergencyContact}</p>
        </div>
      ),
    },
    {
      header: 'Status',
      render: (row) => (
        <span
          className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
            row.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'
          }`}
        >
          {row.status}
        </span>
      ),
    },
    {
      header: 'Actions',
      render: (row) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(`/students/${row._id}`)}
            className="p-1.5 rounded-xl bg-indigo-50 text-indigo-600 hover:bg-indigo-100 text-xs font-bold flex items-center gap-1 transition-all cursor-pointer"
            title="View Full Profile"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={() => setSelectedStudentForCard(row)}
            className="p-1.5 rounded-xl bg-amber-50 text-amber-600 hover:bg-amber-100 text-xs font-bold flex items-center gap-1 transition-all cursor-pointer"
            title="Print ID Card"
          >
            <CreditCard className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner & View Switcher */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl border border-indigo-100 shadow-xs">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-black text-slate-900 uppercase tracking-tight">Student Directory</h1>
              <p className="text-xs text-slate-500 font-medium">
                Manage student enrollments, general rosters, and class-wise student lists
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl text-xs shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
          >
            <UserPlus className="w-4 h-4" />
            <span>Register New Student</span>
          </button>
        </div>

        {/* VIEW TAB SWITCHER */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 p-1.5 bg-slate-100 rounded-2xl border border-slate-200">
            <button
              onClick={() => {
                setActiveTab('general');
                setSelectedClassId('');
                setSelectedSectionId('');
                setPage(1);
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                activeTab === 'general'
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>General Student Roster</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('classwise');
                if (classes.length > 0) {
                  setSelectedClassId(classes[0]._id);
                }
                setPage(1);
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                activeTab === 'classwise'
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <School className="w-4 h-4" />
              <span>Class-Wise Directory</span>
            </button>
          </div>

          <div className="text-xs font-bold text-slate-400">
            Total Students: <span className="text-slate-900 font-black">{total}</span>
          </div>
        </div>
      </div>

      {/* CLASS-WISE FILTER BAR (WHEN IN CLASSWISE TAB) */}
      {activeTab === 'classwise' && (
        <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-md space-y-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <div className="text-[10px] font-black uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
                <Filter className="w-3.5 h-3.5" /> Class & Section Filter
              </div>
              <h2 className="text-lg font-black mt-0.5">
                {activeClassObj ? activeClassObj.name : 'Select Class'}{' '}
                {activeSectionObj ? `- ${activeSectionObj.name}` : ''}
              </h2>
            </div>

            {/* CLASS SELECTOR TABS */}
            <div className="flex flex-wrap items-center gap-2">
              {classes.map((cls) => (
                <button
                  key={cls._id}
                  onClick={() => {
                    setSelectedClassId(cls._id);
                    setSelectedSectionId('');
                    setPage(1);
                  }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                    selectedClassId === cls._id
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {cls.name} ({cls.code})
                </button>
              ))}
            </div>
          </div>

          {/* SECTION SELECTOR & CLASS SUMMARY */}
          {activeClassObj && (
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Sections:</span>
                <button
                  onClick={() => {
                    setSelectedSectionId('');
                    setPage(1);
                  }}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    !selectedSectionId
                      ? 'bg-white text-slate-900'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  All Sections
                </button>
                {activeClassObj.sections?.map((sec) => (
                  <button
                    key={sec._id}
                    onClick={() => {
                      setSelectedSectionId(sec._id);
                      setPage(1);
                    }}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      selectedSectionId === sec._id
                        ? 'bg-white text-slate-900'
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {sec.name} ({sec.roomNo})
                  </button>
                ))}
              </div>

              {activeSectionObj?.classTeacher && (
                <div className="flex items-center gap-2 px-3 py-1 bg-indigo-950/80 border border-indigo-500/30 rounded-xl text-xs text-indigo-200">
                  <UserCheck className="w-4 h-4 text-indigo-400" />
                  <span>Class Teacher: <strong className="text-white">{activeSectionObj.classTeacher.name}</strong></span>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Main Table */}
      <DataTable
        columns={columns}
        data={students}
        totalItems={total}
        page={page}
        limit={10}
        onPageChange={setPage}
        onSearchChange={setSearch}
        onAddClick={['student', 'parent'].includes(user?.role) ? null : () => setIsAddModalOpen(true)}
        addLabel="Register Student"
        loading={loading}
      />

      {/* Register Student Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Register New Student">
        <form onSubmit={handleCreateStudent} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">First Name</label>
              <input
                type="text"
                required
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="w-full px-3 py-2 border rounded-xl text-sm focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Last Name</label>
              <input
                type="text"
                required
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="w-full px-3 py-2 border rounded-xl text-sm focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Email (Login ID)</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 border rounded-xl text-sm focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Date of Birth (Optional)</label>
              <input
                type="date"
                value={formData.dob}
                onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                className="w-full px-3 py-2 border rounded-xl text-sm focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Roll Number</label>
              <input
                type="number"
                required
                value={formData.rollNumber}
                onChange={(e) => setFormData({ ...formData, rollNumber: Number(e.target.value) })}
                className="w-full px-3 py-2 border rounded-xl text-sm focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Emergency Contact</label>
              <input
                type="text"
                value={formData.emergencyContact}
                onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
                className="w-full px-3 py-2 border rounded-xl text-sm focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                Class <span className="text-rose-500">*</span>
              </label>
              <select
                required
                value={formData.classId}
                onChange={(e) => {
                  const selClass = classes.find((c) => c._id === e.target.value);
                  setFormData({
                    ...formData,
                    classId: e.target.value,
                    sectionId: selClass?.sections?.[0]?._id || '',
                  });
                }}
                className="w-full px-3 py-2 border rounded-xl text-sm bg-white font-semibold focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Select Class *</option>
                {classes.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                Section <span className="text-rose-500">*</span>
              </label>
              <select
                required
                value={formData.sectionId}
                onChange={(e) => setFormData({ ...formData, sectionId: e.target.value })}
                className="w-full px-3 py-2 border rounded-xl text-sm bg-white font-semibold focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Select Section *</option>
                {classes
                  .find((c) => c._id === formData.classId)
                  ?.sections?.map((s) => (
                    <option key={s._id} value={s._id}>
                      {s.name} ({s.roomNo})
                    </option>
                  ))}
              </select>
            </div>
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 bg-slate-100 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 rounded-xl shadow-md"
            >
              Save Student
            </button>
          </div>
        </form>
      </Modal>

      {/* ID Card Modal */}
      <StudentIdCardModal
        isOpen={Boolean(selectedStudentForCard)}
        onClose={() => setSelectedStudentForCard(null)}
        student={selectedStudentForCard}
      />
    </div>
  );
}
