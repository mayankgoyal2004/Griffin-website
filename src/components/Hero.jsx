import React, { useRef, useEffect, useState } from 'react';
import { Home, Building2, HardHat, Wrench, Play } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Hero({ onOpenQuote }) {
  const heroRef = useRef(null);
  const kickerRef = useRef(null);
  const headlineRef = useRef(null);
  const copyRef = useRef(null);
  const buttonsRef = useRef(null);
  const cardsRef = useRef([]);
  const griffinImgRef = useRef(null);
  const statsBarRef = useRef(null);

  const [counts, setCounts] = useState({
    years: 10,
    experts: 50,
    projects: 100,
    satisfaction: 100,
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        kickerRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5 }
      )
        .fromTo(
          headlineRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.7 },
          '-=0.3'
        )
        .fromTo(
          copyRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          '-=0.4'
        )
        .fromTo(
          buttonsRef.current,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.5 },
          '-=0.3'
        )
        .fromTo(
          cardsRef.current,
          { opacity: 0, y: 25, scale: 0.94 },
          { opacity: 1, y: 0, scale: 1, duration: 0.55, stagger: 0.08 },
          '-=0.3'
        );

      // Griffin artwork dramatic entrance
      if (griffinImgRef.current) {
        gsap.fromTo(
          griffinImgRef.current,
          { opacity: 0, scale: 0.96, x: 40 },
          { opacity: 1, scale: 1, x: 0, duration: 1.1, ease: 'power2.out' },
          0.1
        );

        // Gentle floating breathing animation
        gsap.to(griffinImgRef.current, {
          y: -8,
          duration: 3.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });

        // Parallax depth on Griffin during page scroll
        gsap.to(griffinImgRef.current, {
          y: 45,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.2,
          },
        });
      }

      // Parallax float on desktop stats bar as user scrolls
      if (statsBarRef.current && window.innerWidth >= 1024) {
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

      // Interactive mouse parallax on Griffin artwork (Desktop only)
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
      className="relative min-h-0 lg:min-h-[550px] xl:min-h-[590px] pt-[84px] sm:pt-[92px] pb-10 sm:pb-12 lg:pb-[82px] overflow-hidden flex flex-col justify-center bg-[#faf7f2]"
      style={{
        background: 'linear-gradient(105deg, #fdfbf7 0%, #f9f6ef 45%, #f1ecdf 100%)',
        color: '#17283d',
      }}
    >
      {/* Background Soft Glow */}
      <div
        className="absolute right-[5%] top-[8%] w-[45vw] h-[45vw] max-w-[650px] max-h-[600px] pointer-events-none z-0 animate-pulse duration-[8000ms]"
        style={{
          background: 'radial-gradient(ellipse, rgba(255, 238, 204, 0.55) 0%, rgba(246, 235, 214, 0.25) 50%, transparent 75%)',
          filter: 'blur(30px)',
        }}
        aria-hidden="true"
      />

      {/* Ambient Floating Golden Sparkles (Desktop) */}
      <div className="hidden lg:block absolute inset-y-0 right-0 w-[55%] pointer-events-none z-15 overflow-hidden">
        <span className="absolute top-[22%] right-[32%] w-1.5 h-1.5 rounded-full bg-[#f2ae38] opacity-70 animate-ping duration-[3500ms]" />
        <span className="absolute top-[38%] right-[15%] w-2 h-2 rounded-full bg-[#f2ae38]/60 blur-[0.5px] animate-pulse duration-[4200ms]" />
        <span className="absolute top-[58%] right-[42%] w-1.5 h-1.5 rounded-full bg-[#e08e18]/50 animate-pulse duration-[5000ms]" />
      </div>

      {/* Griffin Stage Artwork on Right (Desktop Only) */}
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

          {/* Headline: Your Vision, Our Construction. */}
          <h1
            ref={headlineRef}
            className="font-serif font-extrabold text-[32px] sm:text-[42px] lg:text-[48px] xl:text-[54px] leading-[1.04] tracking-[-0.035em] text-[#0b1a2c] my-2 sm:my-2.5"
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

          {/* Action Buttons */}
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

          {/* 4 Service Cards */}
          <div className="grid grid-cols-4 gap-2 sm:gap-2.5 max-w-[480px]">
            {/* Card 1 */}
            <div
              ref={(el) => (cardsRef.current[0] = el)}
              className="group bg-white rounded-xl py-2 sm:py-2.5 px-1 border border-[#ebe4d8] hover:border-[#d88918]/60 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center justify-center cursor-pointer"
            >
              <Home className="w-4 h-4 text-[#c47a16] mb-1 transition-transform group-hover:scale-115" />
              <div className="text-[8.5px] sm:text-[9.5px] leading-[1.2] text-[#344a60] group-hover:text-[#142338] font-medium transition-colors">
                Residential<br />Construction
              </div>
            </div>

            {/* Card 2 */}
            <div
              ref={(el) => (cardsRef.current[1] = el)}
              className="group bg-white rounded-xl py-2 sm:py-2.5 px-1 border border-[#ebe4d8] hover:border-[#d88918]/60 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center justify-center cursor-pointer"
            >
              <Building2 className="w-4 h-4 text-[#c47a16] mb-1 transition-transform group-hover:scale-115" />
              <div className="text-[8.5px] sm:text-[9.5px] leading-[1.2] text-[#344a60] group-hover:text-[#142338] font-medium transition-colors">
                Commercial<br />Projects
              </div>
            </div>

            {/* Card 3 */}
            <div
              ref={(el) => (cardsRef.current[2] = el)}
              className="group bg-white rounded-xl py-2 sm:py-2.5 px-1 border border-[#ebe4d8] hover:border-[#d88918]/60 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center justify-center cursor-pointer"
            >
              <HardHat className="w-4 h-4 text-[#c47a16] mb-1 transition-transform group-hover:scale-115" />
              <div className="text-[8.5px] sm:text-[9.5px] leading-[1.2] text-[#344a60] group-hover:text-[#142338] font-medium transition-colors">
                Project<br />Management
              </div>
            </div>

            {/* Card 4 */}
            <div
              ref={(el) => (cardsRef.current[3] = el)}
              className="group bg-white rounded-xl py-2 sm:py-2.5 px-1 border border-[#ebe4d8] hover:border-[#d88918]/60 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center justify-center cursor-pointer"
            >
              <Wrench className="w-4 h-4 text-[#c47a16] mb-1 transition-transform group-hover:scale-115" />
              <div className="text-[8.5px] sm:text-[9.5px] leading-[1.2] text-[#344a60] group-hover:text-[#142338] font-medium transition-colors">
                Renovation &<br />Remodeling
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Artwork Preview - Full Natural Clearance */}
        <div className="lg:hidden mt-6 mb-5 rounded-2xl overflow-hidden aspect-[16/10] max-w-md mx-auto shadow-md border border-[#142b45]/10">
          <img
            src="/griffin-bright-hero.jpg?v=2"
            alt="Griffin Construction Mascot"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Mobile Stats Card (In Normal Flow, Perfectly Positioned Below Image) */}
        <div className="block lg:hidden w-full max-w-md mx-auto">
          <div className="bg-white/95 backdrop-blur-md py-4 px-4 rounded-2xl shadow-[0_10px_30px_rgba(20,38,60,0.08)] border border-[#ede7de] grid grid-cols-2 gap-y-4 gap-x-2">
            {/* Stat 1 */}
            <div className="flex items-center justify-center gap-2 py-1 px-1">
              <div className="font-serif font-bold text-2xl text-[#b8741a] leading-none tracking-tight flex items-baseline">
                <span>{counts.years}</span>
                <span className="font-light text-xl text-[#c58226] ml-0.5">+</span>
              </div>
              <span className="text-[11px] text-[#4b596a] leading-tight font-normal max-w-[85px]">
                Years of experience
              </span>
            </div>

            {/* Stat 2 */}
            <div className="flex items-center justify-center gap-2 py-1 px-1">
              <div className="font-serif font-bold text-2xl text-[#b8741a] leading-none tracking-tight flex items-baseline">
                <span>{counts.experts}</span>
                <span className="font-light text-xl text-[#c58226] ml-0.5">+</span>
              </div>
              <span className="text-[11px] text-[#4b596a] leading-tight font-normal max-w-[85px]">
                Expert professionals
              </span>
            </div>

            {/* Stat 3 */}
            <div className="flex items-center justify-center gap-2 py-1 px-1">
              <div className="font-serif font-bold text-2xl text-[#b8741a] leading-none tracking-tight flex items-baseline">
                <span>{counts.projects}</span>
                <span className="font-light text-xl text-[#c58226] ml-0.5">+</span>
              </div>
              <span className="text-[11px] text-[#4b596a] leading-tight font-normal max-w-[85px]">
                Projects completed
              </span>
            </div>

            {/* Stat 4 */}
            <div className="flex items-center justify-center gap-2 py-1 px-1">
              <div className="font-serif font-bold text-2xl text-[#b8741a] leading-none tracking-tight flex items-baseline">
                <span>{counts.satisfaction}</span>
                <span className="font-serif text-lg text-[#b8741a] ml-0.5 font-normal">%</span>
              </div>
              <span className="text-[11px] text-[#4b596a] leading-tight font-normal max-w-[95px]">
                Commitment to quality
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Floating White Premium Stats Bar with Scroll Parallax */}
      <div
        ref={statsBarRef}
        className="hidden lg:block absolute z-30 left-1/2 -translate-x-1/2 bottom-3 w-[calc(100%-40px)] max-w-[1140px] will-change-transform"
      >
        <div className="bg-white/95 backdrop-blur-md py-4 px-6 rounded-3xl shadow-[0_14px_42px_rgba(20,38,60,0.07),0_2px_8px_rgba(0,0,0,0.03)] border border-[#ede7de] grid grid-cols-4 divide-x divide-[#e8e2d8]">
          {/* Stat 1 */}
          <div className="flex items-center justify-center gap-3 py-1 px-4 group cursor-default">
            <div className="font-serif font-bold text-[34px] lg:text-[38px] text-[#b8741a] group-hover:text-[#9e6010] transition-colors leading-none tracking-tight flex items-baseline">
              <span>{counts.years}</span>
              <span className="font-light text-[26px] text-[#c58226] ml-0.5">+</span>
            </div>
            <span className="text-[12.5px] text-[#4b596a] leading-tight font-normal max-w-[110px]">
              Years of experience
            </span>
          </div>

          {/* Stat 2 */}
          <div className="flex items-center justify-center gap-3 py-1 px-4 group cursor-default">
            <div className="font-serif font-bold text-[34px] lg:text-[38px] text-[#b8741a] group-hover:text-[#9e6010] transition-colors leading-none tracking-tight flex items-baseline">
              <span>{counts.experts}</span>
              <span className="font-light text-[26px] text-[#c58226] ml-0.5">+</span>
            </div>
            <span className="text-[12.5px] text-[#4b596a] leading-tight font-normal max-w-[110px]">
              Expert professionals
            </span>
          </div>

          {/* Stat 3 */}
          <div className="flex items-center justify-center gap-3 py-1 px-4 group cursor-default">
            <div className="font-serif font-bold text-[34px] lg:text-[38px] text-[#b8741a] group-hover:text-[#9e6010] transition-colors leading-none tracking-tight flex items-baseline">
              <span>{counts.projects}</span>
              <span className="font-light text-[26px] text-[#c58226] ml-0.5">+</span>
            </div>
            <span className="text-[12.5px] text-[#4b596a] leading-tight font-normal max-w-[110px]">
              Projects completed
            </span>
          </div>

          {/* Stat 4 */}
          <div className="flex items-center justify-center gap-3 py-1 px-4 group cursor-default">
            <div className="font-serif font-bold text-[34px] lg:text-[38px] text-[#b8741a] group-hover:text-[#9e6010] transition-colors leading-none tracking-tight flex items-baseline">
              <span>{counts.satisfaction}</span>
              <span className="font-serif text-[23px] text-[#b8741a] ml-0.5 font-normal">%</span>
            </div>
            <span className="text-[12.5px] text-[#4b596a] leading-tight font-normal max-w-[120px]">
              Commitment to quality
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
