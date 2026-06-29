export type TutorialDifficulty = "Beginner" | "Easy" | "Intermediate";

export type TutorialStep = {
  title: string;
  lesson: string;
  duration: string;
};

export type Tutorial = {
  slug: string;
  title: string;
  category: string;
  difficulty: TutorialDifficulty;
  timeRequired: string;
  xp: number;
  emoji: string;
  description: string;
  videoTitle: string;
  aiSummary: string;
  materials: string[];
  steps: TutorialStep[];
  tips: string[];
  commonMistakes: string[];
};

export const tutorials: Tutorial[] = [
  {
    slug: "easy-tote-bag",
    title: "Easy Tote Bag",
    category: "Sewing",
    difficulty: "Beginner",
    timeRequired: "25 min",
    xp: 50,
    emoji: "👜",
    description: "Sew a practical tote bag while learning clean seams, handle placement and simple finishing.",
    videoTitle: "Embedded YouTube tutorial placeholder",
    aiSummary: "This project teaches straight stitching, seam allowance and handle alignment. CraftVerse AI recommends cotton fabric for the first attempt because it stays stable under the machine and presses cleanly.",
    materials: ["Cotton fabric", "Matching thread", "Fabric scissors", "Pins or clips", "Measuring tape", "Sewing machine"],
    steps: [
      { title: "Cut the fabric panels", lesson: "Measure and cut two equal rectangles for the tote body. Keep edges squared so the side seams line up neatly.", duration: "5 min" },
      { title: "Prepare the handles", lesson: "Fold each handle strip lengthwise, press it flat and stitch along the open edge for strength.", duration: "6 min" },
      { title: "Attach handles evenly", lesson: "Pin handles to the top edge at matching distances from each side seam. Check that they are not twisted.", duration: "5 min" },
      { title: "Sew and finish the bag", lesson: "Stitch the side and bottom seams, turn the bag right side out and press the top edge for a tidy finish.", duration: "9 min" },
    ],
    tips: ["Press fabric before cutting.", "Use clips if pins leave marks.", "Backstitch at the start and end of handle seams."],
    commonMistakes: ["Uneven handles from skipping measurements.", "Loose seams from forgetting to backstitch.", "Wavy edges from pulling fabric through the machine."],
  },
  {
    slug: "crochet-flower",
    title: "Crochet Flower",
    category: "Crochet",
    difficulty: "Easy",
    timeRequired: "18 min",
    xp: 35,
    emoji: "🌸",
    description: "Crochet a small flower motif for bags, hair clips, greeting cards or handmade decorations.",
    videoTitle: "Embedded YouTube tutorial placeholder",
    aiSummary: "This lesson focuses on tension, repeat patterns and petal shaping. CraftVerse AI suggests using two yarn colors so the center and petals are easy to see while learning.",
    materials: ["Yarn in 1-2 colors", "Crochet hook", "Scissors", "Yarn needle", "Stitch marker"],
    steps: [
      { title: "Make the center ring", lesson: "Create a small ring and work the first round with relaxed tension so the flower center stays flat.", duration: "4 min" },
      { title: "Build petal repeats", lesson: "Repeat the same stitch sequence around the center to create even petals.", duration: "7 min" },
      { title: "Shape the flower", lesson: "Gently pull the petals into shape and check that spacing is balanced.", duration: "3 min" },
      { title: "Weave in ends", lesson: "Use a yarn needle to secure tails on the back so the motif is ready to attach.", duration: "4 min" },
    ],
    tips: ["Use a lighter yarn color for your first attempt.", "Count stitches after each petal.", "Block the flower lightly for a flatter finish."],
    commonMistakes: ["Tension too tight around the center.", "Missing a repeat and ending with uneven petals.", "Cutting yarn tails too short to weave securely."],
  },
  {
    slug: "paper-butterfly",
    title: "Paper Butterfly",
    category: "DIY",
    difficulty: "Beginner",
    timeRequired: "15 min",
    xp: 25,
    emoji: "🦋",
    description: "Fold a bright paper butterfly for a fast daily challenge and share it with the community.",
    videoTitle: "Embedded YouTube tutorial placeholder",
    aiSummary: "This project builds confidence with symmetry, crisp folds and decorative finishing. CraftVerse AI recommends starting with medium-weight square paper because it holds shape without tearing.",
    materials: ["Square paper", "Markers or crayons", "Ruler", "Glue dot or tape", "Flat folding surface"],
    steps: [
      { title: "Create guide folds", lesson: "Fold the paper diagonally and horizontally, then open it to reveal clear guide lines.", duration: "4 min" },
      { title: "Shape the wings", lesson: "Bring the folds together and flatten the paper into a butterfly wing base.", duration: "5 min" },
      { title: "Form the body", lesson: "Pinch the center gently and secure it with a small glue dot or tape.", duration: "3 min" },
      { title: "Decorate and upload", lesson: "Add patterns or color to the wings, then prepare a clear photo for the challenge wall.", duration: "3 min" },
    ],
    tips: ["Run a fingernail along each fold for crisp edges.", "Decorate after folding so patterns land in the right place.", "Use contrasting colors for visible wings."],
    commonMistakes: ["Starting with uneven paper.", "Folding too quickly and losing symmetry.", "Using too much glue at the body."],
  },
  {
    slug: "kurti-stitching",
    title: "Kurti Stitching",
    category: "Sewing",
    difficulty: "Intermediate",
    timeRequired: "1 hr 20 min",
    xp: 120,
    emoji: "👗",
    description: "Learn the first structured steps for stitching a simple kurti with measurement planning and clean seams.",
    videoTitle: "Embedded YouTube tutorial placeholder",
    aiSummary: "This tutorial introduces garment planning, body measurements, seam allowance and assembly order. CraftVerse AI recommends making a practice version first so fit changes are less stressful.",
    materials: ["Cotton fabric", "Matching thread", "Measuring tape", "Tailor chalk", "Fabric scissors", "Pins", "Sewing machine"],
    steps: [
      { title: "Take core measurements", lesson: "Measure bust, waist, hip, shoulder, armhole and kurti length. Write each value before cutting.", duration: "15 min" },
      { title: "Mark fabric pieces", lesson: "Fold fabric evenly and mark front, back and sleeve pieces with seam allowance.", duration: "20 min" },
      { title: "Sew shoulder and side seams", lesson: "Join shoulders first, then sew side seams slowly while checking alignment.", duration: "20 min" },
      { title: "Finish neckline and hem", lesson: "Press the neckline, finish raw edges and sew the hem with steady topstitching.", duration: "25 min" },
    ],
    tips: ["Add seam allowance before cutting.", "Test fit before final side seams.", "Press every seam for a professional finish."],
    commonMistakes: ["Mixing body measurements with finished garment measurements.", "Cutting sleeves without checking armhole shape.", "Skipping a test fit before hemming."],
  },
  {
    slug: "sewing-machine-basics",
    title: "Sewing Machine Basics",
    category: "Sewing",
    difficulty: "Beginner",
    timeRequired: "30 min",
    xp: 45,
    emoji: "🧵",
    description: "Get comfortable with threading, stitch settings, tension and safe machine handling.",
    videoTitle: "Embedded YouTube tutorial placeholder",
    aiSummary: "This lesson is the best starting point for new sewists. CraftVerse AI highlights threading order, bobbin placement and gentle fabric control as the three habits that prevent most beginner issues.",
    materials: ["Sewing machine", "Thread", "Bobbin", "Scrap cotton fabric", "Universal needle", "Small scissors"],
    steps: [
      { title: "Learn the machine parts", lesson: "Identify the presser foot, needle, bobbin area, hand wheel, stitch selector and reverse lever.", duration: "7 min" },
      { title: "Thread the machine", lesson: "Follow the thread path slowly from spool to needle and check that the presser foot is raised.", duration: "8 min" },
      { title: "Load the bobbin", lesson: "Place the bobbin correctly and pull up the bobbin thread before sewing.", duration: "6 min" },
      { title: "Sew test lines", lesson: "Practice straight lines on scrap fabric and adjust stitch length only after the first test.", duration: "9 min" },
    ],
    tips: ["Use scrap fabric before starting a project.", "Change dull needles early.", "Keep fingers away from the needle area."],
    commonMistakes: ["Threading with the presser foot down.", "Using the wrong bobbin direction.", "Pulling fabric instead of guiding it."],
  },
];

export const getTutorialBySlug = (slug: string) =>
  tutorials.find((tutorial) => tutorial.slug === slug);
