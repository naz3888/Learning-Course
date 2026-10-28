import React, { useState } from 'react';
import { CourseLevel } from '../types';
import { Sparkles, Send, ShieldCheck, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';

interface FooterProps {
  onSelectLevel: (lvl: CourseLevel) => void;
  onOpenGlossary: () => void;
  onOpenCertificate: () => void;
  onOpenPromptLab?: () => void;
  onOpenAdminManager?: () => void;
  isAdmin?: boolean;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectLevel,
  onOpenGlossary,
  onOpenCertificate,
  onOpenPromptLab,
  onOpenAdminManager,
  isAdmin = false
}) => {
  const { t, isEn } = useLanguage();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
      setEmail('');
    }
  };

  return (
    <footer className="bg-black text-neutral-400 text-xs border-t border-white/10 mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 space-y-10">
        {/* Top Discount Announcement Strip Inside Footer */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-[#141005] via-[#0d0d0d] to-[#141005] border border-amber-400/40 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 bg-amber-400 text-black text-[11px] font-mono font-black uppercase tracking-wider shrink-0">
              {isEn ? '50% DISCOUNT' : 'DISKAUN 50%'}
            </span>
            <div className="space-y-0.5">
              <div className="font-['Oswald'] text-sm sm:text-base font-bold text-white uppercase tracking-wider">
                {isEn ? 'SPECIAL ANNOUNCEMENT: FIRST-USER REGISTRATION OPEN' : 'PENGUMUMAN KHAS: PENDAFTARAN PENGGUNA PERTAMA KINI DIBUKA'}
              </div>
              <p className="text-[11px] text-neutral-300 font-sans">
                {isEn
                  ? <>Claim coupon <strong className="text-amber-400 font-mono">FIRSTUSER50</strong> for an immediate RM50 discount on any module enrollment.</>
                  : <>Tuntut kupon <strong className="text-amber-400 font-mono">FIRSTUSER50</strong> untuk penjimatan RM50 serta-merta pada mana-mana pendaftaran modul pilihan anda.</>}
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              const el = document.getElementById('discount-announcement');
              if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="px-4 py-2 bg-amber-400 text-black font-sans font-bold uppercase text-xs tracking-wider hover:bg-amber-300 transition-colors shrink-0 shadow-md cursor-pointer whitespace-nowrap"
          >
            {isEn ? 'Claim Voucher Above ↑' : 'Tuntut Baucar Di Atas ↑'}
          </button>
        </div>

        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Col 1: Brand & Bio (4 Cols) */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-white text-black flex items-center justify-center font-black text-xs">
                AI
              </div>
              <span className="font-['Oswald'] text-xl font-bold tracking-wider text-white uppercase">
                {isEn ? 'AI ACADEMY ONLINE' : 'AKADEMI AI ONLINE'}
              </span>
            </div>
            <p className="font-sans text-xs text-neutral-400 max-w-sm leading-relaxed">
              {isEn
                ? 'Comprehensive progressive AI education initiative building practical skills, foundational theoretical depth, and accredited digital credentials for tomorrow\'s workforce.'
                : 'Inisiatif pendidikan AI komprehensif berperingkat untuk membina kemahiran praktikal, kefahaman teori dan pensijilan rasmi tenaga kerja masa hadapan.'}
            </p>
            <div className="text-[11px] text-neutral-500 font-mono">
              © 2026 {isEn ? 'AI ACADEMY ONLINE. ALL RIGHTS RESERVED.' : 'AKADEMI AI ONLINE. HAK CIPTA TERPELIHARA.'}
            </div>

            {/* Language Switcher in Footer */}
            <div className="pt-2">
              <LanguageSwitcher variant="compact" />
            </div>
          </div>

          {/* Col 2: Course Links (2 Cols) */}
          <div className="md:col-span-2 space-y-3 font-sans">
            <div className="font-bold text-white uppercase tracking-wider text-xs">
              {isEn ? 'Course Levels' : 'Tahap Modul'}
            </div>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <button onClick={() => onSelectLevel('level_1')} className="hover:text-white transition-colors cursor-pointer">
                  {isEn ? 'Level 1: Beginner' : 'Tahap 1: Pemula'}
                </button>
              </li>
              <li>
                <button onClick={() => onSelectLevel('level_2')} className="hover:text-white transition-colors cursor-pointer">
                  {isEn ? 'Level 2: Practitioner' : 'Tahap 2: Pengamal'}
                </button>
              </li>
              <li>
                <button onClick={() => onSelectLevel('level_3')} className="hover:text-white transition-colors cursor-pointer">
                  {isEn ? 'Level 3: Advanced' : 'Tahap 3: Mahir'}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Sumber & Komuniti */}
          <div className="md:col-span-2 space-y-3 font-sans">
            <div className="font-bold text-white uppercase tracking-wider text-xs">
              {isEn ? 'Resources & Community' : 'Sumber & Komuniti'}
            </div>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <button onClick={onOpenGlossary} className="hover:text-white transition-colors cursor-pointer">
                  {isEn ? 'AI Glossary' : 'Glosari Istilah AI'}
                </button>
              </li>
              <li>
                <button onClick={onOpenCertificate} className="hover:text-white transition-colors cursor-pointer">
                  {isEn ? 'Official Certification' : 'Pensijilan Rasmi (Sijil)'}
                </button>
              </li>
              {onOpenAdminManager && isAdmin && (
                <li>
                  <button
                    onClick={onOpenAdminManager}
                    className="inline-flex items-center gap-1.5 text-amber-400 hover:text-amber-300 font-medium transition-colors cursor-pointer"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                    <span>{isEn ? 'Admin Dashboard (CMS)' : 'Dashboard Admin (CMS)'}</span>
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Col 4: Newsletter Form (4 Cols) Matching Screenshot */}
          <div className="md:col-span-4 space-y-3 font-sans">
            <div className="font-bold text-white uppercase tracking-wider text-xs">
              {isEn ? 'Never miss a step.' : 'Jangan ketinggalan.'}
            </div>
            <p className="text-xs text-neutral-400">
              {isEn
                ? 'Subscribe to our newsletter for prompt tutorials, AI engineering case studies, and new video modules.'
                : 'Langgan buletin kami untuk tutorial prompt terkini, kajian kes sistem AI, dan kemas kini modul video baharu.'}
            </p>

            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={isEn ? 'Your email address...' : 'Alamat emel anda...'}
                required
                className="flex-1 px-3 py-2 bg-neutral-900 border border-white/20 text-white placeholder-neutral-500 text-xs focus:outline-none focus:border-white"
              />
              <button
                type="submit"
                className="px-5 py-2 bg-white text-black font-bold uppercase text-xs hover:bg-neutral-200 transition-colors shrink-0 cursor-pointer"
              >
                {subscribed ? (isEn ? 'Subscribed!' : 'Dilanggan!') : (isEn ? 'SUBSCRIBE' : 'LANGGAN')}
              </button>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
};
