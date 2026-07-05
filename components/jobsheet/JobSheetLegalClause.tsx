import type { ReactNode } from "react";
import styles from "./jobsheet.module.css";

type JobSheetLegalClauseProps = {
  code: string;
  title: string;
  children: ReactNode;
};

/**
 * A single filed clause in a legal document: a dashed-divided row with a
 * mono clause code, used for Privacy/Terms so the legal copy reads as
 * paperwork on file rather than a generic prose block. Presentation only —
 * never alters the clause text itself.
 */
export default function JobSheetLegalClause({ code, title, children }: JobSheetLegalClauseProps) {
  return (
    <div className="border-b-2 border-dashed border-[rgba(28,36,48,0.18)] px-6 py-8 last:border-b-0 sm:px-9">
      <div className="mb-4 flex items-baseline gap-3">
        <span className={`${styles.mono} shrink-0 text-xs font-semibold text-[#a8452f]`}>{code}</span>
        <h2 className="text-xl font-semibold tracking-tight text-[#181510] sm:text-2xl">{title}</h2>
      </div>
      <div className="space-y-4 text-base leading-8 text-[#3a352c]">{children}</div>
    </div>
  );
}
