import type { WorkoutSession } from '../../types';
import { formatDuration } from '../../utils/dateUtils';
import { useDispatch, useWorkout } from '../../context/WorkoutContext';

interface Props {
  session: WorkoutSession;
}

function calcVolume(session: WorkoutSession): number {
  return session.exercises.reduce((total, ex) =>
    total + ex.sets.reduce((s, set) =>
      s + (set.weight ?? 0) * (set.actualReps ?? 0), 0), 0);
}

export default function WorkoutComplete({ session }: Props) {
  const dispatch = useDispatch();
  const { profile } = useWorkout();
  const volume = calcVolume(session);
  const duration = formatDuration(session.startedAt, session.completedAt);

  const prCount = session.exercises.reduce((count, ex) => {
    const todayMax = Math.max(0, ...ex.sets.map(s => s.weight ?? 0));
    if (todayMax === 0) return count;
    const prevWeights = Object.values(profile.sessions)
      .filter(s => s.date < session.date)
      .flatMap(s => s.exercises.filter(e => e.exerciseId === ex.exerciseId))
      .flatMap(e => e.sets.map(s => s.weight ?? 0));
    if (prevWeights.length === 0) return count;
    return todayMax > Math.max(...prevWeights) ? count + 1 : count;
  }, 0);

  return (
    <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
      <div className="w-20 h-20 rounded-full bg-orange-500/20 flex items-center justify-center mb-6">
        <svg viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth={2.5} className="w-10 h-10">
          <polyline points="20 6 9 17 4 12" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-white mb-2">Workout Complete!</h2>
      <p className="text-gray-400 mb-8">{session.dayLabel} · {duration}</p>

      <div className={`grid gap-4 w-full mb-8 ${prCount > 0 ? 'grid-cols-3 max-w-sm' : 'grid-cols-2 max-w-xs'}`}>
        <div className="bg-gray-900 rounded-xl p-4">
          <p className="text-3xl font-bold text-orange-400">{session.exercises.filter(e => e.completed).length}</p>
          <p className="text-xs text-gray-500 mt-1">exercises done</p>
        </div>
        <div className="bg-gray-900 rounded-xl p-4">
          <p className="text-3xl font-bold text-orange-400">{volume > 0 ? volume.toLocaleString() : '—'}</p>
          <p className="text-xs text-gray-500 mt-1">total volume</p>
        </div>
        {prCount > 0 && (
          <div className="bg-gray-900 rounded-xl p-4">
            <p className="text-3xl font-bold text-amber-400">{prCount}</p>
            <p className="text-xs text-gray-500 mt-1">new PR{prCount > 1 ? 's' : ''}</p>
          </div>
        )}
      </div>

      <button
        onClick={() => dispatch({ type: 'RESET_TODAY' })}
        className="text-sm text-gray-500 underline"
      >
        Redo today's workout
      </button>
    </div>
  );
}
