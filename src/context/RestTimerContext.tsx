import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';

interface RestTimerContextValue {
  timeLeft: number;
  duration: number;
  isRunning: boolean;
  start: (seconds: number) => void;
  stop: () => void;
  addTime: (seconds: number) => void;
}

const RestTimerContext = createContext<RestTimerContextValue | null>(null);

export function RestTimerProvider({ children }: { children: React.ReactNode }) {
  const [timeLeft, setTimeLeft] = useState(0);
  const [duration, setDuration] = useState(90);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!isRunning) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          setIsRunning(false);
          // Vibrate on finish if supported
          if ('vibrate' in navigator) navigator.vibrate([200, 100, 200]);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isRunning]);

  const start = useCallback((seconds: number) => {
    setDuration(seconds);
    setTimeLeft(seconds);
    setIsRunning(true);
  }, []);

  const stop = useCallback(() => {
    setIsRunning(false);
    setTimeLeft(0);
  }, []);

  const addTime = useCallback((seconds: number) => {
    setTimeLeft(t => Math.max(0, t + seconds));
  }, []);

  return (
    <RestTimerContext.Provider value={{ timeLeft, duration, isRunning, start, stop, addTime }}>
      {children}
    </RestTimerContext.Provider>
  );
}

export function useRestTimer() {
  const ctx = useContext(RestTimerContext);
  if (!ctx) throw new Error('useRestTimer must be used inside RestTimerProvider');
  return ctx;
}
