export const testimonials = [
  {
    name: 'Aarav Mehta',
    role: 'Frontend Engineer at Stripe',
    avatar: 'https://i.pravatar.cc/120?img=12',
    quote:
      'I went from nervous to confident in three weeks. The mock interviews felt shockingly close to the real thing, and the feedback pinpointed exactly where I was weak.',
    rating: 5,
  },
  {
    name: 'Sofia Alvarez',
    role: 'Backend Developer at Shopify',
    avatar: 'https://i.pravatar.cc/120?img=47',
    quote:
      'The system-design drills alone were worth it. I walked into my on-site knowing I could structure any problem, and I got the offer.',
    rating: 5,
  },
  {
    name: 'Daniel Kim',
    role: 'New Grad at Google',
    avatar: 'https://i.pravatar.cc/120?img=33',
    quote:
      'The daily streak kept me honest. Practicing a little every day, with instant scoring, made the prep feel almost like a game.',
    rating: 5,
  },
  {
    name: 'Priya Nair',
    role: 'Full Stack Engineer at Linear',
    avatar: 'https://i.pravatar.cc/120?img=5',
    quote:
      'I loved the behavioral rounds. Recording my answers and reviewing them caught habits I never knew I had. Huge confidence boost.',
    rating: 4,
  },
];

export const faqs = [
  {
    q: 'Is Interview Simulator free to use?',
    a: 'Yes. This demo runs entirely in your browser with local mock data — no account or payment required. Your progress is saved in your browser only.',
  },
  {
    q: 'How realistic are the mock interviews?',
    a: 'Each session pulls from a curated question bank across difficulty levels and categories, with a live countdown timer, notes, bookmarks, and instant AI-style scoring at the end.',
  },
  {
    q: 'Can I practice coding challenges?',
    a: 'Absolutely. The Coding Challenge mode includes a built-in editor, language selector, sample input/output, and a simulated run button so you can rehearse the full loop.',
  },
  {
    q: 'Does my progress sync across devices?',
    a: 'No. Because this is a local-only demo, your streaks, bookmarks, and history live in this browser’s storage and do not transfer to other devices.',
  },
  {
    q: 'Which topics are covered?',
    a: 'Frontend, Backend, Full Stack, Java, C++, Python, React, Node.js, System Design, and Behavioral — with more categories added regularly.',
  },
];

export const achievements = [
  { id: 'first-interview', name: 'First Steps', description: 'Complete your first interview', icon: 'FaShoePrints', color: 'from-sky-500 to-blue-600' },
  { id: 'streak-3', name: 'On a Roll', description: 'Reach a 3-day streak', icon: 'FaFire', color: 'from-orange-500 to-red-600' },
  { id: 'streak-7', name: 'Week Warrior', description: 'Reach a 7-day streak', icon: 'FaBolt', color: 'from-yellow-500 to-amber-600' },
  { id: 'score-90', name: 'Top Tier', description: 'Score 90+ on an interview', icon: 'FaTrophy', color: 'from-violet-500 to-fuchsia-600' },
  { id: 'complete-10', name: 'Dedicated', description: 'Complete 10 interviews', icon: 'FaMedal', color: 'from-emerald-500 to-teal-600' },
  { id: 'coding-master', name: 'Code Slinger', description: 'Solve 5 coding challenges', icon: 'FaCode', color: 'from-cyan-500 to-sky-600' },
];

export const leaderboard = [
  { rank: 1, name: 'Aarav M.', avatar: 'https://i.pravatar.cc/80?img=12', score: 9820, interviews: 142, streak: 41 },
  { rank: 2, name: 'Sofia A.', avatar: 'https://i.pravatar.cc/80?img=47', score: 9540, interviews: 128, streak: 33 },
  { rank: 3, name: 'Daniel K.', avatar: 'https://i.pravatar.cc/80?img=33', score: 9210, interviews: 119, streak: 28 },
  { rank: 4, name: 'Priya N.', avatar: 'https://i.pravatar.cc/80?img=5', score: 8870, interviews: 104, streak: 22 },
  { rank: 5, name: 'Liam O.', avatar: 'https://i.pravatar.cc/80?img=15', score: 8640, interviews: 98, streak: 19 },
  { rank: 6, name: 'Noah S.', avatar: 'https://i.pravatar.cc/80?img=68', score: 8410, interviews: 91, streak: 17 },
  { rank: 7, name: 'Emma R.', avatar: 'https://i.pravatar.cc/80?img=9', score: 8190, interviews: 87, streak: 14 },
  { rank: 8, name: 'You', avatar: 'https://i.pravatar.cc/80?img=64', score: 0, interviews: 0, streak: 0, isYou: true },
];

export const features = [
  {
    icon: 'HiOutlineCommandLine',
    title: 'Realistic mock interviews',
    description: 'Timed sessions across 10+ categories with a live question flow, notes, and bookmarks — just like the real loop.',
    color: 'from-brand-500 to-accent-500',
  },
  {
    icon: 'HiOutlineCodeBracket',
    title: 'Built-in coding challenges',
    description: 'Practice algorithm problems in an in-browser editor with sample I/O and instant simulated runs.',
    color: 'from-emerald-500 to-teal-600',
  },
  {
    icon: 'HiOutlineChartBar',
    title: 'Instant performance scoring',
    description: 'Get an overall score, a radar breakdown, and targeted recommendations the moment you finish.',
    color: 'from-violet-500 to-fuchsia-600',
  },
  {
    icon: 'HiOutlineFire',
    title: 'Streaks & achievements',
    description: 'Daily challenges, streaks, and badges keep your prep consistent and genuinely motivating.',
    color: 'from-orange-500 to-red-600',
  },
  {
    icon: 'HiOutlineSparkles',
    title: 'Behavioral practice',
    description: 'Rehearse STAR stories with a recording UI and structured prompts so you never freeze on “tell me about a time.”',
    color: 'from-rose-500 to-pink-600',
  },
  {
    icon: 'HiOutlineMoon',
    title: 'Beautiful, focused design',
    description: 'A calm dark interface, glassmorphism, and smooth animations keep you in the zone while you practice.',
    color: 'from-cyan-500 to-sky-600',
  },
];
