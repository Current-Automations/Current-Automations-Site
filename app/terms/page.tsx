import Link from "next/link";
import type { Metadata } from "next";
import { jobsheetFonts } from "@/components/jobsheet/fonts";
import jobsheet from "@/components/jobsheet/jobsheet.module.css";
import JobSheetPageHero from "@/components/jobsheet/JobSheetPageHero";
import JobSheetLegalClause from "@/components/jobsheet/JobSheetLegalClause";
import Stamp from "@/components/jobsheet/Stamp";
import { siteContact, siteContacts } from "@/data/siteContent";

export const metadata: Metadata = {
  title: {
    default: "Terms of Service | Current Automations",
    template: "%s",
  },
  description:
    "Terms of Service for Current Automations covering subscriptions, billing, service limitations, and legal obligations.",
};

const clauseIndex = [
  { code: "KEY", title: "Key Points at a Glance" },
  { code: "SIGN", title: "Electronic Acceptance" },
  { code: "01", title: "Definitions" },
  { code: "02", title: "Services Provided" },
  { code: "03", title: "Billing, Payment and Subscription Terms" },
  { code: "04", title: "Cancellation and Refund Policy" },
  { code: "05", title: "Acceptable Use" },
  { code: "06", title: "Client Obligations" },
  { code: "07", title: "Limitation of Liability" },
  { code: "08", title: "Intellectual Property" },
  { code: "09", title: "Privacy, Data and Security" },
  { code: "10", title: "Dispute Resolution" },
  { code: "11", title: "Amendments" },
  { code: "12", title: "Entire Agreement" },
  { code: "END", title: "Questions" },
];

