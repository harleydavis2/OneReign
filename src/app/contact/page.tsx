"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <section className={styles.pageHero}>
        <div className="container">
          <span className="eyebrow">Get in touch</span>
          <h1 className={styles.heroH1}>
            Let&apos;s build systems<br />
            that actually work.
          </h1>
          <p className={styles.heroSub}>
            Every engagement starts with a direct technical conversation. No sales scripts, no ambiguous estimates.
          </p>
        </div>
      </section>

      <section className={styles.contactSection}>
        <div className="container">
          <div className={styles.layout}>
            {/* Info Sidebar */}
            <div className={styles.infoCol}>
              <div className={styles.infoCard}>
                <h3 className={styles.infoTitle}>Contact Coordinates</h3>

                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Direct Email</span>
                  <a href="mailto:hello@onereign.co" className={styles.infoValue}>
                    hello@onereign.co
                  </a>
                </div>

                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Location</span>
                  <span className={styles.infoValue}>Remote / Global</span>
                </div>

                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Turnaround</span>
                  <span className={styles.infoValue}>&lt; 24 hours</span>
                </div>

                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>LinkedIn</span>
                  <a
                    href="https://linkedin.com/company/onereign"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.infoValue}
                  >
                    company/onereign ↗
                  </a>
                </div>
              </div>

              <div className={styles.infoNote}>
                <p>
                  <strong>No sales middlemen:</strong> You will discuss requirements directly with engineering leadership (Rajesh and the core builders).
                </p>
              </div>
            </div>

            {/* Form */}
            <div className={styles.formCol}>
              {submitted ? (
                <div className={styles.successBox} role="status">
                  <div className={styles.successIcon}>✓</div>
                  <h2 className={styles.successTitle}>Inquiry Received</h2>
                  <p className={styles.successDesc}>
                    Thank you. We will review your project details and follow up at <strong>{form.email}</strong> within 24 hours.
                  </p>
                </div>
              ) : (
                <form className={styles.form} onSubmit={handleSubmit} id="contact-form">
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label htmlFor="name" className={styles.label}>
                        Your Name <span className={styles.required}>*</span>
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={form.name}
                        onChange={handleChange}
                        className={styles.input}
                        placeholder="Full name"
                        autoComplete="name"
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="email" className={styles.label}>
                        Work Email <span className={styles.required}>*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        className={styles.input}
                        placeholder="you@company.com"
                        autoComplete="email"
                      />
                    </div>
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label htmlFor="company" className={styles.label}>
                        Company / Organization
                      </label>
                      <input
                        id="company"
                        name="company"
                        type="text"
                        value={form.company}
                        onChange={handleChange}
                        className={styles.input}
                        placeholder="Company name"
                        autoComplete="organization"
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="budget" className={styles.label}>
                        Engagement Scale
                      </label>
                      <select
                        id="budget"
                        name="budget"
                        value={form.budget}
                        onChange={handleChange}
                        className={`${styles.input} ${styles.select}`}
                      >
                        <option value="">Select scope</option>
                        <option value="starter">Starter — ₹50K+ (MVP / Tool)</option>
                        <option value="growth">Growth — ₹2L+ (Full System)</option>
                        <option value="partnership">Partnership — Custom</option>
                        <option value="discuss">Technical Discovery Session</option>
                      </select>
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="description" className={styles.label}>
                      What needs building or fixing? <span className={styles.required}>*</span>
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      required
                      value={form.description}
                      onChange={handleChange}
                      className={`${styles.input} ${styles.textarea}`}
                      placeholder="Describe your workflows, existing software stack, or technical bottleneck..."
                      rows={5}
                    />
                  </div>

                  <div className={styles.formActions}>
                    <Button type="submit" variant="primary" className={styles.submitBtn}>
                      Send inquiry →
                    </Button>
                    <span className={styles.privacyNote}>
                      We treat all technical details under strict confidentiality.
                    </span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
