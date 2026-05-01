import { exerciseTips } from '../../data/exerciseTips';

interface Props {
  exerciseId: string;
  exerciseName: string;
  notes?: string;
  onClose: () => void;
}

export default function ExerciseInfoSheet({ exerciseId, exerciseName, notes, onClose }: Props) {
  const tip = exerciseTips[exerciseId];

  return (
    <div className="fixed inset-0 z-50 flex items-end" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70" />
      <div
        className="relative w-full bg-gray-900 rounded-t-2xl max-h-[80vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1 sticky top-0 bg-gray-900">
          <div className="w-10 h-1 bg-gray-700 rounded-full" />
        </div>

        <div className="px-5 pb-8 pt-2">
          {/* Header */}
          <div className="flex items-start justify-between mb-5">
            <div>
              <h2 className="text-white font-bold text-xl">{exerciseName}</h2>
              {tip && <p className="text-orange-400 text-sm mt-0.5">{tip.muscles}</p>}
            </div>
            <button onClick={onClose} className="text-gray-500 p-1 -mt-1">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Workout notes (brief cue from plan) */}
          {notes && (
            <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl px-4 py-3 mb-5">
              <p className="text-xs font-semibold text-orange-400 uppercase tracking-wider mb-1">Coach note</p>
              <p className="text-sm text-orange-200">{notes}</p>
            </div>
          )}

          {tip ? (
            <>
              {/* Form cues */}
              <div className="mb-5">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Form cues</p>
                <div className="space-y-2">
                  {tip.cues.map((cue, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-orange-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-orange-400 text-xs font-bold">{i + 1}</span>
                      </div>
                      <p className="text-sm text-gray-200 leading-relaxed">{cue}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Common mistakes */}
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Common mistakes</p>
                <div className="space-y-2">
                  {tip.mistakes.map((mistake, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth={2.5} className="w-3 h-3">
                          <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                      </div>
                      <p className="text-sm text-gray-300 leading-relaxed">{mistake}</p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <p className="text-gray-500 text-sm text-center py-4">No detailed tips available for this exercise yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
