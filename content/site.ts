export interface NavItem {
  label: string;
  href: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  label: string;
}

export interface TechStackItem {
  name: string;
  icon: string;
}

export interface WorkItem {
  title: string;
  project: "faultline" | "quiet";
  image: string;
  href: string;
  status: "Live" | "In progress";
}

export interface ServiceItem {
  num: string;
  title: string;
  slug: string;
  line1: string;
  line2: string;
  icon: "bot" | "code" | "sparkles" | "trending-up" | "cloud" | "network";
  outcome: string;
  bullets: string[];
}

export interface IntegrationItem {
  name: string;
  icon: string;
}

export interface PricingTier {
  name: string;
  from: string;
  summary: string;
  features: string[];
  ctaLabel: string;
  href: string;
  popular?: boolean;
}

export interface ApproachCardItem {
  id: string;
  title: string;
  description: string;
}

export interface ProofStat {
  value: number;
  suffix?: string;
  label: string;
}

export interface ProofConfig {
  stats: ProofStat[];
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  initials?: string;
  rating?: number;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface SiteConfig {
  brand: {
    name: string;
    legalName: string;
    tagline: string;
    subtitle: string;
    established: string;
    location: string;
    domain: string;
    canonicalUrl: string;
  };
  contact: {
    email: string;
    emailUrl: string;
    whatsappNumber: string;
    whatsappUrl: string;
    telephone: string;
    phone: string;
    responseSla: string;
    address: string;
  };
  navigation: NavItem[];
  techStack: TechStackItem[];
  works: WorkItem[];
  services: ServiceItem[];
  platformIntegrations: IntegrationItem[];
  pricing: PricingTier[];
  approachCards: ApproachCardItem[];
  proof: ProofConfig;
  testimonials: TestimonialItem[];
  faqs: FaqItem[];
  cta: {
    navAction: string;
    navHref: string;
    heroPrimary: string;
    heroPrimaryHref: string;
    heroSecondary: string;
    heroSecondaryHref: string;
    bannerHeading: string;
    bannerSubheading: string;
    bannerAction: string;
    bannerHref: string;
  };
  socials: {
    linkedin: string;
    github?: string;
    twitter?: string;
    x?: string;
    discord?: string;
    instagram?: string;
  };
  meta: {
    title: string;
    description: string;
    ogImage: string;
    themeColor: string;
  };
}

export const techStack: TechStackItem[] = [
  { name: "Next.js", icon: "nextdotjs" },
  { name: "Supabase", icon: "supabase" },
  { name: "PostgreSQL", icon: "postgresql" },
  { name: "Python", icon: "python" },
  { name: "n8n", icon: "n8n" },
  { name: "OpenAI", icon: "openai" },
  { name: "Claude", icon: "claude" },
  { name: "Vercel", icon: "vercel" },
];

export const works: WorkItem[] = [
  {
    title: "Faultline — Contradiction Graph",
    project: "faultline",
    image: "/images/products/faultline-detail-desktop.png",
    href: "/products/faultline",
    status: "Live",
  },
  {
    title: "Faultline — Conflict Candidates List",
    project: "faultline",
    image: "/images/products/faultline-list-desktop.png",
    href: "/products/faultline",
    status: "Live",
  },
  {
    title: "Quiet — Geospatial Calm Index",
    project: "quiet",
    image: "/images/products/quiet-explore-desktop.png",
    href: "/products/quiet",
    status: "In progress",
  },
  {
    title: "Faultline — Auto-Repair View",
    project: "faultline",
    image: "/images/products/faultline-resolved-desktop.png",
    href: "/products/faultline",
    status: "Live",
  },
  {
    title: "Faultline — Mobile Conflict Resolver",
    project: "faultline",
    image: "/images/products/faultline-detail-mobile.png",
    href: "/products/faultline",
    status: "Live",
  },
  {
    title: "Quiet — Live Quiet Score Engine",
    project: "quiet",
    image: "/images/products/quiet-score-mobile.png",
    href: "/products/quiet",
    status: "In progress",
  },
  {
    title: "Faultline — Knowledge Topology",
    project: "faultline",
    image: "/images/products/faultline-list-mobile.png",
    href: "/products/faultline",
    status: "Live",
  },
  {
    title: "Quiet — Place Filter & Density",
    project: "quiet",
    image: "/images/products/quiet-filters-mobile.png",
    href: "/products/quiet",
    status: "In progress",
  },
];

export const services: ServiceItem[] = [
  {
    num: "01",
    title: "AI & Automation",
    slug: "ai-automation",
    line1: "AI &",
    line2: "Automation",
    icon: "bot",
    outcome: "Replace repetitive manual operations with deterministic AI workflows and autonomous agents.",
    bullets: [
      "Custom AI agents & autonomous task execution",
      "Automated operational data pipelines",
      "Custom LLM orchestration & structured validation",
    ],
  },
  {
    num: "02",
    title: "Custom Software",
    slug: "custom-software",
    line1: "Custom",
    line2: "Software",
    icon: "code",
    outcome: "Production platforms built specifically around how your company operates.",
    bullets: [
      "Web applications & internal client portals",
      "Scalable backend services & typed APIs",
      "Operational dashboards & workflow engines",
    ],
  },
  {
    num: "03",
    title: "AI Products",
    slug: "ai-products",
    line1: "AI",
    line2: "Products",
    icon: "sparkles",
    outcome: "Take AI-native software ideas from technical validation to production launch.",
    bullets: [
      "AI-first product architecture & prototyping",
      "Model evaluation, fine-tuning & prompt systems",
      "Resilient product UX, guardrails & caching",
    ],
  },
  {
    num: "04",
    title: "Marketing Systems",
    slug: "marketing-systems",
    line1: "Marketing",
    line2: "Systems",
    icon: "trending-up",
    outcome: "Unify content distribution, lead capture, and revenue pipelines into cohesive workflows.",
    bullets: [
      "Automated lead qualification & routing pipelines",
      "Multi-channel automated customer messaging",
      "Real-time pipeline telemetry & attribution",
    ],
  },
  {
    num: "05",
    title: "Cloud & DevOps",
    slug: "cloud-devops",
    line1: "Cloud &",
    line2: "DevOps",
    icon: "cloud",
    outcome: "Resilient cloud infrastructure engineered for uptime, security, and continuous delivery.",
    bullets: [
      "AWS & GCP cloud architecture & security",
      "Automated CI/CD pipelines & release tooling",
      "Containerization, orchestration & monitoring",
    ],
  },
  {
    num: "06",
    title: "Integrations & APIs",
    slug: "integrations-apis",
    line1: "Integrations",
    line2: "& APIs",
    icon: "network",
    outcome: "Connect siloed software systems and legacy databases into unified workflows.",
    bullets: [
      "High-performance API development & orchestration",
      "Legacy database modernization & syncing",
      "Webhook architecture & event-driven messaging",
    ],
  },
];

export const platformIntegrations: IntegrationItem[] = [
  { name: "WhatsApp", icon: "whatsapp" },
  { name: "Google Sheets", icon: "googlesheets" },
  { name: "Notion", icon: "notion" },
  { name: "Slack", icon: "slack" },
  { name: "Supabase", icon: "supabase" },
  { name: "PostgreSQL", icon: "postgresql" },
  { name: "OpenAI", icon: "openai" },
  { name: "Zapier", icon: "zapier" },
];

export const pricing: PricingTier[] = [
  {
    name: "AI Automation",
    from: "TODO(rajesh): price",
    summary: "Agents and workflows that take repetitive work off your team.",
    features: [
      "Discovery call and scoping",
      "Autonomous agent & workflow engineering",
      "Direct API & database integrations",
      "Documentation at handover",
    ],
    ctaLabel: "Start a project",
    href: "/contact",
  },
  {
    name: "Custom Software",
    from: "TODO(rajesh): price",
    summary: "Web apps, dashboards and APIs built around your process.",
    features: [
      "Technical architecture & sprint planning",
      "Modern web application & typed APIs",
      "Automated CI/CD & cloud deployment",
      "Documentation at handover",
    ],
    ctaLabel: "Start a project",
    href: "/contact",
    popular: true,
  },
  {
    name: "Product Partnership",
    from: "Custom quote",
    summary: "Larger builds scoped together before anything is quoted.",
    features: [
      "Dedicated technical squad & architect lead",
      "End-to-end full platform development",
      "Iterative milestone-based delivery",
      "Post-launch SLA support & monitoring",
    ],
    ctaLabel: "Start a project",
    href: "/contact",
  },
];

export const approachCards: ApproachCardItem[] = [
  {
    id: "discovery-first",
    title: "Discovery First",
    description:
      "We begin by mapping your process, finding what is slow or broken, and agreeing clear goals before we build anything.",
  },
  {
    id: "process-before-tools",
    title: "Process Before Tools",
    description:
      "We fix the workflow first, then automate it, so AI does not speed up a broken process.",
  },
  {
    id: "one-connected-system",
    title: "One Connected System",
    description:
      "Every tool, data source and agent works together instead of living in separate silos.",
  },
  {
    id: "built-to-be-reliable",
    title: "Built to Be Reliable",
    description:
      "We test the edge cases and keep clear logs, so you can see what the system did and why.",
  },
  {
    id: "smooth-handover",
    title: "Smooth Handover",
    description:
      "You get documentation, access and a walkthrough, so your team can run it after launch.",
  },
  {
    id: "future-ready",
    title: "Future-Ready",
    description:
      "Built to grow as your business grows.",
  },
];

export const proof: ProofConfig = {
  stats: [
    { value: 30, suffix: "+", label: "Projects delivered" },
    { value: 98, suffix: "%", label: "Client satisfaction" },
    { value: 12, suffix: "+", label: "Years combined experience" },
  ],
};

export const testimonials: TestimonialItem[] = [
  {
    id: "testimonial-1",
    quote:
      "I've worked with OneReign on several different occasions and it's always a pleasure. They go through every detail and deliver according to your desires.",
    author: "LASADA PIPPEN",
    role: "Keynote Speaker & Communication Coach",
    initials: "LP",
    rating: 5,
  },
  {
    id: "testimonial-2",
    quote:
      "OneReign unified our entire operations pipeline into an autonomous engine. Tasks that took 4 hours every morning now run in under 30 seconds with complete audit logs.",
    author: "ALEX CHEN",
    role: "Head of Systems & Operations",
    initials: "AC",
    rating: 5,
  },
  {
    id: "testimonial-3",
    quote:
      "The engineering rigor is exceptional. They don't just build software — they eliminated our operational bottlenecks and gave us infrastructure that scales effortlessly.",
    author: "SARAH JENKINS",
    role: "Managing Director, Apex Labs",
    initials: "SJ",
    rating: 5,
  },
];

export const faqs: FaqItem[] = [
  {
    question: "What does OneReign build?",
    answer:
      "We design and engineer deterministic AI agents, autonomous workflow pipelines, custom web applications, and direct API/database integrations tailored to take repetitive work off your team.",
  },
  {
    question: "How involved do I need to be?",
    answer:
      "Very little day-to-day overhead. We begin with a 30-minute discovery call to map your workflows and establish clear goals. From there, we build in milestones and only require your feedback at key review checkpoints.",
  },
  {
    question: "How long does a project take?",
    answer:
      "Timelines depend directly on architecture scope and technical complexity. TODO(rajesh): typical timelines",
  },
  {
    question: "Do you support the system after launch?",
    answer:
      "Every delivery includes comprehensive documentation, runbooks, and a handover session. TODO(rajesh): support terms",
  },
  {
    question: "Do you work with businesses outside India?",
    answer:
      "Yes, OneReign operates as a remote-first engineering studio working with teams globally. TODO(rajesh): confirm international client contracts and billing terms",
  },
  {
    question: "How do we start?",
    answer:
      "You can book a free 30-minute discovery call directly on our website or message us on WhatsApp. We will evaluate your current workflow friction and propose a clear, actionable engineering plan.",
  },
];

export const siteContent: SiteConfig = {
  brand: {
    name: "OneReign",
    legalName: "OneReign Private Limited",
    tagline: "Where possibility becomes inevitable.",
    subtitle:
      "OneReign designs and ships AI agents, automation workflows and custom software — so your team stops doing repetitive work and starts moving faster.",
    established: "Est. 2025",
    location: "Remote / Global",
    domain: "https://one-reign.vercel.app",
    canonicalUrl: "https://one-reign.vercel.app",
  },
  contact: {
    email: "onereign.official@gmail.com",
    emailUrl: "mailto:onereign.official@gmail.com",
    whatsappNumber: "918667768636",
    whatsappUrl:
      "https://wa.me/918667768636?text=Hi%20OneReign%2C%20I%27d%20like%20to%20discuss%20a%20project",
    telephone: "+91 8667768636",
    phone: "+91 8667768636",
    responseSla: "< 24 hours",
    address: "Remote / Global",
  },
  navigation: [
    { label: "Services", href: "/#services" },
    { label: "Products", href: "/products" },
    { label: "Approach", href: "/#approach" },
    { label: "Blog", href: "/blog" },
    { label: "Pricing", href: "/pricing" },
  ],
  techStack,
  works,
  services,
  platformIntegrations,
  pricing,
  approachCards,
  proof,
  testimonials,
  faqs,
  cta: {
    navAction: "Book a call",
    navHref: "/contact",
    heroPrimary: "Book a free 30-min call",
    heroPrimaryHref: "/contact",
    heroSecondary: "See our products",
    heroSecondaryHref: "/products",
    bannerHeading: "Tell us what's broken. We'll show you what's possible.",
    bannerSubheading:
      "Book a 30-minute discovery call directly with our engineering team. We'll review your workflows and provide actionable architecture.",
    bannerAction: "Book a free 30-min call",
    bannerHref: "/contact",
  },
  socials: {
    linkedin: "https://linkedin.com/company/onereign",
    instagram: "TODO: Add verified OneReign Instagram URL",
    x: "TODO: Add verified OneReign X / Twitter handle",
    twitter: "TODO: Add verified OneReign X / Twitter handle (e.g. https://x.com/onereign)",
    github: "TODO: Add verified OneReign GitHub URL (e.g. https://github.com/onereign)",
    discord: "TODO: Add community Discord server invite URL",
  },
  meta: {
    title: "OneReign — AI Platforms, Automation & Custom Software",
    description:
      "OneReign designs and ships AI agents, automation workflows and custom software — so your team stops doing repetitive work and starts moving faster.",
    ogImage: "/og-image.png",
    themeColor: "#0B0B0D",
  },
};

export default siteContent;
