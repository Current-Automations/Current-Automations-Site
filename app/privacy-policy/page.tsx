import type { Metadata } from "next";
import { jobsheetFonts } from "@/components/jobsheet/fonts";
import jobsheet from "@/components/jobsheet/jobsheet.module.css";
import JobSheetPageHero from "@/components/jobsheet/JobSheetPageHero";
import JobSheetLegalClause from "@/components/jobsheet/JobSheetLegalClause";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy policy for Current Automations. Learn how we handle information received through this website.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className={jobsheetFonts}>
      <JobSheetPageHero
        docLabel="LEGAL FILE"
        docCode="FORM PP-01"
        kicker="Legal"
        title="Privacy Policy"
        description="This policy describes how Current Automations handles information received through this website."
      />

      <section className={`${jobsheet.root} ${jobsheet.paperTexture} relative py-16 sm:py-20`}>
        <div className="container-shell relative">
          <div className={`${jobsheet.ticket} max-w-4xl overflow-hidden p-0`}>
            <JobSheetLegalClause code="01" title="Information We Receive">
              <p>
                If you contact Current Automations through email or a demo
                request, we may receive details such as your name, business
                name, phone number, email address, and any information you
                choose to share.
              </p>
            </JobSheetLegalClause>

            <JobSheetLegalClause code="02" title="How Information Is Used">
              <p>
                Information you share is used to respond to inquiries, provide
                demos, improve the website, and communicate about services that
                may be relevant to your business.
              </p>
            </JobSheetLegalClause>

            <JobSheetLegalClause code="03" title="Contact">
              <p>
                For privacy-related questions, contact{" "}
                <a
                  href="mailto:admin@currentautomations.ca"
                  className="font-medium text-[var(--color-brand-strong)] hover:underline"
                >
                  admin@currentautomations.ca
                </a>
                .
              </p>
            </JobSheetLegalClause>
          </div>
        </div>
      </section>
    </div>
  );
}
