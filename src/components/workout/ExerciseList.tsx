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
        <ExerciseCard key={ex.exerciseId} exercise={ex} notes={notesMap[ex.exerciseId]} />
      ))}
    </div>
  );
}
