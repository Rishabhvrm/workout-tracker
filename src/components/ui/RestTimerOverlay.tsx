import { useRestTimer } from '../../context/RestTimerContext';

const RADIUS = 26;
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

  // Color transitions: orange → yellow → green(done)
  const ringColor = isDone ? '#22c55e' : progress > 0.5 ? '#f97316' : '#facc15';

  return (
    <div
      className="fixed left-4 right-4 z-40 flex items-center gap-4 px-4 py-3 rounded-2xl shadow-2xl border border-gray-700"
      style={{
        bottom: 'calc(68px + env(safe-area-inset-bottom))',
        background: 'linear-gradient(135deg, #1f2937, #111827)',
      }}
    >
      {/* Circular progress ring */}
      <div className="relative flex-shrink-0 w-14 h-14 flex items-center justify-center">
        <svg width="56" height="56" className="-rotate-90">
          {/* Track */}
          <circle cx="28" cy="28" r={RADIUS} fill="none" stroke="#374151" strokeWidth="3" />
          {/* Progress */}
          <circle
            cx="28" cy="28" r={RADIUS}
            fill="none"
            stroke={ringColor}
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={offset}
            style={{ transition: 'stroke-dashoffset 0.8s linear, stroke 0.3s' }}
          />
        </svg>
        <span className={`absolute text-sm font-bold tabular-nums ${isDone ? 'text-green-400' : 'text-white'}`}>
          {isDone ? '✓' : formatTime(timeLeft)}
        </span>
      </div>

      {/* Label */}
      <div className="flex-1 min-w-0">
        <p className="text-xs text-gray-500 uppercase tracking-wider">Rest</p>
        <p className={`text-sm font-semibold ${isDone ? 'text-green-400' : 'text-white'}`}>
          {isDone ? 'Ready to go!' : `${formatTime(timeLeft)} remaining`}
        </p>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-2 flex-shrink-0">
        {!isDone && (
          <button
            onClick={() => addTime(15)}
            className="text-xs text-gray-400 bg-gray-800 hover:bg-gray-700 px-2.5 py-1.5 rounded-lg font-medium transition-colors"
          >
            +15s
          </button>
        )}
        <button
          onClick={stop}
          className="text-xs text-gray-400 bg-gray-800 hover:bg-gray-700 px-2.5 py-1.5 rounded-lg font-medium transition-colors"
        >
          {isDone ? 'Dismiss' : 'Skip'}
        </button>
      </div>
    </div>
  );
}
