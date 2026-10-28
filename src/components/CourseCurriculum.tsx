import React, { useState } from 'react';
import { CheckCircle2, Circle, ChevronDown, ChevronUp, Clock, Play, Edit3, Plus, Layers } from 'lucide-react';
import { Module, Lesson } from '../types';

interface CourseCurriculumProps {
  modules: Module[];
  selectedLessonId: string;
  onSelectLesson: (lesson: Lesson) => void;
  completedLessonIds: string[];
  onToggleComplete: (lessonId: string, e?: React.MouseEvent) => void;
  isAdmin?: boolean;
  onEditModule?: (mod: Module, lessonIndex?: number) => void;
  onAddModule?: () => void;
}

export const CourseCurriculum: React.FC<CourseCurriculumProps> = ({
  modules,
  selectedLessonId,
  onSelectLesson,
  completedLessonIds,
  onToggleComplete,
  isAdmin = false,
  onEditModule,
  onAddModule
}) => {
  const [collapsedModules, setCollapsedModules] = useState<Record<string, boolean>>({});

  const toggleModule = (modId: string) => {
    setCollapsedModules(prev => ({
      ...prev,
      [modId]: !prev[modId]
    }));
  };

  return (
    <div className="space-y-4">
      <div className="pb-1 border-b border-white/10 flex items-center justify-between gap-2">
        <div>
          <h3 className="font-['Oswald'] text-2xl font-bold tracking-wide text-white uppercase">
            SENARAI MODUL & PELAJARAN
          </h3>
          <p className="font-sans text-xs text-neutral-400 mt-0.5">
            Pilih mana-mana video untuk dimainkan dalam ruang pembelajaran.
          </p>
        </div>

        {isAdmin && onAddModule && (
          <button
            type="button"
            onClick={onAddModule}
            className="px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-black font-sans font-bold text-xs uppercase tracking-wider rounded flex items-center gap-1.5 transition-colors cursor-pointer shadow shrink-0"
            title="Tambah modul silibus baharu"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Tambah Modul</span>
          </button>
        )}
      </div>

      <div className="space-y-3">
        {modules.map((mod, modIndex) => {
          const isCollapsed = collapsedModules[mod.id];
          const completedCount = mod.lessons.filter(l => completedLessonIds.includes(l.id)).length;
          const isAllCompleted = completedCount === mod.lessons.length && mod.lessons.length > 0;

          return (
            <div
              key={mod.id}
              className="bg-[#0e0e0e] border border-white/10 overflow-hidden shadow-xl transition-all"
            >
              {/* Module Header Bar */}
              <div
                onClick={() => toggleModule(mod.id)}
                className="flex items-center justify-between p-4 bg-[#141414] hover:bg-neutral-800 cursor-pointer transition-colors"
              >
                <div className="min-w-0 pr-3 flex-1">
                  <div className="flex items-center gap-2 text-[10px] text-neutral-400 font-sans font-bold uppercase tracking-wider">
                    <span className="text-amber-400">MODUL 0{modIndex + 1}</span>
                    <span>·</span>
                    <span>{mod.lessons.length} Pelajaran</span>
                    <span>·</span>
                    <span className={isAllCompleted ? 'text-emerald-400 font-bold' : 'text-neutral-400'}>
                      {completedCount}/{mod.lessons.length} Selesai
                    </span>
                  </div>
                  <div className="font-['Oswald'] text-base font-bold text-white uppercase tracking-wide truncate mt-0.5">
                    {mod.title}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {isAdmin && onEditModule && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onEditModule(mod);
                      }}
                      className="px-2 py-1 bg-neutral-900 hover:bg-amber-400 hover:text-black border border-white/15 text-neutral-300 rounded text-[11px] font-mono flex items-center gap-1 transition-colors cursor-pointer"
                      title={`Edit tajuk, silibus & video untuk ${mod.title}`}
                    >
                      <Edit3 className="w-3 h-3 text-amber-400" />
                      <span>Edit Modul</span>
                    </button>
                  )}

                  <div className="text-neutral-400 p-1">
                    {isCollapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
                  </div>
                </div>
              </div>

              {/* Lesson Items */}
              {!isCollapsed && (
                <div className="border-t border-white/10 divide-y divide-white/5 bg-[#0e0e0e]">
                  {mod.lessons.map((lesson, lessonIdx) => {
                    const isSelected = selectedLessonId === lesson.id;
                    const isCompleted = completedLessonIds.includes(lesson.id);

                    return (
                      <div
                        key={lesson.id}
                        onClick={() => onSelectLesson(lesson)}
                        className={`flex items-center justify-between p-3.5 cursor-pointer transition-colors ${
                          isSelected
                            ? 'bg-neutral-900 border-l-2 border-amber-400'
                            : 'hover:bg-neutral-900/50'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          {/* Minimalist Checkbox */}
                          <button
                            type="button"
                            onClick={(e) => onToggleComplete(lesson.id, e)}
                            className="shrink-0 text-neutral-400 hover:text-white p-0.5"
                            title={isCompleted ? "Tandakan belum selesai" : "Tandakan telah selesai"}
                          >
                            {isCompleted ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            ) : (
                              <Circle className="w-4 h-4 text-neutral-600" />
                            )}
                          </button>

                          <div className="min-w-0">
                            <div className={`text-xs font-sans leading-snug ${
                              isSelected ? 'text-white font-bold' : 'text-neutral-300'
                            }`}>
                              {lesson.title}
                            </div>
                            <div className="flex items-center gap-2 text-[10px] text-neutral-400 mt-0.5 font-mono">
                              <span className="text-amber-400/90 font-bold">Pelajaran {lessonIdx + 1}</span>
                              <span>·</span>
                              <span>{lesson.duration}</span>
                              <span>·</span>
                              <span>{lesson.timestamps.length} Bab</span>
                            </div>
                          </div>
                        </div>

                        <div className="shrink-0 pl-3 flex items-center gap-1.5">
                          {isAdmin && onEditModule && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                onEditModule(mod, lessonIdx);
                              }}
                              className="px-2 py-1 bg-amber-400/20 hover:bg-amber-400 hover:text-black border border-amber-400/40 text-amber-300 rounded text-[10px] font-mono flex items-center gap-1 transition-all cursor-pointer shadow-sm"
                              title={`Edit butiran & pautan video untuk Pelajaran ${lessonIdx + 1}`}
                            >
                              <Edit3 className="w-2.5 h-2.5" />
                              <span>Edit P{lessonIdx + 1} &amp; Video</span>
                            </button>
                          )}

                          <span className={`text-[10px] font-sans font-bold uppercase tracking-wider px-2.5 py-1 transition-colors ${
                            isSelected
                              ? 'bg-white text-black'
                              : 'text-neutral-400 bg-neutral-900 border border-white/10'
                          }`}>
                            {isSelected ? 'Dimainkan' : 'Tonton'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
