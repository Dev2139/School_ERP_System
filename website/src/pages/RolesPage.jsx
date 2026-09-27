import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Shield,
  User,
  CreditCard,
  GraduationCap,
  Users,
  CheckCircle2,
  FileSpreadsheet,
  Building,
  Lock,
  ArrowRight,
  Check,
  Printer,
  Sparkles,
  PhoneCall
} from 'lucide-react';

export default function RolesPage({ onOpenDemoModal }) {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState('admin');

  const handleDemoClick = () => {
    if (onOpenDemoModal) onOpenDemoModal();
    else navigate('/demo');
  };

  const roles = [
    {
      id: "super_admin",
      title: "Super Admin",
      subtitle: "Multi-School Network Governance",
      icon: Shield,
      badge: "Highest Authority",
      desc: "Central oversight for educational trusts, multi-school chains, and school owners.",
      capabilities: [
        "Manage multiple school campuses",
        "Configure global RBAC security policies",
        "Audit trail logs for all transactions",
        "Global subscription & billing controls",
        "Data isolation & system health monitoring"
      ],
      preview: {
        stat1: "3 Active Branches",
        stat2: "3,500 Total Students",
        stat3: "100% Data Isolation Verified",
        action: "Global System Security Audit Logs Active"
      }
    },
    {
      id: "principal",
      title: "Principal / School Admin",
      subtitle: "Full Operational & Academic Control",
      icon: Building,
      badge: "Campus Executive",
      desc: "Comprehensive operational management for single-school principals and directors.",
      capabilities: [
        "Real-time attendance & fee dashboards",
        "Faculty directory & timetable assignment",
        "Academic pass rate performance metrics",
        "Emergency announcements & circular approval",
        "Student transfer certificate issuance"
      ],
      preview: {
        stat1: "1,248 Enrolled Students",
        stat2: "98.4% Today's Attendance",
        stat3: "42 Faculty Members",
        action: "Term 1 Examination Schedule Approved"
      }
    },
    {
      id: "teacher",
      title: "Teacher / Faculty",
      subtitle: "Classroom Management & Grading",
      icon: User,
      badge: "Academic Lead",
      desc: "Daily classroom operations, attendance marking, and gradebook mark entry.",
      capabilities: [
        "1-Click morning class attendance roster",
        "Excel-style master gradebook matrix",
        "Class timetable & subject schedule",
        "Digital homework & assignment uploads",
        "Student admit card / hall ticket print"
      ],
      preview: {
        stat1: "Class 10-A Teacher",
        stat2: "38 Students Present",
        stat3: "Physics Gradebook Updated",
        action: "Term 1 Admit Cards Printed"
      }
    },
    {
      id: "accountant",
      title: "Accountant",
      subtitle: "Counter Fee Cashiering & Finance",
      icon: CreditCard,
      badge: "Financial Desk",
      desc: "Fee collection counter portal, payment receipts, concessions, and ledgers.",
      capabilities: [
        "Counter fee payment cashiering portal",
        "Standard class fee structure setup",
        "Discount & concession approval",
        "Instant official PDF receipt generation",
        "Outstanding fee balance tracking & alerts"
      ],
      preview: {
        stat1: "₹ 12,85,000 Collected",
        stat2: "89% Target Achieved",
        stat3: "420 Receipts Issued",
        action: "Counter Cash Slot #01 Online"
      }
    },
    {
      id: "receptionist",
      title: "Receptionist",
      subtitle: "Admissions & Gate Management",
      icon: PhoneCall,
      badge: "Front Desk",
      desc: "Front desk operations, visitor logs, inquiry tracking, and gate passes.",
      capabilities: [
        "Admissions inquiry logging & followup",
        "Visitor gate pass creation with phone OTP",
        "Phone inquiry call log records",
        "Notice board updates",
        "Student early departure gate pass"
      ],
      preview: {
        stat1: "18 Visitors Today",
        stat2: "14 New Inquiries",
        stat3: "6 Gate Passes Issued",
        action: "Front Desk Log Synced"
      }
    },
    {
      id: "student",
      title: "Student",
      subtitle: "Academic Self-Service Portal",
      icon: GraduationCap,
      badge: "Student Portal",
      desc: "Personalized portal for exam schedules, admit cards, timetables, and grades.",
      capabilities: [
        "Personalized weekly class timetable",
        "Digital Hall Ticket / Admit Card download",
        "Term exam report cards & GPA score",
        "Homework assignments & circulars",
        "Library book borrowing status"
      ],
      preview: {
        stat1: "Roll #101 • Class 10-A",
        stat2: "GPA: 4.8 / 5.0",
        stat3: "Admit Card Ready",
        action: "Digital Hall Ticket Downloaded"
      }
    },
    {
      id: "parent",
      title: "Parent",
      subtitle: "Child Progress & Fee Transparency",
      icon: Users,
      badge: "Parent Access",
      desc: "Instant visibility into attendance alerts, report cards, online fee payment, and notices.",
      capabilities: [
        "Real-time daily attendance notification",
        "Online fee payment gateway",
        "Digital progress report card download",
        "School notice broadcast alerts",
        "Direct teacher communication channel"
      ],
      preview: {
        stat1: "Parent of Aarav Sharma",
        stat2: "Attendance: 98.4%",
        stat3: "Fees: Fully Paid",
        action: "Report Card Viewed"
      }
    },
  ];

  return (
    <div className="space-y-16 pb-20 text-left bg-white font-['Plus_Jakarta_Sans']">
      
      {/* Header */}
      <section className="pt-28 pb-16 bg-gradient-to-b from-blue-50/60 via-slate-50 to-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 bg-blue-100/80 px-3.5 py-1.5 rounded-full border border-blue-200">
            7 Dedicated Role Portals
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
            One Platform. <br />
            <span className="text-gradient-blue">Every Role.</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto font-medium leading-relaxed">
            ScholarGrid ERP empowers every institutional stakeholder with customized, role-tailored interface views and strict authorization rules.
          </p>
        </div>
      </section>

      {/* Role Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {roles.map((r) => {
            const IconComp = r.icon;
            return (
              <div
                key={r.id}
                className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-card shadow-card-hover space-y-6 text-left flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-3.5 rounded-2xl bg-blue-50 text-blue-600 border border-blue-100">
                        <IconComp className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-extrabold text-slate-900">{r.title}</h3>
                        <p className="text-xs text-blue-600 font-bold">{r.subtitle}</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 px-3 py-1 rounded-full border border-slate-200">
                      {r.badge}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                    {r.desc}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Main Capabilities:</div>
                    <div className="space-y-1.5">
                      {r.capabilities.map((cap, cIdx) => (
                        <div key={cIdx} className="flex items-center gap-2 text-xs text-slate-700 font-semibold">
                          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>{cap}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Mini Dashboard Preview Box */}
                <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-2 text-xs font-mono">
                  <div className="flex items-center justify-between text-[10px] text-slate-400 pb-1 border-b border-slate-800">
                    <span>MINI DASHBOARD PREVIEW</span>
                    <span className="text-emerald-400">● LIVE</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center pt-1 font-sans">
                    <div className="p-2 rounded bg-slate-950 border border-slate-800">
                      <div className="text-[9px] text-slate-500 font-mono">STAT 1</div>
                      <div className="font-bold text-white text-[11px]">{r.preview.stat1}</div>
                    </div>
                    <div className="p-2 rounded bg-slate-950 border border-slate-800">
                      <div className="text-[9px] text-slate-500 font-mono">STAT 2</div>
                      <div className="font-bold text-emerald-400 text-[11px]">{r.preview.stat2}</div>
                    </div>
                    <div className="p-2 rounded bg-slate-950 border border-slate-800">
                      <div className="text-[9px] text-slate-500 font-mono">STAT 3</div>
                      <div className="font-bold text-sky-400 text-[11px]">{r.preview.stat3}</div>
                    </div>
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
          <h2 className="text-3xl font-extrabold">Need Custom Role Permissions?</h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto font-medium">
            ScholarGrid ERP allows institution admins to configure custom permission matrices tailored to your staff setup.
          </p>
          <button
            onClick={handleDemoClick}
            className="px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer transition-all inline-flex items-center gap-2"
          >
            <span>Request a Role Walkthrough</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

    </div>
  );
}
