import React, { createContext, useState, useEffect, useContext, useMemo } from 'react';
import { supabase } from '../lib/supabase';

export const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    };
    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => subscription?.unsubscribe();
  }, []);

  // THE CRITICAL FIX:
  // useMemo ensures that the context value object is only recreated when its
  // dependencies (session, loading) actually change. This prevents unnecessary
  // re-renders in all components that consume this context, breaking the infinite loop.
  const value = useMemo(() => ({
    session,
    user,
    loading,
    signOut: () => supabase.auth.signOut(),
  }), [session, loading]);
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};