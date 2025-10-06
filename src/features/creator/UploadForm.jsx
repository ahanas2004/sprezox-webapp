import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';
import styles from './UploadForm.module.css';
import { motion } from 'framer-motion';

export default function UploadForm({ onUpload, onClose }) {
    const { user } = useAuth();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('Tutorial');
    const [videoFile, setVideoFile] = useState(null);
    const [thumbnailFile, setThumbnailFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!videoFile || !title || !user) {
            alert('A video file and title are required.');
            return;
        }
        setLoading(true);

        try {
            // 1. Upload Video File
            const fileExt = videoFile.name.split('.').pop();
            const videoPath = `${user.id}/${Date.now()}.${fileExt}`;
            const { error: videoUploadError } = await supabase.storage
                .from('creator-uploads')
                .upload(videoPath, videoFile, {
                    onProgress: (event) => {
                        setProgress((event.loaded / event.total) * 100);
                    },
                });

            if (videoUploadError) throw videoUploadError;
            const { data: { publicUrl: videoUrl } } = supabase.storage.from('creator-uploads').getPublicUrl(videoPath);

            // 2. Upload Thumbnail (if exists)
            let thumbnailUrl = null;
            if (thumbnailFile) {
                const thumbExt = thumbnailFile.name.split('.').pop();
                const thumbPath = `${user.id}/${Date.now()}_thumb.${thumbExt}`;
                const { error: thumbUploadError } = await supabase.storage.from('creator-uploads').upload(thumbPath, thumbnailFile);
                if (thumbUploadError) throw thumbUploadError;
                const { data: { publicUrl } } = supabase.storage.from('creator-uploads').getPublicUrl(thumbPath);
                thumbnailUrl = publicUrl;
            }

            // 3. Insert into Database
            const { error: insertError } = await supabase
                .from('creator_videos')
                .insert({
                    user_id: user.id,
                    title,
                    description,
                    category,
                    video_path: videoPath,
                    thumbnail_path: thumbnailUrl,
                });

            if (insertError) throw insertError;
            
            alert('Video uploaded successfully!');
            onUpload();
            onClose();

        } catch (error) {
            console.error('Error during upload process:', error);
            alert(`Upload failed: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className={styles.form} onSubmit={handleUpload}>
            <div className={styles.field}>
                <label className={styles.label}>Video File (.mp4, .mov)</label>
                <input required type="file" accept="video/mp4,video/quicktime" className={styles.input} onChange={e => setVideoFile(e.target.files[0])} />
            </div>
             <div className={styles.field}>
                <label className={styles.label}>Thumbnail Image</label>
                <input type="file" accept="image/*" className={styles.input} onChange={e => setThumbnailFile(e.target.files[0])} />
            </div>
             <div className={styles.field}>
                <label className={styles.label}>Title</label>
                <input required className={styles.input} value={title} onChange={e => setTitle(e.target.value)} />
            </div>
             <div className={styles.field}>
                <label className={styles.label}>Description</label>
                <textarea className={styles.textarea} value={description} onChange={e => setDescription(e.target.value)} />
            </div>
            <div className={styles.field}>
                <label className={styles.label}>Category</label>
                <select className={styles.input} value={category} onChange={e => setCategory(e.target.value)}>
                    <option>Tutorial</option>
                    <option>Pitch</option>
                    <option>Demo</option>
                    <option>Other</option>
                </select>
            </div>
            {loading && <div className={styles.progressBar}><motion.div className={styles.progress} initial={{width:0}} animate={{width: `${progress}%`}}/></div>}
            <button type="submit" className={styles.saveButton} disabled={loading}>
                {loading ? `Uploading ${Math.round(progress)}%...` : 'Upload Content'}
            </button>
        </form>
    );
};