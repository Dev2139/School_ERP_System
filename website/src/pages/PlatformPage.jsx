import React from 'react';
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
  Clock,
  FileText,
  BarChart3,
  Lock,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  Layers,
  Building2
} from 'lucide-react';
import DashboardPreview from '../components/DashboardPreview';

export default function PlatformPage({ onOpenDemoModal }) {
  const navigate = useNavigate();

  const handleDemoClick = () => {
    if (onOpenDemoModal) onOpenDemoModal();
    else navigate('/demo');
  };

  const modules = [
    {
      id: "students",
      icon: Users,
      title: "Student Management",
      desc: "Centralized student directory, admission history, parent contacts, document vault, and class roll numbers.",
      features: ["Unique Student ID generation", "Document vault & ID proofs", "Class & Section allocations", "Student search & filtering"]
    },
    {
      id: "attendance",
      icon: CheckCircle2,
      title: "Attendance Roster",
      desc: "Daily morning attendance roster, instant SMS/push alerts to parents, and monthly attendance percentage reports.",
      features: ["1-Click roster marking", "Parent absence alert SMS", "RFID/Biometric sync ready", "Monthly percentage metrics"]
    },
    {
      id: "academics",
      icon: FileSpreadsheet,
      title: "Academics & Gradebook",
      desc: "Excel-style master gradebook matrix, subject-wise marks entry, term weightage, and automatic percentage computation.",
      features: ["All-subject grade matrix", "GPA & percentage formulas", "PDF report card printing", "Subject teacher mark locks"]
    },
    {
      id: "examinations",
      icon: Award,
      title: "Examinations & Hall Tickets",
      desc: "Exam timetable scheduling, seating plan allocation, digital hall tickets with student photo, and marks processing.",
      features: ["Exam schedule builder", "Digital Admit Cards", "Invigilator assignments", "Subject pass/fail limits"]
    },
    {
      id: "fees",
      icon: CreditCard,
      title: "Fees & Payment Counter",
      desc: "Fee head configuration, cashier counter portal, discount concessions, balance alerts, and instant PDF receipts.",
      features: ["Counter payment portal", "Custom concessions/waivers", "Official PDF receipts", "Payment gateway integration"]
    },
    {
      id: "admissions",
      icon: GraduationCap,
      title: "Admissions Pipeline",
      desc: "Track inquiries from initial contact to form application, entrance evaluation, document review, and enrollment.",
      features: ["Inquiry form tracking", "5-Stage pipeline funnel", "Direct student conversion", "Admission fee collection"]
    },
    {
      id: "timetable",
      icon: Calendar,
      title: "Timetable & Scheduler",
      desc: "Weekly class schedule builder with automatic Sunday skipping, teacher conflict checks, and room assignments.",
      features: ["Conflict-free scheduling", "Sunday skipping logic", "Teacher proxy assignments", "Classroom room sync"]
    },
    {
      id: "communication",
      icon: Sparkles,
      title: "Notices & Communication",
      desc: "Broadcast official school notices, circulars, exam dates, and urgent emergency alerts directly to mobile devices.",
      features: ["Multi-channel broadcasts", "Class-specific notices", "Read receipt tracking", "SMS & Email notification"]
    },
    {
      id: "library",
      icon: BookOpen,
      title: "Library Management",
      desc: "Catalog books by ISBN and barcode, track book issue/returns, student borrowing limits, and overdue fines.",
      features: ["ISBN book cataloging", "Barcode scan issue/return", "Overdue fine calculation", "Available stock counter"]
    },
    {
      id: "transport",
      icon: Bus,
      title: "Transport & Vehicles",
      desc: "Map bus routes, vehicle details, driver contacts, stop-wise student pick/drop rosters, and transport fee sync.",
      features: ["Bus route management", "Driver & vehicle logs", "Student route allocation", "Transport fee integration"]
    },
    {
      id: "leave",
      icon: Clock,
      title: "Leave Management",
      desc: "Student and staff leave application portal with principal approval workflow and automatic attendance adjustment.",
      features: ["Digital leave application", "Approval/rejection workflow", "Automated attendance sync", "Leave balance records"]
    },
    {
      id: "calendar",
      icon: Calendar,
      title: "School Calendar & Events",
      desc: "Interactive institutional academic calendar for holidays, exam dates, sports days, and parent-teacher meetings.",
      features: ["Academic year calendar", "Holiday event markers", "Exam date countdown", "Parent sync calendar"]
    },
    {
      id: "documents",
      icon: FileText,
      title: "Documents & Certificates",
      desc: "Issue transfer certificates (TC), bonafide certificates, character certificates, and admit cards with school seals.",
      features: ["Transfer Certificate (TC)", "Bonafide Certificate gen", "Digital admit card print", "School seal watermark"]
    },
    {
      id: "analytics",
      icon: BarChart3,
      title: "Analytics & Executive Insights",
      desc: "Real-time dashboard analytics for attendance trends, fee collection status, academic passing rates, and growth metrics.",
      features: ["Fee collection trends", "Class attendance charts", "Academic pass rate matrix", "Executive summary PDF"]
    }
  ];

  return (
    <div className="space-y-20 pb-20 text-left bg-white font-['Plus_Jakarta_Sans']">
      
      {/* Platform Header Section */}
      <section className="pt-28 pb-16 bg-gradient-to-b from-blue-50/60 via-slate-50 to-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 bg-blue-100/80 px-3.5 py-1.5 rounded-full border border-blue-200">
            Unified School Operating System
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Everything Your School Needs. <br />
            <span className="text-gradient-blue">One Connected Platform.</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto font-medium leading-relaxed">
            ScholarGrid ERP integrates 14+ essential school modules into one intuitive, secure, and synchronized cloud environment for modern educational institutions.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <button
              onClick={handleDemoClick}
              className="px-7 py-3.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md cursor-pointer flex items-center gap-2"
            >
              <span>Book a Platform Demo</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <Link
              to="/features"
              className="px-6 py-3.5 text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-xl shadow-2xs"
            >
              View Feature Deep-Dives
            </Link>
          </div>
        </div>
      </section>

      {/* Connected Architecture Visual */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Interactive Connected Platform Architecture
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            See how data flows seamlessly between modules without double-data entry.
          </p>
        </div>

        <DashboardPreview showFloatingBadges={false} />
      </section>

      {/* All 14 Core Modules Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        <div className="text-center space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full">
            All 14 Platform Modules
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900">Explore Every Module Capability</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((mod) => {
            const IconComp = mod.icon;
            return (
              <div
                key={mod.id}
                className="p-6 rounded-2xl bg-white border border-slate-200 shadow-card shadow-card-hover space-y-4 text-left group"
              >
                <div className="p-3.5 rounded-xl bg-blue-50 text-blue-600 w-fit group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <IconComp className="w-6 h-6" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {mod.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    {mod.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-1.5">
                  {mod.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Final CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="p-10 rounded-3xl bg-slate-900 text-white text-center space-y-5">
          <h2 className="text-3xl font-extrabold">Ready to Unify Your School Management?</h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto font-medium">
            Get a customized walk-through of ScholarGrid ERP configured for your institution's student count and class standards.
          </p>
          <button
            onClick={handleDemoClick}
            className="px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer transition-all inline-flex items-center gap-2"
          >
            <span>Book a Demo</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

    </div>
  );
}
