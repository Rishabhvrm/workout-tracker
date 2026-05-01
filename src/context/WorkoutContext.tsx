import React, { createContext, useContext, useReducer, useCallback } from 'react';
import type { AppStorage, WorkoutSession, SessionExercise } from '../types';
import { readStorage, writeStorage } from '../services/storage';
import { workoutPlans } from '../data/workoutPlans';
import { getTodayISO, getDayIndex } from '../utils/dateUtils';

type Action =
  | { type: 'START_SESSION' }
  | { type: 'TOGGLE_EXERCISE'; exerciseId: string }
  | { type: 'UPDATE_WEIGHT'; exerciseId: string; setIndex: number; weight: number | null }
  | { type: 'UPDATE_REPS'; exerciseId: string; setIndex: number; reps: number | null }
  | { type: 'ADD_SET'; exerciseId: string }
  | { type: 'COMPLETE_WORKOUT' }
  | { type: 'RESET_TODAY' }
  | { type: 'SET_WEIGHT_UNIT'; unit: 'lbs' | 'kg' }
  | { type: 'SET_REST_TIMER'; seconds: number }
  | { type: 'RESET_CYCLE' }
  | { type: 'RELOAD' };

function getActiveProfile(state: AppStorage) {
  return state.profiles[state.activeProfileId];
}

function reducer(state: AppStorage, action: Action): AppStorage {
  const profile = getActiveProfile(state);
  const today = getTodayISO();

  switch (action.type) {
    case 'RELOAD':
      return readStorage();

    case 'START_SESSION': {
      if (profile.sessions[today]) return state;
      const plan = workoutPlans[profile.settings.defaultPlanId];
      const dayIndex = getDayIndex(profile.settings.cycleAnchorDate, plan.days.length);
      const day = plan.days[dayIndex];
      const session: WorkoutSession = {
        date: today,
        planId: plan.id,
        dayLabel: day.label,
        startedAt: new Date().toISOString(),
        completedAt: null,
        exercises: day.exercises.map((ex): SessionExercise => ({
          exerciseId: ex.id,
          name: ex.name,
          completed: false,
          sets: Array.from({ length: ex.sets }, (_, i) => ({
            setNumber: i + 1,
            targetReps: ex.reps,
            actualReps: null,
            weight: null,
          })),
        })),
      };
      const next: AppStorage = {
        ...state,
        profiles: {
          ...state.profiles,
          [state.activeProfileId]: {
            ...profile,
            cycleState: { ...profile.cycleState, planId: plan.id, dayIndex },
            sessions: { ...profile.sessions, [today]: session },
          },
        },
      };
      writeStorage(next);
      return next;
    }

    case 'TOGGLE_EXERCISE': {
      const session = profile.sessions[today];
      if (!session) return state;
      const exercises = session.exercises.map(ex =>
        ex.exerciseId === action.exerciseId ? { ...ex, completed: !ex.completed } : ex
      );
      const next = updateSession(state, today, { exercises });
      writeStorage(next);
      return next;
    }

    case 'UPDATE_WEIGHT': {
      const session = profile.sessions[today];
      if (!session) return state;
      const exercises = session.exercises.map(ex => {
        if (ex.exerciseId !== action.exerciseId) return ex;
        const sets = ex.sets.map((s, i) =>
          i === action.setIndex ? { ...s, weight: action.weight } : s
        );
        return { ...ex, sets };
      });
      const next = updateSession(state, today, { exercises });
      writeStorage(next);
      return next;
    }

    case 'UPDATE_REPS': {
      const session = profile.sessions[today];
      if (!session) return state;
      const exercises = session.exercises.map(ex => {
        if (ex.exerciseId !== action.exerciseId) return ex;
        const sets = ex.sets.map((s, i) =>
          i === action.setIndex ? { ...s, actualReps: action.reps } : s
        );
        return { ...ex, sets };
      });
      const next = updateSession(state, today, { exercises });
      writeStorage(next);
      return next;
    }

    case 'ADD_SET': {
      const session = profile.sessions[today];
      if (!session) return state;
      const exercises = session.exercises.map(ex => {
        if (ex.exerciseId !== action.exerciseId) return ex;
        const lastSet = ex.sets[ex.sets.length - 1];
        const newSet = {
          setNumber: ex.sets.length + 1,
          targetReps: lastSet?.targetReps ?? '10',
          actualReps: null,
          weight: lastSet?.weight ?? null,
        };
        return { ...ex, sets: [...ex.sets, newSet] };
      });
      const next = updateSession(state, today, { exercises });
      writeStorage(next);
      return next;
    }

    case 'COMPLETE_WORKOUT': {
      const session = profile.sessions[today];
      if (!session) return state;
      const next = updateSession(state, today, { completedAt: new Date().toISOString() });
      writeStorage(next);
      return next;
    }

    case 'RESET_TODAY': {
      const sessions = { ...profile.sessions };
      delete sessions[today];
      const next: AppStorage = {
        ...state,
        profiles: {
          ...state.profiles,
          [state.activeProfileId]: { ...profile, sessions },
        },
      };
      writeStorage(next);
      return next;
    }

    case 'SET_WEIGHT_UNIT': {
      const next: AppStorage = {
        ...state,
        profiles: {
          ...state.profiles,
          [state.activeProfileId]: {
            ...profile,
            settings: { ...profile.settings, weightUnit: action.unit },
          },
        },
      };
      writeStorage(next);
      return next;
    }

    case 'SET_REST_TIMER': {
      const next: AppStorage = {
        ...state,
        profiles: {
          ...state.profiles,
          [state.activeProfileId]: {
            ...profile,
            settings: { ...profile.settings, restTimerSeconds: action.seconds },
          },
        },
      };
      writeStorage(next);
      return next;
    }

    case 'RESET_CYCLE': {
      const next: AppStorage = {
        ...state,
        profiles: {
          ...state.profiles,
          [state.activeProfileId]: {
            ...profile,
            settings: { ...profile.settings, cycleAnchorDate: today },
          },
        },
      };
      writeStorage(next);
      return next;
    }

    default:
      return state;
  }
}

