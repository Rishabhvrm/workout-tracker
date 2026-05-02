import { useAuth } from '../../context/AuthContext';

export default function GuestBanner() {
  const { showAuthScreen } = useAuth();
  return (
    <div
      onClick={showAuthScreen}
      className="flex items-center justify-between px-4 py-2.5 bg-gray-900 border-b border-orange-500/20 cursor-pointer active:bg-gray-800 transition-colors"
    >
      <span className="text-xs text-gray-400">
        Browsing as guest —{' '}
        <span className="text-orange-400 font-medium">data won't be saved</span>
      </span>
      <span className="text-xs text-orange-400 font-semibold flex items-center gap-1">
        Sign up
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-3 h-3">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </span>
    </div>
  );
}
