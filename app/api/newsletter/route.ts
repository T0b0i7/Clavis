/*
 * Clavis - Free Typing Test with Mechanical Keyboard Sounds
 * Created by Eucher O. ABATTI (T0b0i7) - (c) 2026
 * License: Star https://github.com/T0b0i7/Clavis before use
 */

import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { subscribers } from "@/lib/db/schema";

export async function POST(request: Request) {
  try {
    const { email, language } = (await request.json()) as {
      email?: string;
      language?: string;
    };

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Email invalide" },
        { status: 400 }
      );
    }

    if (!db) {
      return NextResponse.json(
        { error: "Base de données non configurée" },
        { status: 503 }
      );
    }

    const existing = await db
      .select()
      .from(subscribers)
      .where(eq(subscribers.email, email))
      .get();

    if (existing) {
      return NextResponse.json(
        { error: "Déjà abonné" },
        { status: 409 }
      );
    }

    await db.insert(subscribers).values({
      email,
      date: new Date().toISOString(),
      language: language ?? "french",
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get("key");

  if (key !== process.env.NOTIFICATION_KEY) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  if (!db) {
    return NextResponse.json(
      { error: "Base de données non configurée" },
      { status: 503 }
    );
  }

  const list = await db.select().from(subscribers);
  return NextResponse.json({ count: list.length, subscribers: list });
}
