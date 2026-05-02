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
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    setIsNewUser(sessionStorage.getItem('wt_new_user') === '1');

    return () => subscription.unsubscribe();
  }, []);

  async function signUp(email: string, password: string, name: string): Promise<string | null> {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } },
    });
    if (error) return error.message;
    if (data.user) {
      await supabase.from('profiles').update({ name }).eq('id', data.user.id);
    }
    sessionStorage.setItem('wt_new_user', '1');
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
    sessionStorage.removeItem('wt_new_user');
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
