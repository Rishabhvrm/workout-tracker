import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useDispatch } from '../../context/WorkoutContext';
import { onboardingTemplates } from '../../data/onboardingTemplates';
import type { OnboardingTemplate } from '../../data/onboardingTemplates';

export default function OnboardingScreen() {
  const { user, clearNewUserFlag } = useAuth();
  const dispatch = useDispatch();
  const [step, setStep] = useState(1);
  const [unit, setUnit] = useState<'lbs' | 'kg'>('lbs');
  const [selected, setSelected] = useState<OnboardingTemplate>(onboardingTemplates[0]);

  const name = (user?.user_metadata?.name as string | undefined) || 'there';

  function finish(openSettings: boolean) {
    dispatch({ type: 'SET_WEIGHT_UNIT', unit });
    dispatch({ type: 'IMPORT_PLAN', plan: selected.plan });
    clearNewUserFlag();
    if (openSettings) {
      // Give WorkoutContext a tick to update before navigating
      setTimeout(() => {
        window.location.hash = '#/settings';
      }, 100);
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col"
         style={{ background: 'linear-gradient(160deg, #1c1917 0%, #111827 70%, #0f172a 100%)' }}>
      {/* Progress dots */}
      <div className="flex justify-center gap-2 pt-14 pb-2">
        {[1, 2, 3].map(n => (
          <div key={n} className={`h-1.5 rounded-full transition-all ${
            n === step ? 'w-8 bg-orange-500' : n < step ? 'w-4 bg-orange-500/40' : 'w-4 bg-gray-700'
          }`} />
        ))}
      </div>

      <div className="flex-1 flex flex-col px-6 py-6">
        {/* ── Step 1: Welcome + unit ── */}
        {step === 1 && (
          <div className="flex-1 flex flex-col">
            <h1 className="text-3xl font-extrabold text-white mt-4 mb-2">
              Hi {name}! 👋
            </h1>
            <p className="text-gray-400 text-sm mb-8">
              Let's get your workout plan set up. Takes 30 seconds.
            </p>

            <div className="bg-gray-900 rounded-2xl border border-gray-800 p-5 mb-4">
              <p className="text-sm font-semibold text-gray-300 mb-4">What unit do you train in?</p>
              <div className="flex gap-3">
                {(['lbs', 'kg'] as const).map(u => (
                  <button
                    key={u}
                    onClick={() => setUnit(u)}
                    className={`flex-1 py-4 rounded-xl text-base font-bold transition-all ${
                      unit === u
                        ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/25'
                        : 'bg-gray-800 text-gray-400'
                    }`}
                  >
                    {u}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-auto">
              <button
                onClick={() => setStep(2)}
                className="w-full py-4 rounded-2xl text-base font-bold text-white active:scale-95 transition-transform"
                style={{ background: 'linear-gradient(135deg, #f97316, #ea580c)', boxShadow: '0 6px 20px rgba(249,115,22,0.3)' }}
              >
                Next →
              </button>
            </div>
          </div>
        )}

        {/* ── Step 2: Pick a goal ── */}
        {step === 2 && (
          <div className="flex-1 flex flex-col">
            <h1 className="text-2xl font-extrabold text-white mt-4 mb-2">Pick your goal</h1>
            <p className="text-gray-400 text-sm mb-6">
              Choose a starting template. You can customize it anytime in Settings.
            </p>

            <div className="space-y-3 flex-1">
              {onboardingTemplates.map(tmpl => (
                <button
                  key={tmpl.id}
                  onClick={() => setSelected(tmpl)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all active:scale-98 ${
                    selected.id === tmpl.id
                      ? 'bg-orange-500/10 border-orange-500/60'
                      : 'bg-gray-900 border-gray-800'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-base font-bold ${selected.id === tmpl.id ? 'text-orange-400' : 'text-white'}`}>
                      {tmpl.name}
                    </span>
                    <span className="text-xs text-gray-500 bg-gray-800 px-2 py-0.5 rounded-full">
                      {tmpl.daysPerWeek}×/week
                    </span>
                  </div>
                  <p className="text-xs text-gray-400">{tmpl.description}</p>
                </button>
              ))}
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setStep(1)}
                className="flex-shrink-0 px-5 py-4 rounded-2xl bg-gray-900 border border-gray-800 text-gray-400 text-sm font-semibold"
              >
                ← Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="flex-1 py-4 rounded-2xl text-base font-bold text-white active:scale-95 transition-transform"
                style={{ background: 'linear-gradient(135deg, #f97316, #ea580c)', boxShadow: '0 6px 20px rgba(249,115,22,0.3)' }}
              >
                Next →
              </button>
            </div>
          </div>
        )}

        {/* ── Step 3: Ready ── */}
        {step === 3 && (
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <div className="text-6xl mb-6">🔥</div>
            <h1 className="text-2xl font-extrabold text-white mb-2">You're all set!</h1>
            <p className="text-gray-400 text-sm mb-2">
              Starting with <span className="text-orange-400 font-semibold">{selected.name}</span>
              {' '}— {selected.daysPerWeek} days/week
            </p>
            <p className="text-gray-600 text-xs mb-10">
              You can edit exercises and swap plans anytime in Settings.
            </p>

            <div className="w-full space-y-3">
              <button
                onClick={() => finish(false)}
                className="w-full py-4 rounded-2xl text-base font-bold text-white active:scale-95 transition-transform"
                style={{ background: 'linear-gradient(135deg, #f97316, #ea580c)', boxShadow: '0 6px 20px rgba(249,115,22,0.3)' }}
              >
                Start Training
              </button>
              <button
                onClick={() => finish(true)}
                className="w-full py-3 rounded-2xl text-sm font-medium text-gray-400 bg-gray-900 border border-gray-800 active:scale-95 transition-transform"
              >
                Customize exercises first →
              </button>
            </div>

            <button onClick={() => setStep(2)} className="mt-4 text-xs text-gray-700">
              ← Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
