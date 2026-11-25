/**
 * Lead-form endpoint for Billy James Real Estate (a Cloudflare Worker).
 *
 * The site is a static export, so its Contact and Home Value forms post here from the
 * browser (src/lib/leads.ts validates them first). This Worker accepts posts only from
 * the site's own pages, checks the shape and size of what was sent, and emails it to
 * Billy through Resend with the visitor's address as reply-to, so he can just hit Reply.
 *
 *   POST  { subject: string, replyTo?: string, fields: { [label: string]: string } }
 *   →     200 { ok: true }  |  4xx/5xx { ok: false, error: string }
 *
 * Settings (see README → "Lead forms"):
 *   ALLOWED_ORIGINS  vars    Comma-separated origins allowed to post.
 *   FROM             vars    Sender, on a domain verified in Resend.
 *   SITE_NAME        vars    Names the site in the email footer.
 *   LEAD_TO          secret  Inbox that gets the leads (kept out of this public repo).
 *   RESEND_API_KEY   secret  Resend API key with sending access.
 *   DRY_RUN          local   In .dev.vars only: log the email instead of sending it.
 */

interface Env {
  ALLOWED_ORIGINS: string;
  FROM: string;
  SITE_NAME: string;
  LEAD_TO?: string;
  RESEND_API_KEY?: string;
  DRY_RUN?: string;
}

type Lead = { subject: string; replyTo?: string; fields: Array<[label: string, value: string]> };
type Cors = Record<string, string> | null;

const MAX_BODY_BYTES = 16_000;
const MAX_FIELDS = 12;
const MAX_LABEL = 60;
const MAX_VALUE = 4_000;
const EMAIL = /^[^\s@<>()",;:]+@[^\s@<>()",;:]+\.[^\s@<>()",;:]+$/;

const worker = {
  async fetch(request: Request, env: Env): Promise<Response> {
    const origin = request.headers.get("Origin") ?? "";
    const allowed = env.ALLOWED_ORIGINS.split(",").map((o) => o.trim());
    const cors: Cors = origin && allowed.includes(origin) ? { "Access-Control-Allow-Origin": origin, Vary: "Origin" } : null;

    if (request.method === "OPTIONS") {
      if (!cors) return new Response(null, { status: 403 });
      return new Response(null, {
        status: 204,
        headers: {
          ...cors,
          "Access-Control-Allow-Methods": "POST",
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Max-Age": "86400",
        },
      });
    }
    if (request.method !== "POST") return json(405, { ok: false, error: "Use POST." }, cors, { Allow: "POST, OPTIONS" });
    if (!cors) return json(403, { ok: false, error: "This form only accepts posts from its own site." }, null);
    if (!(request.headers.get("Content-Type") ?? "").startsWith("application/json")) {
      return json(415, { ok: false, error: "Send JSON." }, cors);
    }

    const declared = Number(request.headers.get("Content-Length") ?? 0);
    if (declared > MAX_BODY_BYTES) return json(413, { ok: false, error: "That's too long to send." }, cors);
    const raw = await request.text();
    if (new TextEncoder().encode(raw).length > MAX_BODY_BYTES) return json(413, { ok: false, error: "That's too long to send." }, cors);

    let lead: Lead | string;
    try {
      lead = parseLead(JSON.parse(raw));
    } catch {
      lead = "That wasn't valid JSON.";
    }
    if (typeof lead === "string") return json(400, { ok: false, error: lead }, cors);

    const email = {
      from: env.FROM,
      to: [env.LEAD_TO ?? ""],
      subject: lead.subject,
      reply_to: lead.replyTo,
      text: renderText(lead, env.SITE_NAME),
      html: renderHtml(lead, env.SITE_NAME),
    };

    if (env.DRY_RUN) {
      console.log("[dry run] would send:", JSON.stringify({ ...email, html: `(${email.html.length} chars)` }, null, 2));
      return json(200, { ok: true }, cors);
    }
    if (!env.LEAD_TO || !env.RESEND_API_KEY) {
      console.error("LEAD_TO or RESEND_API_KEY isn't set; run `wrangler secret put` for both.");
      return json(500, { ok: false, error: "The form isn't set up yet." }, cors);
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
        // Resend rejects requests without a User-Agent (403, error 1010).
        "User-Agent": "lead-forms-worker/1.0",
      },
      body: JSON.stringify(email),
    });
    if (!res.ok) {
      // Log Resend's reason (never the lead itself) so `wrangler tail` shows what went wrong.
      console.error(`Resend refused the email: ${res.status} ${await res.text()}`);
      return json(502, { ok: false, error: "The email didn't go through." }, cors);
    }
    return json(200, { ok: true }, cors);
  },
};

