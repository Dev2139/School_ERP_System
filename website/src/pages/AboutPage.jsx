import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, ExternalLink, ShieldCheck, Cpu, Globe, Rocket, CheckCircle2, Heart, Award } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="pt-32 pb-24 space-y-20">
      
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold uppercase tracking-wider">
          <Building2 className="w-3.5 h-3.5" />
          <span>Our Story & Mission</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight">
          Empowering Educators Through <span className="text-gradient-primary">Smart Technology</span>
        </h1>
        <p className="text-slate-400 text-base max-w-2xl mx-auto">
          Greenwood ERP was engineered with a clear mission: to eliminate manual administrative paperwork and provide K-12 schools with a modern cloud operating system.
        </p>
      </section>

      {/* Parent Company Section: Devdhara Technologies */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-900/60 border border-slate-800 text-left grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 space-y-5">
            <div className="text-xs font-bold uppercase tracking-wider text-sky-400">Parent Company & Technology Partner</div>
            <h2 className="text-3xl font-black text-white">
              Developed & Backed By Devdhara Technologies
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              <strong>Greenwood ERP</strong> is a specialized enterprise product engineered and maintained by <strong>Devdhara Technologies Pvt. Ltd.</strong> We build scalable, high-security SaaS platforms for educational institutions, businesses, and digital enterprises.
            </p>
            <p className="text-slate-400 text-xs leading-relaxed">
              Our engineering team focuses on enterprise data encryption, zero-downtime database architecture, and lightning-fast user interfaces so school administrators can focus on what matters most—delivering high-quality education.
            </p>

            <div className="pt-2">
              <a
                href="https://devdhar.in"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-sky-400 font-mono text-xs font-bold border border-slate-700 transition-all"
              >
                <span>Visit Company Site: devdhar.in</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 font-sans">
                <span className="font-bold text-white">Devdhara Technologies</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded font-bold">VERIFIED SAAS</span>
              </div>
              <div className="space-y-2 text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Cloud Engine Uptime: 99.99%</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Data Backup: Daily Automated Snapshots</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Official Website: devdhar.in</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Core Engineering Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
        <div className="max-w-2xl mx-auto space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-indigo-400">Engineering Principles</div>
          <h2 className="text-3xl font-black text-white">Built On Four Pillars Of Quality</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-3">
            <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-xl w-fit border border-indigo-500/20">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Bank-Grade Security</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Role-based authorization and encrypted API endpoints protect student records and fee data.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-3">
            <div className="p-3 bg-sky-500/10 text-sky-400 rounded-xl w-fit border border-sky-500/20">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Sub-Second Speed</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Fast page loads, instant student search, and rapid PDF report card generation.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-3">
            <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl w-fit border border-emerald-500/20">
              <Globe className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">100% Cloud Access</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Access from any device—Windows, Mac, iPad, or Android—without installing local software.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-3">
            <div className="p-3 bg-purple-500/10 text-purple-400 rounded-xl w-fit border border-purple-500/20">
              <Rocket className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Continuous Innovation</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Regular feature upgrades, new reports, and automated compliance updates included free.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
