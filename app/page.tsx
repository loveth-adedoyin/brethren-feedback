"use client";

import { FormEvent, useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";

export default function FeedbackPage() {
  const [text, setText] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!text.trim()) {
      setError("Write something before sending.");
      return;
    }

    setStatus("sending");
    setError(null);

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, website }),
      });
      const data = await response.json();

      if (!response.ok) {
        setStatus("error");
        setError(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      setStatus("sent");
    } catch {
      setStatus("error");
      setError("Couldn't reach the server. Check your connection and try again.");
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-prose">
        <p className="text-sm tracking-wide text-brass mb-3">The Brethren</p>

        {status === "sent" ? (
          <ConfirmationView onReset={() => {
            setText("");
            setStatus("idle");
          }} />
        ) : (
          <>
            <h1 className="font-display text-4xl sm:text-5xl text-paper leading-tight mb-5">
              A safe space to speak.
            </h1>
            <p className="text-mist leading-relaxed mb-10 max-w-[34rem]">
              A concern, a problem, something that&rsquo;s been sitting with
              you, or plain feedback — this goes straight to the leadership
              of The Brethren. We don&rsquo;t collect your name, email
              address, or IP address, so you can speak as openly as you need
              to.
            </p>

            <form onSubmit={handleSubmit} noValidate>
              {/* Honeypot field — hidden from people, visible to bots. */}
              <div className="absolute -left-[9999px] top-auto" aria-hidden="true">
                <label htmlFor="website">Leave this field empty</label>
                <input
                  id="website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </div>

              <label htmlFor="message" className="sr-only">
                Your concern, problem, or feedback
              </label>
              <textarea
                id="message"
                name="message"
                rows={8}
                placeholder="Share a concern, a problem, or feedback — nothing here is tied back to you."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full resize-y rounded-lg bg-paper text-ink placeholder:text-ink/40 px-5 py-4 leading-relaxed focus:outline-none focus-visible:ring-2 focus-visible:ring-brass"
                maxLength={4000}
              />

              <div className="flex items-center justify-between mt-3">
                <p className="text-sm text-brick min-h-[1.25rem]" role="alert">
                  {error ?? ""}
                </p>
                <p className="text-xs text-mist/70">{text.length}/4000</p>
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="mt-6 inline-flex items-center rounded-lg bg-brass px-6 py-3 font-medium text-ink transition-colors hover:bg-brassDark disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === "sending" ? "Sending…" : "Send message"}
              </button>
            </form>
          </>
        )}
      </div>
    </main>
  );
}

function ConfirmationView({ onReset }: { onReset: () => void }) {
  return (
    <div>
      <h1 className="font-display text-4xl sm:text-5xl text-paper leading-tight mb-5">
        Sent.
      </h1>
      <p className="text-mist leading-relaxed mb-8 max-w-[34rem]">
        Thank you for trusting us with this. Your message has been passed
        along, and there&rsquo;s no record of who sent it.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="text-brass underline underline-offset-4 hover:text-brassDark"
      >
        Send another message
      </button>
    </div>
  );
}
