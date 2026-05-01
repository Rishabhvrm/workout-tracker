import { useState } from 'react';
import { useWorkout } from '../context/WorkoutContext';
import { workoutPlans } from '../data/workoutPlans';
import ProgressChart from '../components/progress/ProgressChart';

export default function ProgressScreen() {
  const { profile } = useWorkout();
  const unit = profile.settings.weightUnit;
  const sessions = Object.values(profile.sessions).sort((a, b) => a.date.localeCompare(b.date));

  const plan = workoutPlans[profile.settings.defaultPlanId];
  const allExercises = plan.days.flatMap(d => d.exercises);

  const [selectedId, setSelectedId] = useState(allExercises[0]?.id ?? '');
  const selected = allExercises.find(e => e.id === selectedId);

  return (
    <div className="px-4 pt-6 pb-4">
      <h1 className="text-2xl font-bold text-white mb-6">Progress</h1>

      {sessions.length === 0 ? (
        <div className="text-center py-16 text-gray-500">
          <p className="text-5xl mb-4">📈</p>
          <p>Start logging workouts to track your progress.</p>
        </div>
      ) : (
        <>
          <div className="mb-4">
            <label className="text-sm text-gray-400 block mb-2">Exercise</label>
            <select
              value={selectedId}
              onChange={e => setSelectedId(e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500"
            >
              {plan.days.map(day => (
                <optgroup key={day.id} label={day.label}>
                  {day.exercises.map(ex => (
                    <option key={ex.id} value={ex.id}>{ex.name}</option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>

          {selected && (
            <div className="bg-gray-900 rounded-xl border border-gray-800 p-4">
              <h2 className="text-white font-semibold mb-4">{selected.name}</h2>
              <ProgressChart sessions={sessions} exerciseId={selectedId} unit={unit} />
            </div>
          )}

          <div className="mt-6 space-y-3">
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Best lifts</h2>
            {allExercises.map(ex => {
              const weights = sessions.flatMap(s =>
                s.exercises.filter(e => e.exerciseId === ex.id)
                  .flatMap(e => e.sets.map(s => s.weight ?? 0))
              );
              const best = weights.length > 0 ? Math.max(...weights) : null;
              if (!best) return null;
              return (
                <div key={ex.id} className="flex justify-between items-center bg-gray-900 rounded-xl px-4 py-3 border border-gray-800">
                  <span className="text-white text-sm">{ex.name}</span>
                  <span className="text-orange-400 font-semibold">{best} {unit}</span>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
