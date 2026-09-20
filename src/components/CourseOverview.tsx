import React from 'react';
import { useApp } from '../context/AppContext';
import { COURSE_MODULES } from '../data/mockData';
import {
  BookOpen,
  CheckCircle2,
  Clock,
  Briefcase,
  PlayCircle,
  Calendar,
  Sparkles,
  Zap,
  ArrowRight,
} from 'lucide-react';

interface CourseOverviewProps {
  onOpenCaseStudy: () => void;
  onOpenMissedClassModal: () => void;
}

export const CourseOverview: React.FC<CourseOverviewProps> = ({
  onOpenCaseStudy,
  onOpenMissedClassModal,
}) => {
  const { student } = useApp();

  return (
    <div className="space-y-6">
      {/* Upcoming Assignment Highlight Card */}
      <div className="bg-white rounded-2xl border border-orange-200/80 p-5 sm:p-6 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-800 flex items-center justify-center shrink-0 mt-0.5">
              <Calendar className="w-5 h-5 text-orange-700" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-orange-800">
                Key Milestone
              </span>
              <h3 className="text-base font-bold text-slate-900 mt-0.5">
                {student.upcomingAssignment.title}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Due: <strong className="text-slate-800">{student.upcomingAssignment.dueDate}</strong> ·
                Weight: {student.upcomingAssignment.weight} ·{' '}
                <span className="text-emerald-700 font-semibold">
                  {student.upcomingAssignment.cohortSubmittedPercent}% of cohort submitted
                </span>
              </p>
            </div>
          </div>

          <button
            onClick={onOpenCaseStudy}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors self-start sm:self-auto shrink-0 shadow-2xs"
          >
            <span>Practice Case Study</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Course Modules List */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-2xs">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Syllabus & Continuity
            </span>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">
              Course Modules
            </h3>
          </div>
          <span className="text-xs text-slate-400">
            {COURSE_MODULES.filter((m) => m.status === 'completed').length} of {COURSE_MODULES.length} Completed
          </span>
        </div>

        <div className="mt-4 space-y-3">
          {COURSE_MODULES.map((module) => {
            const isCompleted = module.status === 'completed';
            const isInProgress = module.status === 'in_progress';
            const isMissed = module.status === 'missed';

            return (
              <div
                key={module.id}
                className={`p-4 rounded-xl border transition-all ${
                  isInProgress
                    ? 'border-slate-300 bg-slate-50/70 shadow-2xs'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {module.code.replace('MOD-', '')}
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                          {module.title}
                        </h4>
                        {isCompleted && (
                          <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold">
                            <CheckCircle2 className="w-3 h-3" />
                            Completed
                          </span>
                        )}
                        {isInProgress && (
                          <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 font-semibold">
                            <Clock className="w-3 h-3" />
                            Current (65%)
                          </span>
                        )}
                        {isMissed && (
                          <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 font-semibold border border-amber-300">
                            Missed Session
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-3 mt-1.5 text-[11px] text-slate-500">
                        {module.careerTag && (
                          <span className="flex items-center gap-1 text-amber-900 font-medium">
                            <Briefcase className="w-3 h-3 text-amber-600" />
                            {module.careerTag}
                          </span>
                        )}
                        {module.deadline && (
                          <span className="flex items-center gap-1 text-slate-400">
                            <Calendar className="w-3 h-3 text-slate-400" />
                            {module.deadline}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                    {isMissed && (
                      <button
                        onClick={onOpenMissedClassModal}
                        className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold flex items-center gap-1 transition-colors shadow-2xs"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Catch Up (15m)</span>
                      </button>
                    )}
                    {isInProgress && (
                      <button
                        onClick={onOpenCaseStudy}
                        className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center gap-1 transition-colors shadow-2xs"
                      >
                        <PlayCircle className="w-3.5 h-3.5" />
                        <span>Resume</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
