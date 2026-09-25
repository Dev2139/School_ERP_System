import React from 'react';
import { Star, Quote, Building, CheckCircle2 } from 'lucide-react';

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Dr. Rajesh K. Mehta',
      role: 'Principal',
      school: 'Greenwood International School',
      quote: 'The All-Subject Master Gradebook Matrix and Class Teacher Exam Timetable Scheduler saved our faculty over 40 hours during final examinations.',
      rating: 5,
    },
    {
      name: 'Suresh Verma',
      role: 'Head Accountant',
      school: 'St. Xavier Higher Secondary',
      quote: 'The Accountant Counter Portal (`account@school.com`) with instant student lookup and official watermarked PDF receipts completely streamlined fee collection week.',
      rating: 5,
    },
    {
      name: 'Pooja Sharma',
      role: 'Senior Class Teacher',
      school: 'Modern Academy',
      quote: 'Managing Class 1 exam schedules and filling student marks side-by-side in one spreadsheet grid is smooth and accurate. Highly recommended!',
      rating: 5,
    },
    {
      name: 'Anil Patel',
      role: 'Parent',
      school: 'Parent of Kavan Patel (Class 1)',
      quote: 'I can view my child’s examination timetable, print the official Hall Ticket, and download private report cards anytime from my smartphone.',
      rating: 5,
    },
  ];

  return (
    <section className="py-24 bg-slate-900/40 relative border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        <div className="max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold uppercase tracking-wider">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>Trusted By Educators</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Loved By School Leaders, <br />
            <span className="text-gradient-primary">Accountants & Teachers</span>
          </h2>
          <p className="text-slate-400 text-base">
            See how Greenwood ERP transformed daily operations for institutions across India.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-slate-950/80 border border-slate-800/80 hover:border-indigo-500/40 transition-all space-y-4 relative"
            >
              <Quote className="w-10 h-10 text-indigo-500/20 absolute top-6 right-6" />

              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>

              <p className="text-slate-200 text-sm italic leading-relaxed">
                "{t.quote}"
              </p>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-black text-white">{t.name}</h4>
                  <p className="text-xs text-indigo-400 font-bold">{t.role}</p>
                  <p className="text-[11px] text-slate-500 font-medium">{t.school}</p>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Verified User</span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
