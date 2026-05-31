import { useState, useRef } from 'react';
import { useWorkout, useDispatch, getEffectivePlan, getTodayDayIndexFromPlan } from '../context/WorkoutContext';
import { useAuth } from '../context/AuthContext';
import { exportStorageJson, importStorageJson } from '../services/storage';
import { getTodayISO } from '../utils/dateUtils';
import PlanEditor from '../components/settings/PlanEditor';
import { onboardingTemplates } from '../data/onboardingTemplates';
import { useConfirm } from '../context/ConfirmContext';
import { useToast } from '../context/ToastContext';

export default function SettingsScreen() {
  const { profile } = useWorkout();
  const dispatch = useDispatch();
  const { user, isGuest, signOut, showAuthScreen } = useAuth();
  const [showPlanEditor, setShowPlanEditor] = useState(false);
  const [editingName, setEditingName] = useState(false);
  const [nameInput, setNameInput] = useState('');
  const nameInputRef = useRef<HTMLInputElement>(null);

  const { confirm } = useConfirm();
  const { showToast } = useToast();
  const plan = getEffectivePlan(profile);
  const dayIndex = getTodayDayIndexFromPlan(plan, profile.settings.cycleAnchorDate);

  function handleImport() {
    const json = prompt('Paste your exported JSON:');
    if (!json) return;
    if (importStorageJson(json)) {
      dispatch({ type: 'RELOAD' });
      showToast('Data imported!');
    } else {
      showToast('Invalid data.', 'error');
    }
  }

  function handleExport() {
    const json = exportStorageJson();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `workout-backup-${getTodayISO()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="px-4 pt-6 pb-4">
      <h1 className="text-2xl font-bold text-white mb-6">Settings</h1>

      <div className="space-y-4">
        {/* Account section */}
        <section className="bg-gray-900 rounded-2xl border border-gray-800 p-4">
          {isGuest ? (
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-white">Guest</p>
                <p className="text-xs text-gray-500 mt-0.5">Data not saved</p>
              </div>
              <button onClick={showAuthScreen} className="text-xs font-semibold text-orange-400 bg-orange-500/10 border border-orange-500/30 px-3 py-1.5 rounded-lg">
                Sign up →
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-base flex-shrink-0">
                  {profile.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{profile.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{user?.email}</p>
                </div>
              </div>
              <button
                onClick={async () => { if (await confirm({ title: 'Sign out?', confirmLabel: 'Sign out', destructive: true })) signOut(); }}
                className="text-xs text-gray-500 bg-gray-800 px-3 py-1.5 rounded-lg hover:text-red-400 transition-colors"
              >
                Sign out
              </button>
            </div>
          )}
        </section>
        {/* Weight unit */}
        <section className="bg-gray-900 rounded-2xl border border-gray-800 p-4">
          <p className="text-sm text-gray-400 mb-3">Weight unit</p>
          <div className="flex gap-3">
            {(['lbs', 'kg'] as const).map(u => (
              <button
                key={u}
                onClick={() => dispatch({ type: 'SET_WEIGHT_UNIT', unit: u })}
                className={`flex-1 py-3 rounded-xl text-sm font-semibold transition-all ${
                  profile.settings.weightUnit === u
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-800 text-gray-400'
                }`}
              >
                {u}
              </button>
            ))}
          </div>
        </section>

        {/* Rest timer */}
        <section className="bg-gray-900 rounded-2xl border border-gray-800 p-4">
          <p className="text-sm text-gray-400 mb-3">Rest timer (seconds)</p>
          <div className="grid grid-cols-4 gap-2">
            {[60, 90, 120, 180].map(s => (
              <button
                key={s}
                onClick={() => dispatch({ type: 'SET_REST_TIMER', seconds: s })}
                className={`py-3 rounded-xl text-sm font-semibold transition-all ${
                  profile.settings.restTimerSeconds === s
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-800 text-gray-400'
                }`}
              >
                {s}s
              </button>
            ))}
          </div>
        </section>

        {/* Workout plan */}
        <section className="bg-gray-900 rounded-2xl border border-gray-800 p-4">
          <div className="flex items-center justify-between mb-1">
            <p className="text-sm text-gray-400">Workout plan</p>
            <button
              onClick={() => setShowPlanEditor(e => !e)}
              className="text-xs text-orange-400 font-medium"
            >
              {showPlanEditor ? 'Hide editor' : 'Edit plan'}
            </button>
          </div>
          {editingName ? (
            <div className="flex items-center gap-2 mt-0.5">
              <input
                ref={nameInputRef}
                autoFocus
                type="text"
                value={nameInput}
                onChange={e => setNameInput(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') { const t = nameInput.trim(); if (t) dispatch({ type: 'RENAME_PLAN', name: t }); setEditingName(false); }
                  if (e.key === 'Escape') setEditingName(false);
                }}
                className="flex-1 bg-gray-800 text-white text-sm font-medium px-2 py-0.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-500"
              />
              <button
                onClick={() => { const t = nameInput.trim(); if (t) dispatch({ type: 'RENAME_PLAN', name: t }); setEditingName(false); }}
                className="text-orange-400 text-xs font-medium"
              >✓</button>
              <button onClick={() => setEditingName(false)} className="text-gray-500 text-xs">✕</button>
            </div>
          ) : (
            <div className="flex items-center gap-1.5">
              <p className="text-white text-sm font-medium">{plan.name}</p>
              <button
                onClick={() => { setNameInput(plan.name); setEditingName(true); }}
                className="text-gray-600 hover:text-orange-400 transition-colors flex-shrink-0"
                aria-label="Rename plan"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3 h-3">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
              </button>
            </div>
          )}
          {dayIndex >= 0 ? (
            <p className="text-xs text-gray-500 mt-1">
              Today: <span className="text-orange-400">{plan.days[dayIndex].label}</span>
            </p>
          ) : (
            <p className="text-xs text-gray-500 mt-1">Today is a rest day</p>
          )}

          {/* Template switcher */}
          <div className="mt-3 pt-3 border-t border-gray-800">
            <p className="text-xs text-gray-500 mb-2">Switch template</p>
            <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
              {onboardingTemplates.map(t => {
                const activePlanId = profile.customPlan?.id ?? profile.settings.defaultPlanId;
                const isActive = t.plan.id === activePlanId;
                return (
                  <button
                    key={t.id}
                    onClick={async () => {
                      if (isActive) return;
                      if (await confirm({ title: `Switch to ${t.name}?`, message: 'Your workout history will be preserved.' })) {
                        dispatch({ type: 'IMPORT_PLAN', plan: t.plan });
                      }
                    }}
                    className={`flex-shrink-0 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-orange-500 text-white'
                        : 'bg-gray-800 text-gray-400 hover:text-orange-300 hover:border-orange-500/40 border border-gray-700'
                    }`}
                  >
                    {profile.settings.planNames?.[t.plan.id] ?? t.name}
                  </button>
                );
              })}
            </div>
          </div>

          {!plan.weeklySchedule && (
            <div className="mt-3 pt-3 border-t border-gray-800">
              <p className="text-xs text-gray-500 mb-1">Cycle anchor: {profile.settings.cycleAnchorDate}</p>
              <button
                onClick={async () => { if (await confirm({ title: 'Reset cycle to start from today?', confirmLabel: 'Reset', destructive: true })) dispatch({ type: 'RESET_CYCLE' }); }}
                className="text-xs text-orange-400"
              >
                Reset cycle to today →
              </button>
            </div>
          )}

          {showPlanEditor && (
            <div className="mt-4 pt-4 border-t border-gray-800">
              <PlanEditor />
            </div>
          )}
        </section>

        {/* Data backup */}
        <section className="bg-gray-900 rounded-2xl border border-gray-800 p-4">
          <p className="text-sm text-gray-400 mb-3">Data backup</p>
          <div className="flex gap-3">
            <button onClick={handleExport} className="flex-1 bg-gray-800 text-gray-300 py-3 rounded-xl text-sm font-medium">
              Export JSON
            </button>
            <button onClick={handleImport} className="flex-1 bg-gray-800 text-gray-300 py-3 rounded-xl text-sm font-medium">
              Import JSON
            </button>
          </div>
        </section>

        <p className="text-center text-xs text-gray-700 pt-2">
          {isGuest ? 'Data not saved — sign up to persist across devices' : 'Synced to Supabase · cached locally'}
        </p>
      </div>
    </div>
  );
}
