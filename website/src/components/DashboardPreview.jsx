import React, { useState } from 'react';
import {
  Users,
  CheckCircle2,
  CreditCard,
  GraduationCap,
  Calendar,
  FileSpreadsheet,
  TrendingUp,
  Clock,
  ShieldCheck,
  Building2,
  BookOpen,
  Bus,
  Search,
  Bell,
  ChevronRight,
  Filter,
  Download,
  Plus
} from 'lucide-react';

export default function DashboardPreview({ showFloatingBadges = true }) {
  const [activeView, setActiveView] = useState('overview');

  return (
    <div className="relative">
      
      {/* Optional Floating Badges around Dashboard Container */}
      {showFloatingBadges && (
        <>
          <div className="hidden lg:flex absolute -top-5 -left-6 z-20 items-center gap-2.5 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-slate-200/90 shadow-xl shadow-slate-900/10 text-xs font-bold text-slate-800 animate-bounce-slow">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-black">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-mono">Today's Attendance</div>
              <div className="text-emerald-600 font-extrabold text-sm">98.4% Verified</div>
            </div>
          </div>

          <div className="hidden lg:flex absolute -bottom-5 -right-6 z-20 items-center gap-2.5 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-slate-200/90 shadow-xl shadow-slate-900/10 text-xs font-bold text-slate-800">
            <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-black">
              <CreditCard className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-mono">Term 1 Fees Collected</div>
              <div className="text-blue-700 font-extrabold text-sm">₹ 12.8L Cleared</div>
            </div>
          </div>

          <div className="hidden md:flex absolute top-1/2 -right-8 -translate-y-1/2 z-20 items-center gap-2.5 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl border border-slate-200/90 shadow-lg text-xs font-bold text-slate-800">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
            <span className="text-[11px] text-slate-700">142 New Admissions</span>
          </div>
        </>
      )}

      {/* Main SaaS Dashboard Visual Mockup Frame */}
      <div className="rounded-2xl bg-slate-900 p-2 sm:p-3 shadow-2xl border border-slate-800 text-left font-['Plus_Jakarta_Sans'] overflow-hidden">
        
        {/* Browser / Application Top Bar */}
        <div className="bg-slate-900 text-white px-4 py-2.5 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-rose-500" />
              <div className="w-3 h-3 rounded-full bg-amber-500" />
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
            </div>
            <div className="bg-slate-950 px-3 py-1 rounded-lg border border-slate-800 font-mono text-[11px] text-slate-400 flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>scholargrid.app / greenwood-academy</span>
            </div>
          </div>

          {/* Interactive Screen Switcher Tabs */}
          <div className="flex items-center gap-1 text-[11px] bg-slate-950 p-1 rounded-xl border border-slate-800 font-semibold">
            <button
              onClick={() => setActiveView('overview')}
              className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                activeView === 'overview' ? 'bg-blue-600 text-white font-bold shadow-xs' : 'text-slate-400 hover:text-white'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveView('gradebook')}
              className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                activeView === 'gradebook' ? 'bg-blue-600 text-white font-bold shadow-xs' : 'text-slate-400 hover:text-white'
              }`}
            >
              Gradebook Matrix
            </button>
            <button
              onClick={() => setActiveView('fees')}
              className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                activeView === 'fees' ? 'bg-blue-600 text-white font-bold shadow-xs' : 'text-slate-400 hover:text-white'
              }`}
            >
              Counter Fees
            </button>
            <button
              onClick={() => setActiveView('admissions')}
              className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                activeView === 'admissions' ? 'bg-blue-600 text-white font-bold shadow-xs' : 'text-slate-400 hover:text-white'
              }`}
            >
              Admissions
            </button>
          </div>
        </div>

        {/* Dashboard Workspace */}
        <div className="bg-slate-50 text-slate-900 rounded-xl overflow-hidden flex flex-col md:flex-row min-h-[440px]">
          
          {/* Mini Left Sidebar */}
          <div className="w-full md:w-56 bg-slate-900 text-slate-300 p-4 border-r border-slate-800 space-y-4 text-xs shrink-0 hidden md:block">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
              <img
                src="https://res.cloudinary.com/urzka7oz/image/upload/v1790514834/ChatGPT_Image_Sep_27_2026_06_42_50_PM.png"
                alt="ScholarGrid ERP Logo"
                className="h-7 w-auto object-contain brightness-110"
              />
            </div>

            <div className="space-y-1">
              <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider px-2">Core Modules</div>
              <div className={`px-3 py-2 rounded-lg font-medium flex items-center gap-2.5 cursor-pointer ${activeView === 'overview' ? 'bg-blue-600/20 text-blue-400 font-bold border border-blue-500/30' : 'hover:bg-slate-800'}`}>
                <TrendingUp className="w-4 h-4 text-blue-400" />
                <span>Dashboard</span>
              </div>
              <div className="px-3 py-2 rounded-lg font-medium flex items-center gap-2.5 hover:bg-slate-800 text-slate-400 cursor-pointer">
                <Users className="w-4 h-4 text-slate-400" />
                <span>Student Directory</span>
              </div>
              <div className="px-3 py-2 rounded-lg font-medium flex items-center gap-2.5 hover:bg-slate-800 text-slate-400 cursor-pointer">
                <CheckCircle2 className="w-4 h-4 text-slate-400" />
                <span>Attendance Roster</span>
              </div>
              <div className={`px-3 py-2 rounded-lg font-medium flex items-center gap-2.5 cursor-pointer ${activeView === 'gradebook' ? 'bg-blue-600/20 text-blue-400 font-bold border border-blue-500/30' : 'hover:bg-slate-800 text-slate-400'}`}>
                <FileSpreadsheet className="w-4 h-4 text-slate-400" />
                <span>Gradebook Matrix</span>
              </div>
              <div className={`px-3 py-2 rounded-lg font-medium flex items-center gap-2.5 cursor-pointer ${activeView === 'fees' ? 'bg-blue-600/20 text-blue-400 font-bold border border-blue-500/30' : 'hover:bg-slate-800 text-slate-400'}`}>
                <CreditCard className="w-4 h-4 text-slate-400" />
                <span>Fees & Payments</span>
              </div>
              <div className={`px-3 py-2 rounded-lg font-medium flex items-center gap-2.5 cursor-pointer ${activeView === 'admissions' ? 'bg-blue-600/20 text-blue-400 font-bold border border-blue-500/30' : 'hover:bg-slate-800 text-slate-400'}`}>
                <GraduationCap className="w-4 h-4 text-slate-400" />
                <span>Admissions Pipeline</span>
              </div>
              <div className="px-3 py-2 rounded-lg font-medium flex items-center gap-2.5 hover:bg-slate-800 text-slate-400 cursor-pointer">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span>Timetable & Schedule</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 space-y-1">
              <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider px-2">Institution</div>
              <div className="px-3 py-1.5 rounded-lg text-[11px] text-slate-400 flex items-center justify-between">
                <span>Campus ID</span>
                <span className="font-mono text-white">SCH-802</span>
              </div>
              <div className="px-3 py-1.5 rounded-lg text-[11px] text-slate-400 flex items-center justify-between">
                <span>Active Term</span>
                <span className="text-emerald-400 font-bold">2026-2027</span>
              </div>
            </div>
          </div>

          {/* Main Content Screen Canvas */}
          <div className="grow p-4 sm:p-6 space-y-5 bg-slate-50 overflow-y-auto">
            
            {/* Top Workspace Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
              <div>
                <h3 className="text-lg font-black text-slate-900 leading-tight">
                  {activeView === 'overview' && 'School Dashboard & Analytics'}
                  {activeView === 'gradebook' && 'All-Subject Gradebook Matrix'}
                  {activeView === 'fees' && 'Fee Collection & Counter Receipting'}
                  {activeView === 'admissions' && 'Admissions & Enrollment Pipeline'}
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  ScholarGrid Operating System • Greenwood Public School (Central Campus)
                </p>
              </div>

              <div className="flex items-center gap-2">
                <div className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700 flex items-center gap-1.5 shadow-2xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span>Live System</span>
                </div>
                <button className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold shadow-xs flex items-center gap-1 cursor-pointer">
                  <Plus className="w-3.5 h-3.5" />
                  <span>New Entry</span>
                </button>
              </div>
            </div>

            {/* TAB 1: OVERVIEW */}
            {activeView === 'overview' && (
              <div className="space-y-5 animate-fadeIn">
                {/* 4 Metric Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
                  <div className="p-3.5 bg-white border border-slate-200 rounded-xl shadow-xs space-y-1">
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Total Enrolled</div>
                    <div className="text-xl font-black text-slate-900 font-mono">1,248</div>
                    <div className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                      <span>↑ +142 this term</span>
                    </div>
                  </div>

                  <div className="p-3.5 bg-white border border-slate-200 rounded-xl shadow-xs space-y-1">
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Today's Attendance</div>
                    <div className="text-xl font-black text-emerald-600 font-mono">98.4%</div>
                    <div className="text-[10px] text-slate-500 font-medium">1,228 Present / 20 Absent</div>
                  </div>

                  <div className="p-3.5 bg-white border border-slate-200 rounded-xl shadow-xs space-y-1">
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Fee Collection</div>
                    <div className="text-xl font-black text-blue-700 font-mono">₹ 12,85,000</div>
                    <div className="text-[10px] text-blue-600 font-bold">89% Target Met</div>
                  </div>

                  <div className="p-3.5 bg-white border border-slate-200 rounded-xl shadow-xs space-y-1">
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Academic Score</div>
                    <div className="text-xl font-black text-indigo-700 font-mono">4.8 / 5.0</div>
                    <div className="text-[10px] text-indigo-600 font-bold">Term 1 Evaluation</div>
                  </div>
                </div>

                {/* Main Middle Row: Performance Graph & Recent Activities */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                  {/* Chart Representation */}
                  <div className="lg:col-span-7 bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">Attendance & Collection Trends</div>
                      <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">Weekly View</span>
                    </div>

                    {/* Visual Bar Graph */}
                    <div className="h-40 flex items-end justify-between gap-2 pt-4 px-2">
                      {[
                        { day: 'Mon', att: 96, fee: 75 },
                        { day: 'Tue', att: 98, fee: 88 },
                        { day: 'Wed', att: 97, fee: 62 },
                        { day: 'Thu', att: 99, fee: 95 },
                        { day: 'Fri', att: 98, fee: 82 },
                        { day: 'Sat', att: 95, fee: 40 },
                      ].map((bar, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                          <div className="w-full flex items-end justify-center gap-1 h-32">
                            <div className="w-3.5 bg-blue-600 rounded-t-sm transition-all" style={{ height: `${bar.att}%` }}></div>
                            <div className="w-3.5 bg-emerald-500 rounded-t-sm transition-all" style={{ height: `${bar.fee}%` }}></div>
                          </div>
                          <span className="text-[10px] font-bold text-slate-500 font-mono">{bar.day}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-center gap-6 text-[11px] font-semibold text-slate-600 border-t border-slate-100 pt-2">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                        <span>Student Attendance %</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                        <span>Fee Collection Index</span>
                      </div>
                    </div>
                  </div>

                  {/* Activity & Notifications */}
                  <div className="lg:col-span-5 bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
                    <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">Live System Activity</div>
                    
                    <div className="space-y-2.5 text-xs">
                      <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80 flex items-start gap-2.5">
                        <div className="p-1.5 bg-emerald-100 text-emerald-700 rounded-md shrink-0">
                          <CreditCard className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <div className="font-bold text-slate-800 text-[11px]">Fee Receipt #REC-2026-904</div>
                          <div className="text-[10px] text-slate-500">₹ 15,000 received for Dev Patel (Class 1-A)</div>
                        </div>
                      </div>

                      <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80 flex items-start gap-2.5">
                        <div className="p-1.5 bg-blue-100 text-blue-700 rounded-md shrink-0">
                          <FileSpreadsheet className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <div className="font-bold text-slate-800 text-[11px]">Term 1 Gradebook Updated</div>
                          <div className="text-[10px] text-slate-500">Class 10 Physics marks entered by Prof. Sharma</div>
                        </div>
                      </div>

                      <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80 flex items-start gap-2.5">
                        <div className="p-1.5 bg-amber-100 text-amber-700 rounded-md shrink-0">
                          <Bell className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <div className="font-bold text-slate-800 text-[11px]">School Broadcast Sent</div>
                          <div className="text-[10px] text-slate-500">Holiday notice dispatched to 1,248 parent app devices</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: GRADEBOOK MATRIX */}
            {activeView === 'gradebook' && (
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                    <FileSpreadsheet className="w-4 h-4 text-blue-600" />
                    <span>Class 10-A • Term 1 Master Marks Matrix</span>
                  </div>
                  <button className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[10px] rounded-lg border border-slate-300 flex items-center gap-1">
                    <Download className="w-3 h-3" /> Export Excel
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-100 text-slate-700 border-b border-slate-200 text-[11px]">
                        <th className="p-2 font-bold">Roll No</th>
                        <th className="p-2 font-bold">Student Name</th>
                        <th className="p-2 font-bold text-center">Maths (100)</th>
                        <th className="p-2 font-bold text-center">Physics (100)</th>
                        <th className="p-2 font-bold text-center">Chemistry (100)</th>
                        <th className="p-2 font-bold text-center">English (100)</th>
                        <th className="p-2 font-bold text-center">Total</th>
                        <th className="p-2 font-bold text-center">Grade</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
                      {[
                        { roll: '101', name: 'Aarav Sharma', m: 95, p: 92, c: 88, e: 90, tot: 365, g: 'A+' },
                        { roll: '102', name: 'Ananya Verma', m: 88, p: 94, c: 91, e: 93, tot: 366, g: 'A+' },
                        { roll: '103', name: 'Dev Patel', m: 82, p: 85, c: 79, e: 84, tot: 330, g: 'A' },
                        { roll: '104', name: 'Isha Gupta', m: 98, p: 96, c: 99, e: 94, tot: 387, g: 'O' },
                      ].map((st) => (
                        <tr key={st.roll} className="hover:bg-blue-50/50">
                          <td className="p-2 font-bold text-slate-600">{st.roll}</td>
                          <td className="p-2 font-semibold font-sans text-slate-800">{st.name}</td>
                          <td className="p-2 text-center text-slate-800">{st.m}</td>
                          <td className="p-2 text-center text-slate-800">{st.p}</td>
                          <td className="p-2 text-center text-slate-800">{st.c}</td>
                          <td className="p-2 text-center text-slate-800">{st.e}</td>
                          <td className="p-2 text-center font-bold text-blue-700">{st.tot} / 400</td>
                          <td className="p-2 text-center">
                            <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px] font-sans">
                              {st.g}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 3: COUNTER FEES */}
            {activeView === 'fees' && (
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-emerald-600" />
                    <span>Counter Cashiering & Instant PDF Receipt</span>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                    Active Counter Slot #01
                  </span>
                </div>

                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase">Student Reg Number</span>
                    <div className="font-bold font-mono text-slate-900 mt-0.5">ADM-2026-868</div>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase">Student Name</span>
                    <div className="font-bold text-slate-900 mt-0.5">Rohan Kapoor (Class 4-B)</div>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase">Quarter Fee Due</span>
                    <div className="font-black font-mono text-blue-700 mt-0.5">₹ 14,500.00</div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-slate-600 font-medium">Payment Mode: <strong className="text-slate-900">UPI / Cash Counter</strong></span>
                  <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-xs flex items-center gap-1.5 shadow-xs cursor-pointer">
                    <Download className="w-3.5 h-3.5" /> Generate PDF Receipt
                  </button>
                </div>
              </div>
            )}

            {/* TAB 4: ADMISSIONS */}
            {activeView === 'admissions' && (
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3 animate-fadeIn">
                <div className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-indigo-600" />
                  <span>2026-27 Enrollment Funnel Status</span>
                </div>

                <div className="grid grid-cols-5 gap-2 text-center text-xs pt-2">
                  {[
                    { stage: 'Enquiry', count: 320, color: 'bg-slate-100 text-slate-700 border-slate-200' },
                    { stage: 'Applied', count: 210, color: 'bg-blue-50 text-blue-800 border-blue-200' },
                    { stage: 'Under Review', count: 85, color: 'bg-amber-50 text-amber-800 border-amber-200' },
                    { stage: 'Approved', count: 142, color: 'bg-purple-50 text-purple-800 border-purple-200' },
                    { stage: 'Admitted', count: 128, color: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
                  ].map((s, i) => (
                    <div key={i} className={`p-2.5 rounded-lg border ${s.color} space-y-1`}>
                      <div className="text-[10px] font-bold uppercase">{s.stage}</div>
                      <div className="text-lg font-black font-mono">{s.count}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}
