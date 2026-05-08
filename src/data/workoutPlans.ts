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
          { id: 'lb-core-push-1', name: 'Hanging Leg Raise', sets: 3, reps: '12–15', defaultWeightLbs: 0, defaultWeightKg: 0 },
          { id: 'lb-core-push-2', name: 'Plank', sets: 3, reps: '45–60s', defaultWeightLbs: 0, defaultWeightKg: 0 },
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
          { id: 'lb-core-pull-1', name: 'Dead Bug', sets: 3, reps: '10–12', defaultWeightLbs: 0, defaultWeightKg: 0 },
          { id: 'lb-core-pull-2', name: 'Cable Crunch', sets: 3, reps: '15–20', defaultWeightLbs: 25, defaultWeightKg: 11 },
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
          { id: 'lb-core-legs-1', name: 'Ab Rollout', sets: 3, reps: '8–12', defaultWeightLbs: 0, defaultWeightKg: 0 },
          { id: 'lb-core-legs-2', name: 'Russian Twist', sets: 3, reps: '15–20', defaultWeightLbs: 0, defaultWeightKg: 0 },
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
          { id: 'lb-core-upper-1', name: 'Hollow Body Hold', sets: 3, reps: '30s', defaultWeightLbs: 0, defaultWeightKg: 0 },
          { id: 'lb-core-upper-2', name: 'Bicycle Crunch', sets: 3, reps: '20', defaultWeightLbs: 0, defaultWeightKg: 0 },
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
          { id: 'lb-core-arms-1', name: 'Side Plank', sets: 3, reps: '30–45s each', defaultWeightLbs: 0, defaultWeightKg: 0 },
          { id: 'lb-core-arms-2', name: 'Decline Crunch', sets: 3, reps: '15–20', defaultWeightLbs: 0, defaultWeightKg: 0 },
        ],
      },
    ],
  },
};

