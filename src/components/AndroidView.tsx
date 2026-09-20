import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Home,
  Target,
  BarChart2,
  User,
  Sparkles,
  Flame,
  Calendar,
  Clock,
  ArrowRight,
  BookOpen,
  CalendarOff,
  Zap,
  Wifi,
  Battery,
  Shield,
  Briefcase,
  GraduationCap,
  Award,
} from 'lucide-react';
import { DailyGoalCard } from './DailyGoalCard';
import { InterventionBanner } from './InterventionBanner';
import { VisualProgress } from './VisualProgress';
import { CohortFeed } from './CohortFeed';
import { AddGoalModal } from './AddGoalModal';

interface AndroidViewProps {
  onOpenLeaveModal: () => void;
  onOpenMissedClassModal: () => void;
  onOpenCareerProfile: () => void;
  onOpenStudyModal: () => void;
}

export const AndroidView: React.FC<AndroidViewProps> = ({
  onOpenLeaveModal,
  onOpenMissedClassModal,
  onOpenCareerProfile,
  onOpenStudyModal,
}) => {
  const { student, themeMode, setDailyGoal } = useApp();
  const [mobileTab, setMobileTab] = useState<'home' | 'goals' | 'progress' | 'profile'>('home');
  const [isAddGoalModalOpen, setIsAddGoalModalOpen] = useState(false);

  const isDark = themeMode === 'dark';

  return (
    <div className="flex justify-center p-2 sm:p-6 w-full max-w-md mx-auto">
      {/* Android Device Shell */}
      <div
        className={`w-full max-w-[420px] rounded-[38px] border-4 sm:border-8 border-slate-950 shadow-2xl overflow-hidden flex flex-col h-[850px] relative transition-all ${
          isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
        }`}
      >
        {/* Android Status Bar */}
        <div className="bg-slate-950 text-slate-300 text-[11px] px-6 py-2.5 flex items-center justify-between shrink-0 select-none z-20">
          <span className="font-semibold text-xs tracking-tight">10:24</span>
          {/* Camera Notch Punch hole */}
          <div className="w-3.5 h-3.5 rounded-full bg-slate-900 border border-slate-800" />
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold tracking-wider">5G</span>
            <Wifi className="w-3.5 h-3.5" />
            <Battery className="w-4 h-4" />
          </div>
        </div>

        {/* Android App Bar */}
        <div
          className={`px-5 py-3 border-b flex items-center justify-between shrink-0 ${
            isDark ? 'bg-slate-900/95 border-slate-800' : 'bg-white/95 border-slate-200'
          }`}
        >
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-500 flex items-center justify-center text-slate-950 font-black text-xs">
              ON
            </div>
            <div>
              <span className="text-xs font-black tracking-tight">StayON</span>
              <span className="text-[10px] text-slate-400 block -mt-0.5">Cohort 51 · PM Track</span>
            </div>
          </div>

          {/* Streak pill */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-500/15 border border-orange-500/30 text-orange-400 text-xs font-bold">
            <Flame className="w-3.5 h-3.5 fill-orange-400" />
            <span>{student.streakDays}d Streak</span>
          </div>
        </div>

        {/* Android Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-20">
          {/* ================= TAB 1: HOME ================= */}
          {mobileTab === 'home' && (
            <>
              {/* Greeting */}
              <div>
                <h2 className="text-lg font-bold">
                  Good morning, {student.name} 👋
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  What should we conquer today?
                </p>
              </div>

              {/* AI Pattern Re-engagement Intervention (if inactive) */}
              <InterventionBanner
                onOpenMissedClassModal={onOpenMissedClassModal}
                onOpenLeaveModal={onOpenLeaveModal}
              />

              {/* Primary Focus: Today's Goal Card */}
              <DailyGoalCard
                onOpenLeaveModal={onOpenLeaveModal}
                onOpenCareerProfile={onOpenCareerProfile}
              />

              {/* Quick Action: Practice Micro Case Study (Career-linked learning) */}
              <div
                className={`p-4 rounded-2xl border ${
                  isDark
                    ? 'bg-purple-950/20 border-purple-800/40 text-slate-200'
                    : 'bg-purple-50/70 border-purple-200 text-purple-950'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
                      <Zap className="w-4 h-4" />
                    </span>
                    <div>
                      <h4 className="text-xs font-bold">Career Practice: 3-Min Case</h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        Test your North Star vs Guardrail metrics
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={onOpenStudyModal}
                    className="px-3 py-1.5 rounded-xl bg-purple-500 hover:bg-purple-400 text-white text-xs font-bold shrink-0 transition-colors shadow-sm"
                  >
                    Start
                  </button>
                </div>
              </div>

              {/* Peer Activity Preview */}
              <div
                className={`p-4 rounded-2xl border ${
                  isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Cohort Pacing
                  </span>
                  <button
                    onClick={() => setMobileTab('progress')}
                    className="text-xs text-emerald-400 font-semibold"
                  >
                    View All →
                  </button>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs p-2 rounded-xl bg-slate-800/40 border border-slate-800">
                    <span className="font-medium text-slate-300">Rahul (Software Eng)</span>
                    <span className="text-[10px] text-emerald-400 font-bold">✓ Case Done</span>
                  </div>
                  <div className="flex items-center justify-between text-xs p-2 rounded-xl bg-slate-800/40 border border-slate-800">
                    <span className="font-medium text-slate-300">Priya (Associate PM)</span>
                    <span className="text-[10px] text-emerald-400 font-bold">✓ Metrics Done</span>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ================= TAB 2: GOALS ================= */}
          {mobileTab === 'goals' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold">Daily Goals</h3>
                  <p className="text-xs text-slate-400">Manage daily commitments</p>
                </div>
                <button
                  onClick={() => setIsAddGoalModalOpen(true)}
                  className="px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold"
                >
                  + Add Goal
                </button>
              </div>

              <DailyGoalCard
                onOpenLeaveModal={onOpenLeaveModal}
                onOpenCareerProfile={onOpenCareerProfile}
              />

              {/* Career Goal Recommendations */}
              <div
                className={`p-4 rounded-2xl border ${
                  isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                }`}
              >
                <span className="text-xs font-bold text-slate-400 block mb-3">
                  Recommended for {student.careerProfile.targetRole}
                </span>

                <div className="space-y-2.5">
                  <button
                    onClick={() =>
                      setDailyGoal({
                        id: 'g-rec-1',
                        title: 'Draft PRD North Star Metric hierarchy for food delivery app',
                        estimatedMinutes: 20,
                        completed: false,
                        createdAt: 'Just now',
                        source: 'ai_suggested',
                        careerRelevance: 'Direct PM portfolio artifact',
                      })
                    }
                    className="w-full text-left p-3 rounded-xl border border-slate-800 hover:border-emerald-500/50 bg-slate-800/40 text-xs transition-colors"
                  >
                    <span className="font-semibold block text-slate-200">
                      Draft PRD North Star Metric hierarchy
                    </span>
                    <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-1">
                      <span>20 mins</span>
                      <span>•</span>
                      <span className="text-emerald-400">Add to today +</span>
                    </div>
                  </button>

                  <button
                    onClick={() =>
                      setDailyGoal({
                        id: 'g-rec-2',
                        title: 'Evaluate trade-offs: DAU growth vs Notification fatigue',
                        estimatedMinutes: 15,
                        completed: false,
                        createdAt: 'Just now',
                        source: 'ai_suggested',
                        careerRelevance: 'Target role interview prep',
                      })
                    }
                    className="w-full text-left p-3 rounded-xl border border-slate-800 hover:border-emerald-500/50 bg-slate-800/40 text-xs transition-colors"
                  >
                    <span className="font-semibold block text-slate-200">
                      Evaluate trade-offs: DAU growth vs Notification fatigue
                    </span>
                    <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-1">
                      <span>15 mins</span>
                      <span>•</span>
                      <span className="text-emerald-400">Add to today +</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ================= TAB 3: PROGRESS ================= */}
          {mobileTab === 'progress' && (
            <div className="space-y-4">
              <VisualProgress />
              <CohortFeed />
            </div>
          )}

          {/* ================= TAB 4: PROFILE ================= */}
          {mobileTab === 'profile' && (
            <div className="space-y-4">
              {/* Profile Card */}
              <div
                className={`p-5 rounded-2xl border ${
                  isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold text-lg">
                    {student.name[0]}
                  </div>
                  <div>
                    <h3 className="text-base font-bold">{student.name}</h3>
                    <p className="text-xs text-slate-400">{student.careerProfile.currentRole}</p>
                    <span className="text-[10px] text-emerald-400 font-semibold block mt-0.5">
                      Target: {student.careerProfile.targetRole}
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800 grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Experience</span>
                    <span className="font-bold">{student.careerProfile.yearsOfExperience} years</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Education</span>
                    <span className="font-bold truncate block">{student.careerProfile.education}</span>
                  </div>
                </div>

                <button
                  onClick={onOpenCareerProfile}
                  className="w-full mt-4 py-2 text-xs font-bold rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
                >
                  Edit Career Profile
                </button>
              </div>

              {/* Leave & Protection */}
              <div
                className={`p-5 rounded-2xl border ${
                  isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                }`}
              >
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Streak Protection & Leave
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Need a break for work, family, or personal health? Take leave with zero penalty.
                </p>
                <button
                  onClick={onOpenLeaveModal}
                  className="w-full mt-3 py-2 text-xs font-bold rounded-xl bg-blue-500 hover:bg-blue-400 text-slate-950 transition-colors flex items-center justify-center gap-1.5"
                >
                  <CalendarOff className="w-3.5 h-3.5" />
                  Take Leave Today
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Android 4-Tab Bottom Navigation Bar (Section 6) */}
        <div
          className={`absolute bottom-0 inset-x-0 border-t flex items-center justify-around py-2 px-1 z-30 transition-colors ${
            isDark
              ? 'bg-slate-950/95 border-slate-800 text-slate-400 backdrop-blur-md'
              : 'bg-white/95 border-slate-200 text-slate-500 backdrop-blur-md'
          }`}
        >
          <button
            onClick={() => setMobileTab('home')}
            className={`flex flex-col items-center gap-1 py-1 px-4 rounded-xl transition-all ${
              mobileTab === 'home'
                ? 'text-emerald-400 font-bold scale-105'
                : 'hover:text-slate-200'
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="text-[10px] tracking-tight">Home</span>
          </button>

          <button
            onClick={() => setMobileTab('goals')}
            className={`flex flex-col items-center gap-1 py-1 px-4 rounded-xl transition-all ${
              mobileTab === 'goals'
                ? 'text-emerald-400 font-bold scale-105'
                : 'hover:text-slate-200'
            }`}
          >
            <Target className="w-5 h-5" />
            <span className="text-[10px] tracking-tight">Goals</span>
          </button>

          <button
            onClick={() => setMobileTab('progress')}
            className={`flex flex-col items-center gap-1 py-1 px-4 rounded-xl transition-all ${
              mobileTab === 'progress'
                ? 'text-emerald-400 font-bold scale-105'
                : 'hover:text-slate-200'
            }`}
          >
            <BarChart2 className="w-5 h-5" />
            <span className="text-[10px] tracking-tight">Progress</span>
          </button>

          <button
            onClick={() => setMobileTab('profile')}
            className={`flex flex-col items-center gap-1 py-1 px-4 rounded-xl transition-all ${
              mobileTab === 'profile'
                ? 'text-emerald-400 font-bold scale-105'
                : 'hover:text-slate-200'
            }`}
          >
            <User className="w-5 h-5" />
            <span className="text-[10px] tracking-tight">Profile</span>
          </button>
        </div>
      </div>

      <AddGoalModal
        isOpen={isAddGoalModalOpen}
        onClose={() => setIsAddGoalModalOpen(false)}
        initialMode="manual"
      />
    </div>
  );
};
