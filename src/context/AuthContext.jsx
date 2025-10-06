import React, { createContext, useState, useEffect, useContext } from 'react';
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

  const value = { session, user, loading, signOut: () => supabase.auth.signOut() };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};