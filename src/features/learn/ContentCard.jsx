import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Mic, Heart, Bookmark, Share2, PlayCircle } from 'lucide-react';
import styles from './ContentCard.module.css';
import { supabase } from '../../lib/supabase';

export default function ContentCard({ content }) {
    const isReel = content.content_type === 'reel';
    const creator = content.profiles;

    // NEW, SIMPLIFIED STATE: We only care if the user has clicked to play.
    const [isVideoVisible, setIsVideoVisible] = useState(false);

    // This function is now the only way to start the video.
    const handlePlayClick = () => {
        setIsVideoVisible(true);
    };

    const videoUrl = supabase.storage.from('creator-uploads').getPublicUrl(content.video_path).data.publicUrl;

    return (
        <motion.div
            className={styles.card}
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
        >
            <div className={styles.mediaContainer}>
                {isVideoVisible ? (
                    // This video element is only rendered AFTER the user clicks.
                    // 'autoPlay' and 'controls' ensure it plays immediately and is controllable.
                    <video
                        className={styles.videoPlayer}
                        src={videoUrl}
                        poster={content.thumbnail_path}
                        autoPlay
                        controls
                        playsInline
                    />
                ) : (
                    // This is the default view: a clickable thumbnail.
                    <button className={styles.thumbnailButton} onClick={handlePlayClick}>
                        {content.thumbnail_path ? (
                            <img src={content.thumbnail_path} alt={content.title} className={styles.thumbnail} />
                        ) : (
                            isReel ? <div className={styles.mediaPlaceholder}><PlayCircle size={64} className={styles.mediaIcon} /></div> : <div className={styles.mediaPlaceholder}><Mic size={64} className={styles.mediaIcon} /></div>
                        )}
                        <div className={styles.playOverlay}>
                            <Play size={64} fill="white" />
                        </div>
                        <div className={styles.glow}></div>
                    </button>
                )}
            </div>
            <div className={styles.infoContainer}>
                <div className={styles.header}>
                    <img
                        src={creator?.avatar_url || `https://placehold.co/40x40/2a2a2a/E5E7EB?text=${creator?.full_name?.charAt(0) || 'S'}`}
                        alt={creator?.full_name}
                        className={styles.avatar}
                    />
                    <span className={styles.creator}>{creator?.full_name || 'Anonymous'}</span>
                </div>
                <h3 className={styles.title}>{content.title}</h3>
                <p className={styles.description}>{content.description}</p>
                <div className={styles.actions}>
                    <button className={styles.actionButton}><Heart /> <span>{content.like_count || 0}</span></button>
                    <button className={styles.actionButton}><Bookmark /> <span>{content.save_count || 0}</span></button>
                    <button className={styles.actionButton}><Share2 /></button>
                </div>
            </div>
        </motion.div>
    );
}