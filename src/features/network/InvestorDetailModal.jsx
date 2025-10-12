import React from 'react';
import { Mail, Phone, Link as LinkIcon } from 'lucide-react';
import styles from './InvestorDetailModal.module.css';

export default function InvestorDetailModal({ profile }) {
    if (!profile) return null;

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <img 
                    src={profile.avatar || `https://placehold.co/100x100/2a2a2a/E5E7EB?text=${profile.name?.charAt(0)}`} 
                    alt={profile.name} 
                    className={styles.avatar} 
                />
                <div className={styles.headerText}>
                    <h2 className={styles.name}>{profile.name}</h2>
                    <p className={styles.type}>{profile.type}</p>
                </div>
            </div>

            <div className={styles.section}>
                <h3 className={styles.sectionTitle}>About</h3>
                <p className={styles.description}>{profile.description || "No details provided."}</p>
            </div>

            <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Focus Areas</h3>
                <div className={styles.tagContainer}>
                    {profile.focus?.split(',').map(tag => (
                        <span key={tag.trim()} className={styles.tag}>{tag.trim()}</span>
                    ))}
                </div>
            </div>

            <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Contact & Links</h3>
                <div className={styles.contactGrid}>
                    {/* In a real app, these would come from the database */}
                    <div className={styles.contactItem}>
                        <Mail size={20} className={styles.contactIcon} />
                        <span>ahanas2004@gmail.com</span>
                    </div>
                    <div className={styles.contactItem}>
                        <Phone size={20} className={styles.contactIcon} />
                        <span>+91 12345 67890</span>
                    </div>
                    <div className={styles.contactItem}>
                        <LinkIcon size={20} className={styles.contactIcon} />
                        <a href="#" target="_blank" rel="noopener noreferrer">Website / LinkedIn</a>
                    </div>
                </div>
            </div>
        </div>
    );
}