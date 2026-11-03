import React from 'react';
import { ArrowRight } from 'lucide-react';
import { teamMembers } from '../data/websiteData';

export default function Team({ onOpenQuote }) {
  return (
    <section id="team" className="py-20 sm:py-24 bg-[#e4edf0] text-[#142b45] relative">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Team Intro Column */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[11px] font-extrabold uppercase tracking-[0.24em] text-[#b46e11]">
                Our Team
              </span>
              <span className="w-8 h-[2px] bg-[#d88918]" />
            </div>
            <h2 className="font-serif font-bold text-3xl sm:text-4xl text-[#142b45] tracking-tight leading-tight mb-4">
              The People Behind<br />Griffin Construction
            </h2>
            <p className="text-sm text-[#586d80] leading-relaxed mb-6 max-w-[340px]">
              A team of experienced professionals, engineers and project managers who turn vision into reality.
            </p>
            <button
              onClick={onOpenQuote}
              type="button"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold text-[#182b40] bg-[#f2ae38] hover:bg-[#f8bd59] shadow-md transition-all cursor-pointer"
            >
              <span>Meet Our Team</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* 4 Team Member Cards */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className="bg-white rounded-xl overflow-hidden border border-[#d5a04b]/50 shadow-[0_8px_20px_rgba(27,48,69,0.08)] hover:shadow-[0_14px_30px_rgba(27,48,69,0.15)] hover:-translate-y-1 transition-all duration-300 text-center flex flex-col"
              >
                <div className="relative h-44 sm:h-48 overflow-hidden bg-[#e2e8f0]">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-3.5 flex-1 flex flex-col justify-center">
                  <h3 className="font-serif font-bold text-sm text-[#142b45] truncate">
                    {member.name}
                  </h3>
                  <p className="text-[11px] text-[#637184] mt-0.5 truncate">
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
