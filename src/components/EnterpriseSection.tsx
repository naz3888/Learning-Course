import React from 'react';

interface EnterpriseSectionProps {
  onLearnMore?: () => void;
}

export const EnterpriseSection: React.FC<EnterpriseSectionProps> = ({ onLearnMore }) => {
  return (
    <section className="py-14 sm:py-20 px-4 sm:px-8 max-w-7xl mx-auto border-t border-white/10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Side: Large Photo Frame (Matching Screenshot) */}
        <div className="lg:col-span-6 overflow-hidden bg-neutral-900 border border-white/20 aspect-[16/10] shadow-2xl relative group">
          <img
            src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&auto=format&fit=crop&q=80"
            alt="Akademi AI untuk Syarikat & Pendidik"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>

        {/* Right Side: Big Bold Title & Action */}
        <div className="lg:col-span-6 space-y-5 text-left">
          <h2 className="font-['Oswald'] font-black text-3xl sm:text-5xl lg:text-6xl tracking-wider text-white uppercase leading-[1.05]">
            CONSERVATORY ONLINE FOR TEACHERS & TEAMS
          </h2>

          <p className="font-sans text-xs sm:text-sm text-neutral-300 uppercase tracking-widest leading-relaxed">
            Latihan profesional berterusan, bengkel amali Prompt Engineering, dan pensijilan rasmi organisasi untuk tenaga pendidik dan pasukan korporat.
          </p>

          <p className="font-sans text-xs text-neutral-400 leading-relaxed">
            Modul tersuai mengikut keperluan industri anda: pengauditan halusinasi data sulit, automasi lembaran kerja, dan integrasi pangkalan data vektor dalaman yang selamat.
          </p>

          <div className="pt-2">
            <button
              onClick={onLearnMore}
              className="px-6 py-3 bg-white text-black font-sans font-bold uppercase tracking-wider text-xs hover:bg-neutral-200 transition-colors shadow-md"
            >
              KETAHUI LEBIH LANJUT
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
