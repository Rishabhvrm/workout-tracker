export function getTodayISO(): string {
  return new Date().toISOString().split('T')[0];
}

export function formatDisplayDate(isoDate: string): string {
  const date = new Date(isoDate + 'T00:00:00');
  return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}

export function getDayIndex(cycleAnchorDate: string, totalDays: number): number {
  const anchor = new Date(cycleAnchorDate + 'T00:00:00');
  const today = new Date(getTodayISO() + 'T00:00:00');
  const diffMs = today.getTime() - anchor.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const idx = ((diffDays % totalDays) + totalDays) % totalDays;
  return idx;
}

// Returns 0=Sun, 1=Mon…6=Sat
export function getTodayDayOfWeek(): number {
  return new Date().getDay();
}

export function formatDuration(startedAt: string, completedAt: string | null): string {
  const end = completedAt ? new Date(completedAt) : new Date();
  const start = new Date(startedAt);
  const mins = Math.round((end.getTime() - start.getTime()) / 60000);
  if (mins < 60) return `${mins}m`;
  return `${Math.floor(mins / 60)}h ${mins % 60}m`;
}
