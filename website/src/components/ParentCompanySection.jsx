import React from 'react';
import { Building2, ExternalLink, ShieldCheck, Cpu, Globe, Rocket, CheckCircle2, Lock } from 'lucide-react';

export default function ParentCompanySection() {
  return (
    <section id="about-devdhara" className="py-20 bg-slate-900/60 relative border-y border-slate-800/80">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Mission & Text */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-300 text-xs font-bold">
              <Building2 className="w-3.5 h-3.5" />
              <span>Parent Company & Engineering Excellence</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight">
              Crafted With Precision By <br />
              <span className="text-gradient-primary">Devdhara Technology</span>
            </h2>

            <p className="text-slate-300 text-base leading-relaxed">
              At <strong>Devdhara Technology</strong>, our mission is to build robust, scalable, and intuitive software products that empower educational institutions. <strong>Greenwood ERP</strong> is our flagship school operating system engineered to eliminate administrative friction and digitize academic workflows.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Enterprise Security</span>
                </div>
                <p className="text-xs text-slate-400">Bank-grade data encryption, role-based controls, and automated daily backups.</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-sky-400 font-bold text-sm">
                  <Cpu className="w-4 h-4" />
                  <span>High Speed Performance</span>
                </div>
                <p className="text-xs text-slate-400">Sub-second page response times and instant report card PDF downloads.</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                  <Globe className="w-4 h-4" />
                  <span>Cloud Accessibility</span>
                </div>
                <p className="text-xs text-slate-400">Access from anywhere on desktop, tablet, or smartphone without installation.</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-purple-400 font-bold text-sm">
                  <Rocket className="w-4 h-4" />
                  <span>Continuous Innovation</span>
                </div>
                <p className="text-xs text-slate-400">Regular updates, feature upgrades, and free technical support included.</p>
              </div>
            </div>

            <div className="pt-4">
              <a
                href="https://devdhar.in"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition-all shadow-lg hover:border-indigo-500/50 group"
              >
                <span>Visit Main Company Site: devdhar.in</span>
                <ExternalLink className="w-4 h-4 text-sky-400 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </div>

          {/* Right Column: Devdhara Technology Card */}
          <div className="lg:col-span-5">
            <div className="p-8 rounded-3xl bg-gradient-to-br from-indigo-950/90 via-slate-900 to-sky-950/80 border border-indigo-500/30 shadow-2xl space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-400 to-indigo-600 flex items-center justify-center shadow-md">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white">Devdhara Technology</h3>
                  <a
                    href="https://devdhar.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-sky-400 font-mono font-bold hover:underline flex items-center gap-1"
                  >
                    https://devdhar.in <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <div className="space-y-3 text-xs text-slate-300">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Authorized Partner</strong> for K-12 Digital School Transformations.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Dedicated Onboarding Team</strong> to import student data from your existing software.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Zero Downtime Architecture</strong> guaranteeing smooth exam and fee periods.</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1 text-left">
                <div className="text-[11px] font-bold text-slate-400 uppercase">Headquarters</div>
                <div className="text-xs font-semibold text-white">Devdhara Technology Pvt. Ltd.</div>
                <div className="text-[11px] text-slate-400">Official Tech Site: <a href="https://devdhar.in" target="_blank" rel="noopener noreferrer" className="text-sky-400 font-mono underline">devdhar.in</a></div>
              </div>

              <a
                href="https://devdhar.in"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-sky-600 hover:from-indigo-500 hover:to-sky-500 text-white font-black text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition-all"
              >
                <span>Learn More At devdhar.in</span>
                <ExternalLink className="w-4 h-4" />
              </a>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
