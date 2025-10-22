import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './Button.module.css';

export default function Button({ 
  children, 
  onClick, 
  primary = false, 
  className = '', 
  disabled = false,
  type = 'button',
  size = 'medium' 
}) {
  const [ripples, setRipples] = useState([]);

  const handleClick = (e) => {
    // Ripple effect
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const ripple = { x, y, id: Date.now() };
    
    setRipples([ripple]);
    setTimeout(() => setRipples([]), 600);

    // Call onClick if provided
    if (onClick && !disabled) {
      onClick(e);
    }
  };

  const buttonVariants = {
    idle: { scale: 1 },
    hover: !disabled ? { scale: 1.02, y: -2 } : {},
    tap: !disabled ? { scale: 0.98 } : {},
  };

  const childrenVariants = {
    idle: { y: 0 },
    hover: !disabled ? { y: -1 } : {},
  };

  return (
    <motion.button
      className={`${styles.button} ${primary ? styles.primary : ''} ${styles[size]} ${className}`}
      onClick={handleClick}
      disabled={disabled}
      type={type}
      variants={buttonVariants}
      initial="idle"
      whileHover="hover"
      whileTap="tap"
      transition={{ duration: 0.2, type: 'spring', stiffness: 300 }}
    >
      {/* Ripple Effects */}
      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          className={styles.ripple}
          style={{ left: ripple.x, top: ripple.y }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 4, opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      ))}

      {/* Button Content */}
      <motion.span
        variants={childrenVariants}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.span>
    </motion.button>
  );
}