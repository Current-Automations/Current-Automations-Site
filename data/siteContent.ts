export type FAQItem = {
  question: string;
  answer: string;
};

export const siteContact = {
  email: "info@currentautomations.ca",
  phoneDisplay: "+1 (365) 513-7474",
  phoneHref: "+13655137474",
  responseExpectation: "Most inquiries receive a reply within 1 business day",
  walkthroughNote: "A no-pressure walkthrough tailored to your workflow",
  directContactNote:
    "You can email or call directly and most inquiries receive a reply within 1 business day.",
};

// The public demo line, deliberately separate from the business line (513) and the sales
// line (661). Swapping it is a routine op: buy the number, point it at the demo Studio Flow,
// rebind the Retell agent, then change these two values. Nothing else on the site knows the
// digits, so there is no seventh reference to forget.
export const demoLine = {
  display: "1 365 299 3366",
  href: "tel:+13652993366",
};

// Every CTA on the site points at `booking.path`, an internal route, not at
// Google. `/book-a-demo` embeds the appointment schedule so nobody has to leave
// the site to pick a slot. The Google URLs live here because that page needs
// them, and because a single string in one file is the difference between
// changing the booking destination in one edit and in eighteen.
//
// `embedUrl` is NOT `googleUrl` with a query string bolted on: the embed form
// drops the account-scoped `/u/0/` segment and adds `gv=true`. Google generates
// it under Booking pages > Options > Sharing options > Website embed.
export const booking = {
  path: "/book-a-demo",
  label: "Book a Free Walkthrough",
  googleUrl:
    "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ0OTjmz9j1ktY0mE3akCYvLZ6qwzY3HKAd_IA4m4nqcqTzuzZJJQj8CzEw8p2jA7GKEkHyw_8wb",
  embedUrl:
    "https://calendar.google.com/calendar/appointments/schedules/AcZssZ0OTjmz9j1ktY0mE3akCYvLZ6qwzY3HKAd_IA4m4nqcqTzuzZJJQj8CzEw8p2jA7GKEkHyw_8wb?gv=true",
};

export const siteContacts = {
  general: "info@currentautomations.ca",
  support: "support@currentautomations.ca",
  billing: "billing@currentautomations.ca",
  noReply: "no-reply@currentautomations.ca",
};

export const faqItems: FAQItem[] = [
  {
    question: "How do you decide what to automate first?",
    answer:
      "We start every job with a free walkthrough, a 30-minute call where we map exactly what could be running without you. From there, we recommend the one or two systems with the highest impact. In a business that is usually Speed to Lead; in a home it is usually lighting or the thermostat. Neither is always the first fix.",
  },
  {
    question: "What if my main problem is not missed calls?",
    answer:
      "That is exactly why we start with a walkthrough. Missed calls are the common one, but plenty of businesses lose more to slow follow-up, manual admin, or intake. The home side works the same way: the first thing worth fixing is rarely the thing you came in asking about. We find where the biggest opportunity actually is, then build around that.",
  },
  {
    question: "How long does setup take?",
    answer:
      "Business systems are usually live within 48 hours of your approval, and the setup is handled for you. Home work runs on a booked visit instead: we scope what you need, source anything you do not already have, and most setups are running within days.",
  },
  {
    question: "Is this only for businesses?",
    answer:
      "No. There are two sides to it. The business side is call handling, follow-up, and the admin that eats your evenings. The home side is smart home installs and the phone routines that run a day without you touching anything. The approach is the same either way: we scope it, we build it, and we keep it running. Lead generation is a separate program for companies that sell to other businesses; see the Lead Generation page for that.",
  },
  {
    question: "Do I need technical knowledge?",
    answer:
      "None. You will never touch the backend. If something needs adjusting, you contact us and it gets fixed.",
  },
  {
    question: "Can this be customized?",
    answer:
      "Yes. The building blocks are the same, but what they do gets set around you. On the business side that is the wording, the follow-up timing, and the questions we ask a new lead. On the home side it is which lights come on, when, and what each routine actually triggers.",
  },
];

export type CaseStudy = {
  company: string;
  industry: string;
  problem: string;
  system: string;
  result: string;
  source: string;
  isClient: boolean;
};

export const caseStudies: CaseStudy[] = [
  {
    company: "GG Homes",
    industry: "Real estate services",
    problem:
      "Incoming calls needed manual review before a rep could tell which ones were real leads.",
    system:
      "Call recordings transcribed, AI flags lead quality and key details, results pushed straight to the sales team.",
    result: "25% more closed deals, 100 hours a week given back to the team.",
    source: "Zapier customer stories",
    isClient: false,
  },
  {
    company: "Rachio",
    industry: "Smart home / product support",
    problem:
      "Support volume for over a million users spiked every season, and the answer was always hiring and training temporary staff.",
    system:
      "AI agents handle chat, voice, and email support instead of scaling headcount for the rush.",
    result: "95-99.8% response accuracy, 30% lower cost, no seasonal hiring.",
    source: "Crescendo.ai",
    isClient: false,
  },
];
