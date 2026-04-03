export type FAQItem = {
  question: string;
  answer: string;
};

export const siteContact = {
  email: "CurrentAutomations@Outlook.com",
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
      "No. Your phone rings exactly the same as it does now. This system only activates on calls you already missed. Nothing changes for your team or your customers on answered calls.",
  },
  {
    question: "What happens when I miss a call?",
    answer:
      "The caller gets an instant text back within seconds. If they left a voicemail, it gets transcribed and sent to you immediately. The system collects their name, job details, and availability so your team can call back prepared. If they do not reply, automated follow ups keep the conversation going.",
  },
  {
    question: "How long does setup take?",
    answer:
      "Most businesses are fully live within 48 hours. We handle the technical configuration. You just need to forward your missed calls to the system, which takes about 2 minutes.",
  },
  {
    question: "Is this only for certain industries?",
    answer:
      "It works best for local service businesses that rely heavily on phone calls, including plumbing, HVAC, electrical, cleaning, and similar trades.",
  },
  {
    question: "Do I need technical knowledge?",
    answer:
      "No. The goal is to make the system easy to use without requiring technical experience.",
  },
  {
    question: "Can this be customized for my business?",
    answer:
      "Yes. More advanced workflows and customization can be discussed for businesses with specific needs.",
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
