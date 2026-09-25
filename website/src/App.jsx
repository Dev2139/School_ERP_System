import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import DemoModal from './components/DemoModal';

import HomePage from './pages/HomePage';
import AboutErpPage from './pages/AboutErpPage';
import ModulesPage from './pages/ModulesPage';
import WhyUsPage from './pages/WhyUsPage';
import AboutDevdharaPage from './pages/AboutDevdharaPage';
import ContactPage from './pages/ContactPage';

export default function App() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  const handleOpenDemoModal = () => setIsDemoModalOpen(true);
  const handleCloseDemoModal = () => setIsDemoModalOpen(false);

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-slate-50 text-slate-900 font-['Inter',sans-serif] flex flex-col justify-between selection:bg-blue-600 selection:text-white">
        
        {/* Clean Sticky Navigation Bar */}
        <Navbar onOpenDemoModal={handleOpenDemoModal} />

        {/* Multi-Page Routes */}
        <main className="grow pt-20">
          <Routes>
            <Route path="/" element={<HomePage onOpenDemoModal={handleOpenDemoModal} />} />
            <Route path="/about-erp" element={<AboutErpPage onOpenDemoModal={handleOpenDemoModal} />} />
            <Route path="/modules" element={<ModulesPage onOpenDemoModal={handleOpenDemoModal} />} />
            <Route path="/why-us" element={<WhyUsPage onOpenDemoModal={handleOpenDemoModal} />} />
            <Route path="/about-devdhara" element={<AboutDevdharaPage onOpenDemoModal={handleOpenDemoModal} />} />
            <Route path="/contact" element={<ContactPage />} />

            {/* Aliases / Fallbacks */}
            <Route path="/about" element={<Navigate to="/about-erp" replace />} />
            <Route path="/features" element={<Navigate to="/modules" replace />} />
            <Route path="/pricing" element={<Navigate to="/why-us" replace />} />
            <Route path="/demo" element={<Navigate to="/contact" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Enterprise Footer */}
        <Footer />

        {/* Request Demo Modal */}
        <DemoModal isOpen={isDemoModalOpen} onClose={handleCloseDemoModal} />

      </div>
    </Router>
  );
}

