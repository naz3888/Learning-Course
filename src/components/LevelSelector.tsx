import React from 'react';
import { Award, ChevronRight, CheckCircle2 } from 'lucide-react';
import { CourseLevel } from '../types';
import { LEVELS_CONFIG } from '../data/coursesData';

interface LevelSelectorProps {
  selectedLevel: CourseLevel;
  onSelectLevel: (level: CourseLevel) => void;
  onOpenQuiz: (level: CourseLevel) => void;
  quizScore?: number;
  completedLessonsInLevel: number;
  totalLessonsInLevel: number;
}

export const LevelSelector: React.FC<LevelSelectorProps> = ({
  selectedLevel,
  onSelectLevel,
  onOpenQuiz,
  quizScore,
  completedLessonsInLevel,
  totalLessonsInLevel
}) => {
  const currentInfo = LEVELS_CONFIG[selectedLevel];
  const isQuizPassed = (quizScore ?? 0) >= 80;

  return (
    <div className="space-y-6">
      {/* Top Header & Segmented Pill Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-[#86868b]">
            Pilih Sukatan
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-[#1d1d1f]">
            Tahap Pengajian
          </h2>
        </div>

        {/* Clean Segmented Switcher */}
        <div className="p-1 rounded-full bg-[#e8e8ed] flex items-center gap-1 text-xs font-medium self-start sm:self-auto">
          {(['level_1', 'level_2', 'level_3'] as CourseLevel[]).map((lvl) => {
            const info = LEVELS_CONFIG[lvl];
            const isSelected = selectedLevel === lvl;

            return (
              <button
                key={lvl}
                onClick={() => onSelectLevel(lvl)}
                className={`py-2 px-4 rounded-full transition-all whitespace-nowrap ${
                  isSelected
                    ? 'bg-white text-[#1d1d1f] shadow-xs font-semibold'
                    : 'text-[#6e6e73] hover:text-[#1d1d1f]'
                }`}
              >
                {info.badge.split(':')[0]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Spacious Level Overview Card */}
      <div className="bg-white rounded-3xl border border-[rgba(0,0,0,0.06)] p-6 sm:p-8 shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Details (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2 text-xs font-medium text-[#86868b]">
              <span className="text-[#0071e3] font-semibold">{currentInfo.badge}</span>
              <span>·</span>
              <span>{currentInfo.totalModules} Modul</span>
              <span>·</span>
              <span>{currentInfo.totalLessons} Pelajaran</span>
              <span>·</span>
              <span>{currentInfo.estimatedHours}</span>
            </div>

            <h3 className="text-2xl font-bold tracking-tight text-[#1d1d1f]">
              {currentInfo.title}
            </h3>

            <p className="text-sm text-[#6e6e73] leading-relaxed font-normal">
              {currentInfo.description}
            </p>

            {/* Outcomes */}
            <div className="pt-1 space-y-2">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#1d1d1f]">
                Fokus Penguasaan:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#515154]">
                {currentInfo.learningOutcomes.map((outcome, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#0071e3] shrink-0 mt-0.5" />
                    <span>{outcome}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-3 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onOpenQuiz(selectedLevel)}
                className={`px-5 py-2 rounded-full text-xs font-medium transition-all ${
                  isQuizPassed
                    ? 'bg-[#e8f5e9] text-[#2e7d32] border border-[#c8e6c9]'
                    : 'bg-[#0071e3] text-white hover:bg-[#0077ed]'
                }`}
              >
                {isQuizPassed
                  ? `Lulus Ujian (${quizScore}%)`
                  : quizScore !== undefined
                  ? `Skor: ${quizScore}% - Cuba Lagi`
                  : `Ambil Ujian Tahap Ini`}
              </button>

              <div className="text-xs text-[#86868b]">
                Status: <span className="font-semibold text-[#1d1d1f]">{completedLessonsInLevel}/{totalLessonsInLevel} Video Ditonton</span>
              </div>
            </div>
          </div>

          {/* Visual (5 Cols) */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-[#1d1d1f] shadow-inner">
              <img
                src={currentInfo.coverImage}
                alt={currentInfo.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-5">
                <div className="text-white text-xs">
                  <div className="font-semibold">{currentInfo.targetAudience}</div>
                  <div className="text-[#86868b] text-[11px] mt-0.5">Pra-syarat: {currentInfo.prerequisites}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
