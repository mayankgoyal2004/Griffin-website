import React, { useState, useEffect } from 'react';
import {
  Phone,
  Menu,
  X,
  ChevronDown,
  Home,
  Info,
  Layers,
  Building2,
  Users,
  FileEdit,
  Mail,
} from 'lucide-react';
import { companyInfo } from '../data/websiteData';

export default function Header() {
  const [isSticky, setIsSticky] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 30);

      const sections = ['home', 'about', 'services', 'projects', 'team', 'contact'];
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
    { label: 'Home', href: '#home', id: 'home', icon: Home },
    { label: 'About', href: '#about', id: 'about', icon: Info },
    { label: 'Services', href: '#services', id: 'services', icon: Layers, hasDropdown: true },
    { label: 'Projects', href: '#projects', id: 'projects', icon: Building2 },
    { label: 'Team', href: '#team', id: 'team', icon: Users },
    { label: 'Blog', href: '#advantage', id: 'blog', icon: FileEdit },
    { label: 'Contact', href: '#contact', id: 'contact', icon: Mail },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full h-[68px] z-50 transition-all duration-300 flex items-center ${
          isSticky
            ? 'bg-[#06111e]/92 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.6)] border-b border-white/10'
            : 'bg-gradient-to-b from-[#030914]/85 via-[#030914]/45 to-transparent backdrop-blur-[1.5px]'
        }`}
      >
        <div className="max-w-[1280px] w-full mx-auto px-5 sm:px-8 flex items-center justify-between gap-4">
          {/* Brand Logo: Gryfno Szajka 3 Griffins Logo */}
          <a href="#home" className="flex items-center group shrink-0">
            <img
              src="/logo.png"
              alt="Gryfno Szajka"
              className="h-10 sm:h-12 w-auto object-contain transition-transform group-hover:scale-105 drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]"
            />
          </a>

          {/* Desktop Nav Links with Stacked Icons - Clean, natural overlay */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 whitespace-nowrap">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              const Icon = link.icon;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  className={`group relative flex flex-col items-center justify-center gap-1 py-1 px-1.5 transition-all ${
                    isActive
                      ? 'text-[#f2ae38]'
                      : 'text-white/95 hover:text-[#f2ae38]'
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 transition-all duration-200 group-hover:scale-110 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] ${
                      isActive
                        ? 'text-[#f2ae38] stroke-[2.4] drop-shadow-[0_0_8px_rgba(242,174,56,0.7)]'
                        : 'text-white stroke-[2] group-hover:text-[#f2ae38]'
                    }`}
                  />
                  <div className="flex items-center gap-1 text-[13px] font-bold tracking-wide leading-none drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                    <span>{link.label}</span>
                    {link.hasDropdown && (
                      <ChevronDown
                        className={`w-3 h-3 -ml-0.5 transition-transform group-hover:rotate-180 ${
                          isActive ? 'text-[#f2ae38]' : 'text-white/80 group-hover:text-[#f2ae38]'
                        }`}
                      />
                    )}
                  </div>
                  {/* Active Indicator Underline matching Reference Screenshot */}
                  {isActive && (
                    <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-8 h-[2.5px] bg-[#f2ae38] rounded-full shadow-[0_0_8px_rgba(242,174,56,0.9)]" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Action: Mobile / Phone Number with warm frosted glass pill */}
          <div className="hidden sm:flex items-center">
            <a
              href={`tel:${companyInfo.phone.replace(/[^0-9+]/g, '')}`}
              className="group inline-flex items-center gap-2.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-[13px] font-bold text-white bg-black/35 hover:bg-[#f2ae38] hover:text-[#061220] border border-white/20 hover:border-[#f2ae38] backdrop-blur-md transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.35)]"
            >
              <Phone className="w-3.5 h-3.5 text-[#f2ae38] transition-colors group-hover:text-[#061220]" />
              <span className="tracking-wide drop-shadow-sm">{companyInfo.phone}</span>
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-white/90 rounded-lg hover:bg-white/10 transition-colors"
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
            className="fixed inset-0 bg-[#050e18]/80 backdrop-blur-md"
            onClick={() => setMobileMenuOpen(false)}
          />

          <div className="fixed top-0 right-0 w-[280px] h-full bg-[#071322] border-l border-white/10 shadow-2xl p-6 flex flex-col justify-between z-50">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
                <span className="text-sm font-bold text-white tracking-widest uppercase">Menu</span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 text-white/80 hover:text-white"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex flex-col gap-2">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.id;
                  const Icon = link.icon;
                  return (
                    <a
                      key={link.id}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                        isActive
                          ? 'bg-[#d88918] text-[#071322]'
                          : 'text-white/85 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{link.label}</span>
                    </a>
                  );
                })}
              </nav>
            </div>

            <div className="pt-6 border-t border-white/10">
              <a
                href={`tel:${companyInfo.phone.replace(/[^0-9+]/g, '')}`}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r from-[#d88918] to-[#f2ae38] text-[#071322] font-bold text-xs uppercase tracking-wider shadow-lg"
              >
                <Phone className="w-4 h-4" />
                <span>Call Us</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
