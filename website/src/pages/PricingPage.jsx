import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  HelpCircle,
  ChevronDown
} from 'lucide-react';

export default function PricingPage({ onOpenTrialModal }) {
  const [isAnnual, setIsAnnual] = useState(true);
  const [openFaq, setOpenFaq] = useState(null);

  const plans = [
    {
      name: 'Starter Plan',
      desc: 'Ideal for small primary schools and coaching academies.',
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
      buttonStyle: 'bg-slate-900 hover:bg-slate-800 text-white border border-slate-700',
    },
    {
      name: 'Growth Pro',
      desc: 'Best for growing K-12 schools wanting complete digital automation.',
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
        'Free Data Migration from Legacy ERP',
      ],
      popular: true,
      buttonText: 'Start Free Trial (Most Popular)',
      buttonStyle: 'bg-gradient-to-r from-indigo-600 via-indigo-500 to-sky-500 hover:from-indigo-500 hover:to-sky-400 text-white shadow-xl shadow-indigo-600/25',
    },
    {
      name: 'Enterprise Trust',
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
      buttonText: 'Contact Sales / Custom Quote',
      buttonStyle: 'bg-slate-900 hover:bg-slate-800 text-white border border-slate-700',
    },
  ];

  const faqs = [
    {
      q: 'How long does it take to set up Greenwood ERP for our school?',
      a: 'Initial school setup takes less than 5 minutes. Our onboarding team at Devdhara Technologies helps import your existing student rosters, teacher credentials, and fee structures free of charge.'
    },
    {
      q: 'Is our student and financial fee data secure on Greenwood ERP?',
      a: 'Yes. Greenwood ERP utilizes bank-grade SSL encryption, role-based access control, and automated daily cloud backups to ensure your data is 100% secure.'
    },
    {
      q: 'Can Class Teachers schedule exam timetables with Sunday skipping?',
      a: 'Yes! Class Teachers assigned to a class standard can schedule exam timetables for their class. The smart scheduler automatically advances +1 day and skips Sundays.'
    },
    {
      q: 'How does the Accountant Counter Fee Portal work?',
      a: 'Your accountant logs in using dedicated accountant credentials (`account@school.com` / `06102006`). They can instantly search any student by admission number, record payments (Cash, UPI, Cheque), and generate official PDF fee receipts.'
    },
    {
      q: 'Can students view other students’ exam results or report cards?',
      a: 'No. Greenwood ERP enforces a strict 1-Student = 1-Report Card privacy policy. Students can only log in to view their personal admit cards, timetables, and report cards.'
    },
    {
      q: 'Are there any hidden setup fees or per-student extra charges?',
      a: 'No. Our pricing is completely transparent. The monthly or annual price includes all server hosting, cloud database storage, updates, and customer support.'
    },
    {
      q: 'What hardware or devices are required to run Greenwood ERP?',
      a: 'Greenwood ERP is 100% web-based. It runs on any standard Web Browser on Windows laptops, Macs, Chromebooks, iPads, and Android smartphones.'
    },
    {
      q: 'What happens after our 14-day free trial ends?',
      a: 'After 14 days, you can select any of our Starter, Growth Pro, or Enterprise plans. All data entered during your trial will remain safely preserved.'
    }
  ];

  return (
    <div className="pt-32 pb-24 space-y-20">
      
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold uppercase tracking-wider">
          <Zap className="w-3.5 h-3.5 text-amber-300" />
          <span>Simple & Transparent Pricing</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight">
          Predictable Plans Built For <span className="text-gradient-primary">Every School Size</span>
        </h1>
        <p className="text-slate-400 text-base max-w-2xl mx-auto">
          No hidden setup costs. No extra per-student billing. Choose the plan that fits your institution.
        </p>

        {/* Annual / Monthly Toggle */}
        <div className="flex items-center justify-center gap-4 pt-6">
          <span className={`text-xs font-semibold ${!isAnnual ? 'text-white' : 'text-slate-400'}`}>Monthly Billing</span>
          <button
            onClick={() => setIsAnnual(!isAnnual)}
            className="w-14 h-8 rounded-full bg-slate-900 p-1 border border-slate-800 transition-colors relative cursor-pointer"
          >
            <div
              className={`w-6 h-6 rounded-full bg-indigo-500 transition-transform ${
                isAnnual ? 'translate-x-6 bg-sky-400' : 'translate-x-0'
              }`}
            />
          </button>
          <div className="flex items-center gap-1.5">
            <span className={`text-xs font-semibold ${isAnnual ? 'text-white' : 'text-slate-400'}`}>Annual Billing</span>
            <span className="text-[10px] font-bold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full">
              Save 20%
            </span>
          </div>
        </div>
      </section>

      {/* Pricing Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((p, idx) => (
            <div
              key={idx}
              className={`rounded-2xl p-8 flex flex-col justify-between text-left relative transition-all ${
                p.popular
                  ? 'bg-slate-900 border-2 border-indigo-500/80 shadow-2xl shadow-indigo-950/80 scale-105 z-10'
                  : 'bg-slate-900/40 border border-slate-800 hover:border-slate-700'
              }`}
            >
              {p.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-sky-400 text-slate-950 font-black text-[10px] uppercase tracking-wider shadow-md">
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
                  <div className="text-xs text-indigo-400 font-semibold mt-1.5 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{p.studentLimit}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">What's Included</div>
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
                  className={`w-full py-3.5 text-xs font-bold uppercase tracking-wider rounded-xl cursor-pointer transition-all flex items-center justify-center gap-2 ${p.buttonStyle}`}
                >
                  <span>{p.buttonText}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <div className="space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-indigo-400">Frequently Asked Questions</div>
          <h2 className="text-3xl font-black text-white">Got Questions? We Have Answers.</h2>
        </div>

        <div className="space-y-3 text-left">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 transition-colors"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between font-bold text-sm text-white text-left cursor-pointer"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openFaq === idx ? 'rotate-180 text-indigo-400' : ''}`} />
              </button>
              {openFaq === idx && (
                <p className="text-xs text-slate-300 mt-3 pt-3 border-t border-slate-800/80 leading-relaxed">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
