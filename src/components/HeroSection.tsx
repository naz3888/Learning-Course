import React from 'react';
import { Play, ChevronRight, Award, Sparkles } from 'lucide-react';
import { CourseLevel } from '../types';

interface HeroSectionProps {
  onStartLearning: () => void;
  onOpenPromptLab: () => void;
  onOpenCertificate: () => void;
  completedLessonsCount: number;
  totalLessonsCount: number;
  selectedLevel: CourseLevel;
  onSelectLevel: (lvl: CourseLevel) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartLearning,
  onOpenPromptLab,
  onOpenCertificate,
  completedLessonsCount,
  totalLessonsCount,
  selectedLevel,
  onSelectLevel
}) => {
  return (
    <section className="relative overflow-hidden bg-[#ffffff] pt-12 pb-16 sm:pt-16 sm:pb-20 border-b border-[rgba(0,0,0,0.06)]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-8">
        {/* Apple-style Eyebrow */}
        <div className="inline-block text-xs font-semibold tracking-wide text-[#6e6e73] uppercase">
          Portal Pendidikan Kecerdasan Buatan Kebangsaan
        </div>

        {/* Apple Iconic Headline */}
        <div className="space-y-2">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#1d1d1f] leading-[1.08]" style={{ textWrap: 'balance' }}>
            Kecerdasan Buatan.
            <span className="block text-[#86868b] font-medium">Bermakna untuk Semua.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-base sm:text-xl text-[#86868b] font-normal leading-relaxed pt-2">
            Pelajari konsep asas, tonton video kurikulum mengikut tahap, buat latihan prompt berstruktur, dan terima sijil pengesahan rasmi.
          </p>
        </div>

        {/* Apple-style CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-1">
          <button
            onClick={onStartLearning}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium bg-[#0071e3] text-white hover:bg-[#0077ed] transition-all shadow-xs"
          >
            <span>Mula Menonton Kursus</span>
          </button>

          <button
            onClick={onOpenPromptLab}
            className="inline-flex items-center gap-1 text-sm font-medium text-[#0071e3] hover:text-[#0077ed] transition-colors py-2 px-3"
          >
            <span>Terokai Makmal Prompt</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Apple Minimalist Level Selector Pill Strip */}
        <div className="pt-4 max-w-xl mx-auto">
          <div className="p-1 rounded-full bg-[#f5f5f7] border border-[rgba(0,0,0,0.06)] flex items-center justify-between text-xs">
            <button
              onClick={() => { onSelectLevel('level_1'); onStartLearning(); }}
              className={`flex-1 py-1.5 px-3 rounded-full font-medium transition-all ${
                selectedLevel === 'level_1'
                  ? 'bg-white text-[#1d1d1f] shadow-xs'
                  : 'text-[#6e6e73] hover:text-[#1d1d1f]'
              }`}
            >
              Tahap 1: Pemula
            </button>
            <button
              onClick={() => { onSelectLevel('level_2'); onStartLearning(); }}
              className={`flex-1 py-1.5 px-3 rounded-full font-medium transition-all ${
                selectedLevel === 'level_2'
                  ? 'bg-white text-[#1d1d1f] shadow-xs'
                  : 'text-[#6e6e73] hover:text-[#1d1d1f]'
              }`}
            >
              Tahap 2: Pengamal
            </button>
            <button
              onClick={() => { onSelectLevel('level_3'); onStartLearning(); }}
              className={`flex-1 py-1.5 px-3 rounded-full font-medium transition-all ${
                selectedLevel === 'level_3'
                  ? 'bg-white text-[#1d1d1f] shadow-xs'
                  : 'text-[#6e6e73] hover:text-[#1d1d1f]'
              }`}
            >
              Tahap 3: Mahir
            </button>
          </div>
        </div>

        {/* Hero Media Showcase (Apple Studio Display style) */}
        <div className="pt-4">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[rgba(0,0,0,0.08)] bg-[#000000] aspect-[16/9] max-w-4xl mx-auto">
            <img
              src="/src/assets/images/hero_ai_learning_1792520564015.jpg"
              alt="Akademi AI Pembelajaran Digital"
              className="w-full h-full object-cover opacity-95 hover:scale-[1.01] transition-transform duration-700 ease-out"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 sm:p-10 text-left">
              <div className="text-xs uppercase tracking-widest text-[#86868b] font-semibold">
                Kurikulum Video Berpandu
              </div>
              <div className="text-lg sm:text-2xl font-semibold text-white tracking-tight mt-1">
                Kuasai Kemahiran AI Tanpa Jargon Mengelirukan
              </div>
              <div className="flex items-center gap-6 text-xs text-[#86868b] mt-2">
                <span>18 Pelajaran Video</span>
                <span>·</span>
                <span>Makmal Amali Terbina</span>
                <span>·</span>
                <span>Sijil Pengiktirafan</span>
              </div>
            </div>
          </div>
        </div>

        {/* Minimalist Apple Feature Stat Strip */}
        <div className="pt-10 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto text-left border-t border-[rgba(0,0,0,0.06)]">
          <div>
            <div className="text-3xl font-bold tracking-tight text-[#1d1d1f] tabular-nums">18</div>
            <div className="text-xs text-[#86868b] mt-0.5">Siri Pelajaran Video</div>
          </div>
          <div>
            <div className="text-3xl font-bold tracking-tight text-[#1d1d1f] tabular-nums">3 Tahap</div>
            <div className="text-xs text-[#86868b] mt-0.5">Pemula, Pengamal & Mahir</div>
          </div>
          <div>
            <div className="text-3xl font-bold tracking-tight text-[#1d1d1f] tabular-nums">100%</div>
            <div className="text-xs text-[#86868b] mt-0.5">Praktikal & Bebas Kos</div>
          </div>
          <div>
            <div className="text-3xl font-bold tracking-tight text-[#1d1d1f] tabular-nums">Sijil Rasmi</div>
            <div className="text-xs text-[#86868b] mt-0.5">Pengesahan Nombor Siri</div>
          </div>
        </div>
      </div>
    </section>
  );
};
