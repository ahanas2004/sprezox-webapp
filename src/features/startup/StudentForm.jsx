import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';
import styles from './StudentForm.module.css';

export default function StudentForm({ onClose, onSave }) {
    const { user } = useAuth();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !description) {
            alert('Please provide a title and description for your idea.');
            return;
        }
        setLoading(true);

        const { error } = await supabase
            .from('submissions')
            .insert({
                user_id: user.id,
                submission_type: 'student',
                title,
                description,
                status: 'approved', // Auto-approve for MVP
            });
        
        if (error) {
            alert(error.message);
        } else {
            alert('Your idea has been submitted and is now live on the Ideas page!');
            onSave(); // Refreshes profile data if needed
            onClose(); // Closes the modal
        }
        setLoading(false);
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.field}>
                <label className={styles.label}>Project Title</label>
                <input 
                    className={styles.input} 
                    placeholder="e.g., AI-Powered Note Taker for Students" 
                    value={title} 
                    onChange={e => setTitle(e.target.value)} 
                    required 
                />
            </div>
            <div className={styles.field}>
                <label className={styles.label}>Describe Your Idea</label>
                <textarea 
                    className={styles.textarea} 
                    placeholder="Explain your project, the problem it solves, and its potential impact." 
                    value={description} 
                    onChange={e => setDescription(e.target.value)} 
                    required 
                />
            </div>
            <button type="submit" className={styles.submitButton} disabled={loading}>
                {loading ? 'Submitting...' : 'Submit Idea'}
            </button>
        </form>
    );
}