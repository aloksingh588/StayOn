import React from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  FileText,
  Clock,
  Sparkles,
  ArrowRight,
  CheckCircle,
  Lightbulb,
  BookOpen,
  Target,
} from 'lucide-react';
import { MissedClass } from '../types';

interface MissedClassModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartCaseStudy?: () => void;
}

export const MissedClassModal: React.FC<MissedClassModalProps> = ({
  isOpen,
  onClose,
  onStartCaseStudy,
}) => {
  const { student, startMissedClassMicroGoal, themeMode } = useApp();
  const isDark = themeMode === 'dark';

  if (!isOpen) return null;

  const missedClass = student.missedClasses[0];

  if (!missedClass) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
        <div
          className={`rounded-2xl max-w-md w-full p-6 text-center border ${
            isDark ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
          }`}
        >
          <CheckCircle className="w-10 h-10 text-emerald-400 mx-auto mb-2" />
          <h3 className="text-base font-bold">All Caught Up!</h3>
          <p className="text-xs text-slate-400 mt-1">You don't have any pending missed classes.</p>
          <button
            onClick={onClose}
            className="mt-4 px-4 py-2 bg-emerald-500 text-slate-950 rounded-xl text-xs font-bold"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  const handleStartRecovery = () => {
    startMissedClassMicroGoal(missedClass);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
      <div
        className={`rounded-2xl max-w-2xl w-full p-6 shadow-2xl border relative max-h-[90vh] overflow-y-auto ${
          isDark
            ? 'bg-slate-900 border-slate-800 text-slate-100'
            : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-200 p-1 rounded-lg"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Section Header */}
        <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <span>Missed Class Recovery (P0 Criterion #8)</span>
        </div>

        <h3 className="text-lg font-bold mt-1">
          {missedClass.title}
        </h3>

        <div className="flex items-center gap-3 text-xs text-slate-400 mt-1 pb-4 border-b border-slate-800">
          <span>Scheduled: {missedClass.scheduledDate}</span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            Original duration: {missedClass.fullDurationMinutes} mins (Skip full replay)
          </span>
          <span>•</span>
          <span className="text-emerald-400 font-semibold">AI Summary: 90 sec</span>
        </div>

        {/* KEY CONCEPTS (Section 15: North Star Metric, Input metrics, Output metrics) */}
        <div className="mt-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Lightbulb className="w-4 h-4 text-amber-400" />
            Key Concepts
          </h4>

          <div className="mt-2 space-y-2">
            {missedClass.aiSummary.keyConcepts.map((concept, idx) => (
              <div
                key={idx}
                className={`text-xs p-3 rounded-xl border flex items-start gap-2.5 leading-relaxed ${
                  isDark
                    ? 'bg-slate-800/60 border-slate-700/80 text-slate-200'
                    : 'bg-slate-50 border-slate-200 text-slate-800'
                }`}
              >
                <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                  •
                </span>
                <span>{concept}</span>
              </div>
            ))}
          </div>
        </div>

        {/* AI SUMMARY & TAKEAWAYS */}
        <div className="mt-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-blue-400" />
            AI Executive Summary
          </h4>
          <ul className="mt-2 space-y-1.5">
            {missedClass.aiSummary.coreTakeaways.map((takeaway, idx) => (
              <li
                key={idx}
                className="text-xs text-slate-300 flex items-start gap-2 leading-relaxed"
              >
                <span className="text-amber-400 font-bold">•</span>
                <span>{takeaway}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* WHY IT MATTERS FOR UPCOMING ASSIGNMENT */}
        <div
          className={`mt-4 p-3.5 rounded-xl border text-xs ${
            isDark
              ? 'bg-amber-950/20 border-amber-500/30 text-amber-200'
              : 'bg-amber-50 border-amber-200 text-amber-900'
          }`}
        >
          <span className="font-bold block mb-1">Why this matters right now:</span>
          <p className="text-[11px] leading-relaxed opacity-95">
            {missedClass.aiSummary.whyItMattersForUpcoming}
          </p>
        </div>

        {/* RECOVERY GOAL (Section 15) */}
        <div
          className={`mt-5 p-4 rounded-xl border ${
            isDark
              ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-100'
              : 'bg-emerald-50 border-emerald-300 text-emerald-950'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Target className="w-4 h-4" />
              </span>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block">
                  Recommended Recovery Goal
                </span>
                <span className="text-xs font-bold">15-minute quick restart</span>
              </div>
            </div>
            <span className="text-xs text-emerald-400 font-semibold">15 min</span>
          </div>

          <p className="text-xs mt-2.5 font-medium leading-relaxed">
            "Spend 15 minutes reviewing the summary and complete the 3-question practice case."
          </p>

          <div className="mt-4 flex justify-end gap-2">
            <button
              onClick={onClose}
              className={`px-3 py-1.5 text-xs font-semibold rounded-xl border ${
                isDark
                  ? 'border-slate-700 text-slate-300 hover:bg-slate-800'
                  : 'border-slate-300 text-slate-700 hover:bg-slate-100'
              }`}
            >
              Maybe Later
            </button>
            <button
              onClick={handleStartRecovery}
              className="px-5 py-2 text-xs font-bold rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-colors flex items-center gap-1.5 shadow-md"
            >
              <span>Start Recovery</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
