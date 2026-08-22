import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { ShieldCheck, LogIn, Sparkles, UserCheck, GraduationCap, Building2, ChevronRight, Briefcase } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('principal@school.com');
  const [password, setPassword] = useState('06102006');
  const [activeCategory, setActiveCategory] = useState('staff'); // 'staff' | 'student'
  const [staffCredentialType, setStaffCredentialType] = useState('principal'); // 'principal' | 'teacher'
  const [loading, setLoading] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const { login } = useAuth();
  const { addToast } = useNotification();
  const navigate = useNavigate();

  // Showcase Carousel Slides
  const slides = [
    {
      image: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1920&q=80',
      title: 'Greenwood International Campus',
      subtitle: 'Modern digital infrastructure for modern school administration and learning excellence.',
    },
    {
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1920&q=80',
      title: 'Interactive Smart Classrooms',
      subtitle: 'Real-time student engagement, live attendance tracking, and digital homework management.',
    },
    {
      image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1920&q=80',
      title: 'Advanced STEM Science Laboratories',
      subtitle: 'Empowering students with world-class practical learning and academic development.',
    },
    {
      image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1920&q=80',
      title: 'Comprehensive Sports & Activities',
      subtitle: 'Building leadership, teamwork, and holistic student growth through athletic excellence.',
    },
  ];

  // Auto-advance slides every 4.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handleCategorySelect = (category) => {
    setActiveCategory(category);
    if (category === 'staff') {
      if (staffCredentialType === 'principal') {
        setEmail('principal@school.com');
      } else {
        setEmail('manu@gmail.com');
      }
      setPassword('06102006');
    } else {
      setEmail('student@school.com');
      setPassword('06102006');
    }
  };

  const handleStaffTypeSelect = (type) => {
    setStaffCredentialType(type);
    if (type === 'principal') {
      setEmail('principal@school.com');
    } else {
      setEmail('manu@gmail.com');
    }
    setPassword('06102006');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await login(email, password);
    setLoading(false);

    if (res?.success) {
      addToast('Welcome back to Greenwood ERP!', 'success');
      const profileId = res.user?.profileId?._id || res.user?.profileId || 'profile';
      const rolePrefix = res.user?.role === 'admin' ? '/admin' : res.user?.role === 'teacher' ? `/teacher/${profileId}` : `/student/${profileId}`;
      navigate(`${rolePrefix}/dashboard`);
    } else {
      addToast(res?.message || 'Login failed. Check credentials.', 'error');
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-slate-950 text-slate-100 overflow-hidden font-sans">
      {/* ------------------------------------------------------------------- */}
      {/* SIDE 1: 25% BREADTH LOGIN SYSTEM FORM */}
      {/* ------------------------------------------------------------------- */}
      <div className="w-full lg:w-[28%] xl:w-[25%] p-6 sm:p-8 flex flex-col justify-between bg-slate-900 border-r border-slate-800 shrink-0 z-20 shadow-2xl relative">
        <div className="space-y-6">
          {/* Header Branding */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-gradient-to-tr from-indigo-600 to-sky-400 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-indigo-500/30">
              G
            </div>
            <div>
              <h1 className="text-xl font-extrabold tracking-tight text-white">Greenwood ERP</h1>
              <p className="text-[11px] text-slate-400 font-medium">School Management SaaS Portal</p>
            </div>
          </div>

          {/* Title Prompt */}
          <div>
            <h2 className="text-lg font-bold text-slate-100">Sign in to your account</h2>
            <p className="text-xs text-slate-400 mt-0.5">Select role portal to access dashboard</p>
          </div>

          {/* 2 MAIN ROLES: STAFF & STUDENT */}
          <div className="space-y-3">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Select User Role
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleCategorySelect('staff')}
                className={`p-3 rounded-2xl border flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  activeCategory === 'staff'
                    ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-xs font-black'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <Briefcase className={`w-5 h-5 ${activeCategory === 'staff' ? 'text-indigo-400' : 'text-slate-500'}`} />
                <span className="text-xs">Staff Login</span>
              </button>

              <button
                type="button"
                onClick={() => handleCategorySelect('student')}
                className={`p-3 rounded-2xl border flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  activeCategory === 'student'
                    ? 'bg-purple-600/20 border-purple-500 text-white shadow-xs font-black'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <GraduationCap className={`w-5 h-5 ${activeCategory === 'student' ? 'text-purple-400' : 'text-slate-500'}`} />
                <span className="text-xs">Student Login</span>
              </button>
            </div>

            {/* STAFF CREDENTIAL DIFFERENTIATION SYSTEM */}
            {activeCategory === 'staff' && (
              <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-2xl space-y-2 animate-in fade-in duration-200">
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Differentiated Credentials:
                </span>
                <div className="grid grid-cols-2 gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleStaffTypeSelect('principal')}
                    className={`px-3 py-1.5 rounded-xl text-[11px] font-bold border transition-all cursor-pointer flex items-center justify-center gap-1 ${
                      staffCredentialType === 'principal'
                        ? 'bg-indigo-600 text-white border-indigo-500'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Building2 className="w-3 h-3" /> Principal
                  </button>
                  <button
                    type="button"
                    onClick={() => handleStaffTypeSelect('teacher')}
                    className={`px-3 py-1.5 rounded-xl text-[11px] font-bold border transition-all cursor-pointer flex items-center justify-center gap-1 ${
                      staffCredentialType === 'teacher'
                        ? 'bg-sky-600 text-white border-sky-500'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <UserCheck className="w-3 h-3" /> Teacher
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Login Form Inputs */}
          <form onSubmit={handleLogin} className="space-y-4 pt-1">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs font-semibold transition-all"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs font-semibold transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold rounded-xl shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all disabled:opacity-50 text-xs mt-3 cursor-pointer"
            >
              <LogIn className="w-4 h-4" />
              <span>{loading ? 'Authenticating...' : 'Sign In to Portal'}</span>
            </button>
          </form>
        </div>

        {/* Footer Security Badge */}
        <div className="pt-6 border-t border-slate-800/80 text-[11px] text-slate-500 flex items-center justify-center gap-1.5 font-medium">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>2-Role System (Staff & Student)</span>
        </div>
      </div>

      {/* ------------------------------------------------------------------- */}
      {/* SIDE 2: 75% BREADTH AUTO-ROTATING IMAGE SHOWCASE CAROUSEL */}
      {/* ------------------------------------------------------------------- */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden bg-slate-950">
        {/* Slides Images with Smooth Crossfade */}
        {slides.map((s, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <img src={s.image} alt={s.title} className="w-full h-full object-cover scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
          </div>
        ))}

        {/* Floating Slide Overlay Information Content */}
        <div className="absolute bottom-12 left-12 right-12 z-20 space-y-4 max-w-2xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-500/20 border border-indigo-400/30 rounded-full text-indigo-300 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            Greenwood School Portal Showcase
          </span>
          <h2 className="text-3xl font-black text-white tracking-tight leading-tight">
            {slides[currentSlide].title}
          </h2>
          <p className="text-sm text-slate-300 font-medium leading-relaxed">
            {slides[currentSlide].subtitle}
          </p>

          {/* Carousel Slide Indicators */}
          <div className="flex items-center gap-2 pt-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  i === currentSlide ? 'w-8 bg-indigo-500' : 'w-2 bg-slate-600/80 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
