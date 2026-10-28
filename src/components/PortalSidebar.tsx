import React from 'react';
import {
  GraduationCap,
  Layers,
  Video,
  Sparkles,
  Users,
  MessageSquare,
  Award,
  ShoppingCart,
  Crown,
  LogOut,
  ChevronRight,
  BookOpen,
  CheckCircle2,
  X,
  ShieldCheck
} from 'lucide-react';
import { AppSection } from './Navbar';
import { CourseLevel } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';

interface PortalSidebarProps {
  activeTab: AppSection;
  setActiveTab: (tab: AppSection) => void;
  currentUser: { name: string; email: string };
  onLogout: () => void;
  onOpenCertificate: () => void;
  completedLessonsCount: number;
  totalLessonsCount: number;
  cartItemsCount: number;
  onOpenCart: () => void;
  isVipMember: boolean;
  isAdmin?: boolean;
  onOpenAdminManager: () => void;
  onOpenMembershipModal: () => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

export const PortalSidebar: React.FC<PortalSidebarProps> = ({
  activeTab,
  setActiveTab,
  currentUser,
  onLogout,
  onOpenCertificate,
  completedLessonsCount,
  totalLessonsCount,
  cartItemsCount,
  onOpenCart,
  isVipMember,
  isAdmin = false,
  onOpenAdminManager,
  onOpenMembershipModal,
  mobileOpen,
  onCloseMobile
}) => {
  const { t, isEn } = useLanguage();

  const handleNav = (tab: AppSection) => {
    setActiveTab(tab);
    onCloseMobile();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems = [
    {
      id: 'store' as AppSection,
      label: t('nav.all_courses', 'Semua Course'),
      desc: t('nav.all_courses_desc', 'Beli & Terokai Semua Modul'),
      icon: GraduationCap,
      badge: isEn ? 'All Courses' : 'Semua Kursus'
    },
    {
      id: 'tahap' as AppSection,
      label: t('nav.my_courses', 'My Course'),
      desc: isVipMember ? t('nav.my_courses_vip_desc', 'Akses Penuh VIP Aktif') : t('nav.my_courses_desc', 'Kursus Berdaftar Dimiliki'),
      icon: BookOpen,
      badge: isVipMember ? 'All Access' : (isEn ? 'Enrolled' : 'Dimiliki')
    },
    {
      id: 'video' as AppSection,
      label: t('nav.learning_room', 'Ruang Pembelajaran'),
      desc: t('nav.learning_room_desc', 'Pemain Video & Nota Pelajaran'),
      icon: Video,
      badge: isEn ? 'Active' : 'Aktif'
    },
    {
      id: 'faculty' as AppSection,
      label: t('nav.faculty', 'Tenaga Pengajar'),
      desc: t('nav.faculty_desc', 'Profil Pakar Industri AI'),
      icon: Users
    },
    {
      id: 'chatclub' as AppSection,
      label: t('nav.community', 'Komuniti ChatClub'),
      desc: t('nav.community_desc', 'Forum Interaksi Pelajar'),
      icon: MessageSquare
    },
    ...(isAdmin ? [{
      id: 'admin' as AppSection,
      label: isEn ? 'Admin Dashboard' : 'Pusat Kawalan Admin',
      desc: isEn ? 'KPI, Students & CMS' : 'KPI, Pelajar & Kursus',
      icon: ShieldCheck,
      badge: 'ADMIN'
    }] : [])
  ];

  const progressPercent = totalLessonsCount > 0 
    ? Math.round((completedLessonsCount / totalLessonsCount) * 100) 
    : 0;

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {mobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden cursor-pointer animate-in fade-in duration-200"
        />
      )}

      {/* Main Sidebar Component (Fixed on Left) */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 lg:w-72 bg-[#0c0c0c] border-r border-white/10 shadow-2xl flex flex-col justify-between transition-transform duration-300 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Top: Portal Branding & Close button for mobile */}
        <div>
          <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-black/60">
            <button
              onClick={() => handleNav('store')}
              className="flex items-center gap-3 text-left group focus:outline-none cursor-pointer"
            >
              <div className="w-8 h-8 rounded bg-white text-black flex items-center justify-center font-black text-xs tracking-wider transition-transform group-hover:scale-105 shrink-0">
                AI
              </div>
              <div>
                <span className="font-['Oswald'] font-bold text-lg tracking-wider text-white uppercase leading-none block">
                  {t('brand.name', 'AKADEMI AI')}
                </span>
                <span className="text-[10px] uppercase font-mono tracking-widest text-amber-400 block mt-0.5">
                  {isEn ? 'LEARNING PORTAL' : 'PORTAL PEMBELAJARAN'}
                </span>
              </div>
            </button>

            {/* Mobile close button */}
            <button
              onClick={onCloseMobile}
              className="p-1.5 text-neutral-400 hover:text-white lg:hidden rounded hover:bg-white/10"
              aria-label="Tutup Menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Student Profile Card (Inside Left Sidebar) */}
          <div className="p-4 border-b border-white/10 bg-[#121212]/80 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 text-black font-black text-sm flex items-center justify-center border border-amber-400/40 shrink-0 shadow-md">
                {currentUser.name.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xs font-bold text-white truncate" title={currentUser.name}>
                  {currentUser.name}
                </div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  {isVipMember ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded border border-amber-400/30">
                      <Crown className="w-3 h-3 fill-amber-400" />
                      {t('nav.vip_member', 'AHLI VIP')}
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono text-neutral-400">
                      {t('nav.active_student', 'Pelajar Aktif')}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Progress Bar in Profile */}
            <div className="space-y-1 pt-1">
              <div className="flex items-center justify-between text-[10px] font-mono">
                <span className="text-neutral-400">{t('nav.learning_progress', 'Kemajuan Pembelajaran')}</span>
                <span className="text-amber-400 font-bold">{completedLessonsCount}/{totalLessonsCount} ({progressPercent}%)</span>
              </div>
              <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-amber-300 transition-all duration-500"
                  style={{ width: `${Math.min(100, Math.max(5, progressPercent))}%` }}
                />
              </div>
            </div>
          </div>

          {/* Main Navigation Items */}
          <div className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-420px)]">
            <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-500 px-3 py-1">
              {t('nav.menu_title', 'Menu Utama')}
            </div>

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`w-full text-left p-2.5 rounded flex items-center justify-between group transition-all cursor-pointer ${
                    isActive
                      ? 'bg-amber-400 text-black font-bold shadow-md'
                      : 'text-neutral-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-black' : 'text-amber-400 group-hover:scale-110 transition-transform'}`} />
                    <div className="min-w-0">
                      <div className="text-xs tracking-wide truncate">
                        {item.label}
                      </div>
                      <div className={`text-[10px] truncate ${isActive ? 'text-black/80 font-normal' : 'text-neutral-400'}`}>
                        {item.desc}
                      </div>
                    </div>
                  </div>

                  {item.badge && !isActive && (
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-neutral-400 shrink-0">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}

            {/* Certificate Menu Item */}
            <button
              onClick={() => {
                onOpenCertificate();
                onCloseMobile();
              }}
              className="w-full text-left p-2.5 rounded flex items-center justify-between group transition-all text-neutral-300 hover:text-white hover:bg-white/5 cursor-pointer"
            >
              <div className="flex items-center gap-3 min-w-0">
                <Award className="w-4 h-4 text-amber-400 shrink-0 group-hover:scale-110 transition-transform" />
                <div className="min-w-0">
                  <div className="text-xs tracking-wide">
                    {t('nav.certificate', 'Pensijilan Rasmi')}
                  </div>
                  <div className="text-[10px] text-neutral-400 truncate">
                    {t('nav.certificate_desc', 'Semak Kelayakan & Sijil Digital')}
                  </div>
                </div>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-white" />
            </button>
          </div>
        </div>

        {/* Bottom Actions: Language Switcher, VIP, Cart & Logout */}
        <div className="p-3 border-t border-white/10 bg-[#080808] space-y-2">
          {/* Dedicated Full Language Switcher */}
          <LanguageSwitcher variant="full" />

          {/* Quick VIP Membership Trigger */}
          <button
            onClick={() => {
              onOpenMembershipModal();
              onCloseMobile();
            }}
            className={`w-full p-2.5 rounded border text-left flex items-center justify-between transition-all cursor-pointer ${
              isVipMember
                ? 'bg-amber-400/10 border-amber-400/40 text-amber-300 font-bold'
                : 'bg-gradient-to-r from-[#171305] to-[#0e0c03] border-amber-400/30 hover:border-amber-400 text-amber-400'
            }`}
          >
            <div className="flex items-center gap-2">
              <Crown className="w-4 h-4 fill-amber-400 text-amber-400 shrink-0" />
              <div className="text-xs font-bold font-mono uppercase">
                {isVipMember ? (isEn ? 'Active VIP Membership' : 'Keahlian VIP Aktif') : (isEn ? 'Subscribe VIP RM98' : 'Langgan VIP RM98')}
              </div>
            </div>
            <span className="text-[10px] font-mono px-1.5 py-0.5 bg-amber-400 text-black font-black">
              {isVipMember ? 'ALL-ACCESS' : (isEn ? 'SELECT' : 'PILIH')}
            </span>
          </button>

          {/* Quick Cart Button */}
          <button
            onClick={() => {
              onOpenCart();
              onCloseMobile();
            }}
            className="w-full p-2.5 rounded bg-neutral-900 hover:bg-neutral-800 border border-white/10 text-neutral-200 hover:text-white flex items-center justify-between transition-colors text-xs font-mono cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-4 h-4 text-amber-400" />
              <span>{t('nav.cart', 'Bakul Pembelian')}</span>
            </div>
            <span className="px-2 py-0.5 bg-amber-400 text-black font-bold text-[10px] rounded-full">
              {cartItemsCount}
            </span>
          </button>

          {/* Admin Management Button (ONLY VISIBLE FOR LOGGED IN ADMIN) */}
          {isAdmin && (
            <button
              onClick={() => {
                handleNav('admin');
              }}
              className={`w-full p-2.5 rounded border flex items-center justify-between text-xs font-mono transition-all cursor-pointer ${
                activeTab === 'admin'
                  ? 'bg-amber-400 text-black border-amber-400 font-bold shadow-md'
                  : 'bg-amber-400/20 border-amber-400/50 text-amber-300 font-bold hover:bg-amber-400/30'
              }`}
              title={isEn ? 'Course Management & Monitoring (Admin Dashboard)' : 'Sistem Pengurusan & Pemantauan (Dashboard Admin)'}
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className={`w-4 h-4 ${activeTab === 'admin' ? 'text-black' : 'text-amber-400'}`} />
                <span>{isEn ? 'Admin Dashboard' : 'Dashboard Admin'}</span>
              </div>
              <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${
                activeTab === 'admin' ? 'bg-black text-amber-400 font-black' : 'bg-amber-400 text-black font-black'
              }`}>
                {activeTab === 'admin' ? (isEn ? 'ACTIVE' : 'AKTIF') : 'CMS'}
              </span>
            </button>
          )}

          {/* Logout Button */}
          <button
            onClick={onLogout}
            className="w-full p-2 rounded text-neutral-400 hover:text-red-400 hover:bg-red-500/10 flex items-center justify-center gap-2 text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>{t('nav.logout', 'Log Keluar Dari Portal')}</span>
          </button>
        </div>
      </aside>
    </>
  );
};
