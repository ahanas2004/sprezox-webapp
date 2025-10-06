import React, { useState, useEffect } from 'react';
import ProfileCard from '../features/network/ProfileCard';
import { supabase } from '../lib/supabase';
import styles from './NetworkPage.module.css'; // Corrected import

export default function NetworkPage() {
  const [investors, setInvestors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvestors = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('is_investor_listed', true);

      if (error) console.error('Error fetching investors:', error);
      else setInvestors(data);
      setLoading(false);
    };
    fetchInvestors();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className="pageTitle">Network Hub</h1>
      <p className="pageSubtitle">
        Discover and connect with VCs, Accelerators, and Incubators.
      </p>
      <div className={styles.profileGrid}>
        {loading ? <p>Loading network...</p> :
         investors.length > 0 ? (
            investors.map(profile => <ProfileCard key={profile.id} profile={profile} />)
         ) : (
            <p>No investors have listed their profiles yet.</p>
         )
        }
      </div>
    </div>
  );
}