import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import IdeaCard from '../features/ideas/IdeaCard';
import styles from './IdeasPage.module.css';

export default function IdeasPage() {
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSubmissions = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from('submissions')
                .select('*, profiles(full_name, avatar_url)')
                .eq('status', 'approved')
                .order('created_at', { ascending: false });
            
            if (error) console.error("Error fetching submissions:", error);
            else setSubmissions(data);
            setLoading(false);
        };
        fetchSubmissions();
    }, []);

    return (
        <div className="container">
            <h1 className="pageTitle">Startup & Student Ideas</h1>
            <p className="pageSubtitle">Browse innovative projects and startups emerging from the SPREZOX community.</p>
            <div className={styles.grid}>
                {loading ? <p>Loading ideas...</p> : 
                 submissions.map(item => <IdeaCard key={item.id} submission={item} />)
                }
            </div>
        </div>
    );
}