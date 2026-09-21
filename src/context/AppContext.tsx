import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Student,
  DailyGoal,
  LeaveRecord,
  CareerProfile,
  TelemetryEvent,
  PeerGoal,
  MissedClass,
  PlatformView,
  ThemeMode,
} from '../types';
import { DEMO_STUDENTS, INITIAL_PEER_GOALS } from '../data/mockData';

interface AppContextType {
  student: Student;
  allDemoStates: Record<string, Student>;
  selectedDemoStateKey: string;
  selectDemoState: (key: string) => void;
  platformView: PlatformView;
  setPlatformView: (view: PlatformView) => void;
  platformMode: PlatformView;
  setPlatformMode: (mode: PlatformView) => void;
  themeMode: ThemeMode;
  toggleThemeMode: () => void;
  toggleTheme: () => void;
  peerGoals: PeerGoal[];
  telemetryEvents: TelemetryEvent[];
  logTelemetry: (eventType: TelemetryEvent['eventType'], metadata?: Record<string, any>) => void;
  clearTelemetry: () => void;
  setDailyGoal: (goal: DailyGoal) => void;
  toggleDailyGoalComplete: () => void;
  removeDailyGoal: () => void;
  planLeave: (category: LeaveRecord['reasonCategory'], note: string) => void;
  startMissedClassMicroGoal: (missedClass: MissedClass) => void;
  updateCareerProfile: (profile: CareerProfile) => void;
  generateAIGoal: () => Promise<DailyGoal>;
  isGeneratingGoal: boolean;
  completeMicroCaseStudy: (score: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [studentsState, setStudentsState] = useState<Record<string, Student>>(() => {
    return { ...DEMO_STUDENTS };
  });
  const [selectedDemoStateKey, setSelectedDemoStateKey] = useState<string>('arjun-on-track');
  const [platformView, setPlatformView] = useState<PlatformView>('web');
  const [themeMode, setThemeMode] = useState<ThemeMode>('dark'); // HelloPM dark aesthetic by default
  const [peerGoals, setPeerGoals] = useState<PeerGoal[]>(INITIAL_PEER_GOALS);
  const [telemetryEvents, setTelemetryEvents] = useState<TelemetryEvent[]>([]);
  const [isGeneratingGoal, setIsGeneratingGoal] = useState<boolean>(false);

  const student = studentsState[selectedDemoStateKey] || DEMO_STUDENTS['arjun-on-track'];

  const toggleThemeMode = () => {
    setThemeMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const logTelemetry = (eventType: TelemetryEvent['eventType'], metadata?: Record<string, any>) => {
    const newEvent: TelemetryEvent = {
      id: 'evt-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
      eventType,
      studentId: student.id,
      studentName: student.name,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      metadata,
    };
    setTelemetryEvents((prev) => [newEvent, ...prev]);
  };

  // When demo state changes, log event and trigger intervention shown if applicable
  const selectDemoState = (key: string) => {
    setSelectedDemoStateKey(key);
    const targetStudent = studentsState[key];
    if (targetStudent) {
      logTelemetry('demo_state_switched', { targetState: key, studentStatus: targetStudent.status });
      if (targetStudent.status === 'recently_inactive' || targetStudent.status === 'prolonged_inactive') {
        logTelemetry('intervention_shown', {
          reason: 'Student inactive after prior consistency',
          daysInactive: targetStudent.daysInactive,
        });
      }
    }
  };

  // Initial telemetry on mount
  useEffect(() => {
    logTelemetry('learning_activity_completed', { action: 'session_started', state: selectedDemoStateKey });
  }, []);

  const clearTelemetry = () => {
    setTelemetryEvents([]);
  };

  const setDailyGoal = (goal: DailyGoal) => {
    setStudentsState((prev) => ({
      ...prev,
      [selectedDemoStateKey]: {
        ...prev[selectedDemoStateKey],
        dailyGoal: goal,
      },
    }));
    logTelemetry('learning_activity_completed', { action: 'goal_created', title: goal.title, source: goal.source });
  };

  const toggleDailyGoalComplete = () => {
    if (!student.dailyGoal) return;
    const newCompleted = !student.dailyGoal.completed;

    setStudentsState((prev) => {
      const current = prev[selectedDemoStateKey];
      const newWeeklyCompleted = newCompleted
        ? current.weeklyGoalsCompleted + 1
        : Math.max(0, current.weeklyGoalsCompleted - 1);
      const newMonthlyCompleted = newCompleted
        ? current.monthlyGoalsCompleted + 1
        : Math.max(0, current.monthlyGoalsCompleted - 1);

      return {
        ...prev,
        [selectedDemoStateKey]: {
          ...current,
          dailyGoal: {
            ...current.dailyGoal!,
            completed: newCompleted,
          },
          weeklyGoalsCompleted: newWeeklyCompleted,
          weeklyCompletionPercent: Math.round((newWeeklyCompleted / current.weeklyTargetGoals) * 100),
          monthlyGoalsCompleted: newMonthlyCompleted,
          monthlyCompletionPercent: Math.round((newMonthlyCompleted / current.monthlyTargetGoals) * 100),
          streakDays: newCompleted ? current.streakDays + 1 : current.streakDays,
          status: newCompleted && current.status === 'recently_inactive' ? 're_engaged' : current.status,
        },
      };
    });

    logTelemetry('learning_activity_completed', {
      action: newCompleted ? 'goal_completed' : 'goal_unmarked',
      goalTitle: student.dailyGoal.title,
    });
  };

  const removeDailyGoal = () => {
    setStudentsState((prev) => ({
      ...prev,
      [selectedDemoStateKey]: {
        ...prev[selectedDemoStateKey],
        dailyGoal: null,
      },
    }));
  };

  const planLeave = (category: LeaveRecord['reasonCategory'], note: string) => {
    const newRecord: LeaveRecord = {
      id: 'leave-' + Date.now(),
      date: 'Today (' + new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }) + ')',
      reasonCategory: category,
      note,
      aiResponse: 'Got it. I’ve marked today as a leave day. Streak safely protected at ' + student.streakDays + ' days. Let’s plan a small goal for tomorrow.',
      approved: true,
    };

    setStudentsState((prev) => {
      const current = prev[selectedDemoStateKey];
      return {
        ...prev,
        [selectedDemoStateKey]: {
          ...current,
          status: 'on_leave',
          weeklyLeaveDays: current.weeklyLeaveDays + 1,
          leaveHistory: [newRecord, ...current.leaveHistory],
          dailyGoal: null,
        },
      };
    });

    logTelemetry('leave_planned', {
      category,
      note,
      streakPreserved: student.streakDays,
    });
  };

