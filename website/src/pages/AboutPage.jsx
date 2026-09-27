import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  CheckCircle2,
  Users,
  Building2,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Heart,
  Target
} from 'lucide-react';
import ScholarGridLogo from '../components/ScholarGridLogo';

export default function AboutPage({ onOpenDemoModal }) {
  const navigate = useNavigate();

  const handleDemoClick = () => {
    if (onOpenDemoModal) onOpenDemoModal();
    else navigate('/demo');
  };

  return (
    <div className="space-y-16 pb-20 text-left bg-white font-['Plus_Jakarta_Sans']">
      
      {/* Header */}
      <section className="pt-28 pb-16 bg-gradient-to-b from-blue-50/60 via-slate-50 to-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 bg-blue-100/80 px-3.5 py-1.5 rounded-full border border-blue-200">
            Our Mission & Vision
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Simplifying School Administration. <br />
            <span className="text-gradient-blue">Empowering Educators.</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto font-medium leading-relaxed">
            ScholarGrid ERP was created to eliminate administrative friction in educational institutions so teachers and administrators can focus on what matters most — student growth and academic excellence.
          </p>
        </div>
      </section>

      {/* Vision & Core Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Simplifying Operations",
              icon: Target,
              desc: "Consolidating admissions, attendance, fees, exams, and timetables into one unified digital workspace."
            },
            {
              title: "Reducing Complexity",
              icon: Sparkles,
              desc: "Automating routine cashiering, grade calculations, and report card generation to eliminate manual errors."
            },
            {
              title: "Connecting Communities",
              icon: Heart,
              desc: "Linking administrators, teachers, students, and parents with real-time updates and transparent communication."
            },
            {
              title: "Data-Driven Decisions",
              icon: TrendingUp,
              desc: "Providing principals and trustees with real-time analytics on attendance, fee trends, and academic metrics."
            }
          ].map((pillar, idx) => {
            const IconComp = pillar.icon;
            return (
              <div key={idx} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-card space-y-3 text-left">
                <div className="p-3 rounded-xl bg-blue-50 text-blue-600 w-fit border border-blue-100">
                  <IconComp className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900">{pillar.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">{pillar.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Vision Narrative Block */}
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-900 text-white shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <ScholarGridLogo isDark={true} />
            <h2 className="text-2xl sm:text-3xl font-black">Built for Enterprise Scale and Everyday Simplicity</h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              We believe school management software should feel as fast, clean, and intuitive as modern consumer SaaS products. ScholarGrid ERP combines enterprise-grade data isolation and security with an elegant user interface that requires zero steep learning curves.
            </p>
          </div>

          <div className="lg:col-span-5 bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3 text-xs">
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Product Highlights</div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-slate-200 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Multi-tenant SaaS architecture for single & multi-branch schools</span>
              </div>
              <div className="flex items-center gap-2 text-slate-200 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Excel-style master gradebook matrix & admit card generator</span>
              </div>
              <div className="flex items-center gap-2 text-slate-200 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Instant PDF counter fee receipt cashiering desk</span>
              </div>
              <div className="flex items-center gap-2 text-slate-200 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Granular 7-role access control (RBAC) & system audit logs</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-4">
        <div className="p-10 rounded-3xl bg-blue-600 text-white space-y-4 shadow-xl">
          <h2 className="text-3xl font-extrabold">Ready to Join Modern Institutions?</h2>
          <p className="text-xs sm:text-sm text-blue-100 max-w-xl mx-auto font-medium">
            Schedule a demonstration to see how ScholarGrid ERP can modernize your school.
          </p>
          <button
            onClick={handleDemoClick}
            className="px-8 py-3.5 bg-white text-slate-900 font-bold text-xs rounded-xl shadow-md cursor-pointer hover:bg-slate-100 transition-all inline-flex items-center gap-2"
          >
            <span>Book a Demo</span>
            <ArrowRight className="w-4 h-4 text-blue-600" />
          </button>
        </div>
      </section>

    </div>
  );
}
