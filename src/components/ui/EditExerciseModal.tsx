import { useState, useEffect, useRef } from 'react';
import type { Exercise } from '../../types';

export default function EditExerciseModal({ ex, unit, onSave, onClose }: {
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
  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const main = document.querySelector<HTMLElement>('main');
    if (main) main.style.overflow = 'hidden';
    const prevent = (e: TouchEvent) => e.preventDefault();
    document.addEventListener('touchmove', prevent, { passive: false });
    const el = sheetRef.current;
    const stopProp = (e: TouchEvent) => e.stopPropagation();
    if (el) el.addEventListener('touchmove', stopProp, { passive: false });
    return () => {
      if (main) main.style.overflow = '';
      document.removeEventListener('touchmove', prevent);
      if (el) el.removeEventListener('touchmove', stopProp);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[60] flex items-end overflow-hidden" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60" />
      <div
        ref={sheetRef}
        className="relative w-full bg-gray-900 rounded-t-2xl p-5 max-h-[80vh] overflow-y-auto overscroll-contain"
        onClick={e => e.stopPropagation()}
      >
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
