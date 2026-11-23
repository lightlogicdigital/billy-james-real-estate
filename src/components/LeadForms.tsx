"use client";

import Image from "next/image";
import { createContext, useActionState, useContext, useId, type ReactNode } from "react";
import { submitContact, submitHomeValue, type FormState } from "@/lib/leads";
import { site } from "@/content/site";
import { ArrowIcon, CheckIcon, cn } from "./ui";

/*
 * Lead forms (Paper: "Home Value & Contact · Redesign").
 * Three looks, picked by the surface the form sits on:
 *   page  — mist fields on the white contact page
 *   panel — white fields inside the mist home-value panel
 *   dark  — the ink card on the homepage ("Get in touch")
 */

type Tone = "page" | "panel" | "dark";
const ToneContext = createContext<Tone>("page");

const initial: FormState = { status: "idle" };

const inputBase =
  "w-full rounded-[14px] border px-[18px] py-3.5 text-base text-foreground placeholder:text-placeholder transition-colors focus:outline-none focus:ring-2";
const inputClass: Record<Tone, string> = {
  page: cn(inputBase, "border-transparent bg-mist hover:border-hairline focus:border-foreground focus:bg-white focus:ring-foreground/10 aria-[invalid=true]:border-[#b42318]"),
  panel: cn(inputBase, "border-hairline bg-white hover:border-quiet focus:border-foreground focus:ring-foreground/10 aria-[invalid=true]:border-[#b42318]"),
  dark: "w-full rounded-xl border border-white/25 bg-transparent px-4 py-3.5 text-base text-white placeholder:text-white/55 transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30 aria-[invalid=true]:border-[#ffb4ab]",
};

const errorText = (tone: Tone) => (tone === "dark" ? "text-[#ffb4ab]" : "text-[#b42318]");

function Field({
  label,
  error,
  optional,
  hideLabel,
  children,
}: {
  label: string;
  error?: string[];
  optional?: boolean;
  /** Keep the label for screen readers only (the placeholder carries it visually). */
  hideLabel?: boolean;
  children: (props: { id: string; "aria-invalid"?: boolean; "aria-describedby"?: string }) => ReactNode;
}) {
  const id = useId();
  const tone = useContext(ToneContext);
  const errorId = `${id}-error`;
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-2">
      <label htmlFor={id} className={cn(hideLabel ? "sr-only" : tone === "dark" ? "text-sm font-normal" : "text-[15px] font-medium leading-5")}>
        {label}
        {optional && <span className={cn("font-normal", tone === "dark" ? "text-white/60" : "text-muted")}> (optional)</span>}
      </label>
      {children({ id, "aria-invalid": error ? true : undefined, "aria-describedby": error ? errorId : undefined })}
      {error && (
        <p id={errorId} className={cn("text-sm", errorText(tone))}>
          {error[0]}
        </p>
      )}
    </div>
  );
}

type Option = { value: string; label: string };

