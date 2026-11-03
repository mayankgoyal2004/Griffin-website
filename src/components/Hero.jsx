import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

export default function Hero({ onOpenQuote }) {
  const [counts, setCounts] = useState({ years: 10, experts: 50, projects: 100, quality: 100 });
  const griffinStageRef = useRef(null);
  const heroRef = useRef(null);

  useEffect(() => {
    // Numbers counter animation with exact target completion
    const values = { years: 0, experts: 0, projects: 0, quality: 0 };
    gsap.to(values, {
      years: 10,
      experts: 50,
      projects: 100,
      quality: 100,
      duration: 1.8,
      ease: 'power2.out',
      onUpdate: () => {
        setCounts({
          years: Math.round(values.years),
          experts: Math.round(values.experts),
          projects: Math.round(values.projects),
          satisfaction: Math.round(values.satisfaction),
        });
      },
      onComplete: () => {
        setCounts({ years: 10, experts: 50, projects: 100, satisfaction: 100 });
      },
    });

    // 3D parallax & pointer tilt
    const heroEl = heroRef.current;
    const stageEl = griffinStageRef.current;
    let pointerX = 0;
    let pointerY = 0;
    let currentX = 0;
    let currentY = 0;
    let rafId = null;

    const handlePointerMove = (e) => {
      if (window.innerWidth < 1024) return;
      const rect = heroEl.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      pointerX = nx * 10;
      pointerY = -ny * 8;
    };

    const handlePointerLeave = () => {
      pointerX = 0;
      pointerY = 0;
    };

    const updateStageMotion = () => {
      currentX += (pointerX - currentX) * 0.08;
      currentY += (pointerY - currentY) * 0.08;

      if (stageEl) {
        stageEl.style.transform = `perspective(1200px) rotateX(${currentY.toFixed(2)}deg) rotateY(${currentX.toFixed(2)}deg)`;
      }
      rafId = requestAnimationFrame(updateStageMotion);
    };

    if (heroEl) {
      heroEl.addEventListener('pointermove', handlePointerMove);
      heroEl.addEventListener('pointerleave', handlePointerLeave);
      rafId = requestAnimationFrame(updateStageMotion);
    }

    return () => {
      if (heroEl) {
        heroEl.removeEventListener('pointermove', handlePointerMove);
        heroEl.removeEventListener('pointerleave', handlePointerLeave);
      }
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative pt-[88px] sm:pt-[96px] pb-10 overflow-hidden"
      style={{
        color: '#17283d',
        background: 'linear-gradient(110deg, #fffaf2 0%, #f6f6f2 43%, #d9e9f2 100%)',
      }}
    >
      {/* Background Soft Lighting Glow */}
      <div
        className="absolute right-[6%] top-[6%] w-[48vw] h-[48vw] max-w-[700px] max-h-[650px] pointer-events-none -z-10"
        style={{
          background: 'radial-gradient(ellipse, rgba(255,255,255,.72), rgba(226,238,243,.24) 48%, transparent 72%)',
          filter: 'blur(12px)',
        }}
        aria-hidden="true"
      />

      {/* Griffin Stage Artwork on the Right */}
      <div
        ref={griffinStageRef}
        className="hidden lg:flex absolute z-10 top-2 right-[-5%] w-[65%] h-[calc(100%-80px)] items-center justify-end pointer-events-none"
        style={{
          transformOrigin: '68% 52%',
          willChange: 'transform',
        }}
        aria-hidden="true"
      >
        <img
          src="/griffin-bright-hero.jpg"
          alt="Griffin Construction Mascot"
          className="relative w-full h-full max-h-[560px] object-contain object-right select-none"
          style={{
            WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, rgba(0,0,0,.25) 10%, #000 26%)',
            maskImage: 'linear-gradient(90deg, transparent 0%, rgba(0,0,0,.25) 10%, #000 26%)',
          }}
        />
      </div>

      {/* Main Content Area */}
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8 w-full relative z-20">
        <div className="w-full lg:w-[51%] max-w-[620px] pt-1">
          {/* Kicker */}
          <div className="flex items-center gap-3 text-[10px] tracking-[0.28em] font-extrabold uppercase text-[#a9660d]">
            <span>Building a stronger tomorrow</span>
            <span className="w-16 h-[1px] bg-[#d88918]" />
          </div>

          {/* Headline */}
          <h1 className="font-serif font-extrabold text-[54px] sm:text-[68px] lg:text-[82px] leading-[0.98] tracking-[-0.05em] text-[#142b45] my-4">
            Griffin<br />
            <span className="text-[#c47a16]">Construction</span>
          </h1>

          {/* Copy */}
          <p className="text-xs sm:text-[14px] leading-[1.75] text-[#455a70] max-w-[490px] mb-6 font-normal">
            End-to-end construction solutions with strength, precision and trust. From concept to completion, we build spaces that last for generations.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenQuote}
              type="button"
              className="inline-flex items-center justify-center gap-2 px-5.5 py-3 rounded-[5px] bg-[#f2ae38] hover:bg-[#ffc15a] text-[#182b40] font-extrabold text-xs shadow-sm hover:shadow-md transition-all cursor-pointer"
            >
              <span>Explore our services</span>
              <span className="text-sm font-bold">→</span>
            </button>

            <a
              href="#projects"
              className="inline-flex items-center justify-center gap-2 px-5.5 py-3 rounded-[5px] bg-white/70 hover:bg-white text-[#142b45] border border-[#60758a]/60 font-bold text-xs shadow-xs hover:border-[#d88918] transition-all"
            >
              <span>View our projects</span>
              <span className="text-sm">↗</span>
            </a>
          </div>

          {/* 4 Hero Services Strip with vertical dividers */}
          <div className="flex gap-0 mt-7 max-w-[490px]">
            {/* Service 1 */}
            <div className="w-1/4 pr-3 border-r border-[#142b45]/20 text-center">
              <svg className="w-5 h-5 mx-auto mb-1.5 text-[#c47a16]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M3 21V8l9-5 9 5v13M8 21v-8h8v8" />
              </svg>
              <div className="text-[10px] leading-[1.4] text-[#344a60] font-medium">
                Residential<br />Construction
              </div>
            </div>

            {/* Service 2 */}
            <div className="w-1/4 px-3 border-r border-[#142b45]/20 text-center">
              <svg className="w-5 h-5 mx-auto mb-1.5 text-[#c47a16]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M3 7h12v11H3zM15 11h4l3 3v4h-7" />
              </svg>
              <div className="text-[10px] leading-[1.4] text-[#344a60] font-medium">
                Commercial<br />Projects
              </div>
            </div>

            {/* Service 3 */}
            <div className="w-1/4 px-3 border-r border-[#142b45]/20 text-center">
              <svg className="w-5 h-5 mx-auto mb-1.5 text-[#c47a16]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M3 21h18M5 8l7-5 7 5v13M9 21v-7h6v7" />
              </svg>
              <div className="text-[10px] leading-[1.4] text-[#344a60] font-medium">
                Project<br />Management
              </div>
            </div>

            {/* Service 4 */}
            <div className="w-1/4 pl-3 text-center">
              <svg className="w-5 h-5 mx-auto mb-1.5 text-[#c47a16]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="m14 7 3-3 3 3-3 3M4 20l9-9M3 8l5-5 4 4-5 5M14 14l7 7" />
              </svg>
              <div className="text-[10px] leading-[1.4] text-[#344a60] font-medium">
                Renovation &<br />Remodeling
              </div>
            </div>
          </div>

          {/* Scroll hint matching template */}
          <div className="flex items-center gap-3 text-[9px] tracking-[0.16em] uppercase font-bold text-[#65788b] mt-4">
            <span className="w-8 h-[1px] bg-[#d88918]" />
            <span>Scroll to explore</span>
          </div>
        </div>

        {/* Mobile Artwork Preview */}
        <div className="lg:hidden mt-6 rounded-2xl overflow-hidden aspect-[886/470] max-w-md mx-auto">
          <img
            src="/griffin-bright-hero.jpg"
            alt="Griffin Construction Mascot"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Floating White Glass Stats Bar matching Image 2 */}
      <div className="max-w-[1140px] mx-auto px-5 sm:px-8 w-full relative z-30 mt-7 sm:mt-8">
        <div className="bg-white/90 backdrop-blur-md rounded-2xl p-3.5 sm:p-4.5 shadow-[0_14px_40px_rgba(32,53,75,0.12)] border border-[rgba(20,43,69,0.09)] grid grid-cols-2 md:grid-cols-4 gap-4 divide-y sm:divide-y-0 sm:divide-x divide-[rgba(20,43,69,0.18)]">
          {/* Stat 1 */}
          <div className="flex items-center justify-center gap-3 py-1 sm:py-0 px-2">
            <span className="font-serif font-bold text-2xl sm:text-3xl text-[#bd7412]">
              {counts.years}+
            </span>
            <span className="text-[10px] sm:text-[11px] leading-[1.35] text-[#53667b]">
              Years of<br />experience
            </span>
          </div>

          {/* Stat 2 */}
          <div className="flex items-center justify-center gap-3 py-1 sm:py-0 px-2">
            <span className="font-serif font-bold text-2xl sm:text-3xl text-[#bd7412]">
              {counts.experts}+
            </span>
            <span className="text-[10px] sm:text-[11px] leading-[1.35] text-[#53667b]">
              Expert<br />professionals
            </span>
          </div>

          {/* Stat 3 */}
          <div className="flex items-center justify-center gap-3 py-1 sm:py-0 px-2">
            <span className="font-serif font-bold text-2xl sm:text-3xl text-[#bd7412]">
              {counts.projects}+
            </span>
            <span className="text-[10px] sm:text-[11px] leading-[1.35] text-[#53667b]">
              Projects<br />completed
            </span>
          </div>

          {/* Stat 4 */}
          <div className="flex items-center justify-center gap-3 py-1 sm:py-0 px-2">
            <span className="font-serif font-bold text-2xl sm:text-3xl text-[#bd7412]">
              {counts.quality}%
            </span>
            <span className="text-[10px] sm:text-[11px] leading-[1.35] text-[#53667b]">
              Commitment<br />to quality
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
