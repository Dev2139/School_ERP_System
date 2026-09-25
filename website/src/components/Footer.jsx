import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 text-slate-400 text-xs py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 text-left">
          
          {/* Col 1: Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-sky-400 p-0.5 shadow-md">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Shield className="w-4 h-4 text-indigo-400" />
                </div>
              </div>
              <span className="text-xl font-black tracking-tight text-white font-['Outfit']">GREENWOOD ERP</span>
            </Link>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              The modern, cloud-native School Operating System. Unifying Fee Collection, Master All-Subject Gradebooks, Digital Admit Cards, Class Timetables, and Faculty Payroll into one seamless platform.
            </p>

            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 inline-block">
              <span className="text-[11px] text-slate-400">Developed & Backed by </span>
              <a
                href="https://devdhar.in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-400 font-bold hover:underline inline-flex items-center gap-1 ml-1"
              >
                Devdhara Technologies <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-2 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-white">Platform</div>
            <ul className="space-y-2 text-slate-400">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/features" className="hover:text-white transition-colors">All Features</Link></li>
              <li><Link to="/pricing" className="hover:text-white transition-colors">Pricing & Plans</Link></li>
              <li><Link to="/demo" className="hover:text-white transition-colors">Interactive Demo</Link></li>
            </ul>
          </div>

          {/* Col 3: Modules */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-white">Core Modules</div>
            <ul className="space-y-2 text-slate-400">
              <li><Link to="/features" className="hover:text-white transition-colors">All-Subject Master Gradebook</Link></li>
              <li><Link to="/features" className="hover:text-white transition-colors">Accountant Fee Counter Portal</Link></li>
              <li><Link to="/features" className="hover:text-white transition-colors">Class Timetable & Sunday Skip</Link></li>
              <li><Link to="/features" className="hover:text-white transition-colors">Digital Admit Cards & Reports</Link></li>
              <li><Link to="/features" className="hover:text-white transition-colors">Faculty Directory & Payroll</Link></li>
            </ul>
          </div>

          {/* Col 4: Company & Support */}
          <div className="md:col-span-2 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-white">Company</div>
            <ul className="space-y-2 text-slate-400">
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Support</Link></li>
              <li><a href="https://devdhar.in" target="_blank" rel="noopener noreferrer" className="text-sky-400 font-bold hover:underline inline-flex items-center gap-1">devdhar.in <ExternalLink className="w-3 h-3" /></a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} <strong>Greenwood ERP</strong>. All rights reserved. Built by <a href="https://devdhar.in" target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:underline">Devdhara Technologies Pvt. Ltd.</a>
          </div>
          <div className="flex gap-6">
            <Link to="/about" className="hover:text-slate-300">Privacy Policy</Link>
            <Link to="/about" className="hover:text-slate-300">Terms of Service</Link>
            <Link to="/contact" className="hover:text-slate-300">Security SLA</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
