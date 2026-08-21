import React, { useState, useEffect } from 'react';
import { Search, X, GraduationCap, UserCheck, Users, BookOpen, Bell, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function GlobalSearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState({ students: [], teachers: [], parents: [], classes: [], notices: [] });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(); // parent toggles
      }
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!query.trim() || query.length < 2) {
      setResults({ students: [], teachers: [], parents: [], classes: [], notices: [] });
      return;
    }
    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await api.get(`/search?query=${encodeURIComponent(query)}`);
        if (res.data.success) {
          setResults(res.data.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Search Input Box */}
        <div className="p-4 border-b border-slate-200 flex items-center gap-3">
          <Search className="w-5 h-5 text-indigo-600" />
          <input
            type="text"
            autoFocus
            placeholder="Type student name, admission #, teacher, or class..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full text-base font-medium bg-transparent border-none focus:outline-none text-slate-800 placeholder-slate-400"
          />
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Container */}
        <div className="p-4 max-h-[60vh] overflow-y-auto space-y-4">
          {loading && <p className="text-sm text-slate-400 font-medium text-center py-4">Searching database...</p>}

          {!loading &&
            !results.students.length &&
            !results.teachers.length &&
            !results.parents.length &&
            !results.notices.length &&
            query.length >= 2 && <p className="text-sm text-slate-400 font-medium text-center py-4">No matching records found.</p>}

          {/* Students Result */}
          {results.students.length > 0 && (
            <div>
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5" /> Students
              </div>
              <div className="space-y-1">
                {results.students.map((s) => (
                  <div
                    key={s._id}
                    onClick={() => {
                      navigate(`/students/${s._id}`);
                      onClose();
                    }}
                    className="p-2.5 rounded-xl hover:bg-indigo-50/70 border border-transparent hover:border-indigo-100 flex items-center justify-between cursor-pointer group transition-all"
                  >
                    <div>
                      <h4 className="text-sm font-semibold text-slate-800 group-hover:text-indigo-600">
                        {s.firstName} {s.lastName}
                      </h4>
                      <p className="text-xs text-slate-500">
                        Admission #{s.admissionNumber} | ID: {s.studentId}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-transform group-hover:translate-x-1" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Teachers Result */}
          {results.teachers.length > 0 && (
            <div>
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <UserCheck className="w-3.5 h-3.5" /> Teachers
              </div>
              <div className="space-y-1">
                {results.teachers.map((t) => (
                  <div
                    key={t._id}
                    onClick={() => {
                      navigate(`/teachers`);
                      onClose();
                    }}
                    className="p-2.5 rounded-xl hover:bg-sky-50/70 border border-transparent hover:border-sky-100 flex items-center justify-between cursor-pointer group transition-all"
                  >
                    <div>
                      <h4 className="text-sm font-semibold text-slate-800 group-hover:text-sky-600">{t.name}</h4>
                      <p className="text-xs text-slate-500">
                        Emp ID: {t.employeeId} | {t.qualification}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-sky-600 transition-transform group-hover:translate-x-1" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Notices Result */}
          {results.notices.length > 0 && (
            <div>
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Bell className="w-3.5 h-3.5" /> Notices
              </div>
              <div className="space-y-1">
                {results.notices.map((n) => (
                  <div
                    key={n._id}
                    onClick={() => {
                      navigate(`/notices`);
                      onClose();
                    }}
                    className="p-2.5 rounded-xl hover:bg-amber-50/70 border border-transparent hover:border-amber-100 flex items-center justify-between cursor-pointer group transition-all"
                  >
                    <div>
                      <h4 className="text-sm font-semibold text-slate-800 group-hover:text-amber-600">{n.title}</h4>
                      <p className="text-xs text-slate-500 truncate max-w-md">{n.content}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 transition-transform group-hover:translate-x-1" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
