import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Users, User, Menu, X, Gem } from 'lucide-react';
import styles from './Header.module.css';
import logoImage from './logo1.png'; // Change path to your logo location

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const navLinksData = [
    { to: "/", icon: <Home className={styles.navIcon} />, label: "Learn" },
    { to: "/network", icon: <Users className={styles.navIcon} />, label: "Network" },
    { to: "/ideas", icon: <Gem className={styles.navIcon} />, label: "Ideas" },
    { to: "/profile", icon: <User className={styles.navIcon} />, label: "Profile" },
  ];

  const linkVariants = {
    closed: { y: -20, opacity: 0 },
    open: (i) => ({
      y: 0,
      opacity: 1,
      transition: { delay: i * 0.08, duration: 0.3, ease: 'easeOut' },
    }),
  };

  const logoVariants = {
    idle: { scale: 1 },
    hover: { scale: 1.05 },
  };

  const imageVariants = {
    idle: { rotate: 0 },
    hover: { rotate: -5, scale: 1.1 },
  };

  return (
    <>
      <motion.header
        className={`${styles.header} ${scrolled ? styles.headerScrolled : ''}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className={styles.container}>
          {/* Logo with Image */}
          <motion.div
            className={styles.logoContainer}
            variants={logoVariants}
            whileHover="hover"
          >
            <motion.img
              src={logoImage}
              alt="SPREZOX Logo"
              className={styles.logoImage}
              variants={imageVariants}
              whileHover="hover"
            />
            <motion.div
              className={styles.logoText}
            >
              SPREZOX
            </motion.div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className={styles.desktopNav}>
            {navLinksData.map((link, i) => (
              <motion.div
                key={link.to}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
              >
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `${styles.navLink} ${isActive ? styles.active : ''}`
                  }
                >
                  {link.icon}
                  {link.label}
                </NavLink>
              </motion.div>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            className={`${styles.menuButton} ${isMenuOpen ? styles.open : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 90 }}
                  exit={{ rotate: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={28} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: -90 }}
                  animate={{ rotate: 0 }}
                  exit={{ rotate: -90 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={28} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.nav
              className={styles.mobileNavLinks}
              initial="closed"
              animate="open"
              exit="closed"
            >
              {navLinksData.map((link, i) => (
                <motion.div key={link.to} custom={i} variants={linkVariants}>
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      `${styles.mobileNavLink} ${isActive ? styles.active : ''}`
                    }
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.icon}
                    {link.label}
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