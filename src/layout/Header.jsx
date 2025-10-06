import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Users, User, Menu, X } from 'lucide-react';
import styles from './Header.module.css';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMenuOpen]);

  const navLinksData = [
    { to: "/", icon: <Home className={styles.navIcon} />, label: "Learn" },
    { to: "/network", icon: <Users className={styles.navIcon} />, label: "Network" },
    { to: "/profile", icon: <User className={styles.navIcon} />, label: "Profile" },
  ];

  const linkVariants = {
    open: { y: 0, opacity: 1 },
    closed: { y: -20, opacity: 0 },
  };

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.headerScrolled : ''}`}>
        <div className={styles.logo}>SPREZOX</div>
        <nav className={styles.desktopNav}>
          {navLinksData.map(link => (
            <NavLink key={link.to} to={link.to} className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}>
                {link.icon} {link.label}
            </NavLink>
          ))}
        </nav>
        <div className={styles.headerActions}>
          <motion.button className={styles.menuButton} onClick={() => setIsMenuOpen(!isMenuOpen)} whileTap={{ scale: 0.9 }}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </motion.button>
        </div>
      </header>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.nav 
              className={styles.mobileNavLinks}
              variants={{
                open: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } },
                closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } }
              }}
              initial="closed"
              animate="open"
              exit="closed"
            >
              {navLinksData.map((link, i) => (
                <motion.div key={i} variants={linkVariants}>
                    <NavLink to={link.to} className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`} onClick={() => setIsMenuOpen(false)}>
                        {link.icon} {link.label}
                    </NavLink>
                </motion.div>
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}