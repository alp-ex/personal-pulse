export interface TableData {
  headers: string[];
  rows: string[][];
}

export interface SessionSection {
  title: string;
  content: string;
  highlight?: string;
  table?: TableData;
}

export interface ThinkingSession {
  id: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  sections: SessionSection[];
  sources: { label: string; url: string }[];
}

export const THINKING_SESSIONS: ThinkingSession[] = [
  {
    id: "french-market-2026",
    title: "The French Market: Who Survives, Who Disappears, and What Comes Next",
    date: "2026-04-11",
    description:
      "A deep dive into the state of French companies — 5.2 million enterprises, record bankruptcies, the PGE time bomb, AI disruption of white-collar jobs, and where the economy is actually heading.",
    tags: ["France", "Economy", "AI", "Companies", "Future of Work"],
    sections: [
      {
        title: "The French Company Landscape",
        content:
          "France has 5.2 million companies (2023, INSEE). But the reality is wildly unbalanced: 333 large companies and 7,442 mid-caps generate two-thirds of all revenue. Meanwhile, 5 million micro-enterprises create 17% of all jobs.\n\nIn 2025, a historic record of 1,165,800 new companies were created. Two out of three are auto-entrepreneurs. The SAS has replaced the SARL as the default structure — going from 29% to 66% of new corporations in 10 years, while SARL dropped from 63% to 27%.\n\nCreator profile: average age ~35, women represent 44% of individual enterprise creations.",
        highlight: "333 companies + 7,442 mid-caps = two-thirds of all French revenue",
        table: {
          headers: ["Category", "Count", "Employees", "Share of Jobs", "Share of Revenue"],
          rows: [
            ["Micro-enterprises (<10)", "~5,000,000", "2.6M", "17%", "Small"],
            ["PME/SMBs (10-249)", "174,614", "4.6M", "29%", "Moderate"],
            ["ETI/Mid-caps (250-4999)", "7,442", "4.0M", "25%", "~33%"],
            ["Large (5000+)", "333", "4.2M", "28%", "~33%"],
          ],
        },
      },
      {
        title: "Who's Disappearing?",
        content:
          "2025 was a record year for failures: 68,574 collective procedures (bankruptcies/restructurings) — the highest in 35 years. Plus 457,000 company closures, up 50% from 2024.\n\n85% of failing companies have fewer than 5 employees. 95% earn less than 2M EUR. Failures overwhelmingly hit the smallest, youngest companies.\n\nSectors most at risk: construction (rising costs, falling housing starts), retail clothing/furniture (e-commerce + inflation), restaurants (post-COVID debt), transport (+64% vs pre-COVID norms), automobile (Chinese EV competition), and chemistry (high debt, tariffs).\n\nBright spots: hotels (-19% failures), DIY stores (-13%), construction showing first positive signal in Q4 (-8%).",
        highlight: "68,574 bankruptcies in 2025 — a 35-year record. 85% had < 5 employees.",
        table: {
          headers: ["Sector", "Status 2025", "Why"],
          rows: [
            ["Construction/BTP", "Highest failures", "Material costs, housing slowdown"],
            ["Retail (clothing, furniture)", "Very high failures", "E-commerce, inflation"],
            ["Restaurants/Hospitality", "High failures", "Post-COVID debt, costs"],
            ["Transport/Warehousing", "+64% vs pre-COVID", "Fuel, platform competition"],
            ["Automobile", "Deteriorating", "Chinese EV competition"],
            ["Hotels", "-19% failures", "Recovery"],
            ["DIY/Home equipment", "-13% failures", "Improving"],
          ],
        },
      },
      {
        title: "The PGE Time Bomb",
        content:
          "During COVID (2020-2022), the French government told banks: \"Lend to companies to survive. If they can't repay, the state covers 70-90%.\" This was the PGE (Prêt Garanti par l'État).\n\n144.5 billion EUR was lent to ~700,000 companies. 76% has been repaid (~100B EUR). But 38.4 billion EUR is still owed, and 72% of outstanding amounts have a final deadline in summer 2026.\n\n80%+ of borrowers are micro-enterprises. 28% report growing difficulty repaying. 3% can't repay at all. 40% of SMBs with PGE face repayment pressure.\n\nWhen a company defaults: the state pays 70-90% of the loss to the bank. The bank absorbs 10-30%. The company owner loses their business but not personal assets. Projected total cost to taxpayers: 3-4 billion EUR (~22 EUR per French person).\n\nThe government extended rescheduling options to 10 years until Dec 31, 2026. But rescheduling doesn't make fragile companies profitable — it just delays the reckoning.",
        highlight: "72% of remaining PGE loans come due summer 2026. Cost to taxpayers: 3-4B EUR.",
        table: {
          headers: ["Metric", "Value"],
          rows: [
            ["Total PGE lent", "144.5 billion EUR"],
            ["Companies that borrowed", "~700,000"],
            ["Already repaid", "~100B EUR (76%)"],
            ["Still owed", "38.4 billion EUR"],
            ["Default rate so far", "~4%"],
            ["Cost to state (projected)", "3-4 billion EUR"],
            ["Borrowers that are micro-enterprises", "80%+"],
            ["SMBs struggling to repay", "40%"],
          ],
        },
      },
      {
        title: "Where Companies Spend Money",
        content:
          "Public procurement alone channels over 1 trillion EUR/year from government to 87,000+ companies. The median contract is 122,000 EUR in 2025.\n\nCompany operating budgets go to: staff costs (largest — with France's ~45% social charges on top), real estate (~7,700 EUR/workstation/year), IT & digital (growing fast), equipment (~3,160 EUR/workstation), maintenance (~2,050 EUR/workstation), and travel (~1,760 EUR/workstation).\n\nThe French digital market reached 70 billion EUR in 2026, growing +5.5%. AI budgets exploded +430% from 2023-2024. 98% of companies plan to increase AI spend. 80%+ of IT directors are increasing cybersecurity budgets. Cloud & software growing +9.1%.\n\nBudgets shrinking: legacy IT (-43% of directors cutting), physical retail space, business travel, print marketing.",
        highlight: "AI budgets: +430% in 2 years. 98% of French companies increasing AI spend in 2026.",
        table: {
          headers: ["IT Category", "Growth 2026", "Context"],
          rows: [
            ["Cloud & Software", "+9.1%", "71% of digital market growth"],
            ["AI budgets", "+430% (2023-2024)", "98% of companies increasing"],
            ["Cybersecurity", "80%+ increasing", "Never gets cut, even in tight budgets"],
            ["Digital services", "+2.7%", "Recovery after -1.6% in 2025"],
            ["Total digital market", "+5.5%", "70 billion EUR in 2026"],
          ],
        },
      },
      {
        title: "How SMBs Are Doing",
        content:
          "BPI France's January 2026 barometer paints a picture of caution with a glimmer of hope.\n\nOnly 39% of SMBs invested in 2025 (down from 55% historical average). 44% plan to invest in 2026. Revenue outlook: 25% expect growth vs 20% expecting decline — the first net positive signal.\n\nIndustry is the only sector where investment holds steady at 58%. Every other sector is significantly below normal. Services to individuals are weakest — 38% report cash difficulty.\n\nKey challenges: PGE repayment pressure, France's highest-in-Europe employer social charges (~45%), energy costs, chronic labor shortages in construction/hospitality/IT/health, and late payments averaging 14 days.",
        highlight: "Only 39% of SMBs invested in 2025. Industry is the only sector holding steady.",
        table: {
          headers: ["Sector", "Investment Rate 2025", "Outlook 2026", "Cash Flow"],
          rows: [
            ["Industry", "52%", "Most optimistic (+12)", "OK"],
            ["Construction", "45%", "Mixed", "Improving"],
            ["Transport", "47%", "Modest improvement", "Weak"],
            ["Tourism", "34%", "Neutral (-2)", "Weak"],
            ["Commerce/Retail", "27%", "Slight positive (+8)", "Mixed"],
            ["Services (B2C)", "33%", "Most pessimistic (-13)", "38% in difficulty"],
          ],
        },
      },
      {
        title: "Growth Sectors for 2026",
        content:
          "BPI France identifies 7 sectors where money is flowing:\n\n1. AI & Digital Transformation — GenAI adoption exploding, trillion-dollar global market by 2031\n2. Cybersecurity — Multiplying attacks, IoT/5G complexity, regulatory requirements\n3. Health & Silver Economy — Aging population, telemedicine, connected health devices\n4. Green Transition & Energy — Eco-design, sustainable mobility, circular economy\n5. Sustainable Agri-food — Local production, plant-based proteins, food waste reduction\n6. HR & Recruitment Services — Chronic labor shortage, RPO solutions, talent retention\n7. Reindustrialization — Political push to reshore, smart factory solutions\n\nThe job market mirrors this: AI will generate 50,000+ positions in France in 2026. Health remains the #1 employer. Construction faces massive retirement-driven shortages. Hospitality never recovered pre-pandemic staffing. IT salaries run 30-50% above average due to talent scarcity.",
        highlight:
          "7 growth sectors: AI, Cybersecurity, Health, Green, Agri-food, HR, Reindustrialization",
      },
      {
        title: "White-Collar Jobs vs AI",
        content:
          "5 million jobs are threatened by AI in France (Coface/OEM). The OECD says 27.4% of French jobs are highly exposed. Globally, the WEF projects 92 million jobs displaced but 170 million created by 2030 — a net gain of 78 million.\n\nJobs being eliminated: data entry, basic accounting/bookkeeping, payroll, admin assistants, first-level support, basic translation, routine legal work, simple content writing (could halve by 2030).\n\nJobs being transformed: accountants become advisors, lawyers focus on strategy (AI does document review), marketing shifts to brand/relationships, HR focuses on culture. Even programming has 94% theoretical exposure but only ~30% actual replacement today.\n\nThe income paradox: workers with AI skills earn 28-56% more than peers. The gap is widening. Women and young graduates are disproportionately exposed — they're concentrated in admin and entry-level roles most affected.\n\nCritical human skills gaining value: emotional intelligence, ethical reasoning, complex problem-solving, cross-cultural communication, creativity, leadership through ambiguity.",
        highlight:
          "5 million French jobs threatened. But AI-skilled workers earn 28-56% more than peers.",
        table: {
          headers: ["Projection", "Source", "Scope"],
          rows: [
            ["5 million jobs threatened", "Coface/OEM", "France"],
            ["27.4% highly exposed", "OECD", "France"],
            ["92M displaced globally", "WEF", "Global"],
            ["170M new jobs created", "WEF", "Global"],
            ["Net: +78M jobs", "WEF", "Global"],
          ],
        },
      },
      {
        title: "The Future of Meaningful Work",
        content:
          "The honest projection for France:\n\nPhase 1 (Now-2028): Disruption. AI tools everywhere. 2-3x productivity gains for adopters. Companies hire fewer people for the same output. Entry-level white-collar jobs hit hardest. Auto-entrepreneur boom accelerates.\n\nPhase 2 (2028-2032): Restructuring. \"AI-augmented professional\" becomes the norm. Blue-collar skilled trades see wage increases. Healthcare becomes a massive employer. New roles emerge: AI trainers, ethicists, human-AI coordinators.\n\nPhase 3 (2032+): New equilibrium. The economy reorganizes around what humans uniquely do: build trust, make ethical decisions, create meaning, do physical skilled work, care for people, explore the genuinely unknown.\n\nWhat AI cannot do: decide what matters (values), build real trust (relationships), navigate true ambiguity, do physical craftsmanship, care for people, take real responsibility, create genuine novelty.\n\nThe most meaningful work ahead: solving problems AI identifies but can't fix, building in the physical world, caring for humans, creating authentic culture, making hard ethical decisions about AI itself, leading teams through uncertainty.\n\nMore freelance, less salary. Skills expire faster. Income polarization grows. But the things that become MORE valuable are deeply human: judgment, relationships, physical skill, creativity, and care.",
        highlight:
          "The question shifts from \"will I have a job?\" to \"what am I uniquely here to do?\"",
      },
    ],
    sources: [
      { label: "EY - Bilan défaillances 2025", url: "https://www.ey.com/fr_fr/newsroom/2026/02/bilan-defaillances-dentreprises-en-france-en-2025" },
      { label: "Altares - Défaillances France 2025", url: "https://www.altares.com/fr/statistiques-defaillance-entreprises-france/bilan-2025/" },
      { label: "BPI France - Baromètre TPE-PME 2026", url: "https://lelab.bpifrance.fr/enquetes/barometre-tpe-pme-apres-une-annee-2025-difficile-l-horizon-s-eclaircit-timidement-pour-2026/analyse-sectorielle-barometre-tpe-et-pme-de-janvier-2026" },
      { label: "Exaegis/Numeum - Dépenses numériques 2026", url: "https://exaegis.com/actualites/retour-de-la-croissance-des-depenses-numeriques-en-2026" },
      { label: "Le Coin des Entrepreneurs - Créations 2025", url: "https://www.lecoindesentrepreneurs.fr/creations-entreprises-2025-statistiques-analyse/" },
      { label: "INSEE - Tissu productif 2023", url: "https://www.insee.fr/fr/statistiques/8675639" },
      { label: "IFRAP - PGE Sinistralité", url: "https://www.ifrap.org/budget-et-fiscalite/36-milliards-le-cout-de-la-sinistralite-des-pge-si-les-faillites-dentreprises-continuent-de-grimper" },
      { label: "Coface/OEM - AI Job Threat", url: "https://newsentreprises.com/2026/03/19/ia-menace-emplois-cadres-france/" },
      { label: "Anthropic - AI & Labor", url: "https://fortune.com/2026/04/07/anthropic-peter-mccrory-ai-automation-white-collar-jobs-claude-recession/" },
      { label: "WEF - Future of Jobs 2030", url: "https://www.weforum.org/stories/2026/01/here-are-four-ways-ais-impact-on-job-markets-might-take-shape/" },
      { label: "data.gouv.fr - SIRENE, URSSAF, DECP, PGE", url: "https://www.data.gouv.fr" },
    ],
  },
];
