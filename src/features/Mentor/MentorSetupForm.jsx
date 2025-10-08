import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';
import styles from './MentorSetupForm.module.css';
import { ArrowLeft } from 'lucide-react'; // Import the icon

export default function MentorSetupForm({ profile, onSave, onClose, onGoBack }) {
    const { user } = useAuth();
    const [mentorType, setMentorType] = useState(profile?.mentor_type || 'accelerator');
    const [formData, setFormData] = useState(profile?.mentor_details || {});
    const [isSaving, setIsSaving] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleSave = async (e) => {
        e.preventDefault();
        if (!formData.org_name || !formData.focus) {
            alert('Organization Name and Focus Areas are required.');
            return;
        }
        setIsSaving(true);
        const { error } = await supabase
            .from('profiles')
            .update({ 
                role: 'mentor', 
                mentor_type: mentorType, 
                mentor_details: formData,
                is_investor_listed: true // Reusing this flag to list them in the Network
            })
            .eq('id', user.id);

        if (error) {
            alert(error.message);
        } else {
            alert('Mentor profile saved and listed!');
            onSave();
            onClose();
        }
        setIsSaving(false);
    };

    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to un-list your mentor profile?')) {
            return;
        }
        setIsDeleting(true);
        const { error } = await supabase
            .from('profiles')
            .update({
                is_investor_listed: false,
                mentor_type: null,
                mentor_details: null
            })
            .eq('id', user.id);

        if (error) {
            alert(error.message);
        } else {
            alert('Mentor profile has been un-listed.');
            onSave();
            onClose();
        }
        setIsDeleting(false);
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
                <label className={styles.label}>You are a...</label>
                <div className={styles.radioGroup}>
                    <button type="button" onClick={() => setMentorType('accelerator')} className={mentorType === 'accelerator' ? styles.active : ''}>Accelerator</button>
                    <button type="button" onClick={() => setMentorType('incubator')} className={mentorType === 'incubator' ? styles.active : ''}>Incubator</button>
                </div>
            </div>
            <div className={styles.field}>
                <label className={styles.label}>Organization Name</label>
                <input required className={styles.input} placeholder="e.g., Y Combinator" value={formData.org_name || ''} onChange={e => setFormData({...formData, org_name: e.target.value})} />
            </div>
            <div className={styles.field}>
                <label className={styles.label}>Location</label>
                <input className={styles.input} placeholder="e.g., Bangalore, India" value={formData.location || ''} onChange={e => setFormData({...formData, location: e.target.value})} />
            </div>
            <div className={styles.field}>
                <label className={styles.label}>Website / LinkedIn</label>
                <input type="url" className={styles.input} placeholder="https://your-website.com" value={formData.website || ''} onChange={e => setFormData({...formData, website: e.target.value})} />
            </div>
            <div className={styles.field}>
                <label className={styles.label}>Focus Areas (comma-separated)</label>
                <input required className={styles.input} placeholder="e.g., SaaS, B2B, AI" value={formData.focus || ''} onChange={e => setFormData({...formData, focus: e.target.value})} />
            </div>
             <div className={styles.field}>
                <label className={styles.label}>About Your Program</label>
                <textarea required className={styles.textarea} placeholder="Describe what your program offers to startups." value={formData.description || ''} onChange={e => setFormData({...formData, description: e.target.value})} />
            </div>
            <div className={styles.buttonContainer}>
                <button type="submit" className={styles.saveButton} disabled={isSaving || isDeleting}>
                    {isSaving ? 'Saving...' : 'Save Mentor Profile'}
                </button>
                {profile?.is_investor_listed && (
                    <button type="button" className={styles.deleteButton} onClick={handleDelete} disabled={isSaving || isDeleting}>
                        {isDeleting ? 'Un-listing...' : 'Un-list Profile'}
                    </button>
                )}
            </div>
        </form>
    );
};