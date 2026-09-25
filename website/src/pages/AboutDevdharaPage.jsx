import React from 'react';
import { ExternalLink, ShieldCheck, Building2, CheckCircle2, ArrowRight, MapPin, Phone, Mail } from 'lucide-react';

export default function AboutDevdharaPage() {
  return (
    <div className="pt-32 pb-24 space-y-20 text-left bg-white">
      
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-200 px-3.5 py-1 rounded-full">
          Corporate Identity & Engineering Team
        </span>
        <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight font-['Outfit']">
          About Devdhara Technologies
        </h1>
        <p className="text-slate-600 text-base max-w-2xl mx-auto">
          An Ahmedabad-based technology company building reliable enterprise SaaS & educational software platforms.
        </p>
      </section>

      {/* Hero Visual + Hierarchy Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Engineering Team Image */}
          <div className="lg:col-span-6 rounded-2xl overflow-hidden border border-slate-200 shadow-md">
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80" 
              alt="Devdhara Technologies Engineering Team"
              className="w-full h-80 object-cover object-center" 
            />
            <div className="p-4 bg-slate-900 text-white text-xs flex justify-between items-center">
              <span className="font-semibold">Devdhara Technologies Headquarters • Ahmedabad</span>
              <span className="text-sky-400 font-mono text-[11px]">devdhar.in</span>
            </div>
          </div>

          {/* Relationship Hierarchy Card Visual */}
          <div className="lg:col-span-6 p-8 rounded-2xl bg-slate-900 text-white shadow-xl text-center space-y-6">
            <div className="text-xs font-bold uppercase tracking-wider text-sky-400">Institutional Product Hierarchy</div>
            
            <div className="flex flex-col items-center justify-center gap-3 font-mono text-sm">
              <div className="px-6 py-3 bg-slate-800 rounded-lg border border-slate-700 font-bold text-white flex items-center gap-2">
                <Building2 className="w-4 h-4 text-sky-400" />
                <span>Devdhara Technologies Pvt. Ltd. (devdhar.in)</span>
              </div>

              <div className="text-sky-400 text-lg font-bold">↓</div>

              <div className="px-6 py-3 bg-blue-600 rounded-lg font-black text-white shadow-md">
                Greenwood ERP Platform
              </div>

              <div className="text-sky-400 text-lg font-bold">↓</div>

              <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-sans font-semibold text-slate-300">
                <span className="px-3 py-1 bg-slate-800 rounded border border-slate-700">Schools & Management</span>
                <span>•</span>
                <span className="px-3 py-1 bg-slate-800 rounded border border-slate-700">Administrators</span>
                <span>•</span>
                <span className="px-3 py-1 bg-slate-800 rounded border border-slate-700">Teachers</span>
                <span>•</span>
                <span className="px-3 py-1 bg-slate-800 rounded border border-slate-700">Students</span>
                <span>•</span>
                <span className="px-3 py-1 bg-slate-800 rounded border border-slate-700">Parents</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Main Company Sections */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section 1: About Devdhara Technologies */}
        <div className="p-8 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
          <h2 className="text-2xl font-black text-slate-900 font-['Outfit']">About Devdhara Technologies</h2>
          <p className="text-slate-700 text-sm leading-relaxed">
            Devdhara Technologies Pvt. Ltd. (official portal: <a href="https://devdhar.in" target="_blank" rel="noopener noreferrer" className="text-blue-700 font-bold hover:underline">devdhar.in</a>) is an <strong>Ahmedabad-based software engineering and technology organization</strong> in Gujarat, India. We specialize in building robust SaaS products, enterprise management portals, and educational operating systems designed for institution-wide reliability.
          </p>
          <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-slate-700">
            <div className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-blue-700" /> Ahmedabad, Gujarat, India</div>
            <div className="flex items-center gap-1.5"><Phone className="w-4 h-4 text-emerald-600" /> +91 6354236105 / +91 9558787386</div>
            <div className="flex items-center gap-1.5"><Mail className="w-4 h-4 text-sky-600" /> info@devdhar.in</div>
          </div>
        </div>

        {/* Section 2: Our Approach */}
        <div className="p-8 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
          <h2 className="text-2xl font-black text-slate-900 font-['Outfit']">Our Approach</h2>
          <p className="text-slate-700 text-sm leading-relaxed">
            Our software engineering methodology centers on clarity, practical utility, and long-term data integrity. We build systems that solve real operational bottlenecks rather than adding unnecessary technical bloat. Every system we deploy undergoes thorough quality assurance to ensure high uptime and security compliance.
          </p>
        </div>

        {/* Section 3: Why We Built This ERP */}
        <div className="p-8 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
          <h2 className="text-2xl font-black text-slate-900 font-['Outfit']">Why We Built Greenwood ERP</h2>
          <p className="text-slate-700 text-sm leading-relaxed">
            Having observed K-12 schools struggling with manual fee paper receipts, isolated mark sheets, and communication breakdowns between departments, we designed Greenwood ERP to connect all aspects of school administration into one unified operating system.
          </p>
        </div>

        {/* Section 4: Our Vision */}
        <div className="p-8 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
          <h2 className="text-2xl font-black text-slate-900 font-['Outfit']">Our Vision</h2>
          <p className="text-slate-700 text-sm leading-relaxed">
            Our vision is to empower educational institutions across India to transition from manual, person-dependent routines into system-oriented digital environments where information is organized, accessible, and securely managed.
          </p>
          <div className="pt-2">
            <a
              href="https://devdhar.in"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white font-bold text-xs rounded-lg hover:bg-blue-700 transition-colors"
            >
              <span>Visit Official Corporate Website: devdhar.in</span>
              <ExternalLink className="w-3.5 h-3.5 text-sky-400" />
            </a>
          </div>
        </div>

      </section>

    </div>
  );
}

