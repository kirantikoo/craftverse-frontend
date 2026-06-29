export type PageCard = {
  title: string;
  description: string;
  href: string;
  cta: string;
  meta: string;
  emoji: string;
};

export type CraftPage = {
  eyebrow: string;
  title: string;
  description: string;
  primaryHref: string;
  primaryCta: string;
  secondaryHref: string;
  secondaryCta: string;
  cards: PageCard[];
};

const tutorialCards: PageCard[] = [
  { title: "Easy Tote Bag", description: "A beginner-friendly sewing project with fabric prep, handles and tidy finishing.", href: "/tutorials/easy-tote-bag", cta: "Start Tutorial", meta: "25 min · +50 XP", emoji: "👜" },
  { title: "Crochet Flower", description: "Practice a cozy flower motif with simple stitches and a quick repeat pattern.", href: "/tutorials/crochet-flower", cta: "Start Tutorial", meta: "18 min · +35 XP", emoji: "🌸" },
  { title: "Paper Butterfly", description: "Fold a bright paper butterfly for today's challenge and upload your result.", href: "/tutorials/paper-butterfly", cta: "Start Challenge", meta: "15 min · +25 XP", emoji: "🦋" },
];

const categoryCards: PageCard[] = [
  { title: "Sewing", description: "Machine basics, measurements, fabric choice and garment projects.", href: "/sewing", cta: "Open Sewing", meta: "120+ tutorials", emoji: "🧵" },
  { title: "Crochet", description: "Flowers, bags, toys, blankets and portable projects.", href: "/crochet", cta: "Open Crochet", meta: "150+ tutorials", emoji: "🧶" },
  { title: "Knitting", description: "Soft accessories, stitch practice and mindful repeat patterns.", href: "/knitting", cta: "Open Knitting", meta: "90+ tutorials", emoji: "🪡" },
  { title: "Embroidery", description: "Hoop art, florals, borders and decorative repair ideas.", href: "/embroidery", cta: "Open Embroidery", meta: "110+ tutorials", emoji: "🌸" },
  { title: "Paper Craft", description: "Origami, decor, cards and quick family-friendly challenges.", href: "/diy", cta: "Open DIY", meta: "80+ tutorials", emoji: "📦" },
  { title: "Painting", description: "Color studies, canvas projects and relaxing creative sessions.", href: "/painting", cta: "Open Painting", meta: "100+ tutorials", emoji: "🎨" },
];

