import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ContentCard from '../features/learn/ContentCard';
import { supabase } from '../lib/supabase';
import styles from './LearnPage.module.css';

export default function LearnPage() {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('creator_videos')
        .select('*, profiles(*)')
        .eq('published', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error("Critical Error fetching content:", error);
        setError("Failed to load the Learn Feed. Please try again later.");
      } else {
        setContent(data);
      }
      setLoading(false);
    };
    fetchContent();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <motion.h1
        className="pageTitle"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        Learn Feed
      </motion.h1>

      <motion.p
        className="pageSubtitle"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Bite-sized knowledge from top founders. Curated daily for you.
      </motion.p>

      <motion.div
        className={styles.feedContainer}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {loading && (
          <motion.div
            className={styles.loadingContainer}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              className={styles.loadingSpinner}
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            />
            <p>Loading content...</p>
          </motion.div>
        )}

        {error && (
          <motion.p
            className={`${styles.feedStatus} ${styles.errorText}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            {error}
          </motion.p>
        )}

        {!loading && content.length === 0 && !error && (
          <motion.div
            className={styles.emptyState}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3>The Feed is Empty</h3>
            <p>No content has been published yet. Be the first creator to make an impact!</p>
          </motion.div>
        )}

        {!loading &&
          content.length > 0 &&
          content.map((item, index) => (
            <motion.div
              key={item.id}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    delay: index * 0.1,
                    duration: 0.5,
                    ease: 'easeOut',
                  },
                },
              }}
            >
              <ContentCard content={item} />
            </motion.div>
          ))}
      </motion.div>
    </motion.div>
  );
}