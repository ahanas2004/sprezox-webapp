import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';
import styles from './InvestorSetupForm.module.css';

export default function InvestorSetupForm({ profile, onSave, onClose }) {
    const { user } = useAuth();
    const [investorType, setInvestorType] = useState(profile?.investor_type || 'vc');
    const [formData, setFormData] = useState(profile?.investor_details || {});
    const [loading, setLoading] = useState(false);

    const handleSave = async (e) => {
        e.preventDefault();
        if (!formData.org_name || !formData.focus || !formData.description) {
            alert('Organization Name, Investment Focus, and Description are required.');
            return;
        }
        setLoading(true);
        const { error } = await supabase
            .from('profiles')
            .update({ 
                role: 'investor', 
                investor_type: investorType, 
                investor_details: formData,
                is_investor_listed: true // CRITICAL: This makes the profile public
            })
            .eq('id', user.id);

        if (error) {
            alert(error.message);
        } else {
            alert('Investor profile saved and listed!');
            onSave();
            onClose();
        }
        setLoading(false);
    };

    return (
        <form className={styles.form} onSubmit={handleSave}>
            <div className={styles.field}>
                <label className={styles.label}>Type of Investor</label>
                <div className={styles.radioGroup}>
                    <button type="button" onClick={() => setInvestorType('vc')} className={investorType === 'vc' ? styles.active : ''}>Venture Capital</button>
                    <button type="button" onClick={() => setInvestorType('accelerator')} className={investorType === 'accelerator' ? styles.active : ''}>Accelerator</button>
                    <button type="button" onClick={() => setInvestorType('incubator')} className={investorType === 'incubator' ? styles.active : ''}>Incubator</button>
                </div>
            </div>
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
            <button type="submit" className={styles.saveButton} disabled={loading}>
                {loading ? 'Saving...' : 'Save Investor Profile'}
            </button>
        </form>
    );
};