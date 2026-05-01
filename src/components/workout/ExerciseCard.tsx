import { useState } from 'react';
import type { SessionExercise } from '../../types';
import { useWorkout, useDispatch } from '../../context/WorkoutContext';
import PickerSheet, { weightValues, repsValues } from '../ui/PickerSheet';

interface Props {
  exercise: SessionExercise;
}

type PickerTarget = { exerciseId: string; setIndex: number; kind: 'weight' | 'reps' } | null;

export default function ExerciseCard({ exercise }: Props) {
  const { profile } = useWorkout();
  const dispatch = useDispatch();
  const unit = profile.settings.weightUnit;
  const [expanded, setExpanded] = useState(!exercise.completed);
  const [picker, setPicker] = useState<PickerTarget>(null);

  function toggle() {
    dispatch({ type: 'TOGGLE_EXERCISE', exerciseId: exercise.exerciseId });
    setExpanded(exercise.completed); // expand when un-completing, collapse when completing
  }

  const wValues = weightValues(unit);
  const rValues = repsValues();

  const activePicker = picker
    ? exercise.sets[picker.setIndex] ?? null
    : null;

  return (
    <>
      <div className={`rounded-2xl border transition-all ${
        exercise.completed
          ? 'bg-gray-900 border-gray-800 opacity-60'
          : 'bg-gray-900 border-gray-700'
      }`}>
        {/* Exercise header row */}
        <button
          onClick={() => setExpanded(e => !e)}
          className="w-full flex items-center gap-3 px-4 py-4 text-left"
        >
          {/* Completion circle */}
          <button
            onClick={e => { e.stopPropagation(); toggle(); }}
            className={`w-7 h-7 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all active:scale-90 ${
              exercise.completed
                ? 'bg-orange-500 border-orange-500'
                : 'border-gray-600 hover:border-orange-400'
            }`}
          >
            {exercise.completed && (
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={3} className="w-4 h-4">
                <polyline points="20 6 9 17 4 12" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>

          <span className={`font-semibold flex-1 text-base ${
            exercise.completed ? 'line-through text-gray-500' : 'text-white'
          }`}>
            {exercise.name}
          </span>

          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">{exercise.sets.length} sets</span>
            <svg
              viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
              className={`w-4 h-4 text-gray-600 transition-transform flex-shrink-0 ${expanded ? 'rotate-180' : ''}`}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </button>

        {/* Sets table */}
        {expanded && (
          <div className="px-4 pb-4">
            {/* Column headers */}
            <div className="grid grid-cols-4 gap-2 mb-2 px-1">
              <span className="text-xs text-gray-600">Set</span>
              <span className="text-xs text-gray-600">Target</span>
              <span className="text-xs text-gray-600 text-center">Reps</span>
              <span className="text-xs text-gray-600 text-center">{unit}</span>
            </div>

            {exercise.sets.map((set, i) => (
              <div key={i} className="grid grid-cols-4 gap-2 items-center mb-2">
                {/* Set number */}
                <span className="text-sm text-gray-400 font-medium pl-1">{set.setNumber}</span>

                {/* Target reps */}
                <span className="text-sm text-gray-500">{set.targetReps}</span>

                {/* Actual reps — tap to pick */}
                <button
                  onClick={() => setPicker({ exerciseId: exercise.exerciseId, setIndex: i, kind: 'reps' })}
                  className={`h-10 rounded-xl text-sm font-medium text-center transition-all active:scale-95 ${
                    set.actualReps !== null
                      ? 'bg-orange-500/20 text-orange-300 border border-orange-500/40'
                      : 'bg-gray-800 text-gray-500 border border-gray-700'
                  }`}
                >
                  {set.actualReps !== null ? set.actualReps : '—'}
                </button>

                {/* Weight — tap to pick */}
                <button
                  onClick={() => setPicker({ exerciseId: exercise.exerciseId, setIndex: i, kind: 'weight' })}
                  className={`h-10 rounded-xl text-sm font-medium text-center transition-all active:scale-95 ${
                    set.weight !== null && set.weight > 0
                      ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                      : set.weight === 0
                      ? 'bg-gray-800 text-gray-400 border border-gray-700'
                      : 'bg-gray-800 text-gray-500 border border-gray-700'
                  }`}
                >
                  {set.weight !== null ? (set.weight === 0 ? 'BW' : set.weight) : '—'}
                </button>
              </div>
            ))}

            {/* Add set */}
            <button
              onClick={() => dispatch({ type: 'ADD_SET', exerciseId: exercise.exerciseId })}
              className="mt-1 text-xs text-orange-400 hover:text-orange-300 flex items-center gap-1 py-1"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-3.5 h-3.5">
                <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Add set
            </button>
          </div>
        )}
      </div>

      {/* Weight picker sheet */}
      {picker?.kind === 'weight' && activePicker && (
        <PickerSheet
          open
          title={`Set ${picker.setIndex + 1} — Weight`}
          values={wValues}
          value={activePicker.weight ?? 0}
          unit={unit}
          onConfirm={v => dispatch({
            type: 'UPDATE_WEIGHT',
            exerciseId: picker.exerciseId,
            setIndex: picker.setIndex,
            weight: v as number,
          })}
          onClose={() => setPicker(null)}
        />
      )}

      {/* Reps picker sheet */}
      {picker?.kind === 'reps' && activePicker && (
        <PickerSheet
          open
          title={`Set ${picker.setIndex + 1} — Reps`}
          values={rValues}
          value={activePicker.actualReps ?? 0}
          unit="reps"
          onConfirm={v => dispatch({
            type: 'UPDATE_REPS',
            exerciseId: picker.exerciseId,
            setIndex: picker.setIndex,
            reps: v as number,
          })}
          onClose={() => setPicker(null)}
        />
      )}
    </>
  );
}
