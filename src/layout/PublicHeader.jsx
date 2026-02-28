import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import styles from './PublicHeader.module.css';

const venturesLinks = [
  { to: '/ventures/app', label: 'Entrepreneurial App' },
  { to: '/ventures/edtech', label: 'EdTech for Institutions' },
];

export default function PublicHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [venturesOpen, setVenturesOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setVenturesOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const navLinks = [
    { to: '/', label: 'Home', exact: true },
    { to: '/about', label: 'About Us' },
    { label: 'Our Ventures', dropdown: venturesLinks },
    { to: '/startup-ecosystem', label: 'For Startup Ecosystem' },
    { to: '/schools-colleges', label: 'For Schools & Colleges' },
  ];

  return (
    <>
      <motion.header
        className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className={styles.inner}>
          {/* Logo */}
          <NavLink to="/" className={styles.logo}>
            <span className={styles.logoMark}>S</span>
            <span className={styles.logoText}>SPREZOX</span>
          </NavLink>

          {/* Desktop Nav */}
          <nav className={styles.desktopNav}>
            {navLinks.map((link, i) =>
              link.dropdown ? (
                <div
                  key={i}
                  className={styles.dropdownWrapper}
                  onMouseEnter={() => setVenturesOpen(true)}
                  onMouseLeave={() => setVenturesOpen(false)}
                >
                  <button className={styles.dropdownTrigger}>
                    {link.label}
                    <ChevronDown
                      size={14}
                      className={`${styles.chevron} ${venturesOpen ? styles.chevronOpen : ''}`}
                    />
                  </button>
                  <AnimatePresence>
                    {venturesOpen && (
                      <motion.div
                        className={styles.dropdown}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.18 }}
                      >
                        {link.dropdown.map((sub) => (
                          <NavLink
                            key={sub.to}
                            to={sub.to}
                            className={({ isActive }) =>
                              `${styles.dropdownLink} ${isActive ? styles.dropdownLinkActive : ''}`
                            }
                          >
                            {sub.label}
                          </NavLink>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.exact}
                  className={({ isActive }) =>
                    `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
                  }
                >
                  {link.label}
                </NavLink>
              )
            )}
          </nav>

          {/* CTA */}
          <div className={styles.actions}>
            <button
              className={styles.ctaBtn}
              onClick={() => navigate('/signin')}
            >
              Join Waitlist
            </button>
            <button
              className={styles.menuBtn}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {menuOpen ? (
                  <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <X size={22} />
                  </motion.span>
                ) : (
                  <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Menu size={22} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              className={styles.overlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.nav
              className={styles.drawer}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <div className={styles.drawerHeader}>
                <span className={styles.drawerLogo}>SPREZOX</span>
                <button onClick={() => setMenuOpen(false)} className={styles.drawerClose}>
                  <X size={22} />
                </button>
              </div>

              <div className={styles.drawerLinks}>
                {navLinks.map((link, i) =>
                  link.dropdown ? (
                    <div key={i}>
                      <p className={styles.drawerGroup}>Our Ventures</p>
                      {link.dropdown.map((sub) => (
                        <NavLink
                          key={sub.to}
                          to={sub.to}
                          className={styles.drawerSubLink}
                        >
                          {sub.label}
                        </NavLink>
                      ))}
                    </div>
                  ) : (
                    <NavLink
                      key={link.to}
                      to={link.to}
                      end={link.exact}
                      className={({ isActive }) =>
                        `${styles.drawerLink} ${isActive ? styles.drawerLinkActive : ''}`
                      }
                    >
                      {link.label}
                    </NavLink>
                  )
                )}
              </div>

              <div className={styles.drawerFooter}>
                <button className={styles.drawerCta} onClick={() => { setMenuOpen(false); navigate('/signin'); }}>
                  Join Waitlist
                </button>
                <button className={styles.drawerSecondary} onClick={() => { setMenuOpen(false); navigate('/contact'); }}>
                  Partner with Us
                </button>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}