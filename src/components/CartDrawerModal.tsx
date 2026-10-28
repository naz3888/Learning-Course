import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  ShoppingBag, 
  CheckCircle2, 
  CreditCard, 
  ShieldCheck, 
  Tag, 
  Play, 
  ArrowRight,
  Lock,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'motion/react';
import { StoreCourse } from '../types';

interface CartDrawerModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartCourses: StoreCourse[];
  onRemoveFromCart: (courseId: string) => void;
  onClearCart: () => void;
  onCheckoutSuccess: (courseIds: string[]) => void;
  onStartCourse: (course: StoreCourse) => void;
  onExploreStore: () => void;
  prefilledPromoCode?: string;
}

export const CartDrawerModal: React.FC<CartDrawerModalProps> = ({
  isOpen,
  onClose,
  cartCourses,
  onRemoveFromCart,
  onClearCart,
  onCheckoutSuccess,
  onStartCourse,
  onExploreStore,
  prefilledPromoCode
}) => {
  const [promoCode, setPromoCode] = useState(prefilledPromoCode || '');
  const [discountApplied, setDiscountApplied] = useState(0);
  const [promoMessage, setPromoMessage] = useState<{ text: string; isError?: boolean } | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'fpx' | 'card' | 'tng'>('fpx');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [purchasedCourses, setPurchasedCourses] = useState<StoreCourse[]>([]);

  const subtotal = cartCourses.reduce((sum, item) => sum + item.price, 0);

  // Automatically apply prefilled promo code when drawer opens or changes
  React.useEffect(() => {
    if (isOpen && prefilledPromoCode) {
      setPromoCode(prefilledPromoCode);
      const code = prefilledPromoCode.trim().toUpperCase();
      if (code === 'FIRSTUSER50' || code === 'NEWUSER50' || code === 'WELCOME50' || code === 'BARU50') {
        const discount = Math.min(subtotal, 50);
        setDiscountApplied(discount);
        setPromoMessage({ text: `Baucar Pengguna Pertama ${code} diaktifkan! Diskaun RM${discount}.00 ditolak.` });
      } else if (code === 'KOMBO120') {
        const discount = Math.min(subtotal, 120);
        setDiscountApplied(discount);
        setPromoMessage({ text: `Kod Kombo ${code} diaktifkan! Diskaun RM${discount}.00 ditolak.` });
      } else if (code === 'PERCUMA100') {
        setDiscountApplied(subtotal);
        setPromoMessage({ text: `Kod Tajaan ${code} berjaya! 100% Diskaun diberikan.` });
      }
    }
  }, [isOpen, prefilledPromoCode, subtotal]);

  if (!isOpen) return null;
  const originalSubtotal = cartCourses.reduce((sum, item) => {
    return sum + (item.originalPrice || (item.price > 0 ? item.price * 2 : 0));
  }, 0);
  const savings = Math.max(0, originalSubtotal - subtotal);
  const finalTotal = Math.max(0, subtotal - discountApplied);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoCode.trim().toUpperCase();
    if (code === 'FIRSTUSER50' || code === 'NEWUSER50' || code === 'WELCOME50' || code === 'BARU50') {
      const discount = Math.min(subtotal, 50);
      setDiscountApplied(discount);
      setPromoMessage({ text: `Baucar Pengguna Pertama ${code} sah! Diskaun RM${discount}.00 berjaya ditolak.` });
    } else if (code === 'KOMBO120') {
      const discount = Math.min(subtotal, 120);
      setDiscountApplied(discount);
      setPromoMessage({ text: `Kod Kombo ${code} sah! Diskaun RM${discount}.00 berjaya ditolak.` });
    } else if (code === 'AI20' || code === 'PROMO20') {
      const discount = Math.min(subtotal, 20);
      setDiscountApplied(discount);
      setPromoMessage({ text: `Kod ${code} sah! Diskaun RM${discount}.00 berjaya ditolak.` });
    } else if (code === 'AKADEMIAI' || code === 'PROMO50') {
      const discount = Math.min(subtotal, 50);
      setDiscountApplied(discount);
      setPromoMessage({ text: `Kod ${code} sah! Diskaun istimewa RM${discount}.00 berjaya ditolak.` });
    } else if (code === 'PERCUMA100') {
      setDiscountApplied(subtotal);
      setPromoMessage({ text: `Kod Tajaan ${code} berjaya! 100% Diskaun diberikan.` });
    } else {
      setPromoMessage({ text: 'Kod promo tidak sah atau telah luput.', isError: true });
    }
  };

  const handleCheckout = () => {
    if (cartCourses.length === 0) return;
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setIsCompleted(true);
      const courseIds = cartCourses.map(c => c.id);
      setPurchasedCourses([...cartCourses]);
      onCheckoutSuccess(courseIds);
      onClearCart();
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      });
    }, 1000);
  };

  const handleFinishAndStart = (course: StoreCourse) => {
    setIsCompleted(false);
    onClose();
    onStartCourse(course);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Drawer Overlay Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Drawer Container (Right-side slide over) */}
          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10 pointer-events-none">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="w-screen max-w-lg bg-[#0e0e0e] border-l border-white/15 text-white shadow-2xl flex flex-col justify-between pointer-events-auto"
            >
              {/* Header */}
              <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between bg-black/60">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-white text-black flex items-center justify-center font-black">
                <ShoppingBag className="w-4 h-4 text-black" />
              </div>
              <div>
                <h3 className="font-['Oswald'] text-xl font-bold uppercase tracking-wider text-white leading-none">
                  Bakul Pembelian Modul
                </h3>
                <p className="text-xs text-neutral-400 font-sans mt-0.5">
                  {cartCourses.length} {cartCourses.length === 1 ? 'modul dipilih' : 'modul dipilih'}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-neutral-400 hover:text-white hover:bg-white/10 transition-colors rounded-sm"
              aria-label="Tutup Bakul"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
            {isCompleted ? (
              /* Success Checkout State */
              <div className="py-8 text-center space-y-6">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h4 className="font-['Oswald'] text-2xl sm:text-3xl font-bold uppercase text-white tracking-wide">
                    Pembayaran Berjaya!
                  </h4>
                  <p className="text-xs sm:text-sm text-neutral-300 max-w-sm mx-auto">
                    Tahniah! Semua modul dalam pesanan anda telah diaktifkan ke dalam akaun pembelajaran anda.
                  </p>
                </div>

                {/* Receipt Details */}
                <div className="p-4 bg-black border border-white/10 text-left text-xs font-mono space-y-2 text-neutral-300">
                  <div className="flex justify-between">
                    <span className="text-neutral-500">No. Invois:</span>
                    <span className="text-white">INV-AKD-{Date.now().toString().slice(-6)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Jumlah Modul:</span>
                    <span className="text-white">{purchasedCourses.length} Modul Penuh</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Jumlah Dibayar:</span>
                    <span className="text-emerald-400 font-bold">
                      {finalTotal === 0 ? 'PERCUMA (RM 0.00)' : `RM ${finalTotal}.00`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Status Akses:</span>
                    <span className="text-white">Aktif Seumur Hidup</span>
                  </div>
                </div>

                {/* List of Purchased Courses */}
                <div className="space-y-2 text-left">
                  <div className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                    Modul yang telah diaktifkan:
                  </div>
                  {purchasedCourses.map((c) => (
                    <div
                      key={c.id}
                      className="p-3 bg-neutral-900 border border-white/10 flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={c.coverImage}
                          alt={c.title}
                          className="w-12 h-10 object-cover border border-white/10 shrink-0"
                        />
                        <div className="min-w-0">
                          <h5 className="font-bold text-xs text-white truncate">{c.title}</h5>
                          <span className="text-[10px] text-neutral-400 font-mono">{c.levelCategory}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleFinishAndStart(c)}
                        className="px-3 py-1.5 bg-white text-black font-bold text-xs uppercase tracking-wider hover:bg-neutral-200 transition-colors shrink-0 flex items-center gap-1"
                      >
                        <Play className="w-3 h-3 fill-black" />
                        <span>Tonton</span>
                      </button>
                    </div>
                  ))}
                </div>

                <div className="pt-4 flex flex-col gap-2">
                  {purchasedCourses[0] && (
                    <button
                      onClick={() => handleFinishAndStart(purchasedCourses[0])}
                      className="w-full py-3 bg-white text-black font-bold uppercase text-xs tracking-wider hover:bg-neutral-200 transition-all flex items-center justify-center gap-2 shadow-lg"
                    >
                      <Play className="w-4 h-4 fill-black" />
                      <span>Masuk Ruang Pembelajaran Sekarang</span>
                    </button>
                  )}
                  <button
                    onClick={() => {
                      setIsCompleted(false);
                      onClose();
                    }}
                    className="w-full py-2.5 border border-white/20 text-neutral-300 hover:text-white uppercase text-xs font-bold"
                  >
                    Tutup
                  </button>
                </div>
              </div>
            ) : cartCourses.length === 0 ? (
              /* Empty Cart State */
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 text-neutral-500 flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-['Oswald'] text-xl font-bold uppercase text-white tracking-wide">
                    Bakul Pembelian Anda Kosong
                  </h4>
                  <p className="text-xs text-neutral-400 max-w-xs mx-auto font-sans">
                    Anda belum memasukkan sebarang modul ke dalam troli. Terokai katalog modul untuk memilih modul AI idaman anda.
                  </p>
                </div>
                <div className="pt-2">
                  <button
                    onClick={() => {
                      onClose();
                      onExploreStore();
                    }}
                    className="px-5 py-2.5 bg-white text-black font-sans font-bold text-xs uppercase tracking-wider hover:bg-neutral-200 transition-all inline-flex items-center gap-2 cursor-pointer shadow-md"
                  >
                    <span>Terokai Katalog Modul</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ) : (
              /* Cart Items List */
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-neutral-400 border-b border-white/10 pb-2">
                  <span className="uppercase font-mono">Item Modul ({cartCourses.length})</span>
                  <button
                    onClick={onClearCart}
                    className="text-[11px] text-neutral-500 hover:text-red-400 transition-colors uppercase font-mono"
                  >
                    Kosongkan Bakul
                  </button>
                </div>

                {/* Items */}
                <div className="space-y-3">
                  {cartCourses.map((course) => (
                    <div
                      key={course.id}
                      className="p-3 bg-black border border-white/10 flex gap-3 group relative hover:border-white/20 transition-all"
                    >
                      <img
                        src={course.coverImage}
                        alt={course.title}
                        className="w-20 h-16 object-cover border border-white/10 shrink-0"
                      />
                      <div className="flex-1 min-w-0 space-y-1">
                        <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider">
                          <span className={course.isFree ? 'text-emerald-400' : 'text-amber-400'}>
                            {course.badge || (course.isFree ? 'PERCUMA' : 'PREMIUM')}
                          </span>
                          <span className="text-neutral-600">·</span>
                          <span className="text-neutral-400">{course.totalHours}</span>
                        </div>
                        <h4 className="font-['Oswald'] text-sm font-bold uppercase text-white truncate leading-snug">
                          {course.title}
                        </h4>
                        <div className="text-[11px] text-neutral-400 truncate">
                          Pengajar: {course.instructor.name}
                        </div>

                        {/* Price & Remove */}
                        <div className="flex items-center justify-between pt-1">
                          <div>
                            {course.isFree ? (
                              <span className="font-['Oswald'] text-sm font-bold text-emerald-400">PERCUMA</span>
                            ) : (
                              <div className="flex items-baseline gap-1.5">
                                <span className="font-['Oswald'] text-sm font-bold text-white">
                                  RM {course.price}.00
                                </span>
                                {course.originalPrice && (
                                  <span className="line-through text-neutral-500 text-[10px] font-mono">
                                    RM {course.originalPrice}.00
                                  </span>
                                )}
                              </div>
                            )}
                          </div>

                          <button
                            onClick={() => onRemoveFromCart(course.id)}
                            className="p-1 text-neutral-500 hover:text-red-400 hover:bg-white/5 transition-colors"
                            title="Buang dari bakul"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Promo Code Input */}
                <form onSubmit={handleApplyPromo} className="pt-2 space-y-1.5">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-3" />
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="Kod Kupon (cth: AI20)"
                        className="w-full pl-9 pr-3 py-2 bg-neutral-950 border border-white/20 text-xs text-white placeholder-neutral-500 uppercase font-mono focus:outline-none focus:border-white"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-neutral-800 text-white text-xs font-bold uppercase tracking-wider hover:bg-neutral-700 transition-colors"
                    >
                      Guna
                    </button>
                  </div>
                  {promoMessage && (
                    <p className={`text-[11px] ${promoMessage.isError ? 'text-red-400' : 'text-emerald-400'}`}>
                      {promoMessage.text}
                    </p>
                  )}
                </form>

                {/* Malaysian Payment Method Options */}
                {finalTotal > 0 && (
                  <div className="space-y-2 pt-2 border-t border-white/10">
                    <div className="text-xs uppercase font-sans tracking-wider text-neutral-400 flex items-center justify-between">
                      <span>Pilihan Pembayaran:</span>
                      <span className="flex items-center gap-1 text-[10px] text-neutral-500 font-mono">
                        <Lock className="w-3 h-3 text-emerald-400" /> Selamat & Sah
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('fpx')}
                        className={`p-2.5 border text-left flex flex-col justify-between transition-all ${
                          paymentMethod === 'fpx'
                            ? 'border-white bg-white/10 text-white'
                            : 'border-white/10 bg-black/40 text-neutral-400 hover:border-white/30'
                        }`}
                      >
                        <span className="font-bold text-[11px] uppercase">FPX Bank</span>
                        <span className="text-[9px] text-neutral-400">Maybank, CIMB, dll</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod('tng')}
                        className={`p-2.5 border text-left flex flex-col justify-between transition-all ${
                          paymentMethod === 'tng'
                            ? 'border-white bg-white/10 text-white'
                            : 'border-white/10 bg-black/40 text-neutral-400 hover:border-white/30'
                        }`}
                      >
                        <span className="font-bold text-[11px] uppercase">TnG eWallet</span>
                        <span className="text-[9px] text-neutral-400">DuitNow QR</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod('card')}
                        className={`p-2.5 border text-left flex flex-col justify-between transition-all ${
                          paymentMethod === 'card'
                            ? 'border-white bg-white/10 text-white'
                            : 'border-white/10 bg-black/40 text-neutral-400 hover:border-white/30'
                        }`}
                      >
                        <span className="font-bold text-[11px] uppercase">Kad Kredit</span>
                        <span className="text-[9px] text-neutral-400">Visa / Master</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Drawer Footer (Summary & Checkout Button) */}
          {!isCompleted && cartCourses.length > 0 && (
            <div className="p-5 sm:p-6 border-t border-white/15 bg-black/80 space-y-4">
              {/* Cost Summary */}
              <div className="space-y-1.5 text-xs text-neutral-300 font-sans">
                <div className="flex justify-between items-center">
                  <span className="text-neutral-400">Harga Asal:</span>
                  <span className="line-through text-neutral-500 font-mono">RM {originalSubtotal}.00</span>
                </div>

                {savings > 0 && (
                  <div className="flex justify-between items-center text-emerald-400">
                    <span>Penjimatan Pakej:</span>
                    <span className="font-mono">- RM {savings}.00</span>
                  </div>
                )}

                {discountApplied > 0 && (
                  <div className="flex justify-between items-center text-amber-400">
                    <span>Diskaun Kupon:</span>
                    <span className="font-mono">- RM {discountApplied}.00</span>
                  </div>
                )}

                <div className="pt-2 border-t border-white/10 flex justify-between items-baseline">
                  <div>
                    <div className="font-bold text-white uppercase text-xs">Jumlah Bayaran:</div>
                    <div className="text-[10px] text-neutral-500">Akses Penuh Seumur Hidup</div>
                  </div>
                  <div className="text-right">
                    {finalTotal === 0 ? (
                      <span className="font-['Oswald'] text-2xl font-bold text-emerald-400">
                        PERCUMA (RM 0.00)
                      </span>
                    ) : (
                      <div className="flex items-baseline gap-1">
                        <span className="text-xs text-neutral-400">RM</span>
                        <span className="font-['Oswald'] text-3xl font-bold text-white">
                          {finalTotal}
                        </span>
                        <span className="text-xs text-neutral-400">.00</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                type="button"
                disabled={isProcessing}
                onClick={handleCheckout}
                className={`w-full py-3.5 font-bold uppercase text-xs tracking-wider transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer ${
                  finalTotal === 0
                    ? 'bg-emerald-400 text-black hover:bg-emerald-300'
                    : 'bg-white text-black hover:bg-neutral-200'
                } ${isProcessing ? 'opacity-70 cursor-wait' : ''}`}
              >
                {isProcessing ? (
                  <span>Sedang Memproses Pesanan...</span>
                ) : finalTotal === 0 ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Daftar Semua Kursus Percuma Sekarang</span>
                  </>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4" />
                    <span>Checkout Sekarang · Bayar RM {finalTotal}.00</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-neutral-500 font-mono">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>30-Hari Jaminan Pulangan Wang Penuh · Akses Segera</span>
              </div>
            </div>
          )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
