import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  ArrowRight,
  Clock,
  Calendar,
  Users,
  CheckCircle2,
  CalendarOff,
  BookOpen,
  AlertCircle,
} from 'lucide-react';

interface InterventionBannerProps {
  onOpenMissedClassModal: () => void;
  onOpenLeaveModal: () => void;
}

export const InterventionBanner: React.FC<InterventionBannerProps> = ({
  onOpenMissedClassModal,
  onOpenLeaveModal,
}) => {
  const { student, logTelemetry, setDailyGoal, themeMode } = useApp();
  const [dismissed, setDismissed] = useState(false);

  const isDark = themeMode === 'dark';

  // Only show when student is in inactive state
  const needsIntervention =
    (student.status === 'recently_inactive' || student.status === 'prolonged_inactive') &&
    !dismissed;

  if (!needsIntervention) {
    return null;
  }

  const handleCreate20MinGoal = () => {
    setDailyGoal({
      id: 'g-restart-' + Date.now(),
      title: 'Spend 20 minutes reviewing Product Metrics and complete practice case',
      estimatedMinutes: 20,
      completed: false,
      createdAt: 'Just now',
      source: 're_entry_intervention',
      careerRelevance: `Restart commitment aligned with ${student.careerProfile.targetRole} role`,
      relatedModuleId: 'mod-2',
    });

    logTelemetry('micro_goal_started', {
      source: 're_engagement_intervention',
      estimatedMinutes: 20,
    });
  };

  return (
    <section
      id="p0-re-entry-intervention"
      className={`rounded-2xl border p-5 sm:p-6 mb-6 transition-all shadow-sm ${
        isDark
          ? 'bg-amber-950/20 border-amber-500/40 text-slate-100'
          : 'bg-amber-50/70 border-amber-200 text-slate-900'
      }`}
    >
      {/* Top Tag & Dismiss */}
      <div className="flex items-center justify-between gap-2 pb-3 border-b border-amber-500/20">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            AI Coach
          </span>
          <span className="text-xs text-amber-300 font-medium">
            Pattern Detection · Supportive Re-engagement
          </span>
        </div>

        <button
          onClick={() => {
            setDismissed(true);
            logTelemetry('intervention_dismissed', { reason: 'user_closed' });
          }}
          className="text-xs text-slate-400 hover:text-slate-200 transition-colors"
        >
          Dismiss
        </button>
      </div>

      {/* Objective Observable Pattern Statement (Section 12) */}
      <div className="mt-4">
        <h3 className="text-lg sm:text-xl font-bold tracking-tight">
          "You haven't set a learning goal for the last {student.daysInactive} days."
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
          Let's restart with a small goal today. Here is the relevant context to help you return with zero pressure:
        </p>
      </div>

      {/* Relevant Context Grid (Section 12: Assignment, Revision, Next class, Cohort) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 my-4">
        {/* Context 1: Assignment */}
        <div
          className={`rounded-xl p-3 border text-xs ${
            isDark ? 'bg-slate-900/60 border-amber-500/20' : 'bg-white/80 border-amber-200'
          }`}
        >
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Assignment</span>
          <span className="font-bold text-slate-200 block mt-0.5">Product Strategy Case</span>
          <span className="text-[11px] text-amber-400 font-semibold block mt-0.5">
            Due in 4 days
          </span>
        </div>

        {/* Context 2: Revision */}
        <div
          className={`rounded-xl p-3 border text-xs ${
            isDark ? 'bg-slate-900/60 border-amber-500/20' : 'bg-white/80 border-amber-200'
          }`}
        >
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Revision</span>
          <span className="font-bold text-slate-200 block mt-0.5">Product Metrics</span>
          <span className="text-[11px] text-orange-400 font-semibold block mt-0.5">
            Pending review
          </span>
        </div>

        {/* Context 3: Next Class */}
        <div
          className={`rounded-xl p-3 border text-xs ${
            isDark ? 'bg-slate-900/60 border-amber-500/20' : 'bg-white/80 border-amber-200'
          }`}
        >
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Next Class</span>
          <span className="font-bold text-slate-200 block mt-0.5">Live Metrics Teardown</span>
          <span className="text-[11px] text-emerald-400 font-semibold block mt-0.5">
            In 2 days
          </span>
        </div>

        {/* Context 4: Cohort metrics */}
        <div
          className={`rounded-xl p-3 border text-xs ${
            isDark ? 'bg-slate-900/60 border-amber-500/20' : 'bg-white/80 border-amber-200'
          }`}
        >
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Cohort</span>
          <span className="font-bold text-slate-200 block mt-0.5">Peer Activity</span>
          <span className="text-[11px] text-blue-400 font-semibold block mt-0.5">
            68% completed revision
          </span>
        </div>
      </div>

      {/* Call to Action Button: [Create 20-min Goal] */}
      <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Clock className="w-3.5 h-3.5 text-amber-400" />
          <span>Low friction restart · Zero backlog pressure</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenMissedClassModal}
            className={`px-3 py-2 text-xs font-semibold rounded-xl border transition-colors ${
              isDark
                ? 'border-slate-700 text-slate-300 hover:bg-slate-800'
                : 'border-slate-300 text-slate-700 hover:bg-slate-100'
            }`}
          >
            Review 90-Sec Class Digest
          </button>

          <button
            onClick={handleCreate20MinGoal}
            className="px-5 py-2 text-xs font-bold rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors flex items-center gap-1.5 shadow-md"
          >
            <span>Create 20-min Goal</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
