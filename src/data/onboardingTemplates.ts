import type { WorkoutPlan } from '../types';
import { workoutPlans } from './workoutPlans';

export interface OnboardingTemplate {
  id: string;
  name: string;
  description: string;
  daysPerWeek: number;
  plan: WorkoutPlan;
}

const strengthPlan: WorkoutPlan = {
  id: 'strength-4day',
  name: '4-Day Strength',
  weeklySchedule: { 1: 0, 2: 1, 4: 2, 5: 3 },
  restDays: [0, 3, 6],
  days: [
    {
      id: 'squat',
      label: 'Squat',
      goal: 'Lower body strength — quad & glute dominant',
      exercises: [
        { id: 'str-squat', name: 'Barbell Back Squat', sets: 5, reps: '5', defaultWeightLbs: 135, defaultWeightKg: 60 },
        { id: 'str-rdl', name: 'Romanian Deadlift', sets: 3, reps: '8', defaultWeightLbs: 115, defaultWeightKg: 52 },
        { id: 'str-leg-press', name: 'Leg Press', sets: 3, reps: '10', defaultWeightLbs: 180, defaultWeightKg: 80 },
        { id: 'str-split-squat', name: 'Bulgarian Split Squat', sets: 3, reps: '8 each', defaultWeightLbs: 40, defaultWeightKg: 18 },
        { id: 'str-calf', name: 'Standing Calf Raise', sets: 4, reps: '15', defaultWeightLbs: 80, defaultWeightKg: 36 },
      ],
    },
    {
      id: 'bench',
      label: 'Bench',
      goal: 'Upper body push strength — chest & triceps',
      exercises: [
        { id: 'str-bench', name: 'Barbell Bench Press', sets: 5, reps: '5', defaultWeightLbs: 135, defaultWeightKg: 60 },
        { id: 'str-incline', name: 'Incline DB Press', sets: 3, reps: '8–10', defaultWeightLbs: 50, defaultWeightKg: 22 },
        { id: 'str-dips', name: 'Weighted Dips', sets: 3, reps: '8', defaultWeightLbs: 25, defaultWeightKg: 10 },
        { id: 'str-tri-push', name: 'Tricep Pushdown', sets: 3, reps: '12', defaultWeightLbs: 40, defaultWeightKg: 18 },
        { id: 'str-lateral', name: 'Lateral Raises', sets: 3, reps: '15', defaultWeightLbs: 15, defaultWeightKg: 7 },
      ],
    },
    {
      id: 'deadlift',
      label: 'Deadlift',
      goal: 'Posterior chain — hamstrings, back, grip',
      exercises: [
        { id: 'str-dl', name: 'Conventional Deadlift', sets: 5, reps: '3–5', defaultWeightLbs: 185, defaultWeightKg: 84 },
        { id: 'str-pullup', name: 'Pull-ups', sets: 4, reps: '5–8', defaultWeightLbs: 0, defaultWeightKg: 0 },
        { id: 'str-row', name: 'Barbell Bent-Over Row', sets: 3, reps: '6–8', defaultWeightLbs: 115, defaultWeightKg: 52 },
        { id: 'str-curl', name: 'Barbell Curl', sets: 3, reps: '8–10', defaultWeightLbs: 55, defaultWeightKg: 25 },
        { id: 'str-facepull', name: 'Face Pulls', sets: 3, reps: '15', defaultWeightLbs: 25, defaultWeightKg: 11 },
      ],
    },
    {
      id: 'ohp',
      label: 'OHP',
      goal: 'Overhead strength — shoulders & upper back',
      exercises: [
        { id: 'str-ohp', name: 'Barbell Overhead Press', sets: 5, reps: '5', defaultWeightLbs: 95, defaultWeightKg: 43 },
        { id: 'str-zpress', name: 'DB Arnold Press', sets: 3, reps: '10', defaultWeightLbs: 35, defaultWeightKg: 16 },
        { id: 'str-lat-raise2', name: 'Cable Lateral Raise', sets: 4, reps: '12–15', defaultWeightLbs: 10, defaultWeightKg: 5 },
        { id: 'str-row2', name: 'Cable Row', sets: 3, reps: '10', defaultWeightLbs: 80, defaultWeightKg: 36 },
        { id: 'str-shrug', name: 'DB Shrugs', sets: 3, reps: '12', defaultWeightLbs: 60, defaultWeightKg: 27 },
      ],
    },
  ],
};

