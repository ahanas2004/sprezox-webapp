import React, { useState, useEffect } from 'react';
import { Plus, ArrowLeft } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import styles from './CreatorDashboard.module.css';
import ContentCard from '../learn/ContentCard';
import { motion } from 'framer-motion';

export default function CreatorDashboard({ onUploadClick, user, onGoBack }) {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    fetchVideos();
  }, [user]);

  // THE DEFINITIVE FIX: The complete handleDelete function
  const handleDelete = async (videoId, videoPath, thumbnailPath) => {
    if (!window.confirm("Are you sure you want to permanently delete this post? This action cannot be undone.")) {
        return;
    }

    try {
        // 1. Delete the database record first. This is the most critical step.
        const { error: dbError } = await supabase
            .from('creator_videos')
            .delete()
            .eq('id', videoId);

        if (dbError) throw dbError;

        // 2. If DB deletion is successful, delete the files from storage.
        const filesToDelete = [videoPath];
        if (thumbnailPath) {
            // We need to extract just the file path from the full URL for the remove function
            const pathParts = thumbnailPath.split('/');
            const thumbFileName = pathParts[pathParts.length - 1];
            filesToDelete.push(`${user.id}/${thumbFileName}`);
        }

        const { error: storageError } = await supabase
            .storage
            .from('creator-uploads')
            .remove(filesToDelete);

        if (storageError) {
            // Log the error but don't block the UI update, as the post is already gone from the DB.
            console.error("Storage cleanup failed:", storageError);
        }

        // 3. Update the UI instantly for a great user experience.
        setVideos(currentVideos => currentVideos.filter(video => video.id !== videoId));
        alert("Post deleted successfully.");

    } catch (error) {
        alert(`Failed to delete post: ${error.message}`);
    }
  };

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
            <ContentCard 
                key={video.id} 
                content={video} 
                isDashboardView={true} // This prop tells the card to show the delete button
                onDelete={() => handleDelete(video.id, video.video_path, video.thumbnail_path)}
            />
          )) : <p className={styles.emptyState}>You haven't uploaded any content yet. Click the '+' to get started.</p>}
        </div>
      )}
    </motion.div>
  );
};