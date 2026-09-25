import React, { useState } from 'react';
import { Shield, CreditCard, User, GraduationCap, Sparkles, CheckCircle2, Key, Play, ArrowRight, Building, Mail, Phone } from 'lucide-react';

export default function DemoPage() {
  const [activeRole, setActiveRole] = useState('accountant');
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    schoolName: '',
    adminName: '',
    email: '',
    phone: '',
    studentCount: '300-1000',
  });

  const roles = [
    {
      id: 'admin',
      title: 'Principal / Admin Portal',
      icon: Shield,
      badge: 'Full School Control',
      summary: 'Manage academic setup, classes, sections, auto-assigned room numbers, staff accounts, and system audit logs.',
      demoAccess: 'Demo Login: admin@greenwooderp.com / Password: Admin@123'
    },
    {
      id: 'accountant',
      title: 'Accountant Counter Portal',
      icon: CreditCard,
      badge: 'Counter Fees & Payroll',
      summary: 'Dedicated Accountant role for counter fee collection, student lookup, standard-wise class fee setups, and official PDF receipts.',
      demoAccess: 'Accountant Credentials: account@school.com / Password: 06102006'
    },
    {
      id: 'teacher',
      title: 'Faculty Portal',
      icon: User,
      badge: 'Timetables & Gradebook',
      summary: 'Class teachers schedule exam timetables; Subject teachers fill marks in unified Excel-style matrix.',
      demoAccess: 'Teacher Login: manu@gmail.com / Password: User@123'
    },
    {
      id: 'student',
      title: 'Student & Parent Portal',
      icon: GraduationCap,
      badge: 'Hall Ticket & Results',
      summary: 'Print digital Admit Cards / Hall Tickets with seat numbers, check class timetables, and download personal report cards.',
      demoAccess: 'Student Login: dd@gmail.com / Password: User@123'
    }
  ];

  const handleRegisterTrial = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="pt-32 pb-24 space-y-16">
      
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Interactive Live Product Showcase</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight">
          Experience Greenwood ERP <span className="text-gradient-primary">Live In Action</span>
        </h1>
        <p className="text-slate-400 text-base max-w-2xl mx-auto">
          Test drive user roles or request a dedicated 14-day free cloud trial for your school below.
        </p>
      </section>

      {/* Role Interactive Simulator Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Role Switchers */}
          <div className="lg:col-span-5 space-y-3 text-left">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Select User Role To Preview</div>
            {roles.map((r) => {
              const IconComp = r.icon;
              const isActive = activeRole === r.id;

              return (
                <div
                  key={r.id}
                  onClick={() => setActiveRole(r.id)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer flex items-start gap-4 ${
                    isActive
                      ? 'bg-slate-900 border-indigo-500/80 shadow-xl ring-1 ring-indigo-500/30'
                      : 'bg-slate-900/40 border-slate-800 hover:bg-slate-900/70'
                  }`}
                >
                  <div className={`p-3 rounded-xl ${isActive ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'}`}>
                    <IconComp className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className={`text-sm font-bold ${isActive ? 'text-white' : 'text-slate-300'}`}>{r.title}</h3>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase bg-slate-800 text-indigo-300">
                        {r.badge}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2">{r.summary}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Role Preview Canvas */}
          <div className="lg:col-span-7">
            {roles.map((r) => {
              if (r.id !== activeRole) return null;
              const IconComp = r.icon;

              return (
                <div key={r.id} className="p-8 rounded-2xl bg-slate-900/90 border border-slate-800 text-left space-y-6 shadow-2xl">
                  
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-indigo-500/20 text-indigo-300 rounded-xl border border-indigo-500/30">
                        <IconComp className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-indigo-400">Greenwood Role Preview</span>
                        <h3 className="text-xl font-black text-white">{r.title}</h3>
                      </div>
                    </div>
                    <span className="text-xs bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-3 py-1 rounded-full font-bold">
                      {r.badge}
                    </span>
                  </div>

                  <p className="text-slate-300 text-sm leading-relaxed">
                    {r.summary}
                  </p>

                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 font-mono text-xs">
                    <div className="flex items-center gap-2 text-emerald-400 font-bold">
                      <Key className="w-4 h-4" />
                      <span>{r.demoAccess}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 font-sans">
                      Test credentials pre-configured in our live Greenwood ERP demo sandbox environment.
                    </p>
                  </div>

                  <div className="pt-2">
                    <a
                      href="#request-trial"
                      className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                    >
                      <span>Request Dedicated {r.title} Trial</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Trial Request Form Section */}
      <section id="request-trial" className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-sky-400">Instant Onboarding</div>
          <h2 className="text-3xl font-black text-white">Create Your 14-Day Free School Trial</h2>
          <p className="text-xs text-slate-400">No credit card required. Instant 5-minute workspace creation.</p>
        </div>

        <div className="p-8 rounded-2xl bg-slate-900/80 border border-slate-800 text-left shadow-2xl">
          {!submitted ? (
            <form onSubmit={handleRegisterTrial} className="space-y-4">
              
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">School / Institution Name *</label>
                <div className="relative">
                  <Building className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Greenwood International School"
                    value={formData.schoolName}
                    onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs font-semibold text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Administrator Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Principal / Trustee"
                    value={formData.adminName}
                    onChange={(e) => setFormData({ ...formData, adminName: e.target.value })}
                    className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs font-semibold text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Work Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="admin@school.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs font-semibold text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Phone / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 9876543210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs font-semibold text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Enrolled Students</label>
                  <select
                    value={formData.studentCount}
                    onChange={(e) => setFormData({ ...formData, studentCount: e.target.value })}
                    className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs font-semibold text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="<300">Under 300 Students</option>
                    <option value="300-1000">300 - 1,000 Students</option>
                    <option value="1000+">1,000+ Students</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-indigo-600 to-sky-500 hover:from-indigo-500 hover:to-sky-400 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Activate Free School Workspace</span>
              </button>

            </form>
          ) : (
            <div className="py-8 text-center space-y-4">
              <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 rounded-2xl border border-emerald-500/30 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-black text-white">Trial Workspace Activated!</h3>
              <p className="text-xs text-slate-300 max-w-sm mx-auto">
                Thank you, <strong>{formData.adminName}</strong>! Your Greenwood ERP workspace for <strong>{formData.schoolName}</strong> has been configured.
              </p>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-400 font-bold">
                Accountant Credentials: account@school.com / 06102006
              </div>
            </div>
          )}
        </div>
      </section>

    </div>
  );
}
