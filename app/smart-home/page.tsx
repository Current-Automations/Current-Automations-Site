import type { Metadata } from "next";
import { jobsheetFonts } from "@/components/jobsheet/fonts";
import jobsheet from "@/components/jobsheet/jobsheet.module.css";
import JobSheetPageHero from "@/components/jobsheet/JobSheetPageHero";
import JobSheetSection from "@/components/jobsheet/JobSheetSection";
import JobSheetFAQ from "@/components/jobsheet/JobSheetFAQ";
import TicketCard from "@/components/jobsheet/TicketCard";
import Stamp from "@/components/jobsheet/Stamp";
import { siteContact } from "@/data/siteContent";

export const metadata: Metadata = {
  alternates: { canonical: "/smart-home" },
  title: "Smart Home Setup",
  description:
    "Smart home setup and installation in Durham Region and the GTA. Lights, locks, thermostats, doorbells and voice control, installed and working before we leave. You do not need to buy the gear first.",
};

// Only what is actually running in Jarrett's own house, plus what is on order.
// No client work exists yet, so nothing here may imply a completed job.
const myHouse = [
  {
    code: "SH-01",
    label: "Lights",
    state: "Running",
    body: "Whole rooms on one tap, on a schedule, or by voice.",
  },
  {
    code: "SH-02",
    label: "Video doorbell",
    state: "Running",
    body: "See and talk to whoever is at the door from anywhere.",
  },
  {
    code: "SH-03",
    label: "Outdoor cameras",
    state: "Running",
    body: "Around the house and in the garage, recording and viewable from the phone.",
  },
  {
    code: "SH-04",
    label: "Garage doors",
    state: "Running",
    body: "Opened from the garage cameras, so there is one less remote to lose.",
  },
  {
    code: "SH-05",
    label: "Siri shortcuts",
    state: "Running",
    body: "One phrase runs a whole routine instead of six taps across three apps.",
  },
  {
    code: "SH-06",
    label: "Thermostat",
    state: "Going in",
    body: "Learns the house, backs off when nobody is home, and pays for itself on the gas bill.",
  },
  {
    code: "SH-07",
    label: "Side door lock",
    state: "Going in",
    body: "Unlock with a phone or a fingerprint. No key under the mat.",
  },
  {
    code: "SH-08",
    label: "Camera bridge",
    state: "Going in",
    body: "Pulling the Wyze doorbell and cameras into Apple Home so everything sits under one roof.",
  },
];

const scope = [
  {
    code: "01",
    label: "Lighting",
    body: "Bulbs, switches, whole rooms, scenes. Dimming and schedules that follow your day rather than a timer you have to remember.",
  },
  {
    code: "02",
    label: "Locks and entry",
    body: "Smart deadbolts and lever locks. Unlock by phone, fingerprint, or code. Give a cleaner or a contractor access for one afternoon without cutting a key.",
  },
  {
    code: "03",
    label: "Heating and cooling",
    body: "A thermostat that knows when the house is empty. This is the one that shows up on a bill.",
  },
  {
    code: "04",
    label: "Doorbells and cameras",
    body: "See who is at the door from anywhere. Get told when a parcel lands instead of finding it in the rain.",
  },
  {
    code: "05",
    label: "Sensors",
    body: "Door, window, motion, temperature, and water leak. A twenty dollar sensor beside the water heater is the cheapest insurance in the house.",
  },
  {
    code: "06",
    label: "Voice and shortcuts",
    body: "Siri, Alexa or Google, plus the routines behind them, so one phrase does the work of a dozen taps.",
  },
  {
    code: "07",
    label: "Blinds and shades",
    body: "Open with the sun, close at dusk, or on one tap from bed.",
  },
  {
    code: "08",
    label: "Getting stubborn gear to join in",
    body: "Some brands do not talk to Apple Home or Google at all. Wyze is the common one. Rather than telling you to throw it out and buy again, I bridge it in so it lands beside everything else.",
  },
];

const tiers = [
  {
    code: "T1",
    name: "One device or one room",
    price: "$99 to $149",
    body: "One thing installed, added to your phone, tested, and one automation built while you watch so you know how to change it later.",
    fit: "A thermostat. A lock. A doorbell. The first thing.",
  },
  {
    code: "T2",
    name: "Whole-home starter",
    price: "$349 to $599",
    body: "Thermostat, one lock, and your lighting brought under one app. Hub set up, sensors placed where they matter, scenes built, and everyone in the house shown how it works.",
    fit: "The usual starting point for a whole house.",
    featured: true,
  },
  {
    code: "T3",
    name: "Full build",
    price: "Quoted",
    body: "Lighting throughout, shades, multiple locks, switch replacement, anything that needs an electrician alongside. Fixed quote before anything gets bought or opened.",
    fit: "You want the whole thing done properly, once.",
  },
];

