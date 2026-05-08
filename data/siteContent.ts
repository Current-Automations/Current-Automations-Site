export type FAQItem = {
  question: string;
  answer: string;
};

export const siteContact = {
  email: "admin@currentautomations.ca",
  phoneDisplay: "+1 365 601 7474",
  phoneHref: "+13656017474",
  responseExpectation: "Most inquiries receive a reply within 1 business day",
  walkthroughNote: "A no-pressure walkthrough tailored to your workflow",
  directContactNote:
    "You can email or call directly and most inquiries receive a reply within 1 business day.",
};

export const faqItems: FAQItem[] = [
  {
    question: "Do I need to change my phone system?",
    answer:
      "No. Nothing changes with your existing number. Your phone rings exactly as it does now. This only activates when a call is already missed.",
  },
  {
    question: "What happens when I miss a call?",
    answer:
      "An automatic text goes out within seconds. The customer knows you received their call and is given a clear next step. You get a notification with their details so your team can follow up.",
  },
  {
    question: "How long does setup take?",
    answer:
      "Most clients are live within 48 hours. Setup is handled for you.",
  },
  {
    question: "Is this only for certain industries?",
    answer:
      "It is built for trades and service businesses that rely on inbound calls. Plumbing, HVAC, electrical, cleaning, and landscaping are the most common fits.",
  },
  {
    question: "Do I need technical knowledge?",
    answer:
      "None. You will never touch the backend. If something needs adjusting, you contact us and it gets fixed.",
  },
  {
    question: "Can this be customized for my business?",
    answer:
      "Yes. The core system is the same but messaging, follow-up timing, and lead capture questions can all be adjusted to match how your business works.",
  },
];

export const serviceIndustries = [
  "Plumbing",
  "HVAC",
  "Electrical",
  "Cleaning",
  "Landscaping",
  "Other local service businesses",
];

export const whyThisWorksPoints = [
  "Customers often call more than one company.",
  "The first fast response usually has the advantage.",
  "Missed calls quietly turn into lost revenue.",
  "Fast follow-up helps protect opportunities.",
];
