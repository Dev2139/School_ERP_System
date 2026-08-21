import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useNotification } from '../context/NotificationContext';
import { BookOpen, Layers, Plus, Calendar } from 'lucide-react';
import Modal from '../components/Modal';

export default function AcademicList() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToast } = useNotification();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newClassName, setNewClassName] = useState('');
  const [newClassCode, setNewClassCode] = useState('');

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    setLoading(true);
    try {
      const res = await api.get('/academics/classes');
      if (res.data.success) {
        setClasses(res.data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateClass = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/academics/classes', {
        name: newClassName,
        code: newClassCode,
        academicYearId: classes[0]?.academicYearId || '60d0fe4f5311236168a109ca',
      });
      if (res.data.success) {
        addToast('Class created successfully!', 'success');
        setIsModalOpen(false);
        setNewClassName('');
        setNewClassCode('');
        fetchClasses();
      }
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to create class', 'error');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Academic Structure Setup</h1>
          <p className="text-sm text-slate-500">School → Academic Year → Classes → Sections → Subjects</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-xs shadow-md shadow-indigo-600/20 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Class</span>
        </button>
      </div>

      {/* Grid of Classes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <p className="text-slate-400 text-sm">Loading structure...</p>
        ) : (
          classes.map((cls) => (
            <div key={cls._id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition-all space-y-4">
              <div className="flex items-center justify-between border-b pb-3">
                <div>
                  <h3 className="font-extrabold text-lg text-slate-800">{cls.name}</h3>
                  <span className="text-xs text-slate-400 font-mono">Code: {cls.code}</span>
                </div>
                <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
                  <BookOpen className="w-5 h-5" />
                </div>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Sections</p>
                <div className="flex flex-wrap gap-1.5">
                  {cls.sections && cls.sections.length > 0 ? (
                    cls.sections.map((sec) => (
                      <span key={sec._id} className="px-2.5 py-1 bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg border border-slate-200">
                        {sec.name} ({sec.roomNo})
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-slate-400">No sections</span>
                  )}
                </div>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Curriculum Subjects</p>
                <div className="flex flex-wrap gap-1.5">
                  {cls.subjects && cls.subjects.length > 0 ? (
                    cls.subjects.map((sub) => (
                      <span key={sub._id} className="px-2.5 py-1 bg-sky-50 text-sky-700 text-xs font-semibold rounded-lg border border-sky-100">
                        {sub.name}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-slate-400">No subjects assigned</span>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create New Class">
        <form onSubmit={handleCreateClass} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Class Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Class 9"
              value={newClassName}
              onChange={(e) => setNewClassName(e.target.value)}
              className="w-full px-3 py-2 border rounded-xl text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Class Code</label>
            <input
              type="text"
              required
              placeholder="e.g. C9"
              value={newClassCode}
              onChange={(e) => setNewClassCode(e.target.value)}
              className="w-full px-3 py-2 border rounded-xl text-sm"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-xs font-semibold text-slate-600 bg-slate-100 rounded-xl">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 rounded-xl shadow-md">
              Create Class
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
