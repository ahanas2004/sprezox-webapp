import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus } from 'lucide-react';
import styles from './ProfileCard.module.css';

export default function ProfileCard({ profile }) {
  const getInvestorTypeDisplay = (type) => {
    if (type === 'vc') return 'Venture Capital';
    if (type === 'accelerator') return 'Accelerator';
    if (type === 'incubator') return 'Incubator';
    return 'Investor';
  };
  
  return (
    <motion.div className={styles.card} whileHover={{ y: -5, boxShadow: '0 0 30px rgba(79, 70, 229, 0.2)' }}>
      <div className={styles.header}>
        <img src={profile.avatar_url || `https://placehold.co/100x100/2a2a2a/E5E7EB?text=${profile.full_name?.charAt(0)}`} alt={profile.full_name} className={styles.avatar} />
        <div className={styles.nameContainer}>
          <h3 className={styles.name}>{profile.investor_details?.org_name || profile.full_name}</h3>
          <p className={styles.role}>{getInvestorTypeDisplay(profile.investor_type)}</p>
        </div>
      </div>
      <p className={styles.bio}>{profile.investor_details?.description || "No description provided."}</p>
      
      <div className={styles.interests}>
        <span className={styles.interestLabel}>Focus:</span>
        <div className={styles.tagContainer}>
          <span className={styles.tag}>{profile.investor_details?.focus || 'N/A'}</span>
        </div>
      </div>

      <button className={styles.connectButton}>
        <UserPlus size={18} /> View Profile
      </button>
    </motion.div>
  );
}