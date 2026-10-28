import React from 'react';
import { Star, Award, Users, BookOpen, CheckCircle } from 'lucide-react';
import { INSTRUCTOR_DATA } from '../data/coursesData';

export const InstructorSection: React.FC = () => {
  return (
    <section className="bg-white rounded-3xl border border-[rgba(0,0,0,0.06)] p-6 sm:p-10 shadow-xs space-y-6">
      <div className="text-xs font-semibold uppercase tracking-wider text-[#0071e3]">
        Mengenai Tenaga Pengajar
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left: Avatar & Quick Credentials (4 Cols) */}
        <div className="md:col-span-4 space-y-4">
          <div className="relative rounded-2xl overflow-hidden aspect-square border border-[rgba(0,0,0,0.08)] shadow-sm bg-[#f5f5f7]">
            <img
              src={INSTRUCTOR_DATA.avatar}
              alt={INSTRUCTOR_DATA.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#f5f5f7]">
              <span className="text-[#86868b]">Penilaian Pelajar:</span>
              <span className="font-semibold text-[#1d1d1f] flex items-center gap-1">
                <span className="text-amber-500">★</span> 4.95 / 5.0
              </span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#f5f5f7]">
              <span className="text-[#86868b]">Jumlah Pelajar:</span>
              <span className="font-semibold text-[#1d1d1f]">{INSTRUCTOR_DATA.studentsCount}</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#f5f5f7]">
              <span className="text-[#86868b]">Siri Kursus:</span>
              <span className="font-semibold text-[#1d1d1f]">{INSTRUCTOR_DATA.coursesCount} Tahap Lengkap</span>
            </div>
          </div>
        </div>

        {/* Right: Detailed Bio & Teaching Philosophy (8 Cols) */}
        <div className="md:col-span-8 space-y-4">
          <div>
            <h3 className="text-2xl font-bold tracking-tight text-[#1d1d1f]">
              {INSTRUCTOR_DATA.name}
            </h3>
            <div className="text-sm text-[#0071e3] font-medium mt-0.5">
              {INSTRUCTOR_DATA.title}
            </div>
          </div>

          <p className="text-sm sm:text-base text-[#515154] leading-relaxed">
            {INSTRUCTOR_DATA.bio}
          </p>

          <div className="pt-2 border-t border-[rgba(0,0,0,0.06)] space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#1d1d1f]">
              Falsafah Pembelajaran:
            </div>
            <blockquote className="p-4 rounded-2xl bg-[#f5f5f7] border-l-2 border-[#0071e3] text-xs sm:text-sm text-[#1d1d1f] italic leading-relaxed">
              "Kecerdasan buatan bukan untuk menggantikan manusia, sebaliknya memperkasakan mereka yang mahir mengemukakan soalan yang tepat. Di Akademi AI, kita belajar membongkar prinsip asas agar anda mampu berfikir selari dengan kemajuan teknologi."
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
};
