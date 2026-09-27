import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Check, ArrowRight, ShieldCheck, HelpCircle, ChevronDown, Sparkles } from 'lucide-react';

export default function PricingPage({ onOpenDemoModal }) {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(null);

  const handleDemoClick = () => {
    if (onOpenDemoModal) onOpenDemoModal();
    else navigate('/demo');
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const pricingTiers = [
    {
      name: "Starter Plan",
      badge: "Single Campus",
      target: "For single-branch schools with up to 500 students needing core digitization.",
      price: "Custom Pricing",
      subtext: "Billed annually per institution",
      cta: "Request Pricing",
      popular: false,
      features: [
        "Up to 500 Enrolled Students",
        "1 School Campus",
        "Student Profile Management",
        "Daily Attendance Roster & SMS",
        "Counter Fee Cashiering & Receipts",
        "Class Timetable & Schedule Builder",
        "Standard Email & Phone Support",
        "Daily Data Backups"
      ]
    },
    {
      name: "Professional Plan",
      badge: "Most Popular",
      target: "For growing K-12 institutions with up to 2,000 students requiring advanced modules.",
      price: "Custom Pricing",
      subtext: "Tailored to student count & modules",
      cta: "Talk to Sales",
      popular: true,
      features: [
        "Up to 2,000 Enrolled Students",
        "Up to 2 School Campuses",
        "All Starter Plan Capabilities",
        "Excel-Style Master Gradebook Matrix",
        "Admit Card & Hall Ticket Generator",
        "Admissions Pipeline Funnel",
        "Library & Transport Management",
        "Parent & Student Web Portals",
        "Priority Customer Support SLA"
      ]
    },
    {
      name: "Enterprise Plan",
      badge: "Multi-School SaaS",
      target: "For educational trusts, school chains, and large institutions with multiple branches.",
      price: "Custom Pricing",
      subtext: "Dedicated cluster & custom SLA",
      cta: "Talk to Sales",
      popular: false,
      features: [
        "Unlimited Enrolled Students",
        "Unlimited Multi-School Campuses",
        "All Professional Plan Capabilities",
        "Multi-Tenant Trust Console",
        "Custom Permission Matrix & RBAC",
        "Cross-Branch Student Transfer Workflow",
        "REST API Access & Custom Integrations",
        "Dedicated Account Manager & 24/7 SLA",
        "On-Premise / Isolated Cloud Cluster"
      ]
    }
  ];

  const comparisonMatrix = [
    { feature: "Student Count Capacity", starter: "Up to 500", pro: "Up to 2,000", ent: "Unlimited" },
    { feature: "Multi-Campus Support", starter: "1 Branch", pro: "Up to 2 Branches", ent: "Unlimited Branches" },
    { feature: "Student Info & Attendance", starter: "✓ Included", pro: "✓ Included", ent: "✓ Included" },
    { feature: "Fee Counter & PDF Receipts", starter: "✓ Included", pro: "✓ Included", ent: "✓ Included" },
    { feature: "Excel Gradebook Matrix", starter: "Basic", pro: "✓ Advanced", ent: "✓ Full Custom" },
    { feature: "Exam Admit Card Generator", starter: "—", pro: "✓ Included", ent: "✓ Included" },
    { feature: "Admissions Funnel Pipeline", starter: "—", pro: "✓ Included", ent: "✓ Included" },
    { feature: "Parent & Student Portals", starter: "Basic", pro: "✓ Full Portal", ent: "✓ Custom Portal" },
    { feature: "Multi-Branch Governance", starter: "—", pro: "—", ent: "✓ Trust Console" },
    { feature: "Support SLA", starter: "Standard", pro: "Priority SLA", ent: "24/7 Dedicated" },
  ];

  const pricingFaqs = [
    {
      q: "How is ScholarGrid ERP pricing calculated?",
      a: "Pricing is transparently based on your active enrolled student count, number of school campuses, and specific module requirements. We provide tailored custom pricing quotes to ensure you only pay for what your institution uses."
    },
    {
      q: "Are there any hidden implementation or maintenance fees?",
      a: "No. Our pricing quote includes initial onboarding, data migration support, staff training, cloud hosting, regular system updates, and ongoing customer support."
    },
    {
      q: "Can we upgrade our plan during the academic year?",
      a: "Yes! You can seamlessly upgrade student capacity or add extra modules (like Transport or Multi-School console) at any point without system downtime."
    },
    {
      q: "Do you offer custom pricing for education trusts managing multiple schools?",
      a: "Yes. We offer special enterprise volume pricing for education groups, charitable trusts, and multi-branch school networks. Click 'Talk to Sales' to request a customized proposal."
    }
  ];

  return (
    <div className="space-y-16 pb-20 text-left bg-white font-['Plus_Jakarta_Sans']">
      
      {/* Header */}
      <section className="pt-28 pb-16 bg-gradient-to-b from-blue-50/60 via-slate-50 to-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 bg-blue-100/80 px-3.5 py-1.5 rounded-full border border-blue-200">
            Predictable Enterprise SaaS Pricing
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Simple, Scalable Plans tailored to <br />
            <span className="text-gradient-blue">Your Institution's Size.</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto font-medium leading-relaxed">
            No hidden charges. Flexible, transparent pricing proposals designed for single campuses and multi-school networks.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingTiers.map((tier, idx) => (
            <div
              key={idx}
              className={`p-8 rounded-3xl bg-white border text-left flex flex-col justify-between relative ${
                tier.popular
                  ? 'border-blue-500 shadow-2xl ring-2 ring-blue-500/20'
                  : 'border-slate-200 shadow-card hover:shadow-xl transition-all'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-blue-600 text-white font-bold text-[10px] uppercase tracking-wider px-3.5 py-1 rounded-full shadow-md">
                  Most Popular Choice
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded">
                    {tier.badge}
                  </span>
                  <h3 className="text-2xl font-black text-slate-900 mt-2">{tier.name}</h3>
                  <p className="text-xs text-slate-500 mt-1 font-medium leading-relaxed">{tier.target}</p>
                </div>

                <div className="py-2 border-y border-slate-100">
                  <div className="text-3xl font-black text-slate-900 font-mono">{tier.price}</div>
                  <div className="text-[11px] text-slate-400 font-medium mt-0.5">{tier.subtext}</div>
                </div>

                <div className="space-y-2.5">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Included Features:</div>
                  {tier.features.map((f, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2.5 text-xs text-slate-700 font-semibold">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8">
                <button
                  onClick={handleDemoClick}
                  className={`w-full py-3.5 text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    tier.popular
                      ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20'
                      : 'bg-slate-900 hover:bg-slate-800 text-white'
                  }`}
                >
                  <span>{tier.cta}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Detailed Feature Comparison Table */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Feature Matrix Comparison</h2>
          <p className="text-xs text-slate-600 font-medium">Compare plan capabilities side-by-side.</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-card overflow-x-auto text-xs">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-800 border-b border-slate-200 text-xs font-bold">
                <th className="p-3.5">Plan Feature / Module</th>
                <th className="p-3.5 text-center">Starter Plan</th>
                <th className="p-3.5 text-center text-blue-700">Professional</th>
                <th className="p-3.5 text-center">Enterprise</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {comparisonMatrix.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50">
                  <td className="p-3.5 font-bold text-slate-900">{row.feature}</td>
                  <td className="p-3.5 text-center">{row.starter}</td>
                  <td className="p-3.5 text-center font-bold text-blue-700 bg-blue-50/50">{row.pro}</td>
                  <td className="p-3.5 text-center font-bold">{row.ent}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Pricing FAQs */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-extrabold text-slate-900">Pricing FAQs</h2>
        </div>

        <div className="space-y-3">
          {pricingFaqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div key={index} className="rounded-2xl bg-white border border-slate-200 shadow-2xs overflow-hidden">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50"
                >
                  <span className="text-sm font-bold text-slate-900">{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-blue-600' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 text-xs text-slate-600 font-medium leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}
