import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Shield,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  FileSpreadsheet,
  CreditCard,
  Calendar,
  Users,
  Award,
  GraduationCap,
  BookOpen,
  ChevronRight,
  Layers,
  Printer,
  Sparkles,
  Building2,
  Lock,
  ChevronDown,
  TrendingUp,
  Bus,
  Clock,
  HelpCircle,
  BarChart3,
  Check
} from 'lucide-react';
import DashboardPreview from '../components/DashboardPreview';
import TestimonialsSection from '../components/TestimonialsSection';

export default function HomePage({ onOpenDemoModal }) {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(null);

  const handleDemoClick = () => {
    if (onOpenDemoModal) onOpenDemoModal();
    else navigate('/demo');
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      q: "What is ScholarGrid ERP?",
      a: "ScholarGrid ERP is an all-in-one cloud-based School Management SaaS platform designed to streamline admissions, student information, attendance, gradebooks, counter fee collection, timetables, library, transport, and multi-school administrative operations."
    },
    {
      q: "Who can use ScholarGrid ERP?",
      a: "ScholarGrid ERP supports Super Admins, Principals, School Directors, Teachers, Head Accountants, Receptionists, Students, and Parents. Each user role gets a customized dashboard tailored to their daily workflow."
    },
    {
      q: "Which school roles are supported?",
      a: "The platform provides 7 distinct role-based portals: Super Admin, Principal/Director, Teacher, Accountant, Receptionist, Student, and Parent, ensuring strict data governance and role-based authorization."
    },
    {
      q: "Can ScholarGrid manage multiple schools or branches?",
      a: "Yes! ScholarGrid ERP features native multi-tenant SaaS architecture. School groups, trusts, and education chains can manage multiple branches under one unified Super Admin console with complete school-level data isolation."
    },
    {
      q: "Does ScholarGrid include counter fee management?",
      a: "Absolutely. ScholarGrid includes a specialized Counter Fee Cashiering Portal supporting standard class fee structures, custom concessions, partial payments, UPI/cash recording, and instant official PDF receipt generation."
    },
    {
      q: "Can teachers manage attendance and exam gradebooks?",
      a: "Yes. Teachers can mark class attendance with 1-click roster entry and use our Excel-style master gradebook matrix to enter subject marks, auto-compute total percentages, and publish report cards."
    },
    {
      q: "Can parents access student information online?",
      a: "Yes. Parents get a dedicated web portal to monitor attendance in real time, view exam report cards, pay fees online, and read official school announcements."
    },
    {
      q: "How does data security and tenant isolation work?",
      a: "ScholarGrid ERP enforces strict school-level data isolation, JWT session tokens, bcrypt password hashing, and immutable system audit logs. Your school's data belongs exclusively to your school."
    },
    {
      q: "How can I request a live demo?",
      a: "Click on 'Book a Demo' anywhere on the page or navigate to our /demo page to schedule a live 1-on-1 walkthrough with our school software team."
    }
  ];

  return (
    <div className="space-y-20 pb-20 text-left bg-white font-['Plus_Jakarta_Sans'] selection:bg-blue-600 selection:text-white">
      
      {/* ------------------------------------------------------------------- */}
      {/* 1. HERO SECTION WITH SAAS DASHBOARD & REAL SCHOOL CAMPUS */}
      {/* ------------------------------------------------------------------- */}
      <section className="relative pt-24 pb-20 md:pt-32 md:pb-28 border-b border-slate-200/70 hero-glow bg-gradient-to-b from-blue-50/50 via-slate-50/50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          
          {/* Announcement Badge */}
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wide text-blue-800 bg-blue-100/80 border border-blue-200/80 px-4 py-1.5 rounded-full shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            <span>School Management • SaaS • ERP</span>
            <span className="text-blue-400">|</span>
            <span className="text-blue-700">ScholarGrid ERP v4.2 Live</span>
          </div>

          {/* Hero Headline & Subtitle */}
          <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.12]">
              The Complete Operating System for <span className="text-gradient-blue">Modern Schools.</span>
            </h1>

            <p className="text-base sm:text-xl text-slate-600 font-medium max-w-3xl mx-auto leading-relaxed">
              ScholarGrid ERP brings admissions, academics, attendance, finance, communication and everyday school operations into one beautifully connected platform.
            </p>

            {/* Hero CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button
                onClick={handleDemoClick}
                className="w-full sm:w-auto px-8 py-4 text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Book a Demo</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <Link
                to="/platform"
                className="w-full sm:w-auto px-7 py-4 text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300/80 rounded-xl shadow-2xs transition-all flex items-center justify-center gap-2"
              >
                <span>Explore the Platform</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
            </div>
          </div>

          {/* Realistic SaaS Dashboard Mockup Composition */}
          <div className="mt-12 max-w-6xl mx-auto">
            <DashboardPreview showFloatingBadges={true} />
          </div>

        </div>
      </section>

      {/* ------------------------------------------------------------------- */}
      {/* 2. REAL SCHOOL CAMPUS & DIGITAL CLASSROOM SHOWCASE */}
      {/* ------------------------------------------------------------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-2xl overflow-hidden relative">
          
          <div className="lg:col-span-6 space-y-6">
            <span className="text-[10px] font-bold uppercase tracking-wider text-sky-400 bg-sky-500/10 px-3 py-1 rounded-full border border-sky-500/30">
              Modern Educational Infrastructure
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
              Empowering Schools with Smart Technology & Connected Classrooms
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
              ScholarGrid ERP bridges the gap between administrators, teachers, and students. From automated morning attendance to digital exam gradebooks, institutions run seamlessly.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2 text-xs font-semibold">
              <div className="p-3 bg-slate-800/80 border border-slate-700 rounded-xl space-y-1">
                <div className="text-blue-400 font-bold text-base">Smart Classrooms</div>
                <div className="text-slate-400 text-[11px]">Instant marks matrix & timetable sync</div>
              </div>
              <div className="p-3 bg-slate-800/80 border border-slate-700 rounded-xl space-y-1">
                <div className="text-emerald-400 font-bold text-base">Zero Paperwork</div>
                <div className="text-slate-400 text-[11px]">Digital admit cards & instant PDF receipts</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-700 group">
              <img
                src="/images/classroom_technology.jpg"
                alt="Modern Connected School Classroom"
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

        </div>
      </section>

      {/* ------------------------------------------------------------------- */}
      {/* 3. KEY INSTITUTION METRICS BAR */}
      {/* ------------------------------------------------------------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-3xl bg-slate-900 text-white shadow-xl grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-1 border-r border-slate-800 last:border-none">
            <div className="text-3xl sm:text-4xl font-black text-blue-400 font-mono">1,200+</div>
            <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Active Students Managed</div>
          </div>
          <div className="space-y-1 border-r border-slate-800 last:border-none">
            <div className="text-3xl sm:text-4xl font-black text-emerald-400 font-mono">99.9%</div>
            <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">System Uptime SLA</div>
          </div>
          <div className="space-y-1 border-r border-slate-800 last:border-none">
            <div className="text-3xl sm:text-4xl font-black text-sky-400 font-mono">₹14.8L+</div>
            <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Fee Collections Processed</div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-black text-amber-400 font-mono">7 Roles</div>
            <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Granular RBAC Security</div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------- */}
      {/* 4. CORE PRODUCT CAPABILITIES / MODULE OVERVIEW */}
      {/* ------------------------------------------------------------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Comprehensive Modular ERP
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Everything Your School Needs. <br />
            <span className="text-gradient-blue">One Connected Platform.</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
            ScholarGrid ERP replaces fragmented software tools with a single unified system for all administrative, financial, academic, and communication needs.
          </p>
        </div>

        {/* 12 Core Module Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: Users,
              title: "Student Management",
              desc: "Complete digital student lifecycle profiles, document archives, admission numbers, and section assignments.",
              tag: "Core Academic"
            },
            {
              icon: CheckCircle2,
              title: "Attendance Roster",
              desc: "1-click daily attendance marking, instant SMS notifications to parents, and automated monthly attendance analytics.",
              tag: "Real-time"
            },
            {
              icon: FileSpreadsheet,
              title: "Academics & Gradebook",
              desc: "Excel-style master gradebook matrix, all-subject marks entry, automated percentage/GPA calculation, and PDF report cards.",
              tag: "Faculty Portal"
            },
            {
              icon: CreditCard,
              title: "Fees & Payment Counter",
              desc: "Fee structure configuration, counter cashiering portal, discount/concession rules, and instant PDF receipt generation.",
              tag: "Financial"
            },
            {
              icon: GraduationCap,
              title: "Admissions Pipeline",
              desc: "Track inquiries from initial contact to application review, entrance tests, approval, and final student enrollment.",
              tag: "Growth & ROI"
            },
            {
              icon: Calendar,
              title: "Timetable & Sunday Skipping",
              desc: "Intelligent weekly class schedule builder with Sunday skipping, room allocation, and teacher conflict detection.",
              tag: "Automation"
            },
            {
              icon: Award,
              title: "Examinations & Admit Cards",
              desc: "Schedule term exams, allocate exam halls, assign invigilators, and print digital Hall Tickets with student photos.",
              tag: "Exam Cell"
            },
            {
              icon: Sparkles,
              title: "Notices & Communication",
              desc: "Broadcast official school notices, circulars, exam dates, and urgent alerts directly to parents and staff mobile devices.",
              tag: "Broadcast"
            },
            {
              icon: BookOpen,
              title: "Library Circulation",
              desc: "Catalog books by ISBN, barcode scanning, issue/return tracking, and automated fine calculation for overdue items.",
              tag: "Inventory"
            },
            {
              icon: Bus,
              title: "Transport & Fleet Management",
              desc: "Map bus routes, vehicle details, driver assignments, stop-wise student pick/drop lists, and transport fee sync.",
              tag: "Operations"
            },
            {
              icon: Lock,
              title: "RBAC & Audit Logs",
              desc: "Role-Based Access Control enforcing strict permission boundaries and immutable audit trail logs for all transactions.",
              tag: "Security"
            },
            {
              icon: Building2,
              title: "Multi-School SaaS Console",
              desc: "Centralized management interface for school chains, trusts, and multi-branch networks with isolated data boundaries.",
              tag: "Enterprise"
            },
          ].map((mod, i) => {
            const IconComp = mod.icon;
            return (
              <div
                key={i}
                className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-card shadow-card-hover space-y-4 text-left group"
              >
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-2.5 py-1 rounded-md">
                    {mod.tag}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {mod.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    {mod.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center pt-4">
          <Link
            to="/platform"
            className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-6 py-3 rounded-xl transition-all"
          >
            <span>Explore All 14+ Modules & System Architecture</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ------------------------------------------------------------------- */}
      {/* 5. VISUAL FEATURE CAROUSEL WITH REAL IMAGES */}
      {/* ------------------------------------------------------------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Real School Workflow Previews
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            Designed for Real Administrative Environments
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-2xl bg-white border border-slate-200 shadow-card overflow-hidden space-y-4 group">
            <div className="h-48 overflow-hidden relative">
              <img
                src="/images/principal_dashboard_user.jpg"
                alt="Principal Analytics Console"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-5 space-y-2 text-left">
              <h3 className="text-base font-bold text-slate-900">Principal Operational Dashboard</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                High-level visibility into school attendance trends, fee collection status, and academic progress across all standards.
              </p>
            </div>
          </div>

          <div className="rounded-2xl bg-white border border-slate-200 shadow-card overflow-hidden space-y-4 group">
            <div className="h-48 overflow-hidden relative">
              <img
                src="/images/fee_counter_desk.jpg"
                alt="Fee Cashiering Counter Desk"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-5 space-y-2 text-left">
              <h3 className="text-base font-bold text-slate-900">Accountant Counter Cashiering</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Fast student lookup, fee structure calculation, concession application, and instant watermarked PDF receipt printing.
              </p>
            </div>
          </div>

          <div className="rounded-2xl bg-white border border-slate-200 shadow-card overflow-hidden space-y-4 group">
            <div className="h-48 overflow-hidden relative">
              <img
                src="/images/school_campus_hero.jpg"
                alt="Modern School Campus Network"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-5 space-y-2 text-left">
              <h3 className="text-base font-bold text-slate-900">Multi-School Campus Governance</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Govern single campuses and multi-branch school networks from one central SaaS console with strict data isolation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------- */}
      {/* 6. ROLE-BASED EXPERIENCE SECTION */}
      {/* ------------------------------------------------------------------- */}
      <section className="bg-slate-50 py-20 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 bg-blue-100/70 px-3 py-1 rounded-full border border-blue-200">
              User Portals & Access Control
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
              One Platform. <span className="text-gradient-blue">Every Role.</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
              ScholarGrid ERP provides 7 specialized role views designed to empower every stakeholder in your educational ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                role: "Super Admin / Management",
                desc: "Full multi-school network control, global system settings, license management, and executive audit logs.",
                capabilities: ["Multi-branch management", "Global security policies", "Financial audit reports"]
              },
              {
                role: "Principal / Director",
                desc: "High-level operational overview, teacher directory, academic performance analytics, and emergency broadcasts.",
                capabilities: ["Real-time school metrics", "Staff performance tracking", "Exam approvals"]
              },
              {
                role: "Teacher / Faculty",
                desc: "Class attendance roster, Excel-style gradebook matrix, timetable schedule, and digital homework management.",
                capabilities: ["1-Click attendance entry", "Marks matrix filling", "Admit card generation"]
              },
              {
                role: "Accountant",
                desc: "Counter fee cashiering, custom fee structure setup, receipt printing, and outstanding balance tracking.",
                capabilities: ["Counter cash desk", "Instant PDF receipts", "Ledger reconciliation"]
              },
              {
                role: "Receptionist",
                desc: "Admissions inquiry management, visitor logging, phone call records, and front-desk student gate passes.",
                capabilities: ["Visitor gate pass", "Inquiry-to-Admission workflow", "General notices"]
              },
              {
                role: "Student & Parent",
                desc: "Dedicated self-service web portal to check attendance, view exam schedules, print admit cards, and pay fees online.",
                capabilities: ["Online fee payment", "Exam hall ticket download", "Progress report card"]
              },
            ].map((item, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-card space-y-4 text-left">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                    0{idx + 1}
                  </div>
                  <h3 className="text-base font-bold text-slate-900">{item.role}</h3>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  {item.desc}
                </p>

                <div className="space-y-1.5 pt-2 border-t border-slate-100">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Key Privileges:</div>
                  <div className="space-y-1">
                    {item.capabilities.map((cap, cIdx) => (
                      <div key={cIdx} className="flex items-center gap-1.5 text-xs text-slate-700 font-semibold">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-4">
            <Link
              to="/roles"
              className="inline-flex items-center gap-2 text-xs font-bold text-slate-800 bg-white hover:bg-slate-100 px-6 py-3 rounded-xl border border-slate-300 shadow-2xs transition-all"
            >
              <span>Explore Detailed Role Capabilities</span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </Link>
          </div>

        </div>
      </section>

      {/* ------------------------------------------------------------------- */}
      {/* 7. TESTIMONIALS SECTION */}
      {/* ------------------------------------------------------------------- */}
      <TestimonialsSection />

      {/* ------------------------------------------------------------------- */}
      {/* 8. SECURITY & MULTI-SCHOOL ARCHITECTURE */}
      {/* ------------------------------------------------------------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          
          <div className="p-8 sm:p-10 rounded-3xl bg-slate-900 text-white shadow-xl space-y-6">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
              Enterprise Trust & Compliance
            </span>
            <h2 className="text-3xl font-black tracking-tight">
              Enterprise Security. <br />
              <span className="text-emerald-400">Strict Data Isolation.</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              ScholarGrid ERP enforces multi-tenant database isolation, JWT token authentication, bcrypt password encryption, and immutable audit logs for every system action.
            </p>

            <div className="space-y-3 text-xs">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/80 border border-slate-700">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <div className="font-bold text-white">Your School's Data Belongs to Your School</div>
                  <div className="text-slate-400 text-[11px]">Strict multi-tenant boundary checks prevent cross-tenant data leakage.</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/80 border border-slate-700">
                <Lock className="w-5 h-5 text-blue-400 shrink-0" />
                <div>
                  <div className="font-bold text-white">Role-Based Access Control (RBAC)</div>
                  <div className="text-slate-400 text-[11px]">Granular privileges for Admins, Teachers, Accountants, Students, and Parents.</div>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/security"
                className="inline-flex items-center gap-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 px-5 py-3 rounded-xl transition-all"
              >
                <span>Read Security Whitepaper</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200/80 shadow-md space-y-6 text-left">
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-100 px-3 py-1 rounded-full border border-blue-200">
              Multi-School SaaS Architecture
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Built to Scale Across <span className="text-gradient-blue">Multiple Schools.</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
              Managing a chain of schools or an educational trust? ScholarGrid lets you govern multiple campuses from one central dashboard while preserving individual school workflows.
            </p>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3 font-mono text-xs">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Multi-Tenant Network Console</div>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-200">
                  <span className="font-bold text-slate-800 font-sans">Greenwood Academy (Campus A)</span>
                  <span className="text-emerald-600 font-bold text-[10px]">1,248 Students • Active</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-200">
                  <span className="font-bold text-slate-800 font-sans">St. Xavier School (Campus B)</span>
                  <span className="text-emerald-600 font-bold text-[10px]">850 Students • Active</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-200">
                  <span className="font-bold text-slate-800 font-sans">City Model Public School (Campus C)</span>
                  <span className="text-emerald-600 font-bold text-[10px]">1,410 Students • Active</span>
                </div>
              </div>
            </div>

            <div>
              <Link
                to="/multi-school"
                className="inline-flex items-center gap-2 text-xs font-bold text-blue-700 hover:text-blue-900 bg-blue-100/70 hover:bg-blue-100 px-5 py-3 rounded-xl border border-blue-200 transition-all"
              >
                <span>Learn Multi-School Capabilities</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* ------------------------------------------------------------------- */}
      {/* 9. FREQUENTLY ASKED QUESTIONS (FAQ) ACCORDION */}
      {/* ------------------------------------------------------------------- */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        <div className="text-center space-y-3">
          <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Got Questions?
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            Everything you need to know about ScholarGrid ERP implementation and features.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="rounded-2xl bg-white border border-slate-200/90 shadow-2xs overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50 transition-colors"
                >
                  <span className="text-sm font-bold text-slate-900">{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-blue-600' : ''}`} />
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 text-xs text-slate-600 font-medium leading-relaxed border-t border-slate-100 pt-3 animate-fadeIn">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ------------------------------------------------------------------- */}
      {/* 10. HIGH IMPACT FINAL CTA BANNER */}
      {/* ------------------------------------------------------------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="p-10 sm:p-14 rounded-3xl bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-4 relative z-10">
            <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 text-white px-3 py-1 rounded-full border border-white/20">
              Transform Your School Operations Today
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight">
              Ready to Upgrade to ScholarGrid ERP?
            </h2>
            <p className="text-xs sm:text-base text-blue-100 font-medium leading-relaxed">
              Join modern educational institutions using ScholarGrid ERP to streamline admissions, attendance, fees, and academics.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <button
                onClick={handleDemoClick}
                className="w-full sm:w-auto px-8 py-4 text-xs font-bold text-slate-900 bg-white hover:bg-slate-100 rounded-xl shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Book a Demo</span>
                <ArrowRight className="w-4 h-4 text-blue-600" />
              </button>

              <Link
                to="/pricing"
                className="w-full sm:w-auto px-7 py-4 text-xs font-bold text-white bg-blue-800/60 hover:bg-blue-800/80 border border-white/20 rounded-xl transition-all"
              >
                <span>View Pricing Plans</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
