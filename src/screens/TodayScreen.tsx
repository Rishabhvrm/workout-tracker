import { useEffect } from 'react';
import { useWorkout, useDispatch, getEffectivePlan, getTodayDayIndexFromPlan } from '../context/WorkoutContext';
import { formatDisplayDate, getTodayISO } from '../utils/dateUtils';
import ExerciseList from '../components/workout/ExerciseList';
import WorkoutComplete from '../components/workout/WorkoutComplete';

const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function TodayScreen() {
  const { profile, todaySession, isRestDay } = useWorkout();
  const dispatch = useDispatch();
  const plan = getEffectivePlan(profile);
  const dayIndex = getTodayDayIndexFromPlan(plan, profile.settings.cycleAnchorDate);
  const day = dayIndex >= 0 ? plan.days[dayIndex] : null;

  useEffect(() => {
    if (!isRestDay && !todaySession) {
      dispatch({ type: 'START_SESSION' });
    }
  }, [isRestDay]);

  // Rest day view
  if (isRestDay) {
    return (
      <div className="px-4 pt-6">
        <div className="mb-6">
          <span className="text-xs text-gray-500 uppercase tracking-wider">{formatDisplayDate(getTodayISO())}</span>
          <h1 className="text-2xl font-bold text-white mt-1">Rest Day</h1>
        </div>

        <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6 mb-4">
          <p className="text-3xl mb-3">😴</p>
          <h2 className="text-white font-semibold mb-2">Recovery is training too</h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Take it easy today. Light walking, mobility work, or full rest.
          </p>
        </div>

        {/* Weekend schedule from the plan */}
        <div className="bg-gray-900 rounded-2xl border border-gray-800 p-4">
          <p className="text-sm font-semibold text-gray-400 mb-3">Weekend Reset Checklist</p>
          {[
            'Batch cook for the week',
            'Grocery restock',
            'Review last week\'s lifts',
            'Plan next week\'s priorities (10–15 min)',
          ].map(item => (
            <div key={item} className="flex items-center gap-3 py-2 border-b border-gray-800 last:border-0">
              <div className="w-5 h-5 rounded border border-gray-700 flex-shrink-0" />
              <span className="text-sm text-gray-300">{item}</span>
            </div>
          ))}
        </div>

        {/* Upcoming week */}
        <div className="mt-4 bg-gray-900 rounded-2xl border border-gray-800 p-4">
          <p className="text-sm font-semibold text-gray-400 mb-3">This week</p>
          <div className="grid grid-cols-5 gap-2">
            {[1, 2, 3, 4, 5].map(dow => {
              const idx = plan.weeklySchedule?.[dow];
              const dayName = plan.days[idx ?? -1]?.label ?? '';
              return (
                <div key={dow} className="text-center">
                  <p className="text-xs text-gray-600 mb-1">{DAY_LABELS[dow]}</p>
                  <p className="text-xs font-medium text-orange-400">{dayName || '—'}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  if (todaySession?.completedAt) {
    return (
      <div className="px-4 pt-6">
        <WorkoutComplete session={todaySession} />
      </div>
    );
  }

  const doneCount = todaySession?.exercises.filter(e => e.completed).length ?? 0;
  const total = todaySession?.exercises.length ?? 0;
  const allDone = total > 0 && doneCount === total;

  return (
    <div className="px-4 pt-6 pb-4">
      {/* Header */}
      <div className="mb-5">
        <span className="text-xs text-gray-500 uppercase tracking-wider">{formatDisplayDate(getTodayISO())}</span>
        <div className="flex items-start justify-between mt-1">
          <div>
            <h1 className="text-2xl font-bold text-white">{day?.label ?? 'Workout'} Day</h1>
            {day?.goal && <p className="text-sm text-gray-500 mt-0.5">{day.goal}</p>}
          </div>
          <span className="mt-1 bg-orange-500/20 text-orange-400 text-xs font-semibold px-3 py-1.5 rounded-full">
            Day {(dayIndex ?? 0) + 1} / {plan.days.length}
          </span>
        </div>

        {/* Progress bar */}
        {total > 0 && (
          <div className="mt-4">
            <div className="flex justify-between text-xs text-gray-500 mb-1.5">
              <span>{doneCount} of {total} exercises</span>
              <span>{Math.round((doneCount / total) * 100)}%</span>
            </div>
            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-orange-500 rounded-full transition-all duration-500"
                style={{ width: `${(doneCount / total) * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* General rules banner */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 mb-5 text-xs text-gray-500 leading-relaxed">
        <span className="text-gray-400 font-medium">Tempo:</span> 2–3s eccentric ·{' '}
        <span className="text-gray-400 font-medium">Rest:</span> 90–120s compounds, 45–75s isolations ·{' '}
        <span className="text-gray-400 font-medium">Target:</span> +1 rep or +1–2.5kg/week
      </div>

      {/* Exercise list */}
      {todaySession ? (
        <ExerciseList exercises={todaySession.exercises} planId={todaySession.planId} />
      ) : (
        <div className="text-gray-500 text-center py-12">Loading workout…</div>
      )}

      {/* Finish / Reset */}
      {allDone && todaySession && !todaySession.completedAt && (
        <button
          onClick={() => dispatch({ type: 'COMPLETE_WORKOUT' })}
          className="mt-6 w-full bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-bold py-4 rounded-2xl text-lg transition-all shadow-lg shadow-orange-500/20"
        >
          Finish Workout 🎉
        </button>
      )}

      {todaySession && (
        <button
          onClick={() => {
            if (confirm('Reset today\'s workout? All logged data will be lost.')) {
              dispatch({ type: 'RESET_TODAY' });
            }
          }}
          className="mt-3 w-full text-sm text-gray-600 py-2"
        >
          Reset today
        </button>
      )}
    </div>
  );
}
