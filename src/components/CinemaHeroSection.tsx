import React from 'react';
import { Play, Sparkles } from 'lucide-react';

interface CinemaHeroSectionProps {
  onStartLearning: () => void;
  onExploreCourses: () => void;
}

export const CinemaHeroSection: React.FC<CinemaHeroSectionProps> = ({
  onStartLearning,
  onExploreCourses
}) => {
  return (
    <section className="relative w-full min-h-[70vh] sm:min-h-[80vh] flex flex-col items-center justify-center text-center px-4 sm:px-6 overflow-hidden bg-black">
      {/* Background Image with Dark Cinematic Overlays */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_ai_learning_1792520564015.jpg"
          alt="Akademi AI Online"
          className="w-full h-full object-cover object-center opacity-45 scale-105"
        />
        {/* Gradients to blend into pure black */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/80" />
        <div className="absolute inset-0 bg-radial from-transparent via-black/40 to-black" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto space-y-6 pt-12 pb-16">
        {/* Main Huge Condensed Impact Headline (Matching Screenshot: CLI CONSERVATORY ONLINE) */}
        <div className="space-y-3">
          <h1 className="font-['Oswald'] font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-wider text-white uppercase leading-none drop-shadow-md">
            AKADEMI AI ONLINE
          </h1>
          <p className="font-sans text-xs sm:text-sm md:text-base font-semibold uppercase tracking-[0.25em] text-neutral-300 max-w-3xl mx-auto">
            PROFESSIONAL-LEVEL AI TRAINING. ANYTIME, ANYWHERE.
          </p>
        </div>

        {/* Supporting Malay Description */}
        <p className="font-sans text-xs sm:text-sm text-neutral-400 max-w-2xl mx-auto leading-relaxed">
          Silibus latihan kecerdasan buatan komprehensif mengikut tahap. Pelajari asas prompt, model generatif, saluran RAG sehingga ejen autonomi daripada peneraju industri.
        </p>

        {/* Center White CTA Button (Matching Screenshot: START YOUR FREE TRIAL) */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onStartLearning}
            className="w-full sm:w-auto px-8 py-3.5 bg-white text-black font-sans font-bold uppercase tracking-wider text-xs sm:text-sm hover:bg-neutral-200 transition-all shadow-lg active:scale-95 cursor-pointer"
          >
            MULA MODUL PERCUMA
          </button>

          <button
            onClick={onExploreCourses}
            className="w-full sm:w-auto px-7 py-3.5 bg-transparent border border-white/30 text-white font-sans font-bold uppercase tracking-wider text-xs sm:text-sm hover:border-white hover:bg-white/10 transition-all"
          >
            TEROKAI TAHAP & MODUL
          </button>
        </div>

        {/* Subtle Credibility Bar */}
        <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-[11px] uppercase tracking-widest text-neutral-400 font-semibold">
          <span>18 Pelajaran Video HD</span>
          <span className="text-white/20">|</span>
          <span>10 Pakar Industri</span>
          <span className="text-white/20">|</span>
          <span>14,000+ Pelajar Berdaftar</span>
          <span className="text-white/20">|</span>
          <span>Sijil Tamat Rasmi</span>
        </div>
      </div>
    </section>
  );
};
