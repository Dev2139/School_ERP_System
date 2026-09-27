import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Users,
  CheckCircle2,
  FileSpreadsheet,
  Award,
  CreditCard,
  GraduationCap,
  Calendar,
  Sparkles,
  BookOpen,
  Bus,
  ArrowRight,
  Printer,
  Download,
  Check,
  Search,
  Filter,
  ShieldCheck,
  TrendingUp,
  Clock
} from 'lucide-react';

export default function FeaturesPage({ onOpenDemoModal }) {
  const navigate = useNavigate();
  const [activeFeatureTab, setActiveFeatureTab] = useState('student');

  const handleDemoClick = () => {
    if (onOpenDemoModal) onOpenDemoModal();
    else navigate('/demo');
  };

  const featureTabs = [
    { id: 'student', title: 'Student Management', icon: Users },
    { id: 'attendance', title: 'Attendance Roster', icon: CheckCircle2 },
    { id: 'academics', title: 'Academics & Gradebook', icon: FileSpreadsheet },
    { id: 'examinations', title: 'Examinations & Hall Tickets', icon: Award },
    { id: 'fees', title: 'Fees & Counter Portal', icon: CreditCard },
    { id: 'admissions', title: 'Admissions Pipeline', icon: GraduationCap },
    { id: 'timetable', title: 'Timetable & Scheduler', icon: Calendar },
    { id: 'communication', title: 'Notices & Broadcast', icon: Sparkles },
    { id: 'library', title: 'Library Circulation', icon: BookOpen },
    { id: 'transport', title: 'Transport & Routes', icon: Bus },
  ];

  return (
    <div className="space-y-16 pb-20 text-left bg-white font-['Plus_Jakarta_Sans']">
      
      {/* Header */}
      <section className="pt-28 pb-16 bg-gradient-to-b from-blue-50/60 via-slate-50 to-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 bg-blue-100/80 px-3.5 py-1.5 rounded-full border border-blue-200">
            Comprehensive Feature Showcase
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Built for Precision. Designed for <br />
            <span className="text-gradient-blue">Modern School Operations.</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto font-medium leading-relaxed">
            Explore realistic UI mockups and operational workflows for every module in ScholarGrid ERP.
          </p>

          {/* Feature Selector Tabs */}
          <div className="flex flex-wrap justify-center gap-2 pt-4">
            {featureTabs.map((tab) => {
              const IconComp = tab.icon;
              const isActive = activeFeatureTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveFeatureTab(tab.id)}
                  className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <IconComp className="w-4 h-4" />
                  <span>{tab.title}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Feature Canvas Area */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 text-white shadow-2xl space-y-6">
          
          {/* 1. Student Management UI */}
          {activeFeatureTab === 'student' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <h2 className="text-xl font-black text-white flex items-center gap-2">
                    <Users className="w-5 h-5 text-blue-400" />
                    <span>Student Profile & Document Vault</span>
                  </h2>
                  <p className="text-xs text-slate-400">Complete 360° view of student academic records, parents, and admission documents.</p>
                </div>
                <span className="text-xs font-bold text-emerald-400 bg-emerald-500/20 border border-emerald-500/30 px-3 py-1 rounded-full">
                  Status: Active Student
                </span>
              </div>

              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2 border-r border-slate-800 pr-4">
                  <div className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center font-black text-lg">
                    AP
                  </div>
                  <div className="font-bold text-white text-base">Aarav Sharma</div>
                  <div className="text-xs text-slate-400 font-mono">Admission No: ADM-2026-104</div>
                  <div className="text-xs text-blue-400 font-semibold">Class 10 - Section A (Roll #01)</div>
                </div>

                <div className="space-y-2 text-xs border-r border-slate-800 pr-4">
                  <div className="text-[10px] font-bold text-slate-500 uppercase">Parent Details</div>
                  <div className="text-slate-200">Father: <strong className="text-white">Rajesh Sharma</strong></div>
                  <div className="text-slate-200">Mother: <strong className="text-white">Sunita Sharma</strong></div>
                  <div className="text-slate-200 font-mono">Phone: +91 9876543210</div>
                  <div className="text-slate-200 font-mono">Address: Satellite, Ahmedabad</div>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="text-[10px] font-bold text-slate-500 uppercase">Academic Summary</div>
                  <div className="flex justify-between text-slate-300">
                    <span>Attendance Rate:</span>
                    <strong className="text-emerald-400 font-mono">98.5%</strong>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Term 1 Score:</span>
                    <strong className="text-blue-400 font-mono">92.4% (Grade A+)</strong>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Fee Balance:</span>
                    <strong className="text-emerald-400 font-mono">₹ 0 (Cleared)</strong>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 2. Attendance UI */}
          {activeFeatureTab === 'attendance' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <h2 className="text-xl font-black text-white flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <span>Daily Morning Attendance Roster</span>
                  </h2>
                  <p className="text-xs text-slate-400">Class 10-A Attendance for Today (27 Sep 2026).</p>
                </div>
                <button className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl">
                  Save & Dispatch Parent SMS
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-7 bg-slate-950 p-4 rounded-2xl border border-slate-800 overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead>
                      <tr className="text-slate-400 border-b border-slate-800 text-[11px]">
                        <th className="p-2">Roll</th>
                        <th className="p-2">Student Name</th>
                        <th className="p-2">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/80">
                      {[
                        { roll: '01', name: 'Aarav Sharma', status: 'PRESENT', color: 'text-emerald-400 bg-emerald-500/20' },
                        { roll: '02', name: 'Ananya Verma', status: 'PRESENT', color: 'text-emerald-400 bg-emerald-500/20' },
                        { roll: '03', name: 'Dev Patel', status: 'ABSENT', color: 'text-rose-400 bg-rose-500/20' },
                        { roll: '04', name: 'Isha Gupta', status: 'PRESENT', color: 'text-emerald-400 bg-emerald-500/20' },
                      ].map((row) => (
                        <tr key={row.roll}>
                          <td className="p-2 text-slate-400">{row.roll}</td>
                          <td className="p-2 text-white font-bold font-sans">{row.name}</td>
                          <td className="p-2">
                            <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${row.color}`}>
                              {row.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="md:col-span-5 rounded-2xl overflow-hidden border border-slate-800">
                  <img src="/images/classroom_technology.jpg" alt="Connected Classroom" className="w-full h-48 object-cover" />
                </div>
              </div>
            </div>
          )}

          {/* 3. Fees UI */}
          {activeFeatureTab === 'fees' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <h2 className="text-xl font-black text-white flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-emerald-400" />
                    <span>Counter Cashiering & Fee Portal</span>
                  </h2>
                  <p className="text-xs text-slate-400">Process student fees, generate instant official PDF receipts.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-5 rounded-2xl overflow-hidden border border-slate-800">
                  <img src="/images/fee_counter_desk.jpg" alt="Fee Counter Desk" className="w-full h-52 object-cover" />
                </div>

                <div className="md:col-span-7 bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3 font-mono text-xs">
                  <div className="text-slate-300 font-sans font-bold text-sm">Active Counter #01 • Cashier Logged In</div>
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                    <div className="flex justify-between text-slate-400">
                      <span>Student Reg:</span>
                      <strong className="text-white">ADM-2026-868</strong>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Name:</span>
                      <strong className="text-white font-sans">Rohan Kapoor (Class 4-B)</strong>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Term Fee Due:</span>
                      <strong className="text-emerald-400 text-sm">₹ 14,500.00</strong>
                    </div>
                  </div>
                  <button className="w-full py-2 bg-emerald-600 text-white font-bold text-xs rounded-lg hover:bg-emerald-500 font-sans cursor-pointer">
                    Generate Official PDF Receipt
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 4. Academics UI */}
          {activeFeatureTab === 'academics' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <h2 className="text-xl font-black text-white flex items-center gap-2">
                    <FileSpreadsheet className="w-5 h-5 text-indigo-400" />
                    <span>All-Subject Master Gradebook Matrix</span>
                  </h2>
                  <p className="text-xs text-slate-400">Enter and compute subject marks side-by-side with total formulas.</p>
                </div>
                <button className="px-3 py-1 bg-indigo-600 text-white text-xs font-bold rounded-lg flex items-center gap-1">
                  <Download className="w-3.5 h-3.5" /> Export Excel
                </button>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 overflow-x-auto text-xs font-mono">
                <div className="flex items-center justify-between text-slate-300 pb-2 border-b border-slate-800 font-sans">
                  <span>Class: <strong>10-A</strong></span>
                  <span>Exam: <strong>Term 1 Final Examination</strong></span>
                </div>
                <table className="w-full text-left pt-2">
                  <thead>
                    <tr className="text-slate-400 border-b border-slate-800">
                      <th className="p-2">Student</th>
                      <th className="p-2 text-center">Mathematics</th>
                      <th className="p-2 text-center">Physics</th>
                      <th className="p-2 text-center">Chemistry</th>
                      <th className="p-2 text-center">Percentage</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    <tr>
                      <td className="p-2 text-white font-bold font-sans">Aarav Sharma</td>
                      <td className="p-2 text-center text-emerald-400 font-bold">95</td>
                      <td className="p-2 text-center text-emerald-400 font-bold">92</td>
                      <td className="p-2 text-center text-emerald-400 font-bold">88</td>
                      <td className="p-2 text-center text-blue-400 font-extrabold">91.6%</td>
                    </tr>
                    <tr>
                      <td className="p-2 text-white font-bold font-sans">Ananya Verma</td>
                      <td className="p-2 text-center text-emerald-400 font-bold">88</td>
                      <td className="p-2 text-center text-emerald-400 font-bold">94</td>
                      <td className="p-2 text-center text-emerald-400 font-bold">91</td>
                      <td className="p-2 text-center text-blue-400 font-extrabold">91.0%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Fallback for other tabs */}
          {!['student', 'attendance', 'academics', 'fees'].includes(activeFeatureTab) && (
            <div className="py-8 text-center space-y-4">
              <div className="rounded-2xl overflow-hidden max-w-lg mx-auto border border-slate-800">
                <img src="/images/principal_dashboard_user.jpg" alt="ScholarGrid System Feature" className="w-full h-56 object-cover" />
              </div>
              <h3 className="text-lg font-bold text-white">Detailed {featureTabs.find(t => t.id === activeFeatureTab)?.title} Module</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
                This module includes complete real-time database sync, role access controls, exportable PDF reports, and automated mobile alerts.
              </p>
            </div>
          )}

        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8">
        <div className="p-10 rounded-3xl bg-blue-600 text-white space-y-4 shadow-xl">
          <h2 className="text-3xl font-extrabold">Experience All Features Live</h2>
          <p className="text-xs sm:text-sm text-blue-100 max-w-xl mx-auto font-medium">
            Book a 1-on-1 demonstration to see how these feature workflows operate for your school's exact structure.
          </p>
          <button
            onClick={handleDemoClick}
            className="px-8 py-3.5 bg-white text-slate-900 font-bold text-xs rounded-xl shadow-md cursor-pointer hover:bg-slate-100 transition-all"
          >
            Book a Demo
          </button>
        </div>
      </section>

    </div>
  );
}
