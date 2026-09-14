"use client";

import { useEffect, useState } from "react";

type FeedbackMessage = {
  id: string;
  text: string;
  createdAt: string;
};

export default function Dashboard() {
  const [messages, setMessages] = useState<FeedbackMessage[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setError(null);
    try {
      const response = await fetch("/api/admin/messages");
      if (!response.ok) throw new Error();
      const data = await response.json();
      setMessages(data.messages);
    } catch {
      setError("Couldn't load messages.");
    }
  }

  async function handleDelete(id: string) {
    setMessages((current) => current?.filter((m) => m.id !== id) ?? current);
    try {
      const response = await fetch("/api/admin/messages", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!response.ok) throw new Error();
    } catch {
      setError("Couldn't delete that message — refreshing the list.");
      load();
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.reload();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-sm tracking-wide text-brass mb-2">The Brethren</p>
          <h1 className="font-display text-3xl text-paper">What people have shared</h1>
        </div>
        <button
          onClick={handleLogout}
          className="text-sm text-mist underline underline-offset-4 hover:text-paper"
        >
          Sign out
        </button>
      </div>

      {error && <p className="text-brick mb-4">{error}</p>}

      {messages === null && !error && (
        <p className="text-mist">Loading…</p>
      )}

      {messages !== null && messages.length === 0 && (
        <p className="text-mist">No messages yet.</p>
      )}

      <ul className="space-y-4">
        {messages?.map((message) => (
          <li
            key={message.id}
            className="rounded-lg bg-paper text-ink px-5 py-4"
          >
            <p className="whitespace-pre-wrap leading-relaxed">{message.text}</p>
            <div className="flex items-center justify-between mt-3">
              <time className="text-xs text-ink/50">
                {new Date(message.createdAt).toLocaleString()}
              </time>
              <button
                onClick={() => handleDelete(message.id)}
                className="text-xs text-brick underline underline-offset-4 hover:text-brick/80"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
