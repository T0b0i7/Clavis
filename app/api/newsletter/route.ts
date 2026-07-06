/*
 * Clavis - Free Typing Test with Mechanical Keyboard Sounds
 * Created by Eucher O. ABATTI (T0b0i7) - (c) 2026
 * License: Star https://github.com/T0b0i7/Clavis before use
 */

import { eq } from "drizzle-orm";
import { Resend } from "resend";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { subscribers } from "@/lib/db/schema";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

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

    // Envoyer l'email de bienvenue
    if (resend) {
      const isFr = (language ?? "french") === "french";
      const subject = isFr
        ? "Bienvenue sur Clavis ! 🎹"
        : "Welcome to Clavis! 🎹";

      const welcomeHtml = isFr
        ? `
<h1>Merci de vous être abonné à Clavis ! 🙏</h1>
<p>Bienvenue dans la communauté Clavis. Vous recevrez désormais toutes les <strong>nouvelles fonctionnalités</strong>, <strong>mises à jour</strong> et <strong>améliorations</strong> du test de dactylographie ultime.</p>
<p>En attendant, exercez-vous sur <a href="https://clavis-azure.vercel.app">clavis-azure.vercel.app</a> et améliorez votre vitesse de frappe !</p>
<hr/>
<p><strong>📌 Soutenez le projet :</strong></p>
<p>⭐ Mettez une star sur GitHub : <a href="https://github.com/T0b0i7/Clavis">github.com/T0b0i7/Clavis</a></p>
<p>💛 Faire un don par Mobile Money (Bénin) : <strong>+229 0157002427</strong></p>
<hr/>
<p style="color:#666;font-size:12px;">Clavis — Eucher O. ABATTI (T0b0i7) © 2026</p>`
        : `
<h1>Thank you for subscribing to Clavis! 🙏</h1>
<p>Welcome to the Clavis community. You will now receive all <strong>new features</strong>, <strong>updates</strong>, and <strong>improvements</strong> of the ultimate typing test.</p>
<p>In the meantime, practice on <a href="https://clavis-azure.vercel.app">clavis-azure.vercel.app</a> and improve your typing speed!</p>
<hr/>
<p><strong>📌 Support the project:</strong></p>
<p>⭐ Star on GitHub: <a href="https://github.com/T0b0i7/Clavis">github.com/T0b0i7/Clavis</a></p>
<p>💛 Donate via Mobile Money (Benin): <strong>+229 0157002427</strong></p>
<hr/>
<p style="color:#666;font-size:12px;">Clavis — Eucher O. ABATTI (T0b0i7) © 2026</p>`;

      try {
        await resend.emails.send({
          from: "Clavis <onboarding@resend.dev>",
          to: [email],
          subject,
          html: welcomeHtml,
        });
      } catch (emailErr) {
        console.error("Erreur envoi email bienvenue:", emailErr);
      }
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Erreur inconnue";
    console.error("Newsletter error:", msg);
    return NextResponse.json(
      { error: "Erreur serveur", detail: msg },
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
