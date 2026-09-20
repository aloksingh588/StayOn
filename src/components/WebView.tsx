import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  Flame,
  Calendar,
  Clock,
  ArrowRight,
  BookOpen,
  CalendarOff,
  Zap,
  CheckCircle2,
  FileText,
  Briefcase,
  AlertCircle,
  ExternalLink,
  Target,
  Plus,
} from 'lucide-react';
import { DailyGoalCard } from './DailyGoalCard';
import { InterventionBanner } from './InterventionBanner';
import { VisualProgress } from './VisualProgress';
import { CohortFeed } from './CohortFeed';
import { AddGoalModal } from './AddGoalModal';

interface WebViewProps {
  onOpenLeaveModal: () => void;
  onOpenMissedClassModal: () => void;
  onOpenCareerProfile: () => void;
  onOpenStudyModal: () => void;
}

export const WebView: React.FC<WebViewProps> = ({
  onOpenLeaveModal,
  onOpenMissedClassModal,
  onOpenCareerProfile,
  onOpenStudyModal,
}) => {
  const { student, themeMode, setDailyGoal } = useApp();
  const [activeWebTab, setActiveWebTab] = useState<'dashboard' | 'goals' | 'curriculum'>('dashboard');
  const [isAddGoalOpen, setIsAddGoalOpen] = useState(false);

  const isDark = themeMode === 'dark';

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* HelloPM Styled Top Breadcrumbs & Greeting */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800/40">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
            <span>HelloPM Ecosystem</span>
            <span>/</span>
            <span className="text-emerald-400 font-semibold">Cohort 51</span>
            <span>/</span>
            <span>AI Product Management</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Good morning, {student.name} 👋
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Targeting: <strong className="text-slate-200">{student.careerProfile.targetRole}</strong> · Consistency: {student.streakDays}-day streak
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={onOpenCareerProfile}
            className={`text-xs font-semibold px-3.5 py-2 rounded-xl border transition-colors flex items-center gap-1.5 ${
              isDark
                ? 'border-slate-800 bg-slate-900 hover:bg-slate-800 text-slate-300'
                : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5 text-purple-400" />
            Career Profile
          </button>

          <button
            onClick={onOpenLeaveModal}
            className={`text-xs font-semibold px-3.5 py-2 rounded-xl border transition-colors flex items-center gap-1.5 ${
              isDark
                ? 'border-slate-800 bg-slate-900 hover:bg-slate-800 text-slate-300'
                : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
            }`}
          >
            <CalendarOff className="w-3.5 h-3.5 text-blue-400" />
            Take Leave
          </button>

          <button
            onClick={() => setIsAddGoalOpen(true)}
            className="text-xs font-bold px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Goal
          </button>
        </div>
      </div>

      {/* Re-engagement Intervention Banner (if student was inactive) */}
      <div className="mt-6">
        <InterventionBanner
          onOpenMissedClassModal={onOpenMissedClassModal}
          onOpenLeaveModal={onOpenLeaveModal}
        />
      </div>

      {/* Main Responsive Grid Layout (PRD Section 7 & 8) */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* ================= LEFT COLUMN: TODAY'S GOAL & UPCOMING (7 Cols) ================= */}
        <div className="lg:col-span-7 space-y-6">
          {/* Primary Today's Goal Card */}
          <DailyGoalCard
            onOpenLeaveModal={onOpenLeaveModal}
            onOpenCareerProfile={onOpenCareerProfile}
          />

          {/* Upcoming Assignment & Next Class (Section 7) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Upcoming Assignment */}
            <div
              className={`rounded-2xl border p-5 transition-all ${
                isDark
                  ? 'bg-slate-900 border-slate-800 text-slate-100'
                  : 'bg-white border-slate-200 text-slate-900'
              }`}
            >
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span className="font-bold uppercase tracking-wider text-[10px]">
                  Upcoming Assignment
                </span>
                <span className="text-amber-400 font-bold">
                  Due in {student.upcomingAssignment.daysRemaining} days
                </span>
              </div>

              <h4 className="text-sm font-bold">{student.upcomingAssignment.title}</h4>
              <p className="text-xs text-slate-400 mt-1">
                {student.upcomingAssignment.type} · Weight: {student.upcomingAssignment.weight}%
              </p>

              <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs">
                <span className="text-slate-400 text-[11px]">74% of cohort submitted</span>
                <button
                  onClick={() =>
                    setDailyGoal({
                      id: 'g-asg-' + Date.now(),
                      title: 'Work 25 mins on Product Strategy Case assignment draft',
                      estimatedMinutes: 25,
                      completed: false,
                      createdAt: 'Just now',
                      source: 'manual',
                      careerRelevance: 'Direct capstone assignment submission',
                    })
                  }
                  className="text-emerald-400 font-semibold hover:underline flex items-center gap-1"
                >
                  Make Today's Goal +
                </button>
              </div>
            </div>

            {/* Upcoming Class */}
            <div
              className={`rounded-2xl border p-5 transition-all ${
                isDark
                  ? 'bg-slate-900 border-slate-800 text-slate-100'
                  : 'bg-white border-slate-200 text-slate-900'
              }`}
            >
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span className="font-bold uppercase tracking-wider text-[10px]">Next Live Class</span>
                <span className="text-emerald-400 font-bold">Tomorrow</span>
              </div>

              <h4 className="text-sm font-bold">{student.upcomingClass.title}</h4>
              <p className="text-xs text-slate-400 mt-1">
                Instructor: {student.upcomingClass.instructor}
              </p>

              <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs">
                <span className="text-slate-400 text-[11px]">7:00 PM IST · Zoom Live</span>
                <span className="text-xs text-slate-300 font-medium">Calendar Synced</span>
              </div>
            </div>
          </div>

          {/* Career-Linked Learning: Practical Application Case Study (Section 17) */}
          <div
            className={`rounded-2xl border p-5 sm:p-6 ${
              isDark
                ? 'bg-purple-950/20 border-purple-800/40 text-slate-100'
                : 'bg-purple-50/70 border-purple-200 text-purple-950'
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30 flex items-center justify-center shrink-0 mt-0.5">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
                      Career-Linked Learning
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 font-semibold">
                      Target Role: {student.careerProfile.targetRole}
                    </span>
                  </div>

                  <h3 className="text-base font-bold mt-1">
                    20 min Product Metrics Case: Choosing the Right Metrics
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    Practice selecting North Star, input, and guardrail metrics for a real product scenario. Active practice over passive video re-watching.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2 shrink-0">
                <button
                  onClick={onOpenStudyModal}
                  className="px-4 py-2 text-xs font-bold rounded-xl bg-purple-500 hover:bg-purple-400 text-white transition-colors shadow-sm"
                >
                  Start 3-Min Case
                </button>
                <button
                  onClick={() =>
                    setDailyGoal({
                      id: 'g-case-' + Date.now(),
                      title: 'Practice choosing North Star metrics for product case',
                      estimatedMinutes: 20,
                      completed: false,
                      createdAt: 'Just now',
                      source: 'ai_suggested',
                      careerRelevance: 'Aligned with Product Manager target role',
                    })
                  }
                  className={`px-3 py-2 text-xs font-semibold rounded-xl border transition-colors ${
                    isDark
                      ? 'border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700'
                      : 'border-slate-300 bg-white text-slate-800 hover:bg-slate-50'
                  }`}
                >
                  Add to Today's Goal
                </button>
              </div>
            </div>
          </div>

          {/* Missed Class Quick Recovery (if applicable) */}
          {student.missedClasses.length > 0 && (
            <div
              className={`rounded-2xl border p-4 sm:p-5 flex items-center justify-between gap-4 ${
                isDark
                  ? 'bg-amber-950/20 border-amber-500/30 text-slate-100'
                  : 'bg-amber-50/70 border-amber-200 text-slate-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block">
                    Missed Class Recovery Pending
                  </span>
                  <p className="text-xs font-bold mt-0.5">
                    {student.missedClasses[0].title}
                  </p>
                  <span className="text-[11px] text-slate-400 block mt-0.5">
                    Skip 90-minute recording · Read 90-sec summary
                  </span>
                </div>
              </div>

              <button
                onClick={onOpenMissedClassModal}
                className="px-4 py-2 text-xs font-bold rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors shadow-sm shrink-0"
              >
                Start 15-min Recovery
              </button>
            </div>
          )}
        </div>

        {/* ================= RIGHT COLUMN: PROGRESS & PEER GROUP (5 Cols) ================= */}
        <div className="lg:col-span-5 space-y-6">
          {/* Visual Progress Dashboard (Weekly, Monthly, Class Position) */}
          <VisualProgress />

          {/* Peer Goals Feed (Section 13: Rahul, Priya, Aman) */}
          <CohortFeed />
        </div>
      </div>

      <AddGoalModal
        isOpen={isAddGoalOpen}
        onClose={() => setIsAddGoalOpen(false)}
        initialMode="manual"
      />
    </div>
  );
};
