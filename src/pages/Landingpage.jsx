import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { BrainCircuit, Network, DollarSign, ArrowRight, Rocket, Target, Zap, BookOpen, Users, Eye } from 'lucide-react';
import styles from './LandingPage.module.css';
import sprezoxDashboard from '../assets/sprexoz-dashboard.png';


// Main Page Component
export default function SprezoxLandingPage() {
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'dark');
  }, []);

  return (
    <div className={styles.mainWrapper}>
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <AboutUsSection />
        <HowItWorksSection />
        <BentoGridSection />
        <TeamSection />
        <FinalCTA />
      </main>
      <Footer />
      <CustomCursor />
    </div>
  );
}

// --- Header Component with Mobile Menu ---
const Header = () => {
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavClick = (href) => {
        setMobileMenuOpen(false);
        if (href.startsWith('#')) {
            const element = document.querySelector(href);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [mobileMenuOpen]);

    return (
        <header className={`${styles.header} ${scrolled ? styles.headerScrolled : ''}`}>
            <div className={styles.headerContainer}>
                <motion.div className={styles.logo} whileHover={{ scale: 1.05 }}>
                    SPREZOX
                </motion.div>
                
                <nav className={styles.desktopNav}>
                    <a href="#features" className={styles.navLink}>Features</a>
                    <a href="#about" className={styles.navLink}>About</a>
                    <a href="#process" className={styles.navLink}>Process</a>
                    <a href="#ecosystem" className={styles.navLink}>Ecosystem</a>
                </nav>

                <div className={styles.headerActions}>
                    <GradientButton onClick={() => navigate('/signin')}>
                        Get Early Access
                    </GradientButton>
                    
                    <button 
                        className={`${styles.mobileMenuButton} ${mobileMenuOpen ? styles.open : ''}`}
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </div>

            <nav className={`${styles.mobileNav} ${mobileMenuOpen ? styles.open : ''}`}>
                <a href="#features" className={styles.mobileNavLink} onClick={() => handleNavClick('#features')}>Features</a>
                <a href="#about" className={styles.mobileNavLink} onClick={() => handleNavClick('#about')}>About</a>
                <a href="#process" className={styles.mobileNavLink} onClick={() => handleNavClick('#process')}>Process</a>
                <a href="#ecosystem" className={styles.mobileNavLink} onClick={() => handleNavClick('#ecosystem')}>Ecosystem</a>
                <GradientButton onClick={() => { setMobileMenuOpen(false); navigate('/signin'); }}>
                    Get Early Access
                </GradientButton>
            </nav>
        </header>
    );
};

// --- Hero Section ---
const HeroSection = () => {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);
  
  return (
    <section ref={heroRef} className={styles.hero}>
        <div className={styles.heroGlowBackground} />
        <motion.div className={styles.heroContent} style={{ opacity: contentOpacity }}>
            <h1 className={styles.heroHeadline}>
                Where Ambition
                <br />
                <span className={styles.gradientText}>Meets Opportunity.</span>
            </h1>
            <p className={styles.heroSubheadline}>
              The all-in-one platform where India's next generation of innovators learn, connect, and build the future.
            </p>
            <div className={styles.heroCtaContainer}>
              <GradientButton size="large" onClick={() => navigate('/signin')}>
                Get Early Access
              </GradientButton>
            </div>
        </motion.div>
        <motion.div className={styles.heroImageContainer} style={{ y: imageY }}>
            <img 
              src={sprezoxDashboard}
              alt="SPREZOX App Preview" 
              className={styles.heroImage}
            />
        </motion.div>
    </section>
  );
};

