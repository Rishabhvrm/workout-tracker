import { useWorkout, useDispatch } from '../context/WorkoutContext';
import { exportStorageJson, importStorageJson } from '../services/storage';
import { workoutPlans } from '../data/workoutPlans';
import { getDayIndex, getTodayISO } from '../utils/dateUtils';

export default function SettingsScreen() {
  const { profile } = useWorkout();
  const dispatch = useDispatch();

  const plan = workoutPlans[profile.settings.defaultPlanId];
  const dayIndex = getDayIndex(profile.settings.cycleAnchorDate, plan.days.length);

  function handleImport() {
    const json = prompt('Paste your exported JSON:');
    if (!json) return;
    const ok = importStorageJson(json);
    if (ok) {
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
        {/* Weight unit */}
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-4">
          <p className="text-sm text-gray-400 mb-3">Weight unit</p>
          <div className="flex gap-3">
            {(['lbs', 'kg'] as const).map(u => (
              <button
                key={u}
                onClick={() => dispatch({ type: 'SET_WEIGHT_UNIT', unit: u })}
                className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  profile.settings.weightUnit === u
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-800 text-gray-400'
                }`}
              >
                {u}
              </button>
            ))}
          </div>
        </div>

        {/* Rest timer */}
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-4">
          <p className="text-sm text-gray-400 mb-3">Rest timer (seconds)</p>
          <div className="flex gap-3">
            {[60, 90, 120, 180].map(s => (
              <button
                key={s}
                onClick={() => dispatch({ type: 'SET_REST_TIMER', seconds: s })}
                className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  profile.settings.restTimerSeconds === s
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-800 text-gray-400'
                }`}
              >
                {s}s
              </button>
            ))}
          </div>
        </div>

        {/* Cycle info */}
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-4">
          <p className="text-sm text-gray-400 mb-1">Workout cycle</p>
          <p className="text-white text-sm mb-1">
            Today: <span className="text-orange-400 font-semibold">{plan.days[dayIndex].label}</span>
            {' '}(Day {dayIndex + 1} of {plan.days.length})
          </p>
          <p className="text-xs text-gray-600 mb-3">
            Cycle started: {profile.settings.cycleAnchorDate}
          </p>
          <button
            onClick={() => {
              if (confirm('Reset cycle to start from today (Push Day 1)?')) {
                dispatch({ type: 'RESET_CYCLE' });
              }
            }}
            className="text-sm text-orange-400 hover:text-orange-300"
          >
            Reset cycle to today →
          </button>
        </div>

        {/* Data backup */}
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-4">
          <p className="text-sm text-gray-400 mb-3">Data backup</p>
          <div className="flex gap-3">
            <button
              onClick={handleExport}
              className="flex-1 bg-gray-800 text-gray-300 py-2.5 rounded-xl text-sm font-medium"
            >
              Export JSON
            </button>
            <button
              onClick={handleImport}
              className="flex-1 bg-gray-800 text-gray-300 py-2.5 rounded-xl text-sm font-medium"
            >
              Import JSON
            </button>
          </div>
        </div>

        <p className="text-center text-xs text-gray-700 pt-2">
          Data stored locally on this device
        </p>
      </div>
    </div>
  );
}
