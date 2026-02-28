import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Rocket, Users, TrendingUp, Lightbulb, Target, BookOpen,
  ArrowRight, Check, ChevronRight, Zap
} from 'lucide-react';
import styles from './StartupEcoPage.module.css';

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] },
  };
}

const personas = [
  {
    icon: Rocket,
    label: 'Founders',
    color: '#6C63FF',
    title: 'Turn your idea into a company.',
    desc: 'From the first spark of an idea to your Series A, SPREZOX gives you everything you need. Learn from battle-tested founders, find your co-founder, and connect with investors who believe in you.',
    benefits: [
      'Expert reels on go-to-market, fundraising, and product',
      'Curated investor introductions',
      'Co-founder matching',
      'Ideas board to share and validate concepts',
      'Startup funding through private placements',
    ],
  },
  {
    icon: Users,
    label: 'Mentors',
    color: '#A855F7',
    title: 'Share what you know. Shape what\'s next.',
    desc: 'List your profile on the SPREZOX Network Hub and get discovered by founders who need exactly your expertise. From accelerators to independent advisors — your knowledge has a home here.',
    benefits: [
      'Free mentor listing on Network Hub',
      'Discovery by founders in your domain',
      'Accelerator & incubator features',
      'Visible to students in the EdTech arm',
      'Build reputation in the startup community',
    ],
  },
  {
    icon: TrendingUp,
    label: 'Investors',
    color: '#EC4899',
    title: 'Find India\'s next breakout companies.',
    desc: 'Get early, curated access to promising startups across India. The SPREZOX platform brings vetted deal flow directly to you — from angels to VCs, all in one place.',
    benefits: [
      'Curated startup deal flow',
      'VC and Angel Investor listings',
      'Private placement participation',
      'Direct founder contact via Network Hub',
      'Co-invest with other smart angels',
    ],
  },
];

const ecosystemStats = [
  { value: '250k+', label: 'Founders in Network' },
  { value: '50+', label: 'Investors & VCs' },
  { value: '100+', label: 'Mentors & Advisors' },
  { value: '3', label: 'Startup Categories' },
];

const howItWorks = [
  { step: '01', title: 'Sign Up & Pick Your Role', desc: 'Join the waitlist and select whether you\'re a founder, investor, mentor, or student when the app launches.' },
  { step: '02', title: 'Build Your Profile', desc: 'Complete your profile — share your story, expertise, investment thesis, or startup stage. The more context, the better the matches.' },
  { step: '03', title: 'Learn, Connect & Transact', desc: 'Consume daily learning content, get matched with the right people, and when you\'re ready — raise or invest through the platform.' },
];

function PersonaCard({ persona, index }) {
  const navigate = useNavigate();
  return (
    <motion.div
      className={styles.personaCard}
      style={{ '--c': persona.color }}
      {...fadeUp(index * 0.1)}
    >
      <div className={styles.personaTop}>
        <div className={styles.personaIcon}><persona.icon size={22} /></div>
        <span className={styles.personaLabel}>{persona.label}</span>
      </div>
      <h3 className={styles.personaTitle}>{persona.title}</h3>
      <p className={styles.personaDesc}>{persona.desc}</p>
      <ul className={styles.personaBenefits}>
        {persona.benefits.map((b) => (
          <li key={b}>
            <Check size={13} className={styles.checkIcon} />
            {b}
          </li>
        ))}
      </ul>
      <button className={styles.personaCta} onClick={() => navigate('/signin')}>
        Join Waitlist <ChevronRight size={15} />
      </button>
    </motion.div>
  );
}

