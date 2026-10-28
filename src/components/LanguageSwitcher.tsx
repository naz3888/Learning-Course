import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface LanguageSwitcherProps {
  variant?: 'minimal' | 'full' | 'compact';
  className?: string;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  variant = 'compact',
  className = ''
}) => {
  const { language, setLanguage, isMs, isEn } = useLanguage();

  if (variant === 'minimal') {
    return (
      <div className={`inline-flex items-center rounded border border-white/20 bg-black/60 p-0.5 text-xs font-mono ${className}`}>
        <button
          onClick={() => setLanguage('ms')}
          className={`px-2 py-1 rounded-sm transition-all cursor-pointer font-bold ${
            isMs
              ? 'bg-amber-400 text-black shadow-sm'
              : 'text-neutral-400 hover:text-white'
          }`}
          title="Tukar ke Bahasa Melayu"
        >
          BM
        </button>
        <span className="text-neutral-600 px-0.5">/</span>
        <button
          onClick={() => setLanguage('en')}
          className={`px-2 py-1 rounded-sm transition-all cursor-pointer font-bold ${
            isEn
              ? 'bg-amber-400 text-black shadow-sm'
              : 'text-neutral-400 hover:text-white'
          }`}
          title="Switch to English"
        >
          EN
        </button>
      </div>
    );
  }

  if (variant === 'full') {
    return (
      <div className={`flex items-center justify-between p-2.5 rounded border border-white/10 bg-neutral-900/80 text-xs font-mono ${className}`}>
        <div className="flex items-center gap-2 text-neutral-300">
          <Globe className="w-4 h-4 text-amber-400" />
          <span>{isMs ? 'Pilihan Bahasa' : 'Language'}</span>
        </div>
        <div className="inline-flex items-center rounded bg-black/80 p-0.5 border border-white/15">
          <button
            onClick={() => setLanguage('ms')}
            className={`px-2.5 py-1 text-[11px] font-bold rounded-sm transition-all cursor-pointer ${
              isMs
                ? 'bg-amber-400 text-black shadow'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            🇲🇾 BM
          </button>
          <button
            onClick={() => setLanguage('en')}
            className={`px-2.5 py-1 text-[11px] font-bold rounded-sm transition-all cursor-pointer ${
              isEn
                ? 'bg-amber-400 text-black shadow'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            🇬🇧 EN
          </button>
        </div>
      </div>
    );
  }

  // Default 'compact' pill button with globe icon
  return (
    <div
      className={`inline-flex items-center gap-1.5 px-2 py-1 rounded bg-[#121212] hover:bg-[#1a1a1a] border border-white/15 text-xs font-mono transition-colors ${className}`}
      title={isMs ? 'Tukar Bahasa (Bahasa Melayu / English)' : 'Switch Language (Malay / English)'}
    >
      <Globe className="w-3.5 h-3.5 text-amber-400 shrink-0" />
      <div className="flex items-center">
        <button
          onClick={() => setLanguage('ms')}
          className={`px-1.5 py-0.5 rounded text-[11px] font-bold transition-all cursor-pointer ${
            isMs
              ? 'bg-amber-400 text-black font-black'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          BM
        </button>
        <span className="text-neutral-600 text-[10px] mx-0.5">|</span>
        <button
          onClick={() => setLanguage('en')}
          className={`px-1.5 py-0.5 rounded text-[11px] font-bold transition-all cursor-pointer ${
            isEn
              ? 'bg-amber-400 text-black font-black'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          EN
        </button>
      </div>
    </div>
  );
};
