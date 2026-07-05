import { eq, sql } from "drizzle-orm";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { stats } from "@/lib/db/schema";

const KEY = "total_downloads";
const GITHUB_ZIP =
  "https://github.com/T0b0i7/Clavis/archive/refs/heads/main.zip";

export async function GET() {
  // Incrémenter le compteur
  if (db) {
    await db
      .insert(stats)
      .values({ key: KEY, value: 1 })
      .onConflictDoUpdate({
        target: stats.key,
        set: { value: sql`${stats.value} + 1` },
      });
  }

  // Rediriger vers le ZIP GitHub
  return NextResponse.redirect(GITHUB_ZIP);
}
