import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import styles from './ProfilePage.module.css';
import { motion } from 'framer-motion';
import { User, Briefcase, Edit, ArrowLeft, Heart, Star } from 'lucide-react';
import Modal from '../components/ui/Modal';
import InvestorSetupForm from '../features/investor/InvestorSetupForm';
import CreatorDashboard from '../features/creator/CreatorDashboard';
import UploadForm from '../features/creator/UploadForm';
import MentorSetupForm from '../features/Mentor/MentorSetupForm';
import StudentForm from '../features/startup/StudentForm';
import EntrepreneurForm from '../features/startup/EntrepreneurForm';
import SubmissionCard from '../features/startup/SubmissionCard';

const RoleSelection = ({ onSelect }) => (
  <motion.div
    className={styles.roleSelectionContainer}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, ease: 'easeOut' }}
  >
    <motion.h2
      className={styles.roleTitle}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.5 }}
    >
      Choose Your Primary Role
    </motion.h2>
    <motion.p
      className={styles.roleSubtitle}
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
    >
      Select how you want to participate in the SPREZOX ecosystem.
    </motion.p>
    
    <div className={styles.roleOptions}>
      {[
        { icon: <User size={32} />, label: 'I\'m a Creator', value: 'creator' },
        { icon: <Briefcase size={32} />, label: 'I\'m an Investor', value: 'investor' },
        { icon: <Heart size={32} />, label: 'I\'m a Mentor', value: 'mentor' },
        { icon: <Star size={32} />, label: 'I have a Startup/Idea', value: 'startup' },
      ].map((role, i) => (
        <motion.button
          key={role.value}
          className={styles.roleButton}
          onClick={() => onSelect(role.value)}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.3 + i * 0.08, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
          whileHover={{ y: -8, scale: 1.02, boxShadow: '0 0 30px rgba(0, 217, 255, 0.3)' }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div 
            className={styles.roleIcon}
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            {role.icon}
          </motion.div>
          <span>{role.label}</span>
        </motion.button>
      ))}
    </div>
  </motion.div>
);

