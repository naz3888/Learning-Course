import React from 'react';
import { Play, Users, CheckCircle, Sparkles, BookOpen, Download, ChevronRight } from 'lucide-react';
import { CourseLevel } from '../types';
import { INSTRUCTOR_DATA, LEVELS_CONFIG } from '../data/coursesData';

interface CourseHeroDomestikaProps {
  selectedLevel: CourseLevel;
  onSelectLevel: (lvl: CourseLevel) => void;
  onStartLearning: () => void;
  onOpenPromptLab: () => void;
  completedLessonsCount: number;
  totalLessonsCount: number;
}

export const CourseHeroDomestika: React.FC<CourseHeroDomestikaProps> = ({
  selectedLevel,
  onStartLearning,
  onOpenPromptLab,
  completedLessonsCount,
  totalLessonsCount
}) => {
  const currentLevelInfo = LEVELS_CONFIG[selectedLevel];

  return (
    <section className="relative bg-[#1d1d1f] text-white pt-12 pb-16 sm:pt-16 sm:pb-20 border-b border-[rgba(255,255,255,0.08)] overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Clean Editorial Title & Bio (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#86868b] uppercase tracking-wider">
              <span>Modul Profesional AI</span>
              <span>·</span>
              <span className="text-[#0071e3] font-bold">100% Tajaan Komuniti</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.14]">
              Kuasai Kecerdasan Buatan & Kejuruteraan Prompt
            </h1>

            <p className="text-base sm:text-lg text-[#a1a1a6] font-normal leading-relaxed max-w-xl">
              Silibus komprehensif dari asas hingga tahap lanjutan. Tonton video kurikulum, buat amali di makmal interaktif, dan bina portfolio projek profesional.
            </p>

            {/* Instructor Byline */}
            <div className="flex items-center gap-4 pt-1">
              <img
                src={INSTRUCTOR_DATA.avatar}
                alt={INSTRUCTOR_DATA.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-white/20 shadow-md shrink-0"
              />
              <div className="text-xs">
                <div className="text-[#86868b]">Diajar oleh</div>
                <div className="font-semibold text-white text-sm">
                  {INSTRUCTOR_DATA.name}
                </div>
                <div className="text-[#86868b] text-[11px] truncate max-w-xs sm:max-w-md">
                  {INSTRUCTOR_DATA.title}
                </div>
              </div>
            </div>

            {/* Clean Proof Strip */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-[#a1a1a6] pt-4 border-t border-white/10">
              <div className="flex items-center gap-1.5 text-amber-400 font-semibold">
                <span>★ 4.95</span>
                <span className="text-[#86868b] font-normal">(2,410 ulasan)</span>
              </div>
              <span className="text-[#86868b]">·</span>
              <div>
                <span className="font-semibold text-white">{INSTRUCTOR_DATA.studentsCount}</span> pelajar
              </div>
              <span className="text-[#86868b]">·</span>
              <div className="text-emerald-400 font-medium">99% Maklum Balas Positif</div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onStartLearning}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold bg-[#0071e3] hover:bg-[#0077ed] text-white transition-all shadow-md"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Mula Menonton Pelajaran</span>
              </button>

              <button
                onClick={onOpenPromptLab}
                className="inline-flex items-center gap-1.5 px-5 py-3 rounded-full text-xs font-semibold bg-white/10 hover:bg-white/15 text-white transition-all"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#0071e3]" />
                <span>Makmal Prompt CRTF</span>
              </button>
            </div>
          </div>

          {/* Right Column: Video Trailer Card (5 Cols) */}
          <div className="lg:col-span-5">
            <div className="bg-[#2c2c2e] rounded-3xl border border-white/10 overflow-hidden shadow-2xl p-6 space-y-5">
              <div
                className="relative rounded-2xl overflow-hidden aspect-video bg-black group cursor-pointer"
                onClick={onStartLearning}
              >
                <img
                  src={currentLevelInfo.coverImage}
                  alt={currentLevelInfo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-white/95 text-[#1d1d1f] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform pl-0.5">
                    <Play className="w-5 h-5 fill-[#1d1d1f]" />
                  </div>
                </div>
                <div className="absolute bottom-3 left-3 bg-black/75 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-semibold text-white">
                  Pengenalan Kursus
                </div>
              </div>

              {/* Highlights List */}
              <div className="space-y-2.5 text-xs text-[#a1a1a6] pt-1">
                <div className="flex items-center justify-between text-white font-medium pb-2 border-b border-white/10">
                  <span>Akses Penuh Portal:</span>
                  <span className="text-emerald-400 font-semibold">Percuma & Terbuka</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#0071e3]">✓</span>
                  <span>18 Pelajaran Video HD Mengikut 3 Tahap</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#0071e3]">✓</span>
                  <span>Projek Akhir Dunia Sebenar untuk Portfolio</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#0071e3]">✓</span>
                  <span>Sijil Pengiktirafan Rasmi dengan Pengesahan Siri</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
