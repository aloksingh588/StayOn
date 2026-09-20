import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Flame,
  Briefcase,
  Monitor,
  Smartphone,
  Sparkles,
  ChevronDown,
  Moon,
  Sun,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { DemoStateKey } from '../types';

interface HeaderProps {
  onOpenCareerProfile: () => void;
  onOpenEvaluationDrawer: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenCareerProfile,
  onOpenEvaluationDrawer,
}) => {
  const {
    student,
    selectedDemoStateKey,
    selectDemoState,
    platformMode,
    setPlatformMode,
    themeMode,
    toggleTheme,
  } = useApp();

  const isDark = themeMode === 'dark';

  const demoStateLabels: Record<DemoStateKey, string> = {
    'arjun-on-track': '1. On Track (8d Streak)',
    'arjun-no-goal-today': '2. No Goal Set Today',
    'arjun-missed-days': '3. Missed 3 Days (AI Restart)',
    'arjun-taking-leave': '4. Taking Leave (Protected)',
    'arjun-missed-class': '5. Missed Class (90s Digest)',
    'arjun-reengaged': '6. Re-engaged (Resumed)',
  };

  return (
    <header
      className={`border-b sticky top-0 z-40 transition-colors backdrop-blur-md ${
        isDark
          ? 'bg-slate-950/90 border-slate-800 text-slate-100'
          : 'bg-white/90 border-slate-200 text-slate-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center font-black text-sm tracking-tight shadow-md">
            ON
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-lg tracking-tight">StayON</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 hidden sm:inline">
                HelloPM Ecosystem
              </span>
            </div>
            <p className="text-[11px] text-slate-400 -mt-0.5 hidden sm:block">
              Continuous Learning & Daily Commitment
            </p>
          </div>
        </div>

        {/* Center: Platform Switcher (Android vs Web) */}
        <div
          className={`flex rounded-xl p-1 border text-xs font-semibold ${
            isDark
              ? 'bg-slate-900 border-slate-800'
              : 'bg-slate-100 border-slate-200'
          }`}
        >
          <button
            onClick={() => setPlatformMode('web')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
              platformMode === 'web'
                ? isDark
                  ? 'bg-slate-800 text-white shadow-xs'
                  : 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Desktop Web Dashboard experience"
          >
            <Monitor className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Web Dashboard</span>
            <span className="sm:hidden">Web</span>
          </button>

          <button
            onClick={() => setPlatformMode('android')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
              platformMode === 'android'
                ? isDark
                  ? 'bg-slate-800 text-white shadow-xs'
                  : 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Android Mobile experience with bottom nav"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Android App</span>
            <span className="sm:hidden">Mobile</span>
          </button>
        </div>

        {/* Right Controls: Demo States Selector & Evaluation Drawer */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Demo State Dropdown */}
          <div className="relative hidden md:block">
            <select
              value={selectedDemoStateKey}
              onChange={(e) => selectDemoState(e.target.value as DemoStateKey)}
              className={`text-xs font-semibold py-1.5 pl-3 pr-8 rounded-xl border focus:outline-none transition-colors appearance-none cursor-pointer ${
                isDark
                  ? 'bg-slate-900 border-slate-800 text-slate-200 hover:border-slate-700'
                  : 'bg-white border-slate-300 text-slate-800 hover:border-slate-400'
              }`}
            >
              {(Object.keys(demoStateLabels) as DemoStateKey[]).map((key) => (
                <option key={key} value={key}>
                  Demo: {demoStateLabels[key]}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400" />
          </div>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-xl border transition-colors ${
              isDark
                ? 'border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                : 'border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode (HelloPM)'}
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>

          {/* Evaluation Drawer Button */}
          <button
            onClick={onOpenEvaluationDrawer}
            className="px-3 sm:px-3.5 py-1.5 rounded-xl bg-purple-500 hover:bg-purple-400 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
            title="Open P0 Acceptance Criteria & Live Telemetry Drawer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">P0 Criteria</span>
            <span className="bg-purple-900/60 text-purple-200 text-[10px] px-1.5 py-0.2 rounded-full">
              9/9
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
