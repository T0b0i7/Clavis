/*
 * Clavis - Free Typing Test with Mechanical Keyboard Sounds
 * Created by Eucher O. ABATTI (T0b0i7) - (c) 2026
 * License: Star https://github.com/T0b0i7/Clavis before use
 */

import { eq, sql } from "drizzle-orm";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { stats } from "@/lib/db/schema";

const KEY = "total_downloads";

export async function GET() {
  if (!db) {
    return NextResponse.json({ count: 0 });
  }

  const row = await db
    .select()
    .from(stats)
    .where(eq(stats.key, KEY))
    .get();

  return NextResponse.json({ count: row?.value ?? 0 });
}

export async function POST() {
  if (!db) {
    return NextResponse.json(
      { error: "Base de données non configurée" },
      { status: 503 }
    );
  }

  // Vérifier un cache session pour éviter les doublons
  // (un même visiteur ne compte qu'une fois)

  await db
    .insert(stats)
    .values({ key: KEY, value: 1 })
    .onConflictDoUpdate({
      target: stats.key,
      set: { value: sql`${stats.value} + 1` },
    });

  const row = await db
    .select()
    .from(stats)
    .where(eq(stats.key, KEY))
    .get();

  return NextResponse.json({ count: row?.value ?? 0 });
}
