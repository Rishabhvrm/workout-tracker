import React, { createContext, useContext, useReducer, useCallback, useEffect, useRef, useState } from 'react';
import type { AppStorage, WorkoutSession, SessionExercise, WorkoutPlan, UserProfile } from '../types';
import { readStorage, writeStorage, setGuestMode } from '../services/storage';
import { workoutPlans, DEFAULT_PLAN_ID } from '../data/workoutPlans';
import { getTodayISO, getTodayDayOfWeek, getDayIndex } from '../utils/dateUtils';
import { fetchProfile, fetchSessions, fetchCustomPlan, upsertProfile, upsertSession, upsertCustomPlan } from '../services/database';
import type { DbProfile } from '../services/database';
import { useAuth } from './AuthContext';

type Action =
  | { type: 'START_SESSION'; dayIndexOverride?: number }
  | { type: 'TOGGLE_EXERCISE'; exerciseId: string }
  | { type: 'UPDATE_WEIGHT'; exerciseId: string; setIndex: number; weight: number | null }
  | { type: 'UPDATE_REPS'; exerciseId: string; setIndex: number; reps: number | null }
  | { type: 'ADD_SET'; exerciseId: string }
  | { type: 'REMOVE_SET'; exerciseId: string; setIndex: number }
  | { type: 'COMPLETE_WORKOUT' }
  | { type: 'RESET_TODAY' }
  | { type: 'SET_WEIGHT_UNIT'; unit: 'lbs' | 'kg' }
  | { type: 'SET_REST_TIMER'; seconds: number }
  | { type: 'RESET_CYCLE' }
  | { type: 'IMPORT_PLAN'; plan: WorkoutPlan }
  | { type: 'UPDATE_EXERCISE'; dayId: string; exerciseId: string; patch: Partial<import('../types').Exercise> }
  | { type: 'ADD_EXERCISE'; dayId: string; exercise: import('../types').Exercise }
  | { type: 'REMOVE_EXERCISE'; dayId: string; exerciseId: string }
  | { type: 'RELOAD' }
  | { type: 'SET_ACTIVE_USER'; userId: string; name: string }
  | { type: 'MERGE_REMOTE'; sessions: Record<string, WorkoutSession>; customPlan: WorkoutPlan | null; remoteProfile: DbProfile | null };

function getActiveProfile(state: AppStorage) {
  return state.profiles[state.activeProfileId];
}

// Returns the effective plan: custom override > built-in
export function getEffectivePlan(profile: ReturnType<typeof getActiveProfile>): WorkoutPlan {
  if (profile.customPlan) return profile.customPlan;
  return workoutPlans[profile.settings.defaultPlanId] ?? workoutPlans['lean-bulk-5day'];
}

// Determine today's workout day index (-1 = rest day)
export function getTodayDayIndexFromPlan(plan: WorkoutPlan, cycleAnchorDate: string): number {
  if (plan.weeklySchedule) {
    const dow = getTodayDayOfWeek();
    if (plan.restDays?.includes(dow)) return -1;
    const idx = plan.weeklySchedule[dow];
    return idx !== undefined ? idx : -1;
  }
  return getDayIndex(cycleAnchorDate, plan.days.length);
}

