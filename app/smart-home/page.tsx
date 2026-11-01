import type { CSSProperties, ReactNode } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { jobsheetFonts } from "@/components/jobsheet/fonts";
import jobsheet from "@/components/jobsheet/jobsheet.module.css";
import FormTab from "@/components/jobsheet/FormTab";
import Stamp from "@/components/jobsheet/Stamp";
import ComingSoonCard from "@/components/jobsheet/ComingSoonCard";
import ScrollCraftMount from "@/components/scrollcraft/ScrollCraftMount";
import { homeTextLine } from "@/data/siteContent";
import {
  smartHomeTiers as tiers,
  HOME_PRICE_PROMISE,
  FIRST_DEVICE_OFFER,
  FIRST_DEVICE_SCOPE,
  FIRST_DEVICE_SWAP,
  HOME_TAX,
} from "@/data/homePricing";
import "./smart-home.css";

export const metadata: Metadata = {
  alternates: { canonical: "/smart-home" },
  title: "Smart Home Setup",
  description:
    "Smart home setup and installation in Durham Region and the GTA. Lights, locks, thermostats, doorbells and voice control, installed and working before we leave. You do not need to buy the gear first.",
};

const setups = [
  { code: "01", label: "Lighting", body: "Whole rooms on one tap, on a schedule, or by voice. Bulbs, wireless switches and buttons, dimming, scenes. Nothing rewired." },
  { code: "02", label: "Locks and entry", body: "Deadbolts and lever locks. Phone, fingerprint or code. Let a cleaner in for one afternoon without cutting a key." },
  { code: "03", label: "Heating and cooling", body: "A thermostat that knows when the house is empty. The one that shows up on a bill, and can qualify for a $125 provincial rebate." },
  { code: "04", label: "Doorbells and cameras", body: "See and speak to whoever is at the door from anywhere. Get told when a parcel lands." },
  { code: "05", label: "Garage doors", body: "Opened from your phone or straight from the camera, so there is one less remote to lose." },
  { code: "06", label: "Sensors", body: "Door, window, motion, temperature and water leak. A leak sensor by the water heater is the cheapest insurance in the house." },
  { code: "07", label: "Voice and shortcuts", body: "Siri, Alexa or Google, and the routines behind them, so one phrase does the work of a dozen taps." },
  { code: "08", label: "Blinds and shades", body: "Open with the sun, close at dusk, or on one tap from bed." },
  { code: "09", label: "Gear that will not cooperate", body: "Some brands do not speak to Apple Home or Google at all. Rather than telling you to bin it and buy again, we bridge it in." },
];

const steps = [
  { code: "01", title: "You text or call", body: "Send a photo of the room, the thermostat, or the door. That is usually enough for us to tell you what it needs and roughly what it costs." },
  { code: "02", title: "We scope it on the phone", body: "What you already own, what you would need, what it will actually do. If it is not worth doing we will say so." },
  { code: "03", title: "We come out and install it", body: "Gear arrives, we fit it, connect it, and test it. Nothing gets left half-configured for you to finish." },
  { code: "04", title: "You get shown how it works", body: "Everyone in the house, not just whoever booked it. Including how to change it when you want something different." },
];