workoutPlans['beginner-4day'] = {
  id: 'beginner-4day',
  name: 'Beginner 4-Day Upper/Lower',
  weeklySchedule: { 1: 0, 2: 1, 4: 2, 5: 3 },
  restDays: [0, 3, 6],
  days: [
    {
      id: 'beg-upper-a',
      label: 'Chest & Back',
      goal: 'Foundational push and pull — chest, back, shoulders',
      exercises: [
        { id: 'beg-bench', name: 'Bench Press', sets: 3, reps: '8–12', notes: 'Plant feet, slight arch, elbows at ~75°. Control the descent.', defaultWeightLbs: 95, defaultWeightKg: 43 },
        { id: 'beg-row', name: 'Bent Over Row', sets: 3, reps: '8–12', notes: 'Hinge to ~45°, pull bar to lower chest. Keep back flat.', defaultWeightLbs: 75, defaultWeightKg: 34 },
        { id: 'beg-shoulder-press', name: 'Shoulder Press', sets: 3, reps: '10–12', notes: 'Brace core, press straight up. Avoid lower back arch.', defaultWeightLbs: 55, defaultWeightKg: 25 },
        { id: 'beg-lat-pulldown', name: 'Lat Pulldown', sets: 3, reps: '10–12', notes: 'Lean back slightly, pull to upper chest. Full stretch at top.', defaultWeightLbs: 60, defaultWeightKg: 27 },
        { id: 'beg-curl', name: 'Bicep Curl', sets: 3, reps: '12', notes: 'Keep elbows pinned at sides. Squeeze at the top.', defaultWeightLbs: 30, defaultWeightKg: 14 },
        { id: 'beg-core-ua', name: 'Plank', sets: 3, reps: '30–45s', defaultWeightLbs: 0, defaultWeightKg: 0 },
      ],
    },
    {
      id: 'beg-lower-a',
      label: 'Squat & Legs',
      goal: 'Quad-dominant lower body — squat pattern and leg volume',
      exercises: [
        { id: 'beg-goblet-squat', name: 'Goblet Squat', sets: 3, reps: '10–12', notes: 'Hold dumbbell at chest, push knees out, squat to full depth.', defaultWeightLbs: 35, defaultWeightKg: 16 },
        { id: 'beg-rdl', name: 'Romanian Deadlift', sets: 3, reps: '10', notes: 'Push hips back, slight knee bend. Bar stays close to legs.', defaultWeightLbs: 95, defaultWeightKg: 43 },
        { id: 'beg-leg-press', name: 'Leg Press', sets: 3, reps: '12', notes: 'Feet shoulder-width, lower until knees reach 90°.', defaultWeightLbs: 140, defaultWeightKg: 64 },
        { id: 'beg-calf-raise', name: 'Calf Raise', sets: 3, reps: '15', notes: 'Full range — pause at the top and bottom.', defaultWeightLbs: 80, defaultWeightKg: 36 },
        { id: 'beg-core-la', name: 'Dead Bug', sets: 3, reps: '10', defaultWeightLbs: 0, defaultWeightKg: 0 },
      ],
    },
    {
      id: 'beg-upper-b',
      label: 'Shoulders & Arms',
      goal: 'Shoulder width, arm size — press, isolation and pulls',
      exercises: [
        { id: 'beg-incline-press', name: 'Incline DB Press', sets: 3, reps: '10–12', notes: '30–45° incline. Lower DBs to upper chest line, elbows at 75°.', defaultWeightLbs: 25, defaultWeightKg: 11 },
        { id: 'beg-cable-row', name: 'Seated Cable Row', sets: 3, reps: '10–12', notes: 'Sit tall, pull to navel, squeeze shoulder blades at the end.', defaultWeightLbs: 60, defaultWeightKg: 27 },
        { id: 'beg-lateral-raise', name: 'Lateral Raise', sets: 3, reps: '12–15', notes: 'Slight forward lean, raise to shoulder height. No swinging.', defaultWeightLbs: 10, defaultWeightKg: 5 },
        { id: 'beg-tricep', name: 'Tricep Pushdown', sets: 3, reps: '12–15', notes: 'Elbows pinned to sides, full extension at the bottom.', defaultWeightLbs: 25, defaultWeightKg: 11 },
        { id: 'beg-face-pull', name: 'Face Pull', sets: 3, reps: '15', notes: 'Pull to forehead, externally rotate at the top.', defaultWeightLbs: 20, defaultWeightKg: 9 },
        { id: 'beg-core-ub', name: 'Bicycle Crunch', sets: 3, reps: '15–20', defaultWeightLbs: 0, defaultWeightKg: 0 },
      ],
    },
    {
      id: 'beg-lower-b',
      label: 'Deadlift & Glutes',
      goal: 'Hip hinge pattern — hamstrings, glutes and posterior chain',
      exercises: [
        { id: 'beg-deadlift', name: 'Deadlift', sets: 3, reps: '5–8', notes: 'Bar over mid-foot, neutral spine, drive the floor away from you.', defaultWeightLbs: 115, defaultWeightKg: 52 },
        { id: 'beg-lunge', name: 'Walking Lunge', sets: 3, reps: '10 each', notes: 'Long step so front knee stays over ankle, not past toes.', defaultWeightLbs: 20, defaultWeightKg: 9 },
        { id: 'beg-leg-curl', name: 'Leg Curl', sets: 3, reps: '12', notes: 'Slow on the way down. Full range of motion.', defaultWeightLbs: 50, defaultWeightKg: 23 },
        { id: 'beg-glute-bridge', name: 'Glute Bridge', sets: 3, reps: '15', notes: 'Drive through heels, squeeze glutes hard at the top.', defaultWeightLbs: 0, defaultWeightKg: 0 },
        { id: 'beg-core-lb', name: 'Ab Crunch', sets: 3, reps: '15–20', defaultWeightLbs: 0, defaultWeightKg: 0 },
      ],
    },
  ],
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
