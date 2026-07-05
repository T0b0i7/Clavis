import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

interface Subscriber {
  email: string;
  date: string;
  language: string;
}

const DATA_FILE = path.join(process.cwd(), "data", "subscribers.json");

async function readSubscribers(): Promise<Subscriber[]> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(raw) as Subscriber[];
  } catch {
    return [];
  }
}

async function writeSubscribers(subscribers: Subscriber[]) {
  await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(subscribers, null, 2), "utf-8");
}

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

    const subscribers = await readSubscribers();
    if (subscribers.some((s) => s.email === email)) {
      return NextResponse.json(
        { error: "Déjà abonné" },
        { status: 409 }
      );
    }

    subscribers.push({
      email,
      date: new Date().toISOString(),
      language: language ?? "french",
    });
    await writeSubscribers(subscribers);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ message: "Newsletter API" });
}
