import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Building2,
  Award,
  UserCheck,
  CreditCard,
  PhoneCall,
  Heart,
  GraduationCap,
  Check,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Sparkles
} from 'lucide-react';

export default function SolutionsPage({ onOpenDemoModal }) {
  const navigate = useNavigate();

  const handleDemoClick = () => {
    if (onOpenDemoModal) onOpenDemoModal();
    else navigate('/demo');
  };

  const solutions = [
    {
      function: "For School Owners & Trustees",
      icon: Building2,
      tagline: "Total Institutional Visibility & Growth ROI",
      desc: "Get real-time consolidated executive reports across single or multiple campuses. Track student growth, fee collections, operational expenses, and faculty compliance without manual intervention.",
      benefits: [
        "Multi-branch centralized dashboard",
        "Zero fee leakage & automated cashiering",
        "Executive analytics and growth trends",
        "Institutional brand preservation"
      ]
    },
    {
      function: "For Principals & School Directors",
      icon: Award,
      tagline: "Total Operational Control & Academic Excellence",
      desc: "Eliminate administrative bottlenecks. Oversee class daily attendance, timetable proxies, teacher performance, exam schedules, and circular approvals with total digital clarity.",
      benefits: [
        "1-Click daily school operational status",
        "Automated exam schedule & admit cards",
        "Faculty workload & timetable management",
        "Instant emergency broadcast alerts"
      ]
    },
    {
      function: "For Teachers & Educators",
      icon: UserCheck,
      tagline: "Less Administration, Better Classroom Focus",
      desc: "Save up to 8 hours every week on routine administrative tasks. Mark attendance in 30 seconds, fill gradebooks in side-by-side matrices, and issue student hall tickets without paperwork.",
      benefits: [
        "Fast 1-click morning attendance roster",
        "Excel-style master gradebook matrix",
        "Digital homework & lesson attachments",
        "Automated student percentage computation"
      ]
    },
    {
      function: "For Accountants & Cashiers",
      icon: CreditCard,
      tagline: "Simplified Fee Collection & Financial Auditing",
      desc: "Speed up counter cashiering during fee collection peak periods. Configure flexible fee terms, apply concessions, record UPI/cash receipts, and generate official PDF bills instantly.",
      benefits: [
        "Counter cashiering fast desk mode",
        "Automated fee concession workflows",
        "Instant PDF counter fee receipts",
        "Daily counter closure cash balancing"
      ]
    },
    {
      function: "For Front Desk & Receptionists",
      icon: PhoneCall,
      tagline: "Seamless Admissions & Gate Workflows",
      desc: "Convert parent walk-in inquiries into enrolled students. Log visitor gate passes with phone verification, track admission follow-up status, and manage front desk records effortlessly.",
      benefits: [
        "5-Stage admissions inquiry pipeline",
        "Visitor gate pass logging",
        "Parent phone inquiry records",
        "Student departure gate pass sync"
      ]
    },
    {
      function: "For Parents & Guardians",
      icon: Heart,
      tagline: "Real-Time Transparency into Your Child's Journey",
      desc: "Stay connected with your child's education. Receive daily attendance SMS alerts, pay term fees online, download progress report cards, and read official school notices from home.",
      benefits: [
        "Instant morning attendance alerts",
        "Secure online fee payment gateway",
        "Digital term exam progress report card",
        "Direct school notice circular feed"
      ]
    },
    {
      function: "For Students",
      icon: GraduationCap,
      tagline: "Empowered Digital Learning & Examination Access",
      desc: "Access academic timetables, exam date sheets, digital hall tickets, homework assignments, and library book records anytime from student self-service web portals.",
      benefits: [
        "Personalized weekly class timetable",
        "Exam Admit Card download with seat number",
        "Library book issue & due date tracker",
        "Access to digital study resources"
      ]
    },
  ];

  return (
    <div className="space-y-16 pb-20 text-left bg-white font-['Plus_Jakarta_Sans']">
      
      {/* Header */}
      <section className="pt-28 pb-16 bg-gradient-to-b from-blue-50/60 via-slate-50 to-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 bg-blue-100/80 px-3.5 py-1.5 rounded-full border border-blue-200">
            Tailored Solutions by Function
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Designed for Every Stakeholder <br />
            <span className="text-gradient-blue">In Your Institution.</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto font-medium leading-relaxed">
            ScholarGrid ERP aligns administrative workflows with specific school roles to create an interconnected, high-performance learning community.
          </p>
        </div>
      </section>

      {/* Solutions List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutions.map((sol, idx) => {
            const IconComp = sol.icon;
            return (
              <div
                key={idx}
                className="p-7 rounded-3xl bg-white border border-slate-200 shadow-card shadow-card-hover space-y-5 text-left flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="p-3.5 rounded-2xl bg-blue-50 text-blue-600 border border-blue-100 w-fit">
                    <IconComp className="w-6 h-6" />
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-lg font-extrabold text-slate-900">{sol.function}</h3>
                    <div className="text-xs font-bold text-blue-600">{sol.tagline}</div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    {sol.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Key Benefits:</div>
                  <div className="space-y-1.5">
                    {sol.benefits.map((b, bIdx) => (
                      <div key={bIdx} className="flex items-center gap-2 text-xs text-slate-700 font-semibold">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8">
        <div className="p-10 rounded-3xl bg-slate-900 text-white space-y-4 shadow-xl">
          <h2 className="text-3xl font-extrabold">Discover ScholarGrid for Your Function</h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto font-medium">
            Let our product team walk you through solution modules customized for your role.
          </p>
          <button
            onClick={handleDemoClick}
            className="px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer transition-all inline-flex items-center gap-2"
          >
            <span>Book a Custom Solution Demo</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

    </div>
  );
}
