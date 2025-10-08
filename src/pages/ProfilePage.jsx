import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import styles from './ProfilePage.module.css';
import { motion } from 'framer-motion';
import { User, Briefcase, Plus, Edit, ArrowLeft, Heart, Star } from 'lucide-react';
import Modal from '../components/ui/Modal';
import InvestorSetupForm from '../features/investor/InvestorSetupForm';
import CreatorDashboard from '../features/creator/CreatorDashboard';
import UploadForm from '../features/creator/UploadForm';
import MentorSetupForm from '../features/Mentor/MentorSetupForm';
import StudentForm from '../features/startup/StudentForm';
import EntrepreneurForm from '../features/startup/EntrepreneurForm';
import SubmissionCard from '../features/startup/SubmissionCard'; // <-- NEW IMPORT

// --- Sub-Components ---
const RoleSelection = ({ onSelect }) => (
    <motion.div className={styles.roleSelectionContainer} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h2 className={styles.roleTitle}>Choose Your Primary Role</h2>
        <p className={styles.roleSubtitle}>Select how you want to participate in the SPREZOX ecosystem.</p>
        <div className={styles.roleOptions}>
            <motion.button className={styles.roleButton} onClick={() => onSelect('creator')} whileHover={{ y: -5 }}><User size={32} /><span>I'm a Creator</span></motion.button>
            <motion.button className={styles.roleButton} onClick={() => onSelect('investor')} whileHover={{ y: -5 }}><Briefcase size={32} /><span>I'm an Investor</span></motion.button>
            <motion.button className={styles.roleButton} onClick={() => onSelect('mentor')} whileHover={{ y: -5 }}><Heart size={32} /><span>I'm a Mentor</span></motion.button>
            <motion.button className={styles.roleButton} onClick={() => onSelect('startup')} whileHover={{ y: -5 }}><Star size={32} /><span>I have a Startup/Idea</span></motion.button>
        </div>
    </motion.div>
);

const InvestorDashboard = ({ onEdit, onGoBack }) => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className={styles.dashboardHeader}>
             <button onClick={onGoBack} className={styles.backButton}><ArrowLeft size={20} /> Go Back</button>
            <h2 className={styles.dashboardTitle}>Investor Profile</h2>
            <button className={styles.editButton} onClick={onEdit}><Edit size={18}/> Edit</button>
        </div>
        <p className={styles.emptyState}>Your investor profile is live and discoverable on the Network page.</p>
    </motion.div>
);

const MentorDashboard = ({ onEdit, onGoBack }) => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className={styles.dashboardHeader}>
             <button onClick={onGoBack} className={styles.backButton}><ArrowLeft size={20} /> Go Back</button>
            <h2 className={styles.dashboardTitle}>Mentor Profile</h2>
            <button className={styles.editButton} onClick={onEdit}><Edit size={18}/> Edit</button>
        </div>
        <p className={styles.emptyState}>Your mentor profile is live and discoverable on the Network page.</p>
    </motion.div>
);

const StartupDashboard = ({ user, onStudentClick, onEntrepreneurClick, onGoBack }) => {
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchSubmissions = async () => {
        if (!user) return;
        setLoading(true);
        const { data, error } = await supabase.from('submissions').select('*').eq('user_id', user.id).order('created_at', { ascending: false });
        if (error) console.error("Error fetching submissions:", error);
        else setSubmissions(data || []);
        setLoading(false);
    };

    useEffect(() => { fetchSubmissions(); }, [user]);

    const handleDelete = async (submissionId) => {
        if (!window.confirm("Are you sure you want to permanently delete this submission?")) return;
        
        const { error } = await supabase.from('submissions').delete().eq('id', submissionId);
        if (error) {
            alert(error.message);
        } else {
            setSubmissions(current => current.filter(sub => sub.id !== submissionId));
            alert("Submission deleted successfully.");
        }
    };

    return (
         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className={styles.dashboardHeader}>
                <button onClick={onGoBack} className={styles.backButton}><ArrowLeft size={20} /> Go Back</button>
                <h2 className={styles.dashboardTitle}>Your Submissions</h2>
            </div>
            <div className={styles.startupOptions}>
                <button className={styles.submissionButton} onClick={onStudentClick}>+ Submit New Idea</button>
                <button className={styles.submissionButton} onClick={onEntrepreneurClick}>+ Submit New Startup</button>
            </div>
            <div className={styles.submissionList}>
                {loading ? <p>Loading submissions...</p> : 
                 submissions.length > 0 ? (
                    submissions.map(sub => <SubmissionCard key={sub.id} submission={sub} onDelete={() => handleDelete(sub.id)} />)
                 ) : (
                    <p className={styles.emptyState}>You haven't made any submissions yet.</p>
                 )
                }
            </div>
        </motion.div>
    );
};

