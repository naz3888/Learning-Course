import React, { useState } from 'react';
import { X, Printer, ShieldCheck } from 'lucide-react';
import { CourseLevel } from '../types';
import { LEVELS_CONFIG } from '../data/coursesData';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  onSaveUserName: (name: string) => void;
  selectedLevel: CourseLevel;
  completedQuizzes: Record<string, number | undefined>;
  completedLessonsCount: number;
  totalLessonsCount: number;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  userName,
  onSaveUserName,
  selectedLevel
}) => {
  if (!isOpen) return null;

  const [studentName, setStudentName] = useState<string>(userName || 'Ahmad Faiz bin Zulkifli');
  const [certLevel, setCertLevel] = useState<CourseLevel | 'master'>(selectedLevel);

  const currentDate = new Date().toLocaleDateString('ms-MY', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const serialId = `AAI-MY-2026-${(studentName.length * 7919 + 4821).toString(16).toUpperCase()}`;

  const handlePrint = () => {
    window.print();
  };

  const titleText =
    certLevel === 'master'
      ? 'Sarjana Lengkap Kecerdasan Buatan (Semua Tahap 1-3)'
      : LEVELS_CONFIG[certLevel].title;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#111111] border border-white/15 shadow-2xl max-w-4xl w-full overflow-hidden max-h-[92vh] flex flex-col text-white">
        {/* Controls (Hidden on Print) */}
        <div className="print:hidden flex items-center justify-between p-5 border-b border-white/10 bg-[#161616]">
          <div className="font-['Oswald'] text-lg font-bold uppercase tracking-wider text-white">
            SIJIL PENGIKTIRAFAN RASMI AKADEMI AI
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold font-sans uppercase tracking-wider text-black bg-white hover:bg-neutral-200 transition-colors shadow-sm"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak / Simpan PDF</span>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 bg-neutral-900 border border-white/10 hover:bg-neutral-800 flex items-center justify-center text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Inputs (Hidden on Print) */}
        <div className="print:hidden p-4 bg-black border-b border-white/10 flex flex-wrap items-center gap-4 text-xs font-sans">
          <div className="flex items-center gap-2 flex-1 min-w-[240px]">
            <span className="font-bold text-neutral-400 uppercase tracking-wider text-[11px]">Nama Penerima:</span>
            <input
              type="text"
              value={studentName}
              onChange={(e) => {
                setStudentName(e.target.value);
                onSaveUserName(e.target.value);
              }}
              className="flex-1 px-3 py-1.5 bg-[#141414] border border-white/20 text-xs text-white focus:outline-none focus:border-white"
              placeholder="Masukkan Nama Anda"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="font-bold text-neutral-400 uppercase tracking-wider text-[11px]">Tahap Sijil:</span>
            <select
              value={certLevel}
              onChange={(e) => setCertLevel(e.target.value as any)}
              className="px-3 py-1.5 bg-[#141414] border border-white/20 text-xs text-white focus:outline-none"
            >
              <option value="level_1">Tahap 1: Asas & Pengenalan AI</option>
              <option value="level_2">Tahap 2: Aplikasi & GenAI</option>
              <option value="level_3">Tahap 3: Arkitektur & Ejen AI</option>
              <option value="master">Sarjana Lengkap (Semua Tahap)</option>
            </select>
          </div>
        </div>

        {/* Certificate Paper Canvas */}
        <div className="p-8 sm:p-12 overflow-y-auto flex-1 flex justify-center bg-neutral-950">
          <div className="w-full max-w-3xl bg-[#fafafa] border-4 border-[#222222] p-8 sm:p-12 shadow-2xl text-center flex flex-col justify-between aspect-[1.414/1] min-h-[480px] text-black relative">
            {/* Subtle Certificate Watermark & Border */}
            <div className="absolute inset-2 border border-neutral-400/50 pointer-events-none" />

            <div className="space-y-1">
              <div className="text-[11px] font-sans font-bold tracking-[0.25em] text-neutral-500 uppercase">
                AKADEMI AI CONSERVATORY ONLINE
              </div>
              <h1 className="text-2xl sm:text-4xl font-serif font-black text-black tracking-tight uppercase">
                Sijil Tamat Pengajian
              </h1>
            </div>

            <div className="my-6 space-y-3">
              <p className="text-xs text-neutral-600 font-serif italic">
                Dengan ini diperakui bahawa
              </p>

              <div className="text-2xl sm:text-3xl font-serif font-bold text-black tracking-wide border-b border-black/20 pb-2 inline-block px-8">
                {studentName}
              </div>

              <p className="text-xs text-neutral-600 font-sans max-w-md mx-auto pt-2 leading-relaxed">
                telah berjaya menyempurnakan keseluruhan kurikulum modul pembelajaran, amali makmal prompt dan ujian penilaian komprehensif bagi:
              </p>

              <div className="text-base sm:text-lg font-serif font-bold text-black uppercase tracking-wider">
                {titleText}
              </div>
            </div>

            {/* Certificate Footer Details */}
            <div className="pt-6 border-t border-neutral-300 flex items-end justify-between text-left text-xs font-sans">
              <div className="space-y-1">
                <div className="text-[10px] text-neutral-500 uppercase tracking-widest font-mono">Tarikh Pengeluaran</div>
                <div className="font-semibold text-black">{currentDate}</div>
                <div className="text-[9px] text-neutral-500 font-mono">No. Siri: {serialId}</div>
              </div>

              {/* Digital Seal */}
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-full border-2 border-amber-600 bg-amber-50 flex items-center justify-center text-amber-800 shadow-sm">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <span className="text-[8px] font-bold tracking-widest uppercase text-amber-900 mt-1">SAH DIPERAKUI</span>
              </div>

              <div className="space-y-1 text-right">
                <div className="font-serif italic text-sm text-black">Dr. Farhan Azim</div>
                <div className="text-[10px] text-neutral-500 uppercase tracking-widest font-mono">Ketua Pengarah Akademik</div>
                <div className="text-[9px] text-neutral-500">Akademi AI Kebangsaan</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
