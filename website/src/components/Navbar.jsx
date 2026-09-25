import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Menu, X, ArrowRight, Sparkles } from 'lucide-react';

export default function Navbar({ onOpenDemoModal }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About ERP', path: '/about-erp' },
    { name: 'Modules', path: '/modules' },
    { name: 'Why Us', path: '/why-us' },
    { name: 'About Devdhara', path: '/about-devdhara' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/95 backdrop-blur-xl border-b border-slate-200/80 shadow-sm py-3' 
        : 'bg-white/90 backdrop-blur-md border-b border-slate-100 py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Greenwood ERP Logo Image Only */}
          <Link to="/" className="flex items-center group">
            <img 
              src="https://res.cloudinary.com/dsddldquo/image/upload/v1790362370/zrkwlnckrmkg3jadau6u.png" 
              alt="Greenwood ERP Logo" 
              className="h-10 sm:h-11 w-auto object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-xs"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-7 text-xs font-bold text-slate-600">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) =>
                  `transition-all py-1.5 relative ${
                    isActive
                      ? 'text-blue-700 font-extrabold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-blue-600 after:rounded-full'
                      : 'hover:text-slate-900'
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </div>

          {/* Primary CTA Button */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={onOpenDemoModal || (() => navigate('/contact'))}
              className="px-5 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl shadow-md shadow-blue-500/15 hover:shadow-lg hover:shadow-blue-500/25 active:scale-[0.98] transition-all cursor-pointer flex items-center gap-2"
            >
              <span>Request a Demo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Navigation Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 p-4 bg-white border border-slate-200/90 rounded-2xl shadow-xl space-y-2 text-left animate-fadeIn">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-3.5 py-2.5 rounded-xl text-xs font-bold ${
                    isActive ? 'bg-blue-50 text-blue-700 font-extrabold' : 'text-slate-700 hover:bg-slate-50'
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}

            <div className="pt-3 border-t border-slate-100">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenDemoModal) onOpenDemoModal();
                  else navigate('/contact');
                }}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs rounded-xl shadow-md text-center flex items-center justify-center gap-2"
              >
                <span>Request a Demo</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

