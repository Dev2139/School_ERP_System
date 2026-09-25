import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Check, ArrowRight, ShieldCheck, Cpu, Globe, Rocket } from 'lucide-react';

export default function WhyUsPage({ onOpenDemoModal }) {
  const navigate = useNavigate();

  const handleDemoClick = () => {
    if (onOpenDemoModal) onOpenDemoModal();
    else navigate('/contact');
  };

  const pillars = [
    {
      title: 'Designed For Schools',
      desc: 'Greenwood ERP is engineered exclusively for K-12 schools and educational institutes. It is not an adapted generic corporate CRM or accounting tool—every workflow is built around academic realities.'
    },
    {
      title: 'Simple Where It Matters',
      desc: 'Complexity shouldn’t get in the way of daily work. Whether an accountant is issuing a fee receipt or a class teacher is scheduling an exam timetable, interface steps are minimal, clean, and intuitive.'
    },
    {
      title: 'One Connected Ecosystem',
      desc: 'Eliminates separate software silos. When a student pays counter fees, enrolls in a class, or receives an admit card, all data remains perfectly synchronized across administrative departments.'
    },
    {
      title: 'Built To Grow',
      desc: 'Whether your institution has 200 students or operates a network of multi-branch schools with 10,000+ students, Greenwood ERP handles scaling effortlessly without server slowdowns.'
    },
    {
      title: 'Focused On Real-World Workflows',
      desc: 'We solve practical school challenges: automatic Sunday skipping during exam timetable creation, side-by-side all-subject gradebook matrices, and watermarked PDF fee receipts.'
    },
    {
      title: 'Technology With Purpose',
      desc: 'We build technology to serve administrators, teachers, and students—never technology for its own sake. Every feature is measured by how much time and friction it saves.'
    }
  ];

  return (
    <div className="pt-32 pb-24 space-y-20 text-left bg-white">
      
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-200 px-3.5 py-1 rounded-full">
          Institutional Credibility
        </span>
        <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight font-['Outfit']">
          Why Choose Greenwood ERP?
        </h1>
        <p className="text-slate-600 text-base max-w-2xl mx-auto">
          We focus on concrete engineering principles and real-world school workflows rather than generic marketing claims.
        </p>
      </section>

      {/* Pillars Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pillars.map((p, idx) => (
            <div
              key={idx}
              className="p-8 rounded-xl bg-white border border-slate-200 shadow-card space-y-3"
            >
              <div className="text-xs font-bold text-blue-700 font-mono uppercase">Pillar 0{idx + 1}</div>
              <h3 className="text-xl font-black text-slate-900 font-['Outfit']">{p.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed pt-1">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Concrete Engineering Highlights */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-xl bg-slate-900 text-white space-y-8 text-left shadow-xl">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-400">Commitment To Excellence</span>
            <h2 className="text-3xl font-black font-['Outfit']">Engineering Standards You Can Trust</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-slate-300">
            <div className="space-y-2">
              <div className="text-white font-bold flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>99.99% Cloud SLA Guarantee</span>
              </div>
              <p className="text-slate-400 leading-relaxed">High-availability cloud infrastructure ensuring uninterrupted access during fee collection and exam periods.</p>
            </div>

            <div className="space-y-2">
              <div className="text-white font-bold flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Bank-Grade Security & Backups</span>
              </div>
              <p className="text-slate-400 leading-relaxed">Encrypted data transmission, role-based access control, and automated daily cloud database backups.</p>
            </div>

            <div className="space-y-2">
              <div className="text-white font-bold flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Zero On-Site Server Costs</span>
              </div>
              <p className="text-slate-400 leading-relaxed">No expensive local servers or complex maintenance required. Greenwood ERP runs securely in standard web browsers.</p>
            </div>

            <div className="space-y-2">
              <div className="text-white font-bold flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Dedicated Ed-Tech Support</span>
              </div>
              <p className="text-slate-400 leading-relaxed">Full onboarding assistance from Devdhara Technologies engineers to migrate existing student records seamlessly.</p>
            </div>
          </div>

          <div className="pt-4 text-center sm:text-left">
            <button
              onClick={handleDemoClick}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-sm transition-all cursor-pointer inline-flex items-center gap-2"
            >
              <span>Schedule Institutional Walkthrough</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
