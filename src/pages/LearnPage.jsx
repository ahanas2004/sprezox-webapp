import React, { useState, useEffect } from 'react';
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
      
      // THE FINAL FIX: This is the most robust query syntax.
      // It tells Supabase to fetch all columns from creator_videos and join the related
      // record from the 'profiles' table, which it knows how to do via the foreign key.
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

  return (
    <div className={styles.container}>
      <h1 className="pageTitle">Learn Feed</h1>
      <p className="pageSubtitle">
        Bite-sized knowledge from top founders. Curated daily for you.
      </p>
      <div className={styles.feedContainer}>
        {loading && <p className={styles.feedStatus}>Loading content...</p>}
        {error && <p className={`${styles.feedStatus} ${styles.errorText}`}>{error}</p>}
        {!loading && content.length === 0 && !error && (
            <div className={styles.emptyState}>
                <h3>The Feed is Empty</h3>
                <p>No content has been published yet. Be the first creator to make an impact!</p>
            </div>
        )}
        {!loading && content.length > 0 &&
         content.map(item => <ContentCard key={item.id} content={item} />)
        }
      </div>
    </div>
  );
}

