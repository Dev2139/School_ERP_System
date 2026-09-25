import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, ShieldCheck, Building2, ExternalLink } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    school: '',
    email: '',
    phone: '',
    role: 'Principal',
    students: '300-1000',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="pt-32 pb-24 space-y-16 text-left bg-white">
      
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-200 px-3.5 py-1 rounded-full">
          Get In Touch
        </span>
        <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight font-['Outfit']">
          Let's Talk About Your School.
        </h1>
        <p className="text-slate-600 text-base max-w-2xl mx-auto">
          Get in touch with our ed-tech specialists at Devdhara Technologies to explore Greenwood ERP capabilities, schedule a demonstration, or discuss your institutional requirements.
        </p>
      </section>

      {/* Split Layout: Contact Information (Left) vs Request Demo Form (Right) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Contact Information */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-xl bg-slate-900 text-white space-y-6 shadow-md">
              <div className="space-y-1">
                <div className="text-xs font-bold uppercase tracking-wider text-sky-400">Devdhara Technologies</div>
                <h3 className="text-2xl font-black font-['Outfit']">Corporate Headquarters</h3>
              </div>

              <div className="space-y-4 text-xs text-slate-300">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Devdhara Technologies Pvt. Ltd.</strong><br />
                    Ahmedabad - 380015, GUJARAT, INDIA
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-white font-bold">Phone Support</div>
                    <div className="font-mono text-slate-300">+91 6354236105 / +91 9558787386</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-white font-bold">Email Inquiries</div>
                    <div className="font-mono text-slate-300">info@devdhar.in</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Building2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-white font-bold">Official Website</div>
                    <a href="https://devdhar.in" target="_blank" rel="noopener noreferrer" className="text-sky-400 font-mono hover:underline inline-flex items-center gap-1">
                      devdhar.in <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-400">
                Our support team is available Monday to Saturday: 9:00 AM to 7:00 PM IST.
              </div>
            </div>
          </div>

          {/* Right Column: Clean Form */}
          <div className="lg:col-span-7">
            <div className="p-8 rounded-xl bg-white border border-slate-200 shadow-card space-y-6">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="border-b border-slate-100 pb-3">
                    <h3 className="text-xl font-bold text-slate-900 font-['Outfit']">Request a Product Demo</h3>
                    <p className="text-xs text-slate-500">Fill in the details below and our team will get in touch to schedule a walk-through.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Your Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Dr. Rajesh Mehta"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">School / Institution *</label>
                      <input
                        type="text"
                        required
                        placeholder="Greenwood Public School"
                        value={formData.school}
                        onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
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
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
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
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Your Role *</label>
                      <select
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                      >
                        <option value="Principal">Principal / Director</option>
                        <option value="Trustee">Trustee / Management</option>
                        <option value="Administrator">School Administrator</option>
                        <option value="Accountant">Head Accountant</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Number of Students</label>
                      <select
                        value={formData.students}
                        onChange={(e) => setFormData({ ...formData, students: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                      >
                        <option value="<300">Under 300 Students</option>
                        <option value="300-1000">300 – 1,000 Students</option>
                        <option value="1000+">1,000+ Students (Group / Multi-branch)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Message / Requirements</label>
                    <textarea
                      rows={3}
                      placeholder="Tell us about your school setup and specific requirements..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-slate-900 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-sm cursor-pointer transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Demo Request</span>
                  </button>
                </form>
              ) : (
                <div className="py-12 text-center space-y-4">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Demo Request Received!</h3>
                  <p className="text-xs text-slate-600 max-w-sm mx-auto">
                    Thank you, <strong>{formData.name}</strong>. Our ed-tech representative from Devdhara Technologies will contact you shortly to schedule your walk-through.
                  </p>
                </div>
              )}
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
