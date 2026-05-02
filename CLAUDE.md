# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # start dev server at localhost:5173/workout-tracker/
npm run build      # tsc type-check then Vite production build → dist/
npm run preview    # serve dist/ locally to test the production build
npx tsc --noEmit   # type-check only, no output
```

No test suite exists. Verify changes by running `npm run build` (catches type errors) then testing in the browser.

## Architecture

**Stack**: Vite 5 + React 18 + TypeScript + Tailwind CSS v3 + Supabase. Deployed as a static PWA to GitHub Pages at `/workout-tracker/` (the `base` in `vite.config.ts` must stay as-is).

**Routing**: `HashRouter` is required — GitHub Pages has no server to rewrite URLs. All routes use `#/path` form. The router only mounts after auth resolves; before that, `App.tsx` renders `AuthScreen` or `OnboardingScreen` directly (outside the router).

### Provider hierarchy

```
AuthProvider
  WorkoutProvider      ← calls useAuth() internally
    RestTimerProvider
      AppRoutes        ← reads auth state to decide what to render
        HashRouter → AppShell → screens
```

`AuthProvider` must be the outermost wrapper because `WorkoutProvider` depends on `useAuth()`.

### State management

All app state lives in three React contexts:

- **`AuthContext`** (`src/context/AuthContext.tsx`) — Supabase session, `isGuest`, `isNewUser` (new signup, triggers onboarding), `guestChosen` (guest pressed "Continue as Guest"). `isNewUser` is persisted in `sessionStorage` under `wt_new_user` so it survives re-renders but not tab close.

- **`WorkoutContext`** (`src/context/WorkoutContext.tsx`) — single `useReducer` over `AppStorage` (the full localStorage shape). All workout mutations go through typed `Action` dispatches. On auth change, dispatches `SET_ACTIVE_USER` (switches/creates the profile keyed by Supabase `user.id`) then `MERGE_REMOTE` (merges Supabase data). State syncs to Supabase with a 1.5 s debounce after every change.

- **`RestTimerContext`** (`src/context/RestTimerContext.tsx`) — countdown timer only; `start(seconds)` is called from `ExerciseCard` when a weight is confirmed.

### Persistence: localStorage ↔ Supabase

`src/services/storage.ts` owns localStorage under key `wt_v1`. Schema version 2; `migrateStorage()` runs on read.

- `setGuestMode(true)` makes `writeStorage` a no-op (guests get no persistence).
- `clearStorage()` is called on sign-out.
- `WorkoutProvider` calls `setGuestMode(isGuest)` in a `useEffect` before the `SET_ACTIVE_USER` dispatch, so the ordering matters — declare that effect first.

`src/services/database.ts` contains typed Supabase CRUD wrappers (`fetchProfile`, `upsertSession`, `upsertCustomPlan`, etc.). All are fire-and-forget with `console.error` on failure; they never throw to the caller.

### Workout plan data model

```
WorkoutPlan
  days: WorkoutDay[]          ← static plan definition
    exercises: Exercise[]

AppStorage
  profiles: Record<userId, UserProfile>
    settings: UserSettings    ← weightUnit, restTimerSeconds, cycleAnchorDate
    sessions: Record<isoDate, WorkoutSession>   ← one entry per day trained
      exercises: SessionExercise[]
        sets: SessionSet[]    ← actualReps + weight filled in during workout
    customPlan?: WorkoutPlan  ← overrides the built-in plan when present
```

A plan can use either **weekly schedule** (`weeklySchedule: Partial<Record<dayOfWeek, dayIndex>>`) or a **rotating cycle** keyed from `cycleAnchorDate`. `getTodayDayIndexFromPlan()` in `WorkoutContext` handles both; returns `-1` for rest days.

### Key data files

- `src/data/workoutPlans.ts` — built-in plans; `DEFAULT_PLAN_ID = 'lean-bulk-5day'`.
- `src/data/onboardingTemplates.ts` — 4 `OnboardingTemplate` objects shown in the onboarding wizard (Lean Bulk, Strength, Cut/Shred, Home Workout). Lean Bulk re-exports the built-in plan; the others are defined inline.
- `src/data/exerciseTips.ts` — keyed by `exerciseId`; each entry has `muscles`, `cues[]`, `mistakes[]`. Used by `ExerciseInfoSheet`.

### UI patterns

- **PickerSheet** (`src/components/ui/PickerSheet.tsx`) — iOS-style drum-roll picker using CSS `scroll-snap`. `weightValues(unit)` and `repsValues()` generate the option arrays. Always import these named exports alongside the default component.
- **Bottom sheets** — implemented as fixed-position overlays with a dark backdrop; see `PickerSheet` and `ExerciseInfoSheet` for the pattern.
- Tailwind v3 (PostCSS config) — **not** Tailwind v4. Do not use `@import "tailwindcss"` syntax.

## Environment variables

Required at build time (Vite embeds them into the bundle):

```
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
```

Local: `.env.local` (gitignored). CI: GitHub repository secrets passed into the build step in `.github/workflows/deploy.yml`.

## Deployment

Push to `main` → GitHub Actions runs `npm ci --legacy-peer-deps && npm run build` → deploys `dist/` to the `gh-pages` branch via `peaceiris/actions-gh-pages`. `--legacy-peer-deps` is required due to `vite-plugin-pwa` peer dep constraints with Vite 5.

## Supabase schema notes

Three tables with Row Level Security (users see only their own rows): `profiles`, `custom_plans`, `workout_sessions`. A `SECURITY DEFINER` trigger on `auth.users` auto-creates the `profiles` row on signup, reading the name from `NEW.raw_user_meta_data->>'name'`. The trigger function must include `SET search_path = public` to reliably find the `profiles` table.
