export interface Product {
  id: number;
  categoryId: number;
  name: string;
  description: string;
  techStack: string;
  status: "available" | "coming_soon";
  features: string[];
  websiteUrl: string;
  screenshots: string[];
  sortOrder: number;
}

// Automatically handles local vs GitHub Pages base path
const base = import.meta.env.BASE_URL || '/';

export const products: Product[] = [
  // ─── Academic Tools ───
  {
    id: 1,
    categoryId: 1,
    name: "BU CGPA Calculator",
    description:
      "BU CGPA Calculator is a Free Software, built with best practices of software engineering, for calculating the CGPA of students. It is a lightweight and easy-to-use tool that can be used by anyone, regardless of their technical expertise.",
    techStack: "HTML, CSS, Javascript, Secret sauce",
    status: "available",
    features: [
      "Semester Management",
      "Marks Entry",
      "GPA Calculation",
      "Credit Hours",
      "CGPA Calculation",
      "Save Data",
      "Mobile responsive design",
    ],
    websiteUrl: "https://khan-4-at-swiss.github.io/Bahria-University-CGPA-GPA-calculator/",
    screenshots: [`${base}images/gpa.jpg`],
    sortOrder: 1,
  },
  {
    id: 2,
    categoryId: 1,
    name: "File Compressor",
    description:
      "The software compress files (images, PDFs, etc.); it saves space without cutting corners.",
    techStack: "Three.js, React Three Fiber, React Three Drei, CSS animations and gradients for the forge background, Web Audio API for interface sounds",
    status: "available",
    features: [
      "File Compression",
      "Image Compression",
      "Freedom to select size",
      "Voice feedback",
      "Better than before",
      "Fast and secure",
      "100% privacy guaranteed",
    ],
    websiteUrl: "https://motibilis-gladius-xtreme.netlify.app/",
    screenshots: [`${base}images/zipper.jpg`],
    sortOrder: 2,
  },
  {
    id: 3,
    categoryId: 1,
    name: "PDF Manipulator Tools",
    description:
      "PDF Manipulator Tools is a Free Software, built with best practices of software engineering, for merging, splitting, compressing and converting PDF files. It is a lightweight and easy-to-use tool that can be used by anyone, regardless of their technical expertise.",
    techStack: "HTML, CSS, Node.js, secret sauce",
    status: "available",
    features: [
      "Merge Multiple PDFs",
      "Split PDFs",
      "Compress PDFs",
      "Extract text from PDFs",
      "Extract images from PDFs",
      "Convert PDFs to other formats",
      "Convert other formats to PDFs",
      "Rotate PDFs",
      "And much more!",
    ],
    websiteUrl: "https://motibilis-pdf-infinitevoid.netlify.app/",
    screenshots: [`${base}images/pdf.png`],
    sortOrder: 3,
  },

  // ─── Professional Tools ───
  {
    id: 4,
    categoryId: 2,
    name: "Pc/Laptop Testing",
    description:
      "New/Refurbished Pc/Laptop Testing, Benchmarking, and Performance Analysis for Students, Gamers, and PC Enthusiasts. Ensure you get the best performance from your hardware.",
    techStack: "HTML, CSS, JavaScript… and a little secret sauce.",
    status: "available",
    features: [
      "CPU & GPU Stress Testing",
      "RAM & Storage Benchmarking",
      "Thermal Monitoring & Throttling Detection",
      "Time tracking with detailed reports",
      "Resource allocation & workload balancing",
      "Team chat & file sharing",
      "Custom workflow automations",
      "Client portal for external stakeholders",
      "REST & GraphQL API for integrations",
    ],
    websiteUrl: "https://motibilis-teardown.netlify.app/",
    screenshots: [`${base}images/laptop.jpg`],
    sortOrder: 1,
  },
  {
    id: 5,
    categoryId: 2,
    name: "AI Image Detector",
    description:
      "AI Image Detector is a free software, built with best practices of software engineering, for detecting AI-generated images. It is a lightweight and easy-to-use tool that can be used by anyone, regardless of their technical expertise.",
    techStack: "HTML5, CSS3, Vanilla JavaScript, Node.js (JavaScript)",
    status: "available",
    features: [
      "Pixel-Level AI Detection",
      "Client-Side Privacy Protection",
      "Dynamic 3D Medallion",
      "Web Audio Feedback",
      "Secure Serverless Proxy",
    ],
    websiteUrl: "https://gotcha-xtreme-motibilis-x275.netlify.app/",
    screenshots: [`${base}images/AI.jpg`],
    sortOrder: 2,
  },
  {
    id: 6,
    categoryId: 2,
    name: "HR Command Center",
    description:
      "Complete human resource management system featuring employee onboarding, attendance tracking, payroll processing, and performance analytics for growing companies.",
    techStack: "Angular, .NET Core, SQL Server, Azure, SignalR",
    status: "coming_soon",
    features: [
      "Employee onboarding workflows",
      "Biometric attendance integration",
      "Payroll processing with tax deductions",
      "Leave management & approval system",
      "Performance review cycles",
      "Training & development tracking",
      "Organizational chart builder",
      "Custom report generator",
    ],
    websiteUrl: "https://github.com/AFAQXMOTIBILIS",
    screenshots: [`${base}images/motibilis.jpg`],
    sortOrder: 3,
  },

  // ─── Developer Tools / Games ───
  {
    id: 7,
    categoryId: 3,
    name: "Ludo Game",
    description:
      "A powerful and interactive Ludo Game for players to enjoy.",
    techStack: "Kotlin, Jetpack Compose, Ktor/Sockets, Kotlin Coroutines & Flow, Room Database, Firebase",
    status: "available",
    features: [
      "Pass & Play (Local): Play with up to 4 friends on a single screen.",
      "AI Skirmish (Offline): Practice against smart, adaptive computer bots.",
      "Wi-Fi Multiplayer: Host or join matches over a local network using Direct IP or auto-discovery.",
      "Luxury 3D Board: A beautifully rendered mahogany wood-grain board with beveled tiles.",
      "Dynamic Tokens: Realistic 'glass' tokens with 3D shading, drop shadows, and bounce animations.",
      "Animated Dice: 3D dice rolling physics.",
      "Tactile Rumble Engine: Integrated haptic feedback for a physical feel during gameplay.",
      "Social Play: In-game chat and a quick emoji tray for multiplayer interaction.",
      "Match Feed: A real-time log tracking every move and roll in the match.",
      "Adaptive Layout: Supports both mobile portrait and tablet landscape (split-panel) views."
    ],
    websiteUrl: "https://khan-4-at-swiss.github.io/motibilis-ludo/",
    screenshots: [`${base}images/ludo.jpg`],
    sortOrder: 1,
  },
  {
    id: 8,
    categoryId: 3,
    name: "Chess Game",
    description:
      "It all started here. This software was created for my brother Ismaeel, and it is dedicated to all brothers everywhere. It allows you to connect to the same Wi-Fi and play together without needing the internet. It is about joy, connection, and the special bond that brothers share.",
    techStack: "Kotlin, Jetpack Compose, SQLite/Room, HTML5/CSS3, JavaScript",
    status: "available",
    features: [
      "Advanced Chess Engine (Offline): High-performance minimax engine with Alpha-Beta pruning.",
      "Multiple Gameplay Modes: Singleplayer vs AI, Local Pass & Play, and Wi-Fi Nearby Multiplayer.",
      "Premium Visuals: Luxury themes, 3D metallic and glass chess pieces, and modern Material Design UI.",
      "Immersive Experience: Haptic feedback for moves and captures, plus physicalized sound effects.",
      "Interactive Landing Page: Cinematic scroll-synced video and direct APK download delivery.",
    ],
    websiteUrl: "https://github.com/AFAQXMOTIBILIS",
    screenshots: [`${base}images/ludoo.jpeg`],
    sortOrder: 2,
  },
  {
    id: 9,
    categoryId: 3,
    name: "Kids Games",
    description:
      "The GUI and interface have been developed by Motibilis Roar AI, marking a significant milestone of innovation and achievement. Designed as casual games for children, the product delivers engaging experiences that kids are sure to love.",
    techStack: "JavaScript (ES6+): Core game engines, Minimax AI, Canvas 2D, HTML5: Mobile layout structure, Capacitor & Android Native: APK packaging, Native WebView, Haptic vibration bridge, Vite: Production bundler, CSS3: Mobile layout structure, Vanilla CSS3 (Humanistic Design System): Custom CSS variables for organic color theming, 3D card flip transforms and perspective styling, 2D clockwise rotational keyframe animation for the emblem, Touch optimized UI with spring physics transitions",
    status: "available",
    features: [
      "Humanistic & Warm User Interface: Warm organic color palette (terracotta, olive sage, amber, cream), Dynamic, time aware greeting based on local time, Continuous 2D clockwise rotating Motibilis emblem, Clean, readable typography using Plus Jakarta Sans and Outfit",
      "Built-in Sound & Haptics Synthesizer: Zero external audio dependencies: generates tones dynamically via the Web Audio API, Individual frequencies for game actions (clicks, pops, bounces, jump wooshes, win jingles), Real-time device vibration feedback on Android phones",
      "Offline & Zero Battery Drain: All games run 100% offline without needing internet, High scores and win streaks are saved in local storage",
      "Complete Game Lineup (11 Games): Tic Tac Toe (Flagship): 4 AI difficulty levels: Noob, Casual, Hard, and Grandmaster (unbeatable Minimax), Local 2-Player Pass and Play mode, Visual line highlights and celebratory fanfare, Brick Breaker (Breakout Deluxe): Paddle drag controls, multi-tier colorful bricks, score multipliers, and a 3 lives system, Connect 4 (4 in a Row): Gravity falling discs, tactical AI with win/block detection, and 2-player mode", 
      "Snake Retro: Touch swipe gestures plus virtual on-screen D-pad, food item glows, and speed scaling, 2048 Ultra: Smooth numerical tile sliding and merging with swipe and keyboard controls, Memory Match: 3D flipping card pairs with 4x4 and 6x4 layouts, active timer, and move counter, Pong Battle: Fluid touch paddle tracking with ball spin deflection against an adaptive AI, Minesweeper Sweeper Pro: Guaranteed safe first click, Dig Mode vs Flag Mode toggle buttons for mobile, and recursive empty reveal",
      "Whack-a-Mole (Tap Frenzy): 30-second rapid challenge with animated moles and score counters, Simon Rhythm: 4-pad sequence memory with matching musical notes (C4, E4, G4, C5), Flappy Flight: Tap to glide physics, obstacle pipes, and score gates",
    ],
    websiteUrl: "https://drive.google.com/uc?export=download&id=1dGpr7nsnNuDTFYRSwJzjbUAW1cH7Ek-b",
    screenshots: [`${base}images/kimmm.jpg`],
    sortOrder: 3,
  },
];

export function getProductById(id: number): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(categoryId: number): Product[] {
  return products
    .filter((p) => p.categoryId === categoryId)
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getComingSoonProducts(): Product[] {
  return products.filter((p) => p.status === "coming_soon");
}