function updateSession(
  state: AppStorage,
  date: string,
  patch: Partial<WorkoutSession>
): AppStorage {
  const profile = getActiveProfile(state);
  const session = profile.sessions[date];
  return {
    ...state,
    profiles: {
      ...state.profiles,
      [state.activeProfileId]: {
        ...profile,
        sessions: {
          ...profile.sessions,
          [date]: { ...session, ...patch },
        },
      },
    },
  };
}

interface WorkoutContextValue {
  state: AppStorage;
  dispatch: React.Dispatch<Action>;
  profile: ReturnType<typeof getActiveProfile>;
  todaySession: WorkoutSession | undefined;
  todayDayLabel: string;
}

const WorkoutContext = createContext<WorkoutContextValue | null>(null);

export function WorkoutProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, readStorage);
  const profile = getActiveProfile(state);
  const todaySession = profile.sessions[getTodayISO()];

  const plan = workoutPlans[profile.settings.defaultPlanId];
  const dayIndex = getDayIndex(profile.settings.cycleAnchorDate, plan.days.length);
  const todayDayLabel = plan.days[dayIndex]?.label ?? 'Workout';

  const value: WorkoutContextValue = {
    state,
    dispatch,
    profile,
    todaySession,
    todayDayLabel,
  };

  return <WorkoutContext.Provider value={value}>{children}</WorkoutContext.Provider>;
}

export function useWorkout(): WorkoutContextValue {
  const ctx = useContext(WorkoutContext);
  if (!ctx) throw new Error('useWorkout must be used inside WorkoutProvider');
  return ctx;
}

export function useDispatch() {
  const { dispatch } = useWorkout();
  return useCallback(dispatch, [dispatch]);
}
