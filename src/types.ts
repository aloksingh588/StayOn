export type StudentStatus = 'consistent' | 'recently_inactive' | 'prolonged_inactive' | 're_engaged' | 'on_leave';

export type DemoStateKey =
  | 'arjun-on-track'
  | 'arjun-no-goal-today'
  | 'arjun-missed-days'
  | 'arjun-taking-leave'
  | 'arjun-missed-class'
  | 'arjun-reengaged';

export type PlatformView = 'web' | 'android';
export type ThemeMode = 'dark' | 'light';

export interface CareerProfile {
  currentRole: string;
  currentWorkProfile: string;
  yearsOfExperience: number;
  education: string;
  futureCareerGoal: string;
  targetRole: string;
  targetIndustry: string;
  focusSkills: string[];
}

export interface DailyGoal {
  id: string;
  title: string;
  estimatedMinutes: number;
  completed: boolean;
  createdAt: string;
  source: 'manual' | 'ai_suggested' | 're_entry_intervention' | 'career_recommendation';
  careerRelevance?: string;
  relatedModuleId?: string;
}

export interface LeaveRecord {
  id: string;
  date: string;
  reasonCategory: 'work_overtime' | 'family_commitments' | 'health_rest' | 'burnout_prevention' | 'client_meeting' | 'other';
  note: string;
  aiResponse: string;
  approved: boolean;
}

export interface PeerGoal {
  id: string;
  studentName: string;
  currentRole: string;
  targetRole: string;
  goalTitle: string;
  estimatedMinutes: number;
  completed: boolean;
  completedAt?: string;
  avatarBg: string;
}

export interface MissedClass {
  id: string;
  classNumber: number;
  title: string;
  scheduledDate: string;
  fullDurationMinutes: number;
  aiSummary: {
    coreTakeaways: string[];
    whyItMattersForUpcoming: string;
    keyConcepts: string[];
    lowFrictionGoal: {
      title: string;
      estimatedMinutes: number;
      actionableBrief: string;
    };
  };
}

export interface CourseModule {
  id: string;
  code: string;
  title: string;
  status: 'completed' | 'in_progress' | 'missed' | 'upcoming';
  completionPercent: number;
  careerTag?: string;
  deadline?: string;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  enrolledCourse: string;
  cohort: string;
  status: StudentStatus;
  daysInactive: number;
  lastActiveDate: string;
  streakDays: number;
  courseProgressPercent: number;
  careerProfile: CareerProfile;
  dailyGoal: DailyGoal | null;
  // Progress Metrics
  weeklyGoalsCompleted: number;
  weeklyTargetGoals: number;
  weeklyCompletionPercent: number;
  weeklyLeaveDays: number;
  monthlyGoalsCompleted: number;
  monthlyTargetGoals: number;
  monthlyCompletionPercent: number;
  cohortRank: number;
  cohortTotalStudents: number;
  cohortPercentile: number;
  weeklyHeatmap: { day: string; date: string; status: 'completed' | 'missed' | 'leave' | 'pending' | 'none' }[];
  missedClasses: MissedClass[];
  leaveHistory: LeaveRecord[];
  upcomingAssignment: {
    title: string;
    dueDate: string;
    daysRemaining: number;
    weight: string;
    cohortSubmittedPercent: number;
  };
  upcomingClass: {
    title: string;
    scheduledTime: string;
    topic: string;
  };
}

export interface TelemetryEvent {
  id: string;
  eventType: 
    | 'intervention_shown'
    | 'intervention_opened'
    | 'cta_clicked'
    | 'missed_class_recap_viewed'
    | 'micro_goal_started'
    | 'learning_activity_completed'
    | 'leave_planned'
    | 'ai_goal_generated'
    | 'persona_switched'
    | 'demo_state_switched'
    | 'case_study_completed'
    | 'platform_switched'
    | 'intervention_dismissed';
  studentId: string;
  studentName: string;
  timestamp: string;
  metadata?: Record<string, any>;
}

export interface CaseStudyQuestion {
  id: number;
  question: string;
  scenario: string;
  options: { id: string; text: string; rationale: string; isCorrect: boolean }[];
}
