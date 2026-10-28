import React from 'react';
import { Monitor, Tablet, Smartphone, Tv } from 'lucide-react';

export const DevicesSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-8 max-w-7xl mx-auto space-y-12 border-t border-white/10 text-center">
      {/* Bold Header */}
      <div className="space-y-3 max-w-3xl mx-auto">
        <h2 className="font-['Oswald'] font-black text-3xl sm:text-5xl lg:text-6xl tracking-wider text-white uppercase">
          STREAM ON YOUR FAVORITE DEVICES
        </h2>
        <p className="font-sans text-xs sm:text-sm text-neutral-300 tracking-wide uppercase">
          Watch on your iPhone, tablet, computer, or stream on your TV with the Akademi AI Online app.
        </p>
      </div>

      {/* Device Mockup Showcase Frame */}
      <div className="relative max-w-5xl mx-auto pt-6">
        {/* Ambient Glow */}
        <div className="absolute inset-x-1/4 top-1/2 -translate-y-1/2 h-64 bg-blue-500/10 blur-3xl pointer-events-none rounded-full" />

        {/* Multi-Device Composite Visual */}
        <div className="relative flex flex-col md:flex-row items-center justify-center gap-6 sm:gap-8">
          {/* Main MacBook Pro Laptop Mockup Frame */}
          <div className="w-full max-w-2xl text-left">
            {/* 1. MacBook Display Lid (Top Shell) */}
            <div className="relative bg-gradient-to-b from-[#2d2d32] via-[#1c1c1f] to-[#131315] p-2 sm:p-2.5 pb-0 rounded-t-[20px] sm:rounded-t-[26px] border border-neutral-700/70 shadow-[0_20px_50px_rgba(0,0,0,0.9)] ring-1 ring-white/10">
              {/* Screen Glass */}
              <div className="relative rounded-t-[12px] sm:rounded-t-[16px] bg-black overflow-hidden border border-neutral-800/80 shadow-[inset_0_0_15px_rgba(0,0,0,0.9)]">
                {/* Apple Camera Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 sm:w-28 h-3 sm:h-3.5 bg-black rounded-b-lg z-30 flex items-center justify-center gap-1.5 border-b border-x border-neutral-800 pointer-events-none">
                  <div className="w-1.5 h-1.5 rounded-full bg-neutral-900 border border-neutral-700 flex items-center justify-center">
                    <div className="w-0.5 h-0.5 rounded-full bg-blue-900" />
                  </div>
                  <div className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                </div>

                {/* macOS Safari / Window Title Bar */}
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#121214] border-b border-white/10 select-none">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56] border border-[#e0443e]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] border border-[#dea123]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f] border border-[#1aab29]" />
                  <span className="text-[10px] text-neutral-400 font-mono pl-3 truncate">akademiai.online/ruang-pembelajaran</span>
                </div>

                <div className="relative aspect-video overflow-hidden bg-black">
                  <img
                    src="/src/assets/images/hero_ai_learning_1792520564015.jpg"
                    alt="Desktop Preview"
                    className="w-full h-full object-cover opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent flex flex-col justify-end p-4 text-left">
                    <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest font-sans">
                      Sesi Pembelajaran HD Sedang Dimainkan
                    </span>
                    <span className="font-['Oswald'] text-lg text-white font-bold uppercase tracking-wide">
                      Mekanisme Perhatian Self-Attention Transformer
                    </span>
                  </div>
                </div>

                {/* Diagonal Glass Reflection */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.025] to-transparent" />
              </div>
            </div>

            {/* 2. MacBook Hinge */}
            <div className="w-[94%] sm:w-[96%] h-2 mx-auto bg-gradient-to-b from-neutral-950 to-[#1c1c1f] border-x border-neutral-800" />

            {/* 3. MacBook Lower Chassis / Base Deck */}
            <div className="relative mx-auto w-[103%] -ml-[1.5%] h-3 sm:h-4 bg-gradient-to-b from-[#3a3a40] via-[#242428] to-[#141416] rounded-b-[12px] sm:rounded-b-[16px] border-t border-white/30 border-b border-neutral-900 shadow-[0_12px_25px_rgba(0,0,0,0.9)]">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 sm:w-24 h-1 bg-neutral-900 rounded-b-md border-b border-x border-neutral-700/60" />
            </div>

            {/* 4. Desk Shadow */}
            <div className="h-3 w-[88%] mx-auto bg-black/95 blur-md -mt-1 rounded-full shadow-lg pointer-events-none" />
          </div>

          {/* Mobile & Tablet Overlap Frame */}
          <div className="flex items-center gap-4 shrink-0">
            {/* Tablet Mockup */}
            <div className="w-44 sm:w-52 bg-neutral-900 border border-white/20 p-2 shadow-2xl">
              <div className="aspect-[3/4] bg-black overflow-hidden relative">
                <img
                  src="/src/assets/images/course_level_intermediate_1792520565056.jpg"
                  alt="Tablet App"
                  className="w-full h-full object-cover opacity-75"
                />
                <div className="absolute inset-x-0 bottom-0 p-2.5 bg-black/80 text-left">
                  <div className="text-[9px] font-bold text-white uppercase font-sans">ChatClub Forum</div>
                  <div className="text-[8px] text-neutral-400 truncate">12 komen baru dari rakan sekelas</div>
                </div>
              </div>
            </div>

            {/* Mobile Phone Mockup */}
            <div className="w-28 sm:w-36 bg-neutral-900 border border-white/20 p-1.5 shadow-2xl">
              <div className="aspect-[9/18] bg-black overflow-hidden relative">
                <img
                  src="/src/assets/images/course_level_beginner_1792520563264.jpg"
                  alt="Mobile App"
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-x-0 bottom-0 p-2 bg-black/85 text-left">
                  <div className="text-[8px] font-bold text-white uppercase font-sans">Nota Pelajaran</div>
                  <div className="text-[7px] text-emerald-400">Tersimpan Luar Talian</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Device Icons Row */}
      <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 text-xs uppercase tracking-widest text-neutral-400 font-semibold pt-4">
        <div className="flex items-center gap-2">
          <Monitor className="w-4 h-4 text-white" />
          <span>Komputer & Mac</span>
        </div>
        <div className="flex items-center gap-2">
          <Tablet className="w-4 h-4 text-white" />
          <span>iPad & Tablet</span>
        </div>
        <div className="flex items-center gap-2">
          <Smartphone className="w-4 h-4 text-white" />
          <span>iPhone & Android</span>
        </div>
        <div className="flex items-center gap-2">
          <Tv className="w-4 h-4 text-white" />
          <span>Smart TV (AirPlay & Cast)</span>
        </div>
      </div>
    </section>
  );
};
