import React, { useState, useEffect } from 'react';
import { Menu, ShoppingCart, Crown, ShieldCheck } from 'lucide-react';
import type { AppSection } from './components/Navbar';
import { PortalSidebar } from './components/PortalSidebar';
import { PublicLandingGateway } from './components/PublicLandingGateway';
import { CourseStoreSection } from './components/CourseStoreSection';
import { CoursePurchaseModal } from './components/CoursePurchaseModal';
import { CartDrawerModal } from './components/CartDrawerModal';
import { AuthModal } from './components/AuthModal';
import { BentoCourseGrid } from './components/BentoCourseGrid';
import { CourseCurriculum } from './components/CourseCurriculum';
import { VideoPlayerView } from './components/VideoPlayerView';
import { ChatClubForum } from './components/ChatClubForum';
import { FacultySection } from './components/FacultySection';
import { InteractiveVisualizer } from './components/InteractiveVisualizer';
import { QuizModal } from './components/QuizModal';
import { CertificateModal } from './components/CertificateModal';
import { GlossaryModal } from './components/GlossaryModal';
import { DiscountAnnouncementSection } from './components/DiscountAnnouncementSection';
import { MembershipSubscribeModal } from './components/MembershipSubscribeModal';
import { MyCoursesSection } from './components/MyCoursesSection';
import { AdminCourseManagerModal, formatEmbedVideoUrl } from './components/AdminCourseManagerModal';
import { ModuleEditorModal } from './components/ModuleEditorModal';
import { AdminDashboardSection } from './components/AdminDashboardSection';
import { Footer } from './components/Footer';
import { CourseLevel, Lesson, Module, UserProgress, StoreCourse, MembershipDetails } from './types';
import { MODULES_DATA, LEVELS_CONFIG, STORE_COURSES } from './data/coursesData';
import { useLanguage } from './context/LanguageContext';
import { LanguageSwitcher } from './components/LanguageSwitcher';

const STORAGE_KEY = 'akademi_ai_user_progress_v2';
const USER_STORAGE_KEY = 'akademi_ai_auth_user_v1';
const CART_STORAGE_KEY = 'akademi_ai_cart_items_v1';
const COURSES_STORAGE_KEY = 'akademi_ai_custom_courses_v1';
const MODULES_STORAGE_KEY = 'akademi_ai_custom_modules_v1';
const ADMIN_AUTH_KEY = 'akademi_ai_admin_logged_in_v1';

