"use client";

import { useEffect, useRef, useState } from "react";
import jobsheet from "@/components/jobsheet/jobsheet.module.css";

type Fields = {
  name: string;
  email: string;
  business: string;
  phone: string;
  message: string;
};

const EMPTY: Fields = { name: "", email: "", business: "", phone: "", message: "" };
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Mirrors the server rules in app/api/contact/route.ts. The client copy exists to
// give an answer without a round trip; the server copy is the one that counts.
function validate(fields: Fields): Partial<Record<keyof Fields, string>> {
  const errors: Partial<Record<keyof Fields, string>> = {};
  if (!fields.name.trim()) errors.name = "Tell us who you are.";
  if (!fields.email.trim()) errors.email = "We need an email to reply to.";
  else if (!EMAIL.test(fields.email.trim()))
    errors.email = "That does not look like a valid email address.";
  if (!fields.message.trim()) errors.message = "Tell us what you need.";
  else if (fields.message.trim().length < 10) errors.message = "A little more detail, please.";
  return errors;
}

const inputClass =
  "w-full rounded border border-[rgba(28,36,48,0.24)] bg-white/70 px-4 py-3 text-base text-[#181510] placeholder:text-[#6f6858] focus:border-[var(--color-brand-strong)]";

const labelClass = `${jobsheet.mono} block text-xs font-semibold uppercase tracking-[0.16em] text-[#58524a]`;

export default function ContactForm({ fallbackEmail }: { fallbackEmail: string }) {
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof Fields, boolean>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [formError, setFormError] = useState<string | null>(null);

  // Set on mount rather than on first render so it measures how long the visitor
  // actually had the form open. The server rejects anything filled inhumanly fast.
  const renderedAt = useRef(0);
  useEffect(() => {
    renderedAt.current = Date.now();
  }, []);

  const honeypot = useRef<HTMLInputElement>(null);

  function update(key: keyof Fields, value: string) {
    const next = { ...fields, [key]: value };
    setFields(next);
    if (touched[key]) setErrors(validate(next));
  }

  function blur(key: keyof Fields) {
    setTouched((prev) => ({ ...prev, [key]: true }));
    setErrors(validate(fields));
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);

    const found = validate(fields);
    setErrors(found);
    setTouched({ name: true, email: true, business: true, phone: true, message: true });
    if (Object.keys(found).length > 0) {
      document.getElementById(`contact-${Object.keys(found)[0]}`)?.focus();
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...fields,
          companyWebsite: honeypot.current?.value ?? "",
          renderedAt: renderedAt.current,
        }),
      });
      const data = (await res.json()) as {
        ok?: boolean;
        error?: string;
        fieldErrors?: Partial<Record<keyof Fields, string>>;
      };

      if (!res.ok) {
        if (data.fieldErrors) setErrors(data.fieldErrors);
        setFormError(data.error ?? `Something went wrong. Please email ${fallbackEmail}.`);
        setStatus("idle");
        return;
      }

      setStatus("sent");
      setFields(EMPTY);
      setTouched({});
    } catch {
      setFormError(`We could not reach the server. Please email ${fallbackEmail} instead.`);
      setStatus("idle");
    }
  }

  if (status === "sent") {
    return (
      <div className={`${jobsheet.ticket} p-8`} role="status">
        <p className={`${jobsheet.mono} text-xs uppercase tracking-[0.18em] text-[var(--color-brand-strong)]`}>
          Filed
        </p>
        <h3 className={`${jobsheet.display} mt-3 text-[clamp(1.5rem,3vw,2.1rem)] text-[#181510]`}>
          Message received.
        </h3>
        <p className="mt-4 text-base leading-8 text-[#3a352c]">
          It landed in the General inbox and most enquiries get a reply within 1 business day.
          If it is urgent, call the number above and skip the queue.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-semibold text-[var(--color-brand-strong)] underline underline-offset-4"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className={`${jobsheet.ticket} relative p-6 sm:p-8`}>
      <div
        aria-hidden="true"
        className="absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden"
      >
        <label htmlFor="contact-company-website">Do not fill this in</label>
        <input
          ref={honeypot}
          id="contact-company-website"
          name="companyWebsite"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id="contact-name"
          label="Name"
          required
          value={fields.name}
          error={touched.name ? errors.name : undefined}
          onChange={(v) => update("name", v)}
          onBlur={() => blur("name")}
          autoComplete="name"
        />
        <Field
          id="contact-email"
          label="Email"
          type="email"
          required
          value={fields.email}
          error={touched.email ? errors.email : undefined}
          onChange={(v) => update("email", v)}
          onBlur={() => blur("email")}
          autoComplete="email"
        />
        <Field
          id="contact-business"
          label="Business"
          optional
          value={fields.business}
          error={touched.business ? errors.business : undefined}
          onChange={(v) => update("business", v)}
          onBlur={() => blur("business")}
          autoComplete="organization"
        />
        <Field
          id="contact-phone"
          label="Phone"
          type="tel"
          optional
          value={fields.phone}
          error={touched.phone ? errors.phone : undefined}
          onChange={(v) => update("phone", v)}
          onBlur={() => blur("phone")}
          autoComplete="tel"
        />
      </div>

      <div className="mt-5">
        <label htmlFor="contact-message" className={labelClass}>
          What do you need? <span className="text-[#a8452f]">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={6}
          required
          value={fields.message}
          onChange={(e) => update("message", e.target.value)}
          onBlur={() => blur("message")}
          aria-invalid={touched.message && Boolean(errors.message)}
          aria-describedby={touched.message && errors.message ? "contact-message-error" : undefined}
          placeholder="Where does the time go in your week? What keeps getting dropped?"
          className={`${inputClass} mt-2 resize-y`}
        />
        {touched.message && errors.message ? (
          <p id="contact-message-error" className="mt-2 text-sm font-medium text-[#a8452f]">
            {errors.message}
          </p>
        ) : null}
      </div>

      {formError ? (
        <p
          role="alert"
          className="mt-5 rounded border border-[rgba(168,69,47,0.35)] bg-[rgba(168,69,47,0.07)] px-4 py-3 text-sm font-medium text-[#8d3a26]"
        >
          {formError}
        </p>
      ) : null}

      <div className="mt-6 flex flex-wrap items-center gap-4 border-t-2 border-dashed border-[rgba(28,36,48,0.24)] pt-6">
        <button type="submit" disabled={status === "sending"} className={jobsheet.punchButton}>
          {status === "sending" ? "Sending..." : "Send Message"}
        </button>
        <p className="text-sm text-[#58524a]">
          Or email{" "}
          <a
            href={`mailto:${fallbackEmail}`}
            className="font-medium text-[var(--color-brand-strong)] hover:underline"
          >
            {fallbackEmail}
          </a>
          .
        </p>
      </div>
    </form>
  );
}

type FieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  error?: string;
  type?: string;
  required?: boolean;
  optional?: boolean;
  autoComplete?: string;
};

function Field({
  id,
  label,
  value,
  onChange,
  onBlur,
  error,
  type = "text",
  required,
  optional,
  autoComplete,
}: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label}{" "}
        {required ? (
          <span className="text-[#a8452f]">*</span>
        ) : optional ? (
          <span className="font-normal normal-case tracking-normal text-[#6f6858]">(optional)</span>
        ) : null}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        required={required}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`${inputClass} mt-2`}
      />
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-sm font-medium text-[#a8452f]">
          {error}
        </p>
      ) : null}
    </div>
  );
}