const steps = [
  {
    code: "01",
    title: "You text or call",
    body: "Send a photo of the room, the thermostat, or the door. That is usually enough for me to tell you what it needs and roughly what it costs.",
  },
  {
    code: "02",
    title: "We scope it on the phone",
    body: "What you already own, what you would need, what it will actually do. If it is not worth doing I will say so.",
  },
  {
    code: "03",
    title: "I come out and install it",
    body: "Gear arrives, I fit it, connect it, and test it. Nothing gets left half-configured for you to finish.",
  },
  {
    code: "04",
    title: "You get shown how it works",
    body: "Everyone in the house, not just whoever booked it. Including how to change it when you want something different.",
  },
];

const faqItems = [
  {
    question: "Do I need to buy anything before you come?",
    answer:
      "No. If you already own the gear I will set up what you have. If you do not, I source it and it goes on the quote at cost plus a small markup, so you are not paying retail on top of labour. A deposit covers the hardware before I buy it, and the rest is due when the job is done.",
  },
  {
    question: "Will it work with an iPhone and an Android in the same house?",
    answer:
      "Yes, but worth being precise about how. The gear I fit speaks Matter, which is the standard Apple, Google and Amazon all agreed on, so it works with all three. Apple Home itself is iPhone only, so an Android user in the house uses Google Home or the device app instead. Same devices, same automations, different app on their phone.",
  },
  {
    question: "What if the internet goes down?",
    answer:
      "Lights, locks and thermostats keep working from their switches, keypads and dials. What you lose is remote control and voice until it comes back. Nothing gets stuck locked or stuck off.",
  },
  {
    question: "Can I add to it later?",
    answer:
      "That is the point of setting it up on one standard rather than five apps. Adding a lock or a sensor later is a small job, not a rebuild. My own house is still growing, which is exactly how it should work.",
  },
  {
    question: "How far do you travel?",
    answer:
      "In-home work is Durham Region and the GTA. If you are further out, ask anyway. Some of it, voice assistants, shortcuts and troubleshooting, I can do remotely, and I would rather help than turn you away over a postcode.",
  },
  {
    question: "Am I your first customer?",
    answer:
      "Possibly, and you should know that going in. The automation side of Current Automations has been running systems for businesses. Home installs are new, so what you get is my own house as the reference and honest pricing rather than a portfolio of other people's kitchens.",
  },
];

