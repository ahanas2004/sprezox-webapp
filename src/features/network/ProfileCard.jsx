import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus } from 'lucide-react';
import styles from './ProfileCard.module.css';

// This is now a "dumb" presentational component.
export default function ProfileCard({ name, type, description, focus, avatar }) {
  return (
    <motion.div className={styles.card} whileHover={{ y: -5, boxShadow: '0 0 30px var(--glow-color)' }}>
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
          <span className={styles.tag}>{focus || 'N/A'}</span>
        </div>
      </div>

      <button className={styles.connectButton}>
        <UserPlus size={18} /> View Profile
      </button>
    </motion.div>
  );
}