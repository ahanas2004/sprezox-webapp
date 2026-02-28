import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { School, Award, Lightbulb, Users, BarChart2, ArrowRight, Check, PhoneCall } from 'lucide-react';
import styles from './SchoolsPage.module.css';

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] },
  };
}

const whyReasons = [
  {
    icon: BarChart2,
    title: 'Business Skills Are Life Skills',
    desc: 'In a rapidly changing world, entrepreneurial thinking — problem-solving, financial literacy, communication — is no longer optional. SPREZOX makes these skills accessible to every student.',
  },
  {
    icon: Lightbulb,
    title: 'Most Programs Are Too Theoretical',
    desc: "Textbooks don't teach students how to launch a business. SPREZOX uses real case studies, live projects, and mentor-backed learning to make entrepreneurship practical and exciting.",
  },
  {
    icon: Users,
    title: 'Community Over Classroom',
    desc: 'SPREZOX connects students with real founders, investors, and mentors — giving them access to a professional network that most adults don\'t have until much later in their careers.',
  },
];

const programs = [
  {
    title: 'Junior MBA',
    duration: '3 – 6 months',
    color: '#14B8A6',
    suitable: 'Classes 9–12 | UG | PG',
    modules: [
      'Business & Finance Fundamentals',
      'Market Research & Customer Discovery',
      'Product Development & Prototyping',
      'Sales, Marketing & Branding',
      'Pitching & Fundraising',
      'Legal & Compliance for Startups',
      'Leadership & Communication',
    ],
  },
  {
    title: 'Workshops & Bootcamps',
    duration: '1 – 3 days',
    color: '#F59E0B',
    suitable: 'All levels',
    modules: [
      'Idea Validation Sprint',
      'Pitch Deck in a Day',
      'Personal Finance for Students',
      'Design Thinking Workshop',
      'Hackathon Prep',
    ],
  },
  {
    title: 'Entrepreneur Club',
    duration: 'Ongoing',
    color: '#A855F7',
    suitable: 'All levels',
    modules: [
      'Monthly guest sessions with founders',
      'Investor Q&A panels',
      'Student startup showcases',
      'Peer mentoring circles',
      'National hackathon preparation',
    ],
  },
];

const process = [
  { step: '01', title: 'Discovery Call', desc: 'We schedule a free 30-minute call to understand your institution, student profile, and goals.' },
  { step: '02', title: 'Custom Program Design', desc: 'We tailor a program — curriculum, duration, and delivery mode — to fit your institution perfectly.' },
  { step: '03', title: 'Onboarding & Kick-off', desc: 'We handle all materials, facilitator briefing, and logistics. You focus on the students.' },
  { step: '04', title: 'Deliver & Measure', desc: 'We run the program, track outcomes, and share a detailed impact report at the end.' },
];

const faqs = [
  { q: 'Is there a cost to bring SPREZOX to our campus?', a: 'Yes — we charge an institutional partnership fee based on program type, duration, and cohort size. We do offer pilot program pricing for early institutions. Get in touch to discuss pricing.' },
  { q: 'Who delivers the programs?', a: 'SPREZOX has a team of trained facilitators and domain experts. For seminars, we bring in real founders, investors, and mentors from our network.' },
  { q: 'Do students receive any certification?', a: 'Yes. Students who complete the Junior MBA or any structured program receive a SPREZOX certificate of completion — recognized within our partner network.' },
  { q: 'What is the minimum cohort size?', a: 'We typically work with cohorts of 25 students or more, though we can discuss smaller groups for pilot programs.' },
  { q: 'How quickly can we get started?', a: 'After the discovery call and program design, most institutions are ready to kick off within 2–4 weeks.' },
];

function FaqItem({ q, a }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div className={`${styles.faqItem} ${open ? styles.faqOpen : ''}`}>
      <button className={styles.faqQ} onClick={() => setOpen(!open)}>
        {q}
        <span className={`${styles.faqChevron} ${open ? styles.faqChevronOpen : ''}`}>+</span>
      </button>
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
    </div>
  );
}

