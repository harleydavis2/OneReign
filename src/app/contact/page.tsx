"use client";
import { useState } from "react";
import styles from "./page.module.css";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    budget: "",
    description: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <section className={styles.pageHero}>
        <div className={styles.heroBg} />
        <div className="container">
          <p className="eyebrow">Get in Touch</p>
          <h1 className={styles.heroH1}>
            Let&apos;s build something<br />
            <span className={styles.accent}>that actually works.</span>
          </h1>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.layout}>
            {/* Info */}
            <div className={styles.infoCol}>
              <div className={styles.infoCard}>
                <h3 className={styles.infoTitle}>Contact Details</h3>
                {[
                  { label: "Email", value: "hello@onereign.co", href: "mailto:hello@onereign.co" },
                  { label: "Location", value: "Remote / Global", href: undefined },
                  { label: "Response Time", value: "< 24 hours", href: undefined },
                ].map((row) => (
                  <div key={row.label} className={styles.infoRow}>
                    <span className={styles.infoLabel}>{row.label}</span>
                    {row.href ? (
                      <a href={row.href} className={styles.infoValue}>{row.value}</a>
                    ) : (
                      <span className={styles.infoValue}>{row.value}</span>
                    )}
                  </div>
                ))}
              </div>

              <div className={styles.infoNote}>
                <p>Every project starts with a conversation — no commitment required. Tell us what is broken. We&apos;ll show you what is possible.</p>
              </div>
            </div>

            {/* Form */}
            <div className={styles.formCol}>
              {submitted ? (
                <div className={styles.success}>
                  <span className={styles.successIcon}>✓</span>
                  <h3>Message sent!</h3>
                  <p>We&apos;ll be in touch within 24 hours.</p>
                </div>
              ) : (
                <form className={styles.form} onSubmit={handleSubmit} id="contact-form">
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label htmlFor="name" className={styles.label}>Name *</label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={form.name}
                        onChange={handleChange}
                        className={styles.input}
                        placeholder="Your full name"
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="email" className={styles.label}>Email *</label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        className={styles.input}
                        placeholder="you@company.com"
                      />
                    </div>
                  </div>
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label htmlFor="company" className={styles.label}>Company</label>
                      <input
                        id="company"
                        name="company"
                        type="text"
                        value={form.company}
                        onChange={handleChange}
                        className={styles.input}
                        placeholder="Your company name"
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="budget" className={styles.label}>Budget Range</label>
                      <select
                        id="budget"
                        name="budget"
                        value={form.budget}
                        onChange={handleChange}
                        className={`${styles.input} ${styles.select}`}
                      >
                        <option value="">Select a range</option>
                        <option value="starter">Starter — ₹50K+</option>
                        <option value="growth">Growth — ₹2L+</option>
                        <option value="partnership">Partnership — Custom</option>
                        <option value="discuss">Prefer to discuss</option>
                      </select>
                    </div>
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="description" className={styles.label}>Project Description *</label>
                    <textarea
                      id="description"
                      name="description"
                      required
                      value={form.description}
                      onChange={handleChange}
                      className={`${styles.input} ${styles.textarea}`}
                      placeholder="Tell us what you're building or what's broken..."
                      rows={6}
                    />
                  </div>
                  <button type="submit" className={`btn btn-primary ${styles.submitBtn}`} id="submit-contact">
                    SEND MESSAGE →
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
