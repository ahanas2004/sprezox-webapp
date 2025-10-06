import React, { useState, useEffect } from 'react';
import { Plus, ArrowLeft } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import styles from './CreatorDashboard.module.css';
import ContentCard from '../learn/ContentCard';
import { motion } from 'framer-motion';

export default function CreatorDashboard({ onUploadClick, user, onGoBack }) {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      if (!user) return;
      setLoading(true);
      const { data, error } = await supabase
        .from('creator_videos')
        .select(`*, profiles:user_id (full_name, avatar_url)`)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) console.error("Error fetching creator videos:", error);
      else setVideos(data);
      setLoading(false);
    };
    fetchVideos();
  }, [user]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <div className={styles.dashboardHeader}>
        <button onClick={onGoBack} className={styles.backButton}>
            <ArrowLeft size={20} /> Go Back
        </button>
        <h2 className={styles.dashboardTitle}>Creator Dashboard</h2>
        <button className={styles.uploadButton} onClick={onUploadClick}>
          <Plus size={24} />
        </button>
      </div>
      {loading ? <p>Loading your content...</p> : (
        <div className={styles.videoGrid}>
          {videos.length > 0 ? videos.map(video => (
            <ContentCard key={video.id} content={video} />
          )) : <p className={styles.emptyState}>You haven't uploaded any content yet. Click the '+' to get started.</p>}
        </div>
      )}
    </motion.div>
  );
};
