import React from 'react';
import { motion } from 'framer-motion';
import { Trash2 } from 'lucide-react';
import styles from './SubmissionCard.module.css';

export default function SubmissionCard({ submission, onDelete }) {
    const typeLabel = submission.submission_type === 'student' ? 'Student Idea' : 'Startup';

    return (
        <motion.div 
            className={styles.card}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className={styles.header}>
                <span className={styles.typeLabel}>{typeLabel}</span>
                <button className={styles.deleteButton} onClick={onDelete}>
                    <Trash2 size={18} />
                </button>
            </div>
            <h3 className={styles.title}>{submission.title}</h3>
            <p className={styles.description}>{submission.description}</p>
        </motion.div>
    );
}