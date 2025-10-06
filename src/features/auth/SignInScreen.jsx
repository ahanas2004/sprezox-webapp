import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';
import styles from './SignInScreen.module.css';

export default function SignInScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { session } = useAuth();

    useEffect(() => {
        if (session) {
            navigate('/');
        }
    }, [session, navigate]);
    
    const handleSignIn = async (e) => {
        e.preventDefault(); setLoading(true);
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) alert(error.message);
        setLoading(false);
    };

    const handleSignUp = async (e) => {
        e.preventDefault(); setLoading(true);
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) alert(error.message);
        else alert('Sign up successful! Please check your email to confirm your account.');
        setLoading(false);
    };

    const handleGoogleLogin = async () => {
        await supabase.auth.signInWithOAuth({ provider: 'google' });
    };

    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <h1 className={styles.title}>Welcome to SPREZOX</h1>
                <p className={styles.subtitle}>The future of ambition starts here.</p>
                <form>
                    <input className={styles.input} type="email" placeholder="email@address.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input className={styles.input} type="password" placeholder="Password (min. 6 characters)" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <div className={styles.buttonGroup}>
                        <button className={styles.secondaryButton} onClick={handleSignUp} disabled={loading}>{loading ? 'Creating...' : 'Sign Up'}</button>
                        <button className={styles.button} onClick={handleSignIn} disabled={loading}>{loading ? 'Signing In...' : 'Sign In'}</button>
                    </div>
                </form>
                <div className={styles.separator}><span className={styles.separatorText}>OR</span></div>
                <button className={styles.googleButton} onClick={handleGoogleLogin}>Sign In with Google</button>
            </div>
        </div>
    );
}