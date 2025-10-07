import React from 'react';
import { motion } from 'framer-motion';
import styles from './IdeaCard.module.css';

export default function IdeaCard({ submission }) {
    const submitter = submission.profiles;
    const typeLabel = submission.submission_type === 'student' ? 'Student Idea' : 'Startup';

    return (
        <motion.div className={styles.card} whileHover={{ y: -5 }}>
            <div className={styles.header}>
                <span className={styles.typeLabel}>{typeLabel}</span>
            </div>
            <h3 className={styles.title}>{submission.title}</h3>
            <p className={styles.description}>{submission.description}</p>
            <div className={styles.footer}>
                <img 
                    src={submitter?.avatar_url || `https://placehold.co/40x40/2a2a2a/E5E7EB?text=${submitter?.full_name?.charAt(0) || 'S'}`} 
                    alt={submitter?.full_name} 
                    className={styles.avatar} 
                />
                <span className={styles.submitterName}>{submitter?.full_name || 'Anonymous'}</span>
            </div>
        </motion.div>
    );
}