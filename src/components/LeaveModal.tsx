import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  CalendarOff,
  X,
  ShieldCheck,
  Briefcase,
  Users,
  Heart,
  Coffee,
  CheckCircle2,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { LeaveRecord } from '../types';

interface LeaveModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LeaveModal: React.FC<LeaveModalProps> = ({ isOpen, onClose }) => {
  const { student, planLeave, themeMode } = useApp();
  const [reasonCategory, setReasonCategory] = useState<LeaveRecord['reasonCategory']>('client_meeting');
  const [reasonNote, setReasonNote] = useState('Important client meeting today.');
  const [submittedAiResponse, setSubmittedAiResponse] = useState<string | null>(null);

  const isDark = themeMode === 'dark';

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    planLeave(reasonCategory, reasonNote);
    setSubmittedAiResponse(
      `Got it. I've marked today as a leave day. Your ${student.streakDays}-day streak is safely protected with zero guilt. Let's plan a small goal for tomorrow.`
    );
  };

  const handlePlanTomorrow = () => {
    setSubmittedAiResponse(null);
    setReasonNote('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
      <div
        className={`w-full max-w-lg rounded-2xl p-6 shadow-2xl relative border ${
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

        {!submittedAiResponse ? (
          <div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center justify-center">
                <CalendarOff className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Take Leave Today</h3>
                <p className="text-xs text-slate-400">
                  Protect your learning momentum & freeze your streak
                </p>
              </div>
            </div>

            {/* Reassuring note (Section 11) */}
            <div
              className={`my-4 p-3.5 rounded-xl border text-xs flex items-start gap-2.5 ${
                isDark
                  ? 'bg-blue-950/30 border-blue-800/40 text-blue-200'
                  : 'bg-blue-50 border-blue-200 text-blue-900'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <span>
                <strong>Zero guilt guarantee:</strong> A planned leave day is never treated as a
                failed learning day. Your {student.streakDays}-day streak remains 100% intact.
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                  Is something important taking priority today?
                </label>
                <div className="grid grid-cols-2 gap-2 mb-3">
                  {[
                    { id: 'client_meeting' as const, label: 'Client Meeting / Work', icon: Briefcase },
                    { id: 'work_overtime' as const, label: 'Sprint Crunch / Deadlines', icon: Briefcase },
                    { id: 'family_commitments' as const, label: 'Family / Personal', icon: Users },
                    { id: 'health_rest' as const, label: 'Health & Recovery', icon: Heart },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setReasonCategory(cat.id)}
                      className={`p-2.5 rounded-xl border text-left text-xs font-medium flex items-center gap-2 transition-all ${
                        reasonCategory === cat.id
                          ? 'border-blue-500 bg-blue-500/20 text-blue-300 font-bold'
                          : isDark
                          ? 'border-slate-800 bg-slate-800/60 text-slate-400 hover:border-slate-700'
                          : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      <cat.icon className="w-3.5 h-3.5 shrink-0" />
                      <span>{cat.label}</span>
                    </button>
                  ))}
                </div>

                <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                  Explain the reason to AI:
                </label>
                <textarea
                  value={reasonNote}
                  onChange={(e) => setReasonNote(e.target.value)}
                  placeholder="e.g. Important client meeting today."
                  rows={3}
                  className={`w-full text-xs p-3 rounded-xl border focus:outline-none focus:ring-2 ${
                    isDark
                      ? 'bg-slate-800 border-slate-700 text-white focus:ring-blue-500'
                      : 'bg-slate-50 border-slate-300 text-slate-900 focus:ring-slate-900'
                  }`}
                  required
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className={`px-4 py-2 text-xs font-semibold rounded-xl border ${
                    isDark
                      ? 'border-slate-700 text-slate-300 hover:bg-slate-800'
                      : 'border-slate-300 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold rounded-xl bg-blue-500 hover:bg-blue-400 text-slate-950 shadow-md transition-colors"
                >
                  Take Leave Today
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* AI RESPONSE VIEW (Section 11) */
          <div className="text-center py-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 className="w-6 h-6" />
            </div>

            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
              Leave Granted · Streak Protected
            </span>

            <div
              className={`mt-3 p-4 rounded-xl border text-xs text-left leading-relaxed ${
                isDark
                  ? 'bg-slate-800/80 border-slate-700 text-slate-200'
                  : 'bg-slate-50 border-slate-200 text-slate-800'
              }`}
            >
              <div className="flex items-center gap-1.5 text-purple-400 font-bold mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI Coach Response</span>
              </div>
              <p>"{submittedAiResponse}"</p>
            </div>

            <div className="mt-5 flex justify-center">
              <button
                onClick={handlePlanTomorrow}
                className="px-6 py-2.5 text-xs font-bold rounded-xl bg-blue-500 hover:bg-blue-400 text-slate-950 transition-colors flex items-center gap-2 shadow-md"
              >
                <span>Plan Tomorrow</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
