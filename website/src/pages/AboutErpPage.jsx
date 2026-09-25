import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Check, X, ArrowRight, Lightbulb, AlertTriangle, CheckCircle2, Rocket } from 'lucide-react';

export default function AboutErpPage({ onOpenDemoModal }) {
  const navigate = useNavigate();

  const handleDemoClick = () => {
    if (onOpenDemoModal) onOpenDemoModal();
    else navigate('/contact');
  };

  return (
    <div className="pt-32 pb-24 space-y-20 text-left bg-white">
      
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-200 px-3.5 py-1 rounded-full">
          Product Identity & Philosophy
        </span>
        <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight font-['Outfit']">
          What is Greenwood ERP?
        </h1>
        <p className="text-slate-600 text-base max-w-2xl mx-auto">
          An intuitive operating system designed to simplify administrative friction and digitize K-12 school workflows.
        </p>
      </section>

      {/* Concept & Problem Solved */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-6 space-y-4 text-left">
            <h2 className="text-3xl font-black text-slate-900 font-['Outfit']">Designed For Educational Realities</h2>
            <p className="text-slate-700 text-sm leading-relaxed">
              Greenwood ERP is a comprehensive digital operating system designed specifically for K-12 schools, CBSE/ICSE institutes, and educational trusts. Rather than forcing schools to adapt to generic corporate software, Greenwood ERP is engineered around actual institutional processes—from counter fee collection to class teacher exam scheduling.
            </p>
            <p className="text-slate-700 text-sm leading-relaxed">
              It brings all school stakeholders—Administrators, Accountants, Teachers, Students, and Parents—into one connected environment, eliminating manual paper follow-ups and duplicated data entry.
            </p>
          </div>

          <div className="lg:col-span-6 rounded-2xl overflow-hidden border border-slate-200 shadow-md">
            <img 
              src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1000&q=80" 
              alt="School Administrators discussing operations"
              className="w-full h-80 object-cover object-center" 
            />
            <div className="p-3.5 bg-slate-900 text-white text-xs font-semibold flex justify-between items-center">
              <span>Enterprise Institutional Operations</span>
              <span className="text-sky-400 font-mono text-[11px]">Greenwood ERP Platform</span>
            </div>
          </div>

        </div>
      </section>

      {/* Storytelling Timeline: Idea → Problem → Solution → Vision */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-700">Evolution of the ERP</span>
          <h2 className="text-3xl font-black text-slate-900 font-['Outfit']">Our Product Story</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-card space-y-3 relative">
            <div className="p-2.5 bg-blue-50 text-blue-700 rounded-lg w-fit">
              <Lightbulb className="w-5 h-5" />
            </div>
            <div className="text-xs font-bold uppercase tracking-wider text-blue-700">1. The Idea</div>
            <h3 className="text-base font-bold text-slate-900">Education First</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Recognizing that schools waste hundreds of hours manually compiling fee ledgers and gradebook report cards.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-card space-y-3 relative">
            <div className="p-2.5 bg-amber-50 text-amber-700 rounded-lg w-fit">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div className="text-xs font-bold uppercase tracking-wider text-amber-700">2. The Problem</div>
            <h3 className="text-base font-bold text-slate-900">Fragmented Workflows</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Paper registers, Excel spreadsheets, and disconnected tools created communication gaps and data errors.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-card space-y-3 relative">
            <div className="p-2.5 bg-emerald-50 text-emerald-700 rounded-lg w-fit">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-700">3. The Solution</div>
            <h3 className="text-base font-bold text-slate-900">Greenwood Platform</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Building a unified platform with role-based access for accountants, class teachers, students, and admins.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-card space-y-3 relative">
            <div className="p-2.5 bg-purple-50 text-purple-700 rounded-lg w-fit">
              <Rocket className="w-5 h-5" />
            </div>
            <div className="text-xs font-bold uppercase tracking-wider text-purple-700">4. The Vision</div>
            <h3 className="text-base font-bold text-slate-900">System Orientation</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Empowering schools to become system-oriented operating environments with automated compliance.
            </p>
          </div>
        </div>
      </section>

      {/* Philosophy Section: Built Around the Way Schools Actually Work */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-700">Core Philosophy</span>
          <h2 className="text-3xl font-black text-slate-900 font-['Outfit']">
            Built Around The Way Schools Actually Work
          </h2>
        </div>

        <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
          <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <h3 className="text-base font-bold text-slate-900">Dedicated Role-Based Workspaces</h3>
            <p className="text-slate-600">
              Accountants don’t need academic setup forms; Class Teachers don’t need fee ledgers. Greenwood ERP provides specialized workspace roles (`account@school.com` for Fee Counter, Class Teacher view for Timetable Scheduling) so each user focuses exclusively on their job.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <h3 className="text-base font-bold text-slate-900">Practical Real-World Automation</h3>
            <p className="text-slate-600">
              When scheduling exam timetables, the system automatically advances exam dates (+1 day) from previous subjects. When entering exam marks, teachers use a side-by-side all-subject spreadsheet matrix rather than opening separate subject forms.
            </p>
          </div>
        </div>
      </section>

      {/* Before / After Comparison */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-700">Operational Transformation</span>
          <h2 className="text-3xl font-black text-slate-900 font-['Outfit']">Before & After Greenwood ERP</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Before Column */}
          <div className="p-8 rounded-xl bg-rose-50/50 border border-rose-200 space-y-4">
            <div className="text-sm font-bold uppercase text-rose-800 flex items-center gap-2">
              <X className="w-5 h-5 text-rose-600" />
              <span>Before (Disconnected School Operations)</span>
            </div>
            <div className="space-y-3 text-xs text-slate-700 font-medium">
              <div className="p-3 bg-white rounded border border-rose-200 flex items-start gap-2">
                <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span>Scattered information across paper registers and local Excel files</span>
              </div>
              <div className="p-3 bg-white rounded border border-rose-200 flex items-start gap-2">
                <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span>Manual repeated typing of student rosters in attendance and gradebooks</span>
              </div>
              <div className="p-3 bg-white rounded border border-rose-200 flex items-start gap-2">
                <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span>Long counter lines on fee week due to manual paper receipt writing</span>
              </div>
              <div className="p-3 bg-white rounded border border-rose-200 flex items-start gap-2">
                <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span>Difficulty compiling overall class ranks and printable report cards</span>
              </div>
            </div>
          </div>

          {/* After Column */}
          <div className="p-8 rounded-xl bg-emerald-50/50 border border-emerald-200 space-y-4">
            <div className="text-sm font-bold uppercase text-emerald-800 flex items-center gap-2">
              <Check className="w-5 h-5 text-emerald-600" />
              <span>After (Unified Greenwood ERP Operating System)</span>
            </div>
            <div className="space-y-3 text-xs text-slate-700 font-medium">
              <div className="p-3 bg-white rounded border border-emerald-200 flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Centralized cloud database with instant access across all departments</span>
              </div>
              <div className="p-3 bg-white rounded border border-emerald-200 flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Automated student profiles linked to attendance, timetables, and fee ledgers</span>
              </div>
              <div className="p-3 bg-white rounded border border-emerald-200 flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Accountant counter portal (`account@school.com`) with instant watermarked PDF receipts</span>
              </div>
              <div className="p-3 bg-white rounded border border-emerald-200 flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>All-subject spreadsheet matrix with automated rank calculation and private report cards</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* CTA Banner */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-xl bg-slate-900 text-white text-center space-y-4 shadow-md">
          <h2 className="text-2xl font-black font-['Outfit']">Discover Greenwood ERP For Your School</h2>
          <button
            onClick={handleDemoClick}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-sm cursor-pointer"
          >
            Request a Product Demo
          </button>
        </div>
      </section>

    </div>
  );
}
