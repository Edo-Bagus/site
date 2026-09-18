export const owner = {
  name: "Eduardus Bagus Wicaksono",
  shortName: "Edo Bagus",
  headlineTechnical: "Software & AI Engineer",
  headlineSub: "Backend & Data",
  summary:
    "I'm a fresh IT graduate from Universitas Gadjah Mada who builds backends and AI systems. I trained a crash-detection model to 99.5% recall, built a RAG recipe engine, and shipped a rental SaaS that 10 businesses now use.",
  location: "Yogyakarta, Indonesia",
  email: "ebagus409@gmail.com",
  github: "https://github.com/Edo-Bagus",
  linkedin: "https://www.linkedin.com/in/edo-bagus-6567761b2",
  gpa: "3.80 / 4.00",
  grad: "UGM · 2026",
};

export const stats = [
  { value: "10+", label: "projects shipped" },
  { value: "2", label: "competition wins" },
  { value: "3", label: "AI / ML systems" },
  { value: "3.80", label: "GPA / 4.00" },
];

export type GalleryItem = { src?: string; caption: string };

export type Project = {
  slug: string;
  title: string;
  blurb: string;
  role: string;
  year: string;
  metric?: string;
  tags: string[];
  featured?: boolean;
  cover?: string; // card thumbnail; defaults to the first gallery image with a src
  links: { label: string; href: string }[];
  context: string;
  problem: string;
  contributions: string[];
  results?: string[];
  stack: string[];
  gallery: GalleryItem[];
};

