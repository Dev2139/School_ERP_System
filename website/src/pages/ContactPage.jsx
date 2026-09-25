import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, ShieldCheck, Building2, Clock } from 'lucide-react';

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="pt-32 pb-24 space-y-16">
      
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold uppercase tracking-wider">
          <Mail className="w-3.5 h-3.5" />
          <span>Contact Our Team</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight">
          We’re Here To Help Your School <span className="text-gradient-primary">Succeed</span>
        </h1>
        <p className="text-slate-400 text-base max-w-2xl mx-auto">
          Have questions about Greenwood ERP features, data migration, or custom pricing? Get in touch with our specialist team.
        </p>
      </section>

      {/* Main Form & Contact Info */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 text-left">
          
          {/* Left Column: Contact Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-indigo-500/20 text-indigo-400 rounded-xl border border-indigo-500/30">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white uppercase">Sales & Inquiry Email</h3>
                  <a href="mailto:sales@greenwooderp.com" className="text-xs font-bold text-indigo-400 font-mono">sales@greenwooderp.com</a>
                </div>
              </div>
              <p className="text-xs text-slate-400">Response within 2 business hours for school inquiries.</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-sky-500/20 text-sky-400 rounded-xl border border-sky-500/30">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white uppercase">Hotline & WhatsApp</h3>
                  <a href="tel:+919876543210" className="text-xs font-bold text-sky-400 font-mono">+91 98765 43210 / +91 74125 89630</a>
                </div>
              </div>
              <p className="text-xs text-slate-400">Available Monday to Saturday: 9:00 AM to 7:00 PM IST.</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-xl border border-emerald-500/30">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white uppercase">Corporate Headquarters</h3>
                  <div className="text-xs font-semibold text-slate-200">Devdhara Technologies Pvt. Ltd.</div>
                  <a href="https://devdhar.in" target="_blank" rel="noopener noreferrer" className="text-xs text-sky-400 font-mono font-bold hover:underline">devdhar.in</a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-8 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-2xl space-y-6">
              {!sent ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <h3 className="text-xl font-black text-white">Send Us A Message</h3>
                    <p className="text-xs text-slate-400">Fill in the details below and our product specialist will reach out to you.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Your Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Dr. Rajesh Mehta"
                        className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs font-semibold text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Work Email *</label>
                      <input
                        type="email"
                        required
                        placeholder="principal@school.com"
                        className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs font-semibold text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Phone / WhatsApp *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 9876543210"
                        className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs font-semibold text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 uppercase mb-1">School Name</label>
                      <input
                        type="text"
                        placeholder="Greenwood Public School"
                        className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs font-semibold text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Message / Requirements *</label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Tell us about your school size, current ERP setup, and specific requirements..."
                      className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs font-semibold text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-indigo-600/30 transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Inquiry</span>
                  </button>
                </form>
              ) : (
                <div className="py-12 text-center space-y-4">
                  <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 rounded-2xl border border-emerald-500/30 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-black text-white">Inquiry Received!</h3>
                  <p className="text-xs text-slate-300 max-w-sm mx-auto">
                    Thank you for reaching out to Greenwood ERP. Our onboarding specialist will contact you shortly.
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="px-6 py-2 bg-slate-800 text-slate-300 font-bold text-xs rounded-xl border border-slate-700"
                  >
                    Send Another Message
                  </button>
                </div>
              )}
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
