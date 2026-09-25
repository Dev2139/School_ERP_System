import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ShieldCheck, Zap, ArrowRight, ChevronDown } from 'lucide-react';

export default function PricingPage({ onOpenTrialModal }) {
  const [isAnnual, setIsAnnual] = useState(true);
  const [openFaq, setOpenFaq] = useState(null);

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
      q: 'Can Class Teachers schedule exam timetables?',
      a: 'Yes! Class Teachers assigned to a class standard can schedule exam timetables for their class. The smart scheduler automatically advances +1 day for subsequent subjects.'
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
    }
  ];

  return (
    <div className="pt-28 pb-20 space-y-16 text-left">
      
      {/* Header */}
      <section className="bg-gn-hero border-b border-sky-200/80 py-16 text-center">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-sky-700 bg-white px-3 py-1 rounded-full border border-sky-200">
            Transparent Investment
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Simple Plans Built For <span className="text-sky-600">Every School Size</span>
          </h1>
          <p className="text-slate-600 text-sm max-w-xl mx-auto">
            No hidden setup costs. No per-student extra fees. All software updates and cloud backups included.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 pt-4">
            <span className={`text-xs font-bold ${!isAnnual ? 'text-slate-900' : 'text-slate-500'}`}>Monthly Billing</span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="w-14 h-8 rounded-full bg-slate-200 p-1 border border-slate-300 transition-colors relative cursor-pointer"
            >
              <div
                className={`w-6 h-6 rounded-full bg-sky-600 transition-transform ${
                  isAnnual ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
            <div className="flex items-center gap-1.5">
              <span className={`text-xs font-bold ${isAnnual ? 'text-slate-900' : 'text-slate-500'}`}>Annual Billing</span>
              <span className="text-[10px] font-black uppercase bg-emerald-100 text-emerald-800 border border-emerald-300 px-2 py-0.5 rounded-full">
                Save 20%
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((p, idx) => (
            <div
              key={idx}
              className={`p-8 rounded-xl bg-white border flex flex-col justify-between relative transition-all ${
                p.popular
                  ? 'border-2 border-sky-500 shadow-xl scale-105 z-10'
                  : 'border-slate-200 shadow-clean'
              }`}
            >
              {p.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-sky-600 text-white font-bold text-[10px] uppercase tracking-wider shadow-sm">
                  ★ Most Popular Choice
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-black text-slate-900">{p.name}</h3>
                  <p className="text-xs text-slate-500 mt-1">{p.desc}</p>
                </div>

                <div className="border-y border-slate-100 py-4">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black text-slate-900 font-['Outfit']">
                      {isAnnual ? p.annualPrice : p.monthlyPrice}
                    </span>
                    <span className="text-xs text-slate-500 font-semibold">/ month</span>
                  </div>
                  <div className="text-xs text-sky-600 font-bold mt-1 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{p.studentLimit}</span>
                  </div>
                </div>

                <div className="space-y-2.5">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Included Services</div>
                  {p.features.map((f, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8">
                <button
                  onClick={onOpenTrialModal}
                  className={`w-full py-3 text-xs font-bold uppercase tracking-wider rounded-lg cursor-pointer transition-all flex items-center justify-center gap-2 ${
                    p.popular
                      ? 'bg-sky-600 hover:bg-sky-700 text-white shadow-md'
                      : 'bg-slate-700 hover:bg-slate-800 text-white'
                  }`}
                >
                  <span>Request Demo / Start Trial</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-black text-slate-900">Frequently Asked Questions</h2>
          <p className="text-xs text-slate-500">Everything you need to know about Greenwood ERP onboarding.</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div key={idx} className="p-4 rounded-lg bg-white border border-slate-200">
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between font-bold text-xs text-slate-800 text-left cursor-pointer"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openFaq === idx ? 'rotate-180 text-sky-600' : ''}`} />
              </button>
              {openFaq === idx && (
                <p className="text-xs text-slate-600 mt-2.5 pt-2.5 border-t border-slate-100 leading-relaxed">
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
