import { useState } from 'react';
import type { SessionExercise } from '../../types';
import ExerciseCard from './ExerciseCard';
import { useWorkout, useDispatch, getEffectivePlan } from '../../context/WorkoutContext';

interface Props {
  exercises: SessionExercise[];
  planId: string;
  dayId: string;
}

export default function ExerciseList({ exercises, dayId }: Props) {
  const { profile } = useWorkout();
  const dispatch = useDispatch();
  const plan = getEffectivePlan(profile);
  const planExercises = plan.days.flatMap(d => d.exercises);
  const notesMap = Object.fromEntries(planExercises.map(e => [e.id, e.notes]));

  const [adding, setAdding] = useState(false);
  const [newName, setNewName] = useState('');

  function handleAdd() {
    if (!newName.trim()) return;
    dispatch({ type: 'ADD_EXERCISE', dayId, exercise: {
      id: `custom-${Date.now()}`,
      name: newName.trim(),
      sets: 3,
      reps: '8-12',
    }});
    setNewName('');
    setAdding(false);
  }

  return (
    <div className="space-y-3">
      {exercises.map(ex => (
        <ExerciseCard key={ex.exerciseId} exercise={ex} notes={notesMap[ex.exerciseId]} dayId={dayId} />
      ))}

      {adding ? (
        <div className="flex gap-2 mt-3">
          <input
            autoFocus
            value={newName}
            onChange={e => setNewName(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') handleAdd(); if (e.key === 'Escape') setAdding(false); }}
            placeholder="Exercise name…"
            className="flex-1 bg-gray-800 text-white text-sm rounded-xl px-3 py-2 border border-gray-700 focus:border-orange-500 outline-none"
          />
          <button onClick={handleAdd} className="px-3 py-2 bg-orange-500 text-white text-sm font-semibold rounded-xl">Add</button>
          <button onClick={() => { setAdding(false); setNewName(''); }} className="px-3 py-2 text-gray-500 text-sm">✕</button>
        </div>
      ) : (
        <button
          onClick={() => setAdding(true)}
          className="mt-1 w-full py-2.5 text-sm text-orange-400 font-medium border border-dashed border-gray-700 rounded-xl hover:border-orange-500/50 transition-colors flex items-center justify-center gap-1.5"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-3.5 h-3.5">
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add exercise
        </button>
      )}
    </div>
  );
}