export default function StartupEcoPage() {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.container}>
          <motion.div className={styles.tag} {...fadeUp(0.1)}>
            <Zap size={12} /> For the Startup Ecosystem
          </motion.div>
          <motion.h1 className={styles.heroTitle} {...fadeUp(0.2)}>
            Every player.<br />
            <span className={styles.accent}>One ecosystem.</span>
          </motion.h1>
          <motion.p className={styles.heroSub} {...fadeUp(0.35)}>
            Whether you're building, mentoring, or investing — SPREZOX is designed for you.
            The platform that connects India's startup ecosystem in one intelligent, social space.
          </motion.p>
          <motion.div className={styles.heroCtas} {...fadeUp(0.45)}>
            <button className={styles.btnPrimary} onClick={() => navigate('/signin')}>
              Join the Waitlist <ArrowRight size={16} />
            </button>
            <button className={styles.btnSecondary} onClick={() => navigate('/ventures/app')}>
              Explore the App
            </button>
          </motion.div>
        </div>

        {/* Stats bar */}
        <motion.div
          className={styles.statsBar}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <div className={styles.container}>
            <div className={styles.statsInner}>
              {ecosystemStats.map((s) => (
                <div key={s.label} className={styles.statItem}>
                  <span className={styles.statValue}>{s.value}</span>
                  <span className={styles.statLabel}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Persona cards */}
      <section className={styles.section}>
        <div className={styles.container}>
          <motion.div className={styles.sectionLabel} {...fadeUp()}>Who it's built for</motion.div>
          <motion.h2 className={styles.h2} {...fadeUp(0.1)}>
            Pick your seat at the table.
          </motion.h2>
          <div className={styles.personasGrid}>
            {personas.map((p, i) => (
              <PersonaCard key={p.label} persona={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className={styles.sectionDark}>
        <div className={styles.container}>
          <motion.div className={styles.sectionLabel} {...fadeUp()}>How it works</motion.div>
          <motion.h2 className={styles.h2} {...fadeUp(0.1)}>
            From signup to success in three steps.
          </motion.h2>
          <div className={styles.stepsGrid}>
            {howItWorks.map((step, i) => (
              <motion.div key={step.step} className={styles.stepCard} {...fadeUp(i * 0.12)}>
                <span className={styles.stepNum}>{step.step}</span>
                <h4 className={styles.stepTitle}>{step.title}</h4>
                <p className={styles.stepDesc}>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature spotlight */}
      <section className={styles.section}>
        <div className={styles.container}>
          <motion.div className={styles.sectionLabel} {...fadeUp()}>The Platform</motion.div>
          <motion.h2 className={styles.h2} {...fadeUp(0.1)}>Everything in one place.</motion.h2>

          <div className={styles.featureHighlights}>
            {[
              { icon: BookOpen, color: '#6C63FF', title: 'Learn', desc: 'Expert-curated reels, podcasts, and content on business, finance, and entrepreneurship.' },
              { icon: Users, color: '#A855F7', title: 'Network', desc: 'Discover and connect with investors, mentors, co-founders, and the broader startup ecosystem.' },
              { icon: Lightbulb, color: '#F59E0B', title: 'Ideas', desc: 'Post your startup concept or student project. Get visibility, feedback, and early interest.' },
              { icon: Target, color: '#EC4899', title: 'Raise', desc: 'Access private placement-based crowd funding. Connect with angels and institutional investors.' },
            ].map((f, i) => (
              <motion.div
                key={f.title}
                className={styles.featureHighlight}
                style={{ '--c': f.color }}
                {...fadeUp(i * 0.08)}
              >
                <div className={styles.fhIcon}><f.icon size={20} /></div>
                <div>
                  <h4 className={styles.fhTitle}>{f.title}</h4>
                  <p className={styles.fhDesc}>{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <motion.div className={styles.ctaBox} {...fadeUp()}>
            <div className={styles.ctaGlow} />
            <h2 className={styles.ctaTitle}>Ready to build your empire?</h2>
            <p className={styles.ctaSub}>
              Join our growing waitlist of founders, investors, and mentors across India.
            </p>
            <div className={styles.ctaBtns}>
              <button className={styles.btnPrimary} onClick={() => navigate('/signin')}>
                Join App Waitlist <ArrowRight size={16} />
              </button>
              <button className={styles.btnSecondary} onClick={() => navigate('/ventures/app')}>
                Learn More About the App
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}