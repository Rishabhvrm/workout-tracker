import { useState } from 'react';
import type { Exercise, SessionExercise, SessionSet } from '../../types';
import { useWorkout, useDispatch, getEffectivePlan } from '../../context/WorkoutContext';
import { exerciseTips } from '../../data/exerciseTips';
import PickerSheet, { weightValues, repsValues } from '../ui/PickerSheet';
import ExerciseInfoSheet from './ExerciseInfoSheet';
import EditExerciseModal from '../ui/EditExerciseModal';
import { useRestTimer } from '../../context/RestTimerContext';
import { getTodayISO } from '../../utils/dateUtils';
import { useConfirm } from '../../context/ConfirmContext';

interface Props {
  exercise: SessionExercise;
  notes?: string;
  dayId: string;
}

type PickerTarget = { exerciseId: string; setIndex: number; kind: 'weight' | 'reps' } | null;

export default function ExerciseCard({ exercise, notes, dayId }: Props) {
  const { profile } = useWorkout();
  const dispatch = useDispatch();
  const { start: startTimer } = useRestTimer();
  const { confirm } = useConfirm();
  const unit = profile.settings.weightUnit;
  const plan = getEffectivePlan(profile);
  const planEx: Exercise = plan.days.flatMap(d => d.exercises).find(e => e.id === exercise.exerciseId) ?? {
    id: exercise.exerciseId,
    name: exercise.name,
    sets: exercise.sets.length,
    reps: exercise.sets[0]?.targetReps ?? '8-12',
  };

  const today = getTodayISO();
  let lastExercise: SessionExercise | null = null;
  for (const s of Object.values(profile.sessions).sort((a, b) => b.date.localeCompare(a.date))) {
    if (s.date === today) continue;
    const found = s.exercises.find(e => e.exerciseId === exercise.exerciseId);
    if (found) { lastExercise = found; break; }
  }
  const prevWeights = Object.values(profile.sessions)
    .filter(s => s.date !== today)
    .flatMap(s => s.exercises.filter(e => e.exerciseId === exercise.exerciseId))
    .flatMap(e => e.sets.map(s => s.weight ?? 0));
  const allTimeMaxWeight = prevWeights.length > 0 ? Math.max(...prevWeights) : 0;

  const [expanded, setExpanded] = useState(!exercise.completed);
  const [picker, setPicker] = useState<PickerTarget>(null);
  const [showInfo, setShowInfo] = useState(false);
  const [prSetIndices, setPrSetIndices] = useState<Set<number>>(new Set());
  const [showEdit, setShowEdit] = useState(false);

  function toggle() {
    dispatch({ type: 'TOGGLE_EXERCISE', exerciseId: exercise.exerciseId });
    setExpanded(exercise.completed); // expand when un-completing, collapse when completing
  }

  const wValues = weightValues(unit);
  const rValues = repsValues();

  function parseLowerReps(targetReps: string): number {
    const match = targetReps.match(/\d+/);
    return match ? parseInt(match[0], 10) : 0;
  }

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
            {/* Tips button — only show when there's something to display */}
            {(exerciseTips[exercise.exerciseId] || notes) && <button
              onClick={e => { e.stopPropagation(); setShowInfo(true); }}
              className="flex flex-col items-center gap-0.5 p-1 text-gray-500 hover:text-orange-400 transition-colors flex-shrink-0"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
                <path d="M9 18h6" />
                <path d="M10 22h4" />
              </svg>
              <span className="text-[9px] leading-none font-medium">Tips</span>
            </button>}
            <button
              onClick={e => { e.stopPropagation(); setShowEdit(true); }}
              className="p-1 text-gray-600 hover:text-orange-400 transition-colors flex-shrink-0"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
            </button>
            <button
              onClick={async e => {
                e.stopPropagation();
                if (await confirm({ title: `Remove "${exercise.name}"?`, confirmLabel: 'Remove', destructive: true })) {
                  dispatch({ type: 'REMOVE_EXERCISE', dayId, exerciseId: exercise.exerciseId });
                }
              }}
              className="p-1 text-gray-600 hover:text-red-400 transition-colors flex-shrink-0"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                <path d="M10 11v6M14 11v6M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
              </svg>
            </button>
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
            <div className="grid gap-2 mb-2 px-1" style={{ gridTemplateColumns: '1.5rem 2.5rem 1fr 1fr 1.5rem' }}>
              <span className="text-xs text-gray-600">Set</span>
              <span className="text-xs text-gray-600">Rep</span>
              <span className="text-xs text-gray-600 text-center">Reps</span>
              <span className="text-xs text-gray-600 text-center">{unit}</span>
              <span />
            </div>

            {exercise.sets.map((set, i) => {
              const prevSet: SessionSet | undefined = lastExercise?.sets[i];
              return (
              <div key={i} className="grid gap-2 items-center mb-2" style={{ gridTemplateColumns: '1.5rem 2.5rem 1fr 1fr 1.5rem' }}>
                {/* Set number */}
                <span className="text-sm text-gray-400 font-medium">{set.setNumber}</span>

                {/* Target reps */}
                <span className="text-xs text-gray-500">{set.targetReps}</span>

                {/* Actual reps — tap to pick */}
                <button
                  onClick={() => setPicker({ exerciseId: exercise.exerciseId, setIndex: i, kind: 'reps' })}
                  className={`min-h-10 py-1.5 rounded-xl text-sm font-medium text-center transition-all active:scale-95 flex flex-col items-center justify-center gap-0.5 ${
                    set.actualReps !== null
                      ? 'bg-orange-500/20 text-orange-300 border border-orange-500/40'
                      : 'bg-gray-800 text-gray-500 border border-gray-700'
                  }`}
                >
                  <span>{set.actualReps !== null ? set.actualReps : '—'}</span>
                  {prevSet?.actualReps != null && (
                    <span className="text-[10px] text-gray-600 leading-none">{prevSet.actualReps}</span>
                  )}
                </button>

                {/* Weight — tap to pick */}
                <div className="relative">
                  <button
                    onClick={() => setPicker({ exerciseId: exercise.exerciseId, setIndex: i, kind: 'weight' })}
                    className={`w-full min-h-10 py-1.5 rounded-xl text-sm font-medium text-center transition-all active:scale-95 flex flex-col items-center justify-center gap-0.5 ${
                      set.weight !== null && set.weight > 0
                        ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                        : set.weight === 0
                        ? 'bg-gray-800 text-gray-400 border border-gray-700'
                        : 'bg-gray-800 text-gray-500 border border-gray-700'
                    }`}
                  >
                    <span>{set.weight !== null ? (set.weight === 0 ? 'BW' : set.weight) : '—'}</span>
                    {prevSet?.weight != null && (
                      <span className="text-[10px] text-gray-600 leading-none">
                        {prevSet.weight === 0 ? 'BW' : prevSet.weight}
                      </span>
                    )}
                  </button>
                  {prSetIndices.has(i) && (
                    <span className="absolute -top-1 -right-1 text-[9px] font-bold text-amber-400 leading-none pointer-events-none">PR</span>
                  )}
                </div>

                {/* Remove set — only show when more than 1 set */}
                {exercise.sets.length > 1 ? (
                  <button
                    onClick={() => dispatch({ type: 'REMOVE_SET', exerciseId: exercise.exerciseId, setIndex: i })}
                    className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-red-400 transition-colors"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-3.5 h-3.5">
                      <line x1="5" y1="12" x2="19" y2="12" strokeLinecap="round" />
                    </svg>
                  </button>
                ) : (
                  <span />
                )}
              </div>
              );
            })}

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
          onConfirm={v => {
            dispatch({
              type: 'UPDATE_WEIGHT',
              exerciseId: picker.exerciseId,
              setIndex: picker.setIndex,
              weight: v as number,
            });
            startTimer(profile.settings.restTimerSeconds);
            if ((v as number) > 0 && allTimeMaxWeight > 0 && (v as number) > allTimeMaxWeight) {
              setPrSetIndices(prev => new Set(prev).add(picker!.setIndex));
            }
          }}
          onClose={() => setPicker(null)}
        />
      )}

      {/* Reps picker sheet */}
      {picker?.kind === 'reps' && activePicker && (
        <PickerSheet
          open
          title={`Set ${picker.setIndex + 1} — Reps`}
          values={rValues}
          value={activePicker.actualReps ?? parseLowerReps(activePicker.targetReps)}
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

      {/* Exercise info sheet */}
      {showInfo && (
        <ExerciseInfoSheet
          exerciseId={exercise.exerciseId}
          exerciseName={exercise.name}
          notes={notes}
          onClose={() => setShowInfo(false)}
        />
      )}

      {/* Edit exercise modal */}
      {showEdit && (
        <EditExerciseModal
          ex={planEx}
          unit={unit}
          onSave={patch => {
            dispatch({ type: 'UPDATE_EXERCISE', dayId, exerciseId: exercise.exerciseId, patch });
            setShowEdit(false);
          }}
          onClose={() => setShowEdit(false)}
        />
      )}
    </>
  );
}
