"use client";

import { ArrowRight, Check, Copy, Loader2 } from "lucide-react";
import { useState } from "react";

const EMAIL = "sebastien@ap3xoperations.com";
// FormSubmit relays the form to the inbox; GitHub Pages cannot run server code.
// The first submission sends a one-time activation email to the inbox above.
const ENDPOINT = `https://formsubmit.co/ajax/${EMAIL}`;

const topics = ["Business operations", "Technology support", "3D printing", "Something else"];

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm({ defaultTopic, subject }: { defaultTopic?: string; subject: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [copied, setCopied] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    if (data._honey) return; // bot filled the hidden field
    setStatus("sending");
    try {
      const response = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          ...data,
          _subject: `${subject}: ${data.topic ?? ""}`.trim(),
          _template: "table",
        }),
      });
      const result = await response.json().catch(() => ({}));
      if (response.ok && String(result.success) === "true") {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copy this email address:", EMAIL);
    }
  }

  if (status === "sent") {
    return (
      <div className="contact-form contact-form-done" role="status">
        <Check size={26} aria-hidden="true" />
        <h3>Message sent.</h3>
        <p>Thanks. AP3X will reply by email.</p>
        <button type="button" className="text-button" onClick={() => setStatus("idle")}>
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      className="contact-form"
      action={`https://formsubmit.co/${EMAIL}`}
      method="POST"
      onSubmit={onSubmit}
    >
      <div className="form-row">
        <label>
          <span>Name</span>
          <input name="name" type="text" autoComplete="name" required maxLength={120} />
        </label>
        <label>
          <span>Email</span>
          <input name="email" type="email" autoComplete="email" required maxLength={200} />
        </label>
      </div>

      <label>
        <span>What do you need?</span>
        <select name="topic" defaultValue={defaultTopic ?? topics[0]}>
          {topics.map((topic) => (
            <option key={topic}>{topic}</option>
          ))}
        </select>
      </label>

      <label>
        <span>Message</span>
        <textarea
          name="message"
          required
          rows={5}
          maxLength={5000}
          placeholder="The problem, the outcome you want, and your timing."
        />
      </label>

      {/* Hidden from people; bots tend to fill it in. */}
      <input type="text" name="_honey" tabIndex={-1} autoComplete="off" className="form-honey" aria-hidden="true" />
      <input type="hidden" name="_subject" value={subject} />
      <input type="hidden" name="_captcha" value="false" />

      <button type="submit" className="button button-primary contact-button" disabled={status === "sending"}>
        {status === "sending" ? (
          <>
            <Loader2 size={18} className="spin" aria-hidden="true" />
            Sending…
          </>
        ) : (
          <>
            Send message
            <ArrowRight size={18} aria-hidden="true" />
          </>
        )}
      </button>

      <p className="form-status" role="status" aria-live="polite">
        {status === "error"
          ? `The message could not be sent. Please email ${EMAIL} directly.`
          : ""}
      </p>

      <p className="form-alt">
        Prefer email? <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
        <button type="button" className="copy-button" onClick={copyEmail} aria-label="Copy email address">
          {copied ? <Check size={14} aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </p>
    </form>
  );
}
