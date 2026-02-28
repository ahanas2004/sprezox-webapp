import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GraduationCap, Lightbulb, Users, Award, Calendar, BookOpen, ArrowRight, Check, School } from 'lucide-react';
import styles from './EdTechPage.module.css';

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] },
  };
}

const offerings = [
  {
    icon: GraduationCap,
    title: 'Junior MBA Program',
    color: '#14B8A6',
    duration: '3–6 months',
    desc: 'A structured curriculum covering business fundamentals, financial literacy, marketing, operations, and entrepreneurial thinking — delivered in a school or college setting.',
    modules: ['Business & Finance Basics', 'Market Research & Validation', 'Product Thinking', 'Sales & Marketing', 'Pitching & Fundraising', 'Legal & Compliance Basics'],
  },
  {
    icon: Lightbulb,
    title: 'Workshops & Bootcamps',
    color: '#F59E0B',
    duration: '1–3 days',
    desc: 'Intensive, hands-on sessions focused on specific skills — idea validation, pitch decks, financial modelling, and design thinking.',
    modules: ['Idea Validation Sprint', 'Pitch Deck Masterclass', 'Finance Basics for Founders', 'Design Thinking Workshop', 'Hackathon Ready'],
  },
  {
    icon: Users,
    title: 'Seminars & Mentorship',
    color: '#A855F7',
    duration: 'Ongoing',
    desc: 'Guest lectures from real founders, investors, and industry leaders. Followed by one-on-one or group mentorship through the SPREZOX network.',
    modules: ['Founder & Investor Talks', 'Panel Discussions', '1-on-1 Mentor Sessions', 'Ongoing Entrepreneur Clubs'],
  },
];

const outcomes = [
  { icon: '🚀', title: 'Student Startups Launched', desc: 'Students graduate with real business ideas, validated MVPs, and sometimes even early revenue.' },
  { icon: '🤝', title: 'Internship Opportunities', desc: 'Top students get connected to internship opportunities within the SPREZOX startup network.' },
  { icon: '🏆', title: 'Certified & Portfolio-Ready', desc: 'Certificates, project portfolios, and hackathon wins that stand out on any resume or college application.' },
  { icon: '🌐', title: 'Lifelong Network Access', desc: 'Students join the SPREZOX ecosystem — a network that grows with them throughout their career.' },
];

const delivery = [
  { label: 'On-Campus', icon: School, desc: 'We come to you. Full in-person delivery with our trained facilitators at your institution.' },
  { label: 'Hybrid', icon: BookOpen, desc: 'Blended learning — online modules + periodic in-person sessions for maximum flexibility.' },
  { label: 'Online', icon: Award, desc: 'Fully virtual delivery for institutions anywhere in India, with live sessions and recorded content.' },
];

const targets = [
  { label: 'Schools', range: 'Classes 9–12', desc: 'Build the entrepreneurial mindset early. Our school programs are age-appropriate, engaging, and fun.' },
  { label: 'UG Colleges', range: 'Undergraduate', desc: 'Deep-dive programs for students who are ready to launch their first venture or join one.' },
  { label: 'PG Colleges', range: 'Postgraduate', desc: 'Advanced modules on fundraising, scaling, and leadership for students with existing business knowledge.' },
];