export default function App() {
  const { t, isEn } = useLanguage();
  const [progress, setProgress] = useState<UserProgress>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error reading localStorage', e);
    }
    return {
      completedLessons: ['les-1-1'],
      completedQuizzes: {},
      notes: {},
      userName: 'Ahmad Faiz bin Zulkifli',
      selectedLevel: 'level_1',
      enrolledCourses: ['course-tahap-1', 'course-prompt-crtf']
    };
  });

  const [currentUser, setCurrentUser] = useState<{ name: string; email: string } | null>(() => {
    try {
      const savedUser = localStorage.getItem(USER_STORAGE_KEY);
      if (savedUser) return JSON.parse(savedUser);
    } catch (e) {
      console.error('Error reading auth user from storage', e);
    }
    return null;
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup'>('login');

  const [selectedLevel, setSelectedLevel] = useState<CourseLevel>(progress.selectedLevel || 'level_1');
  const [activeTab, setActiveTab] = useState<AppSection>('store');
  const [selectedStoreCourse, setSelectedStoreCourse] = useState<StoreCourse | null>(null);
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState<boolean>(false);

  // Cart / Basket State with localStorage persistence
  const [cartCourseIds, setCartCourseIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error reading cart from localStorage', e);
    }
    return ['course-lora-finetuning']; // 1 item demo so users immediately see the cart in action
  });
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [activePromoCode, setActivePromoCode] = useState<string>(() => {
    try {
      const isClaimed = localStorage.getItem('akademi_ai_first_user_voucher_claimed_v1') === 'true';
      return isClaimed ? 'FIRSTUSER50' : '';
    } catch {
      return '';
    }
  });

  const [isVoucherUsed, setIsVoucherUsed] = useState<boolean>(() => {
    try {
      return localStorage.getItem('akademi_ai_voucher_used_v1') === 'true';
    } catch {
      return false;
    }
  });

  const [isMembershipModalOpen, setIsMembershipModalOpen] = useState<boolean>(false);
  const isVipMember = Boolean(progress.membership?.isActive && progress.membership.status === 'active');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState<boolean>(false);

  // Custom courses with localStorage persistence
  const [courses, setCourses] = useState<StoreCourse[]>(() => {
    try {
      const saved = localStorage.getItem(COURSES_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Error reading custom courses from localStorage', e);
    }
    return STORE_COURSES;
  });

  // Admin Authentication State with localStorage persistence - strictly tied to admin user
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    try {
      const savedUser = localStorage.getItem(USER_STORAGE_KEY);
      if (savedUser) {
        const u = JSON.parse(savedUser);
        if (u && (u.email?.toLowerCase() === 'admin@akademiai.my' || u.email?.toLowerCase().includes('admin'))) {
          return localStorage.getItem(ADMIN_AUTH_KEY) === 'true';
        }
      }
    } catch {
      return false;
    }
    return false;
  });

  // Strict Real Admin verification:
  // A user is strictly an admin ONLY if authenticated as admin@akademiai.my (or admin account) AND isAdminLoggedIn is true.
  const isRealAdmin = Boolean(
    currentUser &&
    (currentUser.email.toLowerCase() === 'admin@akademiai.my' || currentUser.email.toLowerCase().includes('admin')) &&
    isAdminLoggedIn
  );

  // Auto-clean & UI Protection:
  // If the logged in user is a regular student (e.g. Ahmad Faiz), ensure all admin flags are revoked and reset to student view
  useEffect(() => {
    if (currentUser && !currentUser.email.toLowerCase().includes('admin')) {
      if (isAdminLoggedIn) {
        setIsAdminLoggedIn(false);
        try {
          localStorage.removeItem(ADMIN_AUTH_KEY);
        } catch (e) {}
      }
      if (activeTab === 'admin') {
        setActiveTab('store');
      }
    }
  }, [currentUser, isAdminLoggedIn, activeTab]);

  const [isAdminModalOpen, setIsAdminModalOpen] = useState<boolean>(false);

  const handleAdminLogin = (email: string, pass: string): boolean => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = pass.trim();
    if (
      (cleanEmail === 'admin@akademiai.my' && cleanPass === 'admin123') ||
      (cleanEmail.includes('admin') && cleanPass === 'admin123')
    ) {
      setIsAdminLoggedIn(true);
      const adminUser = { name: 'Pentadbir Akademi AI (Admin)', email: 'admin@akademiai.my' };
      setCurrentUser(adminUser);
      try {
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(adminUser));
        localStorage.setItem(ADMIN_AUTH_KEY, 'true');
      } catch (e) {}
      setActiveTab('admin');
      return true;
    }
    return false;
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    try {
      localStorage.removeItem(ADMIN_AUTH_KEY);
    } catch (e) {}
    if (currentUser?.email.toLowerCase().includes('admin')) {
      setCurrentUser(null);
      try {
        localStorage.removeItem(USER_STORAGE_KEY);
      } catch (e) {}
    }
    setActiveTab('store');
  };

  const handleAddCourse = (newCourse: StoreCourse) => {
    setCourses(prev => {
      const updated = [newCourse, ...prev];
      try {
        localStorage.setItem(COURSES_STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const handleUpdateCourse = (updatedCourse: StoreCourse) => {
    setCourses(prev => {
      const updated = prev.map(c => c.id === updatedCourse.id ? updatedCourse : c);
      try {
        localStorage.setItem(COURSES_STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const handleDeleteCourse = (courseId: string) => {
    setCourses(prev => {
      const updated = prev.filter(c => c.id !== courseId);
      try {
        localStorage.setItem(COURSES_STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const handleResetCoursesToDefault = () => {
    setCourses(STORE_COURSES);
    try {
      localStorage.setItem(COURSES_STORAGE_KEY, JSON.stringify(STORE_COURSES));
    } catch (e) {}
  };

  const handleSubscribeSuccess = (membershipDetails: MembershipDetails) => {
    setProgress(prev => {
      const allCourseIds = courses.map(c => c.id);
      const updatedEnrolled = Array.from(new Set([...(prev.enrolledCourses || []), ...allCourseIds]));
      const updated: UserProgress = {
        ...prev,
        membership: membershipDetails,
        enrolledCourses: updatedEnrolled
      };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const handleCancelMembership = () => {
    setProgress(prev => {
      const updated: UserProgress = {
        ...prev,
        membership: prev.membership ? { ...prev.membership, isActive: false, status: 'cancelled' } : undefined
      };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  // Dynamic syllabus modules with localStorage persistence
  const [modules, setModules] = useState<Module[]>(() => {
    try {
      const saved = localStorage.getItem(MODULES_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Error reading custom modules from localStorage', e);
    }
    return MODULES_DATA;
  });

  const [isModuleEditorOpen, setIsModuleEditorOpen] = useState<boolean>(false);
  const [selectedModuleForEdit, setSelectedModuleForEdit] = useState<Module | null>(null);

  const handleSaveModule = (savedModule: Module, isNew: boolean) => {
    setModules(prev => {
      let updated: Module[];
      if (isNew) {
        updated = [...prev, savedModule];
      } else {
        updated = prev.map(m => m.id === savedModule.id ? savedModule : m);
      }
      try {
        localStorage.setItem(MODULES_STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error('Error saving modules to storage', e);
      }
      return updated;
    });

    // If the currently selected lesson was part of this module, update selectedLesson
    const updatedLesson = savedModule.lessons.find(l => l.id === selectedLesson.id);
    if (updatedLesson) {
      setSelectedLesson(updatedLesson);
    } else if (savedModule.lessons.length > 0 && selectedModuleForEdit?.id === savedModule.id) {
      setSelectedLesson(savedModule.lessons[0]);
    }
  };

  const handleDeleteModule = (moduleId: string) => {
    setModules(prev => {
      const updated = prev.filter(m => m.id !== moduleId);
      try {
        localStorage.setItem(MODULES_STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error('Error saving modules after deletion', e);
      }

      // If the currently selected lesson was inside the deleted module, fallback
      const remainingLevelLessons = updated.filter(m => m.level === selectedLevel).flatMap(m => m.lessons);
      if (remainingLevelLessons.length > 0) {
        setSelectedLesson(remainingLevelLessons[0]);
      } else {
        const anyLesson = updated.flatMap(m => m.lessons)[0];
        if (anyLesson) setSelectedLesson(anyLesson);
      }

      return updated;
    });
  };

  const handleResetModulesToDefault = () => {
    setModules(MODULES_DATA);
    try {
      localStorage.setItem(MODULES_STORAGE_KEY, JSON.stringify(MODULES_DATA));
    } catch (e) {}
  };

  const currentModules = modules.filter(m => m.level === selectedLevel);
  const allLessons = modules.flatMap(m => m.lessons);
  const currentLevelLessons = currentModules.flatMap(m => m.lessons);

  const [selectedLesson, setSelectedLesson] = useState<Lesson>(() => {
    return currentLevelLessons[0] || modules[0]?.lessons[0] || MODULES_DATA[0].lessons[0];
  });

  const [isQuizOpen, setIsQuizOpen] = useState<boolean>(false);
  const [quizLevel, setQuizLevel] = useState<CourseLevel>('level_1');
  const [isCertOpen, setIsCertOpen] = useState<boolean>(false);
  const [isGlossaryOpen, setIsGlossaryOpen] = useState<boolean>(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        ...progress,
        selectedLevel
      }));
    } catch (e) {
      console.error('Error saving progress', e);
    }
  }, [progress, selectedLevel]);

  const handleSelectLevel = (level: CourseLevel) => {
    setSelectedLevel(level);
    const newLevelModules = modules.filter(m => m.level === level);
    const newLevelLessons = newLevelModules.flatMap(m => m.lessons);
    if (newLevelLessons.length > 0) {
      setSelectedLesson(newLevelLessons[0]);
    }
  };

  const handleToggleComplete = (lessonId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setProgress(prev => {
      const exists = prev.completedLessons.includes(lessonId);
      const updated = exists
        ? prev.completedLessons.filter(id => id !== lessonId)
        : [...prev.completedLessons, lessonId];
      return { ...prev, completedLessons: updated };
    });
  };

  const handleSaveNote = (lessonId: string, noteText: string) => {
    setProgress(prev => ({
      ...prev,
      notes: { ...prev.notes, [lessonId]: noteText }
    }));
  };

  const handleSaveQuizScore = (level: CourseLevel, score: number) => {
    setProgress(prev => ({
      ...prev,
      completedQuizzes: { ...prev.completedQuizzes, [level]: score }
    }));
  };

  const handleSaveUserName = (name: string) => {
    setProgress(prev => ({
      ...prev,
      userName: name
    }));
  };

  const handleOpenQuiz = (level?: CourseLevel) => {
    setQuizLevel(level || selectedLevel);
    setIsQuizOpen(true);
  };

  const currentIndexInLevel = currentLevelLessons.findIndex(l => l.id === selectedLesson.id);
  const prevLesson = currentIndexInLevel > 0 ? currentLevelLessons[currentIndexInLevel - 1] : undefined;
  const nextLesson = currentIndexInLevel < currentLevelLessons.length - 1 ? currentLevelLessons[currentIndexInLevel + 1] : undefined;

  const handlePrevLesson = prevLesson ? () => setSelectedLesson(prevLesson) : undefined;
  const handleNextLesson = nextLesson ? () => setSelectedLesson(nextLesson) : undefined;

  const currentModule = currentModules.find(m => m.lessons.some(l => l.id === selectedLesson.id)) || currentModules[0];

  const handleOpenStorePurchaseModal = (course: StoreCourse) => {
    setSelectedStoreCourse(course);
    setIsPurchaseModalOpen(true);
  };

  const handleEnrollSuccess = (courseId: string) => {
    setProgress(prev => {
      const current = prev.enrolledCourses || ['course-tahap-1', 'course-prompt-crtf'];
      if (!current.includes(courseId)) {
        return { ...prev, enrolledCourses: [...current, courseId] };
      }
      return prev;
    });
  };

  const handleStartStoreCourse = (course: StoreCourse) => {
    handleSelectLevel(course.level);
    if (course.videoUrl) {
      const formattedUrl = formatEmbedVideoUrl(course.videoUrl);
      setSelectedLesson({
        id: `custom-lesson-${course.id}`,
        title: course.title,
        duration: course.totalHours || '45 minit',
        durationMinutes: 45,
        videoUrl: formattedUrl,
        summary: course.description || course.tagline,
        keyPoints: course.skillsLearned && course.skillsLearned.length > 0
          ? course.skillsLearned
          : ['Objektif Utama Kursus', 'Kefahaman Konsep & Demonstrasi', 'Latihan Amali Industri'],
        timestamps: [
          { time: '00:00', seconds: 0, title: 'Pengenalan & Gambaran Keseluruhan' },
          { time: '05:00', seconds: 300, title: 'Kandungan Utama & Kaedah Pelaksanaan' },
          { time: '15:00', seconds: 900, title: 'Latihan Amali & Langkah Seterusnya' }
        ],
        transcriptSnippet: course.description || course.tagline,
        practicePrompt: `Uji kemahiran yang dipelajari dalam "${course.title}". Nyatakan contoh penggunaan praktikal dalam aliran kerja harian anda.`,
        resources: [
          { title: `Dokumentasi Rasmi: ${course.title}`, url: '#' },
          { title: 'Glosari Istilah AI', url: '#glossary' }
        ]
      });
    }
    setActiveTab('video');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAuthSuccess = (user: { name: string; email: string }) => {
    const isEmailAdmin = user.email.toLowerCase() === 'admin@akademiai.my' || user.email.toLowerCase().includes('admin');
    if (isEmailAdmin) {
      setIsAdminLoggedIn(true);
      try {
        localStorage.setItem(ADMIN_AUTH_KEY, 'true');
      } catch (e) {}
      setActiveTab('admin');
    } else {
      setIsAdminLoggedIn(false);
      try {
        localStorage.removeItem(ADMIN_AUTH_KEY);
      } catch (e) {}
      if (activeTab === 'admin') {
        setActiveTab('store');
      }
    }
    setCurrentUser(user);
    setProgress(prev => ({ ...prev, userName: user.name }));
    try {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    } catch (e) {}
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsAdminLoggedIn(false);
    try {
      localStorage.removeItem(USER_STORAGE_KEY);
      localStorage.removeItem(ADMIN_AUTH_KEY);
    } catch (e) {}
    setActiveTab('store');
  };

  const handleOpenAuth = (mode: 'login' | 'signup') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const handleAddToCart = (course: StoreCourse) => {
    setCartCourseIds(prev => {
      if (prev.includes(course.id)) return prev;
      const updated = [...prev, course.id];
      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const handleRemoveFromCart = (courseId: string) => {
    setCartCourseIds(prev => {
      const updated = prev.filter(id => id !== courseId);
      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const handleClearCart = () => {
    setCartCourseIds([]);
    try {
      localStorage.removeItem(CART_STORAGE_KEY);
    } catch (e) {}
  };

  const handleCheckoutSuccess = (courseIds: string[]) => {
    setProgress(prev => {
      const current = prev.enrolledCourses || ['course-tahap-1', 'course-prompt-crtf'];
      const updated = Array.from(new Set([...current, ...courseIds]));
      return { ...prev, enrolledCourses: updated };
    });
    setIsVoucherUsed(true);
    try {
      localStorage.setItem('akademi_ai_voucher_used_v1', 'true');
    } catch (e) {}
  };

  const cartCourses = courses.filter(c => cartCourseIds.includes(c.id));

  const completedCountTotal = allLessons.filter(l => progress.completedLessons.includes(l.id)).length;
  const completedCountInLevel = currentLevelLessons.filter(l => progress.completedLessons.includes(l.id)).length;

  // UNVERIFIED / GUEST STATE: Show Public Landing Gateway
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-black text-white selection:bg-amber-400/20 selection:text-amber-300">
        <PublicLandingGateway
          onOpenAuth={handleOpenAuth}
          onOpenAdminLogin={() => setIsAdminModalOpen(true)}
          courses={courses}
        />

        {/* Auth Modal for Login & Signup */}
        <AuthModal
          isOpen={isAuthModalOpen}
          initialMode={authModalMode}
          onClose={() => setIsAuthModalOpen(false)}
          onAuthSuccess={handleAuthSuccess}
        />

        {/* Admin Course Manager Modal (Direct access in guest mode so admin can log in and manage immediately) */}
        <AdminCourseManagerModal
          isOpen={isAdminModalOpen}
          onClose={() => setIsAdminModalOpen(false)}
          courses={courses}
          isAdminLoggedIn={isAdminLoggedIn}
          onAdminLogin={handleAdminLogin}
          onAdminLogout={handleAdminLogout}
          onAddCourse={handleAddCourse}
          onUpdateCourse={handleUpdateCourse}
          onDeleteCourse={handleDeleteCourse}
          onResetCoursesToDefault={handleResetCoursesToDefault}
        />
      </div>
    );
  }

  // AUTHENTICATED STATE: Enter Full Learning Portal with Left Sidebar Dashboard
  return (
    <div className="min-h-screen flex bg-black text-white selection:bg-white/20 selection:text-white relative">
      {/* 1. Left Sidebar Dashboard (Dedicated on left, drawer on mobile) */}
      <PortalSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentUser={currentUser}
        onLogout={handleLogout}
        onOpenCertificate={() => setIsCertOpen(true)}
        completedLessonsCount={completedCountTotal}
        totalLessonsCount={allLessons.length}
        cartItemsCount={cartCourseIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        isVipMember={isVipMember}
        isAdmin={isRealAdmin}
        onOpenAdminManager={() => isRealAdmin && setIsAdminModalOpen(true)}
        onOpenMembershipModal={() => setIsMembershipModalOpen(true)}
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      {/* 2. Main Portal Content Area (Docked on right, padded for left sidebar) */}
      <div className="flex-1 flex flex-col min-h-screen lg:pl-72 w-full transition-all">
        {/* Portal Top Header Bar */}
        <header className="sticky top-0 z-30 bg-[#000000]/95 backdrop-blur-md border-b border-white/10 h-16 flex items-center justify-between px-4 sm:px-8">
          {/* Left: Mobile Sidebar Toggle & Breadcrumb */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="p-2 text-neutral-300 hover:text-white lg:hidden rounded border border-white/15 cursor-pointer hover:bg-white/5 transition-colors"
              aria-label="Buka Menu Dashboard"
              title="Buka Menu Dashboard"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono text-neutral-400 uppercase hidden sm:inline">
                {isRealAdmin ? (isEn ? 'Admin Portal' : 'Portal Pentadbir') : (isEn ? 'Student Portal' : 'Portal Pelajar')}
              </span>
              <span className="text-neutral-600 hidden sm:inline">/</span>
              <h2 className="font-['Oswald'] text-base sm:text-lg font-bold uppercase tracking-wider text-amber-400">
                {activeTab === 'store' && (isEn ? 'All AI Courses & Modules' : 'Semua Course & Modul AI')}
                {activeTab === 'tahap' && (isEn ? 'My Courses' : 'My Course (Kursus Saya)')}
                {activeTab === 'video' && (isEn ? 'Learning Room' : 'Ruang Pembelajaran')}
                {activeTab === 'faculty' && (isEn ? 'Faculty & Instructors' : 'Tenaga Pengajar')}
                {activeTab === 'chatclub' && (isEn ? 'ChatClub Community' : 'Komuniti ChatClub')}
                {activeTab === 'visualizer' && 'Interactive Visualizer'}
                {activeTab === 'admin' && isRealAdmin && (isEn ? 'Admin Monitoring & Management' : 'Pusat Kawalan & Pemantauan Pentadbir')}
              </h2>
            </div>
          </div>

          {/* Right: Quick actions inside portal */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Bilingual Switcher */}
            <LanguageSwitcher variant="compact" />

            {/* Admin CMS Access Button - STRICTLY VISIBLE ONLY WHEN LOGGED IN AS REAL ADMIN */}
            {isRealAdmin && (
              <button
                onClick={() => {
                  setActiveTab(activeTab === 'admin' ? 'store' : 'admin');
                }}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] font-mono font-bold uppercase tracking-wider transition-all cursor-pointer rounded border ${
                  activeTab === 'admin'
                    ? 'bg-amber-400 text-black border-amber-400 font-black shadow-md'
                    : 'bg-amber-400/20 text-amber-300 border-amber-400/60 hover:bg-amber-400 hover:text-black'
                }`}
                title={isEn ? 'Toggle between Admin Dashboard and Student Preview' : 'Tukar antara Dashboard Admin dan Mod Pelajar'}
              >
                <ShieldCheck className={`w-3.5 h-3.5 ${activeTab === 'admin' ? 'text-black' : 'text-amber-400'}`} />
                <span className="hidden sm:inline">
                  {activeTab === 'admin' ? (isEn ? 'STUDENT VIEW' : 'MOD PELAJAR') : (isEn ? 'ADMIN DASHBOARD' : 'DASHBOARD ADMIN')}
                </span>
                <span className="sm:hidden">{activeTab === 'admin' ? 'STUDENT' : 'ADMIN'}</span>
              </button>
            )}

            {/* VIP Quick Badge */}
            <button
              onClick={() => setIsMembershipModalOpen(true)}
              className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                isVipMember
                  ? 'bg-gradient-to-r from-amber-400 to-amber-300 text-black shadow-md font-black'
                  : 'bg-amber-400/20 hover:bg-amber-400 text-amber-300 hover:text-black border border-amber-400/50'
              }`}
              title={isEn ? 'Monthly VIP All-Access Membership RM98' : 'Keahlian Bulanan VIP All-Access RM98'}
            >
              <Crown className="w-3.5 h-3.5 fill-current text-current" />
              <span>{isVipMember ? (isEn ? 'VIP ACTIVE' : 'VIP AKTIF') : (isEn ? 'VIP RM98/MO' : 'VIP RM98/BLN')}</span>
            </button>

            {/* Discount Voucher Quick Link - only show if voucher hasn't been used */}
            {!isVoucherUsed && (
              <button
                onClick={() => {
                  const el = document.getElementById('discount-announcement');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-amber-400/10 border border-amber-400/30 text-amber-400 hover:bg-amber-400 hover:text-black transition-all text-[11px] font-mono font-bold uppercase tracking-wider cursor-pointer"
                title={isEn ? 'Claim First-Time User Discount Coupon' : 'Tuntut Baucar Diskaun Pengguna Pertama'}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                <span>{isEn ? 'RM50 COUPON' : 'KUPON RM50'}</span>
              </button>
            )}

            {/* Shopping Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-neutral-300 hover:text-white transition-colors focus:outline-none flex items-center gap-1.5 cursor-pointer"
              title={isEn ? 'Shopping Cart' : 'Bakul Pembelian'}
            >
              <ShoppingCart className="w-5 h-5 text-neutral-300 hover:text-amber-400 transition-colors" />
              {cartCourseIds.length > 0 && (
                <span className="absolute -top-1 -right-1.5 bg-amber-400 text-black font-black text-[10px] min-w-[16px] h-4 px-1 rounded-full flex items-center justify-center shadow">
                  {cartCourseIds.length}
                </span>
              )}
            </button>

            {/* Student Avatar */}
            <div className="flex items-center gap-2 pl-2 border-l border-white/10">
              <div className="w-8 h-8 rounded-full bg-amber-400/20 text-amber-300 font-bold text-xs flex items-center justify-center border border-amber-400/40">
                {currentUser.name.charAt(0).toUpperCase()}
              </div>
              <span className="text-xs font-sans text-neutral-200 font-medium max-w-[110px] truncate hidden md:inline">
                {currentUser.name}
              </span>
            </div>
          </div>
        </header>

        <main className="flex-1">
        {/* SEKSYEN 1: STORE KURSUS (SEMUA KURSUS PERCUMA & BERBAYAR DENGAN 6 KURSUS UTAMA & LIHAT LAGI) */}
        {activeTab === 'store' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-10 space-y-12">
            <CourseStoreSection
              courses={courses}
              enrolledCourseIds={progress.enrolledCourses || ['course-tahap-1', 'course-prompt-crtf']}
              cartCourseIds={cartCourseIds}
              isVipMember={isVipMember}
              isAdmin={isRealAdmin}
              onOpenAdminManager={() => isRealAdmin && setIsAdminModalOpen(true)}
              onOpenMembershipModal={() => setIsMembershipModalOpen(true)}
              onAddToCart={handleAddToCart}
              onOpenCart={() => setIsCartOpen(true)}
              onSelectStoreCourse={handleOpenStorePurchaseModal}
              onOpenPurchaseModal={handleOpenStorePurchaseModal}
              onStartCourseDirectly={handleStartStoreCourse}
            />

            {/* Quick Transition Banner to My Course */}
            <div className="p-6 bg-gradient-to-r from-[#0c0c0c] via-[#141414] to-[#0c0c0c] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs uppercase tracking-widest text-amber-400 font-mono font-bold">Portal Kursus Anda</span>
                <h3 className="font-['Oswald'] text-xl sm:text-2xl font-bold uppercase tracking-wide text-white">
                  Ingin mengakses modul & kursus berdaftar anda?
                </h3>
                <p className="text-xs text-neutral-400 max-w-xl font-sans">
                  Semak kemajuan pembelajaran, sambung tontonan video pelajaran terkini, atau tuntut pensijilan rasmi dalam My Course.
                </p>
              </div>
              <button
                onClick={() => {
                  setActiveTab('tahap');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-5 py-2.5 bg-white text-black font-sans font-bold text-xs uppercase tracking-wider hover:bg-neutral-200 transition-all shrink-0 whitespace-nowrap shadow-md cursor-pointer"
              >
                Buka My Course →
              </button>
            </div>
          </div>
        )}

        {/* SEKSYEN 2: MY COURSE (KURSUS DIMILIKI / ALL-ACCESS VIP) */}
        {activeTab === 'tahap' && (
          <MyCoursesSection
            courses={courses}
            enrolledCourseIds={progress.enrolledCourses || ['course-tahap-1', 'course-prompt-crtf']}
            isVipMember={isVipMember}
            onOpenMembershipModal={() => setIsMembershipModalOpen(true)}
            onStartCourse={handleStartStoreCourse}
            onOpenStore={() => {
              setActiveTab('store');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            completedLessons={progress.completedLessons}
            onOpenCertificate={() => setIsCertOpen(true)}
            onOpenQuiz={handleOpenQuiz}
            userName={progress.userName}
          />
        )}

        {/* SEKSYEN 3: RUANG PEMBELAJARAN (PEMBELAJARAN BERFOKUS TANPA GANGGUAN) */}
        {activeTab === 'video' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-12 space-y-8">
            {/* Active Course Stage Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 sm:p-6 bg-[#0e0e0e] border border-white/10">
              <div className="min-w-0">
                <div className="flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-widest text-amber-400">
                  <span>Sedang Dimainkan</span>
                  <span>·</span>
                  <span>{LEVELS_CONFIG[selectedLevel].badge}</span>
                  <span>·</span>
                  <span className="text-neutral-400">{completedCountInLevel}/{currentLevelLessons.length} Pelajaran Selesai</span>
                </div>
                <h2 className="font-['Oswald'] text-2xl sm:text-3xl font-bold tracking-wide text-white uppercase mt-0.5 truncate">
                  {LEVELS_CONFIG[selectedLevel].title}
                </h2>
                <p className="font-sans text-xs sm:text-sm text-neutral-400 mt-0.5 truncate">
                  {LEVELS_CONFIG[selectedLevel].subtitle} · {currentLevelLessons.length} Pelajaran Video
                </p>
              </div>

              {/* Level Quick Switcher Buttons */}
              <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto shrink-0">
                <div className="flex items-center gap-1.5 p-1 bg-black border border-white/10 text-xs font-sans uppercase tracking-wider">
                  {(['level_1', 'level_2', 'level_3'] as CourseLevel[]).map((lvl) => (
                    <button
                      key={lvl}
                      onClick={() => handleSelectLevel(lvl)}
                      className={`px-3 py-1.5 font-bold transition-all whitespace-nowrap ${
                        selectedLevel === lvl
                          ? 'bg-white text-black shadow-md'
                          : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      {LEVELS_CONFIG[lvl].badge}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => handleOpenQuiz(selectedLevel)}
                  className="px-3.5 py-2 bg-amber-400/10 border border-amber-400/30 text-amber-400 hover:bg-amber-400 hover:text-black font-sans font-bold text-xs uppercase tracking-wider transition-all"
                >
                  Kuiz Tahap
                </button>
              </div>
            </div>

            {/* Course Video Player (Left 8 cols) & Curriculum (Right 4 cols) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-8 space-y-4">
                <VideoPlayerView
                  lesson={selectedLesson}
                  levelBadge={LEVELS_CONFIG[selectedLevel].badge}
                  moduleTitle={currentModule?.title || 'Modul Pembelajaran'}
                  isCompleted={progress.completedLessons.includes(selectedLesson.id)}
                  onToggleComplete={handleToggleComplete}
                  onPrevLesson={handlePrevLesson}
                  onNextLesson={handleNextLesson}
                  savedNote={progress.notes[selectedLesson.id] || ''}
                  onSaveNote={handleSaveNote}
                />
              </div>

              <div className="lg:col-span-4 space-y-4">
                <CourseCurriculum
                  modules={currentModules}
                  selectedLessonId={selectedLesson?.id || ''}
                  onSelectLesson={(lesson) => setSelectedLesson(lesson)}
                  completedLessonIds={progress.completedLessons}
                  onToggleComplete={handleToggleComplete}
                  isAdmin={isRealAdmin}
                  onEditModule={(mod) => {
                    setSelectedModuleForEdit(mod);
                    setIsModuleEditorOpen(true);
                  }}
                  onAddModule={() => {
                    setSelectedModuleForEdit(null);
                    setIsModuleEditorOpen(true);
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* SEKSYEN 4: TENAGA PENGAJAR & PAKAR INDUSTRI */}
        {activeTab === 'faculty' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10">
            <FacultySection />
          </div>
        )}

        {/* SEKSYEN 5: CHATCLUB FORUM (RUANG KOMUNITI BERASINGAN) */}
        {activeTab === 'chatclub' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
            <ChatClubForum
              currentLessonId={selectedLesson.id}
              currentLessonTitle={selectedLesson.title}
              userName={progress.userName}
            />
          </div>
        )}

        {/* SEKSYEN 7: INTERACTIVE VISUALIZER */}
        {activeTab === 'visualizer' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
            <InteractiveVisualizer />
          </div>
        )}

        {/* SEKSYEN ADMIN: DASHBOARD PEMANTAUAN & PENGURUSAN PENTADBIR (HANYA KETIKA ADMIN BERDAFTAR) */}
        {activeTab === 'admin' && isRealAdmin && (
          <div className="w-full">
            <AdminDashboardSection
              courses={courses}
              modules={modules}
              isAdminLoggedIn={isRealAdmin}
              onAdminLogout={handleAdminLogout}
              onAddCourse={handleAddCourse}
              onUpdateCourse={handleUpdateCourse}
              onDeleteCourse={handleDeleteCourse}
              onResetCoursesToDefault={handleResetCoursesToDefault}
              onOpenEditModuleModal={(mod) => {
                setSelectedModuleForEdit(mod);
                setIsModuleEditorOpen(true);
              }}
              onOpenAddModuleModal={() => {
                setSelectedModuleForEdit(null);
                setIsModuleEditorOpen(true);
              }}
              onDeleteModule={handleDeleteModule}
              onResetModulesToDefault={handleResetModulesToDefault}
              onSwitchToStudentView={() => {
                setActiveTab('store');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              currentStudentProgress={{
                userName: progress.userName,
                completedLessons: progress.completedLessons,
                enrolledCourses: progress.enrolledCourses,
                isVip: isVipMember,
                quizScores: progress.completedQuizzes
              }}
              onOpenCourseEditor={(course) => {
                setIsAdminModalOpen(true);
              }}
            />
          </div>
        )}
      </main>

      {/* Global Modals */}
      <AuthModal
        isOpen={isAuthModalOpen}
        initialMode={authModalMode}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />

      <CoursePurchaseModal
        course={selectedStoreCourse}
        isOpen={isPurchaseModalOpen}
        onClose={() => setIsPurchaseModalOpen(false)}
        isAlreadyEnrolled={Boolean(selectedStoreCourse && (progress.enrolledCourses || ['course-tahap-1', 'course-prompt-crtf']).includes(selectedStoreCourse.id))}
        isInCart={Boolean(selectedStoreCourse && cartCourseIds.includes(selectedStoreCourse.id))}
        onAddToCart={handleAddToCart}
        onEnrollSuccess={handleEnrollSuccess}
        onStartCourse={handleStartStoreCourse}
      />

      {/* Shopping Basket / Cart Drawer Modal */}
      <CartDrawerModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartCourses={cartCourses}
        prefilledPromoCode={activePromoCode}
        onRemoveFromCart={handleRemoveFromCart}
        onClearCart={handleClearCart}
        onCheckoutSuccess={handleCheckoutSuccess}
        onStartCourse={handleStartStoreCourse}
        onExploreStore={() => {
          setIsCartOpen(false);
          setActiveTab('store');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      <QuizModal
        level={quizLevel}
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        onSaveScore={handleSaveQuizScore}
        onViewCertificate={() => setIsCertOpen(true)}
      />

      <CertificateModal
        isOpen={isCertOpen}
        onClose={() => setIsCertOpen(false)}
        userName={progress.userName}
        onSaveUserName={handleSaveUserName}
        selectedLevel={selectedLevel}
        completedQuizzes={progress.completedQuizzes}
        completedLessonsCount={completedCountTotal}
        totalLessonsCount={allLessons.length}
      />

      <GlossaryModal
        isOpen={isGlossaryOpen}
        onClose={() => setIsGlossaryOpen(false)}
      />

      {/* Monthly VIP Membership Subscription Modal (RM98/bulan) */}
      <MembershipSubscribeModal
        isOpen={isMembershipModalOpen}
        onClose={() => setIsMembershipModalOpen(false)}
        membership={progress.membership}
        onSubscribeSuccess={handleSubscribeSuccess}
        onCancelMembership={handleCancelMembership}
        prefilledPromoCode={activePromoCode}
        userName={progress.userName}
      />

      {/* Discount Announcement & First User Claim Card (Directly Above Footer) */}
      {/* TIDAK DIPAPARKAN DALAM RUANG PEMBELAJARAN ('video') ATAU DASHBOARD ADMIN ('admin') */}
      {activeTab !== 'video' && activeTab !== 'admin' && !isVoucherUsed && (
        <DiscountAnnouncementSection
          onClaimFirstUserDiscount={(code) => {
            setActivePromoCode(code);
          }}
          onOpenCart={() => setIsCartOpen(true)}
          onExploreStore={() => {
            setActiveTab('store');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          isUsed={isVoucherUsed}
          onMarkAsUsed={() => {
            setIsVoucherUsed(true);
            try {
              localStorage.setItem('akademi_ai_voucher_used_v1', 'true');
            } catch (e) {}
          }}
        />
      )}

        {/* Black Theme Footer */}
        <Footer
          onSelectLevel={(lvl) => {
            handleSelectLevel(lvl);
            setActiveTab('video');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onOpenGlossary={() => setIsGlossaryOpen(true)}
          onOpenCertificate={() => setIsCertOpen(true)}
          onOpenAdminManager={() => isRealAdmin && setIsAdminModalOpen(true)}
          isAdmin={isRealAdmin}
        />
      </div>

      {/* Admin Course Manager & CMS Modal */}
      <AdminCourseManagerModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        courses={courses}
        isAdminLoggedIn={isRealAdmin}
        onAdminLogin={handleAdminLogin}
        onAdminLogout={handleAdminLogout}
        onAddCourse={handleAddCourse}
        onUpdateCourse={handleUpdateCourse}
        onDeleteCourse={handleDeleteCourse}
        onResetCoursesToDefault={handleResetCoursesToDefault}
        modules={modules}
        onOpenEditModuleModal={(mod) => {
          setSelectedModuleForEdit(mod);
          setIsModuleEditorOpen(true);
        }}
        onOpenAddModuleModal={() => {
          setSelectedModuleForEdit(null);
          setIsModuleEditorOpen(true);
        }}
        onDeleteModule={handleDeleteModule}
        onResetModulesToDefault={handleResetModulesToDefault}
      />

      {/* Curriculum Module & Lessons Editor Modal (For Modul 01, Modul 02, etc.) */}
      <ModuleEditorModal
        isOpen={isModuleEditorOpen}
        onClose={() => {
          setIsModuleEditorOpen(false);
          setSelectedModuleForEdit(null);
        }}
        moduleToEdit={selectedModuleForEdit}
        currentLevel={selectedLevel}
        onSaveModule={handleSaveModule}
        onDeleteModule={handleDeleteModule}
      />
    </div>
  );
}
