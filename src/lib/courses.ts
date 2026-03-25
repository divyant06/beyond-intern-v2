export interface Course {
  id: string;
  title: string;
  category:
    | "Technical Skills"
    | "Analytical Skills"
    | "Marketing & Sales"
    | "Professional & Soft Skills"
    | "Finance & Investment"
    | "Creative Skills"
    | "Career Readiness";
  duration: string;
  price: number | null; // GBP £, null = complimentary with other courses
  level: string;
  weeklyCommitment: string;
  description: string;
  outcomes: string[];
}

export const courseData: Course[] = [
  // ─── TECHNICAL SKILLS ───────────────────────────────────────────────────────
  {
    id: "tech-01",
    title: "Programming (Python & Java)",
    category: "Technical Skills",
    duration: "16 Weeks",
    price: 650,
    level: "Beginner to Intermediate",
    weeklyCommitment: "10–12 Hours",
    description:
      "Develop strong programming fundamentals, logical thinking, and real-world coding ability required for software development roles. Build from zero to independently creating real applications with Python or Java.",
    outcomes: [
      "Junior Software Developer",
      "Backend Developer (Entry-level)",
      "Automation Engineer",
    ],
  },
  {
    id: "tech-02",
    title: "Full Stack Web Development",
    category: "Technical Skills",
    duration: "20 Weeks",
    price: 750,
    level: "Beginner to Advanced",
    weeklyCommitment: "12–15 Hours",
    description:
      "Build end-to-end web development expertise, enabling learners to create and deploy real-world applications from UI to database. Covers HTML, JavaScript, Node.js, MongoDB, and live production deployment.",
    outcomes: [
      "Full Stack Developer",
      "Frontend Developer",
      "Web Developer",
    ],
  },
  {
    id: "tech-03",
    title: "Data Science & Machine Learning",
    category: "Technical Skills",
    duration: "20 Weeks",
    price: 950,
    level: "Intermediate to Advanced",
    weeklyCommitment: "12–15 Hours",
    description:
      "Develop data-driven decision-making and predictive modeling skills using Python, NumPy, Pandas, and real-world ML models. Progress from data cleaning to building and deploying machine learning solutions.",
    outcomes: [
      "Data Analyst",
      "Junior Data Scientist",
      "ML Engineer (Entry-level)",
    ],
  },
  {
    id: "tech-04",
    title: "Cybersecurity & Ethical Hacking",
    category: "Technical Skills",
    duration: "16 Weeks",
    price: 700,
    level: "Beginner to Intermediate",
    weeklyCommitment: "10–12 Hours",
    description:
      "Build security awareness and ethical hacking capabilities, covering networking basics, threat detection, and penetration testing using industry tools like Kali Linux and Wireshark.",
    outcomes: [
      "Cybersecurity Analyst",
      "Security Consultant",
      "Penetration Tester (Entry-level)",
    ],
  },
  {
    id: "tech-05",
    title: "Cloud Computing (AWS/Azure)",
    category: "Technical Skills",
    duration: "16 Weeks",
    price: 700,
    level: "Beginner to Intermediate",
    weeklyCommitment: "10–12 Hours",
    description:
      "Develop cloud deployment and infrastructure skills across AWS and Azure platforms, including DevOps fundamentals and containerisation with Docker.",
    outcomes: [
      "Cloud Engineer (Entry-level)",
      "DevOps Support Engineer",
      "Cloud Infrastructure Associate",
    ],
  },

  // ─── ANALYTICAL SKILLS ──────────────────────────────────────────────────────
  {
    id: "anal-01",
    title: "Data Analysis (Excel & SQL)",
    category: "Analytical Skills",
    duration: "16 Weeks",
    price: 650,
    level: "Beginner to Intermediate",
    weeklyCommitment: "10–12 Hours",
    description:
      "Develop the ability to analyse, clean, and interpret data using Excel and SQL, enabling learners to generate insights for business decision-making. Build dashboards and reports from real-world datasets.",
    outcomes: [
      "Data Analyst (Entry-level)",
      "Reporting Analyst",
      "Business Intelligence Assistant",
    ],
  },
  {
    id: "anal-02",
    title: "Business Analytics",
    category: "Analytical Skills",
    duration: "16 Weeks",
    price: 700,
    level: "Beginner to Intermediate",
    weeklyCommitment: "10–12 Hours",
    description:
      "Develop business decision-making skills using data insights, performance metrics, and forecasting techniques. Learn to create KPI dashboards and provide strategic recommendations.",
    outcomes: [
      "Business Analyst",
      "Operations Analyst",
      "Data-Driven Decision Maker",
    ],
  },
  {
    id: "anal-03",
    title: "Business Analyst Certification",
    category: "Analytical Skills",
    duration: "16 Weeks",
    price: 750,
    level: "Beginner to Advanced",
    weeklyCommitment: "10–12 Hours",
    description:
      "A flagship program that trains learners to bridge the gap between business and technology, covering SDLC, Agile, BRD/FRD documentation, Power BI, and Jira. Become a fully job-ready Business Analyst.",
    outcomes: [
      "Business Analyst",
      "Product Analyst",
      "Operations Analyst",
    ],
  },
  {
    id: "anal-04",
    title: "Financial Analysis",
    category: "Analytical Skills",
    duration: "12–16 Weeks",
    price: 550,
    level: "Beginner to Intermediate",
    weeklyCommitment: "8–10 Hours",
    description:
      "Develop financial decision-making and analytical skills covering financial statements, ratio analysis, forecasting, and budgeting. Gain the ability to interpret financial data for business strategy.",
    outcomes: [
      "Financial Analyst",
      "Investment Analyst",
      "Finance Associate",
    ],
  },
  {
    id: "anal-05",
    title: "Problem-Solving & Analytical Thinking",
    category: "Analytical Skills",
    duration: "12 Weeks",
    price: 350,
    level: "Beginner to Intermediate",
    weeklyCommitment: "8–10 Hours",
    description:
      "Develop structured thinking and problem-solving ability using case-solving frameworks, logical reasoning, and decision-making models applicable to all business roles.",
    outcomes: [
      "Applicable to all business roles",
      "Management Consultant (foundational)",
      "Team Leader",
    ],
  },
  {
    id: "anal-06",
    title: "Critical Thinking & Decision Making",
    category: "Analytical Skills",
    duration: "12 Weeks",
    price: 350,
    level: "Beginner to Intermediate",
    weeklyCommitment: "8–10 Hours",
    description:
      "Improve judgment, reasoning, and decision-making ability by mastering logical reasoning, bias identification, and structured decision frameworks for professional environments.",
    outcomes: [
      "Managerial roles",
      "Strategy & Consulting",
      "Leadership positions",
    ],
  },

  // ─── MARKETING & SALES ──────────────────────────────────────────────────────
  {
    id: "mkt-01",
    title: "Digital Marketing",
    category: "Marketing & Sales",
    duration: "16 Weeks",
    price: 500,
    level: "Beginner to Advanced",
    weeklyCommitment: "10–12 Hours",
    description:
      "Build complete digital marketing expertise, enabling learners to plan, execute, and optimise real-world marketing campaigns across SEO, Google Ads, social media, and analytics.",
    outcomes: [
      "Digital Marketing Executive",
      "Performance Marketer",
      "Social Media Manager",
    ],
  },
  {
    id: "mkt-02",
    title: "SEO & SEM (Search Marketing Specialist)",
    category: "Marketing & Sales",
    duration: "12–16 Weeks",
    price: 450,
    level: "Beginner to Intermediate",
    weeklyCommitment: "8–10 Hours",
    description:
      "Develop expertise in search engine visibility and paid advertising using Google Ads, SEMrush, and Search Console to drive organic and paid traffic for brands.",
    outcomes: [
      "SEO Specialist",
      "PPC Executive",
      "Search Marketing Analyst",
    ],
  },
  {
    id: "mkt-03",
    title: "Social Media Strategy",
    category: "Marketing & Sales",
    duration: "12–16 Weeks",
    price: 400,
    level: "Beginner to Intermediate",
    weeklyCommitment: "8–10 Hours",
    description:
      "Build brand growth and audience engagement expertise across Instagram, LinkedIn, and YouTube through influencer collaboration, content planning, and analytics-driven strategies.",
    outcomes: [
      "Social Media Manager",
      "Content Strategist",
      "Brand Growth Executive",
    ],
  },
  {
    id: "mkt-04",
    title: "Sales & Negotiation Skills",
    category: "Marketing & Sales",
    duration: "12 Weeks",
    price: 400,
    level: "Beginner to Intermediate",
    weeklyCommitment: "8–10 Hours",
    description:
      "Develop high-conversion sales skills and negotiation techniques, covering sales funnels, lead generation, customer psychology, and closing strategies through live role-play sessions.",
    outcomes: [
      "Sales Executive",
      "Business Development Executive",
      "Account Manager",
    ],
  },
  {
    id: "mkt-05",
    title: "Brand Management",
    category: "Marketing & Sales",
    duration: "12–16 Weeks",
    price: 450,
    level: "Beginner to Intermediate",
    weeklyCommitment: "8–10 Hours",
    description:
      "Develop strong brand positioning and strategic marketing skills through consumer behaviour analysis, competitive research, and real brand strategy projects.",
    outcomes: [
      "Brand Executive",
      "Marketing Strategist",
      "Brand Manager (Entry-level)",
    ],
  },

  // ─── PROFESSIONAL & SOFT SKILLS ─────────────────────────────────────────────
  {
    id: "soft-01",
    title: "Communication Skills",
    category: "Professional & Soft Skills",
    duration: "12 Weeks",
    price: 350,
    level: "Beginner to Advanced",
    weeklyCommitment: "8–10 Hours",
    description:
      "Develop clear, confident, and professional communication skills required in corporate environments. Covers verbal and written communication, business email writing, and public presentations.",
    outcomes: [
      "Workplace readiness across all roles",
      "Client-facing positions",
      "Team leadership roles",
    ],
  },
  {
    id: "soft-02",
    title: "Leadership & Teamwork",
    category: "Professional & Soft Skills",
    duration: "12–16 Weeks",
    price: 400,
    level: "Beginner to Intermediate",
    weeklyCommitment: "8–10 Hours",
    description:
      "Develop leadership mindset and effective team collaboration skills, including emotional intelligence, conflict resolution, and decision-making through group projects and leadership simulations.",
    outcomes: [
      "Team Leader",
      "Project Coordinator",
      "People Manager (Entry-level)",
    ],
  },
  {
    id: "soft-03",
    title: "Time Management & Productivity",
    category: "Professional & Soft Skills",
    duration: "12 Weeks",
    price: 350,
    level: "Beginner to Intermediate",
    weeklyCommitment: "6–8 Hours",
    description:
      "Build efficiency, focus, and productivity habits using proven techniques like Pomodoro, goal-setting frameworks, and stress management strategies for high-performance careers.",
    outcomes: [
      "Applicable to all professional roles",
      "Freelancers & entrepreneurs",
      "Team managers",
    ],
  },
  {
    id: "soft-04",
    title: "Public Speaking",
    category: "Professional & Soft Skills",
    duration: "12 Weeks",
    price: 350,
    level: "Beginner to Advanced",
    weeklyCommitment: "8–10 Hours",
    description:
      "Develop confidence, persuasion, and impactful speaking skills through voice modulation training, speech structuring, storytelling, and live presentation delivery with expert feedback.",
    outcomes: [
      "Roles requiring presentations",
      "Leadership & sales positions",
      "Trainers & educators",
    ],
  },
  {
    id: "soft-05",
    title: "Emotional Intelligence",
    category: "Professional & Soft Skills",
    duration: "12 Weeks",
    price: 350,
    level: "Beginner to Intermediate",
    weeklyCommitment: "6–8 Hours",
    description:
      "Develop self-awareness, empathy, and interpersonal skills to thrive in professional environments. Learn emotional control, relationship management, and stress-handling techniques.",
    outcomes: [
      "All professional roles",
      "HR & People management",
      "Customer-facing positions",
    ],
  },

  // ─── FINANCE & INVESTMENT ───────────────────────────────────────────────────
  {
    id: "fin-01",
    title: "Stock Market & Trading",
    category: "Finance & Investment",
    duration: "12–16 Weeks",
    price: 450,
    level: "Beginner to Intermediate",
    weeklyCommitment: "8–10 Hours",
    description:
      "Develop practical knowledge of stock markets, trading strategies, and risk management through virtual trading simulations, chart analysis, and fundamental stock evaluation.",
    outcomes: [
      "Investment Analyst (Entry-level)",
      "Equity Research Assistant",
      "Trading Executive",
    ],
  },
  {
    id: "fin-02",
    title: "Financial Planning & Wealth Management",
    category: "Finance & Investment",
    duration: "12 Weeks",
    price: 400,
    level: "Beginner to Intermediate",
    weeklyCommitment: "8–10 Hours",
    description:
      "Develop personal finance management and wealth planning skills including budgeting, investment options, tax planning basics, and long-term wealth growth strategies.",
    outcomes: [
      "Personal Financial Advisor (basic)",
      "Finance-savvy professional",
      "Wealth planning associate",
    ],
  },
  {
    id: "fin-03",
    title: "Risk Management",
    category: "Finance & Investment",
    duration: "12–16 Weeks",
    price: 450,
    level: "Beginner to Intermediate",
    weeklyCommitment: "8–10 Hours",
    description:
      "Develop risk identification, assessment, and mitigation strategies in financial environments, covering market, credit, and operational risks with compliance fundamentals.",
    outcomes: [
      "Risk Analyst",
      "Compliance Officer",
      "Financial Risk Associate",
    ],
  },
  {
    id: "fin-04",
    title: "Corporate Finance",
    category: "Finance & Investment",
    duration: "16 Weeks",
    price: 550,
    level: "Intermediate to Advanced",
    weeklyCommitment: "10–12 Hours",
    description:
      "Develop financial decision-making skills within organisations covering financial statements, capital budgeting, financial modelling, and business valuation through real case studies.",
    outcomes: [
      "Financial Analyst",
      "Corporate Finance Executive",
      "Investment Banking Analyst (Entry-level)",
    ],
  },

  // ─── CREATIVE SKILLS ────────────────────────────────────────────────────────
  {
    id: "cre-01",
    title: "Graphic Design",
    category: "Creative Skills",
    duration: "12–16 Weeks",
    price: 400,
    level: "Beginner to Intermediate",
    weeklyCommitment: "8–10 Hours",
    description:
      "Develop strong visual design and branding knowledge using Canva and Adobe Photoshop, enabling learners to create professional marketing materials, logos, and brand identities.",
    outcomes: [
      "Graphic Designer",
      "Social Media Designer",
      "Branding Executive",
    ],
  },
  {
    id: "cre-02",
    title: "UI/UX Design",
    category: "Creative Skills",
    duration: "16 Weeks",
    price: 600,
    level: "Beginner to Advanced",
    weeklyCommitment: "10–12 Hours",
    description:
      "Develop user-centred design skills to design intuitive and engaging digital products, from user research and wireframing to high-fidelity UI and usability testing using Figma and Adobe XD.",
    outcomes: [
      "UI/UX Designer",
      "Product Designer",
      "Interaction Designer",
    ],
  },
  {
    id: "cre-03",
    title: "Video Editing",
    category: "Creative Skills",
    duration: "12–16 Weeks",
    price: 400,
    level: "Beginner to Intermediate",
    weeklyCommitment: "8–10 Hours",
    description:
      "Develop professional video editing and storytelling skills using Adobe Premiere Pro and After Effects, creating compelling content for social media, marketing, and branding.",
    outcomes: [
      "Video Editor",
      "Content Creator",
      "Social Media Video Producer",
    ],
  },
  {
    id: "cre-04",
    title: "Content Creation & Strategy",
    category: "Creative Skills",
    duration: "12–16 Weeks",
    price: 350,
    level: "Beginner to Intermediate",
    weeklyCommitment: "8–10 Hours",
    description:
      "Develop content writing, storytelling, and digital content strategy skills including SEO copywriting, social media content, blogging, and building a full content portfolio.",
    outcomes: [
      "Content Writer",
      "Social Media Content Creator",
      "Copywriter",
    ],
  },

  // ─── CAREER READINESS (Complimentary with all courses) ──────────────────────
  {
    id: "car-01",
    title: "Resume & Portfolio Building",
    category: "Career Readiness",
    duration: "12 Weeks",
    price: null, // Complimentary with all courses
    level: "All Levels",
    weeklyCommitment: "4–6 Hours",
    description:
      "Create a job-winning, ATS-optimised resume and professional portfolio aligned with industry standards through role-specific keyword optimisation and recruiter-reviewed feedback.",
    outcomes: [
      "Strong personal brand",
      "ATS-ready resume",
      "Industry-standard portfolio",
    ],
  },
  {
    id: "car-02",
    title: "Interview Preparation",
    category: "Career Readiness",
    duration: "12 Weeks",
    price: null,
    level: "All Levels",
    weeklyCommitment: "4–6 Hours",
    description:
      "Prepare for real job interviews covering HR, technical, and case-based formats through mock interview simulations, salary negotiation coaching, and expert feedback sessions.",
    outcomes: [
      "Interview confidence",
      "Technical interview readiness",
      "Salary negotiation skills",
    ],
  },
  {
    id: "car-03",
    title: "LinkedIn Optimisation & Personal Branding",
    category: "Career Readiness",
    duration: "12 Weeks",
    price: null,
    level: "All Levels",
    weeklyCommitment: "4–6 Hours",
    description:
      "Build a strong online professional presence through an optimised LinkedIn profile, strategic content posting, and recruiter engagement techniques to attract career opportunities.",
    outcomes: [
      "Recruiter-attractive profile",
      "Strong professional network",
      "Consistent personal brand",
    ],
  },
  {
    id: "car-04",
    title: "Internship & Corporate Readiness",
    category: "Career Readiness",
    duration: "12 Weeks",
    price: null,
    level: "All Levels",
    weeklyCommitment: "4–6 Hours",
    description:
      "Prepare learners for real workplace environments and expectations covering workplace etiquette, corporate communication, task management, and real-world project simulations.",
    outcomes: [
      "Workplace adaptability",
      "Corporate communication skills",
      "Professional behaviour",
    ],
  },
];