  const startMissedClassMicroGoal = (missedClass: MissedClass) => {
    const recoveryGoal: DailyGoal = {
      id: 'rec-' + Date.now(),
      title: missedClass.aiSummary.lowFrictionGoal.title,
      estimatedMinutes: missedClass.aiSummary.lowFrictionGoal.estimatedMinutes,
      completed: false,
      createdAt: 'Just now',
      source: 're_entry_intervention',
      careerRelevance: 'Direct catch-up for ' + missedClass.title,
      relatedModuleId: 'mod-2',
    };

    setStudentsState((prev) => ({
      ...prev,
      [selectedDemoStateKey]: {
        ...prev[selectedDemoStateKey],
        dailyGoal: recoveryGoal,
        status: 'consistent',
        daysInactive: 0,
      },
    }));

    logTelemetry('micro_goal_started', {
      classTitle: missedClass.title,
      duration: recoveryGoal.estimatedMinutes,
    });
  };

  const updateCareerProfile = (profile: CareerProfile) => {
    setStudentsState((prev) => ({
      ...prev,
      [selectedDemoStateKey]: {
        ...prev[selectedDemoStateKey],
        careerProfile: profile,
      },
    }));
    logTelemetry('learning_activity_completed', {
      action: 'career_profile_updated',
      targetRole: profile.targetRole,
      currentRole: profile.currentRole,
    });
  };

  const generateAIGoal = async (): Promise<DailyGoal> => {
    setIsGeneratingGoal(true);
    await new Promise((res) => setTimeout(res, 500));

    const aiGoals: DailyGoal[] = [
      {
        id: 'ai-goal-1',
        title: 'Spend 20 minutes reviewing Product Metrics and complete the 5-question practice case',
        estimatedMinutes: 20,
        completed: false,
        createdAt: 'Just now',
        source: 'ai_suggested',
        careerRelevance: `Direct practice for ${student.careerProfile.targetRole} role & upcoming Product Strategy Case`,
        relatedModuleId: 'mod-2',
      },
      {
        id: 'ai-goal-2',
        title: 'Draft 3 input metrics for the AI Productivity app case study',
        estimatedMinutes: 20,
        completed: false,
        createdAt: 'Just now',
        source: 'ai_suggested',
        careerRelevance: `Connects your ${student.careerProfile.currentRole} engineering background to ${student.careerProfile.targetRole} metrics`,
        relatedModuleId: 'mod-2',
      },
      {
        id: 'ai-goal-3',
        title: '15-min deep dive into counter-metrics to avoid metric gaming in PM interviews',
        estimatedMinutes: 15,
        completed: false,
        createdAt: 'Just now',
        source: 'ai_suggested',
        careerRelevance: `Essential competency for ${student.careerProfile.targetRole}`,
        relatedModuleId: 'mod-2',
      },
    ];

    const randomGoal = aiGoals[Math.floor(Math.random() * aiGoals.length)];
    setIsGeneratingGoal(false);
    logTelemetry('ai_goal_generated', {
      suggestedTitle: randomGoal.title,
      estimatedMinutes: randomGoal.estimatedMinutes,
      targetRole: student.careerProfile.targetRole,
    });
    return randomGoal;
  };

  const completeMicroCaseStudy = (score: number) => {
    logTelemetry('case_study_completed', {
      score,
      maxScore: 3,
      studentName: student.name,
    });

    if (student.dailyGoal && !student.dailyGoal.completed) {
      toggleDailyGoalComplete();
    }
  };

  return (
    <AppContext.Provider
      value={{
        student,
        allDemoStates: studentsState,
        selectedDemoStateKey,
        selectDemoState,
        platformView,
        setPlatformView,
        platformMode: platformView,
        setPlatformMode: setPlatformView,
        themeMode,
        toggleThemeMode,
        toggleTheme: toggleThemeMode,
        peerGoals,
        telemetryEvents,
        logTelemetry,
        clearTelemetry,
        setDailyGoal,
        toggleDailyGoalComplete,
        removeDailyGoal,
        planLeave,
        startMissedClassMicroGoal,
        updateCareerProfile,
        generateAIGoal,
        isGeneratingGoal,
        completeMicroCaseStudy,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
