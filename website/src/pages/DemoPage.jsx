import React, { useState } from 'react';
import { CheckCircle2, ShieldCheck, ArrowRight, Sparkles, Building, Mail, Phone, Users, Clock } from 'lucide-react';

export default function DemoPage() {
  const [formData, setFormData] = useState({
    name: '',
    school: '',
    email: '',
    phone: '',
    role: 'Principal / School Admin',
    students: '300-1000',
    campuses: '1 Campus',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="space-y-16 pb-20 text-left bg-white font-['Plus_Jakarta_Sans']">
      
      {/* Header */}
      <section className="pt-28 pb-16 bg-gradient-to-b from-blue-50/60 via-slate-50 to-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 bg-blue-100/80 px-3.5 py-1.5 rounded-full border border-blue-200">
            Interactive Product Walkthrough
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
            See ScholarGrid ERP <span className="text-gradient-blue">in Action.</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed">
            Schedule a 1-on-1 demonstration customized to your institution's size, student strength, and operational requirements.
          </p>
        </div>
      </section>

      {/* Main Demo Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Form Canvas */}
          <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-slate-200/90 shadow-card space-y-6">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1 pb-2 border-b border-slate-100">
                  <h2 className="text-2xl font-black text-slate-900">Request Your Personal Demonstration</h2>
                  <p className="text-xs text-slate-500 font-medium">Fill in the details below and our ed-tech specialists will contact you within 24 hours.</p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Rajesh Mehta"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">School / Organization *</label>
                    <input
                      type="text"
                      required
                      placeholder="ScholarGrid Academy"
                      value={formData.school}
                      onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Your Role *</label>
                    <select
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    >
                      <option value="Principal / School Admin">Principal / School Admin</option>
                      <option value="Trustee / School Owner">Trustee / School Owner</option>
                      <option value="Head Accountant">Head Accountant</option>
                      <option value="IT Director">IT Director</option>
                      <option value="Senior Teacher">Senior Teacher</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Work Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="principal@school.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 9876543210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Number of Students</label>
                    <select
                      value={formData.students}
                      onChange={(e) => setFormData({ ...formData, students: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    >
                      <option value="<300">Under 300 Students</option>
                      <option value="300-1000">300 – 1,000 Students</option>
                      <option value="1000-3000">1,000 – 3,000 Students</option>
                      <option value="3000+">3,000+ Students (Enterprise)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Number of Campuses</label>
                    <select
                      value={formData.campuses}
                      onChange={(e) => setFormData({ ...formData, campuses: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    >
                      <option value="1 Campus">1 Campus</option>
                      <option value="2-5 Campuses">2 – 5 Campuses</option>
                      <option value="5+ Campuses">5+ Campuses</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Message / Key Requirements</label>
                  <textarea
                    rows="3"
                    placeholder="Tell us about your school's current software setup or key modules you wish to explore..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  ></textarea>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Request a Demo</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="text-[11px] text-slate-400 text-center flex items-center justify-center gap-1.5 pt-1 font-medium">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Your information is protected by ScholarGrid Data Privacy Standards</span>
                </div>
              </form>
            ) : (
              <div className="py-12 text-center space-y-5">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h2 className="text-2xl font-black text-slate-900">Demo Request Confirmed!</h2>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed font-medium">
                    Thank you, <strong>{formData.name}</strong>. Our school technology specialist for <strong>{formData.school}</strong> will reach out via email ({formData.email}) within 24 hours to schedule your live walkthrough.
                  </p>
                </div>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 bg-slate-900 text-white font-bold text-xs rounded-xl shadow-sm hover:bg-slate-800 cursor-pointer"
                >
                  Submit Another Request
                </button>
              </div>
            )}
          </div>

          {/* Right Column: Demo Highlights & SLA Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-slate-900 text-white space-y-6 shadow-xl">
              <h3 className="text-xl font-black">What to Expect During Your Demo</h3>
              
              <div className="space-y-4 text-xs font-medium">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-500/20 text-blue-400 rounded-xl shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-white text-sm">30-Minute Tailored Session</div>
                    <div className="text-slate-400">Walk through live modules configured for your student strength and grade standards.</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-xl shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-white text-sm">Custom Proposal & Pricing</div>
                    <div className="text-slate-400">Receive a clear cost estimate with zero hidden charges.</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-purple-500/20 text-purple-400 rounded-xl shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-white text-sm">48-Hour Rapid Onboarding</div>
                    <div className="text-slate-400">Learn how our team migrates your existing excel rosters into ScholarGrid seamlessly.</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-blue-50 border border-blue-200 text-blue-900 space-y-2 text-xs font-medium">
              <div className="font-bold text-sm">Direct Developer & Support Contact</div>
              <div className="text-slate-700"><strong>Devdhara Technologies Pvt. Ltd.</strong></div>
              <div>HQ: Naroda, Ahmedabad, Gujarat</div>
              <div>Email: <a href="mailto:info@devdhar.in" className="font-bold text-blue-700 underline">info@devdhar.in</a></div>
              <div>Phone: <a href="tel:+916354236105" className="font-bold text-blue-700 font-mono">+91 6354236105</a> • <a href="tel:+919558787386" className="font-bold text-blue-700 font-mono">+91 9558787386</a></div>
              <div>Website: <a href="https://devdhar.in" target="_blank" rel="noopener noreferrer" className="font-bold text-blue-700 underline font-mono">devdhar.in</a></div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
