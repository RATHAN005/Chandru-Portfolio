/* ============================================================
   All portfolio copy lives here — edit text freely without touching
   animation logic or presentation.
   ============================================================ */
const heroContent = {
  nav: [
    { label: "Work", href: "#work", active: true },
    { label: "About", href: "#section-03" },
    { label: "Projects", href: "#works" },
    { label: "Skills", href: "#method" },
    { label: "Contact", href: "#contact" },
  ],

  cta: { label: "Let's Talk", href: "#contact" },

  headline: "Chandru G",
  role: ["Senior IT Operations", "Administrator & Designer"],
  meta: ["IT Operations", "Accessibility", "UI/UX & Design"],

  notification: {
    name: "Chandru G",
    time: "now",
    lead: "IT Operations & Design",
    message: "Senior IT Operations Administrator — bridging systems, hardware, WCAG accessibility & creative design.",
  },

  section2: {
    sideLeft: ["Chandru G", "Solutions."],
    sideRight: ["Operations.", "Design."],
  },

  /* My Works — Featured Projects from Resume */
  works: {
    brand: "Chandru G Portfolio",
    projects: [
      {
        key: "brand-identity",
        name: "Hudsmer Brand Identity & Logo Design",
        img: "/assets/work-tourtripx.jpg",
        w: 498,
        h: 405,
        cat: "Branding · Illustrator",
        year: "2025",
        accent: "#ff5e62",
        title: "Complete brand logo & visual identity system designed from concept to delivery using Adobe Illustrator, applying vector illustration, color theory, and typography."
      },
      {
        key: "pdf-accessibility",
        name: "PDF & eBook Accessibility Remediation",
        img: "/assets/work-classlogic.jpg",
        w: 383,
        h: 363,
        cat: "Accessibility · WCAG · XML",
        year: "2025 - 2026",
        accent: "#00c6ff",
        title: "Remediated enterprise PDFs, eBooks, and journal documents to meet strict WCAG standards, optimizing tagging and structure for universal screen-reader compatibility."
      },
      {
        key: "it-onboarding-asset",
        name: "Employee Onboarding & IT Asset Management",
        img: "/assets/work-couchops.jpg",
        w: 186,
        h: 362,
        cat: "IT Operations · Asset Tracking",
        year: "2025 - 2026",
        accent: "#38ef7d",
        title: "Streamlined end-to-end new joinee onboarding, offer letters, and device provisioning; built comprehensive documentation tracking laptop assets and maintenance lifecycles."
      },
      {
        key: "hardware-troubleshooting",
        name: "Hardware Diagnostics & Upgrades",
        img: "/assets/aircraft.jpg",
        w: 498,
        h: 405,
        cat: "Hardware · Windows Admin",
        year: "2025 - 2026",
        accent: "#f28b3c",
        title: "Diagnosed and resolved recurring hardware issues across company laptops, executing RAM, SSD, and battery upgrades to minimize organizational downtime."
      },
    ],
  },

  /* Big Robot section */
  bigRobot: {
    labels: { left: "Senior IT Operations Administrator", right: "Systems · Accessibility · Design" },
    eyebrow: "( 05 · The Mind )",
    titleLines: ["I manage systems that run seamlessly", "and design visual identities that connect."],
    description: "Combining technical problem-solving with UI/UX and graphic design — from Windows administration and hardware maintenance to WCAG accessibility and brand design.",
    hint: "Scroll to explore technical areas.",
    techIdeas: [
      {
        no: "01",
        title: "IT Operations & Infrastructure",
        description: "Overseeing day-to-day enterprise IT operations, hardware diagnostics, laptop asset management, and proactive maintenance to prevent downtime.",
        tags: ["IT Operations", "Windows Admin", "Hardware Upgrades", "Asset Tracking", "Onboarding", "Troubleshooting"],
      },
      {
        no: "02",
        title: "WCAG & Document Accessibility",
        description: "Remediating complex PDFs, eBooks, and XML structures to ensure full compliance with international accessibility standards and screen readers.",
        tags: ["WCAG Standards", "PDF Accessibility", "Screen Readers", "XML Processing", "Accessible Publishing"],
      },
      {
        no: "03",
        title: "UI/UX & Brand Design",
        description: "Creating impactful brand identities, logos, wireframes, and digital marketing collateral using Adobe Illustrator, Photoshop, and Figma.",
        tags: ["Figma", "Adobe Illustrator", "Photoshop", "Brand Identity", "Visual Hierarchy", "Prototyping"],
      },
    ],
  },

  /* Editorial Section — Skills, Mindset, and Experience */
  editorial: {
    eyebrow: "( 06 · Skills & Experience )",
    statement: ["Systems keep operations running.", "Design makes them intuitive."],
    note: "A multifaceted professional with hands-on expertise spanning IT administration, hardware upgrades, accessibility engineering, and graphic design.",
    skills: {
      title: "Skills & Tools",
      groups: [
        {
          name: "IT & System Administration",
          items: ["IT Support & Troubleshooting", "Windows Administration", "Hardware Diagnostics & Repair", "RAM, SSD & Battery Upgrades", "IT Asset Management", "New Employee Onboarding", "Network & Device Management"],
        },
        {
          name: "Design & Media Tools",
          items: ["Figma", "Adobe Illustrator", "Adobe Photoshop", "Canva", "Adobe Premiere Pro", "DaVinci Resolve", "CapCut"],
        },
        {
          name: "UI/UX & Web",
          items: ["Mobile & Web Design", "Wireframing & Prototyping", "Auto Layout & Components", "Information Architecture", "HTML & CSS", "Responsive Design", "Data Visualization"],
        },
        {
          name: "Document & Accessibility",
          items: ["WCAG Standards Compliance", "PDF Accessibility Remediation", "Screen-Reader Optimization", "XML Processing", "eBook & Journal Publishing"],
        },
        {
          name: "Graphic Design & Branding",
          items: ["Brand Identity Design", "Logo Design", "Marketing Collateral & Posters", "Typography & Color Theory", "Thumbnail Design", "Social Media Creatives", "Motion Graphics (Basic)"],
        },
        {
          name: "Soft Skills",
          items: ["Cross-Functional Collaboration", "Team Leadership & Coordination", "Organizational & Planning", "Effective Time Management", "Adaptability & Flexibility"],
        },
      ],
    },
    mindset: {
      title: "Diagnose → Resolve → Standardize → Elevate",
      lines: [
        "I diagnose technical and hardware issues at their root cause.",
        "I resolve system bottlenecks and device downtime proactively.",
        "I standardize asset management, onboarding workflows, and WCAG accessibility.",
        "And I elevate organizational presence with compelling visual design.",
      ],
    },
    exploring: {
      title: "Work Experience & Education",
      items: [
        "Senior IT Operations Administrator — Hudsmer Business Solutions (Jun 2026 – Present, Coimbatore)",
        "IT Operations Administrator — Hudsmer Business Solutions (Sep 2025 – May 2026, Sholinganallur)",
        "Accessibility Engineer — Hudsmer Business Solutions (Nov 2025 – Jan 2026, Sholinganallur)",
        "Graphic Designer — Hudsmer Business Solutions (Jun 2025 – Nov 2025, Sholinganallur)",
        "Graphic Designer (Internship) — Hudsmer Business Solutions (Mar 2025 – May 2025, Sholinganallur)",
        "B.E. in Computer Science Engineering — PET Engineering College (Percentage: 79%)",
      ],
    },
    ending: {
      lines: ["Reliable Operations.", "Universal Accessibility.", "Creative Design."],
      note: "Committed to delivering seamless technical support and inspiring visual solutions.",
    },
  },

  smallRobot: {
    eyebrow: "( 07 · Ongoing Focus )",
    titleLines: ["Proactive in systems,", "attentive to details."],
    description: "Monitoring, maintaining, and refining digital ecosystems, hardware assets, and user experiences.",
    note: "Move your cursor · it follows",
  },

  footer: {
    eyebrow: "( 08 · Contact & Connect )",
    headline: ["Let’s build", "reliable solutions."],
    line: "Open to IT Operations Administration, Accessibility Engineering, UI/UX, and Visual Design opportunities.",
    email: "chandrugnanasekar24@gmail.com",
    emailLabel: "Get in touch",
    phone: "+91 8098787574",
    location: "Coimbatore, Tamil Nadu, India",
    columns: [
      {
        title: "Navigation",
        items: [
          { label: "Hero", href: "#top" },
          { label: "Focus Areas", href: "#work" },
          { label: "About Me", href: "#section-03" },
          { label: "Selected Projects", href: "#works" },
          { label: "The Mind", href: "#think" },
        ],
      },
      {
        title: "Expertise",
        items: [
          { label: "IT & System Administration", href: "#method" },
          { label: "WCAG Accessibility", href: "#method" },
          { label: "UI/UX & Web Design", href: "#method" },
          { label: "Brand Identity Design", href: "#method" },
        ],
      },
      {
        title: "Contact Details",
        items: [
          { label: "chandrugnanasekar24@gmail.com", href: "mailto:chandrugnanasekar24@gmail.com" },
          { label: "+91 8098787574", href: "tel:+918098787574" },
          { label: "Coimbatore, Tamil Nadu, India", href: "#contact" },
          { label: "linkedin.com/in/chandrusekar24", href: "https://www.linkedin.com/in/chandrusekar24" },
        ],
      },
    ],
    social: [
      { label: "LinkedIn", href: "https://www.linkedin.com/in/chandrusekar24" },
      { label: "Email", href: "mailto:chandrugnanasekar24@gmail.com" },
      { label: "Phone", href: "tel:+918098787574" },
    ],
    legal: "© 2026 Chandru G",
    note: "Senior IT Operations Administrator & Visual Designer.",
    backToTop: "Back to top",
  },

  about: {
    boxes: {
      who:   { title: "Who I Am",   sub: "Chandru G — Senior IT Operations Administrator & Designer." },
      what:  { title: "What I Do",  sub: "IT Operations · Accessibility · UI/UX Design" },
      think: { title: "How I Think", sub: "Diagnose · Resolve · Standardize · Elevate" },
    },
    views: {
      who: {
        eyebrow: "01 — Who I Am",
        head: "Chandru G",
        text: "Senior IT Operations Administrator and Visual Designer based in Coimbatore, Tamil Nadu, India. Experienced in hands-on IT operations, Windows administration, hardware upgrades (RAM, SSD, battery), asset management, new-hire onboarding, WCAG accessibility remediation, and brand identity design. Holds a B.E. in Computer Science Engineering (79%).",
        tags: ["IT Operations", "Accessibility", "UI/UX Design", "Hardware Diagnostics", "B.E. CSE (79%)"],
      },
      what: {
        eyebrow: "02 — What I Do",
        head: "Systems, Accessibility & Design",
        text: "Ensuring zero-downtime IT operations and hardware reliability while crafting WCAG-compliant accessible documents and distinctive brand identities.",
      },
      think: {
        eyebrow: "03 — How I Think",
        head: "Technical Precision & User Usability",
        text: "Diagnose · Resolve · Standardize · Elevate · Impact.",
      },
    },
  },
};

export default heroContent;
