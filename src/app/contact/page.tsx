"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import siteContent from "@/content/site";
import styles from "./page.module.css";

export default function ContactPage() {
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    budget: "",
    description: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(siteContent.contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
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
            Let&apos;s build systems
            <br />
            that actually work.
          </h1>
          <p className={styles.heroSub}>
            Every engagement starts with a direct technical conversation. No
            sales scripts, no ambiguous estimates.
          </p>
        </div>
      </section>

      {/* Two Prominent Clickable Contact Cards (Email + WhatsApp) */}
      <section className="border-b border-white/10 bg-bg py-10">
        <div className="container">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Card 1: Email */}
            <a
              href={siteContent.contact.emailUrl}
              className="group relative flex flex-col justify-between rounded-xl border border-white/10 bg-surface p-6 sm:p-8 transition-all duration-200 hover:-translate-y-0.5 hover:border-accent hover:shadow-[0_0_24px_rgba(198,255,77,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              aria-label={`Send email to ${siteContent.contact.email}`}
            >
              <div>
                <div className="flex items-center justify-between gap-4">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-bg px-3 py-1 font-display-sans text-xs font-medium text-muted">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    Direct Email
                  </span>
                  <span className="font-display-sans text-xs text-muted">
                    {siteContent.contact.responseSla}
                  </span>
                </div>

                <h3 className="mt-4 font-display-sans text-lg font-semibold tracking-tight text-text sm:text-xl group-hover:text-accent transition-colors">
                  {siteContent.contact.email}
                </h3>
                <p className="mt-1 text-xs text-muted">
                  Click to open mail client, or copy address below.
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between pt-4 border-t border-white/5">
                <span className="text-xs font-semibold text-text group-hover:text-accent flex items-center gap-1 transition-colors">
                  Compose email <span>↗</span>
                </span>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-1.5 rounded-md border border-white/15 bg-bg px-3 py-1.5 font-display-sans text-xs font-medium text-text transition-all hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent active:scale-95"
                  aria-label="Copy email address to clipboard"
                >
                  {copied ? (
                    <>
                      <span className="text-accent">✓</span> Copied!
                    </>
                  ) : (
                    <>
                      <span>📋</span> Copy address
                    </>
                  )}
                </button>
              </div>
            </a>

            {/* Card 2: WhatsApp */}
            <a
              href={siteContent.contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col justify-between rounded-xl border border-white/10 bg-surface p-6 sm:p-8 transition-all duration-200 hover:-translate-y-0.5 hover:border-accent hover:shadow-[0_0_24px_rgba(198,255,77,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              aria-label="Chat on WhatsApp with OneReign"
            >
              <div>
                <div className="flex items-center justify-between gap-4">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-bg px-3 py-1 font-display-sans text-xs font-medium text-muted">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_rgba(198,255,77,0.8)]" />
                    WhatsApp Direct
                  </span>
                  <span className="font-display-sans text-xs font-medium text-accent">
                    Fastest Response
                  </span>
                </div>

                <h3 className="mt-4 font-display-sans text-lg font-semibold tracking-tight text-text sm:text-xl group-hover:text-accent transition-colors">
                  +{siteContent.contact.whatsappNumber}
                </h3>
                <p className="mt-1 text-xs text-muted">
                  Direct instant chat with our engineering leadership.
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between pt-4 border-t border-white/5">
                <span className="text-xs font-semibold text-text group-hover:text-accent flex items-center gap-1 transition-colors">
                  Open WhatsApp Chat <span>↗</span>
                </span>
                <span className="rounded-md border border-accent/20 bg-accent/10 px-2.5 py-1 text-[11px] font-medium text-accent">
                  Online
                </span>
              </div>
            </a>
          </div>
        </div>
      </section>

      <section className={styles.contactSection}>
        <div className="container">
          <div className={styles.layout}>
            {/* Info Sidebar */}
            <div className={styles.infoCol}>
              <div className={styles.infoCard}>
                <h3 className={styles.infoTitle}>Company Details</h3>

                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Direct Email</span>
                  <a
                    href={siteContent.contact.emailUrl}
                    className={styles.infoValue}
                  >
                    {siteContent.contact.email}
                  </a>
                </div>

                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>WhatsApp / Phone</span>
                  <a
                    href={siteContent.contact.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.infoValue}
                  >
                    +{siteContent.contact.whatsappNumber} ↗
                  </a>
                </div>

                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Location</span>
                  <span className={styles.infoValue}>
                    {siteContent.brand.established} · {siteContent.brand.location}
                  </span>
                </div>

                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Turnaround</span>
                  <span className={styles.infoValue}>
                    {siteContent.contact.responseSla}
                  </span>
                </div>

                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>LinkedIn</span>
                  <a
                    href={siteContent.socials.linkedin}
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
                  <strong>No sales middlemen:</strong> You will discuss
                  requirements directly with engineering leadership (Rajesh and
                  the core builders).
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
                    Thank you. We will review your project details and follow up
                    at <strong>{form.email}</strong> within 24 hours.
                  </p>
                </div>
              ) : (
                <form
                  className={styles.form}
                  onSubmit={handleSubmit}
                  id="contact-form"
                >
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
                        <option value="starter">
                          Starter — ₹50K+ (MVP / Tool)
                        </option>
                        <option value="growth">
                          Growth — ₹2L+ (Full System)
                        </option>
                        <option value="partnership">
                          Partnership — Custom
                        </option>
                        <option value="discuss">
                          Technical Discovery Session
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="description" className={styles.label}>
                      What needs building or fixing?{" "}
                      <span className={styles.required}>*</span>
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
                    <Button
                      type="submit"
                      variant="primary"
                      className={styles.submitBtn}
                    >
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
