import React from 'react';
import { motion } from 'framer-motion';
import styles from './IdeaCard.module.css';

export default function IdeaCard({ submission }) {
  const submitter = submission.profiles;
  const typeLabel = submission.submission_type === 'student' ? 'Student Idea' : 'Startup';

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <motion.div
      className={styles.card}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      whileHover={{ y: -8, scale: 1.02 }}
      viewport={{ once: true }}
    >
      <div className={styles.header}>
        <motion.span
          className={styles.typeLabel}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
        >
          {typeLabel}
        </motion.span>
      </div>

      <h3 className={styles.title}>{submission.title}</h3>
      <p className={styles.description}>{submission.description}</p>

      <div className={styles.footer}>
        <motion.img
          src={
            submitter?.avatar_url ||
            `https://placehold.co/40x40/2a2a2a/E5E7EB?text=${submitter?.full_name?.charAt(0) || 'S'}`
          }
          alt={submitter?.full_name}
          className={styles.avatar}
          whileHover={{ scale: 1.1 }}
        />
        <span className={styles.submitterName}>{submitter?.full_name || 'Anonymous'}</span>
      </div>
    </motion.div>
  );
}