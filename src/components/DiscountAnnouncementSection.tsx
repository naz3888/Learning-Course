import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Ticket, 
  Copy, 
  Check, 
  ShoppingBag, 
  Clock, 
  Zap, 
  ShieldCheck, 
  ArrowRight, 
  Gift, 
  CheckCircle2, 
  Flame, 
  BadgePercent,
  Tag,
  X,
  CheckCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface DiscountAnnouncementSectionProps {
  onClaimFirstUserDiscount: (code: string) => void;
  onOpenCart: () => void;
  onExploreStore: () => void;
  isUsed?: boolean;
  onMarkAsUsed?: () => void;
}

const FIRST_USER_CODE = 'FIRSTUSER50';
const STORAGE_CLAIM_KEY = 'akademi_ai_first_user_voucher_claimed_v1';
const STORAGE_USED_KEY = 'akademi_ai_voucher_used_v1';

export const DiscountAnnouncementSection: React.FC<DiscountAnnouncementSectionProps> = ({
  onClaimFirstUserDiscount,
  onOpenCart,
  onExploreStore,
  isUsed = false,
  onMarkAsUsed
}) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [isDismissedOrUsed, setIsDismissedOrUsed] = useState<boolean>(() => {
    try {
      return isUsed || localStorage.getItem(STORAGE_USED_KEY) === 'true';
    } catch {
      return isUsed;
    }
  });
  const [isClaimed, setIsClaimed] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_CLAIM_KEY) === 'true';
    } catch {
      return false;
    }
  });

  // Countdown timer calculation (ending today midnight / 6 hours loop)
  const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number; seconds: number }>({
    hours: 5,
    minutes: 38,
    seconds: 42
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 6, minutes: 0, seconds: 0 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const handleClaim = () => {
    setIsClaimed(true);
    try {
      localStorage.setItem(STORAGE_CLAIM_KEY, 'true');
    } catch {}

    onClaimFirstUserDiscount(FIRST_USER_CODE);

    // Fire celebration confetti
    try {
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.7 }
      });
    } catch {}
  };

  const handleDismissOrMarkUsed = () => {
    setIsDismissedOrUsed(true);
    try {
      localStorage.setItem(STORAGE_USED_KEY, 'true');
    } catch {}
    if (onMarkAsUsed) onMarkAsUsed();
  };

  const padZero = (n: number) => n.toString().padStart(2, '0');

  if (isDismissedOrUsed) {
    return null;
  }

  return (
    <section 
      id="discount-announcement" 
      className="relative border-t border-white/10 bg-gradient-to-b from-[#0a0a0a] via-black to-[#050505] text-white pt-14 pb-16 overflow-hidden"
    >
      {/* Decorative Glow Overlays */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10 space-y-10">

        {/* =========================================================================
            BAHAGIAN 1: PENGUMUMAN DISKAUN (ANNOUNCEMENT STRIP & COUNTDOWN TICKER)
        ========================================================================== */}
        <div className="bg-[#111111] border border-white/15 p-5 sm:p-7 relative overflow-hidden">
          {/* Top subtle highlight line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-amber-500 via-emerald-400 to-amber-500" />

          {/* Dismiss / Mark Used Header Action */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10 mb-4">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-400/15 border border-amber-400/40 text-amber-400 text-[11px] font-mono font-bold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping inline-block" />
                Pengumuman Diskaun Khas 2026
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white/10 text-neutral-300 text-[11px] font-mono uppercase tracking-wider">
                <Flame className="w-3.5 h-3.5 text-orange-400" />
                Rebat Pendaftaran Terhad
              </span>
            </div>

            <button
              onClick={handleDismissOrMarkUsed}
              className="text-neutral-400 hover:text-white px-2.5 py-1 bg-white/5 hover:bg-white/15 border border-white/10 text-[11px] font-mono uppercase flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Tandakan kupon sudah digunakan atau tutup tawaran ini"
            >
              <CheckCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Telah Diguna / Tutup Tawaran ✕</span>
            </button>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            
            {/* Left: Announcement Title & Badges */}
            <div className="space-y-2 max-w-2xl">
              <h2 className="font-['Oswald'] text-2xl sm:text-4xl font-bold uppercase tracking-wide text-white leading-tight">
                TAWARAN DISKAUN PENDAFTARAN AKADEMI AI MALAYSIA
              </h2>

              <p className="font-sans text-xs sm:text-sm text-neutral-300 leading-relaxed">
                Tuntut kupon diskaun eksklusif anda di bawah untuk memulakan pengajian AI industri dengan penjimatan segera sehingga <strong className="text-amber-400">50% / RM50</strong> pada pesanan pertama.
              </p>
            </div>

            {/* Right: Real-time Countdown Box */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 bg-black/80 border border-white/15 p-4 shrink-0">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-neutral-400 text-[11px] font-mono uppercase tracking-wider">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Kupon Tamat Dalam:</span>
                </div>
                <div className="flex items-center gap-2 text-white font-mono font-black text-xl sm:text-2xl">
                  <div className="bg-[#1c1c1c] px-2.5 py-1.5 border border-white/10 text-center min-w-[44px]">
                    {padZero(timeLeft.hours)}
                    <span className="block text-[9px] font-normal text-neutral-400 font-sans tracking-normal">JAM</span>
                  </div>
                  <span className="text-amber-400">:</span>
                  <div className="bg-[#1c1c1c] px-2.5 py-1.5 border border-white/10 text-center min-w-[44px]">
                    {padZero(timeLeft.minutes)}
                    <span className="block text-[9px] font-normal text-neutral-400 font-sans tracking-normal">MIN</span>
                  </div>
                  <span className="text-amber-400">:</span>
                  <div className="bg-[#1c1c1c] px-2.5 py-1.5 border border-white/10 text-center min-w-[44px] text-amber-400">
                    {padZero(timeLeft.seconds)}
                    <span className="block text-[9px] font-normal text-neutral-400 font-sans tracking-normal text-neutral-400">SAAT</span>
                  </div>
                </div>
              </div>

              <div className="hidden sm:block w-[1px] h-12 bg-white/10" />

              <div className="text-left space-y-1">
                <div className="text-[11px] text-neutral-400 font-sans">Baki Kuota Hari Ini:</div>
                <div className="text-sm font-bold font-mono text-emerald-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  14 Kupon Sahaja Tinggal
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* =========================================================================
            BAHAGIAN 2: KAD DISKAUN NAMPAK UNTUK CLAIM FIRST USER (HERO VOUCHER)
        ========================================================================== */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs uppercase font-mono tracking-widest text-amber-400 font-bold">
                Tebusan Pengguna Baru
              </span>
              <h3 className="font-['Oswald'] text-2xl sm:text-3xl font-bold uppercase tracking-wider text-white">
                KAD DISKAUN PENGGUNA PERTAMA (FIRST USER VOUCHER)
              </h3>
            </div>
            <span className="hidden md:inline-flex items-center gap-1.5 text-xs text-neutral-400 font-sans">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Verifikasi Automatik Pada Checkout
            </span>
          </div>

          {/* Standout First-User Voucher Pass Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 bg-[#0e0e0e] border-2 border-amber-400/40 relative shadow-[0_0_50px_rgba(245,158,11,0.08)]">
            
            {/* Left Portion of Voucher (Value & Visual Pass) */}
            <div className="lg:col-span-4 p-6 sm:p-8 bg-gradient-to-br from-[#1a1506] via-[#120f05] to-[#0c0c0c] border-b lg:border-b-0 lg:border-r border-amber-400/20 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />

              <div className="space-y-3 relative z-10">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-400 text-black text-xs font-mono font-black uppercase tracking-wider shadow-sm">
                  <Sparkles className="w-3.5 h-3.5 text-black" />
                  FIRST USER EXCLUSIVE
                </div>

                <div className="pt-2">
                  <div className="text-xs text-neutral-400 uppercase tracking-widest font-mono">Nilai Potongan</div>
                  <div className="font-['Bebas_Neue'] text-5xl sm:text-6xl text-amber-400 tracking-tight leading-none">
                    RM50 OFF
                  </div>
                  <div className="text-sm font-['Oswald'] text-white uppercase tracking-wider mt-1">
                    Atau Potongan 50% Modul Pertama
                  </div>
                </div>
              </div>

              {/* Bottom Voucher Badge */}
              <div className="pt-6 border-t border-white/10 mt-6 relative z-10 space-y-1">
                <div className="text-[11px] text-neutral-400 font-mono uppercase">Syarat Kelayakan:</div>
                <div className="text-xs text-neutral-200 font-sans flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  Sah untuk semua pendaftaran akaun pertama kali
                </div>
              </div>
            </div>

            {/* Middle & Right Portion of Voucher (Claim Details, Code & Interactive Buttons) */}
            <div className="lg:col-span-8 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h4 className="font-['Oswald'] text-xl sm:text-2xl font-bold uppercase tracking-wide text-white">
                      BAUCAR PENDAFTARAN PELAJAR BAHARU AKADEMI AI
                    </h4>
                    <p className="font-sans text-xs text-neutral-400 mt-1 max-w-xl">
                      Khas untuk warga Malaysia yang ingin menceburi kemahiran Generative AI, Prompt Engineering, dan LLM Fine-Tuning. Baucar ini memotong RM50 secara automatik pada mana-mana modul berbayar atau langganan keahlian bulanan VIP (RM98 jadi RM48).
                    </p>
                  </div>

                  {/* Claim Status Badge */}
                  <div>
                    {isClaimed ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        Sudah Dituntut
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-mono font-bold uppercase tracking-wider">
                        <Gift className="w-4 h-4 text-amber-400" />
                        Sedia Untuk Dituntut
                      </span>
                    )}
                  </div>
                </div>

                {/* Perforated Code Display Box */}
                <div className="p-4 sm:p-5 bg-black/60 border border-dashed border-white/25 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-widest block">
                      Kod Baucar Rasmi (Salin atau Tekan Tuntut):
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-2xl sm:text-3xl font-black text-amber-400 tracking-wider">
                        {FIRST_USER_CODE}
                      </span>
                      <button
                        onClick={() => handleCopy(FIRST_USER_CODE)}
                        className="px-2.5 py-1 text-xs font-sans font-medium text-neutral-300 hover:text-white bg-white/10 hover:bg-white/20 transition-colors flex items-center gap-1.5"
                        title="Salin Kod Baucar"
                      >
                        {copiedCode === FIRST_USER_CODE ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400 font-bold">Disalin!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Salin Kod</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Claim Button */}
                  <div className="shrink-0 flex items-center gap-3">
                    {!isClaimed ? (
                      <button
                        onClick={handleClaim}
                        className="w-full sm:w-auto px-6 py-3 bg-amber-400 hover:bg-amber-300 text-black font-sans font-black text-xs sm:text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:shadow-[0_0_30px_rgba(245,158,11,0.5)] active:scale-95 cursor-pointer"
                      >
                        <Sparkles className="w-4 h-4 text-black" />
                        TUNTUT DISKAUN SEKARANG
                      </button>
                    ) : (
                      <div className="flex flex-wrap items-center gap-2">
                        <button
                          onClick={onOpenCart}
                          className="px-5 py-3 bg-emerald-400 hover:bg-emerald-300 text-black font-sans font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-md cursor-pointer"
                        >
                          <ShoppingBag className="w-4 h-4 text-black" />
                          Gunakan Dalam Bakul →
                        </button>
                        <button
                          onClick={onExploreStore}
                          className="px-4 py-3 bg-white/10 hover:bg-white/20 text-white font-sans text-xs uppercase tracking-wider transition-colors border border-white/20"
                        >
                          Pilih Modul Store
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Claim Feedback Banner if Claimed */}
                {isClaimed && (
                  <div className="p-3 bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs flex items-center justify-between gap-2 font-sans animate-in fade-in duration-200">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>
                        <strong>Baucar Aktif!</strong> Kod <code>{FIRST_USER_CODE}</code> telah sedia dimasukkan. Buka bakul pembelian untuk melihat potongan harga serta-merta.
                      </span>
                    </div>
                    <button
                      onClick={onOpenCart}
                      className="underline font-bold hover:text-white shrink-0 ml-2"
                    >
                      Buka Bakul Sekarang
                    </button>
                  </div>
                )}

                {/* Feature Inclusions Included in Discount */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-[11px] text-neutral-300 font-sans">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Akses Seumur Hidup</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Sijil Digital Rasmi</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Latihan Makmal Kod</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Jaminan Wang Dikembalikan</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>

        {/* =========================================================================
            BAHAGIAN 3: PILIHAN KAD DISKAUN TAMBAHAN (KOMBO & TAJAAN PERCUMA)
        ========================================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          
          {/* Extra Card 1: Pakej Kombo Semua Tahap */}
          <div className="bg-[#0f0f0f] border border-white/15 p-6 space-y-4 hover:border-white/30 transition-all">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-purple-400 bg-purple-400/10 px-2 py-0.5 border border-purple-400/20">
                  DISKAUN BUNDEL SEMUA TAHAP
                </span>
                <h4 className="font-['Oswald'] text-xl font-bold uppercase text-white mt-1">
                  PAKEJ KOMBO SEMUA TAHAP (TAHAP 1 + 2 + 3)
                </h4>
              </div>
              <div className="font-['Bebas_Neue'] text-3xl text-purple-400 leading-none">
                RM120 OFF
              </div>
            </div>

            <p className="text-xs text-neutral-400 font-sans">
              Daftar pakej lengkap dari Pemula sehingga ke Tahap Mahir dan nikmati potongan pakej kombo terbesar.
            </p>

            <div className="pt-2 flex items-center justify-between border-t border-white/10 text-xs font-mono">
              <div className="flex items-center gap-2">
                <Tag className="w-3.5 h-3.5 text-neutral-400" />
                <span className="text-neutral-400">Kod Promo:</span>
                <span className="text-white font-bold">KOMBO120</span>
              </div>
              <button
                onClick={() => {
                  handleCopy('KOMBO120');
                  onClaimFirstUserDiscount('KOMBO120');
                }}
                className="text-xs uppercase font-sans font-bold text-neutral-300 hover:text-white underline cursor-pointer"
              >
                {copiedCode === 'KOMBO120' ? 'Disalin!' : 'Salin & Tebus'}
              </button>
            </div>
          </div>

          {/* Extra Card 2: Tajaan Penuh 100% Komuniti */}
          <div className="bg-[#0f0f0f] border border-white/15 p-6 space-y-4 hover:border-white/30 transition-all">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 bg-emerald-400/10 px-2 py-0.5 border border-emerald-400/20">
                  INISIATIF CSR KOMUNITI
                </span>
                <h4 className="font-['Oswald'] text-xl font-bold uppercase text-white mt-1">
                  TAJAAN PENUH PELAJAR IPT & GOLONGAN ASNAF
                </h4>
              </div>
              <div className="font-['Bebas_Neue'] text-3xl text-emerald-400 leading-none">
                100% FREE
              </div>
            </div>

            <p className="text-xs text-neutral-400 font-sans">
              Kami memperuntukkan kuota percuma bagi pelajar yang memerlukan agar tiada siapa yang ketinggalan dalam revolusi AI.
            </p>

            <div className="pt-2 flex items-center justify-between border-t border-white/10 text-xs font-mono">
              <div className="flex items-center gap-2">
                <Tag className="w-3.5 h-3.5 text-neutral-400" />
                <span className="text-neutral-400">Kod Tajaan:</span>
                <span className="text-white font-bold">PERCUMA100</span>
              </div>
              <button
                onClick={() => {
                  handleCopy('PERCUMA100');
                  onClaimFirstUserDiscount('PERCUMA100');
                }}
                className="text-xs uppercase font-sans font-bold text-emerald-400 hover:text-emerald-300 underline cursor-pointer"
              >
                {copiedCode === 'PERCUMA100' ? 'Disalin!' : 'Salin & Tebus'}
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
