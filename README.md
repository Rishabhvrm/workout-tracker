# Workout Tracker

A mobile-first progressive web app for tracking gym workouts. Built with React, TypeScript, and Supabase — deployable as a PWA straight to your home screen.

**Live app:** https://rishabhvrm.github.io/workout-tracker/

---

## Features

- **5 built-in workout templates** — Beginner, Lean Bulk, Strength, Cut/Shred, Home Workout
- **Per-set logging** — tap to set reps and weight with an iOS-style drum-roll picker
- **Previous session reference** — each set cell shows your last session's numbers in small text below
- **PR detection** — a "PR" badge appears when you beat your all-time best weight for an exercise
- **Exercise tips** — form cues and common mistakes for every exercise across all plans
- **Rest timer** — auto-starts after logging a weight; centered card overlay with skip/+30s controls
- **Workout history** — calendar view of past sessions with per-exercise set details
- **Progress charts** — volume and max weight trends per exercise
- **Plan switcher** — swap between any of the 5 templates from Settings at any time; history is preserved
- **Cross-device sync** — sign in to sync your history across devices via Supabase
- **Guest mode** — try the app without creating an account; data lives locally
- **PWA** — installable on iOS and Android; works offline after first load

---

## Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + TypeScript |
| Build | Vite 5 |
| Styling | Tailwind CSS v3 |
| Auth + DB | Supabase (email/password, Row Level Security) |
| Routing | React Router v6 (HashRouter for GitHub Pages) |
| PWA | vite-plugin-pwa + Workbox |
| Deploy | GitHub Actions → GitHub Pages |

---

## Getting started locally

```bash
# Install dependencies
npm install --legacy-peer-deps

# Add Supabase credentials
cp .env.local.example .env.local
# Edit .env.local and fill in VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY

# Start dev server
npm run dev
# → http://localhost:5173/workout-tracker/

# Type-check only
npx tsc --noEmit

# Production build
npm run build
```

---

## Project structure

```
src/
  context/        AuthContext, WorkoutContext (useReducer), RestTimerContext
  data/           workoutPlans, onboardingTemplates, exerciseTips
  screens/        TodayScreen, HistoryScreen, ProgressScreen, SettingsScreen
  components/
    layout/       AppShell, BottomNav
    workout/      ExerciseCard, ExerciseInfoSheet, ExerciseList, WorkoutComplete
    ui/           PickerSheet, RestTimerOverlay
    settings/     PlanEditor
  services/       supabase.ts, storage.ts (localStorage), database.ts (Supabase CRUD)
  types/          index.ts
```

All workout state lives in a single `useReducer` in `WorkoutContext`. Changes are written to `localStorage` immediately and synced to Supabase with a 1.5 s debounce.

---

## Supabase schema

Three tables with Row Level Security (users see only their own rows):

- `profiles` — name, created at; auto-created by a `SECURITY DEFINER` trigger on signup
- `workout_sessions` — one row per day trained, stores the full session JSON
- `custom_plans` — stores imported/custom workout plans per user

---

## Deployment

Push to `main` → GitHub Actions runs `npm ci --legacy-peer-deps && npm run build` → deploys `dist/` to the `gh-pages` branch. The `base` in `vite.config.ts` is set to `/workout-tracker/` and must stay as-is for GitHub Pages.
