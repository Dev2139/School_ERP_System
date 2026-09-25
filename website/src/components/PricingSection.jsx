import React, { useState } from 'react';
import { CheckCircle2, Sparkles, ArrowRight, ShieldCheck, Zap, HelpCircle } from 'lucide-react';

export default function PricingSection({ onOpenTrialModal }) {
  const [isAnnual, setIsAnnual] = useState(true);

  const plans = [
    {
      name: 'Starter Plan',
      desc: 'Ideal for small primary schools and coaching institutes.',
      monthlyPrice: '₹ 3,499',
      annualPrice: '₹ 2,799',
      studentLimit: 'Up to 300 Enrolled Students',
      features: [
        'Full Academic Setup & Section Rooms',
        'Student Directory & Attendance Manager',
        'Class Timetables & Exam Scheduling',
        'Accountant Counter Fee Collection',
        'Basic Gradebook & Report Cards',
        'Standard Email Support',
      ],
      popular: false,
      buttonText: 'Start 14-Day Free Trial',
      buttonStyle: 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700',
    },
    {
      name: 'Growth Pro',
      desc: 'Best for growing K-12 schools wanting complete automation.',
      monthlyPrice: '₹ 8,499',
      annualPrice: '₹ 6,799',
      studentLimit: 'Up to 1,000 Enrolled Students',
      features: [
        'All Starter Features Included',
        'Excel-Style Master Gradebook Matrix',
        'Digital Printable Hall Tickets / Admit Cards',
        'Official Watermarked PDF Fee Receipts',
        'Faculty Payroll & Teacher Salary Disbursements',
        'Subject-Specific Homework & Online Submissions',
        'Prioritized 24/7 Phone & WhatsApp Support',
        'Free Data Migration from Old ERP',
      ],
      popular: true,
      buttonText: 'Start Free Trial (Most Popular)',
      buttonStyle: 'bg-gradient-to-r from-indigo-600 via-indigo-500 to-sky-500 hover:from-indigo-500 hover:to-sky-400 text-white shadow-xl shadow-indigo-600/30',
    },
    {
      name: 'Enterprise School Group',
      desc: 'For large educational trusts and multi-branch school networks.',
      monthlyPrice: '₹ 17,999',
      annualPrice: '₹ 14,399',
      studentLimit: 'Unlimited Students & Branches',
      features: [
        'All Growth Pro Features Included',
        'Multi-Branch Consolidated Dashboard',
        'Custom Domain & White-labeled Portal',
        'Dedicated Cloud Server & Custom API Access',
        'SLA 99.99% Uptime Guarantee',
        'Dedicated On-Site Staff Training',
        '24/7 VIP Account Executive Support',
      ],
      popular: false,
      buttonText: 'Contact Sales / Custom Plan',
      buttonStyle: 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700',
    },
  ];

  return (
    <section id="pricing" className="py-24 bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-bold uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5 text-amber-300" />
            <span>Transparent Pricing</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Simple Plans Built For <br />
            <span className="text-gradient-primary">Every School Size</span>
          </h2>
          <p className="text-slate-400 text-base">
            No hidden setup fees. No per-student extra charges. Upgrade or cancel anytime.
          </p>

          {/* Billing Toggle (Monthly / Annual) */}
          <div className="flex items-center justify-center gap-4 pt-6">
            <span className={`text-xs font-bold ${!isAnnual ? 'text-white' : 'text-slate-400'}`}>Monthly Billing</span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="w-14 h-8 rounded-full bg-slate-800 p-1 border border-slate-700 transition-colors relative cursor-pointer"
            >
              <div
                className={`w-6 h-6 rounded-full bg-indigo-500 transition-transform ${
                  isAnnual ? 'translate-x-6 bg-sky-400' : 'translate-x-0'
                }`}
              />
            </button>
            <div className="flex items-center gap-1.5">
              <span className={`text-xs font-bold ${isAnnual ? 'text-white' : 'text-slate-400'}`}>Annual Billing</span>
              <span className="text-[10px] font-black uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                Save 20%
              </span>
            </div>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((p, idx) => (
            <div
              key={idx}
              className={`rounded-3xl p-8 flex flex-col justify-between text-left relative transition-all ${
                p.popular
                  ? 'bg-slate-900 border-2 border-indigo-500 shadow-2xl shadow-indigo-950/80 scale-105 z-10'
                  : 'bg-slate-900/40 border border-slate-800/80 hover:border-slate-700'
              }`}
            >
              {p.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-sky-400 text-slate-950 font-black text-[11px] uppercase tracking-wider shadow-md">
                  ★ Most Popular Choice
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-black text-white">{p.name}</h3>
                  <p className="text-xs text-slate-400 mt-1">{p.desc}</p>
                </div>

                <div className="border-y border-slate-800/80 py-4">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black text-white font-['Outfit']">
                      {isAnnual ? p.annualPrice : p.monthlyPrice}
                    </span>
                    <span className="text-xs text-slate-400 font-semibold">/ month</span>
                  </div>
                  <div className="text-xs text-indigo-400 font-bold mt-1.5 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{p.studentLimit}</span>
                  </div>
                </div>

                {/* Features Checklist */}
                <div className="space-y-3">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Included Features</div>
                  {p.features.map((f, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8">
                <button
                  onClick={onOpenTrialModal}
                  className={`w-full py-4 text-xs font-black uppercase tracking-wider rounded-2xl cursor-pointer transition-all flex items-center justify-center gap-2 ${p.buttonStyle}`}
                >
                  <span>{p.buttonText}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Enterprise Parent Company Guarantee Banner */}
        <div className="mt-16 p-6 rounded-3xl bg-slate-900/60 border border-slate-800 text-center max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left space-y-1">
            <div className="text-sm font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-sky-400" />
              <span>Backed by Devdhara Technology</span>
            </div>
            <p className="text-xs text-slate-400">All plans include free migration assistance, SSL security, and daily automated cloud backups.</p>
          </div>
          <a
            href="https://devdhar.in"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-sky-400 font-mono text-xs font-bold rounded-xl border border-slate-700 shrink-0"
          >
            devdhar.in →
          </a>
        </div>

      </div>
    </section>
  );
}
