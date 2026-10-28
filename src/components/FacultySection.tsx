import React from 'react';
import { FACULTY_MEMBERS } from '../data/coursesData';

export const FacultySection: React.FC = () => {
  return (
    <section className="py-14 sm:py-20 px-4 sm:px-8 max-w-7xl mx-auto space-y-12 border-t border-white/10">
      {/* Split Top Header (Matching Screenshot) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
        <div className="lg:col-span-7">
          <h2 className="font-['Oswald'] font-black text-3xl sm:text-5xl lg:text-6xl tracking-wider text-white uppercase leading-none">
            TRAIN WITH OUR INDUSTRY-LEADING FACULTY
          </h2>
        </div>
        <div className="lg:col-span-5">
          <p className="font-sans text-xs sm:text-sm text-neutral-300 leading-relaxed">
            Belajar terus daripada penyelidik, jurutera machine learning, dan arkitek AI yang sedang aktif membina sistem pintar berprestasi tinggi di peringkat industri dan global.
          </p>
        </div>
      </div>

      {/* 2 Rows × 5 Columns Portrait Grid (10 Faculty Members) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
        {FACULTY_MEMBERS.map((faculty) => (
          <div
            key={faculty.id}
            className="group relative aspect-[4/5] overflow-hidden bg-neutral-900 border border-white/10 hover:border-white/50 transition-all cursor-pointer shadow-md"
          >
            {/* Portrait Photo */}
            <img
              src={faculty.image}
              alt={faculty.name}
              className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 filter grayscale contrast-125 group-hover:grayscale-0"
            />
            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/40" />

            {/* Name at Top-Right / Top-Center (Matching Screenshot layout) */}
            <div className="absolute top-2.5 inset-x-2 text-center">
              <span className="font-sans font-bold text-xs sm:text-sm tracking-wide text-white drop-shadow-md">
                {faculty.name}
              </span>
            </div>

            {/* Bottom Role & Affiliation on Hover */}
            <div className="absolute inset-x-0 bottom-0 p-3 space-y-1 text-center bg-black/85 backdrop-blur-xs transform translate-y-1 group-hover:translate-y-0 transition-transform">
              <div className="font-sans font-semibold text-[11px] text-amber-400 truncate">
                {faculty.role}
              </div>
              <div className="font-sans text-[10px] text-neutral-400 truncate">
                {faculty.affiliation}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
