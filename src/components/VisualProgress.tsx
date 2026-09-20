import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  TrendingUp,
  Award,
  Calendar,
  CheckCircle2,
  Flame,
  Clock,
  BarChart2,
  CalendarOff,
  Users,
  Info,
} from 'lucide-react';

export const VisualProgress: React.FC = () => {
  const { student, themeMode } = useApp();
  const [viewScope, setViewScope] = useState<'weekly' | 'monthly'>('weekly');
  const isDark = themeMode === 'dark';

  return (
    <div
      className={`rounded-2xl border p-5 sm:p-6 transition-all ${
        isDark
          ? 'bg-slate-900 border-slate-800 text-slate-100 shadow-sm'
          : 'bg-white border-slate-200 text-slate-900 shadow-2xs'
      }`}
    >
      {/* Header */}
      <div
        className={`flex items-center justify-between pb-4 border-b ${
          isDark ? 'border-slate-800' : 'border-slate-100'
        }`}
      >
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Learning Progress
          </span>
          <h3 className="text-base sm:text-lg font-bold mt-0.5">
            Consistency & Progress Dashboard
          </h3>
        </div>

        {/* Weekly / Monthly Toggle (as per user sketch Image 3) */}
        <div
          className={`flex rounded-xl p-1 text-xs font-semibold ${
            isDark ? 'bg-slate-800' : 'bg-slate-100'
          }`}
        >
          <button
            onClick={() => setViewScope('weekly')}
            className={`px-3 py-1 rounded-lg transition-all ${
              viewScope === 'weekly'
                ? isDark
                  ? 'bg-slate-700 text-white shadow-xs'
                  : 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Weekly
          </button>
          <button
            onClick={() => setViewScope('monthly')}
            className={`px-3 py-1 rounded-lg transition-all ${
              viewScope === 'monthly'
                ? isDark
                  ? 'bg-slate-700 text-white shadow-xs'
                  : 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Monthly
          </button>
        </div>
      </div>

      {/* Main Metrics Row (Section 14) */}
      {viewScope === 'weekly' ? (
        /* WEEKLY PROGRESS */
        <div className="my-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Goals: 4 / 5 */}
          <div
            className={`rounded-xl p-4 border ${
              isDark ? 'bg-slate-800/60 border-slate-700/70' : 'bg-slate-50/70 border-slate-200/80'
            }`}
          >
            <span className="text-xs text-slate-400 block font-medium">Weekly Goals</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-black">
                {student.weeklyGoalsCompleted} / {student.weeklyTargetGoals}
              </span>
              <span className="text-xs text-emerald-400 font-semibold">goals met</span>
            </div>
            <span className="text-[11px] text-slate-400 block mt-1">Target: 5 days/week</span>
          </div>

          {/* Completion: 80% */}
          <div
            className={`rounded-xl p-4 border ${
              isDark ? 'bg-slate-800/60 border-slate-700/70' : 'bg-slate-50/70 border-slate-200/80'
            }`}
          >
            <span className="text-xs text-slate-400 block font-medium">Weekly Completion</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-black">{student.weeklyCompletionPercent}%</span>
              <span className="text-xs text-emerald-400 font-semibold">on track</span>
            </div>
            {/* Mini Progress Bar */}
            <div className="w-full bg-slate-700/40 rounded-full h-1.5 mt-2 overflow-hidden">
              <div
                className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${student.weeklyCompletionPercent}%` }}
              />
            </div>
          </div>

          {/* Leave: 1 day (streak protected) */}
          <div
            className={`rounded-xl p-4 border ${
              isDark ? 'bg-slate-800/60 border-slate-700/70' : 'bg-slate-50/70 border-slate-200/80'
            }`}
          >
            <span className="text-xs text-slate-400 block font-medium">Planned Leave</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-black">{student.weeklyLeaveDays}</span>
              <span className="text-xs text-blue-400 font-semibold">day protected</span>
            </div>
            <span className="text-[11px] text-slate-400 block mt-1">
              Streak frozen with zero guilt
            </span>
          </div>
        </div>
      ) : (
        /* MONTHLY PROGRESS */
        <div className="my-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div
            className={`rounded-xl p-4 border ${
              isDark ? 'bg-slate-800/60 border-slate-700/70' : 'bg-slate-50/70 border-slate-200/80'
            }`}
          >
            <span className="text-xs text-slate-400 block font-medium">Monthly Goals</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-black">
                {student.monthlyGoalsCompleted} / {student.monthlyTargetGoals}
              </span>
              <span className="text-xs text-emerald-400 font-semibold">completed</span>
            </div>
            <span className="text-[11px] text-slate-400 block mt-1">Total days active</span>
          </div>

          <div
            className={`rounded-xl p-4 border ${
              isDark ? 'bg-slate-800/60 border-slate-700/70' : 'bg-slate-50/70 border-slate-200/80'
            }`}
          >
            <span className="text-xs text-slate-400 block font-medium">Monthly Completion</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-black">{student.monthlyCompletionPercent}%</span>
              <span className="text-xs text-emerald-400 font-semibold">consistency</span>
            </div>
            <div className="w-full bg-slate-700/40 rounded-full h-1.5 mt-2 overflow-hidden">
              <div
                className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${student.monthlyCompletionPercent}%` }}
              />
            </div>
          </div>

          <div
            className={`rounded-xl p-4 border ${
              isDark ? 'bg-slate-800/60 border-slate-700/70' : 'bg-slate-50/70 border-slate-200/80'
            }`}
          >
            <span className="text-xs text-slate-400 block font-medium">Overall Course Progress</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-black">{student.courseProgressPercent}%</span>
              <span className="text-xs text-purple-400 font-semibold">curriculum</span>
            </div>
            <span className="text-[11px] text-slate-400 block mt-1">AI Product Management</span>
          </div>
        </div>
      )}

      {/* 7-DAY VISUALIZATION (Section 14) */}
      <div
        className={`pt-4 border-t ${
          isDark ? 'border-slate-800' : 'border-slate-100'
        }`}
      >
        <div className="flex items-center justify-between text-xs font-semibold mb-2.5">
          <span className="text-slate-400">7-Day Consistency Track</span>
          <span className="flex items-center gap-1.5 text-orange-400 text-[11px]">
            <Flame className="w-3.5 h-3.5 fill-orange-400" />
            {student.streakDays}-day streak active
          </span>
        </div>

        <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
          {student.weeklyHeatmap.map((dayItem) => {
            let statusClasses = isDark
              ? 'bg-slate-800 border-slate-700 text-slate-400'
              : 'bg-slate-100 border-slate-200 text-slate-500';
            let label = 'No activity';

            if (dayItem.status === 'completed') {
              statusClasses = 'bg-emerald-500 border-emerald-600 text-slate-950 font-bold shadow-xs';
              label = 'Completed';
            } else if (dayItem.status === 'leave') {
              statusClasses = isDark
                ? 'bg-blue-900/60 border-blue-500/50 text-blue-200 font-bold'
                : 'bg-blue-100 border-blue-300 text-blue-800 font-bold';
              label = 'Excused Leave (Streak Protected)';
            } else if (dayItem.status === 'missed') {
              statusClasses = isDark
                ? 'bg-amber-950/60 border-amber-500/50 text-amber-200 font-bold'
                : 'bg-amber-100 border-amber-300 text-amber-800 font-bold';
              label = 'Missed';
            } else if (dayItem.status === 'pending') {
              statusClasses = isDark
                ? 'bg-slate-800 border-dashed border-2 border-slate-600 text-slate-200'
                : 'bg-white border-dashed border-2 border-slate-300 text-slate-700';
              label = 'Today';
            }

            return (
              <div
                key={dayItem.day}
                className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl border text-center transition-all ${statusClasses}`}
                title={`${dayItem.day} (${dayItem.date}): ${label}`}
              >
                <span className="text-[10px] uppercase font-bold tracking-wider">{dayItem.day}</span>
                <span className="text-xs font-semibold mt-0.5">{dayItem.date.split(' ')[1]}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* CLASS POSITION (Section 14: Rank 12 / 50, Percentile 76th) */}
      <div
        className={`mt-5 pt-4 border-t ${
          isDark ? 'border-slate-800' : 'border-slate-100'
        }`}
      >
        <span className="text-[10px] uppercase font-bold text-slate-400 block mb-2">
          Class Position
        </span>

        <div className="grid grid-cols-2 gap-3">
          <div
            className={`rounded-xl p-3 border ${
              isDark ? 'bg-slate-800/40 border-slate-700/60' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <span className="text-xs text-slate-400 block">Class Rank</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-xl font-black">#{student.cohortRank}</span>
              <span className="text-xs text-slate-400">/ {student.cohortTotalStudents}</span>
            </div>
          </div>

          <div
            className={`rounded-xl p-3 border ${
              isDark ? 'bg-slate-800/40 border-slate-700/60' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <span className="text-xs text-slate-400 block">Percentile</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-xl font-black text-emerald-400">
                {student.cohortPercentile}th
              </span>
              <span className="text-xs text-slate-400">percentile</span>
            </div>
          </div>
        </div>

        {/* MANDATORY DISCLAIMER (Section 14) */}
        <div className="mt-3 flex items-start gap-2 text-[11px] text-slate-400">
          <Info className="w-3.5 h-3.5 shrink-0 mt-0.5 text-slate-500" />
          <p>
            <strong>Based on daily goal completion.</strong> Rank and percentile reflect consistency,
            not a measure of inherent effort, learning quality or ability.
          </p>
        </div>
      </div>
    </div>
  );
};
