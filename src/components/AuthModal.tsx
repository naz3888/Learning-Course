import React, { useState } from 'react';
import { X, Mail, Lock, User, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';

interface AuthModalProps {
  isOpen: boolean;
  initialMode?: 'login' | 'signup';
  onClose: () => void;
  onAuthSuccess: (user: { name: string; email: string }) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  initialMode = 'login',
  onClose,
  onAuthSuccess
}) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  React.useEffect(() => {
    setMode(initialMode);
    setErrorMsg('');
  }, [initialMode, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email || !password) {
      setErrorMsg('Sila isikan semua maklumat yang diperlukan.');
      return;
    }

    if (mode === 'signup' && !name.trim()) {
      setErrorMsg('Sila masukkan nama penuh anda.');
      return;
    }

    const isEmailAdmin = email.trim().toLowerCase() === 'admin@akademiai.my' || email.trim().toLowerCase().includes('admin');
    if (isEmailAdmin && password.trim() !== 'admin123') {
      setErrorMsg('Kata laluan pentadbir tidak tepat (laluan demo: admin123).');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const userName = isEmailAdmin
        ? 'Pentadbir Akademi AI (Admin)'
        : (mode === 'signup' ? name : (email.split('@')[0] || 'Pelajar AI'));
      onAuthSuccess({
        name: userName,
        email: email.trim().toLowerCase()
      });
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 }
      });
      onClose();
    }, 600);
  };

  const handleAdminAuth = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onAuthSuccess({
        name: 'Pentadbir Akademi AI (Admin)',
        email: 'admin@akademiai.my'
      });
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 }
      });
      onClose();
    }, 400);
  };

  const handleGoogleAuth = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onAuthSuccess({
        name: 'Ahmad Faiz bin Zulkifli',
        email: 'ahmad.faiz@gmail.com'
      });
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 }
      });
      onClose();
    }, 500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-[#101010] border border-white/20 w-full max-w-md text-white shadow-2xl relative overflow-hidden"
          >
            {/* Modal Top Bar */}
            <div className="flex items-center justify-between p-5 border-b border-white/10 bg-black/50">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-white text-black flex items-center justify-center font-black text-xs">
              AI
            </div>
            <span className="font-['Oswald'] text-lg uppercase tracking-wider text-white">
              {mode === 'login' ? 'Log Masuk Pelajar' : 'Daftar Akaun Baru'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher: Log Masuk / Daftar */}
        <div className="grid grid-cols-2 border-b border-white/10 bg-black/30 text-xs uppercase font-sans font-bold tracking-wider">
          <button
            type="button"
            onClick={() => { setMode('login'); setErrorMsg(''); }}
            className={`py-3 text-center transition-all ${
              mode === 'login'
                ? 'text-white border-b-2 border-white bg-white/5'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Log Masuk
          </button>
          <button
            type="button"
            onClick={() => { setMode('signup'); setErrorMsg(''); }}
            className={`py-3 text-center transition-all ${
              mode === 'signup'
                ? 'text-white border-b-2 border-white bg-white/5'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Daftar Percuma
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-5">
          {/* Google Quick Sign-In */}
          <button
            type="button"
            onClick={handleGoogleAuth}
            disabled={isLoading}
            className="w-full py-2.5 px-4 bg-white/5 border border-white/20 hover:bg-white/10 text-white font-sans text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Teruskan dengan Google</span>
          </button>


          <div className="relative flex items-center justify-center">
            <div className="border-t border-white/10 w-full"></div>
            <span className="bg-[#101010] px-3 text-[11px] text-neutral-500 uppercase font-mono">
              atau log masuk emel
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div className="space-y-1">
                <label className="text-[11px] font-sans uppercase font-bold text-neutral-300">
                  Nama Penuh
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-neutral-500 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Contoh: Ahmad Faiz"
                    className="w-full pl-9 pr-3 py-2 bg-neutral-900 border border-white/20 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-[11px] font-sans uppercase font-bold text-neutral-300">
                Alamat Emel
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-neutral-500 absolute left-3 top-2.5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="anda@email.com"
                  className="w-full pl-9 pr-3 py-2 bg-neutral-900 border border-white/20 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white"
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-sans uppercase font-bold text-neutral-300">
                  Kata Laluan
                </label>
                {mode === 'login' && (
                  <button
                    type="button"
                    onClick={() => alert('Pautan set semula kata laluan telah dihantar ke emel anda.')}
                    className="text-[10px] text-neutral-400 hover:text-white"
                  >
                    Lupa Kata Laluan?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-neutral-500 absolute left-3 top-2.5" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2 bg-neutral-900 border border-white/20 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white"
                />
              </div>
            </div>

            {errorMsg && (
              <p className="text-xs text-red-400 font-sans">{errorMsg}</p>
            )}

            {mode === 'signup' && (
              <label className="flex items-start gap-2 text-[11px] text-neutral-400 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="mt-0.5 rounded border-white/20 bg-neutral-900"
                />
                <span>Saya bersetuju dengan Terma Syarat dan Dasar Privasi Akademi AI.</span>
              </label>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-white text-black font-bold uppercase text-xs tracking-wider hover:bg-neutral-200 transition-all shadow-lg flex items-center justify-center gap-2 mt-2"
            >
              {isLoading ? (
                <span>Sedang Memproses...</span>
              ) : mode === 'login' ? (
                <>
                  <span>Log Masuk</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Daftar Akaun Percuma</span>
                </>
              )}
            </button>
          </form>

          {/* Bottom Switch Note */}
          <div className="pt-2 text-center text-xs text-neutral-400">
            {mode === 'login' ? (
              <p>
                Belum mempunyai akaun?{' '}
                <button
                  onClick={() => setMode('signup')}
                  className="text-white underline font-semibold hover:text-amber-400"
                >
                  Daftar sekarang
                </button>
              </p>
            ) : (
              <p>
                Sudah mempunyai akaun?{' '}
                <button
                  onClick={() => setMode('login')}
                  className="text-white underline font-semibold hover:text-amber-400"
                >
                  Log masuk
                </button>
              </p>
            )}
          </div>

          {/* Discreet Admin Portal Access Link */}
          <div className="pt-3 border-t border-white/10 text-center">
            <button
              type="button"
              onClick={handleAdminAuth}
              disabled={isLoading}
              className="text-[11px] font-mono text-neutral-500 hover:text-amber-400 inline-flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-neutral-500 hover:text-amber-400" />
              <span>Akses Portal Pentadbir (Admin Login)</span>
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
      )}
    </AnimatePresence>
  );
};