const faqItems = [
  { question: "Do I need to buy anything before you come?", answer: "No. If you already own the gear we will set up what you have. If you do not, we source it and it goes on the quote at cost plus a small markup, so you are not paying retail on top of labour. A deposit covers the hardware before we buy it, and the rest is due when the job is done." },
  { question: "Do you replace the switches in the wall?", answer: "No. We do not open boxes or touch line-voltage wiring. For a room on one tap we use smart bulbs with a wireless switch or a switch cover over the existing one, which gets the same result with nothing rewired. If you want a hardwired smart switch, a licensed electrician installs it, or you do as the homeowner, and we set it up in the app after." },
  { question: "Will it work with an iPhone and an Android in the same house?", answer: "Yes, but worth being precise about how. The gear we fit speaks Matter, which is the standard Apple, Google and Amazon all agreed on, so it works with all three. Apple Home itself is iPhone only, so an Android user in the house uses Google Home or the device app instead. Same devices, same automations, different app on their phone." },
  { question: "What if the internet goes down?", answer: "Lights, locks and thermostats keep working from their switches, keypads and dials. What you lose is remote control and voice until it comes back. Nothing gets stuck locked or stuck off." },
  { question: "Can I add to it later?", answer: "That is the point of setting it up on one standard rather than five apps. Adding a lock or a sensor later is a small job, not a rebuild, and it does not mean redoing what is already there." },
  { question: "How far do you travel?", answer: "In-home work is Durham Region and the GTA. If you are further out, ask anyway. Some of it, voice assistants, shortcuts and troubleshooting, we can do remotely, and we would rather help than turn you away over a postcode." },
  { question: "What happens if something goes wrong after you leave?", answer: "You call us and we fix it. If it is something we installed or configured, sorting it out is part of the job, not a new one. If a piece of hardware fails, we handle the warranty claim with the manufacturer rather than handing you a support number." },
  { question: "Is there a rebate for a smart thermostat?", answer: "Often, yes. Ontario's Home Renovation Savings program pays $125 on a qualifying smart thermostat if you are an Enbridge Gas customer heating with natural gas, or connected to the Ontario grid and heating or cooling electrically, in a single or semi-detached home, row or townhome, or mobile home on a permanent foundation, and have not already claimed one through the program. We will tell you upfront whether the thermostat we are installing qualifies, and help you apply." },
];

const ROOT_ID = "smart-home-sheet";

type Kind = "door" | "light" | "heat" | "lock" | "home";

const APP_LABEL: Record<Kind, string> = {
  door: "Doorbell",
  light: "Lights",
  heat: "Heat",
  lock: "Lock",
  home: "Home",
};

function Glyph({ kind }: { kind: Kind }) {
  switch (kind) {
    case "door":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="7" y="2.5" width="10" height="19" rx="4" />
          <circle cx="12" cy="8" r="2.4" />
          <circle cx="12" cy="16.5" r="1.5" data-fill />
        </svg>
      );
    case "light":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M9.2 18h5.6M10.2 21h3.6" />
          <path d="M12 3a6.2 6.2 0 0 0-3.7 11.2c.5.4.7.9.7 1.3h6c0-.4.2-.9.7-1.3A6.2 6.2 0 0 0 12 3z" />
        </svg>
      );
    case "heat":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="8.6" />
          <path d="M7.8 14.6a4.6 4.6 0 1 1 8.4 0" />
          <circle cx="12" cy="13.4" r="1.1" data-fill />
        </svg>
      );
    case "lock":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="5" y="10.5" width="14" height="10.5" rx="2.6" />
          <path d="M8 10.5V7.6a4 4 0 0 1 8 0v2.9" />
          <circle cx="12" cy="15.7" r="1.3" data-fill />
        </svg>
      );
    case "home":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M3.5 11.4 12 4l8.5 7.4" />
          <path d="M5.6 10.2V20h12.8v-9.8" />
          <path d="M10 20v-5.4h4V20" />
        </svg>
      );
  }
}

function AppIcon({
  kind,
  label,
  badge,
  className = "",
}: {
  kind: Kind;
  label?: boolean;
  badge?: string;
  className?: string;
}) {
  return (
    <div className={`sh-app sh-app--${kind} ${className}`}>
      <span className="sh-app-ic">
        <Glyph kind={kind} />
      </span>
      {badge ? <span className="sh-app-badge">{badge}</span> : null}
      {label === false ? null : <span className="sh-app-label">{APP_LABEL[kind]}</span>}
    </div>
  );
}

function Notif({
  kind,
  title,
  body,
  time,
  className = "",
}: {
  kind: Kind;
  title: string;
  body: string;
  time: string;
  className?: string;
}) {
  return (
    <article className={`sh-notif sh-notif--${kind} ${className}`}>
      <span className={`sh-app sh-app--${kind}`}>
        <span className="sh-app-ic">
          <Glyph kind={kind} />
        </span>
      </span>
      <span>
        <span className="sh-notif-title">{title}</span>
        <br />
        <span className="sh-notif-body">{body}</span>
      </span>
      <span className="sh-notif-time">{time}</span>
    </article>
  );
}

function Sheet({ kind, app }: { kind: Kind; app: string }) {
  return (
    <article className={`sh-sheet sh-sheet--${kind}`}>
      <div className="sh-sheet-head">
        <i />
        {app}
      </div>
      <div className="sh-sheet-body">
        <p className="sh-sheet-title">Sign in to continue</p>
        <div className="sh-field">Email</div>
        <div className="sh-field sh-field--dots">••••••••</div>
        <div className="sh-sheet-btn">Sign in</div>
        <p className="sh-sheet-foot">Forgot password?</p>
      </div>
    </article>
  );
}

