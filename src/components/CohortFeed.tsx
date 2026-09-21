import React from 'react';
import { useApp } from '../context/AppContext';
import { Users, CheckCircle2, Clock, Sparkles, Target, Info } from 'lucide-react';

export const CohortFeed: React.FC = () => {
  const { peerGoals, themeMode } = useApp();
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
        className={`flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b ${
          isDark ? 'border-slate-800' : 'border-slate-100'
        }`}
      >
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Peer Group Activity
          </span>
          <h3 className="text-base sm:text-lg font-bold mt-0.5">
            Cohort Daily Goals & Pacing
          </h3>
        </div>

        {/* Cohort-level context statistics (Section 13) */}
        <div className="flex items-center gap-3 text-xs">
          <div
            className={`px-3 py-1.5 rounded-xl border ${
              isDark ? 'bg-slate-800/80 border-slate-700' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <span className="text-[10px] text-slate-400 block font-medium">Today's Cohort Completion</span>
            <span className="font-bold text-emerald-400">72%</span>
          </div>

          <div
            className={`px-3 py-1.5 rounded-xl border ${
              isDark ? 'bg-slate-800/80 border-slate-700' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <span className="text-[10px] text-slate-400 block font-medium">Weekly Cohort Completion</span>
            <span className="font-bold text-blue-400">68%</span>
          </div>
        </div>
      </div>

      {/* Peer List (Section 13: Rahul, Priya, Aman) */}
      <div className="mt-4 space-y-3">
        {peerGoals.map((peer) => (
          <div
            key={peer.id}
            className={`flex items-start justify-between gap-3 p-3.5 rounded-xl border transition-all text-xs ${
              isDark
                ? 'bg-slate-800/40 border-slate-850 hover:border-slate-700 hover:bg-slate-800/70'
                : 'bg-slate-50/60 border-slate-200/80 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-start gap-3">
              {/* Avatar Initial */}
              <div
                className={`w-8 h-8 rounded-full font-bold flex items-center justify-center shrink-0 text-xs shadow-2xs ${peer.avatarBg}`}
              >
                {peer.studentName[0]}
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-bold text-slate-200">{peer.studentName}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded border ${
                      isDark
                        ? 'bg-slate-850 border-slate-700 text-slate-400'
                        : 'bg-white border-slate-200 text-slate-500'
                    }`}
                  >
                    {peer.currentRole} → {peer.targetRole}
                  </span>
                </div>

                <p className="text-slate-300 mt-1 font-medium leading-snug">
                  {peer.goalTitle}
                </p>

                <div className="flex items-center gap-3 mt-1.5 text-[11px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    {peer.estimatedMinutes} mins
                  </span>
                  {peer.completed && peer.completedAt && (
                    <span className="text-emerald-400 font-semibold">
                      Completed {peer.completedAt}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Status Indicator */}
            <div className="shrink-0 mt-0.5">
              {peer.completed ? (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <CheckCircle2 className="w-3 h-3" />
                  ✓ Completed
                </span>
              ) : (
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${
                    isDark
                      ? 'bg-slate-800 text-slate-300 border-slate-700'
                      : 'bg-slate-100 text-slate-600 border-slate-200'
                  }`}
                >
                  In progress
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Mandatory PRD Non-Toxic Leaderboard Disclaimer (Section 13) */}
      <div
        className={`mt-4 pt-3 border-t flex items-start gap-2 text-[11px] text-slate-400 ${
          isDark ? 'border-slate-800' : 'border-slate-100'
        }`}
      >
        <Info className="w-3.5 h-3.5 shrink-0 mt-0.5 text-slate-500" />
        <p>
          <strong>Peer information is for inspiration and context.</strong> StayOn does not rank
          students competitively; learning effort is self-directed and non-comparative.
        </p>
      </div>
    </div>
  );
};
