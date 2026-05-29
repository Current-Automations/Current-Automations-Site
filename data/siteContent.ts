export type FAQItem = {
  question: string;
  answer: string;
};

export const siteContact = {
  email: "admin@currentautomations.ca",
  phoneDisplay: "+1 (365) 513-7474",
  phoneHref: "+13655137474",
  responseExpectation: "Most inquiries receive a reply within 1 business day",
  walkthroughNote: "A no-pressure walkthrough tailored to your workflow",
  directContactNote:
    "You can email or call directly and most inquiries receive a reply within 1 business day.",
};

export const faqItems: FAQItem[] = [
  {
    question: "How do you decide what to automate first?",
    answer:
      "We start every engagement with a free audit, a 30-minute discovery call where we map exactly where your business is losing time and money. From there, we recommend the one or two systems with the highest impact. Speed to Lead is the most common starting point, but it is not always the first fix.",
  },
  {
    question: "What if my main problem is not missed calls?",
    answer:
      "That is exactly why we audit first. Missed calls are common, but some businesses lose more to slow follow-up, manual admin, or intake bottlenecks. We will figure out where your biggest opportunity is during the free audit and build around that.",
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
