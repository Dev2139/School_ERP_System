import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, ExternalLink, ArrowUp, Heart } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 text-xs text-left relative border-t border-slate-900">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-12 gap-10">
        
        {/* Col 1: Brand Info */}
        <div className="md:col-span-5 space-y-4">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-400 p-0.5 shadow-md">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Shield className="w-4.5 h-4.5 text-blue-400" />
              </div>
            </div>
            <span className="text-xl font-black tracking-tight text-white font-['Outfit']">GREENWOOD ERP</span>
          </Link>

          <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
            The next-generation School Operating System. Unifying Fee Counters, Master All-Subject Gradebook Matrices, Digital Admit Cards, Class Timetables, and Teacher Payroll in one cloud platform.
          </p>

          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800/80 inline-block">
            <span className="text-[11px] text-slate-400">Engineered & Maintained by </span>
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

        {/* Col 2: ERP Modules */}
        <div className="md:col-span-3 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-white font-['Outfit']">Core ERP Modules</div>
          <ul className="space-y-2 text-slate-400">
            <li><Link to="/features" className="hover:text-white transition-colors">Master Gradebook Matrix</Link></li>
            <li><Link to="/features" className="hover:text-white transition-colors">Accountant Counter Fee Portal</Link></li>
            <li><Link to="/features" className="hover:text-white transition-colors">Class Timetable & Sunday Skip</Link></li>
            <li><Link to="/features" className="hover:text-white transition-colors">Digital Admit Cards & Reports</Link></li>
            <li><Link to="/features" className="hover:text-white transition-colors">Faculty Directory & Payroll</Link></li>
            <li><Link to="/features" className="hover:text-white transition-colors">Subject Homework Portal</Link></li>
          </ul>
        </div>

        {/* Col 3: Company */}
        <div className="md:col-span-2 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-white font-['Outfit']">Company</div>
          <ul className="space-y-2 text-slate-400">
            <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link to="/pricing" className="hover:text-white transition-colors">Pricing Plans</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors">Contact Support</Link></li>
            <li><Link to="/demo" className="hover:text-white transition-colors">Book a Demo</Link></li>
            <li><a href="https://devdhar.in" target="_blank" rel="noopener noreferrer" className="text-sky-400 font-bold hover:underline inline-flex items-center gap-1">devdhar.in <ExternalLink className="w-3 h-3" /></a></li>
          </ul>
        </div>

        {/* Col 4: Trust & SLA */}
        <div className="md:col-span-2 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-white font-['Outfit']">Trust & Security</div>
          <ul className="space-y-2 text-slate-400 text-[11px]">
            <li className="text-emerald-400 font-semibold">✓ 99.99% Cloud SLA</li>
            <li className="text-slate-400">✓ Bank SSL Data Encryption</li>
            <li className="text-slate-400">✓ Daily Cloud Backups</li>
            <li className="text-slate-400">✓ Role-Based Access Control</li>
            <li className="text-slate-400">✓ 24/7 Priority Support</li>
          </ul>
        </div>

      </div>

      {/* Bottom Copyright Bar */}
      <div className="border-t border-slate-900 py-6 px-4 sm:px-8 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
        <div>
          © {new Date().getFullYear()} <strong>Greenwood ERP</strong>. All rights reserved. Developed by <a href="https://devdhar.in" target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:underline">Devdhara Technologies Pvt. Ltd.</a>
        </div>

        <button
          onClick={scrollToTop}
          className="p-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg transition-colors flex items-center justify-center cursor-pointer border border-slate-800"
          title="Back to top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      </div>

    </footer>
  );
}
