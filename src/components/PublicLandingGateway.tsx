import React, { useState, useEffect } from 'react';
import {
  Lock,
  ArrowRight,
  Sparkles,
  Award,
  BookOpen,
  CheckCircle2,
  Play,
  ShieldCheck,
  Users,
  GraduationCap,
  Star,
  Clock,
  Video,
  Layers,
  ChevronRight,
  Terminal,
  Cpu,
  Zap,
  ArrowDown,
  Bot,
  Filter,
  Wifi,
  Battery,
  Pause,
  Volume2,
  Maximize2,
  FileText,
  Check,
  ChevronLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { STORE_COURSES, MODULES_DATA, LEVELS_CONFIG } from '../data/coursesData';
import { CourseLevel, StoreCourse, Module } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';

interface PublicLandingGatewayProps {
  onOpenAuth: (mode: 'login' | 'signup') => void;
  onOpenAdminLogin?: () => void;
  courses?: StoreCourse[];
}

export type CourseCategoryKey = 'all' | 'prompting' | 'generative_media' | 'automation' | 'agents_rag' | 'free';

export const CATEGORY_FILTERS: {
  key: CourseCategoryKey;
  labelMs: string;
  labelEn: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  {
    key: 'all',
    labelMs: 'Semua Kategori',
    labelEn: 'All Categories',
    icon: Layers
  },
  {
    key: 'prompting',
    labelMs: 'Prompt Engineering & CRTf',
    labelEn: 'Prompt Engineering & CRTf',
    icon: Terminal
  },
  {
    key: 'generative_media',
    labelMs: 'Generative AI & Media',
    labelEn: 'Generative AI & Media',
    icon: Sparkles
  },
  {
    key: 'automation',
    labelMs: 'Automasi Bisnes',
    labelEn: 'Business Automation',
    icon: Cpu
  },
  {
    key: 'agents_rag',
    labelMs: 'Ejen AI & RAG',
    labelEn: 'AI Agents & RAG',
    icon: Bot
  },
  {
    key: 'free',
    labelMs: 'Akses Percuma',
    labelEn: 'Free Access',
    icon: Zap
  }
];

export const matchCourseCategory = (course: StoreCourse, cat: CourseCategoryKey): boolean => {
  if (cat === 'all') return true;
  if (cat === 'free') return course.isFree;
  if (cat === 'prompting') {
    return (
      course.id.includes('prompt') ||
      course.title.toLowerCase().includes('prompt') ||
      course.title.toLowerCase().includes('crtf') ||
      course.id === 'course-tahap-1' ||
      course.id.includes('bundle')
    );
  }
  if (cat === 'generative_media') {
    return (
      course.id.includes('media') ||
      course.id === 'course-tahap-2' ||
      course.title.toLowerCase().includes('generative') ||
      course.title.toLowerCase().includes('imej') ||
      course.id.includes('bundle')
    );
  }
  if (cat === 'automation') {
    return (
      course.id.includes('business') ||
      course.id.includes('workflow') ||
      course.title.toLowerCase().includes('automasi') ||
      course.title.toLowerCase().includes('perniagaan') ||
      course.id.includes('bundle')
    );
  }
  if (cat === 'agents_rag') {
    return (
      course.id === 'course-tahap-3' ||
      course.title.toLowerCase().includes('rag') ||
      course.title.toLowerCase().includes('ejen') ||
      course.title.toLowerCase().includes('transformer') ||
      course.id.includes('bundle')
    );
  }
  return true;
};

export const matchModuleCategory = (mod: Module, cat: CourseCategoryKey): boolean => {
  if (cat === 'all') return true;
  if (cat === 'free') return mod.level === 'level_1';
  if (cat === 'prompting') {
    return mod.id === 'mod-1-1' || mod.id === 'mod-1-2' || mod.id === 'mod-1-3' || mod.id === 'mod-2-1';
  }
  if (cat === 'generative_media') {
    return mod.id === 'mod-2-2';
  }
  if (cat === 'automation') {
    return mod.id === 'mod-2-3';
  }
  if (cat === 'agents_rag') {
    return mod.id.startsWith('mod-3');
  }
  return true;
};

export const getCourseCategoryBadge = (course: StoreCourse, isEn: boolean): string => {
  if (course.id.includes('bundle')) return isEn ? 'Master Bundle' : 'Pakej Lengkap';
  if (course.id.includes('prompt') || course.title.toLowerCase().includes('prompt')) {
    return isEn ? 'Prompt Engineering' : 'Prompt & CRTf';
  }
  if (course.id === 'course-tahap-1') return isEn ? 'AI Foundation' : 'Asas AI & Prompt';
  if (course.id === 'course-tahap-2') return isEn ? 'Generative Media' : 'Generative & Media';
  if (course.id.includes('business') || course.title.toLowerCase().includes('automasi')) {
    return isEn ? 'Business Automation' : 'Automasi Bisnes';
  }
  if (course.id === 'course-tahap-3') return isEn ? 'AI Agents & RAG' : 'Ejen AI & RAG';
  return isEn ? 'Specialized AI' : 'Modul AI';
};

const PROMPT_DEMOS = [
  {
    id: 'crtf',
    tag: 'Formula CRTf Prompt',
    model: 'Gemini 2.5 & GPT-4o',
    prompt: 'Konteks: Pelancaran produk AI tempatan. Peranan: Ketua Pemasaran Digital. Tugasan: Rangka jadual pelancaran 14 hari berserta strategi CRTf berimpak tinggi.',
    output: '✓ Rangka kempen 14-hari dijana: 3 fasa prapelancaran, 5 rangka copywriting e-dagang berimpak, dan automasi tindak balas pelanggan.'
  },
  {
    id: 'workflow',
    tag: 'Automasi Agen AI',
    model: 'Claude 3.7 & DeepSeek',
    prompt: 'Bina automasi sokongan pelanggan menggunakan webhook & agen AI untuk menyaring pertanyaan, memeriksa inventori masa nyata, dan mengesahkan pembayaran.',
    output: '✓ Aliran automasi selesai: Mengurangkan masa respons daripada 2 jam kepada 4 saat dengan ketepatan pengkategorian tiket 98.7%.'
  },
  {
    id: 'creative',
    tag: 'Visual Sinematik & Video AI',
    model: 'Midjourney v6 & Runway Gen-3',
    prompt: 'Visual 8K 35mm sinematik: Studio moden AI di Kuala Lumpur dengan pencahayaan neon amber dan siluet jurutera data masa hadapan.',
    output: '✓ Rangka seni fotorealistik 8K siap dijana bersama arahan kamera sinematik untuk penghasilan video komersial.'
  }
];

export interface MockCourseLesson {
  id: string;
  number: number;
  title: string;
  titleEn: string;
  duration: string;
  levelBadge: string;
  moduleBadge: string;
  instructor: string;
  image: string;
  summary: string;
}

export const MOCK_COURSE_LESSONS: MockCourseLesson[] = [
  {
    id: 'les-1',
    number: 1,
    title: 'Pengenalan Paradigma AI: Rule-Based vs Deep Learning vs Generative',
    titleEn: 'Introduction to AI Paradigms: Rule-Based vs Deep Learning',
    duration: '14:20',
    levelBadge: 'TAHAP 1: ASAS',
    moduleBadge: 'Modul 1 · Pelajaran 1',
    instructor: 'Dr. Farhan Azim',
    image: '/src/assets/images/course_level_beginner_1792520563264.jpg',
    summary: 'Memahami evolusi kecerdasan buatan, perbezaan antara model ramalan tradisional dan transformer generatif moden.'
  },
  {
    id: 'les-2',
    number: 2,
    title: 'Formula CRTF Berimpak Tinggi (Context, Role, Task, Format)',
    titleEn: 'High-Impact CRTF Formula: Context, Role, Task & Format',
    duration: '18:45',
    levelBadge: 'TAHAP 1: ASAS',
    moduleBadge: 'Modul 1 · Pelajaran 2',
    instructor: 'Dr. Farhan Azim',
    image: '/src/assets/images/hero_ai_learning_1792520564015.jpg',
    summary: 'Kuasai formula 4-tiang CRTF untuk menghapuskan halusinasi dan menjana output perniagaan berkualiti tinggi.'
  },
  {
    id: 'les-3',
    number: 3,
    title: 'Mengatasi Halusinasi & Parameter Suhu (Temperature/Top-p)',
    titleEn: 'Mitigating Hallucinations & Temperature Parameters',
    duration: '16:10',
    levelBadge: 'TAHAP 1: ASAS',
    moduleBadge: 'Modul 1 · Pelajaran 3',
    instructor: 'Dr. Farhan Azim',
    image: '/src/assets/images/course_level_intermediate_1792520565056.jpg',
    summary: 'Panduan teknikal menyelaraskan nilai Temperature dan Top-p untuk ketepatan fakta dan kreativiti optimum.'
  },
  {
    id: 'les-4',
    number: 4,
    title: 'Seni Bina Prompt Visual Sinematik & Seed Control (Midjourney v6)',
    titleEn: 'Cinematic 8K Visual Prompting & Seed Control',
    duration: '22:30',
    levelBadge: 'TAHAP 2: GENERATIF',
    moduleBadge: 'Modul 2 · Pelajaran 1',
    instructor: 'Nadia Syafika',
    image: '/src/assets/images/course_level_advanced_1792520565131.jpg',
    summary: 'Eksplorasi arahan pencahayaan, nisbah aspek komersial, lensa kamera, dan seed control konsistensi watak.'
  }
];

export const PublicLandingGateway: React.FC<PublicLandingGatewayProps> = ({
  onOpenAuth,
  onOpenAdminLogin,
  courses = STORE_COURSES
}) => {
  const { t, isEn } = useLanguage();
  const [catalogTab, setCatalogTab] = useState<'courses' | 'modules'>('courses');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<CourseCategoryKey>('all');
  const [activeDemoIndex, setActiveDemoIndex] = useState(0);

  // Interactive Learning Course states inside MacBook Pro Mockup
  const [activeLessonIndex, setActiveLessonIndex] = useState(1); // default to Pelajaran 2 (Formula CRTF)
  const [isMacPlaying, setIsMacPlaying] = useState(true);
  const [completedLessonIds, setCompletedLessonIds] = useState<Record<string, boolean>>({
    'les-1': true
  });

  const toggleLessonComplete = (lessonId: string) => {
    setCompletedLessonIds((prev) => ({
      ...prev,
      [lessonId]: !prev[lessonId]
    }));
  };

  // Auto-cycle through interactive prompt showcases every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveDemoIndex((prev) => (prev + 1) % PROMPT_DEMOS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Filtered store courses by Category
  const filteredCourses = courses.filter((course) => {
    return matchCourseCategory(course, selectedCategoryFilter);
  });

  // Filtered modules by Category
  const filteredModules = MODULES_DATA.filter((mod) => {
    return matchModuleCategory(mod, selectedCategoryFilter);
  });

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-amber-400/20 selection:text-amber-300">
      {/* 1. Public Top Navigation Header */}
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="sticky top-0 z-40 bg-[#000000]/95 backdrop-blur-md border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-3 sm:px-8 h-16">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 shrink-0">
            <motion.div
              whileHover={{ rotate: 10, scale: 1.08 }}
              className="w-8 h-8 rounded bg-white text-black flex items-center justify-center font-black text-xs tracking-wider shadow shrink-0"
            >
              AI
            </motion.div>
            <div className="min-w-0">
              <span className="font-['Oswald'] font-bold text-base sm:text-xl tracking-wider text-white uppercase leading-none block truncate">
                {t('brand.name', 'AKADEMI AI')}
              </span>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-neutral-400 font-sans hidden sm:block">
                {isEn ? 'Online Professional Training' : 'Latihan Profesional Dalam Talian'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {/* Bilingual Toggle Button */}
            <LanguageSwitcher variant="compact" />

            {onOpenAdminLogin && (
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={onOpenAdminLogin}
                className="p-1.5 sm:px-2.5 sm:py-1.5 bg-neutral-900/90 hover:bg-neutral-800 text-amber-400 hover:text-amber-300 border border-amber-400/40 text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer inline-flex items-center gap-1.5 shrink-0"
                title={isEn ? 'Admin login to manage and publish courses' : 'Log masuk Pentadbir untuk mengurus dan mengemaskini kursus'}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden md:inline">{t('nav.admin', 'Admin')}</span>
              </motion.button>
            )}

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => onOpenAuth('login')}
              className="px-2.5 sm:px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-neutral-200 hover:text-white transition-colors cursor-pointer shrink-0"
            >
              {t('nav.login', 'Log Masuk')}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => onOpenAuth('signup')}
              className="px-3 sm:px-4 py-1.5 bg-white text-black font-bold text-xs uppercase tracking-wider hover:bg-neutral-200 transition-all shadow cursor-pointer shrink-0"
            >
              {t('nav.signup', 'Daftar')}
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* 2. Hero Gateway Banner with Rich Motion Animations, Cinematic Visuals & Holographic Badges */}
      <section className="relative w-full min-h-[640px] sm:min-h-[760px] flex flex-col items-center justify-center pt-20 pb-16 sm:py-28 px-4 sm:px-8 overflow-hidden border-b border-white/10 bg-black">
        {/* Full Cinematic AI Background Image with Subtle Breathing Zoom */}
        <div className="absolute inset-0 z-0">
          <motion.img
            initial={{ scale: 1.12, opacity: 0 }}
            animate={{ scale: [1.02, 1.06, 1.02], opacity: [0.38, 0.46, 0.38] }}
            transition={{
              scale: { duration: 16, repeat: Infinity, ease: 'easeInOut' },
              opacity: { duration: 8, repeat: Infinity, ease: 'easeInOut' }
            }}
            src="/src/assets/images/hero_ai_learning_1792520564015.jpg"
            alt="Akademi AI Latar Belakang Pembelajaran"
            className="w-full h-full object-cover object-center brightness-75 contrast-115"
          />
          {/* Deep cinematic gradient vignettes for ultra crisp text legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/85 to-black/80" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-transparent to-black" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/15 via-transparent to-black/90" />
          {/* Subtle cyber grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />
        </div>

        {/* Ambient Multi-Phase Glowing Energy Orbs with Smooth Floating Animation */}
        <motion.div
          animate={{
            scale: [1, 1.25, 1],
            x: [-20, 20, -20],
            y: [-10, 15, -10],
            opacity: [0.35, 0.6, 0.35]
          }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] bg-amber-400/20 rounded-full blur-[100px] pointer-events-none"
        />
        <motion.div
          animate={{
            scale: [1.2, 0.95, 1.2],
            x: [25, -25, 25],
            y: [15, -10, 15],
            opacity: [0.25, 0.45, 0.25]
          }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/3 right-1/4 w-[480px] h-[480px] bg-emerald-500/15 rounded-full blur-[110px] pointer-events-none"
        />

        {/* Floating Holographic Badge 1 (Left - Desktop Only) */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{
            opacity: 1,
            x: 0,
            y: [-8, 8, -8],
            rotate: [-1.5, 1.5, -1.5]
          }}
          transition={{
            opacity: { duration: 0.8, delay: 0.3 },
            x: { duration: 0.8, delay: 0.3 },
            y: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
            rotate: { duration: 7, repeat: Infinity, ease: 'easeInOut' }
          }}
          className="hidden xl:flex absolute left-8 top-1/3 -translate-y-1/2 flex-col gap-2 p-4 bg-black/80 border border-amber-400/40 backdrop-blur-md shadow-[0_0_30px_rgba(251,191,36,0.15)] text-left max-w-[220px] pointer-events-none z-20"
        >
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold">CRTf Formula Lab</span>
          </div>
          <div className="text-xs text-neutral-200 font-sans font-semibold leading-snug">
            Konteks · Role · Task · Format Output
          </div>
          <div className="text-[10px] font-mono text-neutral-400 border-t border-white/10 pt-1 flex items-center justify-between">
            <span>Ketepatan Prompt</span>
            <span className="text-amber-400 font-bold">99.4%</span>
          </div>
        </motion.div>

        {/* Floating Holographic Badge 2 (Right - Desktop Only) */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{
            opacity: 1,
            x: 0,
            y: [8, -8, 8],
            rotate: [1.5, -1.5, 1.5]
          }}
          transition={{
            opacity: { duration: 0.8, delay: 0.4 },
            x: { duration: 0.8, delay: 0.4 },
            y: { duration: 6.5, repeat: Infinity, ease: 'easeInOut' },
            rotate: { duration: 7.5, repeat: Infinity, ease: 'easeInOut' }
          }}
          className="hidden xl:flex absolute right-8 top-1/3 -translate-y-1/2 flex-col gap-2 p-4 bg-black/80 border border-emerald-400/40 backdrop-blur-md shadow-[0_0_30px_rgba(16,185,129,0.15)] text-left max-w-[220px] pointer-events-none z-20"
        >
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-spin" style={{ animationDuration: '6s' }} />
            <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold">Model AI 2026</span>
          </div>
          <div className="text-xs text-neutral-200 font-sans font-semibold leading-snug">
            Gemini 2.5, Claude 3.7 & DeepSeek
          </div>
          <div className="text-[10px] font-mono text-neutral-400 border-t border-white/10 pt-1 flex items-center justify-between">
            <span>Silibus Video</span>
            <span className="text-emerald-400 font-bold">18 Modul 4K</span>
          </div>
        </motion.div>

        {/* Center Content Container */}
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6 sm:space-y-7">
          {/* Live Radar Activity Beacon Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-black/70 border border-amber-400/40 rounded-full backdrop-blur-md shadow-[0_0_20px_rgba(251,191,36,0.2)]"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-80" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-200">
              {isEn ? '1,840+ Active Students Learning AI' : '1,840+ Pelajar Aktif Sedang Belajar AI'}
            </span>
            <span className="text-amber-400 text-xs">✦</span>
            <span className="text-[11px] font-mono text-amber-300 font-bold uppercase hidden sm:inline">
              {isEn ? 'Enrollment Open' : 'Pendaftaran Dibuka'}
            </span>
          </motion.div>

          {/* Main Huge Condensed Impact Headline with Staggered Kinetic Motion */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
            className="space-y-1"
          >
            <h1 className="font-['Oswald'] font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-wider text-white uppercase leading-[1.03] drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">
              {isEn ? 'AI ACADEMY ' : 'PORTAL PEMBELAJARAN '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-200 drop-shadow-[0_0_35px_rgba(251,191,36,0.45)]">
                {isEn ? 'LEARNING PORTAL' : 'AKADEMI AI'}
              </span>
            </h1>
          </motion.div>

          {/* Supporting Description with Fade-Up Motion */}
          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.28, ease: 'easeOut' }}
            className="text-sm sm:text-base md:text-lg text-neutral-300 max-w-2xl mx-auto leading-relaxed font-sans drop-shadow"
          >
            {isEn
              ? 'Master real-world Artificial Intelligence from Beginner to Mastery: explore cinematic 4K video modules, step-by-step prompt frameworks, hands-on automation, and verified certificates.'
              : 'Kuasai Kecerdasan Buatan (AI) dari peringkat asas hingga profesional: akses katalog modul video sinematik 4K, formula keyword prompt berimpak, makmal praktikal, dan pensijilan digital rasmi.'}
          </motion.p>

          {/* Primary Action Buttons with Motion Spring & Shimmer Light Sweep */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.38, ease: 'easeOut' }}
            className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5"
          >
            {/* Primary Action with Continuous Moving Shimmer Reflection */}
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => onOpenAuth('login')}
              className="relative overflow-hidden w-full sm:w-auto px-9 py-4 bg-amber-400 hover:bg-amber-300 text-black font-bold uppercase text-xs sm:text-sm tracking-wider transition-colors shadow-[0_0_30px_rgba(251,191,36,0.4)] flex items-center justify-center gap-2 cursor-pointer group"
            >
              {/* Animated Light Sweep Shimmer */}
              <motion.div
                animate={{ x: ['-140%', '240%'] }}
                transition={{
                  repeat: Infinity,
                  duration: 2.8,
                  ease: 'easeInOut',
                  repeatDelay: 1.2
                }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-12 pointer-events-none"
              />
              <span className="relative z-10">{isEn ? 'Log In To Portal' : 'Log Masuk Ke Portal'}</span>
              <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => onOpenAuth('signup')}
              className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white hover:text-black border border-white/25 text-white font-bold uppercase text-xs sm:text-sm tracking-wider transition-all cursor-pointer backdrop-blur-md shadow-lg"
            >
              {isEn ? 'Register New Account' : 'Daftar Akaun Baru'}
            </motion.button>
          </motion.div>

          {/* Quick Perks Strip with Staggered Entrance */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.48, ease: 'easeOut' }}
            className="pt-6 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-neutral-300 border-t border-white/15"
          >
            <motion.div
              whileHover={{ y: -2, scale: 1.03 }}
              className="flex items-center gap-2 bg-black/50 px-3.5 py-1.5 border border-white/10 backdrop-blur-sm transition-colors hover:border-amber-400/40"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{isEn ? 'Free & Premium Modules' : 'Akses Modul Percuma & Berbayar'}</span>
            </motion.div>
            <motion.div
              whileHover={{ y: -2, scale: 1.03 }}
              className="flex items-center gap-2 bg-black/50 px-3.5 py-1.5 border border-white/10 backdrop-blur-sm transition-colors hover:border-amber-400/40"
            >
              <Award className="w-4 h-4 text-amber-400" />
              <span>{isEn ? 'Accredited Digital Certificate' : 'Sijil Digital Diiktiraf'}</span>
            </motion.div>
            <motion.div
              whileHover={{ y: -2, scale: 1.03 }}
              className="flex items-center gap-2 bg-black/50 px-3.5 py-1.5 border border-white/10 backdrop-blur-sm transition-colors hover:border-amber-400/40"
            >
              <Users className="w-4 h-4 text-blue-400" />
              <span>{isEn ? 'Expert AI Mentorship' : 'Bimbingan Tenaga Pakar AI'}</span>
            </motion.div>
          </motion.div>

          {/* Actual Realistic Apple MacBook Pro Mockup - Interactive Learning Course Classroom Experience */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.58, ease: 'easeOut' }}
            className="pt-6 max-w-5xl mx-auto w-full text-left"
          >
            {/* Ambient Radial Backlight Glow Behind MacBook */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-amber-500/15 via-emerald-500/15 to-amber-500/15 blur-3xl rounded-full opacity-60 pointer-events-none -z-10" />

              {/* 1. MacBook Display Lid (Top Shell - Authentic Space Gray Aluminum & Slim Bezel) */}
              <div className="relative bg-gradient-to-b from-[#2e2e34] via-[#1c1c1f] to-[#111113] p-2 sm:p-3 pb-0 rounded-t-[20px] sm:rounded-t-[26px] border border-neutral-700/70 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.95)] ring-1 ring-white/10">
                
                {/* MacBook Screen Glass Display */}
                <div className="relative rounded-t-[14px] sm:rounded-t-[18px] bg-black overflow-hidden border border-neutral-800/90 shadow-[inset_0_0_20px_rgba(0,0,0,0.95)]">
                  
                  {/* Apple MacBook Pro Camera Notch (Slim & Perfectly Centered in Safari Top Bar) */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-22 sm:w-28 h-3 sm:h-3.5 bg-black rounded-b-xl z-30 flex items-center justify-center gap-1.5 border-b border-x border-neutral-800/80 pointer-events-none shadow-sm">
                    {/* FaceTime Camera Lens with realistic reflection */}
                    <div className="w-2 h-2 rounded-full bg-neutral-900 border border-neutral-700/80 flex items-center justify-center">
                      <div className="w-1 h-1 rounded-full bg-blue-900/90 shadow-[inset_0_0_2px_#38bdf8]" />
                    </div>
                    {/* Green Camera Active Indicator LED */}
                    <div className="w-1 h-1 rounded-full bg-emerald-400 shadow-[0_0_4px_#34d399] animate-pulse" />
                  </div>

                  {/* macOS Safari Browser Header Bar */}
                  <div className="bg-[#141418] px-3 sm:px-4 py-2 sm:py-2.5 border-b border-white/10 flex items-center justify-between gap-2 select-none">
                    <div className="flex items-center gap-2.5 min-w-0">
                      {/* macOS Window Control Dots */}
                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56] border border-[#e0443e] inline-block shadow-sm" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] border border-[#dea123] inline-block shadow-sm" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f] border border-[#1aab29] inline-block shadow-sm" />
                      </div>

                      {/* Safari Navigation Buttons */}
                      <div className="hidden sm:flex items-center gap-1 text-neutral-500 pl-1">
                        <ChevronLeft className="w-3.5 h-3.5 opacity-50" />
                        <ChevronRight className="w-3.5 h-3.5 opacity-50" />
                      </div>
                    </div>

                    {/* Safari Address / URL Bar */}
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-black/60 border border-white/10 rounded-md text-[10px] sm:text-[11px] font-mono text-neutral-300 max-w-[280px] sm:max-w-md w-full justify-center truncate">
                      <Lock className="w-3 h-3 text-emerald-400 shrink-0" />
                      <span className="text-neutral-400">akademiai.my</span>
                      <span className="text-neutral-500">/portal/kursus/</span>
                      <span className="text-amber-400 font-bold truncate">tahap-1-pelajaran-2</span>
                    </div>

                    {/* Right System Indicators: Progress & Active Student Profile */}
                    <div className="flex items-center gap-2 shrink-0">
                      <div className="hidden sm:flex items-center gap-1 text-[10px] font-mono text-amber-300 bg-amber-400/10 px-2 py-0.5 border border-amber-400/30 rounded">
                        <Sparkles className="w-3 h-3 text-amber-400" />
                        <span>67% SIAP</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-neutral-300 text-[10px] font-mono pl-1 border-l border-white/10">
                        <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 text-black font-bold text-[9px] flex items-center justify-center">
                          AF
                        </div>
                        <span className="hidden md:inline text-neutral-300 text-[10px] font-sans font-semibold">Ahmad Faiz</span>
                      </div>
                    </div>
                  </div>

                  {/* LEARNING COURSE INTERFACE: Video Classroom & Curriculum Playlist */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 bg-[#09090b]">
                    {/* Left 8 Cols: Main Video Player & Lesson Interactive Details */}
                    <div className="lg:col-span-8 p-3 sm:p-4 border-b lg:border-b-0 lg:border-r border-white/10 space-y-3.5">
                      
                      {/* Video Player Display Container */}
                      <div className="relative aspect-video sm:aspect-[16/9.5] rounded-lg overflow-hidden bg-black border border-white/10 shadow-xl group select-none">
                        {/* Video Thumbnail Background */}
                        <img
                          src={MOCK_COURSE_LESSONS[activeLessonIndex].image}
                          alt={MOCK_COURSE_LESSONS[activeLessonIndex].title}
                          className="w-full h-full object-cover brightness-90 group-hover:scale-102 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-black/60 pointer-events-none" />

                        {/* Top Video Overlay Information */}
                        <div className="absolute top-2.5 sm:top-3.5 inset-x-3 sm:inset-x-4 flex items-center justify-between text-[10px] sm:text-[11px] font-mono">
                          <div className="flex items-center gap-2">
                            <span className="bg-amber-400 text-black font-bold px-2 py-0.5 rounded text-[9px] uppercase tracking-wider">
                              {MOCK_COURSE_LESSONS[activeLessonIndex].levelBadge}
                            </span>
                            <span className="text-neutral-200 hidden sm:inline">
                              {MOCK_COURSE_LESSONS[activeLessonIndex].moduleBadge}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-[9px] sm:text-[10px] text-neutral-300 bg-black/60 px-2 py-0.5 border border-white/15 rounded backdrop-blur-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            <span>4K ULTRA HD</span>
                            <span className="text-white/30">|</span>
                            <span>DOLBY AUDIO</span>
                          </div>
                        </div>

                        {/* Center Animated Play / Pause Control Button */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.92 }}
                            onClick={() => setIsMacPlaying(!isMacPlaying)}
                            className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-amber-400 hover:bg-amber-300 text-black flex items-center justify-center shadow-[0_0_30px_rgba(251,191,36,0.6)] cursor-pointer transition-all"
                            title={isMacPlaying ? 'Jeda Video' : 'Mainkan Video'}
                          >
                            {isMacPlaying ? (
                              <Pause className="w-5 h-5 sm:w-6 sm:h-6 fill-black" />
                            ) : (
                              <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-black ml-0.5" />
                            )}
                            {/* Ambient breathing ripple */}
                            <span className="absolute -inset-2 rounded-full border border-amber-400/50 animate-ping pointer-events-none opacity-40" />
                          </motion.button>
                        </div>

                        {/* Bottom Scrubber & Video Player Controls */}
                        <div className="absolute bottom-0 inset-x-0 p-2.5 sm:p-3 bg-gradient-to-t from-black via-black/90 to-transparent space-y-1.5">
                          {/* Progress Scrubber Line */}
                          <div className="relative w-full h-1 sm:h-1.5 bg-white/20 rounded-full overflow-hidden cursor-pointer">
                            <div className="absolute left-0 top-0 bottom-0 w-[52%] bg-gradient-to-r from-amber-500 to-amber-300 rounded-full" />
                          </div>

                          {/* Controls Row */}
                          <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-neutral-300 pt-0.5">
                            <div className="flex items-center gap-2.5">
                              <button
                                onClick={() => setIsMacPlaying(!isMacPlaying)}
                                className="hover:text-amber-300 transition-colors cursor-pointer"
                              >
                                {isMacPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                              </button>
                              <Volume2 className="w-3.5 h-3.5 text-neutral-400" />
                              <span className="text-[10px]">
                                <span className="text-amber-400 font-bold">08:45</span> / {MOCK_COURSE_LESSONS[activeLessonIndex].duration}
                              </span>
                            </div>

                            <div className="flex items-center gap-2 text-neutral-400 text-[10px]">
                              <span className="px-1.5 py-0.5 bg-white/10 rounded text-[9px] text-white font-bold">CC BM</span>
                              <span className="px-1.5 py-0.5 bg-white/10 rounded text-[9px] text-neutral-300">1.0x</span>
                              <Maximize2 className="w-3.5 h-3.5 hover:text-white transition-colors cursor-pointer" />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Active Lesson Metadata & Quick Action Toolbar */}
                      <div className="space-y-2 text-left">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                          <h3 className="font-['Oswald'] text-base sm:text-lg font-bold text-white uppercase tracking-wide truncate">
                            {MOCK_COURSE_LESSONS[activeLessonIndex].title}
                          </h3>
                          <span className="text-[11px] font-sans text-neutral-400 shrink-0">
                            {MOCK_COURSE_LESSONS[activeLessonIndex].instructor}
                          </span>
                        </div>
                        <p className="text-xs text-neutral-300 font-sans line-clamp-2 leading-relaxed">
                          {MOCK_COURSE_LESSONS[activeLessonIndex].summary}
                        </p>

                        {/* Interactive Toolbar below video */}
                        <div className="pt-1 flex flex-wrap items-center gap-2">
                          <button
                            onClick={() => toggleLessonComplete(MOCK_COURSE_LESSONS[activeLessonIndex].id)}
                            className={`px-3 py-1.5 text-xs font-mono font-bold uppercase tracking-wider rounded border transition-all cursor-pointer inline-flex items-center gap-1.5 ${
                              completedLessonIds[MOCK_COURSE_LESSONS[activeLessonIndex].id]
                                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                                : 'bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border-white/15'
                            }`}
                          >
                            <CheckCircle2 className={`w-3.5 h-3.5 ${
                              completedLessonIds[MOCK_COURSE_LESSONS[activeLessonIndex].id] ? 'text-emerald-400' : 'text-neutral-500'
                            }`} />
                            <span>
                              {completedLessonIds[MOCK_COURSE_LESSONS[activeLessonIndex].id]
                                ? (isEn ? 'Completed' : 'Telah Selesai')
                                : (isEn ? 'Mark Complete' : 'Tandakan Selesai')}
                            </span>
                          </button>

                          <button
                            onClick={() => onOpenAuth('login')}
                            className="px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-white/15 text-xs font-mono rounded inline-flex items-center gap-1.5 cursor-pointer"
                          >
                            <FileText className="w-3.5 h-3.5 text-amber-400" />
                            <span>{isEn ? 'Lesson Notes' : 'Nota Pelajaran'}</span>
                          </button>

                          <button
                            onClick={() => onOpenAuth('login')}
                            className="px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-white/15 text-xs font-mono rounded inline-flex items-center gap-1.5 cursor-pointer"
                          >
                            <Terminal className="w-3.5 h-3.5 text-amber-400" />
                            <span>{isEn ? 'CRTf Prompt Lab' : 'Makmal Prompt CRTf'}</span>
                          </button>

                          <button
                            onClick={() => onOpenAuth('login')}
                            className="ml-auto text-xs font-bold font-mono text-amber-400 hover:text-amber-300 uppercase tracking-wider inline-flex items-center gap-1 cursor-pointer"
                          >
                            <span>{isEn ? 'Open Full Classroom' : 'Buka Bilik Darjah'}</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Right 4 Cols: Course Curriculum & Lesson Playlist */}
                    <div className="lg:col-span-4 p-3 sm:p-4 bg-[#0d0d10] flex flex-col justify-between border-t lg:border-t-0 border-white/10 space-y-3">
                      <div>
                        {/* Curriculum Header */}
                        <div className="flex items-center justify-between pb-2.5 border-b border-white/10">
                          <div>
                            <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold block">
                              {isEn ? 'COURSE SYLLABUS' : 'KANDUNGAN SILIBUS'}
                            </span>
                            <h4 className="font-['Oswald'] text-sm font-bold text-white uppercase tracking-wide">
                              Tahap 1: Asas & Keyword Prompt
                            </h4>
                          </div>
                          <span className="text-[10px] font-mono text-neutral-400 bg-neutral-800 px-2 py-0.5 rounded">
                            4 Pelajaran
                          </span>
                        </div>

                        {/* Lesson Playlist Items */}
                        <div className="pt-2 space-y-1.5">
                          {MOCK_COURSE_LESSONS.map((l, idx) => {
                            const isActive = activeLessonIndex === idx;
                            const isDone = Boolean(completedLessonIds[l.id]);

                            return (
                              <button
                                key={l.id}
                                onClick={() => setActiveLessonIndex(idx)}
                                className={`w-full text-left p-2.5 rounded-md border transition-all cursor-pointer flex items-start gap-2.5 ${
                                  isActive
                                    ? 'bg-amber-400/10 border-amber-400/50 shadow-inner'
                                    : 'bg-black/50 border-white/10 hover:border-white/20 hover:bg-black/80'
                                }`}
                              >
                                {/* Status Icon / Number */}
                                <div className="mt-0.5 shrink-0">
                                  {isDone ? (
                                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                  ) : isActive ? (
                                    <span className="w-4 h-4 rounded-full bg-amber-400 text-black font-bold text-[9px] flex items-center justify-center">
                                      ▶
                                    </span>
                                  ) : (
                                    <span className="w-4 h-4 rounded-full bg-neutral-800 text-neutral-400 font-mono text-[9px] flex items-center justify-center">
                                      {l.number}
                                    </span>
                                  )}
                                </div>

                                {/* Title & Duration */}
                                <div className="min-w-0 flex-1">
                                  <div className="flex items-center justify-between gap-1">
                                    <span className={`text-xs font-sans font-semibold leading-snug line-clamp-1 ${
                                      isActive ? 'text-amber-300 font-bold' : 'text-neutral-200'
                                    }`}>
                                      {l.number}. {l.title}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2 pt-0.5 text-[10px] font-mono text-neutral-400">
                                    <span className="flex items-center gap-1">
                                      <Clock className="w-3 h-3 text-neutral-500" />
                                      <span>{l.duration}</span>
                                    </span>
                                    {isActive && (
                                      <span className="text-[9px] font-bold text-amber-400 bg-amber-400/15 px-1.5 py-0.2 rounded">
                                        SEDANG DIMAINKAN
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Bottom Quick Certificate & Access CTA inside screen */}
                      <div className="pt-2 border-t border-white/10 space-y-2">
                        <div className="p-2.5 bg-black/60 rounded border border-amber-400/20 flex items-center gap-2.5 text-left">
                          <Award className="w-5 h-5 text-amber-400 shrink-0" />
                          <div className="min-w-0 text-[10px] font-sans">
                            <span className="font-bold text-white block truncate">Sijil Pengiktirafan Digital</span>
                            <span className="text-neutral-400 block truncate">Dikeluarkan rasmi selepas tamat modul</span>
                          </div>
                        </div>

                        <button
                          onClick={() => onOpenAuth('signup')}
                          className="w-full py-2 bg-amber-400 hover:bg-amber-300 text-black font-bold uppercase text-[11px] font-mono tracking-wider transition-all shadow cursor-pointer text-center flex items-center justify-center gap-1.5"
                        >
                          <span>{isEn ? 'Start Learning Course' : 'Mula Belajar Kursus Ini'}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Diagonal Subtle Glass Specular Sheen across display */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.025] to-transparent" />
                </div>
              </div>

              {/* 2. MacBook Screen Hinge Bar (Accurate Precision Slot) */}
              <div className="w-[95%] sm:w-[96%] h-1.5 sm:h-2 mx-auto bg-gradient-to-b from-neutral-950 via-[#151518] to-[#1c1c1f] border-x border-neutral-800 shadow-inner" />

              {/* 3. MacBook Lower Chassis / Unibody Aluminum Base Deck (Actual Proportions & Chamfer) */}
              <div className="relative mx-auto w-[101.5%] -ml-[0.75%] h-3 sm:h-3.5 bg-gradient-to-b from-[#34343a] via-[#222225] to-[#121214] rounded-b-[12px] sm:rounded-b-[16px] border-t border-white/25 border-b border-neutral-950 shadow-[0_20px_40px_rgba(0,0,0,0.95)]">
                {/* Iconic Center Display Thumb Opening Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 sm:w-22 h-1 bg-neutral-900/90 rounded-b-md border-b border-x border-neutral-700/60 shadow-inner" />
              </div>

              {/* 4. Realistic Ambient Desk Contact Shadow */}
              <div className="h-3 sm:h-4 w-[90%] mx-auto bg-black/95 blur-md -mt-1 rounded-full shadow-[0_15px_30px_rgba(0,0,0,0.95)] pointer-events-none" />
            </div>
          </motion.div>

          {/* Minimalist Animated Scroll Down Prompt */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="pt-6 flex flex-col items-center justify-center gap-1.5 text-neutral-400 text-xs font-mono"
          >
            <span className="text-[10px] uppercase tracking-widest text-neutral-400">
              {isEn ? 'Scroll To Explore Syllabus' : 'Tatal Ke Bawah Untuk Terokai Silibus'}
            </span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
              className="w-5 h-8 border border-white/30 rounded-full flex items-start justify-center p-1"
            >
              <div className="w-1 h-2 bg-amber-400 rounded-full" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Infinite Continuous Motion Marquee Ticker Strip directly below Hero */}
      <div className="relative w-full overflow-hidden border-y border-white/15 bg-neutral-950 py-3.5 select-none shadow-xl z-20">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ repeat: Infinity, ease: 'linear', duration: 28 }}
          className="flex whitespace-nowrap gap-8 text-xs font-mono font-bold uppercase tracking-widest text-neutral-300"
        >
          {/* Loop items repeated twice for perfectly seamless infinite scrolling */}
          {[1, 2].map((loopKey) => (
            <div key={loopKey} className="flex items-center gap-8 shrink-0">
              <span className="flex items-center gap-2 text-amber-400">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>GENERATIVE AI 2026</span>
              </span>
              <span className="text-white/20">|</span>
              <span className="flex items-center gap-2 text-white">
                <Cpu className="w-3.5 h-3.5 text-emerald-400" />
                <span>FORMULA CRTf PROMPT ARCHITECTURE</span>
              </span>
              <span className="text-white/20">|</span>
              <span className="flex items-center gap-2 text-amber-400">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>18 MODUL VIDEO SINEMATIK 4K</span>
              </span>
              <span className="text-white/20">|</span>
              <span className="flex items-center gap-2 text-white">
                <Bot className="w-3.5 h-3.5 text-cyan-400" />
                <span>AUTOMASI AGEN AI & WORKFLOW</span>
              </span>
              <span className="text-white/20">|</span>
              <span className="flex items-center gap-2 text-amber-400">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>PENTAULIAHAN SIJIL DIGITAL BERKOD QR</span>
              </span>
              <span className="text-white/20">|</span>
              <span className="flex items-center gap-2 text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>100% AMALI PRAKTIKAL BAHASA MELAYU & INGGERIS</span>
              </span>
              <span className="text-white/20">|</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* 3. Course & Module Catalog Section with Animated Tabs, Cards & Hover Effects */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-16 space-y-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-white/10 pb-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 mb-1 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isEn ? 'Curriculum & Catalog Preview' : 'Pratonton Silibus & Katalog Penuh'}</span>
            </div>
            <h2 className="font-['Oswald'] text-3xl sm:text-5xl font-black uppercase tracking-wide text-white">
              {isEn ? 'COURSES & MODULES IN PORTAL' : 'KURSUS & MODUL TERSEDIA DI DALAM PORTAL'}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-2xl leading-relaxed">
              {isEn
                ? 'All courses and modules feature cinematic videos, practical worksheets, interactive labs, and digital certification. Log in for full access.'
                : 'Semua kursus dan modul dilengkapi video pembelajaran sinematik, lembaran amali, makmal interaktif dan sijil digital. Log masuk untuk membuka akses penuh.'}
            </p>
          </motion.div>

          {/* Catalog Tab Switcher & Login CTA */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex bg-[#121212] border border-white/15 p-1 rounded-none">
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => setCatalogTab('courses')}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  catalogTab === 'courses'
                    ? 'bg-amber-400 text-black shadow-md'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {isEn ? `All Courses (${courses.length})` : `Semua Course (${courses.length})`}
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => setCatalogTab('modules')}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  catalogTab === 'modules'
                    ? 'bg-amber-400 text-black shadow-md'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {isEn ? `Syllabus Modules (${MODULES_DATA.length})` : `Modul Silibus (${MODULES_DATA.length})`}
              </motion.button>
            </div>

            <motion.button
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => onOpenAuth('login')}
              className="px-5 py-2.5 bg-white text-black font-bold uppercase text-xs tracking-wider hover:bg-neutral-200 transition-colors shrink-0 cursor-pointer flex items-center gap-1.5 shadow"
            >
              <span>{isEn ? 'Log In To Portal' : 'Log Masuk Ke Portal'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </motion.button>
          </div>
        </div>

        {/* Category Filter Bar with Smooth Micro-interactions */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs no-scrollbar">
          <span className="text-neutral-400 uppercase font-mono font-bold mr-1 shrink-0 flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-amber-400" />
            <span>{isEn ? 'Category:' : 'Kategori:'}</span>
          </span>

          {CATEGORY_FILTERS.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategoryFilter === cat.key;
            const count = catalogTab === 'courses'
              ? courses.filter((c) => matchCourseCategory(c, cat.key)).length
              : MODULES_DATA.filter((m) => matchModuleCategory(m, cat.key)).length;

            return (
              <motion.button
                key={cat.key}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setSelectedCategoryFilter(cat.key)}
                className={`px-3 py-1.5 font-mono uppercase font-bold transition-all border cursor-pointer shrink-0 flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-amber-400 text-black border-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.35)]'
                    : 'bg-neutral-900 text-neutral-300 border-white/10 hover:border-amber-400/40 hover:text-white'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-black' : 'text-amber-400'}`} />
                <span>{isEn ? cat.labelEn : cat.labelMs}</span>
                <span
                  className={`ml-0.5 px-1.5 py-0.2 text-[10px] rounded ${
                    isSelected
                      ? 'bg-black text-amber-300 font-black'
                      : 'bg-white/10 text-neutral-400'
                  }`}
                >
                  {count}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* ANIMATED CARDS GRID: COURSES CATALOG */}
        <AnimatePresence mode="wait">
          {catalogTab === 'courses' && (
            <motion.div
              key={`courses-${selectedCategoryFilter}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredCourses.map((course, idx) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.05, ease: 'easeOut' }}
                  whileHover={{ y: -8, transition: { duration: 0.22, ease: 'easeOut' } }}
                  className="bg-[#0e0e0e] border border-white/15 hover:border-amber-400/70 transition-colors duration-300 flex flex-col justify-between group shadow-xl hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)] relative overflow-hidden"
                >
                  {/* 1. Full Course Cover Image Header with Hover Zoom */}
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-black border-b border-white/10">
                    <img
                      src={course.coverImage}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out brightness-90 contrast-105"
                      loading="lazy"
                    />
                    {/* Cinematic gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                    {/* Top Badges Over Image */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10">
                      <span
                        className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 shadow-md border ${
                          course.isFree
                            ? 'bg-emerald-500 text-black border-emerald-400'
                            : 'bg-amber-400 text-black border-amber-300'
                        }`}
                      >
                        {course.isFree ? 'PERCUMA' : `RM${course.price}`}
                      </span>

                      <div className="flex items-center gap-1.5 text-[10px] font-mono font-semibold text-white bg-black/75 px-2.5 py-1 border border-white/20 backdrop-blur-md shadow">
                        <Lock className="w-3 h-3 text-amber-400" />
                        <span>Log Masuk</span>
                      </div>
                    </div>

                    {/* Bottom Image Strip: Category Badge, Level Category & Hours */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-neutral-200 z-10">
                      <div className="flex items-center gap-1.5">
                        <span className="bg-amber-400 text-black font-black text-[10px] px-2 py-0.5 border border-amber-300 shadow">
                          {getCourseCategoryBadge(course, isEn)}
                        </span>
                        <span className="bg-black/80 px-2 py-0.5 border border-white/15 backdrop-blur-sm text-[10px]">
                          {course.levelCategory}
                        </span>
                      </div>
                      <span className="bg-black/80 px-2 py-0.5 border border-white/15 backdrop-blur-sm flex items-center gap-1">
                        <Clock className="w-3 h-3 text-amber-400" />
                        {course.totalHours} · {course.totalLessons} Pelajaran
                      </span>
                    </div>
                  </div>

                  {/* 2. Course Card Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2.5">
                      <h3 className="font-['Oswald'] text-xl sm:text-2xl font-bold text-white group-hover:text-amber-300 transition-colors uppercase leading-snug">
                        {course.title}
                      </h3>

                      <p className="text-xs text-neutral-300 leading-relaxed font-sans line-clamp-2">
                        {course.tagline}
                      </p>

                      <div className="pt-2 flex items-center justify-between text-[11px] text-neutral-400 border-t border-white/10">
                        <div className="flex items-center gap-2">
                          {course.instructor.avatar && (
                            <img
                              src={course.instructor.avatar}
                              alt={course.instructor.name}
                              className="w-5 h-5 rounded-full object-cover border border-white/20"
                            />
                          )}
                          <span className="truncate max-w-[170px]">{course.instructor.name}</span>
                        </div>
                        <div className="flex items-center gap-1 text-amber-400 font-mono font-bold">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                          <span>{course.rating.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>

                    {/* 3. Card Bottom Strip: Price & Action with Motion Button */}
                    <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-3">
                      <div>
                        <span className="text-[10px] text-neutral-500 uppercase block font-mono">Yuran Akses:</span>
                        <div className="flex items-baseline gap-2">
                          <span className="font-mono font-black text-base text-white">
                            {course.isFree ? (
                              <span className="text-emerald-400">PERCUMA</span>
                            ) : (
                              <span>RM{course.price}</span>
                            )}
                          </span>
                          {course.originalPrice && course.originalPrice > course.price && (
                            <span className="text-xs text-neutral-500 line-through font-mono">
                              RM{course.originalPrice}
                            </span>
                          )}
                        </div>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onOpenAuth('login')}
                        className="px-4 py-2 bg-neutral-900 hover:bg-amber-400 hover:text-black border border-white/20 text-neutral-200 text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer shadow"
                      >
                        <Lock className="w-3 h-3" />
                        <span>Masuk Untuk Akses</span>
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
              {filteredCourses.length === 0 && (
                <div className="col-span-full py-12 text-center bg-[#0d0d0d] border border-white/10 p-8 space-y-3">
                  <Filter className="w-8 h-8 text-amber-400 mx-auto opacity-70" />
                  <h4 className="font-['Oswald'] text-lg font-bold uppercase text-white">
                    {isEn ? 'No courses found in this category' : 'Tiada kursus dalam kategori ini'}
                  </h4>
                  <p className="text-xs text-neutral-400 max-w-md mx-auto">
                    {isEn
                      ? 'Try selecting "All Categories" to view the full training curriculum.'
                      : 'Cuba pilih "Semua Kategori" untuk menerokai keseluruhan silibus portal.'}
                  </p>
                  <button
                    onClick={() => setSelectedCategoryFilter('all')}
                    className="px-4 py-2 bg-amber-400 text-black font-bold text-xs uppercase font-mono tracking-wider hover:bg-amber-300 transition-colors cursor-pointer"
                  >
                    {isEn ? 'View All Categories' : 'Lihat Semua Kategori'}
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {/* ANIMATED CARDS GRID: MODULES SILIBUS */}
          {catalogTab === 'modules' && (
            <motion.div
              key={`modules-${selectedCategoryFilter}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredModules.map((mod, idx) => {
                const levelConfig = LEVELS_CONFIG[mod.level];
                const totalDuration = mod.lessons.reduce((acc, l) => acc + l.durationMinutes, 0);

                return (
                  <motion.div
                    key={mod.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.05, ease: 'easeOut' }}
                    whileHover={{ y: -8, transition: { duration: 0.22, ease: 'easeOut' } }}
                    className="bg-[#0e0e0e] border border-white/15 hover:border-amber-400/70 transition-colors duration-300 flex flex-col justify-between group shadow-xl hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)] relative overflow-hidden"
                  >
                    {/* Full Module Cover Image Header with Hover Zoom */}
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-black border-b border-white/10">
                      <img
                        src={mod.coverImage || levelConfig.coverImage}
                        alt={mod.title}
                        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out brightness-90 contrast-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 bg-amber-400 text-black border border-amber-300 shadow">
                          MODUL 0{idx + 1}
                        </span>
                        <span className="text-[10px] font-mono font-semibold px-2 py-0.5 bg-black/80 text-neutral-300 border border-white/20 backdrop-blur-sm">
                          {levelConfig.badge}
                        </span>
                      </div>

                      {/* Bottom Image Strip */}
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-neutral-200 z-10">
                        <span className="bg-black/80 px-2 py-0.5 border border-white/15 backdrop-blur-sm flex items-center gap-1">
                          <Video className="w-3 h-3 text-amber-400" />
                          {mod.lessons.length} Video Pelajaran
                        </span>
                        <span className="bg-black/80 px-2 py-0.5 border border-white/15 backdrop-blur-sm flex items-center gap-1">
                          <Clock className="w-3 h-3 text-neutral-400" />
                          {totalDuration} Minit
                        </span>
                      </div>
                    </div>

                    {/* Module Content */}
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2.5">
                        <h3 className="font-['Oswald'] text-xl sm:text-2xl font-bold text-white group-hover:text-amber-300 transition-colors uppercase leading-snug">
                          {mod.title}
                        </h3>

                        <p className="text-xs text-neutral-300 leading-relaxed font-sans line-clamp-2">
                          {mod.description}
                        </p>

                        {/* Lesson Breakdown */}
                        <div className="pt-2 border-t border-white/10 space-y-1.5">
                          <div className="text-[10px] uppercase font-mono text-neutral-400 font-bold tracking-wider">
                            Kandungan Video Pelajaran:
                          </div>
                          {mod.lessons.map((lesson, lIdx) => (
                            <div
                              key={lesson.id}
                              className="flex items-center justify-between text-xs text-neutral-300 py-1 px-2 bg-black/60 border border-white/5"
                            >
                              <span className="truncate text-[11px]">
                                {lIdx + 1}. {lesson.title}
                              </span>
                              <span className="text-[10px] text-neutral-400 font-mono shrink-0 ml-2">
                                {lesson.duration}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-3">
                        <span className="text-[11px] font-mono text-neutral-400">
                          Akses Penuh Portal
                        </span>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => onOpenAuth('login')}
                          className="px-4 py-2 bg-neutral-900 hover:bg-amber-400 hover:text-black border border-white/20 text-neutral-200 text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer shadow"
                        >
                          <Lock className="w-3 h-3" />
                          <span>Buka Modul Ini</span>
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
              {filteredModules.length === 0 && (
                <div className="col-span-full py-12 text-center bg-[#0d0d0d] border border-white/10 p-8 space-y-3">
                  <Filter className="w-8 h-8 text-amber-400 mx-auto opacity-70" />
                  <h4 className="font-['Oswald'] text-lg font-bold uppercase text-white">
                    {isEn ? 'No modules found in this category' : 'Tiada modul dalam kategori ini'}
                  </h4>
                  <p className="text-xs text-neutral-400 max-w-md mx-auto">
                    {isEn
                      ? 'Try selecting "All Categories" to view the full training curriculum.'
                      : 'Cuba pilih "Semua Kategori" untuk menerokai keseluruhan silibus portal.'}
                  </p>
                  <button
                    onClick={() => setSelectedCategoryFilter('all')}
                    className="px-4 py-2 bg-amber-400 text-black font-bold text-xs uppercase font-mono tracking-wider hover:bg-amber-300 transition-colors cursor-pointer"
                  >
                    {isEn ? 'View All Categories' : 'Lihat Semua Kategori'}
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* 4. Three Level Learning Path Strip with Motion in View & Hover */}
      <section className="border-t border-white/10 bg-[#070707] py-20 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto space-y-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto space-y-2"
          >
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
              Silibus Berperingkat
            </span>
            <h2 className="font-['Oswald'] text-3xl sm:text-5xl font-black uppercase text-white tracking-wide">
              3 TAHAP LATIHAN AI KOMPREHENSIF
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              Bina asas daripada peringkat pengenalan sehingga menguasai fine-tuning model dan ejen pintar bertaraf industri.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* TAHAP 1 */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.22, ease: 'easeOut' } }}
              className="bg-[#0e0e0e] border border-white/15 hover:border-amber-400/70 transition-colors duration-300 flex flex-col justify-between group shadow-xl hover:shadow-[0_20px_40px_rgba(0,0,0,0.85)] overflow-hidden relative"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-black border-b border-white/10">
                <img
                  src={LEVELS_CONFIG.level_1.coverImage}
                  alt={LEVELS_CONFIG.level_1.title}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 bg-amber-400 text-black font-mono font-black text-xs uppercase tracking-wider shadow">
                    TAHAP 01 · PEMULA
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-neutral-200">
                  <span className="bg-black/80 px-2 py-0.5 border border-white/15">
                    {LEVELS_CONFIG.level_1.totalModules} Modul · {LEVELS_CONFIG.level_1.totalLessons} Pelajaran
                  </span>
                  <span className="bg-black/80 px-2 py-0.5 border border-white/15">
                    {LEVELS_CONFIG.level_1.estimatedHours}
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="font-['Oswald'] text-2xl font-bold uppercase text-white group-hover:text-amber-300 transition-colors">
                    {LEVELS_CONFIG.level_1.title}
                  </h3>
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    {LEVELS_CONFIG.level_1.description}
                  </p>
                  <ul className="pt-2 space-y-1 text-xs text-neutral-400">
                    {LEVELS_CONFIG.level_1.learningOutcomes.slice(0, 3).map((item, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => onOpenAuth('login')}
                    className="w-full py-2.5 bg-neutral-900 hover:bg-amber-400 hover:text-black border border-white/20 text-neutral-200 text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow"
                  >
                    <Lock className="w-3 h-3" />
                    <span>Masuk Tahap 1</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* TAHAP 2 */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ y: -8, transition: { duration: 0.22, ease: 'easeOut' } }}
              className="bg-[#0e0e0e] border border-white/15 hover:border-emerald-400/70 transition-colors duration-300 flex flex-col justify-between group shadow-xl hover:shadow-[0_20px_40px_rgba(0,0,0,0.85)] overflow-hidden relative"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-black border-b border-white/10">
                <img
                  src={LEVELS_CONFIG.level_2.coverImage}
                  alt={LEVELS_CONFIG.level_2.title}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 bg-emerald-400 text-black font-mono font-black text-xs uppercase tracking-wider shadow">
                    TAHAP 02 · PENGAMAL
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-neutral-200">
                  <span className="bg-black/80 px-2 py-0.5 border border-white/15">
                    {LEVELS_CONFIG.level_2.totalModules} Modul · {LEVELS_CONFIG.level_2.totalLessons} Pelajaran
                  </span>
                  <span className="bg-black/80 px-2 py-0.5 border border-white/15">
                    {LEVELS_CONFIG.level_2.estimatedHours}
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="font-['Oswald'] text-2xl font-bold uppercase text-white group-hover:text-emerald-300 transition-colors">
                    {LEVELS_CONFIG.level_2.title}
                  </h3>
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    {LEVELS_CONFIG.level_2.description}
                  </p>
                  <ul className="pt-2 space-y-1 text-xs text-neutral-400">
                    {LEVELS_CONFIG.level_2.learningOutcomes.slice(0, 3).map((item, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => onOpenAuth('login')}
                    className="w-full py-2.5 bg-neutral-900 hover:bg-emerald-400 hover:text-black border border-white/20 text-neutral-200 text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow"
                  >
                    <Lock className="w-3 h-3" />
                    <span>Masuk Tahap 2</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* TAHAP 3 */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ y: -8, transition: { duration: 0.22, ease: 'easeOut' } }}
              className="bg-[#0e0e0e] border border-white/15 hover:border-purple-400/70 transition-colors duration-300 flex flex-col justify-between group shadow-xl hover:shadow-[0_20px_40px_rgba(0,0,0,0.85)] overflow-hidden relative"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-black border-b border-white/10">
                <img
                  src={LEVELS_CONFIG.level_3.coverImage}
                  alt={LEVELS_CONFIG.level_3.title}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 bg-purple-400 text-black font-mono font-black text-xs uppercase tracking-wider shadow">
                    TAHAP 03 · MAHIR
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-neutral-200">
                  <span className="bg-black/80 px-2 py-0.5 border border-white/15">
                    {LEVELS_CONFIG.level_3.totalModules} Modul · {LEVELS_CONFIG.level_3.totalLessons} Pelajaran
                  </span>
                  <span className="bg-black/80 px-2 py-0.5 border border-white/15">
                    {LEVELS_CONFIG.level_3.estimatedHours}
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="font-['Oswald'] text-2xl font-bold uppercase text-white group-hover:text-purple-300 transition-colors">
                    {LEVELS_CONFIG.level_3.title}
                  </h3>
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    {LEVELS_CONFIG.level_3.description}
                  </p>
                  <ul className="pt-2 space-y-1 text-xs text-neutral-400">
                    {LEVELS_CONFIG.level_3.learningOutcomes.slice(0, 3).map((item, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => onOpenAuth('login')}
                    className="w-full py-2.5 bg-neutral-900 hover:bg-purple-400 hover:text-black border border-white/20 text-neutral-200 text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow"
                  >
                    <Lock className="w-3 h-3" />
                    <span>Masuk Tahap 3</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="text-center pt-6">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => onOpenAuth('signup')}
              className="px-10 py-4 bg-white text-black font-bold uppercase text-xs sm:text-sm tracking-wider hover:bg-neutral-200 transition-colors shadow-2xl cursor-pointer"
            >
              Daftar Akaun Pelajar &amp; Masuk Portal →
            </motion.button>
          </div>
        </div>
      </section>

      {/* 5. Simple Public Footer */}
      <footer className="border-t border-white/10 bg-black py-8 px-4 sm:px-8 text-xs text-neutral-500 font-mono">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            © 2026 AKADEMI AI ONLINE. HAK CIPTA TERPELIHARA. PORTAL PEMBELAJARAN AI.
          </div>
          {onOpenAdminLogin && (
            <button
              onClick={onOpenAdminLogin}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-amber-400 border border-white/10 hover:border-amber-400/40 rounded transition-colors cursor-pointer text-xs"
              title="Akses Log Masuk Pentadbir Kursus"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Akses Pentadbir (Admin Dashboard CMS)</span>
            </button>
          )}
        </div>
      </footer>
    </div>
  );
};
