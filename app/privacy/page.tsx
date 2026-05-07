import Link from "next/link";
import type { Metadata } from "next";
import Section from "@/components/Section";

export const metadata: Metadata = {
  title: {
    default: "Privacy Policy — Current Automations",
    template: "%s",
  },
  description:
    "Privacy Policy for Current Automations covering how we collect, use, and protect personal information in compliance with PIPEDA and CASL.",
};

export default function PrivacyPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-white/10 bg-[linear-gradient(145deg,#07111d_0%,#0d1b30_58%,#16334e_100%)] pb-18 pt-24 sm:pb-20 sm:pt-32">
        <div className="absolute inset-x-0 top-0 h-56 bg-[radial-gradient(circle_at_top_left,_rgba(79,208,173,0.16),_transparent_42%)]" />
        <div className="container-shell">
          <div>
            <Link
              href="/"
              className="text-sm font-medium text-[var(--color-brand)] transition-colors hover:text-white"
            >
              ← Back to home
            </Link>
          </div>
          <p className="pill-label bg-white/[0.08] text-white/70">Legal</p>
          <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Privacy Policy
          </h1>
          <p className="mt-6 max-w-4xl text-base leading-8 text-white/[0.68] sm:text-lg">
            EFFECTIVE DATE: May 7, 2025 | VERSION: 1.0 | JURISDICTION: Province of Ontario,
            Canada | GOVERNING LAW: PIPEDA, CASL, Ontario privacy legislation | CONTACT:
            admin@currentautomations.ca | +1 365 601 7474
          </p>
        </div>
      </section>

      <Section tone="muted">
        <div className="surface-card max-w-5xl rounded-[2rem] p-8 sm:p-10">
          <div className="space-y-10 text-base leading-8 text-[var(--color-muted)]">

            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-[var(--color-ink)]">
                1. Who We Are
              </h2>
              <p className="mt-3 text-[var(--color-copy)]">
                Current Automations is a Canadian automation agency based in Ontario, Canada. We
                provide AI-powered communications automation systems for small and medium-sized
                service businesses, including missed call recovery, voicemail transcription, SMS
                follow-up, and call routing. Our website is located at currentautomations.ca.
              </p>
              <p className="mt-3 text-[var(--color-copy)]">
                For the purposes of this Privacy Policy, Current Automations is the organization
                responsible for the personal information we collect and process in connection with
                our website and services. We can be reached at admin@currentautomations.ca or
                +1 365 601 7474.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-[var(--color-ink)]">
                2. Scope of This Policy
              </h2>
              <p className="mt-3 text-[var(--color-copy)]">
                This Privacy Policy applies to: visitors to our website at currentautomations.ca;
                individuals who contact us by email, phone, or text for inquiries; clients who
                subscribe to any of our service plans; callers whose information is processed
                through the automation systems we operate on behalf of our clients.
              </p>
              <p className="mt-3 text-[var(--color-copy)]">
                It does not apply to the personal information practices of third-party platforms we
                use to deliver our services, such as Twilio, Make, OpenAI, Google, Stripe, or
                Calendly. Each of those providers operates under its own privacy policy.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-[var(--color-ink)]">
                3. Information We Collect
              </h2>
              <p className="mt-3 text-[var(--color-copy)]">
                3.1 Information You Provide Directly — When you contact us or subscribe to our
                services, we collect:
              </p>
              <ul className="mt-3 space-y-3 pl-6 text-[var(--color-copy)]">
                <li className="list-disc">Full name and business name.</li>
                <li className="list-disc">Email address and phone number.</li>
                <li className="list-disc">Business address and postal code.</li>
                <li className="list-disc">
                  Telecommunications carrier account details provided for number porting including
                  account number, billing name, and account PIN where applicable.
                </li>
                <li className="list-disc">
                  Payment information processed by Stripe — we do not store credit card numbers or
                  banking information directly.
                </li>
                <li className="list-disc">
                  Any other information you choose to provide in intake forms, email correspondence,
                  or text messages.
                </li>
              </ul>
              <p className="mt-5 text-[var(--color-copy)]">
                3.2 Information Collected Through Service Delivery — When we operate automation
                systems on behalf of a client, the following information about callers may be
                collected and processed:
              </p>
              <ul className="mt-3 space-y-3 pl-6 text-[var(--color-copy)]">
                <li className="list-disc">Caller phone numbers.</li>
                <li className="list-disc">Voicemail audio recordings.</li>
                <li className="list-disc">Voicemail transcriptions generated by AI.</li>
                <li className="list-disc">Call timestamps and duration.</li>
                <li className="list-disc">AI-generated urgency tags and call summaries.</li>
                <li className="list-disc">SMS message content sent and received through the system.</li>
              </ul>
              <p className="mt-5 text-[var(--color-copy)]">
                This caller data is collected on behalf of the client whose business number is
                configured in the system. The client is the organization responsible for those
                communications under applicable Canadian privacy legislation. Current Automations
                processes this data as a service provider acting on the client's behalf.
              </p>
              <p className="mt-5 text-[var(--color-copy)]">
                3.3 Information Collected Automatically — When you visit our website, we may collect
                certain technical information automatically including:
              </p>
              <ul className="mt-3 space-y-3 pl-6 text-[var(--color-copy)]">
                <li className="list-disc">IP address and general geographic location.</li>
                <li className="list-disc">Browser type and version.</li>
                <li className="list-disc">Pages visited and time spent on pages.</li>
                <li className="list-disc">Referring website or source.</li>
              </ul>
              <p className="mt-5 text-[var(--color-copy)]">
                This information is collected through standard web analytics tools for the purpose of
                understanding how our website is used and improving its content. We do not use this
                information to identify individual visitors.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-[var(--color-ink)]">
                4. How We Use Your Information
              </h2>
              <p className="mt-3 text-[var(--color-copy)]">
                4.1 Service Delivery — to set up, configure, and operate automation systems on
                behalf of clients; to process number porting requests with telecommunications
                carriers; to send automated SMS messages, voicemail transcripts, and urgency alerts
                as part of the service; to provide client support and resolve technical issues.
              </p>
              <p className="mt-5 text-[var(--color-copy)]">
                4.2 Billing and Account Management — to process subscription payments through
                Stripe; to manage subscription renewals, cancellations, and refund requests; to
                communicate about billing, invoicing, and account changes.
              </p>
              <p className="mt-5 text-[var(--color-copy)]">
                4.3 Communications — to respond to inquiries submitted by email, phone, or text; to
                send service-related notifications and updates; to send commercial electronic
                messages where you have provided valid consent under CASL.
              </p>
              <p className="mt-5 text-[var(--color-copy)]">
                4.4 Improvement and Analysis — to analyze website usage and improve our content and
                user experience; to evaluate the performance and reliability of our automation
                systems.
              </p>
              <p className="mt-5 text-[var(--color-copy)]">
                We do not use your personal information for any purpose not described in this policy
                without your knowledge and consent.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-[var(--color-ink)]">
                5. Legal Basis for Processing
              </h2>
              <p className="mt-3 text-[var(--color-copy)]">
                Current Automations operates in Canada and is subject to PIPEDA and applicable
                provincial privacy legislation in Ontario. We collect and use personal information
                only where we have a valid basis to do so, including:
              </p>
              <ul className="mt-3 space-y-3 pl-6 text-[var(--color-copy)]">
                <li className="list-disc">
                  Your express consent provided at the time of subscription or contact.
                </li>
                <li className="list-disc">
                  The necessity of processing to fulfill a contract with you such as delivering the
                  services you have subscribed to.
                </li>
                <li className="list-disc">
                  Our legitimate business interests where those interests do not override your
                  privacy rights.
                </li>
                <li className="list-disc">Compliance with a legal obligation.</li>
              </ul>
              <p className="mt-5 text-[var(--color-copy)]">
                Where we rely on consent, you have the right to withdraw it at any time. Withdrawal
                of consent may affect our ability to deliver certain services.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-[var(--color-ink)]">
                6. Commercial Electronic Messages and CASL
              </h2>
              <p className="mt-3 text-[var(--color-copy)]">
                Current Automations complies with Canada's Anti-Spam Legislation (CASL). We will
                only send commercial electronic messages to individuals who have provided express or
                implied consent. Every commercial message we send will include a clear and easy way
                to unsubscribe. We will honour all unsubscribe requests within 10 business days.
              </p>
              <p className="mt-5 text-[var(--color-copy)]">
                Where Current Automations operates automated SMS systems on behalf of clients, the
                client is the sender of those commercial electronic messages under CASL. The client
                is responsible for collecting and maintaining valid consent from their own customers.
                Current Automations does not independently verify or audit client contact lists for
                CASL compliance.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-[var(--color-ink)]">
                7. How We Share Your Information
              </h2>
              <p className="mt-3 text-[var(--color-copy)]">
                We do not sell, rent, or trade personal information.
              </p>
              <p className="mt-5 text-[var(--color-copy)]">
                7.1 Service Providers — we share information with third-party platforms necessary to
                deliver our services including:
              </p>
              <ul className="mt-3 space-y-3 pl-6 text-[var(--color-copy)]">
                <li className="list-disc">Twilio for telephony, call routing, and SMS delivery.</li>
                <li className="list-disc">Make for workflow automation.</li>
                <li className="list-disc">OpenAI for voicemail transcription and AI analysis.</li>
                <li className="list-disc">
                  Google for data storage via Google Sheets and Google Workspace.
                </li>
                <li className="list-disc">Stripe for payment processing.</li>
                <li className="list-disc">
                  Calendly or equivalent booking tools for appointment scheduling.
                </li>
                <li className="list-disc">
                  Docuseal or equivalent e-signature platforms for document execution.
                </li>
              </ul>
              <p className="mt-5 text-[var(--color-copy)]">
                Each of these providers has its own privacy policy. We use these providers under
                terms that require them to protect personal information and use it only for the
                purpose of delivering services to us.
              </p>
              <p className="mt-5 text-[var(--color-copy)]">
                7.2 Legal Requirements — we may disclose personal information if required to do so
                by law, court order, or government authority, or where we believe disclosure is
                necessary to protect the safety of any individual or to prevent fraud or illegal
                activity.
              </p>
              <p className="mt-5 text-[var(--color-copy)]">
                7.3 Business Transfers — in the event of a sale, merger, or transfer of all or part
                of our business, personal information may be transferred to the acquiring party. We
                will notify affected individuals before their information becomes subject to a
                different privacy policy.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-[var(--color-ink)]">
                8. Data Retention
              </h2>
              <p className="mt-3 text-[var(--color-copy)]">
                We retain personal information only for as long as necessary to fulfill the purposes
                for which it was collected or as required by law.
              </p>
              <p className="mt-5 text-[var(--color-copy)]">
                Client account information is retained for the duration of the active subscription
                and for a reasonable period afterward for legal and administrative purposes.
              </p>
              <p className="mt-5 text-[var(--color-copy)]">
                Call logs, voicemail transcripts, and SMS records are retained for 12 months from
                the date of capture or for the duration of the active subscription, whichever is
                longer.
              </p>
              <p className="mt-5 text-[var(--color-copy)]">
                Payment records are retained as required by applicable tax and accounting
                regulations.
              </p>
              <p className="mt-5 text-[var(--color-copy)]">
                Inquiry and correspondence records are retained for up to 2 years from the date of
                last contact.
              </p>
              <p className="mt-5 text-[var(--color-copy)]">
                Upon cancellation of service, clients may request deletion or return of their data
                within 30 days of their written request. Deletion applies to active systems and
                databases. Residual copies in backup systems will not be used for any purpose and
                will age out under our normal backup rotation cycles.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-[var(--color-ink)]">
                9. Security
              </h2>
              <p className="mt-3 text-[var(--color-copy)]">
                Current Automations implements reasonable administrative, technical, and
                organizational safeguards to protect personal information from unauthorized access,
                disclosure, loss, or destruction. These measures include:
              </p>
              <ul className="mt-3 space-y-3 pl-6 text-[var(--color-copy)]">
                <li className="list-disc">
                  Encrypted data transmission between platforms using TLS.
                </li>
                <li className="list-disc">
                  Access controls limiting data access to authorized personnel only.
                </li>
                <li className="list-disc">
                  Use of reputable third-party platforms with their own security certifications.
                </li>
                <li className="list-disc">
                  Regular review of access permissions and account credentials.
                </li>
              </ul>
              <p className="mt-5 text-[var(--color-copy)]">
                No method of transmission or storage is completely secure. In the event of a
                confirmed security incident affecting personal information we hold, we will notify
                affected individuals within a reasonable timeframe and cooperate in good faith to
                assess and address the incident.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-[var(--color-ink)]">
                10. Your Rights Under PIPEDA
              </h2>
              <p className="mt-3 text-[var(--color-copy)]">
                10.1 Right of Access — you have the right to request access to the personal
                information we hold about you. We will respond to access requests within 30 days.
                We may request proof of identity before fulfilling an access request.
              </p>
              <p className="mt-5 text-[var(--color-copy)]">
                10.2 Right to Correction — if you believe personal information we hold about you is
                inaccurate or incomplete, you have the right to request a correction. We will make
                corrections promptly and notify any third parties to whom the incorrect information
                was disclosed where appropriate.
              </p>
              <p className="mt-5 text-[var(--color-copy)]">
                10.3 Right to Withdraw Consent — you may withdraw your consent to the collection,
                use, or disclosure of your personal information at any time, subject to legal or
                contractual restrictions and reasonable notice. Withdrawal may affect our ability to
                provide services to you.
              </p>
              <p className="mt-5 text-[var(--color-copy)]">
                10.4 Right to Complain — if you believe your privacy rights have been violated, you
                may file a complaint with the Office of the Privacy Commissioner of Canada at
                priv.gc.ca or by calling 1-800-282-1376.
              </p>
              <p className="mt-5 text-[var(--color-copy)]">
                To exercise any of these rights, contact us at admin@currentautomations.ca with the
                subject line Privacy Request. We will acknowledge your request within 5 business
                days.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-[var(--color-ink)]">
                11. Cookies and Website Tracking
              </h2>
              <p className="mt-3 text-[var(--color-copy)]">
                Our website may use cookies and similar tracking technologies to improve your
                browsing experience and analyze site traffic. We may use strictly necessary cookies
                required for the website to function correctly, and analytics cookies that help us
                understand how visitors interact with our website using aggregate data only and not
                to identify individuals.
              </p>
              <p className="mt-5 text-[var(--color-copy)]">
                You can control or disable cookies through your browser settings. We do not use
                cookies for advertising or cross-site tracking purposes.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-[var(--color-ink)]">
                12. Third-Party Links
              </h2>
              <p className="mt-3 text-[var(--color-copy)]">
                Our website may contain links to third-party websites. This Privacy Policy does not
                apply to those websites. We encourage you to review the privacy policies of any
                third-party sites you visit. Current Automations is not responsible for the privacy
                practices of third-party websites.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-[var(--color-ink)]">
                13. Children&apos;s Privacy
              </h2>
              <p className="mt-3 text-[var(--color-copy)]">
                Our services are designed for business owners and operators and are not directed at
                individuals under the age of 18. We do not knowingly collect personal information
                from minors. If you believe we have inadvertently collected information from a minor,
                contact us immediately at admin@currentautomations.ca and we will delete it
                promptly.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-[var(--color-ink)]">
                14. Changes to This Policy
              </h2>
              <p className="mt-3 text-[var(--color-copy)]">
                Current Automations may update this Privacy Policy from time to time. Material
                changes will be communicated to active clients by email at least 14 days before
                taking effect. The updated policy will be posted at currentautomations.ca/privacy
                with the effective date noted. Continued use of our website or services after the
                effective date of any update constitutes acceptance of the revised policy.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-[var(--color-ink)]">
                15. Contact Us
              </h2>
              <p className="mt-3 text-[var(--color-copy)]">
                For any questions, concerns, or requests regarding this Privacy Policy or our
                privacy practices, contact us at admin@currentautomations.ca or +1 365 601 7474 or
                at currentautomations.ca. We will respond to all privacy inquiries within 5 business
                days. If you are not satisfied with our response, you have the right to contact the
                Office of the Privacy Commissioner of Canada at priv.gc.ca or 1-800-282-1376.
              </p>
            </div>

          </div>
        </div>
      </Section>
    </>
  );
}
