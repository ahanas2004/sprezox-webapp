import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Users, TrendingUp, Smartphone, ChevronDown, ArrowRight, Check } from 'lucide-react';
import styles from './AppVenturePage.module.css';

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] },
  };
}

const features = [
  {
    icon: BookOpen,
    title: 'Learning',
    color: '#6C63FF',
    desc: 'Short-form video reels, podcasts, and expert-led content on business, finance, and entrepreneurship. Think of it as LinkedIn meets TikTok — but curated for founders.',
    points: ['Daily expert reels from proven founders', 'Finance & business fundamentals', 'Pitch-ready frameworks and startup playbooks'],
  },
  {
    icon: Users,
    title: 'Networking',
    color: '#A855F7',
    desc: 'AI-powered matching that connects you with the right mentors, co-founders, and investors at the right time — based on your goals, stage, and domain.',
    points: ['Connect with VCs, angels, and incubators', 'Find co-founders and collaborators', 'Get matched with domain mentors'],
  },
  {
    icon: TrendingUp,
    title: 'Funding',
    color: '#EC4899',
    desc: 'Access private placement-based funding through a curated network of crowd investors. We democratise early-stage capital for Indian startups.',
    points: ['Private placement funding rounds', 'Curated crowd investor network', 'Transparent deal flow visibility'],
  },
];

const audiences = [
  { emoji: '💡', title: 'Aspiring Entrepreneurs', desc: 'You have an idea. We give you the knowledge, network, and capital to make it real.' },
  { emoji: '🎓', title: 'Students & Early Professionals', desc: 'Start building your ecosystem before you even graduate. Future-proof your career.' },
  { emoji: '💰', title: 'Investors & Ecosystem Players', desc: 'Discover curated deal flow and connect with the next generation of Indian founders.' },
];

const faqs = [
  { q: 'Is the funding feature SEBI-regulated?', a: 'We work within applicable legal frameworks for private placements in India. All funding features are designed in consultation with legal and financial advisors. We recommend consulting a CA or lawyer before participating in any investment activity.' },
  { q: 'How do private placements work on SPREZOX?', a: 'Private placements on SPREZOX connect early-stage startups directly with a curated network of accredited investors. It\'s an invitation-only process where startups apply, are vetted, and then presented to interested investors — all within the platform.' },
  { q: 'Is SPREZOX free to use?', a: 'The core learning and networking features will be accessible with a free tier. Premium features — including advanced AI matching, investor introductions, and funding access — will be part of a paid subscription.' },
  { q: 'When is the app launching?', a: 'We\'re currently in pre-launch and building our waitlist. Early waitlist members will get priority access and exclusive benefits at launch.' },
  { q: 'Who can join?', a: 'Anyone with an entrepreneurial mindset — whether you\'re a student, a working professional with a side idea, a serial founder, or an investor looking for India\'s next big thing.' },
];

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`${styles.faqItem} ${open ? styles.faqOpen : ''}`}>
      <button className={styles.faqQ} onClick={() => setOpen(!open)}>
        {q}
        <ChevronDown size={18} className={`${styles.faqChevron} ${open ? styles.faqChevronOpen : ''}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            className={styles.faqA}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <p>{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function AppVenturePage() {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.container}>
          <motion.div className={styles.tag} {...fadeUp(0.1)}>
            <Smartphone size={12} /> Venture 01 — Entrepreneurial App
          </motion.div>
          <motion.h1 className={styles.heroTitle} {...fadeUp(0.2)}>
            The startup ecosystem.
            <br />
            <span className={styles.accent}>In your pocket.</span>
          </motion.h1>
          <motion.p className={styles.heroSub} {...fadeUp(0.35)}>
            One app to learn from experts, network with investors and mentors, and access
            early-stage funding — built for India's next generation of founders.
          </motion.p>
          <motion.div className={styles.heroCtas} {...fadeUp(0.45)}>
            <button className={styles.btnPrimary} onClick={() => navigate('/signin')}>
              Join Waitlist <ArrowRight size={16} />
            </button>
            <button className={styles.btnSecondary} onClick={() => navigate('/contact')}>
              Learn More
            </button>
          </motion.div>
        </div>
      </section>

      {/* App preview placeholder */}
      <section className={styles.previewSection}>
        <div className={styles.container}>
          <motion.div className={styles.appPreview} {...fadeUp()}>
            <div className={styles.appPhone}>
              <div className={styles.appScreen}>
                <div className={styles.appBar} />
                <div className={styles.appContent}>
                  {['Learn Feed', 'Network Hub', 'Ideas Board'].map((label, i) => (
                    <div key={label} className={styles.appCard} style={{ animationDelay: `${i * 0.3}s` }}>
                      <div className={styles.appCardThumb} />
                      <div className={styles.appCardText}>
                        <div className={styles.appCardLine} style={{ width: '70%' }} />
                        <div className={styles.appCardLine} style={{ width: '50%' }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className={styles.appGlow} />
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className={styles.section}>
        <div className={styles.container}>
          <motion.div className={styles.sectionLabel} {...fadeUp()}>Core Features</motion.div>
          <motion.h2 className={styles.h2} {...fadeUp(0.1)}>Three pillars. One platform.</motion.h2>

          <div className={styles.featuresStack}>
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                className={styles.featureRow}
                style={{ '--c': f.color }}
                {...fadeUp(i * 0.12)}
              >
                <div className={styles.featureIconWrap}>
                  <f.icon size={24} />
                </div>
                <div className={styles.featureBody}>
                  <h3 className={styles.featureTitle}>{f.title}</h3>
                  <p className={styles.featureDesc}>{f.desc}</p>
                  <ul className={styles.featurePoints}>
                    {f.points.map((pt) => (
                      <li key={pt}>
                        <Check size={13} className={styles.checkIcon} />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section className={styles.sectionDark}>
        <div className={styles.container}>
          <motion.div className={styles.sectionLabel} {...fadeUp()}>Who it's for</motion.div>
          <motion.h2 className={styles.h2} {...fadeUp(0.1)}>Built for every ambition.</motion.h2>
          <div className={styles.audienceGrid}>
            {audiences.map((a, i) => (
              <motion.div key={a.title} className={styles.audienceCard} {...fadeUp(i * 0.1)}>
                <span className={styles.audienceEmoji}>{a.emoji}</span>
                <h4 className={styles.audienceTitle}>{a.title}</h4>
                <p className={styles.audienceDesc}>{a.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className={styles.section}>
        <div className={styles.container}>
          <motion.div className={styles.sectionLabel} {...fadeUp()}>FAQ</motion.div>
          <motion.h2 className={styles.h2} {...fadeUp(0.1)}>Got questions? We've got answers.</motion.h2>
          <motion.div className={styles.faqList} {...fadeUp(0.2)}>
            {faqs.map((faq) => (
              <FaqItem key={faq.q} {...faq} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <motion.div className={styles.ctaBox} {...fadeUp()}>
            <h2 className={styles.ctaTitle}>Be first in line.</h2>
            <p className={styles.ctaSub}>
              Join our waitlist and get priority access when we launch — plus exclusive early-bird benefits.
            </p>
            <button className={styles.btnPrimary} onClick={() => navigate('/signin')}>
              Join Waitlist <ArrowRight size={16} />
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}