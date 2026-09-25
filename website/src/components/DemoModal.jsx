import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, ArrowRight, Building, Mail, Phone, User, Users } from 'lucide-react';

export default function DemoModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    school: '',
    email: '',
    phone: '',
    role: 'Principal',
    students: '300-1000',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-fadeIn text-left">
      <div className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 bg-slate-100 rounded-full transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div className="space-y-5">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">
                Greenwood ERP Showcase
              </span>
              <h3 className="text-2xl font-black text-slate-900">Request a Product Demo</h3>
              <p className="text-xs text-slate-600">
                Schedule a walk-through with our ed-tech specialists at Devdhara Technologies.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Rajesh Mehta"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">School / Institution *</label>
                  <input
                    type="text"
                    required
                    placeholder="Greenwood Public School"
                    value={formData.school}
                    onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Your Role *</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    <option value="Principal">Principal / Director</option>
                    <option value="Trustee">Trustee / Owner</option>
                    <option value="Administrator">School Administrator</option>
                    <option value="Accountant">Head Accountant</option>
                    <option value="Teacher">Senior Teacher</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Work Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="principal@school.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
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
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Student Strength</label>
                <select
                  value={formData.students}
                  onChange={(e) => setFormData({ ...formData, students: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="<300">Under 300 Students</option>
                  <option value="300-1000">300 – 1,000 Students</option>
                  <option value="1000+">1,000+ Students (Group / Multi-branch)</option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-slate-900 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Submit Demo Request</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="text-[11px] text-slate-400 text-center flex items-center justify-center gap-1 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Devdhara Technologies • devdhar.in</span>
              </div>

            </form>
          </div>
        ) : (
          <div className="py-8 text-center space-y-4">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-black text-slate-900">Demo Request Submitted!</h3>
              <p className="text-xs text-slate-600 max-w-sm mx-auto">
                Thank you, <strong>{formData.name}</strong>. Our team for <strong>{formData.school}</strong> will schedule your demonstration shortly.
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="px-6 py-2 bg-slate-900 text-white font-bold text-xs rounded-lg cursor-pointer"
              >
                Close & Return
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