const cutPlan: WorkoutPlan = {
  id: 'cut-4day',
  name: '4-Day Cut/Shred',
  weeklySchedule: { 1: 0, 2: 1, 4: 2, 5: 3 },
  restDays: [0, 3, 6],
  days: [
    {
      id: 'upper-a',
      label: 'Upper A',
      goal: 'Chest & back — high volume, shorter rest',
      exercises: [
        { id: 'cut-bench', name: 'Barbell Bench Press', sets: 4, reps: '10–12', defaultWeightLbs: 115, defaultWeightKg: 52 },
        { id: 'cut-pullup', name: 'Pull-ups', sets: 4, reps: '10', defaultWeightLbs: 0, defaultWeightKg: 0 },
        { id: 'cut-db-press', name: 'DB Shoulder Press', sets: 3, reps: '12', defaultWeightLbs: 30, defaultWeightKg: 14 },
        { id: 'cut-cable-row', name: 'Cable Row', sets: 3, reps: '12', defaultWeightLbs: 80, defaultWeightKg: 36 },
        { id: 'cut-tri', name: 'Tricep Pushdown', sets: 3, reps: '15', defaultWeightLbs: 35, defaultWeightKg: 16 },
        { id: 'cut-curl', name: 'EZ Bar Curl', sets: 3, reps: '15', defaultWeightLbs: 40, defaultWeightKg: 18 },
      ],
    },
    {
      id: 'lower-a',
      label: 'Lower A',
      goal: 'Quad dominant — volume focus',
      exercises: [
        { id: 'cut-squat', name: 'Barbell Squat', sets: 4, reps: '10–12', defaultWeightLbs: 115, defaultWeightKg: 52 },
        { id: 'cut-rdl', name: 'Romanian Deadlift', sets: 3, reps: '12', defaultWeightLbs: 95, defaultWeightKg: 43 },
        { id: 'cut-leg-press', name: 'Leg Press', sets: 3, reps: '15', defaultWeightLbs: 160, defaultWeightKg: 72 },
        { id: 'cut-lunge', name: 'Walking Lunges', sets: 3, reps: '12 each', defaultWeightLbs: 25, defaultWeightKg: 11 },
        { id: 'cut-calf', name: 'Calf Press', sets: 4, reps: '20', defaultWeightLbs: 120, defaultWeightKg: 54 },
      ],
    },
    {
      id: 'upper-b',
      label: 'Upper B',
      goal: 'Shoulders & back — high rep isolation',
      exercises: [
        { id: 'cut-incline', name: 'Incline DB Press', sets: 4, reps: '12', defaultWeightLbs: 40, defaultWeightKg: 18 },
        { id: 'cut-bb-row', name: 'Barbell Row', sets: 4, reps: '12', defaultWeightLbs: 95, defaultWeightKg: 43 },
        { id: 'cut-lateral', name: 'Lateral Raises', sets: 4, reps: '15', defaultWeightLbs: 15, defaultWeightKg: 7 },
        { id: 'cut-facepull', name: 'Face Pulls', sets: 3, reps: '20', defaultWeightLbs: 25, defaultWeightKg: 11 },
        { id: 'cut-dips', name: 'Dips', sets: 3, reps: '12', defaultWeightLbs: 0, defaultWeightKg: 0 },
        { id: 'cut-hammer', name: 'Hammer Curls', sets: 3, reps: '15', defaultWeightLbs: 25, defaultWeightKg: 11 },
      ],
    },
    {
      id: 'lower-b',
      label: 'Lower B',
      goal: 'Hip dominant — glutes & hamstrings',
      exercises: [
        { id: 'cut-dl', name: 'Deadlift', sets: 4, reps: '8', defaultWeightLbs: 155, defaultWeightKg: 70 },
        { id: 'cut-hip-thrust', name: 'Hip Thrusts', sets: 4, reps: '12', defaultWeightLbs: 115, defaultWeightKg: 52 },
        { id: 'cut-leg-curl', name: 'Leg Curl', sets: 3, reps: '15', defaultWeightLbs: 50, defaultWeightKg: 23 },
        { id: 'cut-stepup', name: 'Step-ups', sets: 3, reps: '12 each', defaultWeightLbs: 35, defaultWeightKg: 16 },
        { id: 'cut-calf2', name: 'Seated Calf Raise', sets: 3, reps: '20', defaultWeightLbs: 45, defaultWeightKg: 20 },
      ],
    },
  ],
};

