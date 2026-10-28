import React from 'react';

interface NextLevelCtaSectionProps {
  onStart: () => void;
}

export const NextLevelCtaSection: React.FC<NextLevelCtaSectionProps> = ({ onStart }) => {
  return (
    <section className="py-20 sm:py-28 px-4 sm:px-8 max-w-5xl mx-auto text-center space-y-6 border-t border-white/10">
      <h2 className="font-['Oswald'] font-black text-4xl sm:text-6xl md:text-7xl tracking-wider text-white uppercase leading-none">
        READY TO TRAIN AT THE NEXT LEVEL?
      </h2>

      <p className="font-sans text-xs sm:text-sm text-neutral-300 uppercase tracking-widest max-w-2xl mx-auto">
        Sertai ribuan jurutera, pencipta kandungan, dan profesional yang menguasai AI di Akademi AI Online.
      </p>

      <div className="pt-2">
        <button
          onClick={onStart}
          className="px-8 sm:px-10 py-3.5 sm:py-4 bg-white text-black font-sans font-bold uppercase tracking-wider text-xs sm:text-sm hover:bg-neutral-200 transition-all shadow-xl active:scale-95"
        >
          MULA BELAJAR SEKARANG
        </button>
      </div>

      <p className="font-sans text-[11px] uppercase tracking-widest text-neutral-400 font-semibold pt-1">
        Akses tanpa had · 100% Tajaan Terbuka Untuk Komuniti
      </p>
    </section>
  );
};
