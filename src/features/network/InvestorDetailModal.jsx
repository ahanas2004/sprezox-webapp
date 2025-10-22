import React from 'react';
import { Mail, Phone, Link as LinkIcon } from 'lucide-react';
import styles from './InvestorDetailModal.module.css';

export default function InvestorDetailModal({ profile }) {
    if (!profile) return null;

    // Extract contact details from mentor_details if they exist
    const mentorDetails = profile.mentor_details || {};
    const email = mentorDetails.email || profile.email;
    const phone = mentorDetails.phone || profile.phone;
    const website = mentorDetails.website || profile.website;
    const description = mentorDetails.description || profile.description;
    const focus = mentorDetails.focus || profile.focus;

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
                    <p className={styles.type}>{profile.mentor_type || profile.type}</p>
                </div>
            </div>

            <div className={styles.section}>
                <h3 className={styles.sectionTitle}>About</h3>
                <p className={styles.description}>{description || "No details provided."}</p>
            </div>

            <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Focus Areas</h3>
                <div className={styles.tagContainer}>
                    {focus?.split(',').map(tag => (
                        <span key={tag.trim()} className={styles.tag}>{tag.trim()}</span>
                    ))}
                </div>
            </div>

            <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Contact & Links</h3>
                <div className={styles.contactGrid}>
                    {email && (
                        <div className={styles.contactItem}>
                            <Mail size={20} className={styles.contactIcon} />
                            <a href={`mailto:${email}`}>{email}</a>
                        </div>
                    )}
                    
                    {phone && (
                        <div className={styles.contactItem}>
                            <Phone size={20} className={styles.contactIcon} />
                            <a href={`tel:${phone}`}>{phone}</a>
                        </div>
                    )}
                    
                    {website && (
                        <div className={styles.contactItem}>
                            <LinkIcon size={20} className={styles.contactIcon} />
                            <a href={website} target="_blank" rel="noopener noreferrer">
                                {website}
                            </a>
                        </div>
                    )}

                    {profile.linkedin && (
                        <div className={styles.contactItem}>
                            <LinkIcon size={20} className={styles.contactIcon} />
                            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                                LinkedIn Profile
                            </a>
                        </div>
                    )}

                    {!email && !phone && !website && !profile.linkedin && (
                        <p className={styles.noContact}>No contact information available.</p>
                    )}
                </div>
            </div>
        </div>
    );
}