import { useEffect, useState } from 'react';
import { useWorkout, useDispatch, getEffectivePlan, getTodayDayIndexFromPlan } from '../context/WorkoutContext';
import { formatDisplayDate, getTodayISO } from '../utils/dateUtils';
import { motivationQuotes } from '../data/quotes';
import ExerciseList from '../components/workout/ExerciseList';
import WorkoutComplete from '../components/workout/WorkoutComplete';

const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function getDailyQuote() {
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
  );
  return motivationQuotes[dayOfYear % motivationQuotes.length];
}

export default function TodayScreen() {
  const { profile, todaySession, isRestDay } = useWorkout();
  const dispatch = useDispatch();
  const plan = getEffectivePlan(profile);
  const scheduledIndex = getTodayDayIndexFromPlan(plan, profile.settings.cycleAnchorDate);

  const [manualDayIndex, setManualDayIndex] = useState<number | null>(null);
  const activeDayIndex = manualDayIndex ?? (scheduledIndex >= 0 ? scheduledIndex : 0);
  const quote = getDailyQuote();

  useEffect(() => {
    if (!isRestDay && !todaySession) {
      dispatch({ type: 'START_SESSION' });
    }
  }, []);

  function handleDaySelect(idx: number) {
    if (idx === activeDayIndex) return;
    if (todaySession && !todaySession.completedAt) {
      if (!confirm(`Switch to ${plan.days[idx].label}? This will reset today's session.`)) return;
      dispatch({ type: 'RESET_TODAY' });
    }
    setManualDayIndex(idx);
    setTimeout(() => dispatch({ type: 'START_SESSION', dayIndexOverride: idx }), 0);
  }

  if (todaySession?.completedAt) {
    return (
      <div className="px-4 pt-6">
        <WorkoutComplete session={todaySession} />
      </div>
    );
  }

  const day = plan.days[activeDayIndex];
  const doneCount = todaySession?.exercises.filter(e => e.completed).length ?? 0;
  const total = todaySession?.exercises.length ?? 0;
  const allDone = total > 0 && doneCount === total;
  const pct = total > 0 ? (doneCount / total) * 100 : 0;

  // Rest day view
  if (isRestDay && manualDayIndex === null) {
    return (
      <div>
        <div className="relative overflow-hidden px-5 pt-10 pb-8"
             style={{ background: 'linear-gradient(160deg, #1c1917 0%, #111827 60%, #0f172a 100%)' }}>
          <div className="absolute inset-0 opacity-10 pointer-events-none"
               style={{ backgroundImage: 'radial-gradient(circle at 70% 30%, #f97316 0%, transparent 60%)' }} />
          <p className="text-xs text-gray-500 uppercase tracking-widest mb-1 relative">{formatDisplayDate(getTodayISO())}</p>
          <h1 className="text-3xl font-bold text-white mb-2 relative">Rest Day 😴</h1>
          <p className="text-sm text-gray-500 italic relative">"{quote.text}"</p>
        </div>

        <div className="px-4 space-y-3 mt-4">
          <div className="bg-gray-900 rounded-2xl border border-gray-800 p-5">
            <p className="text-sm font-semibold text-gray-400 mb-3">Weekend Reset</p>
            {["Batch cook for the week", "Grocery restock", "Review last week's lifts", "Plan next week (10–15 min)"].map(item => (
              <div key={item} className="flex items-center gap-3 py-2.5 border-b border-gray-800 last:border-0">
                <div className="w-5 h-5 rounded border border-gray-700 flex-shrink-0" />
                <span className="text-sm text-gray-300">{item}</span>
              </div>
            ))}
          </div>

          <div className="bg-gray-900 rounded-2xl border border-gray-800 p-4">
            <p className="text-sm text-gray-400 mb-3">Train anyway? Pick a day:</p>
            <div className="flex gap-2 flex-wrap">
              {plan.days.map((d, i) => (
                <button key={d.id} onClick={() => { setManualDayIndex(i); dispatch({ type: 'START_SESSION', dayIndexOverride: i }); }}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-gray-800 text-gray-300 hover:bg-orange-500/20 hover:text-orange-400 transition-colors">
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          {plan.weeklySchedule && (
            <div className="bg-gray-900 rounded-2xl border border-gray-800 p-4">
              <p className="text-sm font-semibold text-gray-400 mb-3">This week</p>
              <div className="grid grid-cols-5 gap-1">
                {[1,2,3,4,5].map(dow => {
                  const idx = plan.weeklySchedule![dow];
                  return (
                    <div key={dow} className="text-center">
                      <p className="text-xs text-gray-600 mb-1">{DAY_LABELS[dow]}</p>
                      <p className="text-xs font-medium text-orange-400">{idx !== undefined ? plan.days[idx]?.label : '—'}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* ── Hero header ── */}
      <div className="relative overflow-hidden px-5 pt-10 pb-6"
           style={{ background: 'linear-gradient(160deg, #1c1917 0%, #111827 55%, #0f172a 100%)' }}>
        <div className="absolute inset-0 pointer-events-none"
             style={{ backgroundImage: 'radial-gradient(ellipse at 85% 0%, rgba(249,115,22,0.18) 0%, transparent 55%)' }} />

        <div className="relative">
          <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">{formatDisplayDate(getTodayISO())}</p>

          <div className="flex items-start justify-between mb-1">
            <h1 className="text-3xl font-extrabold text-white leading-tight">{day?.label}</h1>
            <span className="mt-1 text-xs font-bold text-orange-400 bg-orange-500/15 border border-orange-500/25 px-2.5 py-1 rounded-full">
              Day {activeDayIndex + 1}/{plan.days.length}
            </span>
          </div>

          {day?.goal && <p className="text-sm text-gray-400 mb-3">{day.goal}</p>}
          <p className="text-xs text-gray-500 italic">"{quote.text}"</p>

          {total > 0 && (
            <div className="mt-4">
              <div className="flex justify-between text-xs text-gray-500 mb-1.5">
                <span>{doneCount}/{total} exercises</span>
                <span>{Math.round(pct)}%</span>
              </div>
              <div className="h-1.5 bg-gray-800/80 rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all duration-500"
                     style={{ width: `${pct}%`, background: 'linear-gradient(90deg, #f97316, #fb923c)' }} />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Day picker ── */}
      <div className="px-4 pt-3 pb-1">
        <p className="text-xs text-gray-600 mb-2">Switch day</p>
        <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
          {plan.days.map((d, i) => {
            const isActive = i === activeDayIndex;
            const isScheduled = i === scheduledIndex && !isActive;
            return (
              <button key={d.id} onClick={() => handleDaySelect(i)}
                className={`flex-shrink-0 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-orange-500 text-white shadow-md shadow-orange-500/25'
                    : 'bg-gray-900 border border-gray-800 text-gray-400 hover:border-orange-500/40 hover:text-orange-300'
                }`}>
                {d.label}{isScheduled ? ' ·' : ''}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Exercises ── */}
      <div className="px-4 pt-3 pb-4">
        <div className="bg-gray-900/60 border border-gray-800 rounded-xl px-4 py-2.5 mb-4 text-xs text-gray-500">
          <span className="text-gray-400 font-medium">Tempo:</span> 2–3s down ·{' '}
          <span className="text-gray-400 font-medium">Rest:</span> 90–120s compounds, 45–75s isolations ·{' '}
          <span className="text-gray-400 font-medium">Goal:</span> +1 rep or +1–2.5 {profile.settings.weightUnit}/week
        </div>

        {todaySession ? (
          <ExerciseList exercises={todaySession.exercises} planId={todaySession.planId} />
        ) : (
          <div className="text-gray-600 text-center py-12 text-sm">Loading…</div>
        )}

        {allDone && todaySession && (
          <button onClick={() => dispatch({ type: 'COMPLETE_WORKOUT' })}
            className="mt-6 w-full py-4 rounded-2xl text-lg font-bold text-white active:scale-95 transition-transform"
            style={{ background: 'linear-gradient(135deg, #f97316, #ea580c)', boxShadow: '0 8px 24px rgba(249,115,22,0.35)' }}>
            Finish Workout 🎉
          </button>
        )}

        {todaySession && (
          <button onClick={() => { if (confirm("Reset today's workout?")) dispatch({ type: 'RESET_TODAY' }); }}
            className="mt-3 w-full text-xs text-gray-700 py-2">
            Reset today
          </button>
        )}
      </div>
    </div>
  );
}
