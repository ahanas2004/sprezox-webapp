import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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

  const allProfiles = profiles.map(getCardProps).filter(Boolean);

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

          {!loading && allProfiles.length > 0 ? (
            allProfiles.map((profileProps, index) => (
              <motion.div key={profileProps.id} variants={itemVariants}>
                <ProfileCard
                  {...profileProps}
                  onClick={() => handleCardClick(profileProps)}
                />
              </motion.div>
            ))
          ) : (
            !loading && (
              <motion.p
                className={styles.emptyState}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                No mentors or investors have listed their profiles yet.
              </motion.p>
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