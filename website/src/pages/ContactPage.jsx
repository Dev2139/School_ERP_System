import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Building2, ExternalLink } from 'lucide-react';

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="pt-28 pb-20 space-y-16 text-left">
      
      {/* Header */}
      <section className="bg-gn-hero border-b border-sky-200/80 py-16 text-center">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-sky-700 bg-white px-3 py-1 rounded-full border border-sky-200">
            Get In Touch
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Contact Us – <span className="text-sky-600">Devdhara Technologies</span>
          </h1>
          <p className="text-slate-600 text-sm max-w-xl mx-auto">
            Our engineering and support team in Rajkot, Gujarat is ready to assist your institution.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Office Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-clean space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-bold text-slate-900 uppercase">Headquarters</h3>
                  <p className="text-xs text-slate-700 font-semibold mt-0.5">Devdhara Technologies Pvt. Ltd.</p>
                  <p className="text-xs text-slate-500">Near Kalavad Road, Rajkot - 360005, GUJARAT, INDIA</p>
                  <a href="https://devdhar.in" target="_blank" rel="noopener noreferrer" className="text-xs text-sky-600 font-bold hover:underline inline-flex items-center gap-1 mt-1">
                    devdhar.in <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-clean space-y-4">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-bold text-slate-900 uppercase">Phone & WhatsApp</h3>
                  <div className="text-xs font-bold text-slate-800 font-mono mt-0.5">Office: +91 - 98765 43210</div>
                  <div className="text-xs font-bold text-slate-800 font-mono">Sales: +91 - 74125 89630</div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-clean space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-bold text-slate-900 uppercase">Email Support</h3>
                  <div className="text-xs font-bold text-sky-600 font-mono mt-0.5">info@devdhar.in</div>
                  <div className="text-xs font-bold text-sky-600 font-mono">sales@devdhar.in</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-8 rounded-xl bg-white border border-slate-200 shadow-clean space-y-4">
              {!sent ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="border-b border-slate-100 pb-3">
                    <h3 className="text-xl font-bold text-slate-900">Request Information / Demo</h3>
                    <p className="text-xs text-slate-500">Fill in your requirements and our team will call you back within 2 hours.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Your Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="info@school.com"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 9876543210"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">School Name</label>
                      <input
                        type="text"
                        placeholder="Greenwood Public School"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Message *</label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Tell us about your school size and specific ERP needs..."
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-slate-700 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-sm cursor-pointer transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Inquiry To Devdhara Team</span>
                  </button>
                </form>
              ) : (
                <div className="py-12 text-center space-y-4">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Inquiry Submitted Successfully!</h3>
                  <p className="text-xs text-slate-600">Our representative from Devdhara Technologies will contact you shortly.</p>
                </div>
              )}
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
