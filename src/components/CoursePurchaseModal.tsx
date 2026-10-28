import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, Tag, Award, Play, Sparkles, CreditCard, Lock, ShoppingCart, Video } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { StoreCourse } from '../types';

interface CoursePurchaseModalProps {
  course: StoreCourse | null;
  isOpen: boolean;
  onClose: () => void;
  isAlreadyEnrolled: boolean;
  isInCart?: boolean;
  onAddToCart?: (course: StoreCourse) => void;
  onEnrollSuccess: (courseId: string) => void;
  onStartCourse: (course: StoreCourse) => void;
}

export const CoursePurchaseModal: React.FC<CoursePurchaseModalProps> = ({
  course,
  isOpen,
  onClose,
  isAlreadyEnrolled,
  isInCart = false,
  onAddToCart,
  onEnrollSuccess,
  onStartCourse
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(0);
  const [promoMessage, setPromoMessage] = useState<{ text: string; isError?: boolean } | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'fpx' | 'card' | 'tng'>('fpx');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showVideoPreview, setShowVideoPreview] = useState(false);

  if (!course) return null;

  const originalPrice = course.originalPrice || (course.price > 0 ? course.price * 2 : 0);
  const finalPrice = Math.max(0, course.price - discountApplied);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoCode.trim().toUpperCase();
    if (code === 'FIRSTUSER50' || code === 'NEWUSER50' || code === 'WELCOME50' || code === 'BARU50') {
      const discount = Math.min(course.price, 50);
      setDiscountApplied(discount);
      setPromoMessage({ text: `Baucar Pengguna Pertama ${code} sah! Diskaun RM${discount}.00 ditolak.` });
    } else if (code === 'KOMBO120') {
      const discount = Math.min(course.price, 120);
      setDiscountApplied(discount);
      setPromoMessage({ text: `Kod Kombo ${code} sah! Diskaun RM${discount}.00 ditolak.` });
    } else if (code === 'AI20' || code === 'PROMO20' || code === 'AKADEMIAI') {
      const discount = Math.min(course.price, 20);
      setDiscountApplied(discount);
      setPromoMessage({ text: `Kod ${code} berjaya ditebus! Diskaun RM${discount} diberikan.` });
    } else if (code === 'PERCUMA100') {
      setDiscountApplied(course.price);
      setPromoMessage({ text: `Kod Tajaan ${code} berjaya! 100% Diskaun diberikan.` });
    } else {
      setPromoMessage({ text: 'Kod promo tidak sah atau telah tamat tempoh.', isError: true });
    }
  };

  const handleConfirmPurchase = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsCompleted(true);
      onEnrollSuccess(course.id);
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 }
      });
    }, 900);
  };

  const handleClose = () => {
    setIsCompleted(false);
    setDiscountApplied(0);
    setPromoMessage(null);
    setPromoCode('');
    onClose();
  };

  const handleStartNow = () => {
    handleClose();
    onStartCourse(course);
  };

  if (!course) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={handleClose}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-[#121212] border border-white/20 w-full max-w-xl text-white shadow-2xl relative max-h-[92vh] overflow-y-auto"
          >
            {/* Top Header */}
            <div className="flex items-center justify-between p-5 border-b border-white/10 bg-black/50">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
            <span className="font-['Oswald'] text-lg uppercase tracking-wider text-white">
              {isCompleted ? 'Pendaftaran Selesai' : isAlreadyEnrolled ? 'Maklumat Modul Anda' : course.isFree ? 'Pendaftaran Modul Percuma' : 'Daftar & Langgan Modul'}
            </span>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isCompleted ? (
          /* Success Screen */
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h3 className="font-['Oswald'] text-3xl font-bold uppercase text-white tracking-wide">
                {course.isFree ? 'Pendaftaran Berjaya!' : 'Pembayaran Berjaya!'}
              </h3>
              <p className="text-sm text-neutral-300 max-w-md mx-auto">
                Tahniah! Anda kini mempunyai akses penuh sepanjang hayat untuk modul <strong className="text-white">{course.title}</strong>.
              </p>
            </div>

            {/* Receipt Summary */}
            <div className="p-4 bg-black/70 border border-white/10 text-left text-xs font-mono space-y-2 text-neutral-300">
              <div className="flex justify-between">
                <span className="text-neutral-500">No. Rujukan:</span>
                <span className="text-white">AKD-{Date.now().toString().slice(-6)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Jumlah Bayaran:</span>
                <span className="text-emerald-400 font-bold">
                  {course.isFree || finalPrice === 0 ? 'PERCUMA (RM 0.00)' : `RM ${finalPrice}.00`}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Status Akses:</span>
                <span className="text-white">Aktif Seumur Hidup</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3 justify-center">
              <button
                onClick={handleStartNow}
                className="w-full sm:w-auto px-6 py-3 bg-white text-black font-bold uppercase text-xs tracking-wider hover:bg-neutral-200 transition-all flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4 fill-black" />
                <span>Masuk Ruang Pembelajaran Sekarang</span>
              </button>
              <button
                onClick={handleClose}
                className="w-full sm:w-auto px-5 py-3 border border-white/20 text-neutral-300 hover:text-white uppercase text-xs font-bold tracking-wider"
              >
                Tutup
              </button>
            </div>
          </div>
        ) : isAlreadyEnrolled ? (
          /* Already Owned Screen */
          <div className="p-6 space-y-6">
            <div className="p-4 bg-emerald-950/30 border border-emerald-500/30 flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <div className="text-xs">
                <div className="font-bold text-white uppercase tracking-wider">Anda Telah Memiliki Modul Ini</div>
                <div className="text-neutral-300">Akses penuh pembelajaran aktif tanpa had masa.</div>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <img
                src={course.coverImage}
                alt={course.title}
                className="w-28 h-20 object-cover border border-white/10 shrink-0"
              />
              <div className="space-y-1">
                <h4 className="font-['Oswald'] text-xl font-bold uppercase text-white leading-tight">
                  {course.title}
                </h4>
                <p className="text-xs text-neutral-400">{course.tagline}</p>
                <div className="text-[11px] text-amber-400 font-mono">
                  {course.totalLessons} Pelajaran · {course.totalHours} Sesi Video
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-white/10 text-xs text-neutral-300">
              <div className="font-bold text-white uppercase tracking-wider text-[11px]">Kelebihan yang Termasuk:</div>
              {course.includes.map((inc, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{inc}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 flex gap-3">
              <button
                onClick={handleStartNow}
                className="flex-1 py-3 bg-white text-black font-bold uppercase text-xs tracking-wider hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4 fill-black" />
                <span>Teruskan Menonton Pelajaran</span>
              </button>
              <button
                onClick={handleClose}
                className="px-5 py-3 border border-white/20 text-neutral-300 uppercase text-xs font-bold"
              >
                Tutup
              </button>
            </div>
          </div>
        ) : (
          /* Enrollment / Checkout Form */
          <div className="p-6 space-y-6">
            {/* Course Card Preview with Video Trailer Option */}
            <div className="p-4 bg-black border border-white/10 space-y-3">
              <div className="flex gap-4 items-start">
                <img
                  src={course.coverImage}
                  alt={course.title}
                  className="w-28 h-20 object-cover border border-white/10 shrink-0"
                />
                <div className="space-y-1 min-w-0 flex-1">
                  <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider">
                    <span className={course.isFree ? 'text-emerald-400 font-bold' : 'text-amber-400 font-bold'}>
                      {course.badge || (course.isFree ? 'PERCUMA' : 'BERBAYAR')}
                    </span>
                    <span className="text-neutral-500">·</span>
                    <span className="text-neutral-300">{course.totalHours}</span>
                  </div>
                  <h4 className="font-['Oswald'] text-lg font-bold uppercase text-white truncate">
                    {course.title}
                  </h4>
                  <div className="text-xs text-neutral-400 truncate">
                    Pengajar: {course.instructor.name}
                  </div>
                </div>
              </div>

              {course.videoUrl && (
                <div className="pt-2 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setShowVideoPreview(!showVideoPreview)}
                    className="w-full py-2 bg-neutral-900 hover:bg-neutral-800 text-amber-400 hover:text-amber-300 border border-amber-400/30 rounded text-xs font-mono font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>{showVideoPreview ? '▲ Sembunyikan Pratonton Video' : '▶ Tonton Pratonton Video Kursus'}</span>
                  </button>

                  {showVideoPreview && (
                    <div className="relative aspect-video w-full rounded overflow-hidden bg-black border border-white/20 mt-3 shadow-lg">
                      <iframe
                        src={course.videoUrl.includes('?') ? course.videoUrl : `${course.videoUrl}?rel=0&modestbranding=1`}
                        title={course.title}
                        className="w-full h-full border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      />
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Course Value Props Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-300">
              {course.includes.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Pricing Breakdown */}
            <div className="p-4 bg-black/60 border border-white/10 space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-neutral-400">Harga Asal:</span>
                <span className="line-through text-neutral-500">RM {originalPrice}.00</span>
              </div>

              {course.isFree ? (
                <div className="flex justify-between items-center text-xs text-emerald-400">
                  <span>Tajaan Pendidikan Akademi AI:</span>
                  <span>- RM {originalPrice}.00</span>
                </div>
              ) : (
                <div className="flex justify-between items-center text-xs text-emerald-400">
                  <span>Potongan Harga Promosi:</span>
                  <span>- RM {originalPrice - course.price}.00</span>
                </div>
              )}

              {discountApplied > 0 && (
                <div className="flex justify-between items-center text-xs text-amber-400 font-semibold">
                  <span>Kupon Tambahan:</span>
                  <span>- RM {discountApplied}.00</span>
                </div>
              )}

              <div className="pt-2 border-t border-white/10 flex justify-between items-baseline">
                <div>
                  <div className="text-xs text-neutral-400 uppercase font-sans">Jumlah Perlu Dibayar:</div>
                  <div className="text-[11px] text-neutral-500">Tiada caj tersembunyi · Akses seumur hidup</div>
                </div>
                <div className="text-right">
                  {course.isFree || finalPrice === 0 ? (
                    <span className="font-['Oswald'] text-2xl font-bold text-emerald-400 tracking-wider">
                      PERCUMA (RM 0.00)
                    </span>
                  ) : (
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-sm font-sans font-medium text-neutral-400">RM</span>
                      <span className="font-['Oswald'] text-3xl font-bold text-white tracking-wider">
                        {finalPrice}
                      </span>
                      <span className="text-xs text-neutral-400 font-sans">.00</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Promo Code Input (For Paid Courses) */}
            {!course.isFree && finalPrice > 0 && (
              <form onSubmit={handleApplyPromo} className="space-y-1.5">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Kod Promo (cth: AI20)"
                      className="w-full pl-9 pr-3 py-2 bg-neutral-900 border border-white/20 text-xs text-white placeholder-neutral-500 uppercase font-mono focus:outline-none focus:border-white"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-neutral-800 text-white text-xs font-bold uppercase tracking-wider hover:bg-neutral-700 transition-colors"
                  >
                    Tebus
                  </button>
                </div>
                {promoMessage && (
                  <p className={`text-[11px] ${promoMessage.isError ? 'text-red-400' : 'text-emerald-400'}`}>
                    {promoMessage.text}
                  </p>
                )}
              </form>
            )}

            {/* Payment Methods (If Paid) */}
            {!course.isFree && finalPrice > 0 && (
              <div className="space-y-2">
                <div className="text-xs font-sans uppercase tracking-wider text-neutral-400 flex items-center justify-between">
                  <span>Kaedah Pembayaran Selamat:</span>
                  <span className="flex items-center gap-1 text-[11px] text-neutral-500 font-mono">
                    <Lock className="w-3 h-3 text-emerald-400" /> 256-bit Enkripsi
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('fpx')}
                    className={`p-2.5 border text-center font-medium transition-all ${
                      paymentMethod === 'fpx'
                        ? 'border-white bg-white/10 text-white'
                        : 'border-white/10 bg-neutral-900 text-neutral-400 hover:text-white'
                    }`}
                  >
                    FPX Online
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-2.5 border text-center font-medium transition-all ${
                      paymentMethod === 'card'
                        ? 'border-white bg-white/10 text-white'
                        : 'border-white/10 bg-neutral-900 text-neutral-400 hover:text-white'
                    }`}
                  >
                    Kad Kredit/Debit
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('tng')}
                    className={`p-2.5 border text-center font-medium transition-all ${
                      paymentMethod === 'tng'
                        ? 'border-white bg-white/10 text-white'
                        : 'border-white/10 bg-neutral-900 text-neutral-400 hover:text-white'
                    }`}
                  >
                    TNG eWallet
                  </button>
                </div>
              </div>
            )}

            {/* Guarantee Badge */}
            <div className="flex items-center gap-2 p-3 bg-neutral-950 border border-white/5 text-[11px] text-neutral-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Jaminan 30-Hari Kepuasan Penuh atau pemulangan wang tanpa soalan.</span>
            </div>

            {/* Submit CTA & Add to Basket */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
              {onAddToCart && !isAlreadyEnrolled && (
                <button
                  type="button"
                  onClick={() => onAddToCart(course)}
                  className={`w-full sm:w-auto px-5 py-3.5 font-bold uppercase text-xs tracking-wider border transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    isInCart
                      ? 'border-amber-400 bg-amber-400/15 text-amber-300'
                      : 'border-white/20 bg-neutral-900 text-white hover:border-white hover:bg-neutral-800'
                  }`}
                >
                  <ShoppingCart className="w-4 h-4 text-amber-400" />
                  <span>{isInCart ? 'Dalam Bakul ✓' : 'Tambah ke Bakul'}</span>
                </button>
              )}

              <button
                type="button"
                disabled={isProcessing}
                onClick={handleConfirmPurchase}
                className={`flex-1 w-full py-3.5 font-bold uppercase text-xs tracking-wider transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer ${
                  course.isFree || finalPrice === 0
                    ? 'bg-emerald-400 text-black hover:bg-emerald-300'
                    : 'bg-white text-black hover:bg-neutral-200'
                } ${isProcessing ? 'opacity-70 cursor-wait' : ''}`}
              >
                {isProcessing ? (
                  <span>Sedang Mengesahkan...</span>
                ) : course.isFree || finalPrice === 0 ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Daftar Sekarang Secara Percuma</span>
                  </>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4" />
                    <span>Bayar RM {finalPrice}.00 & Akses Serta-merta</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
