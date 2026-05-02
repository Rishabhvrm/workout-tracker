import { Outlet } from 'react-router-dom';
import BottomNav from './BottomNav';
import GuestBanner from './GuestBanner';
import RestTimerOverlay from '../ui/RestTimerOverlay';
import { useAuth } from '../../context/AuthContext';

export default function AppShell() {
  const { isGuest } = useAuth();
  return (
    <div className="min-h-screen bg-gray-950 flex flex-col">
      {isGuest && <GuestBanner />}
      <main
        className="flex-1 overflow-y-auto"
        style={{ paddingBottom: 'calc(64px + env(safe-area-inset-bottom))' }}
      >
        <Outlet />
      </main>
      <RestTimerOverlay />
      <BottomNav />
    </div>
  );
}
