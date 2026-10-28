import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  Search, 
  Star, 
  Clock, 
  BookOpen, 
  Award, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  Filter, 
  Play,
  ArrowRight,
  Zap,
  Users,
  ChevronDown,
  ChevronUp,
  ShoppingCart,
  CreditCard,
  Crown
} from 'lucide-react';
import { StoreCourse, CourseLevel } from '../types';
import { STORE_COURSES } from '../data/coursesData';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

interface CourseStoreSectionProps {
  courses?: StoreCourse[];
  enrolledCourseIds: string[];
  cartCourseIds: string[];
  isVipMember?: boolean;
  isAdmin?: boolean;
  onOpenAdminManager?: () => void;
  onOpenMembershipModal: () => void;
  onAddToCart: (course: StoreCourse) => void;
  onOpenCart: () => void;
  onSelectStoreCourse: (course: StoreCourse) => void;
  onOpenPurchaseModal: (course: StoreCourse) => void;
  onStartCourseDirectly: (course: StoreCourse) => void;
}

export const CourseStoreSection: React.FC<CourseStoreSectionProps> = ({
  courses = STORE_COURSES,
  enrolledCourseIds,
  cartCourseIds,
  isVipMember = false,
  isAdmin = false,
  onOpenAdminManager,
  onOpenMembershipModal,
  onAddToCart,
  onOpenCart,
  onSelectStoreCourse,
  onOpenPurchaseModal,
  onStartCourseDirectly
}) => {
  const { t, isEn } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<'all' | 'free' | 'paid' | 'beginner' | 'advanced'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState<number>(6);
  const [recentlyAddedTitle, setRecentlyAddedTitle] = useState<string | null>(null);

  useEffect(() => {
    setVisibleCount(6);
  }, [activeFilter, searchQuery]);

  const filteredCourses = courses.filter((course) => {
    // Filter type
    if (activeFilter === 'free' && !course.isFree) return false;
    if (activeFilter === 'paid' && course.isFree) return false;
    if (activeFilter === 'beginner' && course.levelCategory !== 'Pemula') return false;
    if (activeFilter === 'advanced' && course.levelCategory !== 'Lanjutan' && course.levelCategory !== 'Pakar') return false;

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = course.title.toLowerCase().includes(q);
      const matchDesc = course.description.toLowerCase().includes(q);
      const matchInstructor = course.instructor.name.toLowerCase().includes(q);
      const matchTag = course.tagline.toLowerCase().includes(q);
      return matchTitle || matchDesc || matchInstructor || matchTag;
    }
    return true;
  });

  const displayedCourses = filteredCourses.slice(0, visibleCount);
  const hasMoreCourses = filteredCourses.length > visibleCount;

  const freeCount = courses.filter(c => c.isFree).length;
  const paidCount = courses.filter(c => !c.isFree).length;

  return (
    <section id="course-store-section" className="space-y-10 pt-4">
      {/* Store Banner & Brand Header with Fluid Motion */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="bg-gradient-to-r from-neutral-950 via-[#0e0e0e] to-neutral-950 border border-white/10 p-6 sm:p-10 relative overflow-hidden shadow-2xl"
      >
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.35, 0.15] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-0 right-0 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.25, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-0 left-0 w-72 h-72 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none"
        />

        <div className="relative z-10 max-w-4xl space-y-4">
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 border border-white/15 text-xs font-mono font-bold uppercase tracking-wider text-amber-400"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-amber-400" />
            <span>{t('store.badge', 'Katalog Rasmi Kursus & Modul AI')}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-['Oswald'] font-black text-3xl sm:text-5xl lg:text-6xl tracking-wider text-white uppercase leading-[1.05]"
          >
            {t('store.title', 'SEMUA MODUL AKADEMI AI · PERCUMA & BERBAYAR')}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="font-sans text-sm sm:text-base text-neutral-300 leading-relaxed max-w-3xl"
          >
            {isEn ? (
              <>Choose the modules that align with your professional goals. Start with <strong className="text-emerald-400">Free Foundation Modules</strong> or enroll in <strong className="text-amber-400">Paid Premium Masterclasses</strong> complete with practical industry project guidance and verified certification.</>
            ) : (
              <>Pilih modul yang bersesuaian dengan matlamat anda. Mulakan dengan <strong className="text-emerald-400">Modul Asas Percuma</strong> atau langgan <strong className="text-amber-400">Pakej Masterclass Premium Berbayar</strong> lengkap dengan bimbingan projek industri dan sijil verifikasi rasmi.</>
            )}
          </motion.p>

          {/* Quick Perks Strip */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="pt-4 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-neutral-300 border-t border-white/10"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{t('hero.perk_lifetime', 'Akses Seumur Hidup')}</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              <span>{t('hero.perk_certificate', 'Sijil Digital Diiktiraf')}</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-blue-400" />
              <span>{isEn ? 'Learn At Your Own Pace' : 'Belajar Mengikut Rentak Sendiri'}</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-purple-400" />
              <span>{t('hero.perk_money_back', 'Jaminan Pemulangan 30 Hari')}</span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* First User Discount Alert Strip in Store */}
      <div className="bg-[#121008] border border-amber-400/40 p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-amber-400 text-black flex items-center justify-center font-black shrink-0">
            %
          </div>
          <div className="space-y-0.5 text-left">
            <span className="font-['Oswald'] text-sm sm:text-base font-bold text-white uppercase tracking-wider block">
              TUNTUT DISKAUN RM50 PENDAFTARAN PENGGUNA PERTAMA
            </span>
            <span className="text-xs text-neutral-300 font-sans block">
              Gunakan kod <strong className="text-amber-400 font-mono">FIRSTUSER50</strong> semasa checkout untuk potongan terus RM50.
            </span>
          </div>
        </div>

        <button
          onClick={() => {
            const el = document.getElementById('discount-announcement');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-black font-sans font-bold text-xs uppercase tracking-wider transition-colors shrink-0 shadow cursor-pointer whitespace-nowrap"
        >
          Lihat & Tuntut Baucar ↓
        </button>
      </div>

      {/* Monthly VIP Membership Subscription Banner (RM98/bulan) */}
      <div className="bg-gradient-to-r from-[#1c1606] via-[#100d04] to-[#1c1606] border-2 border-amber-400/70 p-5 sm:p-7 relative overflow-hidden shadow-[0_0_40px_rgba(245,158,11,0.12)]">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-400 text-black text-xs font-mono font-black uppercase tracking-wider shadow-sm">
                <Crown className="w-3.5 h-3.5 fill-black text-black" />
                VIP ALL-ACCESS MEMBERSHIP
              </span>
              <span className="text-xs text-neutral-300 font-mono">
                {isVipMember ? 'Status Anda: VIP Member Aktif ✅' : 'Pelan Langganan Bulanan Paling Menjimatkan'}
              </span>
            </div>

            <h3 className="font-['Oswald'] text-2xl sm:text-3xl lg:text-4xl font-bold uppercase tracking-wide text-white leading-tight">
              LANGGAN KEAHLIAN BULANAN RM98 · BUKA SEMUA MODUL
            </h3>

            <p className="font-sans text-xs sm:text-sm text-neutral-300 leading-relaxed">
              Daripada membeli modul satu persatu (bernilai lebih RM400+), dapatkan <strong className="text-amber-400">Akses Penuh Tanpa Had</strong> ke seluruh arkib modul pakar, makmal prompt CRTF, mentorship langsung dan pensijilan rasmi hanya dengan <strong className="text-white font-mono">RM98 / bulan</strong>.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-neutral-300 font-sans">
              <span className="flex items-center gap-1 text-emerald-400">✓ Semua Modul Dibuka</span>
              <span className="flex items-center gap-1 text-emerald-400">✓ Batal Bila-bila Masa</span>
              <span className="flex items-center gap-1 text-emerald-400">✓ Kod FIRSTUSER50 Disokong</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 shrink-0">
            <div className="text-left sm:text-right pr-2">
              <div className="font-['Bebas_Neue'] text-5xl sm:text-6xl text-amber-400 leading-none">
                RM 98
              </div>
              <div className="text-[11px] text-neutral-400 font-mono">
                / bulan · Tanpa Kontrak
              </div>
            </div>

            <button
              onClick={onOpenMembershipModal}
              className={`px-6 py-4 font-sans font-black text-xs sm:text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-2xl cursor-pointer whitespace-nowrap ${
                isVipMember
                  ? 'bg-emerald-400 hover:bg-emerald-300 text-black'
                  : 'bg-amber-400 hover:bg-amber-300 text-black shadow-[0_0_25px_rgba(245,158,11,0.4)] hover:shadow-[0_0_35px_rgba(245,158,11,0.6)]'
              }`}
            >
              <Crown className="w-4 h-4 fill-black text-black" />
              <span>{isVipMember ? 'Urus Keahlian VIP Anda' : 'Langgan Keahlian RM98/Bln →'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Store Filters & Search Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/10 pb-5">
        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs font-sans uppercase tracking-wider">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3.5 py-2 font-bold transition-all ${
              activeFilter === 'all'
                ? 'bg-white text-black shadow-md'
                : 'bg-[#121212] text-neutral-400 border border-white/10 hover:text-white'
            }`}
          >
            {isEn ? `All Modules (${courses.length})` : `Semua Modul (${courses.length})`}
          </button>
          <button
            onClick={() => setActiveFilter('free')}
            className={`px-3.5 py-2 font-bold transition-all flex items-center gap-1.5 ${
              activeFilter === 'free'
                ? 'bg-emerald-400 text-black shadow-md'
                : 'bg-[#121212] text-neutral-400 border border-white/10 hover:text-white'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>{isEn ? `Free (${freeCount})` : `Percuma (${freeCount})`}</span>
          </button>
          <button
            onClick={() => setActiveFilter('paid')}
            className={`px-3.5 py-2 font-bold transition-all flex items-center gap-1.5 ${
              activeFilter === 'paid'
                ? 'bg-amber-400 text-black shadow-md'
                : 'bg-[#121212] text-neutral-400 border border-white/10 hover:text-white'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-amber-400"></span>
            <span>{isEn ? `Paid / Premium (${paidCount})` : `Berbayar / Premium (${paidCount})`}</span>
          </button>
          <button
            onClick={() => setActiveFilter('beginner')}
            className={`px-3.5 py-2 font-bold transition-all ${
              activeFilter === 'beginner'
                ? 'bg-white text-black shadow-md'
                : 'bg-[#121212] text-neutral-400 border border-white/10 hover:text-white'
            }`}
          >
            {isEn ? 'Beginner Level' : 'Tahap Pemula'}
          </button>
          <button
            onClick={() => setActiveFilter('advanced')}
            className={`px-3.5 py-2 font-bold transition-all ${
              activeFilter === 'advanced'
                ? 'bg-white text-black shadow-md'
                : 'bg-[#121212] text-neutral-400 border border-white/10 hover:text-white'
            }`}
          >
            {isEn ? 'Advanced Level' : 'Tahap Lanjutan'}
          </button>

          {onOpenAdminManager && (
            <button
              onClick={onOpenAdminManager}
              className={`px-3.5 py-2 font-bold transition-all flex items-center gap-1.5 border cursor-pointer ${
                isAdmin
                  ? 'bg-amber-400/20 text-amber-300 border-amber-400/50 hover:bg-amber-400 hover:text-black'
                  : 'bg-neutral-900 text-neutral-300 border-white/15 hover:text-white hover:border-white/30'
              }`}
              title={isEn ? 'Access Admin Portal to manage and update courses' : 'Akses Portal Pentadbir untuk tambah atau kemaskini kursus'}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>{isAdmin ? (isEn ? 'Manage Courses (Admin)' : 'Urus Kursus (Admin)') : (isEn ? 'Admin Login' : 'Admin Login')}</span>
            </button>
          )}
        </div>

        {/* Search Input Box */}
        <div className="relative w-full lg:w-72">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isEn ? 'Search modules, topics, keywords...' : 'Cari modul, topik, keyword...'}
            className="w-full pl-10 pr-4 py-2 bg-[#121212] border border-white/15 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-2.5 text-xs text-neutral-400 hover:text-white"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Courses Store Grid */}
      {filteredCourses.length === 0 ? (
        <div className="p-12 text-center bg-[#0e0e0e] border border-white/10 space-y-3">
          <ShoppingBag className="w-8 h-8 text-neutral-600 mx-auto" />
          <div className="font-['Oswald'] text-xl uppercase text-white">
            {isEn ? 'No Modules Found' : 'Tiada Modul Dijumpai'}
          </div>
          <p className="text-xs text-neutral-400 max-w-sm mx-auto">
            {isEn
              ? `No modules matched your search "${searchQuery}". Try different keywords or switch filters.`
              : `Tiada modul yang sepadan dengan carian "${searchQuery}". Cuba ubah kata kunci atau tukar penapis kategori.`}
          </p>
          <button
            onClick={() => {
              setActiveFilter('all');
              setSearchQuery('');
            }}
            className="px-4 py-2 bg-white text-black text-xs font-bold uppercase tracking-wider"
          >
            Reset Semua Penapis
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter + searchQuery}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {displayedCourses.map((course, idx) => {
              const isEnrolled = enrolledCourseIds.includes(course.id) || (course.isFree && enrolledCourseIds.includes('course-tahap-1')) || isVipMember;
              const isInCart = cartCourseIds.includes(course.id);
              const discountPercent = course.originalPrice && course.price > 0
                ? Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)
                : null;

              return (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: idx * 0.05 }}
                  whileHover={{ y: -8, transition: { duration: 0.22, ease: 'easeOut' } }}
                  className="bg-[#0e0e0e] border border-white/15 flex flex-col justify-between group shadow-xl hover:shadow-[0_20px_45px_rgba(0,0,0,0.85)] hover:border-amber-400/60 transition-colors duration-300 relative overflow-hidden"
                >
                  {/* Course Cover Image Frame with Overlaid Badges */}
                  <div className="relative aspect-[16/9] overflow-hidden bg-black border-b border-white/10">
                    <img
                      src={course.coverImage}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out brightness-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                    {/* Free or Paid Badge */}
                    <div className="flex items-center gap-1.5">
                      {isVipMember && !course.isFree ? (
                        <span className="px-2.5 py-1 bg-amber-400 text-black font-black uppercase text-[10px] tracking-wider shadow-lg flex items-center gap-1">
                          <Crown className="w-3 h-3 fill-black text-black" />
                          <span>VIP Terbuka</span>
                        </span>
                      ) : course.isFree ? (
                        <span className="px-2.5 py-1 bg-emerald-500 text-black font-bold uppercase text-[10px] tracking-wider shadow-lg flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-black" />
                          <span>Percuma</span>
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 bg-amber-400 text-black font-bold uppercase text-[10px] tracking-wider shadow-lg">
                          Premium Berbayar
                        </span>
                      )}

                      {course.badge && course.badge !== 'PERCUMA' && (
                        <span className="px-2 py-1 bg-black/80 backdrop-blur-md text-white border border-white/20 font-bold uppercase text-[10px] tracking-wider">
                          {course.badge}
                        </span>
                      )}
                    </div>

                    {discountPercent && (
                      <span className="px-2 py-0.5 bg-red-600 text-white font-mono font-bold text-[10px] tracking-wider">
                        -{discountPercent}%
                      </span>
                    )}
                  </div>

                  {/* Bottom Stats Overlay */}
                  <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[11px] text-neutral-300 font-mono">
                    <span className="flex items-center gap-1 bg-black/70 px-2 py-0.5 border border-white/10 backdrop-blur-sm">
                      <Clock className="w-3 h-3 text-amber-400" />
                      <span>{course.totalHours}</span>
                    </span>
                    <span className="flex items-center gap-1 bg-black/70 px-2 py-0.5 border border-white/10 backdrop-blur-sm">
                      <BookOpen className="w-3 h-3 text-blue-400" />
                      <span>{course.totalLessons} Pelajaran</span>
                    </span>
                  </div>
                </div>

                {/* Course Details Body */}
                <div className="p-5 sm:p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    {/* Category & Rating */}
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[11px] font-sans font-bold uppercase tracking-wider text-amber-400">
                        {course.levelCategory}
                      </span>
                      <div className="flex items-center gap-1 text-amber-400 font-mono text-xs">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span className="font-bold text-white">{course.rating}</span>
                        <span className="text-neutral-500 text-[10px]">({course.reviewsCount})</span>
                      </div>
                    </div>

                    {/* Title & Tagline */}
                    <div>
                      <h3 className="font-['Oswald'] text-xl sm:text-2xl font-bold uppercase tracking-wide text-white group-hover:text-amber-400 transition-colors leading-snug">
                        {course.title}
                      </h3>
                      <p className="font-sans text-xs text-neutral-300 leading-relaxed mt-1 line-clamp-2">
                        {course.tagline}
                      </p>
                    </div>

                    {/* Instructor Info */}
                    <div className="flex items-center gap-2.5 pt-2 border-t border-white/10">
                      <img
                        src={course.instructor.avatar}
                        alt={course.instructor.name}
                        className="w-7 h-7 rounded-full object-cover border border-white/20"
                      />
                      <div className="text-[11px] truncate">
                        <div className="font-sans font-semibold text-white truncate">{course.instructor.name}</div>
                        <div className="text-neutral-400 text-[10px] truncate">{course.instructor.role}</div>
                      </div>
                    </div>

                    {/* What's Included Preview */}
                    <div className="space-y-1 pt-2 border-t border-white/10 text-[11px] text-neutral-300">
                      <div className="flex items-center gap-1.5 text-neutral-400 text-[10px] font-bold uppercase tracking-wider">
                        <span>Termasuk dalam Modul:</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                        <span className="truncate">{course.includes[0]}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Award className="w-3 h-3 text-amber-400 shrink-0" />
                        <span className="truncate">{course.includes[course.includes.length - 1]}</span>
                      </div>
                    </div>
                  </div>

                  {/* Price Bar & Action Buttons */}
                  <div className="pt-4 border-t border-white/15 space-y-3">
                    <div className="flex items-baseline justify-between">
                      <div>
                        <div className="text-[10px] uppercase tracking-wider text-neutral-400">Harga Modul:</div>
                        {course.isFree ? (
                          <div className="font-['Oswald'] text-2xl font-bold text-emerald-400 tracking-wide">
                            PERCUMA
                          </div>
                        ) : (
                          <div className="flex items-baseline gap-2">
                            <span className="font-['Oswald'] text-2xl font-bold text-white tracking-wide">
                              RM {course.price}.00
                            </span>
                            {course.originalPrice && (
                              <span className="line-through text-neutral-500 text-xs font-mono">
                                RM {course.originalPrice}.00
                              </span>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Students enrolled counter */}
                      <div className="text-right text-[10px] text-neutral-400 font-mono flex items-center gap-1">
                        <Users className="w-3 h-3 text-neutral-500" />
                        <span>{course.studentsCount} Pelajar</span>
                      </div>
                    </div>

                    {/* Action CTA Button Row */}
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        {isVipMember && !course.isFree ? (
                          <button
                            onClick={() => onStartCourseDirectly(course)}
                            className="flex-1 py-2.5 px-3 bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 text-black font-bold uppercase text-xs tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                          >
                            <Crown className="w-3.5 h-3.5 fill-black" />
                            <span>Tonton (Akses VIP)</span>
                          </button>
                        ) : isEnrolled ? (
                          <button
                            onClick={() => onStartCourseDirectly(course)}
                            className="flex-1 py-2.5 px-3 bg-white text-black font-bold uppercase text-xs tracking-wider hover:bg-neutral-200 transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                          >
                            <Play className="w-3.5 h-3.5 fill-black" />
                            <span>Tonton Sekarang</span>
                          </button>
                        ) : course.isFree ? (
                          <button
                            onClick={() => onOpenPurchaseModal(course)}
                            className="flex-1 py-2.5 px-3 bg-emerald-400 text-black font-bold uppercase text-xs tracking-wider hover:bg-emerald-300 transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Daftar Percuma</span>
                          </button>
                        ) : (
                          <button
                            onClick={() => onOpenPurchaseModal(course)}
                            className="flex-1 py-2.5 px-3 bg-amber-400 text-black font-bold uppercase text-xs tracking-wider hover:bg-amber-300 transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                          >
                            <CreditCard className="w-3.5 h-3.5" />
                            <span>Beli Sekarang · RM {course.price}</span>
                          </button>
                        )}

                        <button
                          onClick={() => onSelectStoreCourse(course)}
                          title="Lihat Maklumat Penuh Modul"
                          className="p-2.5 border border-white/20 bg-neutral-900 text-neutral-300 hover:text-white hover:border-white transition-colors shrink-0 cursor-pointer"
                        >
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Add to Basket (Troli) Button */}
                      {!isEnrolled && !isVipMember && (
                        <button
                          onClick={() => {
                            if (isInCart) {
                              onOpenCart();
                            } else {
                              onAddToCart(course);
                              setRecentlyAddedTitle(course.title);
                              setTimeout(() => setRecentlyAddedTitle(null), 4000);
                            }
                          }}
                          className={`w-full py-2 px-3 border text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                            isInCart
                              ? 'border-amber-400/60 bg-amber-400/15 text-amber-300 hover:bg-amber-400 hover:text-black'
                              : 'border-white/15 bg-neutral-950 text-neutral-300 hover:border-white/40 hover:text-white hover:bg-white/5'
                          }`}
                        >
                          <ShoppingCart className="w-3.5 h-3.5 text-amber-400" />
                          <span>{isInCart ? 'Dalam Bakul (Buka Troli) ✓' : '+ Tambah ke Bakul (Troli)'}</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                </motion.div>
              );
            })}
            </motion.div>
          </AnimatePresence>

          {/* See More Courses Button (Main 6 Courses initially, click to load more) */}
          {hasMoreCourses && (
            <div className="pt-6 pb-2 text-center space-y-2">
              <button
                onClick={() => setVisibleCount(prev => prev + 6)}
                className="px-8 py-3.5 bg-[#121212] border border-white/20 text-white font-sans font-bold text-xs uppercase tracking-widest hover:bg-white hover:text-black hover:border-white transition-all shadow-xl inline-flex items-center gap-2 group cursor-pointer"
              >
                <span>Lihat Lagi Modul (+{filteredCourses.length - visibleCount} Modul)</span>
                <ChevronDown className="w-4 h-4 text-amber-400 group-hover:text-black group-hover:translate-y-0.5 transition-all" />
              </button>
              <div className="text-[11px] text-neutral-400 font-mono">
                Memaparkan {displayedCourses.length} daripada {filteredCourses.length} modul tersedia
              </div>
            </div>
          )}

          {!hasMoreCourses && filteredCourses.length > 6 && (
            <div className="pt-4 text-center">
              <button
                onClick={() => setVisibleCount(6)}
                className="text-xs text-neutral-400 hover:text-white underline font-mono flex items-center gap-1 mx-auto"
              >
                <ChevronUp className="w-3.5 h-3.5" />
                <span>Tunjukkan 6 Modul Utama Sahaja</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* Trust & Guarantee Banner */}
      <div className="p-6 bg-[#0e0e0e] border border-white/10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs text-neutral-300">
        <div className="flex items-start gap-3">
          <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <div className="font-bold text-white uppercase tracking-wider">Jaminan Kepuasan Penuh</div>
            <p className="text-neutral-400 text-[11px] mt-0.5">30 hari jaminan wang dikembalikan sekiranya tidak berpuas hati.</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Award className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <div className="font-bold text-white uppercase tracking-wider">Sijil Rasmi Diiktiraf</div>
            <p className="text-neutral-400 text-[11px] mt-0.5">Sijil digital dengan nombor kelayakan untuk profil LinkedIn & resume.</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <BookOpen className="w-6 h-6 text-blue-400 shrink-0 mt-0.5" />
          <div>
            <div className="font-bold text-white uppercase tracking-wider">Akses Seumur Hidup</div>
            <p className="text-neutral-400 text-[11px] mt-0.5">Tonton bila-bila masa di komputer, tablet, mahupun telefon pintar.</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Users className="w-6 h-6 text-purple-400 shrink-0 mt-0.5" />
          <div>
            <div className="font-bold text-white uppercase tracking-wider">Bimbingan Fakulti Pakar</div>
            <p className="text-neutral-400 text-[11px] mt-0.5">Sokongan soal jawab terus bersama tenaga pengajar industri.</p>
          </div>
        </div>
      </div>

      {/* Floating Toast Notification when Added to Cart */}
      {recentlyAddedTitle && (
        <div className="fixed bottom-6 right-6 z-50 max-w-sm sm:max-w-md bg-[#161616] border border-amber-400/80 p-4 shadow-2xl flex items-center justify-between gap-4 animate-in slide-in-from-bottom duration-300">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 rounded-full bg-amber-400 text-black flex items-center justify-center shrink-0">
              <ShoppingCart className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-white uppercase tracking-wider truncate">
                Dimasukkan ke dalam Bakul!
              </div>
              <div className="text-[11px] text-neutral-300 truncate font-sans">
                {recentlyAddedTitle}
              </div>
            </div>
          </div>
          <button
            onClick={onOpenCart}
            className="px-3 py-1.5 bg-amber-400 text-black font-bold uppercase text-xs tracking-wider hover:bg-amber-300 transition-colors shrink-0 whitespace-nowrap cursor-pointer shadow-md"
          >
            Buka Bakul →
          </button>
        </div>
      )}
    </section>
  );
};
