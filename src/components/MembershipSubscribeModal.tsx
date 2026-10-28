import React, { useState } from 'react';
import { 
  X, 
  Crown, 
  CheckCircle2, 
  CreditCard, 
  ShieldCheck, 
  Sparkles, 
  Zap, 
  Award, 
  Calendar, 
  Tag, 
  Lock,
  ArrowRight,
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { MembershipDetails } from '../types';

interface MembershipSubscribeModalProps {
  isOpen: boolean;
  onClose: () => void;
  membership?: MembershipDetails;
  onSubscribeSuccess: (membership: MembershipDetails) => void;
  onCancelMembership: () => void;
  prefilledPromoCode?: string;
  userName?: string;
}

const BASE_MONTHLY_PRICE = 98;

export const MembershipSubscribeModal: React.FC<MembershipSubscribeModalProps> = ({
  isOpen,
  onClose,
  membership,
  onSubscribeSuccess,
  onCancelMembership,
  prefilledPromoCode = '',
  userName = 'Pelajar'
}) => {
  const [promoCode, setPromoCode] = useState<string>(prefilledPromoCode);
  const [discountApplied, setDiscountApplied] = useState<number>(() => {
    const code = prefilledPromoCode.trim().toUpperCase();
    if (code === 'FIRSTUSER50' || code === 'WELCOME50' || code === 'NEWUSER50') {
      return 50;
    }
    return 0;
  });
  const [promoMessage, setPromoMessage] = useState<{ text: string; isError?: boolean } | null>(() => {
    const code = prefilledPromoCode.trim().toUpperCase();
    if (code === 'FIRSTUSER50' || code === 'WELCOME50' || code === 'NEWUSER50') {
      return { text: `Baucar Pengguna Pertama ${code} diaktifkan! RM50 ditolak untuk bulan pertama.` };
    }
    return null;
  });

  const [paymentMethod, setPaymentMethod] = useState<'fpx' | 'card' | 'tng'>('fpx');
  const [selectedBank, setSelectedBank] = useState<string>('maybank');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState<boolean>(false);

  if (!isOpen) return null;

  const isSubscribed = Boolean(membership && membership.isActive && membership.status === 'active');
  const finalPrice = Math.max(0, BASE_MONTHLY_PRICE - discountApplied);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoCode.trim().toUpperCase();
    if (code === 'FIRSTUSER50' || code === 'WELCOME50' || code === 'NEWUSER50' || code === 'BARU50') {
      setDiscountApplied(50);
      setPromoMessage({ text: `Baucar Pengguna Pertama ${code} sah! Diskaun RM50.00 ditolak untuk bulan pertama.` });
    } else if (code === 'KOMBO120' || code === 'PROMO50') {
      setDiscountApplied(50);
      setPromoMessage({ text: `Kod ${code} diterima! Diskaun RM50.00 diberikan.` });
    } else if (code === 'AI20' || code === 'PROMO20') {
      setDiscountApplied(20);
      setPromoMessage({ text: `Kod ${code} diterima! Diskaun RM20.00 diberikan.` });
    } else if (code === 'PERCUMA100') {
      setDiscountApplied(BASE_MONTHLY_PRICE);
      setPromoMessage({ text: `Kod Tajaan ${code} berjaya! Bulan pertama PERCUMA 100%.` });
    } else {
      setPromoMessage({ text: 'Kod promo tidak sah atau telah luput.', isError: true });
    }
  };

  const handleSubscribe = () => {
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setIsCompleted(true);

      const today = new Date();
      const nextMonth = new Date(today);
      nextMonth.setDate(today.getDate() + 30);

      const newMembership: MembershipDetails = {
        isActive: true,
        planName: 'VIP All-Access Pass (Bulanan)',
        monthlyPrice: BASE_MONTHLY_PRICE,
        startDate: today.toLocaleDateString('ms-MY', { day: 'numeric', month: 'short', year: 'numeric' }),
        nextBillingDate: nextMonth.toLocaleDateString('ms-MY', { day: 'numeric', month: 'short', year: 'numeric' }),
        autoRenew: true,
        status: 'active'
      };

      onSubscribeSuccess(newMembership);

      try {
        confetti({
          particleCount: 130,
          spread: 90,
          origin: { y: 0.6 }
        });
      } catch {}
    }, 1200);
  };

  const handleCancelClick = () => {
    onCancelMembership();
    setShowCancelConfirm(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#101010] border-2 border-amber-400/50 w-full max-w-2xl text-white shadow-[0_0_60px_rgba(245,158,11,0.15)] relative max-h-[92vh] overflow-y-auto">
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between p-5 border-b border-white/10 bg-gradient-to-r from-[#181305] via-[#101010] to-[#181305]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded bg-amber-400 text-black flex items-center justify-center font-black">
              <Crown className="w-4 h-4 fill-black text-black" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-['Oswald'] text-lg sm:text-xl uppercase tracking-wider text-white">
                  Keahlian Bulanan VIP All-Access
                </span>
                <span className="px-2 py-0.5 bg-amber-400 text-black text-[10px] font-mono font-black uppercase tracking-wider">
                  RM98 / BULAN
                </span>
              </div>
              <p className="text-[11px] text-neutral-400 font-sans">
                Akses tanpa had ke semua modul video, makmal AI, dan pensijilan rasmi
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Tutup Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">

          {/* STATE 1: ALREADY SUBSCRIBED ACTIVE VIP */}
          {isSubscribed && !isCompleted ? (
            <div className="space-y-6">
              <div className="p-5 bg-gradient-to-r from-amber-950/40 via-[#161309] to-amber-950/40 border border-amber-400/50 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-full bg-amber-400 text-black flex items-center justify-center shrink-0 shadow-lg">
                    <Crown className="w-6 h-6 fill-black" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-['Oswald'] text-xl font-bold text-white uppercase tracking-wider">
                        STATUS: VIP MEMBER AKTIF
                      </span>
                      <span className="px-2 py-0.5 bg-emerald-500 text-black text-[10px] font-bold uppercase tracking-wider">
                        AKTIF
                      </span>
                    </div>
                    <p className="text-xs text-neutral-300 font-sans mt-0.5">
                      Tahniah {userName}! Anda kini mempunyai akses tanpa sekatan ke semua modul berbayar dan makmal.
                    </p>
                  </div>
                </div>
              </div>

              {/* Membership Details Card */}
              <div className="p-4 bg-black border border-white/10 space-y-2.5 text-xs font-mono">
                <div className="flex justify-between pb-2 border-b border-white/10">
                  <span className="text-neutral-400">Pakej Langganan:</span>
                  <span className="text-white font-bold">{membership?.planName}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-white/10">
                  <span className="text-neutral-400">Yuran Langganan:</span>
                  <span className="text-amber-400 font-bold">RM {membership?.monthlyPrice}.00 / bulan</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-white/10">
                  <span className="text-neutral-400">Tarikh Mula:</span>
                  <span className="text-white">{membership?.startDate}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-white/10">
                  <span className="text-neutral-400">Pembaharuan Seterusnya:</span>
                  <span className="text-emerald-400 font-bold">{membership?.nextBillingDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Status Pembaharuan:</span>
                  <span className="text-white flex items-center gap-1">
                    <RefreshCw className="w-3 h-3 text-neutral-400" /> Auto-Renew (Boleh Dibatalkan Bila-bila Masa)
                  </span>
                </div>
              </div>

              {/* VIP Inclusions Checklist */}
              <div className="space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                  Faedah Aktif Akaun Anda:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-300">
                  <div className="flex items-center gap-2 p-2 bg-neutral-900 border border-white/5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Semua Modul Berbayar Terbuka</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-neutral-900 border border-white/5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Makmal Prompt Tanpa Had</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-neutral-900 border border-white/5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Pensijilan Digital Automatik</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-neutral-900 border border-white/5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Sesi Mentorship Bulanan</span>
                  </div>
                </div>
              </div>

              {/* Actions & Cancel Option */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/10">
                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 py-2.5 bg-white text-black font-sans font-bold text-xs uppercase tracking-wider hover:bg-neutral-200 transition-colors cursor-pointer"
                >
                  Teruskan Belajar
                </button>

                {!showCancelConfirm ? (
                  <button
                    onClick={() => setShowCancelConfirm(true)}
                    className="text-xs text-neutral-500 hover:text-red-400 transition-colors uppercase font-mono"
                  >
                    Urus / Batal Langganan
                  </button>
                ) : (
                  <div className="flex items-center gap-2 p-2 bg-red-950/40 border border-red-500/40">
                    <span className="text-[11px] text-red-300">Pasti ingin batalkan langganan?</span>
                    <button
                      onClick={handleCancelClick}
                      className="px-2.5 py-1 bg-red-600 hover:bg-red-500 text-white text-[11px] font-bold uppercase cursor-pointer"
                    >
                      Ya, Batalkan
                    </button>
                    <button
                      onClick={() => setShowCancelConfirm(false)}
                      className="px-2 py-1 text-neutral-400 hover:text-white text-[11px]"
                    >
                      Batal
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : isCompleted ? (
            /* STATE 2: RECENTLY COMPLETED SUCCESS SCREEN */
            <div className="py-6 text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-amber-400/20 text-amber-400 border border-amber-400/40 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(245,158,11,0.3)]">
                <Crown className="w-8 h-8 fill-amber-400 text-amber-400" />
              </div>

              <div className="space-y-2">
                <h3 className="font-['Oswald'] text-2xl sm:text-3xl font-bold uppercase text-white tracking-wide">
                  LANGGANAN VIP BULANAN BERJAYA!
                </h3>
                <p className="text-xs sm:text-sm text-neutral-300 max-w-md mx-auto font-sans leading-relaxed">
                  Selamat datang ke kelab VIP Akademi AI. Semua modul berbayar di dalam Store Modul kini dibuka sepenuhnya untuk anda tonton pada bila-bila masa.
                </p>
              </div>

              {/* Receipt Summary */}
              <div className="p-4 bg-black border border-white/10 text-left text-xs font-mono space-y-2 text-neutral-300">
                <div className="flex justify-between">
                  <span className="text-neutral-500">Pakej:</span>
                  <span className="text-white font-bold">Keahlian Bulanan VIP All-Access</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Jumlah Dibayar:</span>
                  <span className="text-amber-400 font-bold">RM {finalPrice}.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Tempoh Langganan:</span>
                  <span className="text-emerald-400">30 Hari (Diperbaharui Setiap Bulan)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Status Modul:</span>
                  <span className="text-white">Semua Modul Terbuka (Akses VIP)</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => {
                    setIsCompleted(false);
                    onClose();
                  }}
                  className="w-full py-3 bg-amber-400 hover:bg-amber-300 text-black font-sans font-black text-xs uppercase tracking-wider transition-all shadow-xl cursor-pointer"
                >
                  Terokai Semua Modul Yang Terbuka Sekarang →
                </button>
              </div>
            </div>
          ) : (
            /* STATE 3: SUBSCRIPTION ORDER FORM (RM98/MONTH) */
            <div className="space-y-6">
              
              {/* Plan Pricing Box */}
              <div className="p-5 sm:p-6 bg-gradient-to-br from-[#1c1606] via-[#120f04] to-[#0c0c0c] border border-amber-400/40 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
                  <div className="space-y-1">
                    <span className="text-[11px] font-mono uppercase tracking-widest text-amber-400 font-bold">
                      PELAN BULANAN ALL-ACCESS
                    </span>
                    <h3 className="font-['Oswald'] text-2xl sm:text-3xl font-bold uppercase text-white tracking-wide">
                      KEAHLIAN VIP AKADEMI AI
                    </h3>
                    <p className="text-xs text-neutral-300 max-w-sm font-sans">
                      Akses tanpa sekatan ke seluruh arkib modul, bengkel kod dan latihan praktikal.
                    </p>
                  </div>

                  <div className="text-left sm:text-right shrink-0">
                    <div className="font-['Bebas_Neue'] text-5xl sm:text-6xl text-amber-400 leading-none">
                      RM {finalPrice}
                    </div>
                    <div className="text-xs text-neutral-300 font-mono">
                      {discountApplied > 0 ? (
                        <>
                          <span className="line-through text-neutral-500 mr-1.5">RM 98.00</span>
                          <span className="text-emerald-400 font-bold">Bulan Pertama</span>
                        </>
                      ) : (
                        '/ bulan · Batal Bila-bila Masa'
                      )}
                    </div>
                  </div>
                </div>

                {/* Benefits Grid */}
                <div className="mt-5 pt-4 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-neutral-200 font-sans">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Akses 100% Semua Modul Berbayar (RM400+ Nilai)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Makmal Prompt CRTF Tanpa Had Token</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Sijil Digital Diiktiraf Untuk Setiap Tahap</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Sesi Mentorship & Q&A Langsung Bulanan</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Akses Forum Komuniti VIP ChatClub</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Tiada Kontrak · Boleh Batalkan Pada Bila-bila Masa</span>
                  </div>
                </div>
              </div>

              {/* Promo Code Voucher Form */}
              <div className="p-4 bg-black/60 border border-white/10 space-y-2">
                <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-widest block">
                  Ada Kod Baucar Pengguna Pertama? (cth: FIRSTUSER50)
                </span>
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Masukkan kod promo..."
                      className="w-full pl-9 pr-3 py-1.5 bg-[#161616] border border-white/20 text-white placeholder-neutral-500 text-xs uppercase font-mono focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-white/15 hover:bg-white text-white hover:text-black font-sans font-bold text-xs uppercase tracking-wider transition-colors shrink-0 cursor-pointer"
                  >
                    Tebus
                  </button>
                </form>

                {promoMessage && (
                  <p className={`text-[11px] font-sans ${promoMessage.isError ? 'text-red-400' : 'text-emerald-400'}`}>
                    {promoMessage.text}
                  </p>
                )}
              </div>

              {/* Payment Method Selection */}
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-300 block">
                  Pilih Kaedah Pembayaran:
                </label>
                <div className="grid grid-cols-3 gap-2.5 text-xs font-sans">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('fpx')}
                    className={`p-3 border text-left flex flex-col justify-between transition-all cursor-pointer ${
                      paymentMethod === 'fpx'
                        ? 'border-amber-400 bg-amber-400/10 text-white font-bold'
                        : 'border-white/10 bg-neutral-900 text-neutral-400 hover:text-white'
                    }`}
                  >
                    <span className="font-mono text-sm">FPX</span>
                    <span className="text-[10px] mt-1 text-neutral-400">Online Banking</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 border text-left flex flex-col justify-between transition-all cursor-pointer ${
                      paymentMethod === 'card'
                        ? 'border-amber-400 bg-amber-400/10 text-white font-bold'
                        : 'border-white/10 bg-neutral-900 text-neutral-400 hover:text-white'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 text-amber-400" />
                    <span className="text-[10px] mt-1 text-neutral-400">Kad Debit / Kredit</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('tng')}
                    className={`p-3 border text-left flex flex-col justify-between transition-all cursor-pointer ${
                      paymentMethod === 'tng'
                        ? 'border-amber-400 bg-amber-400/10 text-white font-bold'
                        : 'border-white/10 bg-neutral-900 text-neutral-400 hover:text-white'
                    }`}
                  >
                    <span className="font-mono text-xs text-blue-400 font-bold">TnG eWallet</span>
                    <span className="text-[10px] mt-1 text-neutral-400">Touch 'n Go / Grab</span>
                  </button>
                </div>

                {paymentMethod === 'fpx' && (
                  <div className="pt-1">
                    <select
                      value={selectedBank}
                      onChange={(e) => setSelectedBank(e.target.value)}
                      className="w-full px-3 py-2 bg-neutral-900 border border-white/20 text-white text-xs font-sans focus:outline-none focus:border-amber-400"
                    >
                      <option value="maybank">Maybank2u</option>
                      <option value="cimb">CIMB Clicks</option>
                      <option value="bankislam">Bank Islam</option>
                      <option value="publicbank">Public Bank</option>
                      <option value="rhb">RHB Now</option>
                      <option value="hongleong">Hong Leong Connect</option>
                    </select>
                  </div>
                )}
              </div>

              {/* Order Summary & Submit Button */}
              <div className="pt-4 border-t border-white/10 space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-neutral-400">Yuran Langganan Bulanan:</span>
                  <span className="text-white font-mono">RM {BASE_MONTHLY_PRICE}.00</span>
                </div>
                {discountApplied > 0 && (
                  <div className="flex items-center justify-between text-xs text-emerald-400">
                    <span>Potongan Baucar:</span>
                    <span className="font-mono">- RM {discountApplied}.00</span>
                  </div>
                )}
                <div className="flex items-baseline justify-between text-base sm:text-lg border-t border-white/10 pt-2">
                  <span className="font-bold text-white uppercase font-['Oswald']">Jumlah Bayaran Hari Ini:</span>
                  <span className="font-mono font-bold text-amber-400 text-xl">
                    RM {finalPrice}.00
                  </span>
                </div>

                <button
                  onClick={handleSubscribe}
                  disabled={isProcessing}
                  className="w-full py-3.5 bg-amber-400 hover:bg-amber-300 text-black font-sans font-black text-xs sm:text-sm uppercase tracking-wider transition-all shadow-[0_0_25px_rgba(245,158,11,0.3)] hover:shadow-[0_0_35px_rgba(245,158,11,0.5)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isProcessing ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin text-black" />
                      <span>Memproses Pembayaran Langganan...</span>
                    </>
                  ) : (
                    <>
                      <Crown className="w-4 h-4 fill-black text-black" />
                      <span>SAHKAN LANGGANAN VIP · RM {finalPrice} / BULAN</span>
                    </>
                  )}
                </button>

                {/* Trust and Safety Notice */}
                <div className="flex items-center justify-center gap-4 text-[10px] text-neutral-400 font-mono pt-1">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    Enkripsi FPX 256-bit Selamat
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Lock className="w-3.5 h-3.5 text-neutral-500" />
                    Batal Bila-bila Masa
                  </span>
                </div>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
