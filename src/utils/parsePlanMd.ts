import type { WorkoutPlan, WorkoutDay, Exercise } from '../types';

// Parses a markdown workout plan in the same format as the lean bulk template.
// Returns null if the format is unrecognized.
export function parsePlanMd(md: string, planId: string): WorkoutPlan | null {
  const lines = md.split('\n');

  // Extract plan name from first H1
  const h1 = lines.find(l => l.startsWith('# '));
  const planName = h1 ? h1.replace(/^# /, '').trim() : 'Custom Plan';

  const days: WorkoutDay[] = [];
  let currentDay: WorkoutDay | null = null;
  let exerciseCounter = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Match day headers: ### DAY N — LABEL or ## DAY N — LABEL
    const dayMatch = line.match(/^#{2,3}\s+DAY\s+\d+\s*[—–-]+\s*(.+)/i);
    if (dayMatch) {
      if (currentDay && currentDay.exercises.length > 0) days.push(currentDay);
      exerciseCounter = 0;
      const rawLabel = dayMatch[1].replace(/\(.*?\)/g, '').trim();
      currentDay = {
        id: `day-${days.length + 1}`,
        label: rawLabel,
        exercises: [],
      };
      // Look for goal on next line (bolded)
      const nextLine = lines[i + 1]?.trim();
      if (nextLine && nextLine.startsWith('**Goal')) {
        currentDay.goal = nextLine.replace(/\*\*/g, '').replace(/^Goal:?\s*/i, '').trim();
      }
      continue;
    }

    if (!currentDay) continue;

    // Match numbered exercise lines: "1. Exercise Name — sets × reps" or "1. Name — N × M"
    const exMatch = line.match(/^\d+\.\s+(.+?)(?:\s*[—–-]+\s*(\d+)\s*[×x]\s*([\d–\-\/]+.*))?$/);
    if (exMatch) {
      // Skip "Optional finisher" lines
      if (line.toLowerCase().includes('optional')) continue;

      const rawName = exMatch[1].trim();
      // Parse sets/reps if present
      let sets = 3;
      let reps = '8-12';
      if (exMatch[2]) sets = parseInt(exMatch[2]);
      if (exMatch[3]) reps = exMatch[3].replace(/\s+/g, '').trim();

      exerciseCounter++;
      const id = `custom-${planId}-d${days.length}-ex${exerciseCounter}`;
      const exercise: Exercise = { id, name: rawName, sets, reps };
      currentDay.exercises.push(exercise);
    }

    // Match superset lines: "   - Exercise Name — N × M" (indented dash)
    const supersetMatch = line.match(/^-\s+(.+?)(?:\s*[—–-]+\s*(\d+)\s*[×x]\s*([\d–\-\/]+.*))?$/);
    if (supersetMatch && !exMatch) {
      const rawName = supersetMatch[1].trim();
      let sets = 3;
      let reps = '10-12';
      if (supersetMatch[2]) sets = parseInt(supersetMatch[2]);
      if (supersetMatch[3]) reps = supersetMatch[3].replace(/\s+/g, '').trim();
      exerciseCounter++;
      const id = `custom-${planId}-d${days.length}-ex${exerciseCounter}`;
      currentDay.exercises.push({ id, name: rawName, sets, reps });
    }
  }

  if (currentDay && currentDay.exercises.length > 0) days.push(currentDay);
  if (days.length === 0) return null;

  return { id: planId, name: planName, days };
}

// Generates a unique plan ID from timestamp
export function generatePlanId(): string {
  return `custom-${Date.now()}`;
}
