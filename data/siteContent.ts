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
      "No. Current Automations is designed to work alongside your existing process and make missed-call follow-up easier.",
  },
  {
    question: "What happens when I miss a call?",
    answer:
      "An automatic response is sent quickly, lead details can be captured, and the customer is less likely to move on to the next company.",
  },
  {
    question: "How long does setup take?",
    answer:
      "Setup is designed to be simple and straightforward, with onboarding support included.",
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
