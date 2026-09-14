"use client";

import { FormEvent, useState } from "react";

export default function LoginForm() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        setError(data.error ?? "Couldn't sign in.");
        setLoading(false);
        return;
      }

      window.location.reload();
    } catch {
      setError("Couldn't reach the server. Try again.");
      setLoading(false);
    }
  }

  return (
    <div className="max-w-sm">
      <p className="text-sm tracking-wide text-brass mb-3">The Brethren</p>
      <h1 className="font-display text-3xl text-paper mb-6">Admin sign-in</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="password" className="sr-only">
          Password
        </label>
        <input
          id="password"
          type="password"
          autoFocus
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-lg bg-paper text-ink placeholder:text-ink/40 px-4 py-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-brass"
        />
        {error && (
          <p className="text-sm text-brick mt-2" role="alert">
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={loading}
          className="mt-4 w-full rounded-lg bg-brass px-6 py-3 font-medium text-ink transition-colors hover:bg-brassDark disabled:opacity-60"
        >
          {loading ? "Checking…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