const StartupDashboard = ({ user, onStudentClick, onEntrepreneurClick, onGoBack }) => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSubmissions = async () => {
    if (!user) return;
    setLoading(true);
    const { data, error } = await supabase
      .from('submissions')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) console.error('Error fetching submissions:', error);
    else setSubmissions(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchSubmissions();
  }, [user]);

  const handleDelete = async (submissionId) => {
    if (!window.confirm('Are you sure you want to permanently delete this submission?')) return;

    const { error } = await supabase.from('submissions').delete().eq('id', submissionId);
    if (error) {
      alert(error.message);
    } else {
      setSubmissions((current) => current.filter((sub) => sub.id !== submissionId));
      alert('Submission deleted successfully.');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className={styles.dashboardHeader}>
        <motion.button
          onClick={onGoBack}
          className={styles.backButton}
          whileHover={{ x: -4 }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowLeft size={20} /> Go Back
        </motion.button>
        <h2 className={styles.dashboardTitle}>Your Submissions</h2>
      </div>

      <motion.div
        className={styles.startupOptions}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        {[
          { label: '+ Submit New Idea', onClick: onStudentClick },
          { label: '+ Submit New Startup', onClick: onEntrepreneurClick },
        ].map((btn, i) => (
          <motion.button
            key={i}
            className={styles.submissionButton}
            onClick={btn.onClick}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.1, duration: 0.4 }}
            whileHover={{ scale: 1.02, y: -4, boxShadow: '0 0 25px rgba(0, 217, 255, 0.3)' }}
            whileTap={{ scale: 0.98 }}
          >
            {btn.label}
          </motion.button>
        ))}
      </motion.div>

      <motion.div
        className={styles.submissionList}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        {loading ? (
          <motion.div className={styles.loadingContainer}>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className={styles.spinner}
            />
            <p>Loading your submissions...</p>
          </motion.div>
        ) : submissions.length > 0 ? (
          submissions.map((sub, i) => (
            <motion.div
              key={sub.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
            >
              <SubmissionCard submission={sub} onDelete={() => handleDelete(sub.id)} />
            </motion.div>
          ))
        ) : (
          <motion.p
            className={styles.emptyState}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            You haven't made any submissions yet. Start by clicking one of the buttons above!
          </motion.p>
        )}
      </motion.div>
    </motion.div>
  );
};

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
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

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

  useEffect(() => {
    if (user) fetchProfile();
  }, [user]);

  const handleRoleSelect = async (role) => {
    const { data, error } = await supabase
      .from('profiles')
      .upsert({ id: user.id, role })
      .select()
      .single();

    if (error) {
      alert(error.message);
    } else {
      setProfile(data);
      setCurrentView(role);
    }
  };

  const renderContent = () => {
    if (loading) {
      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={styles.loadingContainer}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className={styles.spinner}
          />
          <p>Loading your profile...</p>
        </motion.div>
      );
    }

    switch (currentView) {
      case 'select_role':
        return <RoleSelection onSelect={handleRoleSelect} />;

      case 'creator':
        return (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 0.4 }}
          >
            <CreatorDashboard
              onUploadClick={() => setUploadModalOpen(true)}
              user={user}
              onGoBack={() => setCurrentView('select_role')}
            />
          </motion.div>
        );

      case 'investor':
        return !profile?.is_investor_listed ? (
          <InvestorSetupForm
            profile={profile}
            onSave={fetchProfile}
            onClose={() => {}}
            onGoBack={() => setCurrentView('select_role')}
          />
        ) : (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 0.4 }}
          >
            <div className={styles.dashboardHeader}>
              <motion.button
                onClick={() => setCurrentView('select_role')}
                className={styles.backButton}
                whileHover={{ x: -4 }}
                whileTap={{ scale: 0.9 }}
              >
                <ArrowLeft size={20} /> Go Back
              </motion.button>
              <h2 className={styles.dashboardTitle}>Investor Profile</h2>
              <motion.button
                className={styles.editButton}
                onClick={() => setInvestorModalOpen(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Edit size={18} /> Edit
              </motion.button>
            </div>
            <motion.p
              className={styles.emptyState}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              ✨ Your investor profile is live and discoverable on the Network page!
            </motion.p>
          </motion.div>
        );

      case 'mentor':
        return !profile?.is_investor_listed ? (
          <MentorSetupForm
            profile={profile}
            onSave={fetchProfile}
            onClose={() => {}}
            onGoBack={() => setCurrentView('select_role')}
          />
        ) : (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 0.4 }}
          >
            <div className={styles.dashboardHeader}>
              <motion.button
                onClick={() => setCurrentView('select_role')}
                className={styles.backButton}
                whileHover={{ x: -4 }}
                whileTap={{ scale: 0.9 }}
              >
                <ArrowLeft size={20} /> Go Back
              </motion.button>
              <h2 className={styles.dashboardTitle}>Mentor Profile</h2>
              <motion.button
                className={styles.editButton}
                onClick={() => setMentorModalOpen(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Edit size={18} /> Edit
              </motion.button>
            </div>
            <motion.p
              className={styles.emptyState}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              ✨ Your mentor profile is live and discoverable on the Network page!
            </motion.p>
          </motion.div>
        );

      case 'startup':
        return (
          <StartupDashboard
            user={user}
            onGoBack={() => setCurrentView('select_role')}
            onStudentClick={() => setStudentModalOpen(true)}
            onEntrepreneurClick={() => setEntrepreneurModalOpen(true)}
          />
        );

      default:
        return <RoleSelection onSelect={handleRoleSelect} />;
    }
  };

  return (
    <>
      <motion.div
        className="container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className={styles.profileHeader}>
          <motion.div
            className={styles.profileInfo}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <h1 className="pageTitle">My Profile</h1>
            <p className="pageSubtitle">{user?.email}</p>
          </motion.div>

          <motion.button
            onClick={signOut}
            className={styles.signOutButton}
            whileHover={{ scale: 1.05, y: -2, boxShadow: '0 0 25px rgba(185, 28, 28, 0.4)' }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            Sign Out
          </motion.button>
        </div>

        <motion.div
          className="card"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
        >
          {renderContent()}
        </motion.div>
      </motion.div>

      <Modal isOpen={isInvestorModalOpen} onClose={() => setInvestorModalOpen(false)} title="Edit Investor Profile">
        <InvestorSetupForm 
          profile={profile} 
          onSave={fetchProfile} 
          onClose={() => setInvestorModalOpen(false)}
          onGoBack={() => setInvestorModalOpen(false)}
        />
      </Modal>

      <Modal isOpen={isMentorModalOpen} onClose={() => setMentorModalOpen(false)} title="Edit Mentor Profile">
        <MentorSetupForm 
          profile={profile} 
          onSave={fetchProfile} 
          onClose={() => setMentorModalOpen(false)}
          onGoBack={() => setMentorModalOpen(false)}
        />
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