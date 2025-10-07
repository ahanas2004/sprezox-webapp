import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';
import styles from './InvestorSetupForm.module.css';
import { ArrowLeft } from 'lucide-react';

export default function InvestorSetupForm({ profile, onSave, onClose, onGoBack }) {
    const { user } = useAuth();
    const [investorType, setInvestorType] = useState(profile?.investor_type || 'vc');
    const [formData, setFormData] = useState(profile?.investor_details || {});
    const [isSaving, setIsSaving] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleSave = async (e) => {
        e.preventDefault();
        if (!formData.org_name || !formData.focus || !formData.description) {
            alert('Organization Name, Investment Focus, and Description are required.');
            return;
        }
        setIsSaving(true);
        const { error } = await supabase
            .from('profiles')
            .update({ 
                role: 'investor', 
                investor_type: investorType, 
                investor_details: formData,
                is_investor_listed: true 
            })
            .eq('id', user.id);

        if (error) {
            alert(error.message);
        } else {
            alert('Investor profile saved and listed!');
            onSave();
            onClose(); // This is for closing the modal, which is now handled by ProfilePage
        }
        setIsSaving(false);
    };

    const handleDelete = async () => {
        // ... (handleDelete logic remains the same)
    };

    return (
        <form className={styles.form} onSubmit={handleSave}>
            {/* THE FIX: Back button added to the top of the form */}
            <div className={styles.formHeader}>
                 <button type="button" onClick={onGoBack} className={styles.backButton}>
                    <ArrowLeft size={20} /> Go Back
                </button>
            </div>
            
            <div className={styles.field}>
                <label className={styles.label}>Type of Investor</label>
                <div className={styles.radioGroup}>
                    <button type="button" onClick={() => setInvestorType('vc')} className={investorType === 'vc' ? styles.active : ''}>Venture Capital</button>
                    <button type="button" onClick={() => setInvestorType('angel')} className={investorType === 'angel' ? styles.active : ''}>Angel Investor</button>
                </div>
            </div>
            {/* ... All other form fields remain the same ... */}
            <div className={styles.field}>
                <label className={styles.label}>Organization / Investor Name</label>
                <input required className={styles.input} value={formData.org_name || ''} onChange={e => setFormData({...formData, org_name: e.target.value})} />
            </div>
            <div className={styles.field}>
                <label className={styles.label}>Location (e.g., Chennai, India)</label>
                <input className={styles.input} value={formData.location || ''} onChange={e => setFormData({...formData, location: e.target.value})} />
            </div>
            <div className={styles.field}>
                <label className={styles.label}>Website / LinkedIn</label>
                <input type="url" className={styles.input} value={formData.website || ''} onChange={e => setFormData({...formData, website: e.target.value})} />
            </div>
            <div className={styles.field}>
                <label className={styles.label}>Investment Focus (e.g., SaaS, FinTech)</label>
                <input required className={styles.input} value={formData.focus || ''} onChange={e => setFormData({...formData, focus: e.target.value})} />
            </div>
             <div className={styles.field}>
                <label className={styles.label}>About / Description</label>
                <textarea required className={styles.textarea} value={formData.description || ''} onChange={e => setFormData({...formData, description: e.target.value})} />
            </div>

            <div className={styles.buttonContainer}>
                <button type="submit" className={styles.saveButton} disabled={isSaving || isDeleting}>
                    {isSaving ? 'Saving...' : 'Save Investor Profile'}
                </button>
                <button type="button" className={styles.deleteButton} onClick={handleDelete} disabled={isSaving || isDeleting}>
                    {isDeleting ? 'Deleting...' : 'Delete Profile'}
                </button>
            </div>
        </form>
    );
};