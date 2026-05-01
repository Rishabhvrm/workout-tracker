import { useState } from 'react';
import type { WorkoutSession } from '../../types';
import { formatDisplayDate, formatDuration } from '../../utils/dateUtils';
import { useWorkout } from '../../context/WorkoutContext';

interface Props {
  session: WorkoutSession;
}

export default function HistoryCard({ session }: Props) {
  const { profile } = useWorkout();
  const [open, setOpen] = useState(false);
  const unit = profile.settings.weightUnit;
  const doneCount = session.exercises.filter(e => e.completed).length;
  const volume = session.exercises.reduce((t, ex) =>
    t + ex.sets.reduce((s, set) => s + (set.weight ?? 0) * (set.actualReps ?? 0), 0), 0);

  return (
    <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
      <button onClick={() => setOpen(o => !o)} className="w-full flex items-center p-4 text-left gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-semibold text-orange-400">{session.dayLabel}</span>
            <span className="text-xs text-gray-500">{formatDisplayDate(session.date)}</span>
          </div>
          <div className="flex gap-4 text-xs text-gray-500">
            <span>{doneCount}/{session.exercises.length} exercises</span>
            {session.completedAt && <span>{formatDuration(session.startedAt, session.completedAt)}</span>}
            {volume > 0 && <span>{volume.toLocaleString()} {unit} vol</span>}
          </div>
        </div>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
          className={`w-4 h-4 text-gray-600 flex-shrink-0 transition-transform ${open ? 'rotate-180' : ''}`}>
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <div className="border-t border-gray-800 p-4 space-y-3">
          {session.exercises.map(ex => {
            const bestWeight = Math.max(0, ...ex.sets.map(s => s.weight ?? 0));
            return (
              <div key={ex.exerciseId} className="flex items-center justify-between text-sm">
                <span className={ex.completed ? 'text-white' : 'text-gray-500 line-through'}>{ex.name}</span>
                <span className="text-gray-400 text-xs">
                  {ex.sets.length} sets{bestWeight > 0 ? ` · ${bestWeight}${unit}` : ''}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
