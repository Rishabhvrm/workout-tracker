import { useWorkout } from '../context/WorkoutContext';
import HistoryCard from '../components/history/HistoryCard';

export default function HistoryScreen() {
  const { profile } = useWorkout();
  const sessions = Object.values(profile.sessions)
    .sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="px-4 pt-6 pb-4">
      <h1 className="text-2xl font-bold text-white mb-6">History</h1>

      {sessions.length === 0 ? (
        <div className="text-center py-16 text-gray-500">
          <p className="text-5xl mb-4">📋</p>
          <p>No workouts logged yet.</p>
          <p className="text-sm mt-1">Complete your first session to see it here.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {sessions.map(s => <HistoryCard key={s.date} session={s} />)}
        </div>
      )}
    </div>
  );
}
