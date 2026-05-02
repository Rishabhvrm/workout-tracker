import type { AppStorage, UserProfile } from '../types';
import { DEFAULT_PLAN_ID } from '../data/workoutPlans';

const STORAGE_KEY = 'wt_v1';
const SCHEMA_VERSION = 2;

let guestMode = false;
export function setGuestMode(v: boolean) { guestMode = v; }

function createDefaultProfile(): UserProfile {
  const today = new Date().toISOString().split('T')[0];
  return {
    id: 'default',
    name: 'Me',
    createdAt: today,
    settings: {
      defaultPlanId: DEFAULT_PLAN_ID,
      weightUnit: 'lbs',
      restTimerSeconds: 90,
      cycleAnchorDate: today,
    },
    cycleState: {
      planId: DEFAULT_PLAN_ID,
      dayIndex: 0,
      lastWorkoutDate: '',
    },
    sessions: {},
  };
}

function createDefaultStorage(): AppStorage {
  return {
    version: SCHEMA_VERSION,
    activeProfileId: 'default',
    profiles: { default: createDefaultProfile() },
  };
}

export function readStorage(): AppStorage {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return createDefaultStorage();
    const parsed = JSON.parse(raw) as AppStorage;
    return migrateStorage(parsed);
  } catch {
    return createDefaultStorage();
  }
}

export function writeStorage(data: AppStorage): void {
  if (guestMode) return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // localStorage quota exceeded — silently fail
  }
}

export function clearStorage(): void {
  localStorage.removeItem(STORAGE_KEY);
}

function migrateStorage(data: AppStorage): AppStorage {
  let d = data;

  // v1 → v2: upgrade defaultPlanId from 'ppl' to the new 5-day plan
  if (d.version < 2) {
    const profiles = Object.fromEntries(
      Object.entries(d.profiles).map(([key, profile]) => [
        key,
        {
          ...profile,
          settings: {
            ...profile.settings,
            defaultPlanId:
              profile.settings.defaultPlanId === 'ppl'
                ? DEFAULT_PLAN_ID
                : profile.settings.defaultPlanId,
          },
        },
      ])
    );
    d = { ...d, version: 2, profiles };
    writeStorage(d);
  }

  return d;
}

export function exportStorageJson(): string {
  return JSON.stringify(readStorage(), null, 2);
}

export function importStorageJson(json: string): boolean {
  try {
    const parsed = JSON.parse(json) as AppStorage;
    if (!parsed.version || !parsed.profiles) return false;
    writeStorage(parsed);
    return true;
  } catch {
    return false;
  }
}
