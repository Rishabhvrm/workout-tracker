import { useState } from 'react';
import { useWorkout, useDispatch, getEffectivePlan } from '../../context/WorkoutContext';
import type { Exercise } from '../../types';
import { parsePlanMd, generatePlanId } from '../../utils/parsePlanMd';

export default function PlanEditor() {
  const { profile } = useWorkout();
  const dispatch = useDispatch();
  const plan = getEffectivePlan(profile);
  const unit = profile.settings.weightUnit;

  const [expandedDay, setExpandedDay] = useState<string | null>(null);
  const [editingEx, setEditingEx] = useState<{ dayId: string; ex: Exercise } | null>(null);
  const [addingTo, setAddingTo] = useState<string | null>(null);
  const [newExName, setNewExName] = useState('');

  function handleImportMd(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      const text = ev.target?.result as string;
      const parsed = parsePlanMd(text, generatePlanId());
      if (parsed) {
        if (confirm(`Import "${parsed.name}" with ${parsed.days.length} days? This will replace your current plan.`)) {
          dispatch({ type: 'IMPORT_PLAN', plan: parsed });
        }
      } else {
        alert('Could not parse the file. Make sure it uses the same format as the lean bulk template.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  }

  function handleImportJson(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      try {
        const parsed = JSON.parse(ev.target?.result as string);
        if (parsed?.days?.length) {
          if (confirm(`Import "${parsed.name}" with ${parsed.days.length} days?`)) {
            dispatch({ type: 'IMPORT_PLAN', plan: parsed });
          }
        } else {
          alert('Invalid plan JSON format.');
        }
      } catch {
        alert('Could not parse JSON file.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  }

  function saveEdit(patch: Partial<Exercise>) {
    if (!editingEx) return;
    dispatch({ type: 'UPDATE_EXERCISE', dayId: editingEx.dayId, exerciseId: editingEx.ex.id, patch });
    setEditingEx(null);
  }

  function addExercise(dayId: string) {
    if (!newExName.trim()) return;
    const id = `custom-${Date.now()}`;
    dispatch({ type: 'ADD_EXERCISE', dayId, exercise: { id, name: newExName.trim(), sets: 3, reps: '8-12' } });
    setNewExName('');
    setAddingTo(null);
  }

  return (
    <div>
      {/* Plan name + import */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-white font-semibold text-sm">{plan.name}</p>
          {profile.customPlan && (
            <p className="text-xs text-orange-400 mt-0.5">Custom plan active</p>
          )}
        </div>
      </div>

      {/* Import buttons */}
      <div className="flex gap-2 mb-5">
        <label className="flex-1 bg-gray-800 text-gray-300 text-xs font-medium py-2.5 rounded-xl text-center cursor-pointer hover:bg-gray-700 transition-colors">
          Import .md
          <input type="file" accept=".md,.txt" className="hidden" onChange={handleImportMd} />
        </label>
        <label className="flex-1 bg-gray-800 text-gray-300 text-xs font-medium py-2.5 rounded-xl text-center cursor-pointer hover:bg-gray-700 transition-colors">
          Import .json
          <input type="file" accept=".json" className="hidden" onChange={handleImportJson} />
        </label>
        {profile.customPlan && (
          <button
            onClick={() => { if (confirm('Revert to the built-in plan?')) dispatch({ type: 'IMPORT_PLAN', plan: { ...plan, id: 'reset' } }); }}
            className="flex-1 bg-gray-800 text-red-400 text-xs font-medium py-2.5 rounded-xl"
          >
            Reset plan
          </button>
        )}
      </div>

      {/* Days + exercises */}
      <div className="space-y-2">
        {plan.days.map(day => (
          <div key={day.id} className="bg-gray-800 rounded-xl overflow-hidden">
            <button
              onClick={() => setExpandedDay(expandedDay === day.id ? null : day.id)}
              className="w-full flex items-center justify-between px-4 py-3"
            >
              <div className="flex items-center gap-2">
                <span className="text-white text-sm font-semibold">{day.label}</span>
                {day.goal && <span className="text-xs text-gray-500 hidden sm:block">{day.goal}</span>}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">{day.exercises.length} exercises</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
                  className={`w-4 h-4 text-gray-600 transition-transform ${expandedDay === day.id ? 'rotate-180' : ''}`}>
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
            </button>

            {expandedDay === day.id && (
              <div className="px-4 pb-3 space-y-2 border-t border-gray-700">
                {day.exercises.map(ex => (
                  <div key={ex.id} className="flex items-center gap-2 py-2 border-b border-gray-700 last:border-0">
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm truncate">{ex.name}</p>
                      <p className="text-xs text-gray-500">
                        {ex.sets}×{ex.reps}
                        {ex.defaultWeightLbs ? ` · ${unit === 'lbs' ? ex.defaultWeightLbs + ' lbs' : (ex.defaultWeightKg ?? 0) + ' kg'} default` : ''}
                      </p>
                    </div>
                    <button
                      onClick={() => setEditingEx({ dayId: day.id, ex })}
                      className="p-1.5 text-gray-500 hover:text-orange-400 flex-shrink-0"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => { if (confirm(`Remove "${ex.name}"?`)) dispatch({ type: 'REMOVE_EXERCISE', dayId: day.id, exerciseId: ex.id }); }}
                      className="p-1.5 text-gray-500 hover:text-red-400 flex-shrink-0"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                        <polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                      </svg>
                    </button>
                  </div>
                ))}

                {/* Add exercise */}
                {addingTo === day.id ? (
                  <div className="flex gap-2 pt-2">
                    <input
                      autoFocus
                      type="text"
                      value={newExName}
                      onChange={e => setNewExName(e.target.value)}
                      onKeyDown={e => { if (e.key === 'Enter') addExercise(day.id); if (e.key === 'Escape') setAddingTo(null); }}
                      placeholder="Exercise name…"
                      className="flex-1 bg-gray-700 text-white text-sm px-3 py-2 rounded-xl focus:outline-none focus:ring-1 focus:ring-orange-500"
                    />
                    <button onClick={() => addExercise(day.id)} className="text-orange-400 text-sm font-medium px-2">Add</button>
                    <button onClick={() => setAddingTo(null)} className="text-gray-500 text-sm px-2">✕</button>
                  </div>
                ) : (
                  <button
                    onClick={() => setAddingTo(day.id)}
                    className="text-xs text-orange-400 flex items-center gap-1 pt-2"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-3.5 h-3.5">
                      <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                    Add exercise
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Edit exercise modal */}
      {editingEx && (
        <EditExerciseModal
          ex={editingEx.ex}
          unit={unit}
          onSave={saveEdit}
          onClose={() => setEditingEx(null)}
        />
      )}
    </div>
  );
}

function EditExerciseModal({ ex, unit, onSave, onClose }: {
  ex: Exercise;
  unit: string;
  onSave: (patch: Partial<Exercise>) => void;
  onClose: () => void;
}) {
  const [name, setName] = useState(ex.name);
  const [sets, setSets] = useState(String(ex.sets));
  const [reps, setReps] = useState(ex.reps);
  const [defaultW, setDefaultW] = useState(String(unit === 'lbs' ? (ex.defaultWeightLbs ?? '') : (ex.defaultWeightKg ?? '')));
  const [notes, setNotes] = useState(ex.notes ?? '');

  return (
    <div className="fixed inset-0 z-50 flex items-end" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative w-full bg-gray-900 rounded-t-2xl p-5" onClick={e => e.stopPropagation()}>
        <h3 className="text-white font-semibold mb-4">Edit Exercise</h3>
        <div className="space-y-3">
          <div>
            <label className="text-xs text-gray-500 block mb-1">Name</label>
            <input value={name} onChange={e => setName(e.target.value)} className="w-full bg-gray-800 text-white px-3 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-orange-500" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-gray-500 block mb-1">Sets</label>
              <input type="number" inputMode="numeric" value={sets} onChange={e => setSets(e.target.value)} className="w-full bg-gray-800 text-white px-3 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-orange-500" />
            </div>
            <div>
              <label className="text-xs text-gray-500 block mb-1">Reps</label>
              <input value={reps} onChange={e => setReps(e.target.value)} placeholder="e.g. 8-12" className="w-full bg-gray-800 text-white px-3 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-orange-500" />
            </div>
          </div>
          <div>
            <label className="text-xs text-gray-500 block mb-1">Default weight ({unit})</label>
            <input type="number" inputMode="decimal" value={defaultW} onChange={e => setDefaultW(e.target.value)} className="w-full bg-gray-800 text-white px-3 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-orange-500" />
          </div>
          <div>
            <label className="text-xs text-gray-500 block mb-1">Notes (optional)</label>
            <input value={notes} onChange={e => setNotes(e.target.value)} className="w-full bg-gray-800 text-white px-3 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-orange-500" />
          </div>
        </div>
        <div className="flex gap-3 mt-5">
          <button onClick={onClose} className="flex-1 bg-gray-800 text-gray-300 py-3 rounded-xl text-sm font-medium">Cancel</button>
          <button
            onClick={() => onSave({
              name,
              sets: parseInt(sets) || ex.sets,
              reps,
              notes: notes || undefined,
              ...(unit === 'lbs' ? { defaultWeightLbs: parseFloat(defaultW) || 0 } : { defaultWeightKg: parseFloat(defaultW) || 0 }),
            })}
            className="flex-1 bg-orange-500 text-white py-3 rounded-xl text-sm font-bold"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
