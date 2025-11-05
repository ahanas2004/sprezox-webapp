// src/pages/IdeasPage.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { supabase } from '../lib/supabase';
import IdeaCard from '../features/ideas/IdeaCard';
import styles from './IdeasPage.module.css';

export default function IdeasPage() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all'); // 'all', 'student', 'entrepreneur'

  useEffect(() => {
    const fetchSubmissions = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('submissions')
        .select('*, profiles(full_name, avatar_url)')
        .eq('status', 'approved')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error("Error fetching submissions:", error);
      } else {
        setSubmissions(data);
      }
      setLoading(false);
    };
    fetchSubmissions();
  }, []);

  // Client-side filtering with useMemo for performance
  const filteredSubmissions = useMemo(() => {
    return submissions.filter(submission => {
      // Search filter
      const matchesSearch = 
        searchQuery === '' ||
        submission.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        submission.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        submission.profiles?.full_name?.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Type filter
      const matchesType = 
        filterType === 'all' || 
        submission.submission_type === filterType;
      
      return matchesSearch && matchesType;
    });
  }, [submissions, searchQuery, filterType]);

  // Animation variants
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

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <motion.div 
      className="container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1 
        className="pageTitle"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        Startup & Student Ideas
      </motion.h1>
      
      <motion.p 
        className="pageSubtitle"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Browse innovative projects and startups emerging from the SPREZOX community.
      </motion.p>

      {/* Search and Filter Controls */}
      <motion.div 
        className={styles.controls}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <div className={styles.searchBox}>
          <Search size={20} className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search ideas by title, description, or founder..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className={styles.clearButton}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>
        
        <div className={styles.filters}>
          <button 
            className={filterType === 'all' ? styles.filterActive : styles.filter}
            onClick={() => setFilterType('all')}
          >
            All Ideas ({submissions.length})
          </button>
          <button 
            className={filterType === 'student' ? styles.filterActive : styles.filter}
            onClick={() => setFilterType('student')}
          >
            Student Projects ({submissions.filter(s => s.submission_type === 'student').length})
          </button>
          <button 
            className={filterType === 'entrepreneur' ? styles.filterActive : styles.filter}
            onClick={() => setFilterType('entrepreneur')}
          >
            Startups ({submissions.filter(s => s.submission_type === 'entrepreneur').length})
          </button>
        </div>
      </motion.div>

      {/* Results Count */}
      {!loading && (
        <motion.p 
          className={styles.resultsCount}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Showing {filteredSubmissions.length} of {submissions.length} ideas
        </motion.p>
      )}

      {/* Ideas Grid */}
      <motion.div 
        className={styles.grid}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {loading && (
          <motion.div
            className={styles.loadingState}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className={styles.spinner}
            />
            <p>Loading ideas...</p>
          </motion.div>
        )}

        {!loading && filteredSubmissions.length > 0 ? (
          filteredSubmissions.map((submission, index) => (
            <motion.div key={submission.id} variants={itemVariants}>
              <IdeaCard submission={submission} />
            </motion.div>
          ))
        ) : (
          !loading && (
            <motion.div
              className={styles.emptyState}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {searchQuery || filterType !== 'all' ? (
                <>
                  <h3>No ideas found</h3>
                  <p>
                    Try adjusting your search or filters to discover more innovative projects.
                  </p>
                  <button 
                    onClick={() => {
                      setSearchQuery('');
                      setFilterType('all');
                    }}
                    className={styles.resetButton}
                  >
                    Clear all filters
                  </button>
                </>
              ) : (
                <>
                  <h3>No ideas yet</h3>
                  <p>
                    Be the first to share your innovative project or startup idea with the SPREZOX community!
                  </p>
                </>
              )}
            </motion.div>
          )
        )}
      </motion.div>
    </motion.div>
  );
}