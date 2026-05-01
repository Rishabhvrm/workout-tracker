import type { SessionExercise } from '../../types';
import ExerciseCard from './ExerciseCard';
import { useWorkout, getEffectivePlan } from '../../context/WorkoutContext';

interface Props {
  exercises: SessionExercise[];
  planId: string;
}

export default function ExerciseList({ exercises }: Props) {
  const { profile } = useWorkout();
  const plan = getEffectivePlan(profile);
  const planExercises = plan.days.flatMap(d => d.exercises);
  const notesMap = Object.fromEntries(planExercises.map(e => [e.id, e.notes]));

  return (
    <div className="space-y-3">
      {exercises.map(ex => (
        <div key={ex.exerciseId}>
          <ExerciseCard exercise={ex} />
          {notesMap[ex.exerciseId] && (
            <p className="text-xs text-gray-600 mt-1 px-5">{notesMap[ex.exerciseId]}</p>
          )}
        </div>
      ))}
    </div>
  );
}
