import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { Bell, Plus, Pin, Users, Image as ImageIcon, Trash2, Calendar, Tag, AlertCircle } from 'lucide-react';
import Modal from '../components/Modal';

export default function NoticeManager() {
  const { user } = useAuth();
  const { addToast } = useNotification();

  const isPrincipal = user?.role === 'admin';

  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form state
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [targetAudience, setTargetAudience] = useState('everyone');
  const [priority, setPriority] = useState('high');
  const [isPinned, setIsPinned] = useState(true);
  const [imageUrl, setImageUrl] = useState('');

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
      addToast('Failed to load notices', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      addToast('Please select a valid image file (PNG, JPG, WEBP)', 'error');
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImageUrl(reader.result);
    };
  };

  const handleCreateNotice = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      addToast('Please enter both Notice Title and Content', 'error');
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        title: title.trim(),
        content: content.trim(),
        targetAudience,
        priority,
        isPinned,
        imageUrl,
      };

      const res = await api.post('/notices', payload);
      if (res.data.success) {
        addToast('Notice published successfully to the board!', 'success');
        setIsModalOpen(false);
        setTitle('');
        setContent('');
        setImageUrl('');
        setTargetAudience('everyone');
        setPriority('high');
        setIsPinned(true);
        fetchNotices();
      }
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to publish notice', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteNotice = async (id) => {
    if (!window.confirm('Are you sure you want to delete this notice?')) return;
    try {
      const res = await api.delete(`/notices/${id}`);
      if (res.data.success) {
        addToast('Notice deleted', 'success');
        fetchNotices();
      }
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to delete notice', 'error');
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl border border-indigo-100 shadow-xs">
            <Bell className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-black text-slate-900 uppercase tracking-tight">Notices & Announcements</h1>
            <p className="text-xs text-slate-500 font-medium">
              {isPrincipal
                ? 'Publish official announcements, circulars, and target notices to students and staff'
                : 'Official school announcements, notices, and circulars'}
            </p>
          </div>
        </div>

        {/* Publish Notice Button - PRINCIPAL ONLY */}
        {isPrincipal && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl text-xs shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Publish Notice</span>
          </button>
        )}
      </div>

      {/* Notice Board Feed */}
      {loading ? (
        <div className="bg-white rounded-3xl border p-12 text-center text-slate-400 font-extrabold text-sm">
          Loading notices...
        </div>
      ) : notices.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-3">
          <Bell className="w-12 h-12 text-slate-300 mx-auto" />
          <div className="font-extrabold text-slate-700 text-base">No Notices Published Yet</div>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            {isPrincipal
              ? 'Click "Publish Notice" above to announce circulars and notices to the school.'
              : 'There are currently no active notices posted on the board.'}
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {notices.map((n) => (
            <div
              key={n._id}
              className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition-all space-y-4 relative"
            >
              {/* Card Top Metadata Bar */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  {n.isPinned && (
                    <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-100 flex items-center gap-1">
                      <Pin className="w-3 h-3 text-indigo-600" /> Pinned Notice
                    </span>
                  )}
                  <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700">
                    Audience: {n.targetAudience || 'Everyone'}
                  </span>
                  {n.priority && (
                    <span
                      className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-lg ${
                        n.priority === 'urgent'
                          ? 'bg-rose-50 text-rose-600 border border-rose-200'
                          : n.priority === 'high'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-slate-50 text-slate-600'
                      }`}
                    >
                      {n.priority} Priority
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(n.createdAt).toLocaleDateString()}
                  </span>

                  {isPrincipal && (
                    <button
                      onClick={() => handleDeleteNotice(n._id)}
                      className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl transition-all"
                      title="Delete Notice"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Title & Body */}
              <div>
                <h2 className="text-lg font-black text-slate-900 tracking-tight leading-snug">{n.title}</h2>
                <p className="text-xs text-slate-700 mt-2 font-medium whitespace-pre-line leading-relaxed">
                  {n.content}
                </p>
              </div>

              {/* FULL UNWRAPPED DIRECT IMAGE DISPLAY */}
              {n.imageUrl && (
                <div className="w-full my-4 rounded-2xl overflow-hidden border border-slate-200 shadow-xs bg-slate-50">
                  <img
                    src={n.imageUrl}
                    alt={n.title}
                    className="w-full h-auto object-contain max-h-[600px] block mx-auto"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* PUBLISH NOTICE MODAL - PRINCIPAL ONLY */}
      {isPrincipal && isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Publish Official Notice">
          <form onSubmit={handleCreateNotice} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Notice Title</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Annual Sports Day Announcement 2026"
                className="w-full px-3 py-2 border rounded-xl text-sm font-semibold focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Notice Content</label>
              <textarea
                rows={4}
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write complete notice description, schedules, or instructions..."
                className="w-full px-3 py-2 border rounded-xl text-sm font-semibold focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Target Audience</label>
                <select
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl text-sm font-semibold bg-white focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                >
                  <option value="everyone">Everyone (All School)</option>
                  <option value="students">Students Only</option>
                  <option value="teachers">Teachers & Staff Only</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Priority</label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl text-sm font-semibold bg-white focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                >
                  <option value="high">High Priority</option>
                  <option value="urgent">Urgent</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
            </div>

            {/* Optional Attachment Image */}
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                Attach Notice Image / Poster (Optional)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full text-xs text-slate-600 file:mr-2 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer"
              />
              {imageUrl && (
                <div className="mt-2 relative inline-block">
                  <img src={imageUrl} alt="Notice Preview" className="h-24 w-auto rounded-xl border border-slate-200 object-cover" />
                  <button
                    type="button"
                    onClick={() => setImageUrl('')}
                    className="absolute -top-2 -right-2 bg-rose-600 text-white rounded-full p-1 text-[10px] shadow-xs"
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="isPinned"
                checked={isPinned}
                onChange={(e) => setIsPinned(e.target.checked)}
                className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500 cursor-pointer"
              />
              <label htmlFor="isPinned" className="text-xs font-bold text-slate-700 cursor-pointer">
                Pin this notice to top of the board
              </label>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs shadow-md shadow-indigo-600/20 transition-all disabled:opacity-50"
              >
                {submitting ? 'Publishing Notice...' : 'Publish Notice'}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
