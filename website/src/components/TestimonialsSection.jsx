import React from 'react';
import { Star, Quote, CheckCircle2, Building2 } from 'lucide-react';

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Dr. Rajesh K. Mehta',
      role: 'Principal',
      school: 'ScholarGrid International Academy',
      quote: 'The All-Subject Master Gradebook Matrix and Class Timetable Scheduler saved our faculty over 40 hours during final term examinations. It is light-years ahead of generic software.',
      rating: 5,
      metrics: '40+ Hours Saved Per Term'
    },
    {
      name: 'Suresh Verma',
      role: 'Head Accountant',
      school: 'St. Xavier Higher Secondary',
      quote: 'The Counter Fee Cashiering Portal with instant student lookup and official PDF receipt generation completely transformed our fee collection week. Zero manual reconciliation errors.',
      rating: 5,
      metrics: '100% Cash Counter Accuracy'
    },
    {
      name: 'Pooja Sharma',
      role: 'Senior Academic Coordinator',
      school: 'Modern Public School Chain',
      quote: 'Managing Class 1 to 12 exam timetables and filling student marks side-by-side in one master spreadsheet grid is smooth and accurate. Our teachers love the simplicity.',
      rating: 5,
      metrics: '100% Faculty Adoption'
    },
    {
      name: 'Anil Patel',
      role: 'School Trustee & Parent',
      school: 'Central City Academy Trust',
      quote: 'As a multi-school trustee, I can view real-time fee collection trends and attendance metrics across all 3 campuses from one Super Admin console.',
      rating: 5,
      metrics: 'Multi-Campus Real-time Sync'
    },
  ];

  return (
    <section className="py-16 bg-slate-50 border-y border-slate-200/80 font-['Plus_Jakarta_Sans'] text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 bg-blue-100/70 px-3.5 py-1.5 rounded-full border border-blue-200 inline-flex items-center gap-1.5">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>Trusted By Educators & School Leaders</span>
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Loved By School Leaders, <br />
            <span className="text-gradient-blue">Accountants & Teachers</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
            See how ScholarGrid ERP transformed daily operations and reduced administrative overhead for educational institutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-card shadow-card-hover space-y-5 relative flex flex-col justify-between"
            >
              <Quote className="w-10 h-10 text-blue-500/15 absolute top-6 right-6" />

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-100">
                    {t.metrics}
                  </span>
                </div>

                <p className="text-slate-700 text-xs sm:text-sm font-medium italic leading-relaxed">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{t.name}</h4>
                  <p className="text-xs text-blue-600 font-bold">{t.role}</p>
                  <p className="text-[11px] text-slate-400 font-medium">{t.school}</p>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Verified Partner</span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
