import { useRestTimer } from '../../context/RestTimerContext';

const RADIUS = 36;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export default function RestTimerOverlay() {
  const { timeLeft, duration, isRunning, stop, addTime } = useRestTimer();

  if (!isRunning && timeLeft === 0) return null;

  const progress = duration > 0 ? timeLeft / duration : 0;
  const offset = CIRCUMFERENCE * (1 - progress);
  const isDone = timeLeft === 0;

  const ringColor = isDone ? '#22c55e' : progress > 0.5 ? '#f97316' : '#facc15';

  return (
    <div
      className="fixed inset-x-6 z-40 rounded-2xl border border-gray-700 shadow-2xl p-6 flex flex-col items-center gap-4"
      style={{
        top: '50%',
        transform: 'translateY(-50%)',
        background: 'linear-gradient(135deg, #1f2937, #111827)',
      }}
    >
      <p className="text-xs text-gray-500 uppercase tracking-wider">Rest Timer</p>

      {/* Circular progress ring */}
      <div className="relative flex items-center justify-center">
        <svg width="96" height="96" className="-rotate-90">
          <circle cx="48" cy="48" r={RADIUS} fill="none" stroke="#374151" strokeWidth="4" />
          <circle
            cx="48" cy="48" r={RADIUS}
            fill="none"
            stroke={ringColor}
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={offset}
            style={{ transition: 'stroke-dashoffset 0.8s linear, stroke 0.3s' }}
          />
        </svg>
        <span className={`absolute text-3xl font-bold tabular-nums ${isDone ? 'text-green-400' : 'text-white'}`}>
          {isDone ? '✓' : formatTime(timeLeft)}
        </span>
      </div>

      <p className={`text-sm font-medium ${isDone ? 'text-green-400' : 'text-gray-300'}`}>
        {isDone ? 'Ready to go!' : `${formatTime(timeLeft)} remaining`}
      </p>

      <div className="flex gap-3">
        {!isDone && (
          <button
            onClick={() => addTime(15)}
            className="px-5 py-2.5 rounded-xl text-sm font-medium text-gray-300 bg-gray-800 hover:bg-gray-700 transition-colors"
          >
            +15s
          </button>
        )}
        <button
          onClick={stop}
          className="px-5 py-2.5 rounded-xl text-sm font-medium text-gray-300 bg-gray-800 hover:bg-gray-700 transition-colors"
        >
          {isDone ? 'Dismiss' : 'Skip'}
        </button>
      </div>
    </div>
  );
}
