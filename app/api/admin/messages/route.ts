import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { getMessages, deleteMessage } from "@/lib/store";

export async function GET() {
  if (!isAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  const messages = await getMessages();
  messages.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  return NextResponse.json({ messages });
}

export async function DELETE(request: Request) {
  if (!isAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  const { id } = (await request.json().catch(() => ({}))) as { id?: string };
  if (!id) {
    return NextResponse.json({ error: "Missing id." }, { status: 400 });
  }
  await deleteMessage(id);
  return NextResponse.json({ ok: true });
}
