import type { WorkoutPlan } from '../types';

export const DEFAULT_PLAN_ID = 'lean-bulk-5day';

export const workoutPlans: Record<string, WorkoutPlan> = {
  'lean-bulk-5day': {
    id: 'lean-bulk-5day',
    name: '12–16 Week Lean Bulk (5-Day)',
    // Mon=1 Push, Tue=2 Pull, Wed=3 Legs, Thu=4 Upper, Fri=5 Arms+Shoulders
    weeklySchedule: { 1: 0, 2: 1, 3: 2, 4: 3, 5: 4 },
    restDays: [0, 6], // Sun, Sat
    days: [
      {
        id: 'push',
        label: 'Push',
        goal: 'Chest thickness, shoulder caps',
        exercises: [
          { id: 'barbell-bench', name: 'Barbell Bench Press', sets: 4, reps: '6–8', notes: 'Keep back flat, elbows ~75°. RPE 8–9 on last set.', defaultWeightLbs: 135, defaultWeightKg: 60 },
          { id: 'incline-db-press', name: 'Incline Dumbbell Press', sets: 3, reps: '8–10', defaultWeightLbs: 30, defaultWeightKg: 14 },
          { id: 'seated-db-shoulder', name: 'Seated DB Shoulder Press', sets: 3, reps: '8–10', notes: 'Brace core, avoid lower back arch.', defaultWeightLbs: 30, defaultWeightKg: 14 },
          { id: 'lateral-raise', name: 'Cable/DB Lateral Raises', sets: 4, reps: '12–15', notes: 'Controlled, no swinging.', defaultWeightLbs: 15, defaultWeightKg: 7 },
          { id: 'chest-dips', name: 'Chest Dips', sets: 3, reps: '8–12', notes: 'Assisted if needed. Lean forward for chest focus.', defaultWeightLbs: 0, defaultWeightKg: 0 },
          { id: 'tricep-pushdown', name: 'Triceps Rope Pushdown', sets: 3, reps: '12–15', defaultWeightLbs: 30, defaultWeightKg: 14 },
        ],
      },
      {
        id: 'pull',
        label: 'Pull',
        goal: 'Back width & thickness, arm size',
        exercises: [
          { id: 'pullups-pulldown', name: 'Pull-ups / Lat Pulldown', sets: 4, reps: '6–10', notes: 'Full ROM, dead hang at bottom.', defaultWeightLbs: 70, defaultWeightKg: 32 },
          { id: 'bb-db-row', name: 'Barbell / DB Row', sets: 4, reps: '8–10', notes: 'Pull to lower chest.', defaultWeightLbs: 95, defaultWeightKg: 43 },
          { id: 'seated-cable-row', name: 'Seated Cable Row', sets: 3, reps: '10–12', defaultWeightLbs: 60, defaultWeightKg: 27 },
          { id: 'face-pulls', name: 'Face Pulls', sets: 3, reps: '12–15', notes: 'External rotation at top.', defaultWeightLbs: 25, defaultWeightKg: 11 },
          { id: 'barbell-curl', name: 'Barbell / EZ-Bar Curl', sets: 3, reps: '8–10', defaultWeightLbs: 65, defaultWeightKg: 30 },
          { id: 'incline-db-curl', name: 'Incline Dumbbell Curl', sets: 3, reps: '10–12', defaultWeightLbs: 20, defaultWeightKg: 9 },
        ],
      },
      {
        id: 'legs',
        label: 'Legs',
        goal: 'Overall mass + hormonal stimulus',
        exercises: [
          { id: 'back-squat', name: 'Barbell Back Squat', sets: 4, reps: '5–8', notes: 'Depth below parallel. RPE 8–9 on last set.', defaultWeightLbs: 135, defaultWeightKg: 60 },
          { id: 'rdl', name: 'Romanian Deadlift', sets: 3, reps: '8–10', notes: 'Hinge at hips, slight knee bend.', defaultWeightLbs: 115, defaultWeightKg: 52 },
          { id: 'leg-press', name: 'Leg Press', sets: 3, reps: '10–12', defaultWeightLbs: 180, defaultWeightKg: 82 },
          { id: 'walking-lunges', name: 'Walking Lunges', sets: 3, reps: '12 steps/leg', notes: 'Hold dumbbells at sides.', defaultWeightLbs: 25, defaultWeightKg: 11 },
          { id: 'leg-curl', name: 'Lying / Seated Leg Curl', sets: 3, reps: '12–15', defaultWeightLbs: 60, defaultWeightKg: 27 },
          { id: 'calf-raise', name: 'Standing Calf Raise', sets: 4, reps: '12–20', notes: 'Full range of motion.', defaultWeightLbs: 90, defaultWeightKg: 41 },
        ],
      },
      {
        id: 'upper',
        label: 'Upper',
        goal: 'Extra volume for fastest visual gains',
        exercises: [
          { id: 'incline-barbell', name: 'Incline Barbell Bench Press', sets: 4, reps: '6–8', notes: 'RPE 8–9 on last set.', defaultWeightLbs: 115, defaultWeightKg: 52 },
          { id: 'chest-supported-row', name: 'Chest-Supported DB Row', sets: 4, reps: '8–10', defaultWeightLbs: 35, defaultWeightKg: 16 },
          { id: 'cable-chest-fly', name: 'Cable Chest Fly', sets: 3, reps: '12–15', notes: 'Mid or low cable.', defaultWeightLbs: 20, defaultWeightKg: 9 },
          { id: 'lat-pulldown-upper', name: 'Lat Pulldown', sets: 3, reps: '10–12', notes: 'Wide or neutral grip.', defaultWeightLbs: 70, defaultWeightKg: 32 },
          { id: 'db-lateral-raise-upper', name: 'DB Lateral Raise', sets: 4, reps: '15–20', notes: 'Partial reps on last set.', defaultWeightLbs: 15, defaultWeightKg: 7 },
        ],
      },
      {
        id: 'arms-shoulders',
        label: 'Arms + Shoulders',
        goal: 'Arm size, round delts',
        exercises: [
          { id: 'standing-ohp', name: 'Standing Barbell OHP', sets: 4, reps: '5–8', notes: 'Brace core, avoid arch.', defaultWeightLbs: 95, defaultWeightKg: 43 },
          { id: 'ez-skull-crushers', name: 'EZ-Bar Skull Crushers', sets: 3, reps: '10–12', notes: 'Superset with EZ curls.', defaultWeightLbs: 55, defaultWeightKg: 25 },
          { id: 'ez-curls', name: 'EZ-Bar Curls', sets: 3, reps: '10–12', notes: 'Superset with skull crushers.', defaultWeightLbs: 55, defaultWeightKg: 25 },
          { id: 'cable-tricep-pushdown', name: 'Cable Triceps Pushdown', sets: 3, reps: '12–15', notes: 'Superset with hammer curl.', defaultWeightLbs: 25, defaultWeightKg: 11 },
          { id: 'cable-hammer-curl', name: 'Cable Hammer Curl', sets: 3, reps: '12–15', notes: 'Superset with tricep pushdown.', defaultWeightLbs: 20, defaultWeightKg: 9 },
          { id: 'lateral-raise-drop', name: 'DB Lateral Raise Drop Set', sets: 3, reps: '3 rounds to failure', notes: 'Drop weight each round.', defaultWeightLbs: 20, defaultWeightKg: 9 },
          { id: 'rear-delt-fly', name: 'Rear Delt Fly', sets: 3, reps: '15–20', notes: 'Machine or cable.', defaultWeightLbs: 15, defaultWeightKg: 7 },
        ],
      },
    ],
  },
};

