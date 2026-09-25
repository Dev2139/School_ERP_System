import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Play,
  FileSpreadsheet,
  CreditCard,
  Calendar,
  Users,
  Award,
  GraduationCap,
  BookOpen,
  ChevronRight,
  Star,
  Quote
} from 'lucide-react';

export default function HomePage({ onOpenTrialModal }) {
  const [activeTab, setActiveTab] = useState('matrix');

  return (
    <div className="space-y-24 pb-16">
      
      {/* ------------------------------------------------------------------- */}
      {/* HERO SECTION */}
      {/* ------------------------------------------------------------------- */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
        
        {/* Subtle Ambient Background Lighting */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[450px] h-[350px] bg-sky-500/10 rounded-full blur-[130px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          
          {/* Release Badge */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              <span>Greenwood ERP v2.0 Released</span>
              <span className="text-slate-500 font-normal">|</span>
              <span className="text-sky-400 font-medium">Enterprise Edition</span>
            </div>
          </div>

          {/* Main Headline */}
          <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] text-white">
              The Modern School Operating System For <span className="text-gradient-primary">K-12 Institutions</span>
            </h1>

            <p className="text-base sm:text-xl text-slate-300 font-normal max-w-2xl mx-auto leading-relaxed">
              Unify fee counter collection, teacher payroll, class timetable scheduling, and all-subject gradebook matrices into one intuitive cloud platform.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button
                onClick={onOpenTrialModal}
                className="w-full sm:w-auto px-8 py-4 text-sm font-bold text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-sky-500 hover:from-indigo-500 hover:to-sky-400 rounded-xl shadow-xl shadow-indigo-600/25 hover:shadow-indigo-500/40 hover:scale-[1.02] transition-all cursor-pointer flex items-center justify-center gap-2.5"
              >
                <Sparkles className="w-4.5 h-4.5 text-amber-300" />
                <span>Start 14-Day Free Trial</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <Link
                to="/demo"
                className="w-full sm:w-auto px-7 py-4 text-sm font-semibold text-slate-200 bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4 text-sky-400 fill-sky-400" />
                <span>Explore Interactive Demo</span>
              </Link>
            </div>

            {/* Value Guarantees */}
            <div className="flex flex-wrap items-center justify-center gap-6 pt-3 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>No Credit Card Needed</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>5-Minute School Setup</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>24/7 Dedicated Support</span>
              </div>
            </div>
          </div>

          {/* Product UI Mockup Simulation */}
          <div className="mt-16 max-w-5xl mx-auto rounded-2xl p-2 bg-slate-900/60 border border-slate-800 shadow-2xl">
            <div className="bg-slate-950 rounded-xl overflow-hidden border border-slate-800/80">
              
              {/* Window Header */}
              <div className="bg-slate-900/90 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <div className="px-3 py-0.5 rounded-md bg-slate-950 text-[11px] font-mono text-slate-400 border border-slate-800 flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>app.greenwooderp.com / Main Dashboard</span>
                </div>
                <div className="text-[10px] font-bold text-indigo-400 uppercase">Live Preview</div>
              </div>

              {/* Interface Content Simulator */}
              <div className="p-6 space-y-6 text-left">
                
                {/* Metric Summary Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/80">
                    <div className="text-[11px] font-semibold text-slate-400 uppercase">Total Enrolled</div>
                    <div className="text-2xl font-black text-white mt-1">1,248 Students</div>
                    <div className="text-[10px] text-emerald-400 font-semibold mt-0.5">Classes 1 - 10</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/80">
                    <div className="text-[11px] font-semibold text-slate-400 uppercase">Counter Fee Portal</div>
                    <div className="text-2xl font-black text-white mt-1 font-mono">₹ 14,85,000</div>
                    <div className="text-[10px] text-emerald-400 font-semibold mt-0.5">Official PDF Receipts</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/80">
                    <div className="text-[11px] font-semibold text-slate-400 uppercase">Teaching Staff</div>
                    <div className="text-2xl font-black text-white mt-1">42 Faculty</div>
                    <div className="text-[10px] text-sky-400 font-semibold mt-0.5">Payroll Disbursed</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/80">
                    <div className="text-[11px] font-semibold text-slate-400 uppercase">Exam Gradebook</div>
                    <div className="text-2xl font-black text-white mt-1">Term 1 Active</div>
                    <div className="text-[10px] text-amber-400 font-semibold mt-0.5">Excel Matrix Ready</div>
                  </div>
                </div>

                {/* Gradebook Matrix Table Preview */}
                <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                      <FileSpreadsheet className="w-4 h-4 text-indigo-400" />
                      <span>Class 1 All-Subject Gradebook Matrix</span>
                    </div>
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-md font-bold">Auto-Ranked</span>
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
                          <th className="p-2.5 text-center">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/80 text-slate-200">
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

        </div>
      </section>

      {/* ------------------------------------------------------------------- */}
      {/* KEY FEATURE HIGHLIGHTS GRID */}
      {/* ------------------------------------------------------------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
        <div className="max-w-3xl mx-auto space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-indigo-400">Core Capabilities</div>
          <h2 className="text-3xl sm:text-5xl font-black text-white">
            Built To Solve Real School Administrative Friction
          </h2>
          <p className="text-slate-400 text-sm">
            Everything your school needs across Academics, Finance, Examinations, and Staff Management.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          
          <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800/80 hover:border-indigo-500/40 transition-all space-y-3">
            <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl w-fit border border-emerald-500/20">
              <CreditCard className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Accountant Counter Fee Portal</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Dedicated Accountant role (`account@school.com`) with instant student counter lookup, standard-wise class fee configuration, and official watermarked PDF receipts.
            </p>
            <Link to="/features" className="inline-flex items-center gap-1 text-xs text-indigo-400 font-bold hover:underline pt-2">
              Learn about Fee Counter <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800/80 hover:border-indigo-500/40 transition-all space-y-3">
            <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-xl w-fit border border-indigo-500/20">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">All-Subject Master Gradebook</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Fill student marks across all subjects side-by-side in one spreadsheet matrix grid. Automatic class ranking, percentage scores, and report card generation.
            </p>
            <Link to="/features" className="inline-flex items-center gap-1 text-xs text-indigo-400 font-bold hover:underline pt-2">
              Explore Gradebook Matrix <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800/80 hover:border-indigo-500/40 transition-all space-y-3">
            <div className="p-3 bg-sky-500/10 text-sky-400 rounded-xl w-fit border border-sky-500/20">
              <Calendar className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Smart Exam Timetable Scheduler</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Class Teachers schedule exam timetables for their assigned class standard. Smart date incrementing automatically advances +1 day and skips Sundays.
            </p>
            <Link to="/features" className="inline-flex items-center gap-1 text-xs text-indigo-400 font-bold hover:underline pt-2">
              See Timetable Features <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800/80 hover:border-indigo-500/40 transition-all space-y-3">
            <div className="p-3 bg-purple-500/10 text-purple-400 rounded-xl w-fit border border-purple-500/20">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Digital Admit Cards & Reports</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Printable Hall Tickets / Admit Cards for students with seat numbers. Strict 1-student result privacy ensures students only view their personal report card.
            </p>
            <Link to="/features" className="inline-flex items-center gap-1 text-xs text-indigo-400 font-bold hover:underline pt-2">
              Admit Card Portal <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800/80 hover:border-indigo-500/40 transition-all space-y-3">
            <div className="p-3 bg-amber-500/10 text-amber-400 rounded-xl w-fit border border-amber-500/20">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Faculty Directory & Payroll</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Centralized teacher directory with assigned subjects. Monthly payroll processing and teacher salary disbursement tracking with automated audit logs.
            </p>
            <Link to="/features" className="inline-flex items-center gap-1 text-xs text-indigo-400 font-bold hover:underline pt-2">
              Faculty Management <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800/80 hover:border-indigo-500/40 transition-all space-y-3">
            <div className="p-3 bg-rose-500/10 text-rose-400 rounded-xl w-fit border border-rose-500/20">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Subject-Specific Homework</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Subject teachers issue homework exclusively for their taught subjects. Online submission buttons are controlled by teacher submission toggles.
            </p>
            <Link to="/features" className="inline-flex items-center gap-1 text-xs text-indigo-400 font-bold hover:underline pt-2">
              Homework Portal <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>
      </section>

      {/* ------------------------------------------------------------------- */}
      {/* TESTIMONIALS & TRUST SECTION */}
      {/* ------------------------------------------------------------------- */}
      <section className="bg-slate-900/30 border-y border-slate-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          
          <div className="max-w-2xl mx-auto space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-sky-400">Customer Success</div>
            <h2 className="text-3xl font-black text-white">Trusted By School Leaders Across India</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-4">
              <div className="flex text-amber-400 gap-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400" />)}
              </div>
              <p className="text-xs text-slate-300 italic leading-relaxed">
                "The All-Subject Master Gradebook Matrix and Sunday-skipping timetable scheduler saved our teachers over 40 hours during term exams!"
              </p>
              <div className="pt-2 border-t border-slate-900">
                <div className="text-xs font-bold text-white">Dr. Rajesh K. Mehta</div>
                <div className="text-[11px] text-indigo-400">Principal, Greenwood International</div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-4">
              <div className="flex text-amber-400 gap-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400" />)}
              </div>
              <p className="text-xs text-slate-300 italic leading-relaxed">
                "The Accountant Counter Portal (`account@school.com`) with instant PDF receipts completely eliminated long counter lines on fee day."
              </p>
              <div className="pt-2 border-t border-slate-900">
                <div className="text-xs font-bold text-white">Suresh Verma</div>
                <div className="text-[11px] text-emerald-400">Head Accountant, St. Xavier Academy</div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-4">
              <div className="flex text-amber-400 gap-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400" />)}
              </div>
              <p className="text-xs text-slate-300 italic leading-relaxed">
                "Parents love being able to download digital Admit Cards and view private report cards directly from their smartphone browsers."
              </p>
              <div className="pt-2 border-t border-slate-900">
                <div className="text-xs font-bold text-white">Pooja Sharma</div>
                <div className="text-[11px] text-sky-400">Senior Teacher & Class Coordinator</div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ------------------------------------------------------------------- */}
      {/* FINAL CALL TO ACTION */}
      {/* ------------------------------------------------------------------- */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="p-10 rounded-3xl bg-gradient-to-r from-indigo-950 via-slate-900 to-sky-950 border border-indigo-500/30 shadow-2xl space-y-6">
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            Ready To Modernize Your School Administration?
          </h2>
          <p className="text-slate-300 text-sm max-w-xl mx-auto">
            Join hundreds of K-12 institutions already using Greenwood ERP to streamline fees, exams, timetables, and payroll.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={onOpenTrialModal}
              className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Start Free 14-Day Trial</span>
            </button>

            <Link
              to="/contact"
              className="px-6 py-4 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl border border-slate-700"
            >
              Contact Sales Team
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
