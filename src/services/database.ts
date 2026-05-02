import { supabase } from './supabase';
import type { WorkoutSession, WorkoutPlan } from '../types';

export interface DbProfile {
  id: string;
  name: string;
  weight_unit: string;
  rest_timer_seconds: number;
  cycle_anchor_date: string;
}

export async function fetchProfile(userId: string): Promise<DbProfile | null> {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  if (error) { console.error('fetchProfile:', error.message); return null; }
  return data as DbProfile;
}

export async function upsertProfile(userId: string, patch: Partial<Omit<DbProfile, 'id'>>): Promise<void> {
  const { error } = await supabase.from('profiles').update(patch).eq('id', userId);
  if (error) console.error('upsertProfile:', error.message);
}

export async function fetchSessions(userId: string): Promise<Record<string, WorkoutSession>> {
  const { data, error } = await supabase
    .from('workout_sessions')
    .select('*')
    .eq('user_id', userId);
  if (error) { console.error('fetchSessions:', error.message); return {}; }

  const result: Record<string, WorkoutSession> = {};
  for (const row of data ?? []) {
    result[row.date as string] = {
      date: row.date,
      planId: row.plan_id,
      dayLabel: row.day_label,
      startedAt: row.started_at,
      completedAt: row.completed_at,
      exercises: row.exercises,
    };
  }
  return result;
}

export async function upsertSession(userId: string, session: WorkoutSession): Promise<void> {
  const { error } = await supabase.from('workout_sessions').upsert(
    {
      user_id: userId,
      date: session.date,
      plan_id: session.planId,
      day_label: session.dayLabel,
      started_at: session.startedAt,
      completed_at: session.completedAt,
      exercises: session.exercises,
    },
    { onConflict: 'user_id,date' }
  );
  if (error) console.error('upsertSession:', error.message);
}

export async function fetchCustomPlan(userId: string): Promise<WorkoutPlan | null> {
  const { data, error } = await supabase
    .from('custom_plans')
    .select('plan_data')
    .eq('user_id', userId)
    .single();
  if (error) {
    if (error.code !== 'PGRST116') console.error('fetchCustomPlan:', error.message);
    return null;
  }
  return (data?.plan_data as WorkoutPlan) ?? null;
}

export async function upsertCustomPlan(userId: string, plan: WorkoutPlan): Promise<void> {
  const { error } = await supabase.from('custom_plans').upsert(
    { user_id: userId, plan_data: plan, updated_at: new Date().toISOString() },
    { onConflict: 'user_id' }
  );
  if (error) console.error('upsertCustomPlan:', error.message);
}
