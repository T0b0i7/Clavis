/*
 * Clavis - Free Typing Test with Mechanical Keyboard Sounds
 * Created by Eucher O. ABATTI (T0b0i7) - (c) 2026
 * License: Star https://github.com/T0b0i7/Clavis before use
 */

import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const raw = await request.text();
    const firstChars = raw.length > 0 ? raw.charCodeAt(0) + "," + raw.charCodeAt(1) + "," + raw.charCodeAt(2) : "empty";
    return NextResponse.json({
      length: raw.length,
      firstChars,
      raw: raw.substring(0, 50),
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
