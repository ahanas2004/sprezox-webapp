import React from 'react';
import { Link } from 'react-router-dom';
import styles from './PublicFooter.module.css';

const footerLinks = {
  Company: [
    { label: 'Home', to: '/' },
    { label: 'About Us', to: '/about' },
    { label: 'Our Ventures', to: '/ventures' },
    { label: 'Contact', to: '/contact' },
  ],
  Ventures: [
    { label: 'Entrepreneurial App', to: '/ventures/app' },
    { label: 'EdTech Programs', to: '/ventures/edtech' },
  ],
  Ecosystem: [
    { label: 'For Startup Ecosystem', to: '/startup-ecosystem' },
    { label: 'For Schools & Colleges', to: '/schools-colleges' },
    { label: 'Join Waitlist', to: '/signin' },
  ],
  Legal: [
    { label: 'Privacy Policy', to: '/privacy' },
    { label: 'Terms of Service', to: '/terms' },
  ],
};

export default function PublicFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.glow} />
      <div className={styles.inner}>
        <div className={styles.brand}>
          <div className={styles.logo}>
            <span className={styles.logoMark}>S</span>
            <span className={styles.logoText}>SPREZOX</span>
          </div>
          <p className={styles.tagline}>
            Your empire starts here.
          </p>
          <p className={styles.desc}>
            A tech ecosystem and edtech helping individuals, founders, and
            institutions learn, launch, and raise capital.
          </p>
          <p className={styles.location}>📍 Chennai, India</p>
        </div>

        <div className={styles.links}>
          {Object.entries(footerLinks).map(([group, items]) => (
            <div key={group} className={styles.linkGroup}>
              <h4 className={styles.groupTitle}>{group}</h4>
              <ul className={styles.linkList}>
                {items.map((item) => (
                  <li key={item.label}>
                    <Link to={item.to} className={styles.link}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.bottom}>
        <p>© 2025 SPREZOX  Pvt. Ltd. All rights reserved.</p>
        <p>Copy Rights with Sprezox Pvt. Ltd. </p>
      </div>
    </footer>
  );
}