function StatusBar() {
  return (
    <div className="sh-sb">
      <span>6:42</span>
      <span className="sh-sb-icons">
        <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
          <rect x="2" y="14" width="3.5" height="6" rx="1" />
          <rect x="7.5" y="11" width="3.5" height="9" rx="1" />
          <rect x="13" y="7.5" width="3.5" height="12.5" rx="1" />
          <rect x="18.5" y="4" width="3.5" height="16" rx="1" />
        </svg>
        <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
          <path d="M2.5 9.5a14 14 0 0 1 19 0" />
          <path d="M6 13.2a9 9 0 0 1 12 0" />
          <path d="M9.5 16.8a4 4 0 0 1 5 0" />
          <circle cx="12" cy="20" r="0.9" fill="currentColor" />
        </svg>
        <svg viewBox="0 0 28 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6">
          <rect x="1.5" y="6" width="21" height="12" rx="3.5" />
          <rect x="4" y="8.5" width="15" height="7" rx="1.6" fill="currentColor" stroke="none" />
          <path d="M24.5 10.5v3" strokeLinecap="round" />
        </svg>
      </span>
    </div>
  );
}

function Device({ children, tilt, className = "" }: { children: ReactNode; tilt?: string; className?: string }) {
  return (
    <div className={`sh-device ${className}`} aria-hidden="true" data-sc-tilt={tilt}>
      <div className="sh-device-body">
        <div className="sh-device-screen">
          <div className="sh-wall" />
          <div className="sh-island" />
          <StatusBar />
          {children}
          <div className="sh-homebar" />
        </div>
        <div className="sh-device-glare" />
      </div>
    </div>
  );
}

const enter = (i: number) => ({ "--i": i }) as CSSProperties;

