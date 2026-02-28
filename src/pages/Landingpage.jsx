import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Zap, Users, TrendingUp, BookOpen, Globe, ChevronRight } from 'lucide-react';
import styles from './LandingPage.module.css';

/* ── Animated background mesh ── */
function MeshBackground() {
  return (
    <div className={styles.meshBg} aria-hidden="true">
      <div className={styles.meshOrb1} />
      <div className={styles.meshOrb2} />
      <div className={styles.meshOrb3} />
      <div className={styles.meshGrid} />
    </div>
  );
}

/* ── Floating stat chip ── */
function StatChip({ value, label, delay = 0 }) {
  return (
    <motion.div
      className={styles.statChip}
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 0.8 + delay, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
    >
      <span className={styles.statValue}>{value}</span>
      <span className={styles.statLabel}>{label}</span>
    </motion.div>
  );
}

/* ── Feature card ── */
function FeatureCard({ icon: Icon, title, desc, accent, delay }) {
  return (
    <motion.div
      className={styles.featureCard}
      style={{ '--accent': accent }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
    >
      <div className={styles.featureIcon}>
        <Icon size={22} />
      </div>
      <h3 className={styles.featureTitle}>{title}</h3>
      <p className={styles.featureDesc}>{desc}</p>
    </motion.div>
  );
}

/* ── Audience card ── */
function AudienceCard({ emoji, title, desc, to, delay }) {
  const navigate = useNavigate();
  return (
    <motion.div
      className={styles.audienceCard}
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      onClick={() => navigate(to)}
      role="button"
      tabIndex={0}
    >
      <span className={styles.audienceEmoji}>{emoji}</span>
      <div>
        <h4 className={styles.audienceTitle}>{title}</h4>
        <p className={styles.audienceDesc}>{desc}</p>
      </div>
      <ChevronRight size={20} className={styles.audienceArrow} />
    </motion.div>
  );
}

export default function LandingPage() {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  const features = [
    { icon: BookOpen, title: 'Curated Learning', desc: 'Short reels, podcasts, and expert content on business and finance — no fluff, just strategy.', accent: '#6C63FF', delay: 0 },
    { icon: Users, title: 'Smart Networking', desc: 'AI-powered connections with the right mentors, co-founders, investors, and ecosystem players.', accent: '#A855F7', delay: 0.1 },
    { icon: TrendingUp, title: 'Capital Access', desc: 'Private placement-based funding with curated crowd investors ready to back bold ideas.', accent: '#EC4899', delay: 0.2 },
    { icon: Globe, title: 'EdTech for Institutions', desc: 'Junior MBA programs, workshops, and mentorship for schools and colleges across India.', accent: '#14B8A6', delay: 0.3 },
  ];

  const audiences = [
    { emoji: '🚀', title: 'Founders & Entrepreneurs', desc: 'Learn, network, and raise capital all in one place.', to: '/startup-ecosystem', delay: 0 },
    { emoji: '🎓', title: 'Students & Early Professionals', desc: 'Build skills and connections before you even graduate.', to: '/startup-ecosystem', delay: 0.1 },
    { emoji: '💼', title: 'Investors & Mentors', desc: 'Discover curated deal flow and the next generation of founders.', to: '/startup-ecosystem', delay: 0.2 },
    { emoji: '🏫', title: 'Schools & Colleges', desc: 'Bring entrepreneurship education to your campus.', to: '/schools-colleges', delay: 0.3 },
  ];

  return (
    <div className={styles.page}>
      {/* ── HERO ── */}
      <section ref={heroRef} className={styles.hero}>
        <MeshBackground />
        <motion.div className={styles.heroInner} style={{ opacity: heroOpacity, y: heroY }}>
          <motion.div
            className={styles.heroBadge}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <Zap size={12} />
            Now accepting waitlist applications
          </motion.div>

          <motion.h1
            className={styles.heroHeadline}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            Your empire
            <br />
            <span className={styles.heroGradient}>starts here.</span>
          </motion.h1>

          <motion.p
            className={styles.heroSub}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
          >
            A tech ecosystem and edtech helping individuals, founders, and institutions
            learn, launch, and raise capital — all in one place.
          </motion.p>

          <motion.div
            className={styles.heroCtas}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.6 }}
          >
            <button className={styles.ctaPrimary} onClick={() => navigate('/signin')}>
              Join App Waitlist <ArrowRight size={16} />
            </button>
            <button className={styles.ctaSecondary} onClick={() => navigate('/contact')}>
              Partner with Us
            </button>
          </motion.div>

          <div className={styles.statsRow}>
            <StatChip value="250k+" label="Founders in Network" delay={0} />
            <StatChip value="2" label="Ventures" delay={0.1} />
            <StatChip value="India" label="Based in Chennai" delay={0.2} />
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className={styles.scrollHint}
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <div className={styles.scrollDot} />
        </motion.div>
      </section>

      {/* ── WHAT WE DO ── */}
      <section className={styles.section}>
        <div className={styles.container}>
          <motion.div
            className={styles.sectionLabel}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            What we do
          </motion.div>
          <motion.h2
            className={styles.sectionTitle}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            One platform.
            <br />
            <span className={styles.titleAccent}>Infinite possibilities.</span>
          </motion.h2>
          <motion.p
            className={styles.sectionSub}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            SPREZOX bridges the gap between learning, networking, and fundraising —
            for the next generation of Indian innovators.
          </motion.p>

          <div className={styles.featuresGrid}>
            {features.map((f) => (
              <FeatureCard key={f.title} {...f} />
            ))}
          </div>
        </div>
      </section>

      {/* ── WHO IT'S FOR ── */}
      <section className={styles.sectionDark}>
        <div className={styles.container}>
          <div className={styles.splitLayout}>
            <motion.div
              className={styles.splitLeft}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className={styles.sectionLabel}>Who it's for</div>
              <h2 className={styles.sectionTitle}>
                Built for every player in the startup arena.
              </h2>
              <p className={styles.sectionSub}>
                Whether you're a student with an idea, a founder raising capital, an
                investor searching for deal flow, or an institution that wants to bring
                entrepreneurship to campus — SPREZOX has a seat at the table for you.
              </p>
              <button className={styles.ctaPrimary} onClick={() => navigate('/about')}>
                Learn more about us <ArrowRight size={16} />
              </button>
            </motion.div>

            <div className={styles.splitRight}>
              {audiences.map((a) => (
                <AudienceCard key={a.title} {...a} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── OUR VENTURES ── */}
      <section className={styles.section}>
        <div className={styles.container}>
          <motion.div
            className={styles.sectionLabel}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Our Ventures
          </motion.div>
          <motion.h2
            className={styles.sectionTitle}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Two products. One mission.
          </motion.h2>

          <div className={styles.venturesGrid}>
            <motion.div
              className={styles.ventureCard}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{ y: -4 }}
            >
              <div className={styles.ventureTag}>Venture 01</div>
              <h3 className={styles.ventureTitle}>Entrepreneurial Tech App</h3>
              <p className={styles.ventureDesc}>
                A social media–style platform where founders learn from expert reels,
                network with investors, and access private placement funding — all in
                one seamless experience.
              </p>
              <button className={styles.ventureCta} onClick={() => navigate('/ventures/app')}>
                Explore the App <ArrowRight size={14} />
              </button>
            </motion.div>

            <motion.div
              className={`${styles.ventureCard} ${styles.ventureCardAccent}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              whileHover={{ y: -4 }}
            >
              <div className={styles.ventureTag}>Venture 02</div>
              <h3 className={styles.ventureTitle}>EdTech for Schools & Colleges</h3>
              <p className={styles.ventureDesc}>
                Junior MBA programs, workshops, bootcamps, and mentorship delivered
                to schools and colleges across India — equipping students with
                real business and financial skills before they graduate.
              </p>
              <button className={styles.ventureCta} onClick={() => navigate('/ventures/edtech')}>
                Explore EdTech <ArrowRight size={14} />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className={styles.finalCta}>
        <div className={styles.finalCtaGlow} />
        <div className={styles.container}>
          <motion.div
            className={styles.finalCtaInner}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className={styles.finalCtaTitle}>
              Join the forefront of
              <br />
              <span className={styles.heroGradient}>Indian innovation.</span>
            </h2>
            <p className={styles.finalCtaSub}>
              Be among the first to access the SPREZOX ecosystem when we launch.
            </p>
            <div className={styles.heroCtas}>
              <button className={styles.ctaPrimary} onClick={() => navigate('/signin')}>
                Join App Waitlist <ArrowRight size={16} />
              </button>
              <button className={styles.ctaSecondary} onClick={() => navigate('/contact')}>
                Partner with Us
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}