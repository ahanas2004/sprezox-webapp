import React from 'react';
import { motion } from 'framer-motion';
import styles from './ProfileCard.module.css';

export default function ProfileCard({ name, type, description, focus, avatar, onClick }) {
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  const hoverVariants = {
    rest: { scale: 1, y: 0 },
    hover: { scale: 1.05, y: -10 },
  };

  return (
    <motion.div
      className={styles.card}
      onClick={onClick}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true }}
    >
      <div className={styles.header}>
        <motion.img
          src={avatar || `https://placehold.co/100x100/2a2a2a/E5E7EB?text=${name?.charAt(0)}`}
          alt={name}
          className={styles.avatar}
          whileHover={{ scale: 1.1 }}
        />
        <div className={styles.nameContainer}>
          <h3 className={styles.name}>{name || 'Unnamed Profile'}</h3>
          <p className={styles.role}>{type || 'Member'}</p>
        </div>
      </div>

      <p className={styles.bio}>{description || 'No description provided.'}</p>

      <div className={styles.interests}>
        <span className={styles.interestLabel}>Focus:</span>
        <div className={styles.tagContainer}>
          {focus?.split(',').map((tag) => (
            <motion.span
              key={tag.trim()}
              className={styles.tag}
              whileHover={{ scale: 1.05 }}
            >
              {tag.trim()}
            </motion.span>
          ))}
        </div>
      </div>

      <motion.div
        className={styles.viewButton}
        initial={{ opacity: 0.7 }}
        whileHover={{ opacity: 1 }}
      >
        View Profile
      </motion.div>
    </motion.div>
  );
}