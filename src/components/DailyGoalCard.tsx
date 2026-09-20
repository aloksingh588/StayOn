import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  CheckCircle2,
  Circle,
  Sparkles,
  Plus,
  Clock,
  Briefcase,
  CalendarOff,
  Trash2,
  Play,
  Calendar,
  BookOpen,
} from 'lucide-react';
import { AddGoalModal } from './AddGoalModal';

interface DailyGoalCardProps {
  onOpenLeaveModal: () => void;
  onOpenCareerProfile: () => void;
}

export const DailyGoalCard: React.FC<DailyGoalCardProps> = ({
  onOpenLeaveModal,
  onOpenCareerProfile,
}) => {
  const {
    student,
    toggleDailyGoalComplete,
    removeDailyGoal,
    themeMode,
  } = useApp();

  const [isAddGoalModalOpen, setIsAddGoalModalOpen] = useState(false);
  const [addGoalInitialMode, setAddGoalInitialMode] = useState<'manual' | 'ai'>('manual');
  const [isStarted, setIsStarted] = useState(false);

  const hasGoal = !!student.dailyGoal;
  const isGoalCompleted = student.dailyGoal?.completed;
  const isDark = themeMode === 'dark';

  return (
    <>
      <div
        className={`rounded-2xl border p-5 sm:p-6 transition-all ${
          isDark
            ? 'bg-slate-900 border-slate-800 text-slate-100 shadow-sm'
            : 'bg-white border-slate-200 text-slate-900 shadow-2xs'
        }`}
      >
        {/* Card Header */}
        <div
          className={`flex items-center justify-between pb-4 border-b ${
            isDark ? 'border-slate-800' : 'border-slate-100'
          }`}
        >
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Today's Commitment
            </span>
            <h3 className="text-base sm:text-lg font-bold mt-0.5">
              Today's Goal
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenLeaveModal}
              className={`text-xs flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-colors ${
                isDark
                  ? 'border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/80'
                  : 'border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
              title="Plan leave with reason to protect streak"
            >
              <CalendarOff className="w-3.5 h-3.5 text-slate-400" />
              <span>Take Leave Today</span>
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="mt-4">
          {hasGoal ? (
            /* ACTIVE GOAL STATE (Section 8) */
            <div
              className={`rounded-xl border p-4 sm:p-5 transition-all ${
                isGoalCompleted
                  ? isDark
                    ? 'bg-emerald-950/20 border-emerald-500/30'
                    : 'bg-emerald-50/50 border-emerald-200'
                  : isDark
                  ? 'bg-slate-800/60 border-slate-700/80'
                  : 'bg-slate-50/70 border-slate-200/80'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <button
                  onClick={toggleDailyGoalComplete}
                  className="mt-0.5 text-slate-400 hover:text-emerald-500 transition-colors shrink-0"
                  title={isGoalCompleted ? 'Mark as incomplete' : 'Mark as completed'}
                >
                  {isGoalCompleted ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 fill-emerald-500/20" />
                  ) : (
                    <Circle className="w-5 h-5 hover:border-emerald-500" />
                  )}
                </button>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                        isGoalCompleted
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold'
                          : isDark
                          ? 'bg-slate-700 text-slate-300'
                          : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {isGoalCompleted ? '✓ Goal completed' : 'In Progress'}
                    </span>

                    <span className="text-[11px] text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {student.dailyGoal?.estimatedMinutes} min
                    </span>

                    {student.dailyGoal?.source === 'ai_suggested' && (
                      <span className="text-[10px] text-purple-400 font-medium flex items-center gap-1 px-1.5 py-0.2 rounded bg-purple-500/10 border border-purple-500/20">
                        <Sparkles className="w-2.5 h-2.5" />
                        AI Coach
                      </span>
                    )}
                  </div>

                  <p
                    className={`text-sm sm:text-base font-semibold leading-snug ${
                      isGoalCompleted
                        ? 'line-through text-slate-500'
                        : isDark
                        ? 'text-slate-100'
                        : 'text-slate-900'
                    }`}
                  >
                    {student.dailyGoal?.title}
                  </p>

                  {student.dailyGoal?.careerRelevance && (
                    <div className="mt-2 text-xs text-slate-400 flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      <span className="truncate">{student.dailyGoal.careerRelevance}</span>
                    </div>
                  )}
                </div>

                <button
                  onClick={removeDailyGoal}
                  className="text-slate-400 hover:text-red-400 p-1 rounded-lg transition-colors shrink-0"
                  title="Remove goal"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Action Buttons for Active Goal */}
              <div className="mt-4 pt-3 border-t border-slate-700/40 flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  {isGoalCompleted
                    ? 'Great work! Daily streak updated.'
                    : isStarted
                    ? 'Active session in progress...'
                    : 'Ready to learn?'}
                </span>

                <div className="flex gap-2">
                  {!isGoalCompleted && !isStarted && (
                    <button
                      onClick={() => setIsStarted(true)}
                      className="px-4 py-1.5 text-xs font-bold rounded-xl bg-slate-100 hover:bg-white text-slate-900 transition-colors flex items-center gap-1.5 shadow-sm"
                    >
                      <Play className="w-3 h-3 fill-slate-900" />
                      Start
                    </button>
                  )}

                  <button
                    onClick={toggleDailyGoalComplete}
                    className={`px-4 py-1.5 text-xs font-bold rounded-xl transition-all shadow-sm ${
                      isGoalCompleted
                        ? isDark
                          ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950'
                    }`}
                  >
                    {isGoalCompleted ? 'Mark as Incomplete' : 'Mark as Complete'}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* NO GOAL STATE (Section 8 & Section 10 AI Reminder) */
            <div className="space-y-4">
              {/* Supportive AI Reminder Card (Section 10) */}
              <div
                className={`p-4 rounded-xl border flex items-start gap-3.5 ${
                  isDark
                    ? 'bg-purple-950/20 border-purple-800/40 text-slate-200'
                    : 'bg-purple-50/60 border-purple-200 text-purple-950'
                }`}
              >
                <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 border border-purple-500/30 flex items-center justify-center shrink-0 mt-0.5">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <span className="text-xs font-bold text-purple-400 uppercase tracking-wider block">
                    AI Coach
                  </span>
                  <p className="text-sm font-semibold mt-0.5">
                    "You haven't set a goal for today yet."
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    "Your next assignment <strong>Product Strategy Case</strong> is due in 4 days."
                  </p>
                </div>
                <button
                  onClick={() => {
                    setAddGoalInitialMode('ai');
                    setIsAddGoalModalOpen(true);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-purple-500 hover:bg-purple-400 text-white text-xs font-bold shrink-0 transition-colors shadow-sm"
                >
                  Set Today's Goal
                </button>
              </div>

              {/* Empty State Callout with Options */}
              <div
                className={`p-6 rounded-xl border border-dashed text-center ${
                  isDark
                    ? 'border-slate-800 bg-slate-800/30'
                    : 'border-slate-200 bg-slate-50/60'
                }`}
              >
                <p className="text-sm font-medium text-slate-400 mb-4">
                  You haven't set a goal for today.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={() => {
                      setAddGoalInitialMode('manual');
                      setIsAddGoalModalOpen(true);
                    }}
                    className={`px-4 py-2 text-xs font-bold rounded-xl border transition-colors flex items-center gap-1.5 ${
                      isDark
                        ? 'border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200'
                        : 'border-slate-300 bg-white hover:bg-slate-50 text-slate-800'
                    }`}
                  >
                    <Plus className="w-3.5 h-3.5" />
                    + Add Goal
                  </button>

                  <button
                    onClick={() => {
                      setAddGoalInitialMode('ai');
                      setIsAddGoalModalOpen(true);
                    }}
                    className="px-4 py-2 text-xs font-bold rounded-xl bg-purple-500 hover:bg-purple-400 text-white transition-colors flex items-center gap-1.5 shadow-sm"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    Create with AI
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Compact Overview Bar (Section 8) */}
        <div
          className={`mt-5 pt-4 border-t grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs ${
            isDark ? 'border-slate-800 text-slate-400' : 'border-slate-100 text-slate-500'
          }`}
        >
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Course Progress</span>
            <span className="text-sm font-bold text-slate-200 mt-0.5 block">
              {student.courseProgressPercent}%
            </span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Next Assignment</span>
            <span className="text-xs font-semibold text-slate-200 mt-0.5 block truncate">
              {student.upcomingAssignment.title}
            </span>
            <span className="text-[10px] text-amber-400 block">
              Due in {student.upcomingAssignment.daysRemaining} days
            </span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Next Class</span>
            <span className="text-xs font-semibold text-slate-200 mt-0.5 block truncate">
              {student.upcomingClass.title}
            </span>
            <span className="text-[10px] text-emerald-400 block">Tomorrow</span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Weekly Goals</span>
            <span className="text-sm font-bold text-slate-200 mt-0.5 block">
              {student.weeklyGoalsCompleted} / {student.weeklyTargetGoals} completed
            </span>
          </div>
        </div>
      </div>

      <AddGoalModal
        isOpen={isAddGoalModalOpen}
        onClose={() => setIsAddGoalModalOpen(false)}
        initialMode={addGoalInitialMode}
      />
    </>
  );
};
