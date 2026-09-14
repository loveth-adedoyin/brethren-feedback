import { Redis } from "@upstash/redis";
import { randomUUID } from "crypto";

export type FeedbackMessage = {
  id: string;
  text: string;
  createdAt: string;
};

const KEY = "brethren:feedback";

function getClient(): Redis {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    throw new Error(
      "Missing UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN. See README.md."
    );
  }

  return new Redis({ url, token });
}

export async function saveMessage(text: string): Promise<void> {
  const redis = getClient();
  const message: FeedbackMessage = {
    id: randomUUID(),
    text,
    createdAt: new Date().toISOString(),
  };
  await redis.lpush(KEY, JSON.stringify(message));
}

export async function getMessages(): Promise<FeedbackMessage[]> {
  const redis = getClient();
  const raw = await redis.lrange<string | FeedbackMessage>(KEY, 0, -1);
  return raw.map((item) =>
    typeof item === "string" ? (JSON.parse(item) as FeedbackMessage) : item
  );
}

export async function deleteMessage(id: string): Promise<void> {
  const redis = getClient();
  const raw = await redis.lrange<string | FeedbackMessage>(KEY, 0, -1);
  const target = raw.find((item) => {
    const parsed = typeof item === "string" ? JSON.parse(item) : item;
    return parsed.id === id;
  });
  if (target !== undefined) {
    await redis.lrem(KEY, 1, target as string);
  }
}
