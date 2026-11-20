import { z } from "zod";
import { site } from "@/content/site";

/*
 * Lead forms for a static site (GitHub Pages has no server): the browser validates
 * the form, then POSTs it as JSON to a form service such as Formspree, set at build
 * time in NEXT_PUBLIC_FORM_ENDPOINT (e.g. https://formspree.io/f/abcdwxyz).
 *
 * Without an endpoint: in development the lead is logged and the visitor sees a
 * success message; in a production build the visitor is asked to call or text.
 */

export type FormState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Record<string, string[] | undefined>;
  /** Echo back what was typed so a failed submit doesn't wipe the form. */
  values?: Record<string, string>;
};

const optionalEmail = z
  .string()
  .trim()
  .max(200)
  .refine((v) => v === "" || z.string().email().safeParse(v).success, "Enter a valid email address.");
const optionalPhone = z
  .string()
  .trim()
  .max(40)
  .refine((v) => v === "" || v.replace(/\D/g, "").length >= 10, "Enter a 10-digit phone number.");

const contactSchema = z
  .object({
    interest: z.enum(["buying", "selling", "both", "question"]).catch("question"),
    name: z.string().trim().min(2, "Please tell me your name.").max(120),
    phone: optionalPhone,
    email: optionalEmail,
    message: z.string().trim().max(4000),
  })
  .refine((d) => d.phone !== "" || d.email !== "", {
    message: "Add a phone number or email so I can get back to you.",
    path: ["email"],
  });

const homeValueSchema = z.object({
  address: z.string().trim().min(5, "Enter the property address.").max(200),
  timeline: z.enum(["0-3", "3-12", "curious"]).catch("curious"),
  name: z.string().trim().min(2, "Please tell me your name.").max(120),
  email: z.string().trim().email("Enter a valid email address.").max(200),
  phone: optionalPhone,
});

const interestLabels = { buying: "Buying", selling: "Selling", both: "Buying and selling", question: "Just a question" };
const timelineLabels = { "0-3": "0–3 months", "3-12": "3–12 months", curious: "Just curious" };

function read(formData: FormData, keys: string[]) {
  return Object.fromEntries(keys.map((k) => [k, String(formData.get(k) ?? "")]));
}

const sendFailed = `Something went wrong sending that. Please call or text ${site.phone} instead.`;

/** POSTs a lead to the form service. Formspree reads `_subject` and `_replyto`. */
async function deliverLead(subject: string, fields: Record<string, string>, replyTo?: string): Promise<true | string> {
  const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT;
  if (!endpoint) {
    if (process.env.NODE_ENV !== "production") {
      console.info(`[lead] ${subject}`, fields);
      return true;
    }
    return `The online form isn't connected yet. Please call or text ${site.phone} — I'd love to hear from you.`;
  }
  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ _subject: subject, _replyto: replyTo || undefined, ...fields }),
    });
    return res.ok ? true : sendFailed;
  } catch {
    return sendFailed;
  }
}

export async function submitContact(_prev: FormState, formData: FormData): Promise<FormState> {
  // Honeypot: real people never see this field.
  if (String(formData.get("company") ?? "") !== "") return { status: "success" };

  const values = read(formData, ["interest", "name", "phone", "email", "message"]);
  const parsed = contactSchema.safeParse(values);
  if (!parsed.success) {
    return { status: "error", message: "A couple of things need a look.", errors: parsed.error.flatten().fieldErrors, values };
  }
  const d = parsed.data;
  const sent = await deliverLead(
    `New website message — ${interestLabels[d.interest]} — ${d.name}`,
    { Interest: interestLabels[d.interest], Name: d.name, Phone: d.phone, Email: d.email, Message: d.message },
    d.email,
  );
  if (sent !== true) return { status: "error", message: sent, values };
  return { status: "success", message: `Thanks, ${d.name.split(" ")[0]}! I'll be in touch soon.` };
}

export async function submitHomeValue(_prev: FormState, formData: FormData): Promise<FormState> {
  if (String(formData.get("company") ?? "") !== "") return { status: "success" };

  const values = read(formData, ["address", "timeline", "name", "email", "phone"]);
  const parsed = homeValueSchema.safeParse(values);
  if (!parsed.success) {
    return { status: "error", message: "A couple of things need a look.", errors: parsed.error.flatten().fieldErrors, values };
  }
  const d = parsed.data;
  const sent = await deliverLead(
    `Home value request — ${d.address}`,
    { Address: d.address, Timeline: timelineLabels[d.timeline], Name: d.name, Email: d.email, Phone: d.phone },
    d.email,
  );
  if (sent !== true) return { status: "error", message: sent, values };
  return { status: "success", message: `Thanks, ${d.name.split(" ")[0]}! I'll take a look at ${d.address} and reach out.` };
}
