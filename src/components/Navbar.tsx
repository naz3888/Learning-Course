import React, { useState, useEffect } from 'react';
import {
  Award,
  LogOut,
  Menu,
  X,
  ShoppingCart,
  Crown,
  BookOpen,
  Layers,
  Video,
  Sparkles,
  Users,
  MessageSquare,
  ChevronRight,
  GraduationCap
} from 'lucide-react';
import { CourseLevel } from '../types';

export type AppSection = 'store' | 'tahap' | 'video' | 'faculty' | 'chatclub' | 'visualizer' | 'admin';

interface NavbarProps {
  activeTab: AppSection;
  setActiveTab: (tab: AppSection) => void;
  selectedLevel: CourseLevel;
  currentUser: { name: string; email: string } | null;
  onOpenAuth: (mode: 'login' | 'signup') => void;
  onLogout: () => void;
  onOpenQuiz?: () => void;
  onOpenCertificate: () => void;
  onOpenGlossary?: () => void;
  completedLessonsCount: number;
  totalLessonsCount: number;
  cartItemsCount: number;
  onOpenCart: () => void;
  isVipMember?: boolean;
  onOpenMembershipModal?: () => void;
  isSidebarOpen?: boolean;
  onToggleSidebar?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  currentUser,
  onOpenAuth,
  onLogout,
  onOpenCertificate,
  completedLessonsCount,
  totalLessonsCount,
  cartItemsCount,
  onOpenCart,
  isVipMember = false,
  onOpenMembershipModal
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Close drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setDrawerOpen(false);
      }
    };
    if (drawerOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [drawerOpen]);

  const handleNavClick = (action: () => void) => {
    action();
    setDrawerOpen(false);
  };

  const goToSection = (section: AppSection) => {
    setActiveTab(section);
    setDrawerOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const menuSections = [
    {
      group: 'Kandungan Kursus',
      items: [
        {
          id: 'store' as AppSection,
          title: 'Semua Course',
          subtitle: 'Koleksi penuh modul percuma & berbayar',
          icon: GraduationCap,
          action: () => goToSection('store')
        },
        {
          id: 'tahap' as AppSection,
          title: 'My Course',
          subtitle: 'Kursus anda & akses penuh pembelajaran',
          icon: BookOpen,
          action: () => goToSection('tahap')
        },
        {
          id: 'video' as AppSection,
          title: 'Ruang Pembelajaran',
          subtitle: 'Pemain video aktif & nota pelajaran',
          icon: Video,
          action: () => goToSection('video')
        }
      ]
    },
    {
      group: 'Alatan & Pembelajaran',
      items: [
        {
          id: 'faculty' as AppSection,
          title: 'Tenaga Pengajar',
          subtitle: 'Profil pakar & tenaga pembimbing',
          icon: Users,
          action: () => goToSection('faculty')
        },
        {
          id: 'chatclub' as AppSection,
          title: 'Komuniti ChatClub',
          subtitle: 'Ruang interaksi & perbincangan',
          icon: MessageSquare,
          action: () => goToSection('chatclub')
        },
        {
          id: 'certificate' as const,
          title: 'Pensijilan Rasmi',
          subtitle: 'Semak kemajuan & sijil digital tamat kursus',
          icon: Award,
          action: () => handleNavClick(onOpenCertificate)
        }
      ]
    }
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#000000]/95 backdrop-blur-md border-b border-white/10 transition-colors">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-6 px-4 sm:px-8 h-16">
          {/* Left: Brand Identity (Minimalist) */}
          <button
            onClick={() => goToSection('store')}
            className="flex items-center gap-3 text-left group shrink-0 focus:outline-none cursor-pointer"
          >
            <div className="w-8 h-8 rounded bg-white text-black flex items-center justify-center font-black text-xs tracking-wider transition-transform group-hover:scale-105">
              AI
            </div>
            <div className="flex flex-col">
              <span className="font-['Oswald'] font-bold text-lg sm:text-xl tracking-wider text-white uppercase leading-none">
                AKADEMI AI
              </span>
              <span className="text-[10px] uppercase tracking-widest text-neutral-400 font-sans">
                Online Professional Training
              </span>
            </div>
          </button>

          {/* Right Action Items */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* VIP Quick Badge Button */}
            {onOpenMembershipModal && (
              <button
                onClick={onOpenMembershipModal}
                className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  isVipMember
                    ? 'bg-gradient-to-r from-amber-400 to-amber-300 text-black shadow-[0_0_15px_rgba(245,158,11,0.5)] font-black'
                    : 'bg-amber-400/20 hover:bg-amber-400 text-amber-300 hover:text-black border border-amber-400/50'
                }`}
                title="Keahlian Bulanan VIP All-Access RM98"
              >
                <Crown className="w-3.5 h-3.5 fill-current text-current" />
                <span>{isVipMember ? 'VIP AKTIF' : 'VIP RM98/BLN'}</span>
              </button>
            )}

            {/* Discount Voucher Quick Link */}
            <button
              onClick={() => {
                const el = document.getElementById('discount-announcement');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-amber-400/10 border border-amber-400/30 text-amber-400 hover:bg-amber-400 hover:text-black transition-all text-[11px] font-mono font-bold uppercase tracking-wider cursor-pointer"
              title="Tuntut Baucar Diskaun Pengguna Pertama"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span>KUPON RM50</span>
            </button>

            {/* Shopping Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative p-2 text-neutral-300 hover:text-white transition-colors focus:outline-none group flex items-center gap-1.5 cursor-pointer"
              title="Bakul Pembelian / Troli Modul"
              aria-label="Bakul Pembelian Modul"
            >
              <div className="relative">
                <ShoppingCart className="w-5 h-5 text-neutral-300 group-hover:text-amber-400 transition-colors" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-amber-400 text-black font-black text-[10px] min-w-[16px] h-4 px-1 rounded-full flex items-center justify-center shadow-md animate-in zoom-in-50 duration-200">
                    {cartItemsCount}
                  </span>
                )}
              </div>
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 group-hover:text-white hidden xl:inline">
                Bakul {cartItemsCount > 0 ? `(${cartItemsCount})` : ''}
              </span>
            </button>

            {/* User Auth Buttons or Profile (Desktop) */}
            <div className="hidden sm:flex items-center gap-2 pl-1 border-l border-white/10">
              {currentUser ? (
                <div className="flex items-center gap-2">
                  <div
                    onClick={onOpenCertificate}
                    className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white cursor-pointer px-2.5 py-1 bg-white/5 border border-white/10"
                    title="Lihat Sijil & Kemajuan"
                  >
                    <Award className="w-3.5 h-3.5 text-amber-400" />
                    <span className="font-mono text-white text-[11px]">{completedLessonsCount}/{totalLessonsCount}</span>
                  </div>

                  <div className="flex items-center gap-2 pl-1">
                    <div className="w-7 h-7 rounded-full bg-white/20 text-white font-bold text-xs flex items-center justify-center border border-white/30">
                      {currentUser.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-xs font-sans text-neutral-200 font-medium max-w-[110px] truncate">
                      {currentUser.name}
                    </span>
                  </div>

                  <button
                    onClick={onLogout}
                    title="Log Keluar"
                    className="p-1.5 text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onOpenAuth('login')}
                    className="text-xs font-sans font-bold uppercase tracking-wider text-neutral-300 hover:text-white px-2.5 py-1.5 transition-colors cursor-pointer"
                  >
                    Log Masuk
                  </button>
                  <button
                    onClick={() => onOpenAuth('signup')}
                    className="px-3.5 py-1.5 bg-white text-black font-sans font-bold text-xs uppercase tracking-wider hover:bg-neutral-200 transition-all shadow-sm cursor-pointer"
                  >
                    Daftar
                  </button>
                </div>
              )}
            </div>

            {/* Standard Learning Platform Side-Drawer Menu Button */}
            <button
              onClick={() => setDrawerOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-neutral-200 hover:text-white border border-white/15 transition-all text-xs font-mono font-bold uppercase tracking-wider cursor-pointer ml-1"
              aria-label="Buka Menu Pembelajaran"
            >
              <Menu className="w-4 h-4 text-amber-400" />
              <span>Menu</span>
            </button>
          </div>
        </div>
      </header>

      {/* Sleek Standard Slide-Over Drawer & Backdrop */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop Blur Overlay */}
          <div
            onClick={() => setDrawerOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity animate-in fade-in duration-200 cursor-pointer"
          />

          {/* Drawer Container (Right-side slide in) */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-[#0e0e0e] border-l border-white/15 shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-200">
              {/* Drawer Header */}
              <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between bg-[#141414]">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded bg-amber-400 text-black flex items-center justify-center font-black text-xs font-mono">
                    AI
                  </div>
                  <div>
                    <h3 className="font-['Oswald'] text-lg font-bold uppercase tracking-wider text-white leading-none">
                      MENU PEMBELAJARAN
                    </h3>
                    <span className="text-[10px] text-neutral-400 font-sans tracking-wide">
                      Akademi AI Learning Portal
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setDrawerOpen(false)}
                  className="p-2 text-neutral-400 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
                  aria-label="Tutup Menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Navigation Content */}
              <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
                {menuSections.map((group, gIdx) => (
                  <div key={gIdx} className="space-y-2">
                    <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-500 px-3">
                      {group.group}
                    </div>

                    <div className="space-y-1">
                      {group.items.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeTab === item.id;

                        return (
                          <button
                            key={item.id}
                            onClick={item.action}
                            className={`w-full text-left p-3 flex items-center justify-between group transition-all cursor-pointer border ${
                              isActive
                                ? 'bg-amber-400/10 border-amber-400/40 text-white'
                                : 'bg-[#121212] hover:bg-white/5 border-white/5 hover:border-white/15 text-neutral-300 hover:text-white'
                            }`}
                          >
                            <div className="flex items-center gap-3.5 min-w-0">
                              <div
                                className={`w-8 h-8 rounded flex items-center justify-center shrink-0 transition-colors ${
                                  isActive
                                    ? 'bg-amber-400 text-black'
                                    : 'bg-white/5 text-neutral-400 group-hover:text-amber-400 group-hover:bg-white/10'
                                }`}
                              >
                                <Icon className="w-4 h-4" />
                              </div>
                              <div className="min-w-0">
                                <div
                                  className={`text-xs sm:text-sm font-bold tracking-wide transition-colors ${
                                    isActive ? 'text-amber-400' : 'text-white'
                                  }`}
                                >
                                  {item.title}
                                </div>
                                <div className="text-[11px] text-neutral-400 truncate">
                                  {item.subtitle}
                                </div>
                              </div>
                            </div>

                            <ChevronRight
                              className={`w-4 h-4 shrink-0 transition-transform group-hover:translate-x-0.5 ${
                                isActive ? 'text-amber-400' : 'text-neutral-500 group-hover:text-neutral-300'
                              }`}
                            />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}

                {/* VIP Membership Card Inside Drawer */}
                {onOpenMembershipModal && (
                  <div className="p-4 bg-gradient-to-br from-[#1a1505] to-[#0e0e0e] border border-amber-400/40 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-amber-400 text-xs font-bold font-mono uppercase tracking-wider">
                        <Crown className="w-4 h-4 fill-amber-400" />
                        <span>Akses Penuh VIP</span>
                      </div>
                      <span className="font-mono text-[10px] bg-amber-400 text-black font-black px-2 py-0.5">
                        {isVipMember ? 'AKTIF' : 'RM98/BLN'}
                      </span>
                    </div>
                    <p className="text-[11px] text-neutral-300 font-sans leading-relaxed">
                      {isVipMember
                        ? 'Langganan VIP anda aktif. Anda mempunyai akses tanpa had ke semua kursus & pensijilan.'
                        : 'Buka semua modul berbayar, sesi amali langsung & bimbingan peribadi tenaga pengajar.'}
                    </p>
                    {!isVipMember && (
                      <button
                        onClick={() => handleNavClick(onOpenMembershipModal)}
                        className="w-full py-2 bg-amber-400 hover:bg-amber-300 text-black text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer mt-1"
                      >
                        Sertai Keahlian VIP →
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Drawer Footer (User Info & Auth) */}
              <div className="p-5 border-t border-white/10 bg-[#141414]">
                {currentUser ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-8 h-8 rounded-full bg-white/20 text-white font-bold text-xs flex items-center justify-center border border-white/30 shrink-0">
                        {currentUser.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-white truncate">{currentUser.name}</div>
                        <div className="text-[10px] font-mono text-neutral-400">
                          {completedLessonsCount}/{totalLessonsCount} Pelajaran Selesai
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleNavClick(onLogout)}
                      className="px-3 py-1.5 text-[11px] text-neutral-400 hover:text-white hover:bg-white/10 font-mono uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      Log Keluar
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-2.5">
                    <button
                      onClick={() => handleNavClick(() => onOpenAuth('login'))}
                      className="py-2.5 border border-white/20 hover:border-white text-white text-xs font-bold uppercase tracking-wider text-center transition-colors cursor-pointer"
                    >
                      Log Masuk
                    </button>
                    <button
                      onClick={() => handleNavClick(() => onOpenAuth('signup'))}
                      className="py-2.5 bg-white hover:bg-neutral-200 text-black text-xs font-bold uppercase tracking-wider text-center transition-colors cursor-pointer shadow"
                    >
                      Daftar Percuma
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
