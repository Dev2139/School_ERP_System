import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import Modal from '../components/Modal';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Plus,
  MapPin,
  Clock,
  Trash2,
  CheckCircle2,
  Info,
  Sparkles,
  BookOpen,
  Award,
  Users,
  Flag,
  CalendarDays,
} from 'lucide-react';

export default function CalendarView() {
  const { user } = useAuth();
  const { addToast } = useNotification();
  const isAdmin = ['super_admin', 'admin'].includes(user?.role);

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Month navigation state
  const [currentDate, setCurrentDate] = useState(new Date());

  // Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: 'event',
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
    location: 'Main Auditorium / Campus Grounds',
    description: '',
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const res = await api.get('/events');
      if (res.data.success) {
        setEvents(res.data.data);
      }
    } catch (e) {
      console.error(e);
      addToast('Failed to load school calendar events', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await api.post('/events', formData);
      if (res.data.success) {
        addToast('New event scheduled on school calendar!', 'success');
        setIsAddModalOpen(false);
        setFormData({
          title: '',
          category: 'event',
          startDate: new Date().toISOString().split('T')[0],
          endDate: new Date().toISOString().split('T')[0],
          location: 'Main Auditorium / Campus Grounds',
          description: '',
        });
        fetchEvents();
      }
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to create event', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteEvent = async (id) => {
    if (!window.confirm('Are you sure you want to remove this event from the calendar?')) return;
    try {
      const res = await api.delete(`/events/${id}`);
      if (res.data.success) {
        addToast('Event removed from school calendar.', 'success');
        fetchEvents();
      }
    } catch (err) {
      addToast('Failed to delete event', 'error');
    }
  };

  // Calendar Date Math
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
  const goToToday = () => setCurrentDate(new Date());

  // Helper for category styling & badges
  const getCategoryTheme = (category) => {
    switch (category) {
      case 'holiday':
        return {
          bg: 'bg-rose-50 border-rose-200 text-rose-800',
          badge: 'bg-rose-100 text-rose-700 border-rose-200',
          dot: 'bg-rose-500',
          label: 'School Holiday',
        };
      case 'exam':
        return {
          bg: 'bg-amber-50 border-amber-200 text-amber-800',
          badge: 'bg-amber-100 text-amber-800 border-amber-200',
          dot: 'bg-amber-500',
          label: 'Examination',
        };
      case 'sports':
        return {
          bg: 'bg-emerald-50 border-emerald-200 text-emerald-800',
          badge: 'bg-emerald-100 text-emerald-800 border-emerald-200',
          dot: 'bg-emerald-500',
          label: 'Sports & Athletics',
        };
      case 'meeting':
        return {
          bg: 'bg-sky-50 border-sky-200 text-sky-800',
          badge: 'bg-sky-100 text-sky-800 border-sky-200',
          dot: 'bg-sky-500',
          label: 'PTA & Faculty Meeting',
        };
      default:
        return {
          bg: 'bg-indigo-50 border-indigo-200 text-indigo-800',
          badge: 'bg-indigo-100 text-indigo-800 border-indigo-200',
          dot: 'bg-indigo-500',
          label: 'School Event',
        };
    }
  };

  // Filter events
  const filteredEvents = selectedCategory === 'all'
    ? events
    : events.filter((ev) => ev.category === selectedCategory);

  return (
    <div className="space-y-6">
      {/* Top Banner Header with Explanation */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 text-white shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/20 border border-indigo-400/30 rounded-full text-indigo-300 text-xs font-semibold uppercase tracking-wider">
            <CalendarDays className="w-3.5 h-3.5 text-indigo-400" /> Academic Master Schedule
          </div>
          <h1 className="text-2xl font-black tracking-tight">School Academic Calendar</h1>
          <p className="text-xs text-indigo-200 max-w-2xl">
            Centralized schedule for term exams, national holidays, parent meetings, sports meets, and cultural events. Synchronized across administrative, faculty, student, and parent portals.
          </p>
        </div>

        {isAdmin && (
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 font-extrabold text-white rounded-2xl text-xs shadow-md shadow-indigo-600/30 flex items-center gap-2 transition-all shrink-0 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Schedule New Event</span>
          </button>
        )}
      </div>

      {/* Explanation Card: Importance of School Calendar */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100 flex items-start gap-3">
          <div className="p-2.5 bg-indigo-600 text-white rounded-xl shrink-0">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-extrabold text-slate-900 text-xs">Pace Syllabus & Terms</h4>
            <p className="text-xs text-slate-500 mt-0.5">
              Aligns teaching staff and students on term start dates, mid-term evaluation weeks, and project deadlines.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-100 flex items-start gap-3">
          <div className="p-2.5 bg-rose-600 text-white rounded-xl shrink-0">
            <Flag className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-extrabold text-slate-900 text-xs">Transparent Holidays</h4>
            <p className="text-xs text-slate-500 mt-0.5">
              Clear public, festival, and seasonal break announcements for family planning and leave tracking.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 flex items-start gap-3">
          <div className="p-2.5 bg-emerald-600 text-white rounded-xl shrink-0">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-extrabold text-slate-900 text-xs">Parent & School Synergy</h4>
            <p className="text-xs text-slate-500 mt-0.5">
              Keeps parents informed of PTA meetings, annual sports meets, and exhibition schedules in real-time.
            </p>
          </div>
        </div>
      </div>

      {/* Category Filter Pills & Month Navigation */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-slate-100 pb-4">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: 'All Calendar Events' },
              { id: 'holiday', label: 'Holidays' },
              { id: 'exam', label: 'Examinations' },
              { id: 'sports', label: 'Sports & Athletics' },
              { id: 'meeting', label: 'PTA Meetings' },
              { id: 'event', label: 'School Events' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Month Navigator Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={prevMonth}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all cursor-pointer"
              title="Previous Month"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-sm font-extrabold text-slate-900 min-w-[140px] text-center">
              {monthNames[month]} {year}
            </span>
            <button
              onClick={nextMonth}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all cursor-pointer"
              title="Next Month"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={goToToday}
              className="px-3 py-1.5 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200 rounded-xl text-xs font-bold transition-all cursor-pointer"
            >
              Today
            </button>
          </div>
        </div>

        {/* Month Calendar Grid */}
        <div>
          <div className="grid grid-cols-7 text-center text-xs font-black uppercase tracking-wider text-slate-400 mb-2">
            <div>Sun</div>
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
          </div>

          <div className="grid grid-cols-7 gap-1.5">
            {/* Blank padding cells before day 1 */}
            {Array.from({ length: firstDayOfMonth }).map((_, i) => (
              <div key={`blank-${i}`} className="h-24 bg-slate-50/40 rounded-2xl border border-slate-100/60" />
            ))}

            {/* Month Day Cells */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const dayNum = i + 1;
              const cellDateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
              
              // Find events on this date
              const dayEvents = events.filter((ev) => {
                if (!ev.startDate) return false;
                const startStr = new Date(ev.startDate).toISOString().split('T')[0];
                const endStr = ev.endDate ? new Date(ev.endDate).toISOString().split('T')[0] : startStr;
                return cellDateStr >= startStr && cellDateStr <= endStr;
              });

              const isToday = new Date().toDateString() === new Date(year, month, dayNum).toDateString();

              return (
                <div
                  key={`day-${dayNum}`}
                  className={`h-24 p-2 rounded-2xl border flex flex-col justify-between transition-all overflow-hidden ${
                    isToday
                      ? 'bg-indigo-50/70 border-indigo-400 ring-2 ring-indigo-500/20'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-extrabold ${isToday ? 'text-indigo-700 font-black' : 'text-slate-700'}`}>
                      {dayNum}
                    </span>
                    {dayEvents.length > 0 && (
                      <span className="text-[10px] font-bold px-1.5 py-0.2 bg-indigo-100 text-indigo-700 rounded-full">
                        {dayEvents.length}
                      </span>
                    )}
                  </div>

                  <div className="space-y-1 overflow-y-auto max-h-[50px] pr-0.5">
                    {dayEvents.slice(0, 2).map((ev) => {
                      const theme = getCategoryTheme(ev.category);
                      return (
                        <div
                          key={ev._id}
                          className={`px-1.5 py-0.5 rounded text-[9px] font-bold truncate ${theme.bg}`}
                          title={ev.title}
                        >
                          {ev.title}
                        </div>
                      );
                    })}
                    {dayEvents.length > 2 && (
                      <div className="text-[9px] font-bold text-slate-400 text-center">
                        +{dayEvents.length - 2} more
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Detailed Events List Below Calendar */}
        <div className="pt-4 border-t border-slate-100">
          <h3 className="font-extrabold text-slate-900 text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
            <CalendarIcon className="w-4 h-4 text-indigo-600" /> Scheduled School Events List
          </h3>

          {loading ? (
            <div className="py-8 text-center text-xs font-bold text-slate-400">Loading events...</div>
          ) : filteredEvents.length === 0 ? (
            <div className="py-8 text-center text-xs font-bold text-slate-400">No events found in this category.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredEvents.map((ev) => {
                const theme = getCategoryTheme(ev.category);
                const startDateObj = ev.startDate ? new Date(ev.startDate) : new Date();
                const monthStr = startDateObj.toLocaleString('default', { month: 'short' }).toUpperCase();
                const dayStr = startDateObj.getDate();

                return (
                  <div key={ev._id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-indigo-200 transition-all flex items-start gap-4 justify-between">
                    <div className="flex items-start gap-3">
                      <div className="p-3 bg-indigo-600 text-white rounded-2xl font-black text-center shrink-0 shadow-sm min-w-[54px]">
                        <div className="text-[10px] uppercase font-bold tracking-wider opacity-80">{monthStr}</div>
                        <div className="text-xl leading-none font-black">{dayStr}</div>
                      </div>

                      <div className="space-y-1">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase border ${theme.badge}`}>
                          {theme.label}
                        </span>
                        <h4 className="font-extrabold text-slate-900 text-sm">{ev.title}</h4>
                        <p className="text-xs text-slate-600">{ev.description || 'No special instructions.'}</p>
                        <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] text-slate-400 font-medium">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-slate-400" /> {ev.location || 'School Campus'}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-slate-400" />
                            {ev.startDate ? new Date(ev.startDate).toLocaleDateString('en-GB') : 'TBD'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {isAdmin && (
                      <button
                        onClick={() => handleDeleteEvent(ev._id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors shrink-0 cursor-pointer"
                        title="Remove Event"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* ADD EVENT MODAL (Admin / Principal) */}
      {isAddModalOpen && (
        <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Schedule Event on School Calendar">
          <form onSubmit={handleCreateEvent} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Event Title</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Annual Term 2 Science Exhibition"
                className="w-full px-3 py-2 border rounded-xl text-sm font-semibold focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl text-sm font-semibold bg-white focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="holiday">Holiday (School Closed)</option>
                  <option value="exam">Examination Schedule</option>
                  <option value="sports">Sports & Athletics</option>
                  <option value="meeting">Parent-Teacher Meeting (PTA)</option>
                  <option value="event">General School Event</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Location / Venue</label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Main Auditorium / Exam Halls"
                  className="w-full px-3 py-2 border rounded-xl text-sm font-semibold focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Start Date</label>
                <input
                  type="date"
                  required
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl text-sm font-semibold focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">End Date</label>
                <input
                  type="date"
                  required
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl text-sm font-semibold focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Event Description & Notes</label>
              <textarea
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Explain the purpose, dress code, or special instructions for students and parents..."
                className="w-full px-3 py-2 border rounded-xl text-sm font-semibold focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t">
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="px-4 py-2 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-4 py-2 text-xs font-extrabold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md transition-all disabled:opacity-50"
              >
                {submitting ? 'Publishing Event...' : 'Schedule Event'}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