function reducer(state: AppStorage, action: Action): AppStorage {
  const profile = getActiveProfile(state);
  const today = getTodayISO();

  switch (action.type) {
    case 'RELOAD':
      return readStorage();

    case 'START_SESSION': {
      if (profile.sessions[today]) return state;
      const plan = getEffectivePlan(profile);
      const scheduled = getTodayDayIndexFromPlan(plan, profile.settings.cycleAnchorDate);
      const dayIndex = action.dayIndexOverride ?? (scheduled === -1 ? 0 : scheduled);
      if (dayIndex === -1) return state;
      const day = plan.days[dayIndex];
      const isKg = profile.settings.weightUnit === 'kg';
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
            // Pre-populate with default weight
            weight: isKg
              ? (ex.defaultWeightKg ?? null)
              : (ex.defaultWeightLbs ?? null),
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
        return {
          ...ex,
          sets: [...ex.sets, {
            setNumber: ex.sets.length + 1,
            targetReps: lastSet?.targetReps ?? '10',
            actualReps: null,
            weight: lastSet?.weight ?? null,
          }],
        };
      });
      const next = updateSession(state, today, { exercises });
      writeStorage(next);
      return next;
    }

    case 'REMOVE_SET': {
      const session = profile.sessions[today];
      if (!session) return state;
      const exercises = session.exercises.map(ex => {
        if (ex.exerciseId !== action.exerciseId) return ex;
        if (ex.sets.length <= 1) return ex; // never remove the last set
        const sets = ex.sets
          .filter((_, i) => i !== action.setIndex)
          .map((s, i) => ({ ...s, setNumber: i + 1 }));
        return { ...ex, sets };
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
        profiles: { ...state.profiles, [state.activeProfileId]: { ...profile, sessions } },
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

    case 'IMPORT_PLAN': {
      const next: AppStorage = {
        ...state,
        profiles: {
          ...state.profiles,
          [state.activeProfileId]: { ...profile, customPlan: action.plan },
        },
      };
      writeStorage(next);
      return next;
    }

    case 'UPDATE_EXERCISE': {
      const plan = getEffectivePlan(profile);
      const updatedDays = plan.days.map(day => {
        if (day.id !== action.dayId) return day;
        return {
          ...day,
          exercises: day.exercises.map(ex =>
            ex.id === action.exerciseId ? { ...ex, ...action.patch } : ex
          ),
        };
      });
      const updatedPlan = { ...plan, days: updatedDays };
      const next: AppStorage = {
        ...state,
        profiles: {
          ...state.profiles,
          [state.activeProfileId]: { ...profile, customPlan: updatedPlan },
        },
      };
      writeStorage(next);
      return next;
    }

    case 'ADD_EXERCISE': {
      const plan = getEffectivePlan(profile);
      const updatedDays = plan.days.map(day => {
        if (day.id !== action.dayId) return day;
        return { ...day, exercises: [...day.exercises, action.exercise] };
      });
      const updatedPlan = { ...plan, days: updatedDays };
      const next: AppStorage = {
        ...state,
        profiles: {
          ...state.profiles,
          [state.activeProfileId]: { ...profile, customPlan: updatedPlan },
        },
      };
      writeStorage(next);
      return next;
    }

    case 'REMOVE_EXERCISE': {
      const plan = getEffectivePlan(profile);
      const updatedDays = plan.days.map(day => {
        if (day.id !== action.dayId) return day;
        return { ...day, exercises: day.exercises.filter(ex => ex.id !== action.exerciseId) };
      });
      const updatedPlan = { ...plan, days: updatedDays };
      const next: AppStorage = {
        ...state,
        profiles: {
          ...state.profiles,
          [state.activeProfileId]: { ...profile, customPlan: updatedPlan },
        },
      };
      writeStorage(next);
      return next;
    }

    case 'SET_ACTIVE_USER': {
      const { userId, name } = action;
      const existingProfile = state.profiles[userId];
      if (existingProfile) {
        // Migrate existing guest profiles from the advanced default to beginner
        const shouldMigrate = userId === 'guest' && existingProfile.settings.defaultPlanId === DEFAULT_PLAN_ID && !existingProfile.customPlan;
        const updatedProfile = shouldMigrate
          ? { ...existingProfile, settings: { ...existingProfile.settings, defaultPlanId: 'beginner-4day' } }
          : existingProfile;
        const next = { ...state, activeProfileId: userId, profiles: { ...state.profiles, [userId]: updatedProfile } };
        writeStorage(next);
        return next;
      }
      const today = getTodayISO();
      const newProfile: UserProfile = {
        id: userId,
        name,
        createdAt: today,
        settings: {
          defaultPlanId: 'beginner-4day',
          weightUnit: 'lbs',
          restTimerSeconds: 90,
          cycleAnchorDate: today,
        },
        cycleState: { planId: DEFAULT_PLAN_ID, dayIndex: 0, lastWorkoutDate: '' },
        sessions: {},
      };
      const next: AppStorage = {
        ...state,
        activeProfileId: userId,
        profiles: { ...state.profiles, [userId]: newProfile },
      };
      writeStorage(next);
      return next;
    }

    case 'MERGE_REMOTE': {
      const today = getTodayISO();
      const localProfile = getActiveProfile(state);
      const todayLocal = localProfile.sessions[today];

      const todayHasData = todayLocal?.exercises.some(e =>
        e.completed || e.sets.some(s => s.actualReps !== null)
      );
      const mergedSessions: Record<string, WorkoutSession> = {
        ...action.sessions,
        ...(todayHasData ? { [today]: todayLocal! } : {}),
      };

      const mergedSettings = action.remoteProfile ? {
        ...localProfile.settings,
        weightUnit: action.remoteProfile.weight_unit as 'lbs' | 'kg',
        restTimerSeconds: action.remoteProfile.rest_timer_seconds,
        cycleAnchorDate: action.remoteProfile.cycle_anchor_date,
      } : localProfile.settings;

      const mergedProfile: UserProfile = {
        ...localProfile,
        name: action.remoteProfile?.name ?? localProfile.name,
        settings: mergedSettings,
        sessions: mergedSessions,
        customPlan: action.customPlan ?? localProfile.customPlan,
      };

      const next: AppStorage = {
        ...state,
        profiles: { ...state.profiles, [state.activeProfileId]: mergedProfile },
      };
      writeStorage(next);
      return next;
    }

    default:
      return state;
  }
}

function updateSession(state: AppStorage, date: string, patch: Partial<WorkoutSession>): AppStorage {
  const profile = getActiveProfile(state);
  const session = profile.sessions[date];
  return {
    ...state,
    profiles: {
      ...state.profiles,
      [state.activeProfileId]: {
        ...profile,
        sessions: { ...profile.sessions, [date]: { ...session, ...patch } },
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
  isRestDay: boolean;
  syncReady: boolean;
}

const WorkoutContext = createContext<WorkoutContextValue | null>(null);

export function WorkoutProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, readStorage);
  const { user, isGuest, guestChosen } = useAuth();
  const syncTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [syncReady, setSyncReady] = useState(false);

  // Disable localStorage writes in guest mode
  useEffect(() => {
    setGuestMode(isGuest);
  }, [isGuest]);

  // Switch to the logged-in user's profile
  useEffect(() => {
    if (!user) return;
    const name = (user.user_metadata?.name as string | undefined) || 'Me';
    dispatch({ type: 'SET_ACTIVE_USER', userId: user.id, name });
  }, [user?.id]);

  // Switch to the guest profile (beginner plan) when guest mode is chosen
  useEffect(() => {
    if (!guestChosen || user) return;
    dispatch({ type: 'SET_ACTIVE_USER', userId: 'guest', name: 'Guest' });
    setSyncReady(true); // guests need no remote fetch
  }, [guestChosen]);

  // Fetch remote data and merge after login; push any local-only sessions (one-time migration)
  useEffect(() => {
    if (!user) return;
    setSyncReady(false); // block START_SESSION until merge completes
    const localSessions = getActiveProfile(state).sessions;
    (async () => {
      const [sessions, customPlan, remoteProfile] = await Promise.all([
        fetchSessions(user.id),
        fetchCustomPlan(user.id),
        fetchProfile(user.id),
      ]);
      dispatch({ type: 'MERGE_REMOTE', sessions, customPlan, remoteProfile });
      setSyncReady(true); // unblock after merge — todaySession is now populated from remote
      const remoteDates = new Set(Object.keys(sessions));
      for (const session of Object.values(localSessions)) {
        if (!remoteDates.has(session.date)) {
          upsertSession(user.id, session).catch(console.error);
        }
      }
    })();
  }, [user?.id]);

  // Refetch from Supabase whenever the tab becomes visible again (covers cross-device sync)
  useEffect(() => {
    if (!user) return;
    function handleVisibility() {
      if (document.visibilityState !== 'visible') return;
      Promise.all([
        fetchSessions(user!.id),
        fetchCustomPlan(user!.id),
        fetchProfile(user!.id),
      ]).then(([sessions, customPlan, remoteProfile]) => {
        dispatch({ type: 'MERGE_REMOTE', sessions, customPlan, remoteProfile });
      });
    }
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, [user?.id]);

  // Sync state to Supabase on changes; completed workouts sync immediately, others debounce 1.5s
  useEffect(() => {
    if (!user || isGuest) return;
    if (syncTimer.current) clearTimeout(syncTimer.current);
    const profile = getActiveProfile(state);
    const today = getTodayISO();
    const session = profile.sessions[today];
    const delay = session?.completedAt ? 0 : 1500;
    syncTimer.current = setTimeout(() => {
      upsertProfile(user.id, {
        name: profile.name,
        weight_unit: profile.settings.weightUnit,
        rest_timer_seconds: profile.settings.restTimerSeconds,
        cycle_anchor_date: profile.settings.cycleAnchorDate,
      }).catch(console.error);
      if (session) upsertSession(user.id, session).catch(console.error);
      if (profile.customPlan) upsertCustomPlan(user.id, profile.customPlan).catch(console.error);
    }, delay);
    return () => { if (syncTimer.current) clearTimeout(syncTimer.current); };
  }, [state, user?.id, isGuest]);

  // Poll Supabase every 30s while the tab is visible to pick up changes from other devices
  useEffect(() => {
    if (!user) return;
    const poll = setInterval(() => {
      if (document.visibilityState !== 'visible') return;
      Promise.all([fetchSessions(user.id), fetchCustomPlan(user.id), fetchProfile(user.id)])
        .then(([sessions, customPlan, remoteProfile]) => {
          dispatch({ type: 'MERGE_REMOTE', sessions, customPlan, remoteProfile });
        });
    }, 30000);
    return () => clearInterval(poll);
  }, [user?.id]);

  const profile = getActiveProfile(state);
  const todaySession = profile.sessions[getTodayISO()];
  const plan = getEffectivePlan(profile);
  const dayIndex = getTodayDayIndexFromPlan(plan, profile.settings.cycleAnchorDate);
  const isRestDay = dayIndex === -1;
  const todayDayLabel = isRestDay ? 'Rest Day' : (plan.days[dayIndex]?.label ?? 'Workout');

  return (
    <WorkoutContext.Provider value={{ state, dispatch, profile, todaySession, todayDayLabel, isRestDay, syncReady }}>
      {children}
    </WorkoutContext.Provider>
  );
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
