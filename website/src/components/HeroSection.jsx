import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, CheckCircle2, Play, Users, Award, CreditCard, ExternalLink, Zap } from 'lucide-react';

export default function HeroSection({ onOpenTrialModal }) {
  return (
    <div className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-radial-gradient">


      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-sky-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">


        <div className="flex justify-center mb-6">
          <a
            href="https://devdhar.in"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-indigo-300 hover:bg-indigo-500/20 transition-all text-xs font-bold group"
          >
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            <span>Developed by Devdhara Technologies</span>
            <span className="text-slate-400 font-normal">|</span>
            <span className="text-sky-400 font-mono flex items-center gap-1 group-hover:underline">
              devdhar.in <ExternalLink className="w-3 h-3" />
            </span>
          </a>
        </div>

        <div className="text-center max-w-4xl mx-auto space-y-6">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] text-white">
            Transform Your School Operations With <span className="text-gradient-primary">Greenwood ERP</span>
          </h1>
          <p className="text-base sm:text-xl text-slate-300 font-medium max-w-2xl mx-auto leading-relaxed">
            The ultimate cloud platform for K-12 schools. Streamline Fee Counter, Teacher Payroll, Class Timetables, Online Homework, and All-Subject Gradebooks seamlessly.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={onOpenTrialModal}
              className="w-full sm:w-auto px-8 py-4 text-sm font-black uppercase tracking-wider text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-sky-500 hover:from-indigo-500 hover:to-sky-400 rounded-2xl shadow-xl shadow-indigo-600/30 hover:shadow-indigo-500/50 hover:scale-[1.02] transition-all cursor-pointer flex items-center justify-center gap-3"
            >
              <Sparkles className="w-5 h-5 text-amber-300" />
              <span>Start 14-Day Free Trial</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="#demo"
              className="w-full sm:w-auto px-7 py-4 text-sm font-bold text-slate-200 bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 rounded-2xl hover:border-slate-600 transition-all flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4 text-sky-400 fill-sky-400" />
              <span>Explore Interactive Demo</span>
            </a>
          </div>

          {/* Value Badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs font-semibold text-slate-400">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>No Credit Card Required</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Instant 5-Minute Setup</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>24/7 Priority Support</span>
            </div>
          </div>
        </div>

        {/* Product UI Preview Mockup Showcase */}
        <div className="mt-14 relative max-w-5xl mx-auto">
          <div className="rounded-3xl p-3 bg-gradient-to-b from-indigo-500/20 via-slate-800/40 to-slate-950 border border-slate-700/60 shadow-2xl shadow-indigo-950/80">

            {/* Top Window Bar */}
            <div className="bg-slate-900/90 rounded-t-2xl px-4 py-3 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <div className="px-4 py-1 rounded-lg bg-slate-950 text-[11px] font-mono text-slate-400 border border-slate-800 flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>app.greenwooderp.com / Devdhara Tech Cloud</span>
              </div>
              <div className="text-[10px] font-bold uppercase text-slate-500">Live Enterprise Edition</div>
            </div>

            {/* Dashboard UI Simulation Preview */}
            <div className="bg-slate-950 p-6 rounded-b-2xl space-y-6">

              {/* Header Stats Bar */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-800/40 text-left">
                  <div className="text-xs text-indigo-300 font-semibold uppercase">Enrolled Students</div>
                  <div className="text-2xl font-black text-white mt-1">1,248</div>
                  <div className="text-[10px] text-emerald-400 font-bold mt-0.5">↑ 12% vs last term</div>
                </div>
                <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-800/40 text-left">
                  <div className="text-xs text-emerald-300 font-semibold uppercase">Fees Collected</div>
                  <div className="text-2xl font-black text-white mt-1 font-mono">₹ 14,85,000</div>
                  <div className="text-[10px] text-emerald-400 font-bold mt-0.5">100% Verified Receipts</div>
                </div>
                <div className="p-4 rounded-2xl bg-sky-950/40 border border-sky-800/40 text-left">
                  <div className="text-xs text-sky-300 font-semibold uppercase">Active Faculty</div>
                  <div className="text-2xl font-black text-white mt-1">42</div>
                  <div className="text-[10px] text-sky-400 font-bold mt-0.5">Payroll Disbursed</div>
                </div>
                <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-800/40 text-left">
                  <div className="text-xs text-purple-300 font-semibold uppercase">Exams & Results</div>
                  <div className="text-2xl font-black text-white mt-1">Term 1 Active</div>
                  <div className="text-[10px] text-amber-400 font-bold mt-0.5">Excel Matrix Synchronized</div>
                </div>
              </div>

              {/* Sample Excel Matrix Table Simulation */}
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-left">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                    <Award className="w-4 h-4 text-indigo-400" />
                    <span>Class 1 Master All-Subject Gradebook Matrix</span>
                  </div>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold">Auto-Ranked</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="bg-slate-950 text-slate-400 uppercase text-[10px]">
                      <tr>
                        <th className="p-2.5">Student Name</th>
                        <th className="p-2.5">Mathematics</th>
                        <th className="p-2.5">Hindi</th>
                        <th className="p-2.5">Physics</th>
                        <th className="p-2.5">Chemistry</th>
                        <th className="p-2.5">Computer</th>
                        <th className="p-2.5 text-right">Percentage</th>
                        <th className="p-2.5 text-center">Result</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 text-slate-200">
                      <tr>
                        <td className="p-2.5 font-bold text-white font-sans">Dev Patel</td>
                        <td className="p-2.5 text-emerald-400 font-bold">95</td>
                        <td className="p-2.5 text-emerald-400 font-bold">88</td>
                        <td className="p-2.5 text-emerald-400 font-bold">92</td>
                        <td className="p-2.5 text-emerald-400 font-bold">90</td>
                        <td className="p-2.5 text-emerald-400 font-bold">98</td>
                        <td className="p-2.5 text-right text-indigo-300 font-bold">92.6%</td>
                        <td className="p-2.5 text-center"><span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 rounded text-[10px] font-sans font-bold">PASS</span></td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-bold text-white font-sans">Priya Sharma</td>
                        <td className="p-2.5 text-emerald-400 font-bold">90</td>
                        <td className="p-2.5 text-emerald-400 font-bold">94</td>
                        <td className="p-2.5 text-emerald-400 font-bold">89</td>
                        <td className="p-2.5 text-emerald-400 font-bold">91</td>
                        <td className="p-2.5 text-emerald-400 font-bold">95</td>
                        <td className="p-2.5 text-right text-indigo-300 font-bold">91.8%</td>
                        <td className="p-2.5 text-center"><span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 rounded text-[10px] font-sans font-bold">PASS</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Live Key Metrics Bar */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-center border-t border-slate-800/80 pt-10">
          <div>
            <div className="text-3xl sm:text-4xl font-black text-white font-['Outfit']">200+</div>
            <div className="text-xs text-slate-400 font-medium mt-1">Institutions Empowered</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black text-indigo-400 font-['Outfit']">150,000+</div>
            <div className="text-xs text-slate-400 font-medium mt-1">Students & Parents</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black text-sky-400 font-['Outfit']">99.99%</div>
            <div className="text-xs text-slate-400 font-medium mt-1">Cloud Service Uptime</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black text-emerald-400 font-['Outfit']">100%</div>
            <div className="text-xs text-slate-400 font-medium mt-1">Audit Trail & Compliance</div>
          </div>
        </div>

      </div>
    </div>
  );
}