const homePlan: WorkoutPlan = {
  id: 'home-3day',
  name: '3-Day Home Workout',
  weeklySchedule: { 1: 0, 3: 1, 5: 2 },
  restDays: [0, 2, 4, 6],
  days: [
    {
      id: 'home-push',
      label: 'Push',
      goal: 'Chest, shoulders & triceps — bodyweight + dumbbells',
      exercises: [
        { id: 'home-pushup', name: 'Push-ups', sets: 4, reps: '15–20', defaultWeightLbs: 0, defaultWeightKg: 0 },
        { id: 'home-pike', name: 'Pike Push-ups', sets: 3, reps: '10–12', defaultWeightLbs: 0, defaultWeightKg: 0 },
        { id: 'home-db-press', name: 'DB Chest Press (floor)', sets: 3, reps: '10–12', defaultWeightLbs: 30, defaultWeightKg: 14 },
        { id: 'home-db-shoulder', name: 'DB Shoulder Press', sets: 3, reps: '10–12', defaultWeightLbs: 20, defaultWeightKg: 9 },
        { id: 'home-lateral', name: 'DB Lateral Raises', sets: 3, reps: '15', defaultWeightLbs: 10, defaultWeightKg: 5 },
        { id: 'home-tri-dip', name: 'Tricep Dips (chair)', sets: 3, reps: '12–15', defaultWeightLbs: 0, defaultWeightKg: 0 },
      ],
    },
    {
      id: 'home-pull',
      label: 'Pull',
      goal: 'Back & biceps — pull-ups, rows, curls',
      exercises: [
        { id: 'home-pullup', name: 'Pull-ups / Chin-ups', sets: 4, reps: '5–8', defaultWeightLbs: 0, defaultWeightKg: 0 },
        { id: 'home-inv-row', name: 'Inverted Rows (table)', sets: 3, reps: '10–12', defaultWeightLbs: 0, defaultWeightKg: 0 },
        { id: 'home-db-row', name: 'Single-arm DB Row', sets: 3, reps: '10–12', defaultWeightLbs: 35, defaultWeightKg: 16 },
        { id: 'home-facepull', name: 'DB Face Pulls / Rear Delt Fly', sets: 3, reps: '15', defaultWeightLbs: 15, defaultWeightKg: 7 },
        { id: 'home-curl', name: 'DB Bicep Curl', sets: 3, reps: '12', defaultWeightLbs: 20, defaultWeightKg: 9 },
      ],
    },
    {
      id: 'home-legs',
      label: 'Legs',
      goal: 'Full lower body — compound movements',
      exercises: [
        { id: 'home-goblet', name: 'Goblet Squat', sets: 4, reps: '12–15', defaultWeightLbs: 35, defaultWeightKg: 16 },
        { id: 'home-split', name: 'Bulgarian Split Squat', sets: 3, reps: '10 each', defaultWeightLbs: 20, defaultWeightKg: 9 },
        { id: 'home-rdl', name: 'DB Romanian Deadlift', sets: 3, reps: '12', defaultWeightLbs: 40, defaultWeightKg: 18 },
        { id: 'home-hip-thrust', name: 'Glute Bridge / Hip Thrust', sets: 3, reps: '15', defaultWeightLbs: 45, defaultWeightKg: 20 },
        { id: 'home-calf', name: 'Single-leg Calf Raise', sets: 3, reps: '15 each', defaultWeightLbs: 0, defaultWeightKg: 0 },
      ],
    },
  ],
};

export const onboardingTemplates: OnboardingTemplate[] = [
  {
    id: 'lean-bulk-5day',
    name: 'Lean Bulk',
    description: 'Build muscle while minimizing fat gain',
    daysPerWeek: 5,
    plan: workoutPlans['lean-bulk-5day'],
  },
  {
    id: 'strength-4day',
    name: 'Strength',
    description: 'Powerlifting compounds — get strong fast',
    daysPerWeek: 4,
    plan: strengthPlan,
  },
  {
    id: 'cut-4day',
    name: 'Cut / Shred',
    description: 'High volume to burn fat, preserve muscle',
    daysPerWeek: 4,
    plan: cutPlan,
  },
  {
    id: 'home-3day',
    name: 'Home Workout',
    description: 'Bodyweight + dumbbells, no gym needed',
    daysPerWeek: 3,
    plan: homePlan,
  },
];
