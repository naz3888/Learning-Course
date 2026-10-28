import React from 'react';
import { Star, CheckCircle, MessageSquare } from 'lucide-react';
import { STUDENT_REVIEWS } from '../data/coursesData';

export const StudentReviewsSection: React.FC = () => {
  return (
    <section className="bg-white rounded-3xl border border-[rgba(0,0,0,0.06)] p-6 sm:p-10 shadow-xs space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[rgba(0,0,0,0.06)] pb-6">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-[#0071e3]">
            Komuniti & Maklum Balas
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1d1d1f] mt-1">
            Ulasan Pelajar & Profesional
          </h2>
          <p className="text-xs sm:text-sm text-[#86868b] mt-0.5">
            Lihat pengalaman sebenar graduan dan pengamal industri yang telah menamatkan modul.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-medium text-[#2e7d32] bg-[#e8f5e9] px-3.5 py-1.5 rounded-full">
          <CheckCircle className="w-3.5 h-3.5" />
          <span>99% Maklum Balas Positif (2,410 Ulasan)</span>
        </div>
      </div>

      {/* Ratings Overview Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-[#fafafa] p-6 rounded-2xl border border-[rgba(0,0,0,0.04)]">
        {/* Big Score (4 Cols) */}
        <div className="md:col-span-4 text-center md:text-left space-y-1">
          <div className="text-5xl font-bold tracking-tight text-[#1d1d1f] tabular-nums">
            4.95
          </div>
          <div className="flex justify-center md:justify-start text-amber-400 text-lg">
            {'★★★★★'.split('').map((s, i) => (
              <span key={i}>★</span>
            ))}
          </div>
          <div className="text-xs text-[#86868b]">Berdasarkan 2,410 ulasan sah pelajar</div>
        </div>

        {/* Rating Breakdown Bars (8 Cols) */}
        <div className="md:col-span-8 space-y-2 text-xs">
          <div className="flex items-center gap-3">
            <span className="w-12 text-[#1d1d1f] font-medium">5 Bintang</span>
            <div className="flex-1 bg-[#e8e8ed] rounded-full h-2 overflow-hidden">
              <div className="bg-amber-400 h-full w-[95%]" />
            </div>
            <span className="w-10 text-right text-[#86868b] font-mono">95%</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="w-12 text-[#1d1d1f] font-medium">4 Bintang</span>
            <div className="flex-1 bg-[#e8e8ed] rounded-full h-2 overflow-hidden">
              <div className="bg-amber-400 h-full w-[4%]" />
            </div>
            <span className="w-10 text-right text-[#86868b] font-mono">4%</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="w-12 text-[#1d1d1f] font-medium">3 Bintang</span>
            <div className="flex-1 bg-[#e8e8ed] rounded-full h-2 overflow-hidden">
              <div className="bg-amber-400 h-full w-[1%]" />
            </div>
            <span className="w-10 text-right text-[#86868b] font-mono">1%</span>
          </div>
        </div>
      </div>

      {/* Reviews Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {STUDENT_REVIEWS.map((rev) => (
          <div
            key={rev.id}
            className="p-5 rounded-2xl bg-[#f5f5f7] border border-[rgba(0,0,0,0.04)] space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex text-amber-400 text-xs">
                  {'★★★★★'.split('').map((s, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
                <span className="text-[11px] text-[#86868b]">{rev.date}</span>
              </div>

              <p className="text-xs text-[#515154] leading-relaxed italic">
                "{rev.content}"
              </p>
            </div>

            <div className="pt-2 border-t border-[rgba(0,0,0,0.06)] flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#1d1d1f] text-white flex items-center justify-center text-xs font-bold">
                {rev.author.charAt(0)}
              </div>
              <div className="text-[11px] min-w-0">
                <div className="font-semibold text-[#1d1d1f] truncate">{rev.author}</div>
                <div className="text-[#86868b] truncate">{rev.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
