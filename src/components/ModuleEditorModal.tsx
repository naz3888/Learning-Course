import React, { useState, useEffect } from 'react';
import {
  X,
  CheckCircle2,
  Edit3,
  Plus,
  Trash2,
  Video,
  Play,
  Clock,
  Sparkles,
  BookOpen,
  ArrowUp,
  ArrowDown,
  AlertCircle,
  HelpCircle,
  Layers
} from 'lucide-react';
import { Module, Lesson, CourseLevel } from '../types';
import { formatEmbedVideoUrl, PRESET_VIDEOS } from './AdminCourseManagerModal';

interface ModuleEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  moduleToEdit: Module | null; // null if creating new
  currentLevel: CourseLevel;
  onSaveModule: (savedModule: Module, isNew: boolean) => void;
  onDeleteModule?: (moduleId: string) => void;
  initialLessonIndex?: number;
}

export const ModuleEditorModal: React.FC<ModuleEditorModalProps> = ({
  isOpen,
  onClose,
  moduleToEdit,
  currentLevel,
  onSaveModule,
  onDeleteModule,
  initialLessonIndex = 0
}) => {
  const isNew = !moduleToEdit;

  const [level, setLevel] = useState<CourseLevel>(currentLevel);
  const [moduleId, setModuleId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [iconName, setIconName] = useState('Cpu');
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [activeLessonIndex, setActiveLessonIndex] = useState<number>(0);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    if (toastMessage) {
      const t = setTimeout(() => setToastMessage(null), 3000);
      return () => clearTimeout(t);
    }
  }, [toastMessage]);

  useEffect(() => {
    if (moduleToEdit) {
      setLevel(moduleToEdit.level);
      setModuleId(moduleToEdit.id);
      setTitle(moduleToEdit.title);
      setDescription(moduleToEdit.description);
      setIconName(moduleToEdit.iconName || 'Cpu');
      const loadedLessons = moduleToEdit.lessons.length > 0 ? moduleToEdit.lessons : [createNewDefaultLesson(1)];
      setLessons(loadedLessons);
      const safeIndex = (initialLessonIndex >= 0 && initialLessonIndex < loadedLessons.length) ? initialLessonIndex : 0;
      setActiveLessonIndex(safeIndex);
    } else {
      const newId = `mod-custom-${Date.now()}`;
      setLevel(currentLevel);
      setModuleId(newId);
      setTitle('Modul Baharu: ');
      setDescription('Keterangan ringkas mengenai silibus dan hasil pembelajaran modul ini.');
      setIconName('Sparkles');
      setLessons([createNewDefaultLesson(1), createNewDefaultLesson(2)]);
      setActiveLessonIndex(0);
    }
    setDeleteConfirm(false);
  }, [moduleToEdit, currentLevel, isOpen, initialLessonIndex]);

  if (!isOpen) return null;

  function createNewDefaultLesson(lessonNumber: number): Lesson {
    return {
      id: `les-custom-${Date.now()}-${lessonNumber}`,
      title: `Pelajaran ${lessonNumber}: Tajuk Pelajaran Baharu`,
      duration: '15 minit',
      durationMinutes: 15,
      videoUrl: PRESET_VIDEOS[0].url,
      summary: 'Ringkasan mengenai topik dan konsep utama pelajaran ini.',
      keyPoints: [
        'Konsep asas topik ini dan kepentingannya',
        'Contoh aplikasi praktikal dalam industri',
        'Langkah-langkah pelaksanaan langkah demi langkah'
      ],
      timestamps: [
        { time: '00:00', seconds: 0, title: 'Pengenalan Topik' },
        { time: '05:00', seconds: 300, title: 'Penerangan Utama' },
        { time: '12:00', seconds: 720, title: 'Latihan & Kesimpulan' }
      ],
      transcriptSnippet: 'Selamat datang ke pelajaran ini. Dalam sesi ini kita akan meneroka konsep secara mendalam dengan contoh amali.',
      practicePrompt: 'Tuliskan satu eksperimen prompt atau soalan latihan berdasarkan konsep yang dipelajari.',
      resources: [
        { title: 'Nota Pelajaran (PDF)', url: '#' },
        { title: 'Glosari Istilah AI', url: '#glossary' }
      ]
    };
  }

  const handleAddLesson = () => {
    const nextNumber = lessons.length + 1;
    const newLesson = createNewDefaultLesson(nextNumber);
    setLessons(prev => [...prev, newLesson]);
    setActiveLessonIndex(lessons.length);
    setToastMessage(`Pelajaran baharu ditambah (${newLesson.title})`);
  };

  const handleRemoveLesson = (index: number) => {
    if (lessons.length <= 1) {
      setToastMessage('Modul perlu mempunyai sekurang-kurangnya 1 pelajaran video.');
      return;
    }
    setLessons(prev => prev.filter((_, i) => i !== index));
    if (activeLessonIndex >= index && activeLessonIndex > 0) {
      setActiveLessonIndex(activeLessonIndex - 1);
    }
    setToastMessage('Pelajaran dipadam daripada modul.');
  };

  const handleMoveLesson = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= lessons.length) return;
    const updated = [...lessons];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    setLessons(updated);
    setActiveLessonIndex(targetIndex);
  };

  const handleUpdateActiveLesson = (field: keyof Lesson, value: any) => {
    setLessons(prev => {
      const updated = [...prev];
      if (updated[activeLessonIndex]) {
        updated[activeLessonIndex] = {
          ...updated[activeLessonIndex],
          [field]: value
        };
      }
      return updated;
    });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setToastMessage('Sila masukkan tajuk modul.');
      return;
    }

    if (lessons.length === 0) {
      setToastMessage('Sila tambah sekurang-kurangnya satu pelajaran video.');
      return;
    }

    // Format all video links to embed format
    const cleanedLessons: Lesson[] = lessons.map(lesson => ({
      ...lesson,
      videoUrl: formatEmbedVideoUrl(lesson.videoUrl) || PRESET_VIDEOS[0].url
    }));

    const finalModule: Module = {
      id: moduleId || `mod-${Date.now()}`,
      title: title.trim(),
      description: description.trim(),
      level: level,
      iconName: iconName || 'Cpu',
      coverImage: moduleToEdit?.coverImage || '/src/assets/images/course_level_beginner_1792520563264.jpg',
      lessons: cleanedLessons
    };

    onSaveModule(finalModule, isNew);
    onClose();
  };

  const currentLesson = lessons[activeLessonIndex] || lessons[0];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-[#0c0c0c] border border-amber-400/40 shadow-2xl rounded-lg overflow-hidden flex flex-col max-h-[92vh]">
        {/* Toast Alert */}
        {toastMessage && (
          <div className="absolute top-4 right-4 z-50 bg-emerald-500 text-black px-4 py-2 rounded font-mono text-xs font-bold shadow-xl flex items-center gap-2 animate-in slide-in-from-top duration-200">
            <CheckCircle2 className="w-4 h-4" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Header Bar */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-neutral-950 via-[#141414] to-neutral-950 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded bg-amber-400 text-black flex items-center justify-center font-black text-sm shadow">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-['Oswald'] font-bold text-lg sm:text-xl text-white uppercase tracking-wider">
                  {isNew ? 'TAMBAH MODUL BAHARU' : `KEMASKINI: ${title || 'MODUL'}`}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-400/20 text-amber-300 border border-amber-400/40 uppercase">
                  {level === 'level_1' && 'TAHAP 1 (PEMULA)'}
                  {level === 'level_2' && 'TAHAP 2 (PENGAMAL)'}
                  {level === 'level_3' && 'TAHAP 3 (MAHIR)'}
                </span>
              </div>
              <p className="text-xs text-neutral-400 font-sans">
                Urus tajuk modul, penerangan silibus, dan pautan video pelajaran interaktif.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-white rounded hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body: Form */}
        <form onSubmit={handleSave} className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1">
          {/* Top Row: Module Metadata */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 bg-neutral-900/60 border border-white/10 rounded-lg">
            <div className="md:col-span-8 space-y-1">
              <label className="text-xs font-mono uppercase text-white font-bold block">
                Tajuk Modul <span className="text-amber-400">*</span>
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="cth: Modul 2: Bagaimana Model AI Belajar & Dilatih"
                className="w-full px-3.5 py-2.5 bg-neutral-950 border border-white/20 text-white font-sans rounded text-sm focus:outline-none focus:border-amber-400 font-bold"
              />
            </div>

            <div className="md:col-span-4 space-y-1">
              <label className="text-xs font-mono uppercase text-white font-bold block">
                Tahap Silibus
              </label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value as CourseLevel)}
                className="w-full px-3 py-2.5 bg-neutral-950 border border-white/20 text-white rounded text-xs font-mono focus:outline-none focus:border-amber-400"
              >
                <option value="level_1">Tahap 1: Asas &amp; Pengenalan</option>
                <option value="level_2">Tahap 2: Praktikal &amp; Alatan</option>
                <option value="level_3">Tahap 3: Arkitektur &amp; RAG</option>
              </select>
            </div>

            <div className="md:col-span-12 space-y-1">
              <label className="text-xs font-mono uppercase text-neutral-400 block">
                Penerangan Ringkas Modul
              </label>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Huraikan objektif dan konsep yang terkandung dalam modul ini..."
                className="w-full px-3.5 py-2 bg-neutral-950 border border-white/15 text-white rounded text-xs font-sans focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          {/* Middle Row: Lessons Manager with Tabs */}
          <div className="border border-white/15 rounded-lg overflow-hidden bg-neutral-950">
            {/* Lessons Navigation Bar */}
            <div className="p-3 bg-neutral-900 border-b border-white/10 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="font-['Oswald'] text-sm uppercase tracking-wider text-white font-bold flex items-center gap-1.5">
                  <Video className="w-4 h-4 text-amber-400" />
                  <span>SENARAI PELAJARAN VIDEO ({lessons.length})</span>
                </span>
              </div>

              <button
                type="button"
                onClick={handleAddLesson}
                className="px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-black font-sans font-bold text-xs uppercase tracking-wider rounded flex items-center gap-1.5 transition-colors cursor-pointer shadow"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Tambah Pelajaran</span>
              </button>
            </div>

            {/* Lesson Tabs Strip */}
            <div className="flex items-center gap-2 p-2.5 bg-black/70 overflow-x-auto border-b border-white/10">
              {lessons.map((les, idx) => (
                <div
                  key={les.id}
                  onClick={() => setActiveLessonIndex(idx)}
                  className={`flex items-center gap-2 px-3 py-2 rounded text-xs font-mono cursor-pointer transition-all whitespace-nowrap border shrink-0 ${
                    activeLessonIndex === idx
                      ? 'bg-amber-400 text-black font-bold border-amber-400 shadow-lg ring-1 ring-amber-400'
                      : 'bg-neutral-900 text-neutral-300 border-white/10 hover:text-white hover:border-white/30'
                  }`}
                >
                  <span className={`font-black px-1.5 py-0.5 rounded text-[11px] ${activeLessonIndex === idx ? 'bg-black text-amber-400' : 'bg-black/40 text-neutral-400'}`}>
                    Pelajaran {idx + 1}
                  </span>
                  <span className="max-w-[160px] truncate font-sans">
                    {les.title.replace(/^Pelajaran\s*\d+[:\-]?\s*/i, '') || les.title}
                  </span>

                  <div className="flex items-center gap-1 ml-1" onClick={(e) => e.stopPropagation()}>
                    {idx > 0 && (
                      <button
                        type="button"
                        onClick={() => handleMoveLesson(idx, 'up')}
                        className="p-0.5 hover:bg-black/20 rounded"
                        title="Alih ke kiri"
                      >
                        <ArrowUp className="w-2.5 h-2.5" />
                      </button>
                    )}
                    {idx < lessons.length - 1 && (
                      <button
                        type="button"
                        onClick={() => handleMoveLesson(idx, 'down')}
                        className="p-0.5 hover:bg-black/20 rounded"
                        title="Alih ke kanan"
                      >
                        <ArrowDown className="w-2.5 h-2.5" />
                      </button>
                    )}
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={handleAddLesson}
                className="px-3 py-2 rounded text-xs font-mono bg-neutral-900/80 hover:bg-neutral-800 text-amber-400 hover:text-amber-300 border border-dashed border-amber-400/40 flex items-center gap-1 cursor-pointer shrink-0 transition-colors"
                title="Tambah pelajaran baharu dalam modul ini"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Tambah Pelajaran {lessons.length + 1}</span>
              </button>
            </div>

            {/* Active Lesson Editor Card */}
            {currentLesson && (
              <div className="p-4 sm:p-5 space-y-4 bg-[#101010]">
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded text-xs font-mono font-bold bg-amber-400 text-black uppercase">
                      PELAJARAN #{activeLessonIndex + 1}
                    </span>
                    <span className="text-xs text-neutral-400 font-sans truncate max-w-md font-bold text-white">
                      {currentLesson.title}
                    </span>
                  </div>

                  {lessons.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveLesson(activeLessonIndex)}
                      className="px-2.5 py-1 text-xs text-red-400 hover:text-red-300 hover:bg-red-950/40 rounded border border-red-500/20 font-mono flex items-center gap-1 transition-colors cursor-pointer"
                      title="Padam pelajaran ini"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Padam Pelajaran</span>
                    </button>
                  )}
                </div>

                {/* Lesson Title & Duration */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                  <div className="sm:col-span-9 space-y-1">
                    <label className="text-xs font-mono uppercase text-neutral-300 font-bold block">
                      Tajuk Pelajaran <span className="text-amber-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={currentLesson.title}
                      onChange={(e) => handleUpdateActiveLesson('title', e.target.value)}
                      placeholder="cth: Pelajaran 3: Tiga Jenis Pembelajaran: Supervised, Unsupervised & RL"
                      className="w-full px-3 py-2 bg-neutral-900 border border-white/15 text-white rounded text-xs focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="sm:col-span-3 space-y-1">
                    <label className="text-xs font-mono uppercase text-neutral-300 font-bold block">
                      Durasi (Minit)
                    </label>
                    <input
                      type="text"
                      value={currentLesson.duration}
                      onChange={(e) => handleUpdateActiveLesson('duration', e.target.value)}
                      placeholder="cth: 18 minit"
                      className="w-full px-3 py-2 bg-neutral-900 border border-white/15 text-white rounded text-xs font-mono focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                {/* Video URL Input & Presets & Player */}
                <div className="p-4 bg-neutral-950 border border-amber-400/30 rounded space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <label className="text-xs font-mono uppercase text-white font-bold flex items-center gap-1.5">
                      <Video className="w-3.5 h-3.5 text-amber-400" />
                      <span>Pautan Video Pelajaran (YouTube / Vimeo / Embed)</span>
                    </label>
                    <span className="text-[10px] font-mono text-neutral-400">
                      Format video akan diselaraskan automatik ke paparan teater
                    </span>
                  </div>

                  <input
                    type="url"
                    required
                    value={currentLesson.videoUrl}
                    onChange={(e) => handleUpdateActiveLesson('videoUrl', e.target.value)}
                    placeholder="cth: https://www.youtube.com/watch?v=... atau https://youtu.be/..."
                    className="w-full px-3 py-2 bg-neutral-900 border border-white/20 text-white rounded text-xs font-mono focus:outline-none focus:border-amber-400"
                  />

                  {/* 1-Click Preset AI Videos */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[10px] font-mono uppercase text-neutral-400 font-bold">
                      Pilihan Pantas Video Contoh:
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {PRESET_VIDEOS.map((vid, vIdx) => (
                        <button
                          key={vIdx}
                          type="button"
                          onClick={() => handleUpdateActiveLesson('videoUrl', vid.url)}
                          className={`p-2 rounded text-left border text-xs cursor-pointer transition-all flex flex-col justify-between ${
                            currentLesson.videoUrl === vid.url
                              ? 'bg-amber-400/20 border-amber-400 text-white'
                              : 'bg-neutral-900 border-white/10 text-neutral-400 hover:text-white'
                          }`}
                        >
                          <span className="font-bold truncate flex items-center gap-1">
                            <Play className="w-2.5 h-2.5 text-amber-400 fill-amber-400 shrink-0" />
                            <span className="truncate">{vid.name}</span>
                          </span>
                          <span className="text-[9px] text-neutral-500 truncate mt-0.5">{vid.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Live Player Preview for this lesson */}
                  {currentLesson.videoUrl && (
                    <div className="space-y-1.5 pt-2 border-t border-white/10">
                      <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
                        <span className="flex items-center gap-1 text-amber-400 font-bold">
                          <Play className="w-3 h-3 fill-amber-400" />
                          Pratonton Pemain Video Pelajaran:
                        </span>
                        <span className="text-[10px] text-neutral-500 truncate max-w-sm">
                          {formatEmbedVideoUrl(currentLesson.videoUrl)}
                        </span>
                      </div>
                      <div className="relative aspect-video w-full rounded overflow-hidden bg-black border border-white/20 shadow-md">
                        <iframe
                          src={formatEmbedVideoUrl(currentLesson.videoUrl)}
                          title={currentLesson.title}
                          className="w-full h-full border-0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Lesson Summary & Key Points */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-mono uppercase text-neutral-400 block font-bold">
                      Ringkasan Pelajaran
                    </label>
                    <textarea
                      rows={3}
                      value={currentLesson.summary}
                      onChange={(e) => handleUpdateActiveLesson('summary', e.target.value)}
                      placeholder="Ringkasan konsep yang dipelajari dalam video ini..."
                      className="w-full px-3 py-2 bg-neutral-900 border border-white/15 text-white rounded text-xs font-sans focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono uppercase text-neutral-400 block font-bold">
                      Latihan Amali (Prompt Practice)
                    </label>
                    <textarea
                      rows={3}
                      value={currentLesson.practicePrompt || ''}
                      onChange={(e) => handleUpdateActiveLesson('practicePrompt', e.target.value)}
                      placeholder="Arahan amali atau soalan latihan untuk pelajar..."
                      className="w-full px-3 py-2 bg-neutral-900 border border-white/15 text-white rounded text-xs font-sans focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                {/* Key Points (1 line = 1 point) */}
                <div className="space-y-1">
                  <label className="text-xs font-mono uppercase text-neutral-400 block font-bold">
                    Poin Utama Pembelajaran (1 Baris = 1 Poin)
                  </label>
                  <textarea
                    rows={3}
                    value={currentLesson.keyPoints.join('\n')}
                    onChange={(e) => {
                      const lines = e.target.value.split('\n').filter(Boolean);
                      handleUpdateActiveLesson('keyPoints', lines.length > 0 ? lines : ['Konsep Utama']);
                    }}
                    placeholder="Poin 1&#10;Poin 2&#10;Poin 3"
                    className="w-full px-3 py-2 bg-neutral-900 border border-white/15 text-white rounded text-xs font-mono focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Bottom Actions */}
          <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              {!isNew && onDeleteModule && (
                <div>
                  {!deleteConfirm ? (
                    <button
                      type="button"
                      onClick={() => setDeleteConfirm(true)}
                      className="px-3 py-2 rounded bg-neutral-900 hover:bg-red-950/50 text-red-400 border border-red-500/20 text-xs font-mono transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Padam Modul Ini</span>
                    </button>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-red-400 font-bold">Pasti padam modul ini?</span>
                      <button
                        type="button"
                        onClick={() => {
                          onDeleteModule(moduleId);
                          onClose();
                        }}
                        className="px-3 py-1 bg-red-600 hover:bg-red-500 text-white rounded text-xs font-sans font-bold cursor-pointer"
                      >
                        Ya, Padam
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeleteConfirm(false)}
                        className="px-2 py-1 bg-neutral-800 text-neutral-300 rounded text-xs font-mono cursor-pointer"
                      >
                        Batal
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="flex items-center gap-3 self-end sm:self-auto">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded bg-neutral-900 hover:bg-neutral-800 text-neutral-300 text-xs font-mono transition-colors cursor-pointer"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded bg-amber-400 hover:bg-amber-300 text-black font-sans font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{isNew ? 'Terbitkan Modul Baharu' : 'Simpan Kemaskini Modul'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
