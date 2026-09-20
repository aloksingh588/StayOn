import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { WebView } from './components/WebView';
import { AndroidView } from './components/AndroidView';
import { MissedClassModal } from './components/MissedClassModal';
import { LeaveModal } from './components/LeaveModal';
import { CareerProfileModal } from './components/CareerProfileModal';
import { InteractiveStudyModal } from './components/InteractiveStudyModal';
import { EvaluationDrawer } from './components/EvaluationDrawer';

const MainAppContent: React.FC = () => {
  const { platformMode, themeMode } = useApp();

  // Modal states
  const [isMissedClassModalOpen, setIsMissedClassModalOpen] = useState(false);
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);
  const [isCareerModalOpen, setIsCareerModalOpen] = useState(false);
  const [isCaseStudyModalOpen, setIsCaseStudyModalOpen] = useState(false);
  const [isEvaluationDrawerOpen, setIsEvaluationDrawerOpen] = useState(false);

  const isDark = themeMode === 'dark';

  return (
    <div
      className={`min-h-screen flex flex-col font-sans transition-colors duration-200 ${
        isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
      }`}
    >
      {/* Universal Top Control Header */}
      <Header
        onOpenCareerProfile={() => setIsCareerModalOpen(true)}
        onOpenEvaluationDrawer={() => setIsEvaluationDrawerOpen(true)}
      />

      {/* Main View Area: Toggles between Web and Android based on platformMode */}
      <main className="flex-1 w-full">
        {platformMode === 'web' ? (
          <WebView
            onOpenLeaveModal={() => setIsLeaveModalOpen(true)}
            onOpenMissedClassModal={() => setIsMissedClassModalOpen(true)}
            onOpenCareerProfile={() => setIsCareerModalOpen(true)}
            onOpenStudyModal={() => setIsCaseStudyModalOpen(true)}
          />
        ) : (
          <div className="py-6 px-2">
            <AndroidView
              onOpenLeaveModal={() => setIsLeaveModalOpen(true)}
              onOpenMissedClassModal={() => setIsMissedClassModalOpen(true)}
              onOpenCareerProfile={() => setIsCareerModalOpen(true)}
              onOpenStudyModal={() => setIsCaseStudyModalOpen(true)}
            />
          </div>
        )}
      </main>

      {/* Modals & Evaluation Drawer (shared across both platforms) */}
      <MissedClassModal
        isOpen={isMissedClassModalOpen}
        onClose={() => setIsMissedClassModalOpen(false)}
        onStartCaseStudy={() => setIsCaseStudyModalOpen(true)}
      />

      <LeaveModal
        isOpen={isLeaveModalOpen}
        onClose={() => setIsLeaveModalOpen(false)}
      />

      <CareerProfileModal
        isOpen={isCareerModalOpen}
        onClose={() => setIsCareerModalOpen(false)}
      />

      <InteractiveStudyModal
        isOpen={isCaseStudyModalOpen}
        onClose={() => setIsCaseStudyModalOpen(false)}
      />

      <EvaluationDrawer
        isOpen={isEvaluationDrawerOpen}
        onClose={() => setIsEvaluationDrawerOpen(false)}
        onOpenCaseStudy={() => setIsCaseStudyModalOpen(true)}
      />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
