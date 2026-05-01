export interface SessionSet {
  setNumber: number;
  targetReps: string;
  actualReps: number | null;
  weight: number | null;
}

export interface SessionExercise {
  exerciseId: string;
  name: string;
  sets: SessionSet[];
  completed: boolean;
}

export interface WorkoutSession {
  date: string;
  planId: string;
  dayLabel: string;
  startedAt: string;
  completedAt: string | null;
  exercises: SessionExercise[];
}

export interface UserSettings {
  defaultPlanId: string;
  weightUnit: 'lbs' | 'kg';
  restTimerSeconds: number;
  cycleAnchorDate: string;
}

export interface CycleState {
  planId: string;
  dayIndex: number;
  lastWorkoutDate: string;
}

export interface UserProfile {
  id: string;
  name: string;
  createdAt: string;
  settings: UserSettings;
  cycleState: CycleState;
  sessions: Record<string, WorkoutSession>;
  customPlan?: WorkoutPlan;
}

export interface AppStorage {
  version: number;
  activeProfileId: string;
  profiles: Record<string, UserProfile>;
}

export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  notes?: string;
  defaultWeightLbs?: number;
  defaultWeightKg?: number;
}

export interface WorkoutDay {
  id: string;
  label: string;
  goal?: string;
  exercises: Exercise[];
}

export interface WorkoutPlan {
  id: string;
  name: string;
  days: WorkoutDay[];
  // Map day-of-week (0=Sun…6=Sat) to day index in `days`. Omit for rotating cycle.
  weeklySchedule?: Partial<Record<number, number>>;
  restDays?: number[]; // day-of-week indices that are rest days
}
