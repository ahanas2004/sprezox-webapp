import React from 'react';
import { motion } from 'framer-motion';
import { PlayCircle, Mic, Heart, Bookmark, Share2, Trash2 } from 'lucide-react';
import styles from './ContentCard.module.css';
import { supabase } from '../../lib/supabase';

export default function ContentCard({ content, isDashboardView = false, onDelete }) {
    const isReel = content.content_type === 'reel';
    const creator = content.profiles;

    return (
        <motion.div 
            className={styles.card}
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
        >
            <div className={styles.mediaPlaceholder}>
                {content.thumbnail_path ? (
                    <img src={content.thumbnail_path} alt={content.title} className={styles.thumbnail} />
                ) : (
                    isReel ? <PlayCircle size={64} className={styles.mediaIcon} /> : <Mic size={64} className={styles.mediaIcon} />
                )}
                <div className={styles.glow}></div>
            </div>
            <div className={styles.infoContainer}>
                <div className={styles.header}>
                    <img 
                        src={creator?.avatar_url || `https://placehold.co/40x40/2a2a2a/E5E7EB?text=${creator?.full_name?.charAt(0) || 'S'}`} 
                        alt={creator?.full_name} 
                        className={styles.avatar} 
                    />
                    <span className={styles.creator}>{creator?.full_name || 'Anonymous Creator'}</span>
                </div>
                <h3 className={styles.title}>{content.title}</h3>
                <p className={styles.description}>{content.description}</p>
                <div className={styles.actions}>
                    {/* Public actions */}
                    <button className={styles.actionButton}><Heart /> <span>{content.like_count || 0}</span></button>
                    <button className={styles.actionButton}><Bookmark /> <span>{content.save_count || 0}</span></button>
                    <button className={styles.actionButton}><Share2 /></button>

                    {/* THE FIX: Conditionally render the Delete button only in the dashboard view */}
                    {isDashboardView && (
                        <button className={`${styles.actionButton} ${styles.deleteButton}`} onClick={onDelete}>
                            <Trash2 />
                        </button>
                    )}
                </div>
            </div>
        </motion.div>
    );
}