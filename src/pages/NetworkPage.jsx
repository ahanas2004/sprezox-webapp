import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import ProfileCard from '../features/network/ProfileCard';
import InvestorDetailModal from '../features/network/InvestorDetailModal';
import Modal from '../components/ui/Modal';
import styles from './NetworkPage.module.css';

export default function NetworkPage() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // THE FIX: State to manage the modal and the selected profile
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchListedProfiles = async () => {
      setLoading(true);
      
      // The query correctly fetches all profiles that are listed AND are either an investor or a mentor.
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

  // This "smart" mapping function translates different profile structures into a single, consistent format.
  const getCardProps = (profile) => {
    if (profile.role === 'investor') {
      return {
        // We pass the full profile object for the modal, plus specific props for the card
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

  // THE FIX: Function to open the modal with the correct profile data
  const handleCardClick = (profileData) => {
    setSelectedProfile(profileData);
    setIsModalOpen(true);
  };

  const allProfiles = profiles.map(getCardProps).filter(Boolean);

  return (
    <>
      <div className="container">
        <h1 className="pageTitle">Network Hub</h1>
        <p className="pageSubtitle">
          Discover and connect with VCs, Angel Investors, Accelerators, and Incubators in the SPREZOX ecosystem.
        </p>
        <div className={styles.profileGrid}>
          {loading ? <p>Loading network...</p> :
           allProfiles.length > 0 ? (
              // THE FIX: Pass the click handler and the full profile data to each card
              allProfiles.map((profileProps) => (
                <ProfileCard 
                    key={profileProps.id} 
                    {...profileProps} 
                    onClick={() => handleCardClick(profileProps)} 
                />
              ))
           ) : (
              <p className={styles.emptyState}>No mentors or investors have listed their profiles yet.</p>
           )
          }
        </div>
      </div>

      {/* THE FIX: Render the Modal component, which will show the details when a profile is selected */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Profile Details">
        <InvestorDetailModal profile={selectedProfile} />
      </Modal>
    </>
  );
}