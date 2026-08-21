import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import StudentIdCardModal from '../components/StudentIdCardModal';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { Eye, CreditCard, ArrowUpRight } from 'lucide-react';

export default function StudentList() {
  const { user } = useAuth();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedStudentForCard, setSelectedStudentForCard] = useState(null);

  const { addToast } = useNotification();
  const navigate = useNavigate();

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

  const [classes, setClasses] = useState([]);

  useEffect(() => {
    fetchStudents();
    fetchClasses();
  }, [page, search]);

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
        addToast(`Student & User account created! Login: ${formData.email} (Initial Pass: DOB DDMMYYYY)`, 'success');
        setIsAddModalOpen(false);
        fetchStudents();
      }
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to add student', 'error');
    }
  };

  const columns = [
    {
      header: 'Student',
      render: (row) => (
        <div className="flex items-center gap-3">
          <img src={row.profilePhoto} alt={row.firstName} className="w-9 h-9 rounded-full object-cover border border-slate-200" />
          <div>
            <div className="font-semibold text-slate-800 hover:text-indigo-600 cursor-pointer" onClick={() => navigate(`/students/${row._id}`)}>
              {row.firstName} {row.lastName}
            </div>
            <div className="text-[11px] text-slate-400">Adm: {row.admissionNumber}</div>
          </div>
        </div>
      ),
    },
    {
      header: 'ID / Roll',
      render: (row) => (
        <div>
          <div className="font-semibold text-slate-700">{row.studentId}</div>
          <div className="text-xs text-slate-400">Roll: {row.rollNumber}</div>
        </div>
      ),
    },
    {
      header: 'Class & Section',
      render: (row) => (
        <span className="px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-semibold border border-indigo-100">
          {row.classId?.name || 'Class 7'} - {row.sectionId?.name || 'Sec A'}
        </span>
      ),
    },
    {
      header: 'Parent Contact',
      render: (row) => (
        <div className="text-xs text-slate-600">
          <p className="font-medium text-slate-800">{row.parentId?.name || 'Parent Guard'}</p>
          <p className="text-slate-400">{row.emergencyContact}</p>
        </div>
      ),
    },
    {
      header: 'Status',
      render: (row) => (
        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${row.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
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
            className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 text-xs font-semibold flex items-center gap-1 transition-all"
            title="View Full Profile"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setSelectedStudentForCard(row)}
            className="p-1.5 rounded-lg bg-amber-50 text-amber-600 hover:bg-amber-100 text-xs font-semibold flex items-center gap-1 transition-all"
            title="Print ID Card"
          >
            <CreditCard className="w-3.5 h-3.5" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Student Management</h1>
          <p className="text-sm text-slate-500">Manage student profiles, enrollments, and documents</p>
        </div>
      </div>

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
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Class</label>
              <select
                value={formData.classId}
                onChange={(e) => {
                  const selClass = classes.find((c) => c._id === e.target.value);
                  setFormData({
                    ...formData,
                    classId: e.target.value,
                    sectionId: selClass?.sections?.[0]?._id || '',
                  });
                }}
                className="w-full px-3 py-2 border rounded-xl text-sm bg-white"
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
                className="w-full px-3 py-2 border rounded-xl text-sm bg-white"
              >
                {classes
                  .find((c) => c._id === formData.classId)
                  ?.sections?.map((s) => (
                    <option key={s._id} value={s._id}>
                      {s.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 text-xs font-semibold text-slate-600 bg-slate-100 rounded-xl">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 rounded-xl shadow-md">
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
