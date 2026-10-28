"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Container from "@/components/ui/Container";
import { faqs, type FaqItem } from "@/content/site";
import styles from "./Faq.module.css";

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  // Business rule: If an answer contains "TODO", do not include that question
  // in the JSON-LD or the rendered page until it is confirmed and filled in.
  const activeFaqs: FaqItem[] = faqs.filter(
    (faq) => !faq.answer.includes("TODO")
  );

  const toggleItem = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  // Structured Data (FAQPage JSON-LD)
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: activeFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <section className={styles.faqSection} id="faqs">
      {/* FAQPage JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Container>
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowDot} />
            <span>Common Questions</span>
          </div>
          <h2 className={styles.sectionTitle}>Questions, answered.</h2>
        </div>

        {/* ── Accordion List ───────────────────────────────────────── */}
        <div className={styles.accordionList}>
          {activeFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const questionId = `faq-question-${index}`;
            const answerId = `faq-answer-${index}`;

            return (
              <div key={faq.question} className={styles.accordionItem}>
                <button
                  type="button"
                  id={questionId}
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                  onClick={() => toggleItem(index)}
                  className={styles.accordionTrigger}
                >
                  <span className={styles.questionText}>{faq.question}</span>
                  <div
                    className={`${styles.iconWrap} ${
                      isOpen ? styles.iconRotated : ""
                    }`}
                    aria-hidden="true"
                  >
                    <Plus size={18} strokeWidth={2} />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={answerId}
                      role="region"
                      aria-labelledby={questionId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        duration: 0.3,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="overflow-hidden"
                    >
                      <p className={styles.answerText}>{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

