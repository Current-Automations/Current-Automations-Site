import type { Metadata } from "next";
import { jobsheetFonts } from "@/components/jobsheet/fonts";
import jobsheet from "@/components/jobsheet/jobsheet.module.css";
import JobSheetPageHero from "@/components/jobsheet/JobSheetPageHero";
import JobSheetLegalClause from "@/components/jobsheet/JobSheetLegalClause";
import { siteContact } from "@/data/siteContent";

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
        kicker="Short version"
        title="Privacy Policy"
        description="This is the short-form policy covering the website itself. This describes how Current Automations handles information received through currentautomations.ca."
      />

      <section className={`${jobsheet.root} ${jobsheet.paperTexture} relative py-16 sm:py-20`}>
        <div className="container-shell relative">
          <div className={`${jobsheet.ticket} max-w-3xl overflow-hidden p-0`}>
            <div className="flex items-center justify-between border-b-2 border-dashed border-[rgba(28,36,48,0.24)] bg-[rgba(28,36,48,0.03)] px-6 py-3 sm:px-9">
              <span className={`${jobsheet.mono} text-xs tracking-[0.18em] text-[#58524a]`}>
                3 CLAUSES ON FILE
              </span>
              <span className={`${jobsheet.mono} text-xs tracking-[0.18em] text-[#58524a]`}>
                FORM PP-01
              </span>
            </div>

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
                  href={`mailto:${siteContact.email}`}
                  className="font-medium text-[var(--color-brand-strong)] hover:underline"
                >
                  {siteContact.email}
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
