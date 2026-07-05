/*
 * Clavis ó Free Typing Test with Mechanical Keyboard Sounds
 * Created by Eucher O. ABATTI (T0b0i7) ó © 2026
 * License: ? Star https://github.com/T0b0i7/Clavis before use
 */
import { Resend } from "resend";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { subscribers } from "@/lib/db/schema";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

interface EmailPayload {
  subject: string;
  body: string;
}

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get("key");

  if (key !== process.env.NOTIFICATION_KEY) {
    return NextResponse.json({ error: "Non autoris√©" }, { status: 401 });
  }

  if (!db) {
    return NextResponse.json(
      { error: "Base de donn√©es non configur√©e" },
      { status: 503 }
    );
  }

  if (!resend) {
    return NextResponse.json(
      { error: "RESEND_API_KEY non configur√©e" },
      { status: 503 }
    );
  }

  try {
    const { subject, body } = (await request.json()) as EmailPayload;

    if (!subject || !body) {
      return NextResponse.json(
        { error: "Il manque subject ou body" },
        { status: 400 }
      );
    }

    const list = await db.select().from(subscribers);

    if (list.length === 0) {
      return NextResponse.json({ success: true, notified: 0 });
    }

    // Resend accepte jusqu'√† 50 destinataires par appel en bcc
    // On envoie en lots si besoin
    const batchSize = 50;
    let sent = 0;

    for (let i = 0; i < list.length; i += batchSize) {
      const batch = list.slice(i, i + batchSize);

      await resend.emails.send({
        from: "Clavis <onboarding@resend.dev>",
        to: batch.map((s) => s.email),
        subject,
        html: body,
      });

      sent += batch.length;
    }

    return NextResponse.json({
      success: true,
      notified: sent,
    });
  } catch (error) {
    console.error("Erreur envoi notification:", error);
    return NextResponse.json(
      { error: "Erreur lors de l'envoi" },
      { status: 500 }
    );
  }
}
