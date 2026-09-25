import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  GraduationCap,
  CheckCircle2,
  BookOpen,
  Award,
  CreditCard,
  Calendar,
  Users,
  FileText,
  ShieldCheck,
  RefreshCw,
  Infinity as InfinityIcon,
  Sparkles,
  ArrowRight,
  Layers,
  FileSpreadsheet
} from 'lucide-react';

export default function HomePage({ onOpenTrialModal }) {
  const navigate = useNavigate();

  const handleDemoClick = () => {
    if (onOpenTrialModal) onOpenTrialModal();
    else navigate('/demo');
  };

  return (
    <div className="space-y-16 pb-12">
      
      {/* ------------------------------------------------------------------- */}
      {/* 1. HERO BANNER SECTION (MATCHING SCREENSHOT 1) */}
      {/* ------------------------------------------------------------------- */}
      <section className="bg-gn-hero pt-32 pb-20 border-b border-sky-200/80 relative overflow-hidden text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Title, Subtitle, Badges */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="space-y-2">
                <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                  School & Institution <br />
                  Management Software <span className="text-sky-600 font-extrabold">(GREENWOOD ERP)</span>
                </h1>
                
                <p className="text-base sm:text-xl text-slate-700 font-semibold">
                  <strong className="text-slate-900 font-bold">Paperless Solution</strong> for K-12 Schools, CBSE/ICSE Institutes, Autonomous Schools.
                </p>
              </div>

              {/* Tag Badges (NEP-2020, Digi-Locker, Admit-Card, etc.) */}
              <div className="flex flex-wrap items-center gap-2.5 pt-2">
                {[
                  'NEP-2020',
                  'Digi-Locker',
                  'Admit-Card',
                  'Master-Gradebook',
                  'Fee-Counter',
                  'CBSE-Affiliated',
                  'Official-PDF-Receipts',
                  'Sunday-Skip-Timetable',
                  'Faculty-Payroll'
                ].map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3.5 py-1.5 rounded-lg bg-sky-200/80 text-sky-900 border border-sky-300 text-xs font-bold shadow-2xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* CTAs */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button
                  onClick={handleDemoClick}
                  className="px-7 py-3.5 bg-slate-700 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-md transition-all cursor-pointer flex items-center gap-2"
                >
                  <span>Request Live Demo</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <Link
                  to="/features"
                  className="px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs border border-slate-300 rounded-lg shadow-2xs transition-all flex items-center gap-2"
                >
                  <span>View All Modules</span>
                </Link>
              </div>

            </div>

            {/* Right Column: Graphic Circle Logo Showcase Badge */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-gradient-to-tr from-sky-300/40 via-blue-200/50 to-indigo-300/40 p-6 flex items-center justify-center border-4 border-white/60 shadow-xl">
                <div className="w-full h-full rounded-full bg-sky-400/20 p-6 flex items-center justify-center border-2 border-sky-300/50">
                  <div className="w-full h-full rounded-full bg-white shadow-2xl flex flex-col items-center justify-center border-4 border-sky-500/30 p-4 text-center group hover:scale-105 transition-transform">
                    
                    {/* Circle Brand Symbol */}
                    <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-tr from-sky-500 via-sky-400 to-indigo-600 flex items-center justify-center p-1 shadow-lg">
                      <div className="w-full h-full bg-white rounded-full flex flex-col items-center justify-center">
                        <GraduationCap className="w-12 h-12 text-sky-600" />
                        <span className="text-xs font-black text-sky-700 font-['Outfit'] mt-1">GW</span>
                      </div>
                    </div>

                    <div className="mt-3">
                      <div className="text-base font-black text-slate-800 uppercase tracking-tight font-['Outfit']">GREENWOOD</div>
                      <div className="text-[11px] font-bold text-sky-600 uppercase">Enterprise Edition 2026</div>
                    </div>

                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------- */}
      {/* 2. ABOUT GREENWOOD ERP SECTION (MATCHING SCREENSHOT 2) */}
      {/* ------------------------------------------------------------------- */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 pt-4">
        <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
          About <span className="text-sky-600">GREENWOOD ERP</span>
        </h2>
        <p className="text-slate-600 text-sm leading-relaxed max-w-4xl mx-auto">
          Greenwood ERP is a full-stack solution for School Automation which covers all aspects of K-12 Schools & Colleges. It integrates all the processes and rules of councils. It helps the school to build, manage, and extend its digital campus. It helps stakeholders, institutes & systems to interact easily across the campus environment which provides a personalized educational experience. The main thing is it helps the school to become system-oriented instead of person-oriented by making automates a bunch of tasks and follow-ups of work by System.
        </p>
      </section>

      {/* ------------------------------------------------------------------- */}
      {/* 3. WHY GREENWOOD ERP? VS UNLIMITED SERVICES (MATCHING SCREENSHOT 2) */}
      {/* ------------------------------------------------------------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          
          {/* Left Column: Why Greenwood ERP? */}
          <div className="p-8 rounded-xl bg-sky-50/80 border border-sky-200/80 space-y-6 shadow-2xs">
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
              <GraduationCap className="w-6 h-6 text-sky-600" />
              <span>Why <span className="text-sky-600">GREENWOOD ERP</span> ?</span>
            </h3>

            <div className="space-y-5">
              
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white rounded-lg border border-sky-200 text-sky-600 shrink-0 shadow-2xs">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Domain Knowledge Expert</h4>
                  <p className="text-xs text-slate-600 mt-0.5">Greenwood ERP is developed by a team of academicians and school administration experts.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-white rounded-lg border border-sky-200 text-sky-600 shrink-0 shadow-2xs">
                  <RefreshCw className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Periodically Technology Upgradation</h4>
                  <p className="text-xs text-slate-600 mt-0.5">Upgradation of latest technologies every year for optimal security and speed.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-white rounded-lg border border-sky-200 text-sky-600 shrink-0 shadow-2xs">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Product led by Partners</h4>
                  <p className="text-xs text-slate-600 mt-0.5">Led, nurtured, monitored, and supported by core engineering team at Devdhara Technologies.</p>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Unlimited Services */}
          <div className="p-8 rounded-xl bg-white border border-slate-200 space-y-6 shadow-clean">
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
              <InfinityIcon className="w-6 h-6 text-sky-500" />
              <span><span className="text-sky-500">Unlimited</span> Services</span>
            </h3>

            <div className="space-y-5">
              
              <div className="flex items-start gap-4">
                <div className="p-3 bg-sky-50 rounded-lg border border-sky-100 text-sky-500 shrink-0">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Unlimited Changes</h4>
                  <p className="text-xs text-slate-600 mt-0.5">Unlimited changes in existing modules to match evolving board guidelines.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-sky-50 rounded-lg border border-sky-100 text-sky-500 shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Unlimited Development</h4>
                  <p className="text-xs text-slate-600 mt-0.5">Unlimited development of new custom school modules based on institutional requirements.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-sky-50 rounded-lg border border-sky-100 text-sky-500 shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Unlimited Training</h4>
                  <p className="text-xs text-slate-600 mt-0.5">Unlimited training to school staff, teachers, accountants, and administrators.</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ------------------------------------------------------------------- */}
      {/* 4. LIST OF MODULES SECTION (MATCHING SCREENSHOT 3) */}
      {/* ------------------------------------------------------------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pt-4">
        
        <div className="text-center space-y-2">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            List of <span className="text-sky-600">Modules</span>
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm font-medium">
            The <span className="text-sky-600 font-bold">Skeleton</span> to manage School with <span className="text-sky-600 font-bold">Optimum Resources</span>
          </p>
        </div>

        {/* 6 Module Set Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          
          {/* Module Set I */}
          <div className="p-6 rounded-xl bg-white border border-slate-200/90 shadow-clean shadow-clean-hover relative flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-800 text-white px-3 py-1 rounded-md">
                Module Set - I
              </span>
              <div>
                <h3 className="text-lg font-bold text-sky-600">Basic & Academic Modules</h3>
                <p className="text-xs text-slate-500 mt-1">These are basic modules necessary to run Greenwood ERP.</p>
              </div>

              <div className="space-y-2 pt-2 text-xs text-slate-700">
                <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> School Setup & Standard Configuration</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Course & Curriculum Management</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Student Management with Student Panel</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Staff Management with Staff Panel</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Web Portals for Student & Staff</div>
              </div>
            </div>
          </div>

          {/* Module Set II */}
          <div className="p-6 rounded-xl bg-white border border-slate-200/90 shadow-clean shadow-clean-hover relative flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-800 text-white px-3 py-1 rounded-md">
                Module Set - II
              </span>
              <div>
                <h3 className="text-lg font-bold text-sky-600">Exam & Gradebook Management</h3>
                <p className="text-xs text-slate-500 mt-1">These modules deal with examination and gradebook matrix.</p>
              </div>

              <div className="space-y-2 pt-2 text-xs text-slate-700">
                <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> All-Subject Master Gradebook Matrix</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Class Teacher Timetable & Sunday Skip</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Digital Printable Hall Tickets / Admit Cards</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Automatic Class Rank & Percentage Scoring</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Strict 1-Student Report Card Privacy</div>
              </div>
            </div>
          </div>

          {/* Module Set III */}
          <div className="p-6 rounded-xl bg-white border border-slate-200/90 shadow-clean shadow-clean-hover relative flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-800 text-white px-3 py-1 rounded-md">
                Module Set - III
              </span>
              <div>
                <h3 className="text-lg font-bold text-sky-600">Accountant Fee Counter Portal</h3>
                <p className="text-xs text-slate-500 mt-1">Deals with counter fee collection and official receipts.</p>
              </div>

              <div className="space-y-2 pt-2 text-xs text-slate-700">
                <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Dedicated Accountant Role (`account@school.com`)</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Instant Counter Student Lookup & Fee Audit</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Standard Class Fee Setups (Class 1 to 10)</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Cash, UPI, Cheque & Bank Payment Modes</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Watermarked Downloadable PDF Fee Receipts</div>
              </div>
            </div>
          </div>

          {/* Module Set IV */}
          <div className="p-6 rounded-xl bg-white border border-slate-200/90 shadow-clean shadow-clean-hover relative flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-800 text-white px-3 py-1 rounded-md">
                Module Set - IV
              </span>
              <div>
                <h3 className="text-lg font-bold text-sky-600">Faculty & Payroll Management</h3>
                <p className="text-xs text-slate-500 mt-1">Manages staff directory and monthly salary disbursements.</p>
              </div>

              <div className="space-y-2 pt-2 text-xs text-slate-700">
                <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Centralized Teaching Staff Directory</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Qualification & Assigned Subject Sync</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> One-Click Monthly Salary Disbursements</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Staff Payroll History & Audit Logs</div>
              </div>
            </div>
          </div>

          {/* Module Set V */}
          <div className="p-6 rounded-xl bg-white border border-slate-200/90 shadow-clean shadow-clean-hover relative flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-800 text-white px-3 py-1 rounded-md">
                Module Set - V
              </span>
              <div>
                <h3 className="text-lg font-bold text-sky-600">Homework & Submissions</h3>
                <p className="text-xs text-slate-500 mt-1">Deals with subject-specific homework and online uploads.</p>
              </div>

              <div className="space-y-2 pt-2 text-xs text-slate-700">
                <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Subject Teacher HW Submission Controls</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Online Submission Toggle for Students</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Student Assignment Upload Portal</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Teacher Evaluation & Feedback</div>
              </div>
            </div>
          </div>

          {/* Module Set VI */}
          <div className="p-6 rounded-xl bg-white border border-slate-200/90 shadow-clean shadow-clean-hover relative flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-800 text-white px-3 py-1 rounded-md">
                Module Set - VI
              </span>
              <div>
                <h3 className="text-lg font-bold text-sky-600">Accreditation & Communication</h3>
                <p className="text-xs text-slate-500 mt-1">Data preparation for school accreditation and notices.</p>
              </div>

              <div className="space-y-2 pt-2 text-xs text-slate-700">
                <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Digital Circulars & Notice Board</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Parent Portal & Student Mentoring</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> School Calendar & Event Schedule</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Audit Logging & Data Compliance</div>
              </div>
            </div>
          </div>

        </div>

      </section>

      {/* ------------------------------------------------------------------- */}
      {/* 5. REQUEST DEMO CTA BANNER */}
      {/* ------------------------------------------------------------------- */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="p-8 sm:p-10 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl text-left">
          <div className="space-y-1">
            <h3 className="text-2xl font-black">Ready To Digitally Transform Your School?</h3>
            <p className="text-xs text-slate-300">Request a live demo or start a 14-day free trial for your institution today.</p>
          </div>

          <button
            onClick={handleDemoClick}
            className="px-6 py-3 bg-[#00aeef] hover:bg-[#0092c8] text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-md transition-all shrink-0 cursor-pointer"
          >
            Request Demo
          </button>
        </div>
      </section>

    </div>
  );
}
