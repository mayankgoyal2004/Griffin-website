import React from 'react';
import { Mail, Phone } from 'lucide-react';
import { companyInfo } from '../data/websiteData';

export default function ContactBanner({ onOpenQuote }) {
  return (
    <section
      id="contact"
      className="relative py-12 sm:py-14 text-white overflow-hidden bg-[#122b43]"
      style={{
        backgroundImage: `linear-gradient(90deg, rgba(8, 24, 43, 0.92) 0%, rgba(18, 43, 67, 0.65) 50%, rgba(8, 24, 43, 0.9) 100%), url('https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1800&q=85')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center 52%',
      }}
    >
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* Left Text */}
          <div>
            <h2 className="font-serif font-bold text-3xl sm:text-4xl tracking-tight leading-tight mb-2">
              Let’s Build Your <span className="text-[#f2ae38]">Next Project</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#d6dce5] max-w-xl">
              Get in touch with our team for a consultation and a detailed quote.
            </p>
          </div>

          {/* Right Action Buttons matching reference screenshot */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={onOpenQuote}
              type="button"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-xs font-bold text-[#142338] bg-[#ea8b0d] hover:bg-[#d88918] shadow-md transition-all cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5 text-[#142338]" />
              <span>Contact Us →</span>
            </button>

            <a
              href={`tel:${companyInfo.phone}`}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-xs font-bold text-[#142338] bg-[#ea8b0d] hover:bg-[#d88918] shadow-md transition-all cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5 text-[#142338]" />
              <span>{companyInfo.phone}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
