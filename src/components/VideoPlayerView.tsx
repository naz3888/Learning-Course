import React, { useState } from 'react';
import { Play, CheckCircle2, ChevronRight, ChevronLeft, Copy, Clock, Download, Maximize2, Minimize2, Sparkles, FileText } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Lesson } from '../types';
import { INSTRUCTOR_DATA } from '../data/coursesData';
import { useLanguage } from '../context/LanguageContext';

interface VideoPlayerViewProps {
  lesson: Lesson;
  levelBadge: string;
  moduleTitle: string;
  isCompleted: boolean;
  onToggleComplete: (lessonId: string) => void;
  onPrevLesson?: () => void;
  onNextLesson?: () => void;
  savedNote?: string;
  onSaveNote: (lessonId: string, noteText: string) => void;
  onOpenPromptLabWithPrompt?: (promptText: string) => void;
}

export const VideoPlayerView: React.FC<VideoPlayerViewProps> = ({
  lesson,
  levelBadge,
  moduleTitle,
  isCompleted,
  onToggleComplete,
  onPrevLesson,
  onNextLesson,
  savedNote = '',
  onSaveNote,
  onOpenPromptLabWithPrompt
}) => {
  const { t, isEn } = useLanguage();
  const [activeTab, setActiveTab] = useState<'summary' | 'chapters' | 'notes' | 'resources'>('summary');
  const [currentNote, setCurrentNote] = useState<string>(savedNote);
  const [isSavedNotice, setIsSavedNotice] = useState<boolean>(false);
  const [copiedNote, setCopiedNote] = useState<boolean>(false);
  const [isCinemaMode, setIsCinemaMode] = useState<boolean>(false);

  React.useEffect(() => {
    setCurrentNote(savedNote);
  }, [lesson.id, savedNote]);

  const handleNoteChange = (text: string) => {
    setCurrentNote(text);
    onSaveNote(lesson.id, text);
    setIsSavedNotice(true);
    setTimeout(() => setIsSavedNotice(false), 2000);
  };

  const handleCompleteClick = () => {
    if (!isCompleted) {
      confetti({
        particleCount: 70,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
    onToggleComplete(lesson.id);
  };

  const handleCopyNote = () => {
    navigator.clipboard.writeText(currentNote || lesson.summary);
    setCopiedNote(true);
    setTimeout(() => setCopiedNote(false), 2000);
  };

  const handleDownloadResources = () => {
    const content = `NOTA PELAJARAN: ${lesson.title}\nTahap: ${levelBadge}\nModul: ${moduleTitle}\nTenaga Pengajar: ${INSTRUCTOR_DATA.name}\n\nRINGKASAN:\n${lesson.summary}\n\nPOIN UTAMA:\n${lesson.keyPoints.map((p, i) => `${i + 1}. ${p}`).join('\n')}\n\nLATIHAN AMALI:\n${lesson.practicePrompt || 'Tiada'}\n\nNOTA PERIBADI:\n${currentNote || 'Tiada nota ditulis'}`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${lesson.id}_nota_pembelajaran.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className={`bg-[#0e0e0e] border border-white/10 shadow-2xl transition-all ${
      isCinemaMode ? 'fixed inset-2 sm:inset-6 z-50 overflow-y-auto max-w-6xl mx-auto bg-black p-2 sm:p-4' : ''
    }`}>
      {/* Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 sm:p-5 border-b border-white/10 bg-[#141414]">
        <div className="min-w-0">
          <div className="flex items-center gap-2 text-xs text-neutral-400 font-sans uppercase tracking-wider">
            <span className="text-amber-400 font-bold">{levelBadge}</span>
            <span>·</span>
            <span className="truncate">{moduleTitle}</span>
            <span>·</span>
            <span className="text-white font-medium">{INSTRUCTOR_DATA.name}</span>
          </div>
          <h2 className="font-['Oswald'] text-xl sm:text-2xl font-bold tracking-wide text-white uppercase truncate mt-0.5">
            {lesson.title}
          </h2>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {/* Cinema Mode Toggle */}
          <button
            onClick={() => setIsCinemaMode(!isCinemaMode)}
            className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
            title={isCinemaMode ? (isEn ? "Exit Theater Mode" : "Tutup Mod Teater") : (isEn ? "Open Theater Mode" : "Buka Mod Teater Penuh")}
          >
            {isCinemaMode ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          {/* Download Notes Package */}
          <button
            onClick={handleDownloadResources}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-neutral-200 bg-neutral-900 border border-white/10 hover:border-white/30 transition-colors"
            title={isEn ? "Download Summary & Notes" : "Muat Turun Ringkasan & Nota"}
          >
            <Download className="w-3.5 h-3.5 text-amber-400" />
            <span>{isEn ? "Download Notes" : "Muat Turun Nota"}</span>
          </button>

          {/* Mark Complete */}
          <button
            onClick={handleCompleteClick}
            className={`flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold font-sans uppercase tracking-wider transition-all ${
              isCompleted
                ? 'bg-white text-black shadow-md'
                : 'bg-neutral-900 border border-white/20 text-white hover:border-white'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{isCompleted ? (isEn ? 'Completed' : 'Selesai') : (isEn ? 'Mark Completed' : 'Tandakan Selesai')}</span>
          </button>

          {/* Chevrons */}
          <div className="flex items-center gap-1 pl-2 border-l border-white/15">
            <button
              onClick={onPrevLesson}
              disabled={!onPrevLesson}
              className="p-1.5 text-white hover:bg-neutral-800 disabled:opacity-25"
              title={isEn ? "Previous Lesson" : "Pelajaran Sebelumnya"}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={onNextLesson}
              disabled={!onNextLesson}
              className="p-1.5 text-white hover:bg-neutral-800 disabled:opacity-25"
              title={isEn ? "Next Lesson" : "Pelajaran Seterusnya"}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Video Theater Frame */}
      <div className={`relative aspect-video w-full bg-black ${isCinemaMode ? 'max-h-[65vh]' : ''}`}>
        <iframe
          src={lesson.videoUrl.includes('?') ? lesson.videoUrl : `${lesson.videoUrl}?rel=0&modestbranding=1`}
          title={lesson.title}
          className="w-full h-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>

      {/* Theater Sub-Navigation Tabs */}
      <div className="flex items-center border-b border-white/10 bg-[#121212] px-6 gap-6 overflow-x-auto text-xs font-sans uppercase tracking-wider">
        <button
          onClick={() => setActiveTab('summary')}
          className={`py-3.5 font-bold whitespace-nowrap border-b-2 transition-colors ${
            activeTab === 'summary'
              ? 'border-white text-white'
              : 'border-transparent text-neutral-400 hover:text-white'
          }`}
        >
          {isEn ? 'Summary & Practice' : 'Ringkasan & Amali'}
        </button>

        <button
          onClick={() => setActiveTab('chapters')}
          className={`py-3.5 font-bold whitespace-nowrap border-b-2 transition-colors ${
            activeTab === 'chapters'
              ? 'border-white text-white'
              : 'border-transparent text-neutral-400 hover:text-white'
          }`}
        >
          {isEn ? `Video Chapters (${lesson.timestamps.length})` : `Bab Video (${lesson.timestamps.length})`}
        </button>

        <button
          onClick={() => setActiveTab('notes')}
          className={`py-3.5 font-bold whitespace-nowrap border-b-2 transition-colors flex items-center gap-1.5 ${
            activeTab === 'notes'
              ? 'border-white text-white'
              : 'border-transparent text-neutral-400 hover:text-white'
          }`}
        >
          <span>{isEn ? 'Notebook' : 'Buku Nota'}</span>
          {currentNote && <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />}
        </button>

        <button
          onClick={() => setActiveTab('resources')}
          className={`py-3.5 font-bold whitespace-nowrap border-b-2 transition-colors ${
            activeTab === 'resources'
              ? 'border-white text-white'
              : 'border-transparent text-neutral-400 hover:text-white'
          }`}
        >
          {isEn ? `References (${lesson.resources.length})` : `Bahan Rujukan (${lesson.resources.length})`}
        </button>
      </div>

      {/* Tab Panels */}
      <div className="p-6 sm:p-8 bg-[#0e0e0e] min-h-[200px]">
        {/* SUMMARY */}
        {activeTab === 'summary' && (
          <div className="space-y-6">
            <div>
              <div className="text-[11px] font-sans font-bold uppercase tracking-widest text-neutral-400 mb-1">
                Kefahaman Intipati Pelajaran
              </div>
              <p className="text-sm sm:text-base text-neutral-200 leading-relaxed font-sans">
                {lesson.summary}
              </p>
            </div>

            <div>
              <div className="text-[11px] font-sans font-bold uppercase tracking-widest text-amber-400 mb-3">
                4 Prinsip Utama Yang Anda Perlu Kuasai:
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {lesson.keyPoints.map((point, idx) => (
                  <div key={idx} className="p-4 bg-[#141414] border border-white/5 text-xs text-neutral-300 leading-relaxed flex items-start gap-3">
                    <span className="font-mono font-bold text-amber-400 shrink-0">0{idx + 1}</span>
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {lesson.practicePrompt && (
              <div className="p-5 bg-[#141414] border border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-sans font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Latihan Amali Praktikal Bersama Tenaga Pengajar</span>
                  </div>
                  <button
                    onClick={() => {
                      if (lesson.practicePrompt) {
                        navigator.clipboard.writeText(lesson.practicePrompt);
                      }
                    }}
                    className="text-xs font-bold text-amber-400 hover:text-white uppercase tracking-wider flex items-center gap-1 cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Salin Latihan Promp</span>
                  </button>
                </div>
                <div className="p-3 bg-black border border-white/10 font-mono text-xs text-neutral-300">
                  {lesson.practicePrompt}
                </div>
              </div>
            )}
          </div>
        )}

        {/* CHAPTERS */}
        {activeTab === 'chapters' && (
          <div className="space-y-3">
            <div className="text-xs font-sans font-bold uppercase tracking-widest text-neutral-400 mb-2">
              Lompat Mengikut Bab & Topik
            </div>
            <div className="divide-y divide-white/10">
              {lesson.timestamps.map((ts, idx) => (
                <div key={idx} className="py-3 flex items-center justify-between gap-4 text-xs">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-amber-400 font-bold">{ts.time}</span>
                    <span className="text-neutral-200 font-medium">{ts.title}</span>
                  </div>
                  <span className="text-[10px] uppercase font-bold text-neutral-400 bg-neutral-900 px-2 py-0.5 border border-white/10">
                    Bab {idx + 1}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* NOTES */}
        {activeTab === 'notes' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-sans font-bold uppercase tracking-widest text-neutral-400">
                Buku Nota Peribadi Anda (Autosave ke Penyemak Imbas)
              </span>
              <div className="flex items-center gap-2">
                {isSavedNotice && <span className="text-xs text-emerald-400 font-medium">Tersimpan!</span>}
                <button
                  onClick={handleCopyNote}
                  className="flex items-center gap-1 px-3 py-1 bg-neutral-900 border border-white/15 text-xs text-neutral-300 hover:text-white"
                >
                  <Copy className="w-3 h-3" />
                  <span>{copiedNote ? 'Disalin' : 'Salin Nota'}</span>
                </button>
              </div>
            </div>

            <textarea
              value={currentNote}
              onChange={(e) => handleNoteChange(e.target.value)}
              placeholder="Catatkan pemikiran anda, soalan untuk ChatClub, atau teks prompt penting yang dipelajari dalam video ini..."
              rows={5}
              className="w-full p-4 bg-black border border-white/15 text-xs sm:text-sm text-neutral-200 focus:outline-none focus:border-white font-mono"
            />
          </div>
        )}

        {/* RESOURCES */}
        {activeTab === 'resources' && (
          <div className="space-y-3">
            <div className="text-xs font-sans font-bold uppercase tracking-widest text-neutral-400 mb-2">
              Pautan Luaran & Dokumen Rujukan
            </div>
            {lesson.resources.map((res, idx) => (
              <a
                key={idx}
                href={res.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-3.5 bg-[#141414] border border-white/10 hover:border-white/30 text-xs text-neutral-200 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <FileText className="w-4 h-4 text-amber-400" />
                  <span>{res.title}</span>
                </div>
                <span className="text-neutral-400 text-[10px] font-mono">Buka &rarr;</span>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
