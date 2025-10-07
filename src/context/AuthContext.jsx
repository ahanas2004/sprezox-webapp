import React, { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

export const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    // Get the initial session
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    };
    getSession();

    // Listen for regular auth state changes (login, logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    // --- THE INSTANT LOGOUT LISTENER ---
    const realtimeChannel = supabase
      .channel('forced-logouts')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'forced_logouts' }, (payload) => {
        // When a new record is inserted into `forced_logouts`
        const deletedUserId = payload.new.user_id;
        
        // Check if the deleted user is the currently logged-in user
        if (session && session.user.id === deletedUserId) {
          console.log('Forced logout triggered for user:', deletedUserId);
          supabase.auth.signOut();
          navigate('/signin', { replace: true });
        }
      })
      .subscribe();

    // Cleanup function to unsubscribe from all listeners
    return () => {
      subscription?.unsubscribe();
      supabase.removeChannel(realtimeChannel);
    };
  }, [session, navigate]); // Add session and navigate to dependency array

  const value = { session, user, loading, signOut: () => supabase.auth.signOut() };
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};