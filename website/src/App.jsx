import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import DemoModal from './components/DemoModal';

import HomePage from './pages/HomePage';
import PlatformPage from './pages/PlatformPage';
import FeaturesPage from './pages/FeaturesPage';
import RolesPage from './pages/RolesPage';
import SolutionsPage from './pages/SolutionsPage';
import SecurityPage from './pages/SecurityPage';
import MultiSchoolPage from './pages/MultiSchoolPage';
import PricingPage from './pages/PricingPage';
import DemoPage from './pages/DemoPage';
import AboutPage from './pages/AboutPage';

export default function App() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  const handleOpenDemoModal = () => setIsDemoModalOpen(true);
  const handleCloseDemoModal = () => setIsDemoModalOpen(false);

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-white text-slate-900 font-['Plus_Jakarta_Sans',sans-serif] flex flex-col justify-between selection:bg-blue-600 selection:text-white antialiased">
        
        {/* Sticky Navigation Bar */}
        <Navbar onOpenDemoModal={handleOpenDemoModal} />

        {/* Core Multi-Page Routes */}
        <main className="grow">
          <Routes>
            <Route path="/" element={<HomePage onOpenDemoModal={handleOpenDemoModal} />} />
            <Route path="/platform" element={<PlatformPage onOpenDemoModal={handleOpenDemoModal} />} />
            <Route path="/features" element={<FeaturesPage onOpenDemoModal={handleOpenDemoModal} />} />
            <Route path="/roles" element={<RolesPage onOpenDemoModal={handleOpenDemoModal} />} />
            <Route path="/solutions" element={<SolutionsPage onOpenDemoModal={handleOpenDemoModal} />} />
            <Route path="/security" element={<SecurityPage onOpenDemoModal={handleOpenDemoModal} />} />
            <Route path="/multi-school" element={<MultiSchoolPage onOpenDemoModal={handleOpenDemoModal} />} />
            <Route path="/pricing" element={<PricingPage onOpenDemoModal={handleOpenDemoModal} />} />
            <Route path="/demo" element={<DemoPage />} />
            <Route path="/about" element={<AboutPage onOpenDemoModal={handleOpenDemoModal} />} />

            {/* Legacy Path Redirections & Aliases */}
            <Route path="/about-erp" element={<Navigate to="/about" replace />} />
            <Route path="/modules" element={<Navigate to="/platform" replace />} />
            <Route path="/why-us" element={<Navigate to="/solutions" replace />} />
            <Route path="/about-devdhara" element={<Navigate to="/about" replace />} />
            <Route path="/contact" element={<Navigate to="/demo" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Multi-Column Enterprise Footer */}
        <Footer />

        {/* Global Request Demo Modal */}
        <DemoModal isOpen={isDemoModalOpen} onClose={handleCloseDemoModal} />

      </div>
    </Router>
  );
}
