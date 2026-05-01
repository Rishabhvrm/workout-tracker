import type { WorkoutPlan } from '../types';

export const DEFAULT_PLAN_ID = 'ppl';

export const workoutPlans: Record<string, WorkoutPlan> = {
  ppl: {
    id: 'ppl',
    name: 'Push / Pull / Legs',
    days: [
      {
        id: 'push',
        label: 'Push',
        exercises: [
          { id: 'bench-press', name: 'Bench Press', sets: 4, reps: '8-12', notes: 'Keep back flat, elbows ~75°' },
          { id: 'ohp', name: 'Overhead Press', sets: 3, reps: '8-12', notes: 'Brace core, avoid lower back arch' },
          { id: 'incline-db', name: 'Incline DB Press', sets: 3, reps: '10-12' },
          { id: 'lateral-raise', name: 'Lateral Raise', sets: 4, reps: '15', notes: 'Controlled, no swinging' },
          { id: 'tricep-pushdown', name: 'Tricep Pushdown', sets: 3, reps: '12-15' },
        ],
      },
      {
        id: 'pull',
        label: 'Pull',
        exercises: [
          { id: 'deadlift', name: 'Deadlift', sets: 3, reps: '5', notes: 'Neutral spine, drive hips forward' },
          { id: 'pullups', name: 'Pull-ups', sets: 4, reps: 'AMRAP', notes: 'Full ROM, dead hang at bottom' },
          { id: 'barbell-row', name: 'Barbell Row', sets: 4, reps: '8-10', notes: 'Pull to lower chest' },
          { id: 'face-pulls', name: 'Face Pulls', sets: 4, reps: '15', notes: 'External rotation at top' },
          { id: 'bicep-curl', name: 'Bicep Curl', sets: 3, reps: '10-12' },
        ],
      },
      {
        id: 'legs',
        label: 'Legs',
        exercises: [
          { id: 'squat', name: 'Squat', sets: 4, reps: '5-8', notes: 'Depth below parallel if mobility allows' },
          { id: 'rdl', name: 'Romanian Deadlift', sets: 3, reps: '8-10', notes: 'Hinge at hips, slight knee bend' },
          { id: 'leg-press', name: 'Leg Press', sets: 3, reps: '10-15' },
          { id: 'leg-curl', name: 'Leg Curl', sets: 3, reps: '12' },
          { id: 'calf-raise', name: 'Calf Raise', sets: 4, reps: '15', notes: 'Full range of motion' },
        ],
      },
    ],
  },
};
