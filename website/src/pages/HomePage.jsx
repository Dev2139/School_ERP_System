import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Shield,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  FileSpreadsheet,
  CreditCard,
  Calendar,
  Users,
  Award,
  GraduationCap,
  BookOpen,
  ChevronRight,
  Layers,
  Printer,
  Sliders,
  Check,
  Sparkles
} from 'lucide-react';

export default function HomePage({ onOpenDemoModal }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('matrix');

  const handleDemoClick = () => {
    if (onOpenDemoModal) onOpenDemoModal();
    else navigate('/contact');
  };

  return (
    <div className="space-y-24 pb-20 text-left bg-white font-['Plus_Jakarta_Sans']">
      
      {/* ------------------------------------------------------------------- */}
      {/* HERO SECTION WITH RADIAL GLOW & GRADIENT TYPOGRAPHY */}
      {/* ------------------------------------------------------------------- */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 border-b border-slate-200/60 hero-glow bg-gradient-to-b from-blue-50/40 via-slate-50/50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-9">
          
          {/* Main Headline & Badge */}
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wide text-blue-800 bg-blue-100/70 border border-blue-200 px-4 py-1.5 rounded-full shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              <span>Enterprise School ERP v4.2 • Devdhara Technologies</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.12]">
              A Smarter Way to <span className="text-gradient-blue">Manage Your School.</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
              Greenwood ERP brings key school operations, student information, fee collection, gradebooks, and teacher administration into one organized, secure digital platform.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-3">
              <button
                onClick={handleDemoClick}
                className="w-full sm:w-auto px-8 py-4 text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Request a Demo</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <Link
                to="/about-erp"
                className="w-full sm:w-auto px-7 py-4 text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300/80 rounded-xl shadow-xs transition-all flex items-center justify-center gap-2"
              >
                <span>Explore the ERP</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
            </div>
          </div>

          {/* Interactive Enterprise Product UI Mockup */}
          <div className="mt-14 max-w-5xl mx-auto rounded-2xl bg-slate-900 p-2 sm:p-3 shadow-mockup border border-slate-800">
            <div className="bg-white rounded-xl overflow-hidden border border-slate-200 text-left">
              
              {/* Browser Header & Interactive Module Tabs */}
              <div className="bg-slate-900 text-white px-4 py-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500" />
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="text-[11px] font-mono text-slate-400 ml-2 hidden sm:inline">app.greenwooderp.com</span>
                </div>

                {/* Tab Controls */}
                <div className="flex items-center gap-1.5 text-[11px] font-bold bg-slate-950 p-1 rounded-lg border border-slate-800">
                  <button
                    onClick={() => setActiveTab('matrix')}
                    className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                      activeTab === 'matrix' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Gradebook Matrix
                  </button>
                  <button
                    onClick={() => setActiveTab('fees')}
                    className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                      activeTab === 'fees' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Counter Fee Portal
                  </button>
                  <button
                    onClick={() => setActiveTab('timetable')}
                    className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                      activeTab === 'timetable' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Timetable Scheduler
                  </button>
                </div>
              </div>

              {/* Live Interactive Tab Contents */}
              <div className="p-6 space-y-6 bg-slate-50/50">
                
                {/* Metric Bar */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-card">
                    <div className="text-[10px] font-bold text-slate-500 uppercase">Enrolled Students</div>
                    <div className="text-2xl font-black text-slate-900 mt-1 font-mono">1,248</div>
                    <div className="text-[10px] text-blue-700 font-bold mt-0.5">Classes 1 - 10 Configured</div>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-card">
                    <div className="text-[10px] font-bold text-slate-500 uppercase">Counter Fee Portal</div>
                    <div className="text-2xl font-black text-slate-900 mt-1 font-mono">₹ 14,85,000</div>
                    <div className="text-[10px] text-emerald-700 font-bold mt-0.5">Official PDF Receipts</div>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-card">
                    <div className="text-[10px] font-bold text-slate-500 uppercase">Teaching Staff</div>
                    <div className="text-2xl font-black text-slate-900 mt-1 font-mono">42 Faculty</div>
                    <div className="text-[10px] text-slate-600 font-bold mt-0.5">Payroll Disbursed</div>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-card">
                    <div className="text-[10px] font-bold text-slate-500 uppercase">Exam Gradebook</div>
                    <div className="text-2xl font-black text-slate-900 mt-1 font-mono">Term 1 Active</div>
                    <div className="text-[10px] text-amber-700 font-bold mt-0.5">Excel Matrix Ready</div>
                  </div>
                </div>

                {/* Tab Screen 1: Master Gradebook Matrix */}
                {activeTab === 'matrix' && (
                  <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-card space-y-3 animate-fadeIn">
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
                        <FileSpreadsheet className="w-4 h-4 text-blue-600" />
                        <span>Class 1 All-Subject Gradebook Matrix</span>
                      </div>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 border border-emerald-200 px-2.5 py-0.5 rounded-full font-bold">Auto-Ranked</span>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs font-mono">
                        <thead className="bg-slate-100 text-slate-700 uppercase text-[10px] font-bold">
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
                        <tbody className="divide-y divide-slate-200 text-slate-800 font-sans">
                          <tr className="hover:bg-blue-50/50 transition-colors">
                            <td className="p-2.5 font-bold text-slate-900">Dev Patel</td>
                            <td className="p-2.5 font-bold text-emerald-700 font-mono">95</td>
                            <td className="p-2.5 font-bold text-emerald-700 font-mono">88</td>
                            <td className="p-2.5 font-bold text-emerald-700 font-mono">92</td>
                            <td className="p-2.5 font-bold text-emerald-700 font-mono">90</td>
                            <td className="p-2.5 font-bold text-emerald-700 font-mono">98</td>
                            <td className="p-2.5 text-right font-bold text-blue-700 font-mono">92.6%</td>
                            <td className="p-2.5 text-center"><span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 border border-emerald-200 rounded text-[10px] font-bold">PASS (Rank 1)</span></td>
                          </tr>
                          <tr className="hover:bg-blue-50/50 transition-colors">
                            <td className="p-2.5 font-bold text-slate-900">Ananya Sharma</td>
                            <td className="p-2.5 font-bold text-emerald-700 font-mono">91</td>
                            <td className="p-2.5 font-bold text-emerald-700 font-mono">94</td>
                            <td className="p-2.5 font-bold text-emerald-700 font-mono">89</td>
                            <td className="p-2.5 font-bold text-emerald-700 font-mono">88</td>
                            <td className="p-2.5 font-bold text-emerald-700 font-mono">95</td>
                            <td className="p-2.5 text-right font-bold text-blue-700 font-mono">91.4%</td>
                            <td className="p-2.5 text-center"><span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 border border-emerald-200 rounded text-[10px] font-bold">PASS (Rank 2)</span></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Tab Screen 2: Counter Fee Portal */}
                {activeTab === 'fees' && (
                  <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-card space-y-3 animate-fadeIn">
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-emerald-600" />
                        <span>Accountant Counter Cashiering Portal (`account@school.com`)</span>
                      </div>
                      <span className="text-[10px] bg-blue-100 text-blue-800 border border-blue-200 px-2.5 py-0.5 rounded-full font-bold">PDF Receipt Ready</span>
                    </div>
                    <div className="p-4 bg-slate-900 text-white rounded-lg font-mono text-xs space-y-2">
                      <div className="text-slate-400 text-[10px] uppercase font-bold">Counter Receipt #REC-2026-9041</div>
                      <div className="text-white font-bold">Student: Dev Patel • Admission ID: ADM-2026-868</div>
                      <div className="text-slate-300 text-[11px]">Fee Type: Term 1 Tuition Fee • Mode: Cash / UPI</div>
                      <div className="text-emerald-400 font-bold text-sm pt-1">Total Paid: ₹ 15,000 (Watermarked Official Receipt Generated)</div>
                    </div>
                  </div>
                )}

                {/* Tab Screen 3: Timetable Scheduler */}
                {activeTab === 'timetable' && (
                  <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-card space-y-3 animate-fadeIn">
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-purple-600" />
                        <span>Class Teacher Exam Timetable Scheduler</span>
                      </div>
                      <span className="text-[10px] bg-purple-100 text-purple-800 border border-purple-200 px-2.5 py-0.5 rounded-full font-bold">Auto Scheduled</span>
                    </div>
                    <div className="p-4 bg-slate-900 text-white rounded-lg font-mono text-xs space-y-2">
                      <div className="text-slate-300">Mathematics: 17-Oct-2026 (Saturday)</div>
                      <div className="text-amber-400 font-bold">18-Oct-2026 (Sunday - Holiday)</div>
                      <div className="text-emerald-400 font-bold">Physics: 19-Oct-2026 (Monday - Scheduled)</div>
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ------------------------------------------------------------------- */}
      {/* SECTION: EVERYTHING YOUR SCHOOL NEEDS, CONNECTED */}
      {/* ------------------------------------------------------------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-700">Unified Architecture</span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 font-['Outfit']">
            Everything Your School Needs, Connected.
          </h2>
          <p className="text-slate-600 text-sm">
            Greenwood ERP eliminates fragmented paper files, separate software tools, and communication gaps by establishing one centralized operating system.
          </p>
        </div>

        {/* Overview Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          
          <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-card shadow-card-hover space-y-3">
            <div className="p-2.5 bg-slate-100 text-slate-800 rounded-lg w-fit">
              <CreditCard className="w-5 h-5 text-blue-700" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Accountant Fee Counter</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Dedicated counter portal (`account@school.com`) with instant student lookup, standard fee setups, and watermarked PDF receipts.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-card shadow-card-hover space-y-3">
            <div className="p-2.5 bg-slate-100 text-slate-800 rounded-lg w-fit">
              <FileSpreadsheet className="w-5 h-5 text-blue-700" />
            </div>
            <h3 className="text-base font-bold text-slate-900">All-Subject Master Gradebook</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Fill marks across all subjects side-by-side in a single spreadsheet matrix grid with automatic class rank calculation.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-card shadow-card-hover space-y-3">
            <div className="p-2.5 bg-slate-100 text-slate-800 rounded-lg w-fit">
              <Calendar className="w-5 h-5 text-blue-700" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Smart Exam Timetable</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Class Teachers schedule exam timetables for their class with auto date incrementing and intelligent date management.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-card shadow-card-hover space-y-3">
            <div className="p-2.5 bg-slate-100 text-slate-800 rounded-lg w-fit">
              <Printer className="w-5 h-5 text-blue-700" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Digital Hall Tickets & Admit Cards</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Printable Admit Cards with seat numbers and exam timing, enforcing strict 1-student result privacy protection.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-card shadow-card-hover space-y-3">
            <div className="p-2.5 bg-slate-100 text-slate-800 rounded-lg w-fit">
              <Users className="w-5 h-5 text-blue-700" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Faculty Directory & Payroll</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Teaching staff directory with assigned subjects, qualification sync, and one-click monthly salary disbursement tracking.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-card shadow-card-hover space-y-3">
            <div className="p-2.5 bg-slate-100 text-slate-800 rounded-lg w-fit">
              <BookOpen className="w-5 h-5 text-blue-700" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Subject-Specific Homework</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Subject teachers post homework strictly for their taught subjects, with optional student online submission toggles.
            </p>
          </div>

        </div>
      </section>

      {/* ------------------------------------------------------------------- */}
      {/* SECTION: WHY IT MATTERS */}
      {/* ------------------------------------------------------------------- */}
      <section className="bg-slate-50 border-y border-slate-200/80 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="max-w-3xl mx-auto text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700">Operational Value</span>
            <h2 className="text-3xl font-black text-slate-900 font-['Outfit']">Why Centralization Matters For Schools</h2>
            <p className="text-slate-600 text-sm">
              Scattered paper records and standalone spreadsheets cause friction, delay reporting, and create accountability gaps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="p-6 rounded-xl bg-white border border-slate-200 space-y-2.5">
              <h3 className="text-base font-bold text-slate-900">1. Eliminate Duplicate Data Entry</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                When a student enrolls, their profile automatically flows to attendance rosters, exam timetable lists, and accountant fee ledgers without re-typing.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white border border-slate-200 space-y-2.5">
              <h3 className="text-base font-bold text-slate-900">2. Instant Audit & Accountability</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Every fee payment, mark edit, and salary disbursement is tied to authorized user accounts (`account@school.com` or teacher accounts) with audit logs.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white border border-slate-200 space-y-2.5">
              <h3 className="text-base font-bold text-slate-900">3. Seamless Stakeholder Visibility</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Principals monitor school health, accountants manage fee counters, teachers fill gradebooks, and parents view private report cards from any browser.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------- */}
      {/* PRODUCT SHOWCASE: ALTERNATING EDITORIAL LAYOUTS */}
      {/* ------------------------------------------------------------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-700">Product Deep Dive</span>
          <h2 className="text-3xl font-black text-slate-900 font-['Outfit']">Designed Around Institutional Realities</h2>
        </div>

        {/* Showcase Item 1: Fee Counter & PDF Receipts */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-4">
            <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 px-3 py-1 rounded border border-slate-200">
              Financial Administration
            </span>
            <h3 className="text-2xl font-black text-slate-900">Accountant Counter Portal (`account@school.com`)</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Designed specifically for fast counter transactions during busy fee collection periods. Accountants enter student admission numbers, verify standard class fee items, and issue watermarked PDF receipts.
            </p>
            <div className="space-y-2 pt-1 text-xs text-slate-700 font-medium">
              <div className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Standard-wise class fee configuration (Class 1 to Class 10)</div>
              <div className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Supports Cash, UPI, Cheque & Bank Transfer payment modes</div>
              <div className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Downloadable official PDF Fee Receipts with watermark</div>
            </div>
          </div>

          <div className="lg:col-span-6 p-4 rounded-xl bg-slate-900 text-white font-mono text-xs space-y-3 shadow-mockup">
            <div className="flex justify-between border-b border-slate-800 pb-2 text-[11px] text-slate-400">
              <span>COUNTER STUDENT LOOKUP</span>
              <span className="text-emerald-400 font-bold">FEE VERIFIED</span>
            </div>
            <div className="p-3 bg-slate-950 rounded border border-slate-800 space-y-1 text-[11px]">
              <div className="text-white font-bold">Student: Dev Patel (ADM-2026-868)</div>
              <div className="text-slate-400">Class 1 • Fee Item: Tuition Fee Term 1</div>
              <div className="text-emerald-400 font-bold pt-1">Amount Paid: ₹ 15,000 (Mode: Cash/UPI)</div>
            </div>
          </div>
        </div>

        {/* Showcase Item 2: Class Timetable Scheduler */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 lg:order-2 space-y-4">
            <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 px-3 py-1 rounded border border-slate-200">
              Examination Scheduling
            </span>
            <h3 className="text-2xl font-black text-slate-900">Class Teacher Exam Timetable Scheduler</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Empower Class Teachers to schedule examination timetables for their assigned class standard. The smart scheduler automatically advances exam dates (+1 day) from previous subjects and manages holiday schedules seamlessly.
            </p>
            <div className="space-y-2 pt-1 text-xs text-slate-700 font-medium">
              <div className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Smart auto-date calculation (+1 day from previous subject)</div>
              <div className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Automatically accounts for holidays and non-working days</div>
              <div className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Direct timetable visibility on Student & Parent dashboards</div>
            </div>
          </div>

          <div className="lg:col-span-6 lg:order-1 p-4 rounded-xl bg-slate-900 text-white font-mono text-xs space-y-3 shadow-mockup">
            <div className="flex justify-between border-b border-slate-800 pb-2 text-[11px] text-slate-400">
              <span>EXAM TIMETABLE SCHEDULER</span>
              <span className="text-emerald-400 font-bold font-sans">SCHEDULED</span>
            </div>
            <div className="p-3 bg-slate-950 rounded border border-slate-800 space-y-1 text-[11px]">
              <div className="text-slate-300">Math: 17-Oct-2026 (Saturday)</div>
              <div className="text-amber-400 font-bold">18-Oct-2026 (Sunday - Holiday)</div>
              <div className="text-emerald-400 font-bold">Physics: 19-Oct-2026 (Monday - Scheduled)</div>
            </div>
          </div>
        </div>

      </section>

      {/* ------------------------------------------------------------------- */}
      {/* SECTION: BUILT FOR MODERN SCHOOLS (STAKEHOLDERS WITH IMAGES) */}
      {/* ------------------------------------------------------------------- */}
      <section className="bg-slate-50 border-y border-slate-200/80 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 text-center">
          <div className="max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700">Multidisciplinary Support</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 font-['Outfit']">Built For Modern Schools & Stakeholders</h2>
            <p className="text-slate-600 text-sm">
              Role-based access ensures every member of your school community works with maximum efficiency and clarity.
            </p>
          </div>

          {/* Stakeholder Visual Image Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            
            {/* Card 1: School Management & Principals */}
            <div className="rounded-xl bg-white border border-slate-200 shadow-card overflow-hidden flex flex-col justify-between">
              <div className="h-48 overflow-hidden relative">
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80" 
                  alt="School Principal & Director"
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-300" 
                />
                <span className="absolute top-3 left-3 bg-slate-900/90 text-white text-[10px] font-bold px-2.5 py-1 rounded border border-slate-700">
                  School Management & Trustees
                </span>
              </div>
              <div className="p-6 space-y-2 grow">
                <h3 className="text-lg font-bold text-slate-900">Institutional Governance & Analytics</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Gain institution-wide financial visibility, daily counter fee collection summaries, faculty payroll auditing, and strategic academic performance reports.
                </p>
              </div>
            </div>

            {/* Card 2: Teachers & Educators */}
            <div className="rounded-xl bg-white border border-slate-200 shadow-card overflow-hidden flex flex-col justify-between">
              <div className="h-48 overflow-hidden relative">
                <img 
                  src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80" 
                  alt="Senior Faculty & Class Teacher"
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-300" 
                />
                <span className="absolute top-3 left-3 bg-blue-700 text-white text-[10px] font-bold px-2.5 py-1 rounded">
                  Teachers & Educators
                </span>
              </div>
              <div className="p-6 space-y-2 grow">
                <h3 className="text-lg font-bold text-slate-900">Class Timetables & Master Gradebooks</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Class Teachers schedule exam dates with automated date scheduling; Subject teachers fill marks in an all-subject matrix and publish homework effortlessly.
                </p>
              </div>
            </div>

            {/* Card 3: Students & Parents */}
            <div className="rounded-xl bg-white border border-slate-200 shadow-card overflow-hidden flex flex-col justify-between">
              <div className="h-48 overflow-hidden relative">
                <img 
                  src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80" 
                  alt="Students in classroom"
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-300" 
                />
                <span className="absolute top-3 left-3 bg-emerald-700 text-white text-[10px] font-bold px-2.5 py-1 rounded">
                  Students & Parents Portal
                </span>
              </div>
              <div className="p-6 space-y-2 grow">
                <h3 className="text-lg font-bold text-slate-900">Admit Cards & Digital Progress Cards</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Students download printable exam admit cards with roll numbers and track individual term progress reports with strict 1-student privacy protection.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------- */}
      {/* FINAL CALL TO ACTION BANNER */}
      {/* ------------------------------------------------------------------- */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-10 rounded-2xl bg-slate-900 text-white text-center shadow-lg space-y-6">
          <h2 className="text-3xl sm:text-4xl font-black font-['Outfit']">
            See What Your School Can Do With A Better Digital System.
          </h2>
          <p className="text-slate-300 text-sm max-w-xl mx-auto">
            Schedule a personalized walkthrough with our ed-tech engineering team at Devdhara Technologies.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={handleDemoClick}
              className="px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-md transition-all cursor-pointer flex items-center gap-2"
            >
              <span>Request a Demo</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <Link
              to="/about-erp"
              className="px-6 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-lg border border-slate-700"
            >
              Learn More About ERP
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