// Keep old PPL plan for backwards compatibility
workoutPlans['ppl'] = {
  id: 'ppl',
  name: 'Push / Pull / Legs (3-Day)',
  days: [
    { id: 'push-ppl', label: 'Push', exercises: [
      { id: 'bench-press', name: 'Bench Press', sets: 4, reps: '8-12', defaultWeightLbs: 135, defaultWeightKg: 60 },
      { id: 'ohp', name: 'Overhead Press', sets: 3, reps: '8-12', defaultWeightLbs: 85, defaultWeightKg: 38 },
      { id: 'incline-db', name: 'Incline DB Press', sets: 3, reps: '10-12', defaultWeightLbs: 30, defaultWeightKg: 14 },
      { id: 'lateral-raise-ppl', name: 'Lateral Raise', sets: 4, reps: '15', defaultWeightLbs: 15, defaultWeightKg: 7 },
      { id: 'tricep-pushdown-ppl', name: 'Tricep Pushdown', sets: 3, reps: '12-15', defaultWeightLbs: 30, defaultWeightKg: 14 },
    ]},
    { id: 'pull-ppl', label: 'Pull', exercises: [
      { id: 'deadlift', name: 'Deadlift', sets: 3, reps: '5', defaultWeightLbs: 185, defaultWeightKg: 84 },
      { id: 'pullups', name: 'Pull-ups', sets: 4, reps: 'AMRAP', defaultWeightLbs: 0, defaultWeightKg: 0 },
      { id: 'barbell-row', name: 'Barbell Row', sets: 4, reps: '8-10', defaultWeightLbs: 95, defaultWeightKg: 43 },
      { id: 'face-pulls-ppl', name: 'Face Pulls', sets: 4, reps: '15', defaultWeightLbs: 25, defaultWeightKg: 11 },
      { id: 'bicep-curl', name: 'Bicep Curl', sets: 3, reps: '10-12', defaultWeightLbs: 35, defaultWeightKg: 16 },
    ]},
    { id: 'legs-ppl', label: 'Legs', exercises: [
      { id: 'squat', name: 'Squat', sets: 4, reps: '5-8', defaultWeightLbs: 135, defaultWeightKg: 60 },
      { id: 'rdl-ppl', name: 'Romanian Deadlift', sets: 3, reps: '8-10', defaultWeightLbs: 115, defaultWeightKg: 52 },
      { id: 'leg-press-ppl', name: 'Leg Press', sets: 3, reps: '10-15', defaultWeightLbs: 180, defaultWeightKg: 82 },
      { id: 'leg-curl-ppl', name: 'Leg Curl', sets: 3, reps: '12', defaultWeightLbs: 60, defaultWeightKg: 27 },
      { id: 'calf-raise-ppl', name: 'Calf Raise', sets: 4, reps: '15', defaultWeightLbs: 90, defaultWeightKg: 41 },
    ]},
  ],
};
