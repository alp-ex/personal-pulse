// ============================================
// WORLD TAB
// ============================================

export const NEWS_FEEDS = [
  { name: "BBC World", url: "https://feeds.bbci.co.uk/news/world/rss.xml" },
  { name: "BBC Business", url: "https://feeds.bbci.co.uk/news/business/rss.xml" },
  { name: "Al Jazeera", url: "https://www.aljazeera.com/xml/rss/all.xml" },
  { name: "The Guardian", url: "https://www.theguardian.com/world/rss" },
  { name: "NPR News", url: "https://feeds.npr.org/1001/rss.xml" },
];

export const SUBREDDITS = [
  "worldnews",
  "economics",
  "dataisbeautiful",
  "geopolitics",
];

export const WORLD_BANK_INDICATORS = [
  { code: "NY.GDP.MKTP.CD", name: "World GDP (current US$)", country: "WLD" },
  { code: "SP.POP.TOTL", name: "World Population", country: "WLD" },
  { code: "EN.ATM.CO2E.KT", name: "CO₂ Emissions (kt)", country: "WLD" },
  { code: "SP.DYN.LE00.IN", name: "Life Expectancy at Birth", country: "WLD" },
  { code: "SI.POV.DDAY", name: "Poverty Headcount (% at $2.15/day)", country: "WLD" },
];

export const OWID_CHARTS = [
  { slug: "child-mortality", title: "Child Mortality Rate" },
  { slug: "co2-emissions-per-capita", title: "CO₂ Emissions Per Capita" },
  { slug: "share-of-population-in-extreme-poverty", title: "Share of Population in Extreme Poverty" },
  { slug: "world-gdp-over-the-last-two-millennia", title: "World GDP Over Time" },
  { slug: "life-expectancy", title: "Life Expectancy" },
];

export const BOOK_TOPICS = [
  "world economics",
  "geopolitics",
  "climate change",
  "global health",
  "technology society",
];

export const BLUESKY_QUERIES = [
  "world news",
  "climate change",
  "global economy",
  "technology",
];

export const HN_API_BASE = "https://hacker-news.firebaseio.com/v0";

// ============================================
// TECH TAB
// ============================================

export const TECH_FEEDS = [
  { name: "Ars Technica", url: "https://feeds.arstechnica.com/arstechnica/index" },
  { name: "MIT Tech Review", url: "https://www.technologyreview.com/feed/" },
  { name: "Wired", url: "https://www.wired.com/feed/rss" },
  { name: "IEEE Spectrum", url: "https://spectrum.ieee.org/feeds/feed.rss" },
];

export const TECH_SUBREDDITS = [
  "technology",
  "MachineLearning",
  "artificial",
  "science",
  "Futurology",
];

export const TECH_BLUESKY = [
  "artificial intelligence",
  "machine learning",
  "cybersecurity",
  "open source",
];

export const TECH_BOOKS = [
  "artificial intelligence",
  "cybersecurity",
  "computer science",
  "robotics",
  "quantum computing",
];

export const TECH_OWID = [
  { slug: "internet-users-by-world-region", title: "Internet Users by Region" },
  { slug: "technology-adoption-by-households-in-the-united-states", title: "Technology Adoption (US)" },
  { slug: "number-of-internet-users", title: "Number of Internet Users" },
];

// ============================================
// JOBS TAB
// ============================================

export const JOBS_SUBREDDITS = [
  "jobs",
  "careerguidance",
  "cscareerquestions",
  "remotework",
  "recruitinghell",
];

export const JOBS_FEEDS = [
  { name: "Harvard Business Review", url: "https://feeds.hbr.org/harvardbusiness" },
  { name: "Fast Company Work", url: "https://www.fastcompany.com/work-life/rss" },
];

export const JOBS_BLUESKY = [
  "job market",
  "hiring trends",
  "remote work",
  "career advice",
];

export const JOBS_BOOKS = [
  "career development",
  "job interview skills",
  "remote work",
  "salary negotiation",
  "professional networking",
];

export const JOBS_INDICATORS = [
  { code: "SL.UEM.TOTL.ZS", name: "Unemployment Rate (%)", country: "WLD" },
  { code: "SL.TLF.TOTL.IN", name: "Total Labor Force", country: "WLD" },
];

// ============================================
// HUSTLE TAB (Freelancing & Business)
// ============================================

export const HUSTLE_SUBREDDITS = [
  "freelance",
  "Entrepreneur",
  "smallbusiness",
  "SideProject",
  "startups",
];

export const HUSTLE_FEEDS = [
  { name: "Indie Hackers", url: "https://www.indiehackers.com/feed.xml" },
  { name: "Seth Godin", url: "https://feeds.feedblitz.com/sethsblog" },
];

export const HUSTLE_BLUESKY = [
  "freelancing",
  "indie hacker",
  "side project",
  "startup launch",
];

export const HUSTLE_BOOKS = [
  "freelancing business",
  "startup entrepreneurship",
  "marketing small business",
  "passive income",
  "solopreneur",
];

// ============================================
// FINANCE TAB (Family Finances)
// ============================================

export const FINANCE_SUBREDDITS = [
  "personalfinance",
  "frugal",
  "financialindependence",
  "povertyfinance",
  "investing",
];

export const FINANCE_FEEDS = [
  { name: "NerdWallet", url: "https://www.nerdwallet.com/blog/feed/" },
  { name: "Mr. Money Mustache", url: "https://www.mrmoneymustache.com/feed/" },
];

export const FINANCE_BLUESKY = [
  "personal finance",
  "budgeting tips",
  "investing",
  "financial independence",
];

export const FINANCE_BOOKS = [
  "personal finance",
  "investing beginners",
  "budgeting money",
  "financial independence",
  "wealth building",
];

export const FINANCE_INDICATORS = [
  { code: "FP.CPI.TOTL.ZG", name: "Inflation Rate (%)", country: "WLD" },
  { code: "FR.INR.RINR", name: "Real Interest Rate (%)", country: "USA" },
  { code: "NY.GNP.PCAP.CD", name: "GNI Per Capita (US$)", country: "WLD" },
];
