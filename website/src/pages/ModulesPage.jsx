import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FileSpreadsheet,
  Calendar,
  CreditCard,
  Users,
  GraduationCap,
  BookOpen,
  Printer,
  Shield,
  CheckCircle2,
  ArrowRight,
  Layers,
  FileText
} from 'lucide-react';

export default function ModulesPage({ onOpenDemoModal }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const navigate = useNavigate();

  const handleDemoClick = () => {
    if (onOpenDemoModal) onOpenDemoModal();
    else navigate('/contact');
  };

  const categories = [
    { id: 'all', title: 'All Modules' },
    { id: 'admin', title: 'Administration' },
    { id: 'academic', title: 'Academics & Timetable' },
    { id: 'exam', title: 'Examination & Gradebook' },
    { id: 'finance', title: 'Fees & Finance' },
    { id: 'staff', title: 'Teachers & Payroll' },
  ];

  const modules = [
    {
      category: 'admin',
      badge: 'Administration',
      icon: Shield,
      title: 'Class Standard Setup & Auto Room Allocation',
      description: 'Configure academic years, class standards, sections, and room assignments. System automatically allocates unique room numbers (`Room 101`, `Room 103`) to avoid scheduling overlaps.',
      capabilities: [
        'Dynamic section creation with automated room number assignments',
        'Capacity tracking and room allocation during student enrollment',
        'Standard-wise subject associations',
        'Administrative audit trail logging'
      ]
    },
    {
      category: 'exam',
      badge: 'Examination & Gradebook',
      icon: FileSpreadsheet,
      title: 'All-Subject Master Gradebook Matrix',
      description: 'A unified spreadsheet matrix where teachers enter marks across all subjects side-by-side in one view. Automatically calculates percentages, pass/fail status, and overall class ranks.',
      capabilities: [
        'Side-by-side subject marks entry for the entire class standard',
        'Real-time percentage scoring and pass/fail evaluation',
        'Automatic rank calculation upon saving matrix',
        'Strict 1-Student = 1-Report Card privacy protection'
      ]
    },
    {
      category: 'academic',
      badge: 'Timetable & Scheduling',
      icon: Calendar,
      title: 'Class Teacher Exam Timetable Scheduler',
      description: 'Class Teachers schedule examination timetables for their class standard. The smart scheduler auto-increments dates (+1 day) from previous subjects with intelligent calendar management.',
      capabilities: [
        'Auto-increments exam date by +1 day from previous subject',
        'Intelligent calendar management and holiday calculation',
        'Class Teachers hold scheduling permissions for their class standard',
        'Instant updates on Student & Parent Mobile views'
      ]
    },
    {
      category: 'exam',
      badge: 'Admit Cards & Hall Tickets',
      icon: Printer,
      title: 'Digital Printable Admit Cards & Hall Tickets',
      description: 'Printable Admit Cards with student photo, seat numbers, examination timing, and subject schedule for official verification.',
      capabilities: [
        'Automated Hall Ticket / Admit Card generation per exam term',
        'Displays exact seat numbers, timing, and room locations',
        'Print-ready PDF layout for official verification',
        'Student-only access prevents unauthorized viewing'
      ]
    },
    {
      category: 'finance',
      badge: 'Fees & Finance',
      icon: CreditCard,
      title: 'Accountant Counter Portal & Watermarked Receipts',
      description: 'Dedicated Accountant role (`account@school.com`) for counter fee collection. Instant student counter lookup, standard class fee setups, and downloadable watermarked PDF receipts.',
      capabilities: [
        'Dedicated Accountant credentials (`account@school.com` / `06102006`)',
        'Standard-wise constant class fee setups (Class 1 to Class 10)',
        'Counter student lookup by admission number or student name',
        'Supports Cash, UPI, Cheque & Bank Transfer with PDF fee receipts'
      ]
    },
    {
      category: 'staff',
      badge: 'Teachers & Staff Payroll',
      icon: Users,
      title: 'Faculty Directory & Monthly Salary Disbursements',
      description: 'Centralized teaching staff directory with assigned subject badges, qualification sync, and one-click monthly teacher salary disbursement tracking.',
      capabilities: [
        'Faculty directory listing qualifications and assigned class subjects',
        'Automated subject-to-teacher synchronization across all classes',
        'One-click salary disbursement processing for staff profiles',
        'Audit logging for all financial disbursements'
      ]
    },
    {
      category: 'academic',
      badge: 'Homework & Learning',
      icon: BookOpen,
      title: 'Subject-Specific Homework & Online Submissions',
      description: 'Subject teachers issue homework strictly for their taught subjects, with optional online student submission toggles.',
      capabilities: [
        'Subject teacher homework creation permissions',
        'Online student submission toggle controls upload buttons',
        'Student assignment upload and feedback portal',
        'Teacher evaluation and grade comments'
      ]
    }
  ];

  const filteredModules = selectedCategory === 'all' 
    ? modules 
    : modules.filter(m => m.category === selectedCategory);

  return (
    <div className="pt-32 pb-24 space-y-16 text-left bg-white">
      
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-200 px-3.5 py-1 rounded-full">
          Comprehensive Capabilities
        </span>
        <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight font-['Outfit']">
          Features & Modules Page
        </h1>
        <p className="text-slate-600 text-base max-w-2xl mx-auto">
          Explore the organized functional modules designed to power K-12 school administration.
        </p>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === c.id
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              {c.title}
            </button>
          ))}
        </div>
      </section>

      {/* Modules List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredModules.map((m, idx) => {
            const IconComp = m.icon;

            return (
              <div
                key={idx}
                className="p-8 rounded-xl bg-white border border-slate-200 shadow-card shadow-card-hover space-y-5 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 bg-slate-100 text-blue-700 rounded-lg w-fit">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 border border-slate-200 px-3 py-0.5 rounded">
                      {m.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-black text-slate-900 font-['Outfit']">{m.title}</h3>
                    <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">{m.description}</p>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-700">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Key Capabilities</div>
                    {m.capabilities.map((cap, cIdx) => (
                      <div key={cIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={handleDemoClick}
                    className="w-full py-2.5 bg-slate-900 hover:bg-blue-700 text-white font-bold text-xs rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span>Request Demo for {m.badge}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}
