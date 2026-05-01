import { useState } from 'react';
import type { SessionExercise } from '../../types';
import { useWorkout, useDispatch } from '../../context/WorkoutContext';

interface Props {
  exercise: SessionExercise;
}

export default function ExerciseCard({ exercise }: Props) {
  const { profile } = useWorkout();
  const dispatch = useDispatch();
  const unit = profile.settings.weightUnit;
  const [expanded, setExpanded] = useState(!exercise.completed);

  function toggle() {
    dispatch({ type: 'TOGGLE_EXERCISE', exerciseId: exercise.exerciseId });
    if (!exercise.completed) setExpanded(false);
    else setExpanded(true);
  }

  return (
    <div className={`rounded-xl border transition-all ${
      exercise.completed
        ? 'bg-gray-900 border-gray-800 opacity-70'
        : 'bg-gray-900 border-gray-700'
    }`}>
      <button
        onClick={() => setExpanded(e => !e)}
        className="w-full flex items-center gap-3 p-4 text-left"
      >
        <button
          onClick={e => { e.stopPropagation(); toggle(); }}
          className={`w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all ${
            exercise.completed
              ? 'bg-orange-500 border-orange-500'
              : 'border-gray-600 hover:border-orange-400'
          }`}
        >
          {exercise.completed && (
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={3} className="w-3.5 h-3.5">
              <polyline points="20 6 9 17 4 12" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </button>
        <span className={`font-medium flex-1 ${exercise.completed ? 'line-through text-gray-500' : 'text-white'}`}>
          {exercise.name}
        </span>
        <span className="text-gray-500 text-sm">{exercise.sets.length} sets</span>
        <svg
          viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
          className={`w-4 h-4 text-gray-600 transition-transform ${expanded ? 'rotate-180' : ''}`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {expanded && (
        <div className="px-4 pb-4 space-y-2">
          <div className="grid grid-cols-4 gap-2 text-xs text-gray-500 px-1 mb-1">
            <span>Set</span>
            <span>Target</span>
            <span>Reps</span>
            <span>Weight ({unit})</span>
          </div>

          {exercise.sets.map((set, i) => (
            <div key={i} className="grid grid-cols-4 gap-2 items-center">
              <span className="text-gray-400 text-sm pl-1">{set.setNumber}</span>
              <span className="text-gray-400 text-sm">{set.targetReps}</span>
              <input
                type="number"
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="—"
                value={set.actualReps ?? ''}
                onChange={e => dispatch({
                  type: 'UPDATE_REPS',
                  exerciseId: exercise.exerciseId,
                  setIndex: i,
                  reps: e.target.value ? parseInt(e.target.value) : null,
                })}
                className="bg-gray-800 border border-gray-700 rounded-lg px-2 py-1.5 text-sm text-center text-white w-full focus:outline-none focus:border-orange-500"
              />
              <input
                type="number"
                inputMode="decimal"
                pattern="[0-9]*"
                placeholder="—"
                value={set.weight ?? ''}
                onChange={e => dispatch({
                  type: 'UPDATE_WEIGHT',
                  exerciseId: exercise.exerciseId,
                  setIndex: i,
                  weight: e.target.value ? parseFloat(e.target.value) : null,
                })}
                className="bg-gray-800 border border-gray-700 rounded-lg px-2 py-1.5 text-sm text-center text-white w-full focus:outline-none focus:border-orange-500"
              />
            </div>
          ))}

          <button
            onClick={() => dispatch({ type: 'ADD_SET', exerciseId: exercise.exerciseId })}
            className="mt-1 text-xs text-orange-400 hover:text-orange-300 flex items-center gap-1"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5">
              <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Add set
          </button>

          {exercise.sets[0] && (
            <p className="text-xs text-gray-600 mt-1">
              {/* notes from workoutPlans are not directly available here — shown via ExerciseList */}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
