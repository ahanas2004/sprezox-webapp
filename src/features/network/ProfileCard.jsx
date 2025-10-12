import React from 'react';
import { motion } from 'framer-motion';
import styles from './ProfileCard.module.css';

// THE FIX: The component now accepts an `onClick` prop.
export default function ProfileCard({ name, type, description, focus, avatar, onClick }) {
  return (
    <motion.div 
        className={styles.card} 
        onClick={onClick}
        whileHover={{ y: -5, boxShadow: '0 0 30px var(--glow-color)' }}
    >
      <div className={styles.header}>
        <img src={avatar || `https://placehold.co/100x100/2a2a2a/E5E7EB?text=${name?.charAt(0)}`} alt={name} className={styles.avatar} />
        <div className={styles.nameContainer}>
          <h3 className={styles.name}>{name || 'Unnamed Profile'}</h3>
          <p className={styles.role}>{type || 'Member'}</p>
        </div>
      </div>
      <p className={styles.bio}>{description || "No description provided."}</p>
      
      <div className={styles.interests}>
        <span className={styles.interestLabel}>Focus:</span>
        <div className={styles.tagContainer}>
          {focus?.split(',').map(tag => (
            <span key={tag.trim()} className={styles.tag}>{tag.trim()}</span>
          ))}
        </div>
      </div>

      {/* THE FIX: Changed to a non-interactive div to avoid nested buttons */}
      <div className={styles.viewButton}>
        View Profile
      </div>
    </motion.div>
  );
}