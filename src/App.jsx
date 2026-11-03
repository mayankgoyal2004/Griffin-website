import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import ScrollProgress from './components/ScrollProgress';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Projects from './components/Projects';
import Team from './components/Team';
import Advantage from './components/Advantage';
import ContactBanner from './components/ContactBanner';
import Footer from './components/Footer';

import QuoteModal from './components/QuoteModal';
import ProjectDetailModal from './components/ProjectDetailModal';
import ServiceDetailModal from './components/ServiceDetailModal';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [quoteInitialData, setQuoteInitialData] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedService, setSelectedService] = useState(null);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.4,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const updateTicker = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(updateTicker);
    };
  }, []);

  const handleOpenQuote = () => {
    setQuoteInitialData(null);
    setQuoteModalOpen(true);
  };

  const handleConsultForSimilar = (project) => {
    setQuoteInitialData({
      projectType: project.category,
      message: `Inquiring about building a project similar to ${project.title} (${project.location}).`,
    });
    setQuoteModalOpen(true);
  };

  const handleConsultForService = (service) => {
    setQuoteInitialData({
      projectType: 'residential',
      message: `Inquiring regarding ${service.title} scope and site feasibility.`,
    });
    setQuoteModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#faf7f2] text-[#111d2c] flex flex-col selection:bg-[#ea8b0d] selection:text-white">
      {/* Scroll Progress Bar */}
      <ScrollProgress />

      {/* Main Header */}
      <Header onOpenQuote={handleOpenQuote} />

      {/* Main Sections */}
      <main className="flex-1">
        <Hero onOpenQuote={handleOpenQuote} />
        <Services onSelectService={(srv) => setSelectedService(srv)} />
        <About onOpenQuote={handleOpenQuote} />
        <Projects onSelectProject={(prj) => setSelectedProject(prj)} />
        <Team onOpenQuote={handleOpenQuote} />
        <Advantage />
        <ContactBanner onOpenQuote={handleOpenQuote} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Modals */}
      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        initialData={quoteInitialData}
      />

      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onConsultForSimilar={handleConsultForSimilar}
      />

      <ServiceDetailModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onConsultForService={handleConsultForService}
      />
    </div>
  );
}
