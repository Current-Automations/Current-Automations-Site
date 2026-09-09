import type { Metadata } from "next";
import Link from "next/link";
import { jobsheetFonts } from "@/components/jobsheet/fonts";
import jobsheet from "@/components/jobsheet/jobsheet.module.css";
import JobSheetPageHero from "@/components/jobsheet/JobSheetPageHero";
import JobSheetSection from "@/components/jobsheet/JobSheetSection";
import JobSheetFAQ from "@/components/jobsheet/JobSheetFAQ";
import TicketCard from "@/components/jobsheet/TicketCard";
import ComingSoonCard from "@/components/jobsheet/ComingSoonCard";
import Stamp from "@/components/jobsheet/Stamp";
import { siteContact } from "@/data/siteContent";

export const metadata: Metadata = {
  alternates: { canonical: "/smart-home" },
  title: "Smart Home Setup",
  description:
    "Smart home setup and installation in Durham Region and the GTA. Lights, locks, thermostats, doorbells and voice control, installed and working before we leave. You do not need to buy the gear first.",
};

const setups = [
  {
    code: "01",
    label: "Lighting",
    body: "Whole rooms on one tap, on a schedule, or by voice. Bulbs, switches, dimming, scenes.",
  },
  {
    code: "02",
    label: "Locks and entry",
    body: "Deadbolts and lever locks. Phone, fingerprint or code. Let a cleaner in for one afternoon without cutting a key.",
  },
  {
    code: "03",
    label: "Heating and cooling",
    body: "A thermostat that knows when the house is empty. The one that shows up on a bill.",
  },
  {
    code: "04",
    label: "Doorbells and cameras",
    body: "See and speak to whoever is at the door from anywhere. Get told when a parcel lands.",
  },
  {
    code: "05",
    label: "Garage doors",
    body: "Opened from your phone or straight from the camera, so there is one less remote to lose.",
  },
  {
    code: "06",
    label: "Sensors",
    body: "Door, window, motion, temperature and water leak. A leak sensor by the water heater is the cheapest insurance in the house.",
  },
  {
    code: "07",
    label: "Voice and shortcuts",
    body: "Siri, Alexa or Google, and the routines behind them, so one phrase does the work of a dozen taps.",
  },
  {
    code: "08",
    label: "Blinds and shades",
    body: "Open with the sun, close at dusk, or on one tap from bed.",
  },
  {
    code: "09",
    label: "Gear that will not cooperate",
    body: "Some brands do not speak to Apple Home or Google at all. Rather than telling you to bin it and buy again, we bridge it in.",
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
    body: "Send a photo of the room, the thermostat, or the door. That is usually enough for us to tell you what it needs and roughly what it costs.",
  },
  {
    code: "02",
    title: "We scope it on the phone",
    body: "What you already own, what you would need, what it will actually do. If it is not worth doing we will say so.",
  },
  {
    code: "03",
    title: "We come out and install it",
    body: "Gear arrives, we fit it, connect it, and test it. Nothing gets left half-configured for you to finish.",
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
      "No. If you already own the gear we will set up what you have. If you do not, we source it and it goes on the quote at cost plus a small markup, so you are not paying retail on top of labour. A deposit covers the hardware before we buy it, and the rest is due when the job is done.",
  },
  {
    question: "Will it work with an iPhone and an Android in the same house?",
    answer:
      "Yes, but worth being precise about how. The gear we fit speaks Matter, which is the standard Apple, Google and Amazon all agreed on, so it works with all three. Apple Home itself is iPhone only, so an Android user in the house uses Google Home or the device app instead. Same devices, same automations, different app on their phone.",
  },
  {
    question: "What if the internet goes down?",
    answer:
      "Lights, locks and thermostats keep working from their switches, keypads and dials. What you lose is remote control and voice until it comes back. Nothing gets stuck locked or stuck off.",
  },
  {
    question: "Can I add to it later?",
    answer:
      "That is the point of setting it up on one standard rather than five apps. Adding a lock or a sensor later is a small job, not a rebuild, and it does not mean redoing what is already there.",
  },
  {
    question: "How far do you travel?",
    answer:
      "In-home work is Durham Region and the GTA. If you are further out, ask anyway. Some of it, voice assistants, shortcuts and troubleshooting, we can do remotely, and we would rather help than turn you away over a postcode.",
  },
  {
    question: "What happens if something goes wrong after you leave?",
    answer:
      "You call us and we fix it. If it is something we installed or configured, sorting it out is part of the job, not a new one. If a piece of hardware fails, we handle the warranty claim with the manufacturer rather than handing you a support number.",
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
        description="Lights, locks, the thermostat, the doorbell, all working together and all on one app instead of five. We install it, test it, and show you how to change it. You do not need to buy anything first."
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
                Text us a photo of the room, the thermostat, or the door.
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
                No appointment needed to ask a question. We only come out once we both know it is
                worth a visit.
              </p>
            </div>
          </div>
        }
      >
        <p className="mt-6 text-sm leading-7 text-[#3a352c]">
          Not after hardware?{" "}
          <Link
            href="/everyday-automations"
            className="font-semibold text-[var(--color-brand-strong)] hover:underline"
          >
            Everyday Automations
          </Link>{" "}
          is the phone side, shortcuts, tags and routines, set up remotely anywhere in Canada.
        </p>
      </JobSheetPageHero>

      <JobSheetSection
        code="SH-02"
        label="What we set up"
        title="Everything on one app, not five."
        description="Most houses end up with a different app per gadget and nothing talking to anything else. The job is one system, whichever brands are already in the house."
        tone="carbon"
      >
        <div
          className={`${jobsheet.ticket} divide-y divide-[rgba(28,36,48,0.14)] overflow-hidden p-0`}
        >
          <div className="hidden border-b-2 border-dashed border-[rgba(28,36,48,0.24)] bg-[rgba(28,36,48,0.03)] px-6 py-3 lg:grid lg:grid-cols-[5rem_16rem_minmax(0,1fr)] lg:gap-6">
            {["Ref", "What", "What it does"].map((h) => (
              <span
                key={h}
                className={`${jobsheet.mono} text-xs font-semibold uppercase tracking-[0.16em] text-[#58524a]`}
              >
                {h}
              </span>
            ))}
          </div>

          {setups.map((item) => (
            <div
              key={item.code}
              className={`${jobsheet.ledgerRow} grid grid-cols-1 gap-2 px-6 py-6 sm:px-8 lg:grid-cols-[5rem_16rem_minmax(0,1fr)] lg:items-baseline lg:gap-6`}
            >
              <span className={`${jobsheet.mono} text-xs font-semibold text-[#a8452f]`}>
                {item.code}
              </span>
              <p className="text-lg font-semibold tracking-tight text-[#181510]">{item.label}</p>
              <p className="text-sm leading-7 text-[#58524a]">{item.body}</p>
            </div>
          ))}
        </div>

      </JobSheetSection>

      <JobSheetSection
        code="SH-03"
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
              We set up what you have. No pressure to replace working gear, and if something you own
              will not play nicely with the rest, we will tell you before you have paid for anything.
            </p>
          </TicketCard>
          <TicketCard onDark refCode="GEAR-02">
            <h3 className="text-xl font-semibold tracking-tight text-[#f3ede1]">
              If you do not own it
            </h3>
            <p className="mt-3 text-sm leading-7 text-[rgba(243,237,225,0.72)]">
              We spec it and source it. Hardware goes on the quote at cost plus a small markup, so
              you are not paying full retail on top of labour. A deposit covers the gear before we
              buy it, the balance is due when it is working.
            </p>
          </TicketCard>
        </div>
      </JobSheetSection>

      <JobSheetSection
        code="SH-04"
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
          Whatever you are quoted before we start is what you pay. No change orders once the work
          begins.
        </p>
      </JobSheetSection>

      <JobSheetSection
        code="SH-05"
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
        code="SH-06"
        label="Before you ask"
        title="The questions people actually have."
        items={faqItems}
        tone="paper"
      />

      <JobSheetSection
        code="SH-07"
        label="On the roadmap"
        title="Two more we are building out."
        description="Not live yet. When they are, each gets its own page. For now they run as part of a full build."
        tone="carbon"
      >
        <div className="grid gap-6 sm:grid-cols-2">
          <ComingSoonCard
            refCode="RS-01"
            title="Security and cameras"
            blurb="Doorbells, indoor and outdoor cameras, sensors and alerts, set up as one system instead of five apps."
          />
          <ComingSoonCard
            refCode="RS-02"
            title="Climate and energy"
            blurb="Thermostats, smart vents, blinds and plugs tuned to cut what the house wastes when nobody is home."
          />
        </div>
      </JobSheetSection>

      <JobSheetSection
        code="SH-08"
        label="Start here"
        title="Send us a photo and we will tell you what it needs."
        description="That is genuinely the whole first step. If it is not worth doing, we will say so and it costs you nothing."
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
