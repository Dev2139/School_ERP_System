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
  Edit3,
  Trash2,
} from 'lucide-react';

export default function StudentList() {
  const { user } = useAuth();
  const { addToast } = useNotification();
  const navigate = useNavigate();

  const isPrincipal = ['super_admin', 'admin'].includes(user?.role);

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

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedStudentForCard, setSelectedStudentForCard] = useState(null);
  const [selectedStudentForEdit, setSelectedStudentForEdit] = useState(null);
  const [selectedStudentForDelete, setSelectedStudentForDelete] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  if (user?.role === 'student' && user?.profileId) {
    const pid = user.profileId._id || user.profileId;
    return <Navigate to={`/students/${pid}`} replace />;
  }

  // Registration Form State
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

  // Edit Form State
  const [editFormData, setEditFormData] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    gender: 'male',
    email: '',
    phone: '',
    admissionNumber: '',
    rollNumber: 1,
    classId: '',
    sectionId: '',
    fatherName: '',
    fatherPhone: '',
    status: 'active',
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
      let query = `?page=${page}&limit=10&search=${search}`;

      if (activeTab === 'classwise') {
        if (selectedClassId) query += `&classId=${selectedClassId}`;
        if (selectedSectionId) query += `&sectionId=${selectedSectionId}`;
      }

      const res = await api.get(`/students${query}`);
      if (res.data.success) {
        setStudents(res.data.data);
        setTotal(res.data.pagination.total);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterStudent = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await api.post('/students', formData);
      if (res.data.success) {
        addToast('Student registered successfully!', 'success');
        setIsAddModalOpen(false);
        fetchStudents();
      }
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to register student', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const openEditModal = (student) => {
    setSelectedStudentForEdit(student);
    setEditFormData({
      firstName: student.firstName || '',
      lastName: student.lastName || '',
      dob: student.dob ? new Date(student.dob).toISOString().split('T')[0] : '2013-01-01',
      gender: student.gender || 'male',
      email: student.email || '',
      phone: student.phone || '',
      admissionNumber: student.admissionNumber || '',
      rollNumber: student.rollNumber || 1,
      classId: student.classId?._id || student.classId || '',
      sectionId: student.sectionId?._id || student.sectionId || '',
      fatherName: student.fatherName || '',
      fatherPhone: student.fatherPhone || '',
      status: student.status || 'active',
    });
    setIsEditModalOpen(true);
  };

  const handleUpdateStudent = async (e) => {
    e.preventDefault();
    if (!selectedStudentForEdit) return;

    setSubmitting(true);
    try {
      const res = await api.put(`/students/${selectedStudentForEdit._id}`, editFormData);
      if (res.data.success) {
        addToast(`Student profile updated successfully!`, 'success');
        setIsEditModalOpen(false);
        fetchStudents();
      }
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to update student profile', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteStudent = async () => {
    if (!selectedStudentForDelete) return;

    setSubmitting(true);
    try {
      const res = await api.delete(`/students/${selectedStudentForDelete._id}`);
      if (res.data.success) {
        addToast(res.data.message || 'Student deleted successfully!', 'success');
        setIsDeleteModalOpen(false);
        fetchStudents();
      }
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to delete student', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const selectedClassForForm = classes.find((c) => c._id === formData.classId);
  const selectedClassForEdit = classes.find((c) => c._id === editFormData.classId);
  const selectedClassForFilter = classes.find((c) => c._id === selectedClassId);

  const columns = [
    {
      header: 'Roll #',
      accessor: 'rollNumber',
      render: (row) => <span className="font-mono font-bold text-indigo-600">#{row.rollNumber || '0'}</span>,
    },
    {
      header: 'Student Name',
      render: (row) => (
        <div className="flex items-center gap-3">
          <img
            src={row.profilePhoto || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop'}
            alt={`${row.firstName} ${row.lastName}`}
            className="w-9 h-9 rounded-xl object-cover border border-slate-200"
          />
          <div>
            <div className="font-black text-slate-900 text-sm">
              {row.firstName} {row.lastName}
            </div>
            <div className="text-[10px] text-slate-400 font-mono">Adm: {row.admissionNumber}</div>
          </div>
        </div>
      ),
    },
    {
      header: 'Class & Section',
      render: (row) => (
        <span className="px-2.5 py-1 bg-indigo-50 text-indigo-700 font-bold rounded-xl text-xs border border-indigo-100">
          {row.classId?.name || 'Class'} - {row.sectionId?.name || 'Sec A'}
        </span>
      ),
    },
    {
      header: 'Parent Contact',
      render: (row) => (
        <div className="text-xs text-slate-600">
          <p className="font-bold text-slate-800">{row.fatherName || row.parentId?.name || 'Guardian'}</p>
          <p className="text-[10px] text-slate-400 font-mono">{row.fatherPhone || row.emergencyContact}</p>
        </div>
      ),
    },
    {
      header: 'Status',
      render: (row) => (
        <span
          className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
            row.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
          }`}
        >
          {row.status}
        </span>
      ),
    },
    {
      header: 'Actions',
      render: (row) => (
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => navigate(`/students/${row._id}`)}
            className="p-2 rounded-xl bg-indigo-50 text-indigo-600 hover:bg-indigo-100 text-xs font-bold transition-all cursor-pointer"
            title="View Full Profile"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={() => setSelectedStudentForCard(row)}
            className="p-2 rounded-xl bg-amber-50 text-amber-600 hover:bg-amber-100 text-xs font-bold transition-all cursor-pointer"
            title="Print ID Card"
          >
            <CreditCard className="w-4 h-4" />
          </button>

          {(isPrincipal || user?.role === 'teacher') && (
            <button
              onClick={() => openEditModal(row)}
              className="p-2 rounded-xl bg-sky-50 text-sky-600 hover:bg-sky-100 text-xs font-bold transition-all cursor-pointer"
              title="Edit Student Record"
            >
              <Edit3 className="w-4 h-4" />
            </button>
          )}

          {isPrincipal && (
            <button
              onClick={() => {
                setSelectedStudentForDelete(row);
                setIsDeleteModalOpen(true);
              }}
              className="p-2 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 text-xs font-bold transition-all cursor-pointer"
              title="Delete Student Record"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
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
                Manage student enrollments, edit profiles, and view class-wise student lists
              </p>
            </div>
          </div>

          {isPrincipal && (
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl text-xs shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
            >
              <UserPlus className="w-4 h-4" />
              <span>Register New Student</span>
            </button>
          )}
        </div>

        {/* VIEW TAB SWITCHER */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 p-1.5 bg-slate-100 rounded-2xl border border-slate-200">
            <button
              onClick={() => {
                setActiveTab('general');
                setSelectedClassId('');
                setSelectedSectionId('');
              }}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'general' ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>General Roster</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('classwise');
                if (classes.length > 0) {
                  setSelectedClassId(classes[0]._id);
                  setSelectedSectionId(classes[0].sections?.[0]?._id || '');
                }
              }}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'classwise' ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Class-Wise Student View</span>
            </button>
          </div>
        </div>

        {/* CLASS-WISE DROPDOWN FILTER BAR */}
        {activeTab === 'classwise' && (
          <div className="p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100 flex flex-wrap items-center gap-4 animate-in fade-in duration-200">
            <div className="flex items-center gap-2 font-bold text-xs text-indigo-900">
              <Filter className="w-4 h-4 text-indigo-600" />
              <span>Filter By Class & Section:</span>
            </div>

            <div className="flex items-center gap-3">
              <div>
                <label className="block text-[10px] font-bold text-indigo-600 uppercase mb-1">Class</label>
                <select
                  value={selectedClassId}
                  onChange={(e) => {
                    setSelectedClassId(e.target.value);
                    const cls = classes.find((c) => c._id === e.target.value);
                    setSelectedSectionId(cls?.sections?.[0]?._id || '');
                  }}
                  className="px-3.5 py-1.5 border border-indigo-200 rounded-xl text-xs font-bold bg-white text-slate-800 focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                >
                  {classes.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-indigo-600 uppercase mb-1">Section</label>
                <select
                  value={selectedSectionId}
                  onChange={(e) => setSelectedSectionId(e.target.value)}
                  className="px-3.5 py-1.5 border border-indigo-200 rounded-xl text-xs font-bold bg-white text-slate-800 focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                >
                  <option value="">All Sections</option>
                  {selectedClassForFilter?.sections?.map((s) => (
                    <option key={s._id} value={s._id}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* STUDENT DATA TABLE */}
      <DataTable
        columns={columns}
        data={students}
        total={total}
        page={page}
        onPageChange={setPage}
        onSearch={setSearch}
        loading={loading}
      />

      {/* EDIT STUDENT MODAL FOR PRINCIPAL */}
      {isEditModalOpen && selectedStudentForEdit && (
        <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Edit Student Record">
          <form onSubmit={handleUpdateStudent} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">First Name *</label>
                <input
                  type="text"
                  required
                  value={editFormData.firstName}
                  onChange={(e) => setEditFormData({ ...editFormData, firstName: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl text-sm font-semibold focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Last Name *</label>
                <input
                  type="text"
                  required
                  value={editFormData.lastName}
                  onChange={(e) => setEditFormData({ ...editFormData, lastName: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl text-sm font-semibold focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Assign Class</label>
                <select
                  value={editFormData.classId}
                  onChange={(e) => {
                    const cId = e.target.value;
                    const cls = classes.find((c) => c._id === cId);
                    setEditFormData({
                      ...editFormData,
                      classId: cId,
                      sectionId: cls?.sections?.[0]?._id || '',
                    });
                  }}
                  className="w-full px-3 py-2 border rounded-xl text-sm font-semibold bg-white focus:ring-2 focus:ring-indigo-500"
                >
                  {classes.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Assign Section</label>
                <select
                  value={editFormData.sectionId}
                  onChange={(e) => setEditFormData({ ...editFormData, sectionId: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl text-sm font-semibold bg-white focus:ring-2 focus:ring-indigo-500"
                >
                  {selectedClassForEdit?.sections?.map((s) => (
                    <option key={s._id} value={s._id}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Admission #</label>
                <input
                  type="text"
                  value={editFormData.admissionNumber}
                  onChange={(e) => setEditFormData({ ...editFormData, admissionNumber: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl text-xs font-bold font-mono focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Roll #</label>
                <input
                  type="number"
                  min="1"
                  value={editFormData.rollNumber}
                  onChange={(e) => setEditFormData({ ...editFormData, rollNumber: Number(e.target.value) })}
                  className="w-full px-3 py-2 border rounded-xl text-xs font-bold font-mono focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Status</label>
                <select
                  value={editFormData.status}
                  onChange={(e) => setEditFormData({ ...editFormData, status: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl text-xs font-bold bg-white focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Father / Guardian Name</label>
                <input
                  type="text"
                  value={editFormData.fatherName}
                  onChange={(e) => setEditFormData({ ...editFormData, fatherName: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl text-xs font-semibold focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Parent Email</label>
                <input
                  type="email"
                  value={editFormData.email}
                  onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl text-xs font-semibold focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Parent Emergency Phone</label>
                <input
                  type="text"
                  value={editFormData.fatherPhone}
                  onChange={(e) => setEditFormData({ ...editFormData, fatherPhone: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl text-xs font-semibold focus:ring-2 focus:ring-indigo-500"
                />
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
                disabled={submitting}
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs shadow-md shadow-indigo-600/20 transition-all disabled:opacity-50 cursor-pointer"
              >
                {submitting ? 'Updating...' : 'Save Student Profile'}
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* DELETE STUDENT CONFIRMATION MODAL */}
      {isDeleteModalOpen && selectedStudentForDelete && (
        <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} title="Delete Student Record">
          <div className="space-y-4">
            <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-xs text-rose-800 space-y-1">
              <p className="font-black text-rose-900 text-sm">Are you sure you want to delete this student?</p>
              <p>
                Student: <strong>{selectedStudentForDelete.firstName} {selectedStudentForDelete.lastName}</strong> (Adm: {selectedStudentForDelete.admissionNumber})
              </p>
              <p className="text-[11px] text-rose-700 font-medium pt-1">
                This action will permanently delete the student profile and remove the associated login account.
              </p>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t">
              <button
                type="button"
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-all"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteStudent}
                disabled={submitting}
                className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xs shadow-md shadow-rose-600/20 transition-all disabled:opacity-50 cursor-pointer"
              >
                {submitting ? 'Deleting...' : 'Delete Permanently'}
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* REGISTER NEW STUDENT MODAL */}
      {isAddModalOpen && (
        <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Register New Student">
          <form onSubmit={handleRegisterStudent} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">First Name *</label>
                <input
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl text-sm font-semibold focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Last Name *</label>
                <input
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl text-sm font-semibold focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Class</label>
                <select
                  value={formData.classId}
                  onChange={(e) => {
                    const cId = e.target.value;
                    const cls = classes.find((c) => c._id === cId);
                    setFormData({
                      ...formData,
                      classId: cId,
                      sectionId: cls?.sections?.[0]?._id || '',
                    });
                  }}
                  className="w-full px-3 py-2 border rounded-xl text-sm font-semibold bg-white focus:ring-2 focus:ring-indigo-500"
                >
                  {classes.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Section</label>
                <select
                  value={formData.sectionId}
                  onChange={(e) => setFormData({ ...formData, sectionId: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl text-sm font-semibold bg-white focus:ring-2 focus:ring-indigo-500"
                >
                  {selectedClassForForm?.sections?.map((s) => (
                    <option key={s._id} value={s._id}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t">
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs shadow-md shadow-indigo-600/20 transition-all disabled:opacity-50 cursor-pointer"
              >
                {submitting ? 'Registering...' : 'Register Student'}
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* STUDENT ID CARD MODAL */}
      {selectedStudentForCard && (
        <StudentIdCardModal
          isOpen={Boolean(selectedStudentForCard)}
          onClose={() => setSelectedStudentForCard(null)}
          student={selectedStudentForCard}
        />
      )}
    </div>
  );
}
