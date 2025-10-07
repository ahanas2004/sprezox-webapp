import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import ProfileCard from '../features/network/ProfileCard';
import styles from './NetworkPage.module.css';
import { motion } from 'framer-motion';

export default function NetworkPage() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListedProfiles = async () => {
      setLoading(true);
      
      // THE DEFINITIVE FIX: This query is now explicit and correct.
      // It fetches profiles that are both listed AND have the correct role.
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('is_investor_listed', true)
        .or('role.eq.investor,role.eq.mentor'); // This ensures we only get investors or mentors.

      if (error) {
        console.error('Error fetching listed profiles:', error);
      } else {
        setProfiles(data);
      }
      setLoading(false);
    };
    fetchListedProfiles();
  }, []);

  // The "smart" mapping logic from before is still correct and will handle the filtered data.
  const getCardProps = (profile) => {
    if (profile.role === 'investor') {
      return {
        name: profile.investor_details?.org_name || profile.full_name || 'Unnamed Investor',
        type: profile.investor_type === 'vc' ? 'Venture Capital' : 'Angel Investor',
        description: profile.investor_details?.description,
        focus: profile.investor_details?.focus,
        avatar: profile.avatar_url,
      };
    }
    if (profile.role === 'mentor') {
      return {
        name: profile.mentor_details?.org_name || profile.full_name || 'Unnamed Mentor',
        type: profile.mentor_type === 'accelerator' ? 'Accelerator' : 'Incubator',
        description: profile.mentor_details?.description,
        focus: profile.mentor_details?.focus,
        avatar: profile.avatar_url,
      };
    }
    return null; // Return null for any other role type just in case
  };

  const filteredProfiles = profiles.map(getCardProps).filter(Boolean);

  return (
    <div className="container">
      <h1 className="pageTitle">Network Hub</h1>
      <p className="pageSubtitle">
        Discover and connect with VCs, Angel Investors, Accelerators, and Incubators in the SPREZOX ecosystem.
      </p>
      <div className={styles.profileGrid}>
        {loading ? <p>Loading network...</p> :
         filteredProfiles.length > 0 ? (
            filteredProfiles.map((props, index) => <ProfileCard key={profiles[index].id} {...props} />)
         ) : (
            <p className={styles.emptyState}>No mentors or investors have listed their profiles yet.</p>
         )
        }
      </div>
    </div>
  );
}