export default worker;

/** Checks the posted lead. Returns it cleaned up, or a reason it was refused. */
function parseLead(body: unknown): Lead | string {
  if (!isRecord(body)) return "Expected an object.";
  const { subject, replyTo, fields } = body;

  if (typeof subject !== "string") return "Missing subject.";
  const cleanSubject = oneLine(subject).slice(0, 200);
  if (!cleanSubject) return "Missing subject.";

  let cleanReplyTo: string | undefined;
  if (replyTo !== undefined && replyTo !== null && replyTo !== "") {
    if (typeof replyTo !== "string" || replyTo.length > 200 || !EMAIL.test(replyTo.trim())) return "Reply-to isn't a valid email address.";
    cleanReplyTo = replyTo.trim();
  }

  if (!isRecord(fields)) return "Missing fields.";
  const entries = Object.entries(fields);
  if (entries.length === 0 || entries.length > MAX_FIELDS) return "Unexpected number of fields.";
  const cleanFields: Lead["fields"] = [];
  for (const [label, value] of entries) {
    if (typeof value !== "string") return `Field "${label.slice(0, MAX_LABEL)}" must be text.`;
    const cleanLabel = oneLine(label).slice(0, MAX_LABEL);
    const cleanValue = value.replace(/\r\n?/g, "\n").trim();
    if (!cleanLabel) return "Every field needs a label.";
    if (cleanValue.length > MAX_VALUE) return `Field "${cleanLabel}" is too long.`;
    if (cleanValue) cleanFields.push([cleanLabel, cleanValue]);
  }
  if (cleanFields.length === 0) return "The form was empty.";

  return { subject: cleanSubject, replyTo: cleanReplyTo, fields: cleanFields };
}

function renderText(lead: Lead, siteName: string) {
  const rows = lead.fields.map(([label, value]) => (value.includes("\n") ? `${label}:\n${value}` : `${label}: ${value}`));
  const footer = `Sent from the form on ${siteName}.${lead.replyTo ? " Reply to this email to answer them." : ""}`;
  return `${lead.subject}\n\n${rows.join("\n\n")}\n\n—\n${footer}\n`;
}

function renderHtml(lead: Lead, siteName: string) {
  const rows = lead.fields
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:10px 16px 10px 0;vertical-align:top;color:#5A6472;font-size:13px;white-space:nowrap">${escapeHtml(label)}</td>
          <td style="padding:10px 0;vertical-align:top;color:#13253F;font-size:15px;white-space:pre-wrap">${escapeHtml(value)}</td>
        </tr>`,
    )
    .join("");
  const footer = `Sent from the form on ${escapeHtml(siteName)}.${lead.replyTo ? " Reply to this email to answer them." : ""}`;
  return `<!doctype html>
<html>
  <body style="margin:0;padding:24px;background:#F2F4F7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif">
    <div style="max-width:560px;margin:0 auto;background:#FFFFFF;border-radius:16px;padding:28px">
      <h1 style="margin:0 0 16px;color:#13253F;font-size:19px;line-height:1.3">${escapeHtml(lead.subject)}</h1>
      <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;border-top:1px solid #E3E7EC">${rows}
      </table>
      <p style="margin:20px 0 0;color:#8892a0;font-size:12px">${footer}</p>
    </div>
  </body>
</html>`;
}

function json(status: number, body: object, cors: Cors, extra: Record<string, string> = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...(cors ?? {}), ...extra },
  });
}

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

function oneLine(s: string) {
  return s.replace(/\s+/g, " ").trim();
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}
