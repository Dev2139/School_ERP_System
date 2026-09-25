import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, ExternalLink, ShieldCheck, RefreshCw, Layers, Users, BookOpen, CheckCircle2 } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="pt-28 pb-20 space-y-16 text-left">
      
      {/* Header */}
      <section className="bg-gn-hero border-b border-sky-200/80 py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-sky-700 bg-white px-3 py-1 rounded-full border border-sky-200">
            About Our Solution
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            About <span className="text-sky-600">GREENWOOD ERP</span>
          </h1>
          <p className="text-slate-600 text-sm max-w-3xl mx-auto leading-relaxed">
            Greenwood ERP is a full-stack solution for School & Institution Automation developed and supported by Devdhara Technologies.
          </p>
        </div>
      </section>

      {/* Main Narrative Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="p-8 rounded-xl bg-white border border-slate-200 shadow-clean space-y-6">
          
          <h2 className="text-2xl font-black text-slate-900 border-b border-slate-100 pb-3">
            System-Oriented Paperless Automation
          </h2>

          <p className="text-slate-700 text-sm leading-relaxed">
            Greenwood ERP covers all aspects of K-12 Schools, CBSE & ICSE Colleges, and Autonomous Institutes. It integrates all the processes and rules of councils. It helps stakeholders, institutes & systems to interact easily across the campus environment providing a personalized educational experience.
          </p>

          <p className="text-slate-700 text-sm leading-relaxed">
            The primary goal of Greenwood ERP is to help educational institutions become <strong>system-oriented instead of person-oriented</strong> by automating routine tasks, fee counter audits, examination gradebooks, teacher payrolls, and work follow-ups.
          </p>

        </div>
      </section>

      {/* Parent Company Section: Devdhara Technologies */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-xl bg-sky-50/80 border border-sky-200 space-y-6 shadow-2xs">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-sky-200/80 pb-4">
            <div>
              <div className="text-xs font-bold text-sky-700 uppercase">Technology & Engineering Partner</div>
              <h3 className="text-2xl font-black text-slate-900">Devdhara Technologies Pvt. Ltd.</h3>
            </div>
            <a
              href="https://devdhar.in"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-lg shadow-2xs transition-colors inline-flex items-center gap-1.5 shrink-0"
            >
              <span>Visit devdhar.in</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-700">
            <div className="space-y-3">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Domain Knowledge Experts:</strong> Greenwood ERP is developed by academicians and software engineering specialists.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Periodic Technology Upgradations:</strong> Annual technology stack updates for bank-grade security and speed.</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Dedicated Support Team:</strong> Full-stack support engineers located in Rajkot, Gujarat.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Unlimited Custom Services:</strong> Custom module developments and school staff training included.</span>
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
