import React from 'react';
import { Play, ArrowUpRight, CheckCircle2, Clock, Video, BookOpen, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CourseLevel, Lesson } from '../types';
import { LEVELS_CONFIG, MODULES_DATA } from '../data/coursesData';

interface BentoCourseGridProps {
  selectedLevel: CourseLevel;
  onSelectLevel: (lvl: CourseLevel) => void;
  onSelectLesson?: (lesson: Lesson) => void;
  onOpenPromptLab?: () => void;
  onOpenVisualizer?: () => void;
  onOpenCertificate?: () => void;
  completedLessonsInLevel: Record<CourseLevel, number>;
}

export const BentoCourseGrid: React.FC<BentoCourseGridProps> = ({
  selectedLevel,
  onSelectLevel,
  onSelectLesson,
  completedLessonsInLevel
}) => {
  const l1 = LEVELS_CONFIG['level_1'];
  const l2 = LEVELS_CONFIG['level_2'];
  const l3 = LEVELS_CONFIG['level_3'];

  // Get modules for the currently selected level
  const activeLevelModules = MODULES_DATA.filter(m => m.level === selectedLevel);
  const activeLevelInfo = LEVELS_CONFIG[selectedLevel];

  const handleModuleClick = (firstLesson: Lesson) => {
    if (onSelectLesson) {
      onSelectLesson(firstLesson);
    }
    const stage = document.getElementById('lesson-theater');
    if (stage) {
      stage.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="space-y-8 pt-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <span className="text-xs font-sans font-bold uppercase tracking-widest text-amber-400">
            LALUAN PENGAJIAN & SILIBUS MODUL
          </span>
          <h2 className="font-['Oswald'] font-black text-3xl sm:text-5xl tracking-wider text-white uppercase mt-0.5">
            TEROKAI MODUL MENGIKUT TAHAP
          </h2>
        </div>
        <p className="font-sans text-xs sm:text-sm text-neutral-400 max-w-md">
          Pilih mana-mana tahap pengajian di bawah untuk memaparkan senarai modul video pembelajaran lengkap.
        </p>
      </div>

      {/* ================= TIGA TAHAP PENGAJIAN (3 Course Level Cards with Full Background Images & Text Overlay) ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* TAHAP 1: PEMULA */}
        <div
          onClick={() => onSelectLevel('level_1')}
          className={`border transition-all duration-300 relative overflow-hidden group cursor-pointer shadow-2xl flex flex-col justify-between p-6 sm:p-7 min-h-[420px] ${
            selectedLevel === 'level_1'
              ? 'border-amber-400/90 ring-2 ring-amber-400/40 bg-black'
              : 'border-white/15 hover:border-white/40 bg-black/50'
          }`}
        >
          {/* Full Background Image */}
          <div className="absolute inset-0 z-0">
            <img
              src={l1.coverImage}
              alt={l1.title}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-90 contrast-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/85 to-black/60" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
            <div className="absolute inset-0 bg-black/20 backdrop-blur-[0.5px]" />
            <div className="absolute -top-20 -left-20 w-60 h-60 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
          </div>

          {/* Overlaid Content */}
          <div className="relative z-10 flex flex-col justify-between h-full space-y-5">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 text-xs font-sans uppercase tracking-widest bg-black/70 border border-white/20 backdrop-blur-md px-3 py-1 shadow-md">
                <span className="text-amber-400 font-bold">{l1.badge}</span>
                <span className="text-neutral-500">·</span>
                <span className="text-neutral-200">{l1.totalLessons} Video</span>
              </div>

              {selectedLevel === 'level_1' ? (
                <span className="flex items-center gap-1 text-[11px] font-sans font-bold uppercase tracking-wider text-black bg-white px-3 py-1 shadow-xl">
                  <CheckCircle2 className="w-3.5 h-3.5 text-black" />
                  <span>Sedang Ditonton</span>
                </span>
              ) : (
                <span className="w-7 h-7 bg-black/70 border border-white/25 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-colors backdrop-blur-md">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              )}
            </div>

            <div className="space-y-2.5 my-auto py-2">
              <h3 className="font-['Oswald'] text-2xl sm:text-3xl font-bold tracking-wide text-amber-400 uppercase leading-[1.1] drop-shadow-lg group-hover:text-amber-300 transition-colors">
                {l1.title}
              </h3>
              <p className="font-sans text-xs text-neutral-200 leading-relaxed line-clamp-3 drop-shadow-md">
                {l1.description}
              </p>
            </div>

            <div className="pt-3 border-t border-white/20 flex items-center justify-between text-xs">
              <div className="text-[11px] text-neutral-300 font-sans uppercase tracking-wider">
                {l1.totalModules} Modul · {l1.estimatedHours}
              </div>
              <div className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider transition-all shadow-xl ${
                selectedLevel === 'level_1'
                  ? 'bg-amber-400 text-black hover:bg-amber-300'
                  : 'bg-white text-black hover:bg-neutral-200'
              }`}>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{selectedLevel === 'level_1' ? 'Mula Belajar' : 'Pilih Tahap 1'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* TAHAP 2: PENGAMAL */}
        <div
          onClick={() => onSelectLevel('level_2')}
          className={`border transition-all duration-300 relative overflow-hidden group cursor-pointer shadow-2xl flex flex-col justify-between p-6 sm:p-7 min-h-[420px] ${
            selectedLevel === 'level_2'
              ? 'border-emerald-400/90 ring-2 ring-emerald-400/40 bg-black'
              : 'border-white/15 hover:border-white/40 bg-black/50'
          }`}
        >
          {/* Full Background Image */}
          <div className="absolute inset-0 z-0">
            <img
              src={l2.coverImage}
              alt={l2.title}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-90 contrast-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/85 to-black/60" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
            <div className="absolute inset-0 bg-black/20 backdrop-blur-[0.5px]" />
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
          </div>

          {/* Overlaid Content */}
          <div className="relative z-10 flex flex-col justify-between h-full space-y-5">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 text-xs font-sans uppercase tracking-widest bg-black/70 border border-white/20 backdrop-blur-md px-3 py-1 shadow-md">
                <span className="text-emerald-400 font-bold">{l2.badge}</span>
                <span className="text-neutral-500">·</span>
                <span className="text-neutral-200">{l2.totalLessons} Video</span>
              </div>

              {selectedLevel === 'level_2' ? (
                <span className="flex items-center gap-1 text-[11px] font-sans font-bold uppercase tracking-wider text-black bg-white px-3 py-1 shadow-xl">
                  <CheckCircle2 className="w-3.5 h-3.5 text-black" />
                  <span>Sedang Ditonton</span>
                </span>
              ) : (
                <span className="w-7 h-7 bg-black/70 border border-white/25 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-colors backdrop-blur-md">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              )}
            </div>

            <div className="space-y-2.5 my-auto py-2">
              <h3 className="font-['Oswald'] text-2xl sm:text-3xl font-bold tracking-wide text-emerald-400 uppercase leading-[1.1] drop-shadow-lg group-hover:text-emerald-300 transition-colors">
                {l2.title}
              </h3>
              <p className="font-sans text-xs text-neutral-200 leading-relaxed line-clamp-3 drop-shadow-md">
                {l2.description}
              </p>
            </div>

            <div className="pt-3 border-t border-white/20 flex items-center justify-between text-xs">
              <div className="text-[11px] text-neutral-300 font-sans uppercase tracking-wider">
                {l2.totalModules} Modul · {l2.estimatedHours}
              </div>
              <div className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider transition-all shadow-xl ${
                selectedLevel === 'level_2'
                  ? 'bg-emerald-400 text-black hover:bg-emerald-300'
                  : 'bg-white text-black hover:bg-neutral-200'
              }`}>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{selectedLevel === 'level_2' ? 'Mula Belajar' : 'Pilih Tahap 2'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* TAHAP 3: MAHIR */}
        <div
          onClick={() => onSelectLevel('level_3')}
          className={`border transition-all duration-300 relative overflow-hidden group cursor-pointer shadow-2xl flex flex-col justify-between p-6 sm:p-7 min-h-[420px] ${
            selectedLevel === 'level_3'
              ? 'border-purple-400/90 ring-2 ring-purple-400/40 bg-black'
              : 'border-white/15 hover:border-white/40 bg-black/50'
          }`}
        >
          {/* Full Background Image */}
          <div className="absolute inset-0 z-0">
            <img
              src={l3.coverImage}
              alt={l3.title}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-90 contrast-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/85 to-black/60" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
            <div className="absolute inset-0 bg-black/20 backdrop-blur-[0.5px]" />
            <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />
          </div>

          {/* Overlaid Content */}
          <div className="relative z-10 flex flex-col justify-between h-full space-y-5">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 text-xs font-sans uppercase tracking-widest bg-black/70 border border-white/20 backdrop-blur-md px-3 py-1 shadow-md">
                <span className="text-purple-400 font-bold">{l3.badge}</span>
                <span className="text-neutral-500">·</span>
                <span className="text-neutral-200">{l3.totalLessons} Video</span>
              </div>

              {selectedLevel === 'level_3' ? (
                <span className="flex items-center gap-1 text-[11px] font-sans font-bold uppercase tracking-wider text-black bg-white px-3 py-1 shadow-xl">
                  <CheckCircle2 className="w-3.5 h-3.5 text-black" />
                  <span>Sedang Ditonton</span>
                </span>
              ) : (
                <span className="w-7 h-7 bg-black/70 border border-white/25 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-colors backdrop-blur-md">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              )}
            </div>

            <div className="space-y-2.5 my-auto py-2">
              <h3 className="font-['Oswald'] text-2xl sm:text-3xl font-bold tracking-wide text-purple-400 uppercase leading-[1.1] drop-shadow-lg group-hover:text-purple-300 transition-colors">
                {l3.title}
              </h3>
              <p className="font-sans text-xs text-neutral-200 leading-relaxed line-clamp-3 drop-shadow-md">
                {l3.description}
              </p>
            </div>

            <div className="pt-3 border-t border-white/20 flex items-center justify-between text-xs">
              <div className="text-[11px] text-neutral-300 font-sans uppercase tracking-wider">
                {l3.totalModules} Modul · {l3.estimatedHours}
              </div>
              <div className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider transition-all shadow-xl ${
                selectedLevel === 'level_3'
                  ? 'bg-purple-400 text-black hover:bg-purple-300'
                  : 'bg-white text-black hover:bg-neutral-200'
              }`}>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{selectedLevel === 'level_3' ? 'Mula Belajar' : 'Pilih Tahap 3'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= MODUL KURSUS ONLY (GANTIKAN MAKMAL & SIMULATOR DENGAN MODUL KURSUS) ================= */}
      <div className="pt-6 space-y-4">
        {/* Module Section Subheader */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse"></span>
            <span className="text-xs font-sans font-bold uppercase tracking-wider text-amber-400">
              SENARAI MODUL SILIBUS
            </span>
            <span className="text-neutral-500">/</span>
            <span className="text-xs font-sans uppercase text-neutral-300">
              {activeLevelInfo.badge} ({activeLevelInfo.title})
            </span>
          </div>
          <span className="text-xs text-neutral-400 font-sans">
            Klik mana-mana modul di bawah untuk terus memulakan video pelajaran
          </span>
        </div>

        {/* 3 Module Cards for the Current Level with Full Cover Images & Motion */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedLevel}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-5"
          >
            {activeLevelModules.map((mod, idx) => {
              const moduleDuration = mod.lessons.reduce((acc, l) => acc + l.durationMinutes, 0);
              const firstLesson = mod.lessons[0];
              const coverImg = mod.coverImage || activeLevelInfo.coverImage;

              return (
                <motion.div
                  key={mod.id}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: idx * 0.08 }}
                  whileHover={{ y: -6, transition: { duration: 0.22, ease: 'easeOut' } }}
                  onClick={() => firstLesson && handleModuleClick(firstLesson)}
                  className="bg-[#0e0e0e] border border-white/15 flex flex-col justify-between group cursor-pointer shadow-xl hover:border-amber-400/70 hover:bg-[#121212] transition-colors relative overflow-hidden"
                >
                  {/* Full Module Cover Image Header */}
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-black border-b border-white/10">
                    <img
                      src={coverImg}
                      alt={mod.title}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out brightness-90 contrast-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                    {/* Top Badge: Modul Number */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-black bg-amber-400 px-2.5 py-1 shadow">
                        MODUL 0{idx + 1}
                      </span>
                      <span className="flex items-center gap-1 text-[10px] text-neutral-200 font-mono bg-black/80 px-2 py-0.5 border border-white/15 backdrop-blur-sm">
                        <Clock className="w-3 h-3 text-amber-400" />
                        <span>{moduleDuration} minit</span>
                      </span>
                    </div>

                    {/* Bottom Image Hover Indicator */}
                    <div className="absolute bottom-2.5 left-3 flex items-center gap-1.5 text-[11px] font-mono text-neutral-300 z-10">
                      <span className="bg-black/80 px-2 py-0.5 border border-white/15 backdrop-blur-sm">
                        {mod.lessons.length} Video Pelajaran
                      </span>
                    </div>
                  </div>

                  {/* Module Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      {/* Module Title */}
                      <h4 className="font-['Oswald'] text-xl font-bold tracking-wide text-white uppercase group-hover:text-amber-400 transition-colors leading-snug">
                        {mod.title}
                      </h4>

                      {/* Module Description */}
                      <p className="font-sans text-xs text-neutral-300 leading-relaxed line-clamp-2">
                        {mod.description}
                      </p>

                      {/* Video Lessons Breakdown */}
                      <div className="pt-3 border-t border-white/10 space-y-2">
                        <div className="text-[10px] font-sans font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
                          <Video className="w-3 h-3 text-neutral-400" />
                          <span>Silibus Pelajaran:</span>
                        </div>

                        <div className="space-y-1.5">
                          {mod.lessons.map((lesson, lIdx) => (
                            <div
                              key={lesson.id}
                              className="flex items-center justify-between text-xs text-neutral-300 py-1 px-2 bg-black/60 border border-white/5"
                            >
                              <div className="flex items-center gap-2 truncate">
                                <span className="w-4 h-4 rounded-full bg-white/10 text-[10px] flex items-center justify-center font-mono text-neutral-400 shrink-0">
                                  {lIdx + 1}
                                </span>
                                <span className="truncate text-[11px]">{lesson.title}</span>
                              </div>
                              <span className="text-[10px] text-neutral-400 font-mono shrink-0 ml-2">
                                {lesson.duration}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Bottom CTA Action Button */}
                    <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs mt-2">
                      <span className="text-neutral-400 text-[11px] group-hover:text-white transition-colors">
                        Mula Pelajaran 0{idx * 2 + 1}
                      </span>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-white text-black font-bold uppercase text-[11px] tracking-wider group-hover:bg-amber-400 transition-all shadow-md"
                      >
                        <Play className="w-3 h-3 fill-current" />
                        <span>Tonton Modul</span>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
