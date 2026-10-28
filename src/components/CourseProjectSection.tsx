import React, { useState } from 'react';
import { Award, CheckCircle2, Upload, Sparkles, FolderCheck, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CourseLevel } from '../types';
import { COURSE_PROJECTS } from '../data/coursesData';

interface CourseProjectSectionProps {
  selectedLevel: CourseLevel;
}

export const CourseProjectSection: React.FC<CourseProjectSectionProps> = ({ selectedLevel }) => {
  const project = COURSE_PROJECTS[selectedLevel];
  const [projectSubmissionUrl, setProjectSubmissionUrl] = useState<string>('');
  const [projectNotes, setProjectNotes] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleSubmitProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectSubmissionUrl.trim()) return;
    setIsSubmitted(true);
    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.7 }
    });
  };

  return (
    <section className="bg-white rounded-3xl border border-[rgba(0,0,0,0.06)] p-6 sm:p-10 shadow-xs space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[rgba(0,0,0,0.06)] pb-6">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-[#0071e3]">
            Ciri Khas Modul Profesional
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1d1d1f] mt-1">
            Projek Akhir Modul (Final Project)
          </h2>
          <p className="text-xs sm:text-sm text-[#86868b] mt-0.5">
            Selesaikan projek dunia sebenar ini untuk membina portfolio dan menerima sijil pengiktirafan rasmi.
          </p>
        </div>

        <div className="text-right">
          <span className="text-xs text-[#86868b] block">Penyertaan Pelajar:</span>
          <span className="text-sm font-bold text-[#1d1d1f] tabular-nums">
            {project.studentProjectsCount}+ Projek Dihantar
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left: Project Description & Deliverables (7 Cols) */}
        <div className="lg:col-span-7 space-y-5">
          <div>
            <h3 className="text-xl font-bold text-[#1d1d1f] tracking-tight">
              {project.title}
            </h3>
            <p className="text-sm text-[#515154] leading-relaxed mt-2">
              {project.description}
            </p>
          </div>

          <div className="space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#1d1d1f]">
              Hasil Kerja Projek yang Mesti Dihasilkan (Deliverables):
            </div>
            <div className="space-y-2">
              {project.deliverables.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-[#1d1d1f] p-3 rounded-2xl bg-[#f5f5f7]">
                  <CheckCircle2 className="w-4 h-4 text-[#2e7d32] shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Submission Form */}
          <div className="p-5 rounded-2xl bg-[#fafafa] border border-[rgba(0,0,0,0.06)] space-y-3">
            <div className="text-xs font-semibold text-[#1d1d1f]">
              Hantar Projek Anda untuk Semakan & Lencana Portfolio:
            </div>

            {isSubmitted ? (
              <div className="p-4 rounded-xl bg-[#e8f5e9] text-[#1b5e20] text-xs space-y-1">
                <div className="font-bold flex items-center gap-1.5">
                  <Check className="w-4 h-4" />
                  <span>Projek Anda Telah Berjaya Dihantar!</span>
                </div>
                <p className="text-[11px] text-[#2e7d32]">
                  Pautan projek telah direkodkan. Sijil tamat kursus anda kini telah diaktifkan dengan pengiktirafan projek siap.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitProject} className="space-y-3">
                <div>
                  <input
                    type="url"
                    value={projectSubmissionUrl}
                    onChange={(e) => setProjectSubmissionUrl(e.target.value)}
                    placeholder="Tampal pautan Google Drive, GitHub, atau dokumen projek anda (cth: https://...)"
                    className="w-full text-xs p-3 rounded-xl border border-[#d2d2d7] bg-white focus:outline-none focus:border-[#0071e3] text-[#1d1d1f]"
                    required
                  />
                </div>
                <div>
                  <textarea
                    value={projectNotes}
                    onChange={(e) => setProjectNotes(e.target.value)}
                    placeholder="Nota ringkas mengenai projek anda (pilihan)..."
                    rows={2}
                    className="w-full text-xs p-3 rounded-xl border border-[#d2d2d7] bg-white focus:outline-none focus:border-[#0071e3] text-[#1d1d1f]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full text-xs font-medium text-white bg-[#1d1d1f] hover:bg-[#333336] transition-colors shadow-xs"
                >
                  Hantar Projek Portfolio &rarr;
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Right: Project Showcase Mockup (5 Cols) */}
        <div className="lg:col-span-5">
          <div className="rounded-2xl overflow-hidden border border-[rgba(0,0,0,0.08)] shadow-md bg-[#fafafa]">
            <img
              src={project.showcaseImage}
              alt="Contoh Projek Pelajar Domestika AI"
              className="w-full h-auto object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="p-4 bg-white border-t border-[rgba(0,0,0,0.06)] text-xs text-[#86868b]">
              <span className="font-semibold text-[#1d1d1f]">Galeri Portfolio Komuniti: </span>
              Contoh kompilasi identiti jenama generatif, buku moodboard prompt, dan prototaip digital hasil pelajar kursus.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
