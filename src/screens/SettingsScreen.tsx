import { useState } from 'react';
import { useWorkout, useDispatch, getEffectivePlan, getTodayDayIndexFromPlan } from '../context/WorkoutContext';
import { useAuth } from '../context/AuthContext';
import { exportStorageJson, importStorageJson } from '../services/storage';
import { getTodayISO } from '../utils/dateUtils';
import PlanEditor from '../components/settings/PlanEditor';

export default function SettingsScreen() {
  const { profile } = useWorkout();
  const dispatch = useDispatch();
  const { user, isGuest, signOut, showAuthScreen } = useAuth();
  const [showPlanEditor, setShowPlanEditor] = useState(false);

  const plan = getEffectivePlan(profile);
  const dayIndex = getTodayDayIndexFromPlan(plan, profile.settings.cycleAnchorDate);

  function handleImport() {
    const json = prompt('Paste your exported JSON:');
    if (!json) return;
    if (importStorageJson(json)) {
      dispatch({ type: 'RELOAD' });
      alert('Data imported!');
    } else {
      alert('Invalid data.');
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
                onClick={() => { if (confirm('Sign out?')) signOut(); }}
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
          <p className="text-white text-sm font-medium">{plan.name}</p>
          {dayIndex >= 0 ? (
            <p className="text-xs text-gray-500 mt-1">
              Today: <span className="text-orange-400">{plan.days[dayIndex].label}</span>
            </p>
          ) : (
            <p className="text-xs text-gray-500 mt-1">Today is a rest day</p>
          )}

          {!plan.weeklySchedule && (
            <div className="mt-3 pt-3 border-t border-gray-800">
              <p className="text-xs text-gray-500 mb-1">Cycle anchor: {profile.settings.cycleAnchorDate}</p>
              <button
                onClick={() => { if (confirm('Reset cycle to start from today?')) dispatch({ type: 'RESET_CYCLE' }); }}
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
