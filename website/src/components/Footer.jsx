import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, ExternalLink, ArrowUp } from 'lucide-react';

export default function Footer({ onOpenTrialModal }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0d1727] text-white text-xs text-left relative">
      
      {/* Top Banner Bar */}
      <div className="border-b border-slate-800 py-6 px-4 sm:px-8 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-xl sm:text-2xl font-bold tracking-tight">Request demo of <strong className="text-white">GREENWOOD ERP</strong></span>
        </div>
        <button
          onClick={onOpenTrialModal}
          className="px-6 py-2.5 bg-[#00aeef] hover:bg-[#0092c8] text-white font-bold text-xs rounded-md shadow-md transition-all shrink-0 cursor-pointer"
        >
          Request Demo
        </button>
      </div>

      {/* Main 3 Columns Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 grid grid-cols-1 md:grid-cols-12 gap-8 text-slate-300">
        
        {/* Col 1: Contact Us */}
        <div className="md:col-span-4 space-y-3">
          <h4 className="text-sm font-bold text-white uppercase border-b border-slate-700 pb-1.5 w-fit">Contact Us</h4>
          
          <div className="space-y-2 text-xs leading-relaxed text-slate-300 pt-1">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-[#00aeef] shrink-0 mt-0.5" />
              <div>
                <strong className="text-white">Devdhara Technologies Pvt. Ltd.</strong><br />
                Near Kalavad Road, Rajkot - 360005, GUJARAT, INDIA
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <div>
                <div className="text-[11px] font-bold text-slate-400">Office Phone</div>
                <div className="flex items-center gap-1 font-mono text-slate-200">
                  <Phone className="w-3 h-3 text-[#00aeef]" /> +91 - 98765 43210
                </div>
                <div className="flex items-center gap-1 font-mono text-slate-400 text-[11px]">
                  <Mail className="w-3 h-3 text-[#00aeef]" /> info@devdhar.in
                </div>
              </div>

              <div>
                <div className="text-[11px] font-bold text-slate-400">Sales Inquiry</div>
                <div className="flex items-center gap-1 font-mono text-slate-200">
                  <Phone className="w-3 h-3 text-[#00aeef]" /> +91 - 74125 89630
                </div>
                <div className="flex items-center gap-1 font-mono text-slate-400 text-[11px]">
                  <Mail className="w-3 h-3 text-[#00aeef]" /> sales@devdhar.in
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Col 2: About Greenwood ERP */}
        <div className="md:col-span-4 space-y-3">
          <h4 className="text-sm font-bold text-white uppercase border-b border-slate-700 pb-1.5 w-fit">About GREENWOOD ERP</h4>
          <p className="text-xs text-slate-300 leading-relaxed pt-1">
            Greenwood ERP is a full-stack solution for School & Academy Automation which covers all aspects of K-12 Schools & Institutes.
          </p>
          <p className="text-xs text-slate-400 leading-relaxed">
            It integrates all the processes and rules of boards. It is designed especially for small and large schools to build, manage, and extend their digital campus.
          </p>
          <div className="pt-1">
            <a
              href="https://devdhar.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#00aeef] hover:underline font-bold inline-flex items-center gap-1 text-xs"
            >
              Main Company: devdhar.in <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Col 3: Our Mobile Apps */}
        <div className="md:col-span-4 space-y-3">
          <h4 className="text-sm font-bold text-white uppercase border-b border-slate-700 pb-1.5 w-fit">Our Mobile Apps</h4>
          <p className="text-xs text-slate-400">
            Native mobile web applications available for Teachers, Students, and Parents.
          </p>

          <div className="space-y-2 pt-1">
            <div className="p-3 bg-slate-900 border border-slate-700 rounded-lg flex items-center gap-3 hover:border-[#00aeef] transition-colors cursor-pointer w-48">
              <div className="w-6 h-6 rounded bg-emerald-500 flex items-center justify-center font-bold text-white text-xs">▶</div>
              <div>
                <div className="text-[9px] uppercase font-bold text-slate-400">GET IT ON</div>
                <div className="text-xs font-bold text-white">Google Play</div>
              </div>
            </div>

            <div className="p-3 bg-slate-900 border border-slate-700 rounded-lg flex items-center gap-3 hover:border-[#00aeef] transition-colors cursor-pointer w-48">
              <div className="w-6 h-6 rounded bg-sky-400 flex items-center justify-center font-bold text-slate-950 text-xs"></div>
              <div>
                <div className="text-[9px] uppercase font-bold text-slate-400">Download on the</div>
                <div className="text-xs font-bold text-white">App Store</div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Copyright Bar */}
      <div className="border-t border-slate-800/80 py-4 px-4 sm:px-8 max-w-7xl mx-auto flex items-center justify-between text-[11px] text-slate-400">
        <div>
          © <strong>Devdhara Technologies Pvt. Ltd.</strong> 2026. All Rights Reserved.
        </div>

        <button
          onClick={scrollToTop}
          className="p-2 bg-slate-800 hover:bg-slate-700 text-white rounded-md transition-colors flex items-center justify-center"
          title="Scroll to Top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      </div>

    </footer>
  );
}
