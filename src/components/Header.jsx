import React, { useState, useEffect } from 'react';
import { Phone, Menu, X, ChevronDown } from 'lucide-react';
import { companyInfo } from '../data/websiteData';

export default function Header({ onOpenQuote }) {
  const [isSticky, setIsSticky] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 30);

      const sections = ['home', 'services', 'about', 'projects', 'team', 'advantage', 'contact'];
      const scrollPos = window.scrollY + 180;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home', id: 'home' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Services', href: '#services', id: 'services', hasDropdown: true },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'Team', href: '#team', id: 'team' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isSticky
            ? 'bg-white/95 backdrop-blur-md shadow-sm py-2.5 border-b border-[#0e1d2f]/10'
            : 'bg-white/90 backdrop-blur-sm py-3.5'
        }`}
      >
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8 flex items-center justify-between gap-4">
          {/* Logo */}
          <a href="#home" className="flex items-center group">
            <img
              src="/logo.png"
              alt="Gryfno Szajka Construction"
              className="h-11 sm:h-13 w-auto object-contain transition-transform group-hover:scale-105"
            />
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-7 text-[13px] font-semibold text-[#28384a]">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  className={`inline-flex items-center gap-1 transition-colors hover:text-[#d88918] ${
                    isActive ? 'text-[#d88918] font-bold' : ''
                  }`}
                >
                  <span>{link.label}</span>
                  {link.hasDropdown && <ChevronDown className="w-3.5 h-3.5 text-[#627184]" />}
                </a>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={`tel:${companyInfo.phone.replace(/[^0-9+]/g, '')}`}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold text-[#142334] bg-[#f4f6f8] hover:bg-[#e9edf1] border border-[#d6dde5] transition-all"
            >
              <Phone className="w-3.5 h-3.5 text-[#d88918]" />
              <span>{companyInfo.phone}</span>
            </a>

            <button
              onClick={onOpenQuote}
              type="button"
              className="inline-flex items-center gap-1.5 px-4.5 py-2 rounded-xl text-xs font-extrabold text-[#111a26] bg-[#ea8b0d] hover:bg-[#d67b07] hover:text-white shadow-[0_4px_14px_rgba(234,139,13,0.35)] transition-all cursor-pointer"
            >
              <span>Get a Quote</span>
              <span className="text-sm leading-none font-bold">→</span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#0b1725] rounded-lg hover:bg-black/5"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="fixed inset-0 bg-[#0b1725]/60 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed top-[62px] left-0 right-0 bg-white border-b border-[#0b1725]/10 px-6 py-6 shadow-xl flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-2 text-sm font-semibold">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`p-2.5 rounded-lg transition-colors ${
                    activeSection === link.id
                      ? 'bg-[#ea8b0d]/15 text-[#d88918] font-bold'
                      : 'text-[#142334] hover:bg-black/5'
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="pt-3 border-t border-[#0b1725]/10 flex flex-col gap-2">
              <a
                href={`tel:${companyInfo.phone.replace(/[^0-9+]/g, '')}`}
                className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-[#d6dde5] font-bold text-xs text-[#142334]"
              >
                <Phone className="w-3.5 h-3.5 text-[#d88918]" />
                <span>Call {companyInfo.phone}</span>
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenQuote();
                }}
                className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl font-bold text-xs text-[#111a26] bg-[#ea8b0d]"
              >
                <span>Get a Quote →</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