export default function SmartHomePage() {
  return (
    <div className={jobsheetFonts}>
      <JobSheetPageHero
        docLabel="HOME FILE"
        docCode="FORM SH-01"
        kicker="Smart home setup, Durham and the GTA"
        title="Your house should do the boring parts on its own."
        description="Lights, locks, the thermostat, the doorbell, all working together and all on one app instead of five. I install it, test it, and show you how to change it. You do not need to buy anything first."
        sideAlign="start"
        side={
          <div className={`${jobsheet.ticket} overflow-hidden p-0`}>
            <div className="flex items-center justify-between border-b-2 border-dashed border-[rgba(28,36,48,0.24)] bg-[rgba(28,36,48,0.03)] px-5 py-3">
              <span className={`${jobsheet.mono} text-xs tracking-[0.18em] text-[#58524a]`}>
                START HERE
              </span>
              <span className={`${jobsheet.mono} text-xs tracking-[0.18em] text-[#58524a]`}>
                NO FORMS
              </span>
            </div>
            <div className="px-6 py-7 text-center">
              <p className="text-sm leading-7 text-[#3a352c]">
                Text me a photo of the room, the thermostat, or the door.
              </p>
              <a
                href={`sms:${siteContact.phoneHref}`}
                className={`${jobsheet.mono} mt-4 block text-[clamp(1.6rem,4vw,2.1rem)] font-semibold text-[#181510] transition-colors hover:text-[var(--color-brand-strong)]`}
              >
                {siteContact.phoneDisplay}
              </a>
              <div className="mt-5 flex flex-wrap justify-center gap-3">
                <a href={`sms:${siteContact.phoneHref}`} className={jobsheet.punchButton}>
                  Text Me
                </a>
                <a
                  href={`tel:${siteContact.phoneHref}`}
                  className={`${jobsheet.punchButton} ${jobsheet.punchButtonGhost}`}
                >
                  Or Call
                </a>
              </div>
              <p className="mt-4 text-xs leading-6 text-[#58524a]">
                No appointment needed to ask a question. I only come out once we both know it is
                worth a visit.
              </p>
            </div>
          </div>
        }
      />

      <JobSheetSection
        code="SH-02"
        label="Read this first"
        title="This side of the business is new."
        description="Current Automations has been building call handling and follow-up systems for businesses. Home installs are new, and I would rather tell you that than dress up a portfolio I do not have."
        tone="paper"
      >
        <TicketCard refCode="HONESTY">
          <p className="text-base leading-8 text-[#3a352c]">
            So there are no customer photos on this page and no testimonials, because there are no
            customers yet. What there is instead: my own house, which runs on the same gear I would
            fit in yours, and pricing published in the open so you can decide without a sales call.
          </p>
          <p className="mt-5 text-base leading-8 text-[#3a352c]">
            If being early bothers you, wait and check back. If it does not, you get someone who
            will actually answer the phone and who cares a great deal about the first few jobs
            going right.
          </p>
        </TicketCard>
      </JobSheetSection>

      <JobSheetSection
        code="SH-03"
        label="The reference house"
        title="What runs in my own place."
        description="Not a showroom. An actual house, partly finished, which is what a real one looks like."
        tone="carbon"
      >
        <div
          className={`${jobsheet.ticket} divide-y divide-[rgba(28,36,48,0.14)] overflow-hidden p-0`}
        >
          <div className="hidden border-b-2 border-dashed border-[rgba(28,36,48,0.24)] bg-[rgba(28,36,48,0.03)] px-6 py-3 lg:grid lg:grid-cols-[5rem_12rem_8rem_minmax(0,1fr)] lg:gap-6">
            {["Ref", "What", "Status", "What it does"].map((h) => (
              <span
                key={h}
                className={`${jobsheet.mono} text-xs font-semibold uppercase tracking-[0.16em] text-[#58524a]`}
              >
                {h}
              </span>
            ))}
          </div>

          {myHouse.map((item) => (
            <div
              key={item.code}
              className={`${jobsheet.ledgerRow} grid grid-cols-1 gap-2 px-6 py-6 sm:px-8 lg:grid-cols-[5rem_12rem_8rem_minmax(0,1fr)] lg:items-baseline lg:gap-6`}
            >
              <span className={`${jobsheet.mono} text-xs font-semibold text-[#a8452f]`}>
                {item.code}
              </span>
              <p className="text-lg font-semibold tracking-tight text-[#181510]">{item.label}</p>
              <div>
                <Stamp tone={item.state === "Running" ? "teal" : "rust"} label={item.state} />
              </div>
              <p className="text-sm leading-7 text-[#58524a]">{item.body}</p>
            </div>
          ))}
        </div>

        <p className="mt-6 max-w-3xl text-sm leading-7 text-[#58524a]">
          The thermostat and the side door lock are on order. When they are in and filmed, this
          section becomes footage instead of a list.
        </p>

      </JobSheetSection>

      <JobSheetSection
        code="SH-04"
        label="What I can set up"
        title="Everything on one app, not five."
        description="Most homes end up with a different app per gadget and nothing talking to anything else. The job is one system, whichever brands are already in the house."
        tone="paper"
      >
        <div className="grid gap-6 sm:grid-cols-2">
          {scope.map((item) => (
            <TicketCard key={item.code} refCode={item.code}>
              <h3 className="text-xl font-semibold tracking-tight text-[#181510]">{item.label}</h3>
              <p className="mt-3 text-sm leading-7 text-[#58524a]">{item.body}</p>
            </TicketCard>
          ))}
        </div>
      </JobSheetSection>

      <JobSheetSection
        code="SH-05"
        label="The gear question"
        title="You do not need to buy anything first."
        description="Most installers are labour only and expect you to have already bought the right hardware. Guessing wrong is expensive and it is the main reason people never start."
        tone="ink"
      >
        <div className="grid gap-6 lg:grid-cols-2">
          <TicketCard onDark refCode="GEAR-01">
            <h3 className="text-xl font-semibold tracking-tight text-[#f3ede1]">
              If you already own it
            </h3>
            <p className="mt-3 text-sm leading-7 text-[rgba(243,237,225,0.72)]">
              I set up what you have. No pressure to replace working gear, and if something you own
              will not play nicely with the rest, I will tell you before you have paid for anything.
            </p>
          </TicketCard>
          <TicketCard onDark refCode="GEAR-02">
            <h3 className="text-xl font-semibold tracking-tight text-[#f3ede1]">
              If you do not own it
            </h3>
            <p className="mt-3 text-sm leading-7 text-[rgba(243,237,225,0.72)]">
              I spec it and source it. Hardware goes on the quote at cost plus a small markup, so
              you are not paying full retail on top of labour. A deposit covers the gear before I
              buy it, the balance is due when it is working.
            </p>
          </TicketCard>
        </div>
      </JobSheetSection>

      <JobSheetSection
        code="SH-06"
        label="Pricing"
        title="Published, so you can decide before you call."
        description="These are setup and labour. Hardware, if you need any, is quoted separately at cost plus a small markup. No hourly rate, no surprise on the invoice."
        tone="paper"
      >
        <div className="grid gap-6 lg:grid-cols-3">
          {tiers.map((tier) => (
            <TicketCard key={tier.code} refCode={tier.code}>
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="text-xl font-semibold tracking-tight text-[#181510]">
                  {tier.name}
                </h3>
                {tier.featured ? <Stamp tone="teal" label="Most homes" /> : null}
              </div>
              <p
                className={`${jobsheet.mono} mt-4 text-[clamp(1.6rem,3vw,2rem)] font-semibold text-[#181510]`}
              >
                {tier.price}
              </p>
              <p className="mt-4 text-sm leading-7 text-[#58524a]">{tier.body}</p>
              <p className="mt-4 border-t-2 border-dashed border-[rgba(28,36,48,0.24)] pt-4 text-sm leading-7 text-[#3a352c]">
                {tier.fit}
              </p>
            </TicketCard>
          ))}
        </div>

        <p className="mt-8 max-w-3xl text-sm leading-7 text-[#58524a]">
          Prices are honest about where they came from: this side of the business is new, so expect
          them to move once a few real jobs have told me how long the work actually takes. Whatever
          you are quoted before I start is what you pay.
        </p>
      </JobSheetSection>

      <JobSheetSection
        code="SH-07"
        label="How it goes"
        title="Four steps, and the first one is a text."
        description="No form to fill in, no discovery call, no visit until we both know it is worth one."
        tone="carbon"
      >
        <div className="grid gap-6 sm:grid-cols-2">
          {steps.map((step) => (
            <TicketCard key={step.code} refCode={step.code}>
              <div className="flex items-baseline gap-3">
                <span className={`${jobsheet.mono} text-sm font-semibold text-[#a8452f]`}>
                  {step.code}
                </span>
                <h3 className="text-xl font-semibold tracking-tight text-[#181510]">
                  {step.title}
                </h3>
              </div>
              <p className="mt-3 text-sm leading-7 text-[#58524a]">{step.body}</p>
            </TicketCard>
          ))}
        </div>
      </JobSheetSection>

      <JobSheetFAQ
        code="SH-08"
        label="Before you ask"
        title="The questions people actually have."
        items={faqItems}
        tone="paper"
      />

      <JobSheetSection
        code="SH-09"
        label="Start here"
        title="Send me a photo and I will tell you what it needs."
        description="That is genuinely the whole first step. If it is not worth doing, I will say so and it costs you nothing."
        tone="ink"
      >
        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <a
              href={`sms:${siteContact.phoneHref}`}
              className={`${jobsheet.mono} text-[clamp(1.8rem,4vw,2.6rem)] font-semibold text-[#f3ede1] transition-colors hover:text-[var(--color-brand)]`}
            >
              {siteContact.phoneDisplay}
            </a>
            <p className="mt-3 text-sm leading-7 text-[rgba(243,237,225,0.72)]">
              Text or call. {siteContact.responseExpectation}.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <a
              href={`sms:${siteContact.phoneHref}`}
              className={`${jobsheet.punchButton} ${jobsheet.punchButtonOnDark}`}
            >
              Text Me
            </a>
            <a
              href={`tel:${siteContact.phoneHref}`}
              className={`${jobsheet.punchButton} ${jobsheet.punchButtonGhost} ${jobsheet.punchButtonGhostOnDark}`}
            >
              Or Call
            </a>
          </div>
        </div>
      </JobSheetSection>
    </div>
  );
}
