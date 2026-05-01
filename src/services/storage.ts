import type { AppStorage, UserProfile } from '../types';
import { DEFAULT_PLAN_ID } from '../data/workoutPlans';

const STORAGE_KEY = 'wt_v1';
const SCHEMA_VERSION = 1;

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
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // localStorage quota exceeded — silently fail
  }
}

function migrateStorage(data: AppStorage): AppStorage {
  if (data.version === SCHEMA_VERSION) return data;
  // Future migrations go here
  return data;
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
