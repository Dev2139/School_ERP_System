import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FileSpreadsheet,
  Calendar,
  CreditCard,
  Users,
  GraduationCap,
  BookOpen,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Printer,
  Award,
  ArrowRight
} from 'lucide-react';

export default function FeaturesPage({ onOpenTrialModal }) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const modules = [
    {
      id: 'matrix',
      category: 'exams',
      icon: FileSpreadsheet,
      badge: 'Master Gradebook',
      title: 'Unified All-Subject Gradebook Matrix',
      description: 'Fill marks for all assigned subjects side-by-side in one spreadsheet grid view for the entire class.',
      points: [
        'Side-by-side subject marks entry for the entire class standard',
        'Real-time total score, percentage calculation, and pass/fail indicators',
        'Automatic class ranking calculation upon saving matrix',
        'Strict 1-Student = 1-Report Card privacy protection'
      ],
      color: 'from-indigo-900/50 to-slate-900'
    },
    {
      id: 'timetable',
      category: 'academics',
      icon: Calendar,
      badge: 'Smart Timetable',
      title: 'Class Teacher Timetable & Sunday Skipping',
      description: 'Class Teachers schedule examination timetables for their assigned class standard with auto date incrementing.',
      points: [
        'Auto-increments exam date by +1 day from previous subject',
        'Automatically skips Sundays during date calculation',
        'Class Teachers have permissions for their class standard',
        'Instant updates on Student & Parent Mobile Views'
      ],
      color: 'from-sky-900/50 to-slate-900'
    },
    {
      id: 'admit-card',
      category: 'exams',
      icon: Printer,
      badge: 'Hall Ticket Portal',
      title: 'Digital Printable Admit Cards & Hall Tickets',
      description: 'Students and parents can view and print official Hall Tickets with seat numbers, photo, and exam schedule.',
      points: [
        'Automated Hall Ticket / Admit Card generation per exam term',
        'Displays exact seat numbers, timing, and room locations',
        'Print-ready PDF layout for official school verification',
        'Student-only access prevents unauthorized viewing'
      ],
      color: 'from-purple-900/50 to-slate-900'
    },
    {
      id: 'fees',
      category: 'finance',
      icon: CreditCard,
      badge: 'Fee Counter',
      title: 'Accountant Counter Portal & PDF Receipts',
      description: 'Dedicated Accountant role (`account@school.com`) for counter fee collection and official PDF receipt generation.',
      points: [
        'Dedicated Accountant Portal credentials (`account@school.com` / `06102006`)',
        'Standard-wise constant class fee configurations (Class 1 to Class 10)',
        'Counter student lookup by admission number or student name',
        'Supports Cash, UPI, Cheque & Bank Transfer with official watermarked PDF receipts'
      ],
      color: 'from-emerald-900/50 to-slate-900'
    },
    {
      id: 'payroll',
      category: 'staff',
      icon: Users,
      badge: 'Faculty Payroll',
      title: 'Faculty Directory & Salary Disbursements',
      description: 'Centralized teaching staff directory with assigned subject badges and monthly payroll disbursement tracking.',
      points: [
        'Faculty directory listing qualifications and assigned class subjects',
        'Automated subject-to-teacher synchronization across all classes',
        'One-click salary disbursement processing for staff profiles',
        'Audit logging for all financial disbursements'
      ],
      color: 'from-amber-900/50 to-slate-900'
    },
    {
      id: 'homework',
      category: 'academics',
      icon: BookOpen,
      badge: 'Homework Portal',
      title: 'Subject-Specific Homework & Online Submissions',
      description: 'Teachers issue homework strictly for their taught subjects, with optional online student submission buttons.',
      points: [
        'Teachers submit homework exclusively for their assigned subjects',
        'Online submission toggle controls whether students see upload buttons',
        'Students view subject-specific assignments on their dashboard',
        'Teacher evaluation and grade feedback portal'
      ],
      color: 'from-rose-900/50 to-slate-900'
    },
    {
      id: 'rooms',
      category: 'academics',
      icon: GraduationCap,
      badge: 'Academic Setup',
      title: 'Class Standard Setup & Auto Room Allocation',
      description: 'Configure academic years, class standards, sections, and dynamic room assignments without conflicts.',
      points: [
        'Dynamic section creation with auto-assigned room numbers (`Room 101`, `Room 103`)',
        'Auto-reflects section room details during student enrollment',
        'Configurable standard-wise subject associations',
        'Full administrative audit trail for academic changes'
      ],
      color: 'from-slate-900 to-slate-950'
    }
  ];

  const filteredModules = selectedCategory === 'all' 
    ? modules 
    : modules.filter(m => m.category === selectedCategory);

  return (
    <div className="pt-32 pb-24 space-y-16">
      
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Full Product Breakdown</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight">
          Comprehensive ERP Modules Built For <span className="text-gradient-primary">K-12 Excellence</span>
        </h1>
        <p className="text-slate-400 text-base max-w-2xl mx-auto">
          Explore every feature of Greenwood ERP designed to digitize academics, examinations, fee counters, and faculty payroll.
        </p>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-6">
          {[
            { id: 'all', label: 'All Modules' },
            { id: 'academics', label: 'Academics & Rooms' },
            { id: 'exams', label: 'Exams & Gradebook' },
            { id: 'finance', label: 'Fees & Counter' },
            { id: 'staff', label: 'Faculty & Payroll' },
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* Modules List Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredModules.map((m) => {
            const IconComp = m.icon;

            return (
              <div
                key={m.id}
                className={`p-8 rounded-2xl bg-gradient-to-br ${m.color} border border-slate-800 hover:border-indigo-500/40 transition-all text-left space-y-6 flex flex-col justify-between`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-3 bg-indigo-500/20 text-indigo-300 rounded-xl border border-indigo-500/30 w-fit">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-900 text-indigo-300 border border-slate-800 px-3 py-1 rounded-full">
                      {m.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-black text-white">{m.title}</h3>
                    <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">{m.description}</p>
                  </div>

                  <div className="space-y-2.5 pt-2 border-t border-slate-800/80">
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Key Capabilities</div>
                    {m.points.map((pt, pIdx) => (
                      <div key={pIdx} className="flex items-start gap-2.5 text-xs text-slate-200">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    onClick={onOpenTrialModal}
                    className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl border border-slate-700 flex items-center justify-center gap-2 cursor-pointer transition-all"
                  >
                    <span>Request Live Demo of {m.badge}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-indigo-400" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Comparison Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <div className="space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-sky-400">Why Switch</div>
          <h2 className="text-3xl font-black text-white">Traditional School ERP vs Greenwood ERP</h2>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900 text-slate-300 font-bold uppercase text-[10px]">
              <tr>
                <th className="p-4">Administrative Capability</th>
                <th className="p-4 text-rose-400">Legacy / Manual ERP</th>
                <th className="p-4 text-emerald-400">Greenwood ERP Platform</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-slate-300">
              <tr>
                <td className="p-4 font-bold text-white">Gradebook Entry</td>
                <td className="p-4 text-slate-400">Single subject isolated entry form</td>
                <td className="p-4 font-semibold text-emerald-300">Side-by-side All-Subject Excel Matrix</td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-white">Exam Timetable</td>
                <td className="p-4 text-slate-400">Manual date calculation & Sunday conflicts</td>
                <td className="p-4 font-semibold text-emerald-300">Auto +1 day increment & Sunday skipping</td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-white">Counter Fee Portal</td>
                <td className="p-4 text-slate-400">General admin login with complex steps</td>
                <td className="p-4 font-semibold text-emerald-300">Dedicated Accountant role (`account@school.com`) & PDF receipt</td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-white">Admit Cards</td>
                <td className="p-4 text-slate-400">Manual paper hall tickets</td>
                <td className="p-4 font-semibold text-emerald-300">Printable Digital Hall Ticket with seat numbers</td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-white">Faculty Payroll</td>
                <td className="p-4 text-slate-400">External spreadsheets</td>
                <td className="p-4 font-semibold text-emerald-300">Integrated teacher directory & salary disbursement</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

    </div>
  );
}
