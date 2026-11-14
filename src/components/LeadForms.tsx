"use client";

import { useActionState, useId } from "react";
import { submitContact, submitHomeValue, type FormState } from "@/app/actions";
import { site } from "@/content/site";
import { CheckIcon, cn } from "./ui";

const initial: FormState = { status: "idle" };

const inputClass =
  "w-full rounded-xl border border-border bg-white px-4 py-3.5 text-base text-foreground placeholder:text-placeholder transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 aria-[invalid=true]:border-[#b42318]";

function Field({
  label,
  error,
  optional,
  children,
}: {
  label: string;
  /** Only used to keep call sites readable; the input sets its own `name`. */
  name?: string;
  error?: string[];
  optional?: boolean;
  children: (props: { id: string; "aria-invalid"?: boolean; "aria-describedby"?: string }) => React.ReactNode;
}) {
  const id = useId();
  const errorId = `${id}-error`;
  return (
    <div className="flex flex-1 flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
        {optional && <span className="font-normal text-muted"> (optional)</span>}
      </label>
      {children({ id, "aria-invalid": error ? true : undefined, "aria-describedby": error ? errorId : undefined })}
      {error && (
        <p id={errorId} className="text-sm text-[#b42318]">
          {error[0]}
        </p>
      )}
    </div>
  );
}

function ChipGroup({
  legend,
  name,
  options,
  defaultValue,
}: {
  legend: string;
  name: string;
  options: { value: string; label: string }[];
  defaultValue: string;
}) {
  return (
    <fieldset className="flex flex-col gap-2.5">
      <legend className="mb-2.5 text-sm font-medium">{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <label key={o.value} className="cursor-pointer">
            <input type="radio" name={name} value={o.value} defaultChecked={o.value === defaultValue} className="peer sr-only" />
            <span className="inline-flex rounded-full border border-border px-4 py-2.5 text-sm font-medium transition-colors peer-checked:border-foreground peer-checked:bg-foreground peer-checked:text-white peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-primary hover:border-foreground">
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

function SubmitButton({ pending, children }: { pending: boolean; children: React.ReactNode }) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="flex w-full items-center justify-center rounded-full bg-primary px-6 py-4 font-semibold text-white transition-colors hover:bg-primary-hover disabled:opacity-70"
    >
      {pending ? "Sending…" : children}
    </button>
  );
}

function Success({ message }: { message?: string }) {
  return (
    <div role="status" className="flex flex-col items-start gap-4 py-6">
      <span className="flex size-12 items-center justify-center rounded-full bg-accent">
        <CheckIcon className="size-5 text-foreground" />
      </span>
      <p className="text-h3 font-medium">{message ?? "Thanks — I'll be in touch soon."}</p>
      <p className="text-muted">
        Need me sooner? Call or text{" "}
        <a href={site.phoneHref} className="font-semibold text-primary">
          {site.phone}
        </a>
        .
      </p>
    </div>
  );
}

export function ContactForm({ className }: { className?: string }) {
  const [state, action, pending] = useActionState(submitContact, initial);
  const v = state.values ?? {};
  const e = state.errors ?? {};
  return (
    <div className={cn("relative rounded-lg border border-border bg-white p-6 shadow-[0_24px_60px_rgba(19,37,63,0.08)] md:p-10", className)}>
      <h2 className="mb-5 text-2xl font-medium tracking-[-0.02em] md:text-h3">Send me a note</h2>
      {state.status === "success" ? (
        <Success message={state.message} />
      ) : (
        <form action={action} noValidate className="flex flex-col gap-5">
          <Honeypot />
          <ChipGroup
            legend="I'm interested in"
            name="interest"
            defaultValue={v.interest || "buying"}
            options={[
              { value: "buying", label: "Buying" },
              { value: "selling", label: "Selling" },
              { value: "both", label: "Buying and selling" },
              { value: "question", label: "Just a question" },
            ]}
          />
          <Field label="Full name" name="name" error={e.name}>
            {(p) => <input {...p} name="name" autoComplete="name" defaultValue={v.name} placeholder="First and last name" className={inputClass} />}
          </Field>
          <div className="flex flex-col gap-5 sm:flex-row sm:gap-3">
            <Field label="Phone" name="phone" error={e.phone}>
              {(p) => <input {...p} name="phone" type="tel" autoComplete="tel" defaultValue={v.phone} placeholder="(757) 555-0123" className={inputClass} />}
            </Field>
            <Field label="Email" name="email" error={e.email}>
              {(p) => <input {...p} name="email" type="email" autoComplete="email" defaultValue={v.email} placeholder="you@email.com" className={inputClass} />}
            </Field>
          </div>
          <Field label="Message" name="message" error={e.message} optional>
            {(p) => (
              <textarea
                {...p}
                name="message"
                rows={4}
                defaultValue={v.message}
                placeholder="Tell me a little about what you're looking for…"
                className={cn(inputClass, "resize-y")}
              />
            )}
          </Field>
          {state.status === "error" && state.message && (
            <p role="alert" className="text-sm font-medium text-[#b42318]">
              {state.message}
            </p>
          )}
          <SubmitButton pending={pending}>Send message</SubmitButton>
        </form>
      )}
    </div>
  );
}

export function HomeValueForm({ className }: { className?: string }) {
  const [state, action, pending] = useActionState(submitHomeValue, initial);
  const v = state.values ?? {};
  const e = state.errors ?? {};
  return (
    <div className={cn("relative rounded-lg bg-white p-6 shadow-[0_24px_60px_rgba(19,37,63,0.10)] md:p-10", className)}>
      <div className="mb-5 flex flex-col gap-1.5">
        <h2 className="text-2xl font-medium tracking-[-0.02em] md:text-h3">Request your home value</h2>
        <p className="text-[15px] text-muted">Takes about a minute.</p>
      </div>
      {state.status === "success" ? (
        <Success message={state.message} />
      ) : (
        <form action={action} noValidate className="flex flex-col gap-5">
          <Honeypot />
          <Field label="Property address" name="address" error={e.address}>
            {(p) => (
              <input {...p} name="address" autoComplete="street-address" defaultValue={v.address} placeholder="123 Main St, Chesapeake" className={inputClass} />
            )}
          </Field>
          <ChipGroup
            legend="When might you sell?"
            name="timeline"
            defaultValue={v.timeline || "0-3"}
            options={[
              { value: "0-3", label: "0–3 months" },
              { value: "3-12", label: "3–12 months" },
              { value: "curious", label: "Just curious" },
            ]}
          />
          <Field label="Your name" name="name" error={e.name}>
            {(p) => <input {...p} name="name" autoComplete="name" defaultValue={v.name} placeholder="First and last name" className={inputClass} />}
          </Field>
          <div className="flex flex-col gap-5 sm:flex-row sm:gap-3">
            <Field label="Email" name="email" error={e.email}>
              {(p) => <input {...p} name="email" type="email" autoComplete="email" defaultValue={v.email} placeholder="you@email.com" className={inputClass} />}
            </Field>
            <Field label="Phone" name="phone" error={e.phone} optional>
              {(p) => <input {...p} name="phone" type="tel" autoComplete="tel" defaultValue={v.phone} placeholder="(757) 555-0123" className={inputClass} />}
            </Field>
          </div>
          {state.status === "error" && state.message && (
            <p role="alert" className="text-sm font-medium text-[#b42318]">
              {state.message}
            </p>
          )}
          <SubmitButton pending={pending}>Get my home value</SubmitButton>
          <p className="text-center text-sm text-muted">No spam, no pressure — just a real number from a real person.</p>
        </form>
      )}
    </div>
  );
}
