import { Outlet } from 'react-router-dom';
import BottomNav from './BottomNav';

export default function AppShell() {
  return (
    <div className="min-h-screen bg-gray-950 flex flex-col">
      <main
        className="flex-1 overflow-y-auto"
        style={{ paddingBottom: 'calc(64px + env(safe-area-inset-bottom))' }}
      >
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}
