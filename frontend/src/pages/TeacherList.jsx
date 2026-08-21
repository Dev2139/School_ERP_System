import React, { useState, useEffect } from 'react';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { UserCheck, BookOpen, GraduationCap, Edit, Trash2, AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function TeacherList() {
  const { user } = useAuth();
  const isPrincipal = user?.role === 'admin';
  const { addToast } = useNotification();

  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Add Faculty Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    employeeId: `TCH-${Math.floor(100 + Math.random() * 900)}`,
    name: '',
    email: '',
    dob: '1988-06-15',
    phone: '',
    qualification: 'M.Sc. Mathematics',
    experience: '5 Years',
    address: '45 Harvard Sq',
    designation: 'Senior Faculty',
    department: 'Mathematics',
    status: 'active',
  });

  // Edit Faculty Modal State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingTeacherId, setEditingTeacherId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: '',
    email: '',
    phone: '',
    qualification: '',
    experience: '',
    designation: 'Senior Faculty',
    department: 'General',
    status: 'active',
    address: '',
  });

  // Delete Faculty Modal State
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingTeacher, setDeletingTeacher] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    setLoading(true);
    try {
      const res = await api.get('/teachers');
      if (res.data.success) {
        setTeachers(res.data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTeacher = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/teachers', formData);
      if (res.data.success) {
        addToast(`Faculty member created! Login: ${formData.email} (Initial Pass: DOB DDMMYYYY)`, 'success');
        setIsAddModalOpen(false);
        fetchTeachers();
      }
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to create faculty member', 'error');
    }
  };

  const handleOpenEditModal = (teacher) => {
    setEditingTeacherId(teacher._id);
    const existingSubjects = teacher.subjects && teacher.subjects.length > 0
      ? teacher.subjects.map((s) => s.name || s).join(', ')
      : teacher.qualification || 'Mathematics, Science';

    setEditFormData({
      name: teacher.name || '',
      email: teacher.email || '',
      phone: teacher.phone || '',
      qualification: existingSubjects,
      experience: teacher.experience || '',
      designation: teacher.designation || 'Senior Faculty',
      department: teacher.department || 'Mathematics',
      status: teacher.status || 'active',
      address: teacher.address || '',
    });
    setIsEditModalOpen(true);
  };

  const handleUpdateTeacher = async (e) => {
    e.preventDefault();
    if (!editingTeacherId) return;
    setSubmitting(true);
    try {
      const res = await api.put(`/teachers/${editingTeacherId}`, editFormData);
      if (res.data.success) {
        addToast('Faculty member & assigned subjects updated successfully!', 'success');
        setIsEditModalOpen(false);
        fetchTeachers();
      }
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to update faculty member', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleOpenDeleteModal = (teacher) => {
    setDeletingTeacher(teacher);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteTeacher = async () => {
    if (!deletingTeacher) return;
    setSubmitting(true);
    try {
      const res = await api.delete(`/teachers/${deletingTeacher._id}`);
      if (res.data.success) {
        addToast(`Faculty member "${deletingTeacher.name}" deleted successfully!`, 'success');
        setIsDeleteModalOpen(false);
        setDeletingTeacher(null);
        fetchTeachers();
      }
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to delete faculty member', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const columns = [
    {
      header: 'Faculty Member',
      render: (row) => (
        <div className="flex items-center gap-3">
          <img src={row.profilePhoto || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop'} alt={row.name} className="w-9 h-9 rounded-full object-cover border border-slate-200" />
          <div>
            <div className="font-semibold text-slate-800">{row.name}</div>
            <div className="text-xs text-slate-400">ID: {row.employeeId}</div>
          </div>
        </div>
      ),
    },
    {
      header: 'Assigned Subjects',
      render: (row) => {
        const subList = row.subjects && row.subjects.length > 0
          ? row.subjects.map((s) => s.name || s)
          : (row.qualification ? row.qualification.split(',') : ['General Faculty']);

        return (
          <div className="flex flex-wrap gap-1 max-w-xs">
            {subList.map((sub, i) => (
              <span key={i} className="px-2 py-0.5 bg-indigo-50 text-indigo-700 border border-indigo-100 rounded-md text-xs font-semibold">
                {sub.trim()}
              </span>
            ))}
          </div>
        );
      },
    },
    {
      header: 'Experience',
      render: (row) => <div className="text-xs font-semibold text-slate-600">{row.experience || '5 Years'}</div>,
    },
    {
      header: 'Status',
      render: (row) => (
        <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold uppercase ${
          row.status === 'inactive' ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'
        }`}>
          {row.status || 'Active'}
        </span>
      ),
    },
    {
      header: 'Contact',
      render: (row) => (
        <div className="text-xs text-slate-600">
          <p className="font-medium text-slate-800">{row.email}</p>
          <p className="text-slate-400">{row.phone}</p>
        </div>
      ),
    },
    isPrincipal && {
      header: 'Actions',
      render: (row) => (
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleOpenEditModal(row)}
            className="p-1.5 bg-slate-100 hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 rounded-lg transition-colors"
            title="Edit Faculty & Subjects"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => handleOpenDeleteModal(row)}
            className="p-1.5 bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-600 rounded-lg transition-colors"
            title="Delete Faculty Member"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ].filter(Boolean);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Teachers & Faculty Directory</h1>
          <p className="text-sm text-slate-500">Manage teaching staff accounts, assigned subjects, and timetable permissions</p>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={teachers}
        totalItems={teachers.length}
        page={1}
        limit={10}
        onPageChange={() => {}}
        onAddClick={isPrincipal ? () => setIsAddModalOpen(true) : null}
        addLabel="Add Faculty Member"
        loading={loading}
      />

      {/* ADD FACULTY MODAL */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add Faculty Member">
        <form onSubmit={handleCreateTeacher} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Full Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border rounded-xl text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Email (Login ID)</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 border rounded-xl text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Date of Birth (DOB for Pass)</label>
              <input
                type="date"
                required
                value={formData.dob}
                onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                className="w-full px-3 py-2 border rounded-xl text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-indigo-600 uppercase mb-1">
              Subjects Taught (comma-separated, e.g. Mathematics, Physics, Chemistry)
            </label>
            <input
              type="text"
              required
              value={formData.qualification}
              onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
              placeholder="e.g. Mathematics, Physics, Computer Science"
              className="w-full px-3 py-2 border-2 border-indigo-200 focus:border-indigo-500 rounded-xl text-sm font-semibold"
            />
            <p className="text-[10px] text-slate-400 mt-1">Use a comma to separate multiple subjects assigned to this teacher.</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Phone</label>
              <input
                type="text"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 border rounded-xl text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Experience</label>
              <input
                type="text"
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                className="w-full px-3 py-2 border rounded-xl text-sm"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 text-xs font-semibold text-slate-600 bg-slate-100 rounded-xl">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 rounded-xl shadow-md">
              Save Faculty Member
            </button>
          </div>
        </form>
      </Modal>

      {/* EDIT FACULTY MODAL */}
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Edit Faculty Member & Subjects">
        <form onSubmit={handleUpdateTeacher} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Full Name</label>
            <input
              type="text"
              required
              value={editFormData.name}
              onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
              className="w-full px-3 py-2 border rounded-xl text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-indigo-600 uppercase mb-1">
              Subjects Taught (comma-separated, e.g. Mathematics, Physics, Chemistry)
            </label>
            <input
              type="text"
              required
              value={editFormData.qualification}
              onChange={(e) => setEditFormData({ ...editFormData, qualification: e.target.value })}
              placeholder="e.g. Mathematics, Physics, Computer Science"
              className="w-full px-3 py-2 border-2 border-indigo-200 focus:border-indigo-500 rounded-xl text-sm font-semibold"
            />
            <p className="text-[10px] text-slate-400 mt-1">Use a comma after writing a subject to add multiple subjects.</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Email</label>
              <input
                type="email"
                required
                value={editFormData.email}
                onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
                className="w-full px-3 py-2 border rounded-xl text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Phone</label>
              <input
                type="text"
                required
                value={editFormData.phone}
                onChange={(e) => setEditFormData({ ...editFormData, phone: e.target.value })}
                className="w-full px-3 py-2 border rounded-xl text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Qualification</label>
              <input
                type="text"
                value={editFormData.qualification}
                onChange={(e) => setEditFormData({ ...editFormData, qualification: e.target.value })}
                className="w-full px-3 py-2 border rounded-xl text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Experience</label>
              <input
                type="text"
                value={editFormData.experience}
                onChange={(e) => setEditFormData({ ...editFormData, experience: e.target.value })}
                className="w-full px-3 py-2 border rounded-xl text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Designation</label>
              <input
                type="text"
                value={editFormData.designation}
                onChange={(e) => setEditFormData({ ...editFormData, designation: e.target.value })}
                className="w-full px-3 py-2 border rounded-xl text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Status</label>
              <select
                value={editFormData.status}
                onChange={(e) => setEditFormData({ ...editFormData, status: e.target.value })}
                className="w-full px-3 py-2 border rounded-xl text-sm bg-white font-semibold"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t">
            <button
              type="button"
              onClick={() => setIsEditModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 bg-slate-100 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md disabled:opacity-50"
            >
              {submitting ? 'Saving Changes...' : 'Update Faculty Details'}
            </button>
          </div>
        </form>
      </Modal>

      {/* DELETE FACULTY CONFIRMATION MODAL */}
      <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} title="Delete Faculty Member">
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-3 bg-rose-50 border border-rose-100 rounded-2xl text-rose-800 text-xs">
            <AlertTriangle className="w-6 h-6 text-rose-600 shrink-0" />
            <div>
              <p className="font-bold text-slate-900">Are you sure you want to delete this faculty member?</p>
              <p className="text-slate-600 mt-0.5">
                Deleting <span className="font-bold">{deletingTeacher?.name}</span> will permanently remove their profile and disable their login account.
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t">
            <button
              type="button"
              onClick={() => setIsDeleteModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 bg-slate-100 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleDeleteTeacher}
              disabled={submitting}
              className="px-4 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow-md disabled:opacity-50"
            >
              {submitting ? 'Deleting...' : 'Delete Faculty'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
