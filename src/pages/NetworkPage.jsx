// src/pages/NetworkPage.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { supabase } from '../lib/supabase';
import ProfileCard from '../features/network/ProfileCard';
import InvestorDetailModal from '../features/network/InvestorDetailModal';
import Modal from '../components/ui/Modal';
import styles from './NetworkPage.module.css';

export default function NetworkPage() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState('all'); // 'all', 'investor', 'mentor'

  useEffect(() => {
    const fetchListedProfiles = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('is_investor_listed', true)
        .or('role.eq.investor,role.eq.mentor');

      if (error) {
        console.error('Error fetching listed profiles:', error);
      } else {
        setProfiles(data);
      }
      setLoading(false);
    };
    fetchListedProfiles();
  }, []);

  const getCardProps = (profile) => {
    if (profile.role === 'investor') {
      return {
        ...profile,
        name: profile.investor_details?.org_name || profile.full_name || 'Unnamed Investor',
        type: profile.investor_type === 'vc' ? 'Venture Capital' : 'Angel Investor',
        description: profile.investor_details?.description,
        focus: profile.investor_details?.focus,
        avatar: profile.avatar_url,
      };
    }
    if (profile.role === 'mentor') {
      return {
        ...profile,
        name: profile.mentor_details?.org_name || profile.full_name || 'Unnamed Mentor',
        type: profile.mentor_type === 'accelerator' ? 'Accelerator' : 'Incubator',
        description: profile.mentor_details?.description,
        focus: profile.mentor_details?.focus,
        avatar: profile.avatar_url,
      };
    }
    return null;
  };

  const handleCardClick = (profileData) => {
    setSelectedProfile(profileData);
    setIsModalOpen(true);
  };

  // Transform all profiles
  const allProfiles = profiles.map(getCardProps).filter(Boolean);

  // Client-side filtering with useMemo for performance
  const filteredProfiles = useMemo(() => {
    return allProfiles.filter(profile => {
      // Search filter
      const matchesSearch = 
        searchQuery === '' ||
        profile.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        profile.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        profile.focus?.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Role filter
      const matchesRole = 
        filterRole === 'all' || 
        profile.role === filterRole;
      
      return matchesSearch && matchesRole;
    });
  }, [allProfiles, searchQuery, filterRole]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
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
    <>
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
          Network Hub
        </motion.h1>

        <motion.p
          className="pageSubtitle"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Discover and connect with VCs, Angel Investors, Accelerators, and Incubators in the SPREZOX ecosystem.
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
              placeholder="Search by name, organization, or focus area..."
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
              className={filterRole === 'all' ? styles.filterActive : styles.filter}
              onClick={() => setFilterRole('all')}
            >
              All ({allProfiles.length})
            </button>
            <button 
              className={filterRole === 'investor' ? styles.filterActive : styles.filter}
              onClick={() => setFilterRole('investor')}
            >
              Investors ({allProfiles.filter(p => p.role === 'investor').length})
            </button>
            <button 
              className={filterRole === 'mentor' ? styles.filterActive : styles.filter}
              onClick={() => setFilterRole('mentor')}
            >
              Mentors ({allProfiles.filter(p => p.role === 'mentor').length})
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
            Showing {filteredProfiles.length} of {allProfiles.length} profiles
          </motion.p>
        )}

        {/* Profile Grid */}
        <motion.div
          className={styles.profileGrid}
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
              <p>Loading network...</p>
            </motion.div>
          )}

          {!loading && filteredProfiles.length > 0 ? (
            filteredProfiles.map((profileProps, index) => (
              <motion.div key={profileProps.id} variants={itemVariants}>
                <ProfileCard
                  {...profileProps}
                  onClick={() => handleCardClick(profileProps)}
                />
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
                {searchQuery || filterRole !== 'all' ? (
                  <>
                    <h3>No profiles found</h3>
                    <p>
                      Try adjusting your search or filters to find what you're looking for.
                    </p>
                    <button 
                      onClick={() => {
                        setSearchQuery('');
                        setFilterRole('all');
                      }}
                      className={styles.resetButton}
                    >
                      Clear all filters
                    </button>
                  </>
                ) : (
                  <p>No mentors or investors have listed their profiles yet.</p>
                )}
              </motion.div>
            )
          )}
        </motion.div>
      </motion.div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Profile Details">
        <InvestorDetailModal profile={selectedProfile} />
      </Modal>
    </>
  );
}