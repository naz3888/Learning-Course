import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface TrainYourWaySectionProps {
  onCardClick?: (index: number) => void;
}

export const TrainYourWaySection: React.FC<TrainYourWaySectionProps> = ({ onCardClick }) => {
  const pillars = [
    {
      title: 'LEARN FROM THE BEST',
      subtitle: 'Classes taught by top AI researchers, ML engineers and industry innovators.',
      malayTitle: 'BELAJAR DARI PAKAR TERBAIK',
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=700&auto=format&fit=crop&q=80',
      badge: 'Fakulti Pakar'
    },
    {
      title: 'ON-DEMAND ACCESS',
      subtitle: 'Unlimited access to modules of HD video lessons, anytime, anywhere.',
      malayTitle: 'AKSES ON-DEMAND 24/7',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=700&auto=format&fit=crop&q=80',
      badge: 'Video HD 4K'
    },
    {
      title: 'TRAIN ON YOUR SCHEDULE',
      subtitle: 'Self-paced step-by-step curriculum with lesson chapters and downloadable notes.',
      malayTitle: 'IKUT JADUAL SENDIRI',
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=700&auto=format&fit=crop&q=80',
      badge: 'Bebas & Fleksibel'
    },
    {
      title: 'LEVEL UP YOUR SKILLS',
      subtitle: 'Master practical skills across Prompting, GenAI, RAG, and Autonomous Agents.',
      malayTitle: 'TINGKATKAN KEMAHIRAN',
      image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=700&auto=format&fit=crop&q=80',
      badge: 'Pensijilan Industri'
    }
  ];

  return (
    <section className="py-14 sm:py-20 px-4 sm:px-8 max-w-7xl mx-auto space-y-10">
      {/* Bold Section Title (Matching Screenshot: TRAIN YOUR WAY) */}
      <div className="text-center space-y-2">
        <h2 className="font-['Oswald'] font-black text-3xl sm:text-5xl lg:text-6xl tracking-wider text-white uppercase">
          TRAIN YOUR WAY
        </h2>
        <p className="font-sans text-xs sm:text-sm uppercase tracking-widest text-neutral-400">
          BELAJAR MENGIKUT CARA ANDA DENGAN STANDARD PROFESIONAL
        </p>
      </div>

      {/* 4 Photo Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {pillars.map((pillar, idx) => (
          <div
            key={idx}
            onClick={() => onCardClick?.(idx)}
            className="group relative rounded-none overflow-hidden aspect-[3/4] bg-neutral-900 border border-white/10 hover:border-white/40 transition-all duration-300 cursor-pointer shadow-lg"
          >
            {/* Background Image with Dark Gradient Overlay */}
            <img
              src={pillar.image}
              alt={pillar.title}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

            {/* Top Pill */}
            <div className="absolute top-3 left-3">
              <span className="text-[10px] font-sans font-bold uppercase tracking-wider bg-black/70 text-neutral-300 px-2.5 py-1 border border-white/15">
                {pillar.badge}
              </span>
            </div>

            {/* Bottom Content */}
            <div className="absolute inset-x-0 bottom-0 p-5 space-y-2">
              <h3 className="font-['Oswald'] font-bold text-xl sm:text-2xl text-white uppercase tracking-wider leading-tight group-hover:text-amber-400 transition-colors">
                {pillar.title}
              </h3>
              <p className="font-sans text-xs text-neutral-300 leading-relaxed font-normal">
                {pillar.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
