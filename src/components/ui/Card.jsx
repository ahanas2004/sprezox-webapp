import React from 'react';
import { motion } from 'framer-motion';
import styles from './Card.module.css';

export default function Card({ children, className = '', interactive = true }) {
  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.34, 1.56, 0.64, 1],
      },
    },
  };

  const hoverVariants = {
    rest: { rotateX: 0, rotateY: 0 },
    hover: interactive ? { 
      y: -8,
      boxShadow: '0 20px 60px rgba(0, 217, 255, 0.3)',
    } : {},
  };

  return (
    <motion.div
      className={`${styles.card} ${className}`}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      whileHover={interactive ? "hover" : "rest"}
      variants={hoverVariants}
    >
      {children}
    </motion.div>
  );
}