/** Radio chips. `fill` stretches them to equal widths (home-value panel). */
function ChipGroup({
  legend,
  name,
  options,
  defaultValue,
  fill = false,
}: {
  legend: ReactNode;
  name: string;
  options: Option[];
  defaultValue: string;
  fill?: boolean;
}) {
  const tone = useContext(ToneContext);
  const chip = {
    page: "bg-mist px-5 py-[13px] hover:bg-hairline peer-checked:bg-foreground peer-checked:text-white",
    panel: "w-full justify-center border border-hairline bg-white px-3 py-[13px] hover:border-quiet peer-checked:border-foreground peer-checked:bg-foreground peer-checked:text-white",
    dark: "border border-white/25 px-4 py-2.5 text-white hover:border-white/60 peer-checked:border-accent peer-checked:bg-accent peer-checked:text-foreground",
  }[tone];
  return (
    <fieldset className="flex flex-col">
      <legend className={tone === "dark" ? "mb-2.5 text-sm font-normal" : "mb-3 text-[15px] font-medium leading-5"}>{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <label key={o.value} className={cn("cursor-pointer", fill && "min-w-[96px] flex-1")}>
            <input type="radio" name={name} value={o.value} defaultChecked={o.value === defaultValue} className="peer sr-only" />
            <span
              className={cn(
                "flex whitespace-nowrap rounded-full transition-colors peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2",
                tone === "dark" ? "text-sm peer-focus-visible:outline-accent" : "text-[15px] leading-5 peer-focus-visible:outline-foreground",
                chip,
              )}
            >
              {o.label}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

/** Segmented radio control on a mist track (contact page: "Best way to reach you"). */
function Segmented({ legend, name, options, defaultValue }: { legend: string; name: string; options: Option[]; defaultValue: string }) {
  return (
    <fieldset className="flex flex-col">
      <legend className="mb-2 text-[15px] font-medium leading-5">{legend}</legend>
      <div className="flex gap-1 rounded-full bg-mist p-1">
        {options.map((o) => (
          <label key={o.value} className="flex-1 cursor-pointer">
            <input type="radio" name={name} value={o.value} defaultChecked={o.value === defaultValue} className="peer sr-only" />
            <span className="flex justify-center rounded-full py-[13px] text-[15px] leading-5 text-muted transition-colors hover:text-foreground peer-checked:bg-white peer-checked:text-foreground peer-checked:shadow-[0_1px_3px_rgba(19,37,63,0.10)] peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-foreground">
              {o.label}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

/** Off-screen field bots fill in and people never see. */
function Honeypot() {
  return (
    <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label>
        Company
        <input type="text" name="company" tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  );
}

function SubmitButton({ pending, children }: { pending: boolean; children: ReactNode }) {
  const tone = useContext(ToneContext);
  return (
    <button
      type="submit"
      disabled={pending}
      className={cn(
        "group flex items-center justify-center gap-2.5 rounded-full transition-colors disabled:opacity-70",
        tone === "dark"
          ? "self-start bg-white px-[26px] py-3 text-[15px] text-foreground hover:bg-mist"
          : "h-14 bg-foreground px-7 text-base text-white hover:bg-[#0b1729]",
        tone === "panel" && "w-full",
      )}
    >
      {pending ? "Sending…" : children}
      {!pending && tone !== "dark" && <ArrowIcon className="size-[18px] transition-transform group-hover:translate-x-0.5" />}
    </button>
  );
}

function FormError({ state }: { state: FormState }) {
  const tone = useContext(ToneContext);
  if (state.status !== "error" || !state.message) return null;
  return (
    <p role="alert" className={cn("text-sm font-medium", errorText(tone))}>
      {state.message}
    </p>
  );
}

function Success({ message }: { message?: string }) {
  const tone = useContext(ToneContext);
  const dark = tone === "dark";
  return (
    <div role="status" className="flex flex-col items-start gap-4 py-6">
      <span className="flex size-12 items-center justify-center rounded-full bg-accent">
        <CheckIcon className="size-5 text-foreground" />
      </span>
      <p className="text-[26px] leading-8 tracking-[-0.02em]">{message ?? "Thanks — I'll be in touch soon."}</p>
      <p className={dark ? "text-white/75" : "text-muted"}>
        Need me sooner? Call or text{" "}
        <a href={site.phoneHref} className={cn(dark ? "text-accent" : "text-foreground underline decoration-quiet underline-offset-4")}>
          {site.phone}
        </a>
        .
      </p>
    </div>
  );
}

/* ---------- Contact ---------- */

/** Contact form: on the contact page (default) or as the ink card on the homepage (`dark`). */
export function ContactForm({ className, dark = false }: { className?: string; dark?: boolean }) {
  const [state, action, pending] = useActionState(submitContact, initial);
  const tone: Tone = dark ? "dark" : "page";
  const v = state.values ?? {};
  const e = state.errors ?? {};
  const input = inputClass[tone];
  return (
    <ToneContext.Provider value={tone}>
      <div
        className={cn(
          "relative",
          dark && "rounded-[24px] bg-foreground p-6 text-white sm:rounded-[28px] md:p-8",
          className,
        )}
      >
        {!dark && (
          <div className="mb-8 flex flex-col gap-1.5">
            <h2 className="font-display text-[28px] font-normal leading-9 tracking-[-0.02em] sm:text-[30px] sm:leading-[38px]">
              Send me a <em className="italic">note</em>
            </h2>
            <p className="text-base leading-6 text-muted">I&apos;ll get back to you the way you prefer.</p>
          </div>
        )}
        {state.status === "success" ? (
          <Success message={state.message} />
        ) : (
          <form action={action} noValidate className={cn("flex flex-col", dark ? "gap-5" : "gap-8")}>
            <Honeypot />
            <ChipGroup
              legend={dark ? "I'm interested in" : "What can I help with?"}
              name="interest"
              defaultValue={v.interest || "buying"}
              options={[
                { value: "buying", label: "Buying" },
                { value: "selling", label: "Selling" },
                { value: "both", label: "Buying and selling" },
                { value: "question", label: "Just a question" },
              ]}
            />
            <div className="flex flex-col gap-5">
              <Field label="Full name" error={e.name}>
                {(p) => <input {...p} name="name" autoComplete="name" defaultValue={v.name} placeholder="First and last name" className={input} />}
              </Field>
              <div className="flex flex-col gap-5 sm:flex-row sm:gap-3">
                <Field label="Phone" error={e.phone}>
                  {(p) => <input {...p} name="phone" type="tel" autoComplete="tel" defaultValue={v.phone} placeholder="(757) 555-0123" className={input} />}
                </Field>
                <Field label="Email" error={e.email}>
                  {(p) => <input {...p} name="email" type="email" autoComplete="email" defaultValue={v.email} placeholder="you@email.com" className={input} />}
                </Field>
              </div>
              {!dark && (
                <Segmented
                  legend="Best way to reach you"
                  name="contactBy"
                  defaultValue={v.contactBy || "call"}
                  options={[
                    { value: "call", label: "Call" },
                    { value: "text", label: "Text" },
                    { value: "email", label: "Email" },
                  ]}
                />
              )}
              <Field label="Message" error={e.message} optional>
                {(p) => (
                  <textarea
                    {...p}
                    name="message"
                    rows={dark ? 4 : 5}
                    defaultValue={v.message}
                    placeholder="Tell me a little about what you're looking for…"
                    className={cn(input, "resize-y")}
                  />
                )}
              </Field>
            </div>
            <FormError state={state} />
            <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
              <SubmitButton pending={pending}>{dark ? "Send note" : "Send message"}</SubmitButton>
              {!dark && <p className="text-sm leading-5 text-muted">No pressure, no obligation.</p>}
            </div>
          </form>
        )}
      </div>
    </ToneContext.Provider>
  );
}

/* ---------- Home value ---------- */

/** Numbered question heading inside the home-value panel. */
function Step({ n, children }: { n: number; children: ReactNode }) {
  return (
    <span className="flex items-baseline gap-2.5 text-[17px] font-normal leading-6">
      <span aria-hidden className="w-5 shrink-0 text-[13px] font-medium leading-4 tracking-[0.08em] text-muted">
        {String(n).padStart(2, "0")}
      </span>
      {children}
    </span>
  );
}

const stepRule = "flex flex-col gap-3 border-t border-hairline pt-6";

export function HomeValueForm({ className }: { className?: string }) {
  const [state, action, pending] = useActionState(submitHomeValue, initial);
  const v = state.values ?? {};
  const e = state.errors ?? {};
  const addressId = useId();
  const input = inputClass.panel;
  return (
    <ToneContext.Provider value="panel">
      <div className={cn("relative flex flex-col gap-7 rounded-[28px] bg-mist p-6 sm:p-10", className)}>
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h2 className="font-display text-[24px] font-normal leading-8 tracking-[-0.02em] sm:text-[26px]">
              Request your <em className="italic">home value</em>
            </h2>
            <p className="text-[15px] leading-[22px] text-muted">Takes about a minute. Free, no obligation.</p>
          </div>
          <Image
            src="/images/billy/billy-headshot.png"
            alt=""
            width={104}
            height={104}
            className="size-[52px] shrink-0 rounded-full border-[3px] border-white bg-[#e7eef6] object-cover object-[50%_15%]"
          />
        </div>
        {state.status === "success" ? (
          <Success message={state.message} />
        ) : (
          <form action={action} noValidate className="flex flex-col gap-7">
            <Honeypot />
            <div className={stepRule}>
              <label htmlFor={addressId}>
                <Step n={1}>Where&apos;s the home?</Step>
              </label>
              <div className="relative">
                <svg aria-hidden viewBox="0 0 24 24" className="pointer-events-none absolute left-4 top-[18px] size-[18px] text-placeholder" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Z" />
                  <circle cx="12" cy="9.5" r="2.5" />
                </svg>
                <input
                  id={addressId}
                  name="address"
                  autoComplete="street-address"
                  defaultValue={v.address}
                  placeholder="Street address, city"
                  aria-invalid={e.address ? true : undefined}
                  aria-describedby={e.address ? `${addressId}-error` : undefined}
                  className={cn(input, "pl-11")}
                />
              </div>
              {e.address && (
                <p id={`${addressId}-error`} className="text-sm text-[#b42318]">
                  {e.address[0]}
                </p>
              )}
            </div>
            <div className={stepRule}>
              <ChipGroup
                legend={<Step n={2}>When might you sell?</Step>}
                name="timeline"
                fill
                defaultValue={v.timeline || "0-3"}
                options={[
                  { value: "0-3", label: "0–3 months" },
                  { value: "3-12", label: "3–12 months" },
                  { value: "curious", label: "Just curious" },
                ]}
              />
            </div>
            <div className={stepRule}>
              <fieldset className="flex flex-col gap-3">
                <legend className="mb-3">
                  <Step n={3}>Where should I send it?</Step>
                </legend>
                <Field label="Your name" error={e.name} hideLabel>
                  {(p) => <input {...p} name="name" autoComplete="name" defaultValue={v.name} placeholder="Your name" className={input} />}
                </Field>
                <div className="flex flex-col gap-3 sm:flex-row sm:gap-2">
                  <Field label="Email" error={e.email} hideLabel>
                    {(p) => <input {...p} name="email" type="email" autoComplete="email" defaultValue={v.email} placeholder="Email" className={input} />}
                  </Field>
                  <Field label="Phone (optional)" error={e.phone} hideLabel>
                    {(p) => <input {...p} name="phone" type="tel" autoComplete="tel" defaultValue={v.phone} placeholder="Phone (optional)" className={input} />}
                  </Field>
                </div>
              </fieldset>
            </div>
            <FormError state={state} />
            <div className="flex flex-col gap-3.5 pt-1">
              <SubmitButton pending={pending}>Get my home value</SubmitButton>
              <p className="text-center text-sm leading-5 text-muted">No spam, no pressure — just a real number from a real person.</p>
            </div>
          </form>
        )}
      </div>
    </ToneContext.Provider>
  );
}
