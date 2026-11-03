import React from 'react';
import { Phone, Mail, MapPin, ArrowUp } from 'lucide-react';
import { companyInfo } from '../data/websiteData';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#142b45] text-[#eaf0f4] pt-12 pb-6 relative">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
        {/* 4 Column Footer Grid matching reference screenshot */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 pb-10">
          {/* Brand Info */}
          <div className="lg:col-span-4 pr-4">
            <a href="#home" className="inline-block mb-3 group">
              <img
                src="/logo-light.png"
                alt="Gryfno Szajka Construction"
                className="h-13 sm:h-14 w-auto object-contain transition-transform group-hover:scale-105"
              />
            </a>
            <p className="text-xs text-[#aeb9c6] leading-relaxed max-w-[280px]">
              A trusted construction and real estate company delivering quality, innovation and lasting value.
            </p>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 sm:col-span-1">
            <h4 className="text-[11px] font-bold text-[#f2ae38] uppercase tracking-[0.16em] mb-4">
              QUICK LINKS
            </h4>
            <ul className="space-y-2.5 text-xs text-[#c1cfdb]">
              <li><a href="#home" className="hover:text-[#f2ae38] transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-[#f2ae38] transition-colors">About Us</a></li>
              <li><a href="#services" className="hover:text-[#f2ae38] transition-colors">Services</a></li>
              <li><a href="#projects" className="hover:text-[#f2ae38] transition-colors">Projects</a></li>
              <li><a href="#team" className="hover:text-[#f2ae38] transition-colors">Our Team</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-3 sm:col-span-1">
            <h4 className="text-[11px] font-bold text-[#f2ae38] uppercase tracking-[0.16em] mb-4">
              CONTACT INFO
            </h4>
            <ul className="space-y-2.5 text-xs text-[#c1cfdb]">
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#f2ae38] shrink-0" />
                <a href={`tel:${companyInfo.phone}`} className="hover:text-white transition-colors">
                  {companyInfo.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#f2ae38] shrink-0" />
                <a href={`mailto:${companyInfo.email}`} className="hover:text-white transition-colors">
                  {companyInfo.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#f2ae38] shrink-0" />
                <span>{companyInfo.address}</span>
              </li>
            </ul>
          </div>

          {/* Follow Us */}
          <div className="lg:col-span-3 sm:col-span-1">
            <h4 className="text-[11px] font-bold text-[#f2ae38] uppercase tracking-[0.16em] mb-4">
              FOLLOW US
            </h4>
            <ul className="space-y-2.5 text-xs text-[#c1cfdb]">
              <li><a href="#" className="hover:text-[#f2ae38] transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-[#f2ae38] transition-colors">LinkedIn</a></li>
              <li><a href="#" className="hover:text-[#f2ae38] transition-colors">Facebook</a></li>
              <li><a href="#" className="hover:text-[#f2ae38] transition-colors">YouTube</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Sub-bar */}
        <div className="pt-5 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#a9bbc9]">
          <div>
            © {new Date().getFullYear()} Griffin Construction. All Rights Reserved.
          </div>
          <div className="flex items-center gap-2">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <span>|</span>
            <a href="#" className="hover:text-white transition-colors">Terms & Conditions</a>
          </div>
        </div>
      </div>

      {/* Floating Gold Back to Top Button */}
      <button
        onClick={scrollToTop}
        type="button"
        className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full bg-[#f2ae38] hover:bg-[#f8bd59] text-[#142b45] shadow-2xl flex items-center justify-center transition-all hover:-translate-y-1 cursor-pointer focus:outline-none"
        aria-label="Back to Top"
      >
        <ArrowUp className="w-5 h-5 stroke-[2.5]" />
      </button>
    </footer>
  );
}
