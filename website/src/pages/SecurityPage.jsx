import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  Lock,
  Database,
  Key,
  FileCode2,
  UserCheck,
  Building,
  Server,
  ArrowRight,
  CheckCircle2,
  Layers,
  FileText
} from 'lucide-react';

export default function SecurityPage({ onOpenDemoModal }) {
  const navigate = useNavigate();

  const handleDemoClick = () => {
    if (onOpenDemoModal) onOpenDemoModal();
    else navigate('/demo');
  };

  const securityPillars = [
    {
      title: "School-Level Data Isolation",
      icon: Database,
      desc: "Strict database query boundaries enforce logical multi-tenant isolation. No school branch can access or query another school's records."
    },
    {
      title: "Role-Based Access Control (RBAC)",
      icon: UserCheck,
      desc: "Granular authorization matrix specifying explicit read, write, edit, and delete permissions per user role across all 14 modules."
    },
    {
      title: "JWT Token Session Safety",
      icon: Key,
      desc: "Cryptographically signed JSON Web Tokens (JWT) with short expiration lifetimes ensure session integrity and prevent hijacking."
    },
    {
      title: "Bcrypt Password Hashing",
      icon: Lock,
      desc: "All user credentials are encrypted using industry-standard bcrypt salt iterations before persistence into system storage."
    },
    {
      title: "Immutable System Audit Logs",
      icon: FileText,
      desc: "Every fee collection, gradebook entry, student edit, and system configuration change is timestamped and recorded in immutable audit logs."
    },
    {
      title: "Secure API Architecture",
      icon: Server,
      desc: "RESTful API endpoints protected by SSL/TLS encryption, rate limiting, and parameter validation against injection attacks."
    }
  ];

  return (
    <div className="space-y-16 pb-20 text-left bg-white font-['Plus_Jakarta_Sans']">
      
      {/* Header */}
      <section className="pt-28 pb-16 bg-gradient-to-b from-blue-50/60 via-slate-50 to-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/80 px-3.5 py-1.5 rounded-full border border-emerald-200">
            Enterprise Security & Governance
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Institutional Data Protection. <br />
            <span className="text-gradient-blue">Built into the Core.</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto font-medium leading-relaxed">
            ScholarGrid ERP implements comprehensive data isolation, role-based authorization, and transparent audit trails to protect student and financial data.
          </p>

          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 max-w-xl mx-auto text-emerald-900 text-xs sm:text-sm font-bold flex items-center justify-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>Core Guarantee: Your school's data belongs exclusively to your school.</span>
          </div>
        </div>
      </section>

      {/* Visual Security Architecture Diagram */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-900 text-white shadow-2xl space-y-8">
          <div className="text-center space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/30">
              Visual System Architecture
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold">ScholarGrid Multi-Layered Security Stack</h2>
            <p className="text-xs text-slate-400">How requests move safely from frontend devices to isolated tenant databases.</p>
          </div>

          {/* Architecture Layer Stack Diagram */}
          <div className="space-y-4 max-w-4xl mx-auto font-mono text-xs">
            {/* Layer 1 */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/20 text-blue-400 rounded-lg">
                  <Server className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-white text-sm font-sans">1. Client Request Layer</div>
                  <div className="text-slate-400 text-[11px]">HTTPS / TLS 1.3 Encryption • Web & Mobile Portals</div>
                </div>
              </div>
              <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full font-bold text-[10px]">Encrypted Transport</span>
            </div>

            {/* Layer 2 */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-500/20 text-purple-400 rounded-lg">
                  <Key className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-white text-sm font-sans">2. API Gateway & Authentication</div>
                  <div className="text-slate-400 text-[11px]">JWT Validation • Rate Limiting • RBAC Privilege Check</div>
                </div>
              </div>
              <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full font-bold text-[10px]">Token Verified</span>
            </div>

            {/* Layer 3 */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg">
                  <Database className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-white text-sm font-sans">3. Multi-Tenant Database Isolation</div>
                  <div className="text-slate-400 text-[11px]">School ID Query Filtering • Bcrypt Password Hashes</div>
                </div>
              </div>
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full font-bold text-[10px]">Isolated Storage</span>
            </div>

            {/* Layer 4 */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-500/20 text-amber-400 rounded-lg">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-white text-sm font-sans">4. Immutable System Audit Logger</div>
                  <div className="text-slate-400 text-[11px]">Timestamped Event Trail for Fees, Marks & Logins</div>
                </div>
              </div>
              <span className="px-3 py-1 bg-amber-500/20 text-amber-300 rounded-full font-bold text-[10px]">Audit Logged</span>
            </div>
          </div>
        </div>
      </section>

      {/* Security Pillars Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 py-8">
        <div className="text-center space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full">
            Core Security Controls
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900">Comprehensive Data Governance</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {securityPillars.map((p, idx) => {
            const IconComp = p.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-slate-200 shadow-card space-y-3 text-left"
              >
                <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600 w-fit border border-emerald-100">
                  <IconComp className="w-6 h-6" />
                </div>

                <h3 className="text-base font-bold text-slate-900">{p.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  {p.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8">
        <div className="p-10 rounded-3xl bg-slate-900 text-white space-y-4 shadow-xl">
          <h2 className="text-3xl font-extrabold">Discuss Your School's Compliance & Data Needs</h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto font-medium">
            Schedule a session with our IT architecture team to review data privacy and tenant setup.
          </p>
          <button
            onClick={handleDemoClick}
            className="px-8 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer transition-all inline-flex items-center gap-2"
          >
            <span>Request Security Walkthrough</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

    </div>
  );
}
