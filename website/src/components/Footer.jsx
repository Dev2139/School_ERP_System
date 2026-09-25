import React from 'react';
import { Shield, ExternalLink, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 text-slate-400 text-xs py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 text-left">
          
          {/* Col 1: Brand & Parent Company */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-indigo-600 to-sky-400 p-0.5 shadow-md">
                <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                  <Shield className="w-4 h-4 text-indigo-400" />
                </div>
              </div>
              <span className="text-xl font-black tracking-tight text-white font-['Outfit']">GREENWOOD ERP</span>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              The next-generation all-in-one School Management Software developed by <strong>Devdhara Technology</strong>. Empowering schools with smart Fee Counter, Master Gradebook Matrix, Digital Admit Cards, and Faculty Payroll.
            </p>

            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 inline-block">
              <span className="text-[11px] text-slate-400">Parent Company Official Portal: </span>
              <a
                href="https://devdhar.in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-400 font-mono font-bold hover:underline inline-flex items-center gap-1 ml-1"
              >
                devdhar.in <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-white">ERP Modules</div>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#features" className="hover:text-white transition-colors">Academic Setup & Rooms</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">Class Timetable Scheduler</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">Master Gradebook Matrix</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">Digital Admit Cards</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">Accountant Fee Counter</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">Faculty Payroll & Salary</a></li>
            </ul>
          </div>

          {/* Col 3: Company Links */}
          <div className="md:col-span-4 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-white">Devdhara Technology</div>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#about-devdhara" className="hover:text-white transition-colors">About Devdhara Technology</a></li>
              <li><a href="https://devdhar.in" target="_blank" rel="noopener noreferrer" className="text-sky-400 font-bold hover:underline inline-flex items-center gap-1">devdhar.in <ExternalLink className="w-3 h-3" /></a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Pricing & Plans</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact Support</a></li>
              <li><a href="mailto:support@devdhar.in" className="hover:text-white font-mono">support@devdhar.in</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} <strong>Devdhara Technology Pvt. Ltd.</strong> (<a href="https://devdhar.in" target="_blank" rel="noopener noreferrer" className="text-sky-400 font-mono hover:underline">devdhar.in</a>). All rights reserved.
          </div>
          <div className="flex items-center gap-1">
            <span>Built with precision by</span>
            <a href="https://devdhar.in" target="_blank" rel="noopener noreferrer" className="text-indigo-400 font-bold hover:underline">Devdhara Tech</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
