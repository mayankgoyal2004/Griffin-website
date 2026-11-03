import React, { useRef } from 'react';

export default function Services({ onSelectService }) {
  const cardsRef = useRef([]);

  const services = [
    {
      id: 'real-estate',
      title: (
        <>
          Real Estate<br />Development
        </>
      ),
      rawTitle: 'Real Estate Development',
      photo: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=85',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-[22px] h-[22px]">
          <path d="M3 11 12 3l9 8M5 10v11h14V10M9 21v-7h6v7" />
        </svg>
      ),
      description: 'End-to-end property development with modern design and high value.',
    },
    {
      id: 'transport',
      title: (
        <>
          Transport<br />& Logistics
        </>
      ),
      rawTitle: 'Transport & Logistics',
      photo: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=85',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-[22px] h-[22px]">
          <path d="M2 6h13v11H2zM15 10h4l3 4v3h-7M6 17a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
        </svg>
      ),
      description: 'Reliable material transport and on-site logistics support for timely execution.',
    },
    {
      id: 'inspections',
      title: (
        <>
          Site<br />Inspections
        </>
      ),
      rawTitle: 'Site Inspections',
      photo: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=800&q=85',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-[22px] h-[22px]">
          <path d="m14 7 3-3 3 3-3 3M4 20l9-9M3 8l5-5 4 4-5 5zM14 14l7 7M17 14l4-4" />
        </svg>
      ),
      description: 'Professional construction, structural, and safety inspections.',
    },
    {
      id: 'websites-digital',
      title: 'Websites & Digital',
      rawTitle: 'Websites & Digital',
      photo: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=800&q=85',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-[22px] h-[22px]">
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
        </svg>
      ),
      description: 'Modern websites for real estate and construction firms.',
    },
  ];

  // 3D perspective tilt on hover matching the original
  const handlePointerMove = (e, index) => {
    if (window.innerWidth < 1024) return;
    const card = cardsRef.current[index];
    if (!card) return;
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `perspective(900px) rotateX(${-y * 4}deg) rotateY(${x * 5}deg) translateY(-7px)`;
  };

  const handlePointerLeave = (index) => {
    const card = cardsRef.current[index];
    if (!card) return;
    card.style.transform = '';
  };

  return (
    <section id="services" className="bg-[#fffdfa] py-16 sm:py-20 relative">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
        {/* Section Heading matching gryfno-construction-light-premium */}
        <div className="text-center mb-9 sm:mb-11">
          <div className="inline-flex items-center justify-center gap-3 text-[10px] font-extrabold uppercase tracking-[0.22em] text-[#b46e11]">
            <span className="w-8 h-[1px] bg-[#d88918]" />
            <span>What we do</span>
            <span className="w-8 h-[1px] bg-[#d88918]" />
          </div>

          <h2 className="font-serif font-bold text-[32px] sm:text-[40px] lg:text-[46px] leading-[1.12] tracking-[-0.03em] text-[#142338] mt-2.5 mb-2">
            Explore Our Services
          </h2>

          <p className="text-xs text-[#657488] leading-[1.7] m-0">
            Comprehensive construction solutions tailored to your needs.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[18px]">
          {services.map((item, idx) => (
            <article
              key={item.id}
              ref={(el) => (cardsRef.current[idx] = el)}
              onPointerMove={(e) => handlePointerMove(e, idx)}
              onPointerLeave={() => handlePointerLeave(idx)}
              onClick={() => onSelectService({ title: item.rawTitle, description: item.description, image: item.photo })}
              className="bg-white border border-[#e8e2d8] rounded-[9px] overflow-hidden shadow-[0_8px_24px_rgba(27,48,69,0.07)] hover:shadow-[0_18px_38px_rgba(27,48,69,0.14)] transition-all duration-300 flex flex-col cursor-pointer"
            >
              {/* Photo */}
              <div className="h-[160px] overflow-hidden relative">
                <img
                  src={item.photo}
                  alt={item.rawTitle}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.07]"
                  loading="lazy"
                />
              </div>

              {/* Body */}
              <div className="p-[16px_17px_17px] relative min-h-[127px] flex-1 flex flex-col justify-between">
                {/* Floating Gold Icon */}
                <span className="absolute -top-[21px] left-[17px] w-[42px] h-[42px] rounded-[10px] bg-[#f2ae38] text-[#142238] grid place-items-center border-[4px] border-white shadow-xs">
                  {item.icon}
                </span>

                {/* Arrow Circle Button */}
                <span className="absolute right-[14px] top-[45px] w-[25px] h-[25px] rounded-full border border-[#d88918] text-[#b46e11] bg-white grid place-items-center text-[14px] leading-none hover:bg-[#d88918] hover:text-white transition-colors">
                  →
                </span>

                <div className="pt-2">
                  <h3 className="font-serif font-bold text-[18px] leading-[1.15] text-[#142338] mr-[25px] mb-[7px]">
                    {item.title}
                  </h3>

                  <p className="text-[10px] leading-[1.6] text-[#637184] m-0 max-w-[230px]">
                    {item.description}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
