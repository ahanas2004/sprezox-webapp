import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';
import styles from './EntrepreneurForm.module.css';

export default function EntrepreneurForm({ onClose, onSave }) {
    const { user } = useAuth();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [stage, setStage] = useState('Idea');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !description) {
            alert('Please provide your startup name and a description.');
            return;
        }
        setLoading(true);

        const { error } = await supabase
            .from('submissions')
            .insert({
                user_id: user.id,
                submission_type: 'entrepreneur',
                title,
                description, // You can add more structured data to a JSONB column later
                status: 'approved',
            });
        
        if (error) {
            alert(error.message);
        } else {
            alert('Your startup has been submitted and is now live on the Ideas page!');
            onSave();
            onClose();
        }
        setLoading(false);
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.field}>
                <label className={styles.label}>Startup Name</label>
                <input 
                    className={styles.input} 
                    placeholder="e.g., Sprezox" 
                    value={title} 
                    onChange={e => setTitle(e.target.value)} 
                    required 
                />
            </div>
            <div className={styles.field}>
                <label className={styles.label}>Current Stage</label>
                <select className={styles.input} value={stage} onChange={e => setStage(e.target.value)}>
                    <option>Idea</option>
                    <option>Prototype</option>
                    <option>Pre-seed</option>
                    <option>Seed</option>
                </select>
            </div>
            <div className={styles.field}>
                <label className={styles.label}>Describe Your Startup</label>
                <textarea 
                    className={styles.textarea} 
                    placeholder="What problem does your startup solve? Who is your target customer?" 
                    value={description} 
                    onChange={e => setDescription(e.target.value)} 
                    required 
                />
            </div>
            <button type="submit" className={styles.submitButton} disabled={loading}>
                {loading ? 'Submitting...' : 'Submit Startup'}
            </button>
        </form>
    );
}