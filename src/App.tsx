import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { WorkoutProvider } from './context/WorkoutContext';
import { RestTimerProvider } from './context/RestTimerContext';
import AppShell from './components/layout/AppShell';
import TodayScreen from './screens/TodayScreen';
import HistoryScreen from './screens/HistoryScreen';
import ProgressScreen from './screens/ProgressScreen';
import SettingsScreen from './screens/SettingsScreen';
import AuthScreen from './screens/auth/AuthScreen';
import OnboardingScreen from './screens/onboarding/OnboardingScreen';

function AppRoutes() {
  const { loading, user, guestChosen, isNewUser } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-orange-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  // Show auth screen until user chooses to log in or continue as guest
  if (!user && !guestChosen) {
    return <AuthScreen />;
  }

  // New user just signed up → onboarding wizard
  if (isNewUser) {
    return <OnboardingScreen />;
  }

  return (
    <HashRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route index element={<Navigate to="/today" replace />} />
          <Route path="/today" element={<TodayScreen />} />
          <Route path="/history" element={<HistoryScreen />} />
          <Route path="/progress" element={<ProgressScreen />} />
          <Route path="/settings" element={<SettingsScreen />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <WorkoutProvider>
        <RestTimerProvider>
          <AppRoutes />
        </RestTimerProvider>
      </WorkoutProvider>
    </AuthProvider>
  );
}
