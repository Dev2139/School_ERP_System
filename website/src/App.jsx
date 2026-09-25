import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ParentCompanySection from './components/ParentCompanySection';
import FeaturesGrid from './components/FeaturesGrid';
import InteractiveDemo from './components/InteractiveDemo';
import PricingSection from './components/PricingSection';
import TestimonialsSection from './components/TestimonialsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import FreeTrialModal from './components/FreeTrialModal';

export default function App() {
  const [isTrialModalOpen, setIsTrialModalOpen] = useState(false);

  const handleOpenModal = () => setIsTrialModalOpen(true);
  const handleCloseModal = () => setIsTrialModalOpen(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-['Inter',sans-serif] relative overflow-hidden">
      
      {/* Navigation Bar */}
      <Navbar onOpenTrialModal={handleOpenModal} />

      {/* Main Showcase Hero */}
      <HeroSection onOpenTrialModal={handleOpenModal} />

      {/* Parent Company Showcase: Devdhara Technology (devdhar.in) */}
      <ParentCompanySection />

      {/* Modular Features Grid */}
      <FeaturesGrid onOpenTrialModal={handleOpenModal} />

      {/* Interactive Live Role Simulator */}
      <InteractiveDemo onOpenTrialModal={handleOpenModal} />

      {/* Pricing Plans */}
      <PricingSection onOpenTrialModal={handleOpenModal} />

      {/* Social Proof & Testimonials */}
      <TestimonialsSection />

      {/* Contact Us Form */}
      <ContactSection />

      {/* Footer */}
      <Footer />

      {/* 14-Day Free Trial Modal Form */}
      <FreeTrialModal isOpen={isTrialModalOpen} onClose={handleCloseModal} />

    </div>
  );
}
