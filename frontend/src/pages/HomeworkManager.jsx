import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useNotification } from '../context/NotificationContext';
import { FileSpreadsheet, Plus, Calendar, FileText, Upload } from 'lucide-react';
import Modal from '../components/Modal';

export default function HomeworkManager() {
  const [homeworkList, setHomeworkList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addToast } = useNotification();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('2026-09-01');

  useEffect(() => {
    fetchHomework();
  }, []);

  const fetchHomework = async () => {
    setLoading(true);
    try {
      const res = await api.get('/homework');
      if (res.data.success) {
        setHomeworkList(res.data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateHomework = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/homework', {
        title,
        description,
        dueDate,
        academicYearId: '60d0fe4f5311236168a109ca',
        classId: '60d0fe4f5311236168a109cb',
        sectionId: '60d0fe4f5311236168a109cc',
        subjectId: '60d0fe4f5311236168a109cd',
      });
      if (res.data.success) {
        addToast('Homework assignment posted!', 'success');
        setIsModalOpen(false);
        setTitle('');
        setDescription('');
        fetchHomework();
      }
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to create homework', 'error');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Homework & Assignments</h1>
          <p className="text-sm text-slate-500">Track subject tasks, submission deadlines, and student file uploads</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-xs shadow-md shadow-indigo-600/20 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Post New Homework</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {homeworkList.map((hw) => (
          <div key={hw._id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-sky-50 text-sky-700">
                  {hw.subjectId?.name || 'Mathematics'}
                </span>
                <h3 className="font-extrabold text-base text-slate-800 mt-1">{hw.title}</h3>
              </div>
              <span className="text-xs font-semibold text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-100 flex items-center gap-1">
                <Calendar className="w-3 h-3" /> Due: {new Date(hw.dueDate).toLocaleDateString()}
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">{hw.description}</p>
            <div className="pt-2 border-t flex items-center justify-between text-xs text-slate-400">
              <span>Assigned by: {hw.teacherId?.name || 'Faculty Staff'}</span>
              <span className="font-bold text-indigo-600">{hw.submissions?.length || 0} Submissions</span>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Assign Class Homework">
        <form onSubmit={handleCreateHomework} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Homework Title</label>
            <input
              type="text"
              required
              placeholder="e.g. Chapter 4 Practice Problems"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border rounded-xl text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Instructions / Description</label>
            <textarea
              rows={3}
              required
              placeholder="Provide instructions for students..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border rounded-xl text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Submission Due Date</label>
            <input
              type="date"
              required
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-3 py-2 border rounded-xl text-sm"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-xs font-semibold text-slate-600 bg-slate-100 rounded-xl">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 rounded-xl shadow-md">
              Publish Assignment
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
