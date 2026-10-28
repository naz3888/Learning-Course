import React, { useState } from 'react';
import { X, Award, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CourseLevel, LevelQuiz } from '../types';
import { QUIZZES_DATA } from '../data/coursesData';

interface QuizModalProps {
  level: CourseLevel;
  isOpen: boolean;
  onClose: () => void;
  onSaveScore: (level: CourseLevel, score: number) => void;
  onViewCertificate: () => void;
}

export const QuizModal: React.FC<QuizModalProps> = ({
  level,
  isOpen,
  onClose,
  onSaveScore,
  onViewCertificate
}) => {
  if (!isOpen) return null;

  const quiz: LevelQuiz = QUIZZES_DATA[level];
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [currentScore, setCurrentScore] = useState<number>(0);

  const handleSelect = (questionIndex: number, optionIndex: number) => {
    if (isSubmitted) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [questionIndex]: optionIndex
    }));
  };

  const handleSubmit = () => {
    let correct = 0;
    quiz.questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        correct++;
      }
    });

    const calculatedScore = Math.round((correct / quiz.questions.length) * 100);
    setCurrentScore(calculatedScore);
    setIsSubmitted(true);
    onSaveScore(level, calculatedScore);

    if (calculatedScore >= quiz.passingScore) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.5 }
      });
    }
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
    setCurrentScore(0);
  };

  const isAllAnswered = Object.keys(selectedAnswers).length === quiz.questions.length;
  const isPassed = currentScore >= quiz.passingScore;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#111111] border border-white/15 shadow-2xl max-w-2xl w-full overflow-hidden max-h-[90vh] flex flex-col text-white">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-[#161616]">
          <div>
            <div className="text-[10px] font-sans font-bold uppercase tracking-widest text-amber-400">
              Penilaian Kefahaman
            </div>
            <h3 className="font-['Oswald'] text-2xl font-bold tracking-wide text-white uppercase mt-0.5">
              {quiz.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-neutral-900 border border-white/10 hover:bg-neutral-800 flex items-center justify-center text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 font-sans">
          {isSubmitted && (
            <div className={`p-5 border ${
              isPassed ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-200' : 'bg-amber-950/60 border-amber-500/50 text-amber-200'
            } flex items-center justify-between`}>
              <div>
                <div className="text-sm font-bold uppercase tracking-wider">
                  {isPassed ? 'Tahniah! Anda Berjaya Lulus' : 'Belum Mencapai Gred Lulus'}
                </div>
                <div className="text-xs mt-0.5">
                  Skor anda: <span className="font-bold font-mono text-white">{currentScore}%</span> (Sasaran Lulus: {quiz.passingScore}%)
                </div>
              </div>

              {isPassed && (
                <button
                  onClick={() => { onClose(); onViewCertificate(); }}
                  className="px-4 py-2 font-bold uppercase tracking-wider text-xs bg-white text-black hover:bg-neutral-200 transition-colors"
                >
                  Lihat Sijil &rarr;
                </button>
              )}
            </div>
          )}

          <div className="space-y-6">
            {quiz.questions.map((q, qIdx) => {
              const selectedOpt = selectedAnswers[qIdx];
              const isCorrect = selectedOpt === q.correctIndex;

              return (
                <div key={q.id} className="p-5 bg-black border border-white/10 space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="font-mono font-bold text-xs text-amber-400 bg-neutral-900 px-2 py-0.5 border border-white/10 shrink-0">
                      Q{qIdx + 1}
                    </span>
                    <h4 className="text-sm font-semibold text-white leading-relaxed">
                      {q.question}
                    </h4>
                  </div>

                  {/* Options */}
                  <div className="space-y-2 pt-1">
                    {q.options.map((opt, oIdx) => {
                      const isChosen = selectedOpt === oIdx;
                      let optionStyle = 'bg-[#141414] border-white/10 text-neutral-300 hover:border-white/30';

                      if (isSubmitted) {
                        if (oIdx === q.correctIndex) {
                          optionStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200';
                        } else if (isChosen && !isCorrect) {
                          optionStyle = 'bg-red-950/80 border-red-500 text-red-200';
                        }
                      } else if (isChosen) {
                        optionStyle = 'bg-white text-black font-semibold border-white';
                      }

                      return (
                        <div
                          key={oIdx}
                          onClick={() => handleSelect(qIdx, oIdx)}
                          className={`p-3 border text-xs cursor-pointer transition-all flex items-center justify-between ${optionStyle}`}
                        >
                          <span>{opt}</span>
                          {isSubmitted && oIdx === q.correctIndex && (
                            <span className="text-[10px] font-bold uppercase text-emerald-400">Betul</span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Explanation after submission */}
                  {isSubmitted && (
                    <div className="p-3 bg-neutral-900 border-l-2 border-amber-400 text-[11px] text-neutral-300 font-sans">
                      <span className="font-bold text-white">Penjelasan:</span> {q.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-6 border-t border-white/10 bg-[#141414] flex items-center justify-between font-sans">
          <div className="text-xs text-neutral-400">
            {Object.keys(selectedAnswers).length}/{quiz.questions.length} soalan dijawab
          </div>

          <div className="flex items-center gap-3">
            {isSubmitted ? (
              <button
                onClick={handleReset}
                className="flex items-center gap-1.5 px-4 py-2 border border-white/20 text-xs font-bold uppercase text-neutral-200 hover:bg-neutral-800"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Uji Semula</span>
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!isAllAnswered}
                className="px-6 py-2.5 bg-white text-black text-xs font-bold uppercase tracking-wider hover:bg-neutral-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                Hantar Jawapan
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
