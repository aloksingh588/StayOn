import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DailyGoal } from '../types';
import {
  X,
  Plus,
  Sparkles,
  Clock,
  BookOpen,
  Calendar,
  Briefcase,
  Loader2,
  CheckCircle2,
} from 'lucide-react';

interface AddGoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'manual' | 'ai';
}

export const AddGoalModal: React.FC<AddGoalModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'manual',
}) => {
  const { student, setDailyGoal, generateAIGoal, isGeneratingGoal, themeMode } = useApp();
  const [activeMode, setActiveMode] = useState<'manual' | 'ai'>(initialMode);

  // Manual Form State
  const [goalTitle, setGoalTitle] = useState('');
  const [moduleName, setModuleName] = useState('Module 2: Product Metrics');
  const [estimatedMinutes, setEstimatedMinutes] = useState(20);
  const [dueDate, setDueDate] = useState('Today');

  // AI Form State
  const [generatedGoal, setGeneratedGoal] = useState<DailyGoal | null>(null);

  if (!isOpen) return null;

  const isDark = themeMode === 'dark';

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!goalTitle.trim()) return;

    const newGoal: DailyGoal = {
      id: 'g-manual-' + Date.now(),
      title: goalTitle.trim(),
      estimatedMinutes,
      completed: false,
      createdAt: 'Just now',
      source: 'manual',
      careerRelevance: `Aligned with ${student.careerProfile.targetRole} target`,
      relatedModuleId: 'mod-2',
    };

    setDailyGoal(newGoal);
    onClose();
  };

  const handleGenerateAI = async () => {
    const goal = await generateAIGoal();
    setGeneratedGoal(goal);
  };

  const handleAcceptAIGoal = () => {
    if (generatedGoal) {
      setDailyGoal(generatedGoal);
      onClose();
    }
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
          className={`absolute top-4 right-4 p-1.5 rounded-lg transition-colors ${
            isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <span
            className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${
              activeMode === 'ai'
                ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
            }`}
          >
            {activeMode === 'ai' ? <Sparkles className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          </span>
          <div>
            <h3 className="text-base font-bold">
              {activeMode === 'ai' ? "Create Goal with AI" : "Add Today's Goal"}
            </h3>
            <p className="text-xs text-slate-400">
              {activeMode === 'ai'
                ? "AI creates a small, personalized goal tailored to your profile & upcoming deadlines"
                : "Set a clear, time-bound micro-commitment for today"}
            </p>
          </div>
        </div>

        {/* Mode Selector */}
        <div
          className={`flex rounded-xl p-1 mb-5 text-xs font-semibold ${
            isDark ? 'bg-slate-800/80' : 'bg-slate-100'
          }`}
        >
          <button
            type="button"
            onClick={() => setActiveMode('manual')}
            className={`flex-1 py-1.5 rounded-lg transition-all ${
              activeMode === 'manual'
                ? isDark
                  ? 'bg-slate-700 text-white shadow-xs'
                  : 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Manual Goal
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveMode('ai');
              if (!generatedGoal) {
                handleGenerateAI();
              }
            }}
            className={`flex-1 py-1.5 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              activeMode === 'ai'
                ? isDark
                  ? 'bg-purple-900/60 text-purple-200 shadow-xs'
                  : 'bg-purple-100 text-purple-900 shadow-xs'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            AI Coach Option
          </button>
        </div>

        {/* MANUAL TAB (Section 9: Goal, Course/Module, Estimated time, Due date) */}
        {activeMode === 'manual' && (
          <form onSubmit={handleManualSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-400 block mb-1.5">
                Goal Title
              </label>
              <input
                type="text"
                value={goalTitle}
                onChange={(e) => setGoalTitle(e.target.value)}
                placeholder="e.g. Revise Product Metrics"
                className={`w-full text-xs p-3 rounded-xl border focus:outline-none focus:ring-2 ${
                  isDark
                    ? 'bg-slate-800 border-slate-700 text-white focus:ring-emerald-500'
                    : 'bg-slate-50 border-slate-300 text-slate-900 focus:ring-slate-900'
                }`}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-1.5">
                  Course / Module
                </label>
                <input
                  type="text"
                  value={moduleName}
                  onChange={(e) => setModuleName(e.target.value)}
                  className={`w-full text-xs p-3 rounded-xl border focus:outline-none ${
                    isDark
                      ? 'bg-slate-800 border-slate-700 text-white'
                      : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-1.5">
                  Estimated Time
                </label>
                <select
                  value={estimatedMinutes}
                  onChange={(e) => setEstimatedMinutes(Number(e.target.value))}
                  className={`w-full text-xs p-3 rounded-xl border focus:outline-none ${
                    isDark
                      ? 'bg-slate-800 border-slate-700 text-white'
                      : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                >
                  <option value={10}>10 minutes</option>
                  <option value={15}>15 minutes</option>
                  <option value={20}>20 minutes</option>
                  <option value={30}>30 minutes</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-400 block mb-1.5">
                Due Date
              </label>
              <input
                type="text"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className={`w-full text-xs p-3 rounded-xl border focus:outline-none ${
                  isDark
                    ? 'bg-slate-800 border-slate-700 text-white'
                    : 'bg-slate-50 border-slate-300 text-slate-900'
                }`}
              />
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className={`px-4 py-2 text-xs font-semibold rounded-xl border ${
                  isDark
                    ? 'border-slate-700 text-slate-300 hover:bg-slate-800'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-bold rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md transition-colors"
              >
                Add Goal
              </button>
            </div>
          </form>
        )}

        {/* AI TAB (Section 9: Upcoming assignment, course deadline, career goal) */}
        {activeMode === 'ai' && (
          <div className="space-y-4">
            <div
              className={`p-3.5 rounded-xl border text-xs ${
                isDark
                  ? 'bg-purple-950/30 border-purple-800/50 text-purple-200'
                  : 'bg-purple-50 border-purple-200 text-purple-900'
              }`}
            >
              <span className="font-semibold block mb-1">AI Context Considered:</span>
              <ul className="space-y-1 text-[11px] opacity-90 list-disc list-inside">
                <li>Upcoming: Product Strategy Case (Due in 4 days)</li>
                <li>Revision required: Product Metrics & North Stars</li>
                <li>Target Role: {student.careerProfile.targetRole} (Current: {student.careerProfile.currentRole})</li>
              </ul>
            </div>

            {isGeneratingGoal ? (
              <div className="py-8 flex flex-col items-center justify-center text-slate-400">
                <Loader2 className="w-6 h-6 animate-spin text-purple-400 mb-2" />
                <span className="text-xs">Synthesizing high-impact micro goal...</span>
              </div>
            ) : generatedGoal ? (
              <div
                className={`p-4 rounded-xl border transition-all ${
                  isDark
                    ? 'bg-slate-800/80 border-purple-500/40 text-slate-100'
                    : 'bg-white border-purple-200 text-slate-900 shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between text-xs text-purple-400 font-semibold mb-2">
                  <span className="flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    AI Recommendation
                  </span>
                  <span className="flex items-center gap-1 text-slate-400">
                    <Clock className="w-3.5 h-3.5" />
                    {generatedGoal.estimatedMinutes} min
                  </span>
                </div>
                <p className="text-sm font-semibold leading-snug">{generatedGoal.title}</p>
                {generatedGoal.careerRelevance && (
                  <p className="text-xs text-slate-400 mt-2 flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-slate-500" />
                    {generatedGoal.careerRelevance}
                  </p>
                )}
              </div>
            ) : null}

            <div className="pt-2 flex justify-between items-center">
              <button
                type="button"
                onClick={handleGenerateAI}
                disabled={isGeneratingGoal}
                className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-colors ${
                  isDark
                    ? 'border-slate-700 text-slate-300 hover:bg-slate-800'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                Regenerate Option
              </button>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className={`px-4 py-2 text-xs font-semibold rounded-xl border ${
                    isDark
                      ? 'border-slate-700 text-slate-300 hover:bg-slate-800'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleAcceptAIGoal}
                  disabled={!generatedGoal || isGeneratingGoal}
                  className="px-5 py-2 text-xs font-bold rounded-xl bg-purple-500 hover:bg-purple-400 text-white shadow-md transition-colors"
                >
                  Add Goal
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