// --- Main Profile Page Component ---
export default function ProfilePage() {
    const { user, signOut } = useAuth();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isInvestorModalOpen, setInvestorModalOpen] = useState(false);
    const [isMentorModalOpen, setMentorModalOpen] = useState(false);
    const [isUploadModalOpen, setUploadModalOpen] = useState(false);
    const [isStudentModalOpen, setStudentModalOpen] = useState(false);
    const [isEntrepreneurModalOpen, setEntrepreneurModalOpen] = useState(false);
    
    const [currentView, setCurrentView] = useState('loading');

    const fetchProfile = async () => {
        if (!user) return;
        setLoading(true);
        const { data, error } = await supabase.from('profiles').select('*').eq('id', user.id).single();
        
        if (error && error.code !== 'PGRST116') {
            console.error('Error fetching profile:', error);
        } else if (data) {
            setProfile(data);
            setCurrentView(data.role || 'select_role');
        } else {
            setProfile({ id: user.id }); 
            setCurrentView('select_role');
        }
        setLoading(false);
    };

    useEffect(() => { if(user) fetchProfile(); }, [user]);

    const handleRoleSelect = async (role) => {
        const { data, error } = await supabase.from('profiles').upsert({ id: user.id, role }).select().single();
        if (error) {
            alert(error.message);
        } else {
            setProfile(data);
            setCurrentView(role);
        }
    };

    const renderContent = () => {
        if (loading) return <p>Loading profile...</p>;
        
        switch (currentView) {
            case 'select_role':
                return <RoleSelection onSelect={handleRoleSelect} />;
            case 'creator':
                return <CreatorDashboard onUploadClick={() => setUploadModalOpen(true)} user={user} onGoBack={() => setCurrentView('select_role')} />;
            case 'investor':
                if (!profile.is_investor_listed) {
                    return <InvestorSetupForm profile={profile} onSave={fetchProfile} onGoBack={() => setCurrentView('select_role')} />;
                }
                return <InvestorDashboard onEdit={() => setInvestorModalOpen(true)} onGoBack={() => setCurrentView('select_role')} />;
            case 'mentor':
                 if (!profile.is_investor_listed) {
                    return <MentorSetupForm profile={profile} onSave={fetchProfile} onGoBack={() => setCurrentView('select_role')} />;
                }
                return <MentorDashboard onEdit={() => setMentorModalOpen(true)} onGoBack={() => setCurrentView('select_role')} />;
            case 'startup':
                return <StartupDashboard 
                            user={user}
                            onGoBack={() => setCurrentView('select_role')}
                            onStudentClick={() => setStudentModalOpen(true)}
                            onEntrepreneurClick={() => setEntrepreneurModalOpen(true)}
                        />;
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
            <Modal isOpen={isInvestorModalOpen} onClose={() => setInvestorModalOpen(false)} title="Investor Profile">
                <InvestorSetupForm profile={profile} onSave={fetchProfile} onClose={() => setInvestorModalOpen(false)} />
            </Modal>
            <Modal isOpen={isMentorModalOpen} onClose={() => setMentorModalOpen(false)} title="Mentor Profile">
                <MentorSetupForm profile={profile} onSave={fetchProfile} onClose={() => setMentorModalOpen(false)} />
            </Modal>
            <Modal isOpen={isUploadModalOpen} onClose={() => setUploadModalOpen(false)} title="Upload Content">
                <UploadForm onUpload={fetchProfile} onClose={() => setUploadModalOpen(false)} />
            </Modal>
            <Modal isOpen={isStudentModalOpen} onClose={() => setStudentModalOpen(false)} title="Submit Student Idea">
                <StudentForm onSave={fetchProfile} onClose={() => setStudentModalOpen(false)} />
            </Modal>
            <Modal isOpen={isEntrepreneurModalOpen} onClose={() => setEntrepreneurModalOpen(false)} title="Submit Your Startup">
                <EntrepreneurForm onSave={fetchProfile} onClose={() => setEntrepreneurModalOpen(false)} />
            </Modal>
        </>
    );
}