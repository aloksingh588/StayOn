import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Briefcase, Target, Sparkles, X, Check, GraduationCap, Clock } from 'lucide-react';
import { CareerProfile } from '../types';

interface CareerProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CareerProfileModal: React.FC<CareerProfileModalProps> = ({ isOpen, onClose }) => {
  const { student, updateCareerProfile, themeMode } = useApp();

  const [currentRole, setCurrentRole] = useState(student.careerProfile.currentRole);
  const [currentWorkProfile, setCurrentWorkProfile] = useState(student.careerProfile.currentWorkProfile);
  const [yearsOfExperience, setYearsOfExperience] = useState(student.careerProfile.yearsOfExperience || 4);
  const [education, setEducation] = useState(student.careerProfile.education || 'B.Tech in Computer Science');
  const [futureCareerGoal, setFutureCareerGoal] = useState(student.careerProfile.futureCareerGoal);
  const [targetRole, setTargetRole] = useState(student.careerProfile.targetRole);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const isDark = themeMode === 'dark';

  if (!isOpen) return null;

  const targetRoleOptions = [
    'Product Manager',
    'Technical Product Manager',
    'Senior Product Manager',
    'Associate Product Manager',
    'AI Product Lead',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: CareerProfile = {
      ...student.careerProfile,
      currentRole,
      currentWorkProfile,
      yearsOfExperience: Number(yearsOfExperience),
      education,
      futureCareerGoal,
      targetRole,
    };
    updateCareerProfile(updated);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
      <div
        className={`w-full max-w-lg rounded-2xl p-6 shadow-2xl relative border max-h-[90vh] overflow-y-auto ${
          isDark
            ? 'bg-slate-900 border-slate-800 text-slate-100'
            : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-200 p-1 rounded-lg"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30 flex items-center justify-center">
            <Briefcase className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold">Career Profile & Alignment</h3>
            <p className="text-xs text-slate-400">P0 Requirement #9: Target role career personalization</p>
          </div>
        </div>

        <div
          className={`my-4 p-3.5 rounded-xl border text-xs flex items-start gap-2 ${
            isDark
              ? 'bg-purple-950/20 border-purple-800/40 text-purple-200'
              : 'bg-purple-50 border-purple-200 text-purple-900'
          }`}
        >
          <Sparkles className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
          <span>
            AI uses your work profile to prioritize micro-goals and surface course content that directly
            aligns with your background and target career.
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          {/* Current Role */}
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              Current Role
            </label>
            <input
              type="text"
              value={currentRole}
              onChange={(e) => setCurrentRole(e.target.value)}
              placeholder="e.g. Software Engineer"
              className={`w-full text-xs p-3 rounded-xl border focus:outline-none focus:ring-2 ${
                isDark
                  ? 'bg-slate-800 border-slate-700 text-white focus:ring-purple-500'
                  : 'bg-slate-50 border-slate-300 text-slate-900 focus:ring-slate-900'
              }`}
              required
            />
          </div>

          {/* Current Work Profile */}
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              Current Work Profile
            </label>
            <input
              type="text"
              value={currentWorkProfile}
              onChange={(e) => setCurrentWorkProfile(e.target.value)}
              placeholder="e.g. Backend systems, distributed microservices"
              className={`w-full text-xs p-3 rounded-xl border focus:outline-none focus:ring-2 ${
                isDark
                  ? 'bg-slate-800 border-slate-700 text-white focus:ring-purple-500'
                  : 'bg-slate-50 border-slate-300 text-slate-900 focus:ring-slate-900'
              }`}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* Years of experience */}
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Years of Experience
              </label>
              <input
                type="number"
                value={yearsOfExperience}
                onChange={(e) => setYearsOfExperience(Number(e.target.value))}
                className={`w-full text-xs p-3 rounded-xl border focus:outline-none ${
                  isDark
                    ? 'bg-slate-800 border-slate-700 text-white'
                    : 'bg-slate-50 border-slate-300 text-slate-900'
                }`}
                min={0}
                max={30}
              />
            </div>

            {/* Education detail (as seen in user sketch) */}
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Education Detail
              </label>
              <input
                type="text"
                value={education}
                onChange={(e) => setEducation(e.target.value)}
                placeholder="e.g. B.Tech in CS"
                className={`w-full text-xs p-3 rounded-xl border focus:outline-none ${
                  isDark
                    ? 'bg-slate-800 border-slate-700 text-white'
                    : 'bg-slate-50 border-slate-300 text-slate-900'
                }`}
              />
            </div>
          </div>

          {/* Future Career Goal */}
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              Future Career Goal
            </label>
            <input
              type="text"
              value={futureCareerGoal}
              onChange={(e) => setFutureCareerGoal(e.target.value)}
              placeholder="e.g. Transition into Product Management"
              className={`w-full text-xs p-3 rounded-xl border focus:outline-none focus:ring-2 ${
                isDark
                  ? 'bg-slate-800 border-slate-700 text-white focus:ring-purple-500'
                  : 'bg-slate-50 border-slate-300 text-slate-900 focus:ring-slate-900'
              }`}
              required
            />
          </div>

          {/* Target Role */}
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              Target Role
            </label>
            <select
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              className={`w-full text-xs p-3 rounded-xl border focus:outline-none ${
                isDark
                  ? 'bg-slate-800 border-slate-700 text-white'
                  : 'bg-slate-50 border-slate-300 text-slate-900'
              }`}
            >
              {targetRoleOptions.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className={`px-4 py-2 text-xs font-semibold rounded-xl border ${
                isDark
                  ? 'border-slate-700 text-slate-300 hover:bg-slate-800'
                  : 'border-slate-300 text-slate-700 hover:bg-slate-100'
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold rounded-xl bg-purple-500 hover:bg-purple-400 text-white shadow-md transition-colors flex items-center gap-1.5"
            >
              {savedSuccess ? (
                <>
                  <Check className="w-4 h-4" />
                  Saved!
                </>
              ) : (
                'Save Career Profile'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
