import React, { createContext, useContext, useEffect, useState } from 'react';
import type { User } from '@supabase/supabase-js';
import { supabase } from '../services/supabase';
import { clearStorage } from '../services/storage';

interface AuthContextValue {
  user: User | null;
  isGuest: boolean;
  isNewUser: boolean;
  loading: boolean;
  guestChosen: boolean;
  signUp: (email: string, password: string, name: string) => Promise<string | null>;
  signIn: (email: string, password: string) => Promise<string | null>;
  signOut: () => Promise<void>;
  continueAsGuest: () => void;
  showAuthScreen: () => void;
  clearNewUserFlag: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isNewUser, setIsNewUser] = useState(false);
  const [guestChosen, setGuestChosen] = useState(false);

  useEffect(() => {
    // Handle tokens arriving in the URL hash from email confirmation links.
    // Supabase puts #access_token=...&refresh_token=... in the hash after redirect.
    // We extract the session from it so HashRouter doesn't swallow it.
    const hash = window.location.hash;
    if (hash.includes('access_token=')) {
      const params = new URLSearchParams(hash.replace(/^#\/?/, ''));
      const access_token = params.get('access_token');
      const refresh_token = params.get('refresh_token');
      if (access_token && refresh_token) {
        supabase.auth.setSession({ access_token, refresh_token }).then(({ data }) => {
          setUser(data.session?.user ?? null);
          setLoading(false);
          localStorage.removeItem('wt_new_user');
          // Clean the URL so HashRouter doesn't see it as a route
          window.history.replaceState(null, '', window.location.pathname);
        });
        return;
      }
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
      if (session?.user) localStorage.removeItem('wt_new_user');
    });

    return () => subscription.unsubscribe();
  }, []);

  async function signUp(email: string, password: string, name: string): Promise<string | null> {
    const redirectTo = window.location.hostname === 'localhost'
      ? `${window.location.origin}/workout-tracker`
      : 'https://rishabhvrm.github.io/workout-tracker';

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name },
        emailRedirectTo: redirectTo,
      },
    });
    if (error) return error.message;
    // Name is written by the DB trigger via raw_user_meta_data — no separate update needed.
    localStorage.setItem('wt_new_user', '1');
    setIsNewUser(true);
    return null;
  }

  async function signIn(email: string, password: string): Promise<string | null> {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return error.message;
    return null;
  }

  async function signOut() {
    clearStorage();
    await supabase.auth.signOut();
    setGuestChosen(false);
  }

  function continueAsGuest() {
    setGuestChosen(true);
  }

  function showAuthScreen() {
    setGuestChosen(false);
  }

  function clearNewUserFlag() {
    localStorage.removeItem('wt_new_user');
    setIsNewUser(false);
  }

  return (
    <AuthContext.Provider value={{
      user,
      isGuest: !user,
      isNewUser: !!user && isNewUser,
      loading,
      guestChosen,
      signUp,
      signIn,
      signOut,
      continueAsGuest,
      showAuthScreen,
      clearNewUserFlag,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
