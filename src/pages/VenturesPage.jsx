import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Smartphone, GraduationCap, ArrowRight, Check, Zap } from 'lucide-react';
import styles from './VenturesPage.module.css';

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] },
  };
}

const ventures = [
  {
    number: '01',
    icon: Smartphone,
    title: 'Entrepreneurial Tech App',
    subtitle: 'For Founders, Students & Investors',
    color: '#6C63FF',
    colorAlt: '#A855F7',
    desc: 'A social media–style platform combining business education, startup networking, and private placement funding — built for the next generation of Indian founders.',
    highlights: [
      'Short-form expert reels on business & finance',
      'AI-matched networking with investors & mentors',
      'Private placement-based crowd funding access',
      'Ideas board — share and discover startup concepts',
      'Creator tools for ecosystem educators',
    ],
    audience: ['Aspiring Entrepreneurs', 'Students & Early Professionals', 'Investors & Mentors'],
    cta: 'Explore the App',
    to: '/ventures/app',
  },
  {
    number: '02',
    icon: GraduationCap,
    title: 'EdTech for Schools & Colleges',
    subtitle: 'For Institutions Across India',
    color: '#14B8A6',
    colorAlt: '#6C63FF',
    desc: 'Structured entrepreneurship education delivered directly to campuses — Junior MBA programs, workshops, bootcamps, seminars, and mentorship for students at every level.',
    highlights: [
      'Junior MBA curriculum (3–6 months)',
      'Intensive 1–3 day workshops & bootcamps',
      'Founder & investor guest seminars',
      'One-on-one and group mentorship',
      'Online, hybrid, and on-campus delivery',
    ],
    audience: ['Schools (Classes 9–12)', 'Undergraduate Colleges', 'Postgraduate Institutions'],
    cta: 'Explore EdTech',
    to: '/ventures/edtech',
  },
];

const comparison = [
  { label: 'Target Audience', app: 'Individuals & Founders', edtech: 'Schools & Colleges' },
  { label: 'Format', app: 'Mobile App', edtech: 'On-campus Programs' },
  { label: 'Duration', app: 'Always-on, self-paced', edtech: '1 day to 6 months' },
  { label: 'Core Offering', app: 'Learn, Network, Raise', edtech: 'Educate & Inspire' },
  { label: 'Access', app: 'App Waitlist', edtech: 'Partner with Us' },
];

export default function VenturesPage() {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.container}>
          <motion.div className={styles.tag} {...fadeUp(0.1)}>
            <Zap size={12} /> Our Ventures
          </motion.div>
          <motion.h1 className={styles.heroTitle} {...fadeUp(0.2)}>
            Two products.
            <br />
            <span className={styles.accent}>One mission.</span>
          </motion.h1>
          <motion.p className={styles.heroSub} {...fadeUp(0.35)}>
            SPREZOX operates two distinct but complementary ventures — a tech platform for
            individuals and founders, and an EdTech arm for educational institutions.
            Both are designed to make entrepreneurship more accessible in India.
          </motion.p>
        </div>
      </section>

      {/* Venture cards */}
      <section className={styles.venturesSection}>
        <div className={styles.container}>
          {ventures.map((v, i) => (
            <motion.div
              key={v.number}
              className={styles.ventureCard}
              style={{ '--c': v.color, '--ca': v.colorAlt }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Top */}
              <div className={styles.cardTop}>
                <div className={styles.cardMeta}>
                  <span className={styles.ventureNum}>Venture {v.number}</span>
                  <div className={styles.cardIcon}>
                    <v.icon size={26} />
                  </div>
                </div>
                <div className={styles.cardHeader}>
                  <div>
                    <h2 className={styles.cardTitle}>{v.title}</h2>
                    <p className={styles.cardSubtitle}>{v.subtitle}</p>
                  </div>
                  <button
                    className={styles.cardCta}
                    onClick={() => navigate(v.to)}
                  >
                    {v.cta} <ArrowRight size={15} />
                  </button>
                </div>
                <p className={styles.cardDesc}>{v.desc}</p>
              </div>

              {/* Bottom grid */}
              <div className={styles.cardBottom}>
                <div className={styles.highlightsCol}>
                  <h4 className={styles.colLabel}>Key Features</h4>
                  <ul className={styles.highlights}>
                    {v.highlights.map((h) => (
                      <li key={h}>
                        <Check size={13} className={styles.checkIcon} />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={styles.audienceCol}>
                  <h4 className={styles.colLabel}>Who It's For</h4>
                  <div className={styles.audienceTags}>
                    {v.audience.map((a) => (
                      <span key={a} className={styles.audienceTag}>{a}</span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Comparison table */}
      <section className={styles.compareSection}>
        <div className={styles.container}>
          <motion.div className={styles.sectionLabel} {...fadeUp()}>Quick Compare</motion.div>
          <motion.h2 className={styles.h2} {...fadeUp(0.1)}>How the two ventures differ.</motion.h2>

          <motion.div className={styles.compareTable} {...fadeUp(0.2)}>
            <div className={styles.compareHeader}>
              <div className={styles.compareCell} />
              <div className={`${styles.compareCell} ${styles.compareHeadCell}`}>
                <Smartphone size={16} />
                Tech App
              </div>
              <div className={`${styles.compareCell} ${styles.compareHeadCell} ${styles.compareHeadCellAlt}`}>
                <GraduationCap size={16} />
                EdTech
              </div>
            </div>
            {comparison.map((row, i) => (
              <motion.div
                key={row.label}
                className={styles.compareRow}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
              >
                <div className={`${styles.compareCell} ${styles.compareRowLabel}`}>{row.label}</div>
                <div className={styles.compareCell}>{row.app}</div>
                <div className={`${styles.compareCell} ${styles.compareCellAlt}`}>{row.edtech}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <motion.div className={styles.ctaGrid} {...fadeUp()}>
            <div className={styles.ctaCard} style={{ '--c': '#6C63FF' }}>
              <Smartphone size={28} className={styles.ctaCardIcon} />
              <h3 className={styles.ctaCardTitle}>Join the App Waitlist</h3>
              <p className={styles.ctaCardDesc}>Be among the first founders and students on the platform.</p>
              <button className={styles.ctaCardBtn} onClick={() => navigate('/signin')}>
                Join Waitlist <ArrowRight size={15} />
              </button>
            </div>
            <div className={styles.ctaCard} style={{ '--c': '#14B8A6' }}>
              <GraduationCap size={28} className={styles.ctaCardIcon} />
              <h3 className={styles.ctaCardTitle}>Partner with Your Institution</h3>
              <p className={styles.ctaCardDesc}>Bring SPREZOX's programs to your school or college campus.</p>
              <button className={`${styles.ctaCardBtn} ${styles.ctaCardBtnAlt}`} onClick={() => navigate('/contact')}>
                Book a Call <ArrowRight size={15} />
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}