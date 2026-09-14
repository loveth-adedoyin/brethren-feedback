import { NextResponse } from "next/server";
import { saveMessage } from "@/lib/store";

const MAX_LENGTH = 4000;

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const { text, website } = (body ?? {}) as { text?: string; website?: string };

  if (typeof website === "string" && website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  if (typeof text !== "string" || text.trim().length === 0) {
    return NextResponse.json({ error: "Message can't be empty." }, { status: 400 });
  }

  if (text.length > MAX_LENGTH) {
    return NextResponse.json(
      { error: `That's a bit long — please keep it under ${MAX_LENGTH} characters.` },
      { status: 400 }
    );
  }

  try {
    await saveMessage(text.trim());
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong on our end. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
