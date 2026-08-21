import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useNotification } from '../context/NotificationContext';
import { Bell, Plus, Pin, Users } from 'lucide-react';
import Modal from '../components/Modal';

export default function NoticeManager() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { addToast } = useNotification();

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    setLoading(true);
    try {
      const res = await api.get('/notices');
      if (res.data.success) setNotices(res.data.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNotice = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/notices', { title, content, targetAudience: 'everyone', priority: 'high', isPinned: true });
      if (res.data.success) {
        addToast('Notice published to board!', 'success');
        setIsModalOpen(false);
        setTitle('');
        setContent('');
        fetchNotices();
      }
    } catch (err) {
      addToast('Failed to post notice', 'error');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Notices & Announcements</h1>
          <p className="text-sm text-slate-500">School announcements, circulars, and target notifications</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-xs shadow-md shadow-indigo-600/20 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Publish Notice</span>
        </button>
      </div>

      <div className="space-y-4">
        {notices.map((n) => (
          <div key={n._id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2 relative">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 flex items-center gap-1">
                <Pin className="w-3 h-3 text-indigo-600" /> Pinned Notice
              </span>
              <span className="text-xs text-slate-400">{new Date(n.createdAt).toLocaleDateString()}</span>
            </div>
            <h3 className="text-base font-extrabold text-slate-800">{n.title}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">{n.content}</p>
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Publish Notice">
        <form onSubmit={handleCreateNotice} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Notice Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border rounded-xl text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Notice Content</label>
            <textarea
              rows={4}
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-3 py-2 border rounded-xl text-sm"
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-xs font-semibold text-slate-600 bg-slate-100 rounded-xl">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 rounded-xl shadow-md">
              Publish Notice
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
