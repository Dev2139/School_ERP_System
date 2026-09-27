import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Building2,
  Layers,
  ShieldCheck,
  CheckCircle2,
  Users,
  ArrowRight,
  TrendingUp,
  BarChart3,
  Check
} from 'lucide-react';

export default function MultiSchoolPage({ onOpenDemoModal }) {
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
            Multi-Tenant SaaS Architecture
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Built to Scale Across <br />
            <span className="text-gradient-blue">Multiple Schools.</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto font-medium leading-relaxed">
            Govern single campuses, multi-branch education trusts, and national school networks from one centralized Super Admin console without sacrificing individual school autonomy.
          </p>

          <div className="flex justify-center gap-4 pt-2">
            <button
              onClick={handleDemoClick}
              className="px-7 py-3.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md cursor-pointer flex items-center gap-2"
            >
              <span>Book Multi-School Demo</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Visual Multi-School Topology Diagram */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-900 text-white shadow-2xl space-y-8">
          <div className="text-center space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-sky-400 bg-sky-500/10 px-3 py-1 rounded-full border border-sky-500/30">
              Multi-Branch Network Topology
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold">Centralized Governance & Isolated Campuses</h2>
            <p className="text-xs text-slate-400">Connected to ScholarGrid ERP Central SaaS Platform Core.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center pt-4">
            
            {/* Left Column: 3 Connected School Campuses */}
            <div className="lg:col-span-6 space-y-3 font-mono text-xs">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold font-sans">
                    A
                  </div>
                  <div>
                    <div className="font-bold text-white font-sans">School Branch A (Greenwood)</div>
                    <div className="text-[10px] text-slate-400">1,248 Students • Autonomous Fees & Staff</div>
                  </div>
                </div>
                <span className="text-[10px] text-emerald-400 font-bold">Isolated Tenant</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-bold font-sans">
                    B
                  </div>
                  <div>
                    <div className="font-bold text-white font-sans">School Branch B (St. Xavier)</div>
                    <div className="text-[10px] text-slate-400">850 Students • Independent Gradebook</div>
                  </div>
                </div>
                <span className="text-[10px] text-emerald-400 font-bold">Isolated Tenant</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-600/20 text-purple-400 flex items-center justify-center font-bold font-sans">
                    C
                  </div>
                  <div>
                    <div className="font-bold text-white font-sans">School Branch C (City Academy)</div>
                    <div className="text-[10px] text-slate-400">1,410 Students • Branch Principal Control</div>
                  </div>
                </div>
                <span className="text-[10px] text-emerald-400 font-bold">Isolated Tenant</span>
              </div>
            </div>

            {/* Right Column: Central Trust Console */}
            <div className="lg:col-span-6 p-6 rounded-2xl bg-gradient-to-br from-blue-900 to-indigo-950 border border-blue-700/80 space-y-4">
              <div className="flex items-center gap-2 text-sky-300 font-bold text-xs uppercase tracking-wider">
                <Building2 className="w-4 h-4" />
                <span>Central Education Trust HQ Console</span>
              </div>
              <h3 className="text-xl font-black text-white">
                ScholarGrid ERP Multi-School Management Center
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                Trustees and Directors get cross-campus financial consolidation, staff transfers, global attendance dashboards, and uniform academic grading matrices.
              </p>

              <div className="space-y-2 text-xs pt-2 font-sans">
                <div className="flex items-center gap-2 text-slate-200">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Consolidated Financial Fee Analytics across all campuses</span>
                </div>
                <div className="flex items-center gap-2 text-slate-200">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Inter-branch student transfer certificate workflow</span>
                </div>
                <div className="flex items-center gap-2 text-slate-200">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Centralized Super Admin security policies & audit logs</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Multi-School Capabilities */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "School-Level Data Isolation",
              desc: "Strict multi-tenant boundaries prevent data leakage between campuses while maintaining central oversight."
            },
            {
              title: "Centralized Trust Governance",
              desc: "Consolidated fee collection, enrollment metrics, and academic results across all branches in one dashboard."
            },
            {
              title: "Cross-Branch Faculty & Student Sync",
              desc: "Easily handle student campus transfers and faculty cross-deputations with full historical log integrity."
            },
            {
              title: "Branch-Specific Custom Branding",
              desc: "Each school branch maintains its own letterhead, receipt logos, admit card layouts, and uniform fee schedules."
            },
            {
              title: "Scalable Cloud Infrastructure",
              desc: "Add new school campuses in under 10 minutes without server provisioning or database setup delay."
            },
            {
              title: "Independent Branch Operations",
              desc: "Each campus principal, accountant, and teacher operates within their designated branch view."
            },
          ].map((cap, i) => (
            <div key={i} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-card space-y-2">
              <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-xs">
                0{i + 1}
              </div>
              <h3 className="text-base font-bold text-slate-900">{cap.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">{cap.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8">
        <div className="p-10 rounded-3xl bg-slate-900 text-white space-y-4 shadow-xl">
          <h2 className="text-3xl font-extrabold">Managing a Group of Schools?</h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto font-medium">
            Speak with our enterprise SaaS specialists to structure a multi-campus deployment.
          </p>
          <button
            onClick={handleDemoClick}
            className="px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer transition-all inline-flex items-center gap-2"
          >
            <span>Book Multi-School Walkthrough</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

    </div>
  );
}
