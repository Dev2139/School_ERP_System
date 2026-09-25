import React, { useState } from 'react';
import { Shield, CreditCard, User, GraduationCap, CheckCircle2, Play, Download, Printer, Award, FileText, Lock } from 'lucide-react';

export default function InteractiveDemo({ onOpenTrialModal }) {
  const [activeRole, setActiveRole] = useState('admin');

  const roles = [
    { id: 'admin', title: 'Principal / Admin Portal', icon: Shield, badge: 'Full School Control' },
    { id: 'accountant', title: 'Accountant Counter Portal', icon: CreditCard, badge: 'Fee & Salary Manager' },
    { id: 'teacher', title: 'Teacher & Class Faculty Portal', icon: User, badge: 'Timetables & Gradebook' },
    { id: 'student', title: 'Student & Parent Portal', icon: GraduationCap, badge: 'Admit Card & Results' },
  ];

  return (
    <section id="demo" className="py-24 bg-slate-900/40 relative border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <div className="max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-300 text-xs font-bold uppercase tracking-wider">
            <Play className="w-3.5 h-3.5 fill-sky-300" />
            <span>Interactive Live Product Simulator</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Experience Greenwood ERP <br />
            <span className="text-gradient-primary">Across Every Role</span>
          </h2>
          <p className="text-slate-400 text-base">
            Switch between user roles below to see how Administrators, Accountants, Teachers, and Students interact with Greenwood ERP in real time.
          </p>
        </div>

        {/* Role Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          {roles.map((r) => {
            const IconComp = r.icon;
            const isActive = activeRole === r.id;

            return (
              <button
                key={r.id}
                onClick={() => setActiveRole(r.id)}
                className={`px-5 py-3 rounded-2xl font-bold text-xs flex items-center gap-2.5 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-600 to-sky-600 text-white shadow-xl shadow-indigo-600/30 ring-2 ring-indigo-400/50 scale-105'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800 hover:bg-slate-800'
                }`}
              >
                <IconComp className="w-4 h-4" />
                <span>{r.title}</span>
              </button>
            );
          })}
        </div>

        {/* Role Preview Canvas */}
        <div className="max-w-5xl mx-auto rounded-3xl bg-slate-950 border border-slate-800 p-6 shadow-2xl text-left">
          
          {/* Admin Role Preview */}
          {activeRole === 'admin' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-indigo-500/20 text-indigo-300 rounded-xl border border-indigo-500/30">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-white">Principal Dashboard & Academic Setup</h3>
                    <p className="text-xs text-slate-400">Control Class Standards, Section Rooms, Staff Directory, and Audit Logs.</p>
                  </div>
                </div>
                <span className="text-xs bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-3 py-1 rounded-full font-bold">Admin Privileges</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                  <div className="text-xs text-slate-400 font-bold">Total Enrolled Students</div>
                  <div className="text-2xl font-black text-white mt-1">1,248</div>
                  <div className="text-[10px] text-emerald-400 font-bold mt-1">Classes 1 - 10 Configured</div>
                </div>
                <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                  <div className="text-xs text-slate-400 font-bold">Section Room Setup</div>
                  <div className="text-2xl font-black text-white mt-1">Auto-Allocated</div>
                  <div className="text-[10px] text-sky-400 font-bold mt-1">Room 101, 103, 105 Sync</div>
                </div>
                <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                  <div className="text-xs text-slate-400 font-bold">Active Staff Accounts</div>
                  <div className="text-2xl font-black text-white mt-1">42 Faculty</div>
                  <div className="text-[10px] text-purple-400 font-bold mt-1">All Subjects Assigned</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-300">Need custom roles or multi-branch management? Greenwood supports unlimited branches.</span>
                <button onClick={onOpenTrialModal} className="px-4 py-2 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-500">
                  Start Admin Demo
                </button>
              </div>
            </div>
          )}

          {/* Accountant Role Preview */}
          {activeRole === 'accountant' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-emerald-500/20 text-emerald-300 rounded-xl border border-emerald-500/30">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-white">Accountant Counter Portal (`account@school.com`)</h3>
                    <p className="text-xs text-slate-400">Search student accounts, view standard class fees, process payments & print official PDF receipts.</p>
                  </div>
                </div>
                <span className="text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-full font-bold">Counter Mode</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between text-slate-300">
                  <span>COUNTER LOOKUP: ADM-2026-868 (Dev Patel - Class 1)</span>
                  <span className="text-emerald-400 font-bold">FEES VERIFIED</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <div>
                    <span className="text-slate-500 text-[10px]">Fee Item</span>
                    <div className="text-white font-bold">Tuition Fee Term 1</div>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px]">Standard Amount</span>
                    <div className="text-white font-bold">₹ 15,000</div>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px]">Payment Mode</span>
                    <div className="text-sky-400 font-bold">UPI / Cash</div>
                  </div>
                  <div className="text-right">
                    <button onClick={onOpenTrialModal} className="px-3 py-1 bg-emerald-600 text-white font-bold rounded hover:bg-emerald-500 text-[10px]">
                      Generate Official PDF Receipt
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Teacher Role Preview */}
          {activeRole === 'teacher' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-sky-500/20 text-sky-300 rounded-xl border border-sky-500/30">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-white">Faculty Portal - Exam Scheduling & Gradebook</h3>
                    <p className="text-xs text-slate-400">Class teachers schedule exam timetables with Sunday skipping; Subject teachers fill marks in Excel matrix.</p>
                  </div>
                </div>
                <span className="text-xs bg-sky-500/20 text-sky-300 border border-sky-500/30 px-3 py-1 rounded-full font-bold">Faculty Portal</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                  <div className="text-xs font-bold text-sky-300">📅 Class Exam Timetable Scheduler</div>
                  <p className="text-xs text-slate-400">Auto-increments dates (+1 day) and skips Sundays automatically for Class 1 timetable.</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                  <div className="text-xs font-bold text-indigo-300">📊 Excel-Style Master Gradebook</div>
                  <p className="text-xs text-slate-400">Enter marks for Mathematics, Hindi, Physics, Chemistry, Computer Science side-by-side.</p>
                </div>
              </div>
            </div>
          )}

          {/* Student Role Preview */}
          {activeRole === 'student' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-purple-500/20 text-purple-300 rounded-xl border border-purple-500/30">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-white">Student Self-Service & Digital Hall Ticket</h3>
                    <p className="text-xs text-slate-400">Students view personalized exam timetables, print digital Hall Tickets / Admit Cards, and check private report cards.</p>
                  </div>
                </div>
                <span className="text-xs bg-purple-500/20 text-purple-300 border border-purple-500/30 px-3 py-1 rounded-full font-bold">Student Portal</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white">Digital Admit Card / Hall Ticket</div>
                  <div className="text-[10px] text-slate-400">Term 1 Examination - Seat No: STU-10294</div>
                </div>
                <button onClick={onOpenTrialModal} className="px-3.5 py-1.5 bg-indigo-600 text-white font-bold text-xs rounded-xl flex items-center gap-1.5">
                  <Printer className="w-3.5 h-3.5" /> Print Admit Card
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