export default function EdTechPage() {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.container}>
          <motion.div className={styles.tag} {...fadeUp(0.1)}>
            <GraduationCap size={12} /> Venture 02 — EdTech Programs
          </motion.div>
          <motion.h1 className={styles.heroTitle} {...fadeUp(0.2)}>
            Entrepreneurship education.
            <br />
            <span className={styles.accent}>Delivered to your campus.</span>
          </motion.h1>
          <motion.p className={styles.heroSub} {...fadeUp(0.35)}>
            SPREZOX delivers Junior MBA programs, workshops, seminars, and mentorship to schools
            and colleges across India — equipping students with practical business and financial
            skills before they graduate.
          </motion.p>
          <motion.div className={styles.heroCtas} {...fadeUp(0.45)}>
            <button className={styles.btnPrimary} onClick={() => navigate('/contact')}>
              Book a Campus Call <ArrowRight size={16} />
            </button>
            <button className={styles.btnSecondary} onClick={() => navigate('/schools-colleges')}>
              Learn More
            </button>
          </motion.div>
        </div>
      </section>

      {/* For Whom */}
      <section className={styles.section}>
        <div className={styles.container}>
          <motion.div className={styles.sectionLabel} {...fadeUp()}>Who we work with</motion.div>
          <motion.h2 className={styles.h2} {...fadeUp(0.1)}>Designed for every level of education.</motion.h2>
          <div className={styles.targetGrid}>
            {targets.map((t, i) => (
              <motion.div key={t.label} className={styles.targetCard} {...fadeUp(i * 0.1)}>
                <div className={styles.targetBadge}>{t.range}</div>
                <h3 className={styles.targetTitle}>{t.label}</h3>
                <p className={styles.targetDesc}>{t.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Offerings */}
      <section className={styles.sectionDark}>
        <div className={styles.container}>
          <motion.div className={styles.sectionLabel} {...fadeUp()}>Our Programs</motion.div>
          <motion.h2 className={styles.h2} {...fadeUp(0.1)}>What we bring to your campus.</motion.h2>

          <div className={styles.offeringsGrid}>
            {offerings.map((o, i) => (
              <motion.div
                key={o.title}
                className={styles.offeringCard}
                style={{ '--c': o.color }}
                {...fadeUp(i * 0.12)}
              >
                <div className={styles.offeringHeader}>
                  <div className={styles.offeringIcon}><o.icon size={22} /></div>
                  <span className={styles.offeringDuration}>{o.duration}</span>
                </div>
                <h3 className={styles.offeringTitle}>{o.title}</h3>
                <p className={styles.offeringDesc}>{o.desc}</p>
                <ul className={styles.moduleList}>
                  {o.modules.map((m) => (
                    <li key={m}>
                      <Check size={12} className={styles.checkIcon} />
                      {m}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section className={styles.section}>
        <div className={styles.container}>
          <motion.div className={styles.sectionLabel} {...fadeUp()}>Outcomes</motion.div>
          <motion.h2 className={styles.h2} {...fadeUp(0.1)}>
            What students walk away with.
          </motion.h2>
          <div className={styles.outcomesGrid}>
            {outcomes.map((o, i) => (
              <motion.div key={o.title} className={styles.outcomeCard} {...fadeUp(i * 0.1)}>
                <span className={styles.outcomeEmoji}>{o.icon}</span>
                <h4 className={styles.outcomeTitle}>{o.title}</h4>
                <p className={styles.outcomeDesc}>{o.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Delivery model */}
      <section className={styles.sectionDark}>
        <div className={styles.container}>
          <motion.div className={styles.sectionLabel} {...fadeUp()}>Implementation</motion.div>
          <motion.h2 className={styles.h2} {...fadeUp(0.1)}>We work the way you work.</motion.h2>
          <div className={styles.deliveryGrid}>
            {delivery.map((d, i) => (
              <motion.div key={d.label} className={styles.deliveryCard} {...fadeUp(i * 0.1)}>
                <div className={styles.deliveryIcon}><d.icon size={22} /></div>
                <h4 className={styles.deliveryLabel}>{d.label}</h4>
                <p className={styles.deliveryDesc}>{d.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial placeholder */}
      <section className={styles.section}>
        <div className={styles.container}>
          <motion.div className={styles.sectionLabel} {...fadeUp()}>From the community</motion.div>
          <motion.h2 className={styles.h2} {...fadeUp(0.1)}>What institutions say.</motion.h2>
          <motion.div className={styles.testimonialPlaceholder} {...fadeUp(0.2)}>
            <p className={styles.testimonialNote}>
              🚀 We're actively running pilot programs. Testimonials coming soon — reach out to be part of our founding institution cohort.
            </p>
            <button className={styles.btnPrimary} onClick={() => navigate('/contact')}>
              Become a Pilot Institution <ArrowRight size={16} />
            </button>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <motion.div className={styles.ctaBox} {...fadeUp()}>
            <h2 className={styles.ctaTitle}>Ready to bring SPREZOX to your campus?</h2>
            <p className={styles.ctaSub}>
              Book a free 30-minute discovery call. We'll walk you through the program, answer
              every question, and design a plan that fits your institution.
            </p>
            <button className={styles.btnPrimary} onClick={() => navigate('/contact')}>
              Book a Campus Call <ArrowRight size={16} />
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}