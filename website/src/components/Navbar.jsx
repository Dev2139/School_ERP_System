import React, { useState, useEffect } from 'react';
import { Shield, Sparkles, ExternalLink, Menu, X, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function Navbar({ onOpenTrialModal }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80 shadow-2xl py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-sky-400 p-0.5 shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <Shield className="w-5 h-5 text-indigo-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black tracking-tight text-white font-['Outfit']">GREENWOOD</span>
                <span className="text-xs font-black uppercase px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">ERP</span>
              </div>
              <p className="text-[10px] text-slate-400 font-semibold tracking-wide flex items-center gap-1">
                By <a href="https://devdhar.in" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 underline font-bold flex items-center gap-0.5">Devdhara Tech <ExternalLink className="w-2.5 h-2.5 inline" /></a>
              </p>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-300">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#about-devdhara" className="hover:text-white transition-colors flex items-center gap-1">
              About Us
              <span className="text-[10px] bg-slate-800 text-sky-400 px-1.5 py-0.5 rounded font-bold">Devdhara</span>
            </a>
            <a href="#demo" className="hover:text-white transition-colors">Live Preview</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </div>

          {/* CTA Actions */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://devdhar.in"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 text-xs font-bold text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 rounded-xl transition-all flex items-center gap-1.5"
            >
              <span>devdhar.in</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>

            <button
              onClick={onOpenTrialModal}
              className="px-5 py-2.5 text-xs font-black uppercase tracking-wider text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-sky-500 hover:from-indigo-500 hover:to-sky-400 rounded-xl shadow-lg shadow-indigo-600/30 hover:shadow-indigo-500/50 transition-all hover:scale-[1.02] cursor-pointer flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Get Free Trial</span>
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

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 p-5 bg-slate-900/95 border border-slate-800 rounded-2xl backdrop-blur-xl shadow-2xl space-y-4">
            <a href="#features" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-semibold text-slate-200">Features</a>
            <a href="#about-devdhara" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-semibold text-slate-200">About Devdhara Technology</a>
            <a href="#demo" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-semibold text-slate-200">Live Preview</a>
            <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-semibold text-slate-200">Pricing</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-semibold text-slate-200">Contact Us</a>
            
            <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
              <a
                href="https://devdhar.in"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 text-center text-xs font-bold text-slate-300 bg-slate-800 border border-slate-700 rounded-xl flex items-center justify-center gap-1.5"
              >
                <span>Visit devdhar.in</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenTrialModal();
                }}
                className="w-full py-3 text-xs font-black uppercase text-white bg-indigo-600 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30"
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
