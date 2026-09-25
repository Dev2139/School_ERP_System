import React, { useState } from 'react';
import {
  GraduationCap,
  Calendar,
  Award,
  CreditCard,
  Users,
  BookOpen,
  CheckCircle2,
  FileSpreadsheet,
  Printer,
  Sparkles,
  Lock,
  ArrowRight
} from 'lucide-react';

export default function FeaturesGrid({ onOpenTrialModal }) {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      id: 'gradebook',
      icon: FileSpreadsheet,
      badge: 'All-Subject Matrix',
      title: 'Unified Excel-Style Gradebook Matrix & Hall Tickets',
      description: 'Fill student marks across all subjects in a single side-by-side spreadsheet grid. Automatically recalculate class ranks, pass/fail statuses, and generate official PDF report cards.',
      highlights: [
        'Side-by-side subject marks entry for the entire class in 1 click',
        'Automatic rank calculation & percentage scoring',
        'Digital Printable Hall Tickets / Admit Cards for Students',
        'Strict 1-Student = 1-Report Card privacy policy'
      ],
      previewColor: 'from-indigo-900/60 to-slate-900',
    },
    {
      id: 'exam-scheduling',
      icon: Calendar,
      badge: 'Smart Exam Timetable',
      title: 'Class Teacher Exam Timetable Scheduler',
      description: 'Empower Class Teachers to schedule examination timetables for their class. The smart scheduler automatically increments dates (+1 day) from previous subjects.',
      highlights: [
        'Auto-increments exam date by +1 day from previous subject',
        'Intelligent calendar management and holiday calculation',
        'Class Teachers schedule exam timetable for their class standard',
        'Instant timetable visibility on Student & Parent Dashboards'
      ],
      previewColor: 'from-sky-900/60 to-slate-900',
    },
    {
      id: 'fees',
      icon: CreditCard,
      badge: 'Accountant Counter Portal',
      title: 'Counter Fee Collection & Official PDF Receipts',
      description: 'Dedicated Accountant role (`account@school.com`) for counter fee collection. Search students instantly, view pending standard fees, process Cash/UPI payments, and issue official PDF receipts.',
      highlights: [
        'Dedicated Accountant Portal & Counter Student Lookup',
        'Standard-wise constant class fee configuration (Class 1 - Class 10)',
        'Supports Cash, UPI, Cheque, & Bank Transfer payments',
        'Official downloadable PDF Fee Receipts with watermark'
      ],
      previewColor: 'from-emerald-900/60 to-slate-900',
    },
    {
      id: 'payroll',
      icon: Users,
      badge: 'Faculty Directory & Salary',
      title: 'Teaching Staff Directory & One-Click Salary Disbursements',
      description: 'Manage teaching staff profiles, assigned subjects, and qualifications. Process monthly teacher salaries with automated record keeping and payroll history.',
      highlights: [
        'Centralized Faculty Directory with assigned subject badges',
        'One-click salary disbursement and payment status tracking',
        'Automated subject-to-teacher synchronization across all classes',
        'Role-based access controls for Accountants and Admins'
      ],
      previewColor: 'from-purple-900/60 to-slate-900',
    },
    {
      id: 'academics',
      icon: GraduationCap,
      badge: 'Academic Setup',
      title: 'Class Standard Setup & Auto Room Allocation',
      description: 'Configure academic years, class standards, sections, and room assignments. Automatically allocates unique room numbers and handles section capacities seamlessly.',
      highlights: [
        'Dynamic Section creation with auto-assigned room numbers',
        'Reflects section rooms during student admission & enrollment',
        'Configurable standard-wise subject associations',
        'Audit trail logging for all academic modifications'
      ],
      previewColor: 'from-amber-900/60 to-slate-900',
    },
    {
      id: 'homework',
      icon: BookOpen,
      badge: 'Homework Portal',
      title: 'Subject-Specific Homework & Online Submissions',
      description: 'Teachers issue homework strictly for their assigned subjects. Optional online submission toggles give teachers control over online vs offline submission.',
      highlights: [
        'Teachers submit HW exclusively for their taught subjects',
        'Online submission toggle controls student upload buttons',
        'Students view subject-specific assignments and submit online',
        'Teacher evaluation and grade feedback portal'
      ],
      previewColor: 'from-rose-900/60 to-slate-900',
    }
  ];

  return (
    <section id="features" className="py-24 bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Powerful ERP Modules</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Everything Your School Needs <br />
            <span className="text-gradient-primary">In One Integrated Platform</span>
          </h2>
          <p className="text-slate-400 text-base">
            Designed specifically for modern K-12 school workflows. Eliminate manual paperwork, simplify fees, and automate examination gradebooks.
          </p>
        </div>

        {/* Feature Interactive Tabs & Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Navigation Feature Cards (Left) */}
          <div className="lg:col-span-5 space-y-3">
            {features.map((item, idx) => {
              const IconComp = item.icon;
              const isActive = activeFeature === idx;

              return (
                <div
                  key={item.id}
                  onClick={() => setActiveFeature(idx)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer text-left flex items-start gap-4 ${
                    isActive
                      ? 'bg-slate-900/90 border-indigo-500/60 shadow-xl shadow-indigo-950/60 ring-1 ring-indigo-500/30'
                      : 'bg-slate-900/30 border-slate-800/80 hover:bg-slate-900/60 hover:border-slate-700'
                  }`}
                >
                  <div className={`p-3 rounded-xl ${isActive ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-800 text-slate-400'}`}>
                    <IconComp className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className={`text-sm font-bold ${isActive ? 'text-white' : 'text-slate-300'}`}>{item.title}</h3>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${isActive ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' : 'bg-slate-800 text-slate-500'}`}>
                        {item.badge}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active Feature Detail Showcase Card (Right) */}
          <div className="lg:col-span-7 sticky top-28">
            <div className={`p-8 rounded-3xl bg-gradient-to-br ${features[activeFeature].previewColor} border border-slate-700/80 shadow-2xl space-y-6 text-left`}>
              
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-indigo-500/20 rounded-2xl border border-indigo-500/30 text-indigo-300">
                    {React.createElement(features[activeFeature].icon, { className: 'w-6 h-6' })}
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-400">Greenwood Module</span>
                    <h3 className="text-xl font-black text-white">{features[activeFeature].title}</h3>
                  </div>
                </div>

                <button
                  onClick={onOpenTrialModal}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Try Feature</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <p className="text-slate-300 text-sm leading-relaxed">
                {features[activeFeature].description}
              </p>

              {/* Highlights Bullet List */}
              <div className="space-y-3 pt-2">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Key Capabilities</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {features[activeFeature].highlights.map((hl, i) => (
                    <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Feature Interactive Showcase Note */}
              <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-indigo-200">
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Integrated with Devdhara Cloud Engine</span>
                </div>
                <a href="#demo" className="text-sky-400 font-bold hover:underline flex items-center gap-1">
                  View Live Demo →
                </a>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