export const craftPages: Record<string, CraftPage> = {
  learn: {
    eyebrow: "Learning Path",
    title: "Learn Creative Skills",
    description: "Follow structured lessons, earn XP and move from beginner basics into confident handmade projects.",
    primaryHref: "/tutorials",
    primaryCta: "View All tutorials",
    secondaryHref: "/ai-tutor",
    secondaryCta: "Chat with AI",
    cards: [
      { title: "Machine Basics", description: "Threading, stitch length, tension and safe first seams.", href: "/sewing", cta: "Begin Sewing", meta: "Beginner path", emoji: "🧵" },
      { title: "Craft Foundations", description: "Materials, tools, planning and finishing habits that make projects shine.", href: "/explore", cta: "Explore Skills", meta: "Core lessons", emoji: "✨" },
      { title: "Daily Practice", description: "Small quests to keep your streak alive and grow your confidence.", href: "/dashboard", cta: "View Progress", meta: "+50 XP today", emoji: "🏆" },
    ],
  },
  explore: {
    eyebrow: "Inspiration",
    title: "Explore Craft Categories",
    description: "Browse sewing, crochet, knitting, embroidery, DIY and painting spaces curated for your next make.",
    primaryHref: "/tutorials",
    primaryCta: "View All tutorials",
    secondaryHref: "/create",
    secondaryCta: "Start Creating",
    cards: categoryCards,
  },
  create: {
    eyebrow: "Create",
    title: "Start a New Project",
    description: "Choose a tutorial, ask the AI tutor for help and turn your idea into something you can share or sell.",
    primaryHref: "/tutorials",
    primaryCta: "Choose Tutorial",
    secondaryHref: "/ai-tutor",
    secondaryCta: "Chat with AI",
    cards: [
      { title: "Upload Result", description: "Prepare your finished project for the community gallery and XP rewards.", href: "/projects", cta: "Open Projects", meta: "Share to earn XP", emoji: "📸" },
      { title: "Ask for Help", description: "Get substitutions, translations and step-by-step explanations.", href: "/ai-tutor", cta: "Chat with AI", meta: "Free AI tutor", emoji: "🤖" },
      { title: "Sell a Pattern", description: "Package digital files, PDFs or handmade items for the marketplace.", href: "/shop", cta: "Open Shop", meta: "Creator economy", emoji: "🛍️" },
    ],
  },
  tutorials: {
    eyebrow: "Tutorial Library",
    title: "Trending Tutorials",
    description: "Pick a guided project with difficulty, materials, AI summaries and progress tracking.",
    primaryHref: "/tutorials/easy-tote-bag",
    primaryCta: "Start Creating",
    secondaryHref: "/explore",
    secondaryCta: "View All categories",
    cards: tutorialCards,
  },
  sewing: {
    eyebrow: "Sewing",
    title: "Sewing and Garment Making",
    description: "Learn machine basics, measurements, fabric selection and garment construction with guided practice.",
    primaryHref: "/tutorials/easy-tote-bag",
    primaryCta: "Start Creating",
    secondaryHref: "/stitching",
    secondaryCta: "Explore Stitching",
    cards: [
      { title: "Easy Tote Bag", description: "Cut fabric panels, sew handles and finish a useful beginner bag.", href: "/tutorials/easy-tote-bag", cta: "Start Tutorial", meta: "25 min · +50 XP", emoji: "👜" },
      { title: "Measurements", description: "Capture clean body and garment measurements before cutting fabric.", href: "/ai-tutor", cta: "Ask AI Tutor", meta: "Fit helper", emoji: "📏" },
      { title: "Fabric Selection", description: "Match cotton, linen, blends and drape to the project outcome.", href: "/collections", cta: "Save Ideas", meta: "Material guide", emoji: "🧺" },
    ],
  },
  stitching: {
    eyebrow: "Stitching",
    title: "Stitching Practice Studio",
    description: "Build steady hands with seam practice, finishing techniques and repair-ready stitching basics.",
    primaryHref: "/sewing",
    primaryCta: "Open Sewing",
    secondaryHref: "/ai-tutor",
    secondaryCta: "Chat with AI",
    cards: [
      { title: "Straight Seam Drill", description: "Practice clean lines, backstitching and fabric control.", href: "/sewing", cta: "Start Practice", meta: "Beginner", emoji: "🪡" },
      { title: "Seam Allowance", description: "Learn where extra fabric matters and how to avoid tight edges.", href: "/ai-tutor", cta: "Ask AI Tutor", meta: "Fit tip", emoji: "📐" },
      { title: "Finishing Edges", description: "Explore folds, zigzag stitches and neat project interiors.", href: "/projects", cta: "Try Project", meta: "+30 XP", emoji: "✨" },
    ],
  },
  crochet: {
    eyebrow: "Crochet",
    title: "Crochet Projects",
    description: "Make flowers, bags, toys and blankets with friendly stitch guidance and repeatable patterns.",
    primaryHref: "/tutorials/crochet-flower",
    primaryCta: "Start Creating",
    secondaryHref: "/collections",
    secondaryCta: "Save Collection",
    cards: [
      { title: "Crochet Flower", description: "A quick motif for practicing loops, petals and color changes.", href: "/tutorials/crochet-flower", cta: "Start Tutorial", meta: "18 min · +35 XP", emoji: "🌸" },
      { title: "Mini Bag Idea", description: "Plan a compact handmade bag with handles and lining inspiration.", href: "/create", cta: "Create Project", meta: "Creator pick", emoji: "👜" },
      { title: "Toy Starter", description: "Learn safe shaping ideas before moving into plush crochet toys.", href: "/ai-tutor", cta: "Ask AI Tutor", meta: "Pattern help", emoji: "🧸" },
    ],
  },
  embroidery: {
    eyebrow: "Embroidery",
    title: "Embroidery Studio",
    description: "Create floral hoops, borders, lettering and decorative repairs with calm guided practice.",
    primaryHref: "/create",
    primaryCta: "Start Creating",
    secondaryHref: "/community",
    secondaryCta: "Explore Community",
    cards: [
      { title: "Floral Hoop", description: "Plan petals, leaves and thread colors for a polished hoop design.", href: "/create", cta: "Create Project", meta: "Design path", emoji: "🌺" },
      { title: "Border Stitches", description: "Use repeated stitches to decorate garments and home textiles.", href: "/learn", cta: "Learn Skill", meta: "Practice set", emoji: "🧵" },
      { title: "Repair Art", description: "Turn mending into a visible, beautiful creative detail.", href: "/community", cta: "See Examples", meta: "Community", emoji: "🪡" },
    ],
  },
  painting: {
    eyebrow: "Painting",
    title: "Painting Projects",
    description: "Explore color, composition and relaxing project prompts for canvas, paper and handmade gifts.",
    primaryHref: "/create",
    primaryCta: "Start Creating",
    secondaryHref: "/collections",
    secondaryCta: "View Collections",
    cards: [
      { title: "Color Warmup", description: "Build a small palette study before a larger craft piece.", href: "/learn", cta: "Learn Skill", meta: "15 min", emoji: "🎨" },
      { title: "Gift Canvas", description: "Turn a simple theme into a handmade wall piece.", href: "/create", cta: "Create Project", meta: "+40 XP", emoji: "🖼️" },
      { title: "Pattern Painting", description: "Paint reusable motifs for clay, resin or paper craft surfaces.", href: "/diy", cta: "Open DIY", meta: "Mixed craft", emoji: "✨" },
    ],
  },
  knitting: {
    eyebrow: "Knitting",
    title: "Knitting Corner",
    description: "Practice stitches, cozy accessories and repeat patterns with progress-friendly lessons.",
    primaryHref: "/create",
    primaryCta: "Start Creating",
    secondaryHref: "/ai-tutor",
    secondaryCta: "Chat with AI",
    cards: [
      { title: "Stitch Sampler", description: "Practice knit and purl rhythm before a bigger wearable project.", href: "/learn", cta: "Learn Skill", meta: "Beginner", emoji: "🪡" },
      { title: "Cozy Scarf", description: "Plan yarn, gauge and a repeat pattern for a soft accessory.", href: "/create", cta: "Create Project", meta: "+45 XP", emoji: "🧣" },
      { title: "Fix a Dropped Stitch", description: "Ask the tutor for recovery steps when your row goes sideways.", href: "/ai-tutor", cta: "Ask AI Tutor", meta: "Quick fix", emoji: "🤖" },
    ],
  },
  diy: {
    eyebrow: "DIY",
    title: "DIY and Paper Craft",
    description: "Try origami, decor, clay, resin and family-friendly projects with easy challenge loops.",
    primaryHref: "/tutorials/paper-butterfly",
    primaryCta: "Start Challenge",
    secondaryHref: "/explore",
    secondaryCta: "View All categories",
    cards: [
      { title: "Paper Butterfly", description: "Fold a bright butterfly and complete today's quick challenge.", href: "/tutorials/paper-butterfly", cta: "Start Tutorial", meta: "15 min · +25 XP", emoji: "🦋" },
      { title: "Origami Decor", description: "Collect simple paper shapes for gifts, garlands and room decor.", href: "/collections", cta: "Save Ideas", meta: "Collection", emoji: "📦" },
      { title: "Clay Trinkets", description: "Plan small clay charms and painted finishes.", href: "/create", cta: "Create Project", meta: "Weekend make", emoji: "⭐" },
    ],
  },
  "ai-tutor": {
    eyebrow: "AI Tutor",
    title: "Ask CraftVerse AI",
    description: "Get multilingual explanations, material substitutions, project ideas and simplified steps.",
    primaryHref: "/ai-tutor",
    primaryCta: "Chat with AI",
    secondaryHref: "/upgrade",
    secondaryCta: "Upgrade Now",
    cards: [
      { title: "Translate Instructions", description: "Switch project guidance between English, Hindi, Punjabi, Spanish, French and Arabic.", href: "/ai-tutor", cta: "Open Tutor", meta: "Multilingual", emoji: "🌍" },
      { title: "Material Alternatives", description: "Find swaps when you do not have the exact fabric, thread or yarn.", href: "/ai-tutor", cta: "Ask AI Tutor", meta: "Free", emoji: "🧺" },
      { title: "Pattern Generator", description: "Create dress, sleeve, blouse and collar patterns as premium assets.", href: "/upgrade", cta: "Upgrade Now", meta: "Premium", emoji: "📐" },
    ],
  },
  community: {
    eyebrow: "Community",
    title: "Creator Community",
    description: "Share finished projects, follow makers, join challenges and grow your CraftVerse reputation.",
    primaryHref: "/projects",
    primaryCta: "Share Project",
    secondaryHref: "/tutorials/paper-butterfly",
    secondaryCta: "Start Challenge",
    cards: [
      { title: "Challenge Wall", description: "See what creators are making for the latest daily quest.", href: "/tutorials/paper-butterfly", cta: "Join Challenge", meta: "Live today", emoji: "🏆" },
      { title: "Creator Pages", description: "Build followers and showcase your handmade progress.", href: "/profile", cta: "Open Profile", meta: "Reputation", emoji: "👤" },
      { title: "Project Gallery", description: "Browse uploaded results and leave encouraging comments.", href: "/projects", cta: "View Projects", meta: "Community", emoji: "📸" },
    ],
  },
  collections: {
    eyebrow: "Collections",
    title: "Saved Creative Boards",
    description: "Organize tutorials, materials, patterns and inspiration into collections for future projects.",
    primaryHref: "/explore",
    primaryCta: "View All categories",
    secondaryHref: "/tutorials",
    secondaryCta: "View All tutorials",
    cards: [
      { title: "Sewing Starter", description: "Pinned fabric guides, tote bag lessons and measurement helpers.", href: "/sewing", cta: "Open Board", meta: "12 saves", emoji: "🧵" },
      { title: "Crochet Florals", description: "Flower motifs, color palettes and quick gift ideas.", href: "/crochet", cta: "Open Board", meta: "18 saves", emoji: "🌸" },
      { title: "DIY Weekend", description: "Fast paper craft, clay and painted decor projects.", href: "/diy", cta: "Open Board", meta: "9 saves", emoji: "📦" },
    ],
  },
  projects: {
    eyebrow: "Projects",
    title: "Your Creative Projects",
    description: "Track work in progress, upload finished results and earn XP for real-world making.",
    primaryHref: "/create",
    primaryCta: "Start Creating",
    secondaryHref: "/dashboard",
    secondaryCta: "View Progress",
    cards: [
      { title: "Tote Bag Draft", description: "Cutting complete. Next step: handles and side seams.", href: "/tutorials/easy-tote-bag", cta: "Continue", meta: "65% complete", emoji: "👜" },
      { title: "Crochet Flower Set", description: "Three flowers ready for a photo upload and XP claim.", href: "/tutorials/crochet-flower", cta: "Review Steps", meta: "+35 XP", emoji: "🌸" },
      { title: "Butterfly Challenge", description: "Join today's quick paper craft challenge.", href: "/tutorials/paper-butterfly", cta: "Start Challenge", meta: "Daily quest", emoji: "🦋" },
    ],
  },
  shop: {
    eyebrow: "Marketplace",
    title: "CraftVerse Shop",
    description: "Discover handmade goods, digital patterns, tutorial bundles and creator-made craft assets.",
    primaryHref: "/upgrade",
    primaryCta: "Upgrade Now",
    secondaryHref: "/create",
    secondaryCta: "Start Selling",
    cards: [
      { title: "Digital Patterns", description: "Sell printable PDFs, SVGs and premium pattern bundles.", href: "/upgrade", cta: "Unlock Premium", meta: "Creator tools", emoji: "📄" },
      { title: "Handmade Clothes", description: "List finished garments and accessories when marketplace opens.", href: "/profile", cta: "Setup Profile", meta: "Coming soon", emoji: "👗" },
      { title: "Craft Kits", description: "Bundle supplies with tutorial paths for beginners.", href: "/collections", cta: "Plan Kit", meta: "Affiliate-ready", emoji: "🧺" },
    ],
  },
  profile: {
    eyebrow: "Profile",
    title: "Your Creator Profile",
    description: "Show your level, badges, uploaded projects, followers and handmade reputation.",
    primaryHref: "/dashboard",
    primaryCta: "View Progress",
    secondaryHref: "/settings",
    secondaryCta: "Edit Settings",
    cards: [
      { title: "Creative Beginner", description: "Level 3 with 650 XP earned through tutorials and challenges.", href: "/dashboard", cta: "View Progress", meta: "650 / 1000 XP", emoji: "⭐" },
      { title: "Project Gallery", description: "Your public showcase for finished craft uploads.", href: "/projects", cta: "View Projects", meta: "6 uploads", emoji: "📸" },
      { title: "Creator Shop", description: "Prepare digital assets and products for future selling.", href: "/shop", cta: "Open Shop", meta: "Marketplace", emoji: "🛍️" },
    ],
  },
  dashboard: {
    eyebrow: "Dashboard",
    title: "Creator Progress",
    description: "Monitor XP, streaks, daily quests, badges and your next recommended creative step.",
    primaryHref: "/tutorials/paper-butterfly",
    primaryCta: "Start Challenge",
    secondaryHref: "/profile",
    secondaryCta: "Open Profile",
    cards: [
      { title: "XP Progress", description: "Level 3 progress is moving toward Maker status.", href: "/profile", cta: "Open Profile", meta: "650 / 1000 XP", emoji: "⭐" },
      { title: "Daily Quest", description: "Complete the paper butterfly challenge before midnight.", href: "/tutorials/paper-butterfly", cta: "Start Challenge", meta: "+25 XP", emoji: "🏆" },
      { title: "AI Usage", description: "Tutor prompts and translation support are ready for today's session.", href: "/ai-tutor", cta: "Chat with AI", meta: "Free tier", emoji: "🤖" },
    ],
  },
  notifications: {
    eyebrow: "Notifications",
    title: "CraftVerse Updates",
    description: "Catch challenge reminders, community activity, creator milestones and marketplace notices.",
    primaryHref: "/dashboard",
    primaryCta: "View Progress",
    secondaryHref: "/settings",
    secondaryCta: "Manage Settings",
    cards: [
      { title: "Daily Challenge", description: "Paper Butterfly is ready with a quick XP reward.", href: "/tutorials/paper-butterfly", cta: "Start Challenge", meta: "New", emoji: "🏆" },
      { title: "Community Likes", description: "Creators reacted to your crochet flower upload.", href: "/community", cta: "Open Community", meta: "12 likes", emoji: "💬" },
      { title: "Premium Tip", description: "Pattern generation is available with CraftVerse Pro.", href: "/upgrade", cta: "Upgrade Now", meta: "Premium", emoji: "👑" },
    ],
  },
  settings: {
    eyebrow: "Settings",
    title: "Account Settings",
    description: "Control language, notifications, accessibility preferences, storage and profile basics.",
    primaryHref: "/profile",
    primaryCta: "Open Profile",
    secondaryHref: "/notifications",
    secondaryCta: "View Notifications",
    cards: [
      { title: "Language", description: "Choose English, Hindi, Punjabi, Spanish, French or Arabic guidance.", href: "/ai-tutor", cta: "Try Translation", meta: "AI tutor", emoji: "🌍" },
      { title: "Notifications", description: "Tune challenge reminders and creator activity alerts.", href: "/notifications", cta: "Open Alerts", meta: "FCM ready", emoji: "🔔" },
      { title: "Premium Storage", description: "Unlock more project space and exclusive avatar options.", href: "/upgrade", cta: "Upgrade Now", meta: "AUD 9.99", emoji: "👑" },
    ],
  },
  admin: {
    eyebrow: "Admin",
    title: "Admin Control Center",
    description: "Manage users, tutorials, community reports, marketplace items, AI usage and moderation queues.",
    primaryHref: "/dashboard",
    primaryCta: "View Dashboard",
    secondaryHref: "/notifications",
    secondaryCta: "Review Alerts",
    cards: [
      { title: "Tutorial Queue", description: "Review embedded YouTube lessons, AI summaries and materials lists.", href: "/tutorials", cta: "Review Tutorials", meta: "24 pending", emoji: "📚" },
      { title: "Moderation", description: "Check reports, image moderation and community safety signals.", href: "/community", cta: "Open Community", meta: "5 reports", emoji: "🛡️" },
      { title: "AI Usage", description: "Track tutor requests, translation volume and premium feature adoption.", href: "/ai-tutor", cta: "View AI Tutor", meta: "Analytics", emoji: "🤖" },
    ],
  },
  upgrade: {
    eyebrow: "Premium",
    title: "Upgrade to CraftVerse Pro",
    description: "Unlock unlimited AI, advanced tutorials, pattern generation, premium badges and more storage.",
    primaryHref: "/upgrade",
    primaryCta: "Upgrade Now",
    secondaryHref: "/ai-tutor",
    secondaryCta: "Chat with AI",
    cards: [
      { title: "Unlimited AI", description: "Ask for explanations, translations and material swaps without tight limits.", href: "/ai-tutor", cta: "Try AI Tutor", meta: "Premium", emoji: "🤖" },
      { title: "Pattern Generator", description: "Generate sleeve, blouse, dress and collar patterns as SVG, PDF or PNG.", href: "/upgrade", cta: "Upgrade Now", meta: "AUD 9.99/mo", emoji: "📐" },
      { title: "Premium Badges", description: "Show upgraded reputation with exclusive creator profile rewards.", href: "/profile", cta: "View Profile", meta: "Creator status", emoji: "👑" },
    ],
  },
  "easy-tote-bag": {
    eyebrow: "Sewing Tutorial",
    title: "Easy Tote Bag",
    description: "Sew a useful beginner tote with fabric panels, handles, straight seams and tidy finishing.",
    primaryHref: "/create",
    primaryCta: "Start Creating",
    secondaryHref: "/ai-tutor",
    secondaryCta: "Chat with AI",
    cards: [
      { title: "Materials", description: "Cotton fabric, matching thread, scissors, pins and a sewing machine.", href: "/collections", cta: "Save Materials", meta: "Prep list", emoji: "🧺" },
      { title: "Step 1", description: "Cut front, back and handle pieces with clean seam allowance.", href: "/ai-tutor", cta: "Ask AI Tutor", meta: "Cutting", emoji: "✂️" },
      { title: "Step 2", description: "Sew handles, attach them evenly and close the side seams.", href: "/projects", cta: "Track Project", meta: "+50 XP", emoji: "👜" },
      { title: "Common Mistake", description: "Uneven handles usually come from skipping measurements before pinning.", href: "/ai-tutor", cta: "Get Help", meta: "Fit check", emoji: "📏" },
    ],
  },
  "crochet-flower": {
    eyebrow: "Crochet Tutorial",
    title: "Crochet Flower",
    description: "Make a cheerful flower motif while practicing loops, petals and simple color changes.",
    primaryHref: "/create",
    primaryCta: "Start Creating",
    secondaryHref: "/ai-tutor",
    secondaryCta: "Chat with AI",
    cards: [
      { title: "Materials", description: "Yarn, crochet hook, scissors and a yarn needle for finishing.", href: "/collections", cta: "Save Materials", meta: "Prep list", emoji: "🧶" },
      { title: "Step 1", description: "Create the center ring and keep your tension relaxed.", href: "/ai-tutor", cta: "Ask AI Tutor", meta: "Center", emoji: "⭕" },
      { title: "Step 2", description: "Repeat petal stitches around the center for a full flower.", href: "/projects", cta: "Track Project", meta: "+35 XP", emoji: "🌸" },
      { title: "Tip", description: "Use contrasting yarn for petals so the shape reads clearly in photos.", href: "/community", cta: "Share Result", meta: "Creator tip", emoji: "📸" },
    ],
  },
  "paper-butterfly": {
    eyebrow: "Daily Challenge",
    title: "Paper Butterfly",
    description: "Fold a quick paper butterfly, upload your result and claim today's challenge XP.",
    primaryHref: "/create",
    primaryCta: "Start Challenge",
    secondaryHref: "/community",
    secondaryCta: "Explore Community",
    cards: [
      { title: "Materials", description: "Square paper, optional markers and a flat surface for crisp folds.", href: "/collections", cta: "Save Materials", meta: "Prep list", emoji: "📦" },
      { title: "Step 1", description: "Fold diagonals and center lines so the wings align neatly.", href: "/ai-tutor", cta: "Ask AI Tutor", meta: "Folding", emoji: "🦋" },
      { title: "Step 2", description: "Shape the body, open the wings and decorate with color.", href: "/projects", cta: "Track Project", meta: "+25 XP", emoji: "🎨" },
      { title: "Upload Result", description: "Share your butterfly with the community challenge wall.", href: "/community", cta: "Share Result", meta: "Daily quest", emoji: "🏆" },
    ],
  },
};
