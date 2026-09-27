import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, ArrowUp, ShieldCheck, Mail, Phone, MapPin } from 'lucide-react';
import ScholarGridLogo from './ScholarGridLogo';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-300 text-xs text-left border-t border-slate-800/80 font-['Plus_Jakarta_Sans']">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-12 gap-10">
        
        {/* Col 1: Product & Identity */}
        <div className="md:col-span-4 space-y-4">
          <ScholarGridLogo isDark={true} />

          <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
            ScholarGrid ERP is the complete operating system for modern schools. Manage admissions, academics, attendance, fees, timetable, communication, and multi-branch operations from one intelligent cloud platform.
          </p>

          <div className="flex items-center gap-2 text-slate-400 text-[11px] pt-1">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Multi-Tenant SaaS Architecture • ISO & Data Isolation Ready</span>
          </div>
        </div>

        {/* Col 2: Platform & Features */}
        <div className="md:col-span-3 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-white">Platform</div>
          <ul className="space-y-2 text-slate-400 font-medium">
            <li><Link to="/platform" className="hover:text-white transition-colors">Platform Overview</Link></li>
            <li><Link to="/features" className="hover:text-white transition-colors">Core Features</Link></li>
            <li><Link to="/roles" className="hover:text-white transition-colors">Role-Based Access</Link></li>
            <li><Link to="/solutions" className="hover:text-white transition-colors">Solutions by Persona</Link></li>
            <li><Link to="/multi-school" className="hover:text-white transition-colors">Multi-School SaaS</Link></li>
          </ul>
        </div>

        {/* Col 3: Product & Pricing */}
        <div className="md:col-span-2 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-white">Company</div>
          <ul className="space-y-2 text-slate-400 font-medium">
            <li><Link to="/about" className="hover:text-white transition-colors">About ScholarGrid</Link></li>
            <li><Link to="/security" className="hover:text-white transition-colors">Security & Trust</Link></li>
            <li><Link to="/pricing" className="hover:text-white transition-colors">Pricing Plans</Link></li>
            <li><Link to="/demo" className="hover:text-white transition-colors">Request a Demo</Link></li>
          </ul>
        </div>

        {/* Col 4: Contact & Support */}
        <div className="md:col-span-3 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-white">Get in Touch</div>
          <p className="text-slate-400 text-xs leading-relaxed">
            Ready to digitize your institution? Speak with our school management specialists today.
          </p>
          <div className="space-y-2 text-slate-300 pt-1 text-[11px]">
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <a href="mailto:demo@scholargrid.com" className="hover:text-white transition-colors font-mono">demo@scholargrid.com</a>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <a href="tel:+916354236105" className="hover:text-white transition-colors font-mono">+91 6354236105</a>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0" />
              <span>Enterprise SaaS Cloud Headquarters</span>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Legal Bar */}
      <div className="border-t border-slate-800/80 py-6 px-4 sm:px-8 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
        <div>
          © {new Date().getFullYear()} <strong>ScholarGrid ERP</strong>. All rights reserved. The Complete Operating System for Modern Schools.
        </div>

        <div className="flex items-center gap-6 font-medium">
          <Link to="/security" className="hover:text-white transition-colors">Security</Link>
          <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          
          <button
            onClick={scrollToTop}
            className="p-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl transition-colors flex items-center justify-center border border-slate-800 cursor-pointer ml-2"
            title="Back to top"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

    </footer>
  );
}
