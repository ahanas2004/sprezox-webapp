import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, MessageSquare, Building, BarChart2, Send, Check } from 'lucide-react';
import styles from './ContactPage.module.css';

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] },
  };
}

const contactTypes = [
  {
    icon: MessageSquare,
    title: 'General Inquiries',
    desc: 'Questions about the platform, the app, our story, or anything else.',
    detail: 'hello@sprezox.com',
    color: '#6C63FF',
  },
  {
    icon: Building,
    title: 'Institution Partnerships',
    desc: 'Interested in bringing our programs to your school or college? Let\'s talk.',
    detail: 'partnerships@sprezox.com',
    color: '#14B8A6',
  },
  {
    icon: BarChart2,
    title: 'Investor Relations',
    desc: 'For angel investors, VCs, or anyone interested in backing SPREZOX itself.',
    detail: 'invest@sprezox.com',
    color: '#A855F7',
  },
];

const inquiryTypes = [
  'General Inquiry',
  'Institution Partnership',
  'App Waitlist',
  'Investor Relations',
  'Media / Press',
  'Other',
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '', email: '', organization: '', inquiryType: '', message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulated submit — replace with actual API call (e.g. Supabase insert or EmailJS)
    await new Promise((res) => setTimeout(res, 1400));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.container}>
          <motion.div className={styles.tag} {...fadeUp(0.1)}>Contact</motion.div>
          <motion.h1 className={styles.heroTitle} {...fadeUp(0.2)}>
            Let's talk.
            <br />
            <span className={styles.accent}>We're in Chennai.</span>
          </motion.h1>
          <motion.p className={styles.heroSub} {...fadeUp(0.35)}>
            Whether you're a founder, an educator, an investor, or just curious — our team
            would love to hear from you. Pick the right inbox below or fill out the form.
          </motion.p>
        </div>
      </section>

      {/* Contact type cards */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.cardsGrid}>
            {contactTypes.map((c, i) => (
              <motion.a
                key={c.title}
                href={`mailto:${c.detail}`}
                className={styles.contactCard}
                style={{ '--c': c.color }}
                {...fadeUp(i * 0.1)}
              >
                <div className={styles.cardIcon}><c.icon size={22} /></div>
                <h3 className={styles.cardTitle}>{c.title}</h3>
                <p className={styles.cardDesc}>{c.desc}</p>
                <span className={styles.cardEmail}>
                  <Mail size={13} />
                  {c.detail}
                </span>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Form + Info split */}
      <section className={styles.formSection}>
        <div className={styles.container}>
          <div className={styles.formLayout}>
            {/* Left: form */}
            <motion.div className={styles.formSide} {...fadeUp(0)}>
              <h2 className={styles.formTitle}>Send us a message</h2>
              <p className={styles.formSub}>
                Fill out the form and we'll get back to you within 24–48 hours.
              </p>

              {submitted ? (
                <motion.div
                  className={styles.successState}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
                >
                  <div className={styles.successIcon}><Check size={28} /></div>
                  <h3 className={styles.successTitle}>Message Received!</h3>
                  <p className={styles.successText}>
                    Thanks for reaching out. We'll be in touch within 24–48 hours.
                  </p>
                </motion.div>
              ) : (
                <form className={styles.form} onSubmit={handleSubmit}>
                  <div className={styles.row}>
                    <div className={styles.field}>
                      <label className={styles.label}>Full Name *</label>
                      <input
                        name="name"
                        type="text"
                        required
                        className={styles.input}
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>
                    <div className={styles.field}>
                      <label className={styles.label}>Email Address *</label>
                      <input
                        name="email"
                        type="email"
                        required
                        className={styles.input}
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className={styles.row}>
                    <div className={styles.field}>
                      <label className={styles.label}>Organization</label>
                      <input
                        name="organization"
                        type="text"
                        className={styles.input}
                        placeholder="School, startup, company..."
                        value={formData.organization}
                        onChange={handleChange}
                      />
                    </div>
                    <div className={styles.field}>
                      <label className={styles.label}>Inquiry Type *</label>
                      <select
                        name="inquiryType"
                        required
                        className={styles.select}
                        value={formData.inquiryType}
                        onChange={handleChange}
                      >
                        <option value="">Select type...</option>
                        {inquiryTypes.map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label}>Message *</label>
                    <textarea
                      name="message"
                      required
                      className={styles.textarea}
                      placeholder="Tell us what's on your mind..."
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                    />
                  </div>

                  <button type="submit" className={styles.submitBtn} disabled={loading}>
                    {loading ? (
                      <span className={styles.loadingDots}>
                        <span /><span /><span />
                      </span>
                    ) : (
                      <><Send size={16} /> Send Message</>
                    )}
                  </button>
                </form>
              )}
            </motion.div>

            {/* Right: info */}
            <motion.div className={styles.infoSide} {...fadeUp(0.15)}>
              <h2 className={styles.infoTitle}>Find us here</h2>

              <div className={styles.infoCards}>
                <div className={styles.infoCard}>
                  <MapPin size={18} className={styles.infoIcon} />
                  <div>
                    <p className={styles.infoLabel}>Office</p>
                    <p className={styles.infoValue}>Chennai, Tamil Nadu, India</p>
                  </div>
                </div>
                <div className={styles.infoCard}>
                  <Mail size={18} className={styles.infoIcon} />
                  <div>
                    <p className={styles.infoLabel}>General Email</p>
                    <a href="mailto:hello@sprezox.com" className={styles.infoValue}>hello@sprezox.com</a>
                  </div>
                </div>
                <div className={styles.infoCard}>
                  <Phone size={18} className={styles.infoIcon} />
                  <div>
                    <p className={styles.infoLabel}>Phone</p>
                    <p className={styles.infoValue}>+91 (Contact form preferred)</p>
                  </div>
                </div>
              </div>

              {/* Map placeholder */}
              <div className={styles.mapPlaceholder}>
                <div className={styles.mapInner}>
                  <MapPin size={32} className={styles.mapPin} />
                  <p className={styles.mapLabel}>Chennai, India</p>
                  <a
                    href="https://maps.google.com/?q=Chennai,+Tamil+Nadu,+India"
                    target="_blank"
                    rel="noreferrer"
                    className={styles.mapLink}
                  >
                    Open in Google Maps →
                  </a>
                </div>
              </div>

              {/* Response time */}
              <div className={styles.responseInfo}>
                <div className={styles.responseDot} />
                <p>We typically respond within <strong>24–48 hours</strong> on weekdays.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}