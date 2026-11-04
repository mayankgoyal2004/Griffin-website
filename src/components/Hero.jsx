import React, { useEffect, useState, useRef } from 'react';
import { Play, Home, Building2, HardHat, Wrench, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Hero({ onOpenQuote }) {
  const [counts, setCounts] = useState({ years: 10, experts: 50, projects: 100, satisfaction: 100 });
  const heroRef = useRef(null);
  const griffinImgRef = useRef(null);
  const statsBarRef = useRef(null);
  const kickerRef = useRef(null);
  const headlineRef = useRef(null);
  const copyRef = useRef(null);
  const buttonsRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Entrance timeline on load
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        kickerRef.current,
        { opacity: 0, x: -25 },
        { opacity: 1, x: 0, duration: 0.7, delay: 0.1 }
      )
        .fromTo(
          headlineRef.current,
          { opacity: 0, y: 35 },
          { opacity: 1, y: 0, duration: 0.85 },
          '-=0.45'
        )
        .fromTo(
          copyRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7 },
          '-=0.5'
        )
        .fromTo(
          buttonsRef.current,
          { opacity: 0, y: 18, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.65 },
          '-=0.4'
        )
        .fromTo(
          cardsRef.current,
          { opacity: 0, y: 24, scale: 0.94 },
          { opacity: 1, y: 0, scale: 1, stagger: 0.08, duration: 0.6 },
          '-=0.35'
        )
        .fromTo(
          statsBarRef.current,
          { opacity: 0, y: 35, scale: 0.97 },
          { opacity: 1, y: 0, scale: 1, duration: 0.85, ease: 'back.out(1.2)' },
          '-=0.4'
        );

      // Griffin artwork gentle entrance
      if (griffinImgRef.current) {
        gsap.fromTo(
          griffinImgRef.current,
          { opacity: 0, scale: 1.04 },
          { opacity: 1, scale: 1, duration: 1.2, ease: 'power2.out', delay: 0.2 }
        );

        // ScrollTrigger Parallax on Griffin Artwork
        gsap.to(griffinImgRef.current, {
          y: 75,
          scale: 1.02,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.2,
          },
        });
      }

      // Parallax float on stats bar as user scrolls
      if (statsBarRef.current) {
        gsap.to(statsBarRef.current, {
          y: -25,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5,
          },
        });
      }

      // Numbers counter animation
      const values = { years: 0, experts: 0, projects: 0, satisfaction: 0 };
      gsap.to(values, {
        years: 10,
        experts: 50,
        projects: 100,
        satisfaction: 100,
        duration: 1.8,
        delay: 0.4,
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

      // Interactive mouse parallax on Griffin artwork
      const heroEl = heroRef.current;
      const imgEl = griffinImgRef.current;
      if (heroEl && imgEl) {
        let mouseX = 0;
        let mouseY = 0;
        let curX = 0;
        let curY = 0;
        let animId = null;

        const onPointerMove = (e) => {
          if (window.innerWidth < 1024) return;
          const rect = heroEl.getBoundingClientRect();
          const nx = (e.clientX - rect.left) / rect.width - 0.5;
          const ny = (e.clientY - rect.top) / rect.height - 0.5;
          mouseX = nx * 12;
          mouseY = ny * 8;
        };

        const onPointerLeave = () => {
          mouseX = 0;
          mouseY = 0;
        };

        const renderParallax = () => {
          curX += (mouseX - curX) * 0.08;
          curY += (mouseY - curY) * 0.08;
          if (imgEl) {
            imgEl.style.transform = `translate3d(${curX.toFixed(2)}px, ${curY.toFixed(2)}px, 0)`;
          }
          animId = requestAnimationFrame(renderParallax);
        };

        heroEl.addEventListener('pointermove', onPointerMove);
        heroEl.addEventListener('pointerleave', onPointerLeave);
        animId = requestAnimationFrame(renderParallax);

        return () => {
          heroEl.removeEventListener('pointermove', onPointerMove);
          heroEl.removeEventListener('pointerleave', onPointerLeave);
          if (animId) cancelAnimationFrame(animId);
        };
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-[510px] lg:min-h-[550px] xl:min-h-[590px] pt-[76px] sm:pt-[82px] pb-[72px] sm:pb-[78px] overflow-hidden flex items-center bg-[#faf7f2]"
      style={{
        background: 'linear-gradient(105deg, #fdfbf7 0%, #f9f6ef 45%, #f1ecdf 100%)',
        color: '#17283d',
      }}
    >
      {/* Background Soft Glow with gentle ambient pulse */}
      <div
        className="absolute right-[5%] top-[8%] w-[45vw] h-[45vw] max-w-[650px] max-h-[600px] pointer-events-none z-0 animate-pulse duration-[8000ms]"
        style={{
          background: 'radial-gradient(ellipse, rgba(255, 238, 204, 0.55) 0%, rgba(246, 235, 214, 0.25) 50%, transparent 75%)',
          filter: 'blur(30px)',
        }}
        aria-hidden="true"
      />

      {/* Ambient Floating Golden Sparkles */}
      <div className="hidden lg:block absolute inset-y-0 right-0 w-[55%] pointer-events-none z-15 overflow-hidden">
        <span className="absolute top-[22%] right-[32%] w-1.5 h-1.5 rounded-full bg-[#f2ae38] opacity-70 animate-ping duration-[3500ms]" />
        <span className="absolute top-[38%] right-[15%] w-2 h-2 rounded-full bg-[#f2ae38]/60 blur-[0.5px] animate-pulse duration-[4200ms]" />
        <span className="absolute top-[58%] right-[42%] w-1.5 h-1.5 rounded-full bg-[#e08e18]/50 animate-pulse duration-[5000ms]" />
      </div>

      {/* Griffin Stage Artwork on Right - Full Bleed Sky to Top Edge */}
      <div
        className="hidden lg:flex absolute top-0 bottom-2 right-0 w-[64%] xl:w-[68%] max-w-[960px] h-full pointer-events-none z-10 items-end justify-end overflow-hidden"
        aria-hidden="true"
      >
        <img
          ref={griffinImgRef}
          src="/griffin-bright-hero.jpg?v=2"
          alt="Griffin Construction Mascot"
          className="w-full h-full object-cover object-right-bottom select-none will-change-transform"
          style={{
            WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.06) 6%, rgba(0,0,0,0.65) 18%, #000 32%)',
            maskImage: 'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.06) 6%, rgba(0,0,0,0.65) 18%, #000 32%)',
            filter: 'saturate(1.04) contrast(1.02)',
          }}
        />
      </div>

      {/* Main Content Area */}
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8 w-full relative z-20">
        <div className="w-full lg:w-[48%] max-w-[530px]">
          {/* Kicker */}
          <div
            ref={kickerRef}
            className="flex items-center gap-2.5 text-[10px] tracking-[0.25em] font-extrabold uppercase text-[#a9660d] mb-1"
          >
            <span>Building tomorrow</span>
            <span className="w-10 h-[1.5px] bg-[#d88918]" />
          </div>

          {/* Headline matching screenshot: Your Vision, Our Construction. */}
          <h1
            ref={headlineRef}
            className="font-serif font-extrabold text-[36px] sm:text-[44px] lg:text-[48px] xl:text-[54px] leading-[1.02] tracking-[-0.035em] text-[#0b1a2c] my-2 sm:my-2.5"
          >
            Your Vision,<br />
            <span className="text-[#c47a16]">Our Construction.</span>
          </h1>

          {/* Copy Description */}
          <p
            ref={copyRef}
            className="text-xs sm:text-[13px] leading-[1.65] text-[#455a70] max-w-[450px] mb-4 font-normal"
          >
            End-to-end construction solutions with strength, precision, and trust. From concept to completion, we build spaces that last for generations.
          </p>

          {/* Action Buttons: Get a Quote -> / Watch Our Story */}
          <div ref={buttonsRef} className="flex flex-wrap items-center gap-2.5 mb-4">
            <button
              onClick={onOpenQuote}
              type="button"
              className="group inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#ea8b0d] hover:bg-[#d67b07] text-[#142338] font-bold text-xs shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
            >
              <span>Get a Quote</span>
              <span className="text-sm font-bold transition-transform group-hover:translate-x-1">→</span>
            </button>

            <button
              onClick={onOpenQuote}
              type="button"
              className="group inline-flex items-center justify-center gap-2 px-4.5 py-2.5 rounded-xl bg-white hover:bg-[#fbf9f4] text-[#142b45] border border-[#d6dde5] font-bold text-xs shadow-2xs hover:border-[#ea8b0d] hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
            >
              <div className="w-4 h-4 rounded-full border border-[#142b45] flex items-center justify-center transition-transform group-hover:scale-110">
                <Play className="w-2 h-2 fill-[#142b45] text-[#142b45] ml-0.5" />
              </div>
              <span>Watch Our Story</span>
            </button>
          </div>

          {/* 4 Distinct Rounded Service Cards with Interactive Hover Tilt */}
          <div className="grid grid-cols-4 gap-2 sm:gap-2.5 max-w-[480px]">
            {/* Card 1 */}
            <div
              ref={(el) => (cardsRef.current[0] = el)}
              className="group bg-white rounded-xl py-2.5 px-1.5 border border-[#ebe4d8] hover:border-[#d88918]/60 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center justify-center cursor-pointer"
            >
              <Home className="w-4 h-4 text-[#c47a16] mb-1 transition-transform group-hover:scale-115" />
              <div className="text-[9px] sm:text-[9.5px] leading-[1.2] text-[#344a60] group-hover:text-[#142338] font-medium transition-colors">
                Residential<br />Construction
              </div>
            </div>

            {/* Card 2 */}
            <div
              ref={(el) => (cardsRef.current[1] = el)}
              className="group bg-white rounded-xl py-2.5 px-1.5 border border-[#ebe4d8] hover:border-[#d88918]/60 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center justify-center cursor-pointer"
            >
              <Building2 className="w-4 h-4 text-[#c47a16] mb-1 transition-transform group-hover:scale-115" />
              <div className="text-[9px] sm:text-[9.5px] leading-[1.2] text-[#344a60] group-hover:text-[#142338] font-medium transition-colors">
                Commercial<br />Projects
              </div>
            </div>

            {/* Card 3 */}
            <div
              ref={(el) => (cardsRef.current[2] = el)}
              className="group bg-white rounded-xl py-2.5 px-1.5 border border-[#ebe4d8] hover:border-[#d88918]/60 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center justify-center cursor-pointer"
            >
              <HardHat className="w-4 h-4 text-[#c47a16] mb-1 transition-transform group-hover:scale-115" />
              <div className="text-[9px] sm:text-[9.5px] leading-[1.2] text-[#344a60] group-hover:text-[#142338] font-medium transition-colors">
                Project<br />Management
              </div>
            </div>

            {/* Card 4 */}
            <div
              ref={(el) => (cardsRef.current[3] = el)}
              className="group bg-white rounded-xl py-2.5 px-1.5 border border-[#ebe4d8] hover:border-[#d88918]/60 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center justify-center cursor-pointer"
            >
              <Wrench className="w-4 h-4 text-[#c47a16] mb-1 transition-transform group-hover:scale-115" />
              <div className="text-[9px] sm:text-[9.5px] leading-[1.2] text-[#344a60] group-hover:text-[#142338] font-medium transition-colors">
                Renovation &<br />Remodeling
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Artwork Preview */}
        <div className="lg:hidden mt-5 rounded-2xl overflow-hidden aspect-[886/560] max-w-md mx-auto shadow-md border border-[#142b45]/10">
          <img
            src="/griffin-bright-hero.jpg?v=2"
            alt="Griffin Construction Mascot"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Floating White Premium Stats Bar with Scroll Parallax */}
      <div
        ref={statsBarRef}
        className="absolute z-30 left-1/2 -translate-x-1/2 bottom-2 sm:bottom-3 w-[calc(100%-24px)] sm:w-[calc(100%-40px)] max-w-[1140px] will-change-transform"
      >
        <div className="bg-white/95 backdrop-blur-md py-3.5 sm:py-4 px-3 sm:px-6 rounded-2xl sm:rounded-3xl shadow-[0_14px_42px_rgba(20,38,60,0.07),0_2px_8px_rgba(0,0,0,0.03)] border border-[#ede7de] grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-0 divide-y sm:divide-y-0 sm:divide-x divide-[#e8e2d8]">
          {/* Stat 1 */}
          <div className="flex items-center justify-center gap-2.5 sm:gap-3 py-2 sm:py-1 px-2 sm:px-4 group cursor-default">
            <div className="font-serif font-bold text-3xl sm:text-[34px] lg:text-[38px] text-[#b8741a] group-hover:text-[#9e6010] transition-colors leading-none tracking-tight flex items-baseline">
              <span>{counts.years}</span>
              <span className="font-light text-2xl sm:text-[26px] text-[#c58226] ml-0.5">+</span>
            </div>
            <span className="text-xs sm:text-[12.5px] text-[#4b596a] leading-tight font-normal max-w-[95px] sm:max-w-[110px]">
              Years of experience
            </span>
          </div>

          {/* Stat 2 */}
          <div className="flex items-center justify-center gap-2.5 sm:gap-3 py-2 sm:py-1 px-2 sm:px-4 group cursor-default">
            <div className="font-serif font-bold text-3xl sm:text-[34px] lg:text-[38px] text-[#b8741a] group-hover:text-[#9e6010] transition-colors leading-none tracking-tight flex items-baseline">
              <span>{counts.experts}</span>
              <span className="font-light text-2xl sm:text-[26px] text-[#c58226] ml-0.5">+</span>
            </div>
            <span className="text-xs sm:text-[12.5px] text-[#4b596a] leading-tight font-normal max-w-[95px] sm:max-w-[110px]">
              Expert professionals
            </span>
          </div>

          {/* Stat 3 */}
          <div className="flex items-center justify-center gap-2.5 sm:gap-3 py-2 sm:py-1 px-2 sm:px-4 group cursor-default">
            <div className="font-serif font-bold text-3xl sm:text-[34px] lg:text-[38px] text-[#b8741a] group-hover:text-[#9e6010] transition-colors leading-none tracking-tight flex items-baseline">
              <span>{counts.projects}</span>
              <span className="font-light text-2xl sm:text-[26px] text-[#c58226] ml-0.5">+</span>
            </div>
            <span className="text-xs sm:text-[12.5px] text-[#4b596a] leading-tight font-normal max-w-[95px] sm:max-w-[110px]">
              Projects completed
            </span>
          </div>

          {/* Stat 4 */}
          <div className="flex items-center justify-center gap-2.5 sm:gap-3 py-2 sm:py-1 px-2 sm:px-4 group cursor-default">
            <div className="font-serif font-bold text-3xl sm:text-[34px] lg:text-[38px] text-[#b8741a] group-hover:text-[#9e6010] transition-colors leading-none tracking-tight flex items-baseline">
              <span>{counts.satisfaction}</span>
              <span className="font-serif text-xl sm:text-[23px] text-[#b8741a] ml-0.5 font-normal">%</span>
            </div>
            <span className="text-xs sm:text-[12.5px] text-[#4b596a] leading-tight font-normal max-w-[105px] sm:max-w-[120px]">
              Commitment to quality
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
