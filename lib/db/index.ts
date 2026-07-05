import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { env } from "@/lib/env";

const url = env.DATABASE_URL;
const authToken = env.DATABASE_AUTH_TOKEN;

export const db =
  url && authToken
    ? drizzle(createClient({ url, authToken }))
    : null;
