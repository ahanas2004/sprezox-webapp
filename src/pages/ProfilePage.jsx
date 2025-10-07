import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import styles from './ProfilePage.module.css';
import { motion } from 'framer-motion';
import { User, Briefcase, Plus, Edit, ArrowLeft } from 'lucide-react';
import Modal from '../components/ui/Modal';
import InvestorSetupForm from '../features/investor/InvestorSetupForm';
import CreatorDashboard from '../features/creator/CreatorDashboard';
import UploadForm from '../features/creator/UploadForm';

// --- Sub-Components Defined within ProfilePage for clarity ---

const RoleSelection = ({ onSelect }) => (
    <motion.div 
        className={styles.roleSelectionContainer}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
    >
        <h2 className={styles.roleTitle}>Choose Your Role</h2>
        <p className={styles.roleSubtitle}>Select how you want to participate in the SPREZOX ecosystem.</p>
        <div className={styles.roleOptions}>
            <motion.button className={styles.roleButton} onClick={() => onSelect('creator')} whileHover={{ y: -5 }}>
                <User size={32} />
                <span>I'm a Creator</span>
            </motion.button>
            <motion.button className={styles.roleButton} onClick={() => onSelect('investor')} whileHover={{ y: -5 }}>
                <Briefcase size={32} />
                <span>I'm an Investor</span>
            </motion.button>
        </div>
    </motion.div>
);

const InvestorDashboard = ({ onEdit, onGoBack }) => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <div className={styles.dashboardHeader}>
             <button onClick={onGoBack} className={styles.backButton}>
                <ArrowLeft size={20} /> Go Back
            </button>
            <h2 className={styles.dashboardTitle}>Investor Profile</h2>
            <button className={styles.editButton} onClick={onEdit}>
                <Edit size={18}/> Edit
            </button>
        </div>
        <p className={styles.emptyState}>Your investor profile is live and discoverable on the Network page.</p>
    </motion.div>
);

// --- Main Profile Page Component ---

export default function ProfilePage() {
    const { user, signOut } = useAuth();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isInvestorModalOpen, setInvestorModalOpen] = useState(false);
    const [isUploadModalOpen, setUploadModalOpen] = useState(false);
    const [currentView, setCurrentView] = useState('loading'); // 'loading', 'select', 'creator', 'investor'

    const fetchProfile = async () => {
        if (!user) return;
        setLoading(true);
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();
        
        if (error && error.code !== 'PGRST116') {
            console.error('Error fetching profile:', error);
        } else if (data) {
            setProfile(data);
            setCurrentView(data.role || 'select');
        } else {
            setProfile({ id: user.id }); 
            setCurrentView('select');
        }
        setLoading(false);
    };

    // THE CRITICAL FIX IS HERE:
    // The dependency array is changed from [user] to [user?.id].
    // This ensures the effect only re-runs when the user's ID changes (i.e., on login/logout),
    // not on every single render, which was causing the infinite loop.
    useEffect(() => {
        if(user?.id) {
            fetchProfile();
        }
    }, [user?.id]);

    const handleRoleSelect = async (role) => {
        setCurrentView(role);
        const { data, error } = await supabase
            .from('profiles')
            .upsert({ id: user.id, role: role, updated_at: new Date() })
            .select()
            .single();

        if (error) {
            alert(error.message);
            setCurrentView('select'); 
        } else {
            setProfile(data); 
        }
    };

    const renderContent = () => {
        if (loading) return <p>Loading profile...</p>;
        
        switch (currentView) {
            case 'select':
                return <RoleSelection onSelect={handleRoleSelect} />;
            case 'creator':
                return <CreatorDashboard onUploadClick={() => setUploadModalOpen(true)} user={user} onGoBack={() => setCurrentView('select')} />;
            case 'investor':
                if (!profile.is_investor_listed) {
                    return <InvestorSetupForm profile={profile} onSave={fetchProfile} onGoBack={() => setCurrentView('select')} />;
                }
                return <InvestorDashboard onEdit={() => setInvestorModalOpen(true)} onGoBack={() => setCurrentView('select')} />;
            default:
                return <RoleSelection onSelect={handleRoleSelect} />;
        }
    };

    return (
        <>
            <div className="container">
                <div className={styles.profileHeader}>
                    <div>
                        <h1 className="pageTitle">My Profile</h1>
                        <p className="pageSubtitle">{user?.email}</p>
                    </div>
                    <button onClick={signOut} className={styles.signOutButton}>Sign Out</button>
                </div>
                
                <div className="card">
                    {renderContent()}
                </div>
            </div>

            <Modal isOpen={isInvestorModalOpen} onClose={() => setInvestorModalOpen(false)} title="Edit Investor Profile">
                <InvestorSetupForm profile={profile} onSave={fetchProfile} onClose={() => setInvestorModalOpen(false)} />
            </Modal>

            <Modal isOpen={isUploadModalOpen} onClose={() => setUploadModalOpen(false)} title="Upload New Content">
                <UploadForm onUpload={fetchProfile} onClose={() => setUploadModalOpen(false)} />
            </Modal>
        </>
    );
}

