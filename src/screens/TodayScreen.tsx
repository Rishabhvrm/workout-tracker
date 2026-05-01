import { useEffect } from 'react';
import { useWorkout, useDispatch } from '../context/WorkoutContext';
import { workoutPlans } from '../data/workoutPlans';
import { getDayIndex, formatDisplayDate, getTodayISO } from '../utils/dateUtils';
import ExerciseList from '../components/workout/ExerciseList';
import WorkoutComplete from '../components/workout/WorkoutComplete';

export default function TodayScreen() {
  const { profile, todaySession } = useWorkout();
  const dispatch = useDispatch();

  const plan = workoutPlans[profile.settings.defaultPlanId];
  const dayIndex = getDayIndex(profile.settings.cycleAnchorDate, plan.days.length);
  const day = plan.days[dayIndex];

  useEffect(() => {
    if (!todaySession) {
      dispatch({ type: 'START_SESSION' });
    }
  }, []);

  const allDone = todaySession?.exercises.every(e => e.completed) ?? false;

  if (todaySession?.completedAt) {
    return (
      <div className="px-4 pt-6">
        <WorkoutComplete session={todaySession} />
      </div>
    );
  }

  const doneCount = todaySession?.exercises.filter(e => e.completed).length ?? 0;
  const total = todaySession?.exercises.length ?? 0;

  return (
    <div className="px-4 pt-6 pb-4">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-1">
          <div>
            <span className="text-xs text-gray-500 uppercase tracking-wider">{formatDisplayDate(getTodayISO())}</span>
            <h1 className="text-2xl font-bold text-white mt-0.5">{day.label} Day</h1>
          </div>
          <span className="bg-orange-500/20 text-orange-400 text-sm font-medium px-3 py-1 rounded-full">
            Day {dayIndex + 1} of {plan.days.length}
          </span>
        </div>

        {total > 0 && (
          <div className="mt-3">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>{doneCount} of {total} done</span>
              <span>{Math.round((doneCount / total) * 100)}%</span>
            </div>
            <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-orange-500 rounded-full transition-all duration-300"
                style={{ width: `${(doneCount / total) * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Exercise list */}
      {todaySession ? (
        <ExerciseList exercises={todaySession.exercises} planId={todaySession.planId} />
      ) : (
        <div className="text-gray-500 text-center py-12">Loading workout…</div>
      )}

      {/* Finish button */}
      {allDone && todaySession && !todaySession.completedAt && (
        <button
          onClick={() => dispatch({ type: 'COMPLETE_WORKOUT' })}
          className="mt-6 w-full bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-semibold py-4 rounded-2xl text-lg transition-all"
        >
          Finish Workout 🎉
        </button>
      )}

      {todaySession && !allDone && (
        <button
          onClick={() => {
            if (confirm('Reset today\'s workout? All logged data will be lost.')) {
              dispatch({ type: 'RESET_TODAY' });
            }
          }}
          className="mt-4 w-full text-sm text-gray-600 py-2"
        >
          Reset today
        </button>
      )}
    </div>
  );
}
