"use server";

import { campSessions } from "@/content/camp";

export type FormState = {
  status: "idle" | "success" | "error";
  message: string;
  errors?: Record<string, string>;
  /** Echoed back on error so fields keep what the visitor typed after React resets the form. */
  values?: Record<string, string>;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function text(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function invalid(errors: Record<string, string>, formData: FormData): FormState {
  const values: Record<string, string> = {};
  formData.forEach((value, key) => {
    if (typeof value === "string" && !key.startsWith("$")) values[key] = value;
  });
  return { status: "error", message: "Please check the highlighted fields.", errors, values };
}

// TODO: connect these to email (e.g. Resend), a CRM, or a spreadsheet.
// Until then submissions are logged on the server so nothing is silently lost in development.
async function deliver(kind: string, payload: Record<string, unknown>) {
  console.info(`[${kind}]`, JSON.stringify(payload));
}

export async function submitContact(_prev: FormState, formData: FormData): Promise<FormState> {
  if (text(formData, "company")) return { status: "success", message: "Thanks!" }; // honeypot

  const data = {
    name: text(formData, "name"),
    email: text(formData, "email"),
    topic: text(formData, "topic"),
    message: text(formData, "message"),
  };
  const errors: Record<string, string> = {};
  if (!data.name) errors.name = "Please tell us your name.";
  if (!emailPattern.test(data.email)) errors.email = "Enter a valid email address.";
  if (data.message.length < 10) errors.message = "Add a little more detail (10+ characters).";
  if (Object.keys(errors).length) return invalid(errors, formData);

  await deliver("contact", data);
  return { status: "success", message: `Thank you, ${data.name}. We’ll reply within two working days.` };
}

export async function submitCampRegistration(_prev: FormState, formData: FormData): Promise<FormState> {
  if (text(formData, "company")) return { status: "success", message: "Thanks!" };

  const data = {
    parentName: text(formData, "parentName"),
    email: text(formData, "email"),
    phone: text(formData, "phone"),
    camperName: text(formData, "camperName"),
    camperAge: Number(text(formData, "camperAge")),
    session: text(formData, "session"),
    extendedCare: formData.get("extendedCare") === "on",
    notes: text(formData, "notes"),
  };
  const errors: Record<string, string> = {};
  const session = campSessions.find((s) => s.id === data.session);
  if (!data.parentName) errors.parentName = "Parent or guardian name is required.";
  if (!emailPattern.test(data.email)) errors.email = "Enter a valid email address.";
  if (!data.camperName) errors.camperName = "Camper name is required.";
  if (!Number.isInteger(data.camperAge) || data.camperAge < 4 || data.camperAge > 18)
    errors.camperAge = "Enter an age between 4 and 18.";
  if (!session) errors.session = "Choose a session.";
  else if (!errors.camperAge && (data.camperAge < session.minAge || data.camperAge > session.maxAge))
    errors.session = `${session.name} is for ages ${session.minAge} to ${session.maxAge}.`;
  if (Object.keys(errors).length) return invalid(errors, formData);

  await deliver("camp-registration", data);
  return {
    status: "success",
    message: `${data.camperName} is on the list for ${session!.name}! We’ll email payment details to ${data.email} shortly.`,
  };
}

export async function subscribe(_prev: FormState, formData: FormData): Promise<FormState> {
  const email = text(formData, "email");
  if (!emailPattern.test(email)) return invalid({ email: "Enter a valid email address." }, formData);
  await deliver("newsletter", { email });
  return { status: "success", message: "You’re subscribed. See you at the theatre!" };
}
