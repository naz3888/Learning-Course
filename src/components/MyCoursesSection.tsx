import React, { useState } from 'react';
import {
  BookOpen,
  Play,
  CheckCircle2,
  Award,
  Crown,
  Clock,
  Sparkles,
  ArrowRight,
  GraduationCap,
  FileText,
  Search,
  Flame,
  HelpCircle
} from 'lucide-react';
import { STORE_COURSES, MODULES_DATA, LEVELS_CONFIG } from '../data/coursesData';
import { StoreCourse, CourseLevel } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface MyCoursesSectionProps {
  courses?: StoreCourse[];
  enrolledCourseIds: string[];
  isVipMember: boolean;
  onOpenMembershipModal: () => void;
  onStartCourse: (course: StoreCourse) => void;
  onOpenStore: () => void;
  completedLessons: string[];
  onOpenCertificate: () => void;
  onOpenQuiz: (level: CourseLevel) => void;
  userName: string;
}

export const MyCoursesSection: React.FC<MyCoursesSectionProps> = ({
  courses = STORE_COURSES,
  enrolledCourseIds,
  isVipMember,
  onOpenMembershipModal,
  onStartCourse,
  onOpenStore,
  completedLessons,
  onOpenCertificate,
  onOpenQuiz,
  userName
}) => {
  const { t, isEn } = useLanguage();
  const [filterTab, setFilterTab] = useState<'all' | 'in_progress' | 'completed'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // If user is VIP, they have access to ALL courses in courses!
  // Otherwise, they have access to courses in enrolledCourseIds
  const accessibleCourses = isVipMember
    ? courses
    : courses.filter(c => enrolledCourseIds.includes(c.id));

  // Calculate course completion helper
  const getCourseProgress = (course: StoreCourse) => {
    // Determine which lessons belong to this course level
    const levelModules = MODULES_DATA.filter(m => m.level === course.level);
    const levelLessons = levelModules.flatMap(m => m.lessons);
    const total = levelLessons.length > 0 ? levelLessons.length : course.totalLessons;
    const completed = levelLessons.filter(l => completedLessons.includes(l.id)).length;
    const percent = total > 0 ? Math.min(100, Math.round((completed / total) * 100)) : 0;
    return {
      completed,
      total,
      percent,
      isFinished: percent === 100
    };
  };

  // Filter courses based on active filterTab and searchQuery
  const filteredCourses = accessibleCourses.filter(course => {
    const progress = getCourseProgress(course);
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.instructor.name.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (filterTab === 'in_progress') {
      return progress.percent > 0 && progress.percent < 100;
    }
    if (filterTab === 'completed') {
      return progress.percent === 100;
    }
    return true;
  });

  const totalLessonsInAcademy = MODULES_DATA.flatMap(m => m.lessons).length;
  const totalCompletedLessons = completedLessons.length;
  const overallPercent = totalLessonsInAcademy > 0 
    ? Math.round((totalCompletedLessons / totalLessonsInAcademy) * 100) 
    : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-12 space-y-8 animate-in fade-in duration-300">
      
      {/* =========================================================================
          TOP BANNER: WELCOME & ALL-ACCESS VIP STATUS
      ========================================================================== */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#111111] via-[#161616] to-[#0d0d0d] border border-white/15 p-6 sm:p-8">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-400/20 border border-amber-400/40 text-amber-300 font-mono text-xs font-bold uppercase tracking-wider">
                <BookOpen className="w-3.5 h-3.5" />
                <span>{isEn ? 'My Courses · Your Learning Hub' : 'My Course · Portal Pembelajaran Anda'}</span>
              </span>

              {isVipMember ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-amber-400 to-amber-300 text-black font-mono text-xs font-black uppercase tracking-wider shadow-sm">
                  <Crown className="w-3.5 h-3.5 fill-black" />
                  <span>{isEn ? 'VIP ALL-ACCESS ACTIVE' : 'VIP ALL-ACCESS AKTIF'}</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 text-neutral-300 font-mono text-xs uppercase tracking-wider">
                  <span>{isEn ? `${accessibleCourses.length} Enrolled Courses` : `${accessibleCourses.length} Kursus Berdaftar`}</span>
                </span>
              )}
            </div>

            <h1 className="font-['Oswald'] text-3xl sm:text-5xl font-bold uppercase tracking-wide text-white">
              {isEn ? `MY COURSES (${userName})` : `KURSUS SAYA (${userName})`}
            </h1>

            <p className="font-sans text-xs sm:text-sm text-neutral-300 leading-relaxed">
              {isVipMember
                ? (isEn
                  ? 'As an Active VIP Member, you enjoy unlimited full access to all AI Academy courses, cinematic video masterclasses, practical prompt worksheets, and official digital certification.'
                  : 'Sebagai Ahli VIP Aktif, anda mempunyai Akses Penuh tanpa had ke semua kursus, modul video pembelajaran sinematik, lembaran kerja prompt amali, dan pensijilan rasmi Akademi AI.')
                : (isEn
                  ? 'Access your enrolled learning modules. Continue your video lessons or take level assessment quizzes to claim your verified certificate.'
                  : 'Akses terus modul video pembelajaran yang telah anda miliki. Teruskan tontonan pelajaran atau ambil kuiz penilaian untuk memperoleh sijil digital.')}
            </p>
          </div>

          {/* Quick Action Button on Top */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            {!isVipMember && (
              <button
                onClick={onOpenMembershipModal}
                className="px-4 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-sans font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
              >
                <Crown className="w-4 h-4 fill-black" />
                <span>{isEn ? 'Get VIP All-Access' : 'Dapatkan VIP All-Access'}</span>
              </button>
            )}

            <button
              onClick={onOpenStore}
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-sans font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <GraduationCap className="w-4 h-4 text-amber-400" />
              <span>{isEn ? `All Courses (${courses.length})` : `Semua Course (${courses.length})`}</span>
            </button>
          </div>
        </div>

        {/* Learning Statistics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-6 pt-6 border-t border-white/10">
          <div className="bg-black/40 border border-white/5 p-3.5">
            <span className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400">
              {isEn ? 'Courses Accessed' : 'Kursus Diakses'}
            </span>
            <div className="flex items-baseline gap-1.5 mt-1">
              <span className="text-xl sm:text-2xl font-['Oswald'] font-bold text-white">
                {isVipMember ? courses.length : accessibleCourses.length}
              </span>
              <span className="text-xs text-neutral-500 font-mono">
                {isVipMember ? (isEn ? '/ All Courses' : '/ Semua Kursus') : (isEn ? 'courses' : 'kursus')}
              </span>
            </div>
          </div>

          <div className="bg-black/40 border border-white/5 p-3.5">
            <span className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400">
              {isEn ? 'Completed Lessons' : 'Pelajaran Tamat'}
            </span>
            <div className="flex items-baseline gap-1.5 mt-1">
              <span className="text-xl sm:text-2xl font-['Oswald'] font-bold text-amber-400">
                {totalCompletedLessons}
              </span>
              <span className="text-xs text-neutral-500 font-mono">/ {totalLessonsInAcademy}</span>
            </div>
          </div>

          <div className="bg-black/40 border border-white/5 p-3.5">
            <span className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400">
              {isEn ? 'Overall Progress' : 'Kemajuan Keseluruhan'}
            </span>
            <div className="flex items-baseline gap-1.5 mt-1">
              <span className="text-xl sm:text-2xl font-['Oswald'] font-bold text-emerald-400">
                {overallPercent}%
              </span>
            </div>
          </div>

          <div className="bg-black/40 border border-white/5 p-3.5 flex items-center justify-between">
            <div>
              <span className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400">
                {isEn ? 'Official Certificate' : 'Sijil Rasmi'}
              </span>
              <span className="text-xs font-sans text-neutral-200 mt-1 block">
                {isEn ? 'Check Eligibility' : 'Semak Kelayakan'}
              </span>
            </div>
            <button
              onClick={onOpenCertificate}
              className="p-2 bg-amber-400/20 hover:bg-amber-400 text-amber-400 hover:text-black transition-all cursor-pointer rounded"
              title={isEn ? 'Check Certificate Eligibility' : 'Semak Sijil Kelayakan'}
            >
              <Award className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* =========================================================================
          CONTROLS: FILTER TABS & SEARCH
      ========================================================================== */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        
        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 bg-[#111111] p-1 border border-white/10 self-start">
          <button
            onClick={() => setFilterTab('all')}
            className={`px-3 sm:px-4 py-1.5 text-xs font-mono uppercase font-bold tracking-wider transition-all cursor-pointer ${
              filterTab === 'all'
                ? 'bg-white text-black shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            {isEn ? `All (${accessibleCourses.length})` : `Semua (${accessibleCourses.length})`}
          </button>
          <button
            onClick={() => setFilterTab('in_progress')}
            className={`px-3 sm:px-4 py-1.5 text-xs font-mono uppercase font-bold tracking-wider transition-all cursor-pointer ${
              filterTab === 'in_progress'
                ? 'bg-white text-black shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            {isEn ? 'In Progress' : 'Sedang Belajar'}
          </button>
          <button
            onClick={() => setFilterTab('completed')}
            className={`px-3 sm:px-4 py-1.5 text-xs font-mono uppercase font-bold tracking-wider transition-all cursor-pointer ${
              filterTab === 'completed'
                ? 'bg-white text-black shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            {isEn ? 'Completed' : 'Selesai'}
          </button>
        </div>

        {/* Search input */}
        <div className="relative max-w-xs w-full">
          <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isEn ? 'Search my courses...' : 'Cari kursus saya...'}
            className="w-full pl-9 pr-3 py-1.5 bg-[#111] border border-white/15 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 font-sans"
          />
        </div>
      </div>

      {/* =========================================================================
          COURSES GRID
      ========================================================================== */}
      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => {
            const prog = getCourseProgress(course);
            const levelCfg = LEVELS_CONFIG[course.level];

            return (
              <div
                key={course.id}
                className="group bg-[#0e0e0e] border border-white/10 hover:border-amber-400/40 transition-all flex flex-col justify-between overflow-hidden shadow-lg hover:shadow-2xl"
              >
                {/* Course Thumbnail Image */}
                <div className="relative aspect-video overflow-hidden bg-black/60">
                  <img
                    src={course.coverImage}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-90 group-hover:brightness-100"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    <span className="px-2 py-0.5 bg-black/80 backdrop-blur-sm border border-white/20 text-white font-mono text-[10px] font-bold uppercase tracking-wider">
                      {levelCfg.badge}
                    </span>
                    {isVipMember ? (
                      <span className="px-2 py-0.5 bg-amber-400 text-black font-mono text-[10px] font-black uppercase tracking-wider flex items-center gap-1">
                        <Crown className="w-3 h-3 fill-black" />
                        <span>VIP ACCESS</span>
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 bg-emerald-500 text-black font-mono text-[10px] font-bold uppercase tracking-wider">
                        BERDAFTAR
                      </span>
                    )}
                  </div>

                  {/* Play Overlay Indicator */}
                  <div 
                    onClick={() => onStartCourse(course)}
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 cursor-pointer"
                  >
                    <div className="w-12 h-12 rounded-full bg-amber-400 text-black flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 fill-black ml-0.5" />
                    </div>
                  </div>

                  {/* Bottom Image Progress Bar */}
                  <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-white/10">
                    <div
                      className={`h-full transition-all duration-500 ${
                        prog.percent === 100 ? 'bg-emerald-400' : 'bg-amber-400'
                      }`}
                      style={{ width: `${prog.percent}%` }}
                    />
                  </div>
                </div>

                {/* Course Content Details */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400">
                      <span>{course.levelCategory}</span>
                      <span className="flex items-center gap-1 text-amber-400 font-bold">
                        <Clock className="w-3 h-3" />
                        {course.totalHours}
                      </span>
                    </div>

                    <h3 className="font-['Oswald'] text-lg font-bold text-white group-hover:text-amber-400 transition-colors leading-snug">
                      {course.title}
                    </h3>

                    <p className="font-sans text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                      {course.description}
                    </p>
                  </div>

                  {/* Instructor and Lesson Count */}
                  <div className="pt-3 border-t border-white/10 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img
                          src={course.instructor.avatar}
                          alt={course.instructor.name}
                          className="w-6 h-6 rounded-full object-cover border border-white/20"
                        />
                        <span className="text-xs font-sans text-neutral-300 truncate max-w-[120px]">
                          {course.instructor.name}
                        </span>
                      </div>
                      <span className="text-xs font-mono text-neutral-400">
                        {prog.completed}/{prog.total} Pelajaran
                      </span>
                    </div>

                    {/* Progress Percentage & Status */}
                    <div className="flex items-center justify-between text-xs font-sans">
                      <span className="text-neutral-400">
                        {prog.percent === 100 ? (
                          <span className="text-emerald-400 font-bold flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Modul Selesai
                          </span>
                        ) : prog.percent > 0 ? (
                          <span className="text-amber-300 font-medium">Sedang Berjalan</span>
                        ) : (
                          <span className="text-neutral-500">Belum Dimulakan</span>
                        )}
                      </span>
                      <span className="font-mono font-bold text-white">{prog.percent}%</span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2 pt-1">
                      <button
                        onClick={() => onStartCourse(course)}
                        className={`flex-1 py-2.5 px-3 font-sans font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                          prog.percent === 100
                            ? 'bg-neutral-800 hover:bg-neutral-700 text-white'
                            : 'bg-white hover:bg-neutral-200 text-black shadow-md'
                        }`}
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>{prog.percent > 0 ? 'Sambung Belajar' : 'Mula Belajar'}</span>
                      </button>

                      <button
                        onClick={() => onOpenQuiz(course.level)}
                        className="py-2.5 px-3 bg-white/5 hover:bg-white/15 text-neutral-300 hover:text-white border border-white/10 font-sans text-xs transition-colors cursor-pointer"
                        title="Ambil Kuiz Pemahaman"
                      >
                        <HelpCircle className="w-4 h-4 text-amber-400" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="p-8 sm:p-12 text-center bg-[#0d0d0d] border border-white/10 space-y-4">
          <BookOpen className="w-12 h-12 text-neutral-500 mx-auto" />
          <h3 className="font-['Oswald'] text-2xl font-bold uppercase text-white">
            Tiada Kursus Dijumpai
          </h3>
          <p className="font-sans text-xs sm:text-sm text-neutral-400 max-w-md mx-auto">
            {searchQuery 
              ? `Tiada kursus yang sepadan dengan carian "${searchQuery}".` 
              : filterTab === 'completed'
              ? 'Anda belum menamatkan mana-mana kursus sepenuhnya. Teruskan sesi pembelajaran anda!'
              : 'Anda belum mendaftar untuk sebarang kursus atau semua kursus sedia ada belum dibuka.'}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={onOpenStore}
              className="px-5 py-2.5 bg-white text-black font-sans font-bold text-xs uppercase tracking-wider hover:bg-neutral-200 transition-colors cursor-pointer"
            >
              Terokai Semua Course →
            </button>
            {!isVipMember && (
              <button
                onClick={onOpenMembershipModal}
                className="px-5 py-2.5 bg-amber-400 text-black font-sans font-black text-xs uppercase tracking-wider hover:bg-amber-300 transition-colors cursor-pointer"
              >
                Buka Semua Kursus dengan VIP
              </button>
            )}
          </div>
        </div>
      )}

      {/* =========================================================================
          BOTTOM SECTION: QUICK LINK TO EXPLORE MORE COURSES
      ========================================================================== */}
      <div className="p-6 bg-gradient-to-r from-[#121212] via-[#181818] to-[#121212] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="text-xs uppercase tracking-widest text-amber-400 font-mono font-bold">Kembangkan Kemahiran AI Anda</span>
          <h3 className="font-['Oswald'] text-xl sm:text-2xl font-bold uppercase tracking-wide text-white">
            Ingin menambah modul & kepakaran AI baharu?
          </h3>
          <p className="text-xs text-neutral-400 max-w-xl font-sans">
            Terokai Semua Course untuk melihat modul ejen AI berautonomi, fine-tuning model terbuka, atau langganan ahli VIP All-Access.
          </p>
        </div>
        <button
          onClick={onOpenStore}
          className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-black font-sans font-bold text-xs uppercase tracking-wider transition-all shrink-0 whitespace-nowrap shadow-md cursor-pointer flex items-center gap-2"
        >
          <span>Ke Semua Course</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
