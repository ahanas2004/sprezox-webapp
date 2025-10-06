import React from 'react';
import { motion } from 'framer-motion';
import styles from './Button.module.css';

export default function Button({ children, onClick, primary = false, className = '', disabled = false }) {
  return (
    <motion.button
      className={`${styles.button} ${primary ? styles.primary : ''} ${className}`}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ y: disabled ? 0 : -2 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
    >
      {children}
    </motion.button>
  );
}