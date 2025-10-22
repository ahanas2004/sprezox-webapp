import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
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
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(error.message);
    setLoading(false);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) alert(error.message);
    else alert('Sign up successful! Please check your email to confirm your account.');
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({ provider: 'google' });
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  const formFieldVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1 + 0.2, duration: 0.4 },
    }),
  };

  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className={styles.formContainer}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className={styles.title}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          Welcome to SPREZOX
        </motion.h1>

        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          The future of ambition starts here.
        </motion.p>

        <motion.form initial="hidden" animate="visible">
          <motion.input
            custom={0}
            variants={formFieldVariants}
            className={styles.input}
            type="email"
            placeholder="email@address.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            whileFocus={{ scale: 1.02, boxShadow: '0 0 20px rgba(0, 217, 255, 0.3)' }}
          />

          <motion.input
            custom={1}
            variants={formFieldVariants}
            className={styles.input}
            type="password"
            placeholder="Password (min. 6 characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            whileFocus={{ scale: 1.02, boxShadow: '0 0 20px rgba(0, 217, 255, 0.3)' }}
          />

          <motion.div
            className={styles.buttonGroup}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <motion.button
              className={styles.secondaryButton}
              onClick={handleSignUp}
              disabled={loading}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? 'Creating...' : 'Sign Up'}
            </motion.button>

            <motion.button
              className={styles.button}
              onClick={handleSignIn}
              disabled={loading}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </motion.button>
          </motion.div>
        </motion.form>

        <motion.div
          className={styles.separator}
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <span className={styles.separatorText}>OR</span>
        </motion.div>

        <motion.button
          className={styles.googleButton}
          onClick={handleGoogleLogin}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          Sign In with Google
        </motion.button>
      </motion.div>
    </motion.div>
  );
}