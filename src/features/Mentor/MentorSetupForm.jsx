import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';
import styles from './MentorSetupForm.module.css';
import { ArrowLeft } from 'lucide-react';

export default function MentorSetupForm({ profile, onSave, onClose, onGoBack }) {
    const { user } = useAuth();
    const [mentorType, setMentorType] = useState(profile?.mentor_type || 'accelerator');
    const [formData, setFormData] = useState(profile?.mentor_details || {});
    const [isSaving, setIsSaving] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleSave = async (e) => {
        e.preventDefault();
        
        // Validation
        if (!formData.org_name || !formData.focus || !formData.email || !formData.phone) {
            alert('Organization Name, Focus Areas, Email, and Phone Number are required.');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            alert('Please enter a valid email address.');
            return;
        }

        // Phone validation (basic)
        const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
        if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
            alert('Please enter a valid phone number.');
            return;
        }

        setIsSaving(true);
        const { error } = await supabase
            .from('profiles')
            .update({ 
                role: 'mentor', 
                mentor_type: mentorType, 
                mentor_details: formData,
                is_investor_listed: true
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
            {/* Form Header */}
            <div className={styles.formHeader}>
                <button type="button" onClick={onGoBack} className={styles.backButton}>
                    <ArrowLeft size={20} /> Go Back
                </button>
            </div>
            
            {/* Mentor Type Selection */}
            <div className={styles.field}>
                <label className={styles.label}>You are a...</label>
                <div className={styles.radioGroup}>
                    <button 
                        type="button" 
                        onClick={() => setMentorType('accelerator')} 
                        className={mentorType === 'accelerator' ? styles.active : ''}
                    >
                        Accelerator
                    </button>
                    <button 
                        type="button" 
                        onClick={() => setMentorType('incubator')} 
                        className={mentorType === 'incubator' ? styles.active : ''}
                    >
                        Incubator
                    </button>
                </div>
            </div>

            {/* Organization Name */}
            <div className={styles.field}>
                <label className={styles.label}>Organization Name *</label>
                <input 
                    required 
                    className={styles.input} 
                    placeholder="e.g., Y Combinator" 
                    value={formData.org_name || ''} 
                    onChange={e => setFormData({...formData, org_name: e.target.value})} 
                />
            </div>

            {/* Email - NEW */}
            <div className={styles.field}>
                <label className={styles.label}>Email Address *</label>
                <input 
                    required 
                    type="email"
                    className={styles.input} 
                    placeholder="contact@yourorganization.com" 
                    value={formData.email || ''} 
                    onChange={e => setFormData({...formData, email: e.target.value})} 
                />
            </div>

            {/* Phone Number - NEW */}
            <div className={styles.field}>
                <label className={styles.label}>Phone Number *</label>
                <input 
                    required 
                    type="tel"
                    className={styles.input} 
                    placeholder="+1 (555) 123-4567 or +91 98765 43210" 
                    value={formData.phone || ''} 
                    onChange={e => setFormData({...formData, phone: e.target.value})} 
                />
            </div>

            {/* Location */}
            <div className={styles.field}>
                <label className={styles.label}>Location</label>
                <input 
                    className={styles.input} 
                    placeholder="e.g., Bangalore, India" 
                    value={formData.location || ''} 
                    onChange={e => setFormData({...formData, location: e.target.value})} 
                />
            </div>

            {/* Website / LinkedIn */}
            <div className={styles.field}>
                <label className={styles.label}>Website / LinkedIn</label>
                <input 
                    type="url" 
                    className={styles.input} 
                    placeholder="https://your-website.com" 
                    value={formData.website || ''} 
                    onChange={e => setFormData({...formData, website: e.target.value})} 
                />
            </div>

            {/* Focus Areas */}
            <div className={styles.field}>
                <label className={styles.label}>Focus Areas (comma-separated) *</label>
                <input 
                    required 
                    className={styles.input} 
                    placeholder="e.g., SaaS, B2B, AI" 
                    value={formData.focus || ''} 
                    onChange={e => setFormData({...formData, focus: e.target.value})} 
                />
            </div>

            {/* About Your Program */}
            <div className={styles.field}>
                <label className={styles.label}>About Your Program *</label>
                <textarea 
                    required 
                    className={styles.textarea} 
                    placeholder="Describe what your program offers to startups." 
                    value={formData.description || ''} 
                    onChange={e => setFormData({...formData, description: e.target.value})} 
                />
            </div>

            {/* Button Container */}
            <div className={styles.buttonContainer}>
                <button 
                    type="submit" 
                    className={styles.saveButton} 
                    disabled={isSaving || isDeleting}
                >
                    {isSaving ? 'Saving...' : 'Save Mentor Profile'}
                </button>
                {profile?.is_investor_listed && (
                    <button 
                        type="button" 
                        className={styles.deleteButton} 
                        onClick={handleDelete} 
                        disabled={isSaving || isDeleting}
                    >
                        {isDeleting ? 'Un-listing...' : 'Un-list Profile'}
                    </button>
                )}
            </div>
        </form>
    );
}