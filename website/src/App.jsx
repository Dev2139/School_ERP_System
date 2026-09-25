import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FreeTrialModal from './components/FreeTrialModal';

import HomePage from './pages/HomePage';
import FeaturesPage from './pages/FeaturesPage';
import PricingPage from './pages/PricingPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import DemoPage from './pages/DemoPage';

export default function App() {
  const [isTrialModalOpen, setIsTrialModalOpen] = useState(false);

  const handleOpenTrialModal = () => setIsTrialModalOpen(true);
  const handleCloseTrialModal = () => setIsTrialModalOpen(false);

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-slate-950 text-slate-100 font-['Inter',sans-serif] relative overflow-hidden flex flex-col justify-between">
        
        {/* Navigation Bar */}
        <Navbar onOpenTrialModal={handleOpenTrialModal} />

        {/* Multi-Page Routes */}
        <main className="grow">
          <Routes>
            <Route path="/" element={<HomePage onOpenTrialModal={handleOpenTrialModal} />} />
            <Route path="/features" element={<FeaturesPage onOpenTrialModal={handleOpenTrialModal} />} />
            <Route path="/pricing" element={<PricingPage onOpenTrialModal={handleOpenTrialModal} />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/demo" element={<DemoPage />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />

        {/* Global 14-Day Free Trial Modal */}
        <FreeTrialModal isOpen={isTrialModalOpen} onClose={handleCloseTrialModal} />

      </div>
    </Router>
  );
}
