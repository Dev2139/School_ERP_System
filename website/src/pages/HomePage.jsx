import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  Quote,
  Printer,
  Shield,
  Layers,
  Zap,
  Lock
} from 'lucide-react';

export default function HomePage({ onOpenTrialModal }) {
  const [activeTab, setActiveTab] = useState('gradebook');
  const navigate = useNavigate();

  const handleStartTrial = () => {
    if (onOpenTrialModal) onOpenTrialModal();
    else navigate('/demo');
  };

  return (
    <div className="space-y-24 pb-20 text-left bg-white">
      
      {/* ------------------------------------------------------------------- */}
      {/* 1. HERO SECTION */}
      {/* ------------------------------------------------------------------- */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-hero-glow bg-hero-grid">
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          
          {/* Top SaaS Pill Badge */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold shadow-2xs">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
              </span>
              <span>Greenwood ERP v2.0 Released</span>
              <span className="text-slate-300 font-normal">|</span>
              <span className="text-slate-600 font-medium">The Modern School Operating System</span>
            </div>
          </div>

          {/* Main Headline */}
          <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] text-slate-900 font-['Outfit']">
              The All-In-One Platform Built For <span className="text-gradient">Modern Schools</span>
            </h1>

            <p className="text-base sm:text-xl text-slate-600 font-normal max-w-2xl mx-auto leading-relaxed">
              Unify fee counter collection, teacher payroll, class timetable scheduling, and all-subject gradebook matrices into one intuitive, secure cloud platform.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button
                onClick={handleStartTrial}
                className="w-full sm:w-auto px-8 py-4 text-sm font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-[1.02] transition-all cursor-pointer flex items-center justify-center gap-2.5"
              >
                <Sparkles className="w-4.5 h-4.5 text-amber-300" />
                <span>Start 14-Day Free Trial</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <Link
                to="/demo"
                className="w-full sm:w-auto px-7 py-4 text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-xl shadow-xs transition-all flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4 text-blue-600 fill-blue-600" />
                <span>Explore Live Interactive Demo</span>
              </Link>
            </div>

            {/* Value Checkmarks */}
            <div className="flex flex-wrap items-center justify-center gap-6 pt-3 text-xs text-slate-500 font-medium">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>No Credit Card Required</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>5-Minute School Setup</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>24/7 Dedicated Support</span>
              </div>
            </div>
          </div>

          {/* Product UI Browser Mockup */}
          <div className="mt-16 max-w-5xl mx-auto rounded-2xl p-2 bg-slate-900/5 border border-slate-200 shadow-saas">
            <div className="bg-white rounded-xl overflow-hidden border border-slate-200 text-left">
              
              {/* Window Bar */}
              <div className="bg-slate-100 px-4 py-3 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                </div>
                <div className="px-3 py-1 rounded-lg bg-white text-[11px] font-mono text-slate-500 border border-slate-200 flex items-center gap-2 shadow-2xs">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>app.greenwooderp.com / Main Operations Portal</span>
                </div>
                <div className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">Enterprise Sandbox</div>
              </div>

              {/* Dashboard Content Simulator */}
              <div className="p-6 space-y-6">
                
                {/* Metric Summary Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                    <div className="text-[11px] font-semibold text-slate-500 uppercase">Enrolled Students</div>
                    <div className="text-2xl font-black text-slate-900 mt-1">1,248</div>
                    <div className="text-[10px] text-emerald-600 font-bold mt-0.5">Classes 1 - 10 Enrolled</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                    <div className="text-[11px] font-semibold text-slate-500 uppercase">Counter Fee Portal</div>
                    <div className="text-2xl font-black text-slate-900 mt-1 font-mono">₹ 14,85,000</div>
                    <div className="text-[10px] text-emerald-600 font-bold mt-0.5">Watermarked PDF Receipts</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                    <div className="text-[11px] font-semibold text-slate-500 uppercase">Teaching Staff</div>
                    <div className="text-2xl font-black text-slate-900 mt-1">42 Faculty</div>
                    <div className="text-[10px] text-blue-600 font-bold mt-0.5">Payroll Disbursed</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                    <div className="text-[11px] font-semibold text-slate-500 uppercase">Exams & Gradebook</div>
                    <div className="text-2xl font-black text-slate-900 mt-1">Term 1 Active</div>
                    <div className="text-[10px] text-amber-600 font-bold mt-0.5">Excel Matrix Ready</div>
                  </div>
                </div>

                {/* Gradebook Matrix Simulation Table */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                      <FileSpreadsheet className="w-4 h-4 text-blue-600" />
                      <span>Class 1 All-Subject Gradebook Matrix</span>
                    </div>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-md font-bold">Auto-Ranked</span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs font-mono">
                      <thead className="bg-slate-200/60 text-slate-600 uppercase text-[10px]">
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
                        <tr className="hover:bg-white">
                          <td className="p-2.5 font-bold text-slate-900">Dev Patel</td>
                          <td className="p-2.5 font-bold text-emerald-700 font-mono">95</td>
                          <td className="p-2.5 font-bold text-emerald-700 font-mono">88</td>
                          <td className="p-2.5 font-bold text-emerald-700 font-mono">92</td>
                          <td className="p-2.5 font-bold text-emerald-700 font-mono">90</td>
                          <td className="p-2.5 font-bold text-emerald-700 font-mono">98</td>
                          <td className="p-2.5 text-right font-bold text-blue-700 font-mono">92.6%</td>
                          <td className="p-2.5 text-center"><span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 border border-emerald-200 rounded text-[10px] font-bold">PASS</span></td>
                        </tr>
                        <tr className="hover:bg-white">
                          <td className="p-2.5 font-bold text-slate-900">Priya Sharma</td>
                          <td className="p-2.5 font-bold text-emerald-700 font-mono">90</td>
                          <td className="p-2.5 font-bold text-emerald-700 font-mono">94</td>
                          <td className="p-2.5 font-bold text-emerald-700 font-mono">89</td>
                          <td className="p-2.5 font-bold text-emerald-700 font-mono">91</td>
                          <td className="p-2.5 font-bold text-emerald-700 font-mono">95</td>
                          <td className="p-2.5 text-right font-bold text-blue-700 font-mono">91.8%</td>
                          <td className="p-2.5 text-center"><span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 border border-emerald-200 rounded text-[10px] font-bold">PASS</span></td>
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
      {/* 2. TRUSTED BY SCHOOLS LOGO CLOUD */}
      {/* ------------------------------------------------------------------- */}
      <section className="border-y border-slate-200/80 bg-slate-50/50 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Trusted By 250+ Leading K-12 Schools & Educational Trusts Across India
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14 opacity-75 grayscale hover:grayscale-0 transition-all text-xs font-bold text-slate-600">
            <span className="flex items-center gap-2"><GraduationCap className="w-5 h-5 text-blue-600" /> Greenwood International</span>
            <span className="flex items-center gap-2"><Shield className="w-5 h-5 text-indigo-600" /> St. Xavier Academy</span>
            <span className="flex items-center gap-2"><Award className="w-5 h-5 text-sky-600" /> Delhi Public School Trust</span>
            <span className="flex items-center gap-2"><BookOpen className="w-5 h-5 text-purple-600" /> Modern Academy</span>
            <span className="flex items-center gap-2"><Users className="w-5 h-5 text-emerald-600" /> Oxford School Network</span>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------- */}
      {/* 3. INTERACTIVE PRODUCT PILLARS SHOWCASE */}
      {/* ------------------------------------------------------------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-blue-600">Integrated Capabilities</div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 font-['Outfit']">
            Engineered For Every School Department
          </h2>
          <p className="text-slate-600 text-sm">
            Discover how Greenwood ERP digitizes academics, fee counter collection, gradebooks, and teacher payroll.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {[
            { id: 'gradebook', title: 'Master Gradebook Matrix', icon: FileSpreadsheet },
            { id: 'fees', title: 'Accountant Fee Counter', icon: CreditCard },
            { id: 'timetable', title: 'Class Timetable & Sunday Skip', icon: Calendar },
            { id: 'payroll', title: 'Faculty Payroll & Salary', icon: Users },
          ].map((tab) => {
            const IconComp = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-3 rounded-xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                <IconComp className="w-4 h-4" />
                <span>{tab.title}</span>
              </button>
            );
          })}
        </div>

        {/* Interactive Feature Canvas */}
        <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-saas space-y-6">
          
          {activeTab === 'gradebook' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 space-y-4">
                <span className="text-[10px] font-bold uppercase px-3 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-full">
                  Exams & Assessment
                </span>
                <h3 className="text-2xl font-black text-slate-900">Unified All-Subject Master Gradebook Matrix</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Say goodbye to entering student marks one subject at a time. Greenwood ERP provides an Excel-style spreadsheet matrix where subject teachers can fill marks for all class subjects side-by-side.
                </p>
                <div className="space-y-2 pt-2 text-xs text-slate-700">
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Side-by-side marks entry for all subjects in 1 click</div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Automatic class rank calculation and pass/fail indicators</div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Digital Printable Hall Tickets & Admit Cards</div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Strict 1-Student = 1-Report Card privacy protection</div>
                </div>
              </div>
              <div className="lg:col-span-6 p-4 rounded-xl bg-slate-900 text-white font-mono text-xs space-y-3 shadow-md">
                <div className="flex justify-between border-b border-slate-800 pb-2 text-[11px] text-slate-400">
                  <span>CLASS 1 MASTER SPREADSHEET</span>
                  <span className="text-emerald-400 font-bold">LIVE MATRIX</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-lg space-y-1 text-[11px]">
                  <div className="text-slate-300 font-bold">Dev Patel (ADM-2026-868)</div>
                  <div className="text-slate-400">Math: 95 | Hindi: 88 | Physics: 92 | Chem: 90 | CS: 98</div>
                  <div className="text-emerald-400 font-bold pt-1">Total: 463/500 (92.6%) • Rank: 1</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'fees' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 space-y-4">
                <span className="text-[10px] font-bold uppercase px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full">
                  Financial Management
                </span>
                <h3 className="text-2xl font-black text-slate-900">Accountant Counter Fee Portal (`account@school.com`)</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  A dedicated Accountant portal created specifically for counter fee management. Search students instantly by admission number, review class fee setups, and issue official PDF fee receipts.
                </p>
                <div className="space-y-2 pt-2 text-xs text-slate-700">
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Dedicated Accountant login credentials (`account@school.com` / `06102006`)</div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Standard-wise class fee setup (Class 1 to Class 10 constant fee)</div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Instant counter student lookup & fee item selection</div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Watermarked official downloadable PDF Fee Receipts</div>
                </div>
              </div>
              <div className="lg:col-span-6 p-4 rounded-xl bg-slate-900 text-white font-mono text-xs space-y-3 shadow-md">
                <div className="flex justify-between border-b border-slate-800 pb-2 text-[11px] text-slate-400">
                  <span>COUNTER FEE VERIFICATION</span>
                  <span className="text-sky-400 font-bold">PDF RECEIPT</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-lg space-y-1 text-[11px]">
                  <div className="text-white font-bold">Receipt No: REC-2026-941</div>
                  <div className="text-slate-400">Student: Dev Patel (Class 1)</div>
                  <div className="text-emerald-400 font-bold pt-1">Amount Paid: ₹ 15,000 (Tuition Fee Term 1)</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'timetable' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 space-y-4">
                <span className="text-[10px] font-bold uppercase px-3 py-1 bg-sky-50 text-sky-700 border border-sky-200 rounded-full">
                  Timetable Automation
                </span>
                <h3 className="text-2xl font-black text-slate-900">Class Teacher Timetable & Automatic Sunday Skip</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Class Teachers can schedule examination timetables for their assigned class standard. The intelligent scheduler automatically advances exam dates (+1 day) and skips Sundays automatically.
                </p>
                <div className="space-y-2 pt-2 text-xs text-slate-700">
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Auto-increments exam date by +1 day from previous subject</div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Automatically detects and skips Sundays during scheduling</div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Class Teachers schedule exam timetables for their class</div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Instant updates on Student & Parent Dashboards</div>
                </div>
              </div>
              <div className="lg:col-span-6 p-4 rounded-xl bg-slate-900 text-white font-mono text-xs space-y-3 shadow-md">
                <div className="flex justify-between border-b border-slate-800 pb-2 text-[11px] text-slate-400">
                  <span>EXAM TIMETABLE SCHEDULER</span>
                  <span className="text-amber-400 font-bold font-sans">SUNDAY SKIPPED</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-lg space-y-1 text-[11px]">
                  <div className="text-slate-300">Math: 17-Oct-2026 (Saturday)</div>
                  <div className="text-amber-400 font-bold">18-Oct-2026 (Sunday - Skipped)</div>
                  <div className="text-emerald-400 font-bold">Physics: 19-Oct-2026 (Monday - Auto Scheduled)</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'payroll' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 space-y-4">
                <span className="text-[10px] font-bold uppercase px-3 py-1 bg-purple-50 text-purple-700 border border-purple-200 rounded-full">
                  HR & Faculty
                </span>
                <h3 className="text-2xl font-black text-slate-900">Faculty Directory & Monthly Salary Disbursements</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Manage teaching staff profiles, assigned subjects, and qualifications. Process monthly teacher salary disbursements with automated audit logs and payment tracking.
                </p>
                <div className="space-y-2 pt-2 text-xs text-slate-700">
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Centralized teaching staff directory with assigned subjects</div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> One-click monthly salary disbursement processing</div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Automated subject-to-teacher synchronization across all classes</div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Full administrative audit trail logging</div>
                </div>
              </div>
              <div className="lg:col-span-6 p-4 rounded-xl bg-slate-900 text-white font-mono text-xs space-y-3 shadow-md">
                <div className="flex justify-between border-b border-slate-800 pb-2 text-[11px] text-slate-400">
                  <span>FACULTY PAYROLL DISBURSEMENT</span>
                  <span className="text-emerald-400 font-bold">PAID</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-lg space-y-1 text-[11px]">
                  <div className="text-white font-bold">Manubhai Parmar (PGT Mathematics)</div>
                  <div className="text-slate-400">Monthly Net Salary: ₹ 45,000</div>
                  <div className="text-emerald-400 font-bold pt-1">Disbursed via Bank Transfer</div>
                </div>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* ------------------------------------------------------------------- */}
      {/* 4. CUSTOMER TESTIMONIALS */}
      {/* ------------------------------------------------------------------- */}
      <section className="bg-slate-50 border-y border-slate-200/80 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          
          <div className="max-w-2xl mx-auto space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-blue-600">Customer Reviews</div>
            <h2 className="text-3xl font-black text-slate-900 font-['Outfit']">Loved By Principals, Accountants & Teachers</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-saas space-y-4">
              <div className="flex text-amber-400 gap-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
              </div>
              <p className="text-xs text-slate-700 italic leading-relaxed">
                "The All-Subject Master Gradebook Matrix and Sunday-skipping timetable scheduler saved our teachers over 40 hours during final examinations."
              </p>
              <div className="pt-3 border-t border-slate-100">
                <div className="text-xs font-bold text-slate-900">Dr. Rajesh K. Mehta</div>
                <div className="text-[11px] text-blue-600 font-semibold">Principal, Greenwood International</div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-saas space-y-4">
              <div className="flex text-amber-400 gap-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
              </div>
              <p className="text-xs text-slate-700 italic leading-relaxed">
                "The Accountant Counter Portal (`account@school.com`) with instant PDF receipts completely eliminated long counter lines on fee week."
              </p>
              <div className="pt-3 border-t border-slate-100">
                <div className="text-xs font-bold text-slate-900">Suresh Verma</div>
                <div className="text-[11px] text-emerald-600 font-semibold">Head Accountant, St. Xavier Academy</div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-saas space-y-4">
              <div className="flex text-amber-400 gap-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
              </div>
              <p className="text-xs text-slate-700 italic leading-relaxed">
                "Parents love being able to download digital Admit Cards and view private report cards directly from their smartphone browsers."
              </p>
              <div className="pt-3 border-t border-slate-100">
                <div className="text-xs font-bold text-slate-900">Pooja Sharma</div>
                <div className="text-[11px] text-sky-600 font-semibold">Senior Teacher & Class Coordinator</div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ------------------------------------------------------------------- */}
      {/* 5. CALL TO ACTION BANNER */}
      {/* ------------------------------------------------------------------- */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-10 rounded-2xl bg-gradient-to-r from-blue-700 via-indigo-700 to-sky-600 text-white text-center shadow-xl space-y-6">
          <h2 className="text-3xl sm:text-4xl font-black font-['Outfit']">
            Ready To Modernize Your School Administration?
          </h2>
          <p className="text-slate-100 text-sm max-w-xl mx-auto">
            Join 250+ K-12 institutions already using Greenwood ERP to simplify fees, exams, timetables, and payroll.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={handleStartTrial}
              className="px-8 py-3.5 bg-white text-blue-700 hover:bg-slate-50 font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Start Free 14-Day Trial</span>
            </button>

            <Link
              to="/contact"
              className="px-6 py-3.5 bg-blue-800/80 hover:bg-blue-800 text-white font-bold text-xs rounded-xl border border-blue-400/40"
            >
              Contact Sales Team
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
