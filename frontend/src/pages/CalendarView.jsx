import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Calendar as CalendarIcon, Flag, Award, Users } from 'lucide-react';

export default function CalendarView() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await api.get('/events');
      if (res.data.success) setEvents(res.data.data);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">School Academic Calendar</h1>
        <p className="text-sm text-slate-500">Holidays, examination schedules, parent meetings, and sports activities</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6">
        <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
          <CalendarIcon className="w-5 h-5 text-indigo-600" /> Upcoming School Events
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {events.map((ev) => (
            <div key={ev._id} className="p-4 border rounded-2xl bg-slate-50 flex items-start gap-4">
              <div className="p-3 bg-indigo-100 text-indigo-700 rounded-xl font-bold text-xs text-center shrink-0">
                <div>SEP</div>
                <div className="text-lg">25</div>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-100 text-indigo-800">
                  {ev.category}
                </span>
                <h4 className="font-extrabold text-slate-800 text-sm mt-1">{ev.title}</h4>
                <p className="text-xs text-slate-500 mt-0.5">{ev.description}</p>
                <p className="text-[11px] text-slate-400 mt-1">Location: {ev.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