export const projects: Project[] = [
  {
    slug: "rideguard",
    title: "RideGuard",
    blurb:
      "An IoT device that spots a motorcycle crash as it happens and texts the rider's GPS location to emergency contacts over GSM. It still works with no internet.",
    role: "Backend & AI Engineer",
    year: "2025",
    metric: "99.5% recall",
    tags: ["Decision Tree", "STM32", "Python", "IoT", "DSP"],
    featured: true,
    context: "UGM capstone · team of 5",
    problem:
      "Motorcycle crashes turn fatal when help arrives late. In a solo crash on an empty road, no one is there to make the call.",
    contributions: [
      "Trained the crash-detection model: collected and labeled MPU6050 sensor data across 8 crash and 13 normal-riding scenarios, engineered G-force and jerk features, and tuned a Decision Tree for recall.",
      "Built the real-time IIR signal-processing pipeline that feeds the model.",
      "Developed the cloud backend: nearest-hospital lookup (Haversine) and multi-channel alerts (app push + WhatsApp).",
      "Built the SMS logic gateway for an alert path that works without internet.",
    ],
    results: [
      "99.5% recall at 4.5% false alarms, ahead of the rule-based (98.8%) and logistic-regression (~97%) baselines.",
      "14 missed crashes, against 34 and 103 for those baselines.",
    ],
    stack: [
      "Decision Tree (scikit-learn)", "Python", "STM32F401", "MPU6050 IMU", "IIR DSP",
      "A9G GSM/GPS", "ESP8266", "ESP32-CAM", "Android", "Haversine", "WhatsApp API",
    ],
    links: [
      { label: "Backend", href: "https://github.com/Edo-Bagus/backend-rideguard" },
      { label: "Demo", href: "https://www.youtube.com/watch?v=SMW9KC4Q92E" },
    ],
    gallery: [
      { src: "/projects/rideguard/hardware.jpeg", caption: "Main unit enclosure" },
      { src: "/projects/rideguard/model.png", caption: "Model comparison results" },
      { src: "/projects/rideguard/system.png", caption: "System architecture" },
      { src: "/projects/rideguard/team.jpeg", caption: "The team" },
    ],
  },
  {
    slug: "csi-people-counting",
    title: "Wi-Fi CSI People Counting",
    blurb:
      "A system that counts the people in a room from Wi-Fi signals alone. No cameras, no wearables. I benchmarked six ML models on Wi-Fi 6 hardware.",
    role: "Lead Researcher & First Author",
    year: "2025",
    metric: "93.6% accuracy",
    tags: ["PyTorch", "1D CNN", "ESP32-C6", "Signal processing"],
    featured: true,
    context: "Undergraduate thesis · lead author",
    problem:
      "Counting people in a room usually means a camera or a wearable. Cameras hurt privacy and fail in the dark, and wearables ask everyone to carry one.",
    contributions: [
      "Built a two-node ESP32-C6 (Wi-Fi 6) testbed and collected the dataset myself: 922k CSI samples across 0–6 occupants.",
      "Designed the preprocessing pipeline: imputation, Savitzky–Golay filtering, magnitude extraction, sliding windows.",
      "Benchmarked six models (SVM / RF / XGBoost and 1D CNN / LSTM / CNN-LSTM) under nested cross-validation, as both classification and regression.",
      "Published the dataset (Zenodo) and code openly for reproducibility.",
    ],
    results: [
      "Best model (1D CNN): 93.6% accuracy, F1-macro 0.944.",
      "Also the lightest, at 29k parameters and 0.85 ms inference. It runs on the device.",
    ],
    stack: [
      "ESP32-C6", "Wi-Fi 6 (802.11ax)", "Python", "PyTorch", "scikit-learn",
      "1D CNN / LSTM", "Signal processing", "Nested CV",
    ],
    links: [
      { label: "Dataset", href: "https://doi.org/10.5281/zenodo.21467952" },
      { label: "Code", href: "https://github.com/Edo-Bagus/CSI-ML" },
    ],
    gallery: [
      { src: "/projects/csi-people-counting/data-collection.jpeg", caption: "Data-collection setup" },
      { src: "/projects/csi-people-counting/signal.png", caption: "CSI amplitude heatmap" },
      { src: "/projects/csi-people-counting/amp-person.png", caption: "CSI magnitude by occupancy" },
      { src: "/projects/csi-people-counting/results.png", caption: "Model comparison (1D CNN vs CNN-LSTM)" },
    ],
  },
  {
    slug: "avaelo",
    title: "Avaelo",
    blurb:
      "A SaaS that lets rental businesses take bookings online instead of over chat. Each vendor gets a storefront, a live calendar, payments, and an operations dashboard.",
    role: "CPO & Full-stack Developer",
    year: "2025",
    metric: "10 businesses live",
    tags: ["Go", "Next.js", "PostgreSQL", "Mayar"],
    featured: true,
    context: "Develoop's own product · Chief Product Officer",
    problem:
      "Rental businesses still take bookings by hand over chat and spreadsheets. Replies lag, two people book the same item, and the records live in five places.",
    contributions: [
      "Led product as CPO and built it full-stack: a Go backend and a Next.js frontend.",
      "Designed a multi-vendor marketplace with per-store storefronts, a real-time booking calendar, and Mayar payments.",
      "Built the vendor operations layer: booking management, accounting, subscriptions, and admin withdrawals.",
    ],
    results: [
      "10 early-adopter rental businesses run on it today.",
      "Won 1st Runner-up at Wiragama UGM 2026 (business pitching).",
    ],
    stack: [
      "Go (Gin, GORM)", "PostgreSQL", "JWT", "Next.js 16", "React 19", "TypeScript",
      "Tailwind", "Mayar", "WhatsApp (whatsmeow)", "Cloudinary",
    ],
    links: [
      { label: "Live", href: "https://www.avaelo.id" },
      { label: "Instagram", href: "https://www.instagram.com/avaelo.id/" },
    ],
    gallery: [
      {
        src: "/projects/avaelo/store.png",
        caption:
          "The marketplace: renters browse by category, and promo listings run a live countdown to the end of each deal.",
      },
      {
        src: "/projects/avaelo/store-2.png",
        caption:
          "A vendor storefront. Every business gets its own page with its catalogue, per-package pricing, ratings, and a direct chat channel.",
      },
      {
        src: "/projects/avaelo/dashboard.png",
        caption:
          "The vendor operations dashboard. Accounting tracks revenue, spend, and net profit against a running monthly chart, alongside item, booking, voucher, and subscription management.",
      },
    ],
  },
  {
    slug: "matrix-siemens",
    title: "MatriX",
    blurb:
      "A design that routes warehouse robots (AGVs) through a Siemens factory using a digital twin. I built SmartPath, the routing brain, with reinforcement learning (Deep Q-Network).",
    role: "AI Engineer",
    year: "2025",
    metric: "1st Runner-up · Siemens NGSC",
    tags: ["Reinforcement Learning", "Digital Twin", "AGV", "RTLS"],
    context: "Siemens NGSC 2025 · team 'Prapertung'",
    problem:
      "Siemens runs a strong digital backbone, but moving material on the floor stays manual. Nothing links the SAP/MES data to what the robots actually do.",
    contributions: [
      "Owned SmartPath: AGV routing via reinforcement learning (Deep Q-Network), learning from AGV telemetry and SAP data.",
      "Built the AGV pathfinding simulation used to train and validate the routing policy.",
      "Fed optimized paths back to the digital-twin server for fleet orchestration.",
    ],
    results: [
      "Won 1st Runner-up at the Siemens Next Gen Student Competition 2025.",
      "Projected 70% less idle time and 33% more throughput.",
    ],
    stack: [
      "Reinforcement Learning (DQN)", "Digital Twin (Tecnomatix)", "AGV", "RFID",
      "UWB / RTLS", "SAP / MES", "Siemens Insight Hub",
    ],
    links: [],
    gallery: [
      {
        src: "/projects/matrix-siemens/award.png",
        caption:
          "The Siemens Next Gen Student Competition 2025 certificate, awarded to team Prapertung of Universitas Gadjah Mada by PT Siemens Indonesia in Jakarta, 8 December 2025.",
      },
    ],
  },
  {
    slug: "culinacraft",
    title: "CulinaCraft",
    blurb:
      "A Cookpad-style recipe platform with an AI generator. Tell it your ingredients; a RAG pipeline pulls related recipes and Llama 3.3 70B writes a new one with nutrition estimates.",
    role: "Team Lead · Backend & AI Engineer",
    year: "2025",
    tags: ["RAG", "FastAPI", "Groq / Llama", "Next.js", "Docker"],
    context: "University software project · team lead",
    problem:
      "You open the fridge, see what you have, and still can't decide what to cook.",
    contributions: [
      "Led a team of three and owned the backend and the AI/RAG service.",
      "Built the RAG pipeline: TF-IDF/cosine retrieval over a recipe corpus, then a Llama 3.3 70B generation (Groq) grounded with USDA nutrition data.",
      "Built the Nutritional Explorer on top of that data: browse by calorie range, sort, and filter on nutrient profiles such as high protein or low sugar.",
      "Split it into two containerized services, a Next.js/MongoDB app and a FastAPI AI service, wired with Docker Compose and CI.",
    ],
    results: [
      "Turns your ingredients into a full recipe: steps, quantities, and per-nutrient breakdown against daily values.",
    ],
    stack: [
      "RAG", "FastAPI", "scikit-learn", "Groq / Llama 3.3 70B", "Next.js 15",
      "React 19", "MongoDB", "Docker",
    ],
    links: [{ label: "Repo", href: "https://github.com/Edo-Bagus/CulinaCraft" }],
    gallery: [
      {
        src: "/projects/culinacraft/hero.png",
        caption:
          "The landing page, opening on a wall of dishes and today's popular recipes.",
      },
      {
        src: "/projects/culinacraft/recipe.png",
        caption:
          "A generated recipe: ingredients with quantities, numbered steps, and a nutrition panel that breaks calories, protein, carbs, and sugar down against daily values.",
      },
      {
        src: "/projects/culinacraft/nutrition.png",
        caption:
          "The Nutritional Explorer. Browse the corpus by calorie range, sort, and stack nutrient filters like high protein or low sugar.",
      },
    ],
  },
  {
    slug: "leaflove",
    title: "LeafLove",
    blurb:
      "An Android plant-care app with a plant encyclopedia and an AR view. I built the backend and the ARCore feature that drops a plant into your camera.",
    role: "Backend Engineer & AR Developer",
    year: "2024",
    tags: ["Kotlin", "ARCore", "Firebase", "Jetpack Compose"],
    context: "University course project (PAPB) · team of 4",
    problem:
      "New plant owners lose plants they could have saved, and the care tips sit in ten browser tabs.",
    contributions: [
      "Built the backend and data layer: Firebase Auth and Firestore, the Perenual plant API (Retrofit), Cloudinary, and Room.",
      "Developed the AR plant-visualization feature with ARCore (SceneView) and CameraX.",
    ],
    results: ["Shipped as an installable Android app with a public repo and a downloadable APK."],
    stack: [
      "Kotlin", "Jetpack Compose", "ARCore (SceneView)", "CameraX", "Firebase",
      "Room", "Retrofit", "Perenual API", "Cloudinary",
    ],
    links: [
      { label: "Repo", href: "https://github.com/Edo-Bagus/LeafLove" },
      { label: "APK", href: "https://bit.ly/DownloadLeafLove" },
    ],
    gallery: [
      {
        src: "/projects/leaflove/mainmenu.png",
        caption:
          "The home screen. Local weather and humidity sit above the plant care shortcuts, with achievements tracking the owner's streak.",
      },
      {
        src: "/projects/leaflove/AR.png",
        caption:
          "The AR view I built with ARCore. It detects the surface, anchors a 3D plant to it, and grounds it with a contact shadow so you can see the species at real scale.",
      },
      {
        src: "/projects/leaflove/plant.png",
        caption:
          "The plant catalogue. Species are browsable and sortable, each with its light and watering needs, and unlockable with in-app coins.",
      },
    ],
  },
  {
    slug: "kkn-langkara-talambo",
    title: "KKN · Langkara Talambo",
    blurb:
      "A full-stack site for a UGM community-service team, built solo. Every member publishes their fieldwork as an article, filed under the programme's clusters and searchable by author, topic, and date.",
    role: "Full-stack Developer (solo)",
    year: "2025",
    tags: ["Next.js", "MongoDB", "GSAP", "Vercel"],
    context: "KKN PPM UGM 2025 · solo build",
    problem:
      "A team of students spends weeks doing fieldwork across two villages, and the record of it usually scatters across chats and drives. They needed one place that would outlast the programme.",
    contributions: [
      "Built the whole site solo: a Next.js 15 frontend and a MongoDB backend.",
      "Wrote a markdown article system with reading-time, so each member could publish their own programme write-up.",
      "Built the archive around it: search plus filters by cluster, author, and date, and a timeline that groups the programmes under their academic clusters.",
      "Layered in motion with GSAP, Framer Motion, and Lenis, and shipped it on Vercel.",
    ],
    results: ["Live in production, carrying the team's programme write-ups across both villages."],
    stack: [
      "Next.js 15", "React 19", "TypeScript", "Tailwind", "shadcn/ui",
      "MongoDB (Mongoose)", "react-markdown", "GSAP", "Framer Motion", "Lenis", "Vercel",
    ],
    links: [
      { label: "Live", href: "https://web-kkn-five.vercel.app" },
      { label: "Repo", href: "https://github.com/Edo-Bagus/WebKKN" },
    ],
    gallery: [
      {
        src: "/projects/kkn-langkara-talambo/hero.png",
        caption:
          "The landing page. A serif editorial look on dark earth tones, introducing the team's work across Tahunan and Tahunan Baru in Tegalombo, Pacitan.",
      },
      {
        src: "/projects/kkn-langkara-talambo/program.png",
        caption:
          "The programme archive. Each member's fieldwork write-up becomes a card, with search and filters by cluster, author, and date.",
      },
      {
        src: "/projects/kkn-langkara-talambo/timeline.png",
        caption:
          "The programmes laid out on a timeline, grouped by academic cluster: science and technology, social sciences and humanities, and the rest.",
      },
      {
        src: "/projects/kkn-langkara-talambo/team.png",
        caption:
          "The team carousel. One card per member with their faculty and study programme.",
      },
    ],
  },
  {
    slug: "sre-ugm",
    title: "SRE UGM",
    blurb:
      "A bilingual profile site for the Society of Renewable Energy UGM, with a nested sub-site for Revogy, the org's annual renewable-energy event, down to its case-competition page.",
    role: "Full-stack Developer",
    year: "2025",
    tags: ["Next.js", "Tailwind", "i18n"],
    context: "Develoop client project",
    problem:
      "The student sustainability org needed one site that spoke to both Indonesian and English visitors, and that could carry its annual Revogy event and the competitions under it.",
    contributions: [
      "Built the site end to end in full-stack Next.js.",
      "Wrote the Indonesian/English switcher, the animated hero, and the policy, innovation, and community sections.",
      "Built the Revogy event sub-site: its own landing page with vision and mission, plus a page per competition such as the Energy Policy Case Competition.",
    ],
    results: ["Live in production at sreugm.com."],
    stack: ["Next.js", "React", "Tailwind", "i18n"],
    links: [{ label: "Live", href: "https://sreugm.com" }],
    gallery: [
      {
        src: "/projects/sre-ugm/hero.png",
        caption:
          "The bilingual landing page. An animated hero over the org's tagline, with policy, innovation, and community as the three entry points.",
      },
      {
        src: "/projects/sre-ugm/revogy.png",
        caption:
          "The Revogy sub-site. SRE UGM's annual renewable-energy event gets its own landing page, carrying the event's vision and mission.",
      },
      {
        src: "/projects/sre-ugm/epcc.png",
        caption:
          "A competition page under Revogy: the Energy Policy Case Competition, with its timeline, prize pool, benefits, and registration.",
      },
    ],
  },
];

