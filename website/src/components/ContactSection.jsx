import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, ExternalLink, CheckCircle2, ShieldCheck, Building2 } from 'lucide-react';

export default function ContactSection() {
  const [sent, setSent] = useState(false);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="contact" className="py-24 bg-slate-950 relative border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 text-left">
          
          {/* Left Column: Contact Information & Devdhara Link */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-bold uppercase tracking-wider">
              <Building2 className="w-3.5 h-3.5" />
              <span>Get In Touch</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Let’s Talk About <br />
              <span className="text-gradient-primary">Your School’s Needs</span>
            </h2>

            <p className="text-slate-400 text-sm leading-relaxed">
              Have questions about Greenwood ERP, pricing plans, or data migration? Contact our engineering team at <strong>Devdhara Technology</strong>.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
                <div className="p-3 bg-indigo-500/20 text-indigo-400 rounded-xl border border-indigo-500/30 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase">Email Support</div>
                  <a href="mailto:support@devdhar.in" className="text-sm font-bold text-white hover:text-indigo-400 font-mono">support@devdhar.in</a>
                  <p className="text-[11px] text-slate-500">Fast response within 2 business hours</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
                <div className="p-3 bg-sky-500/20 text-sky-400 rounded-xl border border-sky-500/30 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase">Sales & Inquiry Hotline</div>
                  <a href="tel:+919876543210" className="text-sm font-bold text-white hover:text-sky-400 font-mono">+91 98765 43210 / +91 74125 89630</a>
                  <p className="text-[11px] text-slate-500">Mon - Sat: 9:00 AM to 7:00 PM IST</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
                <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-xl border border-emerald-500/30 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase">Devdhara Headquarters</div>
                  <div className="text-xs font-semibold text-white">Devdhara Technology Pvt. Ltd.</div>
                  <a
                    href="https://devdhar.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-sky-400 font-mono font-bold hover:underline flex items-center gap-1 mt-0.5"
                  >
                    https://devdhar.in <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-2xl space-y-6">
              {!sent ? (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <h3 className="text-xl font-black text-white">Send Us A Message</h3>
                    <p className="text-xs text-slate-400">Our sales and technical team will get back to you within 2 hours.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Your Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs font-semibold text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="john@school.com"
                        className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs font-semibold text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase mb-1">School Name & Role</label>
                    <input
                      type="text"
                      placeholder="e.g. Greenwood Public School - Trustee"
                      className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs font-semibold text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Message / Requirements *</label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Tell us about your school size, current setup, and specific ERP requirements..."
                      className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs font-semibold text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-indigo-600 via-indigo-500 to-sky-500 hover:from-indigo-500 hover:to-sky-400 text-white font-black text-xs uppercase tracking-wider rounded-2xl shadow-xl shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message To Devdhara Team</span>
                  </button>
                </form>
              ) : (
                <div className="py-12 text-center space-y-4">
                  <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 rounded-2xl border border-emerald-500/30 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-black text-white">Message Sent Successfully!</h3>
                  <p className="text-xs text-slate-300 max-w-sm mx-auto">
                    Thank you for reaching out to Devdhara Technology (`devdhar.in`). Our product specialist will reply to your email shortly.
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

      </div>
    </section>
  );
}
