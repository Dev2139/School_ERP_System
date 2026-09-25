import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { GraduationCap, ChevronDown, Menu, X, ShieldCheck } from 'lucide-react';

export default function Navbar({ onOpenTrialModal }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [modulesDropdownOpen, setModulesDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white shadow-md border-b border-slate-200 py-3' 
        : 'bg-white/95 backdrop-blur-md border-b border-slate-200/80 py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo Brand */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-sky-500 via-sky-400 to-indigo-600 p-0.5 shadow-md group-hover:scale-105 transition-transform flex items-center justify-center">
              <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-sky-600" />
              </div>
            </div>
            <div className="text-left">
              <div className="flex items-center gap-1">
                <span className="text-xl font-black tracking-tight text-sky-600 font-['Outfit']">greenwood</span>
                <span className="text-xl font-bold tracking-tight text-slate-800 font-['Outfit']">erp</span>
              </div>
              <p className="text-[10px] text-slate-500 font-semibold tracking-wide">School Management System</p>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8 text-xs font-bold text-slate-700">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive ? 'text-sky-600 font-black border-b-2 border-sky-600 pb-1' : 'hover:text-sky-600 transition-colors'
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? 'text-sky-600 font-black border-b-2 border-sky-600 pb-1' : 'hover:text-sky-600 transition-colors'
              }
            >
              About
            </NavLink>

            {/* Modules Dropdown */}
            <div className="relative group">
              <NavLink
                to="/features"
                className={({ isActive }) =>
                  `flex items-center gap-1 ${isActive ? 'text-sky-600 font-black border-b-2 border-sky-600 pb-1' : 'hover:text-sky-600 transition-colors'}`
                }
              >
                <span>Modules</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-sky-600 transition-transform group-hover:rotate-180" />
              </NavLink>

              <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 p-2 hidden group-hover:block transition-all text-left z-50">
                <Link to="/features" className="block px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-sky-50 hover:text-sky-700 rounded-lg">
                  📊 All-Subject Master Gradebook Matrix
                </Link>
                <Link to="/features" className="block px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-sky-50 hover:text-sky-700 rounded-lg">
                  💳 Accountant Counter Fee Portal & Receipts
                </Link>
                <Link to="/features" className="block px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-sky-50 hover:text-sky-700 rounded-lg">
                  📅 Class Timetables & Sunday Skip
                </Link>
                <Link to="/features" className="block px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-sky-50 hover:text-sky-700 rounded-lg">
                  🪪 Digital Admit Cards & Hall Tickets
                </Link>
                <Link to="/features" className="block px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-sky-50 hover:text-sky-700 rounded-lg">
                  👥 Faculty Directory & Payroll
                </Link>
              </div>
            </div>

            <NavLink
              to="/pricing"
              className={({ isActive }) =>
                isActive ? 'text-sky-600 font-black border-b-2 border-sky-600 pb-1' : 'hover:text-sky-600 transition-colors'
              }
            >
              Pricing
            </NavLink>

            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive ? 'text-sky-600 font-black border-b-2 border-sky-600 pb-1' : 'hover:text-sky-600 transition-colors'
              }
            >
              Contact Us
            </NavLink>
          </div>

          {/* Top-Right Action Button */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={onOpenTrialModal || (() => navigate('/demo'))}
              className="px-5 py-2.5 bg-slate-700 hover:bg-slate-800 text-white font-bold text-xs rounded-lg shadow-sm transition-all cursor-pointer"
            >
              Request Demo
            </button>
          </div>

          {/* Mobile Toggle Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 bg-slate-100 rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 p-4 bg-white border border-slate-200 rounded-xl shadow-lg space-y-3 text-left">
            <NavLink to="/" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-xs font-bold text-slate-700 hover:text-sky-600">
              Home
            </NavLink>
            <NavLink to="/about" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-xs font-bold text-slate-700 hover:text-sky-600">
              About
            </NavLink>
            <NavLink to="/features" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-xs font-bold text-slate-700 hover:text-sky-600">
              List of Modules
            </NavLink>
            <NavLink to="/pricing" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-xs font-bold text-slate-700 hover:text-sky-600">
              Pricing Plans
            </NavLink>
            <NavLink to="/contact" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-xs font-bold text-slate-700 hover:text-sky-600">
              Contact Us
            </NavLink>
            
            <div className="pt-2 border-t border-slate-100">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenTrialModal) onOpenTrialModal();
                  else navigate('/demo');
                }}
                className="w-full py-2.5 bg-slate-700 text-white font-bold text-xs rounded-lg text-center shadow-sm"
              >
                Request Demo
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