export function getProject(slug: string | null | undefined) {
  return projects.find((p) => p.slug === slug);
}

/* ---------- Toolkit ---------- */
export type Tech = { name: string; icon: string }; // icon = key in TechIcons map

export const techStack: Tech[] = [
  { name: "Python", icon: "python" },
  { name: "TypeScript", icon: "typescript" },
  { name: "Go", icon: "go" },
  { name: "Kotlin", icon: "kotlin" },
  { name: "PyTorch", icon: "pytorch" },
  { name: "scikit-learn", icon: "sklearn" },
  { name: "FastAPI", icon: "fastapi" },
  { name: "Next.js", icon: "nextjs" },
  { name: "React", icon: "react" },
  { name: "Node.js", icon: "node" },
  { name: "Tailwind", icon: "tailwind" },
  { name: "PostgreSQL", icon: "postgres" },
  { name: "SQL", icon: "sql" },
  { name: "MongoDB", icon: "mongodb" },
  { name: "Tableau", icon: "tableau" },
  { name: "Firebase", icon: "firebase" },
  { name: "Docker", icon: "docker" },
  { name: "Android", icon: "android" },
  { name: "Supabase", icon: "supabase" },
  { name: "Vercel", icon: "vercel" },
  { name: "Git", icon: "git" },
  { name: "Godot", icon: "godot" },
];

export const capabilities: { title: string; items: string[] }[] = [
  {
    title: "AI / ML",
    items: [
      "Retrieval-Augmented Generation (RAG)",
      "LLM APIs: Groq/Llama, Claude, GPT",
      "Reinforcement Learning (DQN)",
      "CNN / LSTM, Decision Trees, XGBoost",
    ],
  },
  {
    title: "Engineering",
    items: [
      "REST APIs & backends (Go, FastAPI, Node)",
      "ETL & data pipelines",
      "AR (ARCore)",
      "Signal processing, IoT sensor data",
    ],
  },
];
