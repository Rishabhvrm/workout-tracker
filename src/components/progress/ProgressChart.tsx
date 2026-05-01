import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import type { WorkoutSession } from '../../types';
import { formatDisplayDate } from '../../utils/dateUtils';

interface Props {
  sessions: WorkoutSession[];
  exerciseId: string;
  unit: string;
}

export default function ProgressChart({ sessions, exerciseId, unit }: Props) {
  const data = sessions
    .filter(s => s.exercises.some(e => e.exerciseId === exerciseId))
    .map(s => {
      const ex = s.exercises.find(e => e.exerciseId === exerciseId)!;
      const maxWeight = Math.max(0, ...ex.sets.map(set => set.weight ?? 0));
      return { date: formatDisplayDate(s.date), weight: maxWeight || null };
    })
    .filter(d => d.weight !== null)
    .slice(-20);

  if (data.length < 2) {
    return (
      <div className="flex items-center justify-center h-40 text-gray-500 text-sm">
        Log at least 2 sessions to see your progress
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: -16 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis dataKey="date" tick={{ fill: '#6b7280', fontSize: 10 }} tickLine={false} />
        <YAxis tick={{ fill: '#6b7280', fontSize: 10 }} tickLine={false} axisLine={false} unit={unit} />
        <Tooltip
          contentStyle={{ background: '#1f2937', border: '1px solid #374151', borderRadius: 8 }}
          labelStyle={{ color: '#9ca3af', fontSize: 12 }}
          itemStyle={{ color: '#f97316' }}
          formatter={(v) => [`${v} ${unit}`, 'Weight']}
        />
        <Line
          type="monotone" dataKey="weight"
          stroke="#f97316" strokeWidth={2}
          dot={{ fill: '#f97316', r: 3 }}
          activeDot={{ r: 5 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
