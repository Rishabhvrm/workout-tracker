import { useState, useRef } from 'react';
import { useWorkout, useDispatch, getEffectivePlan } from '../../context/WorkoutContext';
import { useToast } from '../../context/ToastContext';
import { useConfirm } from '../../context/ConfirmContext';
import type { Exercise } from '../../types';
import { parsePlanMd, generatePlanId } from '../../utils/parsePlanMd';
import EditExerciseModal from '../ui/EditExerciseModal';

export default function PlanEditor() {
  const { profile } = useWorkout();
  const dispatch = useDispatch();
  const { showToast } = useToast();
  const { confirm } = useConfirm();
  const plan = getEffectivePlan(profile);
  const unit = profile.settings.weightUnit;

  const [editingName, setEditingName] = useState(false);
  const [nameInput, setNameInput] = useState('');
  const nameInputRef = useRef<HTMLInputElement>(null);
  const [expandedDay, setExpandedDay] = useState<string | null>(null);
  const [editingEx, setEditingEx] = useState<{ dayId: string; ex: Exercise } | null>(null);
  const [addingTo, setAddingTo] = useState<string | null>(null);
  const [newExName, setNewExName] = useState('');

  function handleImportMd(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async ev => {
      const text = ev.target?.result as string;
      const parsed = parsePlanMd(text, generatePlanId());
      if (parsed) {
        if (await confirm({ title: `Import "${parsed.name}"?`, message: `${parsed.days.length} days — this will replace your current plan.`, confirmLabel: 'Import', destructive: true })) {
          dispatch({ type: 'IMPORT_PLAN', plan: parsed });
        }
      } else {
        showToast('Could not parse the file. Make sure it uses the same format as the lean bulk template.', 'error');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  }

  function handleImportJson(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async ev => {
      try {
        const parsed = JSON.parse(ev.target?.result as string);
        if (parsed?.days?.length) {
          if (await confirm({ title: `Import "${parsed.name}"?`, message: `${parsed.days.length} days`, confirmLabel: 'Import' })) {
            dispatch({ type: 'IMPORT_PLAN', plan: parsed });
          }
        } else {
          showToast('Invalid plan JSON format.', 'error');
        }
      } catch {
        showToast('Could not parse JSON file.', 'error');
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
        <div className="flex-1 min-w-0">
          {editingName ? (
            <div className="flex items-center gap-2">
              <input
                ref={nameInputRef}
                autoFocus
                type="text"
                value={nameInput}
                onChange={e => setNameInput(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') { const t = nameInput.trim(); if (t) dispatch({ type: 'RENAME_PLAN', name: t }); setEditingName(false); }
                  if (e.key === 'Escape') setEditingName(false);
                }}
                className="flex-1 bg-gray-700 text-white text-sm font-semibold px-2 py-0.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-500"
              />
              <button
                onClick={() => { const t = nameInput.trim(); if (t) dispatch({ type: 'RENAME_PLAN', name: t }); setEditingName(false); }}
                className="text-orange-400 text-xs font-medium"
              >✓</button>
              <button onClick={() => setEditingName(false)} className="text-gray-500 text-xs">✕</button>
            </div>
          ) : (
            <div className="flex items-center gap-1.5">
              <p className="text-white font-semibold text-sm truncate">{plan.name}</p>
              <button
                onClick={() => { setNameInput(plan.name); setEditingName(true); }}
                className="text-gray-600 hover:text-orange-400 transition-colors flex-shrink-0"
                aria-label="Rename plan"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3 h-3">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
              </button>
            </div>
          )}
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
            onClick={async () => { if (await confirm({ title: 'Revert to built-in plan?', confirmLabel: 'Revert', destructive: true })) dispatch({ type: 'IMPORT_PLAN', plan: { ...plan, id: 'reset' } }); }}
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
                      onClick={async () => { if (await confirm({ title: `Remove "${ex.name}"?`, confirmLabel: 'Remove', destructive: true })) dispatch({ type: 'REMOVE_EXERCISE', dayId: day.id, exerciseId: ex.id }); }}
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