export default function SmartHomePage() {
  return (
    <div id={ROOT_ID} className={`sh ${jobsheetFonts} ${jobsheet.root}`}>
      <ScrollCraftMount rootId={ROOT_ID} />

      <aside className={`sh-folio sh-mono`} aria-hidden="true">
        <span data-folio-code>SH-01</span>
        <span data-folio-title>Title page</span>
      </aside>

      {/* The running work order. Lines fill as the chapters pass. */}
      <aside className="sh-wo sh-mono" data-wo data-sc-verify-state="lines=0" aria-label="Sample work order">
        <span className="sh-wo-stamp" aria-hidden="true">Sample</span>
        <div className="sh-wo-head">
          <span>Sample work order</span>
          <span>No. SH-26</span>
        </div>
        <p className="sh-wo-sub">Fills in as you read.</p>
        <div className="sh-wo-row" data-wo-line="swap" data-wo-amount="59">
          <span className="sh-wo-box" aria-hidden="true" />
          <span data-wo-label>Doorbell swap, existing wire</span>
          <span className="sh-wo-fig">$59</span>
        </div>
        <div className="sh-wo-row" data-wo-line="first" data-wo-amount="99">
          <span className="sh-wo-box" aria-hidden="true" />
          <span data-wo-label>Thermostat set up, one automation</span>
          <span className="sh-wo-fig">$99</span>
        </div>
        <div className="sh-wo-row" data-wo-line="hardware" data-wo-amount="0">
          <span className="sh-wo-box" aria-hidden="true" />
          <span data-wo-label>Hardware, at cost plus a small markup</span>
          <span className="sh-wo-fig">quoted</span>
        </div>
        <div className="sh-wo-row" data-wo-line="rebate" data-wo-amount="0">
          <span className="sh-wo-box" aria-hidden="true" />
          <span data-wo-label>Ontario thermostat rebate, yours to claim</span>
          <span className="sh-wo-fig">$125 back</span>
        </div>
        <div className="sh-wo-totals">
          <div className="sh-wo-tot"><span>Labour</span><span data-wo-labour>$0.00</span></div>
          <div className="sh-wo-tot"><span>HST 13%</span><span data-wo-hst>$0.00</span></div>
          <div className="sh-wo-tot sh-wo-tot--grand"><span>Total</span><span data-wo-total>$0.00</span></div>
          <a className="sh-wo-door" href={homeTextLine.smsHref}>Text this to {homeTextLine.display}</a>
          <p className="sh-wo-note">A sample. Yours starts with a photo of the device.</p>
        </div>
      </aside>
      <div className="sh-wo-strip sh-mono" data-wo-strip aria-hidden="true">
        <span data-wo-strip-label />
        <span data-wo-strip-sum />
      </div>

      {/* A0 Title page: type on paper, the door in a ticket that leans to the pointer */}
      <section
        className={`sh-chapter ${jobsheet.paperTexture}`}
        data-sc-act="flow"
        data-chapter="SH-01"
        data-chapter-title="Title page"
      >
        <div className="container-shell">
          <div className="mb-1 sh-enter" style={enter(0)}>
            <FormTab code="FORM SH-01" label="Home file" />
          </div>
          <div className="sh-rule sh-enter" style={enter(1)}>
            <p className="sh-mono text-xs uppercase tracking-[0.18em] text-[#58524a]">
              Smart home setup, Durham and the GTA
            </p>
            <h1 className="sh-display mt-5 text-[clamp(2.5rem,6.2vw,4.6rem)] text-[#181510]">
              Your house should do the boring parts on its own.
            </h1>
          </div>
          <div className="sh-cols mt-10">
            <div className="sh-enter" style={enter(2)}>
              <p className="sh-measure text-lg leading-8 text-[#3a352c]">
                Lights, locks, the thermostat, the doorbell, all working together and all on one app
                instead of five. We install it, test it, and show you how to change it. You do not need
                to buy anything first.
              </p>
              <p className="mt-6 text-sm leading-7 text-[#3a352c]">
                Not after hardware?{" "}
                <Link href="/everyday-automations" className="font-semibold text-[var(--color-brand-strong)] hover:underline">
                  Everyday Automations
                </Link>{" "}
                is the phone side, shortcuts, tags and routines, set up remotely anywhere in Canada.
              </p>
            </div>
            <div className="sh-enter" style={enter(3)}>
              <div data-sc-parallax="-0.5">
                <div className={`${jobsheet.ticket} sh-title-ticket overflow-hidden p-0`} data-sc-tilt="4">
                  <div className="flex items-center justify-between border-b-2 border-dashed border-[rgba(28,36,48,0.24)] bg-[rgba(28,36,48,0.03)] px-5 py-3">
                    <span className="sh-mono text-xs tracking-[0.18em] text-[#58524a]">START HERE</span>
                    <span className="sh-mono text-xs tracking-[0.18em] text-[#58524a]">NO FORMS</span>
                  </div>
                  <div className="px-6 py-7">
                    <p className="text-lg font-semibold leading-7 tracking-tight text-[#181510]">{FIRST_DEVICE_OFFER}</p>
                    <p className="mt-1 text-base font-medium leading-7 text-[#181510]">{FIRST_DEVICE_SWAP}</p>
                    <p className="mt-2 text-sm leading-7 text-[#3a352c]">
                      {FIRST_DEVICE_SCOPE} Text a photo of the device and we will tell you what it needs.
                    </p>
                    <a
                      href={homeTextLine.smsHref}
                      className="sh-mono mt-4 block text-[clamp(1.7rem,4vw,2.3rem)] font-semibold text-[#181510] transition-colors hover:text-[var(--color-brand-strong)]"
                    >
                      {homeTextLine.display}
                    </a>
                    <div className="mt-5 flex flex-wrap gap-3">
                      <a href={homeTextLine.smsHref} className={jobsheet.punchButton} data-sc-magnet="0.22">
                        Text Us
                      </a>
                      <a href={homeTextLine.telHref} className={`${jobsheet.punchButton} ${jobsheet.punchButtonGhost}`}>Or Call</a>
                    </div>
                    <p className="mt-4 text-xs leading-6 text-[#58524a]">
                      It answers. Jarrett reads every thread. We only come out once we both know it is worth a visit.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* A1 Chapter one: the pile of apps. Pinned; four apps land, four logins stack. */}
      <section
        className={`sh-ch1 ${jobsheet.carbonTexture}`}
        data-sc-act="pin"
        data-sc-span="2.8"
        data-sh-phases="apps:0.04:0.4,sheets:0.5:0.32"
        data-wo-open
        data-chapter="SH-02"
        data-chapter-title="Chapter one, the pile of apps"
      >
        <div className="sh-stage" data-sc-stage data-sc-verify-state="apps=0;sheets=0">
          <div className="container-shell">
            <div className="sh-stage-grid sh-stage-grid--media-first">
              <div className="sh-stage-copy">
                <div className="mb-1 sh-stage-tab" data-sc-cue="0 0.92 0 0.08" data-sc-rise="0">
                  <FormTab code="SH-02" label="Chapter one" />
                </div>
                <div className="sh-rule" data-sc-cue="0 0.92 0 0.08">
                  <p className="sh-mono sh-eyebrow">The house as it stands</p>
                  <h2 className="sh-display mt-3">Five gadgets. Five apps. Nothing talking.</h2>
                </div>
                <p data-sc-cue="0.06 0.92 0.14 0.08">
                  Most houses end up with a different app per gadget. The doorbell has a login. The
                  bulbs have a login. The thermostat has a login and a schedule nobody has opened since
                  the first week.
                </p>
                <p data-sc-cue="0.5 0.94 0.14 0.08">
                  None of them know the others exist. The job is one system, whichever brands are
                  already in the house.
                </p>
              </div>
              <div className="sh-stage-media">
                <Device tilt="5">
                  <div className="sh-grid">
                    <AppIcon kind="door" badge="3" />
                    <AppIcon kind="light" badge="1" />
                    <AppIcon kind="heat" badge="7" />
                    <AppIcon kind="lock" badge="2" />
                  </div>
                  <Sheet kind="door" app="Doorbell app" />
                  <Sheet kind="light" app="Bulb app" />
                  <Sheet kind="heat" app="Thermostat app" />
                  <Sheet kind="lock" app="Lock app" />
                </Device>
                <div className="sh-tally sh-mono" aria-hidden="true">
                  <div><b data-sc-count="0 4" data-sc-count-at="0.5 0.8">0</b> apps</div>
                  <div><b data-sc-count="0 4" data-sc-count-at="0.5 0.8">0</b> logins</div>
                  <div className="is-zero"><b>0</b> routines</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* A1b What goes into one system: the ledger, in flow */}
      <section className={`sh-chapter sh-chapter--tight ${jobsheet.carbonTexture}`} data-chapter="SH-02" data-chapter-title="Chapter one, what goes into it">
        <div className="container-shell">
          <div className="sh-rule" data-sc-in>
            <h3 className="sh-display text-[clamp(1.5rem,3vw,2.2rem)] text-[#181510]">What goes into one system</h3>
          </div>
          <div className="sh-ledger mt-8" data-sc-in data-sc-stagger="45">
            {setups.map((item) => (
              <div key={item.code} className="sh-ledger-row">
                <span className="sh-mono text-xs font-semibold text-[#a8452f]">{item.code}</span>
                <p className="text-lg font-semibold tracking-tight text-[#181510]">{item.label}</p>
                <p className="text-sm leading-7 text-[#58524a]">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* A2 Chapter two: the swap. Pinned; the new doorbell wipes in over the old one. */}
      <section
        className={`sh-ch2 ${jobsheet.paperTexture}`}
        data-sc-act="pin"
        data-sc-span="2.3"
        data-sh-phases="swap:0.12:0.38,ring:0.5:0.1,bell:0.6:0.1"
        data-chapter="SH-03"
        data-chapter-title="Chapter two, the first job"
      >
        <div className="sh-stage" data-sc-stage data-sc-verify-state="swap=0;ring=0;bell=0">
          <div className="container-shell">
            <div className="sh-stage-grid">
              <div className="sh-stage-copy">
                <div className="mb-1 sh-stage-tab" data-sc-cue="0 0.94 0 0.08" data-sc-rise="0">
                  <FormTab code="SH-03" label="Chapter two" />
                </div>
                <div className="sh-rule" data-sc-cue="0 0.94 0 0.08">
                  <p className="sh-mono sh-eyebrow">The first job</p>
                  <h2 className="sh-display mt-3">The first job is one device.</h2>
                </div>
                <p data-sc-cue="0.05 0.94 0.14 0.08">
                  Not the whole house. One thing, picked because it is the one you fight with most.
                  Usually the doorbell or the thermostat.
                </p>
                <div className={`${jobsheet.ticket} sh-stage-ticket p-6 pl-10`} data-sc-cue="0.3 0.96 0.14 0.06">
                  <span className={jobsheet.ticketHole} aria-hidden="true" />
                  <span className={`sh-mono ${jobsheet.ticketRef}`}>FIRST-01</span>
                  <p className="text-base font-semibold leading-7 text-[#181510]" data-wo-pass="swap" data-wo-pass-at="0.3">
                    {FIRST_DEVICE_SWAP}
                  </p>
                  <p className="mt-3 text-base font-semibold leading-7 text-[#181510]" data-wo-pass="first" data-wo-pass-at="0.56">
                    {FIRST_DEVICE_OFFER}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-[#58524a]">
                    {tiers[0].body} {FIRST_DEVICE_SCOPE}
                  </p>
                </div>
                <p data-sc-cue="0.56 0.96 0.14 0.06">
                  A deposit covers the hardware before we buy it. The rest is due when it is working and
                  you have seen it work.
                </p>
              </div>
              <div className="sh-stage-media">
                <div className="sh-wallcard" aria-hidden="true">
                  <span className="sh-wire" />
                  <div className="sh-dev-old" />
                  <div className="sh-dev-wrap" data-sc-reveal="up" data-sc-reveal-at="0.12 0.5">
                    <div className="sh-dev-doorbell" />
                  </div>
                  <Notif kind="door" title="Front door" body="Someone is at the door" time="now" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* A3 Intertitle: the quiet before the peak */}
      <section className="sh-intertitle" data-chapter="SH-04" data-chapter-title="Chapter three">
        <div className="container-shell" data-sc-in data-sc-stagger="120">
          <p className="sh-mono text-xs uppercase tracking-[0.18em] text-[#58524a]">Chapter three</p>
          <p className="sh-display mt-4 text-[clamp(2.4rem,6vw,4.4rem)] text-[#181510]">One system.</p>
        </div>
      </section>

      {/* A4 Peak: four apps become one, then the house answers three times */}
      <section
        className="sh-peak"
        data-sc-act="pin"
        data-sc-span="3.6"
        data-sh-phases="converge:0.1:0.42,one:0.4:0.16,n1:0.64:0.08,n2:0.74:0.08,n3:0.84:0.08"
        data-chapter="SH-04"
        data-chapter-title="Chapter three, one system"
      >
        <div className="sh-stage sh-stage--dark" data-sc-stage data-sc-spotlight data-sc-verify-state="converge=0;one=0;n1=0;n2=0;n3=0">
          <div className="sh-lamp" aria-hidden="true" />
          <div className="container-shell">
            <div className="sh-stage-grid">
              <div className="sh-stage-copy">
                <div className="mb-1 sh-stage-tab" data-sc-cue="0" data-sc-rise="0">
                  <FormTab code="SH-04" label="Chapter three" onDark />
                </div>
                <div className="sh-rule sh-rule--dark" data-sc-cue="0">
                  <p className="sh-mono sh-eyebrow">One system</p>
                  <h2 className="sh-display mt-3">One app. Everything in it answers.</h2>
                </div>
                <p data-sc-cue="0.05">
                  The four apps fold into one. Then someone rings the bell at dusk, and the house does
                  three things without being asked.
                </p>
                <div className="sh-log" aria-label="What happens when the doorbell rings">
                  <div className="sh-log-row">
                    <span className="sh-app sh-app--door"><span className="sh-app-ic"><Glyph kind="door" /></span></span>
                    <span>Someone at the door</span>
                    <time>6:42 pm</time>
                  </div>
                  <div className="sh-log-row">
                    <span className="sh-app sh-app--light"><span className="sh-app-ic"><Glyph kind="light" /></span></span>
                    <span>Porch light on</span>
                    <time>6:42 pm</time>
                  </div>
                  <div className="sh-log-row">
                    <span className="sh-app sh-app--heat"><span className="sh-app-ic"><Glyph kind="heat" /></span></span>
                    <span>Heat to 20, you are home</span>
                    <time>6:42 pm</time>
                  </div>
                </div>
              </div>
              <div className="sh-stage-media">
                <Device tilt="5">
                  <div className="sh-grid">
                    <AppIcon kind="door" className="sh-peak-tile" />
                    <AppIcon kind="light" className="sh-peak-tile" />
                    <AppIcon kind="heat" className="sh-peak-tile" />
                    <AppIcon kind="lock" className="sh-peak-tile" />
                  </div>
                  <span className="sh-halo" />
                  <AppIcon kind="home" className="sh-one" />
                  <Notif kind="door" title="Front door" body="Someone is at the door" time="6:42 pm" />
                  <Notif kind="light" title="Porch light" body="Turned on" time="6:42 pm" />
                  <Notif kind="heat" title="Thermostat" body="Set to 20, you are home" time="6:42 pm" />
                </Device>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* A5 Chapter four: the price */}
      <section
        className={`sh-chapter sh-chapter--tight ${jobsheet.paperTexture}`}
        data-chapter="SH-05"
        data-chapter-title="Chapter four, what it costs"
      >
        <div className="container-shell">
          <div className="mb-1">
            <FormTab code="SH-05" label="Chapter four" />
          </div>
          <div className="sh-rule" data-sc-in data-sc-stagger="70">
            <h2 className="sh-display text-[clamp(1.9rem,4vw,3.1rem)] text-[#181510]">
              Published, so you can decide before you call.
            </h2>
            <p className="sh-measure mt-5 text-base leading-8 text-[#58524a] sm:text-lg" data-wo-pass="hardware">
              Setup and labour, plus HST. Hardware, if you need any, is quoted separately at cost plus a
              small markup. No hourly rate, no surprise on the invoice.
            </p>
          </div>

          <div className="sh-ledger mt-12" data-sc-in data-sc-stagger="90">
            {tiers.map((tier) => (
              <div key={tier.code} className="sh-ledger-row sh-ledger-row--price">
                <span className="sh-mono text-xs font-semibold text-[#a8452f]">{tier.code}</span>
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-xl font-semibold tracking-tight text-[#181510]">{tier.name}</h3>
                    {tier.featured ? <Stamp tone="teal" label="Most homes" /> : null}
                  </div>
                  <p className="mt-2 text-sm leading-7 text-[#58524a]">{tier.body}</p>
                  <p className="mt-1 text-sm leading-7 text-[#3a352c]">{tier.fit}</p>
                </div>
                <p className="sh-mono text-[clamp(1.4rem,2.4vw,1.8rem)] font-semibold text-[#181510] lg:text-right">
                  {tier.price}
                  {tier.code === "T3" ? null : (
                    <span className="ml-2 block text-sm font-medium text-[#58524a] lg:ml-0">{HOME_TAX}</span>
                  )}
                </p>
              </div>
            ))}
          </div>

          <div className="sh-cols mt-12">
            <p className="sh-measure text-sm leading-7 text-[#58524a]" data-sc-in>
              {HOME_PRICE_PROMISE}{" "}
              <Link href="/pricing#home-pricing" className="font-medium text-[var(--color-brand-strong)] hover:underline">
                See full pricing
              </Link>
            </p>
            <figure className={`${jobsheet.ticket} sh-media flex items-center gap-5 p-6`} data-sc-in data-wo-pass="rebate">
              <div className="sh-dial shrink-0" aria-hidden="true">
                <span>20<small>°</small></span>
              </div>
              <figcaption className="!mt-0">
                <p className="sh-mono text-[1.6rem] font-semibold leading-none text-[#181510]">
                  $<span data-sc-count="0 125">0</span> back
                </p>
                <p className="mt-2 text-sm leading-6 text-[#58524a]">
                  Ontario pays this on a qualifying smart thermostat. We tell you before the visit whether
                  yours qualifies, and help you apply.
                </p>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* A6 Chapter five: how it goes, the gear, the questions */}
      <section
        className={`sh-chapter ${jobsheet.carbonTexture}`}
        data-chapter="SH-06"
        data-chapter-title="Chapter five, how a job goes"
      >
        <div className="container-shell">
          <div className="mb-1">
            <FormTab code="SH-06" label="Chapter five" />
          </div>
          <div className="sh-cols">
            <div className="sh-rule" data-sc-in data-sc-stagger="70">
              <h2 className="sh-display text-[clamp(1.9rem,4vw,3.1rem)] text-[#181510]">
                Four steps, and the first one is a text.
              </h2>
              <p className="sh-measure mt-5 text-base leading-8 text-[#58524a] sm:text-lg">
                No form to fill in, no discovery call, no visit until we both know it is worth one.
              </p>
            </div>
            <div className="sh-steps mt-2 lg:mt-0" data-sc-in data-sc-stagger="80">
              {steps.map((step) => (
                <div key={step.code} className="sh-step">
                  <span className="sh-step-num sh-mono">{step.code}</span>
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight text-[#181510]">{step.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-[#58524a]">{step.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="sh-cols mt-16" data-sc-in data-sc-stagger="90">
            <div>
              <p className="sh-mono text-xs font-semibold tracking-[0.16em] text-[#a8452f]">GEAR-01</p>
              <h3 className="mt-2 text-xl font-semibold tracking-tight text-[#181510]">If you already own it</h3>
              <p className="mt-3 text-sm leading-7 text-[#58524a]">
                We set up what you have. No pressure to replace working gear, and if something you own
                will not play nicely with the rest, we will tell you before you have paid for anything.
              </p>
            </div>
            <div>
              <p className="sh-mono text-xs font-semibold tracking-[0.16em] text-[#a8452f]">GEAR-02</p>
              <h3 className="mt-2 text-xl font-semibold tracking-tight text-[#181510]">If you do not own it</h3>
              <p className="mt-3 text-sm leading-7 text-[#58524a]">
                We spec it and source it. Hardware goes on the quote at cost plus a small markup, so you
                are not paying full retail on top of labour. A deposit covers the gear before we buy it,
                the balance is due when it is working.
              </p>
            </div>
          </div>

          <div className="mt-16 border-t-2 border-[rgba(28,36,48,0.28)] pt-6" data-sc-in>
            <h3 className="sh-display text-[clamp(1.5rem,3vw,2.2rem)] text-[#181510]">Before you ask</h3>
          </div>
          <div className="mt-6 grid gap-4 lg:grid-cols-2" data-sc-in data-sc-stagger="40">
            {faqItems.map((item, i) => (
              <details key={item.question} className={`${jobsheet.ticket} group relative p-6 pl-10`}>
                <span className={jobsheet.ticketHole} aria-hidden="true" />
                <span className={`sh-mono ${jobsheet.ticketRef}`}>Q-{String(i + 1).padStart(2, "0")}</span>
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 pr-12 text-left">
                  <span className="sh-display text-base leading-tight text-[#181510]">{item.question}</span>
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded border border-[rgba(28,36,48,0.24)] text-base text-[var(--color-brand-strong)] transition-transform duration-200 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-4 pr-4 text-sm leading-7 text-[#58524a]">{item.answer}</p>
              </details>
            ))}
          </div>

          <div className="mt-16 border-t-2 border-[rgba(28,36,48,0.28)] pt-6" data-sc-in>
            <h3 className="sh-display text-[clamp(1.5rem,3vw,2.2rem)] text-[#181510]">On the roadmap</h3>
            <p className="mt-3 text-sm leading-7 text-[#58524a]">
              Not live yet. When they are, each gets its own page. For now they run as part of a full build.
            </p>
          </div>
          <div className="mt-6 grid gap-6 sm:grid-cols-2" data-sc-in data-sc-stagger="80">
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
        </div>
      </section>

      {/* A7 Colophon */}
      <section className="sh-chapter sh-colophon" data-chapter="SH-07" data-chapter-title="Colophon">
        <div className="container-shell">
          <div className="mb-1">
            <FormTab code="SH-07" label="Colophon" onDark />
          </div>
          <div className="sh-rule sh-rule--dark" data-sc-in data-sc-stagger="90">
            <p className="sh-running" data-wo-pass="total">
              The work order in the corner is a sample: a doorbell swap and a thermostat on one visit,
              labour $158 plus HST. Yours starts with a photo of the device. Text it to{" "}
              <a href={homeTextLine.smsHref}>{homeTextLine.display}</a>. It answers, and Jarrett
              reads every thread. If it is not worth doing, we will say so and it costs you nothing.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href={homeTextLine.smsHref} className={`${jobsheet.punchButton} ${jobsheet.punchButtonOnDark}`}>
                Text Us
              </a>
              <a
                href={homeTextLine.telHref}
                className={`${jobsheet.punchButton} ${jobsheet.punchButtonGhost} ${jobsheet.punchButtonGhostOnDark}`}
              >
                Or Call
              </a>
            </div>
            <p className="sh-mono sh-mono-foot">
              Form SH-01 to SH-07. Set in Barlow on paper stock. Current Automations, Durham Region.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
