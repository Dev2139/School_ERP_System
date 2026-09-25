import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, ArrowUp, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-300 text-xs text-left border-t border-slate-800/80 font-['Plus_Jakarta_Sans']">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-12 gap-10">
        
        {/* Col 1: Product & Parent Identity */}
        <div className="md:col-span-5 space-y-4">
          <Link to="/" className="flex items-center group">
            <img 
              src="https://res.cloudinary.com/dsddldquo/image/upload/v1790362370/zrkwlnckrmkg3jadau6u.png" 
              alt="Greenwood ERP Logo" 
              className="h-11 w-auto object-contain brightness-110 drop-shadow-xs"
            />
          </Link>

          <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
            An intuitive, all-in-one school management operating system designed to bring academics, fee counter collection, gradebook matrices, exam timetables, and teacher payroll into one organized digital environment.
          </p>

          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-400 text-[11px] inline-block">
            <span>An education technology product by </span>
            <a
              href="https://devdhar.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white font-bold hover:text-sky-400 underline inline-flex items-center gap-1 ml-1"
            >
              Devdhara Technologies <ExternalLink className="w-3 h-3 text-sky-400" />
            </a>
          </div>
        </div>

        {/* Col 2: Navigation Links */}
        <div className="md:col-span-3 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-white">Platform Navigation</div>
          <ul className="space-y-2 text-slate-400 font-medium">
            <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><Link to="/about-erp" className="hover:text-white transition-colors">About Greenwood ERP</Link></li>
            <li><Link to="/modules" className="hover:text-white transition-colors">Modules & Capabilities</Link></li>
            <li><Link to="/why-us" className="hover:text-white transition-colors">Why Choose Us</Link></li>
            <li><Link to="/about-devdhara" className="hover:text-white transition-colors">About Devdhara Technologies</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors">Request a Demo</Link></li>
          </ul>
        </div>

        {/* Col 3: Company Info */}
        <div className="md:col-span-4 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-white">Devdhara Technologies</div>
          <p className="text-slate-400 text-xs leading-relaxed">
            Building reliable enterprise SaaS and ed-tech software for educational institutions and growing organizations.
          </p>
          <div className="space-y-2 text-slate-300 pt-1 text-[11px]">
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span>Ahmedabad, Gujarat, India</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <div className="flex gap-2 font-mono">
                <a href="tel:+916354236105" className="hover:text-white transition-colors">+91 6354236105</a>
                <span>•</span>
                <a href="tel:+919558787386" className="hover:text-white transition-colors">+91 9558787386</a>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-sky-400 shrink-0" />
              <a href="mailto:info@devdhar.in" className="hover:text-white transition-colors font-mono">info@devdhar.in</a>
            </div>
            <div className="flex items-center gap-2 pt-0.5">
              <ExternalLink className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
              <a href="https://devdhar.in" target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:underline font-mono">devdhar.in</a>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Legal Bar */}
      <div className="border-t border-slate-800/80 py-6 px-4 sm:px-8 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
        <div>
          © {new Date().getFullYear()} <strong>Greenwood ERP</strong>. All rights reserved. Developed by <a href="https://devdhar.in" target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:underline">Devdhara Technologies Pvt. Ltd.</a>
        </div>

        <button
          onClick={scrollToTop}
          className="p-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl transition-colors flex items-center justify-center border border-slate-800 cursor-pointer"
          title="Back to top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      </div>

    </footer>
  );
}


