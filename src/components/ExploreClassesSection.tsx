import React, { useState } from 'react';
import { Play, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { Lesson, CourseLevel } from '../types';
import { MODULES_DATA, LEVELS_CONFIG } from '../data/coursesData';

interface ExploreClassesSectionProps {
  onSelectLesson: (lesson: Lesson, level: CourseLevel) => void;
}

export const ExploreClassesSection: React.FC<ExploreClassesSectionProps> = ({ onSelectLesson }) => {
  const [activeCategory, setActiveCategory] = useState<string>('SEMUA');

  const categories = [
    'SEMUA',
    'ASAS & MODEL',
    'PROMPT CRTF',
    'GENERATIVE AI',
    'TRANSFORMER',
    'RAG & VECTOR',
    'EJEN AUTONOMI'
  ];

  // Curated showcase list of video classes
  const allClasses = [
    {
      id: 'les-1-1',
      level: 'level_1' as CourseLevel,
      title: 'Pengenalan Kecerdasan Buatan: Narrow AI vs AGI',
      instructor: 'Dr. Farhan Azim',
      category: 'ASAS & MODEL',
      levelBadge: 'Tahap 1: Pemula',
      duration: '18:45',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=700&auto=format&fit=crop&q=80',
      lesson: MODULES_DATA[0].lessons[0]
    },
    {
      id: 'les-1-5',
      level: 'level_1' as CourseLevel,
      title: 'Formula Asas Prompting: Context, Role, Task & Format',
      instructor: 'Sarah Liyana',
      category: 'PROMPT CRTF',
      levelBadge: 'Tahap 1: Pemula',
      duration: '22:15',
      image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=700&auto=format&fit=crop&q=80',
      lesson: MODULES_DATA[1].lessons[0]
    },
    {
      id: 'les-2-1',
      level: 'level_2' as CourseLevel,
      title: 'Difusi Model Visual & Kejuruteraan Prompt Fotorealistik',
      instructor: 'Aiman Zhafri',
      category: 'GENERATIVE AI',
      levelBadge: 'Tahap 2: Pengamal',
      duration: '24:10',
      image: 'https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?w=700&auto=format&fit=crop&q=80',
      lesson: MODULES_DATA[2].lessons[0]
    },
    {
      id: 'les-3-1',
      level: 'level_3' as CourseLevel,
      title: 'Seni Bina Transformer & Mekanisme Self-Attention',
      instructor: 'Dr. Farhan Azim',
      category: 'TRANSFORMER',
      levelBadge: 'Tahap 3: Mahir',
      duration: '31:20',
      image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=700&auto=format&fit=crop&q=80',
      lesson: MODULES_DATA[4].lessons[0]
    },
    {
      id: 'les-3-3',
      level: 'level_3' as CourseLevel,
      title: 'Saluran RAG & Pangkalan Data Vektor Teragih',
      instructor: 'Amirul Hakim',
      category: 'RAG & VECTOR',
      levelBadge: 'Tahap 3: Mahir',
      duration: '28:50',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=700&auto=format&fit=crop&q=80',
      lesson: MODULES_DATA[5].lessons[0]
    },
    {
      id: 'les-3-5',
      level: 'level_3' as CourseLevel,
      title: 'Ejen Autonomi: Perancangan, Memori & Function Calling',
      instructor: 'Kenneth Tan',
      category: 'EJEN AUTONOMI',
      levelBadge: 'Tahap 3: Mahir',
      duration: '33:10',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=700&auto=format&fit=crop&q=80',
      lesson: MODULES_DATA[5].lessons[1]
    }
  ];

  const filtered = activeCategory === 'SEMUA'
    ? allClasses
    : allClasses.filter(c => c.category === activeCategory);

  return (
    <section className="py-14 sm:py-20 px-4 sm:px-8 max-w-7xl mx-auto space-y-10 border-t border-white/10">
      {/* Bold Heading (Matching Screenshot: EXPLORE CLASSES IN EVERY MAJOR STYLE) */}
      <div className="text-center space-y-2">
        <h2 className="font-['Oswald'] font-black text-3xl sm:text-5xl lg:text-6xl tracking-wider text-white uppercase">
          EXPLORE CLASSES IN EVERY MAJOR STYLE
        </h2>
        <p className="font-sans text-xs sm:text-sm uppercase tracking-widest text-neutral-400">
          TEROKAI KELAS MENGIKUT MODUL, TOPIK DAN TAHAP KEMAHIRAN
        </p>
      </div>

      {/* Category Pills Strip with Navigation Chevrons */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto py-2 no-scrollbar">
        <button
          onClick={() => {
            const idx = categories.indexOf(activeCategory);
            const prev = idx > 0 ? categories[idx - 1] : categories[categories.length - 1];
            setActiveCategory(prev);
          }}
          className="p-1.5 text-neutral-400 hover:text-white transition-colors shrink-0"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 text-[11px] font-sans font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-[#0071e3] text-white shadow-md'
                    : 'bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        <button
          onClick={() => {
            const idx = categories.indexOf(activeCategory);
            const next = idx < categories.length - 1 ? categories[idx + 1] : categories[0];
            setActiveCategory(next);
          }}
          className="p-1.5 text-neutral-400 hover:text-white transition-colors shrink-0"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* 3 Horizontal Video Cards Row (Matching Screenshot) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filtered.slice(0, 3).map((item) => (
          <div
            key={item.id}
            onClick={() => onSelectLesson(item.lesson, item.level)}
            className="group cursor-pointer space-y-3"
          >
            {/* 16:9 Thumbnail with Circular Play Icon */}
            <div className="relative aspect-video w-full overflow-hidden bg-neutral-900 border border-white/10 group-hover:border-white/50 transition-all shadow-md">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />

              {/* Center Circular Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-14 h-14 rounded-full border-2 border-white/90 bg-black/60 backdrop-blur-xs text-white flex items-center justify-center group-hover:scale-110 group-hover:bg-white group-hover:text-black group-hover:border-white transition-all pl-0.5 shadow-xl">
                  <Play className="w-5 h-5 fill-current" />
                </div>
              </div>

              {/* Duration Tag */}
              <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 bg-black/80 font-mono text-[10px] text-white border border-white/10">
                {item.duration}
              </div>
            </div>

            {/* Video Meta Info (Matching Screenshot Typography) */}
            <div className="space-y-1 text-center">
              <h4 className="font-sans font-bold text-sm sm:text-base text-white group-hover:text-amber-400 transition-colors line-clamp-1">
                "{item.title}"
              </h4>
              <p className="font-sans text-xs text-neutral-400">
                {item.instructor} · <span className="text-neutral-300 font-medium">{item.levelBadge}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
