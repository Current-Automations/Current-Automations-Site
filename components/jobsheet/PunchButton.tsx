import Link from "next/link";
import styles from "./jobsheet.module.css";

type PunchButtonProps = {
  href: string;
  label: string;
  variant?: "solid" | "ghost";
  onDark?: boolean;
  external?: boolean;
  className?: string;
};

/**
 * In-page CTA styled like a work-order approval punch, distinct from the
 * sitewide navbar/footer pill button (which stays untouched).
 */
export default function PunchButton({
  href,
  label,
  variant = "solid",
  onDark = false,
  external,
  className = "",
}: PunchButtonProps) {
  // Derived rather than defaulted to false, so a button pointed at an internal
  // route stops opening a new tab on its own. Booking moved from a Google URL
  // to /book-a-demo across ~16 call sites; deriving meant the tab behaviour
  // could not be left wrong on the ones nobody remembered to update.
  const opensNewTab = external ?? /^https?:\/\//.test(href);
  const classes = [
    styles.punchButton,
    variant === "ghost" ? styles.punchButtonGhost : "",
    onDark && variant === "solid" ? styles.punchButtonOnDark : "",
    onDark && variant === "ghost" ? styles.punchButtonGhostOnDark : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Link
      href={href}
      className={classes}
      {...(opensNewTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {label}
    </Link>
  );
}
