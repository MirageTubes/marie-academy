"use client";

import { useActionState, useState, type ReactNode } from "react";
import { submitCampRegistration, submitContact, subscribe, type FormState } from "@/app/actions";
import type { CampSession } from "@/content/camp";
import { buttonClass } from "./ui";

const initial: FormState = { status: "idle", message: "" };

const inputClass =
  "w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-base text-ink placeholder:text-muted/60 focus:border-ink focus:outline-none aria-[invalid=true]:border-red-600";

function Field({
  label,
  name,
  error,
  children,
  className = "",
}: {
  label: string;
  name: string;
  error?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={name} className="mb-2 block text-sm font-semibold">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${name}-error`} className="mt-1.5 text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}

function fieldProps(state: FormState, name: string) {
  const error = state.errors?.[name];
  return {
    id: name,
    name,
    defaultValue: state.values?.[name],
    ...(error ? { "aria-invalid": true, "aria-describedby": `${name}-error` } : {}),
  };
}

function Honeypot() {
  return (
    <div aria-hidden className="absolute -left-[9999px]">
      <label>
        Company
        <input name="company" tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  );
}

function Status({ state }: { state: FormState }) {
  return (
    <p
      role="status"
      aria-live="polite"
      className={`text-sm ${state.status === "error" ? "text-red-700" : "text-emerald-800"} ${state.message ? "" : "sr-only"}`}
    >
      {state.message}
    </p>
  );
}

function SuccessPanel({ message }: { message: string }) {
  return (
    <div role="status" className="rounded-2xl border border-gold/40 bg-white p-8 text-center">
      <p className="font-display text-3xl">Thank you</p>
      <p className="mt-3 text-muted">{message}</p>
    </div>
  );
}

export function ContactForm() {
  const [state, action, pending] = useActionState(submitContact, initial);
  if (state.status === "success") return <SuccessPanel message={state.message} />;

  return (
    <form action={action} noValidate className="relative grid gap-5 sm:grid-cols-2">
      <Honeypot />
      <Field label="Your name" name="name" error={state.errors?.name}>
        <input autoComplete="name" className={inputClass} {...fieldProps(state, "name")} />
      </Field>
      <Field label="Email" name="email" error={state.errors?.email}>
        <input type="email" autoComplete="email" className={inputClass} {...fieldProps(state, "email")} />
      </Field>
      <Field label="Topic" name="topic" className="sm:col-span-2">
        <select className={inputClass} {...fieldProps(state, "topic")}>
          <option>General question</option>
          <option>Admissions & auditions</option>
          <option>Summer camp</option>
          <option>Tickets & events</option>
          <option>Giving & partnerships</option>
        </select>
      </Field>
      <Field label="Message" name="message" error={state.errors?.message} className="sm:col-span-2">
        <textarea rows={5} className={inputClass} {...fieldProps(state, "message")} />
      </Field>
      <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
        <button type="submit" disabled={pending} className={buttonClass("solid", "disabled:opacity-60")}>
          {pending ? "Sending…" : "Send message"}
        </button>
        <Status state={state} />
      </div>
    </form>
  );
}

export function CampRegistrationForm({ sessions }: { sessions: CampSession[] }) {
  const [state, action, pending] = useActionState(submitCampRegistration, initial);
  if (state.status === "success") return <SuccessPanel message={state.message} />;

  return (
    <form action={action} noValidate className="relative grid gap-5 sm:grid-cols-2">
      <Honeypot />
      <Field label="Parent / guardian name" name="parentName" error={state.errors?.parentName}>
        <input autoComplete="name" className={inputClass} {...fieldProps(state, "parentName")} />
      </Field>
      <Field label="Email" name="email" error={state.errors?.email}>
        <input type="email" autoComplete="email" className={inputClass} {...fieldProps(state, "email")} />
      </Field>
      <Field label="Phone (optional)" name="phone">
        <input {...fieldProps(state, "phone")} type="tel" autoComplete="tel" className={inputClass} />
      </Field>
      <Field label="Camper’s name" name="camperName" error={state.errors?.camperName}>
        <input className={inputClass} {...fieldProps(state, "camperName")} />
      </Field>
      <Field label="Camper’s age this summer" name="camperAge" error={state.errors?.camperAge}>
        <input type="number" min={4} max={18} inputMode="numeric" className={inputClass} {...fieldProps(state, "camperAge")} />
      </Field>
      <Field label="Session" name="session" error={state.errors?.session}>
        <select className={inputClass} {...fieldProps(state, "session")} defaultValue={state.values?.session ?? ""}>
          <option value="" disabled>
            Choose a session
          </option>
          {sessions.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name} · {s.dates} · ages {s.minAge} to {s.maxAge}
            </option>
          ))}
        </select>
      </Field>
      <Field label="Anything we should know? (optional)" name="notes" className="sm:col-span-2">
        <textarea {...fieldProps(state, "notes")} rows={3} placeholder="Allergies, experience level, scholarship interest…" className={inputClass} />
      </Field>
      <label className="flex items-center gap-3 text-sm sm:col-span-2">
        <input type="checkbox" name="extendedCare" defaultChecked={state.values?.extendedCare === "on"} className="h-5 w-5 accent-ink" />
        Add extended care until 17:30
      </label>
      <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
        <button type="submit" disabled={pending} className={buttonClass("solid", "disabled:opacity-60")}>
          {pending ? "Reserving…" : "Reserve a place"}
        </button>
        <Status state={state} />
      </div>
    </form>
  );
}

export function NewsletterForm() {
  const [state, action, pending] = useActionState(subscribe, initial);
  const [email, setEmail] = useState("");

  return (
    <form action={action} noValidate className="w-full max-w-md">
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <div className="flex rounded-full border border-white/25 bg-white/5 p-1.5 focus-within:border-gold">
        <input
          id="newsletter-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="min-w-0 flex-1 bg-transparent px-4 text-white placeholder:text-white/50 focus:outline-none"
          {...(state.errors?.email ? { "aria-invalid": true } : {})}
        />
        <button type="submit" disabled={pending} className={buttonClass("gold", "px-5! py-2.5!")}>
          {pending ? "…" : "Subscribe"}
        </button>
      </div>
      <p aria-live="polite" className={`mt-2 text-sm ${state.status === "error" ? "text-red-300" : "text-gold"}`}>
        {state.status === "error" ? state.errors?.email : state.message}
      </p>
    </form>
  );
}
