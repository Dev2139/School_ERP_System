import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, ArrowUp, ShieldCheck, Mail, Phone, MapPin, Globe } from 'lucide-react';
import ScholarGridLogo from './ScholarGridLogo';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-300 text-xs text-left border-t border-slate-800/80 font-['Plus_Jakarta_Sans']">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-12 gap-10">
        
        {/* Col 1: Product & Parent Company Identity */}
        <div className="md:col-span-5 space-y-4">
          <ScholarGridLogo isDark={true} />

          <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
            ScholarGrid ERP is the complete operating system for modern schools. Manage admissions, academics, attendance, fees, timetable, communication, and multi-branch operations from one intelligent cloud platform.
          </p>

          <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-slate-300 text-[11px] space-y-1.5 max-w-sm">
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Parent Company</div>
            <div className="font-bold text-white flex items-center gap-1.5">
              <span>Devdhara Technologies Pvt. Ltd.</span>
              <a
                href="https://devdhar.in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline inline-flex items-center gap-0.5 ml-1"
              >
                devdhar.in <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <div className="text-slate-400 text-[10px]">HQ: Naroda, Ahmedabad, Gujarat, India</div>
          </div>
        </div>

        {/* Col 2: Platform Navigation */}
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

        {/* Col 3: Company & Support */}
        <div className="md:col-span-4 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-white">Devdhara Technologies Contact</div>
          <p className="text-slate-400 text-xs leading-relaxed">
            Building reliable enterprise SaaS and ed-tech software for educational institutions and growing organizations.
          </p>

          <div className="space-y-2 text-slate-300 pt-1 text-[11px]">
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span>Naroda, Ahmedabad, Gujarat, India</span>
            </div>

            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <div className="flex items-center gap-2 font-mono">
                <a href="tel:+916354236105" className="hover:text-white transition-colors">+91 6354236105</a>
                <span className="text-slate-600">•</span>
                <a href="tel:+919558787386" className="hover:text-white transition-colors">+91 9558787386</a>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-sky-400 shrink-0" />
              <a href="mailto:info@devdhar.in" className="hover:text-white transition-colors font-mono">info@devdhar.in</a>
            </div>

            <div className="flex items-center gap-2">
              <Globe className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
              <a href="https://devdhar.in" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline font-mono">
                devdhar.in
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Legal Bar */}
      <div className="border-t border-slate-800/80 py-6 px-4 sm:px-8 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
        <div>
          © {new Date().getFullYear()} <strong>ScholarGrid ERP</strong>. Developed by <a href="https://devdhar.in" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline font-bold">Devdhara Technologies Pvt. Ltd.</a> (Naroda, Ahmedabad).
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