// --- Features Section ---
const FeaturesSection = () => {
  const features = [
        { icon: <BrainCircuit size={28}/>, title: "Curated Knowledge", description: "Access a library of actionable insights from proven experts. No fluff, just strategy." },
        { icon: <Network size={28}/>, title: "Intelligent Networking", description: "Our AI-powered engine connects you with the right mentors, co-founders, and investors." },
        { icon: <DollarSign size={28}/>, title: "Capital Opportunities", description: "Discover and connect with a diverse range of investors, from angels to VCs, ready to fund the future." },
  ];
  return(
    <section id="features" className={styles.featuresSection}>
        <div className={styles.container}>
            <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>An Unfair Advantage</h2>
                <p className={styles.sectionSubtitle}>We've built the tools so you can focus on building the future. Our integrated ecosystem provides everything you need to succeed.</p>
            </div>
            <div className={styles.featuresGrid}>
                {features.map((feature, i) => (
                    <motion.div 
                        key={i} 
                        className={styles.featureCard} 
                        initial={{ opacity: 0, y: 50 }} 
                        whileInView={{ opacity: 1, y: 0 }} 
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                    >
                        <div className={styles.featureIcon}>{feature.icon}</div>
                        <h3 className={styles.featureTitle}>{feature.title}</h3>
                        <p className={styles.featureDescription}>{feature.description}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
  );
};

// --- About Us Section ---
const AboutUsSection = () => {
  return (
    <section id="about" className={styles.aboutSection}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>The Ultimate Startup Companion</h2>
          <p className={styles.sectionSubtitle}>
            We are a social media based entrepreneurial platform that empowers business and finance enthusiasts to learn, grow, and connect within the startup ecosystem.
          </p>
        </div>
        <div className={styles.aboutContentGrid}>
          <motion.div 
            className={styles.aboutPrimaryText}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h3>Connecting the Ecosystem</h3>
            <p>SPREZOX networks startups with the entire startup ecosystem including incubators, accelerators, angel investors, venture capitalists, mentors, and entrepreneurs all in one collaborative space designed for the next generation.</p>
          </motion.div>
          <motion.div 
            className={styles.aboutHighlights}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className={styles.highlightCard}>
              <div className={styles.highlightIcon}><BookOpen size={24} /></div>
              <div>
                <h4>Learn</h4>
                <p>Gain practical business and finance knowledge through short reels, podcasts, and expert-led content, making education engaging and community-driven.</p>
              </div>
            </div>
            <div className={styles.highlightCard}>
              <div className={styles.highlightIcon}><Users size={24} /></div>
              <div>
                <h4>Network</h4>
                <p>Build meaningful connections with founders, mentors, and investors. Discover opportunities, exchange ideas, and expand your network effortlessly.</p>
              </div>
            </div>
          </motion.div>
        </div>
        <div className={styles.missionVisionContainer}>
          <motion.div 
            className={styles.missionCard}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <Target size={32} />
            <h3>Our Mission</h3>
            <p>To make entrepreneurship smarter, faster, and more accessible for everyone with a bold idea. We empower young minds to turn their ideas into impactful ventures.</p>
          </motion.div>
          <motion.div 
            className={styles.visionCard}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            <Eye size={32} />
            <h3>Our Vision</h3>
            <p>To create a vibrant digital ecosystem where learning meets networking, helping every entrepreneur move from idea to execution with confidence.</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// --- How It Works Section ---
const HowItWorksSection = () => {
    const steps = [
        { num: '01', title: 'Create Your Profile', text: 'Build a dynamic profile that showcases your vision, skills, or investment thesis.'},
        { num: '02', title: 'Engage the Ecosystem', text: 'Leverage our AI to discover curated content, connections, and opportunities.'},
        { num: '03', title: 'Execute Your Vision', text: 'Move from learning to networking to fundraising, all within one seamless platform.'},
    ];
    return(
        <section id="process" className={styles.howItWorksSection}>
            <div className={styles.container}>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>A Clear Path to Success</h2>
                </div>
                <div className={styles.howItWorksContainer}>
                    {steps.map((step, i) => (
                        <motion.div 
                            key={i} 
                            className={styles.howItWorksStep} 
                            initial={{ opacity: 0, y: 50 }} 
                            whileInView={{ opacity: 1, y: 0 }} 
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.2 }}
                        >
                            <span className={styles.howItWorksNumber}>{step.num}</span>
                            <h3 className={styles.howItWorksTitle}>{step.title}</h3>
                            <p className={styles.howItWorksText}>{step.text}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// --- Bento Grid Section ---
const BentoGridSection = () => {
    return(
        <section id="ecosystem" className={styles.bentoSection}>
            <div className={styles.container}>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>A Purpose-Built Ecosystem</h2>
                    <p className={styles.sectionSubtitle}>Designed for every player in the startup arena. Find your place, find your people, find your funding.</p>
                </div>
                <motion.div 
                    className={styles.bentoGrid} 
                    initial="hidden" 
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ staggerChildren: 0.1 }}
                >
                    <BentoCard gridArea="a" title="For Founders" icon={<Rocket />} description="The ultimate toolkit to build, launch, and scale your venture." />
                    <BentoCard gridArea="b" title="For Investors" icon={<Target />} description="Access a curated pipeline of high-potential, vetted startups." />
                    <BentoCard gridArea="c" title="For Students" icon={<BrainCircuit />} description="Turn theory into practice. Learn from experts and build your network early." />
                    <BentoCard gridArea="d" title="AI Matchmaking" icon={<Network />} description="Our algorithm connects you to the most relevant people in the ecosystem." />
                    <BentoCard gridArea="e" title="250k+" description="Early-Stage Founders & Students in our Network" isStat={true} />
                </motion.div>
            </div>
        </section>
    );
};

// --- Bento Card Component ---
const BentoCard = ({ gridArea, title, icon, description, isStat = false }) => {
    const variants = { 
        hidden: { opacity: 0, y: 20 }, 
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } 
    };
    return(
        <motion.div className={styles.bentoCard} style={{ gridArea }} variants={variants}>
            {isStat ? (
                <>
                    <h3 className={styles.bentoStatTitle}>{title}</h3>
                    <p className={styles.bentoStatDescription}>{description}</p>
                </>
            ) : (
                <>
                    <div className={styles.bentoIcon}>{icon}</div>
                    <h3 className={styles.bentoTitle}>{title}</h3>
                    <p className={styles.bentoDescription}>{description}</p>
                </>
            )}
        </motion.div>
    );
};

// --- Team Section ---
const TeamSection = () => {
  const teamMembers = [
    { name: 'Mohammed Azgar', title: 'Founder & CEO', imageUrl: 'https://placehold.co/400x400/18181B/E5E7EB?text=Mohammed Azgar' },
    { name: 'Md Sulaiman Kaif', title: 'Chief Operating Officer', imageUrl: 'https://placehold.co/400x400/18181B/E5E7EB?text=Md Sulaiman Kaif' },
    { name: 'Ahamed Anas', title: 'Chief Technology Officer', imageUrl: 'https://placehold.co/400x400/18181B/E5E7EB?text=Ahamed Anas' },
    { name: 'Hanish Adrian', title: 'Chief Marketing Officer', imageUrl: 'https://placehold.co/400x400/18181B/E5E7EB?text=Hanish Adrian' },
  ];

  return (
    <section id="team" className={styles.teamSection}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Meet Our Team</h2>
          <p className={styles.sectionSubtitle}>The passionate minds dedicated to building the future of the startup ecosystem.</p>
        </div>
        <motion.div 
          className={styles.teamGrid}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.1 }}
        >
          {teamMembers.map((member, index) => (
            <TeamMemberCard key={index} member={member} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// --- Team Member Card Sub-Component ---
const TeamMemberCard = ({ member }) => {
  const variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  return (
    <motion.div className={styles.teamMemberCard} variants={variants}>
      <div className={styles.teamMemberImageContainer}>
        <img src={member.imageUrl} alt={`Photo of ${member.name}`} className={styles.teamMemberImage} />
      </div>
      <h3 className={styles.teamMemberName}>{member.name}</h3>
      <p className={styles.teamMemberTitle}>{member.title}</p>
    </motion.div>
  );
};

// --- Final CTA Section ---
const FinalCTA = () => {
    const navigate = useNavigate();
    
    return (
        <section className={styles.finalCTA}>
            <div className={styles.container}>
                <Zap size={48} className={styles.finalCtaIcon} />
                <h2 className={styles.finalCTATitle}>Join the Forefront of Indian Innovation.</h2>
                <p className={styles.finalCTASubtitle}>Be the first to know when we launch. Your journey starts now.</p>
                <div className={styles.ctaButtonContainer}>
                    <GradientButton onClick={() => navigate('/signin')}>
                        Get Early Access
                    </GradientButton>
                </div>
            </div>
        </section>
    );
};

// --- Footer Component ---
const Footer = () => (
    <footer className={styles.footer}>
        <div className={styles.footerContainer}>
            <div className={styles.footerBrand}>
                 <p className={styles.logo}>SPREZOX</p>
                 <p>© 2025 SPREZOX Technologies. All Rights Reserved.</p>
            </div>
            <div className={styles.footerLinks}>
                <a href="#privacy" className={styles.footerLink}>Privacy</a>
                <a href="#terms" className={styles.footerLink}>Terms</a>
                <a href="#contact" className={styles.footerLink}>Contact</a>
            </div>
        </div>
    </footer>
);

// --- Gradient Button Component ---
const GradientButton = ({ children, size = 'medium', onClick }) => (
    <button className={`${styles.gradientButton} ${styles[size]}`} onClick={onClick}>
        {children} <ArrowRight size={size === 'large' ? 20 : 18} />
    </button>
);

// --- Custom Cursor Component ---
const CustomCursor = () => {
    const cursorRef = useRef(null);
    useEffect(() => {
        if (window.matchMedia("(hover: none)").matches) return;
        const moveCursor = (e) => {
          if (cursorRef.current) {
            cursorRef.current.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`;
          }
        };
        window.addEventListener('mousemove', moveCursor);
        return () => window.removeEventListener('mousemove', moveCursor);
    }, []);
    return <div ref={cursorRef} className={styles.customCursor}></div>;
};