export default function TermsPage() {
  return (
    <div className={jobsheetFonts}>
      <JobSheetPageHero
        docLabel="LEGAL FILE"
        docCode="FORM TM-01"
        kicker={
          <span className="flex flex-wrap items-center gap-3">
            <Link
              href="/"
              className="font-semibold text-[var(--color-brand-strong)] hover:underline"
            >
              &larr; Back to home
            </Link>
            <span aria-hidden="true">&middot;</span>
            <span>Legal</span>
          </span>
        }
        title="Terms of Service"
        description={`EFFECTIVE DATE: May 7, 2025 | VERSION: 1.3 | JURISDICTION: Province of Ontario, Canada | CONTACT: ${siteContacts.general} | ${siteContact.phoneDisplay}`}
      />

      <section className={`${jobsheet.root} ${jobsheet.paperTexture} relative py-16 sm:py-20`}>
        <div className="container-shell relative">
          <div className="grid gap-8 lg:grid-cols-[13rem_minmax(0,1fr)] lg:items-start">
            {/* Clause index: a filed binder's tab strip, not a plain TOC list */}
            <nav
              aria-label="Terms of service clauses"
              className={`${jobsheet.ticket} hidden overflow-hidden p-0 lg:sticky lg:top-28 lg:block`}
            >
              <div className="border-b-2 border-dashed border-[rgba(28,36,48,0.24)] bg-[rgba(28,36,48,0.03)] px-4 py-3">
                <span className={`${jobsheet.mono} text-[0.65rem] tracking-[0.16em] text-[#58524a]`}>
                  15 CLAUSES ON FILE
                </span>
              </div>
              <ol className="max-h-[70vh] overflow-y-auto py-1">
                {clauseIndex.map((item) => (
                  <li key={item.code}>
                    <a
                      href={`#clause-${item.code}`}
                      className={`${jobsheet.ledgerRow} flex items-baseline gap-2.5 px-4 py-2 text-xs leading-5 text-[#3a352c] hover:text-[var(--color-brand-strong)]`}
                    >
                      <span className={`${jobsheet.mono} shrink-0 text-[#a8452f]`}>{item.code}</span>
                      <span>{item.title}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            <div className={`${jobsheet.ticket} overflow-hidden p-0`}>
              <JobSheetLegalClause id="clause-KEY" code="KEY" title="Key Points at a Glance">
                <div className="mb-4">
                  <Stamp label="Read this part first" tone="rust" />
                </div>
                <ul className="space-y-3 pl-6">
                  <li className="list-disc">
                    Monthly Subscription: Billing starts the day you sign up and renews automatically each month.
                    Cancel anytime with 5 business days notice before your next billing date. A one-time $150 CAD setup fee applies at signup, plus a one-time $200 CAD AI voice configuration fee on plans that include AI voice, or $450 CAD with Receptionist Mode (all non-refundable once onboarding begins; may be waived or reduced at our discretion).
                  </li>
                  <li className="list-disc">
                    No Refunds Once Charged: Monthly fees are non-refundable, with one exception. If we offered you the First Month Reply Guarantee in writing, your first month is refundable on the terms in clause 2.4.1. If you cancel mid-month you keep access until the period ends.
                  </li>
                  <li className="list-disc">
                    No Guarantee of Results: The system helps you respond faster to missed calls. Whether that converts to bookings and revenue depends entirely on your own operations and follow-through.
                    The one thing we will put in writing is a reply. Where we have offered you the First Month Reply Guarantee, if not a single person texts you back in your first 30 days, that month is on us. It covers text and automation plans, not AI voice, and clause 2.4.1 spells out exactly how it is counted and settled.
                  </li>
                  <li className="list-disc">
                    AI Is Not Perfect: Transcriptions and urgency tags can have errors. Where your plan includes AI voice handling, the assistant can also get something wrong when speaking to a caller. It is built to refuse rather than guess, and to hand anything it was not given to a human callback, but it is not infallible. You are responsible for reviewing all outputs and for the accuracy of the business facts you give us to work from.
                  </li>
                  <li className="list-disc">
                    Your Number Stays Yours: We port your number into our system so automation works seamlessly. When you leave, we initiate the return port within 5 business days of your written request.
                  </li>
                  <li className="list-disc">
                    CASL Is Your Responsibility: You must have valid consent for every recipient of automated texts. We do not check your contact lists.
                  </li>
                  <li className="list-disc">
                    Disputes, Ontario Courts: Contact us first and allow 14 business days to resolve anything before escalating.
                  </li>
                </ul>
              </JobSheetLegalClause>

              <JobSheetLegalClause id="clause-SIGN" code="SIGN" title="Electronic Acceptance">
                <p>
                  By subscribing to any Current Automations plan, completing the onboarding intake form, clicking I agree at checkout, or making payment, you agree to be legally bound by these Terms in full.
                  Electronic acceptance constitutes a binding signature.
                </p>
              </JobSheetLegalClause>

              <JobSheetLegalClause id="clause-01" code="01" title="Definitions">
                <p>
                  Service means the automation systems, SMS communications, voicemail processing, AI transcription, urgency tagging, call routing, and any related services provided by Current Automations under a selected plan.
                </p>
                <p>
                  Client or you means the individual or business entity that has subscribed to a Current Automations service plan.
                </p>
                <p>
                  Plan means the specific tier of service selected at checkout: Starter, Pro, Growth, or Elite, or any individual automation scenario purchased a la carte.
                </p>
                <p>
                  Subscription means the recurring monthly billing arrangement between the Client and Current Automations.
                </p>
                <p>
                  Third-Party Providers means external platforms used to deliver the Service, including Twilio, Make, OpenAI, Google, Google Calendar, and others as applicable.
                </p>
                <p>
                  Ported Number means any telephone number transferred from a Client&apos;s existing carrier to Twilio as part of the onboarding process.
                </p>
                <p>
                  Authorized Recipients means individuals who have provided valid express or implied consent under CASL to receive automated commercial electronic messages from the Client&apos;s business.
                </p>
              </JobSheetLegalClause>

              <JobSheetLegalClause id="clause-02" code="02" title="Services Provided">
                <p>
                  2.1 Plan Descriptions: Current Automations offers four service tiers. Features included in each plan are as described at checkout and on the Current Automations website at the time of purchase.
                  Current Automations reserves the right to modify plan features with 30 days written notice to existing subscribers.
                  Current Automations may also make non-material changes to features, underlying platforms, or system configurations at any time without notice, for the purpose of improving reliability, performance, or security.
                </p>
                <ul className="space-y-3 pl-6">
                  <li className="list-disc">
                    Starter $197 CAD/mo: Missed Call Text Back, Web Form Speed to Lead, Google Business Profile Lead Capture, and System Anomaly Alert.
                  </li>
                  <li className="list-disc">
                    Pro $297 CAD/mo: Everything in Starter, plus Multi-Touch Follow Up, Quote Follow Up, and Post Job Review Request.
                  </li>
                  <li className="list-disc">
                    Growth $397 CAD/mo: Everything in Pro, plus Database Reactivation, No Show and Cancellation Recovery, and Weekly ROI Report.
                  </li>
                  <li className="list-disc">
                    Elite $597 CAD/mo: Everything in Growth, plus Retell AI Outbound Call and Inbound AI Call Handling. Includes an allowance of AI call minutes as set out in clause 3.6.
                  </li>
                  <li className="list-disc">
                    A la carte: individual automation scenarios are available from $49 CAD/mo and can be added to any tier.
                  </li>
                </ul>
                <p>
                  2.2 Setup and Onboarding: A one-time setup fee of $150 CAD is charged at checkout, covering full build, configuration, onboarding, and initial testing. The setup fee is charged once per Client account, regardless of how many scenarios are purchased and regardless of whether they are purchased together or added later.
                  Plans that include AI voice handling (Retell AI Outbound Call or Inbound AI Call Handling, whether purchased in the Elite tier or a la carte) are additionally charged a one-time AI voice configuration fee of $200 CAD, covering call flow design, knowledge base build, and live call testing, which are non-templated and specific to each Client. This fee is likewise charged once per Client account: a Client who already runs AI voice is not charged again when adding a further voice scenario, and a Client who adds AI voice after signup pays only the configuration fee, not a second setup fee.
                  Where Receptionist Mode (clause 3.7) is purchased, the AI voice configuration fee is $450 CAD rather than $200 CAD, reflecting the deeper per-Client build that mode requires. A Client already running AI voice who upgrades to Receptionist Mode is charged only the $250 CAD difference, not a second configuration fee.
                  There are no recurring setup or configuration costs. Both fees are non-refundable once onboarding has begun, including if you later cancel the Service or request a refund. Current Automations reserves the right to waive or reduce either fee at its sole discretion, for example as part of a promotional offer.
                  Current Automations will begin setup upon receipt of a completed intake form and signed Letter of Authorization.
                  Target go-live time is 2 to 3 business days from receipt of all required information. This timeline is an estimate only and is subject to carrier processing times and completeness of information provided by the Client.
                </p>
                <p>
                  2.3 Service Limitations: The Service is designed to supplement the Client&apos;s existing call handling, not to replace it.
                  Current Automations makes no guarantee that the Service will capture every missed call, deliver every SMS, or accurately transcribe every voicemail.
                </p>
                <p>
                  2.3.1 AI Voice Accuracy and Scope of Statements: Where a plan includes AI voice handling, the assistant is configured to answer only from the business information the Client supplies, and to decline rather than speculate on anything outside it.
                  It is instructed not to quote prices, commit to arrival times or job durations, state warranty or guarantee terms, assert licensing, insurance or certification, give code, legal or compliance opinions, confirm services or service areas it was not given, or state accepted payment methods. Where a caller asks any of these, the assistant takes a callback rather than answering.
                  The assistant cannot transfer a live call and will not represent that it is doing so.
                  The Client is responsible for the accuracy and currency of the business information provided, including hours, service area, services offered, and any fees, and for notifying Current Automations when those facts change.
                  Current Automations does not warrant that the assistant will never state something inaccurate, and the Client remains responsible for its own communications with its customers.
                </p>
                <p>
                  2.4 No Guarantee of Results: Current Automations does not guarantee any specific business outcomes, revenue increases, booking volume, lead conversion rates, or return on investment from use of the Service.
                  Business results depend entirely on the Client&apos;s own operations, responsiveness, and follow-through.
                  Clause 2.4 is subject to one exception, set out in clause 2.4.1, and to no others.
                </p>
                <p>
                  2.4.1 First Month Reply Guarantee, where offered: This guarantee applies only where Current Automations has expressly offered it to the Client in writing at or before signup. Where it applies, and notwithstanding clause 2.4 and clause 4.2, if the Client receives no qualifying reply during the first 30 days of active service, Current Automations will refund the Client&apos;s first monthly subscription fee in full.
                  A qualifying reply is any inbound text message from a number the Service texted, received within 7 days of the missed call or form submission that triggered the outbound message. Opt-out messages such as STOP or UNSUBSCRIBE do not count as a reply. Neither does any message the Client marks as a wrong number or spam in the shared lead record described below.
                  The shared lead record is the record of truth for this guarantee. Current Automations maintains a lead sheet for the Client and the Client has access to it for the duration of the Service. Every captured lead carries an Outcome value in that sheet, updated automatically when a reply arrives, and a claim under this clause is settled by reading that column. The Client is responsible for keeping its own wrong-number and spam markings current, since those exclusions depend on them.
                  What is refunded: the first monthly subscription fee only. The one-time setup fee and any AI voice configuration fee remain non-refundable under clause 2.2.
                  What is not covered: AI voice handling of any kind, whether in the Elite tier, purchased a la carte, or with Receptionist Mode under clause 3.7. AI call minutes are consumed as the month runs and cannot be returned. This guarantee covers text and automation service only.
                  Conditions: the Service must have remained active and enabled for the full 30 days, and the Client must have supplied a working telephone number and not diverted, disabled, or otherwise prevented the Service from sending its messages. A refund under this clause is claimed by emailing {siteContacts.billing} within 14 days of the end of the first 30 day period.
                  A refund under this clause does not cancel the Service. The subscription continues month to month until the Client cancels under clause 4.1, and clause 2.4 applies in full to every month after the first.
                </p>
                <p>
                  2.5 No Professional Advice: The Service, including any AI-generated transcriptions, urgency summaries, or automated message content, does not constitute legal, financial, medical, or any other form of professional advice.
                </p>
                <p>
                  2.6 Support and Response: Current Automations provides support by email at {siteContacts.support} and by text at {siteContact.phoneDisplay} during regular Ontario business hours on business days.
                  Response within 1 to 2 business days. No guaranteed SLA or 24/7 support obligation under any plan.
                </p>
              </JobSheetLegalClause>

              <JobSheetLegalClause id="clause-03" code="03" title="Billing, Payment and Subscription Terms">
                <p>
                  3.1 Recurring Billing: All plans are billed monthly in CAD. Billing begins on the date of checkout and renews automatically each month.
                </p>
                <p>
                  3.2 Payment Processing: Payments processed securely through Stripe. Current Automations does not store credit card information.
                  In the event a payment fails, service may be suspended if not resolved within 7 days.
                </p>
                <p>
                  3.3 Price Changes: Existing subscribers receive a minimum of 30 days written notice of any price increase.
                </p>
                <p>
                  3.4 Taxes: Fees are exclusive of applicable taxes. HST and other applicable Canadian taxes will be added where required by law.
                </p>
                <p>
                  3.5 Promotional Pricing and Trial Periods: Promotional rates apply only for the period stated at the time of offer.
                  At conclusion of any trial period, billing commences at the standard plan rate.
                </p>
                <p>
                  3.6 AI Call Minutes: Plans that include AI voice handling (Retell AI Outbound Call and Inbound AI Call Handling, whether purchased in the Elite tier or a la carte)
                  include a pooled allowance of AI call minutes per billing month, shared across the Client&apos;s account regardless of how many AI voice scenarios are active.
                  The allowance is 450 minutes on any plan carrying AI voice, whether purchased a la carte or as part of the Elite tier, and 1,150 minutes where Receptionist Mode is active (clause 3.7).
                  Current Automations holds and pays for the underlying AI voice platform account; the Client is not
                  required to open or pay for a separate account with any voice provider.
                  Usage above the allowance is billed in arrears at $0.45 CAD per minute, on the next monthly invoice.
                  Unused minutes do not carry over between billing months. Minutes are measured by the underlying voice platform&apos;s connected-call duration, and those records are the
                  reference used to calculate any overage. Current Automations will notify the Client by email before invoicing any overage above $50 CAD in a single month, and may
                  adjust the allowance or per-minute rate on the same 30 days written notice required for price changes under clause 3.3.
                </p>
                <p>
                  3.7 Receptionist Mode: Receptionist Mode is an optional add-on billed at $250 CAD per month on top of the Client&apos;s existing plan. It requires at least one active AI voice scenario and cannot be purchased on its own.
                  While active, it raises the pooled AI call minute allowance under clause 3.6 to 1,150 minutes per billing month, and includes System Anomaly Alert monitoring at no additional charge. A Client already paying for System Anomaly Alert separately should contact {siteContacts.billing} to have that charge removed.
                  Receptionist Mode includes call failover: where the AI voice agent fails to answer within the configured timeout, the call is forwarded to a telephone number nominated by the Client at onboarding. The Client is responsible for providing and maintaining a working failover number, and for notifying Current Automations of any change to it.
                  Receptionist Mode does not alter clause 2.3. Current Automations does not guarantee that the AI voice agent will answer, understand, or correctly handle every call, and the Client remains responsible for its own call handling obligations.
                </p>
              </JobSheetLegalClause>

              <JobSheetLegalClause id="clause-04" code="04" title="Cancellation and Refund Policy">
                <p>
                  4.1 Cancellation by Client: Cancel anytime by emailing {siteContacts.billing} or texting {siteContact.phoneDisplay}.
                  Cancellation requests must be received at least 5 business days before the next billing date.
                </p>
                <p>
                  4.2 No Refunds on Monthly Fees: All monthly subscription fees are non-refundable once charged, except as provided in clause 4.3. No pro-rated refunds for partial months.
                </p>
                <p>
                  4.3 Refund Exceptions: Refunds considered only if the Service was never activated due to a verified error on our part, or if a billing error resulted in a duplicate or incorrect charge.
                  Requests must be submitted within 7 days.
                  In addition, where the First Month Reply Guarantee has been expressly offered to the Client in writing, the Client&apos;s first monthly subscription fee is refundable on the terms and within the deadline set out in clause 2.4.1. That clause governs the guarantee in full, including what counts as a reply, what is excluded, and the conditions that apply.
                </p>
                <p>
                  4.4 Cancellation by Current Automations: We reserve the right to suspend or terminate accounts for non-payment after a 7-day grace period, breach of these Terms, violation of applicable law including CASL or PIPEDA, misuse spam harassment or fraud, or abusive behaviour toward staff.
                  No refund issued for termination for cause.
                </p>
                <p>
                  4.5 Offboarding and Number Return: Upon cancellation we will initiate the return port of the Client&apos;s number within 5 business days of a written request.
                  The number will continue to function on the Twilio platform at no charge for up to 14 days.
                  After 14 days, if the return port has not completed due to delay on the Client&apos;s part, a holding fee may apply.
                </p>
              </JobSheetLegalClause>

              <JobSheetLegalClause id="clause-05" code="05" title="Acceptable Use">
                <p>
                  The Client will not use the Service to send fraudulent deceptive misleading or false messages, threatening harassing abusive or discriminatory content, unlawful debt collection communications, unsolicited commercial electronic messages to anyone without valid CASL consent, content violating carrier acceptable use policies, or any communication prohibited under applicable law.
                  Violation may result in immediate termination without refund and without prior notice.
                </p>
              </JobSheetLegalClause>

              <JobSheetLegalClause id="clause-06" code="06" title="Client Obligations">
                <ul className="space-y-3 pl-6">
                  <li className="list-disc">Provide accurate and complete information.</li>
                  <li className="list-disc">Maintain a valid payment method.</li>
                  <li className="list-disc">Collect record and maintain valid CASL consent for all recipients.</li>
                  <li className="list-disc">Provide and honour opt-out mechanisms as required by CASL.</li>
                  <li className="list-disc">Take full responsibility for message template content.</li>
                  <li className="list-disc">Notify us promptly of any changes to phone carrier or account details.</li>
                  <li className="list-disc">Cooperate during setup troubleshooting and offboarding.</li>
                  <li className="list-disc">Not attempt to reverse-engineer replicate or resell any component of the Service.</li>
                  <li className="list-disc">Monitor own call activity and not rely solely on the Service as the only method of lead management.</li>
                </ul>
              </JobSheetLegalClause>

              <JobSheetLegalClause id="clause-07" code="07" title="Limitation of Liability">
                <p>
                  7.1 Maximum Liability: Total liability shall not exceed the fees paid in the 30 days before the event giving rise to the claim.
                </p>
                <p>
                  7.2 Exclusion of Consequential Damages: In no event shall Current Automations be liable for loss of revenue, profits, business, data, goodwill, missed calls, lost leads, or failure to convert customers.
                </p>
                <p>
                  7.3 Third-Party Platform Failures: Not liable for disruptions caused by Twilio, Make, OpenAI, Google, Google Calendar, or any other provider.
                  We will make commercially reasonable efforts to notify affected Clients of known outages and restore functionality promptly.
                </p>
                <p>
                  7.4 Carrier and Porting Liability: Not liable for carrier actions, porting rejections, early termination fees, or other carrier-imposed charges.
                </p>
              </JobSheetLegalClause>

              <JobSheetLegalClause id="clause-08" code="08" title="Intellectual Property">
                <p>
                  All automation systems, workflows, scenario configurations, prompt engineering, and system architectures remain the intellectual property of Current Automations.
                  The Client is granted a non-exclusive non-transferable licence for the duration of their active subscription only.
                </p>
              </JobSheetLegalClause>

              <JobSheetLegalClause id="clause-09" code="09" title="Privacy, Data and Security">
                <p>
                  9.1 Data Collection: Business information, caller data, voicemail recordings, and SMS logs are collected to deliver the Service.
                  Stored using Google Sheets and authorized third-party platforms. We do not sell Client or caller data.
                </p>
                <p>
                  9.2 Role of Parties Under PIPEDA: The Client is the organization responsible for personal communications under PIPEDA.
                  Current Automations acts as a service provider.
                </p>
                <p>
                  9.3 Security Safeguards: Reasonable administrative technical and organizational safeguards are implemented including access controls, encrypted platform connections, and limiting data access to authorized personnel.
                </p>
                <p>
                  9.4 Data Breach Notification: In the event of a confirmed security incident we will notify affected Clients within a reasonable timeframe and cooperate in good faith.
                </p>
                <p>
                  9.5 Client Responsibility: The Client is responsible for ensuring use of the Service complies with PIPEDA, CASL, and all applicable privacy legislation.
                </p>
                <p>
                  9.6 Data Retention and Deletion: Records retained for 12 months from capture or subscription duration whichever is longer.
                  Upon written request following cancellation data will be deleted or returned within 30 days.
                  Deletion applies to active systems. Residual backup copies will not be used and will age out under normal rotation cycles.
                </p>
              </JobSheetLegalClause>

              <JobSheetLegalClause id="clause-10" code="10" title="Dispute Resolution">
                <p>
                  10.1 Good Faith Resolution: Contact {siteContacts.general} and allow 14 business days for resolution before pursuing any other remedy.
                </p>
                <p>
                  10.2 Governing Law: Governed by the laws of the Province of Ontario and federal laws of Canada.
                  Disputes subject to the exclusive jurisdiction of Ontario courts.
                </p>
                <p>
                  10.3 Chargeback Policy: Do not initiate a chargeback without first contacting us and allowing 14 business days.
                  Initiating a chargeback without this step is a breach of these Terms.
                  If a chargeback is resolved in our favour the Client is responsible for any chargeback processing fees we incur.
                </p>
              </JobSheetLegalClause>

              <JobSheetLegalClause id="clause-11" code="11" title="Amendments">
                <p>
                  Material changes communicated to active subscribers via email at least 30 days before taking effect.
                  Current version always available at currentautomations.ca/terms.
                </p>
              </JobSheetLegalClause>

              <JobSheetLegalClause id="clause-12" code="12" title="Entire Agreement">
                <p>
                  These Terms together with the Client Authorization document and any signed Letter of Authorization constitute the entire agreement.
                  Electronic acceptance at checkout constitutes a valid and binding signature.
                </p>
              </JobSheetLegalClause>

              <JobSheetLegalClause id="clause-END" code="END" title="Questions">
                <p>Questions? Contact {siteContacts.general} or {siteContact.phoneDisplay}.</p>
              </JobSheetLegalClause>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
