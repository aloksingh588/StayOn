import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SAMPLE_CASE_STUDY_QUESTIONS } from '../data/mockData';
import {
  X,
  Zap,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Sparkles,
  HelpCircle,
  Briefcase,
} from 'lucide-react';

interface InteractiveStudyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InteractiveStudyModal: React.FC<InteractiveStudyModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { student, completeMicroCaseStudy } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showRationale, setShowRationale] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  if (!isOpen) return null;

  const currentQ = SAMPLE_CASE_STUDY_QUESTIONS[currentIndex];

  const handleSelect = (optionId: string) => {
    if (showRationale) return;
    setSelectedOption(optionId);
    setShowRationale(true);

    const option = currentQ.options.find((o) => o.id === optionId);
    if (option?.isCorrect) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < SAMPLE_CASE_STUDY_QUESTIONS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setShowRationale(false);
    } else {
      setIsFinished(true);
      completeMicroCaseStudy(score + (currentQ.options.find((o) => o.id === selectedOption)?.isCorrect ? 1 : 0));
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setShowRationale(false);
    setScore(0);
    setIsFinished(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-lg"
        >
          <X className="w-5 h-5" />
        </button>

        {!isFinished ? (
          <div>
            {/* Header */}
            <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-amber-700" />
                </span>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    3-Minute Micro Case Study & Knowledge Check
                  </h3>
                  <span className="text-[11px] text-slate-500">
                    P0 Criterion #7 & P1: Active, practical application over passive video rewatching
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs font-bold text-slate-900">
                  Question {currentIndex + 1} of {SAMPLE_CASE_STUDY_QUESTIONS.length}
                </span>
                <span className="text-[11px] text-slate-400 block">30 sec / check</span>
              </div>
            </div>

            {/* Scenario Box */}
            <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                <Briefcase className="w-3.5 h-3.5 text-slate-500" />
                Real-World PM Scenario:
              </div>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                {currentQ.scenario}
              </p>
            </div>

            {/* Question */}
            <div className="mt-4">
              <h4 className="text-sm font-bold text-slate-900 flex items-start gap-2">
                <HelpCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{currentQ.question}</span>
              </h4>

              {/* Options */}
              <div className="mt-3 space-y-2">
                {currentQ.options.map((opt) => {
                  let optStyle = 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/50';

                  if (showRationale) {
                    if (opt.isCorrect) {
                      optStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-medium';
                    } else if (selectedOption === opt.id) {
                      optStyle = 'border-rose-300 bg-rose-50 text-rose-950';
                    } else {
                      optStyle = 'border-slate-100 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleSelect(opt.id)}
                      disabled={showRationale}
                      className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex items-start gap-3 ${optStyle}`}
                    >
                      <span className="w-5 h-5 rounded-full border border-slate-300 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5 bg-white">
                        {opt.id.toUpperCase()}
                      </span>
                      <div className="flex-1">
                        <span>{opt.text}</span>
                        {showRationale && (opt.isCorrect || selectedOption === opt.id) && (
                          <p
                            className={`text-[11px] mt-2 pt-2 border-t font-normal leading-relaxed ${
                              opt.isCorrect
                                ? 'text-emerald-800 border-emerald-200'
                                : 'text-rose-800 border-rose-200'
                            }`}
                          >
                            <strong>{opt.isCorrect ? 'Correct!' : 'Not quite:'}</strong> {opt.rationale}
                          </p>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Footer Navigation */}
            {showRationale && (
              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500">
                  Directly tests principles needed for {student.careerProfile.targetRole} role.
                </span>
                <button
                  onClick={handleNext}
                  className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
                >
                  <span>
                    {currentIndex < SAMPLE_CASE_STUDY_QUESTIONS.length - 1 ? 'Next Question' : 'Finish & Mark Completed'}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-6">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Case Study & Knowledge Check Completed!</h3>
            <p className="text-xs text-slate-600 max-w-md mx-auto mt-2 leading-relaxed">
              You applied critical system design thinking in under 3 minutes. Your active consistency is restored and your learning status has been transitioned to <strong>Re-engaged</strong>.
            </p>

            <div className="my-5 inline-flex items-center gap-4 px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs">
              <span className="text-slate-600">
                Score: <strong>{score} of 3</strong>
              </span>
              <span className="text-slate-300">|</span>
              <span className="text-emerald-700 font-semibold">
                Daily Goal: Marked Done
              </span>
            </div>

            <div>
              <button
                onClick={handleReset}
                className="px-6 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-all shadow-sm"
              >
                Return to Learning Dashboard
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