export default function SchoolsPage() {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.container}>
          <motion.div className={styles.tag} {...fadeUp(0.1)}>
            <School size={12} /> For Schools & Colleges
          </motion.div>
          <motion.h1 className={styles.heroTitle} {...fadeUp(0.2)}>
            Bring entrepreneurship
            <br />
            <span className={styles.accent}>to your campus.</span>
          </motion.h1>
          <motion.p className={styles.heroSub} {...fadeUp(0.35)}>
            SPREZOX partners with schools and colleges across India to deliver structured,
            practical entrepreneurship education — from Junior MBA programs to intensive
            workshops and mentor-led seminars.
          </motion.p>
          <motion.div className={styles.heroCtas} {...fadeUp(0.45)}>
            <button className={styles.btnPrimary} onClick={() => navigate('/contact')}>
              <PhoneCall size={15} /> Book a Free Campus Call
            </button>
            <button className={styles.btnSecondary} onClick={() => navigate('/ventures/edtech')}>
              View Full Programs
            </button>
          </motion.div>
        </div>
      </section>

      {/* Why section */}
      <section className={styles.section}>
        <div className={styles.container}>
          <motion.div className={styles.sectionLabel} {...fadeUp()}>Why it matters</motion.div>
          <motion.h2 className={styles.h2} {...fadeUp(0.1)}>
            Your students deserve more
            <br />than a textbook education.
          </motion.h2>
          <div className={styles.reasonsGrid}>
            {whyReasons.map((r, i) => (
              <motion.div key={r.title} className={styles.reasonCard} {...fadeUp(i * 0.1)}>
                <div className={styles.reasonIcon}><r.icon size={22} /></div>
                <h4 className={styles.reasonTitle}>{r.title}</h4>
                <p className={styles.reasonDesc}>{r.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className={styles.sectionDark}>
        <div className={styles.container}>
          <motion.div className={styles.sectionLabel} {...fadeUp()}>Our Programs</motion.div>
          <motion.h2 className={styles.h2} {...fadeUp(0.1)}>Choose what fits your institution.</motion.h2>
          <div className={styles.programsGrid}>
            {programs.map((p, i) => (
              <motion.div
                key={p.title}
                className={styles.programCard}
                style={{ '--c': p.color }}
                {...fadeUp(i * 0.1)}
              >
                <div className={styles.programHeader}>
                  <div>
                    <h3 className={styles.programTitle}>{p.title}</h3>
                    <p className={styles.programSuitable}>{p.suitable}</p>
                  </div>
                  <span className={styles.programDuration}>{p.duration}</span>
                </div>
                <ul className={styles.moduleList}>
                  {p.modules.map((m) => (
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

      {/* Process */}
      <section className={styles.section}>
        <div className={styles.container}>
          <motion.div className={styles.sectionLabel} {...fadeUp()}>How it works</motion.div>
          <motion.h2 className={styles.h2} {...fadeUp(0.1)}>Simple. Seamless. Impactful.</motion.h2>
          <div className={styles.processGrid}>
            {process.map((step, i) => (
              <motion.div key={step.step} className={styles.processCard} {...fadeUp(i * 0.1)}>
                <span className={styles.processNum}>{step.step}</span>
                <div className={styles.processLine} />
                <h4 className={styles.processTitle}>{step.title}</h4>
                <p className={styles.processDesc}>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What institutions get */}
      <section className={styles.sectionDark}>
        <div className={styles.container}>
          <motion.div className={styles.sectionLabel} {...fadeUp()}>Partnership Perks</motion.div>
          <motion.h2 className={styles.h2} {...fadeUp(0.1)}>What your institution gets.</motion.h2>
          <div className={styles.perksGrid}>
            {[
              { icon: '📚', label: 'Full Curriculum', desc: 'Pre-designed modules, slides, workbooks, and assessments — all ready to go.' },
              { icon: '🎓', label: 'Certified Students', desc: 'Students complete with a SPREZOX certificate recognised across our network.' },
              { icon: '🤝', label: 'Mentor Network Access', desc: 'Your students get access to SPREZOX mentors and founders during and after the program.' },
              { icon: '📊', label: 'Impact Reports', desc: 'Detailed post-program reports on outcomes, student performance, and engagement.' },
              { icon: '🌐', label: 'Ecosystem Listing', desc: 'Your institution gets listed as a SPREZOX partner on our platform and website.' },
              { icon: '🚀', label: 'Student Startup Support', desc: 'Top students can fast-track into the SPREZOX app ecosystem for ongoing support.' },
            ].map((p, i) => (
              <motion.div key={p.label} className={styles.perkCard} {...fadeUp(i * 0.07)}>
                <span className={styles.perkEmoji}>{p.icon}</span>
                <h4 className={styles.perkLabel}>{p.label}</h4>
                <p className={styles.perkDesc}>{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className={styles.section}>
        <div className={styles.container}>
          <motion.div className={styles.sectionLabel} {...fadeUp()}>FAQ</motion.div>
          <motion.h2 className={styles.h2} {...fadeUp(0.1)}>Common questions from institutions.</motion.h2>
          <motion.div className={styles.faqList} {...fadeUp(0.2)}>
            {faqs.map((f) => <FaqItem key={f.q} {...f} />)}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <motion.div className={styles.ctaBox} {...fadeUp()}>
            <Award size={36} className={styles.ctaIcon} />
            <h2 className={styles.ctaTitle}>
              Let's bring entrepreneurship to your campus.
            </h2>
            <p className={styles.ctaSub}>
              Book a free 30-minute discovery call with our team. No commitment, no pressure —
              just a conversation about what's possible for your students.
            </p>
            <button className={styles.btnPrimary} onClick={() => navigate('/contact')}>
              <PhoneCall size={15} /> Book a Free Campus Call
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}