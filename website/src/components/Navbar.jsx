import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Shield, Menu, X, ArrowRight, Sparkles } from 'lucide-react';

export default function Navbar({ onOpenTrialModal }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Features', path: '/features' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 shadow-2xl py-3.5' 
        : 'bg-slate-950/40 backdrop-blur-xs border-b border-slate-900/40 py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-sky-400 p-0.5 shadow-lg shadow-indigo-600/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Shield className="w-5 h-5 text-indigo-400" />
              </div>
            </div>
            <div className="text-left">
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-black tracking-tight text-white font-['Outfit']">GREENWOOD</span>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">ERP</span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium tracking-wide">School Management Platform</p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-full border border-slate-800/80 backdrop-blur-md">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) =>
                  `px-4 py-1.5 text-xs font-semibold rounded-full transition-all ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </div>

          {/* Desktop CTA Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/demo"
              className="px-4 py-2 text-xs font-bold text-slate-300 hover:text-white bg-slate-900/90 hover:bg-slate-800 border border-slate-800 rounded-xl transition-all"
            >
              Book Demo
            </Link>

            <button
              onClick={onOpenTrialModal || (() => navigate('/demo'))}
              className="px-4.5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-lg shadow-indigo-600/25 hover:shadow-indigo-500/40 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Start Free Trial</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-400 hover:text-white bg-slate-900 rounded-xl border border-slate-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 p-5 bg-slate-900/95 border border-slate-800 rounded-2xl backdrop-blur-xl shadow-2xl space-y-3 text-left">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-2.5 rounded-xl text-sm font-semibold ${
                    isActive ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:bg-slate-800'
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}

            <div className="pt-3 border-t border-slate-800 space-y-2">
              <Link
                to="/demo"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full py-2.5 text-center text-xs font-bold text-slate-200 bg-slate-800 border border-slate-700 rounded-xl"
              >
                Book a Live Demo
              </Link>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenTrialModal) onOpenTrialModal();
                  else navigate('/demo');
                }}
                className="w-full py-3 text-xs font-bold text-white bg-indigo-600 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Start Free 14-Day Trial</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
