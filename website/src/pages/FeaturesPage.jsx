import React from 'react';
import { Link } from 'react-router-dom';
import {
  FileSpreadsheet,
  Calendar,
  CreditCard,
  Users,
  GraduationCap,
  BookOpen,
  CheckCircle2,
  Printer,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';

export default function FeaturesPage({ onOpenTrialModal }) {
  const modulesList = [
    {
      set: 'Module Set - I',
      title: 'Basic & Academic Modules',
      subtitle: 'Necessary modules to establish paperless school automation.',
      items: [
        'School Setup & Standard Configuration',
        'Course & Curriculum Management',
        'Student Management with Student Panel',
        'Staff Management with Staff Panel',
        'Mobile & Web App Portals'
      ]
    },
    {
      set: 'Module Set - II',
      title: 'Exam & Gradebook Management',
      subtitle: 'Handles examination timetables, gradebook matrix, and hall tickets.',
      items: [
        'All-Subject Master Gradebook Matrix',
        'Class Teacher Exam Timetable with Sunday Skip',
        'Digital Printable Hall Tickets / Admit Cards',
        'Automatic Class Rank & Percentage Calculation',
        'Strict 1-Student Report Card Privacy'
      ]
    },
    {
      set: 'Module Set - III',
      title: 'Accountant Fee Counter Portal',
      subtitle: 'Handles counter fee collection and official watermarked PDF receipts.',
      items: [
        'Dedicated Accountant Role (`account@school.com`)',
        'Instant Counter Student Lookup & Audit',
        'Standard Class Fee Configurations (Class 1 to 10)',
        'Cash, UPI, Cheque & Bank Transfer Modes',
        'Watermarked Official Downloadable PDF Receipts'
      ]
    },
    {
      set: 'Module Set - IV',
      title: 'Faculty & HR Management',
      subtitle: 'Manages teaching staff profiles and monthly payroll disbursements.',
      items: [
        'Centralized Teaching Staff Directory',
        'Qualification & Subject Teacher Sync',
        'One-Click Monthly Teacher Salary Disbursements',
        'Staff Payroll Audit Logs'
      ]
    },
    {
      set: 'Module Set - V',
      title: 'Homework & Student Portal',
      subtitle: 'Handles subject teacher homework and online student uploads.',
      items: [
        'Subject Teacher Homework Creation Permissions',
        'Online Student Submission Toggle Toggles',
        'Student Assignment Upload & Feedback Portal',
        'Subject Teacher Evaluation & Comments'
      ]
    },
    {
      set: 'Module Set - VI',
      title: 'Accreditation & Communication',
      subtitle: 'Data preparation for school accreditation and notices.',
      items: [
        'Digital Circulars & Notice Board',
        'Parent Portal & Student Mentoring',
        'School Calendar & Event Schedule',
        'Audit Trail & Data Compliance'
      ]
    }
  ];

  return (
    <div className="pt-28 pb-20 space-y-16 text-left">
      
      {/* Header */}
      <section className="bg-gn-hero border-b border-sky-200/80 py-16 text-center">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-sky-700 bg-white px-3 py-1 rounded-full border border-sky-200">
            Complete System Breakdown
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            List of <span className="text-sky-600">Modules</span>
          </h1>
          <p className="text-slate-600 text-sm max-w-2xl mx-auto">
            The <strong className="text-sky-600 font-bold">Skeleton</strong> to manage School with <strong className="text-sky-600 font-bold">Optimum Resources</strong>.
          </p>
        </div>
      </section>

      {/* Grid of 6 Module Set Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {modulesList.map((m, idx) => (
            <div
              key={idx}
              className="p-6 rounded-xl bg-white border border-slate-200 shadow-clean space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-800 text-white px-3 py-1 rounded-md w-fit">
                  {m.set}
                </span>

                <div>
                  <h3 className="text-lg font-bold text-sky-600">{m.title}</h3>
                  <p className="text-xs text-slate-500 mt-1">{m.subtitle}</p>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-700">
                  {m.items.map((item, iIdx) => (
                    <div key={iIdx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={onOpenTrialModal}
                  className="w-full py-2.5 bg-slate-100 hover:bg-sky-50 hover:text-sky-700 text-slate-700 font-bold text-xs rounded-lg border border-slate-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Request Demo of {m.set}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
