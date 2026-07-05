import styles from "./jobsheet.module.css";

type FormTabProps = {
  code: string;
  label: string;
  onDark?: boolean;
};

/**
 * Manila-folder tab used as the section identifier: a form/document code,
 * the way real dispatch paperwork is filed, not a narrative step number.
 */
export default function FormTab({ code, label, onDark = false }: FormTabProps) {
  return (
    <div className={`${styles.formTab} ${onDark ? styles.formTabOnDark : ""}`}>
      <span className={`${styles.mono} ${styles.formTabCode}`}>{code}</span>
      <span className={styles.formTabLabel}>{label}</span>
    </div>
  );
}
