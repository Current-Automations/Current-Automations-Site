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
  external = false,
  className = "",
}: PunchButtonProps) {
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
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {label}
    </Link>
  );
}
