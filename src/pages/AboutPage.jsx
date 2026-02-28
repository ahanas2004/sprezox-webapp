import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Target, Eye, BookOpen, Users, TrendingUp, ArrowRight } from 'lucide-react';
import styles from './AboutPage.module.css';

const team = [
  { name: 'Mohammed Azgar', title: 'Founder & CEO', initials: 'MA', color: '#6C63FF' },
  { name: 'Sulaiman Kaif', title: 'Co-Founder & COO', initials: 'SK', color: '#A855F7' },
  { name: 'Ahamed', title: 'Chief Technology Officer', initials: 'AH', color: '#EC4899' },
  { name: 'Hanish Adrian', title: 'Chief Marketing Officer', initials: 'HA', color: '#14B8A6' },
];

const pillars = [
  {
    icon: BookOpen,
    title: 'Learn',
    color: '#6C63FF',
    desc: 'Gain practical business and finance knowledge through short reels, podcasts, and expert-led content — making education engaging and community-driven.',
  },
  {
    icon: Users,
    title: 'Network',
    color: '#A855F7',
    desc: 'Build meaningful connections with founders, mentors, and investors. Discover opportunities, exchange ideas, and expand your network effortlessly.',
  },
  {
    icon: TrendingUp,
    title: 'Raise',
    color: '#EC4899',
    desc: 'Access private placement-based funding with curated crowd investors and connect with VCs, angels, and institutional capital — all in one place.',
  },
];

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] },
  };
}

export default function AboutPage() {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      {/* ── Hero ── */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.container}>
          <motion.div className={styles.tag} {...fadeUp(0.1)}>About Us</motion.div>
          <motion.h1 className={styles.heroTitle} {...fadeUp(0.2)}>
            We're building the operating system
            <br />
            <span className={styles.accent}>for India's startup generation.</span>
          </motion.h1>
          <motion.p className={styles.heroSub} {...fadeUp(0.35)}>
            SPREZOX is a social media–based entrepreneurial platform bringing business and financial education,
            startup networking, and private placement funding into one unified ecosystem.
          </motion.p>
        </div>
      </section>

      {/* ── What is SPREZOX ── */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.twoCol}>
            <motion.div {...fadeUp(0)}>
              <div className={styles.sectionLabel}>What we are</div>
              <h2 className={styles.h2}>One ecosystem. Three superpowers.</h2>
              <p className={styles.bodyText}>
                SPREZOX networks startups with the entire startup ecosystem — including incubators,
                accelerators, angel investors, venture capitalists, mentors, and entrepreneurs —
                all in one collaborative space designed for the next generation.
              </p>
              <p className={styles.bodyText}>
                Beyond the app, SPREZOX also delivers entrepreneurship-focused edtech programs
                for schools and colleges through Junior MBA programs, workshops, seminars, and
                mentorship initiatives — equipping the next generation with practical business
                and financial skills early.
              </p>
              <p className={styles.bodyText}>
                Our goal is simple: make entrepreneurship more accessible by providing the
                right <strong>knowledge</strong>, <strong>network</strong>, and <strong>capital</strong> — all in one place.
              </p>
            </motion.div>

            <div className={styles.pillarsCol}>
              {pillars.map((p, i) => (
                <motion.div
                  key={p.title}
                  className={styles.pillarCard}
                  style={{ '--c': p.color }}
                  {...fadeUp(i * 0.12)}
                >
                  <div className={styles.pillarIcon}>
                    <p.icon size={20} />
                  </div>
                  <div>
                    <h4 className={styles.pillarTitle}>{p.title}</h4>
                    <p className={styles.pillarDesc}>{p.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Mission & Vision ── */}
      <section className={styles.sectionDark}>
        <div className={styles.container}>
          <motion.div className={styles.sectionLabel} {...fadeUp()}>Our Purpose</motion.div>
          <div className={styles.mvGrid}>
            <motion.div className={styles.mvCard} {...fadeUp(0.1)}>
              <div className={styles.mvIcon}><Target size={28} /></div>
              <h3 className={styles.mvTitle}>Mission</h3>
              <p className={styles.mvText}>
                To make entrepreneurship smarter, faster, and more accessible for everyone with
                a bold idea. We empower young minds to turn their ideas into impactful ventures
                by removing the barriers of knowledge, network, and capital.
              </p>
            </motion.div>
            <motion.div className={styles.mvCard} {...fadeUp(0.2)}>
              <div className={`${styles.mvIcon} ${styles.mvIconAccent}`}><Eye size={28} /></div>
              <h3 className={styles.mvTitle}>Vision</h3>
              <p className={styles.mvText}>
                To create the most vibrant digital ecosystem where learning meets networking,
                helping every entrepreneur — from a Class 9 student in Chennai to a Series A
                founder in Mumbai — move from idea to execution with confidence.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section className={styles.section}>
        <div className={styles.container}>
          <motion.div className={styles.sectionLabel} {...fadeUp()}>The Team</motion.div>
          <motion.h2 className={styles.h2} {...fadeUp(0.1)}>
            Passionate minds building the future.
          </motion.h2>
          <motion.p className={styles.bodyText} style={{ marginBottom: '3rem' }} {...fadeUp(0.2)}>
            We're a small, focused team from Chennai, building for all of India.
          </motion.p>

          <div className={styles.teamGrid}>
            {team.map((member, i) => (
              <motion.div key={member.name} className={styles.teamCard} {...fadeUp(i * 0.1)}>
                <div className={styles.teamAvatar} style={{ background: member.color }}>
                  {member.initials}
                </div>
                <h4 className={styles.teamName}>{member.name}</h4>
                <p className={styles.teamTitle}>{member.title}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <motion.div className={styles.ctaBox} {...fadeUp()}>
            <h2 className={styles.ctaTitle}>Ready to join the ecosystem?</h2>
            <p className={styles.ctaSub}>
              Whether you're a founder, student, investor, or institution — there's a place for you.
            </p>
            <div className={styles.ctaBtns}>
              <button className={styles.btnPrimary} onClick={() => navigate('/signin')}>
                Join Waitlist <ArrowRight size={16} />
              </button>
              <button className={styles.btnSecondary} onClick={() => navigate('/contact')}>
                Partner with Us
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}